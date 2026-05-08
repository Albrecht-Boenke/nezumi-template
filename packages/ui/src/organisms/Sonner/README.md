# Sonner — Component Tokens

> Design-token contract for the `Sonner` component.

## Token Definitions

```css
/* Sonner component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/sonner.css */
@theme {
  /* Root geometry */
  --radius-sonner: var(--radius-md);
  --shadow-sonner: var(--shadow-lg);

  /* Default */
  --color-sonner-surface: var(--color-surface-raised);
  --color-sonner-border: var(--color-border);
  --color-sonner-text: var(--color-text);
  --color-sonner-description: var(--color-text-muted);

  /* Action & cancel buttons */
  --color-sonner-action-bg: var(--color-brand);
  --color-sonner-action-text: var(--color-on-brand);
  --color-sonner-cancel-bg: var(--color-surface-muted);
  --color-sonner-cancel-text: var(--color-text);

  /* Error */
  --color-sonner-error-surface: var(--color-error-bg);
  --color-sonner-error-text: var(--color-error);
  --color-sonner-error-border: var(--color-error);

  /* Success */
  --color-sonner-success-surface: var(--color-success-bg);
  --color-sonner-success-text: var(--color-success);
  --color-sonner-success-border: var(--color-success);

  /* Warning */
  --color-sonner-warning-surface: var(--color-warning-bg);
  --color-sonner-warning-text: var(--color-warning);
  --color-sonner-warning-border: var(--color-warning);

  /* Info */
  --color-sonner-info-surface: var(--color-info-bg);
  --color-sonner-info-text: var(--color-info);
  --color-sonner-info-border: var(--color-info);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
