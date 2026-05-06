#!/usr/bin/env python3
"""
Erzeugt PROJECT_FILETREE_DOC_MAP.md im Repo-Root.
Ausführen:  python tools/generate-project-doc-map.py

Ausgeschlossen: ``node_modules/``, ``.git/``, sowie der gesamte Ordner ``docs/`` (Offline-Vendor-Spiegel — keine Auflistung im Baum).
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "PROJECT_FILETREE_DOC_MAP.md"
SKIP = frozenset({"node_modules", ".git"})


def collect_files() -> list[str]:
    found: list[str] = []
    root_resolved = ROOT.resolve()
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in sorted(dirnames) if d not in SKIP]
        # Vendor-Doku liegt unter docs/: nicht im Projektbaum listen
        if Path(dirpath).resolve() == root_resolved and "docs" in dirnames:
            dirnames.remove("docs")
        rel_dir = Path(dirpath).relative_to(ROOT).as_posix()
        for fn in sorted(filenames):
            found.append(fn if rel_dir == "." else f"{rel_dir}/{fn}")
    return sorted(found, key=lambda s: (s.casefold(), s))


def docs_hint(rel_posix: str) -> str:
    rel = rel_posix.replace("\\", "/")
    rl = rel.lower()

    if rel == "AGENTS.md":
        return "`AGENTS.md` · [docs/README.md](docs/README.md)"
    if rel == "CLAUDE.md":
        return "[AGENTS.md](AGENTS.md)"
    if rel == "OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md":
        return "[docs/README.md](docs/README.md) · Offline-Retrieval-Checkliste"
    if rel == "DOCS_STRUCTURE_CHECKLIST.md":
        return "[docs/README.md](docs/README.md) · [vendor-manifest](docs/vendor-framework-docs.md)"
    if rel == "PROJECT_FILETREE_DOC_MAP.md":
        return "*Ausgabe dieses Generators* · [docs/README.md](docs/README.md)"

    if rel == "package.json":
        return "[Turbo — Tooling-Index](docs/turbo/35-guides-tools-index.mdx) · [pnpm workspaces](https://pnpm.io/workspaces) ⚠ **pnpm kein Offline-Mirror-Ordner**"
    if rel == "pnpm-workspace.yaml":
        return "[pnpm workspaces](https://pnpm.io/workspaces) · [catalogs](https://pnpm.io/catalogs) ⚠"
    if rel == "pnpm-lock.yaml":
        return "[pnpm lockfile](https://pnpm.io/git) ⚠"

    if rel == ".cursor/rules/offline-docs-retrieval.mdc":
        return "[Cursor Rules-Doku](https://cursor.com/docs/context/rules) · [offline-docs-retrieval.mdc](.cursor/rules/offline-docs-retrieval.mdc)"
    if rel == ".cursor/rules/vendor-tailwind-offline-docs.mdc":
        return "[Cursor Rules-Doku](https://cursor.com/docs/context/rules) · [Tailwind Offline Rule](.cursor/rules/vendor-tailwind-offline-docs.mdc) · [docs/tailwind-css/INDEX.md](docs/tailwind-css/INDEX.md)"

    if rel == "packages/ui/components.json":
        return "[components.json](docs/shadcn-ui/overview/components-json.mdx) · [ui.shadcn.com/…/components-json](https://ui.shadcn.com/docs/components-json)"
    if rel == "packages/ui/package.json":
        return "[pnpm package.json](https://pnpm.io/package_json) · [Turbo internal packages](docs/turbo/08-core-concepts-internal-packages.mdx)"
    if rel == "packages/ui/tsconfig.json":
        return "[compilerOptions](docs/typescript/tsconfig/sections/compilerOptions.md) · [TS INDEX](docs/typescript/INDEX.md) · **Root-Projekt ohne eigenes Turborepo-`turbo.json` – siehe** [pnpm-workspace.yaml](pnpm-workspace.yaml)"

    if rel == "packages/ui/tsup.config.ts":
        return "[Turbo publishing libraries](docs/turbo/28-guides-publishing-libraries.mdx) ⚠ **tsup** nur online · [tsup](https://tsup.egoist.dev)"
    if rel == "packages/ui/vitest.config.ts":
        return "[Vitest + Turbo](docs/turbo/43-guides-tools-vitest.mdx) ⚠ **Vitest-Handbuch offline fehlt** · [vitest](https://vitest.dev/guide/)"

    if "/src/lib/utils.ts" in rel:
        return "[cn INDEX](docs/cn/INDEX.md) · [nezumi customization](docs/nezumi-ui/customization.md)"

    if rel.endswith((".test.ts", ".test.tsx")):
        return "[Vitest in Turbo](docs/turbo/43-guides-tools-vitest.mdx) ⚠ **Vitest Core-Doku offline fehlt**"

    if "/src/components/" in rel:
        return "[shadcn components](docs/shadcn-ui/components/index.mdx) · [React DOM](docs/react/reference/react-dom/components/index.md) · [nezumi dev](docs/nezumi-ui/06-component-development.md)"

    if "/src/atoms/" in rel:
        return "[Atomic Design nezumi](docs/nezumi-ui/03-atomic-design.md) · [shadcn radix](docs/shadcn-ui/components/radix/)"

    if "/src/layout/" in rel:
        return "[Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)"

    if "/src/molecules/" in rel or "/src/organisms/" in rel or "/src/templates/" in rel:
        return "[Atomic nezumi](docs/nezumi-ui/03-atomic-design.md)"

    if "/src/styles/" in rel:
        if "global.css" in rl:
            return "[adding-custom-styles](docs/tailwind-css/adding-custom-styles.mdx) · [design tokens v4](docs/nezumi-ui/10-design-tokens-tailwind-v4.md)"
        return "[Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)"

    if rel.endswith((".tsx", ".jsx")) and "packages/ui/src" in rel:
        return "[React INDEX](docs/react/INDEX.md) · [composition](docs/nezumi-ui/composition.md)"

    if rel.endswith(".ts") and "packages/ui/src" in rel:
        return "[TS Handbook](docs/typescript/handbook/handbook-v2/The%20Handbook.md) · [INDEX](docs/typescript/INDEX.md)"

    if "/packages/ui/dist/" in rel:
        return "*Build-Output* — gleiche Themen wie analoges `src/`-Modul"

    if rel.startswith("packages/ui/"):
        return "[nezumi README](docs/nezumi-ui/README.md)"

    if rel.startswith("packages/"):
        return "[MONOREPO](docs/nezumi-ui/MONOREPO_ARCHITECTURE.md) · [Turbo internal packages](docs/turbo/08-core-concepts-internal-packages.mdx)"

    return "[docs/README.md](docs/README.md) · [AGENTS.md](AGENTS.md)"


def build_tree(files: list[str]) -> dict[str, Any]:
    root: dict[str, Any] = {"_files": []}
    for rel in files:
        parts = rel.split("/")
        node = root
        for i, part in enumerate(parts):
            is_last = i == len(parts) - 1
            if is_last:
                node.setdefault("_files", []).append(part)
            else:
                node = node.setdefault(part, {"_files": []})
    return root


def render(node: dict[str, Any], depth: int = 0) -> list[str]:
    lines: list[str] = []
    indent = "  " * depth

    subdirs = sorted([k for k in node if k != "_files"], key=str.casefold)
    files_here = sorted(node.get("_files", []), key=str.casefold)

    for d in subdirs:
        lines.append(f"{indent}- **{d}/**")
        lines.extend(render(node[d], depth + 1))

    for fn in files_here:
        # reconstruct path from walk - we need full path: pass parent chain
        lines.append(f"{indent}- `{fn}`")

    return lines


def render_with_paths(node: dict[str, Any], prefix: tuple[str, ...] = ()) -> list[str]:
    out: list[str] = []
    indent = "  " * len(prefix)

    subdirs = sorted((k for k in node if k != "_files"), key=str.casefold)
    files_here = sorted(node.get("_files", []), key=str.casefold)

    for d in subdirs:
        out.append(f"{indent}- **{d}/**")
        out.extend(render_with_paths(node[d], (*prefix, d)))

    for fn in files_here:
        rel = fn if not prefix else "/".join((*prefix, fn))
        hint = docs_hint(rel)
        out.append(f"{indent}- `{fn}` → {hint}")

    return out


def main() -> None:
    files = collect_files()
    tree = build_tree(files)
    body_lines = render_with_paths(tree)

    header = """# Projektbaum → Dokumentation (Zuordnung)

**Generator:** `python tools/generate-project-doc-map.py` aktualisiert diese Datei.  
**Ausgeschlossen aus dem Baum:** **`docs/`** (gesamte Offline‑Doku liegt dort separat — siehe [`docs/README.md`](docs/README.md)), `node_modules/`, `.git/`.  
Die **Links in der Spalte „→“** verweisen weiterhin auf passende Seiten unter **`docs/...`** (offline) bzw. auf das Web — der Baum listet nur noch **Quell- und Konfigurationsdateien** des Repos.

**Legende:**

- Links mit `docs/...` sind **Offline-Spiegel** im Repo (sofern nicht mit ⚠ markiert).
- Externe `https://` Links dienen zur **Nachprüfung** gegen die Live-Doku.
- ⚠ bedeutet: **passende Offline-Kopie liegt (noch) nicht** unter `docs/` — nur Online oder Tooling-Eigenwebsite.

---

## Bekannte Lücken im Offline-Spiegel (Projektbezug)

| Thema im Code | Offline unter `docs/`? | Online / Tooling |
|---------------|-------------------------|-------------------|
| pnpm workspaces / catalogs / lockfile | ⚠ Nein — nur Erwähnung in Turborepo-Handbuch möglich | pnpm.io |
| Vitest (Konfiguration, APIs jenseits Turbo-Guide) | ⚠ nur [Vitest unter Turbo](docs/turbo/43-guides-tools-vitest.mdx) | vitest.dev |
| **Radix UI** Komponenten-API dieses Stacks | ⚠ nicht als Markdown-Mirror eingecheckt | [radix primitives](https://www.radix-ui.com/primitives/docs) |

## Baum (`/` = Repo-Root)

"""
    CONTENT = header + "\n".join(body_lines) + "\n"

    OUTPUT.write_text(CONTENT, encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT)} ({len(files)} entries)")


if __name__ == "__main__":
    main()
