'use client';

import { Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CurriculumTreeButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
      className="flex items-center gap-2 text-xs font-semibold h-9 px-3.5 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary transition-all shadow-2xs cursor-pointer"
      title="Browse Modules, Units & Topics Tree (Ctrl+B)"
    >
      <Layers className="w-4 h-4 text-primary" />
      <span>Open Curriculum Tree</span>
    </Button>
  );
}
