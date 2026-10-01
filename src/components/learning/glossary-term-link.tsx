'use client';

import React from 'react';
import { useGlossaryStore } from '@/store/glossary-store';
import { BookOpen } from 'lucide-react';
import { SOC_GLOSSARY_TERMS } from '@/data/soc-glossary-terms';

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

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Extract clean term names and parenthetical variants without regex special characters
const allTermsSet = new Set<string>();

SOC_GLOSSARY_TERMS.forEach((t) => {
  if (t && typeof t.term === 'string' && t.term.trim().length > 1) {
    const raw = t.term.trim();
    if (raw.includes('(')) {
      const base = raw.replace(/\s*\([^)]*\)/g, '').trim();
      if (base.length > 2) allTermsSet.add(base);
      const inside = raw.match(/\(([^)]+)\)/);
      if (inside && inside[1].trim().length > 1) allTermsSet.add(inside[1].trim());
    } else {
      allTermsSet.add(raw);
    }
  }
});

const additionalTerms = [
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
  'Event ID 4625',
  'Event ID 4624',
];

additionalTerms.forEach((term) => allTermsSet.add(term));

// Filter out any invalid items and sort longest-first to prevent prefix shadowing
export const KNOWN_GLOSSARY_TERMS: string[] = Array.from(allTermsSet)
  .filter((t): t is string => typeof t === 'string' && t.trim().length > 1)
  .sort((a, b) => b.length - a.length);

// Pre-compile the regex safely escaping every term so parentheses/brackets don't create unescaped capturing groups
const escapedPattern = KNOWN_GLOSSARY_TERMS.map(escapeRegex).join('|');
const GLOSSARY_REGEX = new RegExp(`\\b(${escapedPattern})\\b`, 'gi');

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className }: GlossaryTextProps) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  // Split and replace known terms safely
  const parts = text.split(GLOSSARY_REGEX);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part || typeof part !== 'string') {
          return null;
        }

        const lowerPart = part.toLowerCase();
        const matchingTerm = KNOWN_GLOSSARY_TERMS.find(
          (t) => t && t.toLowerCase() === lowerPart
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
