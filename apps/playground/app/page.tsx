import Link from "next/link"
import { Box, Container, Flex, Grid, Section } from "@packages/ui/layout"
import { Button } from "@packages/ui/components/button"
import { Typography } from "@packages/ui/components/typography"

const components = [
  {
    name: "Grid",
    href: "/tutorials/grid",
    index: "01",
    summary: "Responsive columns, rows, track templates, and axis gaps.",
    props: ["cols", "rows", "gap", "autoFlow"],
  },
  {
    name: "Flex",
    href: "/tutorials/flex",
    index: "02",
    summary: "Direction, wrapping, alignment, and flex-item sizing.",
    props: ["direction", "wrap", "gap", "align"],
  },
  {
    name: "Box",
    href: "/tutorials/box",
    index: "03",
    summary: "The neutral polymorphic wrapper shared by every layout primitive.",
    props: ["as", "display", "p", "w"],
  },
  {
    name: "Section",
    href: "/tutorials/section",
    index: "04",
    summary: "Semantic page bands with vertical rhythm presets.",
    props: ["size", "py", "as", "id"],
  },
  {
    name: "Container",
    href: "/tutorials/container",
    index: "05",
    summary: "Centered max-width wrapper with responsive page gutters.",
    props: ["size", "centered", "px", "maxW"],
  },
]

function MiniDashboard() {
  return (
    <Box className="overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm">
      <Flex
        align="center"
        justify="between"
        gap="16"
        px="16"
        py="12"
        className="border-b border-border"
      >
        <Flex align="center" gap="8">
          <Box w="8" h="8" className="rounded-md bg-brand" />
          <Typography variant="label-large" as="span">
            Preview
          </Typography>
        </Flex>
        <Flex gap="8" display={{ initial: "none", md: "flex" }}>
          <Box h="8" w="64" className="rounded-sm bg-surface-muted" />
          <Box h="8" w="64" className="rounded-sm bg-surface-muted" />
          <Box h="8" w="64" className="rounded-sm bg-surface-muted" />
        </Flex>
      </Flex>

      <Box p="16">
        <Grid cols={{ initial: 1, md: 4 }} gap="16">
          {["Revenue", "Users", "Orders", "Active"].map((label, index) => (
            <Box
              key={label}
              p="16"
              className="rounded-lg border border-border bg-surface"
            >
              <Flex direction="column" gap="8">
                <Typography variant="label-large" tone="muted" as="span">
                  {label}
                </Typography>
                <Typography variant="title-medium" as="span">
                  {index === 0 ? "$45.2k" : index === 1 ? "2,340" : index === 2 ? "1,210" : "573"}
                </Typography>
                <Typography variant="label-large" tone="success" as="span">
                  +{(index + 3) * 4}.2%
                </Typography>
              </Flex>
            </Box>
          ))}
        </Grid>

        <Grid cols={{ initial: 1, lg: "2fr 1fr" }} gap="16" pt="16">
          <Box p="16" className="rounded-lg border border-border bg-surface">
            <Flex direction="column" gap="12">
              <Flex justify="between" align="center">
                <Typography variant="label-large" as="span">
                  Layout composition
                </Typography>
                <Typography variant="label-large" tone="muted" as="span">
                  Grid + Flex + Box
                </Typography>
              </Flex>
              <Grid cols={12} gap="8" h="40" align="end">
                {[34, 58, 42, 76, 64, 88, 52, 70, 92, 66, 84, 72].map((height, index) => (
                  <Box
                    key={`${height}-${index}`}
                    className="rounded-sm bg-brand"
                    style={{ height: `${height}%`, opacity: 0.35 + index * 0.035 }}
                  />
                ))}
              </Grid>
            </Flex>
          </Box>

          <Box p="16" className="rounded-lg border border-border bg-surface">
            <Flex direction="column" gap="12">
              {["Container", "Section", "Grid", "Flex"].map((label) => (
                <Flex key={label} align="center" gap="12">
                  <Box w="8" h="8" className="rounded-full bg-surface-muted" />
                  <Box h="8" flex="1" className="rounded-sm bg-surface-muted" />
                  <Typography variant="body-medium" tone="muted" className="min-w-24 shrink-0" as="span">
                    {label}
                  </Typography>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default function PlaygroundPage() {
  return (
    <Container as="main">
      <Section size={{ initial: "lg", lg: "xl" }} className="border-b border-border">
        <Container size="2xl">
          <Grid cols={{ initial: 1, lg: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }} gap="48" align="center">
            <Flex direction="column" gap="24">
              <Flex direction="column" gap="12">
                <Typography variant="label-medium" tone="muted">
                  Nezumi UI layout primitives
                </Typography>
                <Typography variant="clamp-large" balance className="max-w-3xl">
                  Build pages from five predictable layout components.
                </Typography>
                <Typography variant="body-medium" tone="muted" pretty className="max-w-2xl">
                  A focused demo for `Box`, `Container`, `Flex`, `Grid`, and `Section`, adapted to the
                  current Tailwind v4 and React 19 API in this repo.
                </Typography>
              </Flex>

              <Flex gap="12" wrap="wrap">
                <Button asChild>
                  <Link href="/tutorials/grid">Start with Grid</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#components">Browse components</Link>
                </Button>
              </Flex>
            </Flex>

            <MiniDashboard />
          </Grid>
        </Container>
      </Section>

      <Section id="components" size={{ initial: "md", lg: "lg" }}>
        <Container size="2xl">
          <Flex direction="column" gap="24">
            <Flex direction="column" gap="8">
              <Typography variant="label-medium" tone="muted">
                Tutorials
              </Typography>
              <Typography variant="title-large" balance>
                Component guides
              </Typography>
            </Flex>

            <Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="16">
              {components.map((component) => (
                <Box
                  key={component.name}
                  p="24"
                  className="rounded-lg border border-border bg-surface-raised"
                >
                  <Flex direction="column" gap="16">
                    <Flex justify="between" align="start" gap="16">
                      <Flex direction="column" gap="4">
                        <Typography variant="label-medium" tone="muted" as="span">
                          {component.index}
                        </Typography>
                        <Typography variant="title-medium" as="span">
                          {component.name}
                        </Typography>
                      </Flex>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={component.href}>Open</Link>
                      </Button>
                    </Flex>
                    <Typography variant="body-medium" tone="muted" pretty>
                      {component.summary}
                    </Typography>
                    <Flex gap="8" wrap="wrap">
                      {component.props.map((prop) => (
                        <code
                          key={prop}
                          className="rounded-sm bg-surface-muted px-8 py-4 font-accent text-code text-text-muted"
                        >
                          {prop}
                        </code>
                      ))}
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>
    </Container>
  )
}
