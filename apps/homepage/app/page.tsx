import { Box } from "@packages/ui/components/box"
import { Container } from "@packages/ui/components/container"
import { Flex } from "@packages/ui/components/flex"
import { Grid } from "@packages/ui/components/grid"
import { Section } from "@packages/ui/components/section"
import {
  Typography,
  type TypographyTone,
  type TypographyVariant,
} from "@packages/ui/components/typography"
import { cn } from "@packages/ui/lib/utils"
import type { CSSProperties, ReactNode } from "react"

type ClampVariant = Extract<
  TypographyVariant,
  "clamp-large" | "clamp-medium" | "clamp-small" | "clamp-text"
>

type BlossomStyle = CSSProperties & Record<`--${string}`, string | number>

interface BlossomExample {
  label: string
  variant: ClampVariant
  className?: string
  mode?: "word" | "join" | "letters"
  style?: BlossomStyle
}

const clampVariants: TypographyVariant[] = [
  "clamp-large",
  "clamp-medium",
  "clamp-small",
  "clamp-text",
]

const serviceVariants: TypographyVariant[] = [
  "title-large",
  "title-medium",
  "body-medium",
  "label-large",
  "label-medium",
]

const accentVariants: TypographyVariant[] = [
  "accent-large",
  "accent-small",
]

const tones: TypographyTone[] = [
  "default",
  "muted",
  "brand",
  "success",
  "warning",
  "error",
  "info",
]

const sample = "Sicherheit beginnt mit der richtigen Hierarchie."
const blossomWord = "blütenrepublik"

const blossomExamples: BlossomExample[] = [
  {
    label: "01 light / loose",
    variant: "clamp-large",
    style: { "--blossom-weight": 300, "--blossom-tracking": "0.02em" },
  },
  {
    label: "02 bold / tight",
    variant: "clamp-large",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.055em" },
  },
  {
    label: "03 medium / wide",
    variant: "clamp-medium",
    style: { "--blossom-weight": 500, "--blossom-tracking": "0.16em" },
  },
  {
    label: "04 text / quiet",
    variant: "clamp-text",
    style: { "--blossom-weight": 400, "--blossom-tracking": "0.08em" },
  },
  {
    label: "05 split collision",
    variant: "clamp-large",
    className: "blossom-word--join",
    mode: "join",
    style: { "--blossom-weight": 500, "--blossom-tracking": "0.14em" },
  },
  {
    label: "06 split two-tone",
    variant: "clamp-medium",
    className: "blossom-word--two-tone",
    mode: "join",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.08em" },
  },
  {
    label: "07 gradient bloom",
    variant: "clamp-large",
    className: "blossom-word--gradient",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.04em" },
  },
  {
    label: "08 outline",
    variant: "clamp-medium",
    className: "blossom-word--outline",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.04em" },
  },
  {
    label: "09 shadow press",
    variant: "clamp-small",
    className: "blossom-word--press",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.02em" },
  },
  {
    label: "10 kinetic drift",
    variant: "clamp-medium",
    className: "blossom-word--drift",
    style: { "--blossom-weight": 500, "--blossom-tracking": "-0.02em" },
  },
  {
    label: "11 pulse ink",
    variant: "clamp-small",
    className: "blossom-word--pulse",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.1em" },
  },
  {
    label: "12 stripe fill",
    variant: "clamp-large",
    className: "blossom-word--stripe",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.035em" },
  },
  {
    label: "13 soft highlight",
    variant: "clamp-medium",
    className: "blossom-word--highlight",
    style: { "--blossom-weight": 400, "--blossom-tracking": "0.12em" },
  },
  {
    label: "14 echo offset",
    variant: "clamp-large",
    className: "blossom-word--echo",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.05em" },
  },
  {
    label: "15 compact seal",
    variant: "clamp-small",
    className: "blossom-word--seal",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.03em" },
  },
  {
    label: "16 wide republic",
    variant: "clamp-text",
    style: { "--blossom-weight": 500, "--blossom-tracking": "0.32em" },
  },
  {
    label: "17 fading terminals",
    variant: "clamp-medium",
    className: "blossom-word--fade",
    style: { "--blossom-weight": 400, "--blossom-tracking": "0.04em" },
  },
  {
    label: "18 vertical mark",
    variant: "clamp-small",
    className: "blossom-word--vertical",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.08em" },
  },
  {
    label: "19 letter tiles",
    variant: "clamp-text",
    className: "blossom-word--tiles",
    mode: "letters",
    style: { "--blossom-weight": 700, "--blossom-tracking": "0.02em" },
  },
  {
    label: "20 breathing color",
    variant: "clamp-large",
    className: "blossom-word--chroma",
    style: { "--blossom-weight": 700, "--blossom-tracking": "-0.045em" },
  },
]

function renderBlossomContent(mode: BlossomExample["mode"] = "word") {
  if (mode === "join") {
    return (
      <>
        <span>blüten</span>
        <span className="blossom-word__join">republik</span>
      </>
    )
  }

  if (mode === "letters") {
    return Array.from(blossomWord).map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        style={{ "--letter-shift": `${(index % 3) * -1}px` } as BlossomStyle}
      >
        {letter}
      </span>
    ))
  }

  return blossomWord
}

function VariantRow({ variant }: { variant: TypographyVariant }) {
  return (
    <Grid
      as="div"
      cols={{ initial: 1, md: "180px 1fr" }}
      gap={{ initial: "12", md: "32" }}
      py="16"
      className="border-b border-border last:border-b-0"
    >
      <Typography
        variant="label-medium"
        tone="muted"
        className="font-mono normal-case"
      >
        {variant}
      </Typography>
      <Typography variant={variant} balance>
        {sample}
      </Typography>
    </Grid>
  )
}

function TokenCard({
  label,
  title,
  children,
  inverted = false,
}: {
  label: string
  title: string
  children: ReactNode
  inverted?: boolean
}) {
  return (
    <Box
      as="section"
      p="24"
      className={
        inverted
          ? "rounded-lg bg-brand text-on-brand"
          : "rounded-lg border border-border bg-surface-raised"
      }
    >
      <Flex direction="column" gap="12">
        <Typography
          variant="label-medium"
          tone={inverted ? "on-brand" : "muted"}
          className="normal-case"
        >
          {label}
        </Typography>
        <Typography variant="title-medium" tone={inverted ? "on-brand" : "default"}>
          {title}
        </Typography>
        <Typography
          variant="body-medium"
          tone={inverted ? "on-brand" : "muted"}
          pretty
        >
          {children}
        </Typography>
      </Flex>
    </Box>
  )
}

export default function HomePage() {
  return (
    <Box as="main" minH="screen" className="bg-surface text-text">
      <Section size={{ initial: "md", md: "lg" }}>
        <Container size="2xl">
          <Flex direction="column" gap="48">
            <Grid
              as="section"
              align={{ initial: "stretch", lg: "end" }}
              cols={{
                initial: 1,
                lg: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              }}
              gap="32"
            >
              <Flex direction="column" gap="24">
                <Typography
                  variant="label-medium"
                  tone="muted"
                  className="normal-case"
                >
                  Nezumi Typography
                </Typography>
                <Typography variant="clamp-large" balance>
                  Design Tokens mit klarer Text-Hierarchie.
                </Typography>
              </Flex>
              <Typography variant="clamp-text" tone="muted" pretty>
                Die Demo nutzt den Typography-Atom aus <code>packages/ui</code>,
                ThemeProvider aus <code>packages/ui/providers</code> und die
                DESIGN.md-Typografie-Tokens aus der zentralen UI-CSS-Schicht.
              </Typography>
            </Grid>

            <Grid as="section" cols={{ initial: 1, md: 3 }} gap="16">
              <TokenCard label="Layer 1" title="Primitive">
                Urbanist, Space Grotesk, erlaubte Font-Gewichte und Rohwerte
                werden in <code>styles/tokens/typography.css</code> definiert.
              </TokenCard>
              <TokenCard label="Layer 2" title="Semantic">
                Farben und Dark Mode bleiben semantisch: <code>text</code>,
                <code>text-muted</code>, <code>brand</code> und Status-Tones.
              </TokenCard>
              <TokenCard label="Layer 3" title="Component" inverted>
                Die Klassen <code>typography-*</code> leben beim Atom und sind
                die sichtbare Component-Oberfläche für App-Text.
              </TokenCard>
            </Grid>

            <Box
              as="section"
              p="24"
              className="rounded-lg border border-border bg-surface-raised"
            >
              <Flex direction="column" gap="24">
                <Flex direction="column" gap="8">
                  <Typography
                    variant="label-medium"
                    tone="muted"
                    className="normal-case"
                  >
                    Clamp Mode
                  </Typography>
                  <Typography variant="title-large" balance>
                    Vier fluid skalierende Größen für Public Content
                  </Typography>
                </Flex>
                <Box>
                  {clampVariants.map((variant) => (
                    <VariantRow key={variant} variant={variant} />
                  ))}
                </Box>
              </Flex>
            </Box>

            <Box
              as="section"
              p="24"
              className="rounded-lg border border-border bg-surface-raised"
            >
              <Flex direction="column" gap="24">
                <Flex direction="column" gap="8">
                  <Typography
                    variant="label-medium"
                    tone="muted"
                    className="normal-case"
                  >
                    Blütenrepublik
                  </Typography>
                  <Typography variant="title-large" balance>
                    Clamp-Schrift als typografisches Material
                  </Typography>
                  <Typography variant="body-medium" tone="muted" pretty>
                    Diese Beispiele variieren Gewicht, Tracking, Trennung,
                    Farbe und Bewegung direkt auf der Clamp-Skala.
                  </Typography>
                </Flex>

                <Grid cols={{ initial: 1, lg: 2 }} gap="16">
                  {blossomExamples.map((example) => (
                    <Box
                      as="article"
                      className="blossom-card rounded-lg border border-border bg-surface"
                      key={example.label}
                      p="16"
                    >
                      <Flex direction="column" gap="16">
                        <Typography
                          variant="label-medium"
                          tone="muted"
                          className="normal-case"
                        >
                          {example.label}
                        </Typography>
                        <Typography
                          as="p"
                          aria-label={example.mode === "join"
                            ? "blüten republik"
                            : blossomWord}
                          className={cn("blossom-word", example.className)}
                          style={example.style}
                          variant={example.variant}
                        >
                          {renderBlossomContent(example.mode)}
                        </Typography>
                      </Flex>
                    </Box>
                  ))}
                </Grid>
              </Flex>
            </Box>

            <Box
              as="section"
              p="24"
              className="rounded-lg border border-border bg-surface-raised"
            >
              <Flex direction="column" gap="24">
                <Flex direction="column" gap="8">
                  <Typography
                    variant="label-medium"
                    tone="muted"
                    className="normal-case"
                  >
                    Service Mode
                  </Typography>
                  <Typography variant="title-large" balance>
                    Fünf feste Größen für strukturierte Produktoberflächen
                  </Typography>
                </Flex>
                <Box>
                  {serviceVariants.map((variant) => (
                    <VariantRow key={variant} variant={variant} />
                  ))}
                </Box>
                <Grid cols={{ initial: 1, md: 2 }} gap="16">
                  {accentVariants.map((variant) => (
                    <Box
                      as="article"
                      className="rounded-lg border border-border bg-surface"
                      key={variant}
                      p="16"
                    >
                      <Flex direction="column" gap="12">
                        <Typography
                          variant="label-medium"
                          tone="muted"
                          className="normal-case"
                        >
                          Space Grotesk / {variant}
                        </Typography>
                        <Typography variant={variant}>
                          Sekundäre Font-Variante
                        </Typography>
                      </Flex>
                    </Box>
                  ))}
                </Grid>
              </Flex>
            </Box>

            <Box
              as="section"
              p="24"
              className="rounded-lg border border-border bg-surface-raised"
            >
              <Flex direction="column" gap="24">
                <Flex direction="column" gap="8">
                  <Typography
                    variant="label-medium"
                    tone="muted"
                    className="normal-case"
                  >
                    Tones
                  </Typography>
                  <Typography variant="title-large" balance>
                    Textfarbe bleibt semantisch
                  </Typography>
                </Flex>
                <Grid cols={{ initial: 1, md: 3 }} gap="16">
                  {tones.map((tone) => (
                    <Typography key={tone} variant="body-medium" tone={tone}>
                      tone={tone}
                    </Typography>
                  ))}
                </Grid>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Section>
    </Box>
  )
}
