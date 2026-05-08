# ToggleGroup — Component Tokens

> Design-token contract for the `ToggleGroup` component.

## Token Definitions

```css
/* ToggleGroup component tokens — used as implementation reference.
   Component-layer registration lives in styles/components/toggle-group.css */
@theme {
  /* Geometry */
  --spacing-toggle-group-gap: var(--spacing-8);
}
```

## Notes

- Tokens are defined at the component layer and reference semantic/primitive tokens only.
- Do not hardcode values; always map to `var(--*)` references where possible.
