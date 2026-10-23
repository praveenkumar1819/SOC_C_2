'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 14: INCIDENT RESPONSE & SOC DOCUMENTATION
// Mentors: Mentors Ananya & Meera (Senior Incident Responders & Threat Hunters)
// Shift Team: Mentor Ananya, Mentor Meera, Analyst Priya, IT Admin Rajesh
// Systems: CDAC-BLR-WS-12, CDAC-BLR-WS-13, CDAC-BLR-WS-02, CDAC-BLR-WS-03,
//          Domain Controller CDAC-BLR-DC01, Zeek-TAP-01, TheHive/Jira Case #2026-881
// =============================================================================

// =============================================================================
// UNIT 1: INCIDENT RESPONSE LIFECYCLE
// =============================================================================

// -----------------------------------------------------------------------------
// Chapter 1: Preparation, detection, response and recovery (M14-U1-C1)
// -----------------------------------------------------------------------------

// Pillar 1: NIST & SANS IR Lifecycle Engine
export const nistSansLifecycleNodes: VisualNodeItem[] = [
  {
    id: 'ir-prep-phase',
    label: 'Phase 1: Preparation',
    sub: 'Pre-Incident Readiness',
    badge: 'PROACTIVE FOUNDATION',
    description: 'Hardening systems, defining escalation playbooks, configuring telemetry sensors, and establishing contact trees before an attack occurs.',
    details: 'Mentor Meera notes: "You cannot respond effectively to an incident if your tools are not configured, your logs are not synchronized, and your analysts do not know whom to call."',
    tags: ['NIST SP 800-61r2', 'SANS IR Step 1', 'Sensor Baseline', 'Playbook Vault'],
  },
  {
    id: 'ir-detect-phase',
    label: 'Phase 2: Detection & Analysis',
    sub: 'L1 Triage & Scoping',
    badge: 'CORE L1 OPERATIONAL ARENA',
    description: 'Ingesting alerts from SIEM/EDR, validating indicators against baselines, scoping affected entities (the 5 Ws), and triaging severity.',
    details: 'Ananya teaches: "Phase 2 is the primary domain of Tier-1 analysts. Your objective is not root-cause forensics; it is rapid validation, entity scoping, and false-positive filtering."',
    tags: ['Alert Ingestion', '5 Ws Scoping', 'False Positive Filter', 'Severity Triage'],
  },
  {
    id: 'ir-contain-phase',
    label: 'Phase 3: Containment, Eradication & Recovery',
    sub: 'Damage Mitigation & Remediation',
    badge: 'L2 / IR LEAD DISPATCH',
    description: 'Isolating compromised hosts, revoking stolen credentials, scrubbing malicious artifacts, and restoring services from verified clean backups.',
    details: 'Coordinated between L2 incident responders, system administrators, and infrastructure teams under explicit change authorization.',
    tags: ['Host Isolation', 'Credential Revocation', 'Artifact Scrubbing', 'Clean Restoration'],
  },
  {
    id: 'ir-post-phase',
    label: 'Phase 4: Post-Incident Activity',
    sub: 'Lessons Learned & Remediation',
    badge: 'BLAMELESS POST-MORTEM',
    description: 'Conducting blameless retrospective reviews, closing detection gaps, updating detection rules, and documenting root-cause findings.',
    details: 'Ensures the SOC learns from every security event so identical adversary tradecraft cannot penetrate the enterprise a second time.',
    tags: ['Blameless Review', 'Rule Engineering', 'Detection Gap Fix', 'Process Improvement'],
  },
];

// Pillar 2: Detection & Analysis Triage Gates
export const detectionAnalysisGatesNodes: VisualNodeItem[] = [
  {
    id: 'det-alert-ingest',
    label: '1. Ingestion Gate',
    sub: 'SIEM & EDR Queue Influx',
    badge: 'TRIGGER EVENT',
    description: 'Raw alert arrives in the centralized queue: Host CDAC-BLR-WS-12 flags suspicious parent-child process execution via Sysmon Event 1.',
    details: 'Analyst Priya claims the ticket within the 5-minute SLA window, timestamping the formal triage start in Case #2026-881.',
    tags: ['Sysmon Event 1', 'Zeek Alert', 'SLA Clock Active', 'Ticket Assigned'],
  },
  {
    id: 'det-scope-5ws',
    label: '2. Entity Scoping Gate',
    sub: 'The 5 Ws Inspection',
    badge: 'CONTEXT RESOLUTION',
    description: 'Correlating the affected workstation CDAC-BLR-WS-12 with Active Directory user b_sharma and IP address 10.0.4.21.',
    details: 'Determines whether the compromised endpoint is an isolated developer lab workstation or a high-value finance management server.',
    tags: ['Asset Identity', 'User Context', 'Network Zone', 'Criticality Rating'],
  },
  {
    id: 'det-fp-filter',
    label: '3. Verification Gate',
    sub: 'Baseline & IT Validation',
    badge: 'DISPOSITION TEST',
    description: 'Cross-referencing observed execution against internal IT maintenance tickets, change management windows, and known administrative scripts.',
    details: 'Verifies whether admin Rajesh opened a change ticket or if the activity represents unauthorized adversary execution.',
    tags: ['Change Windows', 'SOP Baseline', 'Admin Ticket Check', 'False Positive Gate'],
  },
  {
    id: 'det-contain-gate',
    label: '4. Containment Gate',
    sub: 'Pre-Containment Docket',
    badge: 'ESCALATION HANDOFF',
    description: 'Assembling verified indicators into an actionable escalation package for L2 responders with recommended network isolation.',
    details: 'Ananya verifies: "A containment request must state exact asset hostname, IP, evidence hash, and tested reversal script."',
    tags: ['Isolation Request', 'Evidence Bundle', 'Reversal Script', 'Senior Handoff'],
  },
];

// Pillar 3: Preparation Foundations & Pre-Incident Readiness
export const preparationFoundationsNodes: VisualNodeItem[] = [
  {
    id: 'prf-clock-sync',
    label: 'NTP Master Clock Sync',
    sub: 'Global UTC Baseline',
    badge: 'FORENSIC INTEGRITY',
    description: 'Synchronizing all domain controllers, servers, routers, and endpoints to authorized Stratum-1 atomic NTP servers in UTC.',
    details: 'Meera stresses: "A 5-minute clock drift across your firewalls and endpoints destroys forensic timeline correlation in court."',
    tags: ['Stratum-1 NTP', 'UTC Alignment', 'Zero Clock Skew', 'Courtroom Standard'],
  },
  {
    id: 'prf-log-health',
    label: 'Sensor Pipeline Health',
    sub: 'Sysmon, Zeek & Auditd',
    badge: 'TELEMETRY VAULT',
    description: 'Continuous monitoring of log forwarder agents, buffer capacity, and endpoint event collection rates to prevent log blackout blindspots.',
    details: 'Alerts trigger if any production server stops forwarding Windows Security Event logs for more than 180 seconds.',
    tags: ['Forwarder Health', 'Heartbeat Monitor', 'Buffer Overflow Guard', 'No Log Gaps'],
  },
  {
    id: 'prf-escalation-tree',
    label: 'Emergency Contact Tree',
    sub: 'Out-of-Band Phone Trees',
    badge: 'CRISIS COMMUNICATIONS',
    description: 'Documented, printed, and offline escalation rosters for shift leads, IR directors, legal counsel, and executive management.',
    details: 'Must be accessible out-of-band so response teams can coordinate even if corporate email and Slack are compromised.',
    tags: ['Offline Phone Tree', 'Executive Contacts', 'Legal Counsel', 'Out-of-Band Roster'],
  },
  {
    id: 'prf-meera-readiness',
    label: 'Meera Readiness Audit',
    sub: 'Quarterly Tabletop Drill',
    badge: 'OPERATIONAL READINESS ✓',
    description: 'Rigorous simulation drills testing analyst muscle memory on simulated ransomware outbreaks and credential leaks.',
    details: 'Validates that every junior analyst knows where playbooks reside, how to cut network connections, and how to preserve volatile RAM.',
    tags: ['Tabletop Exercise', 'IR Playbooks', 'Muscle Memory', 'Continuous Audit'],
  },
];

// -----------------------------------------------------------------------------
// Chapter 2: L1 responsibilities and escalation (M14-U1-C2)
// -----------------------------------------------------------------------------

// Pillar 1: L1 vs L2/L3 Operational Boundaries
export const l1L2L3BoundariesNodes: VisualNodeItem[] = [
  {
    id: 'bnd-tier-l1',
    label: 'Tier 1: Triage & Preservation',
    sub: 'First Response & Scoping',
    badge: 'SPEED & ACCURACY',
    description: 'Monitors the alert queue, validates observables, scopes affected assets, filters routine false alarms, and preserves volatile evidence.',
    details: 'Priya focuses on high-speed triage (under 15 minutes) and assembling clean, evidence-anchored dockets for senior review.',
    tags: ['SLA: 15 Mins', 'Alert Triage', 'Evidence Capture', 'Initial Containment'],
  },
  {
    id: 'bnd-tier-l2',
    label: 'Tier 2: Deep Incident Response',
    sub: 'Forensic Reconstruction',
    badge: 'TECHNICAL FORENSICS',
    description: 'Analyzes memory dumps, carves deleted disk artifacts, reconstructs network sessions, and directs multi-host containment actions.',
    details: 'Mentor Meera steps in when an attack spans multiple endpoints, requiring deep forensic carving and memory analysis.',
    tags: ['Memory Analysis', 'Disk Carving', 'Lateral Tracing', 'Containment Authority'],
  },
  {
    id: 'bnd-tier-l3',
    label: 'Tier 3: Threat Hunting & Intel',
    sub: 'Campaign Attribution',
    badge: 'STRATEGIC DEFENSE',
    description: 'Performs hypothesis-driven threat hunting across historical telemetry, creates custom detection signatures, and correlates threat actor campaigns.',
    details: 'Senior threat hunters track adversary infrastructure evolution and engineer advanced behavioural correlation rules.',
    tags: ['Hypothesis Hunting', 'Sigma / YARA', 'Campaign Analysis', 'Custom Detection'],
  },
  {
    id: 'bnd-handoff-boundary',
    label: 'The Golden Handoff Boundary',
    sub: 'Structured Escalation Contract',
    badge: 'CRITICAL DISCIPLINE',
    description: 'The strict operational boundary where L1 stops querying and hands ownership to L2 without attempting unauthorized remediation.',
    details: 'Ananya warns: "Never attempt to clean an infected machine yourself. You risk wiping evidence or alerting the threat actor before containment is ready."',
    tags: ['No Premature Action', 'Evidence Preservation', 'Clean Handoff', 'Strict Boundary'],
  },
];

// Pillar 2: Escalation Triggers & Critical Thresholds
export const escalationTriggersMatrixNodes: VisualNodeItem[] = [
  {
    id: 'trg-tier0-asset',
    label: 'Tier-0 Asset Involvement',
    sub: 'Domain Controller / PKI Root',
    badge: 'SEV-1 IMMEDIATE ESCALATE',
    description: 'Any alert involving Active Directory Domain Controllers (CDAC-BLR-DC01), root Certificate Authorities, or enterprise hypervisors.',
    details: 'An alert on CDAC-BLR-DC01 triggers immediate escalation to Meera regardless of initial severity score.',
    tags: ['Domain Controller', 'Active Directory', 'Crown Jewels', 'Immediate SEV-1'],
  },
  {
    id: 'trg-lsass-dump',
    label: 'Active Credential Extraction',
    sub: 'LSASS MiniDump / Mimikatz',
    badge: 'CREDENTIAL BREACH ⚠️',
    description: 'Confirmed process access to lsass.exe memory or dumping of SAM database hives on any enterprise workstation.',
    details: 'Adversary now possesses domain hashes or Kerberos tickets; immediate lateral movement across the branch is imminent.',
    tags: ['LSASS Dump', 'Mimikatz', 'NTLM Hashes', 'Golden Ticket Risk'],
  },
  {
    id: 'trg-lateral-burst',
    label: 'Multi-Host Lateral Propagation',
    sub: 'Worm / Ransomware Spread',
    badge: 'OUTBREAK ESCALATION',
    description: 'Correlated anomalous network connections (SMB port 445 / WinRM port 5985) spreading across more than two workstations in 60 seconds.',
    details: 'Indicates automated propagation or active keyboard-at-the-keyboard intruder hopping between branch workstations.',
    tags: ['SMB Port 445', 'WinRM 5985', 'Multi-Host Pivot', 'Outbreak Protocol'],
  },
  {
    id: 'trg-ananya-escalate',
    label: 'Ananya Escalation Standard',
    sub: 'Actionable Handoff Rule',
    badge: 'ZERO AMBIGUITY',
    description: 'Document the 5 Ws, attach Sysmon Event 1 and Zeek connection logs, specify recommended isolation, and summon L2 lead.',
    details: 'Escalations must provide actionable telemetry within 120 seconds rather than vague verbal panic.',
    tags: ['5 Ws Summary', 'Attached Evidence', 'Direct Lead Call', 'Audit-Proof Docket'],
  },
];

// Pillar 3: Evidence Preservation & Volatile Memory Doctrine
export const evidencePreservationDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'epd-volatile-ram',
    label: 'Volatile RAM State',
    sub: 'Unwritten Memory Artifacts',
    badge: 'MOST FRAGILE EVIDENCE',
    description: 'Live process trees, injected DLLs, unencrypted network sockets, and plaintext credentials residing exclusively in volatile RAM silicon.',
    details: 'Once power is cycled, all volatile memory artifacts vanish permanently, destroying proof of memory-only fileless attacks.',
    tags: ['RAM Silicon', 'Injected Code', 'Active Sockets', 'Plaintxt Secrets'],
  },
  {
    id: 'epd-reboot-disaster',
    label: 'The "Reboot Trap" Fallacy',
    sub: 'Evidence Spoliation Disaster',
    badge: 'CRITICAL FAILURE ⛔',
    description: 'The disastrous mistake of rebooting an infected host to "fix" the problem, which wipes RAM and triggers adversary persistence mechanisms.',
    details: 'Meera cautions: "Rebooting an infected machine is destruction of evidence. It cleans the RAM, triggers run keys, and blinds investigators."',
    tags: ['Memory Wiped', 'Persistence Activated', 'Spoliation', 'Unprofessional Fix'],
  },
  {
    id: 'epd-network-sever',
    label: 'EDR Network Isolation',
    sub: 'Sever Network, Keep Power ON',
    badge: 'GOLD STANDARD ACTION',
    description: 'Severing the host network stack via EDR isolation command while keeping physical power on to preserve volatile memory.',
    details: 'Host BLR-BR-WS-04 cannot communicate with adversary C2 servers or lateral peers, but RAM remains intact for forensic capture.',
    tags: ['Network Severed', 'Power Maintained', 'EDR Quarantine', 'RAM Preserved'],
  },
  {
    id: 'epd-chain-custody',
    label: 'Forensic Chain of Custody',
    sub: 'Cryptographic Hash Integrity',
    badge: 'LEGAL ADMISSIBILITY',
    description: 'Calculating SHA-256 hashes of memory images and triage captures immediately upon acquisition, logging exact UTC and collector identity.',
    details: 'Guarantees evidence integrity in court by proving artifacts were never modified after initial acquisition.',
    tags: ['SHA-256 Verification', 'Collector Log', 'Tamper-Proof', 'Courtroom Standard'],
  },
];

// =============================================================================
// UNIT 2: CASE DOCUMENTATION
// =============================================================================

// -----------------------------------------------------------------------------
// Chapter 3: Timeline, evidence and clear notes (M14-U2-C1)
// -----------------------------------------------------------------------------

// Pillar 1: Normalized UTC Chronology Timeline
export const utcChronologyTimelineNodes: VisualNodeItem[] = [
  {
    id: 'tml-zeek-beacon',
    label: '09:12:00 UTC: Zeek DNS Query',
    sub: 'Initial External Resolution',
    badge: 'STEP 1: EGRESS PROBE',
    description: 'Zeek sensor logs DNS query from CDAC-BLR-WS-12 to suspicious domain update-cdn-sync.com (IP: 198.51.100.42).',
    details: 'Sensor: Zeek-Perimeter-01. Microsecond normalized timestamp: 2026-10-15T09:12:00.142Z.',
    tags: ['DNS Query', 'Zeek-TAP-01', 'Outbound Resolution', 'Normalized UTC'],
  },
  {
    id: 'tml-sysmon-proc',
    label: '09:12:15 UTC: Sysmon Event 1',
    sub: 'Suspicious Script Execution',
    badge: 'STEP 2: HOST EXECUTION',
    description: 'Workstation CDAC-BLR-WS-12 executes powershell.exe with -ExecutionPolicy Bypass launching payload sync.ps1.',
    details: 'PPID 3400 (cmd.exe) -> Child PID 4820 (powershell.exe). Microsecond timestamp: 2026-10-15T09:12:15.820Z.',
    tags: ['Sysmon EID 1', 'PID Lineage', 'Public Dir Staging', 'T1059.001'],
  },
  {
    id: 'tml-ad-auth',
    label: '09:12:45 UTC: AD Event 4624',
    sub: 'Logon Type 3 from WS to DC',
    badge: 'STEP 3: LATERAL PIVOT',
    description: 'Domain Controller CDAC-BLR-DC01 logs successful network logon (Type 3) using stolen service account credentials.',
    details: 'Account: svc-backup. Source Workstation: 10.0.4.21. Microsecond timestamp: 2026-10-15T09:12:45.310Z.',
    tags: ['Event ID 4624', 'Logon Type 3', 'Domain Controller', 'T1078.002'],
  },
  {
    id: 'tml-l1-timestamp-rule',
    label: 'Ananya UTC Chronology Standard',
    sub: 'Strict Chronological Sequencing',
    badge: 'GOLD STANDARD TIMELINE',
    description: 'Every timeline entry must record Normalized UTC, Sensor Name, Event ID, Hostname, Account, and Verifiable Artifact.',
    details: 'Never record local timezone colloquialisms like "around breakfast time". Precise ISO 8601 UTC timestamps are mandatory.',
    tags: ['ISO 8601', 'UTC Zulu Time', 'No Ambiguity', 'Multi-Sensor Link'],
  },
];

// Pillar 2: The 5 Ws of Professional Incident Notes
export const fiveWsCaseNotesNodes: VisualNodeItem[] = [
  {
    id: 'not-who-entity',
    label: 'Who: User & Token Context',
    sub: 'Identity Resolution',
    badge: 'AUTHENTICATION ENTITY',
    description: 'Account: FINCORP\\b_sharma. SID: S-1-5-21-3829-1002. Role: Senior Research Associate, CDAC Bengaluru.',
    details: 'Verified against Active Directory LDAP. Standard user token without administrative SeDebugPrivilege.',
    tags: ['Username', 'User SID', 'Job Role', 'Privilege Scope'],
  },
  {
    id: 'not-what-binary',
    label: 'What: Exact Binary & Syntax',
    sub: 'Command-Line Payload',
    badge: 'TECHNICAL MECHANIC',
    description: 'Process: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe. Args: -nop -w hidden -enc JABzAD0... Hash SHA-256: e3b0c442...',
    details: 'Decoded Base64 revealed automated web request downloading secondary EXE from 198.51.100.42.',
    tags: ['Binary Path', 'Base64 Decoded', 'SHA-256 Hash', 'Process GUID'],
  },
  {
    id: 'not-when-timeline',
    label: 'When: Microsecond Window',
    sub: 'Temporal Demarcation',
    badge: 'TIME BOUNDARY',
    description: 'Execution Start: 2026-10-15T09:12:15Z. Network Outbound: 09:12:16Z to 09:13:02Z. Total Active Window: 47 seconds.',
    details: 'Confirms that the burst occurred in under a minute, consistent with scripted automation rather than human keyboard typing.',
    tags: ['Start UTC', 'Duration: 47s', 'Burst Velocity', 'ISO 8601'],
  },
  {
    id: 'not-where-asset',
    label: 'Where: Asset & Segment',
    sub: 'Network Topology Context',
    badge: 'ASSET DEMARCATION',
    description: 'Host: CDAC-BLR-WS-12. IP: 10.0.4.21. MAC: 00:1A:2B:3C:4D:5E. Switch Port: Core-SW-01 Port 14 (VLAN 40 Engineering).',
    details: 'Demarcates the physical and logical network position of the compromised machine within the CDAC Bengaluru campus.',
    tags: ['Host Name', 'Private IP', 'VLAN 40', 'Switch Port 14'],
  },
];

// Pillar 3: Separating Observed Facts from Analyst Inferences
export const factsVsInferencesNodes: VisualNodeItem[] = [
  {
    id: 'fvi-verified-fact',
    label: 'Observed Fact: Direct Log Proof',
    sub: 'Cryptographically Grounded Data',
    badge: 'DEFENSIBLE SCIENCE ✓',
    description: 'Fact: Sysmon Event 1 shows powershell.exe executed with -enc argument by user b_sharma at 09:12:15 UTC.',
    details: 'This statement is 100% indisputable because it is directly derived from immutable operating system audit logs.',
    tags: ['Direct Log Proof', 'Event ID 1', 'Indisputable', 'Forensic Grounding'],
  },
  {
    id: 'fvi-speculative-leap',
    label: 'Speculative Trap: Unproven Leap',
    sub: 'Hallucinated Attribution',
    badge: 'ANALYTICAL FAILURE ⚠️',
    description: 'Speculation: "State-sponsored APT29 hackers have breached CDAC and are preparing to exfiltrate database records."',
    details: 'Meera rejects this note immediately: there is zero evidence of Russian APT attribution or database exfiltration in the logs.',
    tags: ['Zero Evidence', 'Conspiracy Leap', 'Unprofessional', 'Alert Fatigue'],
  },
  {
    id: 'fvi-labeled-hypothesis',
    label: 'Investigative Hypothesis',
    sub: 'Clearly Labeled Operational Lead',
    badge: 'HONEST UNCERTAINTY',
    description: 'Hypothesis: The encoded script appears to act as a downloader staged in C:\\Users\\Public; recommend proxy log inspection for IP 198.51.100.42.',
    details: 'Communicates a reasonable investigative hunch while explicitly marking it as an unproven hypothesis awaiting corroboration.',
    tags: ['Labeled Lead', 'Actionable Query', 'Proxy Check', 'Intellectual Rigor'],
  },
  {
    id: 'fvi-meera-standard',
    label: 'Meera Documentation Rule',
    sub: 'The Fact vs Inference Boundary',
    badge: 'CDAC SOP ACCREDITATION',
    description: 'Case dockets must clearly partition: Section A = Observed Facts (Logs), Section B = Working Hypotheses, Section C = Recommended Action.',
    details: 'This disciplined layout prevents managers from panicking over tentative analytical hypotheses.',
    tags: ['Sectioned Docket', 'Facts vs Hypotheses', 'Actionable Steps', 'Executive Clarity'],
  },
];

// -----------------------------------------------------------------------------
// Chapter 4: Severity, confidence and disposition (M14-U2-C2)
// -----------------------------------------------------------------------------

// Pillar 1: Severity Matrix Scoring (SEV 1 - 4)
export const severityMatrixScoringNodes: VisualNodeItem[] = [
  {
    id: 'sev-critical-sev1',
    label: 'SEV-1: Critical Outbreak',
    sub: 'SLA: 15-Minute Response',
    badge: 'CROWN JEWELS / OUTBREAK',
    description: 'Active domain controller compromise, widespread ransomware encryption, or total branch network failure.',
    details: 'Triggers immediate all-hands page: CISO, shift lead, forensic lead, and infrastructure heads summoned to the war room.',
    tags: ['SLA: 15m', 'DC Compromise', 'Ransomware Active', 'War Room Bridge'],
  },
  {
    id: 'sev-high-sev2',
    label: 'SEV-2: High Severity Breach',
    sub: 'SLA: 30-Minute Response',
    badge: 'HOST BREACH / CREDENTIALS',
    description: 'Confirmed credential dumping (LSASS), active C2 beaconing on a user workstation, or privilege escalation on production servers.',
    details: 'Requires immediate host network isolation and escalation to Tier-2 incident response within 30 minutes.',
    tags: ['SLA: 30m', 'LSASS Dump', 'C2 Beacon', 'Host Isolation'],
  },
  {
    id: 'sev-medium-sev3',
    label: 'SEV-3: Medium Suspicious Event',
    sub: 'SLA: 2-Hour Response',
    badge: 'SUSPICIOUS LOLBIN PROBE',
    description: 'Isolated dual-use LOLBin execution (certutil download), suspicious encoded command without persistence, or port scans.',
    details: 'L1 investigates within 2 hours to confirm whether activity was authorized IT maintenance or initial stage probe.',
    tags: ['SLA: 2 Hours', 'LOLBin Probe', 'Port Scan', 'Triage Queue'],
  },
  {
    id: 'sev-low-sev4',
    label: 'SEV-4: Low Informational Lead',
    sub: 'SLA: 8-Hour Response',
    badge: 'POLICY / BENIGN PROBE',
    description: 'Single failed user password attempt, routine software installation attempt, or benign port scan from external scanner.',
    details: 'Investigated and documented within normal shift operating rhythm without disrupting active response workflows.',
    tags: ['SLA: 8 Hours', 'Policy Warning', 'Routine Audit', 'Standard Triage'],
  },
];

// Pillar 2: Multi-Sensor Confidence Scoring Rubric
export const confidenceScoringRubricNodes: VisualNodeItem[] = [
  {
    id: 'cnf-single-source',
    label: 'Single Source: Low (30%)',
    sub: 'Uncorroborated Alert',
    badge: 'PRELIMINARY SIGNAL',
    description: 'Alert triggered by a single perimeter IDS rule (e.g. SNORT alert for generic HTTP signature) with no corresponding endpoint event.',
    details: 'Confidence remains low (30%) because packet triggers frequently generate false alarms on benign web applications.',
    tags: ['Single IDS Alert', 'No Endpoint Proof', 'High False Alarm Rate', 'Needs Corroboration'],
  },
  {
    id: 'cnf-dual-sensor',
    label: 'Dual Sensor: Medium (65%)',
    sub: 'Corroborated Telemetry',
    badge: 'SUBSTANTIATED LEAD',
    description: 'Network IDS alarm corroborated by Zeek connection flow showing sustained data transfer to the flagged external IP address.',
    details: 'Confidence rises to 65%: network activity is verified, but process identity on the internal host remains unconfirmed.',
    tags: ['IDS + Zeek', 'Flow Verified', 'Moderate Confidence', 'Endpoint Query Next'],
  },
  {
    id: 'cnf-multi-corroborated',
    label: 'Triad Corroboration: High (95%)',
    sub: 'Process + Network + Identity',
    badge: 'CONFIRMED INCIDENT ✓',
    description: 'Zeek network flow matches Sysmon Event 1 process execution and Active Directory Event 4624 authentication on the exact same host.',
    details: 'Confidence reaches 95%: three independent sensors prove the same technical narrative with identical UTC timestamps.',
    tags: ['Sysmon + Zeek + AD', 'Cryptographic Proof', 'High Confidence', 'Defensible Action'],
  },
  {
    id: 'cnf-confidence-seal',
    label: 'Ananya Confidence Doctrine',
    sub: 'Never Escalate on 30% Alone',
    badge: 'ANALYST RIGOR',
    description: 'An analyst must actively hunt for corroborating telemetry to elevate confidence before requesting disruptive host containment.',
    details: 'Prevents isolating critical manufacturing machines or executive laptops based on low-confidence single-packet glitches.',
    tags: ['Corroboration Hunt', 'No False Quarantines', 'Rigorous Triage', 'Calibrated Action'],
  },
];

// Pillar 3: The 4 Standard Case Dispositions
export const caseDispositionsQuadNodes: VisualNodeItem[] = [
  {
    id: 'dsp-true-positive-mal',
    label: 'True Positive: Malicious',
    sub: 'Confirmed Adversary Action',
    badge: 'ACTIVE THREAT DETECTED',
    description: 'Alert represents genuine unauthorized malicious activity. Full incident response playbook activated; containment executed.',
    details: 'Case #2026-881: Confirmed credential harvesting tool executed on BLR-BR-WS-04. Workstation isolated; ticket escalated to L2.',
    tags: ['True Positive', 'Malicious Threat', 'Containment Active', 'IR Escalation'],
  },
  {
    id: 'dsp-true-positive-benign',
    label: 'True Positive: Benign',
    sub: 'Authorized IT Maintenance',
    badge: 'EXPECTED SYSTEM BEHAVIOR',
    description: 'Alert accurately detected the technical behavior (e.g., whoami /groups), but context proved it was authorized IT admin Rajesh.',
    details: 'Closed as True Positive Benign with attached change ticket number CR-2026-904. No escalation required.',
    tags: ['True Positive', 'Benign Operation', 'IT Admin Task', 'Change Ticket Attached'],
  },
  {
    id: 'dsp-false-positive',
    label: 'False Positive',
    sub: 'Defective Detection Logic',
    badge: 'RULE DEFECT / NOISE',
    description: 'Alert triggered on harmless traffic due to an overly broad regex or flawed SIEM detection query.',
    details: 'Closed as False Positive. Ticket routed to detection engineering queue with tuning recommendation to exclude benign binary.',
    tags: ['False Positive', 'Tuning Feedback', 'Regex Defect', 'Noise Reduction'],
  },
  {
    id: 'dsp-ananya-disposition',
    label: 'Ananya Disposition Protocol',
    sub: 'Mandatory Closure Docket',
    badge: 'AUDIT COMPLIANCE ✓',
    description: 'Every ticket closed by an L1 analyst must specify one of the four official dispositions, backed by an evidence explanation.',
    details: 'Tickets closed with vague notes like "looks okay" are rejected during shift audits by Mentor Ananya.',
    tags: ['SOP Compliance', 'Evidence Mandate', 'Shift Lead Audit', 'Permanent Record'],
  },
];

// =============================================================================
// UNIT 3: HANDOVER AND CLOSURE
// =============================================================================

// -----------------------------------------------------------------------------
// Chapter 5: Escalation path and ownership (M14-U3-C1)
// -----------------------------------------------------------------------------

// Pillar 1: Formal Escalation Chain & Role Definitions
export const escalationChainRolesNodes: VisualNodeItem[] = [
  {
    id: 'esc-l1-triage',
    label: 'Analyst Priya: L1 Triage',
    sub: 'First Line Triage & Preservation',
    badge: 'TICKET CREATION & SCOPE',
    description: 'Detects the alert, gathers initial telemetry from Sysmon and Zeek, scopes host CDAC-BLR-WS-12, and drafts Case #2026-881.',
    details: 'Priya ensures all initial evidence hashes, UTC timelines, and the 5 Ws are attached before initiating the escalation.',
    tags: ['L1 Analyst', 'Initial Triage', 'Scope Complete', 'SLA: 15 Mins'],
  },
  {
    id: 'esc-shift-lead',
    label: 'Mentor Ananya: Shift Lead',
    sub: 'Triage Gatekeeper & Quality Control',
    badge: 'SUPERVISORY REVIEW',
    description: 'Reviews Priya\'s case docket, verifies evidence anchors, confirms SEV-2 severity rating, and authorizes formal escalation to IR.',
    details: 'Ananya verifies that the escalation is complete and defensible, preventing half-baked tickets from reaching senior responders.',
    tags: ['Shift Lead', 'Quality Audit', 'Severity Signoff', 'Gatekeeper'],
  },
  {
    id: 'esc-ir-lead',
    label: 'Mentor Meera: Incident Lead',
    sub: 'Forensic Lead & Containment Boss',
    badge: 'INCIDENT COMMANDER',
    description: 'Assumes primary ownership of Case #2026-881, orders EDR network isolation of CDAC-BLR-WS-12, and dispatches memory acquisition.',
    details: 'Meera coordinates deep disk forensics, lateral movement scans on adjacent subnets, and liaises with infrastructure admin Rajesh.',
    tags: ['Incident Commander', 'Memory Forensics', 'Containment Order', 'Active Incident'],
  },
  {
    id: 'esc-ciso-mgmt',
    label: 'CISO & Legal Executive',
    sub: 'Organizational Leadership',
    badge: 'STRATEGIC OVERSIGHT',
    description: 'Receives executive summary briefing if SEV-1 breach criteria are met, coordinating regulatory disclosures and external PR.',
    details: 'Informed through secure out-of-band communications when high-value IP or customer data confidentiality is threatened.',
    tags: ['CISO Briefing', 'Regulatory Disclosure', 'Legal Advisory', 'Executive Shield'],
  },
];

// Pillar 2: Active Case Ownership Transfer & Positive Acknowledgement
export const caseOwnershipTransferNodes: VisualNodeItem[] = [
  {
    id: 'own-ticket-staging',
    label: 'Step 1: Docket Packaging',
    sub: 'Assembling Handoff Dossier',
    badge: 'PRE-TRANSFER PREPARATION',
    description: 'Analyst Priya locks the ticket, attaches verified Sysmon logs, formats the UTC timeline, and sets recommended containment actions.',
    details: 'A ticket cannot be transferred with empty fields or missing evidence anchors; packaging must be complete.',
    tags: ['Docket Packaging', 'Ticket Locked', 'Evidence Attached', 'Audit Ready'],
  },
  {
    id: 'own-summary-briefing',
    label: 'Step 2: Verbal / Synchronous Brief',
    sub: 'Direct Operator Communication',
    badge: 'SYNCHRONOUS HANDOFF',
    description: 'Priya opens an active voice/chat bridge with L2 Lead Meera, delivering a concise 60-second summary of Case #2026-881.',
    details: '"Host CDAC-BLR-WS-12, powershell encoded downloader from 198.51.100.42, user b_sharma, Sysmon Event 1 attached. Machine is ready for isolation."',
    tags: ['60s Briefing', 'Direct Comms', 'Zero Ambiguity', 'Human Verification'],
  },
  {
    id: 'own-positive-ack',
    label: 'Step 3: Positive Acknowledgement',
    sub: 'Explicit Acceptance of Duty',
    badge: 'THE SACRED RULE ✓',
    description: 'Mentor Meera explicitly clicks "Accept Ownership" in TheHive and verbally states: "I have taken ownership of Case #2026-881."',
    details: 'Never reassign a ticket into a queue without positive confirmation. If the recipient does not acknowledge, ownership remains with you!',
    tags: ['Positive Ack', 'Receipt Confirmed', 'Explicit Acceptance', 'No Dropped Tickets'],
  },
  {
    id: 'own-clear-ownership',
    label: 'Step 4: Active Duty Log',
    sub: 'Updated Ticket Audit Trail',
    badge: 'CHAIN OF ACCOUNTABILITY',
    description: 'System automatically logs: "Ownership transferred from Priya (L1) to Meera (L2) at 2026-10-15T09:28:40Z per positive ack."',
    details: 'Maintains an unbreakable chain of custody and accountability for every minute of an active security crisis.',
    tags: ['Audit Log', 'Transferred UTC', 'Accountability', 'Clean Record'],
  },
];

// Pillar 3: Out-of-Band Incident Communications (Stealth Protocol)
export const outOfBandCommsNodes: VisualNodeItem[] = [
  {
    id: 'oob-inband-danger',
    label: 'The In-Band Compromise Hazard',
    sub: 'Tipping Off the Adversary',
    badge: 'FATAL TACTICAL ERROR ⚠️',
    description: 'Discussing the investigation over corporate Microsoft Exchange email, Teams, or Slack when Domain Admin may be compromised.',
    details: 'An advanced adversary with domain admin credentials monitors SOC mailboxes, learning when containment is planned and deploying ransomware early!',
    tags: ['In-Band Danger', 'Mailbox Sniffing', 'Tipping Off Adversary', 'Early Detonation'],
  },
  {
    id: 'oob-isolated-channel',
    label: 'Dedicated Out-of-Band Bridge',
    sub: 'Air-Gapped Communications',
    badge: 'STEALTH DEFENSE ✓',
    description: 'Migrating the incident war room to external encrypted Signal groups, dedicated satellite voice bridges, or isolated out-of-band chat.',
    details: 'Ensures incident responders can coordinate host severing, password resets, and forensic captures without the intruder detecting the response.',
    tags: ['Encrypted Signal', 'External Bridge', 'Zero Intruder Visibility', 'Stealth Operations'],
  },
  {
    id: 'oob-protocol-rules',
    label: 'Out-of-Band Operational Rules',
    sub: 'Strict Operational Security (OpSec)',
    badge: 'OPSEC DISCIPLINE',
    description: 'Never write credentials, internal IP schemes, or full packet payloads over unvetted public messaging tools.',
    details: 'Use case reference numbers (Case #2026-881) and pre-shared authentication codes to verify participant identity on conference bridges.',
    tags: ['OpSec Rules', 'Case Codes', 'Identity Verification', 'No Secret Leaks'],
  },
  {
    id: 'oob-ananya-guidance',
    label: 'Ananya Stealth Directive',
    sub: 'When to Go Dark Protocol',
    badge: 'MANDATORY ON SEV-1',
    description: 'Whenever active credential access is confirmed on domain controllers or executive accounts, immediately invoke Out-of-Band Protocol.',
    details: 'Protects the enterprise from catastrophic premature ransomware detonation during incident response containment windows.',
    tags: ['Go Dark Order', 'SEV-1 Protocol', 'Surprise Containment', 'Analyst Tradecraft'],
  },
];

// -----------------------------------------------------------------------------
// Chapter 6: Shift handover and lessons learned (M14-U3-C2)
// -----------------------------------------------------------------------------

// Pillar 1: Shift Handover Briefing & Open Ticket Docket
export const shiftHandoverBriefingNodes: VisualNodeItem[] = [
  {
    id: 'shf-active-cases',
    label: '1. Active Incident Docket',
    sub: 'Open P1 / P2 Tickets Under Triage',
    badge: 'OPERATIONAL FOCUS',
    description: 'Status of ongoing cases: Case #2026-881 (Host BLR-BR-WS-04 isolated, memory dump in progress by Meera; awaiting sandbox verdict).',
    details: 'Incoming night shift analyst must understand the exact current operational posture of every open high-priority ticket.',
    tags: ['Case #2026-881', 'Isolated Host', 'Memory Dump Pending', 'Active SLA'],
  },
  {
    id: 'shf-containment-watch',
    label: '2. Containment Watchlist',
    sub: 'Quarantined Endpoints Under Monitor',
    badge: 'WATCHLIST TELEMETRY',
    description: 'List of 3 isolated branch workstations being monitored for beaconing attempts against internal default gateways.',
    details: 'Ensures that isolated machines do not bypass network filters or get re-enabled prematurely by local branch office staff.',
    tags: ['Isolated Assets', 'Gateway Watch', 'No Premature Unblock', 'Continuous Monitor'],
  },
  {
    id: 'shf-maintenance-window',
    label: '3. Authorized Change Windows',
    sub: 'Scheduled IT Maintenance (Rajesh)',
    badge: 'FALSE ALARM SUPPRESSION',
    description: 'IT Admin Rajesh scheduled patch deployment across Engineering VLAN 40 between 23:00 and 02:00 UTC (Ticket CR-2026-904).',
    details: 'Prevents the incoming night shift from raising emergency alarms for authorized bulk reboot and package installation scripts.',
    tags: ['Change Window', 'VLAN 40 Patching', '23:00 - 02:00 UTC', 'CR-2026-904'],
  },
  {
    id: 'shf-ananya-signoff',
    label: '4. Shift Lead Dual Signoff',
    sub: 'Formal Responsibility Transfer',
    badge: 'SHIFT CONTRACT ✓',
    description: 'Outgoing Lead Ananya and incoming Night Lead formally sign the handover docket in the SOC portal, transferring queue duty.',
    details: 'Eliminates "nobody told me" excuses during morning executive status meetings.',
    tags: ['Dual Signoff', 'Formal Contract', 'Accountability', 'Clean Shift Transition'],
  },
];

// Pillar 2: Post-Incident Lessons Learned & Blameless Post-Mortem
export const postIncidentLessonsNodes: VisualNodeItem[] = [
  {
    id: 'lrn-root-cause',
    label: '1. Root Cause Analysis',
    sub: 'How Did the Adversary Enter?',
    badge: 'OBJECTIVE POST-MORTEM',
    description: 'Forensics determined initial access was achieved via spear-phishing email containing malicious macro attachment opened on BLR-BR-WS-04.',
    details: 'Meera highlights: "Root cause analysis identifies systemic vulnerabilities rather than pointing fingers at individual employees."',
    tags: ['Root Cause', 'Macro Phishing', 'Initial Access', 'Systemic Finding'],
  },
  {
    id: 'lrn-detection-gap',
    label: '2. Detection Gap Remediation',
    sub: 'Why Did Initial Ingestion Miss It?',
    badge: 'ENGINEERING FEEDBACK',
    description: 'The malicious PowerShell command used an unflagged obfuscation flag (-w hidden). Detection engineering creates new Sigma rule T1059_PS_Obfuscation.',
    details: 'Closes the telemetry gap so any identical script variation triggers an immediate high-priority alarm across all 5,000 branch workstations.',
    tags: ['Sigma Rule T1059', 'Detection Gap', 'Rule Engineering', 'Telemetry Tuning'],
  },
  {
    id: 'lrn-playbook-update',
    label: '3. Playbook Optimization',
    sub: 'Removing Triage Bottlenecks',
    badge: 'PROCESS EVOLUTION',
    description: 'Triage was delayed 8 minutes because the sandbox API token was expired. Playbook updated with automatic health-check token renewal.',
    details: 'Improves future Mean Time to Triage (MTTT) and Mean Time to Containment (MTTC) for the entire SOC organization.',
    tags: ['MTTT Reduction', 'API Token Fix', 'Playbook Evolution', 'Continuous Improvement'],
  },
  {
    id: 'lrn-meera-postmortem',
    label: '4. The Blameless Post-Mortem',
    sub: 'Psychological Safety & Learning',
    badge: 'ELITE SOC CULTURE ✓',
    description: 'Focusing entirely on system resilience, tooling blindspots, and process improvements without punitive blame against operators.',
    details: 'A blameless culture encourages analysts to report mistakes and security anomalies honestly without fear of termination.',
    tags: ['Blameless Culture', 'Psychological Safety', 'System Resilience', 'Team Trust'],
  },
];

// Pillar 3: Master SOC Capstone Signoff & Dual Mentor Accreditation
export const masterSocCapstoneSignoffNodes: VisualNodeItem[] = [
  {
    id: 'mas-ir-lifecycle',
    label: 'Competency 1: IR Lifecycle Mastery',
    sub: 'NIST SP 800-61r2 & SANS Execution',
    badge: 'ACCREDITED PROFICIENCY ✓',
    description: 'Demonstrated mastery across all 4 incident phases: Preparation readiness, Detection & analysis triage, Containment execution, and Post-incident learning.',
    details: 'Priya proves she can navigate high-stress security incidents with calm, structured discipline.',
    tags: ['NIST SP 800-61r2', 'Phased Response', 'Containment Gating', 'SOP Mastery'],
  },
  {
    id: 'mas-forensic-evidence',
    label: 'Competency 2: Forensic Evidence Preservation',
    sub: 'Volatile RAM & Custody Discipline',
    badge: 'ACCREDITED PROFICIENCY ✓',
    description: 'Never rebooting infected machines; executing EDR network isolation while preserving live volatile memory and calculating SHA-256 custody hashes.',
    details: 'Ensures all acquired evidence remains legally defensible in court and clean for digital forensic experts.',
    tags: ['Zero Spoliation', 'RAM Preserved', 'SHA-256 Custody', 'Courtroom Standard'],
  },
  {
    id: 'mas-triage-disposition',
    label: 'Competency 3: Triage & Docket Precision',
    sub: 'The 5 Ws, SEV Matrix & Active Handoffs',
    badge: 'ACCREDITED PROFICIENCY ✓',
    description: 'Compiling audit-proof Case #2026-881 dockets with normalized UTC timelines, separating facts from inferences, and executing positive-ack handoffs.',
    details: 'Eliminates ticket queue chaos, vague notes, and dropped escalations across Tier 1, Tier 2, and management.',
    tags: ['5 Ws Docket', 'UTC Timeline', 'SEV Scoring', 'Positive Ack Handoff'],
  },
  {
    id: 'mas-dual-mentor-seal',
    label: 'Ananya & Meera Master Seal',
    sub: 'Certified L1 Incident Responder',
    badge: 'C-SOC CERTIFIED GRADUATE 🏆',
    description: 'Mentor Ananya (Shift Lead & Threat Methodology) and Mentor Meera (Forensic & Incident Response Lead) grant the Master Supervisory Accreditation Seal.',
    details: 'Congratulations, Analyst Priya! You have completed the 14-Module C-SOC Program and are officially certified as an Elite SOC L1 Incident Responder!',
    tags: ['Dual Mentor Seal', 'Module 14 Complete', 'C-SOC Certified', 'Elite Incident Responder'],
  },
];

// =============================================================================
// COMPLETE MODULE 14 NODES MAP
// =============================================================================
export const module14NodesMap: Record<string, VisualNodeItem[]> = {
  // M14-U1-C1
  'm14-nist-sans-lifecycle': nistSansLifecycleNodes,
  'm14-detection-analysis-gates': detectionAnalysisGatesNodes,
  'm14-preparation-foundations': preparationFoundationsNodes,

  // M14-U1-C2
  'm14-l1-l2-l3-boundaries': l1L2L3BoundariesNodes,
  'm14-escalation-triggers-matrix': escalationTriggersMatrixNodes,
  'm14-evidence-preservation-doctrine': evidencePreservationDoctrineNodes,

  // M14-U2-C1
  'm14-utc-chronology-timeline': utcChronologyTimelineNodes,
  'm14-five-ws-case-notes': fiveWsCaseNotesNodes,
  'm14-facts-vs-inferences': factsVsInferencesNodes,

  // M14-U2-C2
  'm14-severity-matrix-scoring': severityMatrixScoringNodes,
  'm14-confidence-scoring-rubric': confidenceScoringRubricNodes,
  'm14-case-dispositions-quad': caseDispositionsQuadNodes,

  // M14-U3-C1
  'm14-escalation-chain-roles': escalationChainRolesNodes,
  'm14-case-ownership-transfer': caseOwnershipTransferNodes,
  'm14-out-of-band-comms': outOfBandCommsNodes,

  // M14-U3-C2
  'm14-shift-handover-briefing': shiftHandoverBriefingNodes,
  'm14-post-incident-lessons': postIncidentLessonsNodes,
  'm14-master-soc-capstone-signoff': masterSocCapstoneSignoffNodes,
};
