import { Container, Stack } from "@packages/ui/layout"
import { Typography } from "@packages/ui/components/typography"

export default function MembersPage() {
  return (
    <Container as="main" size="md" py="16">
      <Stack as="section" spacing="16">
        <Typography variant="label-large" tone="muted">
          Members
        </Typography>
        <Typography variant="title-large" balance>
          Mitgliederbereich
        </Typography>
        <Typography variant="body-medium" tone="muted" pretty className="max-w-xl">
          Minimale Startseite der Members-App.
        </Typography>
      </Stack>
    </Container>
  )
}
