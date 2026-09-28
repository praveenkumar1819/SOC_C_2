import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          <span>© {new Date().getFullYear()} SOC Analyst L1 Platform. Professional Cybersecurity Training.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/modules" className="hover:text-foreground transition-colors">
            18 Modules
          </Link>
          <Link href="/progress" className="hover:text-foreground transition-colors">
            Progress Tracking
          </Link>
          <span className="text-muted-foreground/60">•</span>
          <span>Light Theme Interface</span>
        </div>
      </div>
    </footer>
  );
}
