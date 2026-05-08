import { Box } from "@packages/ui/components/box"
import { Container } from "@packages/ui/components/container"
import { Flex } from "@packages/ui/components/flex"
import { Grid } from "@packages/ui/components/grid"
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
  { name: "size", type: "ResponsiveValue<sm | md | lg | xl | 2xl>", default: '"lg"', description: "Max-width preset using Tailwind v4 container scale." },
  { name: "centered", type: "boolean", default: "true", description: "Adds mx-auto unless mx is explicitly provided." },
  { name: "px", type: "ResponsiveValue<SpacingValue>", default: '{ initial: "16", md: "24" }', description: "Horizontal padding. Explicit p/px overrides the default gutter policy." },
  { name: "maxW", type: "string", default: "-", description: "Explicit max-width override via shared dimension props." },
  { name: "as", type: "ElementType", default: '"div"', description: "Rendered semantic element." },
  { name: "className", type: "string", default: "-", description: "Additional styling classes." },
]

export default function ContainerTutorialPage() {
  return (
    <PageShell
      eyebrow="05 - Container"
      title="Container component"
      description="A centered max-width wrapper with a deliberate responsive gutter policy."
    >
      <TutorialSection title="Quick start" description="The default container is full width, centered, max-w-4xl, and padded.">
        <Example
          title="Default container"
          code={`<Container>
  <PageContent />
</Container>`}
        >
          <Container>
            <Surface>
              <span className="text-sm font-medium">Default: w-full max-w-4xl mx-auto px-16 md:px-24</span>
            </Surface>
          </Container>
        </Example>
      </TutorialSection>

      <TutorialSection title="Props reference" description="Container extends Box props and adds size plus centering behavior.">
        <PropTable props={props} />
      </TutorialSection>

      <TutorialSection title="Max-width scale" description="The final API uses documented Tailwind v4 max-width classes, not max-w-screen-* aliases.">
        <Example
          title="Size presets"
          code={`<Container size="sm">max-w-md</Container>
<Container size="md">max-w-2xl</Container>
<Container size="lg">max-w-4xl</Container>
<Container size="xl">max-w-6xl</Container>
<Container size="2xl">max-w-7xl</Container>`}
        >
          <Flex direction="column" gap="8">
            {[
              ["sm", "max-w-md"],
              ["md", "max-w-2xl"],
              ["lg", "max-w-4xl"],
              ["xl", "max-w-6xl"],
              ["2xl", "max-w-7xl"],
            ].map(([size, className]) => (
              <Box key={size} className="rounded-lg bg-surface-muted p-8">
                <Container size={size as "sm" | "md" | "lg" | "xl" | "2xl"} px="0">
                  <Box className="rounded-md bg-brand/25 px-12 py-8">
                    <Flex justify="between" gap="16">
                      <span className="text-sm font-medium">{size}</span>
                      <span className="font-mono text-xs text-text-muted">{className}</span>
                    </Flex>
                  </Box>
                </Container>
              </Box>
            ))}
          </Flex>
        </Example>

        <Example
          title="Responsive size"
          code={`<Container size={{ initial: "sm", md: "lg", xl: "2xl" }}>
  Responsive content width
</Container>`}
        >
          <Container size={{ initial: "sm", md: "lg", xl: "2xl" }}>
            <Surface>
              <Grid cols={{ initial: 1, md: 3 }} gap="12">
                <Box className="h-24 rounded-md bg-brand/20" />
                <Box className="h-24 rounded-md bg-brand/30" />
                <Box className="h-24 rounded-md bg-brand/40" />
              </Grid>
            </Surface>
          </Container>
        </Example>
      </TutorialSection>

      <TutorialSection title="Gutters and centering" description="The default gutter is ergonomic, but callers can opt out or override it.">
        <Example
          title="Custom gutter"
          code={`<Container px={{ initial: "8", md: "32" }}>
  Custom gutter
</Container>`}
        >
          <Container px={{ initial: "8", md: "32" }}>
            <Box className="rounded-lg border border-border bg-surface-raised p-16">
              <span className="text-sm">Custom responsive horizontal padding.</span>
            </Box>
          </Container>
        </Example>

        <Example
          title="Uncentered container"
          code={`<Container centered={false} size="md">
  Left aligned
</Container>`}
        >
          <Container centered={false} size="md">
            <Box className="rounded-lg border border-border bg-surface-raised p-16">
              <span className="text-sm">centered=false keeps the container left aligned.</span>
            </Box>
          </Container>
        </Example>
      </TutorialSection>

      <DemoNav
        links={[
          { label: "Section", href: "/tutorials/section" },
          { label: "Grid", href: "/tutorials/grid" },
          { label: "Flex", href: "/tutorials/flex" },
        ]}
      />
    </PageShell>
  )
}
