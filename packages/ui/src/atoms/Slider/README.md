# Slider — Component Tokens

> Design-token contract for the `Slider` component.

## Token Definitions

```css
/* Slider component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-slider-surface: var(--color-surface-raised);
  --color-slider-surface-muted: var(--color-surface-muted);
  --color-slider-text: var(--color-text);
  --color-slider-text-muted: var(--color-text-muted);
  --color-slider-border: var(--color-border);
  --color-slider-ring: var(--color-ring);
  --spacing-slider-gap: var(--spacing-8);
  --spacing-slider-padding-x: var(--spacing-16);
  --spacing-slider-padding-y: var(--spacing-12);
  --spacing-slider-icon: var(--spacing-16);
  --radius-slider: var(--radius-md);
  --shadow-slider: var(--shadow-none);
  --text-slider: 0.875rem;
  --font-weight-slider: var(--font-weight-regular);
  --leading-slider: 1.5;
  --duration-slider-hover: var(--duration-fast);
  --duration-slider-enter: var(--duration-normal);
  --duration-slider-exit: var(--duration-fast);
  --ease-slider-standard: var(--ease-in-out);
  --ease-slider-enter: var(--ease-out);
  --ease-slider-exit: var(--ease-in);

  /* Form control tokens */
  --color-slider-control-surface: var(--color-surface);
  --color-slider-control-text: var(--color-text);
  --color-slider-control-border: var(--color-input);
  --color-slider-control-placeholder: var(--color-text-muted);
  --color-slider-control-ring: var(--color-ring);
  --color-slider-control-invalid-border: var(--color-error);
  --color-slider-control-invalid-text: var(--color-error);
  --color-slider-control-invalid-surface: var(--color-error-bg);
  --spacing-slider-control-height: var(--spacing-40);
  --spacing-slider-control-min-height: var(--spacing-40);
  --spacing-slider-control-width: var(--spacing-128);
  --spacing-slider-control-padding-x: var(--spacing-12);
  --spacing-slider-control-padding-y: var(--spacing-8);
  --spacing-slider-control-gap: var(--spacing-8);
  --radius-slider-control: var(--radius-md);
  --text-slider-placeholder: 0.875rem;
  --font-weight-slider-placeholder: var(--font-weight-regular);

  /* Interaction states */
  --color-slider-hover-surface: var(--color-surface-muted);
  --color-slider-hover-text: var(--color-text);
  --color-slider-active-surface: var(--color-surface-raised-subtle);
  --color-slider-active-text: var(--color-text);
  --color-slider-selected-surface: var(--color-brand);
  --color-slider-selected-text: var(--color-on-brand);
  --color-slider-disabled-surface: var(--color-surface-muted);
  --color-slider-disabled-text: var(--color-text-muted);
  --color-slider-focus-ring: var(--color-ring);
  --spacing-slider-action-height-sm: var(--spacing-32);
  --spacing-slider-action-height-md: var(--spacing-40);
  --spacing-slider-action-height-lg: var(--spacing-48);
  --spacing-slider-action-padding-x-sm: var(--spacing-12);
  --spacing-slider-action-padding-x-md: var(--spacing-16);
  --spacing-slider-action-padding-x-lg: var(--spacing-24);
  --radius-slider-action: var(--radius-md);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
