# Item — Component Tokens

> Design-token contract for the `Item` component.

## Token Definitions

```css
/* Item component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-item-surface: var(--color-surface-raised);
  --color-item-surface-muted: var(--color-surface-muted);
  --color-item-text: var(--color-text);
  --color-item-text-muted: var(--color-text-muted);
  --color-item-border: var(--color-border);
  --color-item-ring: var(--color-ring);
  --spacing-item-gap: var(--spacing-8);
  --spacing-item-padding-x: var(--spacing-16);
  --spacing-item-padding-y: var(--spacing-12);
  --spacing-item-icon: var(--spacing-16);
  --radius-item: var(--radius-md);
  --shadow-item: var(--shadow-none);
  --text-item: 0.875rem;
  --font-weight-item: var(--font-weight-regular);
  --leading-item: 1.5;
  --duration-item-hover: var(--duration-fast);
  --duration-item-enter: var(--duration-normal);
  --duration-item-exit: var(--duration-fast);
  --ease-item-standard: var(--ease-in-out);
  --ease-item-enter: var(--ease-out);
  --ease-item-exit: var(--ease-in);

  /* Panel slots */
  --color-item-panel-surface: var(--color-surface-raised);
  --color-item-panel-header-surface: var(--color-surface-raised);
  --color-item-panel-header-text: var(--color-text);
  --color-item-panel-description-text: var(--color-text-muted);
  --color-item-panel-content-surface: var(--color-surface-raised);
  --color-item-panel-footer-surface: var(--color-surface-raised);
  --spacing-item-panel-header-gap: var(--spacing-8);
  --spacing-item-panel-header-padding-x: var(--spacing-24);
  --spacing-item-panel-header-padding-y: var(--spacing-24);
  --spacing-item-panel-content-gap: var(--spacing-16);
  --spacing-item-panel-content-padding-x: var(--spacing-24);
  --spacing-item-panel-content-padding-y: var(--spacing-16);
  --spacing-item-panel-footer-gap: var(--spacing-8);
  --spacing-item-panel-footer-padding-x: var(--spacing-24);
  --spacing-item-panel-footer-padding-y: var(--spacing-24);
  --radius-item-panel-header: var(--radius-md);
  --radius-item-panel-content: var(--radius-md);
  --radius-item-panel-footer: var(--radius-md);
  --shadow-item-panel-elevated: var(--shadow-sm);
  --shadow-item-panel-floating: var(--shadow-md);

  /* Interaction states */
  --color-item-hover-surface: var(--color-surface-muted);
  --color-item-hover-text: var(--color-text);
  --color-item-active-surface: var(--color-surface-raised-subtle);
  --color-item-active-text: var(--color-text);
  --color-item-selected-surface: var(--color-brand);
  --color-item-selected-text: var(--color-on-brand);
  --color-item-disabled-surface: var(--color-surface-muted);
  --color-item-disabled-text: var(--color-text-muted);
  --color-item-focus-ring: var(--color-ring);
  --spacing-item-action-height-sm: var(--spacing-32);
  --spacing-item-action-height-md: var(--spacing-40);
  --spacing-item-action-height-lg: var(--spacing-48);
  --spacing-item-action-padding-x-sm: var(--spacing-12);
  --spacing-item-action-padding-x-md: var(--spacing-16);
  --spacing-item-action-padding-x-lg: var(--spacing-24);
  --radius-item-action: var(--radius-md);

  /* Media slot tokens */
  --color-item-media-surface: var(--color-surface-muted);
  --color-item-media-text: var(--color-text-muted);
  --spacing-item-media-size-sm: var(--spacing-32);
  --spacing-item-media-size-md: var(--spacing-40);
  --spacing-item-media-size-lg: var(--spacing-56);
  --spacing-item-media-gap: var(--spacing-12);
  --radius-item-media: var(--radius-md);
  --shadow-item-media: var(--shadow-none);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
