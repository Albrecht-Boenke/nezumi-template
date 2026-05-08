import { Box } from "@packages/ui/components/box"
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
  { name: "cols", type: "ResponsiveValue<number | string>", default: "-", description: "Column count or custom grid-template-columns value." },
  { name: "rows", type: "ResponsiveValue<number | string>", default: "-", description: "Row count or custom grid-template-rows value." },
  { name: "gap", type: "ResponsiveValue<SpacingValue>", default: '"16"', description: "Shared row and column gap using the Nezumi spacing scale." },
  { name: "columnGap", type: "ResponsiveValue<SpacingValue>", default: "-", description: "Column gap override." },
  { name: "rowGap", type: "ResponsiveValue<SpacingValue>", default: "-", description: "Row gap override." },
  { name: "autoFlow", type: "row | column | dense | row-dense | column-dense", default: "-", description: "CSS grid-auto-flow utility." },
  { name: "display", type: "grid | inline-grid | none", default: '"grid"', description: "Controlled display mode for grid containers." },
]

export default function GridTutorialPage() {
  return (
    <PageShell
      eyebrow="01 - Grid"
      title="Grid component"
      description="A CSS Grid primitive for responsive tracks, custom templates, axis gaps, and semantic grid containers."
    >
      <TutorialSection title="Quick start" description="Use numbers for generated columns and responsive objects for breakpoint changes.">
        <Example
          title="Responsive card grid"
          description="One column on mobile, two at md, three at lg."
          code={`<Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="16">
  <Card />
  <Card />
  <Card />
</Grid>`}
        >
          <Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="16">
            {["Analytics", "Automation", "Security"].map((label) => (
              <Surface key={label}>
                <Flex direction="column" gap="8">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm text-text-muted">grid cell</span>
                </Flex>
              </Surface>
            ))}
          </Grid>
        </Example>
      </TutorialSection>

      <TutorialSection title="Props reference" description="The grid API keeps known utilities static and sends custom templates through CSS variables.">
        <PropTable props={props} />
      </TutorialSection>

      <TutorialSection title="Track templates" description="Known counts become static Tailwind utilities; custom templates stay deterministic through CSS variables.">
        <Example
          title="Custom sidebar template"
          description="The lg template mirrors the attachment's demo-style preview layout."
          code={`<Grid cols={{ initial: 1, lg: "16rem minmax(0, 1fr)" }} gap="24">
  <aside />
  <main />
</Grid>`}
        >
          <Grid cols={{ initial: 1, lg: "16rem minmax(0, 1fr)" }} gap="24">
            <Box p="16" className="rounded-lg bg-surface-muted">
              <span className="text-sm font-medium">Sidebar</span>
            </Box>
            <Box p="16" className="rounded-lg bg-surface-muted">
              <Grid cols={{ initial: 1, md: 2 }} gap="12">
                <Box className="h-24 rounded-md bg-brand/20" />
                <Box className="h-24 rounded-md bg-brand/30" />
              </Grid>
            </Box>
          </Grid>
        </Example>

        <Example
          title="Separate axis gaps"
          description="Use `columnGap` and `rowGap` when the grid needs different horizontal and vertical rhythm."
          code={`<Grid cols={3} columnGap="24" rowGap="8">
  {items}
</Grid>`}
        >
          <Grid cols={3} columnGap="24" rowGap="8">
            {Array.from({ length: 6 }, (_, index) => (
              <Box key={index} className="h-16 rounded-md bg-brand/25" />
            ))}
          </Grid>
        </Example>
      </TutorialSection>

      <TutorialSection title="Real usage" description="A small dashboard area composed only from Grid, Flex, and Box.">
        <Example
          title="Dashboard panel"
          code={`<Grid cols={{ initial: 1, lg: "2fr 1fr" }} gap="16">
  <Chart />
  <Activity />
</Grid>`}
        >
          <Grid cols={{ initial: 1, lg: "2fr 1fr" }} gap="16">
            <Surface>
              <Flex direction="column" gap="16">
                <Flex justify="between" align="center">
                  <span className="font-medium">Revenue</span>
                  <span className="text-sm text-text-muted">12 months</span>
                </Flex>
                <Grid cols={12} gap="8" className="h-40 items-end">
                  {[52, 44, 68, 58, 76, 84, 62, 90, 72, 94, 82, 98].map((height, index) => (
                    <Box
                      key={index}
                      className="rounded-sm bg-brand"
                      style={{ height: `${height}%`, opacity: 0.35 + index * 0.04 }}
                    />
                  ))}
                </Grid>
              </Flex>
            </Surface>
            <Surface>
              <Flex direction="column" gap="12">
                {["Build", "Review", "Ship"].map((label) => (
                  <Flex key={label} align="center" gap="12">
                    <Box className="size-8 rounded-full bg-surface-muted" />
                    <span className="text-sm">{label}</span>
                  </Flex>
                ))}
              </Flex>
            </Surface>
          </Grid>
        </Example>
      </TutorialSection>

      <DemoNav
        links={[
          { label: "Flex", href: "/tutorials/flex" },
          { label: "Box", href: "/tutorials/box" },
          { label: "Container", href: "/tutorials/container" },
        ]}
      />
    </PageShell>
  )
}
