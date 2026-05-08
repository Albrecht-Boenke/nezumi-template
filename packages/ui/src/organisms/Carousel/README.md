# Carousel — Component Tokens

> Design-token contract for the `Carousel` component.

## Token Definitions

```css
/* Carousel component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-carousel-surface: var(--color-surface-raised);
  --color-carousel-surface-muted: var(--color-surface-muted);
  --color-carousel-text: var(--color-text);
  --color-carousel-text-muted: var(--color-text-muted);
  --color-carousel-border: var(--color-border);
  --color-carousel-ring: var(--color-ring);
  --spacing-carousel-gap: var(--spacing-8);
  --spacing-carousel-padding-x: var(--spacing-16);
  --spacing-carousel-padding-y: var(--spacing-12);
  --spacing-carousel-icon: var(--spacing-16);
  --radius-carousel: var(--radius-md);
  --shadow-carousel: var(--shadow-none);
  --text-carousel: 0.875rem;
  --font-weight-carousel: var(--font-weight-regular);
  --leading-carousel: 1.5;
  --duration-carousel-hover: var(--duration-fast);
  --duration-carousel-enter: var(--duration-normal);
  --duration-carousel-exit: var(--duration-fast);
  --ease-carousel-standard: var(--ease-in-out);
  --ease-carousel-enter: var(--ease-out);
  --ease-carousel-exit: var(--ease-in);

  /* Panel slots */
  --color-carousel-panel-surface: var(--color-surface-raised);
  --color-carousel-panel-header-surface: var(--color-surface-raised);
  --color-carousel-panel-header-text: var(--color-text);
  --color-carousel-panel-description-text: var(--color-text-muted);
  --color-carousel-panel-content-surface: var(--color-surface-raised);
  --color-carousel-panel-footer-surface: var(--color-surface-raised);
  --spacing-carousel-panel-header-gap: var(--spacing-8);
  --spacing-carousel-panel-header-padding-x: var(--spacing-24);
  --spacing-carousel-panel-header-padding-y: var(--spacing-24);
  --spacing-carousel-panel-content-gap: var(--spacing-16);
  --spacing-carousel-panel-content-padding-x: var(--spacing-24);
  --spacing-carousel-panel-content-padding-y: var(--spacing-16);
  --spacing-carousel-panel-footer-gap: var(--spacing-8);
  --spacing-carousel-panel-footer-padding-x: var(--spacing-24);
  --spacing-carousel-panel-footer-padding-y: var(--spacing-24);
  --radius-carousel-panel-header: var(--radius-md);
  --radius-carousel-panel-content: var(--radius-md);
  --radius-carousel-panel-footer: var(--radius-md);
  --shadow-carousel-panel-elevated: var(--shadow-sm);
  --shadow-carousel-panel-floating: var(--shadow-md);

  /* Interaction states */
  --color-carousel-hover-surface: var(--color-surface-muted);
  --color-carousel-hover-text: var(--color-text);
  --color-carousel-active-surface: var(--color-surface-raised-subtle);
  --color-carousel-active-text: var(--color-text);
  --color-carousel-selected-surface: var(--color-brand);
  --color-carousel-selected-text: var(--color-on-brand);
  --color-carousel-disabled-surface: var(--color-surface-muted);
  --color-carousel-disabled-text: var(--color-text-muted);
  --color-carousel-focus-ring: var(--color-ring);
  --spacing-carousel-action-height-sm: var(--spacing-32);
  --spacing-carousel-action-height-md: var(--spacing-40);
  --spacing-carousel-action-height-lg: var(--spacing-48);
  --spacing-carousel-action-padding-x-sm: var(--spacing-12);
  --spacing-carousel-action-padding-x-md: var(--spacing-16);
  --spacing-carousel-action-padding-x-lg: var(--spacing-24);
  --radius-carousel-action: var(--radius-md);

  /* Collection structure */
  --spacing-carousel-collection-list-gap: var(--spacing-4);
  --spacing-carousel-collection-group-gap: var(--spacing-8);
  --spacing-carousel-collection-group-padding-x: var(--spacing-8);
  --spacing-carousel-collection-group-padding-y: var(--spacing-8);
  --spacing-carousel-collection-item-gap: var(--spacing-8);
  --spacing-carousel-collection-item-padding-x: var(--spacing-12);
  --spacing-carousel-collection-item-padding-y: var(--spacing-8);
  --spacing-carousel-collection-separator-size: var(--spacing-1);
  --color-carousel-collection-separator: var(--color-border);
  --color-carousel-collection-label-text: var(--color-text-muted);
  --text-carousel-collection-label: 0.75rem;
  --font-weight-carousel-collection-label: var(--font-weight-medium);

  /* Media slot tokens */
  --color-carousel-media-surface: var(--color-surface-muted);
  --color-carousel-media-text: var(--color-text-muted);
  --spacing-carousel-media-size-sm: var(--spacing-32);
  --spacing-carousel-media-size-md: var(--spacing-40);
  --spacing-carousel-media-size-lg: var(--spacing-56);
  --spacing-carousel-media-gap: var(--spacing-12);
  --radius-carousel-media: var(--radius-md);
  --shadow-carousel-media: var(--shadow-none);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
