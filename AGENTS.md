# AGENTS.md

## Documentation-First Rule (MANDATORY)

YOUR KNOWLEDGE IS OUTDATED.  
Always consult the documentation that belongs to the current task before coding or making architectural decisions.

### Retrieval order (this repository)

1. Open the relevant `INDEX.md` first (single navigation root for that doc set).
2. For framework/API behavior, vendor docs have priority:
   - `docs/react/INDEX.md`
   - `docs/nextjs/INDEX.md`
   - `docs/typescript/INDEX.md`
   - `docs/tailwind-css/INDEX.md`
   - `docs/shadcn-ui/INDEX.md`
   - `docs/turbo/INDEX.md`
   - `docs/cn/INDEX.md`
3. Use `docs/nezumi-ui/INDEX.md` as project-specific guidance and supplement
   until `docs/nezumi-ui/` is explicitly declared full SSOT.
4. After docs lookup, verify against the actual code in `packages/` and related apps.
5. If behavior is still ambiguous, verify with official online framework docs.

Do not rely on model memory alone.