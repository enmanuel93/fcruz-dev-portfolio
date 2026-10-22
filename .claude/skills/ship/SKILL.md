---
name: ship
description: Implement a coding task end to end and finish with a verified local Conventional Commit on a task branch — inspect repo state, branch, implement, run lint/tests/build, review the diff, stage only the task's files, commit, verify, report. Use for /ship, and by default whenever the user asks to implement a feature, fix a bug, refactor, or otherwise change the project. Never pushes, merges, amends or opens PRs.
argument-hint: "<task description>"
---

# Ship: implement → validate → review → commit

Task: $ARGUMENTS

If no task is given, ship the work already done in this session (start at step 4).
Never `git push`, merge, rebase, amend, `stash`, `reset --hard`, `clean`, `checkout -- <path>`, open PRs, or `git init`. A `PreToolUse` hook (`.claude/hooks/git-guard.mjs`) enforces most of this; a block from it means stop and rethink, not work around it.

## 1. Inspect (before touching anything)

```bash
git rev-parse --is-inside-work-tree   # not a repo → stop, ask; never `git init`
git branch --show-current
git status --porcelain=v1 --untracked-files=all
git log --oneline -5
```

Record the **pre-existing changes** list (everything `git status` shows now). Those belong to the user: never stage, revert, stash, reformat or overwrite them. If the task requires editing a file that already has uncommitted user changes, stop and ask — the two can't be separated safely.

## 2. Branch

- On `main`/`master` (or detached HEAD): create a task branch with `git switch -c <name>`. Uncommitted user changes travel with the switch untouched — that's fine, they still won't be staged.
- Already on a non-protected branch whose purpose matches the task: stay on it. If it's clearly for unrelated work, create a new branch from the current HEAD and say so in the report.
- Naming (existing repo conventions): `manudev/feature/<kebab-name>` for features, `fix/<kebab-name>` for bugs, `refactor/<kebab-name>` for refactors, `docs/<kebab-name>`, `test/<kebab-name>`, `chore/<kebab-name>`.
- Never `git switch` if it would fail or force due to conflicting local changes — stop and explain.

## 3. Implement

Follow `CLAUDE.md` (content in `src/data/`, layering rules, `@/` imports, `ReactElement` return types, `import type`). Add or update tests in `tests/unit/` for behavior changes. Keep the change scoped to the task.

## 4. Validate

```bash
npm run verify     # = npm run lint && npm test && npm run build (build includes tsc -b)
```

- Any failure: fix it if it's caused by this task, then re-run the full `verify`. If it's pre-existing or you can't fix it safely, **do not commit** — report the exact failing output and ask how to proceed.
- To tell whether a failure is pre-existing, compare against the result on the unmodified code only by reasoning/reading — never by stashing or resetting.

## 5. Review the diff

```bash
git status --porcelain=v1 --untracked-files=all
git diff -- <each file you changed>
```

Check: only task-related hunks; no debug leftovers, commented-out code, `console.log`; no secrets, tokens, `.env*` files, credentials; no unexpected files (lockfile churn, `dist/`, editor files). Files from the pre-existing list are excluded even if they appear modified.

## 6. Stage only the task's files

```bash
git add -- path/one.ts path/two.tsx      # explicit paths only
npm run check:staged                      # branch, secrets, .env, conflict markers, large binaries
git diff --cached --stat
```

Never `git add .`, `-A`, `--all`, `git commit -a`. If a file mixes task changes with pre-existing user hunks, stop and ask (don't use interactive `-p`). If `check:staged` fails, unstage the offending path with `git restore --staged -- <path>` and re-check, or stop and report.

## 7. Commit (Conventional Commits)

`<type>(<optional scope>): <imperative summary, lower case, ≤72 chars, no period>`
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `chore`, `build`, `ci`. Add a body (what/why) when the summary isn't enough. Use one commit per logical change; split into several commits if the task naturally has independent parts.

```bash
git commit -F- <<'EOF'
feat(contact): validate email before sending

Explain why, if useful.

Co-Authored-By: <attribution line from the session's system reminder, if any>
EOF
```

If a git hook rejects the commit, fix the cause and create the commit again (never `--no-verify`, never `--amend`).

## 8. Verify

```bash
git log -1 --stat --format='%H%n%s'
git status --porcelain=v1 --untracked-files=all   # remaining entries must be exactly the pre-existing ones
```

## 9. Report

- Branch (and whether it was created)
- Commit hash (short) and message
- Summary of the change and files committed
- Validation results: lint / tests (counts) / build — pass or fail with output
- Files intentionally left uncommitted (pre-existing user changes)
- Reminder that nothing was pushed
