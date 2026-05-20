# First Issue Fit Finder

Beginners often get stuck before writing any code:

- "I know JavaScript, but which issue should I pick?"
- "Is this issue already taken?"
- "What command should I run first?"
- "What proof should I put in the pull request?"

The First Issue Fit Finder answers those questions from the command line.

## Run It

```bash
npm run build
node dist/src/cli.js fit --skill docs --time 30m
```

Supported skills:

- `html-css`
- `javascript`
- `python`
- `docs`
- `testing`
- `git`

Supported time budgets:

- `15m`
- `30m`
- `1h`

## Example

```bash
node dist/src/cli.js fit --skill javascript --time 1h
```

The command returns:

- the best issue path
- an unassigned issue search link
- the first command to run
- a proof checklist
- a comment template the contributor can paste before starting

## Why This Helps

Many first-time contributors do not fail because they cannot code. They fail because the repo gives them too many unclear choices.

This tool turns "find a good first issue" into a smaller decision:

```text
What do I know?
How much time do I have?
What proof should my PR show?
```

That makes the first contribution feel possible.
