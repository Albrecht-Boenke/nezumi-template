import { Box } from "@packages/ui/components/box"
import { Flex } from "@packages/ui/components/flex"
import { Typography } from "@packages/ui/components/typography"
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
  { name: "direction", type: "ResponsiveValue<row | column | row-reverse | column-reverse>", default: '"row"', description: "Main axis direction." },
  { name: "wrap", type: "ResponsiveValue<nowrap | wrap | wrap-reverse>", default: "-", description: "Flex wrapping behavior." },
  { name: "gap", type: "ResponsiveValue<SpacingValue>", default: '"16"', description: "Gap between flex items." },
  { name: "align", type: "start | center | end | stretch | baseline", default: '"stretch"', description: "Cross-axis alignment." },
  { name: "justify", type: "start | center | end | between | around | evenly", default: '"start"', description: "Main-axis distribution." },
  { name: "flex", type: "1 | auto | initial | none | CSS value", default: "-", description: "Flex shorthand class or inline style." },
  { name: "basis", type: "known basis | CSS value", default: "-", description: "Flex basis utility or inline style." },
  { name: "display", type: "flex | inline-flex | none", default: '"flex"', description: "Controlled display mode." },
]

export default function FlexTutorialPage() {
  return (
    <PageShell
      eyebrow="02 - Flex"
      title="Flex component"
      description="A flexbox primitive for navigation bars, stacks, wrap layouts, and small alignment jobs."
    >
      <TutorialSection title="Quick start" description="Use responsive direction when a mobile stack becomes a desktop row.">
        <Example
          title="Responsive direction"
          code={`<Flex direction={{ initial: "column", md: "row" }} gap="16">
  <Item />
  <Item />
</Flex>`}
        >
          <Flex direction={{ initial: "column", md: "row" }} gap="16">
            <Surface>
              <Typography variant="label-large" as="span">
                Mobile first
              </Typography>
            </Surface>
            <Surface>
              <Typography variant="label-large" as="span">
                Row from md
              </Typography>
            </Surface>
          </Flex>
        </Example>
      </TutorialSection>

      <TutorialSection title="Props reference" description="Flex narrows display values to the modes that make sense for a flex container.">
        <PropTable props={props} />
      </TutorialSection>

      <TutorialSection title="Alignment" description="Compose `align`, `justify`, and `gap` instead of spacing hacks.">
        <Example
          title="Toolbar"
          code={`<Flex justify="between" align="center" gap="16">
  <Brand />
  <Actions />
</Flex>`}
        >
          <Flex justify="between" align="center" gap="16" className="rounded-lg bg-surface-muted p-16">
            <Flex align="center" gap="8">
              <Box className="size-8 rounded-md bg-brand" />
              <Typography variant="label-large" as="span">
                Nezumi
              </Typography>
            </Flex>
            <Flex gap="8" wrap="wrap" justify="end">
              <Box className="h-32 w-64 rounded-md bg-surface-raised" />
              <Box className="h-32 w-96 rounded-md bg-brand/25" />
            </Flex>
          </Flex>
        </Example>

        <Example
          title="Wrapping chips"
          code={`<Flex wrap="wrap" gap="8">
  {chips}
</Flex>`}
        >
          <Flex wrap="wrap" gap="8">
            {["Responsive", "Pure", "Server ready", "Typed", "Composable", "Token based"].map((chip) => (
              <Typography
                key={chip}
                variant="body-medium"
                as="span"
                className="rounded-full border border-border bg-surface-raised px-12 py-8"
              >
                {chip}
              </Typography>
            ))}
          </Flex>
        </Example>
      </TutorialSection>

      <TutorialSection title="Item sizing" description="Known `flex` and `basis` values use static classes; custom values become inline styles.">
        <Example
          title="Custom basis"
          code={`<Flex gap="16">
  <Flex basis="12rem" p="16" />
  <Flex flex="1" p="16" />
</Flex>`}
        >
          <Flex gap="16" align="stretch">
            <Flex basis="12rem" p="16" className="rounded-lg bg-surface-muted">
              <Typography variant="body-medium" as="span">
                12rem basis
              </Typography>
            </Flex>
            <Flex flex="1" p="16" className="rounded-lg bg-brand/20">
              <Typography variant="body-medium" as="span">
                flex-1 area
              </Typography>
            </Flex>
          </Flex>
        </Example>
      </TutorialSection>

      <DemoNav
        links={[
          { label: "Grid", href: "/tutorials/grid" },
          { label: "Box", href: "/tutorials/box" },
          { label: "Section", href: "/tutorials/section" },
        ]}
      />
    </PageShell>
  )
}
