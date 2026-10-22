#!/usr/bin/env node
// PreToolUse hook (Bash | PowerShell): blocks git commands that could lose the
// user's work, rewrite history, publish anything, or stage indiscriminately.
// It never runs git write operations itself. Exit 2 = block; stderr goes back to Claude.
import { execFileSync } from 'node:child_process'

const PROTECTED_BRANCHES = new Set(['main', 'master'])

const readStdin = async () => {
  let data = ''
  for await (const chunk of process.stdin) data += chunk
  return data
}

// Splits a shell line into segments on unquoted ; & | and newlines,
// and each segment into tokens (quotes removed).
const parseSegments = (command) => {
  const segments = []
  let tokens = []
  let token = ''
  let quote = null
  const pushToken = () => {
    if (token !== '') tokens.push(token)
    token = ''
  }
  const pushSegment = () => {
    pushToken()
    if (tokens.length) segments.push(tokens)
    tokens = []
  }
  for (let i = 0; i < command.length; i++) {
    const ch = command[i]
    if (quote) {
      if (ch === quote) quote = null
      else token += ch
    } else if (ch === '"' || ch === "'") {
      quote = ch
    } else if (ch === ';' || ch === '&' || ch === '|' || ch === '\n') {
      pushSegment()
    } else if (/\s/.test(ch)) {
      pushToken()
    } else {
      token += ch
    }
  }
  pushSegment()
  return segments
}

// Global git options that take a separate value argument.
const OPTIONS_WITH_VALUE = new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace'])

// Returns { subcommand, args, dir } when the segment invokes git, else null.
const parseGit = (tokens) => {
  const gitIndex = tokens.findIndex((t) => /(^|[\\/])git(\.exe)?$/i.test(t))
  if (gitIndex === -1) return null
  // Only treat it as git when it is the command, not an argument (e.g. `echo git push`).
  const before = tokens.slice(0, gitIndex)
  if (!before.every((t) => /^\w+=/.test(t) || t === '&' || t === 'command')) return null
  let dir = null
  let i = gitIndex + 1
  while (i < tokens.length && tokens[i].startsWith('-')) {
    if (OPTIONS_WITH_VALUE.has(tokens[i])) {
      if (tokens[i] === '-C') dir = tokens[i + 1]
      i += 2
    } else {
      i += 1
    }
  }
  if (i >= tokens.length) return null
  return { subcommand: tokens[i], args: tokens.slice(i + 1), dir }
}

const has = (args, ...flags) => args.some((a) => flags.includes(a))
const hasShortFlag = (args, letter) => args.some((a) => /^-[a-zA-Z]+$/.test(a) && a.includes(letter))

const currentBranch = (cwd) => {
  try {
    return execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return null
  }
}

const check = (git, cwd, branchMayChange) => {
  const { subcommand: sub, args } = git
  if (has(args, '--no-verify')) return '--no-verify is not allowed; fix the failing hook instead.'

  switch (sub) {
    case 'add':
      if (has(args, '.', '-A', '--all', '*', ':/') || hasShortFlag(args, 'A'))
        return 'Indiscriminate staging (git add . / -A / --all) is not allowed. Stage the task\'s files explicitly by path.'
      return null
    case 'commit': {
      if (has(args, '--amend')) return 'git commit --amend is not allowed; create a new commit instead.'
      if (has(args, '--all') || hasShortFlag(args, 'a'))
        return 'git commit -a stages every tracked change. Stage the task\'s files explicitly, then commit.'
      if (!branchMayChange) {
        const branch = currentBranch(git.dir ?? cwd)
        if (branch && PROTECTED_BRANCHES.has(branch))
          return `Committing directly on protected branch "${branch}" is not allowed. Create a task branch first.`
        if (branch === 'HEAD') return 'HEAD is detached; switch to a task branch before committing.'
      }
      return null
    }
    case 'push':
      return 'git push is not allowed from Claude. The user pushes manually.'
    case 'merge':
    case 'rebase':
    case 'cherry-pick':
    case 'filter-branch':
    case 'filter-repo':
    case 'replace':
      return `git ${sub} is not allowed from Claude. Ask the user to run it.`
    case 'reset':
      if (has(args, '--hard', '--merge', '--keep')) return `git reset ${args.join(' ')} can discard work and is not allowed.`
      if (args.some((a) => /^(HEAD)?[~^]/.test(a) || /^HEAD[~^@]/.test(a)))
        return 'Moving HEAD with git reset rewrites history and is not allowed.'
      return null
    case 'clean':
      return 'git clean deletes untracked files and is not allowed.'
    case 'checkout':
      if (has(args, '--', '.', '-f', '--force') || has(args, '-p', '--patch'))
        return 'git checkout on paths / --force can discard uncommitted changes and is not allowed.'
      return null
    case 'restore':
      if (!has(args, '--staged', '-S') || has(args, '--worktree', '-W'))
        return 'git restore on the working tree discards changes. Only `git restore --staged <path>` is allowed.'
      return null
    case 'switch':
      if (has(args, '-f', '--force', '--discard-changes')) return 'git switch --force/--discard-changes is not allowed.'
      return null
    case 'stash':
      if (args.length && has([args[0]], 'list', 'show')) return null
      return 'git stash moves or drops the user\'s uncommitted changes and is not allowed. Leave them in place and stage only the task\'s files.'
    case 'branch':
      if (has(args, '-D', '-f', '--force', '-M', '-C') || (has(args, '-d', '--delete') && has(args, '-r', '--remotes')))
        return 'Force-deleting, overwriting or renaming branches is not allowed.'
      return null
    case 'tag':
      if (has(args, '-d', '--delete', '-f', '--force')) return 'Deleting or overwriting tags is not allowed.'
      return null
    case 'update-ref':
    case 'gc':
    case 'prune':
    case 'reflog':
      if (sub === 'reflog' && !has(args, 'expire', 'delete')) return null
      return `git ${sub} can destroy history and is not allowed.`
    case 'init':
      return 'Initializing a repository needs explicit user authorization.'
    default:
      return null
  }
}

const main = async () => {
  let input
  try {
    input = JSON.parse(await readStdin())
  } catch {
    process.exit(0) // Malformed input: don't block unrelated work.
  }
  const command = input?.tool_input?.command
  if (typeof command !== 'string' || !/\b(gh|git)\b/.test(command)) process.exit(0)

  const cwd = input.cwd || process.cwd()
  let branchMayChange = false
  for (const tokens of parseSegments(command)) {
    if (/(^|[\\/])gh(\.exe)?$/i.test(tokens[0]) && tokens[1] === 'pr' && ['create', 'merge'].includes(tokens[2])) {
      process.stderr.write('git-guard: creating or merging pull requests is not allowed from Claude.\n')
      process.exit(2)
    }
    const git = parseGit(tokens)
    if (!git) continue
    const problem = check(git, cwd, branchMayChange)
    if (problem) {
      process.stderr.write(`git-guard: ${problem}\n(Blocked command: ${tokens.join(' ')})\n`)
      process.exit(2)
    }
    if (git.subcommand === 'checkout' || git.subcommand === 'switch') branchMayChange = true
  }
  process.exit(0)
}

main()
