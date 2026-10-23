'use client';

import React from 'react';
import { Palette, Check, Sun, Moon, Sparkles, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGlobalStyleStore,
  SELECTIVE_COLOR_SCHEMAS,
  AccentColorChoice,
  DefaultThemeChoice,
} from '@/store/global-style-store';
import { useToast } from '@/components/ui/toast-provider';

export function ColorSchemaPicker({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  const { accentColor, setAccentColor, defaultTheme, setDefaultTheme } = useGlobalStyleStore();
  const { showToast } = useToast();

  const activeSchema =
    SELECTIVE_COLOR_SCHEMAS.find((s) => s.id === accentColor) || SELECTIVE_COLOR_SCHEMAS[0];

  const handleSelectSchema = (schemaId: AccentColorChoice, schemaName: string) => {
    setAccentColor(schemaId);
    showToast({
      type: 'success',
      title: 'Color Schema Updated',
      description: `Accent palette changed to ${schemaName}.`,
    });
  };

  const handleSelectTheme = (theme: DefaultThemeChoice) => {
    setDefaultTheme(theme);
    const root = document.documentElement;
    if (theme === 'dark' || theme === 'midnight') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      localStorage.removeItem('theme');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-9 px-2.5 rounded-xl border-border/80 bg-background/80 dark:bg-card/80 backdrop-blur-xl hover:bg-muted/70 gap-2 cursor-pointer shadow-2xs transition-all ${className}`}
          title={`Selective Color Schema: ${activeSchema.name} (${activeSchema.label})`}
          aria-label="Selective Color Schema and Theme selector"
        >
          <div className="relative flex items-center justify-center">
            <Palette className="w-3.5 h-3.5 text-foreground/80" />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${activeSchema.bgClass} ring-1 ring-background`}
            />
          </div>
          {!compact && (
            <span className="hidden lg:inline text-xs font-semibold text-foreground/90">
              {activeSchema.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-background/95 dark:bg-card/95 backdrop-blur-2xl border-border/80 shadow-2xl rounded-2xl z-[60]"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-primary" />
              Selective Color Schema
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">8 Palettes</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-normal mt-0.5">
            Choose accent glow &amp; telemetry branding
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        {/* 8 Selective Color Schemas */}
        <div className="grid grid-cols-2 gap-1 p-1">
          {SELECTIVE_COLOR_SCHEMAS.map((schema) => {
            const isSelected = accentColor === schema.id;
            return (
              <button
                key={schema.id}
                type="button"
                onClick={() => handleSelectSchema(schema.id, schema.name)}
                className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-primary/60 bg-primary/10 shadow-2xs font-bold text-foreground ring-1 ring-primary/40'
                    : 'border-transparent hover:border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
                title={schema.description}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full ${schema.bgClass} shadow-xs shrink-0 ring-1 ring-black/10 dark:ring-white/10`}
                />
                <span className="truncate text-[11px] leading-tight flex-1">{schema.name}</span>
                {isSelected && <Check className="w-3 h-3 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        {/* Theme Mode Quick Select */}
        <DropdownMenuLabel className="px-2 py-1 text-[11px] font-semibold text-muted-foreground">
          Display Theme Mode
        </DropdownMenuLabel>

        <div className="grid grid-cols-3 gap-1 px-1">
          <button
            type="button"
            onClick={() => handleSelectTheme('light')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              defaultTheme === 'light'
                ? 'border-primary/60 bg-primary/10 text-foreground ring-1 ring-primary/30'
                : 'border-border/60 hover:bg-muted/50 text-muted-foreground'
            }`}
          >
            <Sun className="w-3 h-3 text-amber-500" />
            <span>Light</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('dark')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              defaultTheme === 'dark'
                ? 'border-primary/60 bg-primary/10 text-foreground ring-1 ring-primary/30'
                : 'border-border/60 hover:bg-muted/50 text-muted-foreground'
            }`}
          >
            <Moon className="w-3 h-3 text-sky-400" />
            <span>Dark</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTheme('midnight')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
              defaultTheme === 'midnight'
                ? 'border-primary/60 bg-primary/10 text-foreground ring-1 ring-primary/30'
                : 'border-border/60 hover:bg-muted/50 text-muted-foreground'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>OLED</span>
          </button>
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          onClick={() => window.dispatchEvent(new CustomEvent('soc:open-global-admin'))}
          className="text-xs font-semibold text-primary cursor-pointer gap-2 py-1.5 rounded-lg"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Open Full Typography &amp; Style Console</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
