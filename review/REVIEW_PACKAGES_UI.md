# Packages UI Review — aktueller Restbestand

**Stand:** 2026-05-07

Abgearbeitete und widerlegte Findings wurden entfernt. Details zur Validierung stehen in [`../AI_SLOP_REVIEW_VALIDATION.md`](../AI_SLOP_REVIEW_VALIDATION.md).

## Erledigt

- Button nutzt `@radix-ui/react-slot`, `data-slot="button"` und Default `type="button"`.
- Button unterstützt DESIGN-kompatible Varianten (`default`, `tonal`, `elevated`) und hält `primary`/`secondary` als Aliase.
- Die Radix-Monolith-Abhängigkeit wurde durch `@radix-ui/react-slot` ersetzt.
- Nicht konsumierte generische Button-Tokens wurden entfernt; Button behält nur genutzte Interaction-Tokens.
- Card nutzt Tailwind-v4-Theme-Namespaces (`bg-card`, `border-card-border`, `rounded-card`, `p-card`) und `data-slot`-Attribute.
- Redundante `--space-*`-Tokens wurden aus `card.css` entfernt.
- Font-Family-Tokens wurden ergänzt und im Base-Layer genutzt.
- `html` nutzt `font-size: 100%`; Scrollbar-Dimensionen nutzen `--spacing-8`.
- Public leaf exports für `box`, `container`, `flex`, `grid`, `section` werden auch durch `tsup` gebaut.

## Noch offen

- `Button.test.tsx` nutzt weiter ein manuelles React-Root-Testharness statt Testing Library.
- `input.css` ist noch ohne zugehörige Input-Komponente.
- Layout-Responsive-/Dimension-Helper bleiben teilweise dupliziert.
- Das polymorphe Layout-Typing bildet element-spezifische Props noch nicht vollständig ab.
- Card und Layout-Komponenten brauchen zusätzliche Tests.
- `.DS_Store` im Source-Tree sollte in einem separaten Git-Cleanup aus dem Index entfernt werden, falls getrackt.
