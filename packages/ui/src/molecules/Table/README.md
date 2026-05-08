# Table — Component Tokens

> Design-token contract for the `Table` component.

## Token Definitions

```css
/* Table component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-table-surface: var(--color-surface-raised);
  --color-table-surface-muted: var(--color-surface-muted);
  --color-table-text: var(--color-text);
  --color-table-text-muted: var(--color-text-muted);
  --color-table-border: var(--color-border);
  --color-table-ring: var(--color-ring);
  --spacing-table-gap: var(--spacing-8);
  --spacing-table-padding-x: var(--spacing-16);
  --spacing-table-padding-y: var(--spacing-12);
  --spacing-table-icon: var(--spacing-16);
  --radius-table: var(--radius-md);
  --shadow-table: var(--shadow-none);
  --text-table: 0.875rem;
  --font-weight-table: var(--font-weight-regular);
  --leading-table: 1.5;
  --duration-table-hover: var(--duration-fast);
  --duration-table-enter: var(--duration-normal);
  --duration-table-exit: var(--duration-fast);
  --ease-table-standard: var(--ease-in-out);
  --ease-table-enter: var(--ease-out);
  --ease-table-exit: var(--ease-in);

  /* Panel slots */
  --color-table-panel-surface: var(--color-surface-raised);
  --color-table-panel-header-surface: var(--color-surface-raised);
  --color-table-panel-header-text: var(--color-text);
  --color-table-panel-description-text: var(--color-text-muted);
  --color-table-panel-content-surface: var(--color-surface-raised);
  --color-table-panel-footer-surface: var(--color-surface-raised);
  --spacing-table-panel-header-gap: var(--spacing-8);
  --spacing-table-panel-header-padding-x: var(--spacing-24);
  --spacing-table-panel-header-padding-y: var(--spacing-24);
  --spacing-table-panel-content-gap: var(--spacing-16);
  --spacing-table-panel-content-padding-x: var(--spacing-24);
  --spacing-table-panel-content-padding-y: var(--spacing-16);
  --spacing-table-panel-footer-gap: var(--spacing-8);
  --spacing-table-panel-footer-padding-x: var(--spacing-24);
  --spacing-table-panel-footer-padding-y: var(--spacing-24);
  --radius-table-panel-header: var(--radius-md);
  --radius-table-panel-content: var(--radius-md);
  --radius-table-panel-footer: var(--radius-md);
  --shadow-table-panel-elevated: var(--shadow-sm);
  --shadow-table-panel-floating: var(--shadow-md);

  /* Data display tokens */
  --color-table-head-surface: var(--color-surface-muted);
  --color-table-head-text: var(--color-text);
  --color-table-row-surface: var(--color-surface);
  --color-table-row-hover-surface: var(--color-surface-muted);
  --color-table-row-selected-surface: var(--color-accent);
  --color-table-cell-text: var(--color-text);
  --color-table-cell-muted-text: var(--color-text-muted);
  --color-table-cell-border: var(--color-border);
  --spacing-table-row-height: var(--spacing-48);
  --spacing-table-cell-padding-x: var(--spacing-16);
  --spacing-table-cell-padding-y: var(--spacing-12);
  --spacing-table-caption-gap: var(--spacing-8);
  --text-table-head: 0.875rem;
  --font-weight-table-head: var(--font-weight-medium);
  --text-table-cell: 0.875rem;
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
