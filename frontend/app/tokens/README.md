# Design Tokens

This directory contains the centralized design system tokens for the component library.

## Files

- **`tokens.json`** - Core design token values (colors, spacing, typography, etc.)
- **`theme.ts`** - Runtime theme installer and CSS variable generator
- **`ThemeProvider.tsx`** - React component that installs theme on mount
- **`tokens.css`** - Static CSS variables (optional alternative to runtime)
- **`index.ts`** - Public API exports

## Usage

### Automatic (Recommended)

The theme is automatically installed via `ThemeProvider` in the root layout. No additional setup needed.

### Using Tokens in Components

#### CSS Variables (Recommended)

```tsx
import styled from '@emotion/styled';

const Card = styled.div`
  background: var(--colors-cardBg);
  border: 1px solid var(--colors-cardBorder);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--elevation-card);
  color: var(--colors-textPrimary);
`;
```

#### CSS Helpers

```tsx
import { cssVars } from '@/app/tokens';

const styles = {
  background: cssVars.cardBg,
  color: cssVars.textPrimary,
  borderRadius: cssVars.radiusLg,
};
```

#### Direct Token Access

```tsx
import { theme } from '@/app/tokens';

const accentColor = theme.colors.accent.blue['500']; // #008fdd
const cardPadding = theme.spacing.md; // 16px
```

## Token Categories

### Colors
- `bg` - Page background (#1f1f20)
- `surface` - Side panel surface (#0f0f10)
- `cardBg` - Card background (#171717)
- `cardBorder` - Subtle border (rgba(255,255,255,0.04))
- `textPrimary` - Main text (#F6F6F6)
- `textSecondary` - Secondary text (#cfcfcf)
- `muted` - Muted text (#9b9b9b)
- `accent.blue` - Blue scale (50-900)
- `accent.red` - Red scale (50-900)
- `gradientHero` - Hero gradient

### Spacing
- `xs` - 4px
- `sm` - 8px
- `md` - 16px
- `lg` - 24px
- `xl` - 40px

### Border Radius
- `sm` - 8px
- `md` - 12px
- `lg` - 18px
- `pill` - 9999px

### Elevation (Shadows)
- `card` - Card shadow
- `dialog` - Modal/dialog shadow
- `insetGlow` - Subtle inner glow

### Typography
- `fontFamily` - Inter font stack
- `h1` - 28px
- `h2` - 20px
- `body` - 14px
- `mono` - 13px

## CSS Variable Naming

Tokens are converted to CSS variables with the pattern: `--{category}-{subcategory}-{key}`

Examples:
- `colors.bg` → `--colors-bg`
- `colors.accent.blue.500` → `--colors-accent-blue-500`
- `radius.lg` → `--radius-lg`
- `spacing.md` → `--spacing-md`

## Tailwind Integration

To use tokens with Tailwind, extend your `tailwind.config.js`:

```js
const tokens = require('./app/tokens/tokens.json');

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: tokens.colors.bg,
        surface: tokens.colors.surface,
        'card-bg': tokens.colors.cardBg,
      },
      borderRadius: {
        sm: tokens.radius.sm,
        md: tokens.radius.md,
        lg: tokens.radius.lg,
        pill: tokens.radius.pill,
      },
    },
  },
};
```

## Migration Notes

When migrating existing components to use tokens:

1. Replace hex colors with CSS variables
2. Replace hard-coded spacing with token spacing
3. Replace border-radius values with token radii
4. Replace box-shadow with elevation tokens
5. Test visual appearance matches dark theme

Example migration:

```tsx
// Before
const Button = styled.button`
  background: #171717;
  color: #F6F6F6;
  border-radius: 9999px;
  padding: 16px 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.6);
`;

// After
const Button = styled.button`
  background: var(--colors-cardBg);
  color: var(--colors-textPrimary);
  border-radius: var(--radius-pill);
  padding: var(--spacing-md) var(--spacing-lg);
  box-shadow: var(--elevation-card);
`;
```
