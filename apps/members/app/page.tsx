import { Container } from "@packages/ui/components/container"
import { Section } from "@packages/ui/components/section"
import { Typography } from "@packages/ui/components/typography"

export default function MembersPage() {
  return (
    <Container
      as="main"
      display="flex"
      size="md"
      className="min-h-screen flex-col justify-center"
      py="16"
    >
      <Section className="flex flex-col gap-16" px="0" py="0">
        <Typography variant="label-large" tone="muted">
          Members
        </Typography>
        <Typography variant="title-large" balance>
          Mitgliederbereich
        </Typography>
        <Typography variant="body-medium" tone="muted" pretty className="max-w-xl">
          Minimale Startseite der Members-App.
        </Typography>
      </Section>
    </Container>
  )
}
