---
title: Tailwind CSS — documentation index
description: Offline mirror; flat numbered `NNN-*.mdx` files; see "Agent retrieval".
---

# Tailwind CSS documentation

## Project pins (read first)

Project Catalog pins from `pnpm-workspace.yaml`:

- `tailwindcss`: `^4.2.4`
- `@tailwindcss/postcss`: `^4.2.4`
- `typescript`: `^6.0.3`

These are the workspace Catalog ranges used by packages that declare `catalog:`. The offline mirror in this directory is reference text from tailwindcss.com and does not prove the installed project version. For an exact resolved version, verify the lockfile or the active install. If present, the cross-framework stack summary is [`../../FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

Offline mirror: flat files `NNN-slug.mdx` in this directory (`NNN` is three digits).

## Purpose

This file is a high-level semantic index of the documentation.
It is intended for:

- LLM-assisted navigation (ChatGPT, Claude, etc.)
- Quick orientation for contributors
- Identifying relevant documentation areas during development

It is not intended to replace individual docs.

## Agent retrieval

Use this file as the **single navigation root**. All pages are **flat** `NNN-kebab-slug.mdx` next to `INDEX.md` (no nested topic folders).

| Need | Where to look |
|------|----------------|
| Theming, `@theme`, design tokens | **`172-theme.mdx`**, **`047-colors.mdx`**, **`002-adding-custom-styles.mdx`** |
| Dark mode, responsive design, states | **`052-dark-mode.mdx`**, **`147-responsive-design.mdx`**, **`094-hover-focus-and-other-states.mdx`** |
| Class detection, monorepos, `@source` | **`053-detecting-classes-in-source-files.mdx`**, **`084-functions-and-directives.mdx`** |
| Upgrade / compatibility | **`184-upgrade-guide.mdx`**, **`049-compatibility.mdx`** |
| A specific utility (spacing, layout, filters, …) | Section **Utility and CSS reference**, match slug to filename or search this index |

**Rules:** The numeric prefix `NNN` is a **stable slot** (001–192), not a topic priority. Prefer the **Summary** on each index line. Open the linked `mdx` by **number from this index**, not from guessed paths on tailwindcss.com.

**Source:** Content mirrors [tailwindlabs/tailwindcss.com – `src/docs`](https://github.com/tailwindlabs/tailwindcss.com/tree/master/src/docs). MDX may contain original-site imports (`@/components/...`); files are still readable as reference text offline.

---

## Guides & core concepts

- [002 — Adding Custom Styles](./002-adding-custom-styles.mdx) | Type: Conceptual | Summary: Core documentation: Adding Custom Styles.
- [047 — Colors](./047-colors.mdx) | Type: Conceptual | Summary: Core documentation: Colors.
- [049 — Compatibility](./049-compatibility.mdx) | Type: Conceptual | Summary: Core documentation: Compatibility.
- [052 — Dark Mode](./052-dark-mode.mdx) | Type: Conceptual | Summary: Core documentation: Dark Mode.
- [053 — Detecting Classes In Source Files](./053-detecting-classes-in-source-files.mdx) | Type: Conceptual | Summary: Core documentation: Detecting Classes In Source Files.
- [055 — Editor Setup](./055-editor-setup.mdx) | Type: Conceptual | Summary: Core documentation: Editor Setup.
- [084 — Functions And Directives](./084-functions-and-directives.mdx) | Type: Conceptual | Summary: Core documentation: Functions And Directives.
- [094 — Hover Focus And Other States](./094-hover-focus-and-other-states.mdx) | Type: Conceptual | Summary: Core documentation: Hover Focus And Other States.
- [145 — Preflight](./145-preflight.mdx) | Type: Conceptual | Summary: Core documentation: Preflight.
- [147 — Responsive Design](./147-responsive-design.mdx) | Type: Conceptual | Summary: Core documentation: Responsive Design.
- [159 — Styling With Utility Classes](./159-styling-with-utility-classes.mdx) | Type: Conceptual | Summary: Core documentation: Styling With Utility Classes.
- [172 — Theme](./172-theme.mdx) | Type: Conceptual | Summary: Core documentation: Theme.
- [184 — Upgrade Guide](./184-upgrade-guide.mdx) | Type: Conceptual | Summary: Core documentation: Upgrade Guide.


## Utility and CSS reference

- [001 — Accent Color](./001-accent-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Accent Color.
- [003 — Align Content](./003-align-content.mdx) | Type: Reference | Summary: Utility and CSS reference: Align Content.
- [004 — Align Items](./004-align-items.mdx) | Type: Reference | Summary: Utility and CSS reference: Align Items.
- [005 — Align Self](./005-align-self.mdx) | Type: Reference | Summary: Utility and CSS reference: Align Self.
- [006 — Animation](./006-animation.mdx) | Type: Reference | Summary: Utility and CSS reference: Animation.
- [007 — Appearance](./007-appearance.mdx) | Type: Reference | Summary: Utility and CSS reference: Appearance.
- [008 — Aspect Ratio](./008-aspect-ratio.mdx) | Type: Reference | Summary: Utility and CSS reference: Aspect Ratio.
- [009 — Backdrop Filter Blur](./009-backdrop-filter-blur.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Blur.
- [010 — Backdrop Filter Brightness](./010-backdrop-filter-brightness.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Brightness.
- [011 — Backdrop Filter Contrast](./011-backdrop-filter-contrast.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Contrast.
- [012 — Backdrop Filter Grayscale](./012-backdrop-filter-grayscale.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Grayscale.
- [013 — Backdrop Filter Hue Rotate](./013-backdrop-filter-hue-rotate.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Hue Rotate.
- [014 — Backdrop Filter Invert](./014-backdrop-filter-invert.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Invert.
- [015 — Backdrop Filter Opacity](./015-backdrop-filter-opacity.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Opacity.
- [016 — Backdrop Filter Saturate](./016-backdrop-filter-saturate.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Saturate.
- [017 — Backdrop Filter Sepia](./017-backdrop-filter-sepia.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter Sepia.
- [018 — Backdrop Filter](./018-backdrop-filter.mdx) | Type: Reference | Summary: Utility and CSS reference: Backdrop Filter.
- [019 — Backface Visibility](./019-backface-visibility.mdx) | Type: Reference | Summary: Utility and CSS reference: Backface Visibility.
- [020 — Background Attachment](./020-background-attachment.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Attachment.
- [021 — Background Blend Mode](./021-background-blend-mode.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Blend Mode.
- [022 — Background Clip](./022-background-clip.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Clip.
- [023 — Background Color](./023-background-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Color.
- [024 — Background Image](./024-background-image.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Image.
- [025 — Background Origin](./025-background-origin.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Origin.
- [026 — Background Position](./026-background-position.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Position.
- [027 — Background Repeat](./027-background-repeat.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Repeat.
- [028 — Background Size](./028-background-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Background Size.
- [029 — Block Size](./029-block-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Block Size.
- [030 — Border Collapse](./030-border-collapse.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Collapse.
- [031 — Border Color](./031-border-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Color.
- [032 — Border Radius](./032-border-radius.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Radius.
- [033 — Border Spacing](./033-border-spacing.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Spacing.
- [034 — Border Style](./034-border-style.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Style.
- [035 — Border Width](./035-border-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Border Width.
- [036 — Box Decoration Break](./036-box-decoration-break.mdx) | Type: Reference | Summary: Utility and CSS reference: Box Decoration Break.
- [037 — Box Shadow](./037-box-shadow.mdx) | Type: Reference | Summary: Utility and CSS reference: Box Shadow.
- [038 — Box Sizing](./038-box-sizing.mdx) | Type: Reference | Summary: Utility and CSS reference: Box Sizing.
- [039 — Break After](./039-break-after.mdx) | Type: Reference | Summary: Utility and CSS reference: Break After.
- [040 — Break Before](./040-break-before.mdx) | Type: Reference | Summary: Utility and CSS reference: Break Before.
- [041 — Break Inside](./041-break-inside.mdx) | Type: Reference | Summary: Utility and CSS reference: Break Inside.
- [042 — Caption Side](./042-caption-side.mdx) | Type: Reference | Summary: Utility and CSS reference: Caption Side.
- [043 — Caret Color](./043-caret-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Caret Color.
- [044 — Clear](./044-clear.mdx) | Type: Reference | Summary: Utility and CSS reference: Clear.
- [045 — Color Scheme](./045-color-scheme.mdx) | Type: Reference | Summary: Utility and CSS reference: Color Scheme.
- [046 — Color](./046-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Color.
- [048 — Columns](./048-columns.mdx) | Type: Reference | Summary: Utility and CSS reference: Columns.
- [050 — Content](./050-content.mdx) | Type: Reference | Summary: Utility and CSS reference: Content.
- [051 — Cursor](./051-cursor.mdx) | Type: Reference | Summary: Utility and CSS reference: Cursor.
- [054 — Display](./054-display.mdx) | Type: Reference | Summary: Utility and CSS reference: Display.
- [056 — Field Sizing](./056-field-sizing.mdx) | Type: Reference | Summary: Utility and CSS reference: Field Sizing.
- [057 — Fill](./057-fill.mdx) | Type: Reference | Summary: Utility and CSS reference: Fill.
- [058 — Filter Blur](./058-filter-blur.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Blur.
- [059 — Filter Brightness](./059-filter-brightness.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Brightness.
- [060 — Filter Contrast](./060-filter-contrast.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Contrast.
- [061 — Filter Drop Shadow](./061-filter-drop-shadow.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Drop Shadow.
- [062 — Filter Grayscale](./062-filter-grayscale.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Grayscale.
- [063 — Filter Hue Rotate](./063-filter-hue-rotate.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Hue Rotate.
- [064 — Filter Invert](./064-filter-invert.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Invert.
- [065 — Filter Saturate](./065-filter-saturate.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Saturate.
- [066 — Filter Sepia](./066-filter-sepia.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter Sepia.
- [067 — Filter](./067-filter.mdx) | Type: Reference | Summary: Utility and CSS reference: Filter.
- [068 — Flex Basis](./068-flex-basis.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex Basis.
- [069 — Flex Direction](./069-flex-direction.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex Direction.
- [070 — Flex Grow](./070-flex-grow.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex Grow.
- [071 — Flex Shrink](./071-flex-shrink.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex Shrink.
- [072 — Flex Wrap](./072-flex-wrap.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex Wrap.
- [073 — Flex](./073-flex.mdx) | Type: Reference | Summary: Utility and CSS reference: Flex.
- [074 — Float](./074-float.mdx) | Type: Reference | Summary: Utility and CSS reference: Float.
- [075 — Font Family](./075-font-family.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Family.
- [076 — Font Feature Settings](./076-font-feature-settings.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Feature Settings.
- [077 — Font Size](./077-font-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Size.
- [078 — Font Smoothing](./078-font-smoothing.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Smoothing.
- [079 — Font Stretch](./079-font-stretch.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Stretch.
- [080 — Font Style](./080-font-style.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Style.
- [081 — Font Variant Numeric](./081-font-variant-numeric.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Variant Numeric.
- [082 — Font Weight](./082-font-weight.mdx) | Type: Reference | Summary: Utility and CSS reference: Font Weight.
- [083 — Forced Color Adjust](./083-forced-color-adjust.mdx) | Type: Reference | Summary: Utility and CSS reference: Forced Color Adjust.
- [085 — Gap](./085-gap.mdx) | Type: Reference | Summary: Utility and CSS reference: Gap.
- [086 — Grid Auto Columns](./086-grid-auto-columns.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Auto Columns.
- [087 — Grid Auto Flow](./087-grid-auto-flow.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Auto Flow.
- [088 — Grid Auto Rows](./088-grid-auto-rows.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Auto Rows.
- [089 — Grid Column](./089-grid-column.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Column.
- [090 — Grid Row](./090-grid-row.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Row.
- [091 — Grid Template Columns](./091-grid-template-columns.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Template Columns.
- [092 — Grid Template Rows](./092-grid-template-rows.mdx) | Type: Reference | Summary: Utility and CSS reference: Grid Template Rows.
- [093 — Height](./093-height.mdx) | Type: Reference | Summary: Utility and CSS reference: Height.
- [095 — Hyphens](./095-hyphens.mdx) | Type: Reference | Summary: Utility and CSS reference: Hyphens.
- [096 — Inline Size](./096-inline-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Inline Size.
- [097 — Isolation](./097-isolation.mdx) | Type: Reference | Summary: Utility and CSS reference: Isolation.
- [098 — Justify Content](./098-justify-content.mdx) | Type: Reference | Summary: Utility and CSS reference: Justify Content.
- [099 — Justify Items](./099-justify-items.mdx) | Type: Reference | Summary: Utility and CSS reference: Justify Items.
- [100 — Justify Self](./100-justify-self.mdx) | Type: Reference | Summary: Utility and CSS reference: Justify Self.
- [101 — Letter Spacing](./101-letter-spacing.mdx) | Type: Reference | Summary: Utility and CSS reference: Letter Spacing.
- [102 — Line Clamp](./102-line-clamp.mdx) | Type: Reference | Summary: Utility and CSS reference: Line Clamp.
- [103 — Line Height](./103-line-height.mdx) | Type: Reference | Summary: Utility and CSS reference: Line Height.
- [104 — List Style Image](./104-list-style-image.mdx) | Type: Reference | Summary: Utility and CSS reference: List Style Image.
- [105 — List Style Position](./105-list-style-position.mdx) | Type: Reference | Summary: Utility and CSS reference: List Style Position.
- [106 — List Style Type](./106-list-style-type.mdx) | Type: Reference | Summary: Utility and CSS reference: List Style Type.
- [107 — Margin](./107-margin.mdx) | Type: Reference | Summary: Utility and CSS reference: Margin.
- [108 — Mask Clip](./108-mask-clip.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Clip.
- [109 — Mask Composite](./109-mask-composite.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Composite.
- [110 — Mask Image](./110-mask-image.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Image.
- [111 — Mask Mode](./111-mask-mode.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Mode.
- [112 — Mask Origin](./112-mask-origin.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Origin.
- [113 — Mask Position](./113-mask-position.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Position.
- [114 — Mask Repeat](./114-mask-repeat.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Repeat.
- [115 — Mask Size](./115-mask-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Size.
- [116 — Mask Type](./116-mask-type.mdx) | Type: Reference | Summary: Utility and CSS reference: Mask Type.
- [117 — Max Block Size](./117-max-block-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Max Block Size.
- [118 — Max Height](./118-max-height.mdx) | Type: Reference | Summary: Utility and CSS reference: Max Height.
- [119 — Max Inline Size](./119-max-inline-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Max Inline Size.
- [120 — Max Width](./120-max-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Max Width.
- [121 — Min Block Size](./121-min-block-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Min Block Size.
- [122 — Min Height](./122-min-height.mdx) | Type: Reference | Summary: Utility and CSS reference: Min Height.
- [123 — Min Inline Size](./123-min-inline-size.mdx) | Type: Reference | Summary: Utility and CSS reference: Min Inline Size.
- [124 — Min Width](./124-min-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Min Width.
- [125 — Mix Blend Mode](./125-mix-blend-mode.mdx) | Type: Reference | Summary: Utility and CSS reference: Mix Blend Mode.
- [126 — Object Fit](./126-object-fit.mdx) | Type: Reference | Summary: Utility and CSS reference: Object Fit.
- [127 — Object Position](./127-object-position.mdx) | Type: Reference | Summary: Utility and CSS reference: Object Position.
- [128 — Opacity](./128-opacity.mdx) | Type: Reference | Summary: Utility and CSS reference: Opacity.
- [129 — Order](./129-order.mdx) | Type: Reference | Summary: Utility and CSS reference: Order.
- [130 — Outline Color](./130-outline-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Outline Color.
- [131 — Outline Offset](./131-outline-offset.mdx) | Type: Reference | Summary: Utility and CSS reference: Outline Offset.
- [132 — Outline Style](./132-outline-style.mdx) | Type: Reference | Summary: Utility and CSS reference: Outline Style.
- [133 — Outline Width](./133-outline-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Outline Width.
- [134 — Overflow Wrap](./134-overflow-wrap.mdx) | Type: Reference | Summary: Utility and CSS reference: Overflow Wrap.
- [135 — Overflow](./135-overflow.mdx) | Type: Reference | Summary: Utility and CSS reference: Overflow.
- [136 — Overscroll Behavior](./136-overscroll-behavior.mdx) | Type: Reference | Summary: Utility and CSS reference: Overscroll Behavior.
- [137 — Padding](./137-padding.mdx) | Type: Reference | Summary: Utility and CSS reference: Padding.
- [138 — Perspective Origin](./138-perspective-origin.mdx) | Type: Reference | Summary: Utility and CSS reference: Perspective Origin.
- [139 — Perspective](./139-perspective.mdx) | Type: Reference | Summary: Utility and CSS reference: Perspective.
- [140 — Place Content](./140-place-content.mdx) | Type: Reference | Summary: Utility and CSS reference: Place Content.
- [141 — Place Items](./141-place-items.mdx) | Type: Reference | Summary: Utility and CSS reference: Place Items.
- [142 — Place Self](./142-place-self.mdx) | Type: Reference | Summary: Utility and CSS reference: Place Self.
- [143 — Pointer Events](./143-pointer-events.mdx) | Type: Reference | Summary: Utility and CSS reference: Pointer Events.
- [144 — Position](./144-position.mdx) | Type: Reference | Summary: Utility and CSS reference: Position.
- [146 — Resize](./146-resize.mdx) | Type: Reference | Summary: Utility and CSS reference: Resize.
- [148 — Rotate](./148-rotate.mdx) | Type: Reference | Summary: Utility and CSS reference: Rotate.
- [149 — Scale](./149-scale.mdx) | Type: Reference | Summary: Utility and CSS reference: Scale.
- [150 — Scroll Behavior](./150-scroll-behavior.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Behavior.
- [151 — Scroll Margin](./151-scroll-margin.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Margin.
- [152 — Scroll Padding](./152-scroll-padding.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Padding.
- [153 — Scroll Snap Align](./153-scroll-snap-align.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Snap Align.
- [154 — Scroll Snap Stop](./154-scroll-snap-stop.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Snap Stop.
- [155 — Scroll Snap Type](./155-scroll-snap-type.mdx) | Type: Reference | Summary: Utility and CSS reference: Scroll Snap Type.
- [156 — Skew](./156-skew.mdx) | Type: Reference | Summary: Utility and CSS reference: Skew.
- [157 — Stroke Width](./157-stroke-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Stroke Width.
- [158 — Stroke](./158-stroke.mdx) | Type: Reference | Summary: Utility and CSS reference: Stroke.
- [160 — Table Layout](./160-table-layout.mdx) | Type: Reference | Summary: Utility and CSS reference: Table Layout.
- [161 — Text Align](./161-text-align.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Align.
- [162 — Text Decoration Color](./162-text-decoration-color.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Decoration Color.
- [163 — Text Decoration Line](./163-text-decoration-line.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Decoration Line.
- [164 — Text Decoration Style](./164-text-decoration-style.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Decoration Style.
- [165 — Text Decoration Thickness](./165-text-decoration-thickness.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Decoration Thickness.
- [166 — Text Indent](./166-text-indent.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Indent.
- [167 — Text Overflow](./167-text-overflow.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Overflow.
- [168 — Text Shadow](./168-text-shadow.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Shadow.
- [169 — Text Transform](./169-text-transform.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Transform.
- [170 — Text Underline Offset](./170-text-underline-offset.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Underline Offset.
- [171 — Text Wrap](./171-text-wrap.mdx) | Type: Reference | Summary: Utility and CSS reference: Text Wrap.
- [173 — Top Right Bottom Left](./173-top-right-bottom-left.mdx) | Type: Reference | Summary: Utility and CSS reference: Top Right Bottom Left.
- [174 — Touch Action](./174-touch-action.mdx) | Type: Reference | Summary: Utility and CSS reference: Touch Action.
- [175 — Transform Origin](./175-transform-origin.mdx) | Type: Reference | Summary: Utility and CSS reference: Transform Origin.
- [176 — Transform Style](./176-transform-style.mdx) | Type: Reference | Summary: Utility and CSS reference: Transform Style.
- [177 — Transform](./177-transform.mdx) | Type: Reference | Summary: Utility and CSS reference: Transform.
- [178 — Transition Behavior](./178-transition-behavior.mdx) | Type: Reference | Summary: Utility and CSS reference: Transition Behavior.
- [179 — Transition Delay](./179-transition-delay.mdx) | Type: Reference | Summary: Utility and CSS reference: Transition Delay.
- [180 — Transition Duration](./180-transition-duration.mdx) | Type: Reference | Summary: Utility and CSS reference: Transition Duration.
- [181 — Transition Property](./181-transition-property.mdx) | Type: Reference | Summary: Utility and CSS reference: Transition Property.
- [182 — Transition Timing Function](./182-transition-timing-function.mdx) | Type: Reference | Summary: Utility and CSS reference: Transition Timing Function.
- [183 — Translate](./183-translate.mdx) | Type: Reference | Summary: Utility and CSS reference: Translate.
- [185 — User Select](./185-user-select.mdx) | Type: Reference | Summary: Utility and CSS reference: User Select.
- [186 — Vertical Align](./186-vertical-align.mdx) | Type: Reference | Summary: Utility and CSS reference: Vertical Align.
- [187 — Visibility](./187-visibility.mdx) | Type: Reference | Summary: Utility and CSS reference: Visibility.
- [188 — White Space](./188-white-space.mdx) | Type: Reference | Summary: Utility and CSS reference: White Space.
- [189 — Width](./189-width.mdx) | Type: Reference | Summary: Utility and CSS reference: Width.
- [190 — Will Change](./190-will-change.mdx) | Type: Reference | Summary: Utility and CSS reference: Will Change.
- [191 — Word Break](./191-word-break.mdx) | Type: Reference | Summary: Utility and CSS reference: Word Break.
- [192 — Z Index](./192-z-index.mdx) | Type: Reference | Summary: Utility and CSS reference: Z Index.


## Files in this directory

| File | Note |
|------|------|
| `INDEX.md` | This navigation file |
| `README.md` | Upstream readme from the documentation project |
| `NNN-*.mdx` | Mirror pages (see numbering in sections above) |
