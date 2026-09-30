'use client';

import React from 'react';
import { useGlossaryStore } from '@/store/glossary-store';
import { BookOpen } from 'lucide-react';

interface GlossaryTermLinkProps {
  term: string;
  displayText?: string;
}

export function GlossaryTermLink({ term, displayText }: GlossaryTermLinkProps) {
  const openGlossary = useGlossaryStore((state) => state.openGlossary);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openGlossary(term);
      }}
      className="inline-flex items-baseline gap-0.5 text-primary font-semibold underline decoration-primary/40 underline-offset-2 hover:decoration-primary hover:text-primary-700 transition-colors cursor-pointer group"
      title={`Open ${term} in Security Glossary`}
    >
      <span>{displayText || term}</span>
      <BookOpen className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity self-center ml-0.5 inline" />
    </button>
  );
}

import { SOC_GLOSSARY_TERMS } from '@/data/soc-glossary-terms';

// Extract all term names and parenthetical variants (e.g. "Active Directory (AD)" -> "Active Directory", "AD")
const allTermsList: string[] = [];
SOC_GLOSSARY_TERMS.forEach((t) => {
  allTermsList.push(t.term);
  if (t.term.includes('(')) {
    const base = t.term.replace(/\s*\([^)]*\)/g, '').trim();
    if (base.length > 2) allTermsList.push(base);
    const inside = t.term.match(/\(([^)]+)\)/);
    if (inside && inside[1].length > 1) allTermsList.push(inside[1].trim());
  }
});

// Known terms for automatic inline detection (sorted longest first to prevent prefix shadowing)
export const KNOWN_GLOSSARY_TERMS = Array.from(
  new Set([
    ...allTermsList,
    'Living off the Land',
    'Indicators of Compromise',
    'Tactics, Techniques, and Procedures',
    'Parent Process',
    'Child Process',
    'Process Tree',
    'Command-Line Arguments',
    'Host Isolation',
    'DNS Tunneling',
    'Reverse Shell',
    'Spear Phishing',
    'Dual-Vector Corroboration',
    'Active Directory',
    'Workstation',
    'Endpoint',
    'Hostname',
    'Domain Admin',
    'Service Account',
    'Group Policy',
    'Windows Registry',
    'Task Manager',
    'Process Termination',
  ])
).sort((a, b) => b.length - a.length);

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className }: GlossaryTextProps) {
  const openGlossary = useGlossaryStore((state) => state.openGlossary);

  // Split and replace known terms
  const regex = new RegExp(`\\b(${KNOWN_GLOSSARY_TERMS.join('|')})\\b`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const matchingTerm = KNOWN_GLOSSARY_TERMS.find(
          (t) => t.toLowerCase() === part.toLowerCase()
        );

        if (matchingTerm) {
          return (
            <GlossaryTermLink
              key={i}
              term={matchingTerm}
              displayText={part}
            />
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
