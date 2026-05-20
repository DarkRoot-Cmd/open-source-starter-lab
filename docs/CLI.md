# CLI Guide

The CLI gives beginners and maintainers a quick checklist.

## Beginner Checklist

```bash
node dist/src/cli.js check --profile beginner
```

Use this before opening a first pull request.

## Maintainer Checklist

```bash
node dist/src/cli.js check --profile maintainer
```

Use this before inviting contributors.

## Starter Issue Ideas

```bash
node dist/src/cli.js issues
```

This prints issue ideas with labels, difficulty, goals, and acceptance criteria.

## First Issue Fit Finder

```bash
node dist/src/cli.js fit --skill docs --time 30m
node dist/src/cli.js fit --skill javascript --time 1h
```

Use this when you are not sure which issue to pick. It suggests a skill-based path, an unassigned issue search, the first command to run, a proof checklist, and a comment you can paste before starting.
