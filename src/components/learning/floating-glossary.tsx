'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookMarked,
  X,
  Search,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlossaryStore } from '@/store/glossary-store';

export interface GlossaryTerm {
  term: string;
  fullForm: string;
  category: 'SIEM & Detection' | 'Endpoints' | 'Network' | 'IR & Triage' | 'Core Concepts';
  definition: string;
  socContext: string;
  referenceUrl: string;
  referenceLabel: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'SIEM',
    fullForm: 'Security Information and Event Management',
    category: 'SIEM & Detection',
    definition: 'A centralized platform that aggregates, normalizes, and correlates log data from diverse enterprise sources to detect threats and produce security alerts.',
    socContext: 'Primary console where L1 analysts monitor the alert queue, execute search queries, and correlate multi-source event logs.',
    referenceUrl: 'https://csrc.nist.gov/glossary/term/security_information_and_event_management',
    referenceLabel: 'NIST CSRC Glossary',
  },
  {
    term: 'Domain Controller',
    fullForm: 'Active Directory Domain Controller (DC)',
    category: 'Endpoints',
    definition: 'The master server in a Windows domain that responds to authentication requests, manages user accounts, and enforces enterprise security policies.',
    socContext: 'A Tier-0 crown jewel asset. Any attack or suspicious authentication against a Domain Controller elevates triage priority immediately.',
    referenceUrl: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview',
    referenceLabel: 'Microsoft Learn AD DS',
  },
  {
    term: 'SOC',
    fullForm: 'Security Operations Center',
    category: 'Core Concepts',
    definition: 'A dedicated command facility and organizational team responsible for monitoring, detecting, analyzing, and responding to cybersecurity incidents 24/7/365.',
    socContext: 'Organized into tiered operational teams (L1 triage, L2 response, L3 hunting) working in high-tempo defense cycles.',
    referenceUrl: 'https://csrc.nist.gov/glossary/term/security_operations_center',
    referenceLabel: 'NIST Standards',
  },
  {
    term: 'EDR',
    fullForm: 'Endpoint Detection and Response',
    category: 'Endpoints',
    definition: 'An integrated endpoint solution that captures continuous process and memory telemetry, performs behavioral threat detection, and enables remote host isolation.',
    socContext: 'Used by analysts to examine process execution trees, command-line arguments, file modifications, and network connections made by an endpoint.',
    referenceUrl: 'https://attack.mitre.org/',
    referenceLabel: 'MITRE ATT&CK',
  },
  {
    term: 'NDR',
    fullForm: 'Network Detection and Response',
    category: 'Network',
    definition: 'A network-focused security solution analyzing raw packet data, protocol metadata, and network flows to uncover encrypted command-and-control channels and lateral movement.',
    socContext: 'Flags anomalous DNS tunneling and persistent beaconing intervals directly off network wire sensors.',
    referenceUrl: 'https://www.cisa.gov/resources-tools/services',
    referenceLabel: 'CISA Architecture Guidelines',
  },
  {
    term: 'SOAR',
    fullForm: 'Security Orchestration, Automation, and Response',
    category: 'IR & Triage',
    definition: 'A platform connecting security tools and running automated playbooks for enrichment, preliminary triage, and repetitive analyst tasks.',
    socContext: 'Automatically enriches alerts with VirusTotal/Whois IP reputation before the L1 analyst opens the ticket.',
    referenceUrl: 'https://csrc.nist.gov/',
    referenceLabel: 'NIST Standards',
  },
  {
    term: 'KQL',
    fullForm: 'Kusto Query Language',
    category: 'SIEM & Detection',
    definition: 'A powerful, read-only data query language used to search and analyze structured and semi-structured big telemetry data in platforms like Microsoft Sentinel and Defender.',
    socContext: 'Analysts write KQL queries such as SecurityEvent | where EventID == 4625 to investigate brute-force authentication spikes.',
    referenceUrl: 'https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/',
    referenceLabel: 'Microsoft Learn',
  },
  {
    term: 'True Positive',
    fullForm: 'True Positive (TP)',
    category: 'IR & Triage',
    definition: 'A security alert that correctly identifies actual malicious activity or an authentic security policy violation.',
    socContext: 'Example: An alert for Mimikatz execution where evidence confirms unauthorized credential dumping in memory. Requires immediate escalation.',
    referenceUrl: 'https://csrc.nist.gov/glossary/term/true_positive',
    referenceLabel: 'NIST Computer Security',
  },
  {
    term: 'False Positive',
    fullForm: 'False Positive (FP)',
    category: 'IR & Triage',
    definition: 'An alert triggered by benign, authorized, or harmless activity that matched a detection signature or anomaly threshold.',
    socContext: 'Example: An admin running an authorized scheduled backup script that was flagged as suspicious batch file activity. Document and close as False Positive.',
    referenceUrl: 'https://csrc.nist.gov/glossary/term/false_positive',
    referenceLabel: 'NIST Computer Security',
  },
  {
    term: 'IOC',
    fullForm: 'Indicator of Compromise',
    category: 'Core Concepts',
    definition: 'Forensic evidence of a potential intrusion, including file hashes, IP addresses, malicious domains, and registry modifications.',
    socContext: 'Analysts extract IOCs from alerts to search across the entire fleet for broader enterprise compromise.',
    referenceUrl: 'https://csrc.nist.gov/glossary/term/indicator_of_compromise',
    referenceLabel: 'NIST Glossary',
  },
  {
    term: 'TTP',
    fullForm: 'Tactics, Techniques, and Procedures',
    category: 'Core Concepts',
    definition: 'The behavioral patterns, methods, and tradecraft employed by cyber threat actors, categorized systematically by frameworks like MITRE ATT&CK.',
    socContext: 'Helps analysts identify not just a single hash, but the attacker behavior (e.g. T1110 Brute Force, T1059 Command and Scripting Interpreter).',
    referenceUrl: 'https://attack.mitre.org/tactics/enterprise/',
    referenceLabel: 'MITRE ATT&CK Enterprise',
  },
  {
    term: 'Event ID 4625',
    fullForm: 'Windows Security: An account failed to log on',
    category: 'Endpoints',
    definition: 'Standard Windows Security Event generated on domain controllers or member servers whenever an authentication attempt fails.',
    socContext: 'Crucial for detecting brute force, password spraying, or user password mistyping. Status codes like 0xC000006A indicate bad password.',
    referenceUrl: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4625',
    referenceLabel: 'Microsoft Security Audit',
  },
  {
    term: 'Event ID 4624',
    fullForm: 'Windows Security: An account was successfully logged on',
    category: 'Endpoints',
    definition: 'Windows Security Event logged on every successful authentication, recording LogonType (e.g. Type 2 Interactive, Type 3 Network, Type 10 RemoteInteractive).',
    socContext: 'Follows 4625 failures to verify if an attacker successfully guessed the credential.',
    referenceUrl: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4624',
    referenceLabel: 'Microsoft Security Audit',
  },
  {
    term: 'Event ID 4688',
    fullForm: 'Windows Security: A new process has been created',
    category: 'Endpoints',
    definition: 'Audit process creation event recording creator process, new process name, process ID, and full command line when enabled.',
    socContext: 'Essential for tracking LOLBAS execution (e.g. cmd.exe calling powershell.exe with -encodedcommand).',
    referenceUrl: 'https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4688',
    referenceLabel: 'Microsoft Security Audit',
  },
  {
    term: 'SLA',
    fullForm: 'Service Level Agreement',
    category: 'IR & Triage',
    definition: 'Defined contractual timeframes within which a SOC must acknowledge, triage, escalate, or resolve security alerts based on severity.',
    socContext: 'Typical SOC L1 SLAs: Critical alerts must be acknowledged within 15 minutes, High within 30 minutes, Medium within 2 hours.',
    referenceUrl: 'https://csrc.nist.gov/',
    referenceLabel: 'SOC Operations Standards',
  },
  {
    term: 'MTTD',
    fullForm: 'Mean Time to Detect',
    category: 'IR & Triage',
    definition: 'Key SOC performance metric measuring the average duration elapsed from initial attacker intrusion to security alert generation.',
    socContext: 'L1 analysts directly influence MTTD through rapid detection correlation and zero queue backlog.',
    referenceUrl: 'https://csrc.nist.gov/',
    referenceLabel: 'NIST Incident Handling Metrics',
  },
  {
    term: 'MTTR',
    fullForm: 'Mean Time to Respond / Remediate',
    category: 'IR & Triage',
    definition: 'Performance metric measuring average time elapsed from alert triage to threat isolation and complete system recovery.',
    socContext: 'Fast host quarantine via EDR directly minimizes organizational MTTR.',
    referenceUrl: 'https://csrc.nist.gov/',
    referenceLabel: 'NIST Incident Response Metrics',
  },
  {
    term: 'Sysmon',
    fullForm: 'System Monitor (Microsoft Sysinternals)',
    category: 'Endpoints',
    definition: 'An advanced Windows background service and device driver that logs detailed process creations, network connections, file integrity, and driver loading.',
    socContext: 'Sysmon Event 1 (Process Create), Event 3 (Network Connection), and Event 7 (Image Loaded) provide vital deep endpoint telemetry.',
    referenceUrl: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon',
    referenceLabel: 'Sysinternals Documentation',
  },
  {
    term: 'CVE',
    fullForm: 'Common Vulnerabilities and Exposures',
    category: 'Core Concepts',
    definition: 'A standardized public dictionary of publicly disclosed cybersecurity vulnerabilities (e.g., CVE-2021-44228 Log4j).',
    socContext: 'When an alert flags an exploit attempt, analysts look up the CVE to understand the vulnerability scope and patched versions.',
    referenceUrl: 'https://cve.mitre.org/',
    referenceLabel: 'MITRE CVE Program',
  },
];

export function FloatingGlossary() {
  const { isOpen, highlightedTerm, currentTopicTerms, openGlossary, closeGlossary } = useGlossaryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const termItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const categories = ['All', 'SIEM & Detection', 'Endpoints', 'Network', 'IR & Triage', 'Core Concepts'];

  // Handle highlighted term trigger from inline link
  useEffect(() => {
    if (highlightedTerm) {
      setExpandedTerm(highlightedTerm);
      setTimeout(() => {
        const el = termItemRefs.current[highlightedTerm.toLowerCase()];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [highlightedTerm]);

  // Context-aware prioritization (Section 10)
  const currentTopicTermObjects = GLOSSARY_TERMS.filter((item) =>
    currentTopicTerms.some(
      (ct) => ct.toLowerCase() === item.term.toLowerCase() || ct.toLowerCase() === item.fullForm.toLowerCase()
    )
  );

  const filteredAllTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.term.toLowerCase().includes(q) ||
      item.fullForm.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Button
                onClick={() => openGlossary()}
                className="shadow-xl rounded-full h-12 px-4 gap-2 font-semibold bg-primary hover:bg-primary/90 text-white border-2 border-white/20 transition-all hover:scale-105"
                aria-label="Open Security Glossary"
              >
                <BookMarked className="w-5 h-5 text-white" />
                <span className="hidden sm:inline">SOC Glossary</span>
                {currentTopicTermObjects.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Panel Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[460px] max-h-[85vh] flex flex-col shadow-2xl rounded-2xl border bg-background overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-muted/40 border-b flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    Security Operations Glossary
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Global reference dictionary & standards</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={closeGlossary}
                  title="Minimize Glossary"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={closeGlossary}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Search & Category Filter */}
            <div className="p-3 border-b bg-background space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search terms, full forms (e.g. SIEM, 4625, EDR)..."
                  className="pl-8 h-8 text-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded-full whitespace-nowrap border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-white border-primary font-medium'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted border-border'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Term List with Section 10 Context-Aware Prioritization */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* Context-aware section: Current Topic Terms first */}
              {searchQuery.trim() === '' && selectedCategory === 'All' && currentTopicTermObjects.length > 0 && (
                <div className="space-y-2 pb-3 border-b">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Relevant to Current Topic</span>
                    <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20 py-0">
                      Active Context
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    {currentTopicTermObjects.map((item) => (
                      <div
                        key={`curr-${item.term}`}
                        ref={(el) => {
                          termItemRefs.current[item.term.toLowerCase()] = el;
                        }}
                        className={`p-2.5 rounded-lg border transition-all ${
                          expandedTerm?.toLowerCase() === item.term.toLowerCase()
                            ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20'
                            : 'border-border/60 bg-muted/20 hover:border-primary/40'
                        }`}
                      >
                        <button
                          onClick={() =>
                            setExpandedTerm(
                              expandedTerm?.toLowerCase() === item.term.toLowerCase() ? null : item.term
                            )
                          }
                          className="w-full text-left flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-primary">{item.term}</span>
                              <span className="text-[11px] text-muted-foreground truncate">{item.fullForm}</span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0 ${
                              expandedTerm?.toLowerCase() === item.term.toLowerCase() ? 'rotate-180 text-primary' : ''
                            }`}
                          />
                        </button>

                        {expandedTerm?.toLowerCase() === item.term.toLowerCase() && (
                          <div className="mt-2 text-xs space-y-2 pt-2 border-t border-border/40 animate-fade-in">
                            <p className="text-foreground leading-relaxed">{item.definition}</p>
                            <p className="text-[11px] text-muted-foreground">
                              <strong>SOC Context:</strong> {item.socContext}
                            </p>
                            <div className="flex justify-end pt-1">
                              <a
                                href={item.referenceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                              >
                                <span>{item.referenceLabel}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Glossary Section (All Terms) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  All Terms ({filteredAllTerms.length})
                </span>

                {filteredAllTerms.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-xs">
                    No terms matching &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="space-y-1.5 divide-y divide-border/30">
                    {filteredAllTerms.map((item) => {
                      const isExpanded = expandedTerm?.toLowerCase() === item.term.toLowerCase();
                      return (
                        <div
                          key={item.term}
                          ref={(el) => {
                            termItemRefs.current[item.term.toLowerCase()] = el;
                          }}
                          className="pt-2 first:pt-0"
                        >
                          <button
                            onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                            className={`w-full text-left p-2 rounded-lg transition-all flex items-start justify-between gap-2 group ${
                              isExpanded ? 'bg-primary/5 border border-primary/20 shadow-xs' : 'hover:bg-muted/40'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                                  {item.term}
                                </span>
                                <Badge variant="outline" className="text-[9px] py-0 px-1 font-normal text-muted-foreground">
                                  {item.category}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                {item.fullForm}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0 ${
                                isExpanded ? 'rotate-180 text-primary' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="mt-1.5 p-3 rounded-lg bg-muted/30 text-xs space-y-2 border border-border/60 animate-fade-in">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                                  Definition
                                </span>
                                <p className="text-foreground leading-relaxed mt-0.5">{item.definition}</p>
                              </div>

                              <div className="pt-1 border-t border-border/40">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                                  Real-World SOC Context
                                </span>
                                <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                                  {item.socContext}
                                </p>
                              </div>

                              <div className="pt-1 flex items-center justify-end">
                                <a
                                  href={item.referenceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                                >
                                  <span>{item.referenceLabel}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-muted/20 border-t flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{filteredAllTerms.length} terms available</span>
              <span>Click inline terms in topics anytime</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
