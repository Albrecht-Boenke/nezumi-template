# Toast — Component Tokens

> Design-token contract for the `Toast` component.

## Token Definitions

```css
/* Toast component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/toast.css */
@theme {
  /* Root geometry */
  --radius-toast: var(--radius-md);
  --spacing-toast-padding: var(--spacing-16);
  --shadow-toast: var(--shadow-md);

  /* Default */
  --color-toast-surface: var(--color-surface-raised);
  --color-toast-border: var(--color-border);
  --color-toast-text: var(--color-text);

  /* Title & description */
  --color-toast-title-text: var(--color-text);
  --color-toast-description-text: var(--color-text-muted);

  /* Success */
  --color-toast-success-surface: var(--color-success-bg);
  --color-toast-success-border: var(--color-success);
  --color-toast-success-text: var(--color-success);

  /* Warning */
  --color-toast-warning-surface: var(--color-warning-bg);
  --color-toast-warning-border: var(--color-warning);
  --color-toast-warning-text: var(--color-warning);

  /* Error */
  --color-toast-error-surface: var(--color-error-bg);
  --color-toast-error-border: var(--color-error);
  --color-toast-error-text: var(--color-error);

  /* Info */
  --color-toast-info-surface: var(--color-info-bg);
  --color-toast-info-border: var(--color-info);
  --color-toast-info-text: var(--color-info);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
