# Kbd — Component Tokens

> Design-token contract for the `Kbd` component.

## Token Definitions

```css
/* Kbd component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-kbd-surface: var(--color-surface-raised);
  --color-kbd-surface-muted: var(--color-surface-muted);
  --color-kbd-text: var(--color-text);
  --color-kbd-text-muted: var(--color-text-muted);
  --color-kbd-border: var(--color-border);
  --color-kbd-ring: var(--color-ring);
  --spacing-kbd-gap: var(--spacing-8);
  --spacing-kbd-padding-x: var(--spacing-16);
  --spacing-kbd-padding-y: var(--spacing-12);
  --spacing-kbd-icon: var(--spacing-16);
  --radius-kbd: var(--radius-md);
  --shadow-kbd: var(--shadow-none);
  --text-kbd: 0.875rem;
  --font-weight-kbd: var(--font-weight-regular);
  --leading-kbd: 1.5;
  --duration-kbd-hover: var(--duration-fast);
  --duration-kbd-enter: var(--duration-normal);
  --duration-kbd-exit: var(--duration-fast);
  --ease-kbd-standard: var(--ease-in-out);
  --ease-kbd-enter: var(--ease-out);
  --ease-kbd-exit: var(--ease-in);

  /* Panel slots */
  --color-kbd-panel-surface: var(--color-surface-raised);
  --color-kbd-panel-header-surface: var(--color-surface-raised);
  --color-kbd-panel-header-text: var(--color-text);
  --color-kbd-panel-description-text: var(--color-text-muted);
  --color-kbd-panel-content-surface: var(--color-surface-raised);
  --color-kbd-panel-footer-surface: var(--color-surface-raised);
  --spacing-kbd-panel-header-gap: var(--spacing-8);
  --spacing-kbd-panel-header-padding-x: var(--spacing-24);
  --spacing-kbd-panel-header-padding-y: var(--spacing-24);
  --spacing-kbd-panel-content-gap: var(--spacing-16);
  --spacing-kbd-panel-content-padding-x: var(--spacing-24);
  --spacing-kbd-panel-content-padding-y: var(--spacing-16);
  --spacing-kbd-panel-footer-gap: var(--spacing-8);
  --spacing-kbd-panel-footer-padding-x: var(--spacing-24);
  --spacing-kbd-panel-footer-padding-y: var(--spacing-24);
  --radius-kbd-panel-header: var(--radius-md);
  --radius-kbd-panel-content: var(--radius-md);
  --radius-kbd-panel-footer: var(--radius-md);
  --shadow-kbd-panel-elevated: var(--shadow-sm);
  --shadow-kbd-panel-floating: var(--shadow-md);

  /* Typography tokens */
  --color-kbd-body-text: var(--color-text);
  --color-kbd-muted-text: var(--color-text-muted);
  --color-kbd-link-text: var(--color-primary);
  --text-kbd-h1: 2.25rem;
  --text-kbd-h2: 1.875rem;
  --text-kbd-h3: 1.5rem;
  --text-kbd-body: 1rem;
  --text-kbd-small: 0.875rem;
  --font-weight-kbd-heading: 600;
  --font-weight-kbd-body: var(--font-weight-regular);
  --leading-kbd-heading: 1.2;
  --leading-kbd-body: 1.625;
  --tracking-kbd-heading: 0;
  --spacing-kbd-paragraph-gap: var(--spacing-16);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
