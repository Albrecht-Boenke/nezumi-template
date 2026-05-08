import Link from "next/link"
import type { ReactNode } from "react"
import { Box } from "@packages/ui/components/box"
import { Button } from "@packages/ui/components/button"
import { Container } from "@packages/ui/components/container"
import { Flex } from "@packages/ui/components/flex"
import { Grid } from "@packages/ui/components/grid"
import { Section } from "@packages/ui/components/section"

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
    <main>
      <Section size="lg" className="border-b border-border">
        <Container size="2xl">
          <Flex direction="column" gap="24">
            <Button asChild variant="ghost" size="sm" className="w-fit px-0">
              <Link href="/">Back to demo</Link>
            </Button>
            <Flex direction="column" gap="12">
              <p className="font-mono text-xs uppercase text-text-muted">
                {eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-text-muted">{description}</p>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {children}
    </main>
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
            <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
            <p className="text-sm leading-relaxed text-text-muted">{description}</p>
          </Flex>
          <Flex direction="column" gap="16">{children}</Flex>
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
      <Grid cols={{ initial: 1, xl: "minmax(0, 1fr) minmax(360px, 0.72fr)" }}>
        <Flex direction="column" gap="16" p="24">
          <Flex direction="column" gap="4">
            <h3 className="text-base font-semibold">{title}</h3>
            {description ? (
              <p className="text-sm leading-relaxed text-text-muted">{description}</p>
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
    <pre className="h-full overflow-x-auto border-t border-border bg-surface-muted p-24 text-xs leading-relaxed text-text xl:border-l xl:border-t-0">
      <code>{code.trim()}</code>
    </pre>
  )
}

export function PropTable({ props }: { props: PropDefinition[] }) {
  return (
    <Box className="overflow-hidden rounded-lg border border-border bg-surface-raised">
      <Grid
        cols="minmax(120px, 0.8fr) minmax(180px, 1fr) minmax(90px, 0.5fr) minmax(220px, 1.7fr)"
        className="hidden border-b border-border bg-surface-muted px-16 py-12 text-xs font-medium text-text-muted md:grid"
      >
        <span>Name</span>
        <span>Type</span>
        <span>Default</span>
        <span>Description</span>
      </Grid>
      {props.map((prop) => (
        <Grid
          key={prop.name}
          cols={{ initial: 1, md: "minmax(120px, 0.8fr) minmax(180px, 1fr) minmax(90px, 0.5fr) minmax(220px, 1.7fr)" }}
          gap="12"
          className="border-b border-border px-16 py-16 last:border-b-0"
        >
          <code className="font-mono text-sm text-text">{prop.name}</code>
          <code className="font-mono text-xs text-text-muted">{prop.type}</code>
          <code className="font-mono text-xs text-text-muted">{prop.default ?? "-"}</code>
          <span className="text-sm leading-relaxed text-text-muted">{prop.description}</span>
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
          <span className="text-sm text-text-muted">More layout primitives</span>
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
