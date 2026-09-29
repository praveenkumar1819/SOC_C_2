'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, FileText, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import module04Data from '@/data/modules/module-04.json';

const ALL_MODULES = [
  { id: '00', title: 'Course Orientation', description: 'Welcome to SOC Analyst L1' },
  { id: '01', title: 'Computer Fundamentals', description: 'OS, processes, and systems' },
  { id: '02', title: 'Networking Fundamentals', description: 'TCP/IP, OSI, and network protocols' },
  { id: '03', title: 'Cybersecurity Fundamentals', description: 'CIA triad, malware, and threats' },
  { id: '04', title: 'SOC Operations', description: 'Alert triage, false positives, and escalation' },
  { id: '05', title: 'SIEM', description: 'Log collection, correlation, and detection' },
  { id: '06', title: 'Log & Event Analysis', description: 'Windows Event IDs and syslog' },
  { id: '07', title: 'Windows & Linux Security Monitoring', description: 'Endpoint logging and Sysmon' },
  { id: '08', title: 'Network Security Monitoring', description: 'Packet analysis and Wireshark' },
  { id: '09', title: 'EDR & Endpoint Monitoring', description: 'Telemetry, process trees, and containment' },
  { id: '10', title: 'Detection & Response Ecosystem', description: 'XDR, NDR, and MDR' },
  { id: '11', title: 'Identity, Email & Threat Intelligence', description: 'Active Directory and phishing analysis' },
  { id: '12', title: 'SOAR & SOC Automation', description: 'Automated playbooks and response' },
  { id: '13', title: 'MITRE ATT&CK for SOC', description: 'Tactics, techniques, and procedures' },
  { id: '14', title: 'Incident Response & SOC Documentation', description: 'Incident response lifecycle' },
  { id: '15', title: 'OT & ICS Security', description: 'Operational technology and SCADA monitoring' },
  { id: '16', title: 'SOC L1 Investigation Scenarios', description: 'End-to-end incident investigations' },
  { id: '17', title: 'Final SOC L1 Assessment', description: 'Final certification assessment' },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const searchResults: any[] = [];

    // Search through all modules
    ALL_MODULES.forEach((mod) => {
      if (mod.title.toLowerCase().includes(q) || mod.description.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'module',
          title: `Module ${mod.id}: ${mod.title}`,
          module: mod.id,
          topic: mod.description,
          url: `/modules/${mod.id}`,
        });
      }
    });

    // Search through module 04 topics & units
    if (module04Data && module04Data.topics) {
      module04Data.topics.forEach((topic: any) => {
        if (topic.title.toLowerCase().includes(q) || topic.description?.toLowerCase().includes(q)) {
          searchResults.push({
            type: 'topic',
            title: topic.title,
            module: '04',
            topic: topic.description || 'Topic in SOC Operations',
            url: `/modules/04/topics?topic=${topic.order}`,
          });
        }

        topic.units?.forEach((unit: any) => {
          if (unit.title.toLowerCase().includes(q) || (unit.content && typeof unit.content === 'string' && unit.content.toLowerCase().includes(q))) {
            searchResults.push({
              type: 'unit',
              title: unit.title,
              topic: topic.title,
              module: '04',
              url: `/modules/04/topics?topic=${topic.order}&unit=${unit.order}`,
            });
          }
        });
      });
    }

    setResults(searchResults.slice(0, 10));
  }, [query]);

  const handleSelect = (url: string) => {
    router.push(url);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Course Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics, lessons, concepts (e.g. Triage, SIEM, DNS)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(result.url)}
                  className="w-full text-left p-3 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors block"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {result.type === 'module' ? (
                        <Layers className="h-4 w-4 text-primary" />
                      ) : result.type === 'topic' ? (
                        <BookOpen className="h-4 w-4 text-primary" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold text-sm text-foreground truncate">{result.title}</p>
                        <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                          Module {result.module}
                        </Badge>
                      </div>
                      {result.topic && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {result.topic}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
