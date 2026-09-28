'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface MultipleChoiceProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  isSubmitted: boolean;
  correctAnswer: string;
}

export function MultipleChoice({
  options,
  selectedOption,
  onSelect,
  isSubmitted,
  correctAnswer
}: MultipleChoiceProps) {
  return (
    <div className="space-y-2.5">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCorrect = isSubmitted && option === correctAnswer;
        const isWrong = isSubmitted && isSelected && option !== correctAnswer;

        let borderClass = 'border-border/80 hover:border-border hover:bg-slate-50';
        let bgClass = 'bg-white';
        let textClass = 'text-foreground';

        if (isSubmitted) {
          if (isCorrect) {
            borderClass = 'border-emerald-500 ring-2 ring-emerald-500/20';
            bgClass = 'bg-emerald-50/80';
            textClass = 'text-emerald-950 font-semibold';
          } else if (isWrong) {
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
            onClick={() => onSelect(option)}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${borderClass} ${bgClass} ${textClass}`}
          >
            <div className="shrink-0 text-primary">
              {isSelected ? (
                <CheckCircle2 className={`w-5 h-5 ${isSubmitted ? (isCorrect ? 'text-emerald-600' : 'text-rose-600') : 'text-primary'}`} />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/50" />
              )}
            </div>
            <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
