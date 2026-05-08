# Tooltip — Component Tokens

> Design-token contract for the `Tooltip` component.

## Token Definitions

```css
/* Tooltip component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/tooltip.css */
@theme {
  /* Geometry */
  --radius-tooltip: var(--radius-md);
  --spacing-tooltip-padding-x: var(--spacing-16);
  --spacing-tooltip-padding-y: var(--spacing-12);
  --shadow-tooltip: var(--shadow-md);

  /* Colors */
  --color-tooltip-border: var(--color-border);
  --color-tooltip-surface: var(--color-surface-raised);
  --color-tooltip-text: var(--color-text);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
