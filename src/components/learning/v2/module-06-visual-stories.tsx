'use client';

import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 06: LOG & EVENT ANALYSIS — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Karthik (Data & Workflow Specialist)
// Motto: "First describe the record literally. Interpretation comes after you understand what the source reports."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M06-U1-C1 (Timestamp, source, fields and outcome)
// -----------------------------------------------------------------------------

// 1. Pillar 1: Literal Event Deconstruction
export const literalEventNodes: VisualNodeItem[] = [
  {
    id: 'lit-raw-text',
    label: '1. Raw Log Record',
    sub: 'Verbatim System Observable',
    badge: 'RAW EVENT OBSERVABLE',
    description: 'The exact unvarnished text output emitted by the operating system kernel before any analyst interpretation.',
    details: 'Example: "EventID 4625: An account failed to log on. Subject: NULL SID. Target: FIN-OPS-01. Status: 0xC000006A (Bad Password)."',
    tags: ['Verbatim Text', 'EventID 4625', 'Status: 0xC000006A', 'Kernel Audit'],
  },
  {
    id: 'lit-literal-desc',
    label: '2. Literal Description',
    sub: 'What the Record Reports',
    badge: 'OBJECTIVE REPORTING',
    description: 'Karthik teaches: "First describe the record literally. Describe what happened according to the audit provider."',
    details: 'Disciplined description: "At 02:44:12Z, Windows Security recorded a failed interactive logon for account FIN-OPS-01 due to bad password."',
    tags: ['Literal Reading', 'No Assumptions', 'Exact Status Code', 'Karthik Rule'],
  },
  {
    id: 'lit-outcome-eval',
    label: '3. Outcome Evaluation',
    sub: 'Failed Operation != Breach',
    badge: 'OUTCOME ANCHOR',
    description: 'The record reports an operation failure. A failure proves the security barrier held; it does not prove unauthorized access was gained.',
    details: 'Learner asks: "The record says failure. Can I write someone gained access?" Karthik replies: "No. Another record would be needed for that."',
    tags: ['Failure Status', 'Access Prevented', 'Barrier Held', 'Restraint Required'],
  },
  {
    id: 'lit-restraint',
    label: '4. Forensic Restraint',
    sub: 'Disciplined Fact Statement',
    badge: 'ANALYST INTEGRITY',
    description: 'Separate what the log explicitly substantiates from speculative conclusions about adversary motives or attacker identity.',
    details: 'A failed logon could be a forgotten password, a confused employee, a scheduled task with old credentials, or a brute-force attack.',
    tags: ['Forensic Restraint', 'Unbiased Notes', 'Scientific Rigor', 'Zero Speculation'],
  },
];

// 2. Pillar 2: The Tri-Timestamp Continuum
export const timestampTriadNodes: VisualNodeItem[] = [
  {
    id: 'ts-generation',
    label: '1. Generation Time (@timestamp)',
    sub: 'Physical Host Clock: 02:45:10.184Z',
    badge: 'PRIMARY EVENT TIME',
    description: 'The microsecond when the operating system kernel physically observed and logged the process or socket action.',
    details: 'This is the true forensic chronological anchor. All attack timelines must be synchronized against this generation timestamp.',
    tags: ['Physical Execution', 'Host Kernel Clock', 'Forensic Anchor', 'Microsecond Scale'],
  },
  {
    id: 'ts-ingestion',
    label: '2. Ingestion Time (_index_time)',
    sub: 'SIEM Indexer Clock: 02:45:13.412Z',
    badge: 'PIPELINE RECEIVE TIME',
    description: 'The exact time the centralized indexing cluster parsed, normalized, and committed the document to searchable storage.',
    details: 'Lag = Ingestion Time - Generation Time (here, 3.2 seconds). If a network link buffers for hours, ingestion time is much later.',
    tags: ['Pipeline Receive', 'Transport Latency', 'Lag: 3.2s', 'Indexer Commit'],
  },
  {
    id: 'ts-alert-fired',
    label: '3. Alert Creation Time (alert.time)',
    sub: 'Rule Fired Clock: 02:45:25.000Z',
    badge: 'CORRELATION DISPATCH TIME',
    description: 'The moment the correlation engine evaluated the rule conditions across the sliding window and created the ticket.',
    details: 'Karthik notes: "Alert creation time does not equal underlying activity time. Preservation of both is critical for investigation."',
    tags: ['Rule Dispatch', 'Ticket Created', 'Sliding Window End', 'SLA Clock Start'],
  },
  {
    id: 'ts-skew-audit',
    label: '4. Clock Skew & Drift Audit',
    sub: 'NTP Synchronization Health',
    badge: 'DEFENSIVE HYGIENE',
    description: 'Network Time Protocol (NTP) drift between domain controllers and workstations can create confusing time paradoxes.',
    details: 'Always check if endpoint clocks are synchronized to within ±50ms. Unsynced clocks make cause-and-effect correlation impossible.',
    tags: ['NTP Server', 'Max Drift: ±50ms', 'Domain Clock', 'Temporal Integrity'],
  },
];

// 3. Pillar 3: Outcome Precision: Failed != Compromised
export const outcomePrecisionNodes: VisualNodeItem[] = [
  {
    id: 'out-failure-eval',
    label: 'Event 4625: Logon Failure',
    sub: 'Status: 0xC000006A (Bad Password)',
    badge: 'BLOCKED ATTEMPT',
    description: 'Audits an unsuccessful authentication attempt. The security perimeter successfully denied access to system resources.',
    details: 'An analyst cannot claim "Adversary logged in and accessed files" based on an Event 4625 record. The door was locked.',
    tags: ['EventID: 4625', 'Denied Access', 'Barrier Held', 'Failed Credential'],
  },
  {
    id: 'out-success-eval',
    label: 'Event 4624: Logon Success',
    sub: 'LogonType: 2 (Interactive Console)',
    badge: 'ACCESS GRANTED',
    description: 'Audits a successful authentication token creation. System granted an active security descriptor to the account.',
    details: 'Only when Event 4624 appears can the analyst confirm: "Account FIN-OPS-01 successfully established an interactive logon session."',
    tags: ['EventID: 4624', 'Token Created', 'Session Established', 'Interactive Type 2'],
  },
  {
    id: 'out-evidence-bound',
    label: 'Evidence-Bound Wording',
    sub: 'Precision Phrasing Standards',
    badge: 'PROFESSIONAL DICTION',
    description: 'Standardized phrasing: "Activity recorded under account FIN-OPS-01 shows 3 failed logons followed by 1 successful logon."',
    details: 'Avoid emotionally charged or premature declarations like "The hacker successfully breached the computer at 2 AM."',
    tags: ['Precise Phrasing', 'Zero Emotion', 'Neutral Verifiable', 'Courtroom Ready'],
  },
  {
    id: 'out-karthik-rule',
    label: 'Karthik\'s Outcome Rule',
    sub: 'Every Claim Needs Supporting Fields',
    badge: 'FORENSIC PRINCIPLE',
    description: 'Karthik emphasizes: "Reject any statement in a case report that lacks a corresponding supporting field in the logs."',
    details: 'If your note claims "Data was exfiltrated", you MUST cite the network log showing bytes transferred to foreign IP.',
    tags: ['Cite Fields', 'No Unsupported Claims', 'Evidence Linking', 'Karthik Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M06-U1-C2 (Parsing and normalization concepts)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Parsing vs Normalization Pipeline
export const parsingPipelineNodes: VisualNodeItem[] = [
  {
    id: 'pipe-raw-unparsed',
    label: '1. Raw Unparsed Text Log',
    sub: 'Unstructured Monolithic String',
    badge: 'RAW INPUT STREAM',
    description: 'Operating systems emit raw text strings with unpredictable delimiters, tabs, spaces, and vendor-specific formatting.',
    details: 'Example: "Oct 15 02:45:10 BLR-BR-WS-04 sshd[4912]: Failed password for invalid user admin from 185.220.101.4 port 8080".',
    tags: ['Unstructured Text', 'Monolithic String', 'Vendor Delimiters', 'Input Buffer'],
  },
  {
    id: 'pipe-grok-regex',
    label: '2. Grok / Dissect Parsing',
    sub: 'Pattern Tokenization Engine',
    badge: 'PATTERN EXTRACTION',
    description: 'Regex patterns and Dissect tokenizer rules slice the monolithic text line into distinct named variables.',
    details: 'Extracts: `%{TIMESTAMP_ISO8601:timestamp}`, `%{WORD:hostname}`, `%{USERNAME:user}`, `%{IP:client_ip}` into key-value pairs.',
    tags: ['Grok Pattern', 'Named Regex', 'Token Slicing', 'Key-Value Extraction'],
  },
  {
    id: 'pipe-normalized-ecs',
    label: '3. Normalized Schema (ECS)',
    sub: 'Uniform Standard Dictionary',
    badge: 'SCHEMA CONFORMANCE',
    description: 'Maps extracted vendor-specific variables into standardized schema field names (Elastic Common Schema or Splunk CIM).',
    details: 'Maps Windows `TargetUserName`, Linux `$USER`, and Cisco `suser` into the single uniform keyword field `user.name`.',
    tags: ['ECS Normalization', 'Field Harmonization', 'Cross-Platform', 'Unified Key'],
  },
  {
    id: 'pipe-validation',
    label: '4. Schema Type Casting',
    sub: 'Data Typing & Validation',
    badge: 'DATA INTEGRITY',
    description: 'Converts raw string values into proper indexed data types: strings to IP objects, dates to UTC datetimes, numbers to integers.',
    details: 'Enables mathematical range queries: `source.port &gt; 1024` and CIDR subnet queries: `source.ip: "10.10.20.0/24"`.',
    tags: ['IP CIDR Type', 'Epoch Datetime', 'Integer Range', 'Searchable Index'],
  },
];

// 5. Pillar 2: Cross-Vendor Field Mapping Matrix
export const fieldMappingNodes: VisualNodeItem[] = [
  {
    id: 'map-windows-user',
    label: 'Windows Event Log: TargetUserName',
    sub: 'Raw Field: TargetUserName: "FIN-OPS-01"',
    badge: 'MICROSOFT EVTX FIELD',
    description: 'In Windows Security Event 4624/4625, the authenticated account is recorded under the label `TargetUserName`.',
    details: 'SubjectUserName represents the process caller (often SYSTEM); TargetUserName represents the actual authenticating user.',
    tags: ['TargetUserName', 'EventID 4624', 'Windows Security', 'Vendor Specific'],
  },
  {
    id: 'map-linux-user',
    label: 'Linux /var/log/auth.log: $USER',
    sub: 'Raw Field: user=fin-ops-01',
    badge: 'LINUX SYSLOG FIELD',
    description: 'In PAM, SSH, and sudo authentication logs on Ubuntu and Red Hat, the authenticating user is labeled `user=`.',
    details: 'Case sensitivity warning: Linux usernames are strictly lowercase (`fin-ops-01`); Windows usernames are case-insensitive.',
    tags: ['Linux PAM', 'user= Parameter', 'Case Sensitive', 'OpenSSH Audit'],
  },
  {
    id: 'map-cef-suser',
    label: 'Cisco / Firewall CEF: suser',
    sub: 'Raw Field: suser=FIN-OPS-01',
    badge: 'COMMON EVENT FORMAT',
    description: 'In ArcSight and firewall CEF syslog streams, the user field is abbreviated to `suser` (Source User).',
    details: 'Other network formats use `srcuser` or `duser` (Destination User). Misidentifying them flips source and destination!',
    tags: ['CEF Format', 'suser vs duser', 'Network Appliance', 'RFC 5424'],
  },
  {
    id: 'map-unified-ecs',
    label: 'Unified ECS Target: user.name',
    sub: 'Normalized Standard: user.name: "FIN-OPS-01"',
    badge: 'CANONICAL FIELD',
    description: 'The normalization engine unifies all three vendor fields into a single canonical keyword: `user.name`.',
    details: 'A single SIEM search query: `user.name: "FIN-OPS-01"` now searches Windows, Linux, and firewall logs simultaneously.',
    tags: ['Canonical Field', 'user.name', 'Single Query', 'Karthik Schema'],
  },
];

// 6. Pillar 3: Parser Hallucination & Raw Verification
export const rawVerificationNodes: VisualNodeItem[] = [
  {
    id: 'raw-parser-bug',
    label: '1. The Parsing Flaw / Mismatch',
    sub: 'When Normalization Goes Wrong ⚠️',
    badge: 'PARSER FAILURE HAZARD',
    description: 'Parsers can misinterpret complex or non-standard log lines, mapping fields incorrectly or truncating parameters.',
    details: 'Example: An outdated grok rule maps an outbound connection IP into `source.ip` instead of `destination.ip`!',
    tags: ['Parser Bug', 'Truncated Line', 'Schema Mismatch', 'Silent Error'],
  },
  {
    id: 'raw-ground-truth',
    label: '2. Consult the Raw Ground Truth',
    sub: 'Compare Normalized vs message Field',
    badge: 'GOLDEN HABIT',
    description: 'Karthik teaches: "Normalisation does not guarantee the parser understood everything. Compare normalised fields with raw data."',
    details: 'Always check the unparsed `event.original` or `message` field when an alert observable looks suspicious or contradictory.',
    tags: ['event.original', 'Raw Ground Truth', 'Verification Habit', 'Karthik Rule'],
  },
  {
    id: 'raw-direction-trap',
    label: '3. The Ambiguous Direction Trap',
    sub: 'Never Silently Relabel Ambiguity',
    badge: 'FORENSIC INTEGRITY',
    description: 'Karthik poses a core test: "Should an ambiguous source address be silently relabelled as a destination?"',
    details: 'Learner answers: "No. Preserve the ambiguity and check the source definition." Never invent directional certainty.',
    tags: ['Preserve Ambiguity', 'No Silent Relabel', 'Check RFC/Docs', 'Forensic Honesty'],
  },
  {
    id: 'raw-audit-check',
    label: '4. Tidy Table vs Accurate Meaning',
    sub: 'Karthik\'s Maxim on Data Fidelity',
    badge: 'DATA FIDELITY',
    description: 'Karthik affirms: "A tidy table is useful only when its meanings remain accurate."',
    details: 'A beautifully formatted SIEM dashboard full of parsed errors is worse than looking at messy raw text.',
    tags: ['Data Fidelity', 'Tidy != True', 'Audit Defense', 'Karthik Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M06-U2-C1 (Build a simple timeline)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Universal UTC Timeline Normalization
export const utcTimelineNodes: VisualNodeItem[] = [
  {
    id: 'utc-master-clock',
    label: '1. Universal Master Clock (UTC)',
    sub: 'Zero Meridian Standard (Z)',
    badge: 'TEMPORAL COORDINATE',
    description: 'Coordinated Universal Time (UTC) serves as the indisputable master timeline anchor for all enterprise security cases.',
    details: 'Eliminates daylight saving time shifts, geographic offsets, and branch-specific clock confusion across global operations.',
    tags: ['Master Clock', 'Zero Offset (Z)', 'ISO-8601', 'Universal Anchor'],
  },
  {
    id: 'utc-ist-offset',
    label: '2. Indian Standard Time (+05:30)',
    sub: 'Bengaluru Branch Offset: UTC + 5h 30m',
    badge: 'BRANCH LOCAL OFFSET',
    description: 'CDAC Bengaluru branch systems operate at IST (UTC+05:30). An event at 01:10 AM IST occurred at 19:40 UTC previous day.',
    details: 'To convert IST to UTC: Subtract 5 hours and 30 minutes from the local timestamp: `01:10 - 05:30 = 19:40 (Previous Day)`.',
    tags: ['Offset: +05:30', 'Subtract 5h 30m', 'Local Branch Clock', 'Formula Anchor'],
  },
  {
    id: 'utc-event-stream',
    label: '3. Normalized Chronological Stream',
    sub: 'Ordered Event Sequence',
    badge: 'SYNCHRONIZED TIMELINE',
    description: 'Once all source records are converted to UTC, events naturally align in true physical chronological sequence.',
    details: 'Event 1 (Auth DC-01 @ 02:45:10Z) &rarr; Event 2 (Sysmon certutil @ 02:45:12Z) &rarr; Event 3 (Zeek TCP @ 02:45:14Z).',
    tags: ['Physical Sequence', 'True Chronology', 'Cause & Effect', 'Aligned Stream'],
  },
  {
    id: 'utc-chronology',
    label: '4. Preserve Original & UTC Both',
    sub: 'Dual-Timestamp Recording Rule',
    badge: 'FORENSIC STANDARD',
    description: 'Karthik instructs: "Never overwrite the original timestamp once converted. Keep original, zone, and UTC value."',
    details: 'Record: `Original: 08:15:10 IST | Zone: Asia/Kolkata | UTC: 2026-10-15T02:45:10Z | Method: -05:30 conversion`.',
    tags: ['Dual Timestamp', 'Traceable Math', 'Audit Admissible', 'No Overwrite'],
  },
];

// 8. Pillar 2: The Midnight Rollover Trap
export const midnightRolloverNodes: VisualNodeItem[] = [
  {
    id: 'roll-ist-oct15',
    label: 'Branch Local Time: 01:10 AM IST',
    sub: 'Calendar Date: 15 October 2026',
    badge: 'LOCAL DATE (15 OCT)',
    description: 'Workstation BLR-BR-WS-04 records an interactive console logon in the early hours of Thursday, 15 October at 01:10 AM.',
    details: 'To a branch manager, this event appears to have occurred on the morning of 15 October.',
    tags: ['Local Time: 01:10 IST', 'Calendar Date: 15 Oct', 'Early Morning', 'Branch Perspective'],
  },
  {
    id: 'roll-utc-oct14',
    label: 'Normalized UTC: 19:40 UTC',
    sub: 'Calendar Date: 14 October 2026 ⚠️',
    badge: 'UTC DATE (14 OCT - ROLLED)',
    description: 'Subtracting 5 hours and 30 minutes pushes the timestamp across midnight, rolling the calendar date back by 1 day!',
    details: '`01:10 (15 Oct) - 05:30 = 19:40 (14 Oct)`. The event actually occurred on Wednesday night in UTC!',
    tags: ['UTC Time: 19:40Z', 'Rolled Date: 14 Oct', 'Midnight Rollover', 'Date Shift'],
  },
  {
    id: 'roll-date-change',
    label: 'The Date Rollover Pitfall',
    sub: 'Searching the Wrong Day in SIEM',
    badge: 'CRITICAL SEARCH TRAP',
    description: 'If an analyst searches the SIEM index for "15 October", this 19:40 UTC event is completely invisible because it indexed on 14 October!',
    details: 'Karthik notes: "IST is UTC plus five hours thirty minutes. Conversion can change the calendar date. Always account for rollover."',
    tags: ['Wrong Day Query', 'Hidden Incident', 'Index Shard Shift', 'Calendar Rollover'],
  },
  {
    id: 'roll-karthik-lesson',
    label: 'Karthik\'s Rollover Lesson',
    sub: 'Always Bracket Across Day Boundaries',
    badge: 'BEST PRACTICE',
    description: 'When investigating early morning local events (00:00 to 05:30 IST), always expand search index filters to include the previous UTC day.',
    details: 'Query filter: `date range: 2026-10-14T18:00:00Z to 2026-10-15T06:00:00Z`. Completely eliminates rollover blind spots.',
    tags: ['Cross-Day Bracket', 'Expanded Filter', 'Zero Blindspot', 'Karthik Lesson'],
  },
];

// 9. Pillar 3: The Unknown Offset Dilemma
export const unknownOffsetNodes: VisualNodeItem[] = [
  {
    id: 'off-missing-zone',
    label: '1. The Unqualified Timestamp',
    sub: 'Log String: "02:45:10" (No Zone Specified)',
    badge: 'AMBIGUOUS TIME STRING ⚠️',
    description: 'A legacy application or IoT device logs time as "02:45:10" without specifying UTC, IST, or UTC offset.',
    details: 'Is it 02:45 AM UTC? 02:45 AM local IST? Or 02:45 AM US Eastern where the cloud server hosting the app is located?',
    tags: ['No Zone Tag', 'Ambiguous Offset', 'Legacy Appliance', 'Missing Context'],
  },
  {
    id: 'off-honest-gap',
    label: '2. The Honest Gap Representation',
    sub: 'Label Uncertainty Rather Than Guess',
    badge: 'FORENSIC INTEGRITY',
    description: 'Karthik tests the apprentice: "Can you precisely place the unknown-zone record without more information?"',
    details: 'Learner answers: "No. I should label that uncertainty rather than invent an offset." Karthik approves: "Show the gap honestly."',
    tags: ['Label Uncertainty', 'Shaded Timeline Gap', 'No Invention', 'Forensic Honesty'],
  },
  {
    id: 'off-no-guesswork',
    label: '3. Never Invent an Offset',
    sub: 'Guesswork Destroys Forensic Value',
    badge: 'CARDINAL RULE',
    description: 'Guessing a timezone offset places an event in the wrong order in the timeline, destroying cause-and-effect proof.',
    details: 'An incorrect assumption could make it look like a file was downloaded BEFORE an attacker logged in, confusing the entire investigation.',
    tags: ['Zero Guessing', 'Cause-and-Effect', 'Timeline Integrity', 'Cardinal Rule'],
  },
  {
    id: 'off-forensic-rule',
    label: '4. Actionable Resolution Path',
    sub: 'How to Resolve Unknown Offsets',
    badge: 'RESOLVING THE UNKNOWN',
    description: 'To resolve the unknown zone: Inspect the device operating system timezone settings, review NTP configuration, or contact system owner.',
    details: 'Record in notes: "Event observed at 02:45:10 (zone undetermined). Action requested: Query system owner for device timezone config."',
    tags: ['NTP Inspection', 'Contact Admin', 'Document Unknown', 'Actionable Note'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M06-U2-C2 (Compare related records across sources)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Stable Identifiers vs Transient IPs
export const stableIdentifiersNodes: VisualNodeItem[] = [
  {
    id: 'id-mac-hardware',
    label: 'Stable Hardware ID: MAC Address',
    sub: 'Physical Layer 2 Address: 00:1A:2B:3C:4D:5E',
    badge: 'STABLE HARDWARE ANCHOR',
    description: 'Burned-in physical hardware address of network interface card on workstation BLR-BR-WS-04.',
    details: 'Remains constant regardless of DHCP address changes, VLAN reassignment, or user logons.',
    tags: ['MAC: 00:1A:2B:3C...', 'Layer 2 Anchor', 'Physical NIC', 'Hardware Stable'],
  },
  {
    id: 'id-sid-identity',
    label: 'Stable Security ID: Active Directory SID',
    sub: 'Account SID: S-1-5-21-38491-91823-1004',
    badge: 'STABLE IDENTITY ANCHOR',
    description: 'Unique Active Directory security identifier permanently assigned to account FIN-OPS-01 upon creation.',
    details: 'Even if the username is renamed or employee transfers departments, the binary SID never changes.',
    tags: ['SID: S-1-5-21...', 'Active Directory', 'Permanent Token', 'Identity Stable'],
  },
  {
    id: 'id-dhcp-lease',
    label: 'Binding Bridge: DHCP Lease Log',
    sub: 'Lease Table: MAC <-> IP Association',
    badge: 'TEMPORAL BINDING LINK',
    description: 'The DHCP server audit log recording exactly which MAC address held which IP address during specific lease intervals.',
    details: 'Crucial bridge: Binds physical hardware to transient network addresses at specific points in time.',
    tags: ['DHCP Lease Table', 'MAC-to-IP Binding', 'Temporal Bridge', 'Audit Anchor'],
  },
  {
    id: 'id-transient-ip',
    label: 'Transient Network ID: IP Address',
    sub: 'Dynamic IP: 10.10.20.15 (Leased)',
    badge: 'TRANSIENT NETWORK POOL ⚠️',
    description: 'Temporary logical network coordinate assigned by DHCP router to BLR-BR-WS-04 for an 8-hour lease window.',
    details: 'Karthik warns: "An IP address is temporary. At 5 PM, desk 04 disconnects and a different laptop may receive 10.10.20.15!"',
    tags: ['Dynamic IP', '8-Hour Lease', 'Transient Pool', 'Recycled Address'],
  },
];

// 11. Pillar 2: The DHCP Lease Window Anchor
export const dhcpLeaseWindowNodes: VisualNodeItem[] = [
  {
    id: 'lease-active-window',
    label: 'Active Lease Window (00:00 - 08:00)',
    sub: 'Workstation BLR-BR-WS-04 (Desk 04)',
    badge: 'VALID LEASE MATCH ✓',
    description: 'DHCP server confirms IP 10.10.20.15 was leased to MAC 00:1A:2B:3C:4D:5E (Desk 04) between 00:00 and 08:00 UTC.',
    details: 'Because the incident occurred at 02:45 UTC (inside the valid lease window), the IP securely binds to BLR-BR-WS-04.',
    tags: ['Valid Lease Window', 'Desk 04 Verified', 'Incident Inside Lease', 'Solid Correlation'],
  },
  {
    id: 'lease-reassigned-ip',
    label: 'Reassigned Window (08:30 - 16:30)',
    sub: 'Laptop BLR-BR-LAP-12 (Guest Desk)',
    badge: 'RECYCLED LEASE (DIFFERENT HOST) ⚠️',
    description: 'At 08:30 UTC, the lease expired and DHCP reassigned 10.10.20.15 to a visiting auditor\'s laptop (BLR-BR-LAP-12)!',
    details: 'Any firewall logs for 10.10.20.15 at 10:00 AM belong to the auditor\'s laptop, NOT to finance workstation desk 04!',
    tags: ['Reassigned Lease', 'Auditor Laptop', 'Different Device', 'IP Recycled'],
  },
  {
    id: 'lease-collision-check',
    label: 'The False Accusation Trap',
    sub: 'Accusing the Wrong Employee',
    badge: 'CRITICAL INVESTIGATIVE ERROR',
    description: 'Failing to check DHCP lease times causes analysts to attribute 10:00 AM firewall violations to the wrong person.',
    details: 'Karthik tests: "What if the address belonged to a different device at the event time?" Learner: "Reject that proposed link."',
    tags: ['False Accusation', 'Check Lease Times', 'Reject False Link', 'Forensic Rigor'],
  },
  {
    id: 'lease-verified-match',
    label: 'Time-Correct Identifier Rule',
    sub: 'Correlate with Temporal Verification',
    badge: 'INVESTIGATION STANDARD',
    description: 'Never use an IP address to correlate cross-source events without verifying the active DHCP lease at that exact minute.',
    details: 'Always document: `IP 10.10.20.15 corroborated via DHCP Lease #8912 active from 00:00 to 08:00 UTC for MAC 00:1A:2B:3C:4D:5E`.',
    tags: ['Time-Correct Match', 'DHCP Lease Quoted', 'Bulletproof Proof', 'Karthik Rule'],
  },
];

// 12. Pillar 3: Coincidence vs Connection Triage
export const coincidenceTriageNodes: VisualNodeItem[] = [
  {
    id: 'coin-same-minute',
    label: 'Event Pair: Same Minute (02:45Z)',
    sub: 'Two Events Occur Simultaneously',
    badge: 'TEMPORAL PROXIMITY',
    description: 'Event A: Account FIN-OPS-01 logs on. Event B: A print spooler job runs on workstation BLR-BR-WS-09.',
    details: 'Both events occurred at 02:45:10 UTC. Learner asks: "Two events happened in the same minute. Must they be related?"',
    tags: ['Same Minute (02:45Z)', 'Temporal Coincidence', 'Unverified Link', 'Questionable'],
  },
  {
    id: 'coin-entity-cross',
    label: 'Entity Cross-Reference Check',
    sub: 'Do they share Host, User, or Socket?',
    badge: 'ENTITY TRIANGULATION',
    description: 'Check entity keys: Event A is on BLR-BR-WS-04 (Finance); Event B is on BLR-BR-WS-09 (HR). They share zero common entities.',
    details: 'Karthik instructs: "Nearby timestamps suggest a possible link, not a proven relationship. Check the surrounding context."',
    tags: ['Zero Shared Entities', 'Different Hosts', 'Different Subnets', 'Coincidence Found'],
  },
  {
    id: 'coin-false-link',
    label: 'Rejecting Coincidence Links',
    sub: 'Discarding Spurious Correlations',
    badge: 'DISCIPLINED REJECTION',
    description: 'Disciplined analysts discard Event B as an unrelated coincidental background event, preventing false narrative rabbit holes.',
    details: 'In a network with 5,000 computers, hundreds of events happen every second. Shared minutes alone prove nothing.',
    tags: ['Reject Spurious Link', 'Discard Noise', 'Focus Scope', 'Disciplined Triage'],
  },
  {
    id: 'coin-verified-chain',
    label: 'The Verified Correlation Chain',
    sub: 'Shared Entity + Causation Window',
    badge: 'VERIFIED CONNECTION ✓',
    description: 'A genuine link requires: 1. Shared entity key (host/user/IP), 2. Logical causation sequence, 3. Temporal proximity.',
    details: 'Event A (Logon on WS-04) &rarr; Event C (certutil execution on WS-04 with FIN-OPS-01 token). Verified connection confirmed.',
    tags: ['Shared Host WS-04', 'Shared Token FIN-OPS-01', 'Logical Sequence', 'Verified Link ✓'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M06-U3-C1 (Corroboration, gaps and uncertainty)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Multi-Source Corroboration Engine
export const corroborationEngineNodes: VisualNodeItem[] = [
  {
    id: 'cor-corroborated',
    label: '1. Corroborated Conclusion',
    sub: 'Supported by Multiple Independent Sources',
    badge: 'HIGH CONFIDENCE (CORROBORATED)',
    description: 'A conclusion supported by independent evidence streams: Sysmon confirms certutil.exe download AND Zeek confirms 450 KB transfer.',
    details: 'Independent witness doctrine: Two separate sensor technologies (host kernel driver + network wire packet tap) agree.',
    tags: ['Host + Network Agree', 'Multi-Source Proof', 'High Confidence', 'Bulletproof Fact'],
  },
  {
    id: 'cor-contradicted',
    label: '2. Contradicted Hypothesis',
    sub: 'Refuted by Telemetry Evidence',
    badge: 'HYPOTHESIS REFUTED',
    description: 'Hypothesis: "Employee Ramesh was working overtime entering financial invoices." Contradicted by Application logs.',
    details: 'Finance ERP logs prove zero transactions, zero invoices viewed, and zero session activity during the entire off-hours window.',
    tags: ['Contradicted by Logs', 'Zero App Activity', 'Hypothesis Disproven', 'Evidence Grounded'],
  },
  {
    id: 'cor-unresolved',
    label: '3. Unresolved / Open Question',
    sub: 'Insufficient Evidence to Decide',
    badge: 'HONEST UNRESOLVED STATUS',
    description: 'Question: "Did the attacker gain physical access to branch desk 04 or connect remotely via stolen credentials?"',
    details: 'Branch CCTV cameras had a power outage, and Wi-Fi logs are uncollected. Status remains UNRESOLVED pending physical badge audit.',
    tags: ['Missing Badge Logs', 'CCTV Outage', 'Unresolved Status', 'No Premature Guesses'],
  },
  {
    id: 'cor-synthesis',
    label: '4. Evidence Quality Synthesis',
    sub: 'Karthik\'s 3-State Verdict Matrix',
    badge: 'ANALYST RIGOR',
    description: 'Every investigative finding must be explicitly classified as Corroborated, Contradicted, or Unresolved.',
    details: 'Never present an unresolved question as a confirmed finding. Rigorous classification protects investigative credibility.',
    tags: ['3-State Matrix', 'Corroborated / Contradicted', 'Unresolved Scope', 'Karthik Doctrine'],
  },
];

// 14. Pillar 2: The Collection Blackout Gap
export const blackoutGapNodes: VisualNodeItem[] = [
  {
    id: 'blk-evidence-hole',
    label: '1. Telemetry Collection Blackout',
    sub: 'Outage Window: 02:30 - 03:00 UTC',
    badge: 'COLLECTION OUTAGE ⚠️',
    description: 'A branch network switch reboot caused an ingestion blackout for workstation BLR-BR-WS-04 for 30 minutes.',
    details: 'Zero events exist in the SIEM for this 30-minute window. An uncritical analyst might claim: "The workstation was dormant."',
    tags: ['Switch Reboot', '30-Minute Blackout', 'Zero Ingested Events', 'Evidence Gap'],
  },
  {
    id: 'blk-shaded-gap',
    label: '2. Shaded Gap Representation',
    sub: 'Visualizing Uncertainty Honestly',
    badge: 'HONEST TIMELINE',
    description: 'Karthik teaches: "The timeline shows a shaded gap rather than invented events. State the limitation honestly."',
    details: 'Draw a grey hatched boundary across 02:30–03:00 UTC labeled: "Telemetry Outage Window (Switch Reboot). Activity Unknown."',
    tags: ['Shaded Hatching', 'Documented Blackout', 'Visible Limitation', 'No Invention'],
  },
  {
    id: 'blk-alternative-src',
    label: '3. Seek Approved Alternative Sources',
    sub: 'Secondary Evidence Triangulation',
    badge: 'INVESTIGATIVE INITIATIVE',
    description: 'When endpoint logs are blacked out, turn to independent secondary sources: perimeter firewall logs, NetFlow, or DHCP leases.',
    details: 'While endpoint logs were offline, the perimeter firewall recorded 12 outbound connection attempts from 10.10.20.15!',
    tags: ['Secondary Source', 'Firewall NetFlow', 'Alternative Proof', 'Triangulation'],
  },
  {
    id: 'blk-honest-note',
    label: '4. The Honest Limitation Note',
    sub: 'Admitting Gaps Protects Investigations',
    badge: 'SUPERVISORY ADVICE',
    description: 'Karthik notes: "Could missing records hide relevant activity? Possibly. Avoid pretending uncertainty has disappeared."',
    details: 'Acknowledge in the case notes: "Findings bounded by a 30-minute endpoint telemetry outage from 02:30 to 03:00 UTC."',
    tags: ['Limitation Disclosed', 'Supervisory Review', 'Transparent Record', 'Karthik Maxim'],
  },
];

// 15. Pillar 3: The Echo Chamber Trap
export const echoChamberNodes: VisualNodeItem[] = [
  {
    id: 'echo-single-source',
    label: 'The Single Source Origin',
    sub: 'One Physical Log: Syslog Port 514',
    badge: 'SINGLE DATA POINT',
    description: 'A single firewall packet drop event is emitted by the perimeter gateway over syslog port 514.',
    details: 'There is only ONE physical observation made in reality. It is received and forwarded by the central syslog daemon.',
    tags: ['Single Physical Event', 'Port 514 Syslog', 'One Observation', 'Ground Truth'],
  },
  {
    id: 'echo-three-dashboards',
    label: 'Three Forwarded Display Panes',
    sub: 'Dashboard 1 • Dashboard 2 • SIEM',
    badge: 'DISPLAY REPLICATION',
    description: 'The single syslog event is forwarded to: 1. SOC Live Wallboard, 2. Compliance Dashboard, 3. Elastic SIEM Index.',
    details: 'An analyst looks at three separate computer screens and exclaims: "Three different systems detected the attack!"',
    tags: ['3 Display Screens', 'Replicated Feed', 'Single Event Copied', 'Apparent Multiplicity'],
  },
  {
    id: 'echo-illusion-proof',
    label: 'The Echo Chamber Illusion',
    sub: 'Confusing Copies with Corroboration ⚠️',
    badge: 'CRITICAL COGNITIVE TRAP',
    description: 'Karthik tests: "If two dashboards show the same forwarded event, is that independent corroboration?"',
    details: 'Learner answers: "No. They are copies of one source observation." Seeing three copies of one log is NOT three witnesses!',
    tags: ['Copies != Corroboration', 'Echo Chamber', 'Single Point of Failure', 'Cognitive Trap'],
  },
  {
    id: 'echo-karthik-rule',
    label: 'Karthik\'s Corroboration Rule',
    sub: 'Count Independent Sensors, Not Screens',
    badge: 'FORENSIC PRINCIPLE',
    description: 'Karthik affirms: "Count independent evidence, not just the number of screens."',
    details: 'Genuine corroboration requires distinct sensor technologies (e.g., host endpoint Sysmon + network packet tap Zeek).',
    tags: ['Independent Sensors', 'Count Real Evidence', 'No Echo Chamber', 'Karthik Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M06-U3-C2 (Observed fact versus analyst inference)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The Two-Column Ledger: Fact vs Hypothesis
export const twoColumnLedgerNodes: VisualNodeItem[] = [
  {
    id: 'ledg-observed-fact',
    label: 'Column A: Observed Facts (Verified)',
    sub: 'Literal Verifiable Observables',
    badge: 'COLUMN A: HARD EVIDENCE',
    description: 'Records strictly what can be proven with log records: timestamps, Event IDs, hostnames, user accounts, and hashes.',
    details: 'Entry: "At 02:45:10 UTC, account FIN-OPS-01 logged on. At 02:45:12 UTC, certutil.exe executed with foreign IP argument."',
    tags: ['Verified Facts', 'Log Cited', 'Literal Observables', 'Indisputable Truth'],
  },
  {
    id: 'ledg-hypothesis-test',
    label: 'Column B: Hypotheses (To Be Tested)',
    sub: 'Plausible Explanations to Investigate',
    badge: 'COLUMN B: TESTABLE THEORIES',
    description: 'Karthik teaches: "Write a hypothesis as something to test, not something the reader must accept as proven truth."',
    details: 'Entry: "Hypothesis 1: Account credentials were stolen via phishing. Test: Inspect email gateway logs for credential lures."',
    tags: ['Testable Hypothesis', 'Subject to Proof', 'Scientific Method', 'Open Question'],
  },
  {
    id: 'ledg-competing-theory',
    label: 'Competing Explanations (Alternative)',
    sub: 'Ruling Out Alternative Explanations',
    badge: 'COMPETING HYPOTHESES',
    description: 'Never fixate on a single narrative. Consider alternative theories: legitimate IT automation, employee overtime, or scheduled testing.',
    details: 'Hypothesis 2: Authorized penetration test. Test: Check approved change requests and SOC calendar for active red team exercises.',
    tags: ['Alternative Theories', 'Compete & Test', 'Red Team Check', 'No Confirmation Bias'],
  },
  {
    id: 'ledg-admissibility',
    label: 'Evidentiary Admissibility Standard',
    sub: 'Courtroom & Audit Integrity',
    badge: 'LEGAL ADMISSIBILITY',
    description: 'Separating facts from hypotheses ensures reports withstand cross-examination in court, HR hearings, and executive briefings.',
    details: 'An analyst who presents unverified theories as facts loses professional credibility and jeopardizes legal proceedings.',
    tags: ['Admissible Evidence', 'Clear Boundary', 'Executive Ready', 'Forensic Integrity'],
  },
];

// 17. Pillar 2: The Brute-Force Presumption Trap
export const presumptionTrapNodes: VisualNodeItem[] = [
  {
    id: 'pres-fail-sequence',
    label: 'The Sequence: 3 Fails then 1 Success',
    sub: 'Event 4625 (x3) -> Event 4624 (x1)',
    badge: 'AMBIGUOUS PATTERN ⚠️',
    description: 'Workstation BLR-BR-WS-04 records 3 failed logons at 02:43 UTC followed by a successful logon at 02:45 UTC.',
    details: 'Novice analyst conclusion: "A brute-force dictionary attack succeeded and broke the employee\'s password!"',
    tags: ['3 Fails + 1 Success', 'Pattern Ambiguity', 'Jumping to Conclusions', 'Triage Challenge'],
  },
  {
    id: 'pres-alternative-explan',
    label: 'Alternative Real-World Explanations',
    sub: 'Typo vs Admin Test vs Script vs Attack',
    badge: 'RIVAL EXPLANATIONS',
    description: 'Karthik asks: "Can I say failures followed by success proves a brute-force compromise? No. Investigate alternatives."',
    details: 'Explanation A: Employee typed caps-lock 3 times. Explanation B: Stale credentials in automated Outlook script. Explanation C: Brute-force.',
    tags: ['Caps-Lock Typo', 'Stale Script', 'Brute Force', 'Alternative Hypotheses'],
  },
  {
    id: 'pres-user-interview',
    label: 'The Corroboration Interview Step',
    sub: 'Contact Branch User & Manager',
    badge: 'CONTEXT GATHERING',
    description: 'Before declaring a catastrophic account compromise, contact the branch employee: "Were you at your desk at 02:45 AM?"',
    details: 'If the employee answers: "I was asleep in bed," the hypothesis of credential theft gains decisive human corroboration.',
    tags: ['Human Context', 'Call Employee', 'Presence Verification', 'Decisive Clue'],
  },
  {
    id: 'pres-evidence-gate',
    label: 'Karthik\'s Evidence Gate',
    sub: 'Presumptions Are Not Proof',
    badge: 'SCIENTIFIC DISCIPLINE',
    description: 'Karthik affirms: "Describe the exact sequence in Column A and document the candidate explanations in Column B."',
    details: 'Keep investigation disciplined: Never confuse a plausible scenario with verified physical truth.',
    tags: ['No Speculation', 'Document Sequence', 'Verify First', 'Karthik Principle'],
  },
];

// 18. Pillar 3: The Actionable Uncertainty Note
export const uncertaintyNoteNodes: VisualNodeItem[] = [
  {
    id: 'note-precise-unknown',
    label: '1. What is Precisely Unknown',
    sub: 'Define Uncertainty Explicitly',
    badge: 'CLEAR UNCERTAINTY',
    description: 'A vague note says: "Activity is suspicious and uncertain." A professional note states: "Physical presence at desk 04 is unverified."',
    details: 'Karthik asks: "What makes an uncertainty note useful rather than vague?" Learner: "It states exactly what is unknown."',
    tags: ['Specific Unknown', 'No Vague Fluff', 'Explicit Boundary', 'Professional Tone'],
  },
  {
    id: 'note-test-recipe',
    label: '2. Which Evidence Could Resolve It',
    sub: 'Actionable Next Steps Recipe',
    badge: 'RESOLUTION RECIPE',
    description: 'The note specifies the exact test or evidence artifact needed: "Requesting physical branch turnstile badge logs for employee Ramesh."',
    details: 'Gives the next shift analyst or Tier 2 investigator an immediate, actionable task to prove or disprove the hypothesis.',
    tags: ['Actionable Recipe', 'Request Badge Logs', 'Clear Next Step', 'Shift Handover'],
  },
  {
    id: 'note-supervisory-handover',
    label: '3. Traceable Finance Timeline',
    sub: 'Case #2026-881 Dossier Milestone',
    badge: 'TRACEABLE DOSSIER',
    description: 'Karthik commends: "Exactly. Our finance timeline is now traceable and appropriately qualified."',
    details: 'Case #2026-881 advances with bulletproof integrity: Facts verified, hypotheses testable, gaps documented honestly.',
    tags: ['Traceable Timeline', 'Supervised Review', 'Case Milestone', 'Ready for Tier 2'],
  },
  {
    id: 'note-dossier-signed',
    label: '4. Supervisory Sign-Off & Seal',
    sub: 'Mentor Karthik & Lead Ananya',
    badge: 'SIGNED & SEALED ✓',
    description: 'Official supervisory sign-off: Case #2026-881 delivered with multi-source UTC timeline, raw verifications, and clear next steps.',
    details: 'The apprentice analyst completes Module 06 with high forensic maturity, ready for host security inspection in Module 07.',
    tags: ['Signed & Sealed', 'Module 06 Complete', 'Forensic Maturity', 'Next: Module 07'],
  },
];

// =============================================================================
// COMPLETE MODULE 06 NODES LOOKUP MAP
// =============================================================================
export const module06NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: M06-U1-C1 (Timestamp, source, fields and outcome)
  'm06-literal-event': literalEventNodes,
  'm06-timestamp-triad': timestampTriadNodes,
  'm06-outcome-precision': outcomePrecisionNodes,

  // Chapter 2: M06-U1-C2 (Parsing and normalization concepts)
  'm06-parsing-pipeline': parsingPipelineNodes,
  'm06-field-mapping': fieldMappingNodes,
  'm06-raw-verification': rawVerificationNodes,

  // Chapter 3: M06-U2-C1 (Build a simple timeline)
  'm06-utc-timeline': utcTimelineNodes,
  'm06-midnight-rollover': midnightRolloverNodes,
  'm06-unknown-offset': unknownOffsetNodes,

  // Chapter 4: M06-U2-C2 (Compare related records across sources)
  'm06-stable-identifiers': stableIdentifiersNodes,
  'm06-dhcp-lease-window': dhcpLeaseWindowNodes,
  'm06-coincidence-triage': coincidenceTriageNodes,

  // Chapter 5: M06-U3-C1 (Corroboration, gaps and uncertainty)
  'm06-corroboration-engine': corroborationEngineNodes,
  'm06-blackout-gap': blackoutGapNodes,
  'm06-echo-chamber': echoChamberNodes,

  // Chapter 6: M06-U3-C2 (Observed fact versus analyst inference)
  'm06-two-column-ledger': twoColumnLedgerNodes,
  'm06-presumption-trap': presumptionTrapNodes,
  'm06-uncertainty-note': uncertaintyNoteNodes,
};
