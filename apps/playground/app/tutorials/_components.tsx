import Link from "next/link"
import type { ReactNode } from "react"
import { Box } from "@packages/ui/components/box"
import { Button } from "@packages/ui/components/button"
import { Container } from "@packages/ui/components/container"
import { Flex } from "@packages/ui/components/flex"
import { Grid } from "@packages/ui/components/grid"
import { Section } from "@packages/ui/components/section"
import { Typography } from "@packages/ui/components/typography"

export type PropDefinition = {
  name: string
  type: string
  default?: string
  description: string
}

export type TutorialLink = {
  label: string
  href: string
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Container as="main" className="w-full">
      <Section size={{ initial: "md", lg: "lg" }} className="border-b border-border">
        <Container size="2xl">
          <Flex direction="column" gap="24">
            <Button asChild variant="ghost" size="sm" className="w-fit px-0">
              <Link href="/">Back to demo</Link>
            </Button>
            <Flex direction="column" gap="12">
              {eyebrow}
              <Typography variant="clamp-medium" balance className="max-w-3xl">
                {title}
              </Typography>
              <Typography variant="body-medium" tone="muted" pretty className="max-w-3xl">
                {description}
              </Typography>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {children}
    </Container>
  )
}

export function TutorialSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Section size="md">
      <Container size="2xl">
        <Grid cols={{ initial: 1, lg: "280px minmax(0, 1fr)" }} gap="32">
          <Flex direction="column" gap="8">
            <Typography variant="title-medium" balance>
              {title}
            </Typography>
            <Typography variant="body-medium" tone="muted" pretty>
              {description}
            </Typography>
          </Flex>
          <Flex direction="column" gap="16">
            {children}
          </Flex>
        </Grid>
      </Container>
    </Section>
  )
}

export function Example({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  code: string
  children: ReactNode
}) {
  return (
    <Box className="overflow-hidden rounded-lg border border-border bg-surface-raised">
      <Grid cols={{ initial: 1, lg: "minmax(0, 1fr) minmax(360px, 0.72fr)" }}>
        <Flex direction="column" gap="16" p="24">
          <Flex direction="column" gap="4">
            <Typography variant="title-medium">{title}</Typography>
            {description ? (
              <Typography variant="body-medium" tone="muted" pretty>
                {description}
              </Typography>
            ) : null}
          </Flex>
          <Box p="16" className="rounded-lg border border-border bg-surface">
            {children}
          </Box>
        </Flex>
        <CodeBlock code={code} />
      </Grid>
    </Box>
  )
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="h-full overflow-x-auto border-t border-border bg-surface-muted p-24 text-code leading-code text-text lg:border-l lg:border-t-0">
      <code>{code.trim()}</code>
    </pre>
  )
}

export function PropTable({ props }: { props: PropDefinition[] }) {
  return (
    <Box className="overflow-hidden rounded-lg border border-border bg-surface-raised">
      <Grid
        cols="minmax(120px, 0.8fr) minmax(180px, 1fr) minmax(90px, 0.5fr) minmax(220px, 1.7fr)"
        className="hidden border-b border-border bg-surface-muted px-16 py-12 md:grid"
      >
        <Typography variant="label-large" tone="muted" as="span">
          Name
        </Typography>
        <Typography variant="label-large" tone="muted" as="span">
          Type
        </Typography>
        <Typography variant="label-large" tone="muted" as="span">
          Default
        </Typography>
        <Typography variant="label-large" tone="muted" as="span">
          Description
        </Typography>
      </Grid>
      {props.map((prop) => (
        <Grid
          key={prop.name}
          cols={{ initial: 1, md: "minmax(120px, 0.8fr) minmax(180px, 1fr) minmax(90px, 0.5fr) minmax(220px, 1.7fr)" }}
          gap="12"
          className="border-b border-border px-16 py-16 last:border-b-0"
        >
          <code className="font-accent text-code-sm text-text">{prop.name}</code>
          <code className="font-accent text-code text-text-muted">{prop.type}</code>
          <code className="font-accent text-code text-text-muted">{prop.default ?? "-"}</code>
          <Typography variant="body-medium" tone="muted" pretty as="span">
            {prop.description}
          </Typography>
        </Grid>
      ))}
    </Box>
  )
}

export function Surface({
  children,
  muted = false,
}: {
  children: ReactNode
  muted?: boolean
}) {
  return (
    <Box
      p="16"
      className={muted
        ? "rounded-lg border border-border bg-surface-muted"
        : "rounded-lg border border-border bg-surface-raised"}
    >
      {children}
    </Box>
  )
}

export function DemoNav({ links }: { links: TutorialLink[] }) {
  return (
    <Section size="sm" className="border-t border-border">
      <Container size="2xl">
        <Flex justify="between" align="center" gap="16" wrap="wrap">
          <Typography variant="body-medium" tone="muted">
            More layout primitives
          </Typography>
          <Flex gap="8" wrap="wrap">
            {links.map((link) => (
              <Button key={link.href} asChild variant="outline" size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Section>
  )
}
