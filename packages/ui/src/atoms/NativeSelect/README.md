# NativeSelect — Component Tokens

> Design-token contract for the `NativeSelect` component.

## Token Definitions

```css
/* NativeSelect component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-native-select-surface: var(--color-surface-raised);
  --color-native-select-surface-muted: var(--color-surface-muted);
  --color-native-select-text: var(--color-text);
  --color-native-select-text-muted: var(--color-text-muted);
  --color-native-select-border: var(--color-border);
  --color-native-select-ring: var(--color-ring);
  --spacing-native-select-gap: var(--spacing-8);
  --spacing-native-select-padding-x: var(--spacing-16);
  --spacing-native-select-padding-y: var(--spacing-12);
  --spacing-native-select-icon: var(--spacing-16);
  --radius-native-select: var(--radius-md);
  --shadow-native-select: var(--shadow-none);
  --text-native-select: 0.875rem;
  --font-weight-native-select: var(--font-weight-regular);
  --leading-native-select: 1.5;
  --duration-native-select-hover: var(--duration-fast);
  --duration-native-select-enter: var(--duration-normal);
  --duration-native-select-exit: var(--duration-fast);
  --ease-native-select-standard: var(--ease-in-out);
  --ease-native-select-enter: var(--ease-out);
  --ease-native-select-exit: var(--ease-in);

  /* Form control tokens */
  --color-native-select-control-surface: var(--color-surface);
  --color-native-select-control-text: var(--color-text);
  --color-native-select-control-border: var(--color-input);
  --color-native-select-control-placeholder: var(--color-text-muted);
  --color-native-select-control-ring: var(--color-ring);
  --color-native-select-control-invalid-border: var(--color-error);
  --color-native-select-control-invalid-text: var(--color-error);
  --color-native-select-control-invalid-surface: var(--color-error-bg);
  --spacing-native-select-control-height: var(--spacing-40);
  --spacing-native-select-control-min-height: var(--spacing-40);
  --spacing-native-select-control-width: var(--spacing-128);
  --spacing-native-select-control-padding-x: var(--spacing-12);
  --spacing-native-select-control-padding-y: var(--spacing-8);
  --spacing-native-select-control-gap: var(--spacing-8);
  --radius-native-select-control: var(--radius-md);
  --text-native-select-placeholder: 0.875rem;
  --font-weight-native-select-placeholder: var(--font-weight-regular);

  /* Interaction states */
  --color-native-select-hover-surface: var(--color-surface-muted);
  --color-native-select-hover-text: var(--color-text);
  --color-native-select-active-surface: var(--color-surface-raised-subtle);
  --color-native-select-active-text: var(--color-text);
  --color-native-select-selected-surface: var(--color-brand);
  --color-native-select-selected-text: var(--color-on-brand);
  --color-native-select-disabled-surface: var(--color-surface-muted);
  --color-native-select-disabled-text: var(--color-text-muted);
  --color-native-select-focus-ring: var(--color-ring);
  --spacing-native-select-action-height-sm: var(--spacing-32);
  --spacing-native-select-action-height-md: var(--spacing-40);
  --spacing-native-select-action-height-lg: var(--spacing-48);
  --spacing-native-select-action-padding-x-sm: var(--spacing-12);
  --spacing-native-select-action-padding-x-md: var(--spacing-16);
  --spacing-native-select-action-padding-x-lg: var(--spacing-24);
  --radius-native-select-action: var(--radius-md);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
