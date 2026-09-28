'use client';

import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

interface MultipleSelectProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
  isSubmitted: boolean;
  correctAnswers: string[];
}

export function MultipleSelect({
  options,
  selectedOptions,
  onToggle,
  isSubmitted,
  correctAnswers
}: MultipleSelectProps) {
  return (
    <div className="space-y-2.5">
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option);
        const shouldBeSelected = correctAnswers.includes(option);
        const isCorrectlyPicked = isSubmitted && isSelected && shouldBeSelected;
        const isMissed = isSubmitted && !isSelected && shouldBeSelected;
        const isWronglyPicked = isSubmitted && isSelected && !shouldBeSelected;

        let borderClass = 'border-border/80 hover:border-border hover:bg-slate-50';
        let bgClass = 'bg-white';
        let textClass = 'text-foreground';

        if (isSubmitted) {
          if (isCorrectlyPicked) {
            borderClass = 'border-emerald-500 ring-2 ring-emerald-500/20';
            bgClass = 'bg-emerald-50/80';
            textClass = 'text-emerald-950 font-semibold';
          } else if (isMissed) {
            borderClass = 'border-amber-500 ring-2 ring-amber-500/20';
            bgClass = 'bg-amber-50/80';
            textClass = 'text-amber-950';
          } else if (isWronglyPicked) {
            borderClass = 'border-rose-500 ring-2 ring-rose-500/20';
            bgClass = 'bg-rose-50/80';
            textClass = 'text-rose-950 font-semibold';
          } else {
            borderClass = 'border-border/50 opacity-60';
          }
        } else if (isSelected) {
          borderClass = 'border-primary ring-2 ring-primary/20';
          bgClass = 'bg-primary-50/50';
        }

        return (
          <button
            key={index}
            type="button"
            disabled={isSubmitted}
            onClick={() => onToggle(option)}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${borderClass} ${bgClass} ${textClass}`}
          >
            <div className="shrink-0 text-primary">
              {isSelected ? (
                <CheckSquare className={`w-5 h-5 ${isSubmitted ? (shouldBeSelected ? 'text-emerald-600' : 'text-rose-600') : 'text-primary'}`} />
              ) : (
                <Square className={`w-5 h-5 ${isSubmitted && shouldBeSelected ? 'text-amber-600' : 'text-muted-foreground/50'}`} />
              )}
            </div>
            <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
