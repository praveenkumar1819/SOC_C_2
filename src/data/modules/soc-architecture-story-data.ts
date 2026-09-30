export interface StoryCharacter {
  name: string;
  role: 'L1' | 'L2' | 'L3' | 'Manager' | 'Employee' | 'Executive';
  title: string;
  avatarColor: string;
  quote: string;
}

export interface RoleScenario {
  id: string;
  situation: string;
  question: string;
  options: {
    id: 'L1' | 'L2' | 'L3' | 'Manager';
    text: string;
  }[];
  correctRole: 'L1' | 'L2' | 'L3' | 'Manager';
  explanationCorrect: string;
  explanationIncorrect: string;
}

export interface ProcessStageAction {
  order: number;
  stageName: string;
  tagline: string;
  timestamp: string;
  whatYouSee: string;
  whatYouThink: string;
  whatYouDo: string;
  whyItMatters: string;
}

export interface TechConsoleData {
  id: 'email' | 'edr' | 'siem' | 'firewall' | 'case';
  name: string;
  analogy: string;
  status: string;
  badge: string;
  description: string;
  consoleHeader: string;
  realWorldTools: string[];
  otherToolsMentioned: string;
  records: Record<string, string | number | boolean>;
  insight: string;
}

export interface TechConsoleQuestion {
  id: string;
  scenarioText: string;
  question: string;
  options: {
    id: 'Email Gateway' | 'EDR' | 'SIEM' | 'Firewall' | 'Case Management';
    text: string;
  }[];
  correctTool: 'Email Gateway' | 'EDR' | 'SIEM' | 'Firewall' | 'Case Management';
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface DataFlowStep {
  stepNumber: number;
  stageName: string;
  title: string;
  timeWindow: string;
  whatHappens: string;
  whatIsRecorded: string;
  rajeshExplanation: string;
  tokenLabel: string;
}

export interface VocabCard {
  id: number;
  title: string;
  termA: string;
  defA: string;
  termB: string;
  defB: string;
  analogy: string;
}

export interface DemoStage {
  stage: number;
  title: string;
  timestamp: string;
  visualSummary: string;
  rajeshDialogue: string;
  inspectorTitle: string;
  inspectorDetails: Record<string, string>;
}

export interface HandoverTimelineEvent {
  id: string;
  text: string;
  correctOrder: number;
  timestamp: string;
}

export const FINCORP_INCIDENT = {
  caseId: 'SEC-2026-0412',
  alertTitle: 'Suspicious Office Application Child Process',
  priority: 'MEDIUM-HIGH',
  detectedAt: '09:20:02 AM (Monday)',
  targetUser: 'mchen',
  targetEmployee: 'Michael Chen (Senior Finance Analyst)',
  targetHost: 'FIN-BOS-MCHEN-047',
  fakeSenderEmail: 'accounts-verification@trusted-vendor.com',
  realVendorEmail: 'accounts@trusted-vendor.com',
  emailSubject: 'Invoice Q4 2025 — Action Required',
  attachmentName: 'Q4_Invoice_Summary.docm',
  attachmentSize: '247 KB (Abnormal for standard invoices)',
  parentProcess: 'WINWORD.EXE (Microsoft Word)',
  childProcess: 'powershell.exe -enc AQBB...',
  externalC2IP: '198.51.100.84:443',
  edrStatus: 'Terminated & Blocked by Sensor',
  firewallStatus: 'Outbound TCP Connection Blocked',
};

export const STORY_CHARACTERS: Record<string, StoryCharacter> = {
  you: {
    name: 'You',
    role: 'L1',
    title: 'L1 SOC Analyst (Trainee)',
    avatarColor: 'bg-primary text-white',
    quote: 'First shift in the SOC. Watching for danger, step by step.',
  },
  rajesh: {
    name: 'Rajesh Kumar',
    role: 'L1',
    title: 'Senior L1 Analyst & Shift Mentor',
    avatarColor: 'bg-sky-600 text-white',
    quote: 'Namaste! Do not panic, yaar. Every alert has a story. I am showing you one step at a time.',
  },
  priya: {
    name: 'Priya Sharma',
    role: 'L2',
    title: 'L2 Senior Incident Responder',
    avatarColor: 'bg-indigo-600 text-white',
    quote: 'Once L1 confirms real danger, I take over to contain the infection and stop the threat.',
  },
  aditya: {
    name: 'Aditya Deshmukh',
    role: 'L3',
    title: 'L3 Lead Threat Hunter',
    avatarColor: 'bg-purple-600 text-white',
    quote: 'I hunt across all 500 computers to see if this is an enterprise-wide adversary campaign.',
  },
  elena: {
    name: 'Elena Gomez',
    role: 'Manager',
    title: 'SOC Operations Manager',
    avatarColor: 'bg-rose-600 text-white',
    quote: 'When business and customer data are at risk, I coordinate with the CEO, Legal, and Regulators.',
  },
  michael: {
    name: 'Michael Chen',
    role: 'Employee',
    title: 'Senior Finance Analyst',
    avatarColor: 'bg-amber-600 text-white',
    quote: 'I received an urgent invoice email from a vendor and clicked the document to check payment.',
  },
  amrita: {
    name: 'Dr. Amrita Singh',
    role: 'Executive',
    title: 'FinCorp CEO',
    avatarColor: 'bg-slate-700 text-white',
    quote: 'I need to know: Was our customers’ payment data compromised, and do we notify regulators?',
  },
  vikram: {
    name: 'Vikram Patel',
    role: 'Executive',
    title: 'FinCorp IT Director',
    avatarColor: 'bg-teal-700 text-white',
    quote: 'We need to keep the business operational while security teams clean the environment.',
  },
};

export const SHIFT_TIMELINE_STAGES = [
  { chapter: 1, time: '09:20 AM', title: 'Chapter 1: People', subtitle: 'Who is responding to this?' },
  { chapter: 2, time: '09:24 AM', title: 'Chapter 2: Process', subtitle: 'What happens after an alert arrives?' },
  { chapter: 3, time: '09:26 AM', title: 'Chapter 3: Technology', subtitle: 'What tools help the team understand it?' },
  { chapter: 4, time: '09:27 AM', title: 'Chapter 4: Data Flow', subtitle: 'How did the alert reach the SOC?' },
  { chapter: 5, time: '09:28 AM', title: 'Final Demo', subtitle: 'SOC Architecture in Motion' },
  { chapter: 6, time: '09:30 AM', title: 'Shift Challenge', subtitle: 'Manager Handover Briefing to Elena Gomez' },
];

export const CHAPTER_1_ROLE_SCENARIOS: RoleScenario[] = [
  {
    id: 'sc-1',
    situation: 'A brand-new security alert appears in the incoming SOC queue, flashing red. No one has opened or reviewed it yet.',
    question: 'Who is responsible for reading the alert first, checking the basic facts, and deciding if it is real danger or a false alarm?',
    options: [
      { id: 'L1', text: 'You & Rajesh Kumar (L1) — Triage the alert, extract basic facts, and check if it is real' },
      { id: 'L2', text: 'Priya Sharma (L2) — Jump straight into hands-on computer containment' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Hunt across all 500 computers in the company' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Call the CEO and external regulatory lawyers' },
    ],
    correctRole: 'L1',
    explanationCorrect: '“Exactly right! You (L1) are the first line of defense. Every alert arrives on your desk first. You inspect the alert, gather the 4 basic facts (Who, What, Where, When), and determine whether it is real danger or just an everyday glitch. Without L1, senior responders would be drowned in noisy alerts!”',
    explanationIncorrect: '“Think about who reads incoming alerts first, yaar! L2 and L3 only step in after an alert is verified. As an L1 analyst, YOU are the first responder who reads every incoming alert and filters out false alarms.”',
  },
  {
    id: 'sc-2',
    situation: 'You (L1) verify that Michael’s computer has an active, dangerous malware infection running right now. The threat is confirmed real.',
    question: 'Who steps in to isolate Michael’s computer from the network, reset passwords, and contain the attack?',
    options: [
      { id: 'L1', text: 'You (L1) — Close the ticket as false alarm' },
      { id: 'L2', text: 'Priya Sharma (L2) — Take over hands-on containment to stop the infection' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Write a weekly threat intelligence bulletin' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Send an email warning to all bank customers' },
    ],
    correctRole: 'L2',
    explanationCorrect: '“Spot on! Priya Sharma (L2) is our hands-on doctor. Once you (L1) confirm real danger, Priya takes over to cut off the attacker: isolating Michael’s laptop from the network, revoking compromised passwords, and stopping the infection from spreading.”',
    explanationIncorrect: '“Arre, no! L1 analysts verify alerts, but hands-on host containment and active incident response belong to Priya Sharma (L2). Once an alert is verified as real danger, you escalate it to L2.”',
  },
  {
    id: 'sc-3',
    situation: 'The infection on Michael’s laptop is stopped. But you suspect the attacker might be silently hiding on other computers across the company without triggering any alert.',
    question: 'Who proactively searches across all 500 company computers to hunt down hidden attacker footprints and advanced threats?',
    options: [
      { id: 'L1', text: 'You (L1) — Keep refreshing the incoming alert queue' },
      { id: 'L2', text: 'Priya Sharma (L2) — Reinstall Windows on Michael’s laptop' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Proactively hunt for stealthy attacker tradecraft across all 500 computers' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Review employee shift schedules' },
    ],
    correctRole: 'L3',
    explanationCorrect: '“Superb! Aditya Deshmukh (L3) is our master detective. He does not just wait for alerts to ring. He proactively hunts across all 500 computers to uncover stealthy attacker footprints that bypassed automated security rules. That is true threat hunting!”',
    explanationIncorrect: '“Think about scale, yaar! L1 and L2 handle the immediate alert and workstation. Searching across all 500 computers for hidden adversary techniques requires advanced threat hunting, which is Aditya’s (L3) specialty.”',
  },
  {
    id: 'sc-4',
    situation: 'The attack is confirmed to be a major security incident that puts customer banking data and company operations at serious risk.',
    question: 'Who coordinates executive leadership (CEO), legal counsel, and public regulatory disclosures?',
    options: [
      { id: 'L1', text: 'You (L1) — Post on social media about the attack' },
      { id: 'L2', text: 'Priya Sharma (L2) — Block IP addresses on the firewall' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Disassemble the malware binary' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Lead crisis command, executive briefings, and legal reporting' },
    ],
    correctRole: 'Manager',
    explanationCorrect: '“Brilliant! Elena Gomez is our SOC Operations Manager. While technical analysts handle the computers, Elena manages business risk: briefing CEO Dr. Amrita Singh, consulting corporate legal counsel, and managing compliance reporting like mandatory breach disclosures.”',
    explanationIncorrect: '“Remember: technical analysts (L1, L2, L3) do not contact executives or regulators directly. Elena Gomez, as SOC Manager, owns high-stakes executive briefings, crisis management, and legal coordination.”',
  },
];

export const CHAPTER_2_PROCESS_STAGES: ProcessStageAction[] = [
  {
    order: 1,
    stageName: '1. Monitor & Catch',
    tagline: 'An alert appears in your queue — you claim it to investigate',
    timestamp: '09:20:02 AM',
    whatYouSee: 'Alert SEC-2026-0412 appears in your incoming queue, red and pulsing. Priority: Medium-High. Affected User: Michael Chen. Computer: FIN-BOS-MCHEN-047. Suspicious Activity: Word opening PowerShell.',
    whatYouThink: '“Okay. Microsoft Word is launching PowerShell. Normal office documents should never run system scripts. Either Michael is running a valid test, or an attacker has sent a dangerous file. I will claim this alert right now to investigate.”',
    whatYouDo: 'You click “Accept Alert”. The ticket is assigned to your name. Your investigation begins, with Rajesh sitting alongside to observe your triage.',
    whyItMatters: '“When you claim an alert, you tell your team: ‘I am looking at this.’ If nobody claims it, the alert sits unnoticed while an attacker might be moving inside.”',
  },
  {
    order: 2,
    stageName: '2. Inspect & Extract',
    tagline: 'Look at the 4 basic facts: Who, What, Where, and When',
    timestamp: '09:20:45 AM',
    whatYouSee: 'Basic facts: User = Michael Chen (Senior Finance Analyst). Computer = FIN-BOS-MCHEN-047. Program = Word launching PowerShell. Time = 09:19 AM. Status = Stopped by security sensor.',
    whatYouThink: '“Michael is in Finance, not IT. Why would Word launch PowerShell on his computer? I will note down the 4 simple facts: Who, What, Where, and When so I understand the foundation.”',
    whatYouDo: 'Extract the 4 simple anchors onto your notepad: WHO (Michael Chen), WHERE (FIN-BOS-MCHEN-047), WHAT (Word ran PowerShell), WHEN (09:19 AM).',
    whyItMatters: '“Inspect means reading the alert carefully. Extract means writing down simple facts. If you jump to conclusions without the facts, you make mistakes. Keep it simple and clear!”',
  },
  {
    order: 3,
    stageName: '3. Observe & Cross-Check',
    tagline: 'Look across multiple security cameras to see the full story',
    timestamp: '09:22:10 AM',
    whatYouSee: 'Email tool shows: Fake invoice email arrived at 09:18 AM. Computer tool shows: Word opened PowerShell at 09:19 AM. Firewall tool shows: Outbound connection blocked at 09:19 AM.',
    whatYouThink: '“All three tools tell the same story: Fake invoice arrived -> User opened it -> Word tried to launch an attacker script -> Firewall blocked the connection. This is real proof.”',
    whatYouDo: 'Cross-check three tools: (1) Email Gateway log, (2) Computer Antivirus/EDR, (3) Network Firewall. All three confirm the exact same timeline.',
    whyItMatters: '“One tool can make a mistake or false alarm. But when three tools see the exact same story at the same minute, you have solid proof of real danger.”',
  },
  {
    order: 4,
    stageName: '4. Respond & Stop',
    tagline: 'Stop the danger before it can spread to other computers',
    timestamp: '09:24:30 AM',
    whatYouSee: 'The bad script on Michael’s computer was stopped, but his password might be known to the attacker, and the bad email might still be in other inboxes.',
    whatYouThink: '“The immediate fire is out on Michael’s laptop, but we must protect Michael’s account and stop other employees from clicking the same bad email.”',
    whatYouDo: 'Recommend an immediate password reset for Michael, block the attacker’s sender domain, and alert Priya (L2) to inspect the machine.',
    whyItMatters: '“Respond means stopping the danger from spreading. Reset the password, block the bad sender, and secure the system. That is real protection.”',
  },
  {
    order: 5,
    stageName: '5. Record & Share',
    tagline: 'Write simple notes and pass them to the right team',
    timestamp: '09:26:00 AM',
    whatYouSee: 'A clean case record form with summary, user, affected computer, and next assigned analyst.',
    whatYouThink: '“If it is not written down, nobody knows what happened. Priya (L2) needs simple, clear facts so she can take over instantly without asking Michael to repeat everything.”',
    whatYouDo: 'Fill in the case record: 1-sentence summary, affected user (Michael Chen), outcome (malware stopped), and pass the ticket to Priya (L2).',
    whyItMatters: '“In emergency response, doctors write clear notes when handing over a patient. In security, your notes are that handover. Clear notes save valuable minutes.”',
  },
];

export const CHAPTER_3_CONSOLES: Record<string, TechConsoleData> = {
  email: {
    id: 'email',
    name: 'Email Gateway',
    analogy: 'Like a mail inspector at the post office checking every letter before it lands on your desk.',
    status: 'ONLINE',
    badge: 'Suspicious Email Intercepted',
    description: 'Inspects all inbound and outbound emails, verifying sender domain signatures, scanning attachments for hidden macros, and checking links.',
    consoleHeader: 'FINCORP SECURE EMAIL GATEWAY // INBOUND LOG VIEWER',
    realWorldTools: [
      'Proofpoint Email Protection',
      'Mimecast Email Security',
      'Microsoft Defender for Office 365',
    ],
    otherToolsMentioned: 'Also widely used in enterprises: Cisco Secure Email (IronPort), Abnormal Security, Fortinet FortiMail, Barracuda Essentials.',
    records: {
      'Email ID': 'EML-2026-089347',
      'From': 'accounts-verification@trusted-vendor.com [SPOOFED DOMAIN]',
      'Real Vendor Domain': 'accounts@trusted-vendor.com (Attacker added "-verification")',
      'To': 'mchen@fincorp.local (Michael Chen)',
      'Subject': 'Invoice Q4 2025 — Action Required [Panic/Urgent language]',
      'Received Time': '09:18:47 AM (Monday)',
      'Attachment': 'Q4_Invoice_Summary.docm (.docm = Macro-Enabled Word File)',
      'Attachment Size': '247 KB (Normal invoices are 50-80 KB; hidden code inside)',
      'Gateway Risk Score': '87 / 100 (HIGH RISK)',
    },
    insight: 'Rajesh: “Look at the sender domain, yaar! The real vendor is accounts@trusted-vendor.com. The attacker created ‘trusted-vendor-verification’ to fool Michael. And .docm means there is hidden macro code!”',
  },
  edr: {
    id: 'edr',
    name: 'EDR Console',
    analogy: 'Like a 24/7 CCTV camera on each employee laptop, recording every program execution and stopping attacks.',
    status: 'ALERT ACTIVE',
    badge: 'Malicious Child Process Terminated',
    description: 'Endpoint Detection and Response continuously monitors host process trees, file modifications, memory injections, and isolates compromised endpoints.',
    consoleHeader: 'FINCORP CROWDSTRIKE EDR SENSOR // HOST: FIN-BOS-MCHEN-047',
    realWorldTools: [
      'CrowdStrike Falcon',
      'Microsoft Defender for Endpoint (MDE)',
      'SentinelOne Singularity',
    ],
    otherToolsMentioned: 'Also widely used in enterprises: Palo Alto Cortex XDR, VMware Carbon Black, Trend Micro Vision One, Sophos Intercept X.',
    records: {
      'Host Name': 'FIN-BOS-MCHEN-047',
      'Logged-in User': 'mchen (Michael Chen, Senior Finance Analyst)',
      'Parent Process': 'explorer.exe (PID: 1044) -> WINWORD.EXE (PID: 4812)',
      'Abnormal Child Process': 'powershell.exe (PID: 9024) [ABNORMAL CHILD]',
      'Command Line': 'powershell.exe -enc AQBBAGMA... (Secret base64 encoded payload)',
      'Execution Time': '09:19:58.892 AM',
      'Sensor Action': 'BLOCKED & TERMINATED (Execution killed in 1.1 seconds)',
      'Local Infection Status': 'CLEAN (Sensor killed process before persistence was written)',
    },
    insight: 'Rajesh: “Word should only open text documents. When Word opens PowerShell with an encoded command, our CCTV camera (EDR) yells ‘Danger!’ and terminates the process immediately.”',
  },
  siem: {
    id: 'siem',
    name: 'SIEM Console',
    analogy: 'Like the central security control room watching all CCTV cameras at once to connect the puzzle pieces.',
    status: 'CORRELATION ACTIVE',
    badge: 'Rule Match: SEC-2026-0412',
    description: 'Security Information and Event Management aggregates telemetry from all endpoints, firewalls, and mailboxes, normalizing fields into unified alerts.',
    consoleHeader: 'FINCORP SPLUNK SIEM // REAL-TIME CORRELATION ENGINE',
    realWorldTools: [
      'Splunk Enterprise Security',
      'Microsoft Sentinel (Cloud Native SIEM)',
      'IBM QRadar SIEM',
    ],
    otherToolsMentioned: 'Also widely used in enterprises: Google Chronicle (SecOps), Elastic Security, Exabeam, LogRhythm SIEM.',
    records: {
      'Correlated Rule': 'Office-to-PowerShell Execution Pattern (Rule ID: R-8812)',
      'Event 1 (Email Gateway)': '09:18:47 AM — Phishing email delivered with .docm macro',
      'Event 2 (Endpoint EDR)': '09:19:58 AM — WINWORD.EXE spawned encoded powershell.exe',
      'Event 3 (Firewall)': '09:19:59 AM — Outbound TCP connection to 198.51.100.84 blocked',
      'Time Delta': 'All events clustered within 72 seconds across 3 systems',
      'Target User': 'mchen@fincorp.local',
      'Generated Alert': 'SEC-2026-0412 (Severity: Medium-High)',
    },
    insight: 'Rajesh: “See how SIEM connects the dots? Email at 09:18 + Word running PowerShell at 09:19 + Firewall block at 09:19. One tool alone might be a mistake. Three tools together prove a real attack!”',
  },
  firewall: {
    id: 'firewall',
    name: 'Firewall Console',
    analogy: 'Like a border security guard at the international airport, inspecting where data packets are flying.',
    status: 'ONLINE',
    badge: 'C2 Callback Dropped',
    description: 'Perimeter network firewalls inspect ingress and egress network packets, validating ports, protocols, IP reputations, and blocking unauthorised outbound connections.',
    consoleHeader: 'FINCORP PALO ALTO PERIMETER FIREWALL // EGRESS TRAFFIC LOGS',
    realWorldTools: [
      'Palo Alto Networks (Next-Gen Firewall)',
      'Fortinet FortiGate',
      'Check Point Quantum Security Gateway',
    ],
    otherToolsMentioned: 'Also widely used in enterprises: Cisco Secure Firewall (Firepower), Sophos Firewall, AWS Network Firewall, pfSense / OPNsense.',
    records: {
      'Source Host': 'FIN-BOS-MCHEN-047 (10.10.40.82 internal finance VLAN)',
      'Destination IP': '198.51.100.84:443 (External Public Internet IP)',
      'Destination Country': 'Eastern Europe (Anonymous VPS Hosting Provider)',
      'Threat Feed Reputation': 'KNOWN MALICIOUS (Tagged in 23 ransomware C2 campaigns)',
      'Initiating Process': 'powershell.exe (attempted socket connection)',
      'Action Taken': 'DROP / DENY (Blocked by egress security policy)',
      'Packets Transferred': '0 Bytes (Handshake blocked by perimeter rule)',
    },
    insight: 'Rajesh: “The attacker wanted PowerShell to connect back to their server (198.51.100.84) to download ransomware. But our border guard (Firewall) looked at the destination, saw it was on a black-list, and blocked it!”',
  },
  case: {
    id: 'case',
    name: 'Case Management',
    analogy: 'Like a doctor’s clinical notebook where we write our diagnosis and handover notes for the next shift.',
    status: 'OPEN TICKET',
    badge: 'Investigation In-Progress',
    description: 'Centralised workflow platform where analysts log extracted entities, document hypotheses, preserve evidence hashes, and track SLA response deadlines.',
    consoleHeader: 'FINCORP JIRA SERVICE DESK // INCIDENT CASE #SEC-2026-0412',
    realWorldTools: [
      'ServiceNow Security Operations (SecOps)',
      'Jira Service Management',
      'Splunk SOAR (formerly Phantom)',
    ],
    otherToolsMentioned: 'Also widely used in enterprises: Palo Alto Cortex XSOAR, Swimlane, TheHive (Open Source), IBM Resilient.',
    records: {
      'Case Title': 'Case #SEC-2026-0412: Spear Phishing Macro Execution on FIN-BOS-MCHEN-047',
      'Assigned Analyst': 'You (L1 Trainee) & Rajesh Kumar (L1 Mentor)',
      'Current Status': 'Open — Triage & Verification Phase',
      'SLA Timer': '15 Minutes Target (10m 15s remaining)',
      'Recommended Action 1': 'Reset Active Directory password for user mchen',
      'Recommended Action 2': 'Block sender domain accounts-verification@trusted-vendor.com',
      'Recommended Action 3': 'Escalate to Priya Sharma (L2) for host forensic verification',
    },
    insight: 'Rajesh: “This is our investigation notebook. Everything you found is written here. When Priya takes over, she does not start from zero; she continues from your notes.”',
  },
};

export const CHAPTER_3_TECH_QUESTIONS: TechConsoleQuestion[] = [
  {
    id: 'tq-1',
    scenarioText: 'You want to know if the PowerShell script actually executed commands and accessed files, or if it was blocked before doing damage.',
    question: 'Which tool do you check to inspect process execution behavior on Michael’s laptop?',
    options: [
      { id: 'Email Gateway', text: 'Email Gateway — Inspects incoming email messages' },
      { id: 'EDR', text: 'EDR Console — CCTV camera recording program behavior on the computer' },
      { id: 'SIEM', text: 'SIEM Console — Aggregates cross-system alerts' },
      { id: 'Firewall', text: 'Firewall Console — Inspects network cables and border traffic' },
      { id: 'Case Management', text: 'Case Management — Our team investigation notebook' },
    ],
    correctTool: 'EDR',
    correctFeedback: '“Yes, exactly! EDR is the CCTV camera on the computer. It shows you the parent process (Word), the child process (PowerShell), and whether the sensor terminated it. For computer program behavior, EDR is always your answer!”',
    incorrectFeedback: '“Not quite, yaar. Email Gateway only sees emails, and the Firewall only sees network packets. To see what programs are running on Michael’s computer, you look at EDR!”',
  },
  {
    id: 'tq-2',
    scenarioText: 'You want to know: Did the attacker’s fake invoice email reach any other employees in Finance besides Michael Chen?',
    question: 'Which tool do you query to see who else received messages from accounts-verification@trusted-vendor.com?',
    options: [
      { id: 'Email Gateway', text: 'Email Gateway — Mail inspector checking all incoming company emails' },
      { id: 'EDR', text: 'EDR Console — Monitors programs on laptops' },
      { id: 'SIEM', text: 'SIEM Console — Tracks pattern rules' },
      { id: 'Firewall', text: 'Firewall Console — Tracks network IP connections' },
      { id: 'Case Management', text: 'Case Management — Records our notes' },
    ],
    correctTool: 'Email Gateway',
    correctFeedback: '“Spot on! The Email Gateway is the mail inspector. You query: ‘Show me all emails from accounts-verification@trusted-vendor.com across all employees in the last 7 days.’ It tells you immediately who received it!”',
    incorrectFeedback: '“No, think about where emails arrive first. EDR watches laptop processes; Firewall watches IP packets. The Email Gateway is the tool that inspects all incoming emails!”',
  },
  {
    id: 'tq-3',
    scenarioText: 'You want to know: Is the attacker’s external server at 198.51.100.84 dangerous? Has it attempted to contact other FinCorp computers in the past 90 days?',
    question: 'Which tool do you search to find enterprise-wide historical patterns across all systems?',
    options: [
      { id: 'Email Gateway', text: 'Email Gateway' },
      { id: 'EDR', text: 'EDR Console' },
      { id: 'SIEM', text: 'SIEM Console — Central brain connecting historical records from all tools' },
      { id: 'Firewall', text: 'Firewall Console' },
      { id: 'Case Management', text: 'Case Management' },
    ],
    correctTool: 'SIEM',
    correctFeedback: '“Correct! The SIEM is our central brain. You run a search: ‘198.51.100.84 over the last 90 days across all firewalls, proxy servers, and endpoints.’ SIEM scans all logs and gives you the big enterprise picture.”',
    incorrectFeedback: '“Remember, an individual firewall only sees its own network interface. SIEM aggregates logs from all firewalls, endpoints, and servers over months to find historical patterns.”',
  },
  {
    id: 'tq-4',
    scenarioText: 'You want to know: Did Michael’s computer attempt to send network traffic or download more malware from the internet?',
    question: 'Which tool do you check to verify whether outbound network packets were permitted or blocked?',
    options: [
      { id: 'Email Gateway', text: 'Email Gateway' },
      { id: 'EDR', text: 'EDR Console' },
      { id: 'SIEM', text: 'SIEM Console' },
      { id: 'Firewall', text: 'Firewall Console — Border guard checking outbound and inbound internet traffic' },
      { id: 'Case Management', text: 'Case Management' },
    ],
    correctTool: 'Firewall',
    correctFeedback: '“Yes, very good! The Firewall is the airport border guard. It inspects every packet trying to leave FinCorp. It proves whether Michael’s computer successfully communicated with 198.51.100.84 or if it was blocked.”',
    incorrectFeedback: '“Think about network traffic leaving the building. EDR tracks the local process, but the Firewall is the security guard controlling internet connections!”',
  },
  {
    id: 'tq-5',
    scenarioText: 'You have finished your investigation findings and want to pass them to Priya Sharma (L2) so she knows what you discovered and what containment steps are needed.',
    question: 'Which tool do you use to record your findings and formally transfer the ticket?',
    options: [
      { id: 'Email Gateway', text: 'Email Gateway' },
      { id: 'EDR', text: 'EDR Console' },
      { id: 'SIEM', text: 'SIEM Console' },
      { id: 'Firewall', text: 'Firewall Console' },
      { id: 'Case Management', text: 'Case Management — Our shared investigation notebook' },
    ],
    correctTool: 'Case Management',
    correctFeedback: '“Exactly! Case Management is our notebook. You write: ‘Here is what I found. EDR blocked it, fake email verified, recommend password reset.’ Priya reads your notes and continues the work without starting over.”',
    incorrectFeedback: '“Security tools like SIEM and EDR give you telemetry, but your written audit notes, evidence attachments, and handoff tickets live in Case Management!”',
  },
];

export const CHAPTER_4_DATA_FLOW_STEPS: DataFlowStep[] = [
  {
    stepNumber: 1,
    stageName: 'Host Execution',
    title: '1. Real-World Employee Activity',
    timeWindow: '09:19:15 AM',
    whatHappens: 'Michael Chen double-clicks Q4_Invoice_Summary.docm on his laptop. Microsoft Word starts, loads the macro into memory, and executes hidden instructions. The macro instructs the operating system to launch PowerShell: powershell.exe -enc AQBB...',
    whatIsRecorded: 'Michael’s local Windows computer records process creation events, memory allocations, and file access. At this exact second, this data exists ONLY on Michael’s laptop.',
    rajeshExplanation: '“The activity happened, but it is silent. Nobody outside Michael’s laptop knows about it yet. That changes in the next second.”',
    tokenLabel: '1. User Click',
  },
  {
    stepNumber: 2,
    stageName: 'OS & Sensor Capture',
    title: '2. Security Cameras Record the Activity',
    timeWindow: '09:19:58 AM',
    whatHappens: 'Three separate security cameras observe and record: (1) EDR sensor records Word launching PowerShell, (2) Email Gateway already recorded the fake email delivery at 09:18, (3) Firewall detects PowerShell trying to connect to 198.51.100.84.',
    whatIsRecorded: 'Raw, timestamped logs inside each local tool’s database. EDR logs: PID 4812 -> PID 9024. Email log: sender domain spoofed. Firewall log: outbound port 443 blocked.',
    rajeshExplanation: '“Now all three cameras have recorded the event in their local memory. But they have not spoken to each other yet. They are like three guards in different rooms.”',
    tokenLabel: '2. Local Sensor Record',
  },
  {
    stepNumber: 3,
    stageName: 'Log Forwarding',
    title: '3. Encrypted Log Transmission to the Control Room',
    timeWindow: '09:19:59 AM',
    whatHappens: 'Log forwarders (automated courier software) compress and encrypt the logs using TLS, streaming them across the internal network to the central SIEM indexers.',
    whatIsRecorded: 'Network transit packets carrying JSON telemetry from Michael’s laptop, the email gateway, and the firewall to the SIEM receiving port.',
    rajeshExplanation: '“Each guard sends their video tape to the central hospital control room. It takes less than two seconds over the network.”',
    tokenLabel: '3. Encrypted Stream',
  },
  {
    stepNumber: 4,
    stageName: 'SIEM Parsing & Normalisation',
    title: '4. Translating Logs into One Universal Language',
    timeWindow: '09:20:00 AM',
    whatHappens: 'The SIEM receives raw data in different languages (Windows logs, Email headers, Firewall packets). It parses and translates them into a Common Information Model (CIM): User = mchen, Host = FIN-BOS-MCHEN-047, Action = Blocked.',
    whatIsRecorded: 'Standardised, indexed database entries where fields match across different manufacturers’ tools.',
    rajeshExplanation: '“The control room translates all reports into one common language so an email log and an endpoint log can be compared side-by-side.”',
    tokenLabel: '4. Standardised CIM',
  },
  {
    stepNumber: 5,
    stageName: 'Rule Evaluation',
    title: '5. Connecting the Dots (Correlation Rule Matches)',
    timeWindow: '09:20:01 AM',
    whatHappens: 'The SIEM evaluates real-time rules: IF an email with a suspicious macro arrives AND Word launches PowerShell within 60 seconds AND PowerShell connects outbound -> TRIGGER HIGH-PRIORITY ALERT.',
    whatIsRecorded: 'A correlated alert object linking Email Event + EDR Event + Firewall Event with a risk score of 85.',
    rajeshExplanation: '“The SIEM does not just say ‘one weird email.’ It says: ‘Fake email + Word macro + PowerShell + blocked connection = ACTIVE ATTACK!’ The puzzle is complete.”',
    tokenLabel: '5. Rule Triggered',
  },
  {
    stepNumber: 6,
    stageName: 'Analyst Triage Queue',
    title: '6. The Alert Lands on Your Screen',
    timeWindow: '09:20:02 AM',
    whatHappens: 'Alert SEC-2026-0412 appears in your triage queue with all evidence attached. The entire journey from Michael’s double-click to your screen took only 47 seconds.',
    whatIsRecorded: 'An unassigned alert in the SOC queue waiting for you (L1) to claim, investigate, document, and escalate.',
    rajeshExplanation: '“Now the alert is waiting for you, yaar. You are seeing the entire journey. You understand this is not magic; it is an evidence pipeline you can trust.”',
    tokenLabel: '6. Alert in L1 Queue',
  },
];

export const CHAPTER_4_VOCAB_CARDS: VocabCard[] = [
  {
    id: 1,
    title: 'Activity vs Event',
    termA: 'Activity (Real World)',
    defA: 'Something actually happening in the real world: Michael clicks an email, Word opens, PowerShell runs.',
    termB: 'Event (Digital Record)',
    defB: 'A computer or sensor recording that activity: “At 09:19:58 AM, powershell.exe was launched by WINWORD.EXE.”',
    analogy: 'Activity is a person walking through a doorway. An Event is the security camera recording that person walking through.',
  },
  {
    id: 2,
    title: 'Event vs Alert',
    termA: 'Event (Single Piece)',
    defA: 'One isolated data record: “Email received from external sender” or “User logged in at 9:00 AM.”',
    termB: 'Alert (Suspicious Pattern)',
    defB: 'Multiple events combined that match a dangerous pattern: “Fake email + Macro executed + PowerShell spawned.”',
    analogy: 'An Event is one single puzzle piece. An Alert is the completed puzzle showing a clear picture of danger.',
  },
  {
    id: 3,
    title: 'Alert vs Case',
    termA: 'Alert (Automated Ping)',
    defA: 'A notification sent by the SIEM software rule: “SEC-2026-0412: Office-to-PowerShell Execution Pattern.”',
    termB: 'Case (Human Investigation)',
    defB: 'An official investigation notebook opened by a human analyst to gather evidence, document findings, and take action.',
    analogy: 'An Alert is the police dispatcher calling: “Alarm ringing at the bank!” A Case is the detective opening a notebook to investigate.',
  },
  {
    id: 4,
    title: 'Case vs Incident',
    termA: 'Case (Analyst Record)',
    defA: 'Your investigation file: notes, screenshots, hypothesis, and initial triage disposition.',
    termB: 'Incident (Confirmed Threat)',
    defB: 'A confirmed, active security threat requiring coordinated containment, recovery, and management reporting.',
    analogy: 'A Case is a detective’s notebook. An Incident is the official crime report registered at police headquarters.',
  },
  {
    id: 5,
    title: 'Incident vs Breach',
    termA: 'Incident (Threat Under Management)',
    defA: 'Malware attacked Michael’s laptop, but our team caught it and contained it. The threat is being handled.',
    termB: 'Breach (Actual Damage Done)',
    defB: 'Attackers successfully accessed, stole, or leaked confidential customer payment data or company secrets.',
    analogy: 'An Incident is a fire in the kitchen that the firefighters are putting out. A Breach is when the fire burns down the house and destroys the valuables.',
  },
  {
    id: 6,
    title: 'Breach vs Disclosure',
    termA: 'Breach (Internal Reality)',
    defA: 'Data was compromised internally: “Our database was copied by attackers.”',
    termB: 'Disclosure (Public Notification)',
    defB: 'Formally informing affected customers, law enforcement, and government regulators as required by legal compliance.',
    analogy: 'A Breach is getting into a car accident. Disclosure is calling the police, insurance company, and affected parties to report it.',
  },
];

export const DEMO_SIMULATION_STAGES: DemoStage[] = [
  {
    stage: 1,
    title: '1. Employee Activity',
    timestamp: '09:18:47 AM',
    visualSummary: 'Michael Chen opens Outlook in the Boston office. A spear-phishing email with subject "Invoice Q4 2025" arrives from a spoofed domain.',
    rajeshDialogue: '“Michael is a finance analyst expecting Q4 vendor bills. He sees an invoice email, thinks it is urgent, and double-clicks the attachment. He does not realise the sender is fake.”',
    inspectorTitle: 'Inbound Email Telemetry',
    inspectorDetails: {
      'Sender': 'accounts-verification@trusted-vendor.com (Spoofed)',
      'Real Domain': 'accounts@trusted-vendor.com',
      'Recipient': 'mchen@fincorp.local',
      'Attachment': 'Q4_Invoice_Summary.docm (247 KB)',
      'Subject': 'Invoice Q4 2025 — Action Required',
    },
  },
  {
    stage: 2,
    title: '2. Security Tools Observe',
    timestamp: '09:19:15 AM - 09:19:58 AM',
    visualSummary: 'Word opens the file and executes a hidden macro. Word spawns PowerShell. EDR detects the abnormal execution and immediately terminates the process.',
    rajeshDialogue: '“Three cameras are watching: Email Gateway flags the attachment, EDR sees Word launching PowerShell, and EDR kills the PowerShell in 1.1 seconds. Protection works!”',
    inspectorTitle: 'Host Process Sensor',
    inspectorDetails: {
      'Parent Process': 'WINWORD.EXE (PID: 4812)',
      'Child Process': 'powershell.exe -enc AQBB... (PID: 9024)',
      'Sensor Action': 'TERMINATED_PRE_EXECUTION',
      'Integrity Impact': 'Zero payload executed on disk',
    },
  },
  {
    stage: 3,
    title: '3. SIEM Correlation',
    timestamp: '09:20:00 AM',
    visualSummary: 'Logs from Email Gateway, EDR, and Perimeter Firewall flow into the central SIEM. SIEM matches the Office-to-PowerShell attack pattern rule.',
    rajeshDialogue: '“Look at the glowing particles moving to the SIEM, yaar. Email event + EDR event + Firewall block event. The SIEM connects them and fires Alert SEC-2026-0412.”',
    inspectorTitle: 'Correlated SIEM Alert',
    inspectorDetails: {
      'Alert ID': 'SEC-2026-0412',
      'Correlated Sources': 'Email Gateway + EDR Sensor + Firewall',
      'Severity': 'MEDIUM-HIGH',
      'Confidence': 'HIGH (Multi-sensor corroboration)',
    },
  },
  {
    stage: 4,
    title: '4. L1 Triage & Investigation',
    timestamp: '09:20:02 AM - 09:24:00 AM',
    visualSummary: 'The alert arrives in your triage queue. You and Rajesh claim it, extract the 5 critical anchors, verify EDR termination, and open Case #SEC-2026-0412.',
    rajeshDialogue: '“This is your moment at the desk! You extract the who, what, and when. You corroborate the proof. You recommend Michael’s password reset and route to Priya.”',
    inspectorTitle: 'L1 Case Documentation',
    inspectorDetails: {
      'Investigator': 'You (L1 Trainee) & Rajesh Kumar (Mentor)',
      'Disposition': 'Confirmed True Positive Attempt (Blocked)',
      'Recommended Action': 'AD Password Reset & Domain Block',
      'Handoff Destination': 'Priya Sharma (L2 Incident Response)',
    },
  },
  {
    stage: 5,
    title: '5. L2 Containment & Response',
    timestamp: '09:25:00 AM',
    visualSummary: 'Priya Sharma (L2) reviews your case notes. She executes a password reset in Active Directory and orders the email domain blocked at the perimeter gateway.',
    rajeshDialogue: '“Priya is reading your case record. She says: ‘Excellent notes, Analyst.’ She does not waste a minute. She resets Michael’s password and blocks the fake sender domain.”',
    inspectorTitle: 'L2 Incident Response Actions',
    inspectorDetails: {
      'Responder': 'Priya Sharma (L2 Incident Response)',
      'Active Directory': 'mchen password reset enforced',
      'Perimeter Gateway': 'accounts-verification@trusted-vendor.com blacklisted',
      'Handoff': 'Escalated to Aditya Deshmukh (L3) for fleet sweep',
    },
  },
  {
    stage: 6,
    title: '6. L3 Fleet-Wide Threat Hunt',
    timestamp: '09:27:00 AM',
    visualSummary: 'Aditya Deshmukh (L3) launches an automated query across all 500 FinCorp endpoints. He discovers 47 other employees received the same email attachment.',
    rajeshDialogue: '“Aditya is the detective hunter. He does not check one PC; he checks all 500! He finds 47 other computers received this email. Three of them are banking servers. This is big!”',
    inspectorTitle: 'L3 Threat Hunt Scope',
    inspectorDetails: {
      'Hunter': 'Aditya Deshmukh (L3 Lead Threat Hunter)',
      'Scanned Fleet': '500 Enterprise Workstations & Servers',
      'Infected/Targeted Hosts': '47 Computers Identified',
      'High-Risk Systems': '3 Commercial Banking Core Servers',
      'Escalation Level': 'Enterprise Campaign -> Elena Gomez (Manager)',
    },
  },
  {
    stage: 7,
    title: '7. Manager Business Coordination',
    timestamp: '09:30:00 AM',
    visualSummary: 'Elena Gomez (SOC Manager) briefs CEO Dr. Amrita Singh and IT Director Vikram Patel. Legal and PR teams are assembled to handle customer notifications.',
    rajeshDialogue: '“Elena takes the briefing to executive leadership. Technical investigation transforms into business risk management. Because you did your L1 job well, the entire company is protected.”',
    inspectorTitle: 'Executive Governance Actions',
    inspectorDetails: {
      'Incident Commander': 'Elena Gomez (SOC Operations Manager)',
      'Executive Briefed': 'Dr. Amrita Singh (CEO) & Vikram Patel (IT Director)',
      'Regulatory Notice': 'GDPR & Financial Regulator notifications initiated',
      'Legal Status': 'Customer data preservation order active',
    },
  },
];

export const HANDOVER_TIMELINE_EVENTS: HandoverTimelineEvent[] = [
  {
    id: 'evt-1',
    text: 'Email Gateway flags inbound email from fake sender domain with macro attachment',
    correctOrder: 1,
    timestamp: '09:18:47 AM',
  },
  {
    id: 'evt-2',
    text: 'Michael Chen double-clicks Q4_Invoice_Summary.docm on FIN-BOS-MCHEN-047',
    correctOrder: 2,
    timestamp: '09:19:15 AM',
  },
  {
    id: 'evt-3',
    text: 'Word launches PowerShell, but EDR sensor terminates the process in 1.1 seconds',
    correctOrder: 3,
    timestamp: '09:19:58 AM',
  },
  {
    id: 'evt-4',
    text: 'Perimeter Firewall blocks outbound connection attempt to external IP 198.51.100.84',
    correctOrder: 4,
    timestamp: '09:19:59 AM',
  },
  {
    id: 'evt-5',
    text: 'SIEM correlates Email + EDR + Firewall events and generates Alert SEC-2026-0412',
    correctOrder: 5,
    timestamp: '09:20:00 AM',
  },
  {
    id: 'evt-6',
    text: 'Alert SEC-2026-0412 lands in your L1 queue; you claim it and extract the 5 facts',
    correctOrder: 6,
    timestamp: '09:20:02 AM',
  },
  {
    id: 'evt-7',
    text: 'You document findings in Case #SEC-2026-0412 and route to Priya Sharma (L2)',
    correctOrder: 7,
    timestamp: '09:24:00 AM',
  },
];
