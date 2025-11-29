'use client';

import { useEffect } from 'react';
import { installTheme } from './theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    installTheme();
  }, []);

  return <>{children}</>;
}
