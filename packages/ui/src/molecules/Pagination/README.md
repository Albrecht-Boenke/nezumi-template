# Pagination — Component Tokens

> Design-token contract for the `Pagination` component.

## Token Definitions

```css
/* Pagination component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-pagination-surface: var(--color-surface-raised);
  --color-pagination-surface-muted: var(--color-surface-muted);
  --color-pagination-text: var(--color-text);
  --color-pagination-text-muted: var(--color-text-muted);
  --color-pagination-border: var(--color-border);
  --color-pagination-ring: var(--color-ring);
  --spacing-pagination-gap: var(--spacing-8);
  --spacing-pagination-padding-x: var(--spacing-16);
  --spacing-pagination-padding-y: var(--spacing-12);
  --spacing-pagination-icon: var(--spacing-16);
  --radius-pagination: var(--radius-md);
  --shadow-pagination: var(--shadow-none);
  --text-pagination: 0.875rem;
  --font-weight-pagination: var(--font-weight-regular);
  --leading-pagination: 1.5;
  --duration-pagination-hover: var(--duration-fast);
  --duration-pagination-enter: var(--duration-normal);
  --duration-pagination-exit: var(--duration-fast);
  --ease-pagination-standard: var(--ease-in-out);
  --ease-pagination-enter: var(--ease-out);
  --ease-pagination-exit: var(--ease-in);

  /* Navigation tokens */
  --color-pagination-link-text: var(--color-text);
  --color-pagination-link-muted-text: var(--color-text-muted);
  --color-pagination-link-hover-surface: var(--color-accent);
  --color-pagination-link-hover-text: var(--color-accent-foreground);
  --color-pagination-link-active-surface: var(--color-primary);
  --color-pagination-link-active-text: var(--color-primary-foreground);
  --color-pagination-indicator: var(--color-primary);
  --spacing-pagination-nav-gap: var(--spacing-4);
  --spacing-pagination-nav-trigger-height: var(--spacing-40);
  --spacing-pagination-nav-trigger-padding-x: var(--spacing-12);
  --spacing-pagination-nav-trigger-padding-y: var(--spacing-8);
  --radius-pagination-nav-trigger: var(--radius-md);
  --text-pagination-nav-trigger: 0.875rem;
  --font-weight-pagination-nav-trigger: var(--font-weight-medium);

  /* Interaction states */
  --color-pagination-hover-surface: var(--color-surface-muted);
  --color-pagination-hover-text: var(--color-text);
  --color-pagination-active-surface: var(--color-surface-raised-subtle);
  --color-pagination-active-text: var(--color-text);
  --color-pagination-selected-surface: var(--color-brand);
  --color-pagination-selected-text: var(--color-on-brand);
  --color-pagination-disabled-surface: var(--color-surface-muted);
  --color-pagination-disabled-text: var(--color-text-muted);
  --color-pagination-focus-ring: var(--color-ring);
  --spacing-pagination-action-height-sm: var(--spacing-32);
  --spacing-pagination-action-height-md: var(--spacing-40);
  --spacing-pagination-action-height-lg: var(--spacing-48);
  --spacing-pagination-action-padding-x-sm: var(--spacing-12);
  --spacing-pagination-action-padding-x-md: var(--spacing-16);
  --spacing-pagination-action-padding-x-lg: var(--spacing-24);
  --radius-pagination-action: var(--radius-md);

  /* Collection structure */
  --spacing-pagination-collection-list-gap: var(--spacing-4);
  --spacing-pagination-collection-group-gap: var(--spacing-8);
  --spacing-pagination-collection-group-padding-x: var(--spacing-8);
  --spacing-pagination-collection-group-padding-y: var(--spacing-8);
  --spacing-pagination-collection-item-gap: var(--spacing-8);
  --spacing-pagination-collection-item-padding-x: var(--spacing-12);
  --spacing-pagination-collection-item-padding-y: var(--spacing-8);
  --spacing-pagination-collection-separator-size: var(--spacing-1);
  --color-pagination-collection-separator: var(--color-border);
  --color-pagination-collection-label-text: var(--color-text-muted);
  --text-pagination-collection-label: 0.75rem;
  --font-weight-pagination-collection-label: var(--font-weight-medium);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
