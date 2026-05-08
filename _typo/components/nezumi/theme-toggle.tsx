'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { NezumiButton } from './button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <NezumiButton
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
      // Avoid hydration mismatch by rendering a stable label until mounted
      suppressHydrationWarning
    >
      {isDark ? <Sun className="size-16" /> : <Moon className="size-16" />}
      <span>{mounted ? (isDark ? 'Hell' : 'Dunkel') : 'Theme'}</span>
    </NezumiButton>
  )
}
