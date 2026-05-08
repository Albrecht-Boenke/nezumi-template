# Chart — Component Tokens

> Design-token contract for the `Chart` component.

## Token Definitions

```css
/* Chart component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-chart-surface: var(--color-surface-raised);
  --color-chart-surface-muted: var(--color-surface-muted);
  --color-chart-text: var(--color-text);
  --color-chart-text-muted: var(--color-text-muted);
  --color-chart-border: var(--color-border);
  --color-chart-ring: var(--color-ring);
  --spacing-chart-gap: var(--spacing-8);
  --spacing-chart-padding-x: var(--spacing-16);
  --spacing-chart-padding-y: var(--spacing-12);
  --spacing-chart-icon: var(--spacing-16);
  --radius-chart: var(--radius-md);
  --shadow-chart: var(--shadow-none);
  --text-chart: 0.875rem;
  --font-weight-chart: var(--font-weight-regular);
  --leading-chart: 1.5;
  --duration-chart-hover: var(--duration-fast);
  --duration-chart-enter: var(--duration-normal);
  --duration-chart-exit: var(--duration-fast);
  --ease-chart-standard: var(--ease-in-out);
  --ease-chart-enter: var(--ease-out);
  --ease-chart-exit: var(--ease-in);

  /* Panel slots */
  --color-chart-panel-surface: var(--color-surface-raised);
  --color-chart-panel-header-surface: var(--color-surface-raised);
  --color-chart-panel-header-text: var(--color-text);
  --color-chart-panel-description-text: var(--color-text-muted);
  --color-chart-panel-content-surface: var(--color-surface-raised);
  --color-chart-panel-footer-surface: var(--color-surface-raised);
  --spacing-chart-panel-header-gap: var(--spacing-8);
  --spacing-chart-panel-header-padding-x: var(--spacing-24);
  --spacing-chart-panel-header-padding-y: var(--spacing-24);
  --spacing-chart-panel-content-gap: var(--spacing-16);
  --spacing-chart-panel-content-padding-x: var(--spacing-24);
  --spacing-chart-panel-content-padding-y: var(--spacing-16);
  --spacing-chart-panel-footer-gap: var(--spacing-8);
  --spacing-chart-panel-footer-padding-x: var(--spacing-24);
  --spacing-chart-panel-footer-padding-y: var(--spacing-24);
  --radius-chart-panel-header: var(--radius-md);
  --radius-chart-panel-content: var(--radius-md);
  --radius-chart-panel-footer: var(--radius-md);
  --shadow-chart-panel-elevated: var(--shadow-sm);
  --shadow-chart-panel-floating: var(--shadow-md);

  /* Data display tokens */
  --color-chart-head-surface: var(--color-surface-muted);
  --color-chart-head-text: var(--color-text);
  --color-chart-row-surface: var(--color-surface);
  --color-chart-row-hover-surface: var(--color-surface-muted);
  --color-chart-row-selected-surface: var(--color-accent);
  --color-chart-cell-text: var(--color-text);
  --color-chart-cell-muted-text: var(--color-text-muted);
  --color-chart-cell-border: var(--color-border);
  --spacing-chart-row-height: var(--spacing-48);
  --spacing-chart-cell-padding-x: var(--spacing-16);
  --spacing-chart-cell-padding-y: var(--spacing-12);
  --spacing-chart-caption-gap: var(--spacing-8);
  --text-chart-head: 0.875rem;
  --font-weight-chart-head: var(--font-weight-medium);
  --text-chart-cell: 0.875rem;

  /* Chart palette and geometry */
  --color-chart-series-1: var(--color-brand);
  --color-chart-series-2: var(--color-secondary);
  --color-chart-series-3: var(--color-success);
  --color-chart-series-4: var(--color-warning);
  --color-chart-series-5: var(--color-info);
  --color-chart-axis: var(--color-border);
  --color-chart-grid: var(--color-border);
  --color-chart-tooltip-surface: var(--color-popover);
  --color-chart-tooltip-text: var(--color-popover-foreground);
  --spacing-chart-plot-gap: var(--spacing-16);
  --spacing-chart-legend-gap: var(--spacing-12);
  --text-chart-label: 0.75rem;
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
