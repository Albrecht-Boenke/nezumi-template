# Empty — Component Tokens

> Design-token contract for the `Empty` component.

## Token Definitions

```css
/* Empty component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-empty-surface: var(--color-surface-raised);
  --color-empty-surface-muted: var(--color-surface-muted);
  --color-empty-text: var(--color-text);
  --color-empty-text-muted: var(--color-text-muted);
  --color-empty-border: var(--color-border);
  --color-empty-ring: var(--color-ring);
  --spacing-empty-gap: var(--spacing-8);
  --spacing-empty-padding-x: var(--spacing-16);
  --spacing-empty-padding-y: var(--spacing-12);
  --spacing-empty-icon: var(--spacing-16);
  --radius-empty: var(--radius-md);
  --shadow-empty: var(--shadow-none);
  --text-empty: 0.875rem;
  --font-weight-empty: var(--font-weight-regular);
  --leading-empty: 1.5;
  --duration-empty-hover: var(--duration-fast);
  --duration-empty-enter: var(--duration-normal);
  --duration-empty-exit: var(--duration-fast);
  --ease-empty-standard: var(--ease-in-out);
  --ease-empty-enter: var(--ease-out);
  --ease-empty-exit: var(--ease-in);

  /* Panel slots */
  --color-empty-panel-surface: var(--color-surface-raised);
  --color-empty-panel-header-surface: var(--color-surface-raised);
  --color-empty-panel-header-text: var(--color-text);
  --color-empty-panel-description-text: var(--color-text-muted);
  --color-empty-panel-content-surface: var(--color-surface-raised);
  --color-empty-panel-footer-surface: var(--color-surface-raised);
  --spacing-empty-panel-header-gap: var(--spacing-8);
  --spacing-empty-panel-header-padding-x: var(--spacing-24);
  --spacing-empty-panel-header-padding-y: var(--spacing-24);
  --spacing-empty-panel-content-gap: var(--spacing-16);
  --spacing-empty-panel-content-padding-x: var(--spacing-24);
  --spacing-empty-panel-content-padding-y: var(--spacing-16);
  --spacing-empty-panel-footer-gap: var(--spacing-8);
  --spacing-empty-panel-footer-padding-x: var(--spacing-24);
  --spacing-empty-panel-footer-padding-y: var(--spacing-24);
  --radius-empty-panel-header: var(--radius-md);
  --radius-empty-panel-content: var(--radius-md);
  --radius-empty-panel-footer: var(--radius-md);
  --shadow-empty-panel-elevated: var(--shadow-sm);
  --shadow-empty-panel-floating: var(--shadow-md);

  /* Feedback and status tokens */
  --color-empty-info-surface: var(--color-info-bg);
  --color-empty-info-text: var(--color-info);
  --color-empty-success-surface: var(--color-success-bg);
  --color-empty-success-text: var(--color-success);
  --color-empty-warning-surface: var(--color-warning-bg);
  --color-empty-warning-text: var(--color-warning);
  --color-empty-error-surface: var(--color-error-bg);
  --color-empty-error-text: var(--color-error);
  --color-empty-error-border: var(--color-error);
  --spacing-empty-status-icon: var(--spacing-16);
  --spacing-empty-status-gap: var(--spacing-8);

  /* Media slot tokens */
  --color-empty-media-surface: var(--color-surface-muted);
  --color-empty-media-text: var(--color-text-muted);
  --spacing-empty-media-size-sm: var(--spacing-32);
  --spacing-empty-media-size-md: var(--spacing-40);
  --spacing-empty-media-size-lg: var(--spacing-56);
  --spacing-empty-media-gap: var(--spacing-12);
  --radius-empty-media: var(--radius-md);
  --shadow-empty-media: var(--shadow-none);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
