# HoverCard — Component Tokens

> Design-token contract for the `HoverCard` component.

## Token Definitions

```css
/* HoverCard component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-hover-card-surface: var(--color-surface-raised);
  --color-hover-card-surface-muted: var(--color-surface-muted);
  --color-hover-card-text: var(--color-text);
  --color-hover-card-text-muted: var(--color-text-muted);
  --color-hover-card-border: var(--color-border);
  --color-hover-card-ring: var(--color-ring);
  --spacing-hover-card-gap: var(--spacing-8);
  --spacing-hover-card-padding-x: var(--spacing-16);
  --spacing-hover-card-padding-y: var(--spacing-12);
  --spacing-hover-card-icon: var(--spacing-16);
  --radius-hover-card: var(--radius-md);
  --shadow-hover-card: var(--shadow-none);
  --text-hover-card: 0.875rem;
  --font-weight-hover-card: var(--font-weight-regular);
  --leading-hover-card: 1.5;
  --duration-hover-card-hover: var(--duration-fast);
  --duration-hover-card-enter: var(--duration-normal);
  --duration-hover-card-exit: var(--duration-fast);
  --ease-hover-card-standard: var(--ease-in-out);
  --ease-hover-card-enter: var(--ease-out);
  --ease-hover-card-exit: var(--ease-in);

  /* Overlay and portal tokens */
  --color-hover-card-overlay: color-mix(in oklch, var(--color-text) 55%, var(--color-surface));
  --blur-hover-card-overlay: var(--blur-xs);
  --color-hover-card-portal-surface: var(--color-popover);
  --color-hover-card-portal-text: var(--color-popover-foreground);
  --color-hover-card-portal-border: var(--color-border);
  --color-hover-card-portal-ring: var(--color-ring);
  --shadow-hover-card-portal: var(--shadow-lg);
  --radius-hover-card-portal: var(--radius-lg);
  --spacing-hover-card-portal-gap: var(--spacing-16);
  --spacing-hover-card-portal-padding-x: var(--spacing-24);
  --spacing-hover-card-portal-padding-y: var(--spacing-24);
  --spacing-hover-card-portal-min-width: var(--spacing-40);
  --spacing-hover-card-portal-max-width: var(--container-lg);
  --spacing-hover-card-arrow-size: var(--spacing-8);
  --spacing-hover-card-close-size: var(--spacing-32);
  --duration-hover-card-portal-enter: var(--duration-slow);
  --duration-hover-card-portal-exit: var(--duration-fast);
  --ease-hover-card-portal-enter: var(--ease-out);
  --ease-hover-card-portal-exit: var(--ease-in);

  /* Panel slots */
  --color-hover-card-panel-surface: var(--color-surface-raised);
  --color-hover-card-panel-header-surface: var(--color-surface-raised);
  --color-hover-card-panel-header-text: var(--color-text);
  --color-hover-card-panel-description-text: var(--color-text-muted);
  --color-hover-card-panel-content-surface: var(--color-surface-raised);
  --color-hover-card-panel-footer-surface: var(--color-surface-raised);
  --spacing-hover-card-panel-header-gap: var(--spacing-8);
  --spacing-hover-card-panel-header-padding-x: var(--spacing-24);
  --spacing-hover-card-panel-header-padding-y: var(--spacing-24);
  --spacing-hover-card-panel-content-gap: var(--spacing-16);
  --spacing-hover-card-panel-content-padding-x: var(--spacing-24);
  --spacing-hover-card-panel-content-padding-y: var(--spacing-16);
  --spacing-hover-card-panel-footer-gap: var(--spacing-8);
  --spacing-hover-card-panel-footer-padding-x: var(--spacing-24);
  --spacing-hover-card-panel-footer-padding-y: var(--spacing-24);
  --radius-hover-card-panel-header: var(--radius-md);
  --radius-hover-card-panel-content: var(--radius-md);
  --radius-hover-card-panel-footer: var(--radius-md);
  --shadow-hover-card-panel-elevated: var(--shadow-sm);
  --shadow-hover-card-panel-floating: var(--shadow-md);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
