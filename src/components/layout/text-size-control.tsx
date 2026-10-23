'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useGlobalStyleStore } from '@/store/global-style-store';

interface TextSizeControlProps {
  compact?: boolean;
  className?: string;
  showPercent?: boolean;
}

export function TextSizeControl({
  compact = false,
  className = '',
  showPercent = true,
}: TextSizeControlProps) {
  const { zoomPercent, increaseFontSize, decreaseFontSize, resetFontSize } = useGlobalStyleStore();
  const currentZoom = zoomPercent || 90;

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-border/70 bg-background/90 dark:bg-card/90 backdrop-blur-xl shadow-2xs p-0.5 gap-0.5 select-none transition-all ${className}`}
      role="group"
      aria-label="Global text resize controls"
    >
      {/* A- Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={decreaseFontSize}
        disabled={currentZoom <= 75}
        className={`${
          compact ? 'h-6 px-1.5 text-[10px]' : 'h-7 px-2 text-xs'
        } font-extrabold text-foreground/80 hover:text-foreground cursor-pointer rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/70 transition-all`}
        title="Decrease text size globally (A-) [Min 75%]"
        aria-label="Decrease text size (A-)"
      >
        <span className="font-extrabold tracking-tighter">A-</span>
      </Button>

      {/* Percentage Indicator & Reset Button */}
      {showPercent && (
        <button
          type="button"
          onClick={resetFontSize}
          className={`${
            compact ? 'h-6 px-1 text-[9px]' : 'h-7 px-1.5 text-[10px]'
          } font-mono font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer rounded-md flex items-center justify-center hover:bg-primary/10`}
          title={`Current scale: ${currentZoom}%. Click to reset to default 90%`}
          aria-label={`Current text scale: ${currentZoom}%. Click to reset to 90%`}
        >
          <span>{currentZoom}%</span>
        </button>
      )}

      {/* A+ Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={increaseFontSize}
        disabled={currentZoom >= 135}
        className={`${
          compact ? 'h-6 px-1.5 text-[11px]' : 'h-7 px-2 text-xs'
        } font-extrabold text-foreground/80 hover:text-foreground cursor-pointer rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted/70 transition-all`}
        title="Increase text size globally (A+) [Max 135%]"
        aria-label="Increase text size (A+)"
      >
        <span className="font-extrabold tracking-tighter">A+</span>
      </Button>
    </div>
  );
}
