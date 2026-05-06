# Foundation And Design Tokens

The foundation layer lives inside `packages/ui/src/styles/`. It is CSS-first and Tailwind v4 native.

## File Layout

```
packages/ui/src/styles/
├── global.css
├── tokens/
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   ├── motion.css
│   ├── radius.css
│   └── shadows.css
├── semantic/
│   ├── colors.css
│   └── spacing.css
└── components/
    ├── button.css
    ├── card.css
    └── input.css
```

## Token Definition

```css
@theme {
  --color-blue-500: oklch(60% 0.16 250);
  --color-background: var(--color-neutral-50);
  --spacing-16: 1rem;
  --text-sm: 0.875rem;
  --radius-lg: 0.5rem;
  --duration-normal: 200ms;
}
```

`@theme` registers utilities with Tailwind:

```tsx
<div className="bg-background text-foreground p-16 rounded-lg duration-normal" />
```

## Dark Mode

Dark-mode overrides belong under `.dark` in `global.css`, not inside `@theme`.

```css
.dark {
  --color-background: var(--color-neutral-950);
  --color-foreground: var(--color-neutral-50);
  color-scheme: dark;
}
```

## Rule

Do not create parallel TypeScript token objects. CSS `@theme` is the source of truth.
