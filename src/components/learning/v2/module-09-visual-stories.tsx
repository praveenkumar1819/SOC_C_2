'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 09: ENDPOINT DETECTION & RESPONSE (EDR) — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Ananya (Shift Lead Ananya / EDR & Host Response Specialist)
// Motto: "EDR gathers endpoint telemetry and supports response. Tools extend visibility; they do not eliminate verification. Sequence alone does not establish cause. The button you do not press casually."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M09-U1-C1 (A closer view of the workstation)
// -----------------------------------------------------------------------------

// 1. Pillar 1: EDR Device Inventory & Health Status
export const edrDeviceHealthNodes: VisualNodeItem[] = [
  {
    id: 'edr-device-online',
    label: '1. Active Connected Endpoint (BLR-BR-WS-04)',
    sub: 'Sensor Status: Healthy & Streaming',
    badge: 'HEALTHY AGENT',
    description: 'Workstation BLR-BR-WS-04 actively sending telemetry heartbeats every 15 seconds. Sensor agent version v7.14.2 running with kernel driver hooks active.',
    details: 'Mentor Ananya notes: "When an endpoint is green and healthy, the EDR console receives real-time process, memory, and socket events with sub-second latency."',
    tags: ['Host: BLR-BR-WS-04', 'IP: 10.0.4.21', 'Agent: v7.14.2', 'Heartbeat: 12s ago'],
  },
  {
    id: 'edr-last-seen',
    label: '2. Last-Seen Heartbeat Timestamp',
    sub: 'Microsecond Connectivity Telemetry',
    badge: 'TEMPORAL ANCHOR',
    description: 'Tracks the exact UTC time when the EDR agent last established communication with the central cloud management console.',
    details: 'Ananya instructs: "Always check the last-seen timestamp before assuming a device is quiet. If last-seen was 48 hours ago, your console is looking at ancient history."',
    tags: ['Last Seen: 14:22:15 UTC', 'Connection: TLS 1.3', 'Latency: 14ms', 'Audit Logged'],
  },
  {
    id: 'edr-agent-coverage',
    label: '3. Kernel Driver & Coverage Integrity',
    sub: 'ELAM / Kernel Filter Hook Status',
    badge: 'KERNEL HOOKING',
    description: 'Verifies whether the Early Launch Anti-Malware (ELAM) driver and kernel filter callbacks (PsSetCreateProcessNotifyRoutineEx) are operational without tampering.',
    details: 'Ananya explains: "If an adversary disables the sensor driver or installs a rogue rootkit, the device page may show online while kernel visibility is totally blinded."',
    tags: ['Kernel Driver: Active', 'ELAM Loaded', 'Process Callback: 0x0', 'Tamper Guard'],
  },
  {
    id: 'edr-ananya-doctrine',
    label: '4. Ananya\'s Visibility Precedence Doctrine',
    sub: 'Visibility Precedes Every Conclusion',
    badge: 'ANANYA DOCTRINE',
    description: 'Foundational SOC principle: before concluding that a workstation was uninvolved in an incident, verify that the sensor had active visibility over the target timeframe.',
    details: 'Ananya states: "If a device is listed, is its telemetry necessarily current? No. Check sensor health, connectivity, coverage, and last-seen time before drawing any conclusions."',
    tags: ['Health Verification', 'Visibility First', 'Zero Assumptions', 'Meera & Ananya SOP'],
  },
];

// 2. Pillar 2: The Stale Sensor Visibility Trap
export const staleSensorTrapNodes: VisualNodeItem[] = [
  {
    id: 'stale-offline-status',
    label: '1. Stale / Offline Device State',
    sub: 'Disconnected Sensor (Last Seen 3 Days Ago)',
    badge: 'STALE SENSOR',
    description: 'The workstation went offline on Friday afternoon. The EDR console displays zero alert badges simply because no fresh telemetry has reached the cloud repository.',
    details: 'Ananya warns: "A stale sensor generates zero alerts. But that silence is caused by a communication blackout, not proof that the endpoint is clean!"',
    tags: ['Status: Inactive', 'Last Seen: 72h ago', 'Queue: Unsent Buffers', 'Coverage Gap'],
  },
  {
    id: 'stale-false-comfort',
    label: '2. The "Clean Endpoint" Assumption Trap',
    sub: 'Confusing Missing Telemetry with Clean State',
    badge: 'CRITICAL SOC TRAP',
    description: 'The rookie mistake of closing an incident ticket with "Endpoint verified clean" when the machine was actually powered off or blocked at the network perimeter.',
    details: 'Ananya asks: "Can a stale sensor\'s silence prove the endpoint is clean? No! It may simply lack recent visibility. Silence on a dead wire proves nothing."',
    tags: ['False Reassurance', 'Silent Sensor Fallacy', 'Unverified Clearance', 'Rookie Error'],
  },
  {
    id: 'stale-buffering-lag',
    label: '3. Local Disk Telemetry Buffer',
    sub: 'Offline Event Spooling on Endpoint',
    badge: 'OFFLINE SPOOLING',
    description: 'Modern EDR agents store up to 500 MB of encrypted telemetry on the local SSD while offline, releasing an avalanche of delayed events upon reconnection.',
    details: 'Ananya coaches: "When a disconnected laptop reconnects to the network, prepare for an event storm as its local queue flushes to the cloud console."',
    tags: ['Local Cache: 142 MB', 'Spooling Queue', 'Delayed Ingestion', 'Post-Connect Flood'],
  },
  {
    id: 'stale-verification-gate',
    label: '4. Ananya\'s Sensor Verification Rule',
    sub: 'Confirm Sensor Active Window in Triage Notes',
    badge: 'OPERATIONAL RULE',
    description: 'Every triage handoff note must record: "EDR sensor connectivity confirmed active during incident window 14:00–15:00 UTC with 0% dropped telemetry frames."',
    details: 'Ananya enforces: "Start by checking whether the tool can actually see the relevant activity. If visibility was severed, declare the window unobserved."',
    tags: ['Audit Statement', 'Triage Gate', 'Zero Guesswork', 'Ananya Standard'],
  },
];

// 3. Pillar 3: Continuous Endpoint Telemetry Streams
export const telemetryFunnelNodes: VisualNodeItem[] = [
  {
    id: 'funnel-process-events',
    label: '1. Process Creation & Exit Stream (Sysmon 1/5)',
    sub: 'Parent-Child Execution Lineage',
    badge: 'PROCESS TELEMETRY',
    description: 'Captures every binary launch: image path, command-line arguments, parent process PID, integrity level, user SID, and cryptographic hashes.',
    details: 'Ananya highlights: "Process creation logs are the backbone of EDR. They reveal who executed what, with which flags, and who spawned them."',
    tags: ['Process Launch', 'Command-Line Captured', 'Parent PID Tree', 'Integrity Level'],
  },
  {
    id: 'funnel-file-io',
    label: '2. File System Modification Stream (Sysmon 11/15)',
    sub: 'Disk Write, Rename & File-Drop Auditing',
    badge: 'FILE IO TELEMETRY',
    description: 'Monitors files dropped to disk: download folders, AppData temp directories, alternate data streams (ADS), and ransomware extension tampering.',
    details: 'Ananya notes: "When network traffic is encrypted with TLS 1.3, this file I/O stream captures the exact payload written to disk by the browser."',
    tags: ['Sysmon Event 11', 'File Creation', 'AppData Temp Drop', 'TLS Payload Unmasked'],
  },
  {
    id: 'funnel-socket-binds',
    label: '3. Network Socket Telemetry (Sysmon 3)',
    sub: 'Outbound TCP/UDP Endpoint Connections',
    badge: 'SOCKET TELEMETRY',
    description: 'Records local IP/port, remote IP/port, initiating process PID, and duration for every connection established by endpoint applications.',
    details: 'Ananya connects: "Sysmon Event 3 bridges the host to Mentor Meera\'s network PCAP, proving exactly which PID established the external connection."',
    tags: ['Sysmon Event 3', 'Socket to PID', 'Remote IP/Port', 'Host-Network Bridge'],
  },
  {
    id: 'funnel-cloud-indexer',
    label: '4. EDR Cloud Ingestion & Graph Indexer',
    sub: 'Central Behavioral Graph Database',
    badge: 'GRAPH REPOSITORIES',
    description: 'Streams millions of endpoint events per second into distributed graph databases, building dynamic entity trees and correlation alerts.',
    details: 'Ananya explains: "The cloud platform links processes, files, and sockets into an interactive web so analysts can pivot backwards in time with one click."',
    tags: ['Graph Database', 'Behavioral Model', 'Instant Querying', 'EDR Core Engine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M09-U1-C2 (Related tools, different emphasis)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Traditional Antivirus vs Modern EDR Architecture
export const avVsEdrArchitectureNodes: VisualNodeItem[] = [
  {
    id: 'av-signature-engine',
    label: '1. Traditional Antivirus (AV / EP)',
    sub: 'Static Signature Matching & Quarantine',
    badge: 'STATIC SIGNATURES',
    description: 'Focuses primarily on known malicious files matching static hash dictionaries (MD5/SHA-256) or byte sequences. Actions are binary: allow or block.',
    details: 'Ananya explains: "Traditional AV is a border guard checking passports against a wanted poster. If an attacker uses unknown code or built-in Windows tools, AV stays asleep."',
    tags: ['Hash Signatures', 'Heuristic Signatures', 'Block on Access', 'Point-in-Time'],
  },
  {
    id: 'edr-behavioral-engine',
    label: '2. Modern Endpoint Detection & Response (EDR)',
    sub: 'Continuous Behavioral Recording & Telemetry',
    badge: 'BEHAVIORAL FLIGHT RECORDER',
    description: 'Records all execution events, benign or suspicious. Evaluates behavioral sequences (e.g. Word launching PowerShell &rarr; whoami &rarr; LSASS read) across time.',
    details: 'Ananya contrasts: "EDR is the aircraft flight data recorder. It logs everything so you can reconstruct the flight path, detect living-off-the-land techniques, and isolate the machine."',
    tags: ['Flight Recorder', 'Process Ancestry', 'Living-off-the-Land', 'Remote Containment'],
  },
  {
    id: 'edr-workflow-emphasis',
    label: '3. Investigation & Response Workflows',
    sub: 'Forensic Triage Cockpit',
    badge: 'RESPONSE COCKPIT',
    description: 'EDR arms Level 1 and Level 2 analysts with real-time response actions: network isolation, remote live shell, process termination, and memory acquisition.',
    details: 'Ananya emphasizes: "Antivirus commonly focuses on preventing known files; EDR emphasizes endpoint activity and response workflows."',
    tags: ['Live Response', 'Host Isolation', 'Memory Dump', 'Remediation Actions'],
  },
  {
    id: 'edr-ananya-comparison',
    label: '4. Ananya\'s Architecture Evaluation Rule',
    sub: 'Evaluate Capabilities, Not Marketing Labels',
    badge: 'CRITICAL EVALUATION',
    description: 'Modern vendors blur lines by calling antivirus "Next-Gen EDR". SOC analysts evaluate verified capabilities: kernel hooks, timeline depth, and remote containment.',
    details: 'Ananya instructs: "Are their capabilities completely separate? No. Modern products overlap. Evaluate the actual capabilities rather than relying on the vendor label alone."',
    tags: ['Capability Matrix', 'Label Skepticism', 'Verified Features', 'SOC Engineering'],
  },
];

// 5. Pillar 2: Capability Overlap & The Vendor Label Illusion
export const capabilityOverlapNodes: VisualNodeItem[] = [
  {
    id: 'over-static-scanning',
    label: '1. Shared Static Pre-Execution Scanning',
    sub: 'AMSI & File Hashing at Ingestion',
    badge: 'SHARED DEFENSE',
    description: 'Both modern AV and EDR leverage Antimalware Scan Interface (AMSI) to inspect scripts in memory and compute SHA-256 hashes before execution.',
    details: 'Ananya observes: "When a script arrives in memory, both tools examine the buffer. This is an overlapping capability where prevention and recording meet."',
    tags: ['AMSI Hooking', 'Pre-Execution Check', 'Script Buffer Scan', 'Overlap Zone'],
  },
  {
    id: 'over-memory-protection',
    label: '2. Memory Injection & Exploit Mitigation',
    sub: 'Process Hollowing & DLL Injection Defense',
    badge: 'MEMORY DEFENSE',
    description: 'Detecting in-memory techniques like Reflective DLL Loading, Process Doppelgänging, and shellcode execution without files ever touching the disk.',
    details: 'Ananya explains: "Attackers try to bypass static scanners by injecting directly into memory. Both modern NGAV and EDR monitor API calls like VirtualAllocEx."',
    tags: ['VirtualAllocEx', 'WriteProcessMemory', 'Fileless Attacks', 'Process Injection'],
  },
  {
    id: 'over-threat-intel-cloud',
    label: '3. Cloud Threat Intelligence Feeds',
    sub: 'Global Telemetry Corroboration',
    badge: 'CLOUD LOOKUP',
    description: 'Real-time cloud lookup querying billions of global endpoint events to calculate reputation scores for newly observed executables in milliseconds.',
    details: 'Ananya notes: "If an executable has never been seen across 10 million enterprise machines, cloud ML flags it for elevated behavioral observation."',
    tags: ['Global Cloud ML', 'Prevalence Scoring', 'New Binary Watch', 'Cloud Telemetry'],
  },
  {
    id: 'over-ananya-synthesis',
    label: '4. The Converged Endpoint Suite Reality',
    sub: 'Multi-Layered Single-Agent Deployment',
    badge: 'CONVERGED AGENT',
    description: 'Understanding that enterprise endpoints deploy a single unified agent that performs static pre-execution blocking, behavioral recording, and incident response.',
    details: 'Ananya coaches: "Do not debate AV vs EDR semantics in shift handovers. Document which specific layer detected the anomaly: the static hash or the behavioral chain."',
    tags: ['Unified Agent', 'Layered Attribution', 'Clear Shift Notes', 'Ananya Principle'],
  },
];

// 6. Pillar 3: Universal Detection Fallacy & EDR Blind Spots
export const coverageLimitsNodes: VisualNodeItem[] = [
  {
    id: 'lim-living-off-land',
    label: '1. Living-off-the-Land (LOLBINs)',
    sub: 'Legitimate OS Binaries Used Maliciously',
    badge: 'LOLBIN BLIND SPOT',
    description: 'Adversaries utilize legitimate Microsoft signed binaries (certutil.exe, bitsadmin.exe, mshta.exe) to download and execute payloads without dropping custom malware.',
    details: 'Ananya points out: "When an attacker runs certutil -urlcache -split, the executable has a valid Microsoft digital signature! EDR will not block it on reputation alone."',
    tags: ['Certutil.exe', 'Bitsadmin.exe', 'Valid Microsoft Sig', 'Subverted Tools'],
  },
  {
    id: 'lim-unsupported-os',
    label: '2. Unmonitored Endpoints & Legacy OS',
    sub: 'Legacy Servers, Linux Appliances & BYOD',
    badge: 'COVERAGE GAPS',
    description: 'Printers, IoT controllers, HVAC gateways, and legacy Windows 7/XP machines where modern EDR kernel drivers cannot be installed or are unsupported.',
    details: 'Ananya warns: "An attacker who breaches an unmonitored printer or HVAC controller operates in complete darkness from the EDR console\'s perspective."',
    tags: ['Legacy Windows', 'IoT Controllers', 'Unsupported Kernels', 'Network Pivots'],
  },
  {
    id: 'lim-tamper-blindness',
    label: '3. Driver Unloading & Anti-EDR Techniques',
    sub: 'BYOVD (Bring Your Own Vulnerable Driver)',
    badge: 'TAMPER ATTACKS',
    description: 'Advanced malware drops legitimately signed vulnerable third-party drivers to disable EDR kernel callbacks directly from Ring 0.',
    details: 'Ananya alerts: "If kernel callbacks are erased, the agent process stays running but receives zero event notifications. Always monitor EDR agent integrity."',
    tags: ['BYOVD Exploit', 'Kernel Callbacks Erased', 'Silent Blinding', 'EDR Tampering'],
  },
  {
    id: 'lim-ananya-truth',
    label: '4. Ananya\'s Universal Detection Doctrine',
    sub: 'Tools Extend Visibility; They Do Not Eliminate Verification',
    badge: 'GOLDEN DOCTRINE',
    description: 'The golden rule of endpoint operations: no tool provides 100% security. EDR provides superior visibility, but analyst diligence remains the ultimate defense.',
    details: 'Ananya concludes: "Does having EDR mean every threat will be detected? No! Detection depends on coverage, configuration, behaviour, and context. Tools extend visibility; they do not eliminate verification."',
    tags: ['Verification Doctrine', 'Analyst Diligence', 'No Magic Bullets', 'Ananya Masterclass'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M09-U2-C1 (A process family needs context)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Process Tree Lineage & LOLBIN Execution
export const processTreeLineageNodes: VisualNodeItem[] = [
  {
    id: 'proc-root-explorer',
    label: '1. Root User Shell (explorer.exe)',
    sub: 'PID 2840 | Standard Desktop Environment',
    badge: 'PARENT ROOT',
    description: 'The standard Windows graphical shell running under the logged-on user account FIN-OPS-01. Responsible for normal desktop taskbars and folder navigation.',
    details: 'Ananya shows: "Notice the process hierarchy: explorer.exe is the expected parent when a human user double-clicks an application icon on their desktop."',
    tags: ['explorer.exe', 'PID: 2840', 'Interactive Desktop', 'User: FIN-OPS-01'],
  },
  {
    id: 'proc-child-excel',
    label: '2. Office Document App (excel.exe)',
    sub: 'PID 4820 | Accounting Spreadsheet',
    badge: 'INTERMEDIATE APP',
    description: 'Microsoft Excel executing the file "Monthly_Financial_Recon.xlsm" containing embedded Visual Basic for Applications (VBA) macro routines.',
    details: 'Ananya points out: "Excel is expected in the finance branch. But watch closely what child process Excel attempts to spawn next!"',
    tags: ['excel.exe', 'PID: 4820', 'Macro Enabled', 'Parent: explorer.exe'],
  },
  {
    id: 'proc-anomalous-cmd',
    label: '3. Anomalous Command Shell (cmd.exe)',
    sub: 'PID 5124 | Spawned Directly by Excel!',
    badge: 'ANOMALOUS CHILD',
    description: 'The Windows command interpreter spawned as a child process of Excel. Standard corporate accounting spreadsheets do not legitimately invoke command shells.',
    details: 'Ananya alerts: "Inspect parent and child processes! Why is a spreadsheet launching cmd.exe? This parent-child relationship is a classic initial access indicator."',
    tags: ['cmd.exe', 'PID: 5124', 'Parent: excel.exe ⚠️', 'VBA Macro Spawn'],
  },
  {
    id: 'proc-malicious-powershell',
    label: '4. Encoded Script Runner (powershell.exe)',
    sub: 'PID 5912 | -enc -nop -w hidden Arguments',
    badge: 'PAYLOAD RUNNER',
    description: 'PowerShell invoked with execution bypass flags: -NoProfile -WindowStyle Hidden -EncodedCommand. Decodes base64 payload in memory to establish external socket.',
    details: 'Ananya instructs: "Does that parent-child relationship prove malicious execution? It is deeply concerning, but verify the exact command-line arguments and business context."',
    tags: ['powershell.exe', 'PID: 5912', '-EncodedCommand', 'Payload Execution'],
  },
];

// 8. Pillar 2: Command-Line Evidence & Full Execution Path
export const commandLineArgsNodes: VisualNodeItem[] = [
  {
    id: 'cli-full-image-path',
    label: '1. Verified Full Image Path',
    sub: 'C:\\Windows\\System32\\cmd.exe',
    badge: 'IMAGE INTEGRITY',
    description: 'Confirms the binary executed from the legitimate protected system folder rather than an attacker-controlled temp directory (e.g. C:\\Users\\AppData\\Local\\Temp\\cmd.exe).',
    details: 'Ananya trains: "Always check the full image path. Attackers name malware \'cmd.exe\' or \'svchost.exe\' and place it in user directories to masquerade as OS utilities."',
    tags: ['Path: System32\\cmd.exe', 'Protected OS Directory', 'Authentic Binary Path', 'Masquerade Check'],
  },
  {
    id: 'cli-argument-inspection',
    label: '2. Complete Command-Line Argument String',
    sub: 'cmd.exe /c powershell.exe -enc SQBFAFgA...',
    badge: 'ARGUMENT AUDITING',
    description: 'Captures the raw command string passed to the binary. Contains the base64 encoded parameters used to evade simple string pattern detection.',
    details: 'Ananya directs: "Never rely on the process name alone. The process name is just the vehicle; the command-line arguments reveal the driver\'s true mission."',
    tags: ['CommandLine String', 'Base64 Encoded', '-EncodedCommand', 'Payload Decoder'],
  },
  {
    id: 'cli-security-context',
    label: '3. Executing Security Context & Integrity Level',
    sub: 'Subject: FIN-OPS-01 | Medium Mandatory Level',
    badge: 'PRIVILEGE TOKEN',
    description: 'Identifies the security token under which the process executed. Confirms the script inherited the standard user permissions of employee Ramesh without UAC elevation.',
    details: 'Ananya notes: "Because the script ran under Medium Integrity, it could not access SAM secrets or install kernel persistence without privilege escalation."',
    tags: ['User: FIN-OPS-01', 'Medium Integrity', 'No UAC Elevation', 'Blast Radius Bounded'],
  },
  {
    id: 'cli-evidence-attachment',
    label: '4. Attachment to Case Without Execution',
    sub: 'Safe Forensic Documentation Protocol',
    badge: 'SAFETY PROTOCOL',
    description: 'Copy the full command-line string into the case evidence notes for analysis without copy-pasting or running it inside a live terminal.',
    details: 'Ananya commands: "Attach the exact evidence references to the case without executing any command. Never execute suspicious commands to see what they do!"',
    tags: ['Safe Evidence Capture', 'Zero Live Execution', 'Ticket Case Attachment', 'Ananya Protocol'],
  },
];

// 9. Pillar 3: File Name Homographs vs Cryptographic Hashes
export const fileNameHashesNodes: VisualNodeItem[] = [
  {
    id: 'hash-name-homograph',
    label: '1. The File Name Illusion ("svchost.exe")',
    sub: 'Identical Name, Completely Different Files',
    badge: 'HOMOGRAPH ILLUSION',
    description: 'An attacker names their custom Trojan "svchost.exe". Looking only at Task Manager or process lists, the analyst assumes it is a routine Windows service host.',
    details: 'Ananya quizzes: "Can two files with the same name have different contents? Yes! A name alone is not a reliable file identity. Anyone can rename an evil file to svchost.exe."',
    tags: ['Filename: svchost.exe', 'Name Masquerading', 'Unreliable Identity', 'Visual Camouflage'],
  },
  {
    id: 'hash-sha256-signature',
    label: '2. Cryptographic SHA-256 Fingerprint',
    sub: 'Unique 64-Hex Character Mathematical Hash',
    badge: 'MATHEMATICAL PROOF',
    description: 'A mathematical fingerprint calculated across every byte in the binary. Changing a single comma or bit produces a completely different hash string.',
    details: 'Ananya explains: "The SHA-256 hash never lies. The authentic Microsoft svchost.exe has hash 8a4c..., whereas the malware has hash d41d... Compare hashes, not names."',
    tags: ['SHA-256 Hash', 'Cryptographic Proof', '64-Hex Digest', 'Immutable Identity'],
  },
  {
    id: 'hash-authenticode-sig',
    label: '3. Authenticode Digital Code Signature',
    sub: 'Microsoft Corporation PKI Validation',
    badge: 'DIGITAL SIGNATURE',
    description: 'Verifies whether the executable was cryptographically signed by an approved certificate authority (e.g. "Microsoft Windows Publisher") with intact certificate trust.',
    details: 'Ananya adds: "Authentic Windows binaries carry verified digital signatures. Malicious homographs are almost always unsigned or carry self-signed invalid certificates."',
    tags: ['Authenticode Signer', 'Trust Hierarchy', 'Signed: Microsoft', 'Certificate Valid'],
  },
  {
    id: 'hash-ananya-doctrine',
    label: '4. Ananya\'s File Verification Doctrine',
    sub: 'Hashes Help, But Still Require Context Interpretation',
    badge: 'TRIAGE DOCTRINE',
    description: 'Hashes confirm identity; they do not replace human analysis. A legitimately signed utility (LOLBIN) can still be subverted for malicious operations.',
    details: 'Ananya concludes: "Correct. File hashes and metadata help establish identity, but they still require interpretation. A verified file can still execute an evil command."',
    tags: ['Identity vs Intent', 'Signed LOLBIN Trap', 'Analyst Judgment', 'Ananya Standard'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M09-U2-C2 (An endpoint timeline joins the case)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Dual Timestamp Timeline: Activity Time vs Ingestion Time
export const dualTimestampTimelineNodes: VisualNodeItem[] = [
  {
    id: 'time-activity-local',
    label: '1. Device Activity Timestamp (Event Generation)',
    sub: 'Microsecond Clock on Host Workstation',
    badge: 'EVENT GENERATION',
    description: 'The exact millisecond when the process was created on the workstation silicon: 14:22:04.108 UTC. Recorded by the local EDR kernel driver.',
    details: 'Ananya shows: "Activity time is when the event physically took place on the computer. This is the temporal anchor for all forensic reconstructions."',
    tags: ['Time: 14:22:04.108Z', 'Host Silicon Clock', 'Local Driver Record', 'Forensic Anchor'],
  },
  {
    id: 'time-ingest-cloud',
    label: '2. Console Ingestion Timestamp (Cloud Indexing)',
    sub: 'Time When Central EDR Received Event',
    badge: 'INGESTION CLOCK',
    description: 'The timestamp recorded when the EDR cloud server received, decrypted, and indexed the event into the query database: 14:22:46.820 UTC (42s lag).',
    details: 'Ananya explains: "Distinguish activity time from when the console received the record. Network congestion or offline buffering can create minutes of delay."',
    tags: ['Time: 14:22:46.820Z', 'Cloud Ingestion Clock', '42s Ingestion Lag', 'Network Latency'],
  },
  {
    id: 'time-preservation-rule',
    label: '3. Immutable Evidence Preservation Rule',
    sub: 'Never Re-Order Timestamps to Fit Expectations',
    badge: 'LEGAL INTEGRITY',
    description: 'Strict prohibition against altering, fudging, or manually shifting recorded timestamps in order to force events into a preconceived narrative.',
    details: 'Ananya challenges: "Should I move an event to fit the sequence I expected? No! Keep the reported evidence and document any clock or ingestion uncertainty."',
    tags: ['No Tampering', 'Keep Reported Data', 'Document Uncertainty', 'Legal Chain'],
  },
  {
    id: 'time-ananya-synthesis',
    label: '4. Ananya\'s Dual Timestamp Doctrine',
    sub: 'Always Cite Activity Time with Stated Ingestion Lag',
    badge: 'REPORTING STANDARD',
    description: 'Standard SOC reporting format: "Process cmd.exe created at 14:22:04 UTC (activity time); received by EDR cloud at 14:22:46 UTC (ingestion lag: 42s)."',
    details: 'Ananya instructs: "Reporting both timestamps prevents senior responders from assuming the attack happened when the alert popped up on your screen."',
    tags: ['Dual Timestamp', 'Clear Lag Phrasing', 'Professional Rigor', 'Ananya Method'],
  },
];

// 11. Pillar 2: Post Hoc Ergo Propter Hoc (Temporal Fallacy)
export const temporalFallacyNodes: VisualNodeItem[] = [
  {
    id: 'fall-sequence-trap',
    label: '1. The "Happened After" Sequence Trap',
    sub: 'Event B Occurred 3 Seconds After Event A',
    badge: 'TEMPORAL COINCIDENCE',
    description: 'At 14:22:04, user opened Excel. At 14:22:07, an antivirus update ran in the background. The analyst falsely assumes Excel triggered the update.',
    details: 'Ananya asks: "Does \'happened after\' always mean \'was caused by\'? No! Sequence alone does not establish cause. Independent processes overlap constantly."',
    tags: ['Sequence != Cause', 'Temporal Coincidence', 'False Causal Arrow', 'Cognitive Bias'],
  },
  {
    id: 'fall-fictional-script',
    label: '2. The "Fictional Attack Script" Trap',
    sub: 'Inventing Unsupported Causal Narratives',
    badge: 'UNSUPPORTED FICTION',
    description: 'Connecting unrelated timeline events into an imaginative movie script: "Attacker clicked the link, hacked the kernel, and launched the backup daemon."',
    details: 'Ananya warns: "Reject unsupported causal arrows. If the process ancestry doesn\'t link them and the user context differs, do not connect them in your notes."',
    tags: ['Invented Causality', 'Fictional Script', 'Lack of Telemetry Link', 'Bad Practice'],
  },
  {
    id: 'fall-parent-child-proof',
    label: '3. Verifiable Telemetry Linkage Proof',
    sub: 'Parent PID + Memory Injection Telemetry',
    badge: 'CONFIRMED LINK',
    description: 'Only draw a causal arrow when telemetry provides verifiable proof: Parent PID matches, handle access logged (OpenProcess), or API injection recorded.',
    details: 'Ananya demonstrates: "Excel PID 4820 explicitly appears in cmd.exe\'s ParentProcessId field. That is mathematical proof of causation, not guesswork."',
    tags: ['ParentProcessId Match', 'Verified Causation', 'Handle Access Log', 'Hard Evidence'],
  },
  {
    id: 'fall-ananya-restraint',
    label: '4. Ananya\'s Timeline Restraint Doctrine',
    sub: 'The Timeline Aids Investigation Without Becoming Fiction',
    badge: 'EVIDENCE DISCIPLINE',
    description: 'The timeline is an investigative balance sheet of documented facts, not an action screenplay. State sequence truthfully and isolate uncorroborated gaps.',
    details: 'Ananya concludes: "Exactly. The timeline helps the investigation without becoming a fictional attack script. Keep facts and hypotheses strictly separate."',
    tags: ['Evidence Discipline', 'Factual Balance Sheet', 'Zero Fiction', 'Ananya Standard'],
  },
];

// 12. Pillar 3: Unified Case Timeline Integration
export const utcMultiSourceAlignNodes: VisualNodeItem[] = [
  {
    id: 'align-edr-process',
    label: '1. EDR Host Process Execution Track',
    sub: '14:22:04 UTC: cmd.exe Spawned by Excel',
    badge: 'ENDPOINT TRACK',
    description: 'Host-level process creation telemetry from BLR-BR-WS-04 recording the exact moment macro execution spawned the command interpreter.',
    details: 'Ananya shows: "Track 1 is our endpoint anchor. Now let us align it against Mentor Ravi\'s Windows event logs and Mentor Meera\'s network PCAP."',
    tags: ['Track 1: Endpoint', 'cmd.exe Spawned', 'Host Telemetry', 'EDR Anchor'],
  },
  {
    id: 'align-network-pcap',
    label: '2. Network Flow & PCAP Handshake Track',
    sub: '14:22:12 UTC: TCP SYN to 198.51.100.24:443',
    badge: 'NETWORK TRACK',
    description: 'Network wire capture from TAP-01 recording the outbound socket handshake established exactly 8 seconds after the process launched.',
    details: 'Ananya aligns: "Notice the 8-second delta: the script took 8 seconds to initialize and resolve DNS before transmitting its first TCP SYN packet."',
    tags: ['Track 2: Network', 'TCP SYN Handshake', 'TAP-01 Capture', 'Wire Corroboration'],
  },
  {
    id: 'align-dc-auth-log',
    label: '3. Domain Controller Authentication Track',
    sub: '14:21:40 UTC: Kerberos TGT Ticket Granted',
    badge: 'IDENTITY TRACK',
    description: 'Security.evtx on BLR-DC-01 confirming employee Ramesh successfully authenticated with valid credentials 24 seconds prior to opening the spreadsheet.',
    details: 'Ananya integrates: "All three tracks align seamlessly on the UTC master clock: Kerberos logon &rarr; Document execution &rarr; Outbound network connection."',
    tags: ['Track 3: Identity', 'Kerberos Event 4768', 'BLR-DC-01', 'Multi-Source Unity'],
  },
  {
    id: 'align-ananya-synthesis',
    label: '4. The Integrated Tri-Source Dossier',
    sub: 'Airtight Case #2026-881 Evidence Integration',
    badge: 'CASE CORROBORATION',
    description: 'Combining host, network, and identity telemetry into an airtight, reproducible case package ready for senior incident escalation.',
    details: 'Ananya affirms: "With endpoint logs from our team, network packets from Meera, and event logs from Ravi, the case file has complete, verifiable integrity."',
    tags: ['Case #2026-881', 'Tri-Source Unity', 'Airtight Evidence', 'Shift Escalation'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M09-U3-C1 (Indicators are clues)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Threat Indicator Enrichment & Reputation Triad
export const indicatorReputationTriadNodes: VisualNodeItem[] = [
  {
    id: 'ind-hash-reputation',
    label: '1. File SHA-256 Reputation Query',
    sub: 'VirusTotal / Threat Intelligence API',
    badge: 'FILE REPUTATION',
    description: 'Querying external threat intelligence engines: 58 out of 72 security vendors classify the file hash as Cobalt Strike Beacon stager.',
    details: 'Ananya explains: "High vendor consensus on an identical SHA-256 hash provides strong external confirmation of known commodity malware."',
    tags: ['SHA-256 Query', '58/72 Vendors Flagged', 'Cobalt Strike Match', 'External Intel'],
  },
  {
    id: 'ind-ip-reputation',
    label: '2. Destination IP & ASN Profiling',
    sub: '198.51.100.24 | Bulletproof VPS Hosting',
    badge: 'NETWORK REPUTATION',
    description: 'Evaluating IP geolocation, Autonomous System Number (ASN), and historical abuse reports. Flagged for hosting malicious C2 infrastructure.',
    details: 'Ananya points out: "The destination IP belongs to a foreign unverified hosting provider with numerous recent abuse complaints."',
    tags: ['IP: 198.51.100.24', 'Suspicious ASN', 'AbuseIPDB Score: 88%', 'Infrastructure Intel'],
  },
  {
    id: 'ind-domain-age',
    label: '3. Domain Registration & Freshness Check',
    sub: 'Domain Created 48 Hours Ago (WHOIS)',
    badge: 'DOMAIN AGE INTEL',
    description: 'WHOIS lookup reveals the domain "portal-auth-update.net" was registered just two days ago through an anonymous privacy proxy registrar.',
    details: 'Ananya instructs: "Newly registered domains (NRDs) under 30 days old carrying corporate-sounding names are a hallmark of adversary infrastructure."',
    tags: ['Domain Age: 48 hours', 'Privacy Proxy', 'Newly Registered Domain', 'High Risk Signal'],
  },
  {
    id: 'ind-ananya-synthesis',
    label: '4. Ananya\'s Indicator Triad Rule',
    sub: 'Validate Format, Freshness, and Endpoint Relevance',
    badge: 'INTEL DOCTRINE',
    description: 'Mandate to verify indicator freshness and relevance before accepting external threat intelligence as ground truth for an ongoing triage.',
    details: 'Ananya commands: "Validate indicator format, source, freshness, and relevance to the actual endpoint observation. An old, stale indicator is meaningless noise."',
    tags: ['Freshness Check', 'Relevance Verification', 'Intel Hygiene', 'Ananya Standard'],
  },
];

// 14. Pillar 2: The "Unknown" Verdict Trap
export const unknownReputationTrapNodes: VisualNodeItem[] = [
  {
    id: 'unk-service-response',
    label: '1. Reputation Service Result: "Unknown"',
    sub: '0/72 Vendors Flagged • Zero Prior History',
    badge: 'NO DATA AVAILABLE',
    description: 'The threat intelligence API returns: "Hash not found in database. 0 detections." The file was compiled 20 minutes ago by the adversary.',
    details: 'Ananya quizzes: "A reputation service says unknown. Can you write that the file is safe? No! Unknown means the service has no classification available, not that it proved safety!"',
    tags: ['Status: Unknown', '0 Detections', 'Newly Compiled Binary', 'Absence of Intel'],
  },
  {
    id: 'unk-safe-assumption-trap',
    label: '2. The Dangerous "Safe" Assumption',
    sub: 'Confusing "Zero Hits" with "Verified Benign"',
    badge: 'HAZARDOUS ERROR',
    description: 'The rookie analyst reads "0/72 detections" on VirusTotal and writes in the ticket: "File confirmed safe by VirusTotal." The zero-day malware executes unchecked.',
    details: 'Ananya warns: "Targeted attack tools are specifically designed to have zero hits on VirusTotal on day one. Equating \'unknown\' with \'safe\' is a catastrophic error."',
    tags: ['Dangerous Assumption', 'Zero-Day Blind Spot', 'False Clearance', 'SOC Failure'],
  },
  {
    id: 'unk-behavioral-override',
    label: '3. Local Behavioral Context Override',
    sub: 'Suspicious Behavior Overrules Clean Hash',
    badge: 'BEHAVIOR OVERRULES HASH',
    description: 'Regardless of what cloud reputation says, if the binary injected code into LSASS and established an outbound beacon, it must be triaged as hostile.',
    details: 'Ananya directs: "Behavior always trumps reputation. If an \'unknown\' binary attempts credential dumping, treat it as hostile immediately."',
    tags: ['Behavior Trumps Hash', 'LSASS Handle Access', 'Active Beaconing', 'Local Reality'],
  },
  {
    id: 'unk-ananya-verdict',
    label: '4. Ananya\'s Unknown Verdict Doctrine',
    sub: 'Indicator Enrichment Supports Judgment; It Does Not Replace It',
    badge: 'GOLDEN DOCTRINE',
    description: 'Threat intelligence feeds are supplementary advisory clues, not automated judges. The analyst\'s observation of local host behavior remains the final authority.',
    details: 'Ananya concludes: "Correct. Indicator enrichment supports judgement; it does not replace it. Document \'Reputation: Unknown; Local Behavior: Highly Suspicious\'."',
    tags: ['Analyst Authority', 'Intel Restraint', 'Judgment Over Feeds', 'Ananya Doctrine'],
  },
];

// 15. Pillar 3: Playbook Boundaries & Escalation Restraint
export const playbookBoundaryRestraintNodes: VisualNodeItem[] = [
  {
    id: 'play-weak-indicator',
    label: '1. Weak / Ambiguous Reputation Hit',
    sub: '1 Low-Confidence Community Comment',
    badge: 'WEAK SIGNAL',
    description: 'An open-source forum user comments that an IP "might be suspicious", but commercial threat feeds show it belongs to Microsoft Azure hosting.',
    details: 'Ananya asks: "Should one weak reputation hit trigger an enterprise-wide firewall block on your own authority? No! Follow the playbook and approval boundaries."',
    tags: ['Low Confidence', 'Community Rumor', 'Shared Cloud IP', 'Weak Signal'],
  },
  {
    id: 'play-unilateral-block-risk',
    label: '2. The Unilateral Overreaction Risk',
    sub: 'Blocking Critical Business Cloud Services',
    badge: 'OPERATIONAL RISK',
    description: 'An overzealous junior analyst blocks an IP shared by Microsoft Office 365 or Azure authentication, paralyzing business communications across 5,000 employees.',
    details: 'Ananya cautions: "Unilateral blocks without shift lead approval can cause severe self-inflicted business outages worse than the suspected threat."',
    tags: ['Self-Inflicted Outage', 'Business Disruption', 'Unauthorized Change', 'Boundary Violation'],
  },
  {
    id: 'play-escalation-matrix',
    label: '3. Tiered SOC Escalation Matrix',
    sub: 'L1 Triage &rarr; L2 Lead Authorization Gate',
    badge: 'APPROVAL GATE',
    description: 'Level 1 analysts document verified observables and propose containment actions; Level 2 shift leads evaluate operational impact and approve perimeter blocks.',
    details: 'Ananya explains: "The escalation matrix exists to protect the organization. You provide the verified evidence; the shift lead authorizes high-impact actions."',
    tags: ['Escalation Matrix', 'Shift Lead Gate', 'Change Governance', 'Orderly SOC'],
  },
  {
    id: 'play-ananya-synthesis',
    label: '4. Ananya\'s Restraint Doctrine',
    sub: 'Playbook Boundaries Protect the Mission',
    badge: 'PROFESSIONAL CONDUCT',
    description: 'Adhering to defined Standard Operating Procedures (SOPs) ensures consistent, legally defensible, and business-conscious incident response.',
    details: 'Ananya affirms: "We operate with disciplined restraint. Fast when gathering evidence, measured and authorized when taking disruptive containment actions."',
    tags: ['Disciplined Restraint', 'SOP Adherence', 'Safe Operations', 'Ananya Standard'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M09-U3-C2 (The button you do not press casually)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The Pre-Isolation Verification Checklist
export const isolationGateChecklistNodes: VisualNodeItem[] = [
  {
    id: 'gate-target-verification',
    label: '1. Target Hostname & MAC Verification',
    sub: 'Confirming Host BLR-BR-WS-04 vs Server',
    badge: 'TARGET CONFIRMATION',
    description: 'Double-checking the unique device identifier, IP address, and MAC to guarantee you are not isolating the domain controller or executive payroll server.',
    details: 'Ananya instructs: "Before touching containment, verify the target device ID three times. Isolating the wrong server halts hospital operations or banking databases."',
    tags: ['Host: BLR-BR-WS-04', 'MAC: 00:1a:2b:41:88:04', 'IP: 10.0.4.21', 'Zero Friendly Fire'],
  },
  {
    id: 'gate-shift-lead-approval',
    label: '2. Shift Lead Authorization Gate',
    sub: 'Formal Approval by Shift Lead Ananya',
    badge: 'EXPLICIT APPROVAL',
    description: 'Presenting the verified process lineage and C2 beacon observables to Shift Lead Ananya to receive formal digital authorization to execute isolation.',
    details: 'Ananya emphasizes: "Containment can disrupt work. Confirm the target, authority, impact, and required evidence steps before acting."',
    tags: ['Shift Lead Ananya', 'Ticket Approval: Signed', 'Authorization Gate', 'Formal Consent'],
  },
  {
    id: 'gate-impact-assessment',
    label: '3. Business Operational Impact Assessment',
    sub: 'Branch Finance User Ramesh Notification',
    badge: 'IMPACT EVALUATION',
    description: 'Assessing branch disruption: isolating workstation WS-04 disconnects user Ramesh from finance spreadsheets, but contains lateral malware spread across the branch.',
    details: 'Ananya notes: "The operational disruption to one workstation is justified to protect the entire 400-computer branch from ransomware encryption."',
    tags: ['User Disruption: 1 WS', 'Ransomware Protected', 'Proportional Action', 'Risk Balance'],
  },
  {
    id: 'gate-forensic-preservation',
    label: '4. Volatile Forensic Preservation Order',
    sub: 'Triggering Memory Dump Before Network Cut',
    badge: 'FORENSIC PRESERVATION',
    description: 'Ensuring EDR live memory capture triggers simultaneously with isolation to preserve volatile injected DLLs and C2 encryption keys before process death.',
    details: 'Ananya coaches: "Order a memory acquisition as you isolate. The moment malware realizes it has lost network access, it may self-delete or crash."',
    tags: ['Volatile RAM Dump', 'Preserve Injected Code', 'Forensic Snapshot', 'Pre-Cut Safeguard'],
  },
];

// 17. Pillar 2: Simulated Host Isolation Cockpit
export const simulatedContainmentNodes: VisualNodeItem[] = [
  {
    id: 'iso-connected-state',
    label: '1. Normal Connected State (Baseline)',
    sub: 'Workstation Communicating on Enterprise LAN',
    badge: 'UNCONSTRAINED LAN',
    description: 'Workstation BLR-BR-WS-04 maintains active TCP/UDP connections to local file servers, DNS resolvers, and external internet web gateways.',
    details: 'Ananya points out: "In the connected state, malware can pivot laterally via SMB port 445 or exfiltrate customer databases to external drop servers."',
    tags: ['State: Connected', 'Full LAN Access', 'Lateral Risk Active', 'Baseline Mode'],
  },
  {
    id: 'iso-trigger-action',
    label: '2. Execute Network Isolation Command',
    sub: 'One-Click Kernel Firewall Enforcement',
    badge: 'CONTAINMENT TRIGGER',
    description: 'The analyst presses the EDR "Isolate Device" button following verified shift lead approval. Sends an encrypted management command to the agent driver.',
    details: 'Ananya guides: "The button you do not press casually. Once triggered, the endpoint kernel filter instantly drops all inbound and outbound IP packets."',
    tags: ['One-Click Containment', 'Kernel Firewall Rule', 'Encrypted Control Signal', 'Instant Cut'],
  },
  {
    id: 'iso-isolated-state',
    label: '3. Isolated Endpoint State (Contained)',
    sub: 'All Network Severed Except EDR Tunnel',
    badge: 'CONTAINED STATE',
    description: 'All workstation network communication is severed. Local users cannot browse the web or access network shares. Only the encrypted EDR management tunnel remains alive.',
    details: 'Ananya highlights: "The endpoint is now in a digital quarantine box. The adversary cannot send commands or steal files, but the SOC can still run remediation tools."',
    tags: ['All Traffic Blocked', 'EDR Lifeline Alive', 'Lateral Pivot Dead', 'Safe Quarantine'],
  },
  {
    id: 'iso-ananya-supervision',
    label: '4. Safe Simulation Sandbox Practice',
    sub: 'Mastering Containment in a Safe Lab Setting',
    badge: 'SIMULATION DOCTRINE',
    description: 'Practicing containment workflows within the approved CDAC Bengaluru training simulator without risking real branch banking infrastructure.',
    details: 'Ananya smiles: "May you practice the approved action here? Yes, in this simulation after approval. Master the muscle memory here so you stay calm during a real crisis."',
    tags: ['Safe Practice', 'Muscle Memory', 'Zero Production Risk', 'Ananya Coaching'],
  },
];

// 18. Pillar 3: Containment Status Verification & Audit Dossier
export const containmentVerificationAuditNodes: VisualNodeItem[] = [
  {
    id: 'audit-status-check',
    label: '1. Live Isolation Status Verification',
    sub: 'Confirming Agent Confirms "Isolated"',
    badge: 'STATUS VERIFICATION',
    description: 'Querying the EDR device telemetry: agent reports "Isolation Policy: ENFORCED (Status: ACTIVE)". Confirms local kernel firewall successfully blocked all interfaces.',
    details: 'Ananya quizzes: "Does clicking isolate prove the endpoint became isolated? No! You must verify the action status and record failures or uncertainty."',
    tags: ['Policy: ENFORCED', 'Driver Confirmed', 'Active Verification', 'No Blind Faith'],
  },
  {
    id: 'audit-network-silence',
    label: '2. Perimeter & Wire Silence Corroboration',
    sub: 'Mentor Meera Confirms Wire Packets Ceased',
    badge: 'WIRE CONFIRMATION',
    description: 'Checking TAP-01 and perimeter firewall logs: outbound packets from 10.0.4.21 to 198.51.100.24 dropped to zero immediately following isolation timestamp.',
    details: 'Ananya corroborates: "Mentor Meera confirms: the C2 beacon on port 443 went dead at 14:23:01 UTC. Wire telemetry verifies endpoint containment."',
    tags: ['Zero Outbound Packets', 'Meera Corroboration', 'Wire Silence', 'Cross-Tier Verification'],
  },
  {
    id: 'audit-shift-documentation',
    label: '3. Official Incident Audit Dossier Entry',
    sub: 'Time, Approver, Reason & Status Recorded',
    badge: 'AUDIT LOGGED',
    description: 'Comprehensive incident log entry: "Target BLR-BR-WS-04 isolated at 14:23:00 UTC by Apprentice Analyst. Approved by Shift Lead Ananya. Status verified active."',
    details: 'Ananya dictates: "A responsible response includes authorization, verification, and a documented outcome. Every isolation must withstand executive audit."',
    tags: ['Audit Logged', 'Signed & Sealed', 'Compliance Ready', 'Official Record'],
  },
  {
    id: 'audit-ananya-signoff',
    label: '4. Shift Lead Ananya Supervisory Sign-Off',
    sub: 'Case #2026-881 Containment Phase Complete',
    badge: 'SUPERVISORY SEAL',
    description: 'Shift Lead Ananya stamps the official supervisory seal on the containment phase of Case #2026-881, preparing the case for Tier 2 forensic analysis and remediation.',
    details: 'Ananya concludes: "Superb execution, Apprentice Analyst. The threat is contained, the host evidence is preserved, and the finance branch is safe. Handover ready."',
    tags: ['Supervisory Sign-Off', 'Case #2026-881', 'Threat Contained', 'Ready for Tier 2'],
  },
];

// =============================================================================
// COMPLETE MODULE 09 NODES MAPPING DICTIONARY
// =============================================================================
export const module09NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: A closer view of the workstation
  'm09-edr-device-health': edrDeviceHealthNodes,
  'm09-stale-sensor-trap': staleSensorTrapNodes,
  'm09-telemetry-funnel': telemetryFunnelNodes,

  // Chapter 2: Related tools, different emphasis
  'm09-av-vs-edr-architecture': avVsEdrArchitectureNodes,
  'm09-capability-overlap': capabilityOverlapNodes,
  'm09-coverage-limits': coverageLimitsNodes,

  // Chapter 3: A process family needs context
  'm09-process-tree-lineage': processTreeLineageNodes,
  'm09-command-line-args': commandLineArgsNodes,
  'm09-file-identity-hashes': fileNameHashesNodes,

  // Chapter 4: An endpoint timeline joins the case
  'm09-dual-timestamp-timeline': dualTimestampTimelineNodes,
  'm09-temporal-fallacy': temporalFallacyNodes,
  'm09-utc-multi-source-align': utcMultiSourceAlignNodes,

  // Chapter 5: Indicators are clues
  'm09-indicator-reputation-triad': indicatorReputationTriadNodes,
  'm09-unknown-reputation-trap': unknownReputationTrapNodes,
  'm09-playbook-boundary-restraint': playbookBoundaryRestraintNodes,

  // Chapter 6: The button you do not press casually
  'm09-isolation-gate-checklist': isolationGateChecklistNodes,
  'm09-simulated-containment': simulatedContainmentNodes,
  'm09-containment-verification-audit': containmentVerificationAuditNodes,
};
