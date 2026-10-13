'use client';

import React, { useEffect, useState } from 'react';
import { useGlobalStyleStore } from '@/store/global-style-store';

export function GlobalStyleProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { fontFamily, fontSizeScale, accentColor, animationStyle, defaultTheme } = useGlobalStyleStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    const root = document.documentElement;

    // Apply font family class
    root.classList.remove(
      'font-sans-mode',
      'font-mono-mode',
      'font-serif-mode',
      'font-cyber-mode',
      'font-poppins-mode',
      'font-samsung-mode',
      'font-beebeez-mode',
      'font-striker-mode',
      'font-spartan-mode'
    );
    root.classList.add(`font-${fontFamily}-mode`);

    // Synchronize default theme with HTML DOM and localStorage
    if (defaultTheme === 'dark' || defaultTheme === 'midnight') {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (_) {}
    } else if (defaultTheme === 'light') {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (_) {}
    } else if (defaultTheme === 'system') {
      try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
        localStorage.removeItem('theme');
      } catch (_) {}
    }

    // Apply font size scale
    const scaleMap = {
      sm: '94%',
      md: '100%',
      lg: '106%',
      xl: '112%',
    };
    root.style.setProperty('--font-scale', scaleMap[fontSizeScale] || '100%');
    root.style.fontSize = scaleMap[fontSizeScale] || '100%';

    // Apply accent color theme variables
    const colorMap: Record<string, { primary: string; ring: string }> = {
      blue: { primary: '221.2 83.2% 53.3%', ring: '221.2 83.2% 53.3%' },
      cyan: { primary: '189 94% 43%', ring: '189 94% 43%' },
      emerald: { primary: '160 84% 39%', ring: '160 84% 39%' },
      purple: { primary: '270 76% 53%', ring: '270 76% 53%' },
      amber: { primary: '38 92% 50%', ring: '38 92% 50%' },
      rose: { primary: '346.8 77.2% 49.8%', ring: '346.8 77.2% 49.8%' },
    };

    const chosen = colorMap[accentColor] || colorMap.blue;
    root.style.setProperty('--primary', chosen.primary);
    root.style.setProperty('--ring', chosen.ring);

    // Apply animation style attribute
    root.setAttribute('data-animation-style', animationStyle);
  }, [mounted, fontFamily, fontSizeScale, accentColor, animationStyle, defaultTheme]);

  return <>{children}</>;
}
