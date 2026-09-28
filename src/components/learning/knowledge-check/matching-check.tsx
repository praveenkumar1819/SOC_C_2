'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Pair {
  left: string;
  right: string;
}

interface MatchingCheckProps {
  pairs: Pair[];
  matches: Record<string, string>; // left -> right
  onMatch: (left: string, right: string) => void;
  onClearMatch: (left: string) => void;
  isSubmitted: boolean;
}

export function MatchingCheck({
  pairs,
  matches,
  onMatch,
  onClearMatch,
  isSubmitted
}: MatchingCheckProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  // Left items in original order
  const leftItems = pairs.map((p) => p.left);

  // Shuffled or distinct right items
  const rightItems = React.useMemo(() => {
    return [...pairs.map((p) => p.right)].sort(() => 0.5 - Math.random());
  }, [pairs]);

  const handleLeftClick = (item: string) => {
    if (isSubmitted) return;
    if (matches[item]) {
      onClearMatch(item);
    }
    setSelectedLeft(item);
  };

  const handleRightClick = (rightItem: string) => {
    if (isSubmitted) return;
    if (selectedLeft) {
      onMatch(selectedLeft, rightItem);
      setSelectedLeft(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground">
        {!isSubmitted ? (
          <span>Select a term on the left, then click its corresponding definition on the right:</span>
        ) : (
          <span>Results for your matches:</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column (Terms) */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1">
            Security Terms
          </div>
          {leftItems.map((left) => {
            const isSelected = selectedLeft === left;
            const matchedRight = matches[left];
            const isCorrect = isSubmitted && pairs.find((p) => p.left === left)?.right === matchedRight;

            let borderClass = 'border-border/80 bg-white hover:bg-slate-50';
            if (isSubmitted) {
              borderClass = isCorrect ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950' : 'border-rose-500 bg-rose-50/80 text-rose-950';
            } else if (isSelected) {
              borderClass = 'border-primary ring-2 ring-primary/20 bg-primary-50/50 font-bold';
            } else if (matchedRight) {
              borderClass = 'border-blue-400 bg-blue-50/50 text-blue-950';
            }

            return (
              <button
                key={left}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleLeftClick(left)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 text-xs sm:text-sm ${borderClass}`}
              >
                <span className="font-semibold">{left}</span>
                {matchedRight && (
                  <Badge variant="outline" className="text-[10px] bg-white text-muted-foreground shrink-0 max-w-[140px] truncate">
                    Matched
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column (Definitions) */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-1">
            Definitions
          </div>
          {rightItems.map((right, idx) => {
            const pairedLeft = Object.keys(matches).find((k) => matches[k] === right);
            const isTarget = selectedLeft !== null;
            const isCorrect = isSubmitted && pairedLeft && pairs.find((p) => p.left === pairedLeft)?.right === right;

            let borderClass = 'border-border/80 bg-white hover:bg-slate-50';
            if (isSubmitted) {
              borderClass = isCorrect ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950' : 'border-border/60 opacity-60';
            } else if (pairedLeft) {
              borderClass = 'border-blue-400 bg-blue-50/50 text-blue-950';
            } else if (isTarget) {
              borderClass = 'border-primary/60 hover:border-primary hover:bg-primary-50/30';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleRightClick(right)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-2 text-xs sm:text-sm ${borderClass}`}
              >
                {pairedLeft && (
                  <Badge className="bg-primary text-white text-[10px] shrink-0 mt-0.5">
                    {pairedLeft}
                  </Badge>
                )}
                <span className="leading-relaxed">{right}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
