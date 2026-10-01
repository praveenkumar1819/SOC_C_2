'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-xl glass-pill text-muted-foreground opacity-50"
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-xl glass-pill hover:bg-primary/10 transition-all cursor-pointer relative overflow-hidden group shadow-2xs"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 rotate-0 scale-100 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 rotate-0 scale-100 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      )}
    </Button>
  );
}
