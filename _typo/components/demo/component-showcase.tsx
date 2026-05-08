'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  Lock,
  Mail,
  Search,
  TriangleAlert,
} from 'lucide-react'
import { Paper } from '@/components/nezumi/paper'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/nezumi/card'
import { NezumiButton } from '@/components/nezumi/button'
import { NezumiInput } from '@/components/nezumi/input'
import { Badge } from '@/components/nezumi/badge'
import { Typography } from '@/components/typography'

export function ComponentShowcase() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const emailError =
    email.length > 0 && !email.includes('@') ? 'Bitte gültige E-Mail eingeben.' : undefined

  return (
    <div className="flex flex-col gap-32">
      {/* Buttons */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Buttons · Variants
        </Typography>
        <Typography variant="title-medium">
          Radius 4px · keine Pill-Buttons
        </Typography>

        <div className="flex flex-wrap gap-12 mt-8">
          <NezumiButton>Bestätigen</NezumiButton>
          <NezumiButton variant="tonal">Tonal</NezumiButton>
          <NezumiButton variant="outline">Outline</NezumiButton>
          <NezumiButton variant="ghost">Ghost</NezumiButton>
          <NezumiButton variant="elevated">Elevated</NezumiButton>
          <NezumiButton variant="destructive">Löschen</NezumiButton>
          <NezumiButton variant="link">Mehr erfahren</NezumiButton>
        </div>

        <div className="mt-16">
          <Typography variant="label-small" tone="muted">
            Sizes
          </Typography>
        </div>
        <div className="flex flex-wrap items-end gap-12">
          <NezumiButton size="xs">XS</NezumiButton>
          <NezumiButton size="sm">SM</NezumiButton>
          <NezumiButton size="default">
            Default <ArrowRight className="size-16" />
          </NezumiButton>
          <NezumiButton size="lg">Large</NezumiButton>
          <NezumiButton size="xl">XL</NezumiButton>
        </div>
      </Paper>

      {/* Inputs */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Inputs · Höhe 56px · Radius 16px
        </Typography>
        <Typography variant="title-medium">
          Hover-Border = text · Error-Border = error
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-8">
          <NezumiInput
            label="E-Mail"
            placeholder="name@nezumi.de"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorText={emailError}
            leadingIcon={<Mail className="size-16" />}
            description="Wir nutzen diese Adresse nur zur Authentifizierung."
          />
          <NezumiInput
            label="Passwort"
            type="password"
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            leadingIcon={<Lock className="size-16" />}
          />
          <NezumiInput
            label="Suche"
            placeholder="Vorgang, Mandant, Belegnummer …"
            leadingIcon={<Search className="size-16" />}
          />
          <NezumiInput
            label="Deaktiviert"
            placeholder="Nicht editierbar"
            disabled
            description="Wird automatisch befüllt."
          />
        </div>
      </Paper>

      {/* Status chips */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Status · Chips & Badges
        </Typography>
        <Typography variant="title-medium">
          Tonale Backgrounds, keine gesättigten Fills
        </Typography>

        <div className="flex flex-wrap gap-12 mt-8">
          <Badge tone="success">
            <Check className="size-12" /> Aktiv
          </Badge>
          <Badge tone="warning">
            <TriangleAlert className="size-12" /> Wartung
          </Badge>
          <Badge tone="error">Fehler</Badge>
          <Badge tone="info">Hinweis</Badge>
          <Badge tone="neutral">Entwurf</Badge>
          <Badge tone="success" shape="badge">
            badge-shape
          </Badge>
        </div>
      </Paper>

      {/* Card collection */}
      <div>
        <Typography variant="label-small" tone="muted">
          Card · nur für diskrete Objekte
        </Typography>
        <Typography variant="title-medium">
          Hairline-Border, Surface-Raised, optional interaktiv
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mt-16">
          {[
            {
              title: 'Hauptkonto',
              meta: 'IBAN · DE89 …',
              status: 'success' as const,
              statusLabel: 'Verifiziert',
            },
            {
              title: 'Treuhandkonto',
              meta: 'IBAN · DE71 …',
              status: 'warning' as const,
              statusLabel: 'Prüfung',
            },
            {
              title: 'Rückstellung',
              meta: 'IBAN · DE45 …',
              status: 'info' as const,
              statusLabel: 'Eingehend',
            },
          ].map((c) => (
            <Card key={c.title} elevated interactive>
              <CardHeader>
                <div className="flex items-center justify-between gap-12">
                  <Typography variant="title-medium">{c.title}</Typography>
                  <Badge tone={c.status}>{c.statusLabel}</Badge>
                </div>
                <Typography variant="body-small" tone="muted">
                  {c.meta}
                </Typography>
              </CardHeader>
              <CardContent>
                <Typography variant="body-medium">
                  Letzter Saldo zum Tagesende.
                </Typography>
                <Typography variant="display-small" className="mt-8">
                  €&nbsp;128.430,00
                </Typography>
              </CardContent>
              <CardFooter>
                <NezumiButton variant="ghost" size="sm">
                  Details
                </NezumiButton>
                <NezumiButton size="sm">
                  Übertragen <ArrowRight className="size-16" />
                </NezumiButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
