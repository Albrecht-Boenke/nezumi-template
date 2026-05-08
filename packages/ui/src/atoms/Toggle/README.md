# Toggle — Component Tokens

> Design-token contract for the `Toggle` component.

## Token Definitions

```css
/* Toggle component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/toggle.css */
@theme {
  /* Geometry */
  --radius-toggle: var(--radius-md);
  --spacing-toggle-sm: var(--spacing-32);
  --spacing-toggle-md: var(--spacing-40);
  --spacing-toggle-lg: var(--spacing-48);
  --spacing-toggle-sm-x: var(--spacing-12);
  --spacing-toggle-md-x: var(--spacing-16);
  --spacing-toggle-lg-x: var(--spacing-24);

  /* Colors */
  --color-toggle-border: var(--color-border);
  --color-toggle-surface: var(--color-surface-raised);
  --color-toggle-text: var(--color-text);
  --color-toggle-ring: var(--color-ring);

  /* Interaction states */
  --color-toggle-hover-surface: var(--color-surface-muted);
  --color-toggle-hover-text: var(--color-text);
  --color-toggle-selected-surface: var(--color-brand);
  --color-toggle-selected-text: var(--color-on-brand);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
