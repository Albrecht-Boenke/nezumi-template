# Textarea — Component Tokens

> Design-token contract for the `Textarea` component.

## Token Definitions

```css
/* Textarea component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/textarea.css */
@theme {
  /* Geometry */
  --spacing-textarea-padding-x: var(--spacing-16);
  --spacing-textarea-padding-y: var(--spacing-12);
  --spacing-textarea-min: var(--spacing-80);
  --radius-textarea: var(--radius-md);

  /* Colors */
  --color-textarea-border: var(--color-border);
  --color-textarea-surface: var(--color-surface-raised);
  --color-textarea-text: var(--color-text);
  --color-textarea-placeholder: var(--color-text-muted);
  --color-textarea-ring: var(--color-ring);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
