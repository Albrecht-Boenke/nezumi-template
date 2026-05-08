# Label — Component Tokens

> Design-token contract for the `Label` component.

## Token Definitions

```css
/* Label component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-label-surface: var(--color-surface-raised);
  --color-label-surface-muted: var(--color-surface-muted);
  --color-label-text: var(--color-text);
  --color-label-text-muted: var(--color-text-muted);
  --color-label-border: var(--color-border);
  --color-label-ring: var(--color-ring);
  --spacing-label-gap: var(--spacing-8);
  --spacing-label-padding-x: var(--spacing-16);
  --spacing-label-padding-y: var(--spacing-12);
  --spacing-label-icon: var(--spacing-16);
  --radius-label: var(--radius-md);
  --shadow-label: var(--shadow-none);
  --text-label: 0.875rem;
  --font-weight-label: var(--font-weight-regular);
  --leading-label: 1.5;
  --duration-label-hover: var(--duration-fast);
  --duration-label-enter: var(--duration-normal);
  --duration-label-exit: var(--duration-fast);
  --ease-label-standard: var(--ease-in-out);
  --ease-label-enter: var(--ease-out);
  --ease-label-exit: var(--ease-in);

  /* Typography tokens */
  --color-label-body-text: var(--color-text);
  --color-label-muted-text: var(--color-text-muted);
  --color-label-link-text: var(--color-primary);
  --text-label-h1: 2.25rem;
  --text-label-h2: 1.875rem;
  --text-label-h3: 1.5rem;
  --text-label-body: 1rem;
  --text-label-small: 0.875rem;
  --font-weight-label-heading: 600;
  --font-weight-label-body: var(--font-weight-regular);
  --leading-label-heading: 1.2;
  --leading-label-body: 1.625;
  --tracking-label-heading: 0;
  --spacing-label-paragraph-gap: var(--spacing-16);

  /* Form control tokens */
  --color-label-control-surface: var(--color-surface);
  --color-label-control-text: var(--color-text);
  --color-label-control-border: var(--color-input);
  --color-label-control-placeholder: var(--color-text-muted);
  --color-label-control-ring: var(--color-ring);
  --color-label-control-invalid-border: var(--color-error);
  --color-label-control-invalid-text: var(--color-error);
  --color-label-control-invalid-surface: var(--color-error-bg);
  --spacing-label-control-height: var(--spacing-40);
  --spacing-label-control-min-height: var(--spacing-40);
  --spacing-label-control-width: var(--spacing-128);
  --spacing-label-control-padding-x: var(--spacing-12);
  --spacing-label-control-padding-y: var(--spacing-8);
  --spacing-label-control-gap: var(--spacing-8);
  --radius-label-control: var(--radius-md);
  --text-label-placeholder: 0.875rem;
  --font-weight-label-placeholder: var(--font-weight-regular);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
