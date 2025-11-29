// /app/tokens/theme.ts
// Installs CSS variables at runtime and exports a JS theme object.
// Usage: import { installTheme, theme } from '@/app/tokens/theme'; installTheme(theme);

import tokens from './tokens.json';

type Tokens = typeof tokens;

function toCssVarName(path: string[]): string {
  return '--' + path.join('-').replace(/\./g, '-');
}

function flatten(
  obj: any,
  parent: string[] = [],
  out: Record<string, string> = {},
) {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = parent.concat([key]);
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      !/^#/.test(Object.values(val)[0] as any)
    ) {
      flatten(val, path, out);
    } else {
      out[toCssVarName(path)] = String(val);
    }
  }
  return out;
}

export const theme = tokens as Tokens;

export function installTheme(t = theme) {
  const flat = flatten(t as any);
  const root = document.documentElement;
  Object.entries(flat).forEach(([k, v]) => root.style.setProperty(k, v));
}

// Helper token references for CSS-in-JS
export const cssVars = {
  bg: 'var(--colors-bg)',
  surface: 'var(--colors-surface)',
  cardBg: 'var(--colors-cardBg)',
  cardBorder: 'var(--colors-cardBorder)',
  textPrimary: 'var(--colors-textPrimary)',
  textSecondary: 'var(--colors-textSecondary)',
  textMuted: 'var(--colors-muted)',
  accentBlue500: 'var(--colors-accent-blue-500)',
  accentRed500: 'var(--colors-accent-red-500)',
  gradientHero: 'var(--colors-gradientHero)',
  radiusSm: 'var(--radius-sm)',
  radiusMd: 'var(--radius-md)',
  radiusLg: 'var(--radius-lg)',
  radiusPill: 'var(--radius-pill)',
  spacingXs: 'var(--spacing-xs)',
  spacingSm: 'var(--spacing-sm)',
  spacingMd: 'var(--spacing-md)',
  spacingLg: 'var(--spacing-lg)',
  spacingXl: 'var(--spacing-xl)',
  elevationCard: 'var(--elevation-card)',
  elevationDialog: 'var(--elevation-dialog)',
  elevationInsetGlow: 'var(--elevation-insetGlow)',
};
