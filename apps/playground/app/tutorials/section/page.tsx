import { Box } from "@nezumi/ui/components/box"
import { Button } from "@nezumi/ui/components/button"
import { Flex } from "@nezumi/ui/components/flex"
import { Grid } from "@nezumi/ui/components/grid"
import { Section } from "@nezumi/ui/components/section"
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
  { name: "size", type: "ResponsiveValue<sm | md | lg | xl>", default: '"lg"', description: "Vertical padding preset." },
  { name: "py", type: "ResponsiveValue<SpacingValue>", default: "-", description: "Explicit vertical padding override." },
  { name: "as", type: "ElementType", default: '"section"', description: "Rendered semantic element." },
  { name: "id", type: "string", default: "-", description: "Native DOM id for anchor navigation." },
  { name: "aria-label", type: "string", default: "-", description: "Native accessible label passthrough." },
  { name: "className", type: "string", default: "-", description: "Additional styling classes." },
]

export default function SectionTutorialPage() {
  return (
    <PageShell
      eyebrow="04 - Section"
      title="Section component"
      description="A semantic page band with vertical rhythm presets. Headings and descriptions are composed around it, not baked into it."
    >
      <TutorialSection title="Quick start" description="Use Section for page rhythm and compose your own header markup inside.">
        <Example
          title="Feature section"
          code={`<Section size="lg" id="features">
  <Container>
    <h2>Features</h2>
    <Grid />
  </Container>
</Section>`}
        >
          <Section size="sm" id="example-features" className="rounded-lg bg-surface-muted">
            <Flex direction="column" gap="16" px="16">
              <Flex direction="column" gap="4">
                <h2 className="text-2xl font-semibold">Features</h2>
                <p className="text-sm text-text-muted">A composed heading inside the primitive.</p>
              </Flex>
              <Grid cols={{ initial: 1, md: 3 }} gap="12">
                <Surface>Grid</Surface>
                <Surface>Flex</Surface>
                <Surface>Box</Surface>
              </Grid>
            </Flex>
          </Section>
        </Example>
      </TutorialSection>

      <TutorialSection title="Props reference" description="Section extends the shared Box layout props and adds a vertical size preset.">
        <PropTable props={props} />
      </TutorialSection>

      <TutorialSection title="Spacing presets" description="Presets map to the Nezumi spacing scale and can be overridden with explicit padding props.">
        <Example
          title="Size comparison"
          code={`<Section size="sm">py-32</Section>
<Section size="md">py-48</Section>
<Section size="lg">py-64</Section>
<Section size="xl">py-96</Section>`}
        >
          <Flex direction="column" gap="8">
            {[
              ["sm", "py-32"],
              ["md", "py-48"],
              ["lg", "py-64"],
              ["xl", "py-96"],
            ].map(([size, label]) => (
              <Box key={size} className="overflow-hidden rounded-lg border border-border">
                <Flex align="center">
                  <Box p="12" className="w-96 bg-surface-muted text-sm font-medium">{size}</Box>
                  <Box p="12" className="flex-1 text-sm text-text-muted">{label}</Box>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Example>

        <Example
          title="Explicit padding override"
          code={`<Section size="xl" py="32">
  Explicit py wins
</Section>`}
        >
          <Section size="xl" py="32" className="rounded-lg bg-surface-muted">
            <Box px="16">
              <span className="text-sm font-medium">Only py-32 is applied here.</span>
            </Box>
          </Section>
        </Example>
      </TutorialSection>

      <TutorialSection title="Page composition" description="Build the title/description pattern as page markup so Section stays primitive.">
        <Example
          title="Landing page bands"
          code={`<Section aria-label="Hero" size="xl">
  <Hero />
</Section>
<Section id="pricing" size="lg">
  <Pricing />
</Section>`}
        >
          <Flex direction="column" gap="0" className="overflow-hidden rounded-lg border border-border">
            <Section aria-label="Hero" size="sm" className="bg-brand text-on-brand">
              <Flex direction="column" gap="12" align="center" className="px-16 text-center">
                <h3 className="text-2xl font-semibold">Build faster</h3>
                <p className="max-w-xl text-sm opacity-80">Production-oriented primitives for repeated page layouts.</p>
                <Button variant="elevated" size="sm">Start</Button>
              </Flex>
            </Section>
            <Section id="pricing-preview" size="sm">
              <Grid cols={{ initial: 1, md: 3 }} gap="12" className="px-16">
                <Surface>Starter</Surface>
                <Surface>Team</Surface>
                <Surface>Enterprise</Surface>
              </Grid>
            </Section>
          </Flex>
        </Example>
      </TutorialSection>

      <DemoNav
        links={[
          { label: "Box", href: "/tutorials/box" },
          { label: "Container", href: "/tutorials/container" },
          { label: "Grid", href: "/tutorials/grid" },
        ]}
      />
    </PageShell>
  )
}
