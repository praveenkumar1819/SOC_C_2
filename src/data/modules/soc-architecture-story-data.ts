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
    situation: 'Michael’s account is locked. He cannot log back in to finish his quarterly financial reports. You want to unlock it so he can work again.',
    question: 'Who decides if Michael’s account should be safely unlocked?',
    options: [
      { id: 'L1', text: 'You (L1) — Unlock it immediately so Michael can work' },
      { id: 'L2', text: 'Priya Sharma (L2) — Check if unlocking is safe first' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Search if attacker is using account elsewhere' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Approve the business decision' },
    ],
    correctRole: 'L2',
    explanationCorrect: '“Yes, exactly! You are thinking: ‘The employee needs to work, so unlock the account.’ But wait. If an attacker is having Michael’s password, unlocking the account is giving the attacker access back. Priya (L2) is the expert. She is checking: Is the attack still active? Is Michael’s password broken? Only after Priya is saying ‘Safe,’ the account is unlocked. You are understanding the risk?”',
    explanationIncorrect: '“No, think again, yaar! If you unlock the account immediately and the attacker has Michael’s password, you just gave the hacker open access back into FinCorp. Priya (L2) is the incident responder who investigates whether containment is complete before unlocking.”',
  },
  {
    id: 'sc-2',
    situation: 'You realise the malicious file came from an email sent from “accounts-verification@trusted-vendor.com”. Rajesh warns you: “This is a fake email address! The real vendor is accounts@trusted-vendor.com.” Many employees in FinCorp may have received this same fake email.',
    question: 'Who is responsible for finding all the employees across the company who clicked this email?',
    options: [
      { id: 'L1', text: 'You (L1) — Check your friend’s computer manually' },
      { id: 'L2', text: 'Priya Sharma (L2) — Check the email logs for this one sender' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Search ALL 500 computers for the malicious file' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Send a company-wide email warning' },
    ],
    correctRole: 'L3',
    explanationCorrect: '“Spot on! This is no longer just one alert on Michael’s desk. This is a wide campaign. Aditya (L3) is the threat hunter. He is searching across all 500 computers: ‘How many computers are infected? How many people clicked the fake email? Did the attacker access any databases?’ You are seeing? This is bigger than Priya’s single-host containment job now.”',
    explanationIncorrect: '“Think about the scale, yaar. L1 and L2 focus on the immediate workstation and alert. But searching all 500 computers across all departments requires proactive threat hunting. That is Aditya’s (L3) specialised job!”',
  },
  {
    id: 'sc-3',
    situation: 'Aditya found 47 computers with the same malicious file. He found that 3 of them are core banking systems used by the Finance team. Customer payment data might be compromised.',
    question: 'Who informs the CEO (Dr. Amrita Singh) and customers that data might be compromised?',
    options: [
      { id: 'L1', text: 'You (L1) — Post a warning message in Slack to all employees' },
      { id: 'L2', text: 'Priya Sharma (L2) — Send an email directly to affected customers' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Include it in a written forensic report' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Coordinate with CEO, Legal, and PR teams' },
    ],
    correctRole: 'Manager',
    explanationCorrect: '“Very well done! This is very serious, yaar. Customers’ money and personal details might be at risk. The company has legal regulations. Elena is our SOC Manager. She is understanding the business impact. She coordinates with CEO Dr. Amrita Singh, corporate lawyers, and PR teams. Your job ends; Elena’s management job starts.”',
    explanationIncorrect: '“Arre, no! Technical analysts (L1, L2, L3) do not contact the CEO or email customers directly. Elena Gomez, as SOC Operations Manager, leads executive communication, regulatory reporting, and legal coordination.”',
  },
  {
    id: 'sc-4',
    situation: 'The malicious file is identified from a known hacking group called Lazarus. Aditya recognises the file signature and style. This attack is connected to attacks on 10 other financial institutions.',
    question: 'Who is hunting for more connections to Lazarus and sharing threat intelligence with authorities?',
    options: [
      { id: 'L1', text: 'You (L1) — Check if Lazarus attacked your friend’s company' },
      { id: 'L2', text: 'Priya Sharma (L2) — Build local firewall defences to block Lazarus' },
      { id: 'L3', text: 'Aditya Deshmukh (L3) — Hunt for Lazarus patterns across FinCorp and share intel' },
      { id: 'Manager', text: 'Elena Gomez (Manager) — Ban Lazarus from the network' },
    ],
    correctRole: 'L3',
    explanationCorrect: '“Yes, exactly! Aditya is not just stopping one attack. Aditya is understanding: ‘Who is this attacker? What are they doing? Where else are they attacking? Are they using the same trick on other banks?’ He writes intelligence reports, shares with government agencies, and hunts stealth indicators. This is pure L3 work.”',
    explanationIncorrect: '“Not quite. Threat actor profiling, adversary tracking, and advanced malware signature mapping are the responsibilities of our L3 Threat Hunter, Aditya Deshmukh.”',
  },
];

export const CHAPTER_2_PROCESS_STAGES: ProcessStageAction[] = [
  {
    order: 1,
    stageName: 'Receive & Claim',
    tagline: 'The alert lands on your desk',
    timestamp: '09:20:02 AM',
    whatYouSee: 'Alert SEC-2026-0412 appears in your SOC queue, red and pulsing. Priority: Medium-High. Affected User: mchen@fincorp.local. Computer: FIN-BOS-MCHEN-047. Rule: Office-to-PowerShell Execution Pattern.',
    whatYouThink: '“Okay. A Microsoft Office program is opening PowerShell. This is not normal, yaar. Office is for documents. PowerShell is for system commands. Either Michael is running a legitimate work script, or an attacker is hiding malicious code. I am claiming it now. This alert is mine.”',
    whatYouDo: 'You click “Accept Alert”. The ticket is assigned to your name. Your 15-minute investigation SLA timer begins. Rajesh is sitting next to you, observing your triage.',
    whyItMatters: '“When you claim an alert, you say: ‘I am looking at this. You can trust me to investigate.’ If you do not claim it, it sits idle burning response time. Claiming is a commitment to the team.”',
  },
  {
    order: 2,
    stageName: 'Extract & Enrich',
    tagline: 'You gather the core factual skeleton',
    timestamp: '09:20:45 AM',
    whatYouSee: 'Full alert metadata: Parent Process = WINWORD.EXE (Microsoft Word). Child Process = powershell.exe -enc AQBB... (encoded hidden command). Computer = FIN-BOS-MCHEN-047. User = Michael Chen (Senior Finance Analyst). Status = Terminated by EDR.',
    whatYouThink: '“Michael opened a Word file. Instantly PowerShell ran with an encoded (secret) command. EDR stopped it. Michael is a finance analyst, not a software engineer or IT administrator. Why would Word run PowerShell? I suspect spear-phishing with an infected macro file.”',
    whatYouDo: 'Extract the 5 critical anchors: WHO (mchen), WHAT (FIN-BOS-MCHEN-047), PARENT (Word), CHILD (PowerShell), WHEN (09:19:58 AM). Confirm them on your triage notepad.',
    whyItMatters: '“Extract means pulling out the raw facts. Enrich means understanding what they mean. If you skip this, you are jumping to false conclusions. Take two minutes to read; your entire investigation becomes ten times faster.”',
  },
  {
    order: 3,
    stageName: 'Corroborate Telemetry',
    tagline: '“Praman Lena” — Gathering proof across 3 security cameras',
    timestamp: '09:22:10 AM',
    whatYouSee: 'Email Gateway shows: Inbound email at 09:18:47 from accounts-verification@trusted-vendor.com (FAKE spoofed domain) with Q4_Invoice_Summary.docm. Host history shows: Downloaded at 09:19:02, double-clicked at 09:19:15, PowerShell fired at 09:19:58.',
    whatYouThink: '“Aha! Now I have proof. The fake email arrived at 09:18, Michael opened it at 09:19, Word triggered PowerShell, and EDR terminated it. All timestamps align like clockwork. This is NOT a glitch; this is an active spear-phishing attack.”',
    whatYouDo: 'Cross-check three independent sources: (1) Email Gateway log, (2) EDR process sensor, (3) Perimeter Firewall log. Confirm all three point to the same malicious attack chain.',
    whyItMatters: '“In Hindi, we say ‘Praman lena’ — gathering solid proof. One tool can glitch or trigger a false alarm. But three cameras confirming the exact same sequence? That is irrefutable proof. This is how senior analysts think.”',
  },
  {
    order: 4,
    stageName: 'Contain & Mitigate',
    tagline: 'Stopping the threat before it spreads',
    timestamp: '09:24:30 AM',
    whatYouSee: 'EDR confirmed the PowerShell process was terminated. But Michael’s account credentials may have been stolen before the block. The fake invoice email may still sit in other finance employees’ inboxes.',
    whatYouThink: '“The immediate fire is out on Michael’s computer. But what about Michael’s password? What if the attacker tries to log in to the banking portal? We must reset his password immediately, block the sender domain, and request Aditya to hunt other systems.”',
    whatYouDo: 'Recommend immediate password reset for Michael Chen, block accounts-verification@trusted-vendor.com at the perimeter email gateway, and prepare handoff to Priya Sharma (L2).',
    whyItMatters: '“Containment is stopping the virus from spreading to other hospital patients. You reset the password, block the bad domain, and scan surrounding computers. That is true defence.”',
  },
  {
    order: 5,
    stageName: 'Document & Escalate',
    tagline: 'Writing the case record so nothing is lost',
    timestamp: '09:26:00 AM',
    whatYouSee: 'Case Record #SEC-2026-0412 form in the Case Management system with summary, evidence attachments, priority rating (Medium-High), and assigned analyst field.',
    whatYouThink: '“If it is not written down, it did not happen, yaar! Priya Sharma (L2) needs clean facts, clear timestamps, and our recommended actions so she can act in seconds without re-asking questions.”',
    whatYouDo: 'Fill in the case record: 1-sentence summary, affected user (mchen), status (EDR blocked), attached evidence logs, and route the ticket to Priya Sharma (L2).',
    whyItMatters: '“In a hospital, when one doctor hands over a patient to the next doctor, they write clinical notes. In our SOC, your documentation is that handover note. It ensures seamless operational continuity.”',
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
    text: '1. Email Gateway flags inbound email from fake sender domain with macro attachment',
    correctOrder: 1,
    timestamp: '09:18:47 AM',
  },
  {
    id: 'evt-2',
    text: '2. Michael Chen double-clicks Q4_Invoice_Summary.docm on FIN-BOS-MCHEN-047',
    correctOrder: 2,
    timestamp: '09:19:15 AM',
  },
  {
    id: 'evt-3',
    text: '3. Word launches PowerShell, but EDR sensor terminates the process in 1.1 seconds',
    correctOrder: 3,
    timestamp: '09:19:58 AM',
  },
  {
    id: 'evt-4',
    text: '4. Perimeter Firewall blocks outbound connection attempt to external IP 198.51.100.84',
    correctOrder: 4,
    timestamp: '09:19:59 AM',
  },
  {
    id: 'evt-5',
    text: '5. SIEM correlates Email + EDR + Firewall events and generates Alert SEC-2026-0412',
    correctOrder: 5,
    timestamp: '09:20:00 AM',
  },
  {
    id: 'evt-6',
    text: '6. Alert SEC-2026-0412 lands in your L1 queue; you claim it and extract the 5 facts',
    correctOrder: 6,
    timestamp: '09:20:02 AM',
  },
  {
    id: 'evt-7',
    text: '7. You document findings in Case #SEC-2026-0412 and route to Priya Sharma (L2)',
    correctOrder: 7,
    timestamp: '09:24:00 AM',
  },
];
