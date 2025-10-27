# Binary asset audit

GitHub rejects branch updates that introduce unsupported binary artifacts. Run the helper script before pushing to confirm that t
he history is clear of disallowed assets:

```bash
npm run check:binaries
```

The script scans the entire branch history and reports any paths that match common binary extensions. As of the current branch s
napshot, the audit reports the following historical asset:

- `project/public/favicon.ico` (introduced in commit `d68f1cc`) – flagged as "only in history" because the file was deleted in `63
19255`.

This binary no longer exists in `HEAD`, so new commits are unaffected. If you must purge it from history, rewrite the branch (for
 example, using [`git filter-repo`](https://github.com/newren/git-filter-repo)) to drop `project/public/favicon.ico`, then force-p
ush the sanitized branch.

## Resolving binary merge conflicts

If a merge or rebase against `origin/main` produces conflicts on binary files, run:

```bash
npm run resolve:binaries
```

The helper wraps the same `git checkout --ours` workflow and only stages files that are marked with the `binary` attribute. After it completes, follow the printed instructions to commit the resolution and re-run `npm run check:binaries` to ensure no new binary assets slipped into the working tree.
