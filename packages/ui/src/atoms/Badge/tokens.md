# Badge — Token Usage Verification

> Auto-generated from `tokens.css`. Only tokens actually referenced in the component implementation are listed.

## Used tokens

| Token | Purpose | In `styles/components/badge.css` | In `atoms/Badge/tokens.css` |
|-------|---------|------------------------------------|-----------------------------|
| `--radius-badge` | Border radius (pill shape) | — | ✅ |
| `--spacing-badge-padding-x` | Horizontal padding | — | ✅ |
| `--spacing-badge-padding-y` | Vertical padding | — | ✅ |
| `--text-badge` | Font size | — | ✅ |
| `--font-weight-badge` | Font weight (rendered as `font-badge`) | — | ✅ |
| `--leading-badge` | Line height | — | ✅ |
| `--color-badge-text` | Text color (outline variant) | — | ✅ |
| `--color-badge-border` | Border color (outline variant) | — | ✅ |
| `--color-badge-hover-surface` | Hover background (outline / ghost) | ✅ | ✅ |
| `--color-badge-focus-ring` | Focus ring color | — | ✅ |

## Externally reused tokens (not badge-specific, defined in `styles/components/button.css`)

| Token | Purpose | In `styles/components/button.css` |
|-------|---------|-----------------------------------|
| `--color-button-brand-hover` | Hover state for default variant | ✅ |
| `--color-button-brand-active` | Active state for default variant | ✅ |
| `--color-button-secondary-hover` | Hover state for secondary variant | ✅ |
| `--color-button-secondary-active` | Active state for secondary variant | ✅ |
| `--color-button-error-hover` | Hover state for destructive variant | ✅ |
| `--color-button-error-active` | Active state for destructive variant | ✅ |

## Summary

- **10** badge-specific tokens used in the component.
- **1** badge-specific interactive token lives in `styles/components/badge.css` (`--color-badge-hover-surface`).
- **9** base/contract tokens live in `atoms/Badge/tokens.css`.
- **6** button-derived tokens are reused for brand/secondary/destructive hover/active states.
- No dead tokens remain in `atoms/Badge/tokens.css`.
