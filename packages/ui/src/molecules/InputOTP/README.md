# InputOTP — Component Tokens

> Design-token contract for the `InputOTP` component.

## Token Definitions

```css
/* InputOTP component tokens. Keep values semantic; do not place implementation here. */
@theme {

  /* Base component contract */
  --color-input-otp-surface: var(--color-surface-raised);
  --color-input-otp-surface-muted: var(--color-surface-muted);
  --color-input-otp-text: var(--color-text);
  --color-input-otp-text-muted: var(--color-text-muted);
  --color-input-otp-border: var(--color-border);
  --color-input-otp-ring: var(--color-ring);
  --spacing-input-otp-gap: var(--spacing-8);
  --spacing-input-otp-padding-x: var(--spacing-16);
  --spacing-input-otp-padding-y: var(--spacing-12);
  --spacing-input-otp-icon: var(--spacing-16);
  --radius-input-otp: var(--radius-md);
  --shadow-input-otp: var(--shadow-none);
  --text-input-otp: 0.875rem;
  --font-weight-input-otp: var(--font-weight-regular);
  --leading-input-otp: 1.5;
  --duration-input-otp-hover: var(--duration-fast);
  --duration-input-otp-enter: var(--duration-normal);
  --duration-input-otp-exit: var(--duration-fast);
  --ease-input-otp-standard: var(--ease-in-out);
  --ease-input-otp-enter: var(--ease-out);
  --ease-input-otp-exit: var(--ease-in);

  /* Form control tokens */
  --color-input-otp-control-surface: var(--color-surface);
  --color-input-otp-control-text: var(--color-text);
  --color-input-otp-control-border: var(--color-input);
  --color-input-otp-control-placeholder: var(--color-text-muted);
  --color-input-otp-control-ring: var(--color-ring);
  --color-input-otp-control-invalid-border: var(--color-error);
  --color-input-otp-control-invalid-text: var(--color-error);
  --color-input-otp-control-invalid-surface: var(--color-error-bg);
  --spacing-input-otp-control-height: var(--spacing-40);
  --spacing-input-otp-control-min-height: var(--spacing-40);
  --spacing-input-otp-control-width: var(--spacing-128);
  --spacing-input-otp-control-padding-x: var(--spacing-12);
  --spacing-input-otp-control-padding-y: var(--spacing-8);
  --spacing-input-otp-control-gap: var(--spacing-8);
  --radius-input-otp-control: var(--radius-md);
  --text-input-otp-placeholder: 0.875rem;
  --font-weight-input-otp-placeholder: var(--font-weight-regular);

  /* Interaction states */
  --color-input-otp-hover-surface: var(--color-surface-muted);
  --color-input-otp-hover-text: var(--color-text);
  --color-input-otp-active-surface: var(--color-surface-raised-subtle);
  --color-input-otp-active-text: var(--color-text);
  --color-input-otp-selected-surface: var(--color-brand);
  --color-input-otp-selected-text: var(--color-on-brand);
  --color-input-otp-disabled-surface: var(--color-surface-muted);
  --color-input-otp-disabled-text: var(--color-text-muted);
  --color-input-otp-focus-ring: var(--color-ring);
  --spacing-input-otp-action-height-sm: var(--spacing-32);
  --spacing-input-otp-action-height-md: var(--spacing-40);
  --spacing-input-otp-action-height-lg: var(--spacing-48);
  --spacing-input-otp-action-padding-x-sm: var(--spacing-12);
  --spacing-input-otp-action-padding-x-md: var(--spacing-16);
  --spacing-input-otp-action-padding-x-lg: var(--spacing-24);
  --radius-input-otp-action: var(--radius-md);

  /* Collection structure */
  --spacing-input-otp-collection-list-gap: var(--spacing-4);
  --spacing-input-otp-collection-group-gap: var(--spacing-8);
  --spacing-input-otp-collection-group-padding-x: var(--spacing-8);
  --spacing-input-otp-collection-group-padding-y: var(--spacing-8);
  --spacing-input-otp-collection-item-gap: var(--spacing-8);
  --spacing-input-otp-collection-item-padding-x: var(--spacing-12);
  --spacing-input-otp-collection-item-padding-y: var(--spacing-8);
  --spacing-input-otp-collection-separator-size: var(--spacing-1);
  --color-input-otp-collection-separator: var(--color-border);
  --color-input-otp-collection-label-text: var(--color-text-muted);
  --text-input-otp-collection-label: 0.75rem;
  --font-weight-input-otp-collection-label: var(--font-weight-medium);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
