# ContextMenu — Component Tokens

> Design-token contract for the `ContextMenu` component.

## Token Definitions

```css
/* ContextMenu component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-context-menu-surface: var(--color-surface-raised);
  --color-context-menu-surface-muted: var(--color-surface-muted);
  --color-context-menu-text: var(--color-text);
  --color-context-menu-text-muted: var(--color-text-muted);
  --color-context-menu-border: var(--color-border);
  --color-context-menu-ring: var(--color-ring);
  --spacing-context-menu-gap: var(--spacing-8);
  --spacing-context-menu-padding-x: var(--spacing-16);
  --spacing-context-menu-padding-y: var(--spacing-12);
  --spacing-context-menu-icon: var(--spacing-16);
  --radius-context-menu: var(--radius-md);
  --shadow-context-menu: var(--shadow-none);
  --text-context-menu: 0.875rem;
  --font-weight-context-menu: var(--font-weight-regular);
  --leading-context-menu: 1.5;
  --duration-context-menu-hover: var(--duration-fast);
  --duration-context-menu-enter: var(--duration-normal);
  --duration-context-menu-exit: var(--duration-fast);
  --ease-context-menu-standard: var(--ease-in-out);
  --ease-context-menu-enter: var(--ease-out);
  --ease-context-menu-exit: var(--ease-in);

  /* Overlay and portal tokens */
  --color-context-menu-overlay: color-mix(in oklch, var(--color-text) 55%, var(--color-surface));
  --blur-context-menu-overlay: 2px; /* Tailwind blur-xs equivalent — replace with system blur token when available */
  --color-context-menu-portal-surface: var(--color-popover);
  --color-context-menu-portal-text: var(--color-popover-foreground);
  --color-context-menu-portal-border: var(--color-border);
  --color-context-menu-portal-ring: var(--color-ring);
  --shadow-context-menu-portal: var(--shadow-lg);
  --radius-context-menu-portal: var(--radius-lg);
  --spacing-context-menu-portal-gap: var(--spacing-16);
  --spacing-context-menu-portal-padding-x: var(--spacing-24);
  --spacing-context-menu-portal-padding-y: var(--spacing-24);
  --spacing-context-menu-portal-min-width: var(--spacing-40);
  --spacing-context-menu-portal-max-width: 32rem; /* Tailwind container-lg equivalent — replace with system max-width token when available */
  --spacing-context-menu-arrow-size: var(--spacing-8);
  --spacing-context-menu-close-size: var(--spacing-32);
  --duration-context-menu-portal-enter: var(--duration-slow);
  --duration-context-menu-portal-exit: var(--duration-fast);
  --ease-context-menu-portal-enter: var(--ease-out);
  --ease-context-menu-portal-exit: var(--ease-in);

  /* Menu item tokens */
  --color-context-menu-menu-surface: var(--color-popover);
  --color-context-menu-menu-text: var(--color-popover-foreground);
  --color-context-menu-menu-border: var(--color-border);
  --color-context-menu-menu-item-hover-surface: var(--color-accent);
  --color-context-menu-menu-item-hover-text: var(--color-accent-foreground);
  --color-context-menu-menu-item-active-surface: var(--color-surface-muted);
  --color-context-menu-menu-item-selected-surface: var(--color-primary);
  --color-context-menu-menu-item-selected-text: var(--color-primary-foreground);
  --color-context-menu-menu-item-danger-text: var(--color-destructive);
  --spacing-context-menu-menu-item-height: var(--spacing-32);
  --spacing-context-menu-menu-item-padding-x: var(--spacing-8);
  --spacing-context-menu-menu-item-padding-y: var(--spacing-8);
  --spacing-context-menu-menu-item-gap: var(--spacing-8);
  --spacing-context-menu-menu-item-inset: var(--spacing-24);
  --spacing-context-menu-menu-separator-size: var(--spacing-1);
  --text-context-menu-menu-label: 0.75rem;
  --font-weight-context-menu-menu-label: var(--font-weight-medium);
  --radius-context-menu-menu-item: var(--radius-sm);

  /* Collection structure */
  --spacing-context-menu-collection-list-gap: var(--spacing-4);
  --spacing-context-menu-collection-group-gap: var(--spacing-8);
  --spacing-context-menu-collection-group-padding-x: var(--spacing-8);
  --spacing-context-menu-collection-group-padding-y: var(--spacing-8);
  --spacing-context-menu-collection-item-gap: var(--spacing-8);
  --spacing-context-menu-collection-item-padding-x: var(--spacing-12);
  --spacing-context-menu-collection-item-padding-y: var(--spacing-8);
  --spacing-context-menu-collection-separator-size: var(--spacing-1);
  --color-context-menu-collection-separator: var(--color-border);
  --color-context-menu-collection-label-text: var(--color-text-muted);
  --text-context-menu-collection-label: 0.75rem;
  --font-weight-context-menu-collection-label: var(--font-weight-medium);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
