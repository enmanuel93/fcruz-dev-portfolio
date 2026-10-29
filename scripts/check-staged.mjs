#!/usr/bin/env node
// Pre-commit sanity check for the staged changes (index only, read-only).
// Usage: npm run check:staged   — exit 0 = safe to commit, exit 1 = problems found.
import { execFileSync } from 'node:child_process'

const PROTECTED_BRANCHES = new Set(['main', 'master'])
const SECRET_FILE = /(^|\/)(\.env(?!\.example$)(\..+)?|.*\.(pem|key|p12|pfx|keystore|jks)|id_(rsa|ed25519|ecdsa)(\.pub)?|\.npmrc|credentials(\.json)?)$/i
const SECRET_CONTENT = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key'],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}\b/, 'GitHub token'],
  [/\bsk-(ant-)?[A-Za-z0-9_-]{20,}\b/, 'API secret key'],
  [/\bxox[abpr]-[A-Za-z0-9-]{10,}\b/, 'Slack token'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'Google API key'],
  [/(api[_-]?key|secret|token|passw(or)?d|private[_-]?key)\s*[:=]\s*['"][^'"\s]{8,}['"]/i, 'hard-coded credential'],
]
const LARGE_FILE_BYTES = 2 * 1024 * 1024

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trimEnd()
const lines = (text) => (text ? text.split('\n') : [])

const errors = []
const warnings = []

const branch = git('rev-parse', '--abbrev-ref', 'HEAD')
if (branch === 'HEAD') errors.push('HEAD is detached; switch to a task branch.')
else if (PROTECTED_BRANCHES.has(branch)) errors.push(`On protected branch "${branch}"; create a task branch.`)

const staged = lines(git('diff', '--cached', '--name-only', '--diff-filter=ACMRD'))
if (staged.length === 0) errors.push('Nothing is staged.')

for (const file of staged) {
  if (SECRET_FILE.test(file)) errors.push(`Staged file looks like a secret/credential file: ${file}`)
}

let currentFile = null
for (const line of lines(git('diff', '--cached', '-U0', '--no-color'))) {
  if (line.startsWith('+++ ')) {
    currentFile = line.replace(/^\+\+\+ (b\/)?/, '')
    continue
  }
  if (!line.startsWith('+') || line.startsWith('+++')) continue
  for (const [pattern, label] of SECRET_CONTENT) {
    if (pattern.test(line)) errors.push(`Possible ${label} added in ${currentFile}: ${line.slice(0, 120)}`)
  }
  if (/^\+(<{7}|={7}|>{7})( |$)/.test(line)) errors.push(`Conflict marker in ${currentFile}`)
}

// Deleted files have no staged blob to measure, so they are left out.
for (const entry of lines(git('diff', '--cached', '--numstat', '--diff-filter=d'))) {
  const [added, , file] = entry.split('\t')
  if (added === '-') {
    const size = Number(git('cat-file', '-s', `:${file}`))
    if (size > LARGE_FILE_BYTES) warnings.push(`Large binary staged (${(size / 1024 / 1024).toFixed(1)} MB): ${file}`)
  }
}

// Report what stays out of the commit so pre-existing user changes are visible.
const unstaged = lines(git('diff', '--name-only'))
const untracked = lines(git('ls-files', '--others', '--exclude-standard'))

console.log(`Branch: ${branch}`)
console.log(`Staged (${staged.length}):${staged.map((f) => `\n  + ${f}`).join('')}`)
if (unstaged.length || untracked.length) {
  console.log('Not included in this commit:')
  for (const f of unstaged) console.log(`  M ${f}`)
  for (const f of untracked) console.log(`  ? ${f}`)
}
for (const w of warnings) console.warn(`WARNING: ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`)
  process.exit(1)
}
console.log('check:staged OK')
