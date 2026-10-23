'use client';

import React from 'react';
import {
  Users,
  Shield,
  Activity,
  Layers,
  ArrowRight,
  Lock,
  AlertTriangle,
  Monitor,
  Server,
  Zap,
  Globe,
  Radio,
  Clock,
  Key,
  Sliders,
  Check,
  CheckCircle2,
  AlertOctagon,
  FileText,
  CornerDownRight,
  Database,
  Terminal,
  Cpu,
  HardDrive,
  Eye,
  Pause,
  UserCheck,
  Compass,
  FileSpreadsheet,
  Boxes,
  HelpCircle,
  Share2,
} from 'lucide-react';

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

// -----------------------------------------------------------------------------
// MODULE 00 NODE COLLECTIONS (ORIENTATION: YOUR FIRST SOC SHIFT)
// -----------------------------------------------------------------------------

// --- UNIT 1: CHAPTER 1: A visitor, not yet an analyst ---
// 1. Campus Arrival & Reception
export const campusReceptionNodes: VisualNodeItem[] = [
  {
    id: 'rec-campus',
    label: 'CDAC Bengaluru Campus',
    sub: 'Training Centre Facility',
    badge: 'Facility',
    description: 'The simulated CDAC Bengaluru cybersecurity learning campus. Learners arrive as visiting explorers without technical prerequisites.',
    details: 'Morning sunlight illuminates the reception entrance where aspiring defenders begin their journey into enterprise security operations.',
    tags: ['Campus', 'CDAC', 'Training'],
  },
  {
    id: 'rec-visitor',
    label: 'Visiting Learner',
    sub: 'Curiosity First Posture',
    badge: 'Learner',
    description: 'You arrive with curiosity rather than deep IT expertise. Nobody expects you to investigate a live advanced attack on day one.',
    details: 'You use phones and laptops daily, but need to understand the ordinary activity inside them before recognizing anomalous signals.',
    tags: ['Learner', 'Non-IT', 'Curiosity'],
  },
  {
    id: 'rec-mentor',
    label: 'Mentor Ananya',
    sub: 'SOC Shift Lead & Guide',
    badge: 'Shift Lead',
    description: 'Lead mentor Ananya welcomes you at reception, providing patient, disciplined orientation and framing foundational doctrines.',
    details: 'Ananya confirms: "First, we will understand ordinary activity; later, we will recognize activity that needs checking."',
    tags: ['Mentor', 'Ananya', 'SOC Lead'],
  },
  {
    id: 'rec-badge',
    label: 'SOC Learner Badge',
    sub: 'Visitor Orientation Credential',
    badge: 'Credential',
    description: 'Official orientation pass issued at the reception desk reading "SOC Learner", indicating apprentice observer status.',
    details: 'Visual credential signifying your authorization to observe simulated telemetry and execute guided sandbox labs.',
    tags: ['Badge', 'Access', 'Doctrine'],
  },
];

// 2. The Cardinal Rule
export const cardinalRuleNodes: VisualNodeItem[] = [
  {
    id: 'rule-unfamiliar',
    label: 'Unfamiliar Screen',
    sub: 'Unknown Alert Display',
    badge: 'Trigger Event',
    description: 'A security terminal or training console displays an unfamiliar prompt, error dialog, or unusual telemetry stream.',
    details: 'In security operations, unfamiliar signals appear daily. Beginners must learn how to react without anxiety or panic.',
    tags: ['Console', 'Alert', 'Observables'],
  },
  {
    id: 'rule-hasty',
    label: 'Hasty Guess (PROHIBITED)',
    sub: 'Unsupported Guesswork',
    badge: 'Danger ▲',
    description: 'Pressing buttons blindly or altering configurations based on speculation risks irreversible data destruction.',
    details: 'Never guess what a button does. In cybersecurity, hasty unauthorized actions turn false alarms into enterprise downtime.',
    tags: ['Prohibited', 'Guess', 'Risk'],
  },
  {
    id: 'rule-pause',
    label: 'The Safe Pause',
    sub: 'Disciplined Restraint',
    badge: 'Doctrine ✓',
    description: 'Halt execution, leave current display observables intact, and prepare notes before touching any setting.',
    details: 'A deliberate safe pause protects evidentiary integrity and prevents accidental tampering with potential incident clues.',
    tags: ['Restraint', 'Pause', 'SOP'],
  },
  {
    id: 'rule-ask',
    label: 'Consult Shift Lead',
    sub: 'Mentor Escalation Protocol',
    badge: 'Golden Rule ✓',
    description: 'The First Golden Rule of SOC Triage: Always ask for help before changing anything. Curiosity is welcome; unsupported action is not.',
    details: 'Mentor Ananya confirms: Disciplined analysts consult senior guides immediately when encountering unfamiliar systems.',
    tags: ['Golden Rule', 'Escalation', 'Safety'],
  },
];

// 3. Operational Baseline
export const operationalBaselineNodes: VisualNodeItem[] = [
  {
    id: 'base-ordinary',
    label: 'Ordinary Activity',
    sub: 'Known Operational Baseline',
    badge: 'Baseline ✓',
    description: 'You cannot spot an anomaly without knowing what normal looks like: everyday system bootups, standard office logins, and file saves.',
    details: 'NIST SP 800-137 defines operational baselines as documented patterns against which subsequent deviations are objectively compared.',
    tags: ['Baseline', 'Normal', 'NIST'],
  },
  {
    id: 'base-observe',
    label: 'Disciplined Observation',
    sub: 'Fact-Based Inspection',
    badge: 'Observation',
    description: 'Carefully observe hardware status, active processes, and timestamped event records without altering the machine state.',
    details: 'Analysts maintain disciplined restraint: observe, record observable facts, and verify before reaching any conclusion.',
    tags: ['Inspection', 'Evidence', 'Restraint'],
  },
  {
    id: 'base-verify',
    label: 'Record & Verify',
    sub: 'Observable Evidence Docket',
    badge: 'Docket',
    description: 'Document factual observables (timestamps, usernames, hostnames, IP addresses) in a structured triage docket.',
    details: 'Verifiable evidence ensures another analyst can review your case notes and arrive at the exact same conclusion.',
    tags: ['Verification', 'Docket', 'Facts'],
  },
  {
    id: 'base-anomaly',
    label: 'Anomaly Detection Gate',
    sub: 'Threshold Deviation Signal',
    badge: 'Detection ▲',
    description: 'Security rules compare incoming telemetry against the baseline to detect true operational deviations and lateral intrusions.',
    details: 'When an activity exceeds baseline thresholds (e.g. 03:00 AM off-hours login), the system routes an alert to the L1 queue.',
    tags: ['Threshold', 'Anomaly', 'Alert'],
  },
];

// --- UNIT 1: CHAPTER 2: The centre and its people ---
// 4. The 6 Teaching Zones
export const teachingZonesMapNodes: VisualNodeItem[] = [
  {
    id: 'zone-support',
    label: 'Zone 1: Staff Support',
    sub: 'Hardware & Desktop Peripherals',
    badge: 'Helpdesk',
    description: 'Manages physical workstation setups, damaged keyboards, monitor replacements, and general employee IT helpdesk tickets.',
    details: 'If an employee spills tea on their keyboard, Staff Support handles peripheral replacement—not the cybersecurity SOC.',
    tags: ['Helpdesk', 'Hardware', 'Peripherals'],
  },
  {
    id: 'zone-computing',
    label: 'Zone 2: Computing',
    sub: 'Workstations & Operating Systems',
    badge: 'Endpoints',
    description: 'Oversees enterprise endpoint devices, operating system images, local drivers, and standard desktop application deployments.',
    details: 'System administrators in Computing ensure laptops receive required OS security patches and baseline software.',
    tags: ['Endpoints', 'Workstations', 'OS'],
  },
  {
    id: 'zone-network',
    label: 'Zone 3: Network Services',
    sub: 'Switches, Routers & Cabling',
    badge: 'Network',
    description: 'Maintains campus Ethernet cabling, core switches, Wi-Fi access points, VLAN segmentation, and edge gateway routing.',
    details: 'When an Ethernet port flaps or a core switch link disconnects, Network Services investigates physical layer connectivity.',
    tags: ['Switches', 'VLAN', 'Routing'],
  },
  {
    id: 'zone-identity',
    label: 'Zone 4: Identity Services',
    sub: 'User Accounts & Authentication',
    badge: 'IAM',
    description: 'Manages Active Directory credentials, domain accounts, password unlocks, and multi-factor authentication (MFA) tokens.',
    details: 'When an employee forgets their password, Identity Services validates their employee ID and resets credentials.',
    tags: ['IAM', 'Credentials', 'MFA'],
  },
  {
    id: 'zone-soc',
    label: 'Zone 5: Security Monitoring',
    sub: 'The SOC (Your Home)',
    badge: 'SOC Triage',
    description: 'Continuously monitors security telemetry, SIEM queues, firewall drops, and EDR detection feeds across all zones.',
    details: 'Your operational home. Ingests signals, analyzes threat behaviors, and coordinates with service owners during incidents.',
    tags: ['SOC', 'Telemetry', 'SIEM'],
  },
  {
    id: 'zone-response',
    label: 'Zone 6: Response Coordination',
    sub: 'Playbooks & Containment',
    badge: 'Response',
    description: 'Executes formal containment playbooks, evidence preservation, host isolation, and post-incident recovery coordination.',
    details: 'Collaborates with system owners to quarantine compromised devices and remediate root causes without business disruption.',
    tags: ['Containment', 'Playbooks', 'Recovery'],
  },
];

// 5. SOC Demarcation
export const socDemarcationNodes: VisualNodeItem[] = [
  {
    id: 'demarc-soc-does',
    label: 'What the SOC Does',
    sub: '24/7 Security Telemetry & Triage',
    badge: 'Core Scope ✓',
    description: 'The SOC monitors security telemetry, investigates anomalous alerts, correlates log streams, and documents triage dockets.',
    details: 'Functions as the vigilant watchtower: detecting unauthorized access, lateral movement, malware execution, and policy violations.',
    tags: ['Monitoring', 'Triage', 'Correlation'],
  },
  {
    id: 'demarc-coord',
    label: 'Coordinating Role',
    sub: 'Cross-Functional Collaboration',
    badge: 'Bridge ✓',
    description: 'Coordinates with asset and service owners: keeping administrators informed while analyzing security events on their systems.',
    details: 'Mentor Ananya emphasizes: "Cooperation matters more than pretending one team knows everything."',
    tags: ['Cooperation', 'Asset Owners', 'Communication'],
  },
  {
    id: 'demarc-not-helpdesk',
    label: 'Not IT Helpdesk',
    sub: 'No Physical Hardware Repairs',
    badge: 'Boundary ✕',
    description: 'The SOC does not repair broken hardware, fix jammed office printers, or configure external display monitors.',
    details: 'Routine desktop troubleshooting belongs strictly to Staff Support, allowing analysts to maintain uninterrupted threat vigilance.',
    tags: ['Boundary', 'Helpdesk', 'Hardware'],
  },
  {
    id: 'demarc-not-admin',
    label: 'Not Service Owner',
    sub: 'No Application/Database Ownership',
    badge: 'Boundary ✕',
    description: 'The SOC does not rewrite financial software, manage payroll databases, or administer individual corporate email inboxes.',
    details: 'NIST SP 800-53 AC-5 mandates role demarcation to maintain independent security oversight without operational conflict.',
    tags: ['Demarcation', 'NIST', 'Role Separation'],
  },
];

// 6. Cross-Team Ticket Routing
export const crossTeamRoutingNodes: VisualNodeItem[] = [
  {
    id: 'route-tea-keyboard',
    label: 'Tea Spilled on Keyboard',
    sub: 'Desk 12 Peripheral Failure',
    badge: 'Staff Support',
    description: 'A physical device failure requiring hardware inspection and keyboard replacement.',
    details: 'Action: Automatically routed to Staff Support helpdesk. No cybersecurity investigation or SOC triage docket needed.',
    tags: ['Peripherals', 'Staff Support', 'Routine'],
  },
  {
    id: 'route-pwd-reset',
    label: 'Forgotten Password Reset',
    sub: 'Locked User Domain Account',
    badge: 'Identity IAM',
    description: 'User locked out after exceeding failed password attempts during regular morning office hours.',
    details: 'Action: Routed to Identity Services (IAM) for employee identity verification and self-service password reset issuance.',
    tags: ['Identity', 'Password', 'IAM'],
  },
  {
    id: 'route-port-flap',
    label: 'Switch Port Link Flapping',
    sub: 'Floor 2 Ethernet Instability',
    badge: 'Network Services',
    description: 'Physical Layer 1 Ethernet cable issue or intermittent switch interface negotiation drops.',
    details: 'Action: Routed to Network Services engineering to replace patch cable and inspect switch port diagnostics.',
    tags: ['Network', 'Cabling', 'Switches'],
  },
  {
    id: 'route-alert-3am',
    label: 'Suspicious 03:00 AM Login',
    sub: 'Off-Hours Telemetry Spike',
    badge: 'SOC Queue ▲',
    description: 'High-severity anomaly: Account FIN-OPS-01 authenticated from an external IP address outside normal shift hours.',
    details: 'Action: Routed immediately to Security Monitoring (SOC) triage console for L1 investigation and entity verification.',
    tags: ['SOC Alert', 'Anomaly', 'High Severity'],
  },
];

// --- UNIT 2: CHAPTER 1: Your practice space ---
// 7. Blue-Bordered Console
export const blueBorderConsoleNodes: VisualNodeItem[] = [
  {
    id: 'border-blue',
    label: 'Blue Console Frame',
    sub: 'Visual Safety Indicator',
    badge: 'Safe Sandbox ✓',
    description: 'A prominent blue border encases your learning console, confirming you are operating inside an authorized simulation environment.',
    details: 'Distinguishes safe training exercises from live production systems, giving learners confidence to experiment without anxiety.',
    tags: ['Safety', 'Sandbox', 'Visual Cue'],
  },
  {
    id: 'border-desktop',
    label: 'Simulated Workstation',
    sub: 'Realistic Practice Desktop',
    badge: 'Practice OS',
    description: 'Fully interactive virtual practice desktop equipped with realistic security telemetry logs, terminal CLI, and analysis tools.',
    details: 'Supplies authentic enterprise operating system controls while isolating all processes from external networks.',
    tags: ['Simulation', 'Terminal', 'Workstation'],
  },
  {
    id: 'border-red-door',
    label: 'Locked Heavy Door',
    sub: 'Live Production Enterprise',
    badge: 'Production ✕',
    description: 'Represents live organizational servers and production banking databases where unapproved testing is strictly forbidden.',
    details: 'Permissions granted for training exercises never extend to production systems, college networks, or outside servers.',
    tags: ['Production', 'Boundary', 'Restricted'],
  },
  {
    id: 'border-safety-check',
    label: 'Scope Boundary Check',
    sub: 'Operational Discipline',
    badge: 'Doctrine',
    description: 'Disciplined habit: Always verify the blue border is present and confirm target scope before launching any scan or script.',
    details: 'Mentor Ravi teaches: "Stop and ask whenever the lab boundary is unclear."',
    tags: ['Scope', 'Discipline', 'Ravi'],
  },
];

// 8. Host-Only VM Isolation
export const hostOnlyVmIsolationNodes: VisualNodeItem[] = [
  {
    id: 'vm-hypervisor',
    label: 'Physical Host Hypervisor',
    sub: 'Underlying Compute Silicon',
    badge: 'Hardware',
    description: 'The physical computer hardware and virtualization hypervisor running the training virtual machines.',
    details: 'Manages physical CPU scheduling and memory allocation for safe guest execution.',
    tags: ['Hypervisor', 'Hardware', 'Host'],
  },
  {
    id: 'vm-sandbox',
    label: 'Isolated Sandbox VM',
    sub: 'Guest Training Operating System',
    badge: 'Guest OS',
    description: 'A software computer running inside physical hardware. Feels like a real PC with its own files, registry, and kernel.',
    details: 'Mentor Ravi warns: "A virtual machine is not automatically a safety barrier if network adapters are misconfigured."',
    tags: ['Virtual Machine', 'Guest OS', 'Sandbox'],
  },
  {
    id: 'vm-host-only',
    label: 'Host-Only Network Adapter',
    sub: 'Isolated Virtual Switch',
    badge: 'Active Barrier ✓',
    description: 'Restricts VM communications exclusively to local simulated nodes; all outbound internet and campus Wi-Fi access are disabled.',
    details: 'RFC 1918 private virtual switch ensures practice payloads and network probes can never escape into production networks.',
    tags: ['Host-Only', 'Isolation', 'RFC 1918'],
  },
  {
    id: 'vm-bridged-danger',
    label: 'Bridged Mode (PROHIBITED)',
    sub: 'Leaking to Campus Wi-Fi',
    badge: 'Danger ▲',
    description: 'Bridged network mode shares the physical network card with the host, risking accidental traffic leaks to production LANs.',
    details: 'Never switch a lab virtual machine to bridged mode without explicit, formal written authorization from senior mentors.',
    tags: ['Bridged Mode', 'Prohibited', 'Leak Risk'],
  },
];

// 9. Snapshot Rollback
export const snapshotRollbackNodes: VisualNodeItem[] = [
  {
    id: 'snap-clean',
    label: 'Clean Baseline Snapshot',
    sub: 'Golden Master State Image',
    badge: 'Baseline Image',
    description: 'A pristine, mathematically verified virtual disk state captured before opening any practice exercise or sample.',
    details: 'Provides a zero-risk safety net: whatever happens during analysis, the clean baseline remains permanently preserved.',
    tags: ['Snapshot', 'Golden Image', 'Clean State'],
  },
  {
    id: 'snap-practice',
    label: 'Practice Execution',
    sub: 'Testing Commands & Artifacts',
    badge: 'Active Lab',
    description: 'Learners execute triage commands, parse messy log files, and test security scripts freely without fear of mistakes.',
    details: 'Safe hands-on practice builds real muscle memory far faster than purely passive textbook reading.',
    tags: ['Hands-On', 'Practice', 'Execution'],
  },
  {
    id: 'snap-revert',
    label: 'Instant Rollback',
    sub: 'One-Click State Restore',
    badge: 'Rollback ✓',
    description: 'A single restore command discards all changes and rolls the virtual machine back to the pristine clean baseline in seconds.',
    details: 'Eliminates anxiety: if a configuration breaks or test logs become corrupted, instant rollback restores perfection.',
    tags: ['Recovery', 'Rollback', 'Restore'],
  },
  {
    id: 'snap-scope',
    label: 'Authorization Scope',
    sub: 'ISO/IEC 27001 Lab Boundary',
    badge: 'Scope Boundary',
    description: 'Documented perimeter within which learning activities are explicitly permitted by organizational leadership.',
    details: 'Permission for lab exercises stays strictly within the lab environment; pointing tools at outside networks is prohibited.',
    tags: ['ISO 27001', 'Scope', 'Authorization'],
  },
];

// --- UNIT 2: CHAPTER 2: A clue worth preserving ---
// 10. Evidence Integrity & Hashing
export const evidenceIntegrityHashNodes: VisualNodeItem[] = [
  {
    id: 'evid-raw-log',
    label: 'auth_raw.log',
    sub: 'Master Evidence Source',
    badge: 'Master Source',
    description: 'Original raw log file captured from the workstation containing messy, unformatted events from the incident window.',
    details: 'Mentor Ananya defines evidence: "Evidence is information another analyst can inspect, not just your memory of what happened."',
    tags: ['Raw Log', 'Evidence', 'Source'],
  },
  {
    id: 'evid-read-only',
    label: 'Read-Only Attribute Lock',
    sub: 'Write Protection Security',
    badge: 'Locked ✓',
    description: 'File system permissions locked to read-only; analysts must never edit, reformat, or "tidy up" lines in the original master.',
    details: 'Tidying up an original log permanently destroys forensic validity and invalidates the evidentiary chain in legal reviews.',
    tags: ['Read-Only', 'Protection', 'Integrity'],
  },
  {
    id: 'evid-hash',
    label: 'Cryptographic SHA-256 Hash',
    sub: 'Mathematical Fingerprint Seal',
    badge: 'Hash Seal',
    description: 'Cryptographic hash generated immediately upon acquisition (e.g. e3b0c44298fc1c149afbf4c8996fb924...).',
    details: 'Proves mathematically that not a single byte, space, or timestamp has been modified since initial collection.',
    tags: ['SHA-256', 'Checksum', 'Fingerprint'],
  },
  {
    id: 'evid-chain',
    label: 'Evidentiary Chain',
    sub: 'NIST SP 800-86 Audit Trail',
    badge: 'Audit Proof',
    description: 'Documented chain of custody ensuring any independent auditor can inspect the pristine file and verify findings.',
    details: 'Maintains organizational credibility: professional investigations stand on verifiable facts, not analyst memory.',
    tags: ['NIST', 'Audit Trail', 'Chain of Custody'],
  },
];

// 11. Working Copies & Audit Notes
export const workingCopyAuditNodes: VisualNodeItem[] = [
  {
    id: 'copy-master',
    label: 'Untouched Master Archive',
    sub: 'auth_raw.log (Locked)',
    badge: 'Archived',
    description: 'Preserved untouched in secure storage with recorded acquisition timestamp and cryptographic checksum.',
    details: 'Safe in the digital vault: guarantees the original source evidence remains available for formal forensic verification.',
    tags: ['Master', 'Archive', 'Untouched'],
  },
  {
    id: 'copy-duplicate',
    label: 'auth_working_copy.log',
    sub: 'Bit-for-Bit Working Duplicate',
    badge: 'Working Copy ✓',
    description: 'Exact working copy where analysts can highlight lines, search keywords, filter event IDs, and extract observables freely.',
    details: 'ISO/IEC 27037 standard: all triage, filtering, and text manipulation must be executed exclusively on working duplicates.',
    tags: ['Duplicate', 'Working Copy', 'ISO 27037'],
  },
  {
    id: 'copy-metadata',
    label: 'Collection Metadata',
    sub: 'Who, Where & When (UTC)',
    badge: 'Metadata',
    description: 'Mandatory documentation record: Collector identity, source hostname (BLR-BR-WS-04), acquisition timestamp, and tool version.',
    details: 'Every piece of collected telemetry must include exact timestamps and time zone specifications to prevent chronological errors.',
    tags: ['Metadata', 'Timestamp', 'UTC'],
  },
  {
    id: 'copy-logbook',
    label: 'Analyst Case Logbook',
    sub: 'Sequential Triage Actions',
    badge: 'Docket Notes',
    description: 'Chronological record of every command executed, filter applied, and observable verified during the investigation.',
    details: 'Disciplined notes allow incoming shift analysts to resume triage seamlessly without repeating previous steps.',
    tags: ['Logbook', 'Case Notes', 'Shift Handover'],
  },
];

// 12. The Safe Pause Protocol
export const safePauseProtocolNodes: VisualNodeItem[] = [
  {
    id: 'pause-trigger',
    label: 'Unfamiliar Instruction',
    sub: 'Risk of Data Destruction',
    badge: 'Risk Trigger ▲',
    description: 'Encountering an unfamiliar CLI command, script, or configuration setting that carries potential risk of deleting data.',
    details: 'Common scenario for apprentice analysts: feeling pressure to act quickly when an urgent prompt appears.',
    tags: ['CLI', 'Unfamiliar', 'Risk'],
  },
  {
    id: 'pause-halt',
    label: 'The Safe Pause',
    sub: 'Stop & Freeze Current Display',
    badge: 'Halt Execution',
    description: 'Do not press Enter or make an intuitive guess. Stop all interaction and keep current terminal output on screen.',
    details: 'CDAC-SOP-EVID-02: A safe pause is always superior to an irreversible, destructive guess.',
    tags: ['Safe Pause', 'Halt', 'Restraint'],
  },
  {
    id: 'pause-record',
    label: 'Record Visible Observables',
    sub: 'Screenshot & Error Capture',
    badge: 'Document',
    description: 'Take detailed notes and capture exact error messages, command strings, file paths, and system prompts.',
    details: 'Provides clear context so senior mentors can see exactly what the machine is reporting without guessing.',
    tags: ['Screenshot', 'Observables', 'Notes'],
  },
  {
    id: 'pause-consult',
    label: 'Consult Mentor Ananya',
    sub: 'Senior Guidance & Resolution',
    badge: 'Safe Path ✓',
    description: 'Contact shift lead Ananya with recorded observables: "Here is what appeared, and here is why I paused."',
    details: 'Ananya approves: "Excellent restraint. Here is the verified command to proceed safely without risk."',
    tags: ['Mentor', 'Resolution', 'Safety'],
  },
];

// --- UNIT 3: CHAPTER 1: The service we will follow ---
// 13. Branch Finance Support Service
export const branchFinanceServiceNodes: VisualNodeItem[] = [
  {
    id: 'svc-overview',
    label: 'Branch Finance Support',
    sub: 'Business Service Context',
    badge: 'Service',
    description: 'Our recurring course business scenario: handles regional staff portals, daily branch invoices, and shared accounting files.',
    details: 'Provides consistent operational context across 15 modules so learners follow a realistic, interconnected investigation.',
    tags: ['Finance', 'Business Service', 'Scenario'],
  },
  {
    id: 'svc-portal',
    label: 'Staff Accounting Portal',
    sub: 'Web Application & Database',
    badge: 'Web Portal',
    description: 'Internal web portal used by Bengaluru branch finance staff to submit expense claims and verify vendor payments.',
    details: 'Communicates over HTTPS to backend database servers, emitting web access logs and authentication telemetry.',
    tags: ['Web App', 'Accounting', 'HTTPS'],
  },
  {
    id: 'svc-shared-docs',
    label: 'Shared Document Share',
    sub: 'Network SMB File Storage',
    badge: 'File Share',
    description: 'Departmental network file share holding financial spreadsheets, customer invoice PDFs, and monthly ledger records.',
    details: 'Target of frequent security monitoring: anomalous after-hours mass downloads trigger high-priority alerts.',
    tags: ['SMB', 'File Share', 'Documents'],
  },
  {
    id: 'svc-telemetry',
    label: 'Continuous Service Telemetry',
    sub: 'Audit Event Streams',
    badge: 'Telemetry',
    description: 'All workstations and servers supporting the finance service generate continuous Sysmon, Windows Event, and network logs.',
    details: 'Feeds the central SIEM indexer, giving L1 analysts complete visibility into everyday operations and unusual anomalies.',
    tags: ['Telemetry', 'SIEM', 'Logs'],
  },
];

// 14. Entity Separation Grid
export const entitySeparationGridNodes: VisualNodeItem[] = [
  {
    id: 'ent-account',
    label: 'User Account: FIN-OPS-01',
    sub: 'Digital Security Credential',
    badge: 'Credential Token',
    description: 'An Active Directory security credential used to log into financial services. An account is an identity token, NOT a physical computer.',
    details: 'ISO/IEC 24760-1: A credential establishes claimed identity; it does not prove who was physically typing at the keyboard.',
    tags: ['Account', 'FIN-OPS-01', 'Credential'],
  },
  {
    id: 'ent-host',
    label: 'Workstation: BLR-BR-WS-04',
    sub: 'Physical Endpoint Hardware',
    badge: 'Physical Host',
    description: 'The physical desktop computer sitting on desk 4 at the Bengaluru branch. Has its own CPU, RAM, SSD, and local operating system.',
    details: 'CIS Controls: Endpoint asset tracking identifies the physical silicon where processes execute and logs are created.',
    tags: ['Host', 'BLR-BR-WS-04', 'Endpoint'],
  },
  {
    id: 'ent-ip',
    label: 'Network IP: 10.10.20.15',
    sub: 'Dynamic DHCP Leased Address',
    badge: 'Network Address',
    description: 'Temporary IP address currently leased to the workstation by the branch DHCP router on VLAN 20.',
    details: 'IP addresses are dynamic: tomorrow this exact same IP could be leased to a different laptop or printer on the floor.',
    tags: ['IP Address', '10.10.20.15', 'DHCP'],
  },
  {
    id: 'ent-human',
    label: 'Human User (At Keyboard)',
    sub: 'Employee Sharma vs Impostor',
    badge: 'Human Entity',
    description: 'The real-world person operating the computer. An account login does NOT prove which specific human was at the keyboard.',
    details: 'Disciplined analysts record: "Activity occurred under account FIN-OPS-01", never jumping to unproven personal accusations.',
    tags: ['Human', 'Identity', 'Forensic Restraint'],
  },
];

// 15. Disciplined Observables vs Speculation
export const disciplinedObservablesNodes: VisualNodeItem[] = [
  {
    id: 'obs-raw-event',
    label: 'Raw Security Event',
    sub: 'Windows Event ID 4624 (Logon)',
    badge: 'Raw Telemetry',
    description: 'Security log records: Successful logon under account FIN-OPS-01 from host BLR-BR-WS-04 at 02:14 UTC.',
    details: 'Objective observable captured by the operating system security subsystem and forwarded to the central SIEM.',
    tags: ['Event 4624', 'Logon', 'Raw Data'],
  },
  {
    id: 'obs-disciplined',
    label: 'Disciplined Observable',
    sub: 'Verifiable Factual Statement',
    badge: 'Disciplined ✓',
    description: '"Activity was recorded under account FIN-OPS-01 on endpoint BLR-BR-WS-04 at 02:14 UTC." 100% factual and audit-proof.',
    details: 'States observable facts precisely without embellishment or premature assumptions about human motives.',
    tags: ['Facts', 'Audit-Proof', 'Precision'],
  },
  {
    id: 'obs-speculation',
    label: 'Speculative Leap (AVOID)',
    sub: 'Unverified Personal Accusation',
    badge: 'Speculation ✕',
    description: '"Employee Sharma personally sat at desk 4 at 2 AM to steal accounting documents." Unsubstantiated and unprofessional.',
    details: 'Speculative leaps damage investigations, falsely accuse innocent staff, and overlook credential theft or automated malware.',
    tags: ['Speculation', 'Prohibited', 'Bias'],
  },
  {
    id: 'obs-verification',
    label: 'Corroboration Step',
    sub: 'Physical Badge & Proxy Review',
    badge: 'Corroboration',
    description: 'Cross-reference physical campus turnstile badge swipes and network proxy logs before drawing human conclusions.',
    details: 'If physical badge logs show Sharma was not in the building, the event immediately indicates compromised credentials!',
    tags: ['Badge Logs', 'Verification', 'Corroboration'],
  },
];

// --- UNIT 3: CHAPTER 2: The route from beginner to L1 ---
// 16. The 15-Module Curriculum Roadmap
export const curriculumRoadmapNodes: VisualNodeItem[] = [
  {
    id: 'road-foundations',
    label: 'Foundations (M00 - M03)',
    sub: 'Orientation, Computers & Networks',
    badge: 'Stage 1: Foundations',
    description: 'Master computer hardware, operating system kernels, account boundaries, TCP/IP networking, and cybersecurity doctrine.',
    details: 'Builds the unbreakable technical bedrock required to understand ordinary enterprise operations before investigating anomalies.',
    tags: ['Hardware', 'OS', 'Networking'],
  },
  {
    id: 'road-triage-siem',
    label: 'Triage & SIEM (M04 - M06)',
    sub: 'Alert Queues, Ingestion & Queries',
    badge: 'Stage 2: SIEM & Triage',
    description: 'Investigate live alert queues, parse Sysmon telemetry, construct precise SIEM search queries, and document 5 Ws case notes.',
    details: 'Hands-on triage skills: filtering event IDs, calculating time windows, and separating true positives from false alarms.',
    tags: ['SIEM', 'Triage', 'KQL'],
  },
  {
    id: 'road-sensors',
    label: 'Monitoring & EDR (M07 - M10)',
    sub: 'Zeek, EDR, Windows & Linux',
    badge: 'Stage 3: Deep Telemetry',
    description: 'Analyze network wire taps (Zeek), behavioral EDR sensors, Windows security events, Linux auth logs, and industrial telemetry.',
    details: 'Deep operational defense: tracing process trees, spotting socket beacons, and verifying sensor health across enterprise fleets.',
    tags: ['Zeek', 'EDR', 'Linux'],
  },
  {
    id: 'road-capstone',
    label: 'Intel & Handover (M11 - M14)',
    sub: 'Threat Intel, ATT&CK & Capstone',
    badge: 'Stage 4: L1 Mastery',
    description: 'Correlate MITRE ATT&CK techniques, validate threat intelligence, automate SOAR playbooks, and execute structured shift handovers.',
    details: 'Final milestone: Autonomous execution within an L1 SOC playbook, delivering structured evidence-based case handovers.',
    tags: ['MITRE ATT&CK', 'SOAR', 'Shift Handover'],
  },
];

// 17. The 4-Section Learning Engine
export const fourSectionEngineNodes: VisualNodeItem[] = [
  {
    id: 'sec1-theory',
    label: 'Section 1: Theory Briefing',
    sub: 'Mentor Dialogue & Plain English',
    badge: 'Theory',
    description: 'Opening dialogue with mentors Ananya and Ravi, relatable everyday analogies, technical mechanics, and formal NIST/ISO standards.',
    details: 'Establishes clear mental models before touching tools, ensuring learners understand why each system exists.',
    tags: ['Theory', 'Mentors', 'NIST'],
  },
  {
    id: 'sec2-visual',
    label: 'Section 2: Animated Visual Story',
    sub: 'Vector Diagrams & Telemetry HUD',
    badge: 'Visual Story',
    description: 'High-fidelity animated vector diagrams illustrating data pipelines, network flows, and entity relationships in action.',
    details: 'Allows visual learners to see telemetry moving across switches, operating systems, and security consoles in real time.',
    tags: ['Visual', 'Flow Diagrams', 'Animation'],
  },
  {
    id: 'sec3-activity',
    label: 'Section 3: Interactive Activity',
    sub: 'Hands-On Evidence Sandboxes',
    badge: 'Hands-On',
    description: 'Interactive matchers, boundary sorters, and simulated triage tools where learners practice concepts without fear of errors.',
    details: 'Active retention: drag-and-drop matching, request routing, and diagnostic checks cement conceptual muscle memory.',
    tags: ['Interactive', 'Matching', 'Sandbox'],
  },
  {
    id: 'sec4-check',
    label: 'Section 4: Knowledge Check',
    sub: 'Retention & Practical Scenarios',
    badge: 'Knowledge Check',
    description: 'Scenario-based evaluation questions validating core retention, entity separation, and disciplined triage doctrine.',
    details: 'Instant feedback reinforces correct operational habits and awards XP progression toward unit mastery badges.',
    tags: ['Evaluation', 'Retention', 'XP'],
  },
];

// 18. Fading Scaffolding & L1 Readiness
export const fadingScaffoldingL1Nodes: VisualNodeItem[] = [
  {
    id: 'scaf-initial',
    label: 'Guided Orientation',
    sub: 'Extensive Mentor Support',
    badge: 'Apprentice',
    description: 'Mentors explain every click, concept, and system boundary, providing rich scaffolding and analogies for complete beginners.',
    details: 'High-support phase: builds foundational confidence so non-IT learners never feel lost or overwhelmed.',
    tags: ['Mentoring', 'Scaffolding', 'Beginner'],
  },
  {
    id: 'scaf-fading',
    label: 'Fading Scaffolding',
    sub: 'Systematic Guidance Reduction',
    badge: 'Intermediate',
    description: 'Hints and step-by-step prompts gradually taper off as learner competence grows through Modules 04 to 10.',
    details: 'NIST NICE framework principle: learners take greater investigative initiative as analytical instincts solidify.',
    tags: ['Fading', 'Competence', 'Growth'],
  },
  {
    id: 'scaf-autonomous',
    label: 'Autonomous L1 Readiness',
    sub: 'Standard Operating Playbooks',
    badge: 'L1 Ready ✓',
    description: 'By Module 14, learners triage alerts, document 5 Ws, and escalate incidents smoothly using standard operating procedures.',
    details: 'Demonstrates proven readiness to step onto an operations floor and follow real-world supervisor playbooks with discipline.',
    tags: ['Autonomous', 'SOP', 'Playbook'],
  },
  {
    id: 'scaf-destination',
    label: 'The True Destination',
    sub: 'Evidence-Based Beginner L1 Practice',
    badge: 'Mission Complete',
    description: 'Your goal is evidence-based beginner L1 practice—not instant perfection, but trustworthy, disciplined analytical rigor.',
    details: 'Course develops core operational capabilities; workplace authorization and external certifications are separate formal steps.',
    tags: ['Destination', 'Integrity', 'L1 Analyst'],
  },
];

// Map of all Module 00 styles to node collections
export const module00NodesMap: Record<string, VisualNodeItem[]> = {
  'm00-campus-reception': campusReceptionNodes,
  'm00-cardinal-rule': cardinalRuleNodes,
  'm00-operational-baseline': operationalBaselineNodes,
  'm00-teaching-zones-map': teachingZonesMapNodes,
  'm00-soc-demarcation': socDemarcationNodes,
  'm00-cross-team-routing': crossTeamRoutingNodes,
  'm00-blue-border-console': blueBorderConsoleNodes,
  'm00-host-only-vm-isolation': hostOnlyVmIsolationNodes,
  'm00-snapshot-rollback': snapshotRollbackNodes,
  'm00-evidence-integrity-hash': evidenceIntegrityHashNodes,
  'm00-working-copy-audit': workingCopyAuditNodes,
  'm00-safe-pause-protocol': safePauseProtocolNodes,
  'm00-branch-finance-service': branchFinanceServiceNodes,
  'm00-entity-separation-grid': entitySeparationGridNodes,
  'm00-disciplined-observables': disciplinedObservablesNodes,
  'm00-curriculum-roadmap-15': curriculumRoadmapNodes,
  'm00-four-section-engine': fourSectionEngineNodes,
  'm00-fading-scaffolding-l1': fadingScaffoldingL1Nodes,
};
