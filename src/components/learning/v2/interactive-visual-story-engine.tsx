'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Zap,
  Shield,
  Activity,
  Layers,
  RotateCcw,
  GitBranch,
  Network,
  Crosshair,
  Server,
  Monitor,
  Database,
  Radio,
  Lock,
  Box,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  UserCheck,
  Flame,
  Terminal,
  Cpu,
  HardDrive,
  FileText,
  Folder,
  ArrowRight,
  Clock,
  Key,
  Globe,
  Wifi,
  Search,
  Eye,
  Radar,
  FileCode,
  Sliders,
  Check,
  AlertOctagon,
  FileSpreadsheet,
  CornerDownRight,
  Share2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import { V2ChapterNormalized, V2Unit, V2Module } from '@/data/curriculum-v2-data';

import { module00NodesMap } from './module-00-visual-stories';
import { Module00GraphicRenderer } from './module-00-graphic-renderers';
import { module02NodesMap } from './module-02-visual-stories';
import { Module02GraphicRenderer } from './module-02-graphic-renderers';
import { module03NodesMap } from './module-03-visual-stories';
import { Module03GraphicRenderer } from './module-03-graphic-renderers';
import { module04NodesMap } from './module-04-visual-stories';
import { Module04GraphicRenderer } from './module-04-graphic-renderers';
import { module05NodesMap } from './module-05-visual-stories';
import { Module05GraphicRenderer } from './module-05-graphic-renderers';
import { module06NodesMap } from './module-06-visual-stories';
import { Module06GraphicRenderer } from './module-06-graphic-renderers';
import { module07NodesMap } from './module-07-visual-stories';
import { Module07GraphicRenderer } from './module-07-graphic-renderers';
import { module08NodesMap } from './module-08-visual-stories';
import { Module08GraphicRenderer } from './module-08-graphic-renderers';
import { module09NodesMap } from './module-09-visual-stories';
import { Module09GraphicRenderer } from './module-09-graphic-renderers';
import { module10NodesMap } from './module-10-visual-stories';
import { Module10GraphicRenderer } from './module-10-graphic-renderers';
import { module11NodesMap } from './module-11-visual-stories';
import { Module11GraphicRenderer } from './module-11-graphic-renderers';
import { module12NodesMap } from './module-12-visual-stories';
import { Module12GraphicRenderer } from './module-12-graphic-renderers';
import { module13NodesMap } from './module-13-visual-stories';
import { Module13GraphicRenderer } from './module-13-graphic-renderers';
import { module14NodesMap } from './module-14-visual-stories';
import { Module14GraphicRenderer } from './module-14-graphic-renderers';

export type VisualStoryStyle =
  | 'team-orbit'
  | 'continuous-loop'
  | 'tool-ecosystem'
  | 'conduit-pipeline'
  | 'ring-privilege'
  | 'purdue-mesh'
  | 'attack-chain'
  | 'process-tree'
  | 'network-topology'
  | 'matrix-radar'
  // Module 00 Specialized Visual Stories (Orientation: Your First SOC Shift)
  | 'm00-campus-reception'
  | 'm00-cardinal-rule'
  | 'm00-operational-baseline'
  | 'm00-teaching-zones-map'
  | 'm00-soc-demarcation'
  | 'm00-cross-team-routing'
  | 'm00-blue-border-console'
  | 'm00-host-only-vm-isolation'
  | 'm00-snapshot-rollback'
  | 'm00-evidence-integrity-hash'
  | 'm00-working-copy-audit'
  | 'm00-safe-pause-protocol'
  | 'm00-branch-finance-service'
  | 'm00-entity-separation-grid'
  | 'm00-disciplined-observables'
  | 'm00-curriculum-roadmap-15'
  | 'm00-four-section-engine'
  | 'm00-fading-scaffolding-l1'
  // Module 01 Specialized Visual Stories (One distinct graphic per scenario)
  | 'm01-hardware-bus'
  | 'm01-os-kernel'
  | 'm01-account-privilege'
  | 'm01-filesystem-tree'
  | 'm01-process-lifecycle'
  | 'm01-memory-isolation'
  | 'm01-terminal-cli'
  | 'm01-process-triage-hud'
  | 'm01-socket-diagnostics'
  | 'm01-log-anatomy'
  | 'm01-log-vault'
  | 'm01-log-forwarding'
  | 'm01-mac-ip-addressing'
  | 'm01-tcp-handshake'
  | 'm01-client-server-flow'
  | 'm01-workstation-baseline'
  | 'm01-anomaly-triggers'
  | 'm01-triage-matrix'
  // Module 02 Specialized Visual Stories (One distinct graphic per scenario)
  | 'm02-subnet-calculator'
  | 'm02-default-gateway'
  | 'm02-nat-translation'
  | 'm02-access-point'
  | 'm02-switch-cam'
  | 'm02-router-forwarding'
  | 'm02-dhcp-dora'
  | 'm02-dns-resolution'
  | 'm02-dns-tunneling'
  | 'm02-port-doors'
  | 'm02-tcp-state'
  | 'm02-udp-vs-tcp'
  | 'm02-small-branch-map'
  | 'm02-firewall-rules'
  | 'm02-policy-vs-app'
  | 'm02-vlan-segmentation'
  | 'm02-multi-switch-trunk'
  | 'm02-vlan-boundary-audit'
  // Module 03 Specialized Visual Stories (Cybersecurity Fundamentals)
  | 'm03-asset-inventory'
  | 'm03-threat-vuln-matrix'
  | 'm03-person-vs-credential'
  | 'm03-cia-triad'
  | 'm03-risk-matrix'
  | 'm03-business-impact-gauge'
  | 'm03-phishing-anatomy'
  | 'm03-credential-attack-sim'
  | 'm03-mfa-fatigue-radar'
  | 'm03-malware-taxonomy'
  | 'm03-insider-threat-indicators'
  | 'm03-network-recon-scanner'
  | 'm03-defense-triad'
  | 'm03-incident-lifecycle'
  | 'm03-alert-containment'
  | 'm03-defense-in-depth-castle'
  | 'm03-least-privilege-blast-radius'
  | 'm03-zero-trust-verification'
  // Module 04 Specialized Visual Stories (SOC Operations & Alert Triage)
  | 'm04-soc-hierarchy'
  | 'm04-escalation-triggers'
  | 'm04-shift-wheel'
  | 'm04-queue-ingestion'
  | 'm04-ticket-lifecycle'
  | 'm04-sla-monitor'
  | 'm04-event-vs-alert'
  | 'm04-rule-logic-engine'
  | 'm04-verdict-trap'
  | 'm04-taxonomy-quad'
  | 'm04-case-aggregation'
  | 'm04-evidence-vault'
  | 'm04-five-ws-triage'
  | 'm04-aggregation-counter'
  | 'm04-forensic-honesty'
  | 'm04-disposition-tree'
  | 'm04-handover-note-anatomy'
  | 'm04-evidence-package'
  // Module 05 Specialized Visual Stories (SIEM Fundamentals & Search)
  | 'm05-siem-capabilities'
  | 'm05-visibility-gaps'
  | 'm05-scope-doctrine'
  | 'm05-source-ecosystem'
  | 'm05-ingestion-pipeline'
  | 'm05-source-health'
  | 'm05-field-schema'
  | 'm05-time-window'
  | 'm05-zero-results-check'
  | 'm05-boolean-logic'
  | 'm05-query-dialects'
  | 'm05-query-dossier'
  | 'm05-correlation-engine'
  | 'm05-rule-dissector'
  | 'm05-threshold-tuning'
  | 'm05-source-mosaic'
  | 'm05-data-minimization'
  | 'm05-evidence-packet'
  // Module 06 Specialized Visual Stories (Log & Event Analysis)
  | 'm06-literal-event'
  | 'm06-timestamp-triad'
  | 'm06-outcome-precision'
  | 'm06-parsing-pipeline'
  | 'm06-field-mapping'
  | 'm06-raw-verification'
  | 'm06-utc-timeline'
  | 'm06-midnight-rollover'
  | 'm06-unknown-offset'
  | 'm06-stable-identifiers'
  | 'm06-dhcp-lease-window'
  | 'm06-coincidence-triage'
  | 'm06-corroboration-engine'
  | 'm06-blackout-gap'
  | 'm06-echo-chamber'
  | 'm06-two-column-ledger'
  | 'm06-presumption-trap'
  | 'm06-uncertainty-note'
  // Module 07 Specialized Visual Stories (Windows & Linux Security Monitoring)
  | 'm07-channel-providers'
  | 'm07-eventid-signposts'
  | 'm07-provider-integrity'
  | 'm07-logon-matrix'
  | 'm07-privilege-context'
  | 'm07-identity-doctrine'
  | 'm07-linux-log-geography'
  | 'm07-ssh-stream-triage'
  | 'm07-ssh-brute-force-doctrine'
  | 'm07-systemd-services'
  | 'm07-sudo-audit-trail'
  | 'm07-command-visibility-boundary'
  | 'm07-workstation-baseline-profile'
  | 'm07-event-7045-service'
  | 'm07-context-triage-decision'
  | 'm07-host-timeline-integration'
  | 'm07-communication-playbook'
  | 'm07-scoped-host-summary'
  // Module 08 Specialized Visual Stories (Network Security Monitoring)
  | 'm08-packet-flow-pcap'
  | 'm08-capture-scope'
  | 'm08-segment-visibility'
  | 'm08-tls-metadata-boundary'
  | 'm08-dns-telemetry-correlation'
  | 'm08-payload-assumption-trap'
  | 'm08-wireshark-anatomy'
  | 'm08-display-vs-capture-filter'
  | 'm08-filter-reproducibility'
  | 'm08-port-scan-recon'
  | 'm08-periodic-beacon-analysis'
  | 'm08-timing-attribution-doctrine'
  | 'm08-nat-pat-translation'
  | 'm08-proxy-header-chain'
  | 'm08-attribution-resolution'
  | 'm08-pcap-object-extraction'
  | 'm08-concise-evidence-distillation'
  | 'm08-network-dossier-signoff'
  // Module 09 Specialized Visual Stories (Endpoint Detection & Response)
  | 'm09-edr-device-health'
  | 'm09-stale-sensor-trap'
  | 'm09-telemetry-funnel'
  | 'm09-av-vs-edr-architecture'
  | 'm09-capability-overlap'
  | 'm09-coverage-limits'
  | 'm09-process-tree-lineage'
  | 'm09-command-line-args'
  | 'm09-file-identity-hashes'
  | 'm09-dual-timestamp-timeline'
  | 'm09-temporal-fallacy'
  | 'm09-utc-multi-source-align'
  | 'm09-indicator-reputation-triad'
  | 'm09-unknown-reputation-trap'
  | 'm09-playbook-boundary-restraint'
  | 'm09-isolation-gate-checklist'
  | 'm09-simulated-containment'
  | 'm09-containment-verification-audit'
  // Module 10 Specialized Visual Stories (Security Ecosystem: XDR, Response Tools & OT/ICS)
  | 'm10-workbench-ecosystem'
  | 'm10-xdr-cross-domain'
  | 'm10-case-management-custody'
  | 'm10-soar-orchestration-loop'
  | 'm10-capability-vs-authority'
  | 'm10-safe-automation-guardrails'
  | 'm10-ot-vs-it-fundamentals'
  | 'm10-ics-components-loop'
  | 'm10-reboot-peril-safety'
  | 'm10-purdue-model-layers'
  | 'm10-segmentation-dmz-boundary'
  | 'm10-passive-monitoring-doctrine'
  | 'm10-three-response-actions'
  | 'm10-side-effects-business-impact'
  | 'm10-reversibility-vs-judgment'
  | 'm10-read-only-boundary'
  | 'm10-anti-manufactured-link'
  | 'm10-ot-specialist-escalation'
  // Module 11 Specialized Visual Stories (Identity, Email & Threat Intelligence)
  | 'm11-signin-telemetry-stream'
  | 'm11-mfa-trust-fallacy'
  | 'm11-impossible-travel-reality'
  | 'm11-privilege-blast-radius'
  | 'm11-impact-based-triage'
  | 'm11-identity-directory-truth'
  | 'm11-email-artifact-anatomy'
  | 'm11-misleading-links-traps'
  | 'm11-spf-dkim-dmarc-engine'
  | 'm11-quarantine-defanged-sandbox'
  | 'm11-data-leakage-prevention'
  | 'm11-attachment-hash-escalation'
  | 'm11-threat-intel-pyramid'
  | 'm11-ioc-provenance-freshness'
  | 'm11-sourced-intelligence-note'
  | 'm11-multi-source-correlation'
  | 'm11-shared-infrastructure-trap'
  | 'm11-intel-dossier-signoff'
  // Module 12 Specialized Visual Stories (SOAR & Basic SOC Automation)
  | 'm12-playbook-anatomy-pipeline'
  | 'm12-input-validation-guard'
  | 'm12-conditional-branching-logic'
  | 'm12-automated-enrichment-loop'
  | 'm12-case-notification-docket'
  | 'm12-notification-evidence-standards'
  | 'm12-human-approval-gate'
  | 'm12-role-authorization-scope'
  | 'm12-timeout-silence-doctrine'
  | 'm12-connector-failure-handling'
  | 'm12-bounded-retries-circuit'
  | 'm12-playbook-audit-trail'
  | 'm12-meaningful-human-review'
  | 'm12-target-mismatch-restraint'
  | 'm12-reversal-plan-architecture'
  | 'm12-never-automate-redlines'
  | 'm12-deduplication-idempotency'
  | 'm12-master-soar-signoff'
  // Module 13 Specialized Visual Stories (MITRE ATT&CK for L1 Analysts)
  | 'm13-ttp-triad-hierarchy'
  | 'm13-matrix-navigation-grid'
  | 'm13-shared-vocabulary-engine'
  | 'm13-descriptive-not-malice'
  | 'm13-observable-technique-pipeline'
  | 'm13-dual-use-lolbins-paradox'
  | 'm13-credential-access-matrix'
  | 'm13-discovery-ttps-recon'
  | 'm13-discovery-credential-bridge'
  | 'm13-technique-specificity-depth'
  | 'm13-plausible-vs-speculative'
  | 'm13-evidence-threshold-matrix'
  | 'm13-evidentiary-anchors-dossier'
  | 'm13-uncertainty-confidence-levels'
  | 'm13-audit-proof-triage-docket'
  | 'm13-kill-chain-leap-fallacy'
  | 'm13-solid-vs-dotted-links'
  | 'm13-master-attack-signoff'
  // Module 14 Specialized Visual Stories (Incident Response & SOC Documentation)
  | 'm14-nist-sans-lifecycle'
  | 'm14-detection-analysis-gates'
  | 'm14-preparation-foundations'
  | 'm14-l1-l2-l3-boundaries'
  | 'm14-escalation-triggers-matrix'
  | 'm14-evidence-preservation-doctrine'
  | 'm14-utc-chronology-timeline'
  | 'm14-five-ws-case-notes'
  | 'm14-facts-vs-inferences'
  | 'm14-severity-matrix-scoring'
  | 'm14-confidence-scoring-rubric'
  | 'm14-case-dispositions-quad'
  | 'm14-escalation-chain-roles'
  | 'm14-case-ownership-transfer'
  | 'm14-out-of-band-comms'
  | 'm14-shift-handover-briefing'
  | 'm14-post-incident-lessons'
  | 'm14-master-soc-capstone-signoff';

export interface VisualNodeItem {
  id: string;
  label: string;
  sub: string;
  badge?: string;
  description: string;
  details?: string;
  tags?: string[];
  cx?: number;
  cy?: number;
}

export interface InteractiveVisualStoryProps {
  chapter: V2ChapterNormalized;
  unit: V2Unit;
  module: V2Module;
  activeStyle?: VisualStoryStyle;
  onStyleChange?: (style: VisualStoryStyle) => void;
  selectedNodeId?: string | null;
  onSelectNode?: (node: VisualNodeItem) => void;
  visualFormat?: string;
}

export function InteractiveVisualStoryEngine({
  chapter,
  unit,
  module,
  activeStyle: externalStyle,
  onStyleChange,
  selectedNodeId: externalSelectedNodeId,
  onSelectNode,
  visualFormat: externalFormat,
}: InteractiveVisualStoryProps) {
  // Determine dynamic default style according to module/topic
  const getDefaultStyle = (): VisualStoryStyle => {
    const chId = chapter?.id || '';
    if (chId === 'M00-U1-C1') return 'm00-campus-reception';
    if (chId === 'M00-U1-C2') return 'm00-teaching-zones-map';
    if (chId === 'M00-U2-C1') return 'm00-blue-border-console';
    if (chId === 'M00-U2-C2') return 'm00-evidence-integrity-hash';
    if (chId === 'M00-U3-C1') return 'm00-branch-finance-service';
    if (chId === 'M00-U3-C2') return 'm00-curriculum-roadmap-15';

    if (chId === 'M01-U1-C1') return 'm01-hardware-bus';
    if (chId === 'M01-U1-C2') return 'm01-filesystem-tree';
    if (chId === 'M01-U2-C1') return 'm01-terminal-cli';
    if (chId === 'M01-U2-C2') return 'm01-log-anatomy';
    if (chId === 'M01-U3-C1') return 'm01-mac-ip-addressing';
    if (chId === 'M01-U3-C2') return 'm01-workstation-baseline';

    if (chId === 'M02-U1-C1') return 'm02-subnet-calculator';
    if (chId === 'M02-U1-C2') return 'm02-access-point';
    if (chId === 'M02-U2-C1') return 'm02-dhcp-dora';
    if (chId === 'M02-U2-C2') return 'm02-port-doors';
    if (chId === 'M02-U3-C1') return 'm02-small-branch-map';
    if (chId === 'M02-U3-C2') return 'm02-vlan-segmentation';

    if (chId === 'M03-U1-C1') return 'm03-asset-inventory';
    if (chId === 'M03-U1-C2') return 'm03-cia-triad';
    if (chId === 'M03-U2-C1') return 'm03-phishing-anatomy';
    if (chId === 'M03-U2-C2') return 'm03-malware-taxonomy';
    if (chId === 'M03-U3-C1') return 'm03-defense-triad';
    if (chId === 'M03-U3-C2') return 'm03-defense-in-depth-castle';

    if (chId === 'M04-U1-C1') return 'm04-soc-hierarchy';
    if (chId === 'M04-U1-C2') return 'm04-queue-ingestion';
    if (chId === 'M04-U2-C1') return 'm04-event-vs-alert';
    if (chId === 'M04-U2-C2') return 'm04-taxonomy-quad';
    if (chId === 'M04-U3-C1') return 'm04-five-ws-triage';
    if (chId === 'M04-U3-C2') return 'm04-disposition-tree';

    if (chId === 'M05-U1-C1') return 'm05-siem-capabilities';
    if (chId === 'M05-U1-C2') return 'm05-source-ecosystem';
    if (chId === 'M05-U2-C1') return 'm05-field-schema';
    if (chId === 'M05-U2-C2') return 'm05-boolean-logic';
    if (chId === 'M05-U3-C1') return 'm05-correlation-engine';
    if (chId === 'M05-U3-C2') return 'm05-source-mosaic';

    if (chId === 'M06-U1-C1') return 'm06-literal-event';
    if (chId === 'M06-U1-C2') return 'm06-parsing-pipeline';
    if (chId === 'M06-U2-C1') return 'm06-utc-timeline';
    if (chId === 'M06-U2-C2') return 'm06-stable-identifiers';
    if (chId === 'M06-U3-C1') return 'm06-corroboration-engine';
    if (chId === 'M06-U3-C2') return 'm06-two-column-ledger';

    if (chId === 'M07-U1-C1') return 'm07-channel-providers';
    if (chId === 'M07-U1-C2') return 'm07-logon-matrix';
    if (chId === 'M07-U2-C1') return 'm07-linux-log-geography';
    if (chId === 'M07-U2-C2') return 'm07-systemd-services';
    if (chId === 'M07-U3-C1') return 'm07-workstation-baseline-profile';
    if (chId === 'M07-U3-C2') return 'm07-host-timeline-integration';

    if (chId === 'M08-U1-C1') return 'm08-packet-flow-pcap';
    if (chId === 'M08-U1-C2') return 'm08-tls-metadata-boundary';
    if (chId === 'M08-U2-C1') return 'm08-wireshark-anatomy';
    if (chId === 'M08-U2-C2') return 'm08-port-scan-recon';
    if (chId === 'M08-U3-C1') return 'm08-nat-pat-translation';
    if (chId === 'M08-U3-C2') return 'm08-pcap-object-extraction';

    if (chId === 'M09-U1-C1') return 'm09-edr-device-health';
    if (chId === 'M09-U1-C2') return 'm09-av-vs-edr-architecture';
    if (chId === 'M09-U2-C1') return 'm09-process-tree-lineage';
    if (chId === 'M09-U2-C2') return 'm09-dual-timestamp-timeline';
    if (chId === 'M09-U3-C1') return 'm09-indicator-reputation-triad';
    if (chId === 'M09-U3-C2') return 'm09-isolation-gate-checklist';

    if (chId === 'M10-U1-C1') return 'm10-workbench-ecosystem';
    if (chId === 'M10-U1-C2') return 'm10-soar-orchestration-loop';
    if (chId === 'M10-U2-C1') return 'm10-ot-vs-it-fundamentals';
    if (chId === 'M10-U2-C2') return 'm10-purdue-model-layers';
    if (chId === 'M10-U3-C1') return 'm10-three-response-actions';
    if (chId === 'M10-U3-C2') return 'm10-read-only-boundary';

    if (chId === 'M11-U1-C1') return 'm11-signin-telemetry-stream';
    if (chId === 'M11-U1-C2') return 'm11-privilege-blast-radius';
    if (chId === 'M11-U2-C1') return 'm11-email-artifact-anatomy';
    if (chId === 'M11-U2-C2') return 'm11-quarantine-defanged-sandbox';
    if (chId === 'M11-U3-C1') return 'm11-threat-intel-pyramid';
    if (chId === 'M11-U3-C2') return 'm11-multi-source-correlation';

    if (chId === 'M12-U1-C1') return 'm12-playbook-anatomy-pipeline';
    if (chId === 'M12-U1-C2') return 'm12-automated-enrichment-loop';
    if (chId === 'M12-U2-C1') return 'm12-human-approval-gate';
    if (chId === 'M12-U2-C2') return 'm12-connector-failure-handling';
    if (chId === 'M12-U3-C1') return 'm12-meaningful-human-review';
    if (chId === 'M12-U3-C2') return 'm12-never-automate-redlines';

    if (chId === 'M13-U1-C1') return 'm13-ttp-triad-hierarchy';
    if (chId === 'M13-U1-C2') return 'm13-descriptive-not-malice';
    if (chId === 'M13-U2-C1') return 'm13-credential-access-matrix';
    if (chId === 'M13-U2-C2') return 'm13-technique-specificity-depth';
    if (chId === 'M13-U3-C1') return 'm13-evidentiary-anchors-dossier';
    if (chId === 'M13-U3-C2') return 'm13-kill-chain-leap-fallacy';

    if (chId === 'M14-U1-C1') return 'm14-nist-sans-lifecycle';
    if (chId === 'M14-U1-C2') return 'm14-l1-l2-l3-boundaries';
    if (chId === 'M14-U2-C1') return 'm14-utc-chronology-timeline';
    if (chId === 'M14-U2-C2') return 'm14-severity-matrix-scoring';
    if (chId === 'M14-U3-C1') return 'm14-escalation-chain-roles';
    if (chId === 'M14-U3-C2') return 'm14-shift-handover-briefing';

    const modId = module?.id || '';
    if (modId.includes('00') || modId === '00') return 'm00-campus-reception';
    if (modId.includes('14')) return 'm14-nist-sans-lifecycle';
    if (modId.includes('13')) return 'm13-ttp-triad-hierarchy';
    if (modId.includes('12')) return 'm12-playbook-anatomy-pipeline';
    if (modId.includes('11')) return 'm11-signin-telemetry-stream';
    if (modId.includes('10')) return 'm10-workbench-ecosystem';
    if (modId.includes('01')) return 'm01-hardware-bus';
    if (modId.includes('02')) return 'm02-subnet-calculator';
    if (modId.includes('03')) return 'm03-asset-inventory';
    if (modId.includes('04')) return 'm04-soc-hierarchy';
    if (modId.includes('05')) return 'm05-siem-capabilities';
    if (modId.includes('06')) return 'm06-literal-event';
    if (modId.includes('07')) return 'm07-channel-providers';
    if (modId.includes('08')) return 'm08-packet-flow-pcap';
    if (modId.includes('09')) return 'm09-edr-device-health';
    return 'team-orbit';
  };

  const [currentStyle, setCurrentStyle] = useState<VisualStoryStyle>(
    externalStyle || getDefaultStyle()
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    externalSelectedNodeId || 'hw-cpu'
  );
  const [animStep, setAnimStep] = useState<number>(0);
  const currentFormat = externalFormat || chapter?.section2_visual?.visualType || 'animated-story';

  // CLI state for m01-terminal-cli
  const [activeCliCommand, setActiveCliCommand] = useState<string>('tasklist');

  // Isolation toggle state for m01-triage-matrix
  const [isHostIsolated, setIsHostIsolated] = useState<boolean>(false);

  // Sync external style changes
  useEffect(() => {
    if (externalStyle && externalStyle !== currentStyle) {
      setCurrentStyle(externalStyle);
    }
  }, [externalStyle, currentStyle]);

  // Sync external node changes
  useEffect(() => {
    if (externalSelectedNodeId && externalSelectedNodeId !== selectedNodeId) {
      setSelectedNodeId(externalSelectedNodeId);
    }
  }, [externalSelectedNodeId, selectedNodeId]);

  // Animation pulse timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleNodeClick = (node: VisualNodeItem) => {
    sound.playClick();
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  // ---------------------------------------------------------------------------
  // MODULE 01 NODE DEFINITIONS (18 Bespoke Graphic Models)
  // ---------------------------------------------------------------------------

  // 1. M01-U1-C1 Pillar 1: Hardware Bus
  const hardwareBusNodes: VisualNodeItem[] = [
    {
      id: 'hw-cpu',
      label: 'Processor (CPU)',
      sub: 'Central Engine',
      badge: 'CALCULATION & LOGIC',
      description: 'The electronic engine executing billions of process instructions per second.',
      details: 'Follows code instruction pointers, manages CPU privilege rings (Ring 0 vs Ring 3), and processes data loaded from RAM.',
      tags: ['Clock: 3.6 GHz', 'Instruction Pointers', 'Registers: EAX/RAX', 'Core Logic'],
    },
    {
      id: 'hw-ram',
      label: 'Memory (RAM)',
      sub: 'Volatile Workspace',
      badge: 'EPHEMERAL EXECUTION SPACE',
      description: 'Ultra-fast temporary memory holding currently open applications, spreadsheets, and active code.',
      details: 'Volatile: all data vanishes instantly when power is turned off. Malware without persistence evaporates on reboot.',
      tags: ['Volatile Storage', 'Fast Read/Write', 'Memory Pages', 'Cleared on Shutdown'],
    },
    {
      id: 'hw-ssd',
      label: 'Storage (SSD / Disk)',
      sub: 'Permanent Cabinet',
      badge: 'NON-VOLATILE FILING CABINET',
      description: 'Persistent digital filing cabinet preserving operating system binaries, user reports, and event logs.',
      details: 'Non-volatile: data remains permanently saved across power outages and restarts until explicitly deleted.',
      tags: ['Non-Volatile', 'NTFS Filesystem', 'Persistence Location', 'Event Logs Vault'],
    },
    {
      id: 'hw-io',
      label: 'Input & Output (I/O)',
      sub: 'Bus Controller',
      badge: 'PERIPHERAL ARBITRATION',
      description: 'Hardware controllers arbitrating keyboard/mouse inputs and display/network card outputs.',
      details: 'Communicates with hardware device drivers via CPU interrupts and Direct Memory Access (DMA) channels.',
      tags: ['Keyboard / Mouse', 'Display Output', 'Network Card (NIC)', 'Interrupt Requests (IRQ)'],
    },
  ];

  // 2. M01-U1-C1 Pillar 2: OS Coordinator & Kernel Bridge
  const osKernelNodes: VisualNodeItem[] = [
    {
      id: 'kern-apps',
      label: 'User Applications Layer',
      sub: 'Ring 3 User Mode',
      badge: 'RESTRICTED USER SPACE',
      description: 'Everyday applications (Word, Chrome, Calculator) running in isolated virtual memory spaces.',
      details: 'Cannot directly touch physical hardware or memory of other programs. Must issue SYSCALL to access resources.',
      tags: ['Excel.xlsx', 'Chrome.exe', 'Isolated Address Space', 'No Direct Hardware Access'],
    },
    {
      id: 'kern-coord',
      label: 'OS Kernel (Master Coordinator)',
      sub: 'ntoskrnl.exe',
      badge: 'SYSTEM CALL BRIDGE',
      description: 'The master core of the Operating System. Manages process scheduling, memory paging, and hardware drivers.',
      details: 'Enforces security boundaries, arbitrates CPU time slices, and guarantees that frozen apps do not crash the machine.',
      tags: ['Ring 0 Kernel', 'System Call Dispatcher', 'Memory Paging Tables', 'Driver Management'],
    },
    {
      id: 'kern-hw',
      label: 'Physical Hardware Layer',
      sub: 'Silicon Subsystem',
      badge: 'RAW PHYSICAL HARDWARE',
      description: 'Motherboard silicon, multi-core CPU chipsets, DDR4 memory banks, and NVMe SSD controllers.',
      details: 'Hardware instructions executed only when authorized and arbitrated by the operating system kernel.',
      tags: ['CPU Silicon', 'RAM Chips', 'PCIe Bus', 'Storage Controller'],
    },
  ];

  // 3. M01-U1-C1 Pillar 3: User Accounts & Least Privilege
  const accountPrivilegeNodes: VisualNodeItem[] = [
    {
      id: 'user-std',
      label: 'Standard User (FIN-OPS-01)',
      sub: 'Medium Integrity',
      badge: 'EVERYDAY OFFICE WORKSPACE',
      description: 'Account used for everyday tasks (invoicing, browsing, spreadsheets). Granted only minimal necessary rights.',
      details: 'Can create files in own profile folder, but operating system blocks any modifications to C:\\Windows\\System32.',
      tags: ['Medium Integrity Token', 'SID: S-1-5-21-...-1002', 'Write Protected System32', 'Least Privilege Enforced'],
    },
    {
      id: 'uac-gate',
      label: 'UAC Security Elevation Gate',
      sub: 'Security Barrier',
      badge: 'PRIVILEGE BOUNDARY',
      description: 'The barrier separating non-privileged execution from master administrative authority.',
      details: 'Prompts for explicit credentials before allowing system alterations, preventing silent background compromise.',
      tags: ['Elevation Prompt', 'Consent Validation', 'Blast Radius Containment', 'Tamper Defense'],
    },
    {
      id: 'user-admin',
      label: 'Administrator (Elevated)',
      sub: 'High / SYSTEM Integrity',
      badge: 'MASTER SYSTEM AUTHORITY',
      description: 'Privileged administrative token holding master keys to alter registry policies, install drivers, and manage users.',
      details: 'Reserved strictly for authorized maintenance. Analysts verify that everyday employees never run with admin rights.',
      tags: ['High Integrity Token', 'SID: S-1-5-32-544 (Admins)', 'Full System Access', 'Driver Installation'],
    },
  ];

  // 4. M01-U1-C2 Pillar 1: Filesystem Tree & Protected Paths
  const filesystemNodes: VisualNodeItem[] = [
    {
      id: 'fs-sys32',
      label: 'C:\\Windows\\System32',
      sub: 'Protected OS Core',
      badge: 'READ-ONLY FOR STANDARD USERS',
      description: 'Contains core operating system DLLs, kernel drivers, and critical executables (cmd.exe, svchost.exe).',
      details: 'Standard users cannot write, delete, or modify files here. Modification requires High/SYSTEM tokens.',
      tags: ['System Binaries', 'NTFS ACL: System Full Control', 'Standard User: Read & Execute', 'Integrity Protected'],
    },
    {
      id: 'fs-prog',
      label: 'C:\\Program Files',
      sub: 'Enterprise Software',
      badge: 'INSTALLED SOFTWARE REPO',
      description: 'Contains trusted installed commercial applications (Office, Chrome, Accounting Suites).',
      details: 'Standard users cannot install unapproved portable malware here without triggering administrator UAC prompts.',
      tags: ['Application Binaries', 'Protected Program Files', 'Signed Executables', 'Admin Install Required'],
    },
    {
      id: 'fs-user',
      label: 'C:\\Users\\FIN-OPS-01',
      sub: 'Personal Profile',
      badge: 'USER WORKSPACE',
      description: 'Personal user directory: Documents, Downloads, Desktop, and AppData.',
      details: 'Standard user has full read/write access to their personal folder to save reports and working spreadsheets.',
      tags: ['User Documents', 'Downloads Folder', 'AppData Cache', 'Isolated From Other Users'],
    },
    {
      id: 'fs-public',
      label: 'C:\\Users\\Public',
      sub: 'Shared Directory',
      badge: 'FREQUENT MALWARE STAGING ⚠️',
      description: 'Shared directory accessible by all users on the workstation. Frequently abused by malware for staging payloads.',
      details: 'Analysts inspect C:\\Users\\Public during triage to detect unauthorized batch scripts or hidden drop files.',
      tags: ['World Writable', 'Shared Workspace', 'Staging Investigation Target', 'High Triage Priority'],
    },
  ];

  // 5. M01-U1-C2 Pillar 2: Process Parent-Child Lifecycle
  const processLifecycleNodes: VisualNodeItem[] = [
    {
      id: 'proc-services',
      label: 'services.exe (PID 620)',
      sub: 'Service Controller',
      badge: 'SYSTEM DAEMON ROOT',
      description: 'The master Service Control Manager (SCM) responsible for starting background services.',
      details: 'Executes under SYSTEM authority. Legitimate parent for background service hosts like svchost.exe.',
      tags: ['PID: 620', 'User: SYSTEM', 'Parent: wininit.exe', 'Kernel Daemon'],
    },
    {
      id: 'proc-svchost',
      label: 'svchost.exe (PID 910)',
      sub: 'Shared Service Host',
      badge: 'CORE SERVICE HOST',
      description: 'Host process for multiple Windows shared service DLLs (Networking, RPC, EventLog).',
      details: 'Must always launch from C:\\Windows\\System32. Any svchost.exe running from AppData or Temp is malware.',
      tags: ['PID: 910', 'Session: 0 (Services)', 'Path: System32', 'Verified Binary'],
    },
    {
      id: 'proc-explorer',
      label: 'explorer.exe (PID 2140)',
      sub: 'User Desktop Shell',
      badge: 'USER SESSION SHELL',
      description: 'The graphical desktop manager and file explorer running in the logged-in user context.',
      details: 'Legitimate parent process for interactive user applications (browser, calculator, office suite).',
      tags: ['PID: 2140', 'User: FIN-OPS-01', 'Session: 1 (Console)', 'Interactive GUI'],
    },
    {
      id: 'proc-cmd',
      label: 'cmd.exe (PID 3400)',
      sub: 'Command Shell',
      badge: 'CHILD OF EXPLORER',
      description: 'Windows command interpreter launched from the user desktop session.',
      details: 'Standard command prompt. Triage question: was it opened by the user or spawned by a malicious macro?',
      tags: ['PID: 3400', 'PPID: 2140 (explorer.exe)', 'User: FIN-OPS-01', 'CLI Terminal'],
    },
    {
      id: 'proc-ps-lolbin',
      label: 'powershell.exe (PID 4820)',
      sub: 'Encoded Execution',
      badge: 'SUSPICIOUS CHILD (LOLBIN) ⚠️',
      description: 'PowerShell interpreter launched with obfuscated arguments (-enc Base64) from cmd.exe.',
      details: 'Living Off The Land (LOLBIN) execution alert! Legitimate administrative tool abused by adversary to download scripts.',
      tags: ['PID: 4820', 'PPID: 3400 (cmd.exe)', 'Flag: -ExecutionPolicy Bypass', 'High Severity Trigger'],
    },
  ];

  // 6. M01-U1-C2 Pillar 3: Virtual Memory & Page Isolation
  const memoryIsolationNodes: VisualNodeItem[] = [
    {
      id: 'mem-excel',
      label: 'Process 1: Excel.exe',
      sub: 'Virtual Address 0x0000..0xFFFF',
      badge: 'ISOLATED USER SANDBOX A',
      description: 'Excel operates inside its private contiguous 64-bit virtual memory address space.',
      details: 'Cannot see or alter memory belonging to other processes. Enforces software stability and secret privacy.',
      tags: ['Private Virtual Heap', 'Page Frame: Active', 'Isolated Address Space', 'No Direct RAM Access'],
    },
    {
      id: 'mem-mmu',
      label: 'MMU & Page Tables',
      sub: 'Memory Management Unit',
      badge: 'HARDWARE TRANSLATION BRIDGE',
      description: 'Hardware MMU on the CPU maps virtual page pointers to actual physical RAM silicon addresses.',
      details: 'Enforces memory access permissions (Read, Write, Execute / NX bit). Blocks buffer overflow shellcode.',
      tags: ['Hardware Translation', 'Virtual-to-Physical Paging', 'Data Execution Prevention (DEP)', 'MMU Protection'],
    },
    {
      id: 'mem-chrome',
      label: 'Process 2: Chrome.exe',
      sub: 'Virtual Address 0x0000..0xFFFF',
      badge: 'ISOLATED USER SANDBOX B',
      description: 'Chrome runs in its own distinct virtual sandbox. Attempting to cross boundaries triggers a crash.',
      details: 'If Chrome attempts to access Excel memory addresses, the CPU MMU raises a Memory Protection Fault.',
      tags: ['Renderer Sandbox', 'Independent Address Space', 'Page Protection', 'Cross-Process Guard'],
    },
    {
      id: 'mem-barrier',
      label: 'Memory Protection Barrier',
      sub: 'Ring 0 MMU Guard',
      badge: 'ACCESS DENIED BARRIER ⛔',
      description: 'Hardware-enforced ring barrier preventing processes from reading secret passwords or memory of other apps.',
      details: 'Adversaries use process injection or debugging APIs to bypass this barrier during credential dumping.',
      tags: ['Memory Segmentation', 'Kernel Paging Guard', 'Scraping Prevention', 'Hardware-Enforced'],
    },
  ];

  // 7. M01-U2-C1 Pillar 1: Terminal CLI Data
  const cliCommandsData: Record<string, { cmd: string; output: string; desc: string; badge: string }> = {
    tasklist: {
      cmd: 'tasklist /v',
      output: `Image Name                     PID Session Name        Session#    Mem Usage Status          User Name\n========================= ======== ================ =========== ============ =============== ====================\nexplorer.exe                  2140 Console                    1     64,220 K Running         FINCORP\\FIN-OPS-01\nexcel.exe                     3840 Console                    1     82,140 K Running         FINCORP\\FIN-OPS-01\nsvchost.exe                    910 Services                   0     14,800 K Running         NT AUTHORITY\\SYSTEM\npowershell.exe                4820 Console                    1     45,300 K Running         FINCORP\\FIN-OPS-01`,
      desc: 'Displays all running processes on the host, including PID, memory consumption, and owning user account.',
      badge: 'PROCESS TRIAGE',
    },
    dir: {
      cmd: 'dir C:\\Users\\FIN-OPS-01\\Documents',
      output: ` Volume in drive C has no label.\n Directory of C:\\Users\\FIN-OPS-01\\Documents\n\n15-10-2026  09:14 AM    <DIR>          .\n15-10-2026  09:14 AM    <DIR>          ..\n15-10-2026  09:12 AM           142,336 Monthly_Budget_Oct2026.xlsx\n15-10-2026  08:45 AM            28,672 Vendor_Invoice_CDAC.pdf\n               2 File(s)        171,008 bytes`,
      desc: 'Lists files, folders, timestamps, and sizes in the current directory.',
      badge: 'FILESYSTEM DISCOVERY',
    },
    whoami: {
      cmd: 'whoami /priv',
      output: `PRIVILEGES INFORMATION\n----------------------\n\nPrivilege Name                Description                          State\n============================= ==================================== ========\nSeChangeNotifyPrivilege       Bypass traverse checking             Enabled\nSeIncreaseWorkingSetPrivilege Increase a process working set       Disabled\n[!] Note: SeDebugPrivilege is NOT present (Standard User Account)`,
      desc: 'Inspects user security token privileges. Confirms that standard user accounts lack sensitive SeDebugPrivilege.',
      badge: 'TOKEN AUDIT',
    },
    ipconfig: {
      cmd: 'ipconfig /all',
      output: `Ethernet adapter Local Area Connection:\n   Connection-specific DNS Suffix  . : fincorp.local\n   IPv4 Address. . . . . . . . . . . : 10.10.20.15(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 10.10.20.1\n   DNS Servers . . . . . . . . . . . : 10.10.10.5`,
      desc: 'Displays host IP configuration: local IP address, subnet boundary, default gateway router, and DNS resolver.',
      badge: 'NETWORK ADAPTER DIAGNOSTIC',
    },
  };

  // 8. M01-U2-C1 Pillar 2: Process Triage HUD
  const processTriageNodes: VisualNodeItem[] = [
    {
      id: 'triage-explorer',
      label: 'explorer.exe',
      sub: 'PID: 2140 • 64 MB',
      badge: 'VERIFIED DESKTOP SHELL',
      description: 'Standard Windows desktop manager launched on user logon.',
      details: 'Path: C:\\Windows\\explorer.exe. Digital Signature: Valid Microsoft Corporation.',
      tags: ['User: FIN-OPS-01', 'Verified Signature', 'Parent: userinit.exe', 'Clean Status'],
    },
    {
      id: 'triage-svchost',
      label: 'svchost.exe',
      sub: 'PID: 910 • 14 MB',
      badge: 'SYSTEM SERVICE HOST',
      description: 'Host process for Windows OS services running in Session 0.',
      details: 'Path: C:\\Windows\\System32\\svchost.exe -k DcomLaunch. Expected system service.',
      tags: ['User: NT AUTHORITY\\SYSTEM', 'Session: 0', 'System32 Verified', 'Clean Status'],
    },
    {
      id: 'triage-excel',
      label: 'excel.exe',
      sub: 'PID: 3840 • 82 MB',
      badge: 'OFFICE APPLICATION',
      description: 'Microsoft Excel running standard monthly budget spreadsheet.',
      details: 'Launched by user FIN-OPS-01. Low CPU footprint, normal office application execution.',
      tags: ['User: FIN-OPS-01', 'Signed Binary', 'Normal Heap', 'Clean Status'],
    },
    {
      id: 'triage-suspicious',
      label: 'powershell.exe',
      sub: 'PID: 4820 • 45 MB ⚠️',
      badge: 'ANOMALY DETECTED (LOLBIN)',
      description: 'PowerShell executing an obfuscated Base64 encoded payload from cmd.exe.',
      details: 'Command line: powershell.exe -NoP -NonI -W Hidden -enc aQBwAGMAbwBuAGYAaQBn... High triage alert!',
      tags: ['PID: 4820', 'User: FIN-OPS-01', 'Suspicious Args: -enc', 'Adversary LOLBIN Abuse'],
    },
  ];

  // 9. M01-U2-C1 Pillar 3: Socket Diagnostics (netstat)
  const socketDiagnosticsNodes: VisualNodeItem[] = [
    {
      id: 'sock-local',
      label: 'Local Socket (10.10.20.15:49821)',
      sub: 'Workstation BLR-BR-WS-04',
      badge: 'CLIENT EPHEMERAL PORT',
      description: 'Dynamic local high-number port assigned by the OS network stack for outbound communication.',
      details: 'Bound to local interface 10.10.20.15 on the branch finance LAN.',
      tags: ['IP: 10.10.20.15', 'Port: 49821', 'Protocol: TCP', 'State: ESTABLISHED'],
    },
    {
      id: 'sock-https',
      label: 'Foreign Socket (10.10.10.5:443)',
      sub: 'Internal Gateway / Portal',
      badge: 'APPROVED HTTPS TRAFFIC',
      description: 'Legitimate encrypted HTTPS connection to internal enterprise finance portal.',
      details: 'Process mapping: bound to PID 3840 (excel.exe) refreshing SharePoint workbook.',
      tags: ['Remote: 10.10.10.5', 'Port: 443 (HTTPS)', 'Signed TLS Certificate', 'Benign Business Traffic'],
    },
    {
      id: 'sock-dns',
      label: 'DNS Socket (10.10.10.5:53)',
      sub: 'Internal Domain Controller',
      badge: 'NAME RESOLUTION UDP',
      description: 'Workstation querying corporate DNS resolver to translate hostnames to IP addresses.',
      details: 'Standard UDP 53 communication. Essential network service for branch connectivity.',
      tags: ['Remote: 10.10.10.5', 'Port: 53 (DNS)', 'Protocol: UDP', 'Clean Traffic'],
    },
    {
      id: 'sock-c2-beacon',
      label: 'Foreign IP (185.220.101.4:8080)',
      sub: 'External Suspicious Host ⚠️',
      badge: 'COMMAND & CONTROL BEACON',
      description: 'Active TCP connection to foreign IP address outside enterprise perimeter.',
      details: 'Netstat triage: bound to PID 4820 (powershell.exe)! Beaconing out every 60 seconds.',
      tags: ['Foreign IP: 185.220.101.4', 'Port: 8080', 'Mapped PID: 4820', 'Immediate Isolation Alert'],
    },
  ];

  // 10. M01-U2-C2 Pillar 1: Log Anatomy
  const logAnatomyNodes: VisualNodeItem[] = [
    {
      id: 'log-eventid',
      label: 'Event ID: 4688',
      sub: 'Process Creation Audit',
      badge: 'CORE EVENT IDENTIFIER',
      description: 'Operating system audit event: "A new process has been created".',
      details: 'Generated by Microsoft-Windows-Security-Auditing whenever a program executes on the host.',
      tags: ['Event ID: 4688', 'Category: Detailed Tracking', 'Audit Success', 'Forensic Anchor'],
    },
    {
      id: 'log-time',
      label: 'Timestamp: 09:14:22.184Z',
      sub: 'Microsecond Clock',
      badge: 'TEMPORAL CORRELATION',
      description: 'Exact UTC timestamp recorded when the process execution occurred.',
      details: 'Enables analysts to correlate host activity with firewall logs, proxy requests, and SIEM alerts.',
      tags: ['Timestamp: 2026-10-15T09:14:22Z', 'Clock Source: Domain NTP', 'Microsecond Accuracy'],
    },
    {
      id: 'log-subject',
      label: 'Subject Account: FIN-OPS-01',
      sub: 'Security ID: S-1-5-21-3829-1002',
      badge: 'ACCOUNT ATTRIBUTION',
      description: 'Identifies the security principal whose credentials launched the process.',
      details: 'Logon ID: 0x3E7. Confirms standard user account context and medium mandatory integrity.',
      tags: ['User: FIN-OPS-01', 'SID: S-1-5-21-3829-1002', 'Logon ID: 0x3E7', 'Medium Integrity'],
    },
    {
      id: 'log-process',
      label: 'Process: powershell.exe',
      sub: 'Parent: cmd.exe (PID 3400)',
      badge: 'EXECUTION METADATA',
      description: 'Contains New Process Name, full execution path, and complete command-line arguments.',
      details: 'Process CommandLine: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -enc ..."',
      tags: ['Target: powershell.exe', 'Parent: cmd.exe', 'CLI Arguments Captured', 'LOLBIN Flag'],
    },
    {
      id: 'log-status',
      label: 'Status Code: 0x0',
      sub: 'Execution Successful',
      badge: 'RESULT CONFIRMATION',
      description: 'Indicates whether the requested action completed successfully or was denied by policy.',
      details: 'Status 0x0 confirms process execution succeeded. Code 0xC0000022 would indicate access denied.',
      tags: ['Result: 0x0 (Success)', 'Execution Completed', 'Security Audit Passed'],
    },
  ];

  // 11. M01-U2-C2 Pillar 2: Log Vault
  const logVaultNodes: VisualNodeItem[] = [
    {
      id: 'vault-sec',
      label: 'Security.evtx',
      sub: 'Authentication & Auditing',
      badge: 'CRITICAL AUDIT CHANNEL',
      description: 'Contains authentication attempts (4624/4625), process launches (4688), and privilege uses.',
      details: 'Protected by strict NTFS ACLs. Only SYSTEM and local Administrators can read this file.',
      tags: ['Path: winevt\\Logs\\Security.evtx', 'NTFS ACL: System Only', 'Circular Buffer', 'Audit Master'],
    },
    {
      id: 'vault-sys',
      label: 'System.evtx',
      sub: 'OS Drivers & Kernel',
      badge: 'KERNEL EVENT CHANNEL',
      description: 'Records kernel driver loading, service starts/stops, system crashes (BSOD), and hardware events.',
      details: 'Crucial for detecting unauthorized rootkits or rogue driver installations.',
      tags: ['Path: winevt\\Logs\\System.evtx', 'Kernel Drivers', 'Service Controller', 'Crash Telemetry'],
    },
    {
      id: 'vault-app',
      label: 'Application.evtx',
      sub: 'Software Exceptions',
      badge: 'USER SOFTWARE CHANNEL',
      description: 'Captures application errors, database crashes, and software installations.',
      details: 'Helps analysts identify application fault crashes that may indicate exploit attempts.',
      tags: ['Path: winevt\\Logs\\Application.evtx', 'App Crashes', 'Software Faults', 'Exploit Signals'],
    },
    {
      id: 'vault-service',
      label: 'Windows EventLog Service',
      sub: 'ntoskrnl Coordinator',
      badge: 'TAMPER DEFENSE SERVICE',
      description: 'Kernel-level service that writes audit events into circular disk buffers.',
      details: 'Detects and alerts on unauthorized attempts to clear logs using wevtutil or Event ID 1102.',
      tags: ['Service: EventLog', 'Tamper Protected', 'Buffer Coordinator', 'Event ID 1102 Detection'],
    },
  ];

  // 12. M01-U2-C2 Pillar 3: Log Forwarding Pipeline
  const logForwardingNodes: VisualNodeItem[] = [
    {
      id: 'fwd-wef',
      label: 'Host WEF Agent (BLR-BR-WS-04)',
      sub: 'Windows Event Forwarder',
      badge: 'ENDPOINT SENSOR AGENT',
      description: 'Scrapes security event records from the local .evtx buffer as soon as they are written.',
      details: 'Subscriptions stream high-fidelity Event IDs (4624, 4688, 4672) to central collection.',
      tags: ['Host: BLR-BR-WS-04', 'Agent: WEF / Winlogbeat', 'Real-Time Streaming', 'Local Scraping'],
    },
    {
      id: 'fwd-tls',
      label: 'Encrypted mTLS Conduit',
      sub: 'Port 5986 Secure Wire',
      badge: 'SECURE TRANSIT CONDUIT',
      description: 'Mutual TLS encrypted pipeline transporting JSON/XML event streams across the network.',
      details: 'Guarantees confidentiality and prevents packet tampering or eavesdropping in transit.',
      tags: ['Port: 5986 (WinRM HTTPS)', 'Mutual TLS 1.3', 'Encrypted Wire', 'Anti-Eavesdropping'],
    },
    {
      id: 'fwd-siem',
      label: 'Central SIEM Collector',
      sub: 'Splunk / Microsoft Sentinel',
      badge: 'ENTERPRISE DATA LAKE',
      description: 'Central security repository ingesting millions of events per second across all corporate endpoints.',
      details: 'Correlation rules evaluate incoming streams in real-time to generate security alerts for L1 triage.',
      tags: ['SIEM Collector', 'Index Cluster', 'Correlation Engine', 'High Availability'],
    },
    {
      id: 'fwd-immutable',
      label: 'Immutability Guarantee',
      sub: 'Tamper-Proof Storage',
      badge: 'PRESERVED GROUND TRUTH',
      description: 'Once forwarded, logs are written to immutable write-once read-many (WORM) storage.',
      details: 'Even if an attacker wipes or formats workstation BLR-BR-WS-04, the forensic proof remains in the SIEM.',
      tags: ['WORM Storage', 'Forensic Integrity', 'Tamper-Proof Ground Truth', 'Court Admissible'],
    },
  ];

  // 13. M01-U3-C1 Pillar 1: MAC vs IP Addressing
  const macIpAddressingNodes: VisualNodeItem[] = [
    {
      id: 'net-mac',
      label: 'Physical MAC Address',
      sub: '00:1A:2B:3C:4D:5E',
      badge: 'LAYER 2 HARDWARE FINGERPRINT',
      description: 'Permanent hardware address burned into the network interface card (NIC) ROM chipset.',
      details: 'Used for hop-by-hop local packet delivery on the Ethernet switch.',
      tags: ['Layer: 2 (Data Link)', 'Format: Hexadecimal', 'Burned-In Address (BIA)', 'Local Switch Delivery'],
    },
    {
      id: 'net-ip',
      label: 'Logical IP Address',
      sub: '10.10.20.15',
      badge: 'LAYER 3 ROUTABLE ADDRESS',
      description: 'Logical postal address assigned by DHCP to identify the host on the branch finance subnet.',
      details: 'Hierarchical routing address used by routers to navigate packets across networks.',
      tags: ['Layer: 3 (Network)', 'Subnet: /24 (255.255.255.0)', 'DHCP Leased', 'Routable Address'],
    },
    {
      id: 'net-arp',
      label: 'ARP Translation Table',
      sub: 'Address Resolution Protocol',
      badge: 'IP-TO-MAC TRANSLATION BRIDGE',
      description: 'Operating system cache mapping logical IP addresses to physical MAC hardware destinations.',
      details: 'Command: arp -a. Analysts monitor for ARP poisoning attacks that intercept local network traffic.',
      tags: ['Protocol: ARP', 'Resolution Cache', 'IP to MAC Mapping', 'Spoofing Monitored'],
    },
    {
      id: 'net-gw',
      label: 'Default Gateway Router',
      sub: '10.10.20.1',
      badge: 'PERIMETER BRANCH EXIT',
      description: 'The router interface forwarding packets bound for external networks beyond the local subnet.',
      details: 'Workstation sends all non-local packets to the default gateway MAC address for routing.',
      tags: ['Gateway IP: 10.10.20.1', 'Next Hop Router', 'Subnet Boundary', 'Perimeter Exit'],
    },
  ];

  // 14. M01-U3-C1 Pillar 2: TCP 3-Way Handshake
  const tcpHandshakeNodes: VisualNodeItem[] = [
    {
      id: 'tcp-syn',
      label: 'Step 1: SYN (Synchronize)',
      sub: 'Client -> Server (Seq=100)',
      badge: 'CONNECTION REQUEST',
      description: 'Client workstation sends a SYN packet with an initial sequence number (ISN) requesting to open a socket.',
      details: 'Sent from client ephemeral port (51234) to server listening port (443 HTTPS).',
      tags: ['Packet: SYN', 'Seq: 100', 'State: SYN_SENT', 'Handshake Initiation'],
    },
    {
      id: 'tcp-synack',
      label: 'Step 2: SYN-ACK (Reply)',
      sub: 'Server -> Client (Seq=300, Ack=101)',
      badge: 'SERVER ACKNOWLEDGEMENT',
      description: 'Server acknowledges the client sequence number and replies with its own synchronized sequence number.',
      details: 'Confirms that the destination server is alive, listening, and ready to accept data.',
      tags: ['Packet: SYN-ACK', 'Seq: 300', 'Ack: 101', 'State: SYN_RECEIVED'],
    },
    {
      id: 'tcp-ack',
      label: 'Step 3: ACK (Established)',
      sub: 'Client -> Server (Seq=101, Ack=301)',
      badge: 'SOCKET ESTABLISHED',
      description: 'Client acknowledges the server sequence number. The TCP reliable socket is now fully opened.',
      details: 'Full-duplex reliable communication channel is ready for TLS negotiation and data transfer.',
      tags: ['Packet: ACK', 'Seq: 101', 'Ack: 301', 'State: ESTABLISHED'],
    },
    {
      id: 'tcp-established',
      label: 'Reliable TCP Stream',
      sub: 'Full-Duplex Socket',
      badge: 'ACTIVE DATA CHANNEL',
      description: 'Guarantees reliable, in-order packet delivery with automated retransmissions for dropped packets.',
      details: 'Analysts inspect incomplete handshakes (SYN floods) to detect denial-of-service or port scans.',
      tags: ['Full-Duplex', 'Flow Control', 'Error Checking', 'Reliable Transport'],
    },
  ];

  // 15. M01-U3-C1 Pillar 3: Client-Server Protocol Flow
  const clientServerFlowNodes: VisualNodeItem[] = [
    {
      id: 'cs-dns',
      label: '1. DNS Resolution (Port 53)',
      sub: 'finance.cdac.local -> 10.10.10.5',
      badge: 'NAME DISCOVERY',
      description: 'Workstation queries corporate DNS server to resolve human-readable domain name to an IP address.',
      details: 'Standard UDP 53 query. Triage check: verifies that domain does not resolve to known malicious C2 IP.',
      tags: ['Protocol: DNS (UDP 53)', 'A Record Query', 'Domain Resolution', 'Triage Groundwork'],
    },
    {
      id: 'cs-tls',
      label: '2. TLS Handshake (Port 443)',
      sub: 'Cryptographic Key Exchange',
      badge: 'SECURITY ENCRYPTION',
      description: 'Client and server negotiate cryptographic ciphers and verify digital certificate authenticity.',
      details: 'Ensures data privacy and confirms server identity before financial records are transmitted.',
      tags: ['Protocol: TLS 1.3', 'Cert Validation: CDAC CA', 'Symmetric Key Setup', 'Encrypted Wire'],
    },
    {
      id: 'cs-req',
      label: '3. HTTP GET Request',
      sub: 'GET /api/finance/invoices',
      badge: 'APPLICATION REQUEST',
      description: 'Browser transmits encrypted HTTP request asking for monthly invoice data.',
      details: 'Contains HTTP headers (User-Agent, Cookie, Host). Triage looks for unusual User-Agent strings.',
      tags: ['Method: GET', 'Resource: /api/finance', 'Header: User-Agent', 'Application Layer'],
    },
    {
      id: 'cs-resp',
      label: '4. HTTP 200 OK Response',
      sub: 'JSON Payload Stream',
      badge: 'DATA DELIVERY',
      description: 'Server returns requested data payload along with status code 200 OK.',
      details: 'Data renders in user browser window. Request/response cycle completes safely.',
      tags: ['Status: 200 OK', 'Content-Type: application/json', 'Payload Delivered', 'Session Closed'],
    },
  ];

  // 16. M01-U3-C2 Pillar 1: Workstation Behavioral Baseline
  const workstationBaselineNodes: VisualNodeItem[] = [
    {
      id: 'base-hours',
      label: 'Operating Hours: 09:00 - 17:00',
      sub: 'Standard Business Window',
      badge: 'TEMPORAL BASELINE',
      description: 'Workstation BLR-BR-WS-04 normally operates strictly between 9 AM and 5 PM on weekdays.',
      details: 'Logons or heavy CPU spikes occurring outside these hours represent high-probability anomaly triggers.',
      tags: ['Hours: 09:00 - 17:00 IST', 'Monday - Friday', 'Idle Overnight', 'Expected Profile'],
    },
    {
      id: 'base-apps',
      label: 'Software: Signed Finance Suite',
      sub: 'Excel, Chrome, SAP ERP',
      badge: 'APPLICATION WHITELIST',
      description: 'Documented approved software inventory for branch finance workstations.',
      details: 'All applications are digitally signed by known enterprise vendors. Unsigned executables are flagged.',
      tags: ['Approved Binaries', 'Authenticode Signed', 'Standard ERP', 'No Compilers / Dev Tools'],
    },
    {
      id: 'base-cpu',
      label: 'CPU / RAM: Low Steady Baseline',
      sub: 'CPU < 15% • RAM < 4.5 GB',
      badge: 'RESOURCE CONSUMPTION',
      description: 'Normal background resource usage during everyday financial data entry.',
      details: 'A sudden sustained 95% CPU spike typically signals unauthorized cryptomining or file encryption.',
      tags: ['CPU: 12-18% Baseline', 'RAM: 4.2 GB Average', 'Steady Metric', 'Low Deviation'],
    },
    {
      id: 'base-net',
      label: 'Network: Internal Subnet Only',
      sub: '10.10.0.0/16 Corporate LAN',
      badge: 'NETWORK BOUNDARY',
      description: 'Workstation connects exclusively to corporate domain controllers and internal intranet servers.',
      details: 'Outbound foreign IP connections are routed through corporate proxy; direct external connections are abnormal.',
      tags: ['Destinations: Corporate LAN', 'Proxy Filtered', 'No Direct Foreign Traffic', 'Clean Baseline'],
    },
  ];

  // 17. M01-U3-C2 Pillar 2: Anomaly Triggers & LOLBIN Detection
  const anomalyTriggersNodes: VisualNodeItem[] = [
    {
      id: 'anom-offhours',
      label: 'Trigger 1: Off-Hours Logon',
      sub: 'Sunday at 02:45 AM IST ⚠️',
      badge: 'TEMPORAL ANOMALY ALERT',
      description: 'Interactive console logon detected for account FIN-OPS-01 in the middle of Sunday night.',
      details: 'Sharply contradicts documented 9-to-5 baseline. Triage step: call branch employee to verify presence.',
      tags: ['Logon Time: 02:45 AM', 'Event ID: 4624 (Logon)', 'High Severity Signal', 'Account Compromise Risk'],
    },
    {
      id: 'anom-lolbin',
      label: 'Trigger 2: LOLBIN Exploitation',
      sub: 'certutil.exe -urlcache -split ⚠️',
      badge: 'LIVING OFF THE LAND',
      description: 'Adversary abusing legitimate Microsoft certificate utility to download remote executable payload.',
      details: 'Bypasses standard signature antivirus because certutil.exe is a signed Microsoft utility.',
      tags: ['Tool: certutil.exe', 'Args: -urlcache -split', 'Payload Inbound', 'LOLBIN Technique T1105'],
    },
    {
      id: 'anom-spike',
      label: 'Trigger 3: Outbound Bandwidth Spike',
      sub: '450 MB Sent to External IP ⚠️',
      badge: 'DATA EXFILTRATION SIGNAL',
      description: 'Workstation transmits 450 MB of compressed zip archives to foreign IP address.',
      details: 'Normal baseline outbound traffic is under 2 MB. Massive deviation indicates active data exfiltration.',
      tags: ['Outbound: 450 MB', 'Destination: Unknown ASN', 'Exfiltration Risk', 'Critical Alarm'],
    },
    {
      id: 'anom-beacon',
      label: 'Trigger 4: Periodic C2 Beacon',
      sub: 'Heartbeat every 60s ⚠️',
      badge: 'C2 IMPLANT DETECTED',
      description: 'Workstation initiates outbound HTTP connection to foreign IP at exact mathematical 60-second intervals.',
      details: 'Automated beaconing behavior typical of Cobalt Strike or Metasploit command-and-control implants.',
      tags: ['Interval: 60s ± 0s', 'Beaconing Pattern', 'Malware Implant', 'Immediate Action Required'],
    },
  ];

  // 18. M01-U3-C2 Pillar 3: L1 Triage Decision Matrix
  const triageMatrixNodes: VisualNodeItem[] = [
    {
      id: 'tri-alert',
      label: '1. SIEM Alert Ingestion',
      sub: 'Suspicious LOLBIN on BLR-BR-WS-04',
      badge: 'ALERT INTAKE',
      description: 'Detection engine triggers a high-fidelity alert from correlated Event 4688 and outbound socket logs.',
      details: 'SLA timer starts: L1 analyst has 15 minutes to review evidence, triage, and decide action.',
      tags: ['Alert: High Severity', 'Host: BLR-BR-WS-04', 'User: FIN-OPS-01', 'SLA: 15 Minutes'],
    },
    {
      id: 'tri-check',
      label: '2. 3-Point Evidence Triage',
      sub: 'User • Hash • Parentage',
      badge: 'TRIAGE TRIANGULATION',
      description: 'Analyst verifies: 1. Did employee authorize this? 2. Is binary hash malicious? 3. Who is parent process?',
      details: 'Triage reveals employee did not work at 2:45 AM; parent process cmd.exe spawned by unknown task.',
      tags: ['Triangulation Check', 'Hash Reputation: Unknown', 'Parent: cmd.exe', 'User Denied Action'],
    },
    {
      id: 'tri-fp',
      label: 'Outcome A: False Positive',
      sub: 'Authorized Maintenance Batch',
      badge: 'BENIGN RESOLUTION',
      description: 'If verified as pre-approved IT department software deployment, alert is closed with clear notes.',
      details: 'Documentation rule: Never close an alert without recording ticket number and verifying admin authority.',
      tags: ['Resolution: Benign FP', 'Documented in SIEM', 'Audit Trail Complete', 'Ticket Closed'],
    },
    {
      id: 'tri-tp-isolate',
      label: 'Outcome B: True Positive (ISOLATE)',
      sub: 'Active Intrusion Confirmed 🔒',
      badge: 'CONTAINMENT ACTION',
      description: 'Confirmed unauthorized intrusion! L1 analyst initiates immediate host network isolation.',
      details: 'One-click EDR command severs all network traffic except analyst management channel. Escalates to Tier 2.',
      tags: ['Action: Host Isolation', 'Blast Radius Contained', 'Memory Dump Captured', 'Escalated to Tier 2'],
    },
  ];

  const m02Titles: Record<string, string> = {
    'm02-subnet-calculator': 'Subnet Bit Slicing & Boundary Analysis',
    'm02-default-gateway': 'Default Gateway & Perimeter Routing',
    'm02-nat-translation': 'NAT Port Address Translation (PAT)',
    'm02-access-point': 'Wireless Access Points & Association',
    'm02-switch-cam': 'Switch MAC Address Table (CAM)',
    'm02-router-forwarding': 'Router Forwarding Table & Next-Hop',
    'm02-dhcp-dora': 'DHCP 4-Step DORA Lease Sequence',
    'm02-dns-resolution': 'Hierarchical DNS Name Resolution Flow',
    'm02-dns-tunneling': 'DNS Tunneling & Base64 Payload Detection',
    'm02-port-doors': 'Transport Service Doors & Standard Ports',
    'm02-tcp-state': 'TCP State Machine & Handshake Triage',
    'm02-udp-vs-tcp': 'Transport Showdown: Reliable TCP vs Low-Latency UDP',
    'm02-small-branch-map': 'Small Branch Office Network Topology Map',
    'm02-firewall-rules': 'Perimeter Firewall Rule Inspection (Top-Down)',
    'm02-policy-vs-app': 'Layer 4 Port Filter vs Layer 7 App-ID Triangulation',
    'm02-vlan-segmentation': 'VLAN Broadcast Domain Segmentation',
    'm02-multi-switch-trunk': 'Multi-Switch 802.1Q Trunk Tagging Pipeline',
    'm02-vlan-boundary-audit': 'Cross-VLAN Lateral Movement Containment Audit',
  };

  const m03Titles: Record<string, string> = {
    'm03-asset-inventory': 'Asset Classification & The Crown Jewels',
    'm03-threat-vuln-matrix': 'Threat Actors vs System Vulnerabilities',
    'm03-person-vs-credential': 'The Human Person vs Digital Credential',
    'm03-cia-triad': 'The CIA Triad: Confidentiality, Integrity & Availability',
    'm03-risk-matrix': 'The 5x5 Qualitative Risk Matrix & Likelihood',
    'm03-business-impact-gauge': 'Business Context Triage Triangulation',
    'm03-phishing-anatomy': 'Anatomy of a Deceptive Phishing Lure',
    'm03-credential-attack-sim': 'Credential Attacks: Brute Force, Spraying & Stuffing',
    'm03-mfa-fatigue-radar': 'MFA Push Fatigue & Number Matching Challenge',
    'm03-malware-taxonomy': 'Malware Taxonomy: Ransomware, Trojans & Stealers',
    'm03-insider-threat-indicators': 'Insider Threat Triage: Fact vs Presumption',
    'm03-network-recon-scanner': 'Network Reconnaissance & Port Sweep Detection',
    'm03-defense-triad': 'Defensive Controls: Prevention, Detection & Response',
    'm03-incident-lifecycle': 'Incident Response Lifecycle: NIST SP 800-61',
    'm03-alert-containment': 'Active Incident Containment Cockpit',
    'm03-defense-in-depth-castle': 'Defense-in-Depth: Concentric Protective Rings',
    'm03-least-privilege-blast-radius': 'Least Privilege & Blast Radius Containment',
    'm03-zero-trust-verification': 'Zero Trust: Explicit & Continuous Verification',
  };

  const m04Titles: Record<string, string> = {
    'm04-soc-hierarchy': 'SOC Tier Hierarchy & Analyst Roles',
    'm04-escalation-triggers': 'Escalation Boundaries & Trigger Thresholds',
    'm04-shift-wheel': '24/7/365 Shift Rotation & Handover Schedule',
    'm04-queue-ingestion': 'Alert Queue Ingestion & Priority Tiers',
    'm04-ticket-lifecycle': 'Case Ticket Lifecycle & Assignment State',
    'm04-sla-monitor': 'SLA Timers: MTTD, MTTA & MTTR',
    'm04-event-vs-alert': 'Telemetry Funnel: Raw Event vs Correlated Alert',
    'm04-rule-logic-engine': 'Correlation Rule Logic & Trigger Conditions',
    'm04-verdict-trap': 'The Premature Verdict Trap & Evidence Anchor',
    'm04-taxonomy-quad': 'Incident Taxonomy: Event, Alert, Case & Incident',
    'm04-case-aggregation': 'Case Aggregation & Multi-Alert Correlation',
    'm04-evidence-vault': 'Evidence Vault & Forensic Artifact Preservation',
    'm04-five-ws-triage': 'The 5 Ws Triage Framework (Who, What, When, Where, Why)',
    'm04-aggregation-counter': 'Aggregation Counter & Noise Suppression',
    'm04-forensic-honesty': 'Forensic Honesty: Verified Facts vs Presumptions',
    'm04-disposition-tree': 'Disposition Tree: TP Malicious, TP Benign, FP & Undetermined',
    'm04-handover-note-anatomy': 'Anatomy of an Actionable Shift Handover Note',
    'm04-evidence-package': 'Formal Escalation Package & Chain of Custody',
  };

  const m05Titles: Record<string, string> = {
    'm05-siem-capabilities': 'SIEM Core Capabilities & Centralization',
    'm05-visibility-gaps': 'The Visibility Gap & Uncollected Sources',
    'm05-scope-doctrine': 'Scope-Bounded Search Doctrine',
    'm05-source-ecosystem': 'Multi-Source Telemetry Ecosystem',
    'm05-ingestion-pipeline': 'The 6-Stage Ingestion Pipeline',
    'm05-source-health': 'Log Shipper Health & Ingestion Lag Monitor',
    'm05-field-schema': 'Structured Log Dissector & ECS Normalization',
    'm05-time-window': 'Time Window Selector & UTC Synchronization',
    'm05-zero-results-check': 'The 4-Point Zero-Result Triage Checklist',
    'm05-boolean-logic': 'Boolean Search Logic: AND, OR, NOT & Grouping',
    'm05-query-dialects': 'Query Dialects: Kibana KQL vs Kusto KQL vs SPL',
    'm05-query-dossier': 'Reproducible Query Dossier & NOT Danger',
    'm05-correlation-engine': 'Multi-Event Correlation & Sliding Windows',
    'm05-rule-dissector': 'Detection Rule Anatomy & Logic Expression',
    'm05-threshold-tuning': 'Detection Threshold Tuning Cockpit',
    'm05-source-mosaic': 'The 4-Pane Multi-Source Evidence Mosaic',
    'm05-data-minimization': 'Data Minimization & Forensic Privacy Filter',
    'm05-evidence-packet': 'Reproducible Evidence Packet & Supervisory Handoff',
  };

  const m06Titles: Record<string, string> = {
    'm06-literal-event': 'Literal Event Deconstruction & Objective Reporting',
    'm06-timestamp-triad': 'The Tri-Timestamp Continuum (Event vs Ingest vs Alert)',
    'm06-outcome-precision': 'Outcome Precision: Failed Operation != Compromise',
    'm06-parsing-pipeline': 'Raw-to-Structured Parsing Pipeline (Grok Regex)',
    'm06-field-mapping': 'Cross-Vendor Schema Normalization & ECS Align',
    'm06-raw-verification': 'Parser Verification Against Raw Ground Truth',
    'm06-utc-timeline': 'Chronological Event Ordering & UTC Normalization',
    'm06-midnight-rollover': 'Midnight Date Boundary Rollover (IST vs UTC)',
    'm06-unknown-offset': 'Documenting Unknown Offset & Time Uncertainty',
    'm06-stable-identifiers': 'Stable Hardware MAC/SID vs Transient IP Correlation',
    'm06-dhcp-lease-window': 'DHCP Lease Windows & Dynamic Host Reassignment',
    'm06-coincidence-triage': 'Temporal Coincidence vs Corroborated Connection',
    'm06-corroboration-engine': 'Multi-Source Corroboration Matrix & NetFlow',
    'm06-blackout-gap': '30-Minute Endpoint Blackout Gap & Triangulation',
    'm06-echo-chamber': 'The Echo Chamber Trap & Single-Source Loop',
    'm06-two-column-ledger': 'Two-Column Ledger: Observed Facts vs Hypotheses',
    'm06-presumption-trap': 'The Premature Presumption Trap: 3 Fails + 1 Success',
    'm06-uncertainty-note': 'Actionable Uncertainty Note & Traceable Dossier',
  };

  const m07Titles: Record<string, string> = {
    'm07-channel-providers': 'Windows Log Channels & Provider Architecture',
    'm07-eventid-signposts': 'Event ID Signpost Doctrine & Context HUD',
    'm07-provider-integrity': 'Provider Integrity & Homograph Number Traps',
    'm07-logon-matrix': 'Logon Type Matrix: Interactive, Network & RDP',
    'm07-privilege-context': 'Event 4672 Privileged Activity & Admin Context',
    'm07-identity-doctrine': 'The Account Owner vs Person Identity Doctrine',
    'm07-linux-log-geography': 'Linux Distribution Log Geography & Paths',
    'm07-ssh-stream-triage': 'SSH Authentication Stream & Socket Dissection',
    'm07-ssh-brute-force-doctrine': 'The SSH Brute-Force Triage & Pivot Doctrine',
    'm07-systemd-services': 'Linux Service Architecture & Systemd Daemons',
    'm07-sudo-audit-trail': 'Sudo Audit Trail Dissection & Change Controls',
    'm07-command-visibility-boundary': 'Command Auditing Visibility & Kernel Auditd',
    'm07-workstation-baseline-profile': 'Workstation Baseline Behavioral Profile HUD',
    'm07-event-7045-service': 'Windows System Event 7045 Service Installation',
    'm07-context-triage-decision': 'Context-Driven Triage Decision & Equilibrium',
    'm07-host-timeline-integration': 'Workstation Host Timeline Evidence Integration',
    'm07-communication-playbook': 'The SOC Communication Playbook & Anti-Tipping-Off',
    'm07-scoped-host-summary': 'Scoped Host Summary Dossier & Supervisory Seal',
  };

  const m08Titles: Record<string, string> = {
    'm08-packet-flow-pcap': 'Packets, Flows & PCAP Demarcation',
    'm08-capture-scope': 'Capture Scope & Sensor Tap Geometry',
    'm08-segment-visibility': 'Segment Visibility & Quiet Assumption Trap',
    'm08-tls-metadata-boundary': 'TLS/HTTPS Encryption Boundary',
    'm08-dns-telemetry-correlation': 'DNS Telemetry & Resolution Flow',
    'm08-payload-assumption-trap': 'Payload Assumption vs Metadata Proof',
    'm08-wireshark-anatomy': 'Wireshark Tri-Pane Architecture & Inspection',
    'm08-display-vs-capture-filter': 'Display Filter vs Capture Filter Mechanics',
    'm08-filter-reproducibility': 'Reproducible Filter Notation & Packet Indexing',
    'm08-port-scan-recon': 'Port Scanning & Sweep Reconnaissance',
    'm08-periodic-beacon-analysis': 'Periodic Beacon & Timing Interval Analysis',
    'm08-timing-attribution-doctrine': 'Timing Attribution vs Intent Restraint',
    'm08-nat-pat-translation': 'NAT/PAT Translation & Boundary Perspective',
    'm08-proxy-header-chain': 'Forward Proxy & X-Forwarded-For Telemetry',
    'm08-attribution-resolution': 'Attribution Resolution & Missing Translation Gaps',
    'm08-pcap-object-extraction': 'Safe PCAP Object Handling & Carving Protocol',
    'm08-concise-evidence-distillation': 'Concise Evidence Distillation vs Packet Dump',
    'm08-network-dossier-signoff': 'Network Evidence Dossier & Case Handoff',
  };

  const m09Titles: Record<string, string> = {
    'm09-edr-device-health': 'EDR Device Inventory & Health Status',
    'm09-stale-sensor-trap': 'The Stale Sensor Visibility Trap',
    'm09-telemetry-funnel': 'Continuous Endpoint Telemetry Streams',
    'm09-av-vs-edr-architecture': 'Traditional Antivirus vs Modern EDR',
    'm09-capability-overlap': 'Prevention vs Detection vs Response Triad',
    'm09-coverage-limits': 'Universal Detection Fallacy & EDR Blind Spots',
    'm09-process-tree-lineage': 'Process Tree Lineage & LOLBIN Execution',
    'm09-command-line-args': 'Command-Line Inspection & LOLBIN Obfuscation',
    'm09-file-identity-hashes': 'Cryptographic Hashes vs File Names',
    'm09-dual-timestamp-timeline': 'Activity Time vs Ingestion Time & Console Lag',
    'm09-temporal-fallacy': 'The Post Hoc Ergo Propter Hoc Fallacy',
    'm09-utc-multi-source-align': 'Unified Multi-Source Case Timeline',
    'm09-indicator-reputation-triad': 'Indicator Enrichment: Hash, IP, Domain',
    'm09-unknown-reputation-trap': 'The "Unknown" Reputation Fallacy',
    'm09-playbook-boundary-restraint': 'Tiered Escalation & Restraint Doctrine',
    'm09-isolation-gate-checklist': 'Pre-Isolation Verification Checklist',
    'm09-simulated-containment': 'Simulated Host Isolation Cockpit',
    'm09-containment-verification-audit': 'Containment Verification & Audit Dossier',
  };

  const m10Titles: Record<string, string> = {
    'm10-workbench-ecosystem': 'Cross-Workbench Ecosystem: Case #2026-881 Hub',
    'm10-xdr-cross-domain': 'Cross-Domain XDR Correlation vs Hype Reality',
    'm10-case-management-custody': 'Case Management & Contemporaneous Chain of Custody',
    'm10-soar-orchestration-loop': 'SOAR Playbook Loop & Human-In-The-Loop Review Gate',
    'm10-capability-vs-authority': 'Technical Capability vs Operational Authority',
    'm10-safe-automation-guardrails': 'Safe Automation Guardrails: Exclusions & Circuit Breakers',
    'm10-ot-vs-it-fundamentals': 'Industrial OT vs Enterprise IT: Kinetic Safety Priority',
    'm10-ics-components-loop': 'ICS Physical Closed-Loop Control Architecture',
    'm10-reboot-peril-safety': 'Physical Process Safety vs Dangerous IT Reboots',
    'm10-purdue-model-layers': 'Purdue Enterprise Reference Architecture (Levels 0-5)',
    'm10-segmentation-dmz-boundary': 'Industrial DMZ & Data Historian Outward Mirroring',
    'm10-passive-monitoring-doctrine': 'Passive Optical Hardware TAPs vs Destructive Active Scans',
    'm10-three-response-actions': 'Three Core Response Levers: Target, Benefit, Side Effects',
    'm10-side-effects-business-impact': 'Unintended Side Effects & Critical Business Impact',
    'm10-reversibility-vs-judgment': 'The Reversibility Fallacy vs Measured Human Judgment',
    'm10-read-only-boundary': 'Encountering OT Assets: Read-Only Safety Barrier',
    'm10-anti-manufactured-link': 'Disciplined Restraint: Anti-Manufactured Correlation',
    'm10-ot-specialist-escalation': 'OT Specialist Escalation Dossier & Supervisory Seal',
  };

  const m11Titles: Record<string, string> = {
    'm11-signin-telemetry-stream': 'Sign-In Telemetry Stream & Contextual Fields',
    'm11-mfa-trust-fallacy': 'MFA Factor Evaluation vs The "Successful MFA Trust Fallacy"',
    'm11-impossible-travel-reality': 'IP Geolocation Reality vs The "Impossible Travel Fallacy"',
    'm11-privilege-blast-radius': 'Standard User vs Privileged Admin Roles & Blast Radius',
    'm11-impact-based-triage': 'Impact-Based Triage vs Account Title Bias',
    'm11-identity-directory-truth': 'Active Directory Reality vs Verified Identity Owners',
    'm11-email-artifact-anatomy': 'Reported Message Artifact Anatomy (MSG-2026-904)',
    'm11-misleading-links-traps': 'Misleading Hyperlinks & Sneaky Reply-To Traps',
    'm11-spf-dkim-dmarc-engine': 'SPF, DKIM, and DMARC Verification Breakdown',
    'm11-quarantine-defanged-sandbox': 'Preserved Message Quarantine & Non-Clickable Sandboxing',
    'm11-data-leakage-prevention': 'Data Leakage Hazard: Public Lookup Violation',
    'm11-attachment-hash-escalation': 'Sanitized Artifact Inspection & L1-to-L2 Malware Escalation',
    'm11-threat-intel-pyramid': 'Threat Intelligence IOC Taxonomy (Pyramid of Pain)',
    'm11-ioc-provenance-freshness': 'IOC Provenance, Source Reliability & Freshness Half-Life',
    'm11-sourced-intelligence-note': 'Sourced Intelligence Note Standards',
    'm11-multi-source-correlation': 'Multi-Source Correlation: Verified Links vs Hypotheses',
    'm11-shared-infrastructure-trap': 'Shared Infrastructure & The IP Attribution Trap',
    'm11-intel-dossier-signoff': 'The "No Reputation Hit ≠ Benign" Doctrine & Module 11 Sign-Off',
  };

  const m12Titles: Record<string, string> = {
    'm12-playbook-anatomy-pipeline': 'Playbook Anatomy: Trigger, Action, Condition, Input & Output',
    'm12-input-validation-guard': 'Input Validation Guard vs Automating an Assumption',
    'm12-conditional-branching-logic': 'Conditional Branching: Safe Multi-Path Decision Trees',
    'm12-automated-enrichment-loop': 'Parallel API Enrichment: Threat Intel, LDAP & EDR',
    'm12-case-notification-docket': 'Draft Case Docket #2026-881 & The "No Auto-Closure" Doctrine',
    'm12-notification-evidence-standards': '4-Pillar Notification Standard: Provenance, UTC, Finding & Limits',
    'm12-human-approval-gate': 'Human-in-the-Loop Gate: Read-Only vs Disruptive Actions',
    'm12-role-authorization-scope': 'Role Authorization Scope & Specific Target Binding',
    'm12-timeout-silence-doctrine': 'The Timeout Doctrine: "Silence Is NOT Authorization"',
    'm12-connector-failure-handling': 'Connector Failure Handling: "No Adverse Result ≠ No Result Available"',
    'm12-bounded-retries-circuit': 'Bounded Retries: Exponential Backoff & Circuit Breakers',
    'm12-playbook-audit-trail': 'Playbook Audit Trail: Step-by-Step Telemetry & JSON Records',
    'm12-meaningful-human-review': 'The Meaningful Human Review Quad (Target + Evidence + Approver + Reversal)',
    'm12-target-mismatch-restraint': 'Target Mismatch Detection & Rewarding Analyst Restraint',
    'm12-reversal-plan-architecture': 'Reversal Plan Architecture & The Reversibility Fallacy',
    'm12-never-automate-redlines': 'Absolute Red Lines: What Must Never Run Automatically',
    'm12-deduplication-idempotency': 'Alert Deduplication, Idempotency Caching & Storm Mitigation',
    'm12-master-soar-signoff': '5-Stage SOAR Test Pack & Mentor Karthik\'s Master Seal',
  };

  const m13Titles: Record<string, string> = {
    'm13-ttp-triad-hierarchy': 'The TTP Triad Hierarchy (Tactic vs Technique vs Procedure)',
    'm13-matrix-navigation-grid': 'MITRE ATT&CK Enterprise Matrix Navigator & L1 Focus',
    'm13-shared-vocabulary-engine': 'Vendor De-Jargonizer: Normalizing Alarms to MITRE ATT&CK',
    'm13-descriptive-not-malice': 'ATT&CK Is Descriptive, Not Malice: Context Over Technique',
    'm13-observable-technique-pipeline': 'Raw Observable to ATT&CK Technique Pipeline',
    'm13-dual-use-lolbins-paradox': 'The Dual-Use LOLBin Paradox (Living Off The Land Binaries)',
    'm13-credential-access-matrix': 'Credential Access Mechanics: LSASS Dumps & Password Sprays',
    'm13-discovery-ttps-recon': 'Discovery TTPs: Burst Pattern Recon & Enumeration HUD',
    'm13-discovery-credential-bridge': 'The Discovery-to-Credential Lateral Movement Bridge',
    'm13-technique-specificity-depth': 'Technique Specificity Depth: Parent vs Sub-Technique Precision',
    'm13-plausible-vs-speculative': 'Plausible Technique Mapping vs APT Speculation Traps',
    'm13-evidence-threshold-matrix': '4-Gate Evidence Threshold Matrix for ATT&CK Tagging',
    'm13-evidentiary-anchors-dossier': 'Evidentiary Anchors Dossier: Sysmon Command-Line Proof',
    'm13-uncertainty-confidence-levels': 'Handling Uncertainty: Confirmed vs Suspected vs Hypothesized',
    'm13-audit-proof-triage-docket': 'Audit-Proof Case Docket: Standardized ATT&CK Triage Docket',
    'm13-kill-chain-leap-fallacy': 'The Kill Chain Leap Fallacy: 1 Verified Action ≠ Full APT Campaign',
    'm13-solid-vs-dotted-links': 'Solid Verified Facts vs Dotted Hypotheses Timeline',
    'm13-master-attack-signoff': 'Master ATT&CK Sign-Off & Mentor Ananya\'s Supervisory Seal',
  };

  const m14Titles: Record<string, string> = {
    'm14-nist-sans-lifecycle': 'NIST SP 800-61r2 / SANS Incident Response Lifecycle Engine',
    'm14-detection-analysis-gates': '4-Gate Detection & Analysis Pipeline (Ingest, 5Ws, FP, Contain)',
    'm14-preparation-foundations': 'Preparation Foundations: NTP Clock Sync, Sensor Health & Offline Roster',
    'm14-l1-l2-l3-boundaries': 'SOC Tier Boundaries: L1 Triage vs L2 Forensics vs L3 Threat Hunting',
    'm14-escalation-triggers-matrix': 'Immediate Escalation Triggers Matrix (Tier-0, LSASS, Outbreak)',
    'm14-evidence-preservation-doctrine': 'Evidence Preservation: Volatile RAM Doctrine vs The Reboot Trap',
    'm14-utc-chronology-timeline': 'Normalized UTC Attack Timeline (Zeek Egress -> Sysmon -> AD Pivot)',
    'm14-five-ws-case-notes': 'The 5 Ws Documentation Console (Who, What, When, Where, Why)',
    'm14-facts-vs-inferences': 'Fact vs Inference Balance Scale (Verified Logs vs Labeled Leads)',
    'm14-severity-matrix-scoring': 'Severity Matrix Scoring (SEV 1 - 4) with Live SLA Clocks',
    'm14-confidence-scoring-rubric': 'Multi-Sensor Confidence Scoring Rubric (30% -> 65% -> 95%)',
    'm14-case-dispositions-quad': '4 Standard Case Dispositions (TP Malicious, TP Benign, FP, Unknown)',
    'm14-escalation-chain-roles': 'Formal Escalation Chain & Roles (Priya -> Ananya -> Meera -> CISO)',
    'm14-case-ownership-transfer': 'Active Case Ownership Transfer (Positive Acknowledgement Protocol)',
    'm14-out-of-band-comms': 'Out-of-Band Incident Communications (Stealth Protocol)',
    'm14-shift-handover-briefing': 'Shift Handover Briefing HUD (Active Cases, Watchlist, Windows)',
    'm14-post-incident-lessons': 'Blameless Post-Mortem Feedback Loop & Rule Engineering',
    'm14-master-soc-capstone-signoff': 'Master SOC Analyst Graduation: Dual Mentor Ananya & Meera Accreditation',
  };

  // Active node determination helper
  const getActiveNode = (): VisualNodeItem => {
    // Check Module 14 map first
    if (module14NodesMap[currentStyle]) {
      const currentList = module14NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 13 map
    if (module13NodesMap[currentStyle]) {
      const currentList = module13NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 12 map
    if (module12NodesMap[currentStyle]) {
      const currentList = module12NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 11 map
    if (module11NodesMap[currentStyle]) {
      const currentList = module11NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 10 map
    if (module10NodesMap[currentStyle]) {
      const currentList = module10NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 09 map
    if (module09NodesMap[currentStyle]) {
      const currentList = module09NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 08 map
    if (module08NodesMap[currentStyle]) {
      const currentList = module08NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 07 map
    if (module07NodesMap[currentStyle]) {
      const currentList = module07NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 06 map
    if (module06NodesMap[currentStyle]) {
      const currentList = module06NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 05 map
    if (module05NodesMap[currentStyle]) {
      const currentList = module05NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 04 map
    if (module04NodesMap[currentStyle]) {
      const currentList = module04NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 03 map
    if (module03NodesMap[currentStyle]) {
      const currentList = module03NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 02 map
    if (module02NodesMap[currentStyle]) {
      const currentList = module02NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    // Check Module 00 map
    if (module00NodesMap[currentStyle]) {
      const currentList = module00NodesMap[currentStyle];
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }

    const listMap: Record<string, VisualNodeItem[]> = {
      'm01-hardware-bus': hardwareBusNodes,
      'm01-os-kernel': osKernelNodes,
      'm01-account-privilege': accountPrivilegeNodes,
      'm01-filesystem-tree': filesystemNodes,
      'm01-process-lifecycle': processLifecycleNodes,
      'm01-memory-isolation': memoryIsolationNodes,
      'm01-process-triage-hud': processTriageNodes,
      'm01-socket-diagnostics': socketDiagnosticsNodes,
      'm01-log-anatomy': logAnatomyNodes,
      'm01-log-vault': logVaultNodes,
      'm01-log-forwarding': logForwardingNodes,
      'm01-mac-ip-addressing': macIpAddressingNodes,
      'm01-tcp-handshake': tcpHandshakeNodes,
      'm01-client-server-flow': clientServerFlowNodes,
      'm01-workstation-baseline': workstationBaselineNodes,
      'm01-anomaly-triggers': anomalyTriggersNodes,
      'm01-triage-matrix': triageMatrixNodes,
    };

    const currentList = listMap[currentStyle];
    if (currentList) {
      return currentList.find((n) => n.id === selectedNodeId) || currentList[0];
    }
    return hardwareBusNodes[0];
  };

  const activeNode = getActiveNode();

  return (
    <div className="visual-engine-text visual-canvas-container rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#070e22] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-sky-500/35 shadow-xl dark:shadow-[0_0_30px_rgba(56,189,248,0.12)] space-y-4 flex flex-col justify-between w-full h-full min-h-[520px]">
      {/* =======================================================================
          TOP BAR & TOPIC CONTEXT
      ======================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40 text-[10px] font-mono font-bold px-2 py-0.5">
            {currentStyle.startsWith('m14-')
              ? 'MODULE 14 • VISUAL STORY'
              : currentStyle.startsWith('m13-')
              ? 'MODULE 13 • VISUAL STORY'
              : currentStyle.startsWith('m12-')
              ? 'MODULE 12 • VISUAL STORY'
              : currentStyle.startsWith('m11-')
              ? 'MODULE 11 • VISUAL STORY'
              : currentStyle.startsWith('m10-')
              ? 'MODULE 10 • VISUAL STORY'
              : currentStyle.startsWith('m09-')
              ? 'MODULE 09 • VISUAL STORY'
              : currentStyle.startsWith('m08-')
              ? 'MODULE 08 • VISUAL STORY'
              : currentStyle.startsWith('m07-')
              ? 'MODULE 07 • VISUAL STORY'
              : currentStyle.startsWith('m06-')
              ? 'MODULE 06 • VISUAL STORY'
              : currentStyle.startsWith('m05-')
              ? 'MODULE 05 • VISUAL STORY'
              : currentStyle.startsWith('m04-')
              ? 'MODULE 04 • VISUAL STORY'
              : currentStyle.startsWith('m03-')
              ? 'MODULE 03 • VISUAL STORY'
              : currentStyle.startsWith('m02-')
              ? 'MODULE 02 • VISUAL STORY'
              : 'MODULE 01 • VISUAL STORY'}
          </Badge>
          <span className="font-bold text-xs sm:text-sm font-mono text-slate-900 dark:text-white tracking-wider uppercase">
            {currentStyle.startsWith('m14-') && (m14Titles[currentStyle] || 'Incident Response & SOC Documentation')}
            {currentStyle.startsWith('m13-') && (m13Titles[currentStyle] || 'MITRE ATT&CK for L1 Analysts')}
            {currentStyle.startsWith('m12-') && (m12Titles[currentStyle] || 'SOAR & Basic SOC Automation')}
            {currentStyle.startsWith('m11-') && (m11Titles[currentStyle] || 'Identity, Email & Threat Intelligence')}
            {currentStyle.startsWith('m10-') && (m10Titles[currentStyle] || 'Security Ecosystem: XDR, Response Tools & OT/ICS')}
            {currentStyle.startsWith('m09-') && (m09Titles[currentStyle] || 'Endpoint Detection & Response')}
            {currentStyle.startsWith('m08-') && (m08Titles[currentStyle] || 'Network Security Monitoring')}
            {currentStyle.startsWith('m07-') && (m07Titles[currentStyle] || 'Windows & Linux Host Monitoring')}
            {currentStyle.startsWith('m06-') && (m06Titles[currentStyle] || 'Log & Event Analysis')}
            {currentStyle.startsWith('m05-') && (m05Titles[currentStyle] || 'SIEM Fundamentals & Search')}
            {currentStyle.startsWith('m04-') && (m04Titles[currentStyle] || 'SOC Operations & Alert Triage')}
            {currentStyle.startsWith('m03-') && (m03Titles[currentStyle] || 'Cybersecurity Fundamentals')}
            {currentStyle.startsWith('m02-') && (m02Titles[currentStyle] || 'Networking Architecture')}
            {currentStyle === 'm01-hardware-bus' && 'Workstation Hardware & Data Bus'}
            {currentStyle === 'm01-os-kernel' && 'OS Coordinator & Kernel Bridge'}
            {currentStyle === 'm01-account-privilege' && 'User Accounts & Least Privilege Barrier'}
            {currentStyle === 'm01-filesystem-tree' && 'Filesystem Hierarchy & Protected Paths'}
            {currentStyle === 'm01-process-lifecycle' && 'Process PID Lifecycle & Parent Tree'}
            {currentStyle === 'm01-memory-isolation' && 'Virtual Memory & Page Space Isolation'}
            {currentStyle === 'm01-terminal-cli' && 'Interactive Command-Line Terminal'}
            {currentStyle === 'm01-process-triage-hud' && 'Live Process Triage & Task Auditing'}
            {currentStyle === 'm01-socket-diagnostics' && 'Network Socket Mapping & Ports'}
            {currentStyle === 'm01-log-anatomy' && 'Security Log Event Dissector'}
            {currentStyle === 'm01-log-vault' && 'Windows Event Log Vault (winevt)'}
            {currentStyle === 'm01-log-forwarding' && 'Centralized Log Forwarding Pipeline'}
            {currentStyle === 'm01-mac-ip-addressing' && 'Physical MAC vs Logical IP Routing'}
            {currentStyle === 'm01-tcp-handshake' && 'TCP 3-Way Handshake & Port Sockets'}
            {currentStyle === 'm01-client-server-flow' && 'Client-Server Protocol Flow'}
            {currentStyle === 'm01-workstation-baseline' && 'Workstation Baseline Behavior HUD'}
            {currentStyle === 'm01-anomaly-triggers' && 'Anomaly Triggers & Threat Radar'}
            {currentStyle === 'm01-triage-matrix' && 'L1 Triage Decision Matrix & Containment'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentFormat && (
            <Badge
              variant="outline"
              className="border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300 font-mono text-[9px] font-bold px-2 py-0.5"
            >
              FORMAT: {currentFormat.toUpperCase()}
            </Badge>
          )}
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            CLICK ELEMENT TO INSPECT
          </span>
        </div>
      </div>

      {/* Visual Format Active Sub-Mode Banners */}
      {currentFormat === 'flowchart' && (
        <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" />
            DECISION FLOWCHART MODE
          </span>
          <span className="text-[10px] opacity-80">Incident Branching &amp; Sequential Logic Active</span>
        </div>
      )}
      {currentFormat === 'packet-flow' && (
        <div className="px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-mono flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            PACKET FLOW DISSECTOR MODE
          </span>
          <span className="text-[10px] opacity-80">Network Protocol Header &amp; Frame Sequence Active</span>
        </div>
      )}
      {currentFormat === 'interface-tour' && (
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5" />
            CONSOLE INTERFACE TOUR MODE
          </span>
          <span className="text-[10px] opacity-80">SIEM / EDR Telemetry HUD Inspection Active</span>
        </div>
      )}
      {currentFormat === 'diagram' && (
        <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-mono flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            ARCHITECTURE TOPOLOGY DIAGRAM MODE
          </span>
          <span className="text-[10px] opacity-80">Network Perimeter &amp; Sensor Boundaries Active</span>
        </div>
      )}

      {/* =======================================================================
          CENTER SCALED DEDICATED GRAPHIC CONTAINER (Spacious, Dynamic per Scenario)
      ======================================================================= */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#091124]/90 border border-slate-200 dark:border-slate-800/80 relative overflow-hidden min-h-[460px] sm:min-h-[500px] w-full shadow-inner">
        {/* -------------------------------------------------------------------
            1. STYLE: m01-hardware-bus (CPU, RAM, SSD, I/O Motherboard Bus)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-hardware-bus' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              <defs>
                <filter id="hwGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="250" y="30" width="40" height="280" rx="8" fill="#040d21" stroke="#1e293b" strokeWidth="2" />
              <rect x="50" y="150" width="440" height="40" rx="8" fill="#040d21" stroke="#1e293b" strokeWidth="2" />

              <line x1="270" y1="30" x2="270" y2="310" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="8 8" />
              <line x1="50" y1="170" x2="490" y2="170" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="8 8" />

              {/* Moving data packets */}
              {(() => {
                const pos = (animStep % 100) / 100;
                return (
                  <>
                    <circle cx={50 + 440 * pos} cy="170" r="5" fill="#38bdf8" filter="url(#hwGlow)" />
                    <circle cx="270" cy={30 + 280 * pos} r="5" fill="#38bdf8" filter="url(#hwGlow)" />
                  </>
                );
              })()}

              {/* CPU */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(hardwareBusNodes[0])}>
                <rect x="40" y="35" width="200" height="96" rx="14" fill={selectedNodeId === 'hw-cpu' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'hw-cpu' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'hw-cpu' ? '2.5' : '1.5'} />
                <circle cx="78" cy="83" r="26" fill="#0284c7" />
                <text x="78" y="90" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">⚡</text>
                <text x="116" y="68" fill="#ffffff" fontSize="15" fontWeight="900">CPU (Processor)</text>
                <text x="116" y="88" fill="#38bdf8" fontSize="12" fontWeight="700">Calculations &amp; Logic</text>
                <text x="116" y="106" fill="#94a3b8" fontSize="11" fontWeight="600">Instruction Engine</text>
              </g>

              {/* RAM */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(hardwareBusNodes[1])}>
                <rect x="300" y="35" width="200" height="96" rx="14" fill={selectedNodeId === 'hw-ram' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'hw-ram' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'hw-ram' ? '2.5' : '1.5'} />
                <circle cx="338" cy="83" r="26" fill="#0284c7" />
                <text x="338" y="90" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">🧠</text>
                <text x="376" y="68" fill="#ffffff" fontSize="15" fontWeight="900">RAM (Memory)</text>
                <text x="376" y="88" fill="#38bdf8" fontSize="12" fontWeight="700">Volatile Workspace</text>
                <text x="376" y="106" fill="#94a3b8" fontSize="11" fontWeight="600">Cleared on Reboot</text>
              </g>

              {/* SSD */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(hardwareBusNodes[2])}>
                <rect x="300" y="205" width="200" height="96" rx="14" fill={selectedNodeId === 'hw-ssd' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'hw-ssd' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'hw-ssd' ? '2.5' : '1.5'} />
                <circle cx="338" cy="253" r="26" fill="#0284c7" />
                <text x="338" y="260" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">💾</text>
                <text x="376" y="238" fill="#ffffff" fontSize="15" fontWeight="900">SSD / Storage</text>
                <text x="376" y="258" fill="#38bdf8" fontSize="12" fontWeight="700">Persistent Cabinet</text>
                <text x="376" y="276" fill="#94a3b8" fontSize="11" fontWeight="600">Data Survives Restart</text>
              </g>

              {/* I/O */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(hardwareBusNodes[3])}>
                <rect x="40" y="205" width="200" height="96" rx="14" fill={selectedNodeId === 'hw-io' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'hw-io' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'hw-io' ? '2.5' : '1.5'} />
                <circle cx="78" cy="253" r="26" fill="#0284c7" />
                <text x="78" y="260" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">🖥️</text>
                <text x="116" y="238" fill="#ffffff" fontSize="15" fontWeight="900">Input / Output</text>
                <text x="116" y="258" fill="#38bdf8" fontSize="12" fontWeight="700">Peripherals &amp; NIC</text>
                <text x="116" y="276" fill="#94a3b8" fontSize="11" fontWeight="600">Keyboard, Display, Wire</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            2. STYLE: m01-os-kernel (Layered OS Architecture & SYSCALL Bridge)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-os-kernel' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(osKernelNodes[0])}>
                <rect x="30" y="20" width="480" height="82" rx="14" fill={selectedNodeId === 'kern-apps' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'kern-apps' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'kern-apps' ? '2.5' : '1.5'} />
                <text x="50" y="52" fill="#ffffff" fontSize="16" fontWeight="900">User Applications Layer (Ring 3)</text>
                <text x="50" y="78" fill="#94a3b8" fontSize="12" fontWeight="600">Chrome.exe • Excel.xlsx • Calculator.exe (Isolated Virtual Memory)</text>
              </g>

              <line x1="270" y1="102" x2="270" y2="130" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="285" y="120" fill="#38bdf8" fontSize="12" fontWeight="900">SYSCALL ▼</text>

              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(osKernelNodes[1])}>
                <rect x="30" y="130" width="480" height="90" rx="14" fill={selectedNodeId === 'kern-coord' ? '#062d54' : '#041833'} stroke="#38bdf8" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.4))' }} />
                <text x="50" y="165" fill="#38bdf8" fontSize="17" fontWeight="900">OS Kernel (The Master Coordinator)</text>
                <text x="50" y="193" fill="#cbd5e1" fontSize="12" fontWeight="500">Arbitrates CPU time slices, divides memory pages, and protects hardware from crash cascades.</text>
              </g>

              <line x1="270" y1="220" x2="270" y2="250" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="285" y="240" fill="#38bdf8" fontSize="12" fontWeight="900">DRIVERS ▼</text>

              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(osKernelNodes[2])}>
                <rect x="30" y="250" width="480" height="78" rx="14" fill={selectedNodeId === 'kern-hw' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'kern-hw' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'kern-hw' ? '2.5' : '1.5'} />
                <text x="50" y="282" fill="#ffffff" fontSize="16" fontWeight="900">Physical Hardware Subsystem</text>
                <text x="50" y="306" fill="#94a3b8" fontSize="12" fontWeight="600">CPU Cores • Physical RAM Modules • NVMe Solid-State Disk • Network Interface</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            3. STYLE: m01-account-privilege (Least Privilege Barrier & UAC)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-account-privilege' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(accountPrivilegeNodes[0])}>
                <rect x="25" y="40" width="220" height="260" rx="18" fill={selectedNodeId === 'user-std' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'user-std' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'user-std' ? '2.5' : '1.5'} />
                <circle cx="135" cy="100" r="36" fill="#0284c7" />
                <text x="135" y="108" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="900">👤</text>
                <text x="135" y="162" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">Standard User</text>
                <text x="135" y="186" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="700">FIN-OPS-01 (Medium)</text>
                <text x="135" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="600">Can write to: \\Documents</text>
                <text x="135" y="250" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="800">🚫 System32: DENIED</text>
              </g>

              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(accountPrivilegeNodes[1])}>
                <line x1="270" y1="40" x2="270" y2="300" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 6" />
                <circle cx="270" cy="170" r="30" fill="#1c1204" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="270" y="177" textAnchor="middle" fill="#f59e0b" fontSize="18">🛡️</text>
                <text x="270" y="220" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="900">UAC WALL</text>
              </g>

              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(accountPrivilegeNodes[2])}>
                <rect x="295" y="40" width="220" height="260" rx="18" fill={selectedNodeId === 'user-admin' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'user-admin' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'user-admin' ? '2.5' : '1.5'} />
                <circle cx="405" cy="100" r="36" fill="#0284c7" />
                <text x="405" y="108" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="900">👑</text>
                <text x="405" y="162" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="900">Administrator</text>
                <text x="405" y="186" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="700">Elevated / SYSTEM</text>
                <text x="405" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="600">Master System Keys</text>
                <text x="405" y="250" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="800">✓ Drivers &amp; System32</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            4. STYLE: m01-filesystem-tree (Filesystem Hierarchy & Protected Paths)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-filesystem-tree' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Root C:\ node */}
              <rect x="25" y="130" width="90" height="75" rx="12" fill="#0c2447" stroke="#38bdf8" strokeWidth="2" />
              <text x="70" y="163" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="900">C:\</text>
              <text x="70" y="187" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">Root Drive</text>

              {/* Branch lines */}
              <path d="M 115 168 L 155 168 L 155 53 L 175 53" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 115 168 L 155 168 L 155 133 L 175 133" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 115 168 L 155 168 L 155 213 L 175 213" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 115 168 L 155 168 L 155 293 L 175 293" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />

              {/* 1. System32 (Protected) */}
              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(filesystemNodes[0])}>
                <rect x="175" y="20" width="345" height="66" rx="12" fill={selectedNodeId === 'fs-sys32' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'fs-sys32' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'fs-sys32' ? '2.5' : '1.5'} />
                <circle cx="210" cy="53" r="20" fill="#1e293b" />
                <text x="210" y="60" textAnchor="middle" fontSize="16">🔒</text>
                <text x="242" y="46" fill="#ffffff" fontSize="15" fontWeight="900">C:\Windows\System32</text>
                <text x="242" y="68" fill="#38bdf8" fontSize="12" fontWeight="600">Core OS DLLs • Read-Only for Users</text>
              </g>

              {/* 2. Program Files */}
              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(filesystemNodes[1])}>
                <rect x="175" y="100" width="345" height="66" rx="12" fill={selectedNodeId === 'fs-prog' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'fs-prog' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'fs-prog' ? '2.5' : '1.5'} />
                <circle cx="210" cy="133" r="20" fill="#1e293b" />
                <text x="210" y="140" textAnchor="middle" fontSize="16">🛡️</text>
                <text x="242" y="126" fill="#ffffff" fontSize="15" fontWeight="900">C:\Program Files</text>
                <text x="242" y="148" fill="#38bdf8" fontSize="12" fontWeight="600">Signed Applications (Office, Chrome)</text>
              </g>

              {/* 3. Users\FIN-OPS-01 */}
              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(filesystemNodes[2])}>
                <rect x="175" y="180" width="345" height="66" rx="12" fill={selectedNodeId === 'fs-user' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'fs-user' ? '#38bdf8' : '#1e293b'} strokeWidth={selectedNodeId === 'fs-user' ? '2.5' : '1.5'} />
                <circle cx="210" cy="213" r="20" fill="#1e293b" />
                <text x="210" y="220" textAnchor="middle" fontSize="16">📁</text>
                <text x="242" y="206" fill="#ffffff" fontSize="15" fontWeight="900">C:\Users\FIN-OPS-01</text>
                <text x="242" y="228" fill="#10b981" fontSize="12" fontWeight="600">Personal Profile (Documents, Desk)</text>
              </g>

              {/* 4. Users\Public (⚠️ Threat Staging) */}
              <g className="cursor-pointer transition-transform hover:scale-102" onClick={() => handleNodeClick(filesystemNodes[3])}>
                <rect x="175" y="260" width="345" height="66" rx="12" fill={selectedNodeId === 'fs-public' ? '#2d0f19' : '#1a080e'} stroke={selectedNodeId === 'fs-public' ? '#f43f5e' : '#881337'} strokeWidth={selectedNodeId === 'fs-public' ? '2.5' : '1.5'} />
                <circle cx="210" cy="293" r="20" fill="#4c0519" />
                <text x="210" y="300" textAnchor="middle" fontSize="16">⚠️</text>
                <text x="242" y="286" fill="#f43f5e" fontSize="15" fontWeight="900">C:\Users\Public (Staging Alert)</text>
                <text x="242" y="308" fill="#fda4af" fontSize="12" fontWeight="700">World-Writable • Frequent Malware Target</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            5. STYLE: m01-process-lifecycle (Process PID Tree & Parentage)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-process-lifecycle' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* System Process Tree Branch (Left) */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(processLifecycleNodes[0])}>
                <rect x="25" y="35" width="220" height="75" rx="12" fill={selectedNodeId === 'proc-services' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'proc-services' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="42" y="65" fill="#ffffff" fontSize="14" fontWeight="900">services.exe (PID 620)</text>
                <text x="42" y="88" fill="#38bdf8" fontSize="12" fontWeight="600">User: SYSTEM • Root Daemon</text>
              </g>

              <line x1="135" y1="110" x2="135" y2="160" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />

              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(processLifecycleNodes[1])}>
                <rect x="25" y="160" width="220" height="75" rx="12" fill={selectedNodeId === 'proc-svchost' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'proc-svchost' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="42" y="190" fill="#ffffff" fontSize="14" fontWeight="900">svchost.exe (PID 910)</text>
                <text x="42" y="213" fill="#10b981" fontSize="12" fontWeight="600">Path: System32 • Normal Service</text>
              </g>

              {/* User Execution Branch (Right) */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(processLifecycleNodes[2])}>
                <rect x="280" y="25" width="240" height="70" rx="12" fill={selectedNodeId === 'proc-explorer' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'proc-explorer' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="298" y="52" fill="#ffffff" fontSize="14" fontWeight="900">explorer.exe (PID 2140)</text>
                <text x="298" y="75" fill="#38bdf8" fontSize="12" fontWeight="600">User: FIN-OPS-01 • Desktop Shell</text>
              </g>

              <line x1="400" y1="95" x2="400" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />

              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(processLifecycleNodes[3])}>
                <rect x="280" y="125" width="240" height="70" rx="12" fill={selectedNodeId === 'proc-cmd' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'proc-cmd' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="298" y="152" fill="#ffffff" fontSize="14" fontWeight="900">cmd.exe (PID 3400)</text>
                <text x="298" y="175" fill="#94a3b8" fontSize="12" fontWeight="600">PPID: 2140 • Command Interpreter</text>
              </g>

              <line x1="400" y1="195" x2="400" y2="225" stroke="#f43f5e" strokeWidth="2.5" />

              {/* Anomalous child: powershell.exe */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(processLifecycleNodes[4])}>
                <rect x="260" y="225" width="265" height="85" rx="14" fill={selectedNodeId === 'proc-ps-lolbin' ? '#380712' : '#1f060d'} stroke="#f43f5e" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.5))' }} />
                <text x="278" y="253" fill="#f43f5e" fontSize="14" fontWeight="900">powershell.exe (PID 4820) ⚠️</text>
                <text x="278" y="276" fill="#cbd5e1" fontSize="11" fontWeight="600">Flag: -ExecutionPolicy Bypass -enc...</text>
                <text x="278" y="297" fill="#fca5a5" fontSize="11" fontWeight="800">LOLBIN TRIGGER: Suspicious Child</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            6. STYLE: m01-memory-isolation (Virtual Memory & MMU Sandboxes)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-memory-isolation' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Process 1 Sandbox */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(memoryIsolationNodes[0])}>
                <rect x="25" y="30" width="175" height="115" rx="14" fill={selectedNodeId === 'mem-excel' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'mem-excel' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="40" y="64" fill="#ffffff" fontSize="14" fontWeight="900">Process A: Excel.exe</text>
                <text x="40" y="88" fill="#38bdf8" fontSize="12" fontWeight="700">Virtual: 0x0000..0xFFFF</text>
                <text x="40" y="118" fill="#cbd5e1" fontSize="11" fontWeight="600">Private Heap • Clean Data</text>
              </g>

              {/* Isolation Barrier between Process A and B */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(memoryIsolationNodes[3])}>
                <line x1="25" y1="168" x2="200" y2="168" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4 4" />
                <rect x="45" y="154" width="135" height="28" rx="8" fill="#29070e" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="112" y="173" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="900">⛔ BARRIER BLOCKED</text>
              </g>

              {/* Process 2 Sandbox */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(memoryIsolationNodes[2])}>
                <rect x="25" y="195" width="175" height="115" rx="14" fill={selectedNodeId === 'mem-chrome' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'mem-chrome' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="40" y="229" fill="#ffffff" fontSize="14" fontWeight="900">Process B: Chrome.exe</text>
                <text x="40" y="253" fill="#38bdf8" fontSize="12" fontWeight="700">Virtual: 0x0000..0xFFFF</text>
                <text x="40" y="283" fill="#cbd5e1" fontSize="11" fontWeight="600">Isolated Memory Space</text>
              </g>

              {/* MMU Center Box */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(memoryIsolationNodes[1])}>
                <rect x="225" y="80" width="140" height="180" rx="14" fill={selectedNodeId === 'mem-mmu' ? '#062d54' : '#041833'} stroke="#38bdf8" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }} />
                <text x="295" y="125" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="900">CPU MMU</text>
                <text x="295" y="152" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="800">Page Tables</text>
                <text x="295" y="188" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">Translates Pointers</text>
                <text x="295" y="214" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="800">DEP / NX Active</text>
              </g>

              {/* Page Translation mapping lines */}
              <line x1="200" y1="90" x2="225" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="200" y1="250" x2="225" y2="205" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

              {/* Physical RAM (Right) */}
              <rect x="385" y="45" width="135" height="250" rx="14" fill="#080f24" stroke="#1e293b" strokeWidth="2" />
              <text x="452" y="78" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">Physical RAM</text>
              <rect x="398" y="98" width="110" height="34" rx="6" fill="#0c2447" stroke="#38bdf8" strokeWidth="1" />
              <text x="453" y="120" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">Page 0x1A40 (Excel)</text>
              <rect x="398" y="148" width="110" height="34" rx="6" fill="#0c2447" stroke="#38bdf8" strokeWidth="1" />
              <text x="453" y="170" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">Page 0x2B80 (Chrome)</text>
              <rect x="398" y="198" width="110" height="34" rx="6" fill="#071228" stroke="#1e293b" strokeWidth="1" />
              <text x="453" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700">Free Frame</text>
              <line x1="365" y1="165" x2="398" y2="115" stroke="#38bdf8" strokeWidth="2" />
              <line x1="365" y1="165" x2="398" y2="165" stroke="#38bdf8" strokeWidth="2" />
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            7. STYLE: m01-terminal-cli (Live Interactive Terminal Console)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-terminal-cli' && (
          <div className="w-full max-w-[620px] space-y-3 font-mono">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">RUN COMMAND:</span>
              {['tasklist', 'dir', 'whoami', 'ipconfig'].map((cmdKey) => (
                <button
                  key={cmdKey}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveCliCommand(cmdKey);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    activeCliCommand === cmdKey
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
                  }`}
                >
                  {cmdKey}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-black/95 border border-slate-800 p-4 space-y-2.5 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 ml-2 font-bold">PowerShell • BLR-BR-WS-04</span>
              </div>

              <div className="text-sm text-sky-400 font-extrabold">
                PS C:\Users\FIN-OPS-01&gt; <span className="text-white">{cliCommandsData[activeCliCommand]?.cmd}</span>
              </div>

              <pre className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto no-scrollbar pt-1 font-mono">
                {cliCommandsData[activeCliCommand]?.output}
              </pre>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            8. STYLE: m01-process-triage-hud (Live Process Triage HUD)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-process-triage-hud' && (
          <div className="w-full max-w-[620px] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-bold tracking-wider">
              <span>HOST: BLR-BR-WS-04</span>
              <span>LIVE TRIAGE MONITOR</span>
            </div>

            <div className="space-y-2">
              {processTriageNodes.map((p) => {
                const isSelected = selectedNodeId === p.id;
                const isSuspicious = p.id === 'triage-suspicious';
                return (
                  <div
                    key={p.id}
                    onClick={() => handleNodeClick(p)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isSuspicious
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500/40'
                          : 'bg-sky-950/70 border-sky-400 text-sky-200 ring-1 ring-sky-500/40'
                        : isSuspicious
                        ? 'bg-rose-950/20 border-rose-900/60 text-slate-300 hover:border-rose-700'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-base ${isSuspicious ? 'text-rose-400' : 'text-sky-400'}`}>
                        {isSuspicious ? '⚠️' : '⚙️'}
                      </span>
                      <div>
                        <div className="font-extrabold text-sm text-white">{p.label}</div>
                        <div className="text-xs text-slate-400 font-medium">{p.sub}</div>
                      </div>
                    </div>
                    <Badge
                      className={`text-[10px] font-bold px-2.5 py-1 ${
                        isSuspicious
                          ? 'bg-rose-500 text-slate-950 font-extrabold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSuspicious ? 'ANOMALY' : 'NORMAL'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            9. STYLE: m01-socket-diagnostics (Network Socket Matrix netstat)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-socket-diagnostics' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Local Host Node */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(socketDiagnosticsNodes[0])}>
                <rect x="25" y="80" width="160" height="155" rx="16" fill={selectedNodeId === 'sock-local' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'sock-local' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <circle cx="105" cy="130" r="28" fill="#0284c7" />
                <text x="105" y="138" textAnchor="middle" fill="#ffffff" fontSize="20">💻</text>
                <text x="105" y="180" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">BLR-BR-WS-04</text>
                <text x="105" y="204" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">10.10.20.15</text>
              </g>

              {/* Connecting socket lines */}
              <line x1="185" y1="125" x2="300" y2="70" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="185" y1="160" x2="300" y2="160" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="185" y1="195" x2="300" y2="255" stroke="#f43f5e" strokeWidth="3" />

              {/* 1. Foreign HTTPS */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(socketDiagnosticsNodes[1])}>
                <rect x="300" y="35" width="220" height="72" rx="12" fill={selectedNodeId === 'sock-https' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'sock-https' ? '#10b981' : '#1e293b'} strokeWidth="2" />
                <text x="318" y="63" fill="#ffffff" fontSize="13" fontWeight="900">10.10.10.5:443 (HTTPS)</text>
                <text x="318" y="85" fill="#10b981" fontSize="11" fontWeight="700">Internal Portal • PID 3840 (Excel)</text>
              </g>

              {/* 2. Foreign DNS */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(socketDiagnosticsNodes[2])}>
                <rect x="300" y="125" width="220" height="72" rx="12" fill={selectedNodeId === 'sock-dns' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'sock-dns' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="318" y="153" fill="#ffffff" fontSize="13" fontWeight="900">10.10.10.5:53 (DNS UDP)</text>
                <text x="318" y="175" fill="#38bdf8" fontSize="11" fontWeight="700">Corporate Domain Controller</text>
              </g>

              {/* 3. Suspicious C2 Beacon */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(socketDiagnosticsNodes[3])}>
                <rect x="300" y="215" width="220" height="84" rx="14" fill={selectedNodeId === 'sock-c2-beacon' ? '#380712' : '#1f060d'} stroke="#f43f5e" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.4))' }} />
                <text x="318" y="244" fill="#f43f5e" fontSize="13" fontWeight="900">185.220.101.4:8080 ⚠️</text>
                <text x="318" y="266" fill="#cbd5e1" fontSize="11" fontWeight="600">Foreign Host • PID 4820 (PowerShell)</text>
                <text x="318" y="286" fill="#fca5a5" fontSize="10" fontWeight="900">ALERT: C2 BEACONING</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            10. STYLE: m01-log-anatomy (Security Log Event Dissector)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-log-anatomy' && (
          <div className="w-full max-w-[620px] space-y-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/95 border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                <span className="text-slate-400 text-xs font-bold tracking-wider">WINDOWS EVENT LOG RECORD</span>
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 text-[10px] font-bold">SECURITY.EVTX</Badge>
              </div>

              <div className="space-y-2 pt-1">
                <div
                  onClick={() => handleNodeClick(logAnatomyNodes[0])}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedNodeId === 'log-eventid' ? 'bg-sky-950/80 border-sky-400' : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <span className="text-sky-400 font-bold text-sm">&lt;EventID&gt;</span>
                  <span className="text-white font-extrabold text-sm ml-1.5">4688</span>
                  <span className="text-slate-400 text-xs ml-2">(A new process has been created)</span>
                </div>

                <div
                  onClick={() => handleNodeClick(logAnatomyNodes[1])}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedNodeId === 'log-time' ? 'bg-sky-950/80 border-sky-400' : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <span className="text-amber-400 font-bold text-sm">&lt;TimeCreated&gt;</span>
                  <span className="text-slate-200 text-sm ml-1.5 font-bold">2026-10-15T09:14:22.184Z</span>
                </div>

                <div
                  onClick={() => handleNodeClick(logAnatomyNodes[2])}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedNodeId === 'log-subject' ? 'bg-sky-950/80 border-sky-400' : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <span className="text-emerald-400 font-bold text-sm">&lt;SubjectUserName&gt;</span>
                  <span className="text-white font-extrabold text-sm ml-1.5">FIN-OPS-01</span>
                  <span className="text-slate-400 text-xs ml-2">(SID: S-1-5-21-3829-1002)</span>
                </div>

                <div
                  onClick={() => handleNodeClick(logAnatomyNodes[3])}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedNodeId === 'log-process' ? 'bg-rose-950/80 border-rose-400' : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <span className="text-rose-400 font-bold text-sm">&lt;CommandLine&gt;</span>
                  <span className="text-rose-200 font-bold text-sm ml-1.5">powershell.exe -enc aQBw...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            11. STYLE: m01-log-vault (Windows Event Log Vault winevt)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-log-vault' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Vault Outer Chamber */}
              <rect x="25" y="25" width="490" height="285" rx="18" fill="#040b1c" stroke="#1e293b" strokeWidth="2" />
              <text x="45" y="58" fill="#94a3b8" fontSize="13" fontWeight="900">C:\Windows\System32\winevt\Logs</text>
              <rect x="350" y="40" width="145" height="26" rx="6" fill="#064e3b" />
              <text x="422" y="57" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="900">✓ TAMPER SHIELD ON</text>

              {/* Cylinder 1: Security.evtx */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(logVaultNodes[0])}>
                <rect x="42" y="85" width="138" height="195" rx="14" fill={selectedNodeId === 'vault-sec' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'vault-sec' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <circle cx="111" cy="128" r="26" fill="#0284c7" />
                <text x="111" y="136" textAnchor="middle" fill="#ffffff" fontSize="18">🛡️</text>
                <text x="111" y="176" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">Security.evtx</text>
                <text x="111" y="198" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">Auth &amp; Process Creation</text>
                <text x="111" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Read: SYSTEM Only</text>
                <text x="111" y="248" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="800">Circular Buffer</text>
              </g>

              {/* Cylinder 2: System.evtx */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(logVaultNodes[1])}>
                <rect x="201" y="85" width="138" height="195" rx="14" fill={selectedNodeId === 'vault-sys' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'vault-sys' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <circle cx="270" cy="128" r="26" fill="#0284c7" />
                <text x="270" y="136" textAnchor="middle" fill="#ffffff" fontSize="18">⚙️</text>
                <text x="270" y="176" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">System.evtx</text>
                <text x="270" y="198" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">Drivers &amp; Kernel OS</text>
                <text x="270" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Hardware Reboots</text>
                <text x="270" y="248" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="800">Circular Buffer</text>
              </g>

              {/* Cylinder 3: Application.evtx */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(logVaultNodes[2])}>
                <rect x="360" y="85" width="138" height="195" rx="14" fill={selectedNodeId === 'vault-app' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'vault-app' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <circle cx="429" cy="128" r="26" fill="#0284c7" />
                <text x="429" y="136" textAnchor="middle" fill="#ffffff" fontSize="18">📁</text>
                <text x="429" y="176" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">Application.evtx</text>
                <text x="429" y="198" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">Software Exceptions</text>
                <text x="429" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">Crash Logs</text>
                <text x="429" y="248" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="800">Circular Buffer</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            12. STYLE: m01-log-forwarding (Centralized Forwarding Pipeline)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-log-forwarding' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Host Endpoint */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(logForwardingNodes[0])}>
                <rect x="25" y="80" width="150" height="165" rx="16" fill={selectedNodeId === 'fwd-wef' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'fwd-wef' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <circle cx="100" cy="128" r="28" fill="#0284c7" />
                <text x="100" y="136" textAnchor="middle" fill="#ffffff" fontSize="20">💻</text>
                <text x="100" y="174" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">BLR-BR-WS-04</text>
                <text x="100" y="196" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">WEF Collector Agent</text>
                <text x="100" y="218" textAnchor="middle" fill="#cbd5e1" fontSize="10">Real-Time Scraping</text>
              </g>

              {/* Connecting Pipeline with moving packets */}
              <rect x="175" y="148" width="170" height="34" rx="8" fill="#040d21" stroke="#1e293b" strokeWidth="2" />
              <line x1="175" y1="165" x2="345" y2="165" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 6" />
              {(() => {
                const pos = (animStep % 100) / 100;
                return <circle cx={175 + 170 * pos} cy="165" r="5" fill="#38bdf8" />;
              })()}
              <text x="260" y="140" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="900">ENCRYPTED TLS CONDUIT</text>

              {/* Central SIEM Lake */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(logForwardingNodes[2])}>
                <rect x="345" y="70" width="170" height="185" rx="16" fill={selectedNodeId === 'fwd-siem' ? '#062d54' : '#041833'} stroke="#38bdf8" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }} />
                <circle cx="430" cy="122" r="30" fill="#0284c7" />
                <text x="430" y="130" textAnchor="middle" fill="#ffffff" fontSize="22">🏛️</text>
                <text x="430" y="172" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">CENTRAL SIEM</text>
                <text x="430" y="194" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">Splunk / Sentinel</text>
                <rect x="365" y="214" width="130" height="24" rx="6" fill="#064e3b" />
                <text x="430" y="230" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="900">IMMUTABLE ARCHIVE</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            13. STYLE: m01-mac-ip-addressing (Physical MAC vs Logical IP)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-mac-ip-addressing' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Layer 2 NIC MAC (Left) */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(macIpAddressingNodes[0])}>
                <rect x="25" y="50" width="205" height="110" rx="14" fill={selectedNodeId === 'net-mac' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'net-mac' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="42" y="82" fill="#ffffff" fontSize="14" fontWeight="900">Physical MAC Address</text>
                <text x="42" y="110" fill="#38bdf8" fontSize="14" fontWeight="900" className="font-mono">00:1A:2B:3C:4D:5E</text>
                <text x="42" y="138" fill="#94a3b8" fontSize="11" fontWeight="600">Layer 2 • Burned in NIC ROM</text>
              </g>

              {/* Layer 3 Logical IP (Right) */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(macIpAddressingNodes[1])}>
                <rect x="290" y="50" width="205" height="110" rx="14" fill={selectedNodeId === 'net-ip' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'net-ip' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="308" y="82" fill="#ffffff" fontSize="14" fontWeight="900">Logical IP Address</text>
                <text x="308" y="110" fill="#10b981" fontSize="15" fontWeight="900" className="font-mono">10.10.20.15</text>
                <text x="308" y="138" fill="#94a3b8" fontSize="11" fontWeight="600">Layer 3 • Routable Subnet Address</text>
              </g>

              {/* Center ARP Translation Bridge */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(macIpAddressingNodes[2])}>
                <rect x="170" y="190" width="200" height="100" rx="14" fill={selectedNodeId === 'net-arp' ? '#062d54' : '#041833'} stroke="#38bdf8" strokeWidth="2" />
                <text x="270" y="222" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">ARP Cache Table</text>
                <text x="270" y="246" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700">Translates IP &lt;--&gt; MAC</text>
                <text x="270" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">Gateway: 10.10.20.1</text>
              </g>

              <line x1="125" y1="160" x2="220" y2="190" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="395" y1="160" x2="320" y2="190" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            14. STYLE: m01-tcp-handshake (TCP 3-Way Handshake SYN, SYN-ACK, ACK)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-tcp-handshake' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Client Vertical Pillar */}
              <rect x="50" y="25" width="110" height="46" rx="10" fill="#0c2447" stroke="#38bdf8" strokeWidth="2" />
              <text x="105" y="55" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">Client (Host)</text>
              <line x1="105" y1="71" x2="105" y2="300" stroke="#1e293b" strokeWidth="2" />

              {/* Server Vertical Pillar */}
              <rect x="380" y="25" width="110" height="46" rx="10" fill="#0c2447" stroke="#38bdf8" strokeWidth="2" />
              <text x="435" y="55" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">Server (Port 443)</text>
              <line x1="435" y1="71" x2="435" y2="300" stroke="#1e293b" strokeWidth="2" />

              {/* 1. SYN Arrow (Left to Right) */}
              <g className="cursor-pointer" onClick={() => handleNodeClick(tcpHandshakeNodes[0])}>
                <line x1="105" y1="118" x2="435" y2="118" stroke="#38bdf8" strokeWidth="2.5" />
                <polygon points="435,118 423,111 423,125" fill="#38bdf8" />
                <rect x="205" y="103" width="150" height="30" rx="8" fill="#041228" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="280" y="123" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="900">1. SYN (Seq=100)</text>
              </g>

              {/* 2. SYN-ACK Arrow (Right to Left) */}
              <g className="cursor-pointer" onClick={() => handleNodeClick(tcpHandshakeNodes[1])}>
                <line x1="435" y1="178" x2="105" y2="178" stroke="#10b981" strokeWidth="2.5" />
                <polygon points="105,178 117,171 117,185" fill="#10b981" />
                <rect x="180" y="163" width="200" height="30" rx="8" fill="#041c14" stroke="#10b981" strokeWidth="1.5" />
                <text x="280" y="183" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="900">2. SYN-ACK (Seq=300, Ack=101)</text>
              </g>

              {/* 3. ACK Arrow (Left to Right) */}
              <g className="cursor-pointer" onClick={() => handleNodeClick(tcpHandshakeNodes[2])}>
                <line x1="105" y1="238" x2="435" y2="238" stroke="#38bdf8" strokeWidth="2.5" />
                <polygon points="435,238 423,231 423,245" fill="#38bdf8" />
                <rect x="205" y="223" width="150" height="30" rx="8" fill="#041228" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="280" y="243" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="900">3. ACK (Seq=101, Ack=301)</text>
              </g>

              <rect x="180" y="280" width="200" height="28" rx="8" fill="#064e3b" />
              <text x="280" y="299" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="900">STATE: ESTABLISHED ✓</text>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            15. STYLE: m01-client-server-flow (Client-Server Protocol Flow)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-client-server-flow' && (
          <div className="w-full flex items-center justify-center">
            <svg viewBox="0 0 540 340" className="w-full max-w-[640px] h-[360px] sm:h-[420px] select-none" style={{ overflow: 'visible' }}>
              {/* Stage 1: DNS */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(clientServerFlowNodes[0])}>
                <rect x="25" y="35" width="230" height="100" rx="14" fill={selectedNodeId === 'cs-dns' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'cs-dns' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="42" y="68" fill="#ffffff" fontSize="14" fontWeight="900">1. DNS Resolution</text>
                <text x="42" y="92" fill="#38bdf8" fontSize="12" fontWeight="700">UDP 53 • finance.cdac.local</text>
                <text x="42" y="116" fill="#cbd5e1" fontSize="11" fontWeight="600">Resolves domain to 10.10.10.5</text>
              </g>

              {/* Stage 2: TLS */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(clientServerFlowNodes[1])}>
                <rect x="285" y="35" width="230" height="100" rx="14" fill={selectedNodeId === 'cs-tls' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'cs-tls' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="302" y="68" fill="#ffffff" fontSize="14" fontWeight="900">2. TLS Handshake</text>
                <text x="302" y="92" fill="#38bdf8" fontSize="12" fontWeight="700">Port 443 • Cipher Negotiation</text>
                <text x="302" y="116" fill="#10b981" fontSize="11" fontWeight="700">Signed Certificate Validated</text>
              </g>

              {/* Stage 3: HTTP GET */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(clientServerFlowNodes[2])}>
                <rect x="25" y="185" width="230" height="100" rx="14" fill={selectedNodeId === 'cs-req' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'cs-req' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="42" y="218" fill="#ffffff" fontSize="14" fontWeight="900">3. HTTP GET Request</text>
                <text x="42" y="242" fill="#38bdf8" fontSize="12" fontWeight="700">GET /api/finance/invoices</text>
                <text x="42" y="266" fill="#cbd5e1" fontSize="11" fontWeight="600">User-Agent: Enterprise Browser</text>
              </g>

              {/* Stage 4: HTTP 200 Response */}
              <g className="cursor-pointer transition-transform hover:scale-105" onClick={() => handleNodeClick(clientServerFlowNodes[3])}>
                <rect x="285" y="185" width="230" height="100" rx="14" fill={selectedNodeId === 'cs-resp' ? '#0c2447' : '#080f24'} stroke={selectedNodeId === 'cs-resp' ? '#38bdf8' : '#1e293b'} strokeWidth="2" />
                <text x="302" y="218" fill="#ffffff" fontSize="14" fontWeight="900">4. HTTP 200 OK Delivery</text>
                <text x="302" y="242" fill="#10b981" fontSize="12" fontWeight="700">JSON Invoice Stream</text>
                <text x="302" y="266" fill="#cbd5e1" fontSize="11" fontWeight="600">Rendered on Analyst Display</text>
              </g>
            </svg>
          </div>
        )}

        {/* -------------------------------------------------------------------
            16. STYLE: m01-workstation-baseline (Behavioral Baseline HUD)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-workstation-baseline' && (
          <div className="w-full max-w-[620px] grid grid-cols-2 gap-3.5 text-xs font-mono">
            {workstationBaselineNodes.map((b) => {
              const isSelected = selectedNodeId === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => handleNodeClick(b)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-sky-950/70 border-sky-400 text-sky-200 ring-1 ring-sky-500/40 shadow-md'
                      : 'bg-[#081329] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">{b.badge}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="font-extrabold text-white text-sm">{b.label}</div>
                  <div className="text-xs text-slate-300 font-medium leading-relaxed">{b.sub}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* -------------------------------------------------------------------
            17. STYLE: m01-anomaly-triggers (Anomaly Triggers & Threat Radar)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-anomaly-triggers' && (
          <div className="w-full max-w-[620px] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-rose-900/60 pb-2 text-rose-400 text-xs font-bold tracking-wider">
              <span>THREAT RADAR • SEV-2 ALARMS</span>
              <span className="animate-pulse">● LIVE SENSORS ACTIVE</span>
            </div>

            <div className="space-y-2">
              {anomalyTriggersNodes.map((a) => {
                const isSelected = selectedNodeId === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => handleNodeClick(a)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-500/50 shadow-md'
                        : 'bg-rose-950/20 border-rose-900/50 text-slate-300 hover:border-rose-700'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-sm text-rose-300">{a.label}</div>
                      <div className="text-xs text-slate-300 font-medium leading-relaxed">{a.sub}</div>
                    </div>
                    <Badge className="bg-rose-600 text-slate-950 text-[10px] font-bold px-2 py-0.5">ALARM</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            18. STYLE: m01-triage-matrix (L1 Triage Decision Matrix & Containment)
        ------------------------------------------------------------------- */}
        {currentStyle === 'm01-triage-matrix' && (
          <div className="w-full max-w-[620px] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-bold text-xs tracking-wider">L1 INCIDENT TRIAGE ENGINE</span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsHostIsolated(!isHostIsolated);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  isHostIsolated
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md animate-pulse'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {isHostIsolated ? '🔒 HOST ISOLATED' : 'TOGGLE ISOLATION'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div
                onClick={() => handleNodeClick(triageMatrixNodes[0])}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNodeId === 'tri-alert' ? 'bg-sky-950 border-sky-400 ring-1 ring-sky-500/40 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-extrabold text-white text-sm">1. Alert Intake</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">SIEM LOLBIN Alarm</div>
              </div>

              <div
                onClick={() => handleNodeClick(triageMatrixNodes[1])}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNodeId === 'tri-check' ? 'bg-sky-950 border-sky-400 ring-1 ring-sky-500/40 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-extrabold text-white text-sm">2. 3-Point Check</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">User • Hash • Parent</div>
              </div>

              <div
                onClick={() => handleNodeClick(triageMatrixNodes[2])}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNodeId === 'tri-fp' ? 'bg-emerald-950 border-emerald-400 ring-1 ring-emerald-500/40 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-extrabold text-emerald-300 text-sm">Outcome A: FP</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Document &amp; Close</div>
              </div>

              <div
                onClick={() => handleNodeClick(triageMatrixNodes[3])}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNodeId === 'tri-tp-isolate' ? 'bg-rose-950 border-rose-400 ring-1 ring-rose-500/40 shadow-sm' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="font-extrabold text-rose-300 text-sm">Outcome B: TP 🔒</div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Isolate &amp; Escalate</div>
              </div>
            </div>

            {isHostIsolated && (
              <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500 text-rose-200 text-xs text-center font-bold animate-fade-in shadow-md">
                🔒 HOST NETWORK SEVERED: Workstation quarantined from enterprise LAN.
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODULE 00 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m00-') && (
          <Module00GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 02 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m02-') && (
          <Module02GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 03 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m03-') && (
          <Module03GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 04 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m04-') && (
          <Module04GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 05 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m05-') && (
          <Module05GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 06 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m06-') && (
          <Module06GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 07 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m07-') && (
          <Module07GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 08 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m08-') && (
          <Module08GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 09 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m09-') && (
          <Module09GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 10 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m10-') && (
          <Module10GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 11 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m11-') && (
          <Module11GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 12 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m12-') && (
          <Module12GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 13 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m13-') && (
          <Module13GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}

        {/* -------------------------------------------------------------------
            MODULE 14 GRAPHICS DISPATCHER (18 Dedicated Dynamic Visual Stories)
        ------------------------------------------------------------------- */}
        {currentStyle.startsWith('m14-') && (
          <Module14GraphicRenderer
            style={currentStyle}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleNodeClick}
            animStep={animStep}
          />
        )}
      </div>

      {/* =======================================================================
          BOTTOM INSPECTOR CARD (Component Details, Takeaway & Tags)
      ======================================================================= */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08122c] border border-slate-200 dark:border-sky-500/30 space-y-1.5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-1.5">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
            {currentStyle === 'm01-terminal-cli'
              ? cliCommandsData[activeCliCommand]?.cmd
              : activeNode.label}
          </h4>

          <Badge className="bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40 text-[9px] font-mono font-bold px-2 py-0.5">
            {currentStyle === 'm01-terminal-cli'
              ? cliCommandsData[activeCliCommand]?.badge
              : activeNode.badge || 'WORKSTATION COMPONENT'}
          </Badge>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          {currentStyle === 'm01-terminal-cli'
            ? cliCommandsData[activeCliCommand]?.desc
            : activeNode.description}
        </p>

        {activeNode.details && currentStyle !== 'm01-terminal-cli' && (
          <p className="text-xs text-sky-700 dark:text-sky-300/90 font-mono pt-0.5">
            <strong>Analyst Takeaway: </strong>
            {activeNode.details}
          </p>
        )}

        {/* Tags */}
        {activeNode.tags && activeNode.tags.length > 0 && currentStyle !== 'm01-terminal-cli' && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 flex-wrap">
            {activeNode.tags.map((tag, tIdx) => (
              <Badge
                key={tIdx}
                variant="outline"
                className="bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-[10px] font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
