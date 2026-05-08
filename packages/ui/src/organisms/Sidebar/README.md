# Sidebar — Component Tokens

> Design-token contract for the `Sidebar` component.

## Token Definitions

```css
/* Sidebar component tokens. Keep values semantic; do not place implementation here. */
@theme {
  /* Root geometry */
  --color-sidebar-surface: var(--color-surface-raised);
  --color-sidebar-border: var(--color-border);
  --spacing-sidebar-width: var(--spacing-256);
  --spacing-sidebar-collapsed-width: var(--spacing-64);

  /* Header */
  --spacing-sidebar-header-padding: var(--spacing-16);

  /* Content */
  --spacing-sidebar-content-padding: var(--spacing-16);

  /* Footer */
  --spacing-sidebar-footer-padding: var(--spacing-16);

  /* Group */
  --spacing-sidebar-group-gap: var(--spacing-8);

  /* Menu item */
  --spacing-sidebar-menu-item-gap: var(--spacing-8);
  --spacing-sidebar-menu-item-padding-x: var(--spacing-12);
  --spacing-sidebar-menu-item-padding-y: var(--spacing-8);
  --radius-sidebar-menu-item: var(--radius-md);
  --color-sidebar-menu-item-hover: var(--color-accent);
  --color-sidebar-menu-item-active: var(--color-primary);
  --color-sidebar-menu-item-text: var(--color-text);
  --color-sidebar-menu-item-text-active: var(--color-primary-foreground);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
