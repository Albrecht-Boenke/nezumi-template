# Separator — Component Tokens

> Design-token contract for the `Separator` component.

## Token Definitions

```css
/* Separator component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-separator-surface: var(--color-surface-raised);
  --color-separator-surface-muted: var(--color-surface-muted);
  --color-separator-text: var(--color-text);
  --color-separator-text-muted: var(--color-text-muted);
  --color-separator-border: var(--color-border);
  --color-separator-ring: var(--color-ring);
  --spacing-separator-gap: var(--spacing-8);
  --spacing-separator-padding-x: var(--spacing-16);
  --spacing-separator-padding-y: var(--spacing-12);
  --spacing-separator-icon: var(--spacing-16);
  --radius-separator: var(--radius-md);
  --shadow-separator: var(--shadow-none);
  --text-separator: 0.875rem;
  --font-weight-separator: var(--font-weight-regular);
  --leading-separator: 1.5;
  --duration-separator-hover: var(--duration-fast);
  --duration-separator-enter: var(--duration-normal);
  --duration-separator-exit: var(--duration-fast);
  --ease-separator-standard: var(--ease-in-out);
  --ease-separator-enter: var(--ease-out);
  --ease-separator-exit: var(--ease-in);

  /* Layout geometry tokens */
  --spacing-separator-min-size: var(--spacing-0);
  --spacing-separator-handle-size: var(--spacing-8);
  --color-separator-handle: var(--color-border);
  --color-separator-handle-hover: var(--color-text-muted);
  --radius-separator-container: var(--radius-md);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
