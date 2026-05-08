# Input — Component Tokens

> Design-token contract for the `Input` component.

## Token Definitions

```css
/* Input component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/input.css */
@theme {
  /* Geometry */
  --spacing-input-height: var(--spacing-40);
  --spacing-input-padding-x: var(--spacing-16);
  --spacing-input-padding-y: var(--spacing-12);
  --radius-input: var(--radius-md);

  /* Colors */
  --color-input-border: var(--color-border);
  --color-input-surface: var(--color-surface-raised);
  --color-input-text: var(--color-text);
  --color-input-placeholder: var(--color-text-muted);
  --color-input-ring: var(--color-ring);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
