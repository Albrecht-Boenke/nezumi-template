import { Box } from "@nezumi/ui/components/box"
import { Flex } from "@nezumi/ui/components/flex"
import { Grid } from "@nezumi/ui/components/grid"
import {
  DemoNav,
  Example,
  PageShell,
  PropTable,
  Surface,
  TutorialSection,
  type PropDefinition,
} from "../_components"

const props: PropDefinition[] = [
  { name: "as", type: "ElementType", default: '"div"', description: "Rendered element or component." },
  { name: "display", type: "DisplayValue | responsive object", default: "-", description: "Optional display utility." },
  { name: "p, px, py, ...", type: "SpacingValue | responsive object", default: "-", description: "Padding props from the Nezumi spacing scale." },
  { name: "m, mx, my, ...", type: "SpacingValue | auto | responsive object", default: "-", description: "Margin props, including auto for margin axes." },
  { name: "w, h, minW, maxW", type: "string", default: "-", description: "Known keywords become utilities; custom values become inline styles." },
  { name: "className", type: "string", default: "-", description: "Additional layout or semantic styling classes." },
  { name: "ref", type: "React.Ref<HTMLElement>", default: "-", description: "React 19 ref-as-prop support." },
]

export default function BoxTutorialPage() {
  return (
    <PageShell
      eyebrow="03 - Box"
      title="Box component"
      description="The smallest layout primitive: a polymorphic wrapper that consumes layout props and forwards normal DOM props."
    >
      <TutorialSection title="Quick start" description="Box is neutral. Surface styling stays in className or composed components.">
        <Example
          title="Semantic article"
          code={`<Box as="article" p="24" className="rounded-lg border border-border bg-surface-raised">
  <h2>Article title</h2>
  <p>Article body</p>
</Box>`}
        >
          <Box as="article" p="24" className="rounded-lg border border-border bg-surface-raised">
            <Flex direction="column" gap="8">
              <h2 className="text-xl font-semibold">Article title</h2>
              <p className="text-sm leading-relaxed text-text-muted">
                The component-specific props are consumed before DOM spread, while `id`,
                `role`, `aria-*`, events, `className`, and `style` pass through.
              </p>
            </Flex>
          </Box>
        </Example>
      </TutorialSection>

      <TutorialSection title="Props reference" description="Box owns the shared layout prop model used by the other primitives.">
        <PropTable props={props} />
      </TutorialSection>

      <TutorialSection title="Spacing and dimensions" description="Spacing maps to the pixel-named Nezumi scale. Custom dimensions use inline styles.">
        <Example
          title="Responsive padding"
          code={`<Box p={{ initial: "16", md: "24" }} maxW="42rem">
  Responsive spacing
</Box>`}
        >
          <Box
            p={{ initial: "16", md: "24" }}
            maxW="42rem"
            className="rounded-lg border border-border bg-surface-raised"
          >
            <Flex direction="column" gap="8">
              <span className="font-medium">Responsive spacing</span>
              <span className="text-sm text-text-muted">maxW is rendered as an inline `max-width` style.</span>
            </Flex>
          </Box>
        </Example>

        <Example
          title="Display utility"
          code={`<Box display={{ initial: "block", md: "grid" }} className="md:grid-cols-2">
  ...
</Box>`}
        >
          <Box display={{ initial: "block", md: "grid" }} className="gap-16 rounded-lg bg-surface-muted p-16 md:grid-cols-2">
            <Surface>First area</Surface>
            <Surface>Second area</Surface>
          </Box>
        </Example>
      </TutorialSection>

      <TutorialSection title="Composition" description="Use Box to create app-specific surfaces without adding design-system props to the primitive.">
        <Example
          title="Surface cards"
          code={`function SurfaceCard({ children }) {
  return (
    <Box p="24" className="rounded-lg border border-border bg-surface-raised">
      {children}
    </Box>
  )
}`}
        >
          <Grid cols={{ initial: 1, md: 3 }} gap="16">
            {["Neutral", "Muted", "Brand"].map((label, index) => (
              <Box
                key={label}
                p="24"
                className={index === 2
                  ? "rounded-lg border border-brand bg-brand text-on-brand"
                  : index === 1
                    ? "rounded-lg border border-border bg-surface-muted"
                    : "rounded-lg border border-border bg-surface-raised"}
              >
                <span className="font-medium">{label}</span>
              </Box>
            ))}
          </Grid>
        </Example>
      </TutorialSection>

      <DemoNav
        links={[
          { label: "Grid", href: "/tutorials/grid" },
          { label: "Flex", href: "/tutorials/flex" },
          { label: "Container", href: "/tutorials/container" },
        ]}
      />
    </PageShell>
  )
}
