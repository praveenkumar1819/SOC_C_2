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
// MODULE 03 NODE COLLECTIONS (18 Dedicated Collections for Cybersecurity Fundamentals)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. M03-U1-C1 Pillar 1: Asset Classification & Crown Jewels
// -----------------------------------------------------------------------------
export const assetInventoryNodes: VisualNodeItem[] = [
  {
    id: 'asset-crown',
    label: 'Core Finance DB (FIN-DB-01)',
    sub: 'Crown Jewel Asset • PostgreSQL',
    badge: 'TIER 1: CRITICAL ASSET',
    description: 'The primary relational database holding employee salaries, bank routing numbers, and invoice ledgers.',
    details: 'Asset Valuation: Tier 1 (Maximum Business Impact). Confidentiality and Integrity are paramount. Direct loss causes regulatory fines under DPDP Act.',
    tags: ['Valuation: Critical ($$$$)', 'CIA Focus: Confidentiality & Integrity', 'Location: Core Server VLAN 10', 'Owner: Finance Dir'],
  },
  {
    id: 'asset-dc',
    label: 'Domain Controller (BLR-DC-01)',
    sub: 'Identity Backbone • Active Directory',
    badge: 'TIER 2: ENTERPRISE INFRA',
    description: 'Central Kerberos authentication and LDAP directory server validating credentials for all 450 branch accounts.',
    details: 'Asset Valuation: Tier 2. Integrity and Availability focus. If compromised, an adversary can forge Golden Tickets to impersonate any employee.',
    tags: ['Valuation: High ($$$)', 'CIA Focus: Integrity & Availability', 'Role: Identity Provider', 'Protocol: Kerberos / LDAP'],
  },
  {
    id: 'asset-endpoint',
    label: 'Workstation BLR-BR-WS-04',
    sub: 'Branch Finance Terminal • Windows 11',
    badge: 'TIER 3: ENDPOINT ASSET',
    description: 'Assigned finance clerk desktop running enterprise browser, spreadsheet software, and EDR behavioral sensor.',
    details: 'Asset Valuation: Tier 3. Endpoint triage boundary. Handled as the primary investigation target when phishing or credential alerts trigger.',
    tags: ['Valuation: Medium ($$)', 'User: FIN-OPS-01', 'Subnet: 10.10.20.15/24', 'Sensor: CrowdStrike EDR'],
  },
  {
    id: 'asset-kiosk',
    label: 'Branch Reception Kiosk',
    sub: 'Public Display Terminal • ChromeOS',
    badge: 'TIER 4: LOW SENSITIVITY',
    description: 'Walk-up visitor check-in kiosk located in the CDAC Bengaluru lobby on the isolated guest network.',
    details: 'Asset Valuation: Tier 4. Low impact. Contains no proprietary records. An intrusion here has zero blast radius into the core finance segment.',
    tags: ['Valuation: Low ($)', 'VLAN: Guest (50)', 'Data: Ephemeral Logs', 'Blast Radius: Zero'],
  },
];

// -----------------------------------------------------------------------------
// 2. M03-U1-C1 Pillar 2: Threat vs Vulnerability Intersection
// -----------------------------------------------------------------------------
export const threatVulnNodes: VisualNodeItem[] = [
  {
    id: 'tv-threat',
    label: 'Threat Actor (Ransomware Gang)',
    sub: 'External Motivated Adversary',
    badge: 'THREAT VECTOR',
    description: 'A financially motivated criminal syndicate actively scanning internet ranges for enterprise footholds.',
    details: 'Threats represent potential harm. A threat actor can probe enterprise perimeters continuously, but cannot inflict damage without a matching vulnerability.',
    tags: ['Actor: External Syndicate', 'Motive: Extortion', 'Capability: High', 'Vector: Automated Scanners'],
  },
  {
    id: 'tv-vuln',
    label: 'Unpatched Apache Flaw (CVE-2023)',
    sub: 'Vulnerability • Remote Code Exec',
    badge: 'VULNERABILITY WEAKNESS',
    description: 'Known security flaw in unpatched web service allowing unauthenticated remote command execution.',
    details: 'Vulnerabilities represent internal weaknesses. A vulnerability on an isolated network without active threat exposure creates low current risk until exposed.',
    tags: ['CVE-2023-38606', 'CVSS Score: 9.8 (Critical)', 'Component: Web Portal', 'Remediation: Patch v2.4.58'],
  },
  {
    id: 'tv-intersection',
    label: 'Active Exploitation (Risk Intersection)',
    sub: 'Threat Exploits Vulnerability',
    badge: 'ACTIVE RISK EVENT',
    description: 'The critical danger zone where the threat actor successfully leverages the software vulnerability to breach defenses.',
    details: 'Ananya\'s Rule: Risk = Threat x Vulnerability x Impact. Patching the vulnerability neutralizes the risk even if the threat actor continues probing.',
    tags: ['State: Active Compromise', 'Incident Level: SEV-1', 'Action: Emergency Patch', 'Mitigation: WAF Rule'],
  },
  {
    id: 'tv-shield',
    label: 'Patch Management & Hardening',
    sub: 'Vulnerability Elimination',
    badge: 'DEFENSIVE COUNTERMEASURE',
    description: 'Regular security patching, configuration baselines, and vulnerability scanner audits.',
    details: 'When systems are patched within 72 hours of CVE disclosure, the attacker\'s exploit attempt fails harmlessly at the perimeter.',
    tags: ['SLA: 72h Critical Patch', 'Scanner: Tenable Nessus', 'Hardening: CIS Benchmarks', 'Defense: Up to Date'],
  },
];

// -----------------------------------------------------------------------------
// 3. M03-U1-C1 Pillar 3: The Person vs The Credential
// -----------------------------------------------------------------------------
export const personVsCredentialNodes: VisualNodeItem[] = [
  {
    id: 'ent-person',
    label: 'The Human Person (Ramesh)',
    sub: 'Finance Staff Employee',
    badge: 'PHYSICAL INDIVIDUAL',
    description: 'Human employee employed at CDAC Bengaluru branch office. Working schedule: Mon-Fri 09:00 - 18:00 IST.',
    details: 'Physical presence can only be confirmed via building RFID access badges, security camera CCTV, or live in-person witness verification.',
    tags: ['Entity: Real Human', 'Badge ID: CDAC-BLR-8821', 'Schedule: Day Shift', 'Physical Location: Home (Asleep)'],
  },
  {
    id: 'ent-credential',
    label: 'Account Credential (FIN-OPS-01)',
    sub: 'cdac\\FIN-OPS-01 • Active Directory',
    badge: 'DIGITAL IDENTITY TOKEN',
    description: 'The username, password, and Kerberos Ticket Granting Ticket (TGT) granting access to finance workstation services.',
    details: 'Ananya\'s Forensic Doctrine: An account is a credential token, not proof of a human person. Credentials can be compromised, phished, or shared.',
    tags: ['Format: Domain Account', 'Privilege: Standard User', 'SID: S-1-5-21-...-1002', 'Status: Compromised'],
  },
  {
    id: 'ent-device',
    label: 'Workstation BLR-BR-WS-04',
    sub: 'Host Executing Observed Commands',
    badge: 'EXECUTION ENVIRONMENT',
    description: 'Physical computer terminal where terminal commands and network connections originated at 02:45 AM IST.',
    details: 'Triage Rule: Always document observations as "Activity observed under account FIN-OPS-01 on host BLR-BR-WS-04", never "Ramesh attacked the network".',
    tags: ['Host: BLR-BR-WS-04', 'IP: 10.10.20.15', 'Time: 02:45:00 IST', 'Event ID: 4624 (Logon)'],
  },
  {
    id: 'ent-forensic',
    label: 'Forensic Restraint Standard',
    sub: 'Objective Evidence Documentation',
    badge: 'ANALYST CODE OF CONDUCT',
    description: 'Disciplined documentation standard requiring verifiable technical facts rather than accusatory personal assumptions.',
    details: 'Protecting employees from false accusations while ensuring evidence stands up in professional internal incident reviews.',
    tags: ['Standard: ISO/IEC 27037', 'Principle: Objectivity', 'Requirement: Observable Facts', 'Disposition: Preserved Evidence'],
  },
];

// -----------------------------------------------------------------------------
// 4. M03-U1-C2 Pillar 1: The CIA Triad Dynamic Balance
// -----------------------------------------------------------------------------
export const ciaTriadNodes: VisualNodeItem[] = [
  {
    id: 'cia-conf',
    label: 'Confidentiality (Privacy)',
    sub: 'Preventing Unauthorized Disclosure',
    badge: 'CIA PILLAR 1',
    description: 'Ensuring sensitive records (salaries, employee PAN cards, proprietary reports) are viewed only by authorized personnel.',
    details: 'Breach Example: Malware exfiltrating 500 MB of financial spreadsheets to an external pastebin or Mega.nz cloud bucket.',
    tags: ['Goal: Secrecy & Privacy', 'Threat: Exfiltration / Snooping', 'Defense: AES-256 Encryption & RBAC', 'Standard: ISO 27001 A.8.24'],
  },
  {
    id: 'cia-integ',
    label: 'Integrity (Trustworthiness)',
    sub: 'Guarding Data Authenticity & Accuracy',
    badge: 'CIA PILLAR 2',
    description: 'Guaranteeing data has not been modified, forged, deleted, or tampered with in transit or storage.',
    details: 'Breach Example: Insider or attacker silently altering the vendor payment routing number in the database invoice table.',
    tags: ['Goal: Data Accuracy', 'Threat: Tampering / Forgery', 'Defense: SHA-256 Hashes & Digital Signatures', 'Detection: File Integrity Monitoring (FIM)'],
  },
  {
    id: 'cia-avail',
    label: 'Availability (Accessibility)',
    sub: 'Ensuring Timely System Access',
    badge: 'CIA PILLAR 3',
    description: 'Ensuring branch finance services and invoice generation tools are operational whenever required by staff.',
    details: 'Breach Example: Distributed Denial of Service (DDoS) flood or ransomware file encryption rendering the payroll server inaccessible.',
    tags: ['Goal: Uptime & Continuity', 'Threat: DDoS & Ransomware', 'Defense: Redundancy, Failover & Backups', 'Metric: 99.99% SLA Uptime'],
  },
  {
    id: 'cia-balance',
    label: 'Triad Trade-Off Triangulation',
    sub: 'Holistic Security Posture',
    badge: 'OPERATIONAL BALANCE',
    description: 'Security controls must balance protection without crippling daily business usability or productivity.',
    details: 'A system with 100% confidentiality (locked in concrete underground) has zero availability. SOC analysts measure impact across all 3 axes.',
    tags: ['Risk Triangulation', 'Business Impact Analysis', 'Security Usability', 'Holistic Defense'],
  },
];

// -----------------------------------------------------------------------------
// 5. M03-U1-C2 Pillar 2: The 5x5 Qualitative Risk Matrix
// -----------------------------------------------------------------------------
export const riskMatrixNodes: VisualNodeItem[] = [
  {
    id: 'risk-mat-low',
    label: 'Low Risk (Green Zone)',
    sub: 'Likelihood: Low • Impact: Minor',
    badge: 'ROUTINE MONITORING',
    description: 'Single isolated port probe against a firewalled interface or blocked phishing email quarantined automatically.',
    details: 'Standard Operational Handling: Logged for baseline trend analysis. Closed without senior escalation unless recurring patterns develop.',
    tags: ['Severity: SEV-4 (Low)', 'SLA: 48 Hours', 'Action: Automated Log', 'Escalation: None'],
  },
  {
    id: 'risk-mat-med',
    label: 'Medium Risk (Yellow Zone)',
    sub: 'Likelihood: Medium • Impact: Moderate',
    badge: 'ANALYST INVESTIGATION',
    description: 'Repeated failed logon attempts on workstation after hours, or adware detected and cleaned by local antivirus.',
    details: 'Standard Operational Handling: L1 analyst verifies user context, checks parent process, and confirms machine baseline integrity.',
    tags: ['Severity: SEV-3 (Medium)', 'SLA: 4 Hours', 'Action: Triage Checklist', 'Review: Peer Review'],
  },
  {
    id: 'risk-mat-high',
    label: 'High Risk (Orange Zone)',
    sub: 'Likelihood: High • Impact: Major',
    badge: 'ELEVATED PRIORITY',
    description: 'Suspicious PowerShell execution downloading external executable on branch workstation BLR-BR-WS-04.',
    details: 'Standard Operational Handling: High alert. L1 analyst scopes execution path, isolates host if suspicious, and notifies Tier 2.',
    tags: ['Severity: SEV-2 (High)', 'SLA: 30 Minutes', 'Action: Host Scoping', 'Escalation: Tier 2 Lead'],
  },
  {
    id: 'risk-mat-crit',
    label: 'Critical Risk (Red Zone)',
    sub: 'Likelihood: Confirmed • Impact: Catastrophic',
    badge: 'CRITICAL SEV-1 INCIDENT',
    description: 'Confirmed active ransomware deployment or unauthorized access to core PostgreSQL finance database.',
    details: 'Standard Operational Handling: Emergency incident response. Immediate host isolation, incident manager call bridge, executive notification.',
    tags: ['Severity: SEV-1 (Critical)', 'SLA: 15 Minutes', 'Action: Emergency Bridge', 'Containment: Immediate Quarantine'],
  },
];

// -----------------------------------------------------------------------------
// 6. M03-U1-C2 Pillar 3: Business Context Triage Triangulation
// -----------------------------------------------------------------------------
export const businessImpactNodes: VisualNodeItem[] = [
  {
    id: 'bia-kiosk',
    label: 'Alert #101: Port Scan on Practice Kiosk',
    sub: 'Public Lobby Kiosk • Subnet 10.10.50.12',
    badge: 'LOW BUSINESS CONTEXT',
    description: 'SIEM alert flags Nmap SYN scan targeting the lobby visitor check-in kiosk.',
    details: 'Business Impact Analysis: Device holds no sensitive records, has no domain credentials, and is isolated on the guest VLAN. Priority downgraded to Low.',
    tags: ['Target: Lobby Kiosk', 'Asset Value: $', 'Data Sensitivity: Public', 'Triage Disposition: Routine'],
  },
  {
    id: 'bia-payroll',
    label: 'Alert #102: Port Scan on Core Payroll DB',
    sub: 'Core Finance Server • Subnet 10.10.10.5',
    badge: 'CRITICAL BUSINESS CONTEXT',
    description: 'Identical Nmap SYN scan detected targeting internal server holding enterprise payroll and banking databases.',
    details: 'Business Impact Analysis: High financial and legal consequence if breached. Same technical alert signature, but escalated to SEV-1 Critical due to asset value.',
    tags: ['Target: FIN-DB-01', 'Asset Value: $$$$', 'Data: Bank Details & Salaries', 'Triage Disposition: SEV-1 Escalation'],
  },
  {
    id: 'bia-sla',
    label: 'SLA Escalation Differential',
    sub: '15 Min Critical vs 24h Routine',
    badge: 'SERVICE LEVEL AGREEMENT',
    description: 'Service Level Agreements (SLAs) enforce response speed based on business criticality, not raw alarm count.',
    details: 'Ananya\'s Guidance: Technical telemetry tells you what happened; business context tells you how fast you need to act.',
    tags: ['Critical SLA: 15 Minutes', 'Routine SLA: 24 Hours', 'Metrics: MTTD & MTTR', 'Discipline: Triage Speed'],
  },
  {
    id: 'bia-matrix',
    label: 'Contextual Triangulation Doctrine',
    sub: 'Alert Signature + Asset Value = Priority',
    badge: 'SOC OPERATIONAL DOCTRINE',
    description: 'L1 analysts must always query the asset database before assigning final incident severity ratings.',
    details: 'Prevents SOC alert fatigue: spending hours investigating non-critical test devices while crown jewel alarms sit unattended.',
    tags: ['Formula: Sig x Value', 'Asset Inventory Lookup', 'Fatigue Prevention', 'Tier 1 Standard'],
  },
];

// -----------------------------------------------------------------------------
// 7. M03-U2-C1 Pillar 1: Anatomy of a Phishing Email
// -----------------------------------------------------------------------------
export const phishingAnatomyNodes: VisualNodeItem[] = [
  {
    id: 'phish-sender',
    label: '1. Spoofed Sender Header',
    sub: 'payroll-alert@cdac-portal-verify.com',
    badge: 'DECEPTIVE IDENTITY',
    description: 'Display name reads "CDAC Central Payroll", but real envelope sender domain is a lookalike registered 2 days ago.',
    details: 'Technical Inspection: Legitimate domain is cdac.in. Lookalike domain cdac-portal-verify.com fails SPF alignment checks.',
    tags: ['Display: CDAC Payroll', 'Domain: Lookalike Spoof', 'SPF Status: FAIL', 'Age: 48 Hours Old'],
  },
  {
    id: 'phish-urgency',
    label: '2. Artificial Urgency Lure',
    sub: '"Salary Suspended Within 2 Hours!"',
    badge: 'PSYCHOLOGICAL PRESSURE',
    description: 'Adversary uses fear of salary stoppage to bypass the employee\'s natural critical thinking and caution.',
    details: 'Common Phishing Indicators: Tight deadlines, threats of account suspension, unexpected requests from executive management.',
    tags: ['Tactic: Fear & Urgency', 'Deadline: 2 Hours', 'Action Demanded: Click Link', 'Lure Type: Payroll Crisis'],
  },
  {
    id: 'phish-link',
    label: '3. Mismatched Link Destination',
    sub: 'http://198.51.100.23/cdac-login/auth.php',
    badge: 'CREDENTIAL HARVESTER',
    description: 'Hyperlink text displays "https://portal.cdac.in", but actual destination URL routes to foreign IP harvesting passwords.',
    details: 'Safe Practice Rule: Never click suspect links! Hover over link to preview full URL path in email client status bar.',
    tags: ['Display URL: portal.cdac.in', 'Real URL: 198.51.100.23', 'Port: 80 (Unencrypted)', 'Payload: Credential Theft'],
  },
  {
    id: 'phish-report',
    label: '4. SOC Safe Reporting Route',
    sub: 'Forward as EML Attachment to SOC',
    badge: 'DEFENSIVE RESPONSE',
    description: 'Employee reports email using "Report Phish" button, sending headers and raw RFC 822 MIME source to SOC queue.',
    details: 'Preserves full RFC email headers without detonating payload or clicking links, enabling L1 analyst to extract sender IP and domain IOCs.',
    tags: ['Action: Report to SOC', 'Artifact: .EML File', 'IOC Extracted: Malicious IP', 'Safe Handling: Do Not Click'],
  },
];

// -----------------------------------------------------------------------------
// 8. M03-U2-C1 Pillar 2: Credential Attack Methodologies
// -----------------------------------------------------------------------------
export const credentialAttackNodes: VisualNodeItem[] = [
  {
    id: 'cred-brute',
    label: 'Brute Force Attack',
    sub: '10,000 Passwords on 1 Account',
    badge: 'EXHAUSTIVE ATTACK',
    description: 'Automated software testing thousands of dictionary passwords sequentially against a single username (e.g., admin).',
    details: 'Easily detected and blocked by modern lockout thresholds (e.g., 5 failed attempts locks account for 30 minutes in Event 4740).',
    tags: ['Target: Single Account', 'Volume: High Speed', 'Detection: Event ID 4625 Flood', 'Mitigation: Account Lockout'],
  },
  {
    id: 'cred-spray',
    label: 'Password Spraying Attack',
    sub: '1 Password on 500 Accounts',
    badge: 'STEALTH TECHNIQUE',
    description: 'Adversary tests a single common password (e.g., Spring2026!) across hundreds of enterprise accounts at slow intervals.',
    details: 'Circumvents account lockout thresholds because each individual account only experiences one single failure every 30 minutes.',
    tags: ['Target: 500 Accounts', 'Password: 1 Common', 'Technique: MITRE T1110.003', 'Detection: Multi-Account 4625 Correlation'],
  },
  {
    id: 'cred-stuff',
    label: 'Credential Stuffing Attack',
    sub: 'Leaked Database Replay',
    badge: 'THIRD-PARTY LEAK EXPLOITATION',
    description: 'Automated injection of username/password pairs stolen from external breached websites (e.g., LinkedIn, Dropbox leaks).',
    details: 'Exploits human password reuse: employees using identical passwords across corporate email and personal social websites.',
    tags: ['Source: External Breaches', 'Tactic: Password Reuse', 'Tool: Sentry MBA', 'Mitigation: Mandatory Enterprise MFA'],
  },
  {
    id: 'cred-event',
    label: 'Windows Event ID 4625 Telemetry',
    sub: 'An Account Failed to Log On',
    badge: 'SIEM AUDIT TRAIL',
    description: 'Windows Security Event Log entry generated whenever a logon attempt fails due to bad password or unknown user.',
    details: 'Key Triage Fields: LogonType (2=Interactive, 3=Network, 10=RDP), FailureReason (0xC000006A = Bad Password), and Source Workstation IP.',
    tags: ['Event: 4625', 'Status: 0xC000006A', 'LogonType: 3 (Network)', 'Telemetry: Active Directory Security'],
  },
];

// -----------------------------------------------------------------------------
// 9. M03-U2-C1 Pillar 3: MFA Push Fatigue & Bypass Mitigation
// -----------------------------------------------------------------------------
export const mfaFatigueNodes: VisualNodeItem[] = [
  {
    id: 'mfa-bomb',
    label: 'MFA Prompt Bombing',
    sub: '50 Push Prompts at 03:00 AM',
    badge: 'SOCIAL ENGINEERING ATTACK',
    description: 'Adversary who stole user password spams mobile phone with dozens of repeated push notifications in the middle of the night.',
    details: 'Psychological Coercion: The attacker hopes the irritated employee taps "Approve" simply to silence the buzzing phone and go back to sleep.',
    tags: ['Vector: Mobile Push Flood', 'Target: Employee Device', 'Technique: MFA Fatigue (T1621)', 'Time: Off-Hours Nocturnal'],
  },
  {
    id: 'mfa-number',
    label: 'Number Matching Challenge',
    sub: 'Enter 2-Digit Display Code',
    badge: 'ENHANCED DEFENSE',
    description: 'Login screen displays a random two-digit number that the employee must manually type into their mobile authenticator app.',
    details: 'Completely eliminates push fatigue: an employee half-asleep cannot approve the prompt because they cannot see the numbers on the attacker\'s screen.',
    tags: ['Defense: Number Matching', 'Standard: FIDO2 / Microsoft Entra', 'Usability: High', 'Fatigue Immunity: 100%'],
  },
  {
    id: 'mfa-fido2',
    label: 'Hardware Security Key (FIDO2)',
    sub: 'YubiKey / WebAuthn USB Token',
    badge: 'PHISHING-RESISTANT MFA',
    description: 'Physical cryptographic hardware token bound to the browser origin URL via public-key cryptography.',
    details: 'Phishing-Resistant: Even if an employee enters credentials on a fake phishing website, the hardware key refuses to sign the authentication challenge.',
    tags: ['Type: Hardware Token', 'Protocol: WebAuthn / CTAP2', 'Phishing-Proof: Guaranteed', 'Standard: NIST SP 800-63B AAL3'],
  },
  {
    id: 'mfa-policy',
    label: 'Conditional Access Policy Engine',
    sub: 'Device Health + Location Filter',
    badge: 'ACCESS GOVERNANCE',
    description: 'Evaluates context: blocks logins from untrusted countries or unmanaged mobile devices regardless of valid passwords.',
    details: 'Denies authentication requests from non-corporate IP ranges, neutralizing stolen credentials before the MFA prompt even sends.',
    tags: ['Engine: Conditional Access', 'Check: Geographic Location', 'Check: Compliant Device', 'Outcome: Deny Untrusted'],
  },
];

// -----------------------------------------------------------------------------
// 10. M03-U2-C2 Pillar 1: Malware Taxonomy & Execution Vectors
// -----------------------------------------------------------------------------
export const malwareTaxonomyNodes: VisualNodeItem[] = [
  {
    id: 'mal-ransom',
    label: 'Ransomware (LockBit / BlackCat)',
    sub: 'Crypto-Extortion Malware',
    badge: 'DESTRUCTIVE THREAT',
    description: 'Malware that rapidly encrypts user files using AES-256 + RSA-4096, appends .locked extensions, and demands ransom.',
    details: 'Behavioral Footprint: Deletes Volume Shadow Copies (vssadmin delete shadows /all /quiet), terminates database services, drops README_RECOVERY.txt.',
    tags: ['Tactic: Impact (T1486)', 'Action: Encryption', 'Indicator: vssadmin delete', 'Containment: Immediate Isolation'],
  },
  {
    id: 'mal-trojan',
    label: 'Trojan Dropper (QakBot / TrickBot)',
    sub: 'Masquerading Delivery Vehicle',
    badge: 'PAYLOAD DELIVERY',
    description: 'Disguised executable delivered via phishing attachments that silently drops secondary malware beacons onto disk.',
    details: 'Common Tricks: Double extensions (Invoice_2026.pdf.exe), Word macros invoking mshta.exe or powershell.exe in %TEMP%.',
    tags: ['Type: Dropper', 'Extension: Double .pdf.exe', 'Location: %TEMP% / AppData', 'Detection: Hash Reputation & EDR'],
  },
  {
    id: 'mal-stealer',
    label: 'InfoStealer (RedLine / Vidar)',
    sub: 'Credential & Session Extractor',
    badge: 'CREDENTIAL THEFT',
    description: 'Lightweight malware scraping saved passwords, browser session cookies, and VPN certificates from local storage.',
    details: 'Stolen cookies allow attackers to bypass MFA by hijacking active session tokens without needing the user\'s mobile phone.',
    tags: ['Target: Chrome / Edge Cookies', 'Data: Browser Vaults', 'Exfil: Telegram Bot / C2', 'Mitigation: Cookie Timeout'],
  },
  {
    id: 'mal-worm',
    label: 'Network Worm (WannaCry / Conficker)',
    sub: 'Self-Propagating Lateral Spreader',
    badge: 'AUTONOMOUS SPREAD',
    description: 'Malware scanning local subnets on Port 445 (SMB) exploiting unpatched vulnerabilities to infect neighboring hosts automatically.',
    details: 'Spreads without human interaction across the branch LAN if internal firewalls or VLAN segmentation are absent.',
    tags: ['Propagation: Self-Replicating', 'Vector: Port 445 SMB', 'Exploit: EternalBlue', 'Defense: Disable SMBv1 & Segment'],
  },
];

// -----------------------------------------------------------------------------
// 11. M03-U2-C2 Pillar 2: Insider Threat Observables vs Presumptions
// -----------------------------------------------------------------------------
export const insiderThreatNodes: VisualNodeItem[] = [
  {
    id: 'insider-bulk',
    label: 'Observable: 45 GB Bulk Archive Transfer',
    sub: '45 GB Written to USB at 23:45 UTC',
    badge: 'RECORDED FACT',
    description: 'Endpoint telemetry log captures 45,000 files compressed into financial_records.7z written to removable flash drive.',
    details: 'Forensic Fact: Telemetry verifies volume, filename, USB serial number, and active session FIN-OPS-01. Does not record intent.',
    tags: ['Telemetry: Event ID 6416', 'Volume: 45 GB', 'Drive: Kingston USB 3.0', 'Fact: High Volume Data Movement'],
  },
  {
    id: 'insider-badge',
    label: 'Physical Badge Access Correlation',
    sub: 'Building Security Turnstile Records',
    badge: 'PHYSICAL CORRELATION',
    description: 'Querying building access logs confirms employee badge was never scanned at office turnstiles after 18:00 IST.',
    details: 'Crucial Triage Discovery: The employee was not physically in the office. The transfer occurred remotely via VPN session from external IP.',
    tags: ['System: Physical Badge Reader', 'Status: No Office Entry', 'Time Window: 18:00 - 06:00', 'Discrepancy: Virtual vs Physical'],
  },
  {
    id: 'insider-presume',
    label: 'Premature Accusation Trap',
    sub: '"The employee is stealing secrets!"',
    badge: 'UNVERIFIED PRESUMPTION',
    description: 'Rushing to accuse the employee before verifying whether their workstation was infected by remote-access Trojan (RAT).',
    details: 'Ananya\'s Warning: If an attacker compromised FIN-OPS-01 via phishing, blaming the employee lets the real adversary escape undetected!',
    tags: ['Fallacy: Attribution Error', 'Risk: False Accusation', 'Doctrine: Presume Innocence', 'Requirement: Root-Cause Analysis'],
  },
  {
    id: 'insider-dlp',
    label: 'Data Loss Prevention (DLP) Control',
    sub: 'Removable Media Block Policy',
    badge: 'TECHNICAL COUNTERMEASURE',
    description: 'Central group policy blocking write access to unauthorized USB storage devices across all branch endpoints.',
    details: 'Prevents both malicious exfiltration and accidental loss by enforcing strict BitLocker encryption on company-approved flash drives.',
    tags: ['Control: USB Write Block', 'Policy: BitLocker To Go', 'Standard: NIST 800-53 MP-7', 'Result: Exfiltration Prevented'],
  },
];

// -----------------------------------------------------------------------------
// 12. M03-U2-C2 Pillar 3: Network Reconnaissance & Port Sweeps
// -----------------------------------------------------------------------------
export const networkReconNodes: VisualNodeItem[] = [
  {
    id: 'scan-syn',
    label: 'Stealth SYN Port Sweep (Nmap -sS)',
    sub: 'Rapid Half-Open Probe Across Subnet',
    badge: 'RECONNAISSANCE ACTIVITY',
    description: 'Scanner sends TCP SYN packets to ports 21, 22, 80, 445, 3389 without completing the 3-way handshake to map active listeners.',
    details: 'Adversary goal: Identify unpatched web interfaces, open Remote Desktop doors, and vulnerable SMB file shares across the branch.',
    tags: ['Technique: Port Sweep (T1046)', 'Protocol: TCP Half-Open', 'Ports: 21, 22, 80, 445, 3389', 'Tool: Nmap / Masscan'],
  },
  {
    id: 'scan-zeek',
    label: 'Zeek / Suricata IDS Signature Alert',
    sub: 'ET SCAN Potential Nmap Port Sweep',
    badge: 'NETWORK INTRUSION ALARM',
    description: 'Network sensor evaluates packet flow counters; triggers high-priority alert when single IP touches 50+ ports in 2 seconds.',
    details: 'Telemetry Output: Source IP 10.10.50.12 (Guest WiFi), Destination Range 10.10.20.0/24 (Finance LAN), Packet Count 250 pkts.',
    tags: ['Sensor: Zeek conn.log', 'Alert: Suricata 2001219', 'Threshold: 50 ports / 2s', 'Severity: High Priority'],
  },
  {
    id: 'scan-honeypot',
    label: 'Internal Decoy / Honeypot Port',
    sub: 'Port 4444 Canary Listener',
    badge: 'HIGH-FIDELITY DECEPTION',
    description: 'Deliberately unadvertised decoy port on internal server. Legitimate enterprise applications never connect here.',
    details: 'Zero False Positive Detection: Any packet touching Port 4444 represents confirmed unauthorized internal reconnaissance!',
    tags: ['Type: Honeypot / Canary', 'Port: 4444 TCP', 'False Positive Rate: 0.0%', 'Action: Instant Alert'],
  },
  {
    id: 'scan-triage',
    label: 'L1 Reconnaissance Triage Playbook',
    sub: 'Contain Scanner IP & Verify Source MAC',
    badge: 'SOC TRIAGE WORKFLOW',
    description: '1. Locate source switch port. 2. Verify MAC address in DHCP leases. 3. Apply temporary ACL ban on edge firewall.',
    details: 'Stops adversary in the reconnaissance phase before they deliver weaponized exploit payloads or attempt credential logins.',
    tags: ['Phase: Cyber Kill Chain Step 1', 'Action: Port Security Block', 'Containment: Pre-Exploit', 'Result: Attack Neutralized'],
  },
];

// -----------------------------------------------------------------------------
// 13. M03-U3-C1 Pillar 1: The Defensive Controls Triad
// -----------------------------------------------------------------------------
export const defenseTriadNodes: VisualNodeItem[] = [
  {
    id: 'ctrl-prev',
    label: 'Preventive Controls (Stop Harm)',
    sub: 'Firewalls • MFA • Least Privilege • AppLocker',
    badge: 'FIRST LINE OF DEFENSE',
    description: 'Controls designed to proactively block unauthorized activity from occurring in the first place.',
    details: 'Examples: Next-Gen Firewall blocking inbound port 445; Multi-Factor Authentication stopping password-only breaches; AppLocker blocking unapproved scripts.',
    tags: ['Type: Preventive', 'Objective: Block Intrusion', 'Examples: NGFW, MFA, ACLs', 'Standard: NIST SP 800-53'],
  },
  {
    id: 'ctrl-det',
    label: 'Detective Controls (Notice Signs)',
    sub: 'SIEM Rules • Zeek Flow Taps • EDR Heuristics',
    badge: 'SECOND LINE OF DEFENSE',
    description: 'Controls designed to detect and alert when preventive controls fail or when legitimate access is abused.',
    details: 'Examples: SIEM rule triggering on off-hours logon (Event ID 4624); EDR alerting on certutil downloading remote executable; Suricata port scan alarm.',
    tags: ['Type: Detective', 'Objective: Early Detection', 'Examples: SIEM, EDR, IDS', 'Metric: MTTD (Mean Time to Detect)'],
  },
  {
    id: 'ctrl-resp',
    label: 'Responsive / Corrective Controls',
    sub: 'Host Isolation • Password Reset • Backups',
    badge: 'THIRD LINE OF DEFENSE',
    description: 'Controls designed to contain active intrusions, limit the blast radius, and restore clean baseline operations.',
    details: 'Examples: Network isolation of workstation BLR-BR-WS-04; Kerberos session revocation; restoring corrupted database tables from immutable backup.',
    tags: ['Type: Responsive / Corrective', 'Objective: Contain & Recover', 'Examples: Host Quarantine, Backups', 'Metric: MTTR (Mean Time to Recover)'],
  },
  {
    id: 'ctrl-triad-harmony',
    label: 'Triad Symbiosis & Fallback',
    sub: 'Defense Without Blindspots',
    badge: 'DEFENSIVE ARCHITECTURE',
    description: 'No single control is infallible. If Prevention fails, Detection alerts. If Detection alerts, Response contains.',
    details: 'Ananya\'s Doctrine: "Prevention without monitoring is blind optimism. Monitoring without response is useless paperwork."',
    tags: ['Holistic Strategy', 'Zero Gaps', 'Redundant Protection', 'L1 Operational Scope'],
  },
];

// -----------------------------------------------------------------------------
// 14. M03-U3-C1 Pillar 2: The Incident Response Lifecycle
// -----------------------------------------------------------------------------
export const incidentLifecycleNodes: VisualNodeItem[] = [
  {
    id: 'ir-prep',
    label: '1. Preparation Phase',
    sub: 'Hardened Baselines & Approved Playbooks',
    badge: 'LIFECYCLE STEP 1',
    description: 'Maintaining trained L1 analysts, documented Standard Operating Procedures (SOPs), and configured EDR sensors.',
    details: 'Incidents cannot be handled effectively without pre-approved authority: having management sign off on emergency host isolation powers.',
    tags: ['Standard: NIST SP 800-61r2', 'Artifacts: SOPs & Playbooks', 'Tools: EDR, SIEM Pre-Config', 'Readiness: 24/7 Shift'],
  },
  {
    id: 'ir-detect',
    label: '2. Detection & Analysis Phase',
    sub: 'Triaging Incoming Alarms & Gathering Facts',
    badge: 'LIFECYCLE STEP 2',
    description: 'L1 analyst reviews alert queue, collects host observables, validates parent processes, and confirms true positive.',
    details: 'Output: Structured case ticket documenting Who (User), What (Action), When (UTC Time), Where (Host), and Why (Threat IOC).',
    tags: ['Phase: L1 Core Duty', 'Action: Alert Qualification', 'Output: Scoped Case Ticket', 'Discipline: Forensic Restraint'],
  },
  {
    id: 'ir-contain',
    label: '3. Containment Phase',
    sub: 'Stopping Lateral Movement & Data Loss',
    badge: 'LIFECYCLE STEP 3',
    description: 'Isolating compromised workstation BLR-BR-WS-04 from the network and revoking Active Directory session tokens.',
    details: 'Contains the blast radius: the adversary is trapped on a single machine without ability to pivot to the finance database.',
    tags: ['Action: Host Quarantine', 'Action: Credential Reset', 'Result: Spread Stopped', 'Priority: Immediate'],
  },
  {
    id: 'ir-erad-rec',
    label: '4. Eradication & Recovery Phase',
    sub: 'Malware Removal & Restoring Clean State',
    badge: 'LIFECYCLE STEP 4',
    description: 'Reimaging infected operating system from golden image, closing root-cause vulnerability, and restoring data from backups.',
    details: 'Verification: Host is monitored for 48 hours to guarantee malware persistence mechanisms (scheduled tasks, run keys) are gone.',
    tags: ['Action: OS Reimage', 'Action: Root Cause Patch', 'Restoration: Clean Backup', 'Validation: Clean Monitoring'],
  },
];

// -----------------------------------------------------------------------------
// 15. M03-U3-C1 Pillar 3: Active Alert Containment HUD
// -----------------------------------------------------------------------------
export const alertContainmentNodes: VisualNodeItem[] = [
  {
    id: 'act-alert',
    label: 'Incoming Alert: C2 Beacon on BLR-BR-WS-04',
    sub: 'SEV-1 High Severity • Cobalt Strike Pattern',
    badge: 'TRIGGER ALARM',
    description: 'Detection engine flags mathematical 60-second periodic HTTP heartbeats to external foreign IP address.',
    details: 'Triage Verification: Process certutil.exe spawned by cmd.exe. 450 MB outbound data. Confirmed active True Positive intrusion.',
    tags: ['Host: BLR-BR-WS-04', 'User: FIN-OPS-01', 'Destination: 198.51.100.42', 'Disposition: True Positive'],
  },
  {
    id: 'act-isolate',
    label: 'Action 1: EDR Host Network Isolation',
    sub: 'Sever Workstation Wire Connections',
    badge: 'CONTAINMENT COMMAND',
    description: 'One-click EDR command instructing kernel network filter driver to drop all inbound and outbound traffic except SOC console.',
    details: 'The infected computer cannot communicate with other branch machines or its external C2 server. Lateral movement is dead.',
    tags: ['Command: epp-isolate-host', 'Blast Radius: Contained to 1 PC', 'Wire Status: Quarantined', 'SOC Channel: Preserved'],
  },
  {
    id: 'act-revoke',
    label: 'Action 2: Revoke Active Directory Tokens',
    sub: 'Invalidate Kerberos TGT & Reset Password',
    badge: 'CREDENTIAL CONTAINMENT',
    description: 'Domain controller invalidates all active session tokens for FIN-OPS-01, terminating open SMB and remote desktop connections.',
    details: 'Ensures that even if the attacker possesses the user\'s password hash in memory, the active Kerberos ticket is rejected.',
    tags: ['Action: Revoke-TGT', 'Command: Set-ADUser -ChangePasswordAtLogon', 'Active Sessions: Severed', 'Tokens: Invalidated'],
  },
  {
    id: 'act-handover',
    label: 'Action 3: Structured Shift Handover Package',
    sub: 'Consolidated Case Summary for Tier 2',
    badge: 'PROFESSIONAL HANDOFF',
    description: 'Complete documentation package with UTC timestamps, host memory capture location, and quarantined evidence files.',
    details: 'Ananya\'s Rule: An alert is not resolved when contained; clear shift handover ensures Tier 2 forensically investigates root cause.',
    tags: ['Ticket: INC-2026-8812', 'Evidence Attached: Volatility Memory Dump', 'Recipient: Tier 2 Forensics', 'Status: Escalated'],
  },
];

// -----------------------------------------------------------------------------
// 16. M03-U3-C2 Pillar 1: The Defense-in-Depth Castle
// -----------------------------------------------------------------------------
export const defenseInDepthNodes: VisualNodeItem[] = [
  {
    id: 'did-perimeter',
    label: 'Ring 5: Perimeter Moat (NGFW & WAF)',
    sub: 'Border Inspection • Ports 80 / 443 Only',
    badge: 'OUTER PERIMETER',
    description: 'Next-Generation Firewall dropping unapproved inbound ports and Cloud WAF filtering SQL injection attempts.',
    details: 'First defensive barrier: blocks 95% of automated internet noise and unauthorized brute force connection probes.',
    tags: ['Layer: External Perimeter', 'Device: Palo Alto NGFW', 'Policy: Deny All Inbound', 'WAF: OWASP Top 10 Filter'],
  },
  {
    id: 'did-network',
    label: 'Ring 4: Network Walls (VLAN Segmentation)',
    sub: '802.1Q Segments & Microsegmentation',
    badge: 'NETWORK SEGMENTATION',
    description: 'Isolating Guest WiFi (VLAN 50) and Workstations (VLAN 20) away from the Core Server Database (VLAN 10).',
    details: 'Second barrier: even if an attacker hacks a laptop on VLAN 20, they cannot directly connect to database Port 5432.',
    tags: ['Layer: Internal Network', 'Technology: 802.1Q VLANs', 'Firewall: Inter-VLAN ACLs', 'Zero Trust Segment'],
  },
  {
    id: 'did-endpoint',
    label: 'Ring 3: Endpoint Armor (EDR & AppLocker)',
    sub: 'Host Behavior & Execution Guard',
    badge: 'HOST SECURITY',
    description: 'Endpoint Detection and Response (CrowdStrike / Defender) inspecting process trees and blocking unapproved binaries.',
    details: 'Third barrier: if an employee runs a malicious attachment, the EDR behavioral engine terminates the process instantly.',
    tags: ['Layer: Host Endpoint', 'Tool: CrowdStrike Falcon', 'Control: AppLocker Whitelist', 'Telemetry: Process Trees'],
  },
  {
    id: 'did-data',
    label: 'Ring 1: Vault Keep (AES-256 & Backups)',
    sub: 'Encrypted Database & Air-Gapped Vault',
    badge: 'DATA PROTECTION CORE',
    description: 'Column-level AES-256 database encryption and immutable, write-once-read-many (WORM) offline backups.',
    details: 'Final barrier: even if an attacker physically bypasses all outer rings and steals the hard drives, the data is unreadable gibberish.',
    tags: ['Layer: Data Core', 'Cipher: AES-256', 'Backups: Immutable WORM', 'Compliance: DPDP Act / ISO 27001'],
  },
];

// -----------------------------------------------------------------------------
// 17. M03-U3-C2 Pillar 2: Least Privilege & Blast Radius Containment
// -----------------------------------------------------------------------------
export const leastPrivilegeNodes: VisualNodeItem[] = [
  {
    id: 'blast-user',
    label: 'Standard User (Least Privilege)',
    sub: 'FIN-OPS-01 • Medium Integrity Token',
    badge: 'CONTAINED BLAST RADIUS',
    description: 'Standard enterprise employee account with access restricted strictly to their personal documents and line-of-business app.',
    details: 'Compromise Outcome: If employee executes malware, the damage is restricted to their personal profile. The OS kernel and System32 are untouched!',
    tags: ['Integrity: Medium', 'Write Access: %USERPROFILE% Only', 'System32 Access: DENIED', 'Blast Radius: 1 Profile Folder'],
  },
  {
    id: 'blast-admin',
    label: 'Local Administrator (Excessive Privilege)',
    sub: 'High Integrity • Full System Control ⚠️',
    badge: 'CATASTROPHIC BLAST RADIUS',
    description: 'Dangerous legacy practice of granting everyday office staff local administrator rights on their workstations.',
    details: 'Compromise Outcome: Malware executes with admin rights, disables the local antivirus/EDR agent, dumps LSASS passwords, and destroys the machine.',
    tags: ['Integrity: High / SYSTEM', 'Write Access: Total Disk (C:\\)', 'Antivirus Tampering: POSSIBLE', 'Blast Radius: Full Machine Takeover'],
  },
  {
    id: 'blast-uac',
    label: 'User Account Control (UAC) Barrier',
    sub: 'Privilege Elevation Checkpoint',
    badge: 'PRIVILEGE GATE',
    description: 'Windows security boundary ensuring processes run with filtered standard tokens unless explicitly elevated with admin credentials.',
    details: 'Stops silent drive-by compromise: malware cannot gain administrative authority without presenting an elevation prompt.',
    tags: ['Mechanism: UAC Filtered Token', 'Token Split: Admin vs Standard', 'Security Boundary: High Impact', 'Standard: PoLP'],
  },
  {
    id: 'blast-jit',
    label: 'Just-In-Time (JIT) Privileged Access',
    sub: 'Temporary 1-Hour Admin Elevation',
    badge: 'MODERN ACCESS GOVERNANCE',
    description: 'IT administrators receive elevated permissions only upon ticket approval for a specific task, expiring automatically after 60 minutes.',
    details: 'Eliminates standing privileges: no account remains a permanent domain administrator, drastically shrinking the attack window.',
    tags: ['Concept: Zero Standing Privilege', 'Duration: 60 Minutes', 'Audit: Full Session Recording', 'Platform: CyberArk / PAM'],
  },
];

// -----------------------------------------------------------------------------
// 18. M03-U3-C2 Pillar 3: Zero Trust Architecture & Continuous Verification
// -----------------------------------------------------------------------------
export const zeroTrustNodes: VisualNodeItem[] = [
  {
    id: 'zt-verify',
    label: '1. Explicit Identity Verification',
    sub: 'MFA + Phishing-Resistant FIDO2',
    badge: 'ZERO TRUST PILLAR 1',
    description: 'Never assume user identity based on internal network IP. Validate cryptographically on every single connection attempt.',
    details: 'NIST SP 800-207 Rule: An internal IP from the branch office receives zero inherent trust. Identity must be verified with strong MFA.',
    tags: ['Rule: Never Trust, Always Verify', 'Identity: Strong MFA', 'Device: Validated', 'Context: Continuous'],
  },
  {
    id: 'zt-device',
    label: '2. Device Health & Posture Validation',
    sub: 'EDR Active • OS Patched • Disk Encrypted',
    badge: 'ZERO TRUST PILLAR 2',
    description: 'Policy Enforcement Point checks machine posture: if BitLocker is disabled or EDR sensor is disconnected, access is blocked.',
    details: 'Prevents compromised or rogue laptops from connecting to the internal finance portal even if the employee enters a valid password.',
    tags: ['Check: CrowdStrike Running', 'Check: BitLocker Active', 'Check: OS Up to Date', 'Status: Compliant'],
  },
  {
    id: 'zt-micro',
    label: '3. Microsegmentation & Just-In-Time Access',
    sub: 'Per-Session Ephemeral Micro-Tunnels',
    badge: 'ZERO TRUST PILLAR 3',
    description: 'Access is granted exclusively to the specific application needed (e.g. Finance Portal Port 443), not the entire subnet.',
    details: 'Eliminates flat networks: a user authorized to view finance reports cannot ping or port-scan neighboring servers on the same switch.',
    tags: ['Tunnel: Ephemeral TLS', 'Scope: Application Only', 'Lateral Movement: Impossible', 'Standard: NIST 800-207'],
  },
  {
    id: 'zt-pep',
    label: '4. Policy Decision Point (PDP / PEP)',
    sub: 'Continuous Dynamic Risk Evaluation',
    badge: 'ZERO TRUST ENGINE',
    description: 'The brain of Zero Trust: dynamically revokes session access mid-workday if anomalous behavior or foreign logins are detected.',
    details: 'If an active session suddenly transmits 500 MB to an unknown external server, the PEP cuts the session connection in real time.',
    tags: ['Engine: Policy Decision Point', 'Action: Dynamic Revocation', 'Telemetry: Real-Time Risk Score', 'Doctrine: Assume Breach'],
  },
];

// =============================================================================
// MODULE 03 NODES MAP LOOKUP
// =============================================================================
export const module03NodesMap: Record<string, VisualNodeItem[]> = {
  'm03-asset-inventory': assetInventoryNodes,
  'm03-threat-vuln-matrix': threatVulnNodes,
  'm03-person-vs-credential': personVsCredentialNodes,
  'm03-cia-triad': ciaTriadNodes,
  'm03-risk-matrix': riskMatrixNodes,
  'm03-business-impact-gauge': businessImpactNodes,
  'm03-phishing-anatomy': phishingAnatomyNodes,
  'm03-credential-attack-sim': credentialAttackNodes,
  'm03-mfa-fatigue-radar': mfaFatigueNodes,
  'm03-malware-taxonomy': malwareTaxonomyNodes,
  'm03-insider-threat-indicators': insiderThreatNodes,
  'm03-network-recon-scanner': networkReconNodes,
  'm03-defense-triad': defenseTriadNodes,
  'm03-incident-lifecycle': incidentLifecycleNodes,
  'm03-alert-containment': alertContainmentNodes,
  'm03-defense-in-depth-castle': defenseInDepthNodes,
  'm03-least-privilege-blast-radius': leastPrivilegeNodes,
  'm03-zero-trust-verification': zeroTrustNodes,
};
