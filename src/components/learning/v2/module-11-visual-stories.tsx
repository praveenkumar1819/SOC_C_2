'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 11: IDENTITY, EMAIL & THREAT INTELLIGENCE — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Meera (Threat Intelligence Analyst & Email Security Specialist at CDAC Bengaluru)
// Motto: "A clue points somewhere. It does not automatically tell the whole story. Strong controls add friction, but a valid credential does not make a session trustworthy. Handle the message without becoming the victim."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M11-U1-C1 (The account has its own trail)
// -----------------------------------------------------------------------------

// 1. Pillar 1: Sign-In Telemetry Stream & Contextual Fields
export const signinTelemetryStreamNodes: VisualNodeItem[] = [
  {
    id: 'sign-account-id',
    label: '1. Account Identifier (FIN-OPS-01)',
    sub: 'UPN: fin-ops-01@fincorp.local',
    badge: 'IDENTITY CONTEXT',
    description: 'The claimed identity principal requesting authentication. An account is an access label, not definitive proof of a specific human\'s physical identity.',
    details: 'Mentor Meera emphasizes: "The account has its own trail. When looking at a sign-in, separate the account identifier from the person who might be typing at the keyboard."',
    tags: ['Account: FIN-OPS-01', 'UPN Claim', 'Identity Principal', 'Context Anchor'],
  },
  {
    id: 'sign-app-service',
    label: '2. Target Application & Scope',
    sub: 'Microsoft 365 / Corporate Financial ERP',
    badge: 'TARGET RESOURCE',
    description: 'The specific enterprise cloud service, OAuth resource, or internal web portal the sign-in attempt seeks access to.',
    details: 'Meera notes: "Always inspect the targeted application. An attempt on the global finance portal carries far higher risk than an internal printer status query."',
    tags: ['App: Finance ERP', 'OAuth Scope', 'Cloud Tenant', 'Target Context'],
  },
  {
    id: 'sign-device-posture',
    label: '3. Client Device & Compliance Posture',
    sub: 'Device ID: DEV-90812 • Intune Compliant',
    badge: 'DEVICE FINGERPRINT',
    description: 'Client telemetry including browser user-agent, operating system build, Intune device compliance status, and registered hardware certificate GUID.',
    details: 'Meera instructs: "Check whether the sign-in comes from a managed company workstation like BLR-BR-WS-04 or an unmanaged foreign browser."',
    tags: ['Device Posture', 'Intune Compliant', 'Win11 23H2', 'Managed Host'],
  },
  {
    id: 'sign-auth-result',
    label: '4. Authentication Result & Event Code',
    sub: 'AAD STS 50126 / Windows Event 4624 (Type 2)',
    badge: 'VERDICT STATUS',
    description: 'The definitive cryptographically signed outcome of the authentication exchange: Success, Invalid Password, or Conditional Access Policy Block.',
    details: 'Meera teaches: "A successful password check is only step one. We must inspect conditional access rules, risk engine scores, and factor challenges."',
    tags: ['Result: SUCCESS', 'Event ID 4624', 'Status Code 0x0', 'Conditional Access'],
  },
];

// 2. Pillar 2: MFA Factor Evaluation vs The "Successful MFA Trust Fallacy"
export const mfaTrustFallacyNodes: VisualNodeItem[] = [
  {
    id: 'mfa-factor-eval',
    label: '1. Multi-Factor Challenge (MFA Claim)',
    sub: 'FIDO2 WebAuthn / TOTP Authenticator App',
    badge: 'FACTOR VERIFICATION',
    description: 'The secondary authentication proof validating ownership of an authenticator device or cryptographic token beyond the memorized password.',
    details: 'Meera explains: "MFA adds vital friction against automated credential stuffing, but it does not make every successful session unconditionally trustworthy."',
    tags: ['MFA Challenge', 'TOTP App', 'FIDO2 Token', 'Secondary Factor'],
  },
  {
    id: 'mfa-session-theft',
    label: '2. Session Token Hijacking (AiTM Hazard)',
    sub: 'Adversary-in-the-Middle Cookie Extraction',
    badge: 'TOKEN THEFT RISK',
    description: 'Adversaries deploy reverse proxies (Evilginx) to capture the authenticated session cookie (ESTSAUTH) during login, bypassing MFA without cracking the factor.',
    details: 'Meera instructs: "If an adversary steals the session token from memory or a reverse proxy, they inherit the fully authenticated session with zero MFA alarms."',
    tags: ['AiTM Phishing', 'Session Cookie', 'Token Theft', 'MFA Bypass'],
  },
  {
    id: 'mfa-fatigue-attack',
    label: '3. MFA Prompt Bombing & Fatigue Attack',
    sub: 'Spamming 35 Push Notifications at 2:00 AM',
    badge: 'FATIGUE EXPLOIT',
    description: 'Attackers trigger repeated push notifications in rapid succession until a frustrated or sleepy user taps "Approve" just to stop their phone from buzzing.',
    details: 'Meera highlights: "When you see 15 consecutive MFA denials followed by one sudden approval at 2:14 AM, that is prompt fatigue, not normal user behavior."',
    tags: ['Prompt Bombing', 'Fatigue Attack', 'User Coercion', 'High-Risk Trigger'],
  },
  {
    id: 'mfa-meera-doctrine',
    label: '4. Meera\'s MFA Trust Fallacy Doctrine',
    sub: 'Strong Controls ≠ Immunity from Misuse',
    badge: 'MEERA DOCTRINE',
    description: 'Core SOC identity rule: Never assume an account is safe simply because multi-factor authentication was satisfied. Always inspect post-auth behavioral telemetry.',
    details: 'Meera concludes: "Strong controls still need careful investigation of unusual activity. Verify what happens after the sign-in door unlocks."',
    tags: ['Meera Doctrine', 'Zero Blind Trust', 'Post-Auth Triage', 'Identity Discipline'],
  },
];

// 3. Pillar 3: IP Geolocation Reality vs The "Impossible Travel Fallacy"
export const impossibleTravelRealityNodes: VisualNodeItem[] = [
  {
    id: 'geo-ip-label',
    label: '1. IP Geolocation Database Estimation',
    sub: 'MaxMind GeoIP: Bengaluru (106.51.x.x)',
    badge: 'ESTIMATED LOCATION',
    description: 'Third-party commercial databases map public IP prefixes to estimated cities based on ISP registration records, regional registries, and BGP announcements.',
    details: 'Meera cautions: "A location label looks far away on your dashboard. Does that prove impossible travel? No. IP geolocation is an approximation, not GPS coordinates."',
    tags: ['GeoIP Database', 'ISP Allocation', 'City Approximation', 'Zero GPS Precision'],
  },
  {
    id: 'geo-vpn-proxy',
    label: '2. Corporate Egress VPNs & Cloud Proxies',
    sub: 'Zscaler / Cloudflare Warp Corporate PoP',
    badge: 'EGRESS ROUTING',
    description: 'Modern enterprises route remote laptop traffic through centralized secure web gateways, causing a user in Chennai to appear as exiting an IP in Frankfurt or Mumbai.',
    details: 'Meera explains: "A remote finance employee connects to the corporate VPN hub. Suddenly their IP jumps 4,000 km while they sit at their kitchen desk."',
    tags: ['Corporate VPN', 'Secure Web Gateway', 'Centralized Egress', 'Route Masking'],
  },
  {
    id: 'geo-velocity-math',
    label: '3. Velocity Calculation vs IP Churn Reality',
    sub: '1,400 km in 6 Minutes (Calculated Velocity)',
    badge: 'VELOCITY METRIC',
    description: 'Detection rules flag impossible travel when two logins occur with a distance-to-time ratio exceeding commercial jet speeds (>900 km/h).',
    details: 'Meera instructs: "Velocity math calculates speed across estimated points. But if the second IP belongs to a cellular carrier or VPN, the distance was simulated by routing."',
    tags: ['Velocity Check', 'Flight Speed Math', 'Cellular Churn', 'False Travel'],
  },
  {
    id: 'geo-meera-verdict',
    label: '4. Meera\'s Geolocation Restraint Rule',
    sub: 'Corroborate Device Fingerprint & ASN Context',
    badge: 'ANALYST RESTRAINT',
    description: 'Professional SOC triage rule: Corroborate impossible travel alarms by cross-checking device cookies, client OS fingerprints, user confirmation, and Autonomous System Numbers (ASN).',
    details: 'Meera concludes: "Never close an alert or isolate a laptop solely on a map pin. Check the ASN, device posture, and user schedule before declaring a breach."',
    tags: ['ASN Verification', 'Device Corroboration', 'Analyst Restraint', 'Truth vs Map'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M11-U1-C2 (Access changes the stakes)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Standard User vs Privileged Admin Roles & Blast Radius
export const privilegeBlastRadiusNodes: VisualNodeItem[] = [
  {
    id: 'priv-standard-user',
    label: '1. Standard User Account (FIN-OPS-01)',
    sub: 'Role: Branch Finance Operations Clerk',
    badge: 'STANDARD PRIVILEGE',
    description: 'Limited role permissions restricted to branch financial accounting spreadsheets, local user documents, and internal operational portals.',
    details: 'Meera notes: "FIN-OPS-01 operates with standard medium integrity. It cannot touch domain controllers, install drivers, or modify Active Directory schemas."',
    tags: ['FIN-OPS-01', 'Medium Integrity', 'Branch Access', 'Contained Scope'],
  },
  {
    id: 'priv-admin-account',
    label: '2. Domain Administrator Account (ADM-SRV-09)',
    sub: 'Role: Tier 0 Identity Infrastructure Admin',
    badge: 'TIER-0 PRIVILEGED',
    description: 'Elevated administrative account holding DCSync permissions, Active Directory replication rights, and full read-write across all domain controllers.',
    details: 'Meera explains: "ADM-SRV-09 holds the crown keys. A compromise here jeopardizes Kerberos ticket generation, golden ticket attacks, and enterprise wipeout."',
    tags: ['ADM-SRV-09', 'Tier 0 Domain Admin', 'High Blast Radius', 'Crown Jewels'],
  },
  {
    id: 'priv-blast-comparison',
    label: '3. Blast Radius & Impact Comparison',
    sub: 'Branch Document Loss vs Domain Collapse',
    badge: 'IMPACT GRADIENT',
    description: 'Quantifying potential adversary destruction: standard user compromise causes localized document exposure; administrator compromise causes total enterprise takeover.',
    details: 'Meera instructs: "Privilege affects potential impact. But remember: privileged activity is not automatically malicious, and standard accounts are not harmless."',
    tags: ['Blast Radius', 'Impact Gradient', 'Localized vs Global', 'Risk Assessment'],
  },
  {
    id: 'priv-meera-boundary',
    label: '4. Meera\'s Least Privilege Doctrine',
    sub: 'Separate Admin Accounts & Clean Management Host',
    badge: 'MEERA DOCTRINE',
    description: 'System administrators must never check email or browse the public web using privileged credentials. Standard day-to-day accounts must remain strictly segregated.',
    details: 'Meera emphasizes: "An administrator should never open an invoice email under ADM-SRV-09. Tiered separation prevents email phishing from escalating to domain compromise."',
    tags: ['Account Separation', 'PAW Workstation', 'Zero Web/Email Admin', 'Tiered Defense'],
  },
];

// 5. Pillar 2: Impact-Based Triage vs Account Title Bias
export const impactBasedTriageNodes: VisualNodeItem[] = [
  {
    id: 'imp-standard-valuable',
    label: '1. High-Impact Standard Account Activity',
    sub: 'FIN-OPS-01 Exporting Wire Transfer Database',
    badge: 'HIGH DATA IMPACT',
    description: 'A standard non-administrative account accessing, copying, or modifying sensitive high-value financial transaction records or customer PII.',
    details: 'Meera asks: "Should you ignore FIN-OPS-01 because it isn\'t an administrator? Absolutely not. It has direct access to money, invoices, and wire transfers."',
    tags: ['Wire Transfer', 'Data Exfiltration', 'Business Impact', 'Non-Admin Value'],
  },
  {
    id: 'imp-admin-routine',
    label: '2. Low-Risk Routine Administrative Action',
    sub: 'ADM-SRV-09 Restarting Print Spooler at 03:00',
    badge: 'ROUTINE ELEVATED',
    description: 'An elevated domain administrator performing pre-approved change-window maintenance, scheduled health checks, or automated log rotations.',
    details: 'Meera points out: "Just because an account has Admin in its name does not mean every action is an emergency. Contextual change tickets define legitimacy."',
    tags: ['Change Window', 'Routine Task', 'Pre-Approved', 'Low Anomaly Score'],
  },
  {
    id: 'imp-triage-matrix',
    label: '3. 3-Dimensional Triage Impact Matrix',
    sub: 'Account Role × Data Sensitivity × Context',
    badge: 'TRIAGE FORMULA',
    description: 'Systematic ranking formula evaluating alerts based on actual potential operational loss rather than raw security title or alarm loudness.',
    details: 'Meera teaches: "Rank incoming alerts using stated impact policy, evidence, and confidence rather than account title alone."',
    tags: ['Impact Formula', 'Data Sensitivity', 'Operational Policy', 'Balanced Triage'],
  },
  {
    id: 'imp-meera-verdict',
    label: '4. Meera\'s Title Bias Warning',
    sub: 'Attackers Target Business Processes, Not Just Admins',
    badge: 'ANALYST INSIGHT',
    description: 'Adversaries intentionally target branch accountants and payroll officers to commit CEO fraud, invoice redirection, and swift wire theft without needing domain admin.',
    details: 'Meera concludes: "The adversary doesn\'t always want to be Domain Admin. Often, they just want to be the accountant with wire transfer privileges."',
    tags: ['BEC Attack', 'Invoice Redirection', 'Business Logic Theft', 'Objective Focus'],
  },
];

// 6. Pillar 3: Active Directory Identity Directory Reality vs Verified Owners
export const identityDirectoryTruthNodes: VisualNodeItem[] = [
  {
    id: 'dir-ldap-record',
    label: '1. Active Directory LDAP Object Record',
    sub: 'sAMAccountName: FIN-OPS-01 • Title: Clerk',
    badge: 'DIRECTORY DATA',
    description: 'The directory entry displaying assigned department, organizational unit (OU), direct manager, and security group memberships.',
    details: 'Meera asks: "What if account ownership records are outdated? Directory information is context to check, not unquestionable divine truth."',
    tags: ['LDAP Attribute', 'OU: BranchFinance', 'Group Membership', 'Static Directory'],
  },
  {
    id: 'dir-stale-gap',
    label: '2. Stale Directory Records & Shadow Privileges',
    sub: 'Transferred 8 Months Ago • Groups Never Revoked',
    badge: 'STALE HAZARD',
    description: 'Common enterprise reality: employees transfer departments, contractors leave, or emergency temporary admin permissions are forgotten and never revoked.',
    details: 'Meera instructs: "When you see an account created for a contractor 2 years ago still active in Domain Admins, flag the discrepancy immediately."',
    tags: ['Stale Record', 'Permission Creep', 'Forgotten Groups', 'Audit Finding'],
  },
  {
    id: 'dir-owner-verify',
    label: '3. Approved Identity Owner Verification Route',
    sub: 'Escalation to Lead Identity Administrator',
    badge: 'APPROVED VERIFICATION',
    description: 'Routing identity uncertainty directly to the designated Identity Owner or HR Business Partner to verify employment status and approved access scope.',
    details: 'Meera teaches: "If directory records clash with observed behavior, do not guess. Contact the approved identity administrator to verify ground truth."',
    tags: ['Identity Owner', 'HR Verification', 'Zero Guesswork', 'Approved Protocol'],
  },
  {
    id: 'dir-meera-seal',
    label: '4. Unit 1 Identity Monitoring Seal',
    sub: 'Certified Identity Telemetry & Contextual Triage',
    badge: 'UNIT 1 CERTIFIED',
    description: 'Senior Analyst Meera certifies the apprentice\'s mastery of identity monitoring, MFA evaluation, impossible travel restraint, and blast-radius analysis.',
    details: 'Meera concludes: "Outstanding work, Apprentice Analyst. You now understand how to trace an account\'s trail without falling for title bias or map illusions."',
    tags: ['Unit 1 Complete', 'Identity Mastered', 'Restraint Certified', 'Ready for Unit 2'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M11-U2-C1 (The reported message arrives)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Reported Message Artifact Anatomy
export const emailArtifactAnatomyNodes: VisualNodeItem[] = [
  {
    id: 'art-preserved-eml',
    label: '1. Preserved Message Artifact (.eml)',
    sub: 'Artifact ID: MSG-2026-904 • SHA-256 Sealed',
    badge: 'FORENSIC ARTIFACT',
    description: 'The raw, complete RFC822/RFC5322 email message preserved in an immutable training evidence container. Not an active inbox email link.',
    details: 'Mentor Meera notes: "The report is a new lead. We must preserve the raw message artifact and verify whether it relates to the endpoint activity."',
    tags: ['MSG-2026-904', 'Raw .eml File', 'Forensic Artifact', 'Immutable Evidence'],
  },
  {
    id: 'art-display-spoof',
    label: '2. Display Name Spoofing Dissection',
    sub: '"Ananya (FinCorp Lead)" <billing@external-scam.xyz>',
    badge: 'DECEPTIVE HEADER',
    description: 'The visible display name claims to be a trusted mentor or executive, while the actual RFC5322 mailbox address points to an untrusted external adversary domain.',
    details: 'Meera asks: "The sender display name matches a colleague. Is that enough? No. Compare addresses, reply-to, and trusted headers."',
    tags: ['Display Name Spoof', 'Deceptive Avatar', 'External Domain', 'Social Engineering'],
  },
  {
    id: 'art-envelope-rfc5321',
    label: '3. RFC5321 Envelope Sender vs RFC5322 From:',
    sub: 'SMTP MAIL FROM: vs Visible Header From:',
    badge: 'HEADER ANATOMY',
    description: 'The envelope sender (RFC5321 MAIL FROM) used by mail transfer agents for bounce notifications compared against the visible header (RFC5322 From:) displayed in email clients.',
    details: 'Meera teaches: "Attackers forge the visible From: header to deceive users. The mail server\'s Received: hops tell where the packet actually came from."',
    tags: ['RFC5321 vs RFC5322', 'Mail Transfer Hops', 'Received: Headers', 'Header Forensic'],
  },
  {
    id: 'art-meera-dissection',
    label: '4. Meera\'s Header Dissection Doctrine',
    sub: 'Read Headers Bottom-to-Top (Hop Traceability)',
    badge: 'MEERA DOCTRINE',
    description: 'Forensic rule: Read email Received: headers from the bottom (originating client) to the top (your enterprise receiving mail gateway) to trace authentic route hops.',
    details: 'Meera instructs: "The bottom Received: line reveals the true originating IP address. Everything written by the sender before their first MTA can be forged."',
    tags: ['Hop Analysis', 'Bottom-Up Reading', 'Originating IP', 'MTA Telemetry'],
  },
];

// 8. Pillar 2: Misleading Hyperlinks & Sneaky Reply-To Traps
export const misleadingLinksTrapsNodes: VisualNodeItem[] = [
  {
    id: 'link-visible-anchor',
    label: '1. Visible Anchor Text (The Bait)',
    sub: 'https://portal.cdac.in/finance/payroll-q3',
    badge: 'ANCHOR DISPLAY',
    description: 'The blue underlined text visible to the human victim, formatted to look identical to an authentic corporate intranet portal.',
    details: 'Meera cautions: "A link displays a familiar corporate URL. But visible anchor text is pure HTML markup—anyone can write whatever they want there."',
    tags: ['Anchor Text', 'HTML Markup', 'Visual Deception', 'The Bait'],
  },
  {
    id: 'link-hidden-url',
    label: '2. Hidden Hyperlink Destination (The Trap)',
    sub: 'http://auth-fincorp-update.ru/credential-harvest',
    badge: 'ACTUAL TARGET',
    description: 'The actual underlying href attribute: `href="http://auth-fincorp-update.ru/..."` designed to harvest credentials or drop second-stage payloads.',
    details: 'Meera teaches: "Hover, do not click. In the security console, inspect the raw href attribute to uncover the real destination server."',
    tags: ['Raw href Attribute', 'Hidden URL', 'Credential Harvest', 'Adversary Server'],
  },
  {
    id: 'link-replyto-mismatch',
    label: '3. Deceptive Reply-To Header Mismatch',
    sub: 'From: hr@cdac.in • Reply-To: evil-drop@proton.me',
    badge: 'REPLY-TO TRAP',
    description: 'When the victim clicks "Reply", the email client silently routes the response to an external adversary mailbox instead of the apparent sender.',
    details: 'Meera explains: "A mismatched Reply-To header is a major red flag. It routes user responses directly into the adversary\'s personal inbox."',
    tags: ['Reply-To Mismatch', 'Silent Routing', 'Harvest Mailbox', 'Major Red Flag'],
  },
  {
    id: 'link-meera-defanging',
    label: '4. Meera\'s Link Defanging Standard',
    sub: 'Defang URLs: hxxps[://]auth-scam[.]ru/login',
    badge: 'DEFANG PROTOCOL',
    description: 'Standard SOC practice: Defang all suspicious URLs in tickets and documentation by replacing `http` with `hxxp` and brackets around dots `[.]` to prevent accidental clicks.',
    details: 'Meera concludes: "Never paste a clickable malicious link into a case ticket. Defanging preserves the exact text while neutralizing click hazards."',
    tags: ['URL Defanging', 'hxxps[://]', 'Accidental Click Zero', 'Ticket Hygiene'],
  },
];

// 9. Pillar 3: SPF, DKIM, and DMARC Verification Breakdown
export const spfDkimDmarcEngineNodes: VisualNodeItem[] = [
  {
    id: 'auth-spf-breakdown',
    label: '1. SPF (Sender Policy Framework)',
    sub: 'DNS TXT: v=spf1 ip4:198.51.100.0/24 -all',
    badge: 'IP AUTHORIZATION',
    description: 'Validates whether the sending mail server\'s IP address is explicitly authorized in the domain\'s public DNS SPF TXT record.',
    details: 'Meera explains: "SPF checks server IP. If an attacker sends mail from their own server claiming to be fincorp.com, SPF evaluates to FAIL."',
    tags: ['SPF Record', 'IP Validation', 'DNS TXT', 'Envelope Check'],
  },
  {
    id: 'auth-dkim-breakdown',
    label: '2. DKIM (DomainKeys Identified Mail)',
    sub: 'RSA Cryptographic Signature Header',
    badge: 'CRYPTO INTEGRITY',
    description: 'A cryptographic public-key signature attached to the message header, proving the email body and critical headers were not tampered with in transit.',
    details: 'Meera instructs: "DKIM signs the message content. It verifies that the email was not modified by an intermediary proxy between sender and receiver."',
    tags: ['DKIM Signature', 'Public-Key Crypto', 'Transit Integrity', 'Tamper-Proof'],
  },
  {
    id: 'auth-dmarc-breakdown',
    label: '3. DMARC (Domain Alignment & Policy)',
    sub: 'p=reject / p=quarantine • Alignment Check',
    badge: 'ALIGNMENT POLICY',
    description: 'Ensures that the visible RFC5322 `From:` domain strictly aligns with the verified SPF and/or DKIM domains, directing receivers on how to treat failures.',
    details: 'Meera notes: "DMARC bridges SPF and DKIM. Without DMARC, an attacker can pass SPF with their own domain while spoofing the visible From header."',
    tags: ['DMARC Policy', 'Domain Alignment', 'p=reject', 'Enforcement'],
  },
  {
    id: 'auth-meera-fallacy',
    label: '4. Meera\'s Authentication Fallacy Warning',
    sub: 'Authentication Pass ≠ Harmless Intent',
    badge: 'CRITICAL DOCTRINE',
    description: 'Fundamental security principle: An attacker who registers `secure-billing-fincorp.xyz` will configure flawless SPF, DKIM, and DMARC passes. Auth pass only proves sender identity, not benign intent.',
    details: 'Meera warns: "Do SPF, DKIM, or DMARC passing guarantee a harmless message? No! Use these checks as evidence, not as a universal safety stamp."',
    tags: ['Meera Fallacy', 'Pass ≠ Safe', 'Attacker DMARC', 'Intent vs Identity'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M11-U2-C2 (Handle the message without becoming the victim)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Preserved Message Quarantine & Non-Clickable Sandboxing
export const quarantineDefangedSandboxNodes: VisualNodeItem[] = [
  {
    id: 'quar-vault-isolation',
    label: '1. Forensic Quarantine Vault',
    sub: 'Isolated .eml Storage • Non-Execution',
    badge: 'VAULT ISOLATION',
    description: 'Suspicious email removed from the user\'s inbox and preserved in an isolated forensic storage vault with zero execution rights.',
    details: 'Meera emphasizes: "The original message is preserved; links are rendered non-clickable and attachments remain unopened."',
    tags: ['Forensic Vault', 'Inbox Eviction', 'Non-Execution', 'Safe Preservation'],
  },
  {
    id: 'quar-unclickable-links',
    label: '2. Non-Clickable Sanitized Viewer',
    sub: 'De-activated Hyperlinks & Stripped Scripts',
    badge: 'SANITIZED VIEW',
    description: 'Training viewer renders the email body in plain text or sanitized HTML, stripping JavaScript, tracking pixels, and active redirect anchors.',
    details: 'Meera instructs: "In the approved training viewer, you can read the attacker\'s lure without triggering their remote tracking web beacon."',
    tags: ['Sanitized Viewer', 'Tracking Neutralized', 'No Script Execution', 'Safe Reading'],
  },
  {
    id: 'quar-defanged-attachments',
    label: '3. Unopened Attachment Confinement',
    sub: 'Quarterly_Invoice_Q3.xlsm (VBA Macros)',
    badge: 'ATTACHMENT LOCK',
    description: 'Malicious macro-enabled spreadsheet kept locked inside the vault. Never double-clicked or opened in standard desktop Office applications.',
    details: 'Meera asks: "Can I open the attachment on my personal laptop to see what it does? No! That bypasses both safety controls and data-handling rules."',
    tags: ['Macro Hazard', 'VBA Locked', 'Zero Desktop Opening', 'Forensic Containment'],
  },
  {
    id: 'quar-meera-discipline',
    label: '4. Meera\'s Non-Victim Discipline',
    sub: 'Gather Useful Evidence Without Executing Content',
    badge: 'SAFETY DISCIPLINE',
    description: 'Core L1 analyst discipline: You do not need to run malware to analyze its metadata, inspect its headers, extract its hashes, and protect your organization.',
    details: 'Meera concludes: "You can gather high-quality evidence without becoming the next victim. Discipline separates analysts from casualties."',
    tags: ['Analyst Safety', 'Zero Execution', 'Metadata Power', 'Professional Discipline'],
  },
];

// 11. Pillar 2: Data Leakage Hazard: Public Lookup Violation
export const dataLeakagePreventionNodes: VisualNodeItem[] = [
  {
    id: 'leak-internal-confidential',
    label: '1. Internal Proprietary Email Content',
    sub: 'Employee PII, Budget Spreadsheets, Passwords',
    badge: 'SENSITIVE DATA',
    description: 'Real-world reported emails often contain confidential corporate proposals, private employee phone numbers, internal network hostnames, or pasted credentials.',
    details: 'Meera warns: "Check data-handling policies. A reported email may contain legitimate sensitive customer contracts or financial projections."',
    tags: ['Proprietary Data', 'Customer PII', 'Internal Spreadsheets', 'Confidential Scope'],
  },
  {
    id: 'leak-public-virustotal',
    label: '2. Public Multi-Scanner Leakage Hazard',
    sub: 'Public VirusTotal / Any.Run Upload Trap',
    badge: 'DATA LEAK HAZARD',
    description: 'Uploading full `.eml` files, proprietary PDFs, or customer invoices to public scanners allows thousands of subscribers worldwide to download the entire document.',
    details: 'Meera instructs: "Do not upload sensitive messages publicly. Attackers and researchers monitor public sandbox feeds for leaked corporate documents."',
    tags: ['Public Sandbox', 'Data Leakage', 'Public VirusTotal', 'Breach Hazard'],
  },
  {
    id: 'leak-approved-internal',
    label: '3. Approved Internal Training / SOC Sandbox',
    sub: 'Private Air-Gapped / Enterprise Detonation',
    badge: 'APPROVED PIPELINE',
    description: 'Enterprise detonation sandbox governed by commercial privacy agreements, ensuring uploaded samples are never shared with public repositories.',
    details: 'Meera teaches: "Use approved internal tools. If public intelligence is needed, search for the cryptographic file hash, never the raw document."',
    tags: ['Internal Sandbox', 'Private Detonation', 'Hash Lookup Only', 'NDA Compliant'],
  },
  {
    id: 'leak-meera-law',
    label: '4. Meera\'s Data Protection Law',
    sub: 'Lookup Requests Themselves Can Disclose Information',
    badge: 'MEERA LAW',
    description: 'Fundamental threat intelligence rule: Querying unique internal URLs or domain tokens in external search engines tips off adversaries and leaks corporate infrastructure.',
    details: 'Meera emphasizes: "Searching for a secret token in a public search engine alerts the adversary that their phishing campaign was discovered."',
    tags: ['Adversary Tip-Off', 'OPSEC Discipline', 'Search Privacy', 'Data Protection'],
  },
];

// 12. Pillar 3: Sanitized Artifact Inspection & L1-to-L2 Malware Escalation
export const attachmentHashEscalationNodes: VisualNodeItem[] = [
  {
    id: 'att-hash-sha256',
    label: '1. Attachment SHA-256 Hash Extraction',
    sub: 'SHA-256: 7f9b4c2084e... (Calculated Safely)',
    badge: 'CRYPTOGRAPHIC HASH',
    description: 'Calculates the unique SHA-256 cryptographic digest of the attachment binary directly from disk storage without executing a single instruction of code.',
    details: 'Meera explains: "A hash identifies the exact byte sequence of the file. You can search threat intelligence databases for this hash safely."',
    tags: ['SHA-256 Digest', 'Safe Calculation', 'Byte Identification', 'Zero Execution'],
  },
  {
    id: 'att-metadata-pe',
    label: '2. Macro & OLE Static Metadata Analysis',
    sub: 'VBA Project • Auto_Open Hook • OLE Streams',
    badge: 'STATIC METADATA',
    description: 'Static inspection reveals suspicious embedded strings, document creation timestamps, hidden sheets, and macro auto-run hooks without opening Excel.',
    details: 'Meera teaches: "Static tools parse the document format. We observe `Auto_Open` and suspicious obfuscated strings without launching the Excel engine."',
    tags: ['Auto_Open Hook', 'OLE Streams', 'Static Inspection', 'Macro Indicators'],
  },
  {
    id: 'att-l2-escalation',
    label: '3. L1-to-L2 Specialized Escalation Package',
    sub: 'Artifact ID MSG-2026-904 • Preserved Dossier',
    badge: 'TIER-2 ESCALATION',
    description: 'The L1 analyst prepares a structured handover package: artifact identifier, observed headers, extracted hashes, and specific request for dynamic malware analysis.',
    details: 'Meera asks: "If deeper attachment analysis is needed, what should L1 do? Escalate with the preserved artifact and relevant observations to Tier 2."',
    tags: ['Tier 2 Handover', 'MSG-2026-904', 'Observation Package', 'Malware Lab'],
  },
  {
    id: 'att-meera-signoff',
    label: '4. Unit 2 Email Security Sign-Off',
    sub: 'Certified Email Dissection & Safe Artifact Custody',
    badge: 'UNIT 2 CERTIFIED',
    description: 'Mentor Meera certifies the apprentice\'s mastery of email triage, header analysis, link defanging, data leakage prevention, and safe artifact escalation.',
    details: 'Meera concludes: "Superb triage, Apprentice Analyst. You handled the weaponized message cleanly, preserved evidence, and prevented data leakage."',
    tags: ['Unit 2 Complete', 'Email Triage Certified', 'Artifact Preserved', 'Ready for Unit 3'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M11-U3-C1 (Outside information, carefully used)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Threat Intelligence IOC Taxonomy (David Bianco's Pyramid of Pain)
export const threatIntelPyramidNodes: VisualNodeItem[] = [
  {
    id: 'pyr-trivial-hashes',
    label: '1. Trivial Level: File Hashes (MD5, SHA-256)',
    sub: 'Pyramid Base: Easy to Detect, Easy to Evade',
    badge: 'TRIVIAL (PAIN: NONE)',
    description: 'Cryptographic file hashes provide exact matching, but adversaries change a single harmless byte or recompile code to generate completely new hashes.',
    details: 'Meera teaches: "File hashes are trivial. A single byte change creates a new hash. Useful for exact match, but fragile against modifications."',
    tags: ['Pyramid: Hashes', 'MD5 / SHA-256', 'Fragile Indicator', 'Zero Adversary Pain'],
  },
  {
    id: 'pyr-easy-network',
    label: '2. Easy Level: IP Addresses & Domain Names',
    sub: 'Pyramid Mid-Tier: Fast to Block, Fast to Rotate',
    badge: 'EASY / SIMPLE PAIN',
    description: 'IP addresses and domain names are straightforward to block at firewalls and DNS sinks, but adversaries easily spin up new VPS hosts and dynamic domains.',
    details: 'Meera explains: "Blocking an IP is simple. But adversaries lease hundreds of disposable cloud nodes. It inflicts only minor inconvenience on them."',
    tags: ['Pyramid: IPs & Domains', 'Firewall Block', 'Dynamic DNS', 'Disposable Nodes'],
  },
  {
    id: 'pyr-tough-ttps',
    label: '3. Tough Level: Tools & TTPs (MITRE ATT&CK)',
    sub: 'Pyramid Peak: Difficult to Evade, Maximum Pain',
    badge: 'TOUGH (MAXIMUM PAIN)',
    description: 'Detecting adversary behavioral Tactics, Techniques, and Procedures (TTPs) forces the attacker to completely redesign their attack campaign.',
    details: 'Meera instructs: "When you detect LOLBIN process injection or pass-the-hash techniques, the adversary must spend weeks re-engineering their toolset."',
    tags: ['Pyramid: TTPs', 'MITRE ATT&CK', 'Behavioral Defense', 'Maximum Pain'],
  },
  {
    id: 'pyr-meera-synthesis',
    label: '4. Meera\'s Pyramid Application Doctrine',
    sub: 'Layer Indicators from Hashes to Behaviors',
    badge: 'MEERA DOCTRINE',
    description: 'Comprehensive SOC doctrine: Use file hashes for immediate containment, network IOCs for boundary filtering, and TTP detection for enduring defense.',
    details: 'Meera emphasizes: "David Bianco\'s Pyramid of Pain reminds us: do not stop at blocking an IP. Look for the behavioral tradecraft behind the indicator."',
    tags: ['Pyramid Synthesis', 'Layered Defense', 'David Bianco Model', 'Enduring TTPs'],
  },
];

// 14. Pillar 2: IOC Provenance, Source Reliability & Freshness Half-Life
export const iocProvenanceFreshnessNodes: VisualNodeItem[] = [
  {
    id: 'fresh-active-c2',
    label: '1. Fresh Active Observable (30 Minutes Ago)',
    sub: 'High Operational Urgency • Active Beacon',
    badge: 'FRESH TELEMETRY',
    description: 'An indicator reported by peer financial institutions or active telemetry within the past hour. High operational relevance for live containment.',
    details: 'Meera notes: "An active C2 domain observed in the wild 20 minutes ago carries maximum relevance. The adversary\'s server is likely still listening."',
    tags: ['Fresh Indicator', 'Active 30m', 'High Urgency', 'Live Campaign'],
  },
  {
    id: 'fresh-stale-recycled',
    label: '2. Stale Indicator & Recycled Cloud IP',
    sub: 'Reported 14 Months Ago • IP Now Benign ISP',
    badge: 'STALE HAZARD',
    description: 'Cloud VPS IP addresses churn rapidly. A threat feed listing an IP from 2024 may now belong to an innocent university or municipal water board.',
    details: 'Meera warns: "A threat feed entry from 14 months ago is stale. Blocking recycled cloud IPs causes collateral business damage to innocent services."',
    tags: ['Stale Indicator', 'Recycled IP', 'Cloud Churn', 'False Alarm Hazard'],
  },
  {
    id: 'fresh-confidence-decay',
    label: '3. Indicator Half-Life & Confidence Decay',
    sub: 'Dynamic IPs: Days • Hashes: Years',
    badge: 'CONFIDENCE DECAY',
    description: 'Different IOC types decay at different rates: dynamic IP addresses lose relevance in days; immutable file hashes remain valid for years.',
    details: 'Meera teaches: "Treat indicator confidence like a decaying radioactive half-life. The older an IP indicator gets, the less confident you can be."',
    tags: ['Indicator Half-Life', 'Confidence Decay', 'IP Churn vs Hash', 'Freshness Rating'],
  },
  {
    id: 'fresh-meera-rule',
    label: '4. Meera\'s Provenance Rule',
    sub: 'A Threat Feed Without a Timestamp Is a Rumor',
    badge: 'ANALYST RULE',
    description: 'Strict evidentiary standard: An analyst note must always record the source intelligence vendor, extraction timestamp, and confidence rating.',
    details: 'Meera concludes: "Indicators of compromise are clues used in context. Sources vary in quality, scope, and freshness. Always document provenance."',
    tags: ['Provenance Standard', 'Vendor Scope', 'Timestamp Critical', 'Evidence Discipline'],
  },
];

// 15. Pillar 3: Sourced Intelligence Note Standards
export const sourcedIntelligenceNoteNodes: VisualNodeItem[] = [
  {
    id: 'note-provenance-source',
    label: '1. Intelligence Source & Vendor Provenance',
    sub: 'MISP Community Feed / Talos / Internal FinCorp',
    badge: 'SOURCE PROVENANCE',
    description: 'Explicit identification of where the threat indicator was discovered: internal SOC telemetry, sector-specific ISAC, or commercial intelligence feed.',
    details: 'Meera asks: "What should accompany a reputation result in your note? The source, lookup time, relevant finding, and limits on confidence."',
    tags: ['MISP Feed', 'FS-ISAC', 'Source Vendor', 'Intelligence Provenance'],
  },
  {
    id: 'note-utc-timestamp',
    label: '2. UTC Lookup Timestamp (Immutable Anchor)',
    sub: 'Timestamp: 2026-10-15T09:42:18Z',
    badge: 'UTC TIMESTAMP',
    description: 'Exact coordinated universal timestamp of the lookup query, establishing that the threat intelligence status was verified contemporaneously.',
    details: 'Meera instructs: "Record the exact UTC timestamp. If the domain changes ownership tomorrow, your ticket proves what the intelligence showed at triage time."',
    tags: ['2026-10-15T09:42:18Z', 'UTC Standard', 'Audit Anchor', 'Contemporaneous'],
  },
  {
    id: 'note-finding-verdict',
    label: '3. Qualified Finding & Observation Statement',
    sub: 'High Confidence Cobalt Strike Team Server',
    badge: 'QUALIFIED FINDING',
    description: 'Clear, concise finding statement describing the indicator\'s known association, observed port, and campaign signature without speculative hyperbole.',
    details: 'Meera emphasizes: "A copied red label is not a complete intelligence assessment. State what the observable does and what campaign it supports."',
    tags: ['Cobalt Strike C2', 'Qualified Finding', 'No Hyperbole', 'Precise Statement'],
  },
  {
    id: 'note-meera-limits',
    label: '4. Explicit Confidence Limits & Uncertainty',
    sub: 'Confidence: HIGH in C2 • UNCERTAIN in Attribution',
    badge: 'CONFIDENCE LIMITS',
    description: 'Professional intelligence discipline: Distinguishing between what is known with high certainty versus what remains an unverified hypothesis.',
    details: 'Meera concludes: "Professional notes state the boundaries of knowledge clearly. Acknowledging uncertainty protects the organization from rash decisions."',
    tags: ['Confidence Boundaries', 'Honest Uncertainty', 'Defensible Notes', 'SOC Professionalism'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M11-U3-C2 (A lead becomes a qualified finding)
// -----------------------------------------------------------------------------

// 16. Pillar 1: Multi-Source Correlation: Verified Links vs Hypotheses
export const multiSourceCorrelationNodes: VisualNodeItem[] = [
  {
    id: 'cor-verified-solid',
    label: '1. Solid Lines: Verified Evidentiary Links',
    sub: 'Email Gateway Logs → Workstation BLR-BR-WS-04',
    badge: 'VERIFIED LINK (SOLID)',
    description: 'Connections backed by concrete cryptographic hashes, matched IP sockets, and identical message IDs across gateway logs and endpoint EDR.',
    details: 'Mentor Meera notes: "The email, endpoint, and network artifacts appear with solid lines for verified links and dotted lines for hypotheses."',
    tags: ['Solid Line', 'Verified Link', 'Concrete Logs', 'Corroborated Fact'],
  },
  {
    id: 'cor-hypothesis-dotted',
    label: '2. Dotted Lines: Investigative Hypotheses',
    sub: 'Did the Phishing Attachment Launch PowerShell?',
    badge: 'HYPOTHESIS (DOTTED)',
    description: 'Plausible operational theories linking two events that occur close in time, pending corroborating parent-process lineage or memory artifacts.',
    details: 'Meera asks: "Can I say the email caused the endpoint activity? Only if supplied evidence supports that relationship. Otherwise state it as a lead requiring investigation."',
    tags: ['Dotted Line', 'Hypothesis', 'Requires Proof', 'Honest Inquiry'],
  },
  {
    id: 'cor-cross-source-fusion',
    label: '3. Multi-Source Fusion: Email + EDR + Network',
    sub: 'Aligning Mail Gateway + Process Tree + Zeek PCAP',
    badge: 'TELEMETRY FUSION',
    description: 'Synthesizing disparate telemetry streams into a single cohesive narrative: email delivery at 09:14, attachment write at 09:15, and outbound connection at 09:16.',
    details: 'Meera explains: "When three independent sensors corroborate the exact same sequence, your confidence shifts from hypothesis to qualified finding."',
    tags: ['Telemetry Fusion', 'Multi-Source', 'Cohesive Narrative', 'Corroboration'],
  },
  {
    id: 'cor-meera-discipline',
    label: '4. Meera\'s Link Demarcation Doctrine',
    sub: 'Never Turn a Dotted Line into a Solid Line Without Proof',
    badge: 'MEERA DOCTRINE',
    description: 'Gold standard of forensic reporting: Clearly separate verified facts from working theories in every incident ticket and executive presentation.',
    details: 'Meera emphasizes: "Do not invent causal links just to tell a dramatic story. Let the evidence dictate where solid lines are drawn."',
    tags: ['Forensic Integrity', 'Zero Fabricated Drama', 'Proof Standard', 'Analyst Ethics'],
  },
];

// 17. Pillar 2: Shared Infrastructure & The IP Attribution Trap
export const sharedInfrastructureTrapNodes: VisualNodeItem[] = [
  {
    id: 'trap-shared-cdn-ip',
    label: '1. Shared Cloud & CDN Edge Infrastructure',
    sub: 'Cloudflare / AWS CloudFront / Akamai Edge IP',
    badge: 'SHARED IP REALITY',
    description: 'A single public IP address routes traffic for hundreds of thousands of unrelated domains, from Fortune 500 banks to legitimate blogs and malicious phishing lures.',
    details: 'Meera cautions: "Shared infrastructure can be used by many parties. An address overlap does not identify an attacker by itself."',
    tags: ['Shared CDN', 'CloudFront IP', 'Multi-Tenant', 'Shared Infrastructure'],
  },
  {
    id: 'trap-attribution-fallacy',
    label: '2. The "Attribution Fallacy" (Wild Leaps)',
    sub: 'Assuming Shared IP Proves Nation-State APT',
    badge: 'ATTRIBUTION TRAP',
    description: 'Rookie mistake: discovering an IP associated with a Russian or Chinese hosting provider and prematurely attributing the incident to an advanced state-sponsored group.',
    details: 'Meera instructs: "Cybercriminals intentionally host lures on American AWS or European Hetzner servers. Infrastructure location is not actor nationality."',
    tags: ['Attribution Trap', 'Wild Leap Fallacy', 'Hosting ≠ Actor', 'Avoid Speculation'],
  },
  {
    id: 'trap-disciplined-pivot',
    label: '3. Disciplined Technical Pivoting',
    sub: 'Pivoting on TLS Cert Hashes & Custom URIs',
    badge: 'DISCIPLINED PIVOT',
    description: 'Advanced analyst pivot technique: Instead of pivoting on a generic shared IP, pivot on unique SSL certificate serial numbers, JARM fingerprints, or specific URI paths.',
    details: 'Meera teaches: "Pivoting on a shared IP returns 10,000 unrelated websites. Pivoting on a unique TLS certificate hash isolates the adversary\'s actual cluster."',
    tags: ['JARM Fingerprint', 'TLS Serial Pivot', 'URI Path Match', 'Precision Pivoting'],
  },
  {
    id: 'trap-meera-restraint',
    label: '4. Meera\'s Attribution Restraint Rule',
    sub: 'Focus on Immediate Containment, Not Espionage Movies',
    badge: 'ANALYST RESTRAINT',
    description: 'Operational focus: An L1 analyst\'s mission is to scope the local impact, stop the threat, and preserve evidence—not to write speculative geopolitical attribution thrillers.',
    details: 'Meera concludes: "The case gains useful context without a fabricated attribution story. Focus on protecting the network in front of you."',
    tags: ['Operational Focus', 'Zero Geopolitical Drama', 'Containment Priority', 'Restraint Rule'],
  },
];

// 18. Pillar 3: The "No Reputation Hit ≠ Benign" Doctrine & Module 11 Sign-Off
export const intelDossierSignoffNodes: VisualNodeItem[] = [
  {
    id: 'dos-no-hit-doctrine',
    label: '1. "No Reputation Hit ≠ Benign" Doctrine',
    sub: 'Zero Vendor Hits Simply Means "Unknown / Unseen"',
    badge: 'CRITICAL DOCTRINE',
    description: 'Core intelligence principle: Fresh zero-day payloads and targeted spear-phishing domains have a score of 0/70 on threat feeds because no one has submitted them yet.',
    details: 'Meera asks: "Does \'no reputation hit\' equal \'benign\'? No! It means this source did not provide a relevant hit. Unfamiliarity is not innocence."',
    tags: ['No Hit ≠ Benign', 'Zero-Day Reality', 'Threat Feed Limits', 'Absence of Evidence'],
  },
  {
    id: 'dos-evidence-summary',
    label: '2. Consolidated Intelligence Dossier #2026-881',
    sub: 'Identity Sign-In + Sanitized MSG-2026-904 Artifact',
    badge: 'MASTER DOSSIER',
    description: 'The completed investigation file integrating verified sign-in telemetry, sanitized message headers, defanged link targets, and sourced threat intelligence notes.',
    details: 'Meera reviews: "Look at your completed dossier: every observation is anchored to UTC time, every lead is qualified, and data leakage was prevented."',
    tags: ['Case #2026-881', 'Intelligence Dossier', 'Anchored Facts', 'Complete Record'],
  },
  {
    id: 'dos-tier2-handoff',
    label: '3. Professional Handoff to Tier 2 & CSIRT',
    sub: 'Actionable Leads, Verified Facts & Clear Boundaries',
    badge: 'TIER-2 HANDOFF',
    description: 'The L1 apprentice transfers the synthesized intelligence package to Senior Incident Responders with clear demarcations between proven facts and open hypotheses.',
    details: 'Meera instructs: "When Tier 2 receives this docket, they can immediately run memory analysis and boundary containment without repeating your work."',
    tags: ['Clean Handoff', 'Actionable Leads', 'Tier 2 Readiness', 'Seamless Escalation'],
  },
  {
    id: 'dos-meera-master-seal',
    label: '4. Mentor Meera\'s Master Supervisory Seal',
    sub: 'Module 11 Certified: Identity, Email & Threat Intelligence',
    badge: 'SUPERVISORY SEAL',
    description: 'Senior Threat Intelligence Analyst Meera inspects the apprentice\'s work, verifies professional rigor, and stamps the official CDAC supervisory seal on Module 11.',
    details: 'Meera concludes: "Outstanding work, Apprentice Analyst. You have mastered identity trails, email header dissection, safe artifact handling, and disciplined threat intelligence. You are ready for SOAR automation in Module 12."',
    tags: ['Supervisory Sign-Off', 'Module 11 Certified', 'Meera Master Seal', 'Ready for Module 12'],
  },
];

// =============================================================================
// COMPLETE MODULE 11 NODES MAPPING DICTIONARY
// =============================================================================
export const module11NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: The account has its own trail
  'm11-signin-telemetry-stream': signinTelemetryStreamNodes,
  'm11-mfa-trust-fallacy': mfaTrustFallacyNodes,
  'm11-impossible-travel-reality': impossibleTravelRealityNodes,

  // Chapter 2: Access changes the stakes
  'm11-privilege-blast-radius': privilegeBlastRadiusNodes,
  'm11-impact-based-triage': impactBasedTriageNodes,
  'm11-identity-directory-truth': identityDirectoryTruthNodes,

  // Chapter 3: The reported message arrives
  'm11-email-artifact-anatomy': emailArtifactAnatomyNodes,
  'm11-misleading-links-traps': misleadingLinksTrapsNodes,
  'm11-spf-dkim-dmarc-engine': spfDkimDmarcEngineNodes,

  // Chapter 4: Handle the message without becoming the victim
  'm11-quarantine-defanged-sandbox': quarantineDefangedSandboxNodes,
  'm11-data-leakage-prevention': dataLeakagePreventionNodes,
  'm11-attachment-hash-escalation': attachmentHashEscalationNodes,

  // Chapter 5: Outside information, carefully used
  'm11-threat-intel-pyramid': threatIntelPyramidNodes,
  'm11-ioc-provenance-freshness': iocProvenanceFreshnessNodes,
  'm11-sourced-intelligence-note': sourcedIntelligenceNoteNodes,

  // Chapter 6: A lead becomes a qualified finding
  'm11-multi-source-correlation': multiSourceCorrelationNodes,
  'm11-shared-infrastructure-trap': sharedInfrastructureTrapNodes,
  'm11-intel-dossier-signoff': intelDossierSignoffNodes,
};
