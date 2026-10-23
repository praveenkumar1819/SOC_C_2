'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 12: SOAR & BASIC SOC AUTOMATION — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Karthik (SOC Automation Lead & Workflow Architect)
// Motto: "Now automation has a purpose you understand. A trigger starts a workflow; actions perform its defined tasks. Automating an assumption only repeats the mistake faster. Silence must not turn into accidental authorisation. Safe automation rewards restraint as well as successful execution."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M12-U1-C1 (The task you have already repeated)
// -----------------------------------------------------------------------------

// 1. Pillar 1: Playbook Anatomy Pipeline (Trigger, Action, Condition, Input, Output)
export const playbookAnatomyPipelineNodes: VisualNodeItem[] = [
  {
    id: 'pb-trigger-node',
    label: '1. Playbook Ingestion Trigger',
    sub: 'Webhook / SIEM Alert Intake Event',
    badge: 'PLAYBOOK TRIGGER',
    description: 'The automated signal that initiates a workflow. Can be an incoming SIEM alert, an analyst manual button press, or an automated webhook from an email gateway.',
    details: 'Mentor Karthik explains: "A trigger starts a workflow. But is a playbook just a list of clicks? No. It needs conditions, inputs, outputs, and failure handling."',
    tags: ['Trigger: Webhook', 'Alert Ingestion', 'Event Driven', 'Workflow Starter'],
  },
  {
    id: 'pb-input-contract',
    label: '2. Input Schema & Data Contract',
    sub: 'Extracting Target IP, Hostname & Hash',
    badge: 'DATA CONTRACT',
    description: 'Strict schema parser that extracts required variables from the raw alert payload: Target IP, Device ID, User Principal Name, and Attachment Hash.',
    details: 'Karthik notes: "Every action requires a clean input. If the input data contract is malformed, downstream security tools will fail or misbehave."',
    tags: ['Input Schema', 'JSON Contract', 'Variable Extraction', 'Data Integrity'],
  },
  {
    id: 'pb-action-node',
    label: '3. Automated Enrichment Action',
    sub: 'API Connectors to Threat Feeds & EDR',
    badge: 'AUTOMATED ACTION',
    description: 'Deterministic API calls dispatched to external systems: querying threat intelligence databases, checking Active Directory group memberships, or pinging host health.',
    details: 'Karthik instructs: "Actions perform the repetitive mechanical toil so you, the analyst, can focus on cognitive reasoning."',
    tags: ['REST API Call', 'Automated Action', 'Repetitive Toil', 'Enrichment Task'],
  },
  {
    id: 'pb-output-decision',
    label: '4. Decision Condition & Output Docket',
    sub: 'Branching Logic & Standardized Docket',
    badge: 'DECISION & OUTPUT',
    description: 'Evaluates the returned action results against policy thresholds (e.g. Reputation Score > 80) and prepares a structured output docket for the case ticket.',
    details: 'Karthik concludes: "Conditions direct the path. Outputs feed the next action or present clear evidence to human analysts."',
    tags: ['Decision Branch', 'Threshold Check', 'Output Docket', 'Structured Result'],
  },
];

// 2. Pillar 2: Input Validation vs Automating an Assumption
export const inputValidationGuardNodes: VisualNodeItem[] = [
  {
    id: 'val-raw-payload',
    label: '1. Raw Unvalidated Alert Payload',
    sub: 'Malformed String: "198.51.100.42:8080/path"',
    badge: 'RAW PAYLOAD',
    description: 'Unsanitized input containing port numbers, protocol prefixes, leading spaces, or invalid characters that break downstream firewall APIs.',
    details: 'Karthik asks: "Should a workflow assume every alert contains a valid address? No. Automating an assumption only repeats the mistake faster."',
    tags: ['Raw Input', 'Syntax Noise', 'Unsanitized Data', 'Failure Risk'],
  },
  {
    id: 'val-regex-validator',
    label: '2. Deterministic Regex & IP Validator',
    sub: 'RFC1918 / Public IPv4 & SHA-256 Check',
    badge: 'REGEX VALIDATOR',
    description: 'Validates observable formats using strict regular expressions: IPv4 octet bounds (0-255), hex-only SHA-256 (64 chars), and valid RFC5322 email syntax.',
    details: 'Karthik teaches: "The regex filter strips whitespace, validates format, and verifies that the string represents a genuine observable."',
    tags: ['Regex Parser', 'IPv4 Bounds', 'Hex Validation', 'Syntax Gate'],
  },
  {
    id: 'val-internal-exclusion',
    label: '3. RFC1918 / Loopback Exclusion Gate',
    sub: 'Preventing Query on 127.0.0.1 or 10.0.0.0/8',
    badge: 'EXCLUSION FILTER',
    description: 'Ensures private non-routable IP addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.1) are never forwarded to public threat intelligence APIs.',
    details: 'Karthik highlights: "Querying public VirusTotal for your internal domain controller IP 10.10.10.1 wastes API credits and leaks your internal IP scheme."',
    tags: ['RFC1918 Gate', 'Internal Filter', 'Loopback Catch', 'API Protection'],
  },
  {
    id: 'val-clean-observable',
    label: '4. Clean Sanitized Observable Object',
    sub: 'Normalized: "198.51.100.42" (Type: Public IPv4)',
    badge: 'VALIDATED OBJECT',
    description: 'The verified, validated observable ready for safe downstream pipeline execution with zero syntax errors or API injection hazards.',
    details: 'Karthik concludes: "Garbage in, garbage out. A validated observable ensures reliable automation every single time."',
    tags: ['Clean Observable', 'Type Confirmed', 'Zero Injection', 'Safe Pipeline'],
  },
];

// 3. Pillar 3: Conditional Branching & Safe Playbook Execution
export const conditionalBranchingLogicNodes: VisualNodeItem[] = [
  {
    id: 'bra-condition-eval',
    label: '1. Conditional Logic Node (The Fork)',
    sub: 'IF Reputation > 70 AND IsManagedHost == True',
    badge: 'LOGIC FORK',
    description: 'The deterministic branch point where the playbook evaluates multiple Boolean criteria to determine the appropriate workflow path.',
    details: 'Karthik instructs: "Conditions must be mutually exclusive and collectively exhaustive. Every scenario must have a designated branch."',
    tags: ['Boolean Logic', 'Branch Fork', 'Threshold Check', 'Deterministic Routing'],
  },
  {
    id: 'bra-benign-branch',
    label: '2. Green Branch: Known Benign Observable',
    sub: 'Reputation Clean • Auto-Tag & Close Sub-Task',
    badge: 'BENIGN PATH',
    description: 'When the observable is verified as clean (e.g. Microsoft CDN update server), the playbook records the finding, tags the ticket, and closes the sub-task.',
    details: 'Karthik notes: "Benign paths should document why they are benign and notify the analyst, leaving an immutable audit trail."',
    tags: ['Benign Branch', 'Auto-Tagging', 'Ticket Update', 'Safe Closure'],
  },
  {
    id: 'bra-suspicious-branch',
    label: '3. Red Branch: Confirmed Malicious Observable',
    sub: 'Active C2 Detected • Route to Approval Gate',
    badge: 'SUSPICIOUS PATH',
    description: 'When threat intelligence returns a confirmed high-confidence malicious verdict, the playbook prepares a draft case update and summons human approval.',
    details: 'Karthik warns: "The red branch does NOT immediately execute destructive isolation! It prepares context and routes to the human gate."',
    tags: ['Suspicious Branch', 'High Confidence', 'Draft Update', 'Human Gate Routing'],
  },
  {
    id: 'bra-ambiguous-branch',
    label: '4. Amber Branch: Ambiguous / Unknown Verdict',
    sub: 'Zero Hits / Missing Data • Specialist Triage',
    badge: 'AMBIGUOUS PATH',
    description: 'When threat feeds return zero hits or inconclusive scores, the playbook flags honest uncertainty and routes the alert to L1 manual inspection.',
    details: 'Karthik concludes: "Never force an ambiguous finding into a clean box. An amber branch ensures zero-day leads are not swept under the rug."',
    tags: ['Amber Branch', 'Honest Uncertainty', 'Manual Inspection', 'Fail-Safe Routing'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M12-U1-C2 (Helpful repetition)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Automated Multi-Source Context Enrichment
export const automatedEnrichmentLoopNodes: VisualNodeItem[] = [
  {
    id: 'enr-alert-context',
    label: '1. Ingested Alert Observable Context',
    sub: 'IP: 198.51.100.42 • Hash: 7f9b4c2... • User: FIN-OPS-01',
    badge: 'ALERT SEED',
    description: 'The raw seed observables ingested from the initial alert, requiring contextual enrichment across multiple security domains.',
    details: 'Mentor Karthik explains: "This exercise uses mocked connectors and training data; it does not call live enterprise tools. We enrich context automatically."',
    tags: ['Observable Seed', 'Multi-Domain', 'Ingestion Payload', 'Automation Task'],
  },
  {
    id: 'enr-misp-connector',
    label: '2. Threat Intelligence Connector (MISP/OTX)',
    sub: 'Query: IP Reputation, Campaign Tags, Last Seen',
    badge: 'THREAT INTEL API',
    description: 'Mocked connector dispatching parallel API queries to threat intelligence repositories, pulling known C2 associations and confidence scores.',
    details: 'Karthik notes: "The connector executes in 1.2 seconds, replacing 15 minutes of manual copy-pasting across browser tabs."',
    tags: ['MISP Connector', 'Threat Intel API', 'Parallel Query', 'Fast Enrichment'],
  },
  {
    id: 'enr-ldap-connector',
    label: '3. Identity Directory Connector (Active Directory)',
    sub: 'Query: Department, Manager, Title, Groups',
    badge: 'IDENTITY API',
    description: 'Queries enterprise directory for account principal metadata: verifying user role, department, manager, and recent password changes.',
    details: 'Karthik instructs: "Identity context reveals whether the account belongs to branch finance or global IT infrastructure."',
    tags: ['LDAP Connector', 'User Context', 'Identity Query', 'Role Verification'],
  },
  {
    id: 'enr-edr-connector',
    label: '4. EDR Host Telemetry Connector',
    sub: 'Query: Host Status, IP Mappings, Recent Processes',
    badge: 'EDR API',
    description: 'Connects to EDR API to pull live workstation posture: checking if BLR-BR-WS-04 is online, its sensor health, and recently spawned processes.',
    details: 'Karthik concludes: "In less than 3 seconds, the playbook gathers threat intel, user identity, and endpoint health into a single unified dossier."',
    tags: ['EDR Connector', 'Host Status', 'Process Query', 'Dossier Assembly'],
  },
];

// 5. Pillar 2: Case Record Notification & Draft Docket Generation
export const caseNotificationDocketNodes: VisualNodeItem[] = [
  {
    id: 'doc-auto-docket',
    label: '1. Automated Context Docket Generation',
    sub: 'Case #2026-881 Unified Evidence Packet',
    badge: 'EVIDENCE PACKET',
    description: 'The SOAR engine synthesizes the multi-source enrichment findings into a clean, human-readable evidence packet attached directly to the case ticket.',
    details: 'Karthik asks: "Will the playbook close the case for you? No. It prepares context and a draft update; the analyst reviews what the evidence supports."',
    tags: ['Evidence Docket', 'Case #2026-881', 'Human-Readable', 'Auto-Synthesized'],
  },
  {
    id: 'doc-draft-update',
    label: '2. Draft Case Note & Hypothesis Summary',
    sub: 'Pre-Formatted Note for Analyst Review',
    badge: 'DRAFT CASE NOTE',
    description: 'Pre-populates an editable draft note with timestamps, observables, and threat feed findings. The analyst can edit, approve, or reject the summary.',
    details: 'Karthik teaches: "The draft note saves typing time. But the analyst is legally and procedurally responsible for verifying the facts before submitting."',
    tags: ['Draft Note', 'Analyst Review', 'Editable Docket', 'Accountability'],
  },
  {
    id: 'doc-slack-notify',
    label: '3. Multi-Channel SOC Notification Channel',
    sub: 'ChatOps Dispatch to #soc-triage-tier1',
    badge: 'CHATOPS NOTIFICATION',
    description: 'Dispatches structured webhooks to the SOC communication channels (Teams/Slack) alerting on-shift analysts to high-priority enriched alerts.',
    details: 'Karthik notes: "ChatOps notifications ensure shift analysts see high-confidence alerts instantly without constantly refreshing ticket queues."',
    tags: ['ChatOps Webhook', 'Slack/Teams', 'Real-Time Alert', 'Queue Acceleration'],
  },
  {
    id: 'doc-karthik-rule',
    label: '4. Karthik\'s Value-Add Doctrine',
    sub: 'Useful Automation Improves Evidence, Not Just Speed',
    badge: 'KARTHIK DOCTRINE',
    description: 'Core SOC automation principle: The purpose of automation is not merely speed; it is delivering high-fidelity, defensible evidence that empowers better human judgment.',
    details: 'Karthik concludes: "Useful automation improves the evidence record, not just the speed. Speed without accuracy is merely accelerated disaster."',
    tags: ['Evidence Record', 'Accuracy Over Speed', 'Empowered Analyst', 'Core Principle'],
  },
];

// 6. Pillar 3: Notification Standards (Source, Timestamp, Finding, Uncertainty)
export const notificationEvidenceStandardsNodes: VisualNodeItem[] = [
  {
    id: 'std-source-attr',
    label: '1. Sourced Intelligence Provenance',
    sub: 'Source: AlienVault OTX & FinCorp MISP',
    badge: 'SOURCE ATTRIBUTION',
    description: 'Every automated notification must cite the exact external intelligence feeds or internal telemetry sensors that contributed data.',
    details: 'Karthik asks: "What should the notification include besides a colored reputation label? The source, timestamp, relevant result, case reference, and uncertainty."',
    tags: ['Source Provenance', 'Feed Attribution', 'Verified Vendor', 'Evidence Standard'],
  },
  {
    id: 'std-utc-stamp',
    label: '2. Coordinated Universal Timestamp (UTC)',
    sub: 'Timestamp: 2026-10-15T10:14:22Z',
    badge: 'UTC TIMESTAMP',
    description: 'The exact millisecond timestamp when the automated API lookup was completed, establishing an immutable audit trail for forensic review.',
    details: 'Karthik instructs: "Always include the UTC timestamp. Threat intelligence is perishable; recording the exact lookup time proves what was known when."',
    tags: ['2026-10-15T10:14:22Z', 'UTC Standard', 'Temporal Anchor', 'Audit Trail'],
  },
  {
    id: 'std-finding-summary',
    label: '3. Relevant Functional Finding Statement',
    sub: 'Observable: 198.51.100.42 (Active C2 Cobalt Strike)',
    badge: 'FINDING STATEMENT',
    description: 'Clear factual description of the observable\'s behavior and role in the attack campaign, avoiding vague labels like "suspicious".',
    details: 'Karthik teaches: "State the specific finding: \'Active Cobalt Strike beacon\' is actionable; \'Bad IP\' is useless."',
    tags: ['Functional Finding', 'Cobalt Strike C2', 'Actionable Intel', 'Clear Language'],
  },
  {
    id: 'std-uncertainty-bounds',
    label: '4. Explicit Uncertainty & Case Reference',
    sub: 'Case: #2026-881 • Confidence: HIGH • Attribution: UNKNOWN',
    badge: 'UNCERTAINTY LIMITS',
    description: 'Mandatory documentation boundary stating the limits of confidence and linking the finding directly to the central case record.',
    details: 'Karthik concludes: "Acknowledging uncertainty in notifications prevents panic and ensures analysts make measured decisions."',
    tags: ['Case Reference', 'Confidence Bounds', 'Honest Uncertainty', 'Unit 1 Certified'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M12-U2-C1 (A gate means a real decision)
// -----------------------------------------------------------------------------

// 7. Pillar 1: The Human-In-The-Loop Approval Node
export const humanApprovalGateNodes: VisualNodeItem[] = [
  {
    id: 'gate-read-only-loop',
    label: '1. Read-Only Automated Enrichment Zone',
    sub: 'Zero Disruption • Threat Intel & LDAP Queries',
    badge: 'READ-ONLY ZONE',
    description: 'The safe automated zone where playbooks query threat feeds, calculate hashes, and pull directory metadata without modifying production systems.',
    details: 'Mentor Karthik emphasizes: "An approval node separates contextual enrichment from a proposed disruptive action."',
    tags: ['Read-Only Safe', 'Zero Impact', 'Enrichment Zone', 'Safe Execution'],
  },
  {
    id: 'gate-approval-node',
    label: '2. The Human Approval Gate (Hard Barrier)',
    sub: 'Mandatory Authorization Pause Point',
    badge: 'APPROVAL GATE',
    description: 'A hard programmatic barrier that suspends playbook execution and dispatches an interactive authorization modal to on-duty Shift Leads.',
    details: 'Karthik instructs: "A gate means a real decision. The playbook cannot proceed until an authorized human inspects the evidence and signs off."',
    tags: ['Human in the Loop', 'Hard Barrier', 'Suspended State', 'Real Decision'],
  },
  {
    id: 'gate-action-boundary',
    label: '3. Proposed Disruptive Action Zone',
    sub: 'Host Isolation / Account Disable / IP Block',
    badge: 'DISRUPTIVE ZONE',
    description: 'The high-impact execution zone where containment commands (network isolation, account suspension) are held pending explicit approval.',
    details: 'Karthik warns: "Disruptive actions touch business operations. They must never reside in the automated loop without an approval gate."',
    tags: ['Disruptive Action', 'Host Isolation', 'Account Lock', 'Business Impact'],
  },
  {
    id: 'gate-karthik-doctrine',
    label: '4. Karthik\'s Control Doctrine',
    sub: 'Approval Must Apply to the Specific Action & Target',
    badge: 'KARTHIK DOCTRINE',
    description: 'Fundamental governance rule: Approval must come from an authorized role, apply strictly to the named target entity, and have a defined time window.',
    details: 'Karthik concludes: "Can a previous approval for another host count here? No! Check scope, validity, and policy. A blank approval field is not permission."',
    tags: ['Specific Target', 'Role Authority', 'Zero Blanket Approval', 'Governance Rule'],
  },
];

// 8. Pillar 2: Role, Scope & Validity Matrix
export const roleAuthorizationScopeNodes: VisualNodeItem[] = [
  {
    id: 'scope-authorized-role',
    label: '1. Authorized Role Verification (Shift Lead / L2)',
    sub: 'Approver: Shift Lead Ananya (Emp ID: SEC-402)',
    badge: 'ROLE VERIFICATION',
    description: 'Validates that the approver possesses the designated organizational authority to authorize the specific containment lever.',
    details: 'Karthik teaches: "An L1 apprentice cannot approve host isolation. The workflow verifies that the user signing off holds the Shift Lead or Incident Commander role."',
    tags: ['Role Check', 'Shift Lead Ananya', 'Authority Matrix', 'Governance Policy'],
  },
  {
    id: 'scope-target-binding',
    label: '2. Strict Target Entity Binding',
    sub: 'Target: BLR-BR-WS-04 (IP: 10.10.20.15)',
    badge: 'TARGET BINDING',
    description: 'Cryptographically binds the approval token to the exact device hostname and MAC address. Prevents accidental containment of unintended hosts.',
    details: 'Karthik warns: "If approval was granted for WS-04, the script must fail if executed against WS-05. Target binding prevents misdirected containment."',
    tags: ['Target Binding', 'BLR-BR-WS-04', 'Entity Lockdown', 'Zero Target Drift'],
  },
  {
    id: 'scope-time-validity',
    label: '3. Time-Bounded Validity Window',
    sub: 'Approval Valid for 30 Minutes (Expires 10:45 UTC)',
    badge: 'TIME BOUNDED',
    description: 'Approvals expire automatically after a defined window. Prevents stale approvals granted during the morning shift from being executed hours later.',
    details: 'Karthik explains: "Network and business conditions change. An approval granted at 09:00 cannot be used at 14:00 after shift handover."',
    tags: ['30-Min Window', 'Expiration Token', 'No Stale Permissions', 'Temporal Safety'],
  },
  {
    id: 'scope-blank-trap',
    label: '4. The Blank Approval Trap (Zero Permission)',
    sub: 'Blank Approver Field = Automatic Reject',
    badge: 'BLANK FIELD TRAP',
    description: 'Fail-safe programmatic check: If an approval request has an empty, null, or undefined approver field, the workflow treats it as an automatic denial.',
    details: 'Karthik emphasizes: "A blank approval field is not permission! If the system encounters an undefined user, it halts instantly and logs an audit exception."',
    tags: ['Null Check', 'Blank Field Trap', 'Default Deny', 'Fail-Safe Logic'],
  },
];

// 9. Pillar 3: Timeout & Silence Fallback ("Silence Is Not Authorization")
export const timeoutSilenceDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'time-timeout-clock',
    label: '1. Approval Request Timer (15-Minute Countdown)',
    sub: 'Request Sent: 10:15 UTC • Expiry: 10:30 UTC',
    badge: 'APPROVAL TIMER',
    description: 'A deterministic countdown timer tracking pending human authorization requests. Prevents workflows from hanging indefinitely in a frozen state.',
    details: 'Karthik asks: "What should happen if the approval request times out? Do not perform the disruptive action; record the timeout and notify the owner."',
    tags: ['Countdown Timer', '15-Minute Expiry', 'No Frozen Playbooks', 'Bounded Waiting'],
  },
  {
    id: 'time-silence-trap',
    label: '2. The "Silence Is Authorization" Fallacy',
    sub: 'Silence Must NEVER Turn Into Accidental Permission',
    badge: 'SILENCE FALLACY',
    description: 'Dangerous assumption: Believing that because nobody replied or rejected the request, the workflow can assume consent and proceed with containment.',
    details: 'Karthik instructs: "Silence must not turn into accidental authorization! If the approver is away from their desk, the system defaults to safety: zero action."',
    tags: ['Silence Fallacy', 'No Passive Consent', 'Default Safe', 'Critical Doctrine'],
  },
  {
    id: 'time-fail-safe-route',
    label: '3. Fail-Safe Non-Execution Branch',
    sub: 'Action Aborted • Ticket Updated • Owner Alerted',
    badge: 'FAIL-SAFE ROUTE',
    description: 'When the timer hits zero with no response, the workflow aborts the proposed containment, logs a TIMEOUT event, and alerts the secondary on-call engineer.',
    details: 'Karthik teaches: "The fail-safe branch ensures business operations continue uninterrupted while making the missed approval visible."',
    tags: ['Action Aborted', 'Timeout Event', 'Secondary Alert', 'Business Continuity'],
  },
  {
    id: 'time-karthik-seal',
    label: '4. Karthik\'s Safe Gateway Doctrine',
    sub: 'Explicit Authorization or Zero Disruption',
    badge: 'GOVERNANCE SEAL',
    description: 'Foundational SOC automation doctrine: Every disruptive action requires an active, verified, affirmative human approval token. Everything else results in zero action.',
    details: 'Karthik concludes: "Silence is refusal. Timeouts are non-execution. This doctrine keeps our SOC professional, defensible, and trusted by the enterprise."',
    tags: ['Affirmative Consent', 'Zero Disruption', 'Safe Gateway', 'Unit 2 Certified'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M12-U2-C2 (When a service does not answer)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Connector Failure & API Timeout Handling
export const connectorFailureHandlingNodes: VisualNodeItem[] = [
  {
    id: 'fail-api-timeout',
    label: '1. External API Timeout / Connection Refused',
    sub: 'Threat Intelligence Connector Returns HTTP 504',
    badge: 'CONNECTOR FAILURE',
    description: 'External or internal dependency fails to respond: threat intelligence feed down for maintenance, API gateway rate-limited, or network socket timeout.',
    details: 'Mentor Karthik notes: "Failure handling preserves the distinction between \'no adverse result\' and \'no result available\'."',
    tags: ['HTTP 504 Timeout', 'API Down', 'Socket Refusal', 'Dependency Failure'],
  },
  {
    id: 'fail-fallacy-trap',
    label: '2. The "Timeout Equals Clean" Fallacy',
    sub: 'Treating a Failed Query as a Benign Verdict',
    badge: 'FATAL FALLACY',
    description: 'Dangerous beginner bug: Writing playbook logic that catches a timeout exception and records the observable as "Clean / 0 Hits" so the workflow can finish.',
    details: 'Karthik asks: "Should a failed lookup be recorded as clean so the playbook can finish? No! A timeout means you have NO data, not that the observable is safe."',
    tags: ['Fatal Fallacy', 'Timeout ≠ Clean', 'Data Absence', 'Logic Bug'],
  },
  {
    id: 'fail-explicit-status',
    label: '3. Explicit Status: ENRICHMENT_INCOMPLETE',
    sub: 'Recording Incomplete Telemetry in Case Docket',
    badge: 'EXPLICIT STATUS',
    description: 'The playbook marks the observable as "ENRICHMENT_INCOMPLETE", logs the exact API error code, and routes the ticket to the analyst for manual verification.',
    details: 'Karthik instructs: "Report the failure, follow bounded retry policy, and route unresolved work for review."',
    tags: ['Enrichment Incomplete', 'Error Code 504', 'Manual Triage', 'Honest Status'],
  },
  {
    id: 'fail-karthik-rule',
    label: '4. Karthik\'s Failure Visibility Law',
    sub: 'A Trustworthy Workflow Makes Failures Visible',
    badge: 'KARTHIK LAW',
    description: 'Core engineering law: A good security workflow does not bury errors or pretend everything is fine. It surfaces failures clearly so analysts can adapt.',
    details: 'Karthik concludes: "A trustworthy workflow makes failures visible and manageable. Hidden failures lead to undetected compromises."',
    tags: ['Visible Failures', 'Trustworthy Pipeline', 'Audit Transparency', 'Resilient SOC'],
  },
];

// 11. Pillar 2: Bounded Retries & Exponential Backoff
export const boundedRetriesCircuitNodes: VisualNodeItem[] = [
  {
    id: 'ret-infinite-hazard',
    label: '1. The Infinite Retry Storm Hazard',
    sub: 'Runaway Loop Spamming API 1,000 Times/Min',
    badge: 'RETRY STORM',
    description: 'Unconstrained retry logic that hammers a struggling API server in an infinite loop, exhausting API quota limits and triggering IP bans.',
    details: 'Karthik asks: "Why avoid unlimited retries? They can waste resources, repeat actions, and hide the underlying failure."',
    tags: ['Infinite Loop', 'Quota Exhaustion', 'Self-Inflicted DoS', 'API Ban Risk'],
  },
  {
    id: 'ret-exponential-backoff',
    label: '2. Exponential Backoff Schedule (1s, 2s, 4s)',
    sub: 'Progressive Spacing Between Retry Attempts',
    badge: 'EXPONENTIAL BACKOFF',
    description: 'Algorithmic delay pattern that doubles the wait interval between retry attempts (e.g. 1 second, then 2 seconds, then 4 seconds) to give recovering services room to breathe.',
    details: 'Karthik teaches: "Exponential backoff allows transient network blips to clear without overwhelming the remote API endpoint."',
    tags: ['Exponential Backoff', 'Progressive Delay', 'Jitter Spacing', 'Polite Retries'],
  },
  {
    id: 'ret-bounded-limit',
    label: '3. Bounded Retry Ceiling (Max 3 Attempts)',
    sub: 'Hard Cutoff: Fail Fast After 3 Tries',
    badge: 'BOUNDED LIMIT',
    description: 'Strict programmatic ceiling: If the connector fails three consecutive times, the workflow halts retries immediately and transitions to failure routing.',
    details: 'Karthik notes: "Max 3 retries. If the service does not answer after three attempts, it is genuinely down. Stop trying and alert the team."',
    tags: ['Max 3 Retries', 'Fail Fast', 'Ceiling Limit', 'Deterministic Stop'],
  },
  {
    id: 'ret-circuit-breaker',
    label: '4. Circuit Breaker System Protection',
    sub: 'Tripping Breaker if Connector Fails 10x in Row',
    badge: 'CIRCUIT BREAKER',
    description: 'Architectural pattern: If 10 consecutive playbooks fail on the same connector, the circuit breaker trips, pausing all instances of that connector to protect the SOC infrastructure.',
    details: 'Karthik concludes: "Circuit breakers protect the SOC from cascading failures. When an integration breaks, the breaker prevents log jams."',
    tags: ['Circuit Breaker', 'System Protection', 'Cascading Prevention', 'Resilience Pattern'],
  },
];

// 12. Pillar 3: Immutable Playbook Audit Trail & Execution Logs
export const playbookAuditTrailNodes: VisualNodeItem[] = [
  {
    id: 'aud-step-telemetry',
    label: '1. Step-by-Step Execution Log (Granular Trace)',
    sub: 'Step ID: PB-881-S03 • Status: SUCCESS • Duration: 240ms',
    badge: 'STEP LOG',
    description: 'Detailed execution telemetry recording every individual block: step name, input payload, execution duration, and exit status code.',
    details: 'Karthik teaches: "Every action executed by an automated script must be logged with millisecond precision in the playbook execution record."',
    tags: ['Granular Trace', 'Step Duration', 'Exit Code: 0', 'Audit Record'],
  },
  {
    id: 'aud-input-output-dump',
    label: '2. Input & Output State Serialization',
    sub: 'Full JSON Capture of Ingested & Returned Data',
    badge: 'STATE CAPTURE',
    description: 'Immutable serialization of exact data passed into and returned from each connector, allowing post-incident forensic replay of the playbook execution.',
    details: 'Karthik notes: "If an automated action causes unexpected behavior, the serialized JSON state allows engineers to reproduce the exact execution."',
    tags: ['JSON Serialization', 'Input/Output Dump', 'Forensic Replay', 'State Capture'],
  },
  {
    id: 'aud-error-audit-path',
    label: '3. Error Path & Exception Traceability',
    sub: 'Full Stack Trace & Fallback Route Recorded',
    badge: 'ERROR LOG',
    description: 'When failures occur, the exact exception message, retry timestamps, and subsequent fallback routing decisions are immutably preserved.',
    details: 'Karthik instructs: "An error log is not a sign of bad engineering; an unlogged error is. Record the failure path completely."',
    tags: ['Exception Trace', 'Fallback Path', 'Failure Telemetry', 'Audit Integrity'],
  },
  {
    id: 'aud-karthik-compliance',
    label: '4. Compliance Certification & Module 12 Unit 2 Seal',
    sub: 'Audit-Proof Governance & Failure Handling Mastered',
    badge: 'COMPLIANCE SEAL',
    description: 'Senior Workflow Architect Karthik certifies the apprentice\'s mastery of safe workflow design, failure handling, bounded retries, and auditability.',
    details: 'Karthik concludes: "Superb engineering, Apprentice Analyst. You have proven that real automation handles failures transparently and preserves audit integrity."',
    tags: ['Unit 2 Complete', 'Audit-Proof', 'Failure Mastered', 'Ready for Unit 3'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M12-U3-C1 (Review before changing the environment)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Meaningful Human Review Cockpit
export const meaningfulHumanReviewNodes: VisualNodeItem[] = [
  {
    id: 'rev-target-docket',
    label: '1. Proposed Target & Identity Context',
    sub: 'Target: BLR-BR-WS-04 (User: FIN-OPS-01)',
    badge: 'TARGET SUMMARY',
    description: 'Clear display of the specific workstation, IP address, user account, and departmental role targeted for the proposed containment action.',
    details: 'Mentor Karthik emphasizes: "Human review must be meaningful. Reviewers need enough context to understand impact and uncertainty."',
    tags: ['Target Context', 'BLR-BR-WS-04', 'FIN-OPS-01', 'Entity Identification'],
  },
  {
    id: 'rev-evidence-summary',
    label: '2. Consolidated Evidence Summary',
    sub: 'Phishing Artifact MSG-2026-904 + C2 Beacon',
    badge: 'EVIDENCE SUMMARY',
    description: 'Concise summary of verified facts justifying the containment request: attachment hash match, active C2 network connection, and process tree lineage.',
    details: 'Karthik notes: "A reviewer cannot make a meaningful decision from a blank alert. The playbook provides the consolidated evidence packet."',
    tags: ['Verified Facts', 'C2 Observable', 'Attachment Match', 'High Confidence'],
  },
  {
    id: 'rev-reversal-plan',
    label: '3. Pre-Approved Reversal & Rollback Plan',
    sub: 'Rollback Action: Reconnect Host via WFP Lifeline',
    badge: 'REVERSAL PLAN',
    description: 'Explicit documentation of how the action can be undone if containment turns out to be a false alarm or causes unexpected business disruption.',
    details: 'Karthik asks: "If an action can be undone, can we skip review? No! Reversible changes can still disrupt services, and reversal requires authority."',
    tags: ['Reversal Plan', 'Rollback Script', 'Emergency Restore', 'Operational Safety'],
  },
  {
    id: 'rev-karthik-meaningful',
    label: '4. Karthik\'s Meaningful Review Rule',
    sub: 'A Rubber-Stamp Is Not Human Control',
    badge: 'KARTHIK RULE',
    description: 'Core SOC operational doctrine: A human review step where the analyst blindly clicks "Approve" in 100 milliseconds without reading is an illusion of control.',
    details: 'Karthik concludes: "Meaningful review requires reading the evidence, verifying the target, and weighing the operational consequences."',
    tags: ['Meaningful Review', 'No Rubber-Stamping', 'Human Responsibility', 'True Control'],
  },
];

// 14. Pillar 2: Catching Target Mismatches Before Execution
export const targetMismatchRestraintNodes: VisualNodeItem[] = [
  {
    id: 'mis-alert-target',
    label: '1. Original Incident Target Entity',
    sub: 'Compromised Laptop: BLR-BR-WS-04 (10.10.20.15)',
    badge: 'INCIDENT TARGET',
    description: 'The actual compromised workstation identified in the case evidence dossier: branch finance workstation BLR-BR-WS-04.',
    details: 'Karthik presents the scenario: "The alert was on BLR-BR-WS-04. But inspect the proposed action ticket carefully."',
    tags: ['True Target', 'BLR-BR-WS-04', 'Finance Laptop', 'Case #2026-881'],
  },
  {
    id: 'mis-proposed-mismatch',
    label: '2. The Proposed Action Target Mismatch Trap',
    sub: 'Proposed for Isolation: BLR-BR-SRV-01 (Domain Controller)',
    badge: 'MISMATCH TRAP ⚠️',
    description: 'A dangerous target parameter mismatch in the automated ticket: an incorrect script variable mistakenly populated the branch domain controller instead of the workstation!',
    details: 'Karthik instructs: "Spot the target mismatch before approving the action! Returning the request with a correction note prevents disaster."',
    tags: ['Target Mismatch', 'Domain Controller', 'Script Error', 'Catastrophic Risk'],
  },
  {
    id: 'mis-analyst-interception',
    label: '3. Analyst Interception & Correction Note',
    sub: 'Action Rejected: Target Corrected to WS-04',
    badge: 'INTERCEPTION',
    description: 'The vigilant analyst identifies the parameter error, rejects the erroneous approval request, and submits an explicit correction note to the workflow engine.',
    details: 'Karthik asks: "Is noticing the mismatch a failed exercise? No! Stopping an incorrect action is the correct outcome."',
    tags: ['Analyst Restraint', 'Action Rejected', 'Target Corrected', 'Disaster Averted'],
  },
  {
    id: 'mis-karthik-praise',
    label: '4. Karthik\'s Restraint Doctrine',
    sub: 'Safe Automation Rewards Restraint as Well as Execution',
    badge: 'RESTRAINT DOCTRINE',
    description: 'Foundational philosophy: An analyst who spots an error and halts an incorrect action provides just as much defensive value as one who isolates a true adversary.',
    details: 'Karthik concludes: "Exactly. Safe automation rewards restraint as well as successful execution. You saved the branch from a self-inflicted outage."',
    tags: ['Restraint Value', 'Analyst Vigilance', 'Zero Self-Harm', 'Professional Virtue'],
  },
];

// 15. Pillar 3: Rollback & Reversal Architecture
export const reversalPlanArchitectureNodes: VisualNodeItem[] = [
  {
    id: 'rev-containment-action',
    label: '1. Executed Containment State',
    sub: 'Host BLR-BR-WS-04 Network Isolated via WFP',
    badge: 'CONTAINED STATE',
    description: 'The active containment state: host network adapters blocked by host firewall rules, severing lateral movement while leaving the EDR socket open.',
    details: 'Karthik explains: "Before you execute any containment action, you must have the pre-built, tested reversal script ready to run."',
    tags: ['Contained State', 'WFP Block', 'Isolated LAN', 'Active Severance'],
  },
  {
    id: 'rev-rollback-trigger',
    label: '2. One-Click Automated Rollback Trigger',
    sub: 'Action: Reconnect Host / Restore WFP Filtering',
    badge: 'ROLLBACK TRIGGER',
    description: 'Pre-engineered reverse API action that removes the temporary quarantine firewall filter and restores full network connectivity within 5 seconds.',
    details: 'Karthik notes: "If incident response determines the alert was a false positive, the rollback trigger restores normal business operations instantly."',
    tags: ['Rollback Trigger', 'Restore Network', '5-Second Recovery', 'Pre-Built Action'],
  },
  {
    id: 'rev-reversibility-check',
    label: '3. The "Reversibility Fallacy" Reality Check',
    sub: 'Reversible Command ≠ Zero Business Cost',
    badge: 'REALITY CHECK',
    description: 'Reminds analysts that restoring network access does not magically recover dropped customer checkout sessions, broken database syncs, or broken SLAs.',
    details: 'Karthik teaches: "Never say \'it\'s fine, we can just un-isolate it\'. The 10 minutes of downtime still cost the business real money and customer trust."',
    tags: ['Reversibility Fallacy', 'Downtime Cost', 'SLA Penalties', 'Business Reality'],
  },
  {
    id: 'rev-karthik-readiness',
    label: '4. Karthik\'s Operational Readiness Seal',
    sub: 'Never Execute What You Cannot Reliably Reverse',
    badge: 'READINESS SEAL',
    description: 'Incident command rule: Containment levers are only permitted in production if the corresponding reversal procedure has been documented and tested.',
    details: 'Karthik concludes: "Never pull a lever in production if you do not know how to put it back. Reversibility planning is mandatory engineering."',
    tags: ['Operational Readiness', 'Mandatory Reversal', 'Production Discipline', 'Unit 3 Pillar 1'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M12-U3-C2 (A smaller workload, not a smaller responsibility)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The Red Line: What Must NEVER Run Automatically
export const neverAutomateRedlinesNodes: VisualNodeItem[] = [
  {
    id: 'red-critical-tier0',
    label: '1. Tier-0 Infrastructure Isolation (NEVER AUTO)',
    sub: 'Active Directory Domain Controllers & KDC Servers',
    badge: 'PROHIBITED AUTO 🚫',
    description: 'Strict prohibition: SOAR playbooks must NEVER autonomously isolate or reboot domain controllers, DNS roots, or certificate authorities under any circumstance.',
    details: 'Mentor Karthik emphasizes: "In this course, destructive or disruptive actions must not run automatically without the required human control."',
    tags: ['Prohibited Action', 'Domain Controllers', 'Zero Auto-Isolate', 'Tier-0 Boundary'],
  },
  {
    id: 'red-mass-account-lock',
    label: '2. Mass Account Deletion / Lockout (NEVER AUTO)',
    sub: 'Automated Playbooks Disabling >5 User Accounts',
    badge: 'PROHIBITED AUTO 🚫',
    description: 'Strict prohibition: Automated playbooks must never bulk-disable enterprise user accounts. A compromised admin script could lock 10,000 employees out of work.',
    details: 'Karthik instructs: "Mass account locking causes catastrophic enterprise paralysis. Human approval from the Identity Lead is non-negotiable."',
    tags: ['Mass Account Lock', 'Prohibited Auto', 'Identity Governance', 'No Bulk Actions'],
  },
  {
    id: 'red-ot-ics-commands',
    label: '3. OT / ICS Industrial Machinery (NEVER AUTO)',
    sub: 'Commands Touching PLCs, Pumps, Turbines & Valves',
    badge: 'KINETIC DANGER 🚫',
    description: 'Strict prohibition: IT SOAR playbooks must never inject write commands or resets into Level 1/0 industrial controllers. Physical safety comes first.',
    details: 'Karthik highlights: "As we learned in Module 10: OT systems move something physical. Automation must never touch plant machinery without plant engineers."',
    tags: ['OT/ICS Boundary', 'Kinetic Safety', 'Zero IT Control', 'Physical Protection'],
  },
  {
    id: 'red-karthik-redlines',
    label: '4. Karthik\'s Absolute Red Line Doctrine',
    sub: 'A Smaller Workload, Not a Smaller Responsibility',
    badge: 'RED LINE LAW',
    description: 'Foundational SOC automation doctrine: Automation reduces manual clerical toil; it does not diminish our ethical and professional responsibility for system safety.',
    details: 'Karthik concludes: "Our responsibility is to follow the explicitly approved design and your role\'s authority. Keep the red lines absolute."',
    tags: ['Absolute Red Lines', 'Analyst Responsibility', 'Ethical Guardrails', 'SOC Governance'],
  },
];

// 17. Pillar 2: Duplicate Trigger Prevention & Idempotency
export const deduplicationIdempotencyNodes: VisualNodeItem[] = [
  {
    id: 'dup-alert-storm',
    label: '1. Ingested Duplicate Alert Storm',
    sub: '50 Identical SIEM Alarms Generated in 10 Seconds',
    badge: 'ALERT STORM',
    description: 'A single malware execution triggers dozens of identical firewall, EDR, and proxy alerts simultaneously within seconds.',
    details: 'Karthik asks: "Why check duplicate triggers? To avoid repeated notifications or repeated actions for the same work."',
    tags: ['Duplicate Alert', 'Alert Storm', 'Redundant Events', 'Noise Reduction'],
  },
  {
    id: 'dup-idempotency-key',
    label: '2. Idempotency Key & Hash Generation',
    sub: 'Key: HASH(Target_Host + Observable + Day)',
    badge: 'IDEMPOTENCY KEY',
    description: 'Generates a unique deterministic fingerprint combining target hostname, observable value, and date bucket to detect recurring duplicate triggers.',
    details: 'Karthik teaches: "An idempotency key ensures that the second, third, and fiftieth identical alert are recognized as the same ongoing event."',
    tags: ['Idempotency Key', 'SHA-256 Fingerprint', 'Deduplication Token', 'Deterministic Key'],
  },
  {
    id: 'dup-suppression-cache',
    label: '3. 15-Minute Suppression Cache Window',
    sub: 'Suppressing Redundant Actions & Duplicate Chats',
    badge: 'SUPPRESSION CACHE',
    description: 'Maintains an in-memory Redis cache of active keys. If an incoming alert matches an active key, the playbook suppresses duplicate execution.',
    details: 'Karthik notes: "Instead of opening 50 tickets and sending 50 Slack pings, the engine updates the existing ticket with an incremental count."',
    tags: ['Suppression Cache', '15-Minute Window', 'Zero Duplicate Spam', 'Clean Tickets'],
  },
  {
    id: 'dup-karthik-idempotence',
    label: '4. Karthik\'s Idempotency Principle',
    sub: 'Running a Playbook 10 Times Produces the Same Safe Result',
    badge: 'IDEMPOTENCY LAW',
    description: 'Core software design principle: Executing an automated playbook multiple times with the same input must leave the system in the exact same safe state.',
    details: 'Karthik concludes: "Our automation saves effort while preserving accountability and review. Idempotency guarantees reliability under pressure."',
    tags: ['Idempotency Law', 'Predictable Outcomes', 'System Reliability', 'Production Ready'],
  },
];

// 18. Pillar 3: Master Safe SOAR Blueprint & Module 12 Supervisory Seal
export const masterSoarSignoffNodes: VisualNodeItem[] = [
  {
    id: 'mas-test-pack-pass',
    label: '1. Five-Stage Sandbox Test Pack Validation',
    sub: 'Valid, Missing, Failed, Duplicate & Denied Tests',
    badge: 'TEST PACK: PASSED ✓',
    description: 'Rigorous sandbox verification testing five operational conditions: valid input, missing input, connector timeout, duplicate trigger, and denied approval.',
    details: 'Karthik reviews: "You tested the full test pack. The workflow validated inputs, handled connector failure, suppressed duplicates, and respected denied approval."',
    tags: ['Test Pack Passed', '5-Stage Verification', 'Full Spectrum', 'Sandbox Verified'],
  },
  {
    id: 'mas-blueprint-architecture',
    label: '2. Master Safe SOAR Playbook Blueprint',
    sub: 'Validated Inputs ➔ Safe Enrichment ➔ Gate ➔ Review',
    badge: 'MASTER BLUEPRINT',
    description: 'The completed architectural blueprint: Ingest alert -> Validate IP -> Enrich threat intel/LDAP in parallel -> Generate draft docket -> Human approval gate -> Audited action.',
    details: 'Karthik instructs: "This is how modern SOCs balance machine speed with human wisdom. You have built a production-grade automated pipeline."',
    tags: ['SOAR Blueprint', 'Validated Pipeline', 'Human Gate', 'Defensible Automation'],
  },
  {
    id: 'mas-case-881-closure',
    label: '3. Case #2026-881 Automated Docket Handoff',
    sub: 'Enriched Telemetry Bound to Central Master Case',
    badge: 'CASE #2026-881',
    description: 'The automated enrichment docket binds cleanly into Central Case Record #2026-881, providing the evidence foundation for MITRE ATT&CK mapping in Module 13.',
    details: 'Karthik notes: "Your SOAR docket integrates directly into Case #2026-881, preserving full evidentiary provenance for the upcoming ATT&CK analysis."',
    tags: ['Case #2026-881', 'Integrated Docket', 'Evidence Foundation', 'Ready for ATT&CK'],
  },
  {
    id: 'mas-karthik-master-seal',
    label: '4. Mentor Karthik\'s Master Supervisory Seal',
    sub: 'Module 12 Certified: SOAR & Basic SOC Automation',
    badge: 'SUPERVISORY SEAL',
    description: 'Senior Workflow Architect Karthik inspects the completed playbook, verifies all guardrails and failure branches, and stamps the official CDAC supervisory seal on Module 12.',
    details: 'Karthik concludes: "Outstanding work, Apprentice Analyst. You have mastered playbook anatomy, input validation, human-in-the-loop gates, failure resilience, and the essential discipline of what must never run automatically. You are ready for MITRE ATT&CK in Module 13!"',
    tags: ['Supervisory Sign-Off', 'Module 12 Certified', 'Karthik Master Seal', 'Ready for Module 13'],
  },
];

// =============================================================================
// COMPLETE MODULE 12 NODES MAPPING DICTIONARY
// =============================================================================
export const module12NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: Triggers, actions and playbooks
  'm12-playbook-anatomy-pipeline': playbookAnatomyPipelineNodes,
  'm12-input-validation-guard': inputValidationGuardNodes,
  'm12-conditional-branching-logic': conditionalBranchingLogicNodes,

  // Chapter 2: Enrichment and notification use cases
  'm12-automated-enrichment-loop': automatedEnrichmentLoopNodes,
  'm12-case-notification-docket': caseNotificationDocketNodes,
  'm12-notification-evidence-standards': notificationEvidenceStandardsNodes,

  // Chapter 3: Conditions and approval gates
  'm12-human-approval-gate': humanApprovalGateNodes,
  'm12-role-authorization-scope': roleAuthorizationScopeNodes,
  'm12-timeout-silence-doctrine': timeoutSilenceDoctrineNodes,

  // Chapter 4: Failure handling, logging and auditability
  'm12-connector-failure-handling': connectorFailureHandlingNodes,
  'm12-bounded-retries-circuit': boundedRetriesCircuitNodes,
  'm12-playbook-audit-trail': playbookAuditTrailNodes,

  // Chapter 5: Human review and reversible actions
  'm12-meaningful-human-review': meaningfulHumanReviewNodes,
  'm12-target-mismatch-restraint': targetMismatchRestraintNodes,
  'm12-reversal-plan-architecture': reversalPlanArchitectureNodes,

  // Chapter 6: What must not run automatically
  'm12-never-automate-redlines': neverAutomateRedlinesNodes,
  'm12-deduplication-idempotency': deduplicationIdempotencyNodes,
  'm12-master-soar-signoff': masterSoarSignoffNodes,
};
