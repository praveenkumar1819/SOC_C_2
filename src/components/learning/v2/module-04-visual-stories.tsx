'use client';

import React from 'react';

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

// =============================================================================
// MODULE 04 NODE COLLECTIONS (18 Dedicated Collections for SOC Operations & Triage)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. M04-U1-C1 Pillar 1: SOC Tiered Escalation Hierarchy
// -----------------------------------------------------------------------------
export const socHierarchyNodes: VisualNodeItem[] = [
  {
    id: 'tier-l1',
    label: 'Tier 1 (L1) Triage Analyst',
    sub: 'You • Front-Line Sentry & Triage',
    badge: 'FIRST LINE OF INSPECTION',
    description: 'Initial alert review, scoping verifiable 5 Ws observables, validating detection rules, and following standardized SOP playbooks.',
    details: 'Authority Scope: Alert qualification, benign FP resolution, initial host network isolation. Complex forensic decoding escalates upward.',
    tags: ['Role: L1 Analyst', 'SLA: 15-30 Minutes', 'Tools: SIEM Queue, EDR Console', 'Duty: Scoping & Preservation'],
  },
  {
    id: 'tier-l2',
    label: 'Tier 2 (L2) Incident Responder',
    sub: 'Senior Forensic Investigator',
    badge: 'DEEP DIVE & ROOT CAUSE',
    description: 'Deep-dive memory analysis (Volatility), malware payload reverse-engineering, lateral movement reconstruction, and root-cause eradication.',
    details: 'Authority Scope: Enterprise-wide containment, forensic artifact acquisition, coordinating with network engineering to deploy permanent perimeter ACLs.',
    tags: ['Role: L2 Responder', 'Tools: Wireshark, Volatility, Ghidra', 'Duty: Root-Cause Eradication', 'Escalation: From L1'],
  },
  {
    id: 'tier-l3',
    label: 'Tier 3 (L3) Threat Hunter & CTI',
    sub: 'Cyber Threat Intelligence Specialist',
    badge: 'PROACTIVE THREAT HUNTING',
    description: 'Hypothesis-driven threat hunting without waiting for alarms; maps adversary campaigns to MITRE ATT&CK techniques and feeds new SIEM rules.',
    details: 'Authority Scope: Threat intelligence feeds, custom YARA/Sigma rule development, and adversary emulation red team debriefs.',
    tags: ['Role: L3 Threat Hunter', 'Focus: Zero-Days & Advanced APTs', 'Framework: MITRE ATT&CK', 'Output: New Detection Rules'],
  },
  {
    id: 'tier-mgr',
    label: 'SOC Shift Lead / Manager (Ananya)',
    sub: 'Operational Commander & Governance',
    badge: 'INCIDENT COMMAND',
    description: 'Oversees queue health, SLA compliance, authorizes major production disruptions (datacenter isolations), and briefs executive leadership.',
    details: 'Ananya\'s Rule: "Escalation is a professional duty, not a failure. Reaching the edge of your authority requires immediate communication."',
    tags: ['Role: Shift Lead', 'Duty: SLA Governance & Comms', 'Authority: Business Impact Decisions', 'Escalation: Executive / Legal'],
  },
];

// -----------------------------------------------------------------------------
// 2. M04-U1-C1 Pillar 2: L1 Operational Boundaries & Escalation Triggers
// -----------------------------------------------------------------------------
export const escalationTriggersNodes: VisualNodeItem[] = [
  {
    id: 'esc-boundary',
    label: 'L1 Operational Authority Boundary',
    sub: 'Prescribed Playbook Limits',
    badge: 'ROLE BOUNDARY',
    description: 'Documented limits of what a Tier 1 analyst may execute independently without secondary senior approval.',
    details: 'L1 CAN: Verify facts, query logs, contact users, isolate single workstation. L1 CANNOT: Modify core firewall rules or shut down domain controllers.',
    tags: ['Boundary: Standard Operating Procedure', 'Constraint: No Unilateral Production Changes', 'Safety: Blast Radius Limited'],
  },
  {
    id: 'esc-trigger-mal',
    label: 'Trigger 1: Multi-Host Lateral Spread',
    sub: 'Adversary Traversing Subnets',
    badge: 'CRITICAL ESCALATION',
    description: 'Alert reveals the same suspicious binary hash executing across 3 separate department workstations simultaneously.',
    details: 'Immediate L2 Escalation: Multi-host infection exceeds single-endpoint playbooks; requires coordinated enterprise-wide containment.',
    tags: ['Trigger: Lateral Movement (T1021)', 'Severity: SEV-1', 'Target: Tier 2 Forensics', 'Action: Enterprise Bridge'],
  },
  {
    id: 'esc-trigger-dc',
    label: 'Trigger 2: Domain Controller Involvement',
    sub: 'Active Directory Kerberos Tampering',
    badge: 'ENTERPRISE IDENTITY THREAT',
    description: 'Suspicious DCSync or Golden Ticket activity detected against central domain controller BLR-DC-01.',
    details: 'Immediate Shift Lead Escalation: Threatens entire enterprise identity backbone; requires executive notification and emergency credential rollover.',
    tags: ['Target: BLR-DC-01', 'Technique: DCSync (T1003.006)', 'Severity: Catastrophic', 'Lead: Mentor Ananya'],
  },
  {
    id: 'esc-doc',
    label: 'Professional Escalation Handover',
    sub: 'Structured Ticket Package',
    badge: 'STANDARD PRACTICE',
    description: 'Never escalate verbally without written evidence. Package verified entities, parent PIDs, and timeline for the receiving tier.',
    details: 'Ananya\'s Guidance: "A good escalation package tells L2 exactly what was verified, what remains unknown, and why urgency is justified."',
    tags: ['Standard: Structured Handover', 'Artifacts: PCAP, MemDump, PIDs', 'Status: Warm Transfer'],
  },
];

// -----------------------------------------------------------------------------
// 3. M04-U1-C1 Pillar 3: The 24/7 SOC Shift Handover Wheel
// -----------------------------------------------------------------------------
export const shiftWheelNodes: VisualNodeItem[] = [
  {
    id: 'shift-day',
    label: 'Morning / Day Shift (06:00 - 14:00 IST)',
    sub: 'Business Hours Ingestion Peak',
    badge: 'SHIFT ROTATION 1',
    description: 'Handles the highest alert volume: employee logons, legitimate business software deployments, and user-reported phishing lures.',
    details: 'Triage Focus: Disentangling authorized IT maintenance from real attacks; high volume of False Positives requiring rapid qualification.',
    tags: ['Hours: 06:00 - 14:00 IST', 'Volume: High Peak', 'Focus: Phishing & Admin Baseline', 'Staffing: Full Tier 1 Team'],
  },
  {
    id: 'shift-eve',
    label: 'Evening Shift (14:00 - 22:00 IST)',
    sub: 'Cross-Regional Global Traffic',
    badge: 'SHIFT ROTATION 2',
    description: 'Branch offices wind down while overseas sister campuses remain active. Focus shifts to investigating open afternoon cases.',
    details: 'Triage Focus: Deepening investigation on cases opened during day shift; preparing detailed notes for nocturnal shift transition.',
    tags: ['Hours: 14:00 - 22:00 IST', 'Volume: Moderate', 'Focus: Case Synthesis & Follow-up', 'Duty: Bridge Maintenance'],
  },
  {
    id: 'shift-night',
    label: 'Night Shift (22:00 - 06:00 IST)',
    sub: 'Nocturnal Anomaly Surveillance',
    badge: 'SHIFT ROTATION 3',
    description: 'Low event volume, but exponentially higher threat fidelity. Any workstation logon at 02:45 AM stands out as a sharp anomaly.',
    details: 'Triage Focus: High vigilance. Ransomware groups deliberately deploy payloads during nocturnal hours when IT departments are asleep.',
    tags: ['Hours: 22:00 - 06:00 IST', 'Volume: Low / Stealth', 'Focus: Off-Hours Activity & C2 Beacons', 'Alert Severity: High Fidelity'],
  },
  {
    id: 'shift-handover',
    label: '15-Minute Shift Handoff Briefing',
    sub: 'Zero Information Loss Bridge',
    badge: 'OPERATIONAL CONTINUITY',
    description: 'Incoming and outgoing shift leads review active priority tickets, quarantined hosts, and sensor health before departure.',
    details: 'Mandatory Rule: No analyst leaves their desk until their open tickets are formally assigned to an incoming named peer.',
    tags: ['Duration: 15 Minutes', 'Requirement: Mandatory', 'Checklist: Active Cases, Quarantined Hosts, SLA Status'],
  },
];

// -----------------------------------------------------------------------------
// 4. M04-U1-C2 Pillar 1: SIEM Alert Ingestion Queue & Priority Policy
// -----------------------------------------------------------------------------
export const queueIngestionNodes: VisualNodeItem[] = [
  {
    id: 'queue-sev1',
    label: 'Alert #301: SEV-1 Critical (Core DB Exploit)',
    sub: 'Target: FIN-DB-01 • SLA: 15 Min 🔥',
    badge: 'QUEUE TOP PRIORITY',
    description: 'Exploitation signature detected against primary PostgreSQL financial server holding employee payroll records.',
    details: 'Queue Priority Rule: Claimed immediately regardless of ticket backlog. All available L1 triage power pivots to SEV-1 items.',
    tags: ['Severity: SEV-1 Critical', 'SLA: 15 Minutes', 'Target: FIN-DB-01', 'State: Unassigned (CLAIM NOW)'],
  },
  {
    id: 'queue-sev2',
    label: 'Alert #302: SEV-2 High (Off-Hours Logon WS-04)',
    sub: 'User: FIN-OPS-01 • SLA: 30 Min ⚠️',
    badge: 'ELEVATED QUEUE ITEM',
    description: 'Interactive console logon detected on branch workstation BLR-BR-WS-04 on Sunday at 02:45 AM IST.',
    details: 'Queue Priority Rule: Second in line. Assigned to primary L1 investigator following documented credential triage playbook.',
    tags: ['Severity: SEV-2 High', 'SLA: 30 Minutes', 'Target: BLR-BR-WS-04', 'State: In Progress'],
  },
  {
    id: 'queue-sev4',
    label: 'Alert #303: SEV-4 Low (Port Probe on Kiosk)',
    sub: 'Target: Lobby Kiosk • SLA: 24 Hours',
    badge: 'ROUTINE QUEUE ITEM',
    description: 'Routine single port probe against visitor check-in kiosk on isolated guest WiFi segment.',
    details: 'Queue Priority Rule: Non-urgent. Triaged after high-priority queues are cleared. Never cherry-pick low alerts to avoid hard cases!',
    tags: ['Severity: SEV-4 Low', 'SLA: 24 Hours', 'Target: Visitor Kiosk', 'State: Queued'],
  },
  {
    id: 'queue-policy',
    label: 'Queue Ownership Governance Policy',
    sub: 'No Cherry-Picking • SLA Compliance',
    badge: 'OPERATIONAL GOVERNANCE',
    description: 'Mandatory queuing discipline: analysts claim alerts strictly by priority and age, never by technical convenience.',
    details: 'Ananya\'s Teaching: "Cherry-picking easy alerts leaves critical ransomware signals unattended until the network is encrypted."',
    tags: ['Policy: FIFO within Severity', 'Audit: Queue Timestamp Tracking', 'Governance: CDAC SOC SOP-01'],
  },
];

// -----------------------------------------------------------------------------
// 5. M04-U1-C2 Pillar 2: Alert Lifecycle & Ownership States
// -----------------------------------------------------------------------------
export const ticketLifecycleNodes: VisualNodeItem[] = [
  {
    id: 'life-new',
    label: '1. State: NEW (Unassigned in Queue)',
    sub: 'Clock Ticking on SLA Ingestion',
    badge: 'LIFECYCLE STATE 1',
    description: 'Alert generated by SIEM rule resting in central queue waiting for an analyst to claim ownership.',
    details: 'Risk: Unowned alerts risk breach neglect. SLA response clock starts ticking from the exact second the alert is created.',
    tags: ['State: NEW', 'Owner: None', 'SLA Clock: ACTIVE', 'Action Required: Claim Ticket'],
  },
  {
    id: 'life-claimed',
    label: '2. State: CLAIMED / IN PROGRESS',
    sub: 'Assigned to L1 Analyst (You)',
    badge: 'LIFECYCLE STATE 2',
    description: 'Analyst assigns ticket to their name, notifying peers that this investigation is actively under inspection.',
    details: 'Operational Value: Prevents duplicate effort where three analysts independently investigate the same machine simultaneously.',
    tags: ['State: IN PROGRESS', 'Owner: Analyst Assigned', 'Duplicate Work: PREVENTED'],
  },
  {
    id: 'life-triage',
    label: '3. State: EVIDENCE GATHERING',
    sub: 'Scoping 5 Ws & Context Checks',
    badge: 'LIFECYCLE STATE 3',
    description: 'Analyst queries host logs, parent processes, user authorization, and network destinations.',
    details: 'Evidence Preservation: All queries, observable outputs, and timestamps are logged directly into the case work notes.',
    tags: ['State: INVESTIGATING', 'Output: Work Notes', 'Preservation: Immutable Audit Trail'],
  },
  {
    id: 'life-closed',
    label: '4. State: RESOLVED / ESCALATED',
    sub: 'Final Disposition Recorded',
    badge: 'LIFECYCLE STATE 4',
    description: 'Ticket is closed with clear justification (e.g. Authorized Maintenance FP) or escalated upward to Tier 2.',
    details: 'Closure Rule: Never close a ticket without recording the rationale and ticket reference number for auditing.',
    tags: ['State: CLOSED / ESCALATED', 'Disposition: Documented', 'Audit: Retained 365 Days'],
  },
];

// -----------------------------------------------------------------------------
// 6. M04-U1-C2 Pillar 3: SLA Thresholds & Burn-Down Monitoring
// -----------------------------------------------------------------------------
export const slaMonitorNodes: VisualNodeItem[] = [
  {
    id: 'sla-mttd',
    label: 'Mean Time to Detect (MTTD)',
    sub: 'Incident Occurrence &rarr; Alert Trigger',
    badge: 'DETECTION VELOCITY',
    description: 'The time elapsed between an attacker executing an action on an endpoint and the SIEM generating an alert.',
    details: 'Target: Under 5 minutes. Reduced through high-fidelity Sysmon process creation telemetry (Event 4688) and streaming pipelines.',
    tags: ['Metric: MTTD', 'Benchmark: < 5 Minutes', 'Driver: Rule Optimization', 'Impact: Early Warning'],
  },
  {
    id: 'sla-mttr',
    label: 'Mean Time to Respond / Contain (MTTR)',
    sub: 'Alert Ingestion &rarr; Host Containment',
    badge: 'RESPONSE SPEED',
    description: 'The time elapsed between alert arrival in queue and decisive containment (e.g. network host isolation).',
    details: 'Target: Under 15 minutes for SEV-1 incidents. Faster MTTR stops ransomware before lateral propagation spreads to neighboring PCs.',
    tags: ['Metric: MTTR', 'Benchmark: < 15 Minutes (SEV-1)', 'Driver: Analyst Proficiency', 'Impact: Blast Radius Contained'],
  },
  {
    id: 'sla-breach',
    label: 'SLA Breach Alarms & Lead Notification',
    sub: 'Tickets Approaching Expiry Time',
    badge: 'WORKLOAD ESCALATION',
    description: 'Automatic warning system alerting the shift lead when alert volume threatens to exceed response thresholds.',
    details: 'Ananya\'s Teaching: "If queue volume is overwhelming your team, report workload pressure immediately so the lead can reallocate staff."',
    tags: ['Alarm: 75% SLA Burned', 'Action: Shift Lead Rebalancing', 'Safety: No Silent Failures'],
  },
  {
    id: 'sla-dashboard',
    label: 'SOC Operations Burn-Down HUD',
    sub: 'Live Shift Performance Metrics',
    badge: 'REAL-TIME DASHBOARD',
    description: 'Wallboard monitor displaying open tickets, median triage times, and queue health across active shift desks.',
    details: 'Provides operational transparency: ensures high-severity incidents are never buried under mundane low-priority noise.',
    tags: ['Display: Wallboard HUD', 'Metrics: Triage Velocity', 'Transparency: 24/7 Operations'],
  },
];

// -----------------------------------------------------------------------------
// 7. M04-U2-C1 Pillar 1: Raw Event Telemetry vs Filtered Alert Rule
// -----------------------------------------------------------------------------
export const eventVsAlertNodes: VisualNodeItem[] = [
  {
    id: 'eva-event',
    label: 'Raw Telemetry Events (The Ocean of Data)',
    sub: '100,000+ Daily Host & Network Logs',
    badge: 'RAW TELEMETRY STREAM',
    description: 'Neutral records documenting everything that occurs: user logons, file reads, DNS queries, firewall packet passes.',
    details: 'Events are not alarms! Opening a spreadsheet or pinging a server generates events. 99.99% of enterprise events are completely benign.',
    tags: ['Type: Raw Event', 'Volume: Millions / Day', 'Nature: Neutral Record', 'Storage: SIEM Indexer'],
  },
  {
    id: 'eva-rule',
    label: 'SIEM Correlation Rule (The Sifter)',
    sub: 'Algorithmic Detection Logic',
    badge: 'DETECTION ENGINE',
    description: 'A pre-configured query continuously evaluating incoming events against specific suspicious criteria or thresholds.',
    details: 'Rule Formula: Trigger an alert IF (Event ID == 4624) AND (LogonType == 2) AND (Time is Weekend) AND (Account in FinanceGroup).',
    tags: ['Type: Detection Rule', 'Condition: Threshold + Context', 'Engine: Splunk / Sentinel', 'Output: High-Fidelity Signal'],
  },
  {
    id: 'eva-alert',
    label: 'Security Alert (Request for Triage)',
    sub: 'High-Priority Notification in Queue',
    badge: 'ACTIONABLE NOTIFICATION',
    description: 'A curated notification delivered to the L1 queue flagging that an event sequence met detection rule criteria.',
    details: 'Ananya\'s Core Principle: "An alert is a request for inspection, not a guilty verdict. We investigate the evidence, not the alert title."',
    tags: ['Type: Security Alert', 'Destination: L1 Queue', 'Status: Needs Verification', 'Action: Triage Required'],
  },
  {
    id: 'eva-funnel',
    label: 'The SOC Data Reduction Funnel',
    sub: '10M Events &rarr; 50 Alerts &rarr; 2 Incidents',
    badge: 'DATA REDUCTION',
    description: 'The operational funnel filtering millions of noisy raw events into dozens of manageable, actionable analyst alerts.',
    details: 'Ensures human analysts focus their finite cognitive attention on genuinely suspicious deviations rather than drowning in log noise.',
    tags: ['Funnel Ratio: 100,000 to 1', 'Goal: Signal-to-Noise Ratio', 'Optimization: Rule Tuning'],
  },
];

// -----------------------------------------------------------------------------
// 8. M04-U2-C1 Pillar 2: Detection Rule Architecture & Logic
// -----------------------------------------------------------------------------
export const ruleLogicNodes: VisualNodeItem[] = [
  {
    id: 'rule-eventid',
    label: '1. Event ID & Data Source Selector',
    sub: 'Windows Security Event ID 4624',
    badge: 'LOG FILTER',
    description: 'Rule narrows search scope to specific telemetry sources: Event ID 4624 (Successful Logon) from Active Directory.',
    details: 'Precision filtering prevents wasteful query overhead: rule evaluates only logon events rather than scanning all system telemetry.',
    tags: ['Source: WinEventLog:Security', 'Event ID: 4624', 'Channel: Authentication'],
  },
  {
    id: 'rule-condition',
    label: '2. Contextual Anomaly Filter',
    sub: 'Temporal Filter: DayOfWeek IN (Sat, Sun)',
    badge: 'ANOMALY CRITERIA',
    description: 'Rule checks whether the logon occurred outside standard office hours (e.g. Sunday at 02:45 AM).',
    details: 'Combines multiple criteria: Interactive console logon (LogonType 2) + Non-Standard Time + Privileged Finance Account.',
    tags: ['Condition: Weekend Logon', 'LogonType: 2 (Interactive)', 'UserGroup: cdac\\Finance'],
  },
  {
    id: 'rule-threshold',
    label: '3. Aggregation & Threshold Filter',
    sub: 'Count &ge; 1 Event within 5-Minute Window',
    badge: 'THRESHOLD ENGINE',
    description: 'Defines how many occurrences trigger the notification and groups output by TargetUserName and WorkstationName.',
    details: 'Prevents alert storms: if the user opens 5 applications, the rule groups all events into one single consolidated ticket.',
    tags: ['Threshold: &ge; 1', 'Time Window: 5 Minutes', 'Grouping: TargetUserName', 'Suppression: 30 Minutes'],
  },
  {
    id: 'rule-tuning',
    label: '4. Rule Tuning & Whitelist Exceptions',
    sub: 'Excluding Approved Scheduled Tasks',
    badge: 'RULE MAINTENANCE',
    description: 'Exempting authorized automated batch accounts (e.g. backup_svc) to eliminate continuous False Positive spam.',
    details: 'Continuous Improvement: When L1 discovers a recurring benign trigger, they submit a tuning ticket to the detection engineering team.',
    tags: ['Process: False Positive Tuning', 'Action: Whitelist Exception', 'Review: Monthly Audit'],
  },
];

// -----------------------------------------------------------------------------
// 9. M04-U2-C1 Pillar 3: The Verdict Trap: Alert Title is Not Verdict
// -----------------------------------------------------------------------------
export const verdictTrapNodes: VisualNodeItem[] = [
  {
    id: 'trap-title',
    label: 'The Alert Title: "Off-Hours Malicious Intrusion"',
    sub: 'Alarm Subject Line in SIEM',
    badge: 'ALERT LABEL',
    description: 'The dramatic title assigned to the detection rule by the detection engineer who wrote it.',
    details: 'The Novice Trap: An inexperienced analyst reads "Malicious Intrusion" and assumes an adversary has breached the network without checking evidence.',
    tags: ['Title: Threat Name', 'Nature: Automated Label', 'Trap: Presuming Guilt'],
  },
  {
    id: 'trap-evidence',
    label: 'The Verified Evidence: Approved IT Maintenance',
    sub: 'Change Management Ticket CHG-2026-991',
    badge: 'VERIFIED TRUTH',
    description: 'Triage reveals employee Ramesh was authorized by the IT Director to execute a scheduled weekend database upgrade.',
    details: 'The Reality: The rule fired correctly because the logon was off-hours, but the context proved the activity was 100% authorized and benign!',
    tags: ['Ticket: CHG-2026-991', 'User: FIN-OPS-01', 'Context: Approved Maintenance', 'Outcome: Benign TP'],
  },
  {
    id: 'trap-disposition',
    label: 'True Positive - Benign / Authorized (TP-B)',
    sub: 'Correct Detection, Innocent Activity',
    badge: 'DISPOSITION LABEL',
    description: 'The detection rule functioned as designed, but the underlying business activity had pre-approved management authority.',
    details: 'Documentation Rule: Record the change management ticket number, note user confirmation, and close alert with disposition TP-B.',
    tags: ['Disposition: TP-B', 'Justification: Documented', 'Action: Closed with Notes'],
  },
  {
    id: 'trap-doctrine',
    label: 'Mentor Ananya\'s Triage Doctrine',
    sub: '"We Investigate Evidence, Not Titles"',
    badge: 'ANALYST CREED',
    description: 'Never let alert titles dictate your findings. Always demand primary verifiable observables: parent process, hash, and user context.',
    details: 'Ananya\'s Quote: "An alert title is a hypothesis waiting to be tested. The evidence is the only thing that writes the verdict."',
    tags: ['Principle: Empirical Rigor', 'Standard: Verifiable Proof', 'Mindset: Objective Skepticism'],
  },
];

// -----------------------------------------------------------------------------
// 10. M04-U2-C2 Pillar 1: The Taxonomy Quad: Event, Alert, Incident, Case
// -----------------------------------------------------------------------------
export const taxonomyQuadNodes: VisualNodeItem[] = [
  {
    id: 'quad-event',
    label: '1. Event: The Raw Observable Record',
    sub: 'Windows Event ID 4688: certutil.exe launched',
    badge: 'TAXONOMY: EVENT',
    description: 'A single point-in-time timestamped log generated by operating systems or applications recording that an action occurred.',
    details: 'Every command, login, and connection is an event. Millions occur every hour. Neutral and factual.',
    tags: ['Taxonomy: Event', 'Volume: Billions', 'Property: Immutable Log', 'Standard: RFC 5424'],
  },
  {
    id: 'quad-alert',
    label: '2. Alert: The Threshold Signal',
    sub: 'Rule Trigger: "LOLBIN certutil download"',
    badge: 'TAXONOMY: ALERT',
    description: 'A notification generated when one or more events meet pre-defined security detection criteria in the SIEM.',
    details: 'Flags potential concern. Requires human analyst qualification. Can resolve as False Positive or escalate to a Case.',
    tags: ['Taxonomy: Alert', 'Volume: Hundreds', 'Property: Needs Triage', 'Queue: L1 Queue'],
  },
  {
    id: 'quad-case',
    label: '3. Case: The Working Container',
    sub: 'CASE-2026-081: BLR-BR-WS-04 Investigation',
    badge: 'TAXONOMY: CASE',
    description: 'The administrative workspace and file folder linking alerts, evidence artifacts, notes, and analyst ownership.',
    details: 'A case is a work record. Opening a case does NOT mean an incident occurred; it simply organizes the ongoing investigation.',
    tags: ['Taxonomy: Case', 'Volume: Dozens', 'Property: Work Tracker', 'Tool: TheHive / Jira'],
  },
  {
    id: 'quad-incident',
    label: '4. Incident: Confirmed Active Compromise',
    sub: 'SEV-1 Active Ransomware Intrusion Confirmed',
    badge: 'TAXONOMY: INCIDENT',
    description: 'A security event that has been confirmed to adversely affect the confidentiality, integrity, or availability of the enterprise.',
    details: 'Meets formal incident criteria: requires emergency containment, management notification, and activation of the CSIRT team.',
    tags: ['Taxonomy: Incident', 'Volume: Rare / High Impact', 'Property: Confirmed Breach', 'Framework: NIST 800-61'],
  },
];

// -----------------------------------------------------------------------------
// 11. M04-U2-C2 Pillar 2: Multi-Alert Case Aggregation
// -----------------------------------------------------------------------------
export const caseAggregationNodes: VisualNodeItem[] = [
  {
    id: 'agg-alert1',
    label: 'Alert 1: Phishing Email Reported (02:30 AM)',
    sub: 'User reported lookalike payroll email',
    badge: 'LINKED EVIDENCE',
    description: 'User report flags suspicious email with lookalike sender domain cdac-portal-verify.com.',
    details: 'Linked to Case #081: First stage of the attack chain (Initial Access via T1566).',
    tags: ['Vector: Phishing', 'Time: 02:30:12 IST', 'Case: #CASE-081'],
  },
  {
    id: 'agg-alert2',
    label: 'Alert 2: Suspicious LOLBIN Execution (02:45 AM)',
    sub: 'certutil.exe -urlcache -split on WS-04',
    badge: 'LINKED EVIDENCE',
    description: 'Sysmon Event 4688 detects Windows certificate utility downloading remote executable from external IP.',
    details: 'Linked to Case #081: Second stage of the attack chain (Defense Evasion & Ingress Tool Transfer T1105).',
    tags: ['Vector: LOLBIN', 'Host: BLR-BR-WS-04', 'Time: 02:45:00 IST', 'Case: #CASE-081'],
  },
  {
    id: 'agg-alert3',
    label: 'Alert 3: Periodic C2 Beacon (02:47 AM)',
    sub: 'HTTP heartbeats every 60s to 198.51.100.42',
    badge: 'LINKED EVIDENCE',
    description: 'Network sensor detects mathematical 60-second periodic outbound HTTP sockets to foreign server.',
    details: 'Linked to Case #081: Third stage of the attack chain (Command & Control T1071.001).',
    tags: ['Vector: C2 Beacon', 'IP: 198.51.100.42', 'Time: 02:47:30 IST', 'Case: #CASE-081'],
  },
  {
    id: 'agg-unrelated',
    label: 'Unrelated Alert: Printer Jam on 10.10.50.88',
    sub: 'Lobby printer error (KEPT SEPARATE)',
    badge: 'SEPARATE / UNLINKED',
    description: 'Routine hardware warning from guest network printer. Unrelated to the financial workstation intrusion.',
    details: 'Aggregation Rule: Never bundle unrelated alarms into a case. Cluttering case files obscures the true attack timeline.',
    tags: ['Alert: Hardware Warning', 'Action: Keep Separate', 'Clean Discipline: Do Not Clutter'],
  },
];

// -----------------------------------------------------------------------------
// 12. M04-U2-C2 Pillar 3: Case Evidence Vault & Chain of Custody
// -----------------------------------------------------------------------------
export const evidenceVaultNodes: VisualNodeItem[] = [
  {
    id: 'vault-hashes',
    label: 'Cryptographic SHA-256 Hashes',
    sub: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4...',
    badge: 'EVIDENCE INTEGRITY',
    description: 'Cryptographic hash generated for every acquired file payload, confirming it was not altered during analysis.',
    details: 'Chain of Custody Standard: Proves to legal auditors that malware samples and logs were preserved without tampering.',
    tags: ['Algorithm: SHA-256', 'Property: Collision-Resistant', 'Purpose: Integrity Verification'],
  },
  {
    id: 'vault-memory',
    label: 'Volatile RAM Memory Dump',
    sub: 'memdump_BLR-BR-WS-04.raw (16 GB)',
    badge: 'VOLATILE FORENSICS',
    description: 'Full physical memory acquisition capturing injected DLLs, unencrypted network sockets, and plaintext passwords.',
    details: 'Preservation Rule: Captured before rebooting! Powering off the workstation destroys volatile RAM evidence forever.',
    tags: ['Artifact: Physical RAM', 'Tool: WinPmem / LiME', 'Volatile: Cleared on Power Down'],
  },
  {
    id: 'vault-pcap',
    label: 'Full Network Packet Capture (PCAP)',
    sub: 'c2_beacon_stream.pcap (450 MB)',
    badge: 'NETWORK WIRE PROOF',
    description: 'Wireshark packet stream containing raw HTTP headers, TCP sequence numbers, and transmitted payload bytes.',
    details: 'Provides ground truth of what crossed the branch edge firewall during the active intrusion session.',
    tags: ['Format: libpcap', 'Tool: Wireshark / Zeek', 'Content: Full Payload & Headers'],
  },
  {
    id: 'vault-notes',
    label: 'Immutable Case Work Notes',
    sub: 'UTC Timestamped Analyst Audit Log',
    badge: 'CASE DIARY',
    description: 'Sequential work log recording every query executed, every IP checked, and every colleague contacted.',
    details: 'Ananya\'s Guidance: "If you didn\'t write it down with a timestamp, it didn\'t happen. Your notes protect your findings."',
    tags: ['Format: Timestamped Chronology', 'Integrity: Append-Only', 'Review: Peer Audited'],
  },
];

// -----------------------------------------------------------------------------
// 13. M04-U3-C1 Pillar 1: The 5 W's of Initial Triage
// -----------------------------------------------------------------------------
export const fiveWsNodes: VisualNodeItem[] = [
  {
    id: 'five-who',
    label: 'WHO: User Account & SID',
    sub: 'cdac\\FIN-OPS-01 (SID: S-1-5-21-3829-1002)',
    badge: '1. IDENTITY FIELD',
    description: 'Which account credential was authenticated? Remember: record the account identifier, not assumed human presence!',
    details: 'Triage Check: Verify account department, normal work schedule, and active privilege tokens (Medium vs High).',
    tags: ['Field: WHO', 'Account: FIN-OPS-01', 'Integrity: Medium', 'Source: Event 4624'],
  },
  {
    id: 'five-what',
    label: 'WHAT: Process & Action Executed',
    sub: 'certutil.exe -urlcache -split (PID: 4820)',
    badge: '2. BEHAVIOR FIELD',
    description: 'What program executed, which parent process spawned it, and what exact command-line arguments were passed?',
    details: 'Triage Check: Inspect parent PID (cmd.exe vs explorer.exe) and compute SHA-256 hash of downloaded payload.',
    tags: ['Field: WHAT', 'Binary: certutil.exe', 'Parent: cmd.exe (PID 3912)', 'Source: Sysmon Event 1'],
  },
  {
    id: 'five-when',
    label: 'WHEN: Normalized UTC Timestamp',
    sub: '2026-10-15 02:45:12 IST (21:15:12 UTC)',
    badge: '3. TIME FIELD',
    description: 'The exact chronological moment the event occurred, recorded with explicit time zone and normalized to UTC.',
    details: 'Triage Check: Eliminates cross-region confusion; correlates endpoint clock with firewall logs accurately.',
    tags: ['Field: WHEN', 'Local: 02:45:12 IST', 'UTC: 21:15:12 UTC', 'Standard: ISO 8601'],
  },
  {
    id: 'five-where',
    label: 'WHERE: Host, IP & Network Segment',
    sub: 'BLR-BR-WS-04 (10.10.20.15) &rarr; 198.51.100.42',
    badge: '4. LOCATION FIELD',
    description: 'Which physical machine executed the action, what is its internal subnet, and where did network packets flow?',
    details: 'Triage Check: Confirms source workstation belongs to Finance VLAN 20 and destination is an unclassified foreign IP.',
    tags: ['Field: WHERE', 'Host: BLR-BR-WS-04', 'Source IP: 10.10.20.15', 'Dest IP: 198.51.100.42'],
  },
];

// -----------------------------------------------------------------------------
// 14. M04-U3-C1 Pillar 2: Counting vs Interpreting: Aggregation Analysis
// -----------------------------------------------------------------------------
export const aggregationCounterNodes: VisualNodeItem[] = [
  {
    id: 'agg-count-raw',
    label: 'Raw Alert Metric: "Count = 50 Events"',
    sub: 'Aggregation Output in SIEM Alarm',
    badge: 'METRIC OBSERVABLE',
    description: 'SIEM alarm display reads: "50 Failed Logons Observed within 60 Seconds".',
    details: 'The Trap: Novice assumes 50 different adversaries or 50 compromised staff members are attacking simultaneously.',
    tags: ['Raw Metric: Count = 50', 'Window: 60 Seconds', 'Rule: Event Aggregator'],
  },
  {
    id: 'agg-count-truth',
    label: 'Technical Truth: 1 Loop Script on 1 Port',
    sub: 'Automated PowerShell loop trying 1 port',
    badge: 'INTERPRETED FACT',
    description: 'Drilling into raw logs reveals a single automated PowerShell loop script executing 50 rapid socket attempts in 2 seconds.',
    details: 'Ananya\'s Teaching: "A count tells you how many times a condition was recorded. It does not multiply the number of actors."',
    tags: ['Actor Count: 1 Script', 'Method: Automated Loop', 'Source: Single Host WS-04'],
  },
  {
    id: 'agg-count-drill',
    label: 'Drill-Down Investigation Method',
    sub: 'Expanding Aggregated Log Groups',
    badge: 'ANALYST SKILL',
    description: 'Clicking through the SIEM aggregate bubble to inspect individual event rows, unique source IPs, and target usernames.',
    details: 'Key Verification: Are all 50 events targeting the same user? (Brute Force) Or targeting 50 unique users? (Password Spray).',
    tags: ['Action: Drill Down', 'Query: stats count by User, IP', 'Resolution: Attack Type Discovered'],
  },
  {
    id: 'agg-count-policy',
    label: 'Threshold Correlation Policy',
    sub: 'Preventing Triage Misjudgments',
    badge: 'OPERATIONAL RULE',
    description: 'Never write "50 attacks occurred" in an incident ticket without verifying whether it was one repeated script or 50 coordinated hosts.',
    details: 'Maintains documentation credibility: executives make costly containment decisions based on L1 count reporting.',
    tags: ['Standard: Rigorous Scoping', 'Integrity: No Inflated Alarms', 'Report: Precise Scoping'],
  },
];

// -----------------------------------------------------------------------------
// 15. M04-U3-C1 Pillar 3: The "Unknowns" Field & Forensic Honesty
// -----------------------------------------------------------------------------
export const forensicHonestyNodes: VisualNodeItem[] = [
  {
    id: 'hon-why-unknown',
    label: 'The WHY Field: "UNKNOWN (Requires User Check)"',
    sub: 'Forensic Honesty Standard',
    badge: 'OBJECTIVE REPORTING',
    description: 'The analyst does not know why certutil was launched at 02:45 AM, so they record UNKNOWN rather than guessing malicious intent.',
    details: 'Ananya\'s Golden Rule: "The 5 Ws are questions, not permission to invent missing answers. An unknown field is an honest field."',
    tags: ['Field: WHY', 'Value: UNKNOWN', 'Note: User Call Pending', 'Standard: Scientific Rigor'],
  },
  {
    id: 'hon-guess-danger',
    label: 'The Fiction Trap: Guessing Missing Answers',
    sub: '"Attacker clearly broke in to steal payroll"',
    badge: 'DANGEROUS SPECULATION',
    description: 'Fabricating motives or conclusions when evidence is incomplete, leading incident teams down false investigative rabbit holes.',
    details: 'Danger: If the team assumes data theft, they might miss that the attacker was actually planting persistent ransomware.',
    tags: ['Risk: Confirmation Bias', 'Danger: Wasted Hours', 'Rule: Speculation FORBIDDEN'],
  },
  {
    id: 'hon-next-steps',
    label: 'Formulating Verification Hypotheses',
    sub: 'What Evidence Would Answer the Unknown?',
    badge: 'INVESTIGATIVE LOGIC',
    description: 'Alongside the UNKNOWN entry, the analyst records the specific evidence needed to resolve it: "Call user at 09:00 IST to verify session".',
    details: 'Turns an unanswered question into an actionable next step for the incoming shift analyst to execute immediately.',
    tags: ['Next Step: Call User', 'Evidence Needed: User Confirmation', 'Shift Continuity: Clear Bridge'],
  },
  {
    id: 'hon-code',
    label: 'CDAC Bengaluru Analyst Code of Honor',
    sub: 'Verifiable Truth Over Dramatic Theater',
    badge: 'PROFESSIONAL ETHICS',
    description: 'Security analysts are sworn investigators. We document observed technical truth, admit uncertainty, and verify before acting.',
    details: 'Builds ironclad internal credibility: senior management trusts L1 reports because they never contain unverified exaggerations.',
    tags: ['Standard: Code of Honor', 'Values: Truth, Restraint, Discipline', 'Result: Trusted SOC Operations'],
  },
];

// -----------------------------------------------------------------------------
// 16. M04-U3-C2 Pillar 1: Alert Disposition Classification
// -----------------------------------------------------------------------------
export const dispositionTreeNodes: VisualNodeItem[] = [
  {
    id: 'disp-tp-mal',
    label: '1. True Positive - Malicious (TP-M)',
    sub: 'Confirmed Threat • Execute Containment',
    badge: 'CONFIRMED INTRUSION',
    description: 'The alert fired correctly on actual unauthorized malicious activity (e.g. Cobalt Strike C2 beacon or unauthorized LOLBIN download).',
    details: 'Action: Immediate host network isolation, Kerberos token revocation, and urgent escalation to Tier 2 incident response.',
    tags: ['Disposition: TP-M', 'Action: Isolate & Escalate', 'Severity: High / Critical', 'SLA: Emergency'],
  },
  {
    id: 'disp-tp-benign',
    label: '2. True Positive - Benign / Authorized (TP-B)',
    sub: 'Approved IT Activity • Document & Close',
    badge: 'AUTHORIZED ACTIVITY',
    description: 'The rule detected off-hours activity correctly, but evidence confirms it was pre-approved maintenance by an authorized IT admin.',
    details: 'Action: Record the change management ticket reference (CHG-2026-991), confirm user authorization, and close with disposition TP-B.',
    tags: ['Disposition: TP-B', 'Action: Document & Close', 'Change Ticket: Verified', 'Safety: Clean Baseline'],
  },
  {
    id: 'disp-fp',
    label: '3. False Positive (FP)',
    sub: 'Flawed Rule Trigger • Request Tuning',
    badge: 'DETECTION FLAW',
    description: 'The detection rule triggered incorrectly due to poor query logic, software bug, or normal commercial application behavior.',
    details: 'Action: Close alert as FP and submit a tuning ticket to the detection engineering team with proposed whitelist criteria.',
    tags: ['Disposition: False Positive', 'Action: Submit Rule Tuning', 'Result: Reduce Alert Fatigue', 'Engineering: Whitelist'],
  },
  {
    id: 'disp-unresolved',
    label: '4. Unresolved / Under Investigation',
    sub: 'Evidence Inconclusive • Keep Active',
    badge: 'ONGOING TRIAGE',
    description: 'The evidence collected so far neither confirms malicious intrusion nor proves authorized maintenance. Case remains active.',
    details: 'Ananya\'s Rule: "Never close a case as benign because you ran out of shift time! Pass the unresolved case to the incoming shift."',
    tags: ['Disposition: Open / In Progress', 'Action: Handover to Next Shift', 'Safety: Never Guess to Close'],
  },
];

// -----------------------------------------------------------------------------
// 17. M04-U3-C2 Pillar 2: The Shift Handover Note Anatomy
// -----------------------------------------------------------------------------
export const handoverNoteNodes: VisualNodeItem[] = [
  {
    id: 'hand-summary',
    label: '1. Executive Summary & Priority Rationale',
    sub: 'Case Briefing at a Glance',
    badge: 'SECTION 1: SUMMARY',
    description: 'A 2-sentence executive summary stating the host, active account, severity level, and current operational posture.',
    details: 'Example: "SEV-2 High: Workstation BLR-BR-WS-04 logged on off-hours at 02:45 AM. certutil.exe downloaded unknown binary. Host quarantined."',
    tags: ['Section: Summary', 'Format: Concise & High Impact', 'Audience: Shift Lead & L2'],
  },
  {
    id: 'hand-observables',
    label: '2. Verified Observables & Telemetry Proof',
    sub: 'Who, What, When, Where & Hashes',
    badge: 'SECTION 2: EVIDENCE',
    description: 'Structured technical table containing exact Hostname, IP, User SID, Process PIDs, Destination IPs, and SHA-256 Hashes.',
    details: 'All timestamps normalized to UTC with explicit IST offset (+05:30) to ensure zero chronological misinterpretation.',
    tags: ['Section: Evidence Table', 'Observables: Host, User, Hash, IP', 'Standard: Normalized UTC'],
  },
  {
    id: 'hand-actions',
    label: '3. Containment Actions Executed',
    sub: 'Steps Completed by Outgoing Analyst',
    badge: 'SECTION 3: ACTIONS TAKEN',
    description: 'Clear bullet points recording what actions were taken: "1. Host isolated via EDR. 2. Memory dump captured. 3. User notified."',
    details: 'Prevents redundant duplication: the incoming analyst knows the host is already quarantined and does not repeat containment.',
    tags: ['Section: Actions Taken', 'Audit: What Was Done', 'Preservation: Confirmed'],
  },
  {
    id: 'hand-nextsteps',
    label: '4. Requested Next Steps & Outstanding Unknowns',
    sub: 'Actionable Roadmap for Incoming Shift',
    badge: 'SECTION 4: NEXT ACTIONS',
    description: 'Specific instructions for incoming peers: "Call employee Ramesh at 09:00 IST to verify session. Await Tier 2 memory dump analysis."',
    details: 'Ananya\'s Teaching: "A handover note that survives your shift leaves no doubt about who does what next."',
    tags: ['Section: Next Steps', 'Owner: Incoming Shift Analyst', 'Clarity: Complete Roadmap'],
  },
];

// -----------------------------------------------------------------------------
// 18. M04-U3-C2 Pillar 3: The Supervised Evidence Package
// -----------------------------------------------------------------------------
export const evidencePackageNodes: VisualNodeItem[] = [
  {
    id: 'pkg-bundle',
    label: 'Case Package: CASE-2026-081 (FIN-OPS-01)',
    sub: 'Consolidated Evidence Bundle for Tier 2',
    badge: 'EVIDENCE DOSSIER',
    description: 'The master case package ready for handoff to Mentor Ananya and the Tier 2 Incident Response team.',
    details: 'Contains all linked alerts, timeline chronology, network PCAP, memory dump, and structured analyst notes.',
    tags: ['Dossier: Complete Case', 'Status: Ready for Review', 'Recipient: Tier 2 / Shift Lead', 'Confidentiality: High'],
  },
  {
    id: 'pkg-lead-review',
    label: 'Shift Lead Supervised Evidence Review',
    sub: 'Mentor Ananya Signs Off on Triage',
    badge: 'QUALITY GATE',
    description: 'Mentor Ananya reviews the triage findings, checks for missing unknowns, and approves the escalation package.',
    details: 'Ananya\'s Feedback: "Your note is clear, your entities are verified, and your unknowns are honestly stated. Excellent L1 work!"',
    tags: ['Review: Approved by Lead', 'Standard: 100% Verified', 'Apprentice Milestone: Complete'],
  },
  {
    id: 'pkg-sla-closed',
    label: 'SLA Met: Zero Backlog & Full Traceability',
    sub: 'Triage Completed in 14 Minutes (SLA: 30m)',
    badge: 'PERFORMANCE METRIC',
    description: 'Investigation qualified and documented well within the 30-minute SLA window, preventing queue breach alarms.',
    details: 'Demonstrates professional operational competence: calm, methodical, disciplined L1 security operations in practice.',
    tags: ['SLA Target: 30 Min', 'Actual Time: 14 Min', 'Result: SLA Passed ✓', 'Readiness: Certified L1'],
  },
  {
    id: 'pkg-next-module',
    label: 'Bridge to Module 05: SIEM Search & Logs',
    sub: 'Moving from Triage to Deep Log Querying',
    badge: 'NEXT LEARNING ADVENTURE',
    description: 'Having mastered L1 triage operations, you are now ready to meet Mentor Karthik to query SIEM indexers directly.',
    details: 'Module 05 introduces Splunk/Elastic query syntax, Windows event parsing, and tracking attacks through raw SIEM search.',
    tags: ['Next Mentor: Karthik', 'Topic: SIEM Search & SPL', 'Destination: Module 05', 'Journey: Visitor to L1'],
  },
];

// =============================================================================
// MODULE 04 NODES MAP LOOKUP
// =============================================================================
export const module04NodesMap: Record<string, VisualNodeItem[]> = {
  'm04-soc-hierarchy': socHierarchyNodes,
  'm04-escalation-triggers': escalationTriggersNodes,
  'm04-shift-wheel': shiftWheelNodes,
  'm04-queue-ingestion': queueIngestionNodes,
  'm04-ticket-lifecycle': ticketLifecycleNodes,
  'm04-sla-monitor': slaMonitorNodes,
  'm04-event-vs-alert': eventVsAlertNodes,
  'm04-rule-logic-engine': ruleLogicNodes,
  'm04-verdict-trap': verdictTrapNodes,
  'm04-taxonomy-quad': taxonomyQuadNodes,
  'm04-case-aggregation': caseAggregationNodes,
  'm04-evidence-vault': evidenceVaultNodes,
  'm04-five-ws-triage': fiveWsNodes,
  'm04-aggregation-counter': aggregationCounterNodes,
  'm04-forensic-honesty': forensicHonestyNodes,
  'm04-disposition-tree': dispositionTreeNodes,
  'm04-handover-note-anatomy': handoverNoteNodes,
  'm04-evidence-package': evidencePackageNodes,
};
