'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 07: WINDOWS & LINUX SECURITY MONITORING — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Ravi (Host Security Mentor / Senior SOC Mentor)
// Motto: "Event identifiers are signposts, not complete explanations. The operating system changes, but evidence discipline does not."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M07-U1-C1 (Windows event log basics)
// -----------------------------------------------------------------------------

// 1. Pillar 1: Channel Architecture & Provider Separation
export const channelProvidersNodes: VisualNodeItem[] = [
  {
    id: 'chan-security-evtx',
    label: '1. Security Channel (Security.evtx)',
    sub: 'Audit Provider & Access Control',
    badge: 'CORE AUDIT REPOSITORY',
    description: 'Captures authentication successes and failures, privilege rights assignment, process creation (4688), and security policy changes.',
    details: 'Mentor Ravi points out: "Security.evtx is protected by strict OS access controls; non-admin users cannot read or tamper with this channel."',
    tags: ['Path: winevt\\Logs\\Security.evtx', 'Audit Provider', 'Event 4624/4625', 'Privileged Access'],
  },
  {
    id: 'chan-system-evtx',
    label: '2. System Channel (System.evtx)',
    sub: 'Kernel, Drivers & Service Control',
    badge: 'OS INFRASTRUCTURE CHANNEL',
    description: 'Records kernel driver loading, service starts/stops, system crashes (BSOD), shutdown events (1074), and service installations (7045).',
    details: 'Ravi instructs: "When an attacker installs a persistence mechanism via a new Windows service, look in System.evtx, not Security.evtx."',
    tags: ['Path: winevt\\Logs\\System.evtx', 'Service Control Manager', 'Event 7045', 'Driver Loading'],
  },
  {
    id: 'chan-app-evtx',
    label: '3. Application Channel (Application.evtx)',
    sub: 'Userland Software & Fault Telemetry',
    badge: 'USERLAND SOFTWARE CHANNEL',
    description: 'Captures application crashes (Event 1000), database server exceptions, and commercial software diagnostics.',
    details: 'Ravi explains: "Application fault logs frequently capture the first signs of memory corruption or exploit attempts against user software."',
    tags: ['Path: winevt\\Logs\\Application.evtx', 'App Faults', 'Event 1000', 'Crash Telemetry'],
  },
  {
    id: 'chan-provider-anchor',
    label: '4. Provider & Manifest Anchor',
    sub: 'Source Provider Defines Schema',
    badge: 'SCHEMA GOVERNANCE',
    description: 'Every event record belongs to an explicit publishing provider that dictates the binary XML schema and variable definitions.',
    details: 'Ravi doctrine: "Never interpret an event identifier without its publishing provider. The provider defines what the parameters mean."',
    tags: ['Publisher Provider', 'XML Schema', 'Event Provider GUID', 'Ravi Doctrine'],
  },
];

// 2. Pillar 2: Event ID Signpost Doctrine
export const eventIdSignpostsNodes: VisualNodeItem[] = [
  {
    id: 'sign-naked-id',
    label: '1. Naked Event ID (The Signpost)',
    sub: 'EventID 4625 Alone (Incomplete)',
    badge: 'SIGNPOST ONLY ⚠️',
    description: 'Knowing only the number "4625" provides less than 20% of the operational picture. It indicates a logon failure occurred, nothing more.',
    details: 'Learner asks: "Can an event number alone tell the whole story?" Ravi: "No. You also need the operation, account, host, time, and context."',
    tags: ['Naked ID: 4625', 'Incomplete Data', 'Category Signpost', 'Context Required'],
  },
  {
    id: 'sign-full-hud',
    label: '2. Full Parameter Context HUD',
    sub: 'Operation + Account + Host + Time',
    badge: 'COMPLETE TELEMETRY HUD',
    description: 'The complete record reveals: Subject NULL SID, Target account "ramesh", Workstation "BLR-BR-WS-04", and Caller Process "winlogon.exe".',
    details: 'Ravi confirms: "Now you have an actionable event record. You know exactly which machine was targeted, which identity was tested, and how."',
    tags: ['Target: ramesh', 'Host: BLR-BR-WS-04', 'LogonType: 2', 'Complete Context'],
  },
  {
    id: 'sign-substatus-code',
    label: '3. SubStatus Code Diagnostic',
    sub: '0xC000006A: Bad Password vs Locked',
    badge: 'DIAGNOSTIC PRECISION',
    description: 'The SubStatus code provides the ground truth reason: 0xC000006A means wrong password; 0xC0000234 means account locked out; 0xC0000072 means disabled.',
    details: 'Ravi notes: "A SubStatus code distinguishes a mistyped password from a disabled contractor account being probed by an adversary."',
    tags: ['SubStatus: 0xC000006A', 'Bad Password', 'Status: 0xC000006D', 'Root Cause Clue'],
  },
  {
    id: 'sign-ravi-doctrine',
    label: '4. Ravi\'s Signpost Doctrine',
    sub: 'Numbers Direct Attention, Context Solves',
    badge: 'HOST MONITORING PRINCIPLE',
    description: 'Ravi affirms: "Event identifiers are signposts that tell you where to look; full parameter fields tell you what actually happened."',
    details: 'A disciplined analyst never files an incident ticket citing only an Event ID without detailing the operation and participating accounts.',
    tags: ['Signpost Principle', 'Ravi Doctrine', 'Evidence Discipline', 'No Premature Panic'],
  },
];

// 3. Pillar 3: Provider Integrity & Homograph Number Traps
export const providerIntegrityNodes: VisualNodeItem[] = [
  {
    id: 'integ-sys-104',
    label: 'Provider A: Eventlog-System (Event 104)',
    sub: 'CRITICAL: System Audit Log Cleared!',
    badge: 'HIGH-SEVERITY ADVERSARY TAMPER 🚨',
    description: 'Provider "Microsoft-Windows-Eventlog" emitting Event 104 indicates an administrator or attacker actively cleared the System audit log.',
    details: 'This is a red-alert indicator of defense evasion: an adversary attempting to destroy forensic evidence of driver or service manipulation.',
    tags: ['Provider: Eventlog', 'Event 104', 'Audit Log Cleared', 'Defense Evasion T1070'],
  },
  {
    id: 'integ-print-104',
    label: 'Provider B: PrintService (Event 104)',
    sub: 'BENIGN: Invoice.pdf Printed on Floor 2',
    badge: 'ROUTINE BUSINESS TELEMETRY 📄',
    description: 'Provider "Microsoft-Windows-PrintService/Operational" emitting Event 104 indicates a document was successfully sent to the branch office printer.',
    details: 'Ravi demonstrates: "The number 104 in PrintService has zero security implication; it records an employee printing an expense form."',
    tags: ['Provider: PrintService', 'Event 104', 'Document Printed', 'Routine Business'],
  },
  {
    id: 'integ-collision-trap',
    label: 'The Homograph Number Collision Trap',
    sub: 'Identical Numbers, Polar Opposite Meaning',
    badge: 'ANALYST PITFALL',
    description: 'Treating two records as identical because their Event IDs match is a grave error. Event numbers are scoped strictly to their publishing provider.',
    details: 'Learner: "Should two records from different providers be treated as identical because numbers look familiar?" Ravi: "No. Verify the provider."',
    tags: ['ID Collision', 'Vendor Scoped', 'Provider Verification', 'Trap Avoidance'],
  },
  {
    id: 'integ-provider-check',
    label: 'Provider Verification Checklist',
    sub: 'Provider Name + Channel + Task Category',
    badge: 'VERIFICATION STANDARD ✓',
    description: 'Ravi\'s rule: "Verify the Provider Name, the Channel Name, and the Task Category before declaring what any event number means."',
    details: 'This prevents junior analysts from creating false emergency alerts when routine application components generate familiar-looking numbers.',
    tags: ['Provider Name', 'Channel Scope', 'Task Category', 'Standard Verified'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M07-U1-C2 (Logon and account activity)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Logon Type Matrix (Interactive Triage)
export const logonMatrixNodes: VisualNodeItem[] = [
  {
    id: 'logon-type-2',
    label: '1. Logon Type 2: Interactive (Console)',
    sub: 'Physical Keyboard & Display at Desk',
    badge: 'LOCAL CONSOLE LOGON',
    description: 'User physically sat in front of BLR-BR-WS-04, typed credentials on the keyboard, and unlocked the local Windows desktop.',
    details: 'Ravi explains: "Type 2 requires physical presence at the machine unless paired with remote virtual machine console tools."',
    tags: ['LogonType: 2', 'Physical Keyboard', 'Console Unlock', 'Local Session'],
  },
  {
    id: 'logon-type-3',
    label: '2. Logon Type 3: Network (SMB / RPC)',
    sub: 'Remote Share or API Connection',
    badge: 'REMOTE NETWORK CONNECTION',
    description: 'Connection arrived across the Ethernet network over ports 445 (SMB) or 135 (RPC) to access shared files or remote registries.',
    details: 'Ravi warns: "Adversaries moving laterally with PsExec or WMI generate Type 3 network logons, not interactive console sessions."',
    tags: ['LogonType: 3', 'Port 445 (SMB)', 'Lateral Movement', 'Network Session'],
  },
  {
    id: 'logon-type-10',
    label: '3. Logon Type 10: RemoteInteractive (RDP)',
    sub: 'Terminal Services over Port 3389',
    badge: 'REMOTE DESKTOP (RDP)',
    description: 'User initiated an encrypted GUI desktop session across the network using Remote Desktop Protocol (port 3389).',
    details: 'Ravi notes: "Type 10 provides full remote GUI desktop control. Always verify the source IP address in the RDP event record."',
    tags: ['LogonType: 10', 'Port 3389 (RDP)', 'Terminal GUI', 'Remote IP Tracked'],
  },
  {
    id: 'logon-context-audit',
    label: '4. Context-Driven Logon Triage',
    sub: 'LogonType Defines the Attack Surface',
    badge: 'SURFACE EVALUATION',
    description: 'A Type 2 logon at 02:45 AM means someone physically touched the keyboard; a Type 10 means remote external or lateral access.',
    details: 'Ravi confirms: "The LogonType field transforms an abstract Event 4624 into a physical or network vector you can investigate."',
    tags: ['Vector Evaluation', 'Physical vs Remote', 'Attack Surface', 'Ravi Standard'],
  },
];

// 5. Pillar 2: Event 4672 Privileged Activity Context
export const privilegeContextNodes: VisualNodeItem[] = [
  {
    id: 'priv-4672-event',
    label: '1. Event 4672: Special Privileges Assigned',
    sub: 'Administrator Rights Allocated at Logon',
    badge: 'PRIVILEGE ALLOCATION EVENT',
    description: 'Emitted immediately following Event 4624 when an authenticated account belongs to the local or Domain Administrators group.',
    details: 'Ravi asks: "Does 4672 prove an attacker escalated privileges?" Learner: "No. It occurs during legitimate privileged logons."',
    tags: ['EventID: 4672', 'Admin Rights', 'SeDebugPrivilege', 'Elevation Context'],
  },
  {
    id: 'priv-assigned-rights',
    label: '2. Assigned Sensitive Privileges',
    sub: 'SeDebug, SeBackup, SeSecurity, SeTcb',
    badge: 'SUPERUSER CAPABILITIES',
    description: 'Lists the exact kernel capabilities granted: SeDebugPrivilege (read memory of any process), SeBackupPrivilege (bypass ACL file reads).',
    details: 'Ravi notes: "These privileges allow an administrator or attacker to dump LSASS memory or bypass standard file read permissions."',
    tags: ['SeDebugPrivilege', 'SeBackupPrivilege', 'LSASS Access', 'Kernel Privileges'],
  },
  {
    id: 'priv-benign-admin',
    label: '3. Baseline Context A: Scheduled Backup',
    sub: 'SVC-BACKUP at 01:00 AM (Approved Ticket)',
    badge: 'BENIGN ADMINISTRATIVE BASELINE ✓',
    description: 'Automated backup service account logging on during pre-approved maintenance hours with change ticket CHG-8910 attached.',
    details: 'Ravi instructs: "This Event 4672 matches known operational baselines; document the change ticket reference and close without alarm."',
    tags: ['Account: SVC-BACKUP', 'Ticket: CHG-8910', 'Baseline Admin', 'Benign TP'],
  },
  {
    id: 'priv-suspect-finance',
    label: '4. Baseline Context B: Case #2026-881 Sequence',
    sub: 'Account ramesh at 02:46 AM (No Ticket)',
    badge: 'INVESTIGATIVE ANOMALY 🔍',
    description: 'Finance employee account ramesh receiving Event 4672 rights at 02:46 AM without any scheduled change ticket or admin duty.',
    details: 'Ravi affirms: "Investigate the account and associated activity. 4672 itself isn\'t the crime, but the context here demands triage."',
    tags: ['Account: ramesh', 'Time: 02:46 AM', 'Zero Change Ticket', 'Case #2026-881'],
  },
];

// 6. Pillar 3: The Account Owner vs Person Identity Doctrine
export const identityDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'ident-cred-success',
    label: '1. Credential Authentication Success',
    sub: 'Event 4624 Proves Valid Password Was Used',
    badge: 'AUTHENTICATION OUTCOME',
    description: 'Domain Controller BLR-DC-01 confirms that the password hash supplied for account ramesh matched Active Directory records.',
    details: 'Ravi: "Does a successful logon prove the legitimate account owner was responsible?" Learner: "No. It proves authentication outcome."',
    tags: ['Account: ramesh', 'Auth: Success (4624)', 'Hash Matched', 'Outcome Verified'],
  },
  {
    id: 'ident-empty-chair',
    label: '2. The Physical Reality: Empty Chair',
    sub: 'Employee Was Asleep in Bed at 02:45 AM',
    badge: 'PHYSICAL GROUND TRUTH',
    description: 'The digital record verified the credential; physical branch badge logs and employee interview prove Ramesh was miles away from Desk 04.',
    details: 'Ravi teaches: "Never write \'Ramesh logged on at 2:45 AM.\' Write \'Account ramesh successfully authenticated at 2:45 AM.\'"',
    tags: ['Physical Presence: Absent', 'Credential Theft', 'Impersonation', 'Ravi Rule'],
  },
  {
    id: 'ident-presence-verify',
    label: '3. Physical Presence Verification',
    sub: 'Branch Turnstile Badge Logs & CCTV',
    badge: 'CORROBORATING RESTRAINT',
    description: 'Analyst cross-checks physical security turnstile logs: Ramesh badged out of the Bengaluru branch at 18:30 IST on October 14.',
    details: 'Ravi affirms: "Physical badge logs provide independent corroboration that separates account credentials from the living human."',
    tags: ['Badge Log: Out 18:30', 'Independent Sensor', 'Physical Separation', 'Dossier Integrity'],
  },
  {
    id: 'ident-ravi-rule',
    label: '4. Ravi\'s Linguistic Precision Rule',
    sub: 'Accounts Authenticate; People Perform Actions',
    badge: 'FORENSIC HONESTY DOCTRINE',
    description: 'Ravi: "Use precise language even when the event looks familiar. Distinguish digital credentials from biological humans in all reports."',
    details: 'Maintaining this distinction protects innocent employees from wrongful accusations when credentials are stolen by phishing or infostealers.',
    tags: ['Linguistic Precision', 'Account != Person', 'Court Admissible', 'Professional SOC'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M07-U2-C1 (Authentication and system logs)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Linux Distribution Log Geography
export const linuxLogGeographyNodes: VisualNodeItem[] = [
  {
    id: 'geo-auth-log',
    label: '1. Debian / Ubuntu: /var/log/auth.log',
    sub: 'PAM Authentication & SSH Records',
    badge: 'DEBIAN / UBUNTU PATH',
    description: 'Records Pluggable Authentication Module (PAM) sessions, sudo invocations, SSH connections, and cron job authentication on Ubuntu/Debian.',
    details: 'Ravi notes: "On branch web servers running Ubuntu 22.04, this is your primary ground-truth file for authentication auditing."',
    tags: ['Path: /var/log/auth.log', 'Ubuntu / Debian', 'PAM Engine', 'SSH Logins'],
  },
  {
    id: 'geo-secure-log',
    label: '2. RHEL / CentOS / Rocky: /var/log/secure',
    sub: 'Red Hat Enterprise Authentication Log',
    badge: 'RHEL / CENTOS PATH',
    description: 'Serves the exact same authentication purpose as auth.log, but resides at /var/log/secure on Red Hat, CentOS, and Fedora systems.',
    details: 'Learner: "Will every Linux server have the same auth.log path?" Ravi: "No. Use the lab\'s source guide and verify where evidence is recorded."',
    tags: ['Path: /var/log/secure', 'RHEL / Rocky / Fedora', 'Authentication Log', 'Distro Specific'],
  },
  {
    id: 'geo-systemd-journal',
    label: '3. Systemd Binary Journal (journalctl)',
    sub: 'journalctl -u ssh.service -u systemd-logind',
    badge: 'SYSTEMD CENTRALIZED JOURNAL',
    description: 'Modern systemd journal storing structured binary logs at /var/log/journal. Queryable with microsecond precision and unit filters.',
    details: 'Ravi demonstrates: "journalctl -u ssh -S \'2026-10-14 20:00:00\' gives structured, unalterable output even if text logs are rotated."',
    tags: ['journalctl -u ssh', 'Binary Storage', 'Microsecond Precision', 'systemd-journald'],
  },
  {
    id: 'geo-distro-guide',
    label: '4. Ravi\'s Distribution Source Guide',
    sub: 'Verify Logging Subsystem Before Searching',
    badge: 'HOST AUDIT PREPARATION',
    description: 'Ravi instructs: "Before issuing grep commands, verify the OS release via /etc/os-release and check if rsyslog or systemd-journald is active."',
    details: 'Checking the configuration first prevents analysts from mistaking an empty /var/log/auth.log for zero activity when logs are in journald.',
    tags: ['/etc/os-release', 'rsyslog vs journald', 'Verification First', 'Ravi Standard'],
  },
];

// 8. Pillar 2: SSH Authentication Stream Triage
export const sshStreamTriageNodes: VisualNodeItem[] = [
  {
    id: 'ssh-failed-pw',
    label: '1. Failed Password Observable',
    sub: 'Failed password for invalid user admin from 198.51.100.5',
    badge: 'AUTHENTICATION DENIED ❌',
    description: 'External scanner attempted to guess password for non-existent account "admin" over port 42110; SSH daemon rejected the attempt.',
    details: 'Ravi: "A failed password proves the remote attacker was denied entry. It documents an adversarial probe, not a host compromise."',
    tags: ['Event: Failed password', 'Invalid User: admin', 'Source: 198.51.100.5', 'Port: 42110'],
  },
  {
    id: 'ssh-accepted-key',
    label: '2. Accepted PublicKey Observable',
    sub: 'Accepted publickey for deployer from 10.10.10.20: RSA SHA256:...',
    badge: 'AUTHENTICATION GRANTED ✓',
    description: 'Internal automation host 10.10.10.20 successfully authenticated as user "deployer" using a trusted RSA SSH keypair on port 22.',
    details: 'Ravi notes: "Accepted publickey records valid cryptographic authentication. Compare the key fingerprint against approved admin inventory."',
    tags: ['Event: Accepted publickey', 'User: deployer', 'Key Fingerprint', 'Source: 10.10.10.20'],
  },
  {
    id: 'ssh-source-socket',
    label: '3. Source Address & Socket Port Binding',
    sub: 'Ephemeral Source Port & Client Protocol',
    badge: 'NETWORK SOCKET BINDING',
    description: 'Every SSH record binds the remote client IP, remote ephemeral port (e.g. 51220), local server port (22), and SSH protocol version (ssh2).',
    details: 'Ravi explains: "Source sockets link the Linux auth record directly to perimeter firewall state tables and NetFlow records."',
    tags: ['Remote IP: 10.10.10.20', 'Ephemeral Port: 51220', 'Server Port: 22', 'Protocol: ssh2'],
  },
  {
    id: 'ssh-stream-filter',
    label: '4. Evidence Discipline Across Platforms',
    sub: 'The OS Changed, Evidence Discipline Did Not',
    badge: 'CROSS-PLATFORM STANDARD',
    description: 'Ravi affirms: "Whether examining Windows Event 4624 or Linux SSH Accepted publickey, the core questions are identical: who, what, when, where, outcome."',
    details: 'Apprentice applies identical forensic rigor across both operating systems: verify timestamp, account, outcome, and host context.',
    tags: ['Universal Standard', 'Windows vs Linux', 'Evidence Discipline', 'Ravi Principle'],
  },
];

// 9. Pillar 3: The SSH Brute-Force Triage Doctrine
export const sshBruteForceDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'brute-fail-volume',
    label: '1. High-Volume Failure Burst',
    sub: '4,200 Failed Attempts in 10 Minutes',
    badge: 'AUTOMATED SCANNER NOISE ⚠️',
    description: 'Internet-facing servers receive continuous automated dictionary attacks against common usernames (root, admin, test, ubnt).',
    details: 'Ravi asks: "Do several SSH failures alone prove successful access?" Learner: "No. I would need evidence of success or subsequent activity."',
    tags: ['Volume: 4,200 Fails', 'Automated Botnet', 'Dictionary Sweep', 'Internet Noise'],
  },
  {
    id: 'brute-barrier-held',
    label: '2. Scenario A: The Barrier Held',
    sub: 'Zero Accepted Logons; Failures Cease',
    badge: 'ATTACK REPELLED (BENIGN FP) ✓',
    description: 'All 4,200 attempts resulted in "Failed password"; zero "Accepted" records exist; fail2ban or firewall dropped the offending IP.',
    details: 'Ravi instructs: "Document the probe volume, confirm zero accepted sessions, verify fail2ban block, and close without panic."',
    tags: ['Zero Success', 'fail2ban Active', 'Barrier Held', 'Benign Resolution'],
  },
  {
    id: 'brute-accepted-pivot',
    label: '3. Scenario B: The Compromise Pivot',
    sub: '4,199 Fails Followed by 1 Accepted Logon',
    badge: 'CRITICAL INTRUSION CONFIRMED 🚨',
    description: 'At 03:15:10Z, an "Accepted password for support from 198.51.100.5" appears, followed immediately by bash session allocation and sudo usage.',
    details: 'Ravi alarms: "Now you have a critical incident! The attacker successfully guessed the password and established interactive shell access."',
    tags: ['Pivot: Accepted Logon', 'User: support', 'Active Intrusion', 'Immediate Isolation'],
  },
  {
    id: 'brute-discipline-rule',
    label: '4. Ravi\'s Brute-Force Rule',
    sub: 'Always Search for the Subsequent Accepted Event',
    badge: 'INVESTIGATIVE ANCHOR',
    description: 'Ravi doctrine: "Never close an SSH brute force alert by looking only at the failures. Always run a scoped query for \'Accepted\' within the window."',
    details: 'This critical step prevents analysts from dismissing successful password spray attacks as routine failed scanner noise.',
    tags: ['Scoped Accepted Check', 'Ravi Doctrine', 'Spray Detection', 'Forensic Integrity'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M07-U2-C2 (Users, services and sudo activity)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Linux Service Architecture & Systemd Daemons
export const systemdServicesNodes: VisualNodeItem[] = [
  {
    id: 'srv-systemd-pid1',
    label: '1. Systemd Init Engine (PID 1)',
    sub: 'Root Master Coordinator of All Services',
    badge: 'INIT ORCHESTRATOR',
    description: 'Kernel boots systemd as PID 1, which parses unit files in /lib/systemd/system/ and /etc/systemd/system/ to manage background daemons.',
    details: 'Ravi explains: "Systemd ensures services restart upon failure and enforces privilege isolation, resource limits, and cgroups."',
    tags: ['PID: 1', '/sbin/init', 'systemd engine', 'cgroup isolation'],
  },
  {
    id: 'srv-daemon-worker',
    label: '2. Approved Background Daemon (nginx)',
    sub: 'Active Service Running as www-data',
    badge: 'APPROVED PRODUCTION DAEMON ✓',
    description: 'Web server daemon running under dedicated unprivileged account www-data with PID 1420, serving branch internal documentation.',
    details: 'Ravi notes: "Legitimate services run under low-privilege service accounts, not root, to contain potential exploit blast radius."',
    tags: ['Service: nginx.service', 'User: www-data', 'Port: 80/443', 'Approved Daemon'],
  },
  {
    id: 'srv-unit-status',
    label: '3. Service Status & Unit Logs',
    sub: 'systemctl status & journalctl -u',
    badge: 'HEALTH & AUDIT TELEMETRY',
    description: 'Inspecting service lifecycle: Loaded, Active (running), Main PID, memory footprint, and recent startup log lines.',
    details: 'Ravi demonstrates: "systemctl status displays the exact binary path on disk and the command line arguments used to launch the daemon."',
    tags: ['systemctl status', 'Main PID', 'ExecStart Path', 'Memory Footprint'],
  },
  {
    id: 'srv-unapproved-unit',
    label: '4. Unexplained Rogue Service Unit',
    sub: 'miner.service ExecStart=/tmp/.x/kworker',
    badge: 'PERSISTENCE ANOMALY 🚨',
    description: 'A new unit file appeared in /etc/systemd/system/ executing a hidden binary out of /tmp/ with 100% CPU utilization.',
    details: 'Ravi highlights: "Adversaries install custom systemd units for persistence across reboots. Always audit newly created .service files."',
    tags: ['Rogue Unit: miner.service', 'Path: /tmp/.x/', 'Persistence T1543.002', 'High CPU'],
  },
];

// 11. Pillar 2: Sudo Audit Trail Dissection
export const sudoAuditTrailNodes: VisualNodeItem[] = [
  {
    id: 'sudo-caller-user',
    label: '1. Invoking Caller Identity (ramesh)',
    sub: 'User Who Typed sudo in Terminal',
    badge: 'CALLER IDENTITY',
    description: 'The standard unprivileged user account logged into the shell who invoked the sudo command: "sudo: ramesh : TTY=pts/0".',
    details: 'Ravi asks: "Does every use of sudo mean a security incident?" Learner: "No. Check who used it, what command was run, and when."',
    tags: ['Caller: ramesh', 'TTY: pts/0', 'Terminal Session', 'Identity Verified'],
  },
  {
    id: 'sudo-target-root',
    label: '2. Target Execution Identity (root)',
    sub: 'USER=root ; PWD=/home/ramesh',
    badge: 'ELEVATED TARGET IDENTITY',
    description: 'Sudo delegates permissions to execute the requested command under the target account (defaulting to superuser root).',
    details: 'Ravi notes: "The sudo log explicitly records both the original user and the target user, establishing an unbroken audit trail."',
    tags: ['Target: root', 'Working Dir: /home/ramesh', 'Delegated Rights', 'Audit Continuity'],
  },
  {
    id: 'sudo-command-binary',
    label: '3. Executed Command & Arguments',
    sub: 'COMMAND=/usr/bin/cat /etc/shadow',
    badge: 'ACTION OBSERVABLE 🔍',
    description: 'The exact binary executable and argument string invoked under elevated privileges: "COMMAND=/usr/bin/cat /etc/shadow".',
    details: 'Ravi alarms: "Reading /etc/shadow dumps password hashes. Does this match approved IT work, or is it an attacker harvesting credentials?"',
    tags: ['Binary: /usr/bin/cat', 'Target: /etc/shadow', 'Credential Harvest', 'High Severity'],
  },
  {
    id: 'sudo-change-ticket',
    label: '4. Change Ticket Triangulation',
    sub: 'Compare Documented Work vs Unexplained Action',
    badge: 'OPERATIONAL VERIFICATION',
    description: 'Analyst compares the sudo record against IT change tickets: Approved patch CHG-8914 vs completely undocumented midnight credential read.',
    details: 'Ravi affirms: "Sudo is a legitimate administrative tool. Context and change tickets separate standard administration from active intrusions."',
    tags: ['Change Ticket Check', 'Approved vs Rogue', 'Operational Context', 'Ravi Standard'],
  },
];

// 12. Pillar 3: The Command Auditing Visibility Boundary
export const commandVisibilityBoundaryNodes: VisualNodeItem[] = [
  {
    id: 'vis-default-shell-gap',
    label: '1. The Default Shell Visibility Gap',
    sub: 'Bash History is NOT an Audit Trail! ⚠️',
    badge: 'VISIBILITY LIMITATION',
    description: 'Standard Linux shells write commands to ~/.bash_history only upon clean logout. An attacker can unset HISTFILE or kill the terminal to erase history.',
    details: 'Learner: "Can we assume complete command auditing exists on every host?" Ravi: "No. Logging must be configured, available, and understood."',
    tags: ['~/.bash_history', 'Easily Bypassed', 'HISTFILE=0', 'Unreliable Evidence'],
  },
  {
    id: 'vis-auditd-syscalls',
    label: '2. Linux Audit Subsystem (auditd)',
    sub: 'Kernel-Level execve Syscall Auditing',
    badge: 'HARDENED FORENSIC TELEMETRY ✓',
    description: 'The Linux audit daemon (auditd) hooks directly into kernel system calls (execve) to record every spawned binary regardless of shell settings.',
    details: 'Ravi explains: "auditd writes to /var/log/audit/audit.log at the kernel level; even if an attacker deletes their bash history, auditd has the proof."',
    tags: ['Kernel Hook: execve', 'Daemon: auditd', '/var/log/audit/audit.log', 'Immutable Audit'],
  },
  {
    id: 'vis-history-tamper',
    label: '3. Tamper Detection & Evasion Signals',
    sub: 'kill -9, unset HISTFILE, shred',
    badge: 'EVASION INDICATOR',
    description: 'Detecting adversary attempts to suppress command logging: modifications to .bashrc, deleting .bash_history, or running commands with leading spaces.',
    details: 'Ravi warns: "When you see an empty bash history file for an active user, that absence is itself a suspicious forensic finding."',
    tags: ['Evasion T1070.003', 'Empty History', 'Tamper Signal', 'Forensic Clue'],
  },
  {
    id: 'vis-record-limitation',
    label: '4. Ravi\'s Honest Limitation Doctrine',
    sub: 'Record Missing Detail as a Limitation, Never Fabricate',
    badge: 'FORENSIC INTEGRITY PRINCIPLE',
    description: 'Ravi: "Missing detail is a limitation to record in your report, not a reason to fabricate a command history. Professional analysts document what is known and what cannot be seen."',
    details: 'Maintaining transparency about logging visibility gaps allows security engineering teams to deploy auditd where coverage is lacking.',
    tags: ['Honest Limitation', 'Document Visibility Gaps', 'Zero Fabrication', 'Ravi Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M07-U3-C1 (Baseline and unusual activity)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Workstation Baseline Behavioral Profile
export const workstationBaselineProfileNodes: VisualNodeItem[] = [
  {
    id: 'base-operating-hours',
    label: '1. Standard Operating Hours',
    sub: '09:00 - 18:00 IST (Monday - Friday)',
    badge: 'TEMPORAL BASELINE',
    description: 'Historical telemetry establishes that branch workstation BLR-BR-WS-04 is actively used during standard banking hours.',
    details: 'Ravi: "A baseline describes typical or approved activity. Activity at 02:45 AM deviates from temporal baseline and warrants inspection."',
    tags: ['Hours: 09:00 - 18:00 IST', 'Branch Hours', 'Temporal Normal', 'Deviation Trigger'],
  },
  {
    id: 'base-approved-procs',
    label: '2. Approved Workstation Applications',
    sub: 'explorer.exe, chrome.exe, excel.exe, outlook.exe',
    badge: 'PROCESS BASELINE',
    description: 'Finance staff workstations execute standard productivity suites: Microsoft Office, Google Chrome, and branch enterprise ERP clients.',
    details: 'Ravi notes: "Seeing powershell.exe spawn whoami.exe and net.exe on a finance desk is an immediate behavioral deviation from baseline."',
    tags: ['Standard Suite', 'Office / Chrome', 'ERP Client', 'Deviation: LOLBins'],
  },
  {
    id: 'base-service-accounts',
    label: '3. Expected Administrative Accounts',
    sub: 'SVC-SCCM, SVC-EDR-AGENT, SVC-BACKUP',
    badge: 'IDENTITY BASELINE',
    description: 'Known automated service accounts that operate overnight during scheduled patching and inventory collection cycles.',
    details: 'Ravi instructs: "Familiarity with legitimate service accounts prevents confusing automated IT maintenance with adversary activity."',
    tags: ['Service Accounts', 'Overnight Maintenance', 'Approved Inventory', 'Baseline Identity'],
  },
  {
    id: 'base-deviation-signal',
    label: '4. Deviations Direct Attention, Not Verdicts',
    sub: 'Deviations Are Not Automatically Attacks',
    badge: 'ANALYTICAL RESTRAINT',
    description: 'Ravi doctrine: "A deviation from baseline directs your attention, but it is not automatically an attack. Investigate the context before declaring an emergency."',
    details: 'An employee working late on quarter-end finance reports deviates from normal hours, but is completely legitimate.',
    tags: ['Baseline Deviation', 'Attention Guide', 'Context Check', 'Ravi Principle'],
  },
];

// 14. Pillar 2: Windows System Event 7045 (Service Installation)
export const event7045ServiceNodes: VisualNodeItem[] = [
  {
    id: 'svc7045-system-log',
    label: '1. Event 7045: A Service Was Installed',
    sub: 'System.evtx ; Service Control Manager',
    badge: 'SERVICE INSTALLATION EVENT',
    description: 'Windows Service Control Manager logs Event 7045 whenever a new Windows service is registered in the HKLM\\SYSTEM\\CurrentControlSet\\Services registry hive.',
    details: 'Learner: "A new service appeared. Is that enough to call it malicious?" Ravi: "No. Approval and executable context matter."',
    tags: ['EventID: 7045', 'System.evtx', 'SCM Provider', 'Persistence Vector'],
  },
  {
    id: 'svc7045-image-path',
    label: '2. Service File Name (ImagePath)',
    sub: 'Binary Path & Command Arguments',
    badge: 'CRITICAL ARTIFACT FIELD',
    description: 'Specifies the executable binary launched by the service. E.g. "C:\\Program Files\\CrowdStrike\\CSAgent.exe" vs "C:\\Users\\Public\\svchost.exe".',
    details: 'Ravi teaches: "Always inspect the ImagePath: legitimate services reside in Program Files or System32; rogue services frequently hide in Temp or Public folders."',
    tags: ['ImagePath Field', 'Binary Location', 'Temp / Public Path', 'High Fidelity Clue'],
  },
  {
    id: 'svc7045-change-notice',
    label: '3. Change Notice Triangulation (CHG-8911)',
    sub: 'Approved IT Security Agent Update',
    badge: 'VALIDATED CHANGE CONTROL ✓',
    description: 'Comparing Event 7045 against IT Service Management tickets: Approved deployment CHG-8911 authorized the sensor upgrade across branch hosts.',
    details: 'Ravi: "The change notice validates the service name, binary hash, and installation window. Document the ticket and mark benign."',
    tags: ['Change Notice: CHG-8911', 'Approved Update', 'Hash Validated', 'Benign Resolution'],
  },
  {
    id: 'svc7045-rogue-backdoor',
    label: '4. Unmatched Installation: Case #2026-881',
    sub: 'Service: PSEXESVC ImagePath: C:\\Windows\\PSEXESVC.exe',
    badge: 'LATERAL MOVEMENT ARTIFACT 🚨',
    description: 'At 02:46:12Z, Event 7045 records service PSEXESVC installed on BLR-BR-WS-04 without any corresponding change notice or ticket.',
    details: 'Ravi confirms: "This unexplained installation is the smoking gun of remote lateral movement via PsExec. Escalate immediately."',
    tags: ['Service: PSEXESVC', 'Time: 02:46 AM', 'Zero Change Notice', 'Lateral Movement T1021'],
  },
];

// 15. Pillar 3: The Context-Driven Triage Decision
export const contextTriageDecisionNodes: VisualNodeItem[] = [
  {
    id: 'ctx-unexplained-install',
    label: '1. The Unexplained Installation',
    sub: 'PSEXESVC at 02:46 AM on Finance Workstation',
    badge: 'CRITICAL INVESTIGATION FOCUS',
    description: 'Ravi: "Which one needs additional investigation? The unexplained installation, while still documenting the authorized example accurately."',
    details: 'Apprentice focuses investigative effort on the rogue service, extracting parent process trees, network sockets, and initiating user accounts.',
    tags: ['Focus Triage', 'Unexplained Service', 'PSEXESVC', 'Case Priority #1'],
  },
  {
    id: 'ctx-authorized-ticket',
    label: '2. Accurate Documentation of Approved Action',
    sub: 'Do Not Ignore or Delete Authorized Logs',
    badge: 'PROFESSIONAL AUDIT RECORD',
    description: 'Documenting the authorized CHG-8911 sensor installation ensures the case history is comprehensive and prevents duplicate investigation.',
    details: 'Ravi instructs: "A professional analyst accounts for all anomalous telemetry, accurately labeling benign actions to avoid future confusion."',
    tags: ['Comprehensive Log', 'Documented Approval', 'Audit Trail Complete', 'Clean Case File'],
  },
  {
    id: 'ctx-alarm-avoidance',
    label: '3. Avoiding Both Missed Concerns & False Alarm',
    sub: 'Context Prevents Panic and Prevents Blindness',
    badge: 'TRIAGE EQUILIBRIUM',
    description: 'Ravi affirms: "Context helps us avoid both missed concerns and unnecessary alarm. Blind panic shuts down business; lack of context misses attacks."',
    details: 'Context balances technical observables with business realities, creating high-signal, low-noise incident escalations.',
    tags: ['Triage Balance', 'No False Panic', 'No Missed Intrusions', 'Ravi Standard'],
  },
  {
    id: 'ctx-escalation-rule',
    label: '4. Ravi\'s Escalation Decision Rule',
    sub: 'Validate ImagePath + Account + Change Ticket',
    badge: 'DECISION COCKPIT RULE',
    description: 'Three-point verification checklist before escalating service anomalies: 1. Is binary in protected directory? 2. Is account authorized? 3. Does change ticket exist?',
    details: 'If any of the three fail, the alert advances to Tier 2 incident handling with full host artifacts attached.',
    tags: ['3-Point Checklist', 'ImagePath Check', 'Account Check', 'Tier 2 Escalation'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M07-U3-C2 (Cross-check user and host context)
// -----------------------------------------------------------------------------

// 16. Pillar 1: Workstation-to-Timeline Evidence Integration
export const hostTimelineIntegrationNodes: VisualNodeItem[] = [
  {
    id: 'host-verified-links',
    label: '1. Verified Host Entity Links',
    sub: 'Workstation BLR-BR-WS-04 (Desk 04, Finance)',
    badge: 'VERIFIED ENTITY ANCHOR',
    description: 'Host records from BLR-BR-WS-04 join the Case #2026-881 master timeline: physical MAC 00:1A:2B:3C:4D:5E, IP 10.10.20.15, HostGUID {A4F1-992B}.',
    details: 'Ravi teaches: "Combine host observations with identity and service context, using only sources you are authorized to access."',
    tags: ['Host: BLR-BR-WS-04', 'MAC: 00:1A:2B...', 'Finance VLAN 20', 'Verified Entity'],
  },
  {
    id: 'host-unresolved-gaps',
    label: '2. Unresolved Host Questions Marked',
    sub: 'Did PowerShell Execute Encoded Command?',
    badge: 'HONEST GAP BOUNDARY',
    description: 'Host timeline clearly marks what is verified (Event 4688 spawned powershell.exe) versus what remains unverified (command line arguments truncated in EventLog).',
    details: 'Ravi: "Mark unresolved questions with dotted lines in your timeline. Never guess what was inside an unrecorded command line."',
    tags: ['powershell.exe', 'Truncated CommandLine', 'Unresolved Question', 'Forensic Honesty'],
  },
  {
    id: 'host-timeline-track',
    label: '3. Multi-Track Evidence Synchronization',
    sub: 'Domain Controller + Workstation + Network Proxy',
    badge: 'SYNCHRONIZED MULTI-TRACK',
    description: 'Reconstructed chronological sequence: 02:44:12Z DC logon fail &rarr; 02:45:10Z Host console fail &rarr; 02:46:12Z Host PSEXESVC install &rarr; 02:46:25Z Proxy C2 flow.',
    details: 'Ravi praises: "Now the workstation\'s side of the story fits seamlessly into the domain and network timeline."',
    tags: ['Timeline Track', 'DC + Workstation + Proxy', 'UTC Synchronized', 'Case Milestone'],
  },
  {
    id: 'host-cross-source-sync',
    label: '4. Cross-Source Verification Discipline',
    sub: 'No Solo Hypotheses; All Events Corroborated',
    badge: 'DEFENSIVE DISCIPLINE',
    description: 'Every host observable is corroborated across at least two independent sensor records before inclusion in the final escalation dossier.',
    details: 'Apprentice demonstrates mastery of Ravi\'s host forensics principles, transforming raw logs into courtroom-admissible evidence.',
    tags: ['Corroborated Observables', 'Dual-Sensor Rule', 'Court Admissible', 'Ravi Standard'],
  },
];

// 17. Pillar 2: The Communication Playbook & Entity Verification
export const communicationPlaybookNodes: VisualNodeItem[] = [
  {
    id: 'comm-playbook-rules',
    label: '1. The SOC Communication Playbook',
    sub: 'Strict Protocol for Employee & Stakeholder Outreach',
    badge: 'PLAYBOOK GOVERNANCE',
    description: 'Learner asks: "Can I ask the account owner to explain every log line directly?" Ravi: "No. Follow the communication playbook."',
    details: 'Direct, uncoordinated communication by junior analysts can cause panic, tip off an insider adversary, or destroy evidence on the endpoint.',
    tags: ['Communication Playbook', 'No Direct DM', 'Chain of Command', 'Operational Security'],
  },
  {
    id: 'comm-shift-lead-gate',
    label: '2. Shift Lead & HR Authorization Gate',
    sub: 'Shift Lead Ananya & Branch IT Coordinator',
    badge: 'SUPERVISORY GATEWAY',
    description: 'All employee contact must be coordinated through the Shift Lead and Branch HR/IT manager using pre-approved interview templates.',
    details: 'Ravi confirms: "The playbook ensures inquiries are professional, legally compliant, and non-accusatory."',
    tags: ['Shift Lead Gate', 'HR Coordination', 'Pre-Approved Template', 'Legal Compliance'],
  },
  {
    id: 'comm-anti-tipping-off',
    label: '3. Anti-Tipping-Off Safeguard',
    sub: 'Prevent Adversary Detection & Evidence Wiping',
    badge: 'COUNTER-INTELLIGENCE DEFENSE',
    description: 'If an adversary has hijacked Ramesh\'s session, sending a message to Ramesh on Teams: "Did you run PsExec?" alerts the attacker to wipe logs immediately.',
    details: 'Ravi warns: "Uncoordinated contact alerts the adversary that they are detected, triggering them to deploy ransomware or wipe hard drives."',
    tags: ['Anti-Tipping-Off', 'Threat Awareness', 'Prevent Wiping', 'OpSec Defense'],
  },
  {
    id: 'comm-verified-outreach',
    label: '4. Verified Multi-Channel Verification',
    sub: 'Voice Call to Branch Desk Phone + Badge Audit',
    badge: 'VERIFIED REACH-OUT ✓',
    description: 'Supervised verification: Shift Lead calls the branch office landline or verifies physical turnstile gate records independently.',
    details: 'Ravi affirms: "This rigorous verification confirmed Ramesh was safely off-shift without exposing our ongoing investigation."',
    tags: ['Landline Call', 'Physical Badge Audit', 'Supervised Contact', 'Case Integrity'],
  },
];

// 18. Pillar 3: Scoped Host Summary & Dossier Handoff
export const scopedHostSummaryNodes: VisualNodeItem[] = [
  {
    id: 'summ-host-id-check',
    label: '1. Host Identifier Discrepancy Check',
    sub: 'BLR-BR-WS-04 vs BLR-DC-01 Audit Mismatch',
    badge: 'ENTITY RESOLUTION AUDIT',
    description: 'Ravi asks: "What should you do if the host identifier disagrees with the alert\'s label?" Learner: "Flag the mismatch and verify it before merging evidence."',
    details: 'Apprentice verifies that the alert label pointed to the Domain Controller, but the physical source was workstation BLR-BR-WS-04.',
    tags: ['Identifier Check', 'Label vs Source', 'Mismatch Flagged', 'Entity Resolution'],
  },
  {
    id: 'summ-scoped-boundaries',
    label: '2. Scoped Host Summary Dossier',
    sub: 'Case #2026-881 Technical Package',
    badge: 'SCOPED CASE DOSSIER',
    description: 'Concise, high-fidelity technical summary: Host name, OS version, MAC/IP pair, Event 7045 PSEXESVC details, and zero unverified assumptions.',
    details: 'Ravi commends: "We have strengthened the case by checking identities and bounding scope, not just collecting more logs."',
    tags: ['Scoped Dossier', 'Zero Bloat', 'Technical Facts', 'Case #2026-881'],
  },
  {
    id: 'summ-unrelated-excluded',
    label: '3. Unrelated Server Noise Excluded',
    sub: 'Filter Out Routine Cluster Health & Cron Jobs',
    badge: 'FORENSIC RESTRAINT ✓',
    description: 'Apprentice deliberately excludes unrelated Linux database server cron jobs and print spooler errors from the case file.',
    details: 'Ravi instructs: "Keeping unrelated server activity outside the case prevents overwhelming senior responders with irrelevant noise."',
    tags: ['Noise Filtering', 'Relevance Boundary', 'Clean File', 'Forensic Discipline'],
  },
  {
    id: 'summ-ravi-signoff',
    label: '4. Mentor Ravi\'s Official Sign-Off',
    sub: 'Host Investigation Complete; Ready for Module 08',
    badge: 'SIGNED & SEALED ✓',
    description: 'Official supervisory sign-off: Case #2026-881 host investigation is certified with verified entity links, clean scope, and precise language.',
    details: 'The apprentice analyst graduates Module 07 with deep host forensics maturity, prepared for Network Security Monitoring in Module 08.',
    tags: ['Supervisory Sign-Off', 'Mentor Ravi', 'Host Forensics Mastered', 'Next: Module 08'],
  },
];

// =============================================================================
// COMPLETE MODULE 07 NODES LOOKUP MAP
// =============================================================================
export const module07NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: M07-U1-C1 (Windows event log basics)
  'm07-channel-providers': channelProvidersNodes,
  'm07-eventid-signposts': eventIdSignpostsNodes,
  'm07-provider-integrity': providerIntegrityNodes,

  // Chapter 2: M07-U1-C2 (Logon and account activity)
  'm07-logon-matrix': logonMatrixNodes,
  'm07-privilege-context': privilegeContextNodes,
  'm07-identity-doctrine': identityDoctrineNodes,

  // Chapter 3: M07-U2-C1 (Authentication and system logs)
  'm07-linux-log-geography': linuxLogGeographyNodes,
  'm07-ssh-stream-triage': sshStreamTriageNodes,
  'm07-ssh-brute-force-doctrine': sshBruteForceDoctrineNodes,

  // Chapter 4: M07-U2-C2 (Users, services and sudo activity)
  'm07-systemd-services': systemdServicesNodes,
  'm07-sudo-audit-trail': sudoAuditTrailNodes,
  'm07-command-visibility-boundary': commandVisibilityBoundaryNodes,

  // Chapter 5: M07-U3-C1 (Baseline and unusual activity)
  'm07-workstation-baseline-profile': workstationBaselineProfileNodes,
  'm07-event-7045-service': event7045ServiceNodes,
  'm07-context-triage-decision': contextTriageDecisionNodes,

  // Chapter 6: M07-U3-C2 (Cross-check user and host context)
  'm07-host-timeline-integration': hostTimelineIntegrationNodes,
  'm07-communication-playbook': communicationPlaybookNodes,
  'm07-scoped-host-summary': scopedHostSummaryNodes,
};
