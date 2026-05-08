# Sheet — Component Tokens

> Design-token contract for the `Sheet` component.

## Token Definitions

```css
/* Sheet component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-sheet-surface: var(--color-surface-raised);
  --color-sheet-surface-muted: var(--color-surface-muted);
  --color-sheet-text: var(--color-text);
  --color-sheet-text-muted: var(--color-text-muted);
  --color-sheet-border: var(--color-border);
  --color-sheet-ring: var(--color-ring);
  --spacing-sheet-gap: var(--spacing-8);
  --spacing-sheet-padding-x: var(--spacing-16);
  --spacing-sheet-padding-y: var(--spacing-12);
  --spacing-sheet-icon: var(--spacing-16);
  --radius-sheet: var(--radius-md);
  --shadow-sheet: var(--shadow-none);
  --text-sheet: 0.875rem;
  --font-weight-sheet: var(--font-weight-regular);
  --leading-sheet: 1.5;
  --duration-sheet-hover: var(--duration-fast);
  --duration-sheet-enter: var(--duration-normal);
  --duration-sheet-exit: var(--duration-fast);
  --ease-sheet-standard: var(--ease-in-out);
  --ease-sheet-enter: var(--ease-out);
  --ease-sheet-exit: var(--ease-in);

  /* Overlay and portal tokens */
  --color-sheet-overlay: color-mix(in oklch, var(--color-text) 55%, var(--color-surface));
  --blur-sheet-overlay: var(--blur-xs);
  --color-sheet-portal-surface: var(--color-popover);
  --color-sheet-portal-text: var(--color-popover-foreground);
  --color-sheet-portal-border: var(--color-border);
  --color-sheet-portal-ring: var(--color-ring);
  --shadow-sheet-portal: var(--shadow-lg);
  --radius-sheet-portal: var(--radius-lg);
  --spacing-sheet-portal-gap: var(--spacing-16);
  --spacing-sheet-portal-padding-x: var(--spacing-24);
  --spacing-sheet-portal-padding-y: var(--spacing-24);
  --spacing-sheet-portal-min-width: var(--spacing-40);
  --spacing-sheet-portal-max-width: var(--container-lg);
  --spacing-sheet-arrow-size: var(--spacing-8);
  --spacing-sheet-close-size: var(--spacing-32);
  --duration-sheet-portal-enter: var(--duration-slow);
  --duration-sheet-portal-exit: var(--duration-fast);
  --ease-sheet-portal-enter: var(--ease-out);
  --ease-sheet-portal-exit: var(--ease-in);

  /* Panel slots */
  --color-sheet-panel-surface: var(--color-surface-raised);
  --color-sheet-panel-header-surface: var(--color-surface-raised);
  --color-sheet-panel-header-text: var(--color-text);
  --color-sheet-panel-description-text: var(--color-text-muted);
  --color-sheet-panel-content-surface: var(--color-surface-raised);
  --color-sheet-panel-footer-surface: var(--color-surface-raised);
  --spacing-sheet-panel-header-gap: var(--spacing-8);
  --spacing-sheet-panel-header-padding-x: var(--spacing-24);
  --spacing-sheet-panel-header-padding-y: var(--spacing-24);
  --spacing-sheet-panel-content-gap: var(--spacing-16);
  --spacing-sheet-panel-content-padding-x: var(--spacing-24);
  --spacing-sheet-panel-content-padding-y: var(--spacing-16);
  --spacing-sheet-panel-footer-gap: var(--spacing-8);
  --spacing-sheet-panel-footer-padding-x: var(--spacing-24);
  --spacing-sheet-panel-footer-padding-y: var(--spacing-24);
  --radius-sheet-panel-header: var(--radius-md);
  --radius-sheet-panel-content: var(--radius-md);
  --radius-sheet-panel-footer: var(--radius-md);
  --shadow-sheet-panel-elevated: var(--shadow-sm);
  --shadow-sheet-panel-floating: var(--shadow-md);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
