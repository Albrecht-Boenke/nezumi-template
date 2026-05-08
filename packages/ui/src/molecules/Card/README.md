# Card — Component Tokens

> Design-token contract for the `Card` component.

## Token Definitions

```css
/* Card component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/card.css */
@theme {
  /* Root geometry */
  --radius-card: var(--radius-lg);
  --shadow-card: var(--shadow-sm);

  /* Root colors */
  --color-card-border: var(--color-border);
  --color-card-surface: var(--color-surface-raised);
  --color-card-text: var(--color-text);

  /* Header */
  --spacing-card-header-gap: var(--spacing-8);
  --spacing-card-header-padding: var(--spacing-24);

  /* Title */
  --color-card-title-text: var(--color-text);

  /* Description */
  --color-card-description-text: var(--color-text-muted);

  /* Content */
  --spacing-card-content-padding: var(--spacing-24);

  /* Footer */
  --spacing-card-footer-padding: var(--spacing-24);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
