'use client';

import React, { useEffect, useState } from 'react';
import { useGlobalStyleStore } from '@/store/global-style-store';

function getFontFamilyValue(choice?: string): string {
  switch (choice) {
    case 'sans':
      return "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case 'mono':
      return "var(--font-mono), 'JetBrains Mono', 'Fira Code', Consolas, monospace";
    case 'serif':
      return "'Merriweather', 'Georgia', Cambria, serif";
    case 'cyber':
      return "'Space Grotesk', 'Orbitron', var(--font-inter), sans-serif";
    case 'poppins':
      return "'Poppins', var(--font-inter), sans-serif";
    case 'samsung':
      return "'Samsung Sans', 'SamsungOne', 'Segoe UI', system-ui, sans-serif";
    case 'beebeez':
      return "'Bebas Neue', sans-serif";
    case 'striker':
      return "'Victory Striker Sans', 'Teko', 'Barlow Condensed', sans-serif";
    case 'spartan':
      return "'League Spartan', sans-serif";
    default:
      return "var(--font-inter), system-ui, sans-serif";
  }
}

function getVisualsFontSizeValue(size?: string): string {
  switch (size) {
    case 'xs': return '0.72rem';
    case 'sm': return '0.8rem';
    case 'base': return '0.9rem';
    case 'lg': return '1rem';
    default: return '0.8rem';
  }
}

function getTechBoxTitleSizeValue(size?: string): string {
  switch (size) {
    case 'xs': return '0.72rem';
    case 'sm': return '0.8rem';
    case 'base': return '0.875rem';
    case 'lg': return '1rem';
    case 'xl': return '1.15rem';
    default: return '0.8rem';
  }
}

function getTechBoxBodySizeValue(size?: string): string {
  switch (size) {
    case 'xs': return '0.75rem';
    case 'sm': return '0.825rem';
    case 'base': return '0.9rem';
    default: return '0.75rem';
  }
}

function getStoryFontSizeValue(size?: string): string {
  switch (size) {
    case 'sm': return '0.875rem';
    case 'base': return '1rem';
    case 'lg': return '1.125rem';
    case 'xl': return '1.25rem';
    case '2xl': return '1.4rem';
    default: return '1rem';
  }
}

function getHeadingFontSizeValue(size?: string): string {
  switch (size) {
    case 'xl': return '1.35rem';
    case '2xl': return '1.65rem';
    case '3xl': return '2rem';
    case '4xl': return '2.45rem';
    default: return '1.875rem';
  }
}

function getLineHeightValue(choice?: string): string {
  switch (choice) {
    case 'normal': return '1.5';
    case 'relaxed': return '1.75';
    case 'loose': return '2.0';
    default: return '1.75';
  }
}

export function GlobalStyleProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const {
    fontFamily,
    fontSizeScale,
    zoomPercent,
    accentColor,
    animationStyle,
    defaultTheme,
    visualsFontFamily,
    visualsFontSize,
    techBoxFontFamily,
    techBoxTitleSize,
    techBoxBodySize,
    storyFontFamily,
    storyFontSize,
    storyLineHeight,
    headingFontFamily,
    headingFontSize,
  } = useGlobalStyleStore();

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

    // Apply font size scale (default 90% at start, responsive to A+ and A- buttons)
    const scaleMap: Record<string, string> = {
      sm: '90%',
      md: '100%',
      lg: '106%',
      xl: '112%',
    };
    const activeScale = zoomPercent ? `${zoomPercent}%` : (scaleMap[fontSizeScale || 'sm'] || '90%');
    root.style.setProperty('--font-scale', activeScale);
    root.style.setProperty('--zoom-factor', (parseInt(activeScale, 10) / 100).toString());
    root.style.fontSize = activeScale;

    // Apply Granular Visuals, Tech Box, Story & Heading CSS Variables
    root.style.setProperty('--font-visuals', getFontFamilyValue(visualsFontFamily || 'sans'));
    root.style.setProperty('--font-visuals-size', getVisualsFontSizeValue(visualsFontSize || 'sm'));

    root.style.setProperty('--font-techbox', getFontFamilyValue(techBoxFontFamily || 'mono'));
    root.style.setProperty('--font-techbox-title-size', getTechBoxTitleSizeValue(techBoxTitleSize || 'sm'));
    root.style.setProperty('--font-techbox-body-size', getTechBoxBodySizeValue(techBoxBodySize || 'xs'));

    root.style.setProperty('--font-story', getFontFamilyValue(storyFontFamily || 'sans'));
    root.style.setProperty('--font-story-size', getStoryFontSizeValue(storyFontSize || 'base'));
    root.style.setProperty('--font-story-line-height', getLineHeightValue(storyLineHeight || 'relaxed'));

    root.style.setProperty('--font-heading', getFontFamilyValue(headingFontFamily || 'sans'));
    root.style.setProperty('--font-heading-size', getHeadingFontSizeValue(headingFontSize || '2xl'));

    // Apply selective color schema & accent color theme variables
    const colorMap: Record<string, { primary: string; ring: string }> = {
      blue: { primary: '221.2 83.2% 53.3%', ring: '221.2 83.2% 53.3%' },
      cyan: { primary: '189 94% 43%', ring: '189 94% 43%' },
      emerald: { primary: '160 84% 39%', ring: '160 84% 39%' },
      purple: { primary: '270 76% 53%', ring: '270 76% 53%' },
      amber: { primary: '38 92% 50%', ring: '38 92% 50%' },
      rose: { primary: '346.8 77.2% 49.8%', ring: '346.8 77.2% 49.8%' },
      orange: { primary: '24.6 95% 53.1%', ring: '24.6 95% 53.1%' },
      slate: { primary: '215.4 16.3% 46.9%', ring: '215.4 16.3% 46.9%' },
    };

    const chosen = colorMap[accentColor] || colorMap.blue;
    root.style.setProperty('--primary', chosen.primary);
    root.style.setProperty('--ring', chosen.ring);

    // Apply animation style attribute
    root.setAttribute('data-animation-style', animationStyle);
  }, [
    mounted,
    fontFamily,
    fontSizeScale,
    zoomPercent,
    accentColor,
    animationStyle,
    defaultTheme,
    visualsFontFamily,
    visualsFontSize,
    techBoxFontFamily,
    techBoxTitleSize,
    techBoxBodySize,
    storyFontFamily,
    storyFontSize,
    storyLineHeight,
    headingFontFamily,
    headingFontSize,
  ]);

  return <>{children}</>;
}
