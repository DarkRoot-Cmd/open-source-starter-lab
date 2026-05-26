# PR Welcome Guard

This automation helps contributors feel seen when they open a pull request.

It comments once on a PR, then updates that same comment when the PR body changes.

## What It Checks

- Clear summary of what changed
- Testing or verification section
- Mentions `npm run check`
- Links an issue with `Closes #issue-number` when the PR solves one

## Why It Exists

First-time contributors often worry that they are doing something wrong. A fast, calm checklist helps them make the PR review-ready without waiting for a maintainer to type the same guidance every time.

The message should feel human:

- thank the contributor
- name the missing pieces clearly
- avoid blame
- remind them that small focused PRs are welcome

## Local Dry Run

```bash
npm run pr:welcome:dry-run
```

## Maintainer Notes

The workflow runs on `pull_request_target`, but it only reads the event payload and posts a comment. It does not run code from contributor branches.

