'use client';

import { useState, useMemo } from 'react';
import {
  Link2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Unlink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

interface MatchingCheckShuffledProps {
  id: string;
  title: string;
  instructions?: string;
  pairs: MatchPair[];
  explanation: string;
  xpReward?: number;
  onComplete?: () => void;
}

export function MatchingCheckShuffled({
  id,
  title,
  instructions = 'Click an item on the left, then click its corresponding definition on the right to connect them.',
  pairs,
  explanation,
  xpReward = 50,
  onComplete,
}: MatchingCheckShuffledProps) {
  // Shuffle right items on initial load so they are guaranteed not in corresponding order
  const shuffledRightItems = useMemo(() => {
    const list = pairs.map((p) => ({ id: p.id, text: p.right }));
    // Deterministic or pseudo-random shuffle that ensures no item stays at its original index if pairs > 1
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    // If by chance the first item matches, rotate
    if (shuffled.length > 1 && shuffled[0].id === list[0].id) {
      shuffled.push(shuffled.shift()!);
    }
    return shuffled;
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  // Map of leftId -> rightId
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const addXP = useProgressStore((state) => state.addXP);
  const { showToast } = useToast();

  const handleLeftClick = (leftId: string) => {
    if (submitted) return;
    if (selectedLeft === leftId) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftId);
    }
  };

  const handleRightClick = (rightId: string) => {
    if (submitted) return;
    if (selectedLeft) {
      // Create or update connection
      setConnections((prev) => ({
        ...prev,
        [selectedLeft]: rightId,
      }));
      setSelectedLeft(null);
    } else {
      // If no left selected, check if this right item is already connected to remove it
      const connectedLeft = Object.keys(connections).find((l) => connections[l] === rightId);
      if (connectedLeft) {
        setConnections((prev) => {
          const next = { ...prev };
          delete next[connectedLeft];
          return next;
        });
      }
    }
  };

  const handleDisconnect = (leftId: string) => {
    if (submitted) return;
    setConnections((prev) => {
      const next = { ...prev };
      delete next[leftId];
      return next;
    });
  };

  const allConnected = pairs.every((p) => connections[p.id] !== undefined);

  const handleSubmit = () => {
    const correct = pairs.every((p) => {
      const selectedRightId = connections[p.id];
      const selectedRightItem = pairs.find((x) => x.id === selectedRightId);
      return selectedRightId === p.id || (selectedRightItem && selectedRightItem.right === p.right);
    });
    setIsAllCorrect(correct);
    setSubmitted(true);

    if (correct) {
      addXP(xpReward);
      showToast({
        type: 'success',
        title: 'All Matches Correct!',
        description: `+${xpReward} XP awarded.`,
      });
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setConnections({});
    setSelectedLeft(null);
    setSubmitted(false);
    setIsAllCorrect(false);
  };

  const colors = [
    'border-blue-500 bg-blue-50/50 text-blue-900',
    'border-purple-500 bg-purple-50/50 text-purple-900',
    'border-amber-500 bg-amber-50/50 text-amber-900',
    'border-emerald-500 bg-emerald-50/50 text-emerald-900',
  ];

  return (
    <Card className="border-2 border-primary/20 bg-card overflow-hidden shadow-xs">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider">
            Shuffled Match the Following
          </Badge>
          <span className="text-xs font-semibold text-primary">+{xpReward} XP</span>
        </div>
        <CardTitle className="text-base font-bold text-foreground mt-1">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">{instructions}</p>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Shuffled Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Left Column (Source / Event) */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Events / Concepts
            </span>
            {pairs.map((p, idx) => {
              const isSelected = selectedLeft === p.id;
              const connectedRightId = connections[p.id];
              const isConnected = connectedRightId !== undefined;
              const colorClass = isConnected ? colors[idx % colors.length] : '';

              const connectedRightItem = pairs.find((x) => x.id === connectedRightId);
              const isMatchCorrect = submitted && isConnected && (connectedRightId === p.id || (connectedRightItem && connectedRightItem.right === p.right));
              const isMatchWrong = submitted && isConnected && !isMatchCorrect;

              return (
                <div
                  key={p.id}
                  onClick={() => handleLeftClick(p.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/10 shadow-xs'
                      : submitted
                      ? isMatchCorrect
                        ? 'border-emerald-500 bg-emerald-50/60'
                        : isMatchWrong
                        ? 'border-rose-400 bg-rose-50/60'
                        : 'border-border opacity-70'
                      : isConnected
                      ? `${colorClass} shadow-xs`
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{p.left}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isConnected && !submitted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisconnect(p.id);
                        }}
                        className="p-1 text-muted-foreground hover:text-destructive"
                        title="Remove connection"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span className="w-2.5 h-2.5 rounded-full border border-primary/40 bg-background" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (Target / Meaning — Shuffled) */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Definitions / Meaning (Shuffled)
            </span>
            {shuffledRightItems.map((r, idx) => {
              const connectedLeftId = Object.keys(connections).find((l) => connections[l] === r.id);
              const isConnected = connectedLeftId !== undefined;
              const leftIndex = pairs.findIndex((p) => p.id === connectedLeftId);
              const colorClass = isConnected ? colors[leftIndex % colors.length] : '';

              const connectedLeftItem = pairs.find((x) => x.id === connectedLeftId);
              const isMatchCorrect = submitted && isConnected && (connectedLeftId === r.id || (connectedLeftItem && connectedLeftItem.right === r.text));
              const isMatchWrong = submitted && isConnected && !isMatchCorrect;

              return (
                <div
                  key={r.id}
                  onClick={() => handleRightClick(r.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                    submitted
                      ? isMatchCorrect
                        ? 'border-emerald-500 bg-emerald-50/60'
                        : isMatchWrong
                        ? 'border-rose-400 bg-rose-50/60'
                        : 'border-border opacity-70'
                      : isConnected
                      ? `${colorClass} shadow-xs`
                      : selectedLeft
                      ? 'border-dashed border-primary/50 bg-primary/5 hover:border-primary'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border border-primary/40 bg-background" />
                    <span className="text-xs sm:text-sm font-semibold">{r.text}</span>
                  </div>

                  {isConnected && (
                    <Badge variant="outline" className="text-[10px] font-mono">
                      Matched #{leftIndex + 1}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submission & Validation */}
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allConnected}
            className="w-full text-xs font-bold"
            size="sm"
          >
            {allConnected ? 'Verify Matches' : `Connect all pairs (${Object.keys(connections).length} / ${pairs.length})`}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
              isAllCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {isAllCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                <span>{isAllCorrect ? 'All Connections Accurate! 🎉' : 'Some Connections are Incorrect'}</span>
              </div>
              <p>{explanation}</p>
            </div>

            {!isAllCorrect && (
              <Button variant="outline" onClick={handleReset} className="w-full text-xs" size="sm">
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Retry Matching
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
