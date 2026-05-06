/**
 * @nezumi/ui/components - Public API notes
 *
 * Public components are exposed as granular package exports.
 *
 * Benefits:
 * - Hide internal atomic structure
 * - Support refactoring without breaking imports
 * - Easy to swap shadcn/blocks or other components
 * - Avoid a package-wide barrel dependency graph
 *
 * Usage in apps:
 *   import { Button } from "@nezumi/ui/components/button"
 */

/* ============================================
   ATOMS (Level 1) - Primitive UI Components
   ============================================ */

export {
  Button,
  buttonVariants,
  type ButtonProps,
} from "../atoms/Button"

// Add public leaf files under src/components/<name>.tsx as components are created.

/* ============================================
   MOLECULES (Level 2) - Atom Combinations
   ============================================ */

// Molecules remain internal implementation details until exposed by leaf files.

/* ============================================
   ORGANISMS (Level 3) - Complex Sections
   ============================================ */

// Organisms remain internal implementation details until exposed by leaf files.

/* ============================================
   TEMPLATES (Level 4) - Page Layouts
   ============================================ */

// Templates remain internal implementation details until exposed by leaf files.
