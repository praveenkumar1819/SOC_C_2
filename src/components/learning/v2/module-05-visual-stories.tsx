'use client';

import { VisualNodeItem, VisualStoryStyle } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 05: SIEM FUNDAMENTALS & SEARCH — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Karthik (Data & Workflow Specialist)
// Motto: "A good query begins with a clear question, not with a clever command."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M05-U1-C1 (What SIEM does and does not do)
// -----------------------------------------------------------------------------

// 1. Pillar 1: SIEM Core Capabilities & Centralization
export const siemCapabilitiesNodes: VisualNodeItem[] = [
  {
    id: 'cap-aggregate',
    label: '1. Log Aggregation',
    sub: 'Multi-Source Collector',
    badge: 'CENTRALIZED TELEMETRY',
    description: 'Ingests hundreds of thousands of events per second from endpoints, domain controllers, firewalls, and cloud services.',
    details: 'Breaks down organizational data silos by funneling disparate log formats into a single unified indexing cluster.',
    tags: ['Ingestion: 150k EPS', 'Multi-Source', 'Central Storage', 'No Silos'],
  },
  {
    id: 'cap-correlate',
    label: '2. Rule Correlation Engine',
    sub: 'Real-Time Pattern Matcher',
    badge: 'STATEFUL DETECTION',
    description: 'Cross-references host activities with network flows and identity logs in sliding temporal windows.',
    details: 'Detects compound attacks that no single isolated log entry could expose, like a failed logon followed immediately by PowerShell execution.',
    tags: ['Cross-Source Logic', 'Sliding Windows', 'Multi-Event Rules', 'Behavioral Anomaly'],
  },
  {
    id: 'cap-search',
    label: '3. Rapid Search & Indexing',
    sub: 'Sub-Second Forensic Queries',
    badge: 'ANALYST WORKSPACE',
    description: 'Provides structured query interfaces (Lucene, KQL, SPL) to search billions of historical records in milliseconds.',
    details: 'Tokenizes structured key-value pairs (user, host, IP) so investigators can reconstruct adversary timelines accurately.',
    tags: ['Inverted Index', 'Sub-Second Latency', 'Field Tokenization', 'Timeline Search'],
  },
  {
    id: 'cap-alert',
    label: '4. Alert Dispatch & SOAR',
    sub: 'Prioritized Case Output',
    badge: 'TRIAGE QUEUE ROUTING',
    description: 'Translates high-confidence correlation hits into actionable investigation alerts for the L1 SOC triage queue.',
    details: 'Integrates with ticketing systems, webhook dispatchers, and automated playbooks for immediate containment.',
    tags: ['Ticket Creation', 'SLA Timers', 'SOAR Webhooks', 'Prioritized Dispatch'],
  },
];

// 2. Pillar 2: The Visibility Gap & Uncollected Sources
export const visibilityGapsNodes: VisualNodeItem[] = [
  {
    id: 'gap-covered',
    label: 'Collected Source: BLR-DC-01',
    sub: 'Active Directory Domain Controller',
    badge: '100% VISIBILITY (HEALTHY)',
    description: 'Kerberos authentication, user logons, and group policy changes are actively forwarded via Winlogbeat.',
    details: 'Full coverage: Every Event ID 4624 (Logon) and 4728 (Security Group Member Added) arrives within 2 seconds.',
    tags: ['Winlogbeat: Active', 'Lag: < 2s', 'Kerberos Telemetry', 'Full Audit'],
  },
  {
    id: 'gap-uncollected',
    label: 'Uncollected Source: Branch Wi-Fi Controller',
    sub: 'Perimeter Access Points ⚠️',
    badge: 'CRITICAL VISIBILITY GAP',
    description: 'Branch wireless controllers are not integrated with syslog forwarders due to missing network routing.',
    details: 'Blind spot: An attacker connected to guest or corporate Wi-Fi cannot be tracked or correlated back to physical MAC addresses.',
    tags: ['Syslog: Not Configured', 'Zero Visibility', 'Rogue Device Risk', 'Architectural Gap'],
  },
  {
    id: 'gap-blindspot',
    label: 'Retention Limit: Proxy Logs (7 Days)',
    sub: 'Web Proxy Gateway',
    badge: 'RETENTION TIME COLLAPSE',
    description: 'High-volume web proxy logs are purged after 7 days due to disk capacity constraints.',
    details: 'If an adversary dwell time exceeds 14 days, historical C2 beaconing web traffic is permanently lost from search indexes.',
    tags: ['Purge Window: 7 Days', 'Dwell Time Blindspot', 'Storage Capacity', 'Compliance Risk'],
  },
  {
    id: 'gap-audit',
    label: 'Visibility Audit Ledger',
    sub: 'Karthik\'s Coverage Matrix',
    badge: 'DEFENSIVE HYGIENE',
    description: 'SOC engineers continuously maintain a data source inventory matrix mapping MITRE ATT&CK techniques to collected telemetry.',
    details: 'Rule of Thumb: An empty search result never proves innocence if the target source was never collected in the first place.',
    tags: ['MITRE Data Sources', 'Data Coverage Map', 'Continuous Audit', 'Karthik Doctrine'],
  },
];

// 3. Pillar 3: Scope-Bounded Search Doctrine
export const scopeDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'doc-empty-search',
    label: 'Zero Results Query',
    sub: 'Search: host.name: "BLR-BR-WS-04"',
    badge: 'INITIAL SEARCH RESULT',
    description: 'Analyst runs a query for workstation BLR-BR-WS-04 and receives 0 matching events.',
    details: 'Novice reaction: "No events found, the workstation is completely clean!" Mentor Karthik interrupts: "Check your search scope first."',
    tags: ['Count: 0 Events', 'Potential False Negative', 'Query Trap', 'Needs Verification'],
  },
  {
    id: 'doc-coverage-check',
    label: '1. Verify Source Coverage',
    sub: 'Is Sysmon Agent Shipping?',
    badge: 'TELEMETRY INTEGRITY',
    description: 'Verify whether the endpoint log agent on BLR-BR-WS-04 is currently online, healthy, and shipping events.',
    details: 'Check agent heartbeat logs. If the endpoint is offline or the agent crashed, zero results indicates a collection blackout, not innocence.',
    tags: ['Agent Status', 'Heartbeat Ping', 'Buffer Spill', 'Health Check'],
  },
  {
    id: 'doc-scope-verify',
    label: '2. Verify Time Window & Zone',
    sub: 'UTC vs Local Time Window',
    badge: 'TEMPORAL SCOPE ALIGNMENT',
    description: 'Verify whether the search time picker covers the actual incident window and uses matching time zones (UTC vs IST).',
    details: 'A search bounded to "Last 15 Minutes" will return zero results if the adversary executed certutil.exe 4 hours ago.',
    tags: ['UTC Timestamp', 'Offset: +05:30', 'Expanded Scope', 'Time Window'],
  },
  {
    id: 'doc-disciplined',
    label: '3. Scope-Bounded Conclusion',
    sub: 'Disciplined Evidence Reporting',
    badge: 'PROFESSIONAL CONCLUSION',
    description: 'Disciplined phrasing: "Within the verified scope of Sysmon logs between 02:00 and 03:00 UTC, no execution was observed."',
    details: 'Never make blanket statements like "The host was never compromised." State verified boundaries explicitly.',
    tags: ['Bound Statement', 'Scientific Rigor', 'Forensic Discipline', 'Reproducible Scope'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M05-U1-C2 (Log sources and ingestion concepts)
// -----------------------------------------------------------------------------

// 4. Pillar 1: Multi-Source Telemetry Ecosystem
export const sourceEcosystemNodes: VisualNodeItem[] = [
  {
    id: 'src-sysmon',
    label: 'Sysmon (System Monitor)',
    sub: 'Deep Host Behavioral Sensor',
    badge: 'MICROSOFT SYSMON DRIVER',
    description: 'Kernel-level Windows device driver monitoring process creations, network sockets, file modifications, and registry hooks.',
    details: 'Generates high-fidelity Event ID 1 (Process Create with full command lines and hashes) and Event ID 3 (Network Connect).',
    tags: ['Kernel Driver', 'Full Command Line', 'SHA-256 Hashes', 'Parent PID Tree'],
  },
  {
    id: 'src-winlogbeat',
    label: 'Winlogbeat / Forwarder',
    sub: 'Lightweight Windows Shipper',
    badge: 'EVENT LOG SHIPPER',
    description: 'Reads native Windows Security, System, and Application EVTX channels and streams them securely to the SIEM cluster.',
    details: 'Handles local queueing, TLS encryption, backpressure regulation, and reliable delivery during network disconnects.',
    tags: ['EVTX Streaming', 'TLS Transport', 'Local Disk Buffer', 'Zero Log Loss'],
  },
  {
    id: 'src-zeek',
    label: 'Zeek Network Security Sensor',
    sub: 'Wire-Level Protocol Inspector',
    badge: 'PASSIVE NETWORK TAP',
    description: 'Taps mirror ports on network switches to convert raw network packet streams into structured JSON transaction logs.',
    details: 'Generates conn.log (IP sessions), dns.log (domain queries), http.log (URLs and user agents), and ssl.log (x509 certificates).',
    tags: ['Passive Tap', 'Protocol Decoder', 'conn.log / dns.log', 'Unencrypted Wire View'],
  },
  {
    id: 'src-syslog',
    label: 'Syslog / CEF Forwarder',
    sub: 'Network Appliances & Linux',
    badge: 'RFC 5424 / CEF STANDARD',
    description: 'Collects event streams from Linux servers, Cisco switches, and Palo Alto firewalls over UDP/TCP port 514.',
    details: 'Formats unstructured messages into Common Event Format (CEF) key-value pairs before ingestion.',
    tags: ['Port: 514 UDP/TCP', 'CEF Format', 'Firewalls & Routers', 'Standard Protocol'],
  },
];

// 5. Pillar 2: 6-Stage Ingestion Pipeline
export const ingestionPipelineNodes: VisualNodeItem[] = [
  {
    id: 'pipe-source',
    label: 'Stage 1: Event Generation',
    sub: 'Originating Host / Device',
    badge: 'SOURCE GENERATION',
    description: 'Operating systems and applications generate raw audit events (Windows Security Event 4688, Linux syslog).',
    details: 'Originates locally on branch workstation BLR-BR-WS-04, domain controllers, or edge network firewalls.',
    tags: ['Originating Host', 'Raw Log', 'Local Event Queue', 'Kernel Notification'],
  },
  {
    id: 'pipe-transport',
    label: 'Stage 2 & 3: Collection & Transport',
    sub: 'Shipper Agent & Encrypted Wire',
    badge: 'TLS SECURE TRANSPORT',
    description: 'Log shippers (Winlogbeat, Fluentbit) batch records and transmit them over mutual-TLS to central load balancers.',
    details: 'Employs memory buffers and disk spooling so network blips never cause dropped security events.',
    tags: ['mTLS 1.3', 'Spool Buffer', 'Load Balanced', 'Reliable Delivery'],
  },
  {
    id: 'pipe-parser',
    label: 'Stage 4: Parsing & Tokenization',
    sub: 'Logstash / Ingest Pipelines',
    badge: 'SCHEMA NORMALIZATION',
    description: 'Ingest processors strip raw text into structured key-value pairs matching Elastic Common Schema (ECS) or CIM.',
    details: 'Extracts IP addresses, converts string timestamps to UTC epoch datetimes, and enriches records with GeoIP and threat feeds.',
    tags: ['Grok / Dissect', 'ECS Schema', 'GeoIP Enrichment', 'Type Casting'],
  },
  {
    id: 'pipe-indexer',
    label: 'Stage 5 & 6: Indexing & Search',
    sub: 'Elasticsearch / OpenSearch Cluster',
    badge: 'SEARCHABLE STORAGE',
    description: 'Parsed documents are written into Lucene inverted indices across distributed data shards for instant analyst searching.',
    details: 'Events become queryable in analyst search consoles within 3 to 5 seconds of physical execution on the remote workstation.',
    tags: ['Inverted Index', 'Sharded Storage', 'Hot/Warm Tiers', 'Search Head Active'],
  },
];

// 6. Pillar 3: Source Health & Delayed Pipeline Monitor
export const sourceHealthNodes: VisualNodeItem[] = [
  {
    id: 'hlth-active',
    label: 'Source: BLR-BR-WS-04 (Active)',
    sub: 'Host Shipper Health: Normal',
    badge: 'INGESTION NOMINAL (55 EPS)',
    description: 'Workstation BLR-BR-WS-04 is actively shipping Sysmon and Security logs with a negligible 1.2s transport latency.',
    details: 'All ingestion pipelines green. Analyst queries against this host represent true real-time operational state.',
    tags: ['Status: Healthy', 'EPS: 55', 'Transport Lag: 1.2s', 'Heartbeat Verified'],
  },
  {
    id: 'hlth-lagging',
    label: 'Source: FIN-DB-01 (Lagging ⚠️)',
    sub: 'Heavy Buffer Queue Backlog',
    badge: 'PIPELINE DELAY (45 MIN LAG)',
    description: 'Database server log forwarder is experiencing network throttling, causing events to arrive 45 minutes late.',
    details: 'Critical triage note: An analyst searching "Last 15 Minutes" will miss recent database queries because they are still buffered in transit!',
    tags: ['Status: Lagging', 'Buffer: 85% Full', 'Delay: 45 Minutes', 'Backpressure Alert'],
  },
  {
    id: 'hlth-offline',
    label: 'Source: Branch Switch-02 (Silent 🔴)',
    sub: 'Agent Failure / Link Severed',
    badge: 'SILENT INGESTION FAILURE',
    description: 'Switch-02 stopped transmitting syslog packets 3 hours ago after an unauthorized port configuration change.',
    details: 'An empty query for Switch-02 does NOT mean zero network activity; it indicates total defensive blindness!',
    tags: ['Status: Offline', 'Zero Events Received', 'Dropped Link', 'P1 Operational Alert'],
  },
  {
    id: 'hlth-alert',
    label: 'Karthik\'s Health Dashboard',
    sub: 'Automated Pipeline Heartbeat',
    badge: 'CONTINUOUS TELEMETRY MONITOR',
    description: 'SIEM operational monitoring watches event rate drops (>50% drop triggers an operational alert to SOC engineering).',
    details: 'Karthik emphasizes: "If a source stops sending, never assume the environment became quiet. Report the visibility issue immediately."',
    tags: ['Threshold: -50% EPS', 'Operational Alert', 'Defensive Hygiene', 'Karthik Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M05-U2-C1 (Fields, time ranges and filters)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Structured Fields & Schema Normalization
export const fieldSchemaNodes: VisualNodeItem[] = [
  {
    id: 'fld-timestamp',
    label: '@timestamp: 2026-10-15T02:45:10Z',
    sub: 'Coordinated Universal Time (UTC)',
    badge: 'TEMPORAL ANCHOR',
    description: 'Standardized ISO-8601 UTC timestamp recording exact microsecond when the operating system observed the action.',
    details: 'Normalizes branch local time (+05:30 IST) to global UTC so logs from Bengaluru, London, and Tokyo synchronize perfectly.',
    tags: ['Format: ISO-8601', 'UTC Standard', 'Microsecond Scale', 'Time Synchronization'],
  },
  {
    id: 'fld-hostname',
    label: 'host.name: "BLR-BR-WS-04"',
    sub: 'Workstation Entity Identifier',
    badge: 'ENDPOINT FIELD',
    description: 'Normalized ECS field identifying the specific endpoint workstation hardware.',
    details: 'Differentiates the physical computer from transient IP leases (10.10.20.15) and logged-in user credentials.',
    tags: ['Field: host.name', 'Entity Separation', 'Hardware Anchor', 'Indexed Keyword'],
  },
  {
    id: 'fld-username',
    label: 'user.name: "FIN-OPS-01"',
    sub: 'Account Credential Label',
    badge: 'IDENTITY FIELD',
    description: 'Normalized user identity token recorded in authentication tokens and process security descriptors.',
    details: 'Analyst rule: Identifies the active security context, but does not prove which human physical hands typed on the keyboard.',
    tags: ['Field: user.name', 'Security Context', 'Token SID', 'Identity Anchor'],
  },
  {
    id: 'fld-ip',
    label: 'destination.ip: "185.220.101.4"',
    sub: 'External Foreign Socket',
    badge: 'NETWORK COORDINATE',
    description: 'Destination IPv4 address resolved from outbound TCP/UDP socket connections in Sysmon Event 3 or firewall sessions.',
    details: 'Correlated with threat intelligence feeds to check autonomous system number (ASN), geographic origin, and reputation.',
    tags: ['Field: destination.ip', 'External Port: 8080', 'Threat Intel Feed', 'Network Coordinate'],
  },
];

// 8. Pillar 2: Time Window Picker & UTC Alignment
export const timeWindowNodes: VisualNodeItem[] = [
  {
    id: 'time-window-15m',
    label: 'Scope 1: Last 15 Minutes',
    sub: 'Real-Time Immediate Triage',
    badge: 'HIGH FREQUENCY WINDOW',
    description: 'Default dashboard view inspecting live streaming alerts and current endpoint activity.',
    details: 'Advantage: Fast query performance (<50ms). Limitation: Completely misses attacks that occurred earlier in the shift.',
    tags: ['Duration: 15 Min', 'Low Latency', 'Live Operations', 'Narrow Scope'],
  },
  {
    id: 'time-window-24h',
    label: 'Scope 2: Last 24 Hours',
    sub: 'Full Shift & Daily Correlation',
    badge: 'SHIFT CYCLE WINDOW',
    description: 'Standard investigation window capturing overnight activity, off-hours logons, and preceding reconnaissance sweeps.',
    details: 'Allows L1 analysts to correlate early morning brute force attempts with later lateral movement executions.',
    tags: ['Duration: 24 Hours', 'Shift Continuity', 'Baseline Comparison', 'Standard Investigation'],
  },
  {
    id: 'time-window-custom',
    label: 'Scope 3: Absolute Incident Range',
    sub: 'From: 02:30 UTC To: 03:15 UTC',
    badge: 'EVIDENCE TARGETED SCOPE',
    description: 'Precision time bracket centered specifically around documented alert timestamps (Alert time ± 30 minutes).',
    details: 'Focuses query compute resources strictly on relevant log volumes while excluding millions of unrelated background events.',
    tags: ['Absolute Range', 'Precision Bounds', 'Optimized Compute', 'Forensic Window'],
  },
  {
    id: 'time-utc-align',
    label: 'UTC vs IST Synchronization',
    sub: 'Offset Alignment: UTC +05:30',
    badge: 'TIMEZONE NORMALIZATION',
    description: 'CDAC Bengaluru operates at IST (UTC+05:30). An alert recorded at 08:15 AM IST occurred at 02:45 AM UTC.',
    details: 'Karthik warns: "If an analyst queries local time into a UTC-indexed database, they search a 5.5-hour time warp and find nothing!"',
    tags: ['Offset: +05:30', 'Time Zone Pitfall', 'Epoch UTC', 'Karthik Rule'],
  },
];

// 9. Pillar 3: Zero-Result Triage Checklist
export const zeroResultsCheckNodes: VisualNodeItem[] = [
  {
    id: 'chk-timerange',
    label: 'Check 1: Time Range & Zone',
    sub: 'Did you bracket the correct window?',
    badge: 'TEMPORAL VALIDATION',
    description: 'Verify whether the query time bracket matches the actual incident timestamp and accounts for UTC offsets.',
    details: 'Did you accidentally search "Today" when the attack occurred on Sunday night? Expand to ±2 hours around the alert.',
    tags: ['Time Scope', 'Offset Check', 'Date Bracket', 'Temporal Sanity'],
  },
  {
    id: 'chk-fieldnames',
    label: 'Check 2: Exact Field Names',
    sub: 'Did you type user.name or username?',
    badge: 'SCHEMA CONFORMANCE',
    description: 'Verify whether field identifiers match the data schema (e.g., `host.name` in ECS vs `ComputerName` in raw Windows).',
    details: 'A typo in the field name (`user.nam: FIN-OPS-01`) causes the search engine to return zero hits silently.',
    tags: ['Schema Mismatch', 'ECS vs Raw', 'Case Sensitivity', 'Syntax Inspection'],
  },
  {
    id: 'chk-syntax',
    label: 'Check 3: Boolean Operators & Quotes',
    sub: 'AND vs OR & Quotation Escapes',
    badge: 'SYNTAX VALIDATION',
    description: 'Check for unquoted hyphenated strings (`BLR-BR-WS-04`) that some engines interpret as subtraction operators.',
    details: 'Always enclose complex hostnames and file paths in quotation marks: `host.name: "BLR-BR-WS-04"`.',
    tags: ['Quotation Marks', 'Hyphen Escapes', 'Parentheses Grouping', 'Parser Logic'],
  },
  {
    id: 'chk-coverage',
    label: 'Check 4: Data Source Coverage',
    sub: 'Was this log channel collected?',
    badge: 'INGESTION VERIFICATION',
    description: 'Confirm that the target log index (e.g., `winlogbeat-*` or `zeek-*`) was actively receiving events during that hour.',
    details: 'Check index heartbeat. If the forwarder dropped offline, zero results is an ingestion failure, not proof of innocence.',
    tags: ['Index Status', 'Forwarder Online', 'Log Retention', 'Healthy Ingest'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M05-U2-C2 (Basic query logic)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Boolean Logic Gates: AND, OR, NOT
export const booleanLogicNodes: VisualNodeItem[] = [
  {
    id: 'gate-and',
    label: 'Operator: AND (Conjunction)',
    sub: 'Narrowing Filter: Both Required',
    badge: 'INTERSECTION LOGIC',
    description: 'Requires both conditions to evaluate to TRUE simultaneously on the same event record.',
    details: 'Example: `host.name: "BLR-BR-WS-04" AND process.name: "powershell.exe"`. Narrows results to PowerShell running only on desk 4.',
    tags: ['Logic: Conjunction', 'Narrows Search', 'Both Must Match', 'High Specificity'],
  },
  {
    id: 'gate-or',
    label: 'Operator: OR (Disjunction)',
    sub: 'Broadening Filter: Alternative Match',
    badge: 'UNION LOGIC',
    description: 'Allows either condition to evaluate to TRUE, broadening search results to include alternative observables.',
    details: 'Example: `process.name: "powershell.exe" OR process.name: "cmd.exe"`. Matches any execution of either command interpreter.',
    tags: ['Logic: Disjunction', 'Broadens Search', 'Either Can Match', 'Alternative Sets'],
  },
  {
    id: 'gate-not',
    label: 'Operator: NOT / != (Exclusion)',
    sub: 'Suppression Filter: Exclude Pattern',
    badge: 'EXCLUSION HAZARD ⚠️',
    description: 'Excludes records matching the specified condition from the output set.',
    details: 'Example: `user.name: "FIN-OPS-01" AND NOT process.name: "excel.exe"`. Filters out routine Excel activity to surface unusual binaries.',
    tags: ['Logic: Exclusion', 'Noise Reduction', 'Handle With Care', 'Potential Blindspot'],
  },
  {
    id: 'gate-paren',
    label: 'Parentheses: ( Grouping )',
    sub: 'Order of Operations Enforcer',
    badge: 'PRECEDENCE CONTROL',
    description: 'Groups sub-queries to eliminate operator ambiguity between AND and OR evaluations.',
    details: '`host.name: "BLR-BR-WS-04" AND (process.name: "cmd.exe" OR process.name: "powershell.exe")`. Guarantees host restriction applies to both binaries.',
    tags: ['Explicit Precedence', 'Eliminates Ambiguity', 'Complex Filters', 'Mathematical Order'],
  },
];

// 11. Pillar 2: Query Dialects: Kibana KQL vs Kusto KQL
export const queryDialectsNodes: VisualNodeItem[] = [
  {
    id: 'kql-kibana',
    label: 'Kibana KQL (Elastic)',
    sub: 'Lucence-Derived Filter Syntax',
    badge: 'ELASTIC SEARCH DIALECT',
    description: 'Simplified keyword and field-pair syntax used across Elasticsearch and Kibana dashboards.',
    details: 'Syntax: `host.name: "BLR-BR-WS-04" and event.code: 4688 and process.name: "certutil.exe"`. Intuitive, lowercase boolean keywords.',
    tags: ['Kibana KQL', 'Elastic Stack', 'Field: Value', 'Wildcards: *'],
  },
  {
    id: 'kql-kusto',
    label: 'Kusto KQL (Microsoft Sentinel)',
    sub: 'Pipelined Tabular Query Language',
    badge: 'MICROSOFT SENTINEL DIALECT',
    description: 'Structured pipeline syntax modeled after SQL and PowerShell pipes, used in Azure Sentinel and Defender.',
    details: 'Syntax: `SecurityEvent | where Computer == "BLR-BR-WS-04" | where EventID == 4688 | project TimeGenerated, Account, NewProcessName`.',
    tags: ['Kusto KQL', 'Pipe Operator |', 'Tabular Output', 'Microsoft Sentinel'],
  },
  {
    id: 'kql-spl',
    label: 'Splunk SPL (Search Processing)',
    sub: 'Unix-Style Command Pipeline',
    badge: 'SPLUNK ENTERPRISE DIALECT',
    description: 'Pipeline processing language chaining search commands with stats, eval, and lookup tables.',
    details: 'Syntax: `index=windows host=BLR-BR-WS-04 EventCode=4688 | table _time, user, NewProcessName`.',
    tags: ['Splunk SPL', 'Pipelined Commands', 'index= Tagging', 'Enterprise SIEM'],
  },
  {
    id: 'kql-syntax-gate',
    label: 'Karthik\'s Dialect Rule',
    sub: 'Never Confuse Query Dialects',
    badge: 'SYNTAX CONSCIOUSNESS',
    description: 'Karthik warns: "Kusto KQL and Kibana KQL are completely different languages despite sharing the KQL acronym."',
    details: 'Always check which platform your SOC uses before pasting search queries from external blogs or cheat-sheets.',
    tags: ['Platform Aware', 'Syntax Integrity', 'No Blind Pasting', 'Karthik Doctrine'],
  },
];

// 12. Pillar 3: Reproducible Query Dossier & NOT Danger
export const queryDossierNodes: VisualNodeItem[] = [
  {
    id: 'dos-query-save',
    label: '1. Save Exact Query String',
    sub: 'Verbatim Query Text & Dialect',
    badge: 'REPRODUCIBILITY ANCHOR',
    description: 'Every investigation ticket must record the exact verbatim query string executed in the SIEM console.',
    details: 'Never write "I searched for suspicious files." Write: `host.name: "BLR-BR-WS-04" and process.name: ("certutil.exe" or "powershell.exe")`.',
    tags: ['Verbatim String', 'Reproducible Steps', 'Audit Defense', 'Clarity'],
  },
  {
    id: 'dos-not-danger',
    label: '2. The NOT Filter Exclusion Hazard',
    sub: 'Accidental Evidence Masking ⚠️',
    badge: 'CRITICAL INVESTIGATIVE RISK',
    description: 'Broad NOT exclusions (e.g., `NOT user.name: "SYSTEM"`) can accidentally hide adversary attacks executing under token impersonation.',
    details: 'If an adversary elevates privileges to NT AUTHORITY\\SYSTEM, an aggressive NOT filter hides their tracks completely from your search!',
    tags: ['Suppression Hazard', 'Token Stealing', 'Hidden Evidence', 'Audit Exclusions'],
  },
  {
    id: 'dos-peer-repro',
    label: '3. Peer Reproduction Test',
    sub: 'Can Another Analyst Run It?',
    badge: 'PEER VERIFICATION',
    description: 'Another analyst on the next shift must be able to paste your query and time bracket and see the exact same evidence table.',
    details: 'Guarantees that investigation findings are objective, verifiable facts rather than personal assumptions or transient glitches.',
    tags: ['Peer Review', 'Shift Handover', 'Reproducible Science', 'No Ambiguity'],
  },
  {
    id: 'dos-audit',
    label: '4. Attach Time Window Parameters',
    sub: 'From: 2026-10-15T02:30Z To: 03:00Z',
    badge: 'TEMPORAL ATTACHMENT',
    description: 'A saved query is useless without its accompanying time window parameters and target index pattern.',
    details: 'Attaching index and time boundaries preserves the investigation dossier for forensic investigations months later.',
    tags: ['Time Bounds', 'Target Index', 'Long-Term Audit', 'Complete Dossier'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M05-U3-C1 (Rules, correlation and alert output)
// -----------------------------------------------------------------------------

// 13. Pillar 1: Correlation vs Causation Engine
export const correlationEngineNodes: VisualNodeItem[] = [
  {
    id: 'eng-join',
    label: 'Multi-Source Event Join',
    sub: 'Host 4624 + Firewall Outbound Session',
    badge: 'TEMPORAL JOIN',
    description: 'Correlation rules join events occurring across separate systems that share common entity keys.',
    details: 'Links a Windows logon on BLR-BR-WS-04 at 02:45:10Z to an outbound firewall connection to foreign IP 185.220.101.4 at 02:45:14Z.',
    tags: ['Shared Entity Key', 'Host + Network', 'Multi-Stream', 'Cross-Correlation'],
  },
  {
    id: 'eng-grouping',
    label: 'Entity Grouping (Aggregation)',
    sub: 'Group By: user.name, host.name',
    badge: 'AGGREGATION AGENT',
    description: 'Aggregates repeated events into buckets grouped by entity identifiers to evaluate event frequency.',
    details: 'Prevents emitting 500 separate alerts for 500 failed password attempts, consolidating them into 1 brute-force alert.',
    tags: ['Group By', 'Noise Reduction', 'Entity Pivot', 'Consolidated Record'],
  },
  {
    id: 'eng-window',
    label: 'Sliding Correlation Window',
    sub: 'Rolling Window: 5 Minutes',
    badge: 'TEMPORAL SLIDING WINDOW',
    description: 'Defines the maximum elapsed time allowed between the first trigger event and subsequent corroborating events.',
    details: 'If an off-hours logon occurs, the engine watches for secondary LOLBIN execution within the next 300 seconds.',
    tags: ['Sliding Window: 300s', 'State Machine', 'Threshold Evaluation', 'Trigger Gate'],
  },
  {
    id: 'eng-output',
    label: 'Correlation != Causation',
    sub: 'Karthik\'s Critical Warning',
    badge: 'ANALYST RESTRAINT',
    description: 'Karthik reminds you: "Correlation groups observations according to conditions; it does not automatically establish causation."',
    details: 'Two events happening together could be coincidence, an automated script, or authorized maintenance. Triage must verify root cause.',
    tags: ['Causation Trap', 'Context Required', 'Scientific Caution', 'Karthik Doctrine'],
  },
];

// 14. Pillar 2: Detection Rule Dissector
export const ruleDissectorNodes: VisualNodeItem[] = [
  {
    id: 'rule-stream',
    label: '1. Ingestion Filter Stream',
    sub: 'index: winlogbeat-* AND event.code: 4624',
    badge: 'INPUT STREAM',
    description: 'The detection rule monitors the incoming stream of Windows Security Logon events in real time.',
    details: 'Applies fast pre-filtering so the engine only evaluates logon events, discarding unrelated disk and network logs.',
    tags: ['Fast Filter', 'Event ID 4624', 'Stream Selector', 'Pre-Processing'],
  },
  {
    id: 'rule-condition',
    label: '2. Conditional Logic Expression',
    sub: 'LogonType == 2 AND Time NOT IN (09:00-17:00)',
    badge: 'DETECTION LOGIC',
    description: 'The core Boolean expression defining what constitutes abnormal activity according to enterprise policy.',
    details: 'Evaluates whether the user authenticated interactively (sitting at physical console) during closed branch hours.',
    tags: ['LogonType: 2 (Interactive)', 'Off-Hours Gate', 'Boolean Logic', 'Policy Trigger'],
  },
  {
    id: 'rule-threshold',
    label: '3. Frequency Threshold Gate',
    sub: 'Count >= 5 events within 60s',
    badge: 'THRESHOLD TRIGGER',
    description: 'Requires a minimum occurrence count within the evaluation window before triggering an escalation alert.',
    details: 'Suppresses solitary typos while catching rapid credential spray or persistence installations.',
    tags: ['Count >= 5', 'Window: 60s', 'Noise Suppression', 'Threshold Gate'],
  },
  {
    id: 'rule-action',
    label: '4. Alert Generation & Payload',
    sub: 'Emit Severity: HIGH to SOC Queue',
    badge: 'DISPATCH ACTION',
    description: 'Constructs the alert ticket payload with extracted entity fields, severity level, and links to recommended playbooks.',
    details: 'Alert payload provides L1 analysts with instant triage context without requiring manual raw query construction.',
    tags: ['Alert Emitted', 'Severity: High', 'Playbook Attached', 'Triage Queue'],
  },
];

// 15. Pillar 3: Dynamic Threshold & Tuning Cockpit
export const thresholdTuningNodes: VisualNodeItem[] = [
  {
    id: 'tune-thresh-low',
    label: 'Threshold: 1 Event (Too Sensitive)',
    sub: 'Alert Storm: 1,420 Alerts/Day ⚠️',
    badge: 'ALERT FATIGUE DANGER',
    description: 'Setting threshold to 1 failed logon creates an alert storm from everyday typos, drowning analysts in false positives.',
    details: 'Analyst fatigue spikes, SLA timers breach across the queue, and genuine critical intrusions are overlooked.',
    tags: ['Fatigue: Extreme', 'False Positive Rate: 98%', 'SLA Breach Risk', 'Sub-Optimal'],
  },
  {
    id: 'tune-thresh-optimal',
    label: 'Threshold: 5 Events in 60s (Tuned ✓)',
    sub: 'Actionable Fidelity: 12 Alerts/Day',
    badge: 'GOLDILOCKS ZONE',
    description: 'Carefully tuned threshold based on baseline traffic analysis. Filters routine user mistakes while catching automated attacks.',
    details: 'L1 analysts can review all 12 alerts within 15-minute SLA windows, maintaining high vigilance and thorough investigation.',
    tags: ['Fidelity: High', 'SLA Compliant', 'Actionable Signals', 'Engineered Baseline'],
  },
  {
    id: 'tune-thresh-high',
    label: 'Threshold: 50 Events (Under-Sensitive ⚠️)',
    sub: 'Blindness: 0 Alerts/Day',
    badge: 'FALSE NEGATIVE HAZARD',
    description: 'Setting threshold too high blinds the SOC to stealthy low-and-slow brute force attacks that iterate 5 passwords every 10 minutes.',
    details: 'Adversaries test passwords undetected because their speed remains deliberately below the 50-event threshold.',
    tags: ['False Negative Risk', 'Stealth Attack Blindspot', 'Low-and-Slow Attack', 'Unsafe Tuning'],
  },
  {
    id: 'tune-fatigue',
    label: 'Karthik\'s Tuning Maxim',
    sub: 'Threshold Changes != Reality Changes',
    badge: 'LOGICAL RIGOR',
    description: 'Karthik poses a core test: "If a threshold changes, can alert counts change even with the same underlying events?"',
    details: 'Learner answers: "Yes. The detection logic changed." Alert counts answer rule behavior; event counts answer physical reality.',
    tags: ['Rule Logic vs Reality', 'Tuning Feedback Loop', 'Detection Engineering', 'Karthik Doctrine'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M05-U3-C2 (Application, identity, host, network and compliance)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The 4-Pane Multi-Source Evidence Mosaic
export const sourceMosaicNodes: VisualNodeItem[] = [
  {
    id: 'mos-identity',
    label: 'Pane 1: Identity & Authentication',
    sub: 'Active Directory (BLR-DC-01)',
    badge: 'CREDENTIAL LAYER',
    description: 'Tracks user account authentications, Kerberos Ticket Granting Service (TGS) requests, and MFA status.',
    details: 'Evidence: Event 4624 (Successful Interactive Logon) for account FIN-OPS-01 at 02:45:10 UTC on Sunday.',
    tags: ['Source: Active Directory', 'Account: FIN-OPS-01', 'Auth: Kerberos', 'Event ID: 4624'],
  },
  {
    id: 'mos-host',
    label: 'Pane 2: Host Endpoint Telemetry',
    sub: 'Sysmon on BLR-BR-WS-04',
    badge: 'EXECUTION LAYER',
    description: 'Inspects process execution, child process spawns, disk modifications, and command line arguments.',
    details: 'Evidence: Sysmon Event 1 shows certutil.exe spawned by cmd.exe downloading an unknown payload from foreign IP.',
    tags: ['Source: Sysmon', 'Process: certutil.exe', 'Parent: cmd.exe', 'SHA-256 Hash Extracted'],
  },
  {
    id: 'mos-application',
    label: 'Pane 3: Business Application Logs',
    sub: 'Branch Finance Portal (SAP / Web)',
    badge: 'APPLICATION LAYER',
    description: 'Records application-level user transactions, database queries, invoice views, and permission alterations.',
    details: 'Evidence: Zero business transactions recorded on the finance portal between 02:00 and 04:00 UTC.',
    tags: ['Source: Finance App', 'Zero App Activity', 'No Invoices Viewed', 'Contradicts User Intent'],
  },
  {
    id: 'mos-network',
    label: 'Pane 4: Network Wire Sensor',
    sub: 'Zeek / Perimeter Firewall',
    badge: 'NETWORK WIRE LAYER',
    description: 'Monitors raw network flows, DNS domain resolutions, TLS handshakes, and external socket connections.',
    details: 'Evidence: Zeek conn.log confirms 450 KB transferred to 185.220.101.4 over outbound TCP port 8080.',
    tags: ['Source: Zeek', 'Port: 8080 Outbound', 'Payload: 450 KB', 'Wire Confirmation'],
  },
];

// 17. Pillar 2: Data Minimization & Privacy Filter
export const dataMinimizationNodes: VisualNodeItem[] = [
  {
    id: 'min-approved-fields',
    label: '1. Approved Forensic Fields',
    sub: 'Strictly Relevant Observables',
    badge: 'RELEVANT EVIDENCE',
    description: 'Export only fields strictly necessary to investigate the incident: host.name, user.name, timestamp, IP, and binary hash.',
    details: 'Adheres to ISO/IEC 27037 and DPDP/GDPR data minimization principles, protecting employee personal privacy.',
    tags: ['Data Minimization', 'Approved Schema', 'Relevance Scope', 'Proportionality'],
  },
  {
    id: 'min-pii-redacted',
    label: '2. PII Redaction Filter',
    sub: 'Mask Unrelated Personal Data',
    badge: 'PRIVACY PROTECTION',
    description: 'Redacts employee personal emails, payroll figures, health insurance details, and private browsing histories.',
    details: 'Karthik instructs: "Should you export unrelated personal data just because the interface allows it? No. Minimize data."',
    tags: ['PII Masked', 'DPDP Compliance', 'Salary Data Excluded', 'Ethical Handling'],
  },
  {
    id: 'min-compliance',
    label: '3. Compliance vs Security Purpose',
    sub: 'Audit Reporting vs Active Defense',
    badge: 'DUAL-USE CLARITY',
    description: 'Compliance logs prove adherence to standards (ISO 27001, PCI-DSS); security logs support active threat containment.',
    details: 'Karthik notes: "Compliance reporting is another use of SIEM, not proof that every security risk is controlled."',
    tags: ['PCI-DSS / ISO 27001', 'Audit Trail', 'Not Silver Bullet', 'Regulatory Scope'],
  },
  {
    id: 'min-vault',
    label: '4. Case Workspace Export',
    sub: 'Clean Working Duplicate',
    badge: 'CASE CONTAINER',
    description: 'Transfers the minimized evidence packet into Case #2026-881, locking it with SHA-256 integrity verification.',
    details: 'Provides Tier 2 specialists with a clean, lawful investigation record without exposing irrelevant corporate or personal data.',
    tags: ['Case #2026-881', 'Clean Duplicate', 'Tamper Evident', 'Lawful Processing'],
  },
];

// 18. Pillar 3: The Reproducible Evidence Packet
export const evidencePacketNodes: VisualNodeItem[] = [
  {
    id: 'pkt-bundle',
    label: '1. The Evidence Packet Bundle',
    sub: 'Complete Multi-Source Dossier',
    badge: 'REPRODUCIBLE ARTIFACT',
    description: 'A structured archive combining raw log extracts, normalized field tables, process trees, and network session summaries.',
    details: 'Contains all corroborating evidence proving unauthorized execution on BLR-BR-WS-04 under account FIN-OPS-01.',
    tags: ['Evidence Bundle', 'Multi-Source Proof', 'Zero Gaps', 'Case Complete'],
  },
  {
    id: 'pkt-query-manifest',
    label: '2. Query & Scope Manifest',
    sub: 'Executable Search Recipes',
    badge: 'AUDIT MANIFEST',
    description: 'Records exact search strings, time window parameters (UTC), index patterns, and query dialect utilized.',
    details: 'Enables independent verification: Any peer analyst, internal auditor, or external forensic team can replay the exact queries.',
    tags: ['Query Recipe', 'UTC Timestamps', 'Dialect: KQL', '100% Verifiable'],
  },
  {
    id: 'pkt-chain-hash',
    label: '3. Cryptographic Chain Hash',
    sub: 'SHA-256 Integrity Verification',
    badge: 'EVIDENTIARY HASH',
    description: 'Computes a SHA-256 cryptographic checksum over the entire exported evidence archive upon extraction.',
    details: 'Guarantees that no lines were added, modified, or omitted during ticket handover to Tier 2 Incident Response.',
    tags: ['SHA-256 Checksum', 'Read-Only Seal', 'Tamper Evident', 'ISO 27037'],
  },
  {
    id: 'pkt-lead-handoff',
    label: '4. Supervisory Sign-Off & Transfer',
    sub: 'Mentor Karthik & Lead Ananya',
    badge: 'L1 HANDOVER COMPLETE ✓',
    description: 'Karthik commends the apprentice: "Correct. You now have a reproducible evidence packet, not merely a screenshot of a search."',
    details: 'The case advances to formal Tier 2 incident response with complete technical context and sound chain of custody.',
    tags: ['Supervised Sign-Off', 'No Mere Screenshot', 'Tier 2 Ready', 'Karthik Milestone'],
  },
];

// =============================================================================
// COMPLETE MODULE 05 NODES LOOKUP MAP
// =============================================================================
export const module05NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: M05-U1-C1 (What SIEM does and does not do)
  'm05-siem-capabilities': siemCapabilitiesNodes,
  'm05-visibility-gaps': visibilityGapsNodes,
  'm05-scope-doctrine': scopeDoctrineNodes,

  // Chapter 2: M05-U1-C2 (Log sources and ingestion concepts)
  'm05-source-ecosystem': sourceEcosystemNodes,
  'm05-ingestion-pipeline': ingestionPipelineNodes,
  'm05-source-health': sourceHealthNodes,

  // Chapter 3: M05-U2-C1 (Fields, time ranges and filters)
  'm05-field-schema': fieldSchemaNodes,
  'm05-time-window': timeWindowNodes,
  'm05-zero-results-check': zeroResultsCheckNodes,

  // Chapter 4: M05-U2-C2 (Basic query logic)
  'm05-boolean-logic': booleanLogicNodes,
  'm05-query-dialects': queryDialectsNodes,
  'm05-query-dossier': queryDossierNodes,

  // Chapter 5: M05-U3-C1 (Rules, correlation and alert output)
  'm05-correlation-engine': correlationEngineNodes,
  'm05-rule-dissector': ruleDissectorNodes,
  'm05-threshold-tuning': thresholdTuningNodes,

  // Chapter 6: M05-U3-C2 (Application, identity, host, network and compliance)
  'm05-source-mosaic': sourceMosaicNodes,
  'm05-data-minimization': dataMinimizationNodes,
  'm05-evidence-packet': evidencePacketNodes,
};
