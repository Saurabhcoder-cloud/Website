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

If a merge or rebase against `origin/main` produces conflicts on binary files, run the command sequence below. Each flagged path will automatically prefer your branch's copy (`--ours`), which is safe because the `.gitattributes` file marks these formats as non-mergeable binaries.

```bash
git fetch origin
git merge origin/main
for f in $(git diff --name-only --diff-filter=U); do
  git checkout --ours "$f"
  git add "$f"
done
git commit -m "Resolve binary merge conflicts"
```

After committing, re-run `npm run check:binaries` to ensure no new binary assets slipped into the working tree.
