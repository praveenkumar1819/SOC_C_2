import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export function xpToNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const xpForNextLevel = currentLevel * 1000;
  return xpForNextLevel - currentXP;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'BEGINNER':
      return 'text-success bg-success-light';
    case 'INTERMEDIATE':
      return 'text-warning bg-warning-light';
    case 'ADVANCED':
      return 'text-danger bg-danger-light';
    default:
      return 'text-muted-foreground bg-muted';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'text-blue-600 bg-blue-50';
    case 'medium':
      return 'text-warning bg-warning-light';
    case 'high':
      return 'text-orange-600 bg-orange-50';
    case 'critical':
      return 'text-danger bg-danger-light';
    default:
      return 'text-muted-foreground bg-muted';
  }
}
