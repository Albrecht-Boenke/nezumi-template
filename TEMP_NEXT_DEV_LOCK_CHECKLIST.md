# Temporary Next Dev Lock Checklist

- [x] Read root `AGENTS.md`.
- [x] Read relevant local Next.js and project documentation indexes.
- [x] Read official Next.js 16.2 AI blog section about the dev server lock file.
- [ ] Reproduce one running `next dev apps/homepage` process and inspect its `.next/dev/lock` file.
- [ ] Start a second `next dev apps/homepage` process and capture the expected actionable lock-file error.
- [ ] Confirm `next-browser` is a separate daemon/socket mechanism and does not use the Next.js dev-server lock file.
- [ ] Update root report with the corrected lock-file explanation and verification.
- [ ] Remove this temporary checklist.
