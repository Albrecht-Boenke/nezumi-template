# Card Molecule — Token Audit

Tokens actually consumed by the component implementation.

| Token | Tailwind Utility Used | In `ui/styles/components/card.css` |
|-------|----------------------|-------------------------------------|
| `--radius-card` | `rounded-card` | Yes |
| `--shadow-card` | `shadow-card` | Yes |
| `--color-card-border` | `border-card-border` | Yes |
| `--color-card-surface` | `bg-card-surface` | Yes |
| `--color-card-text` | `text-card-text` | Yes |
| `--spacing-card-header-gap` | `gap-card-header-gap` | Yes |
| `--spacing-card-header-padding` | `p-card-header-padding` | Yes |
| `--color-card-title-text` | `text-card-title-text` | Yes |
| `--color-card-description-text` | `text-card-description-text` | Yes |
| `--spacing-card-content-padding` | `p-card-content-padding` | Yes |
| `--spacing-card-footer-padding` | `p-card-footer-padding` | Yes |

> Note: `typography-title-medium` and `typography-body-medium` are used for font sizing. They are `@layer components` classes from `atoms/Typography/tokens.css`, not `@theme` tokens, so they do not appear in the component token layer.
