/**
 * SOC Analyst L1 - Units 2 to 7 Complete Story-Based Data
 * Narrative-driven curriculum set in FinCorp SOC with Indian English narration.
 * Cast: Rajesh Kumar (L1 Mentor), Priya Sharma (L2), Aditya Deshmukh (L3), Elena Gomez (Manager), Compliance Officer, Michael Chen.
 */

export interface CharacterQuote {
  name: string;
  role: string;
  avatarText: string;
  badgeColor: string;
  quote: string;
  timeString?: string;
}

export interface UnitShiftContext {
  unitId: string;
  unitNumber: number;
  dayTitle: string;
  shiftTime: string;
  shiftTheme: string;
  narrativeScenario: string;
  mentorPrompt: string;
  mentorQuote: string;
}

export const UNIT_SHIFT_CONTEXTS: Record<string, UnitShiftContext> = {
  'unit-2': {
    unitId: 'unit-2',
    unitNumber: 2,
    dayTitle: 'Tuesday Morning — Day 2 of Training',
    shiftTime: '08:30 AM',
    shiftTheme: 'Alerts & Events — Understanding What You Are Seeing',
    narrativeScenario: 'Multiple alerts in queue. Not all are the same type. You are learning to distinguish Event vs Alert vs Incident vs Case.',
    mentorPrompt: 'Yesterday you learned the foundation. Today is more practical. We have five alerts in the queue right now. At first glance, they all look like alerts, but some are noise, some are false alarms, and some need immediate action.',
    mentorQuote: '“How do you tell the difference? You must understand Events, Alerts, Incidents, and Cases. Let me show you.”',
  },
  'unit-3': {
    unitId: 'unit-3',
    unitNumber: 3,
    dayTitle: 'Wednesday Morning — Day 3 of Training',
    shiftTime: '08:45 AM',
    shiftTheme: 'Alert Triage — Extracting the Critical 5 Fields',
    narrativeScenario: 'You are ready to handle incoming alerts without Rajesh watching over your shoulder constantly. Three new alerts arrived.',
    mentorPrompt: 'Today, I am stepping back. You are investigating. You open an alert and have maybe 5 minutes to understand the situation. Can you extract the story fast enough using WHO, WHAT, WHERE, WHEN, and HOW MANY?',
    mentorQuote: '“Let me watch you handle the first alert. Then you will handle the other two alone, yaar. Take a breath and follow the 5 anchors.”',
  },
  'unit-4': {
    unitId: 'unit-4',
    unitNumber: 4,
    dayTitle: 'Friday Morning — Day 5 of Training',
    shiftTime: '09:00 AM',
    shiftTheme: 'False Positives — The Art of Not Over-Escalating',
    narrativeScenario: 'Your queue is overloaded with 25 alerts. You have 6 hours to clear it. Most are noise or false alarms.',
    mentorPrompt: 'Today is a reality check. Look at your queue: 25 alerts! If you escalate every one, Priya is drowning in false alarms. But if you dismiss real threats, we get breached. The skill is context.',
    mentorQuote: '“Alert by itself is suspicious. Alert plus context is understanding. Let me show you how to find the context.”',
  },
  'unit-5': {
    unitId: 'unit-5',
    unitNumber: 5,
    dayTitle: 'Monday Morning — Week 2 of Training',
    shiftTime: '08:00 AM',
    shiftTheme: 'Severity Classification — The Priority Pyramid',
    narrativeScenario: 'Queue has 18 alerts. Elena Gomez stops by: only 2 response analysts are on shift with 8 hours of work-time between them.',
    mentorPrompt: 'Which 3 alerts do we work on today? Which 15 do we defer? Severity is not just gut feeling; it is Asset Criticality multiplied by Threat Confidence multiplied by Business Impact.',
    mentorQuote: '“Elena wants to know which fire to put out first. A false priority means the real attacker walks away with customer data.”',
  },
  'unit-6': {
    unitId: 'unit-6',
    unitNumber: 6,
    dayTitle: 'Wednesday Afternoon — Week 2 of Training',
    shiftTime: '14:00 PM',
    shiftTheme: 'Escalation — Handing Off to the Next Level',
    narrativeScenario: 'You have investigated 5 alerts. Each needs a different tier response (L2, L3, Specialist, or Management).',
    mentorPrompt: 'You have done the triage. Now comes the art: knowing who handles what. Routing wrong means the ticket sits idle while malware spreads. Routing right solves the problem fast.',
    mentorQuote: '“L2 contains host infections. L3 hunts across the enterprise. Specialists fix passwords or firewall rules. Management handles crisis decisions.”',
  },
  'unit-7': {
    unitId: 'unit-7',
    unitNumber: 7,
    dayTitle: 'Friday Afternoon — End of Week 2',
    shiftTime: '16:00 PM',
    shiftTheme: 'SOC Documentation — Creating the Audit Record',
    narrativeScenario: 'Compliance auditors and Elena Gomez are reviewing your weekly case files. Sloppy notes get ripped apart.',
    mentorPrompt: 'Your investigation skills are sharp, but your documentation must be audit-grade. When lawyers read your notes or regulators examine our logs, every word counts.',
    mentorQuote: '“A good case record tells the whole story from start to finish. If you did not document it, it never happened in the eyes of the law.”',
  },
};

// ============================================================================
// UNIT 2: ALERTS & EVENTS DATA
// ============================================================================

export const UNIT_2_RAW_EVENTS = [
  { id: 1, type: 'Process Creation', program: 'chrome.exe', time: '10:15:23 AM', user: 'mchen', host: 'FIN-BOS-MCHEN-047', details: 'Google Chrome is opening', isSuspicious: false },
  { id: 2, type: 'Network Connection', program: 'chrome.exe', destination: 'www.gmail.com (74.125.224.72):443', time: '10:15:24 AM', user: 'mchen', host: 'FIN-BOS-MCHEN-047', details: 'Chrome connecting to Google webmail', isSuspicious: false },
  { id: 3, type: 'File Access', program: 'explorer.exe', file: 'C:\\Users\\mchen\\Documents\\Q1_Budget.xlsx', time: '10:16:45 AM', user: 'mchen', host: 'FIN-BOS-MCHEN-047', details: 'File opened for viewing', isSuspicious: false },
  { id: 4, type: 'DNS Query', program: 'chrome.exe', query: 'intranet.fincorp.local', time: '10:17:02 AM', user: 'mchen', host: 'FIN-BOS-MCHEN-047', details: 'Internal portal lookup resolved', isSuspicious: false },
  { id: 5, type: 'Process Creation', program: 'teams.exe', time: '10:18:10 AM', user: 'mchen', host: 'FIN-BOS-MCHEN-047', details: 'Microsoft Teams chat client start', isSuspicious: false },
];

export const UNIT_2_SIEM_PATTERN_EVENTS = [
  { id: 1, name: 'EVENT 1: Process Execution', tool: 'EDR Sensor', time: '09:19:58 AM', detail: 'Parent: WINWORD.EXE -> Child: powershell.exe -enc AQBB...', risk: 'High' },
  { id: 2, name: 'EVENT 2: Network Outbound Attempt', tool: 'Perimeter Firewall', time: '09:19:59 AM (1s later)', detail: 'Destination: 198.51.100.84:443 (Known C2 server IP) -> Status: BLOCKED', risk: 'Critical' },
  { id: 3, name: 'EVENT 3: Process Terminated', tool: 'EDR Prevention Engine', time: '09:20:00 AM (2s later)', detail: 'Action: EDR security engine killed PID 9024 (powershell.exe)', risk: 'Contained' },
];

export const UNIT_2_CASE_RECORD_PARTS = [
  { id: 'E', label: 'Affected Entities (Who & Where)', content: 'User: Michael Chen (Senior Finance Analyst) on Workstation FIN-BOS-MCHEN-047', order: 1 },
  { id: 'C', label: 'Evidence Found (Artifacts)', content: 'Spoofed phishing email from accounts-verification@trusted-vendor.com with macro attachment', order: 2 },
  { id: 'D', label: 'Analysis Verdict (What is it?)', content: 'Verdict: TRUE POSITIVE. Confirmed spear phishing macro attack attempting PowerShell C2 callback', order: 3 },
  { id: 'A', label: 'Sequence of Events (Chronology)', content: 'PowerShell spawned by Word, attempted external C2 connection to 198.51.100.84, blocked by firewall and terminated by EDR', order: 4 },
  { id: 'B', label: 'Next Steps & Recommendations (Handover)', content: 'Escalate to Priya (L2) for password reset, email domain block, and request Aditya (L3) hunt for 47 recipients', order: 5 },
];

// ============================================================================
// UNIT 3: ALERT TRIAGE (THE 5 CRITICAL FIELDS) DATA
// ============================================================================

export interface TriageAlertItem {
  id: string;
  alertId: string;
  ruleName: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  rawJson: Record<string, string>;
  fields: {
    who: string;
    what: string;
    where: string;
    when: string;
    howMany: string;
  };
  storySummary: string;
  priorityRank: 'Highest' | 'Medium' | 'Lowest';
  reasoning: string;
}

export const UNIT_3_TRIAGE_ALERTS: TriageAlertItem[] = [
  {
    id: 'triage-1',
    alertId: 'SEC-2026-0934',
    ruleName: 'Suspicious PowerShell Execution at Off-Hours',
    severity: 'HIGH',
    timestamp: '02:45:30 AM',
    rawJson: {
      user: 'adeshmukh',
      host: 'FIN-NYC-ADESHMUKH-W7421',
      process: 'powershell.exe -enc AQBBIQ...',
      sourceIP: '10.30.5.198 (NYC Office Internal)',
      eventCount: '1 occurrence',
    },
    fields: {
      who: 'adeshmukh (Aditya Deshmukh - L3 Hunter user account)',
      what: 'Aditya’s work laptop (FIN-NYC-ADESHMUKH-W7421)',
      where: 'Internal NYC Office network (10.30.5.198)',
      when: '02:45:30 AM (Unusual off-hours / middle of the night)',
      howMany: '1 execution with encoded payload',
    },
    storySummary: 'Someone or malware executed an encoded PowerShell command on Aditya’s workstation at 2:45 AM from inside the NYC office.',
    priorityRank: 'Highest',
    reasoning: 'Off-hours encoded PowerShell on a privileged user’s workstation suggests active compromised credentials or automated malware execution.',
  },
  {
    id: 'triage-2',
    alertId: 'SEC-2026-0935',
    ruleName: 'Unusual Database Query Volume',
    severity: 'MEDIUM',
    timestamp: '14:00:00 PM',
    rawJson: {
      user: 'bi_analyst_svc',
      host: 'FIN-DB-ANALYTICS-01',
      query: 'SELECT * FROM Customers JOIN Transactions...',
      sourceIP: '10.10.40.12 (Internal Database Cluster)',
      eventCount: '487 queries in 5 minutes',
    },
    fields: {
      who: 'bi_analyst_svc (Service account for Business Intelligence)',
      what: 'Analytics Database Production Server (FIN-DB-ANALYTICS-01)',
      where: 'Internal Database Cluster network',
      when: '14:00:00 PM (Normal business hours)',
      howMany: '487 heavy queries within 5 minutes',
    },
    storySummary: 'BI reporting service account executed 487 full table select queries at 2:00 PM during regular business operations.',
    priorityRank: 'Medium',
    reasoning: 'High volume query spike on a database during business hours could be an ad-hoc executive quarterly report or data scraping.',
  },
  {
    id: 'triage-3',
    alertId: 'SEC-2026-0936',
    ruleName: 'File Deletion Pattern in Maintenance Window',
    severity: 'MEDIUM',
    timestamp: '03:30:00 AM',
    rawJson: {
      user: 'file_cleanup_job',
      host: 'FIN-BOS-FILESERVER-02',
      action: 'File delete: C:\\finance\\ledger_archive_*',
      sourceIP: 'Local Server Agent',
      eventCount: '1,247 files deleted in 15 minutes',
    },
    fields: {
      who: 'file_cleanup_job (Automated system cleanup routine)',
      what: 'Boston Shared File Server (FIN-BOS-FILESERVER-02)',
      where: 'Local file system storage array',
      when: '03:30:00 AM (Scheduled IT maintenance window)',
      howMany: '1,247 archived files purged',
    },
    storySummary: 'Scheduled file cleanup script purged 1,247 old archive files at 3:30 AM during the standard weekly maintenance window.',
    priorityRank: 'Lowest',
    reasoning: 'Matches documented retention policy cleanup script running inside approved 3:00 AM maintenance window.',
  },
];

// ============================================================================
// UNIT 4: FALSE POSITIVES & CONTEXT INVESTIGATION DATA
// ============================================================================

export interface ContextScenarioItem {
  id: string;
  alertId: string;
  title: string;
  userContext: string;
  timeContext: string;
  toolContext: string;
  approvalContext: string;
  verdict: 'EXPECTED ACTIVITY' | 'BENIGN ACTIVITY' | 'FALSE POSITIVE' | 'TRUE POSITIVE';
  explanation: string;
  action: string;
}

export const UNIT_4_CONTEXT_SCENARIOS: ContextScenarioItem[] = [
  {
    id: 'ctx-1',
    alertId: 'SEC-2026-1011',
    title: '12 Failed Logins on Account jsmith',
    userContext: 'John Smith (Finance Clerk). Known non-technical employee. Present in office today.',
    timeContext: '09:15 AM (First arrival at office after Monday morning weekend).',
    toolContext: 'Standard Windows Workstation logon prompt.',
    approvalContext: 'Help Desk Ticket #HD-4481 logged at 09:18 AM: "User states caps lock was on, account locked, requesting reset."',
    verdict: 'EXPECTED ACTIVITY',
    explanation: 'User made password typos with caps lock on upon Monday morning arrival. Documented help desk ticket confirms benign human error.',
    action: 'Close alert as Expected Activity (User Password Error). Help desk has already assisted.',
  },
  {
    id: 'ctx-2',
    alertId: 'SEC-2026-1012',
    title: '47 GB Outbound Transfer to External Removable Drive',
    userContext: 'Vikram Patel (Senior IT Systems Administrator). Holds full domain privileges.',
    timeContext: '14:30 PM (Regular weekday afternoon).',
    toolContext: 'Hardware migration utility copy to Kingston 128GB IronKey Encrypted Drive.',
    approvalContext: 'Approved Change Request #CR-8820: "Decommissioning legacy Boston File Server 01, migrating archives to encrypted hardware storage."',
    verdict: 'EXPECTED ACTIVITY',
    explanation: 'Large data volume transferred by authorized IT admin with an approved Change Request ticket for planned server replacement.',
    action: 'Verify ticket number against IT Service Portal, document CR-8820, and close as Expected Admin Activity.',
  },
  {
    id: 'ctx-3',
    alertId: 'SEC-2026-1013',
    title: 'PowerShell Executed with Base64 Encoded Command',
    userContext: 'Michael Chen (Finance Analyst). Non-technical user. No IT scripting authority.',
    timeContext: '23:45 PM (Late night Sunday, employee officially off shift).',
    toolContext: 'powershell.exe -enc launched from unusual temp directory C:\\Users\\mchen\\AppData\\Local\\Temp.',
    approvalContext: 'Zero help desk tickets. No scheduled tasks. User is offline according to VPN logs.',
    verdict: 'TRUE POSITIVE',
    explanation: 'Non-technical user running encoded PowerShell late at night from a temporary directory without authorization or business purpose.',
    action: 'Isolate endpoint immediately via EDR, reset user Active Directory credentials, and escalate to Priya (L2).',
  },
  {
    id: 'ctx-4',
    alertId: 'SEC-2026-1014',
    title: '100,000 Rows Deleted from Production Customer Database',
    userContext: 'sa (Built-in SQL System Administrator account).',
    timeContext: '03:00 AM on Wednesday morning (Outside scheduled weekend maintenance).',
    toolContext: 'Direct T-SQL execution: DROP TABLE and DELETE FROM Customers_Master.',
    approvalContext: 'No change management ticket. No emergency outage declared. Database admin on-call confirms no knowledge.',
    verdict: 'TRUE POSITIVE',
    explanation: 'Massive deletion of critical financial data at 3:00 AM using built-in sa account with zero change tickets indicates severe breach or rogue insider.',
    action: 'Wake Elena Gomez (Manager) and L2/L3 immediately. Cut network link to database to prevent further data loss.',
  },
];

// ============================================================================
// UNIT 5: SEVERITY CLASSIFICATION & MATRIX DATA
// ============================================================================

export interface SeverityMatrixScenario {
  id: string;
  alertId: string;
  title: string;
  assetTier: 'Tier 1 (Standard)' | 'Tier 2 (Department)' | 'Tier 3 (Production)' | 'Tier 4 (Critical)';
  threatConfidence: 'Blocked' | 'Attempted' | 'Successful' | 'Post-Exploitation';
  businessImpact: 'None' | 'Low' | 'Medium' | 'Critical';
  calculatedSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  slaHours: string;
  decisionExplanation: string;
}

export const UNIT_5_SEVERITY_SCENARIOS: SeverityMatrixScenario[] = [
  {
    id: 'sev-1',
    alertId: 'SEC-2026-1201',
    title: 'Quarantined Adware on Reception Workstation',
    assetTier: 'Tier 1 (Standard)',
    threatConfidence: 'Blocked',
    businessImpact: 'None',
    calculatedSeverity: 'LOW',
    slaHours: '24 Hours',
    decisionExplanation: 'Standard front-desk computer where malware was immediately blocked and deleted by EDR. No operational disruption.',
  },
  {
    id: 'sev-2',
    alertId: 'SEC-2026-1202',
    title: 'Phishing Email Blocked at Perimeter Mail Gateway',
    assetTier: 'Tier 1 (Standard)',
    threatConfidence: 'Blocked',
    businessImpact: 'None',
    calculatedSeverity: 'LOW',
    slaHours: '24 Hours',
    decisionExplanation: 'Perimeter gateway stopped the email before any employee received it. Threat contained at outer border.',
  },
  {
    id: 'sev-3',
    alertId: 'SEC-2026-1203',
    title: 'PowerShell Script Executing on IT Admin Laptop',
    assetTier: 'Tier 2 (Department)',
    threatConfidence: 'Attempted',
    businessImpact: 'Low',
    calculatedSeverity: 'MEDIUM',
    slaHours: '4 Hours',
    decisionExplanation: 'Privileged IT admin laptop where an unverified script is executing. Requires investigation within 4 hours to verify authorization.',
  },
  {
    id: 'sev-4',
    alertId: 'SEC-2026-1204',
    title: 'Unusual Query Spike on Production Core Banking DB',
    assetTier: 'Tier 3 (Production)',
    threatConfidence: 'Successful',
    businessImpact: 'Medium',
    calculatedSeverity: 'HIGH',
    slaHours: '1 Hour',
    decisionExplanation: 'Production banking database accessed with abnormal query patterns. Significant customer financial risk if data is leaking.',
  },
  {
    id: 'sev-5',
    alertId: 'SEC-2026-1205',
    title: 'Active Ransomware Encrypting Boston File Server',
    assetTier: 'Tier 4 (Critical)',
    threatConfidence: 'Post-Exploitation',
    businessImpact: 'Critical',
    calculatedSeverity: 'CRITICAL',
    slaHours: 'Immediate (< 15 Minutes)',
    decisionExplanation: 'Active ongoing encryption of shared corporate infrastructure. Entire business operations halted; immediate emergency mobilization.',
  },
];

// ============================================================================
// UNIT 6: ESCALATION & SPECIALIST ROUTING DATA
// ============================================================================

export interface EscalationScenarioItem {
  id: string;
  alertId: string;
  title: string;
  summary: string;
  correctRoute: 'L1 Close' | 'L2 Incident Response' | 'L2 + L3 Campaign Hunt' | 'L2 + Specialist' | 'Full Management Crisis';
  targetTeams: string[];
  justification: string;
}

export const UNIT_6_ESCALATION_SCENARIOS: EscalationScenarioItem[] = [
  {
    id: 'esc-1',
    alertId: 'SEC-2026-1301',
    title: 'Blocked Malware on Single Workstation',
    summary: 'Known Trojan downloader was caught by EDR and quarantined before execution. No persistence, no lateral activity.',
    correctRoute: 'L1 Close',
    targetTeams: ['Tier 1 Triage'],
    justification: 'Threat was fully contained automatically. No compromise occurred. L1 analyst can safely resolve ticket without burdening higher tiers.',
  },
  {
    id: 'esc-2',
    alertId: 'SEC-2026-1302',
    title: 'Confirmed Account Takeover of Standard Employee',
    summary: 'Attacker logged into user jmorales via external VPN using stolen credentials. Currently downloading files from SharePoint.',
    correctRoute: 'L2 Incident Response',
    targetTeams: ['Tier 2 Incident Response', 'Identity Specialist'],
    justification: 'Active threat actor inside the perimeter using legitimate credentials. L2 must terminate session, isolate host, and trigger password reset.',
  },
  {
    id: 'esc-3',
    alertId: 'SEC-2026-1303',
    title: 'Domain Administrator Account Compromised with Lateral Movement',
    summary: 'Built-in Domain Admin credentials used from unknown IP to access 12 servers and dump password hashes.',
    correctRoute: 'Full Management Crisis',
    targetTeams: ['Tier 2 IR', 'Tier 3 Hunt', 'Elena Gomez (SOC Manager)', 'Identity Team', 'Executive Legal'],
    justification: 'Total authentication infrastructure compromise. Enterprise-wide credentials exposed requiring emergency credential rotation and management crisis mobilization.',
  },
  {
    id: 'esc-4',
    alertId: 'SEC-2026-1304',
    title: 'Spear Phishing Macro Campaign Detected Across 47 Users',
    summary: 'Michael Chen’s initial alert revealed 47 identical emails delivered to Finance and HR staff with polymorphic payloads.',
    correctRoute: 'L2 + L3 Campaign Hunt',
    targetTeams: ['Tier 2 IR (Host containment)', 'Tier 3 Threat Hunter (Aditya)', 'Email Gateway Specialist'],
    justification: 'Systemic adversary campaign targeting an entire division. Requires L3 proactive enterprise sweep while L2 contains individual workstations.',
  },
  {
    id: 'esc-5',
    alertId: 'SEC-2026-1305',
    title: 'Persistent External Port Scanning from Known Bulletproof Hosting IP',
    summary: 'Perimeter firewall is dropping 10,000 SYN packets per minute from 185.220.101.104 targeting port 3389 (RDP).',
    correctRoute: 'L2 + Specialist',
    targetTeams: ['Firewall / Network Engineering Team', 'L2 Operations'],
    justification: 'Needs permanent upstream perimeter ACL block created by Network Engineering team to drop traffic before hitting the edge.',
  },
];

// ============================================================================
// UNIT 7: SOC DOCUMENTATION & INCIDENT CASE RECORD DATA
// ============================================================================

export interface CaseDossierSection {
  partNumber: number;
  sectionTitle: string;
  badge: string;
  goodExample: string;
  badExample: string;
  whyItMatters: string;
}

export const UNIT_7_DOSSIER_SECTIONS: CaseDossierSection[] = [
  {
    partNumber: 1,
    sectionTitle: 'Ticket Header & Priority',
    badge: 'Header & SLA',
    goodExample: 'Ticket #SEC-2026-0412 | Created: 2026-01-15 09:20 EST | Analyst: Junior Analyst (L1) | Assigned: Priya Sharma (L2) | Severity: Medium-High | Status: In Triage',
    badExample: 'Ticket 412. Started this morning. Needs someone to check it out.',
    whyItMatters: 'Records ownership, creation time, and priority so the team knows who is handling it and how quickly response is required.',
  },
  {
    partNumber: 2,
    sectionTitle: 'Affected Entities (User & Computer)',
    badge: 'Targeted Entities',
    goodExample: 'User: Michael Chen (mchen@fincorp.local), Senior Finance Analyst | Host: FIN-BOS-MCHEN-047 (Win11 Enterprise) | IP: 10.20.5.147 | Dept: Treasury (Has wire transfer permissions)',
    badExample: 'Michael’s computer in finance.',
    whyItMatters: 'Identifies exactly who was targeted and where. Knowing the user has wire transfer access immediately shows the business risk.',
  },
  {
    partNumber: 3,
    sectionTitle: 'Observed Activity & Evidence',
    badge: 'Evidence & Activity',
    goodExample: 'Spear phishing email received with macro-enabled Word invoice (Q4_Invoice_Summary.docm). User opened document, which launched PowerShell (PID 9024) attempting C2 callback to 198.51.100.84.',
    badExample: 'User opened a bad file and some PowerShell popped up on screen.',
    whyItMatters: 'Provides the factual narrative and evidence so anyone reading the ticket understands exactly what the attacker attempted.',
  },
  {
    partNumber: 4,
    sectionTitle: 'Actions Taken & Containment Outcome',
    badge: 'Actions & Outcome',
    goodExample: '1. Perimeter firewall blocked outbound connection to 198.51.100.84\n2. EDR killed PowerShell process PID 9024\n3. L1 verified no active network connections or surviving child processes',
    badExample: 'Antivirus probably blocked it. Everything looks quiet now.',
    whyItMatters: 'Documents whether the attack was successfully stopped or if active malware is still executing on the endpoint.',
  },
  {
    partNumber: 5,
    sectionTitle: 'Next Steps & Tier Handover',
    badge: 'Next Steps',
    goodExample: '1. Handover to Priya (L2) to trigger Active Directory password reset for Michael Chen and isolate workstation\n2. Network team: Block sender domain at email gateway\n3. Aditya (L3): Check if other 47 employees received the same email',
    badExample: 'Passed to L2. Please fix.',
    whyItMatters: 'Gives specific, actionable tasks to incoming analysts and specialized teams so nothing gets dropped during shift change.',
  },
];
