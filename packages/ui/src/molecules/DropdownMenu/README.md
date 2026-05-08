# DropdownMenu — Component Tokens

> Design-token contract for the `DropdownMenu` component.

## Token Definitions

```css
/* DropdownMenu component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-dropdown-menu-surface: var(--color-surface-raised);
  --color-dropdown-menu-surface-muted: var(--color-surface-muted);
  --color-dropdown-menu-text: var(--color-text);
  --color-dropdown-menu-text-muted: var(--color-text-muted);
  --color-dropdown-menu-border: var(--color-border);
  --color-dropdown-menu-ring: var(--color-ring);
  --spacing-dropdown-menu-gap: var(--spacing-8);
  --spacing-dropdown-menu-padding-x: var(--spacing-16);
  --spacing-dropdown-menu-padding-y: var(--spacing-12);
  --spacing-dropdown-menu-icon: var(--spacing-16);
  --radius-dropdown-menu: var(--radius-md);
  --shadow-dropdown-menu: var(--shadow-none);
  --text-dropdown-menu: 0.875rem;
  --font-weight-dropdown-menu: var(--font-weight-regular);
  --leading-dropdown-menu: 1.5;
  --duration-dropdown-menu-hover: var(--duration-fast);
  --duration-dropdown-menu-enter: var(--duration-normal);
  --duration-dropdown-menu-exit: var(--duration-fast);
  --ease-dropdown-menu-standard: var(--ease-in-out);
  --ease-dropdown-menu-enter: var(--ease-out);
  --ease-dropdown-menu-exit: var(--ease-in);

  /* Overlay and portal tokens */
  --color-dropdown-menu-overlay: color-mix(in oklch, var(--color-text) 55%, var(--color-surface));
  --blur-dropdown-menu-overlay: var(--blur-xs);
  --color-dropdown-menu-portal-surface: var(--color-popover);
  --color-dropdown-menu-portal-text: var(--color-popover-foreground);
  --color-dropdown-menu-portal-border: var(--color-border);
  --color-dropdown-menu-portal-ring: var(--color-ring);
  --shadow-dropdown-menu-portal: var(--shadow-lg);
  --radius-dropdown-menu-portal: var(--radius-lg);
  --spacing-dropdown-menu-portal-gap: var(--spacing-16);
  --spacing-dropdown-menu-portal-padding-x: var(--spacing-24);
  --spacing-dropdown-menu-portal-padding-y: var(--spacing-24);
  --spacing-dropdown-menu-portal-min-width: var(--spacing-40);
  --spacing-dropdown-menu-portal-max-width: var(--container-lg);
  --spacing-dropdown-menu-arrow-size: var(--spacing-8);
  --spacing-dropdown-menu-close-size: var(--spacing-32);
  --duration-dropdown-menu-portal-enter: var(--duration-slow);
  --duration-dropdown-menu-portal-exit: var(--duration-fast);
  --ease-dropdown-menu-portal-enter: var(--ease-out);
  --ease-dropdown-menu-portal-exit: var(--ease-in);

  /* Menu item tokens */
  --color-dropdown-menu-menu-surface: var(--color-popover);
  --color-dropdown-menu-menu-text: var(--color-popover-foreground);
  --color-dropdown-menu-menu-border: var(--color-border);
  --color-dropdown-menu-menu-item-hover-surface: var(--color-accent);
  --color-dropdown-menu-menu-item-hover-text: var(--color-accent-foreground);
  --color-dropdown-menu-menu-item-active-surface: var(--color-surface-muted);
  --color-dropdown-menu-menu-item-selected-surface: var(--color-primary);
  --color-dropdown-menu-menu-item-selected-text: var(--color-primary-foreground);
  --color-dropdown-menu-menu-item-danger-text: var(--color-destructive);
  --spacing-dropdown-menu-menu-item-height: var(--spacing-32);
  --spacing-dropdown-menu-menu-item-padding-x: var(--spacing-8);
  --spacing-dropdown-menu-menu-item-padding-y: var(--spacing-8);
  --spacing-dropdown-menu-menu-item-gap: var(--spacing-8);
  --spacing-dropdown-menu-menu-item-inset: var(--spacing-24);
  --spacing-dropdown-menu-menu-separator-size: var(--spacing-1);
  --text-dropdown-menu-menu-label: 0.75rem;
  --font-weight-dropdown-menu-menu-label: var(--font-weight-medium);
  --radius-dropdown-menu-menu-item: var(--radius-sm);

  /* Collection structure */
  --spacing-dropdown-menu-collection-list-gap: var(--spacing-4);
  --spacing-dropdown-menu-collection-group-gap: var(--spacing-8);
  --spacing-dropdown-menu-collection-group-padding-x: var(--spacing-8);
  --spacing-dropdown-menu-collection-group-padding-y: var(--spacing-8);
  --spacing-dropdown-menu-collection-item-gap: var(--spacing-8);
  --spacing-dropdown-menu-collection-item-padding-x: var(--spacing-12);
  --spacing-dropdown-menu-collection-item-padding-y: var(--spacing-8);
  --spacing-dropdown-menu-collection-separator-size: var(--spacing-1);
  --color-dropdown-menu-collection-separator: var(--color-border);
  --color-dropdown-menu-collection-label-text: var(--color-text-muted);
  --text-dropdown-menu-collection-label: 0.75rem;
  --font-weight-dropdown-menu-collection-label: var(--font-weight-medium);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
