'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 08: NETWORK SECURITY MONITORING — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Meera (Network Security Analyst / Senior Network Monitoring Mentor)
// Motto: "The network has another viewpoint. Packets are units of communication; flows summarize conversations. We do not manufacture certainty."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M08-U1-C1 (Packets, flows and PCAP)
// -----------------------------------------------------------------------------

// 1. Pillar 1: Packets, Flows & PCAP Demarcation
export const packetFlowPcapNodes: VisualNodeItem[] = [
  {
    id: 'pcap-raw-packet',
    label: '1. Raw Ethernet Packet (Wire Unit)',
    sub: 'Full Layer 2–7 Octet Stream',
    badge: 'GRANULAR WIRE LEVEL',
    description: 'A discrete packet traversing the physical wire containing Ethernet header, IP header, TCP/UDP transport header, and raw application payload.',
    details: 'Mentor Meera explains: "Packets are the fundamental units of network conversation. Every byte, sequence number, and TCP flag is captured verbatim."',
    tags: ['Ethernet II', 'IPv4/IPv6', 'TCP/UDP Segments', 'Raw Payload Bytes'],
  },
  {
    id: 'pcap-flow-summary',
    label: '2. NetFlow / Zeek Flow Record (Conversation Summary)',
    sub: '5-Tuple Aggregated Session',
    badge: 'METADATA SUMMARY',
    description: 'Aggregates thousands of packets into a single directional summary record: Source IP, Source Port, Dest IP, Dest Port, Protocol, Start Time, Duration, and Byte counts.',
    details: 'Meera notes: "Flows summarize conversations. When triaging millions of connections across a branch, flow metadata provides instant high-altitude situational awareness."',
    tags: ['5-Tuple', 'Conn.log', 'Duration & Volume', 'High Scalability'],
  },
  {
    id: 'pcap-file-store',
    label: '3. PCAP / PCAPNG Repository (Forensic Master)',
    sub: 'Binary Packet Capture Archive',
    badge: 'FORENSIC ARCHIVE',
    description: 'Standard binary file format (libpcap/pcapng) recording microsecond/nanosecond arrival timestamps, wire lengths, and raw byte contents for offline analysis.',
    details: 'Meera instructs: "A PCAP stores captured packet data. In the SOC, the original PCAP file is treated as read-only legal evidence; we never alter the master capture."',
    tags: ['.pcap / .pcapng', 'Libpcap Header', 'Microsecond Timestamps', 'Read-Only Master'],
  },
  {
    id: 'pcap-meera-doctrine',
    label: '4. Meera\'s Demarcation Doctrine',
    sub: 'Packet vs Flow Suitability Rule',
    badge: 'MEERA DOCTRINE',
    description: 'Select the right evidence source for the question: use flow summaries for volume and duration questions; use packet captures for protocol syntax and payload triage.',
    details: 'Meera states: "Never waste hours digging through multi-gigabyte PCAPs when a flow record answers \'who talked to whom\'. Save packet carving for deep protocol anomalies."',
    tags: ['Triage Efficiency', 'Evidence Hierarchy', 'Packet vs Flow', 'Meera Principle'],
  },
];

// 2. Pillar 2: Capture Scope & Sensor Tap Geometry
export const captureScopeNodes: VisualNodeItem[] = [
  {
    id: 'scope-network-tap',
    label: '1. Passive Hardware Network TAP',
    sub: 'Full-Duplex Zero-Loss Splitter',
    badge: 'ZERO-DROP FIDELITY',
    description: 'Physical optical or copper TAP spliced into the link between core switch and firewall. Replicates 100% of transmit and receive traffic without latency or packet loss.',
    details: 'Meera demonstrates: "Hardware TAPs provide the highest fidelity network visibility. Even if the switch CPU spikes to 100%, the TAP never drops a single packet."',
    tags: ['Hardware TAP', 'Zero Drop', 'Full Duplex', 'Physical Layer'],
  },
  {
    id: 'scope-span-mirror',
    label: '2. Switch SPAN / Mirror Port',
    sub: 'Software-Replicated Switch Port',
    badge: 'SWITCH BUFFER SENSITIVE',
    description: 'Configured switch monitoring port that copies VLAN or trunk traffic to a sensor NIC. Subject to packet drops during high switch backplane saturation.',
    details: 'Meera warns: "SPAN ports are cost-effective but vulnerable to queue exhaustion. If traffic exceeds port bandwidth, the switch drops mirrored packets first."',
    tags: ['SPAN / RSPAN', 'Buffer Saturation', 'Mirror Droprate', 'Software Replication'],
  },
  {
    id: 'scope-host-agent',
    label: '3. Host-Based Agent (Local Socket View)',
    sub: 'Endpoint NDIS / eBPF Sniffer',
    badge: 'LOCAL ENDPOINT PERSPECTIVE',
    description: 'Packet capture engine running directly on the host (e.g. WinPcap, eBPF probe). Sees local socket traffic before OS encryption but blind to adjacent subnet packets.',
    details: 'Meera contrasts: "A host agent sees internal processes and decrypted sockets, but it cannot verify whether the packet actually traversed the physical gateway wire."',
    tags: ['eBPF / WinPcap', 'Host Perspective', 'Process Context', 'Segment Blind'],
  },
  {
    id: 'scope-boundary-qual',
    label: '4. Scope Boundary Qualification',
    sub: 'Sensor Location Defines Findings',
    badge: 'EVIDENCE RIGOR',
    description: 'Every network evidence note must state where the sensor was placed, capture duration, interface filter rules, and whether dropped packets were detected.',
    details: 'Meera doctrine: "Visibility depends on where, when, and how traffic was captured, including filters and packet loss. An unqualified capture is an incomplete story."',
    tags: ['Sensor Location', 'Capture Timestamps', 'Loss Counters', 'SOP Boundary'],
  },
];

// 3. Pillar 3: Segment Visibility & Quiet Assumption Trap
export const segmentVisibilityNodes: VisualNodeItem[] = [
  {
    id: 'seg-monitored-zone',
    label: '1. Monitored DMZ / Server Subnet',
    sub: 'Active TAP Sensor Inspection',
    badge: 'VISIBLE SEGMENT',
    description: 'Branch server subnet (10.0.1.0/24) where TAP-01 actively streams packets to Zeek and Suricata sensor engines.',
    details: 'Meera shows: "Traffic traversing this link produces clear flow records and alert telemetry because our sensor is physically wired into the communication path."',
    tags: ['Subnet 10.0.1.0/24', 'Active Sensor', 'Zeek/Suricata', 'High Visibility'],
  },
  {
    id: 'seg-blind-spot',
    label: '2. Unmonitored Workstation Subnet',
    sub: 'No Sensor Presence / Switched Local VLAN',
    badge: 'VISIBILITY BLIND SPOT',
    description: 'Workstation access VLAN (10.0.4.0/24). Inter-workstation lateral peer-to-peer traffic stays within the local access switch without reaching the core TAP.',
    details: 'Meera points out: "Workstations BLR-BR-WS-04 and WS-05 can talk to each other across their local switch, completely invisible to the perimeter TAP-01 sensor."',
    tags: ['VLAN 40', 'Lateral Traffic', 'No Sensor TAP', 'Switch Blind Spot'],
  },
  {
    id: 'seg-quiet-trap',
    label: '3. The "Quiet Workstation" Fallacy',
    sub: 'Absence of Wire Data != Absence of Activity',
    badge: 'CRITICAL SOC TRAP',
    description: 'The rookie mistake of assuming a workstation was dormant or uninvolved simply because zero packets appeared in a capture taken from an unrelated network link.',
    details: 'Meera asks: "Can a capture from the wrong network segment prove a workstation was quiet? No! It may simply not have seen the workstation\'s traffic."',
    tags: ['Negative Proof Trap', 'Segment Misalignment', 'False Reassurance', 'Analyst Fallacy'],
  },
  {
    id: 'seg-meera-verdict',
    label: '4. Meera\'s Segment Visibility Rule',
    sub: 'Always Describe Scope Before Conclusions',
    badge: 'GOLDEN RULE',
    description: 'Mandate to document network topology and sensor vantage point before drawing conclusions regarding host inactivity or malware propagation.',
    details: 'Meera commands: "Always describe the capture\'s scope before its conclusions. If your sensor was blind to the segment, declare the segment unobserved."',
    tags: ['Scope Description', 'Topological Truth', 'Meera Verdict', 'SOC Standard'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M08-U1-C2 (DNS, HTTP(S) and connection metadata)
// -----------------------------------------------------------------------------

// 4. Pillar 1: TLS/HTTPS Encryption Boundary
export const tlsMetadataBoundaryNodes: VisualNodeItem[] = [
  {
    id: 'tls-client-hello',
    label: '1. TLS ClientHello & SNI (Cleartext)',
    sub: 'Initial Handshake Parameters',
    badge: 'PLAINTEXT METADATA',
    description: 'The initial TLS handshake packet reveals Server Name Indication (SNI: api.finance-cloud.in), supported cipher suites, and client TLS version in cleartext.',
    details: 'Meera notes: "Before encryption begins, the client must declare the destination server name. The SNI header gives analysts valuable domain context."',
    tags: ['TLS 1.2 / 1.3', 'SNI Domain', 'Cipher Suites', 'Handshake Type 1'],
  },
  {
    id: 'tls-server-cert',
    label: '2. Server Certificate & SAN (Cleartext/Negotiated)',
    sub: 'X.509 Identity Verification',
    badge: 'CERTIFICATE TELEMETRY',
    description: 'The server responds with its public X.509 certificate chain, Subject Alternative Names (SAN), issuer CA, and validity timestamps.',
    details: 'Meera explains: "Inspecting certificate validity and issuer authority helps detect self-signed adversary infrastructure and spoofed banking portals."',
    tags: ['X.509 Certificate', 'Issuer CA', 'SAN Attributes', 'Fingerprint SHA256'],
  },
  {
    id: 'tls-encrypted-app',
    label: '3. Encrypted Application Data (Opaque Ciphertext)',
    sub: 'Symmetric Cipher Opaque Payload',
    badge: 'ENCRYPTED BOUNDARY',
    description: 'Following the key exchange, all HTTP headers, request URIs, POST payloads, credentials, and responses are encrypted with AES-GCM or ChaCha20.',
    details: 'Meera asks: "Can I always read a full HTTPS URL and password in Wireshark? No! Without suitable authorized decryption keys, that content is unavailable."',
    tags: ['Application Data', 'AES-256-GCM', 'Opaque Payload', 'Encrypted Record'],
  },
  {
    id: 'tls-inspection-boundary',
    label: '4. Passive Inspection Boundary Rule',
    sub: 'Metadata Visibility vs Payload Opacity',
    badge: 'PASSIVE LIMITATION',
    description: 'Passive network monitoring observes flow timing, packet sizes, and domain names, but cannot inspect inner HTTP requests without TLS interception proxies.',
    details: 'Meera enforces: "HTTPS generally protects application content from ordinary passive inspection. Accept the boundary and do not speculate on hidden bytes."',
    tags: ['Passive Limit', 'Encrypted Boundary', 'TLS Interception', 'Evidence Boundary'],
  },
];

// 5. Pillar 2: DNS Telemetry & Resolution Flow
export const dnsTelemetryCorrelationNodes: VisualNodeItem[] = [
  {
    id: 'dns-query-packet',
    label: '1. Workstation DNS Query (UDP 53)',
    sub: 'Lookup for Unfamiliar Domain',
    badge: 'EARLY WARNING PROBE',
    description: 'Client workstation BLR-BR-WS-04 initiates a standard UDP port 53 query for an external domain (e.g. portal-auth-update.net) before establishing any TCP connection.',
    details: 'Meera instructs: "DNS queries almost always precede network connections. A spike in unusual DNS queries provides the earliest indicator of malware staging."',
    tags: ['UDP Port 53', 'Standard Query 0x0100', 'A-Record Request', 'Pre-Connection'],
  },
  {
    id: 'dns-resolver-relay',
    label: '2. Internal Resolver BLR-DNS-01',
    sub: 'Authoritative Caching & Forwarding',
    badge: 'ENTERPRISE RESOLVER',
    description: 'The branch DNS resolver receives the query, checks local cache, and recursively queries authoritative nameservers on behalf of the client.',
    details: 'Meera observes: "Examining internal DNS server query logs provides attribution to the specific internal workstation IP, even when external egress uses NAT."',
    tags: ['BLR-DNS-01', 'Recursive Lookup', 'Resolver Cache', 'Internal Anchor'],
  },
  {
    id: 'dns-response-record',
    label: '3. DNS Answer Record & TTL',
    sub: 'IP Resolution & CNAME Aliasing',
    badge: 'RESOLUTION EVIDENCE',
    description: 'The DNS response delivers resolved IPv4 addresses, Time-To-Live (TTL) duration, and potential CNAME redirection chains.',
    details: 'Meera points out: "Extremely low TTL values (e.g. 5 seconds) or rapidly changing IP addresses often indicate Fast-Flux adversary hosting networks."',
    tags: ['DNS Response', 'Resolved IP: 198.51.100.24', 'Short TTL', 'Fast-Flux Check'],
  },
  {
    id: 'dns-lateral-visibility',
    label: '4. DNS Forensic Correlation Doctrine',
    sub: 'Linking DNS Queries to Outbound TCP Flows',
    badge: 'FORENSIC LINKING',
    description: 'Correlating the DNS query timestamp with subsequent TCP port 443 SYN packets confirms the workstation resolved and deliberately contacted the destination.',
    details: 'Meera guides: "Always link the DNS transaction ID to the subsequent TCP handshake. If a host connects to an IP with no prior DNS lookup, suspect hardcoded C2."',
    tags: ['Correlation', 'Transaction ID', 'Hardcoded IP Check', 'Meera Playbook'],
  },
];

// 6. Pillar 3: Payload Assumption vs Metadata Proof
export const payloadAssumptionTrapNodes: VisualNodeItem[] = [
  {
    id: 'trap-metadata-fact',
    label: '1. Verified Metadata Observable',
    sub: 'What the Wire Conclusively Proves',
    badge: 'CONFIRMED FACT',
    description: 'Conclusively demonstrates: Workstation 10.0.4.21 established a TCP 3-way handshake to 198.51.100.24:443 at 14:22:04 UTC, exchanging 1.4 MB over 42 seconds.',
    details: 'Meera validates: "This is verified factual ground. We know the exact timestamps, bytes transferred, and remote IP from our wire capture."',
    tags: ['10.0.4.21:49201', '198.51.100.24:443', '1.4 MB Exchanged', 'Confirmed Fact'],
  },
  {
    id: 'trap-unsupported-story',
    label: '2. Unsupported Payload Speculation',
    sub: 'The Dangerous Guessing Trap',
    badge: 'UNSUPPORTED CLAIM',
    description: 'The rookie analyst asserts: "User exfiltrated customer credit cards in an encrypted ZIP file titled stolen_q3.zip."',
    details: 'Meera challenges: "Where did that title come from? Did the packet contain it? In an encrypted TLS session, you cannot invent file contents out of thin air!"',
    tags: ['Wild Guess', 'Unseen Filename', 'Unsubstantiated', 'SOC Violation'],
  },
  {
    id: 'trap-corroboration-bridge',
    label: '3. Host Corroboration Bridge',
    sub: 'Request Endpoint Telemetry for Files',
    badge: 'MULTI-SOURCE BRIDGE',
    description: 'Instead of guessing payload contents, pivot to host telemetry (EDR/Sysmon Event 11 for file creations, Event 4688 for process arguments) to discover what was read.',
    details: 'Meera directs: "When the wire is encrypted, cross the bridge to the endpoint. Ask Mentor Ravi for workstation file-write logs to find the real artifact."',
    tags: ['Pivot to Host', 'Sysmon Event 11', 'EDR File Auditing', 'Multi-Source'],
  },
  {
    id: 'trap-meera-rule',
    label: '4. Meera\'s Payload Caution Rule',
    sub: 'Do Not Write a Payload Story From Metadata Alone',
    badge: 'SOC CARDINAL RULE',
    description: 'Fundamental SOC principle forbidding analysts from declaring data theft, credential leakage, or specific file identities without verified payload evidence.',
    details: 'Meera commands: "Does observing a connection prove which document was downloaded? No! Do not write a payload story from metadata alone."',
    tags: ['Meera Rule', 'Payload Caution', 'No Fiction in Notes', 'Evidence Truth'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M08-U2-C1 (Filters and conversations)
// -----------------------------------------------------------------------------

// 7. Pillar 1: Wireshark Tri-Pane Architecture & Inspection
export const wiresharkAnatomyNodes: VisualNodeItem[] = [
  {
    id: 'ws-packet-list',
    label: '1. Packet List Pane (Upper Pane)',
    sub: 'Chronological Packet Summary Grid',
    badge: 'TOP OVERVIEW PANE',
    description: 'Displays sequential packet index number, delta timestamps, source/destination IP addresses, protocol decoders, packet lengths, and high-level summary info.',
    details: 'Meera instructs: "The packet list gives you the flight radar view. Look for color-coded indicators, retransmissions, and protocol distribution patterns."',
    tags: ['Packet Number', 'Delta Timestamp', 'Source/Dest IP', 'Protocol Colorizer'],
  },
  {
    id: 'ws-packet-details',
    label: '2. Packet Details Tree (Middle Pane)',
    sub: 'OSI Layer Protocol Dissection',
    badge: 'DECODER HIERARCHY',
    description: 'Collapsible hierarchical tree breaking down each OSI protocol layer: Frame &rarr; Ethernet II &rarr; IPv4 &rarr; TCP &rarr; Application (TLS/DNS/HTTP).',
    details: 'Meera shows: "Expand the tree to drill into individual TCP flag bits (SYN, ACK, RST), window sizes, and TLS ClientHello extension parameters."',
    tags: ['Layer 2-7 Dissection', 'TCP Flag Bits', 'IP Header Checksum', 'Field Names'],
  },
  {
    id: 'ws-packet-bytes',
    label: '3. Packet Bytes Hex/ASCII (Lower Pane)',
    sub: 'Raw Wire Octet Stream View',
    badge: 'HEXADECIMAL DUMP',
    description: 'Side-by-side hexadecimal and ASCII representation of the unparsed wire frame. Selecting any field in the middle details tree highlights its exact bytes here.',
    details: 'Meera explains: "When verifying an unusual protocol header or corrupted checksum, the raw byte pane provides ground truth straight from the NIC."',
    tags: ['Hex Dump', 'ASCII Characters', 'Offset Index', 'Byte Highlighting'],
  },
  {
    id: 'ws-meera-guide',
    label: '4. Meera\'s Tri-Pane Harmony Rule',
    sub: 'Three Panes, One Cohesive Ground Truth',
    badge: 'INSPECTION DOCTRINE',
    description: 'Mastering Wireshark requires cross-referencing all three panes: filter from the list, inspect semantics in the details tree, and verify integrity in the byte dump.',
    details: 'Meera coaches: "We filter existing evidence. We are not capturing traffic from unapproved networks. Master these three panes to triage swiftly."',
    tags: ['Tri-Pane Synergy', 'Wireshark Mastery', 'Evidence Navigation', 'Meera Coaching'],
  },
];

// 8. Pillar 2: Display Filter vs Capture Filter Mechanics
export const displayVsCaptureFilterNodes: VisualNodeItem[] = [
  {
    id: 'filt-capture-bpf',
    label: '1. Berkeley Packet Filter (Capture Filter)',
    sub: 'Kernel-Level Ingestion Filter',
    badge: 'KERNEL-LEVEL PRE-DISK',
    description: 'Expressed in BPF syntax (e.g. "tcp port 80 or host 10.0.4.21"). Evaluated by the OS kernel or libpcap driver before writing packets to disk. Non-matching traffic is dropped permanently.',
    details: 'Meera clarifies: "Capture filters save precious disk space during high-throughput captures by throwing away unwanted packets before they ever touch storage."',
    tags: ['BPF Syntax', 'Kernel Driver', 'Pre-Disk Drop', 'Irreversible'],
  },
  {
    id: 'filt-display-engine',
    label: '2. Wireshark Display Filter Engine',
    sub: 'Post-Capture Analytical Filter',
    badge: 'ANALYTICAL POST-FILTER',
    description: 'Expressed in rich Wireshark syntax (e.g. "ip.addr == 10.0.4.21 && tcp.flags.syn == 1"). Dynamically applied to already-recorded PCAP files to isolate conversations without modifying the capture.',
    details: 'Meera highlights: "Display filters change your viewing window, not the underlying capture file. Clearing the filter bar instantly restores the entire capture."',
    tags: ['Wireshark Syntax', 'ip.addr == ...', 'In-Memory View', 'Non-Destructive'],
  },
  {
    id: 'filt-non-destructive',
    label: '3. Non-Destructive View Principle',
    sub: 'Filtering Hides Packets, Never Deletes',
    badge: 'PRESERVATION PRINCIPLE',
    description: 'Learners often worry that applying a restrictive display filter permanently discards evidence. Display filters act as optical lenses, never file truncators.',
    details: 'Meera asks: "Will applying a display filter delete the hidden packets? No. A display filter changes the view, not the underlying capture file."',
    tags: ['No Data Loss', 'Optical Lens Analogy', 'Master Preservation', 'Safe Triage'],
  },
  {
    id: 'filt-storage-efficiency',
    label: '4. Filter Selection Strategy Matrix',
    sub: 'When to Use BPF vs When to Use Display Filters',
    badge: 'SOC OPERATIONAL SOP',
    description: 'Use BPF capture filters when monitoring multi-gigabit links with tight disk quotas; use display filters during SOC incident triage to dissect captured PCAPs.',
    details: 'Meera instructs: "In our training lab, we always supply raw PCAP files and teach you to master display filters so you can hunt from multiple angles without re-capturing."',
    tags: ['Operational SOP', 'Disk Quota Balance', 'Iterative Hunting', 'Best Practice'],
  },
];

// 9. Pillar 3: Reproducible Filter Notation & Packet Indexing
export const filterReproducibilityNodes: VisualNodeItem[] = [
  {
    id: 'rep-filter-syntax',
    label: '1. Documented Filter Syntax',
    sub: 'Standard Filter Strings in SOC Notes',
    badge: 'REPRODUCIBILITY ANCHOR',
    description: 'Explicit documentation of the exact filter expression utilized during analysis (e.g. "ip.addr == 10.0.4.21 && (tcp.port == 443 || tcp.port == 80)").',
    details: 'Meera instructs: "Should you keep the filter expression with your notes? Yes! It allows peer analysts and shift leads to recreate your exact investigative viewpoint."',
    tags: ['Filter String', 'ip.addr == ...', 'Syntactic Precision', 'Shift Reproducibility'],
  },
  {
    id: 'rep-packet-index',
    label: '2. Packet Sequence Number Indexing',
    sub: 'Direct Frame Reference Numbers',
    badge: 'EVIDENCE CITATIONS',
    description: 'Citing explicit packet sequence numbers (e.g. Frame #104 [SYN], Frame #108 [SYN-ACK], Frame #112 [ACK]) rather than vague generalities.',
    details: 'Meera trains: "Never write \'a suspicious handshake happened\'. Write: \'Frames #104–#112 demonstrate a completed TCP 3-way handshake to 198.51.100.24\'."',
    tags: ['Frame Numbers #104-#112', 'Exact Citations', 'Zero Ambiguity', 'Peer Review'],
  },
  {
    id: 'rep-peer-verification',
    label: '3. Peer Verification & Handoff Standard',
    sub: 'Enabling Senior Forensic Verification',
    badge: 'HANDOFF INTEGRITY',
    description: 'When Level 2 incident responders inherit a ticket, verified filter strings and packet references allow them to confirm findings in under 30 seconds.',
    details: 'Meera notes: "A reproducible note saves lives during a major incident. The next analyst shouldn\'t have to re-solve your puzzle from scratch."',
    tags: ['L2 Handshake', 'Rapid Verification', 'Ticket Quality', 'SOC Efficiency'],
  },
  {
    id: 'rep-evidence-integrity',
    label: '4. Master PCAP Preservation Doctrine',
    sub: 'Never Save Filtered Views Over Master Capture',
    badge: 'LEGAL INTEGRITY',
    description: 'Strict prohibition against using "File &rarr; Save" on a filtered PCAP view to overwrite the original capture, which would destroy unfiltered context.',
    details: 'Meera warns: "Always save original captures and reference relevant packet numbers. If you need a subset, save it as a separate exported evidence file."',
    tags: ['Evidence Chain', 'Read-Only Master', 'Export Specified Packets', 'Meera Protocol'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M08-U2-C2 (Repeated attempts and scan-like patterns)
// -----------------------------------------------------------------------------

// 10. Pillar 1: Port Scanning & Sweep Reconnaissance
export const portScanReconNodes: VisualNodeItem[] = [
  {
    id: 'scan-syn-sequence',
    label: '1. Sequential SYN Probe Wave',
    sub: 'Rapid Inbound Probing Across Multiple Ports',
    badge: 'RECONNAISSANCE PATTERN',
    description: 'Single external source sends rapid TCP SYN packets across multiple consecutive ports (21, 22, 23, 25, 80, 110, 443, 445, 3389) to probe for listening services.',
    details: 'Meera points out: "Notice the time delta: 100 packets sent in 400 milliseconds to consecutive destination ports. That is classic port enumeration behavior."',
    tags: ['TCP SYN', 'Port Enumeration', 'Rapid Cadence', 'Reconnaissance'],
  },
  {
    id: 'scan-rst-responses',
    label: '2. RST-ACK Closed Port Responses',
    sub: 'Target Host Rejecting Probes',
    badge: 'TARGET TELEMETRY',
    description: 'The target host operating system returns TCP RST-ACK packets for ports with no listening socket, confirming the host is alive and rejecting connections.',
    details: 'Meera explains: "A high volume of RST-ACK responses from your internal hosts tells you someone is rattling doorknobs to see which rooms are unlocked."',
    tags: ['TCP RST-ACK', 'Closed Socket', 'Host Reachable', 'Doorknob Rattling'],
  },
  {
    id: 'scan-authorized-tools',
    label: '3. Authorized Vulnerability Scanner Baseline',
    sub: 'Scheduled Security Assessment Audit',
    badge: 'BENIGN ADMINISTRATIVE SCAN',
    description: 'Internal security scanner BLR-VULN-SCAN01 conducting scheduled weekly Nessus/Qualys scans during the approved Sunday change window.',
    details: 'Meera cautions: "Before declaring an attack, check the source IP against your SOC scanner inventory and verified maintenance calendar."',
    tags: ['BLR-VULN-SCAN01', 'Approved Window', 'Nessus/Qualys', 'Benign Scan'],
  },
  {
    id: 'scan-meera-context',
    label: '4. Meera\'s Reconnaissance Context Rule',
    sub: 'Patterns Invite Questions, Not Premature Alarms',
    badge: 'TRIAGE PERSPECTIVE',
    description: 'Recognizing scan-like patterns is the start of an inquiry: verify source ownership, change management tickets, and destination host criticalities.',
    details: 'Meera states: "These patterns may suggest scanning or periodic communication, but legitimate systems can behave similarly. Patterns invite questions."',
    tags: ['Change Windows', 'Scanner Registry', 'Context Check', 'Meera Principle'],
  },
];

// 11. Pillar 2: Periodic Beacon & Timing Interval Analysis
export const periodicBeaconAnalysisNodes: VisualNodeItem[] = [
  {
    id: 'beac-regular-delta',
    label: '1. Fixed Delta Intervals (Clockwork Cadence)',
    sub: 'Rigid Heartbeat Connections Every N Seconds',
    badge: 'FIXED CADENCE',
    description: 'A host establishes an outbound TCP connection to an external address exactly every 60.00 seconds with near-zero mathematical variance (\Delta t \approx 60s).',
    details: 'Meera demonstrates: "Look at the time deltas between SYN frames: 60.01s, 59.99s, 60.02s. That clockwork rhythm is generated by automated code, not a human clicking."',
    tags: ['Delta-T: 60s', 'Low Variance', 'Automated Heartbeat', 'Timing Signal'],
  },
  {
    id: 'beac-jittered-cadence',
    label: '2. Jittered Cadence (Evasive Beaconing)',
    sub: 'Randomized Interval Drift (\pm 20%)',
    badge: 'EVASIVE BEACONING',
    description: 'Advanced malware introduces intentional timing randomization (e.g. sleep 60s \pm 15s) to defeat simplistic threshold-based frequency alert rules.',
    details: 'Meera warns: "Threat actors know defenders look for fixed intervals, so modern C2 frameworks inject jitter. We use statistical clustering to spot the distribution."',
    tags: ['Jitter Drift', 'Cobalt Strike / Sliver', 'Poisson Distribution', 'Evasion Tactic'],
  },
  {
    id: 'beac-legitimate-services',
    label: '3. Legitimate Periodic System Services',
    sub: 'NTP, SIEM Forwarders & Telemetry Agents',
    badge: 'BENIGN AUTOMATION',
    description: 'Legitimate corporate software regularly communicates on strict schedules: NTP time synchronization (UDP 123), antivirus definitions checks, or SIEM keepalives.',
    details: 'Meera challenges: "Do equal time intervals prove command-and-control beaconing? No! Scheduled checks and monitoring agents can also be periodic."',
    tags: ['NTP Sync', 'EDR Keepalive', 'AV Cloud Lookups', 'Benign Periodic'],
  },
  {
    id: 'beac-delta-analysis',
    label: '4. Delta-T Mathematical Profiling Doctrine',
    sub: 'Graphing Connection Intervals Over Time',
    badge: 'ANALYTICAL RIGOR',
    description: 'Plotting the delta between successive outbound connections across a 24-hour baseline to separate human sporadic browsing from programmatic communication.',
    details: 'Meera trains: "Plot the connection intervals on a scatter chart. Humans produce sporadic clumps; automated scripts produce flat horizontal lines or tight bands."',
    tags: ['Delta-T Charting', 'Statistical Triage', 'Human vs Script', 'Meera Analysis'],
  },
];

// 12. Pillar 3: Timing Attribution vs Intent Restraint
export const timingAttributionDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'doc-unsupported-label',
    label: '1. Dramatic Unsupported Label Trap',
    sub: '"Guaranteed C2 Beaconing Confirmed!"',
    badge: 'HAZARDOUS SPECULATION',
    description: 'The analyst jumps to an unverified conclusion based solely on periodic timestamps, panicking shift management before verifying the destination or process.',
    details: 'Meera cautions: "Labeling an unverified periodic signal as \'confirmed APT beaconing\' creates false alarms and destroys your credibility as an analyst."',
    tags: ['Premature Verdict', 'Dramatic Label', 'Panic Reaction', 'Bad Practice'],
  },
  {
    id: 'doc-factual-restraint',
    label: '2. Factual Restraint Statement',
    sub: '"Periodic Connections Observed; Purpose Unverified"',
    badge: 'PROFESSIONAL TRIAGE NOTE',
    description: 'Professional phrasing documenting observable reality: exact interval, remote IP/port, byte volume, and explicit note that process purpose remains unverified.',
    details: 'Meera asks: "Which is stronger: \'beaconing proven\' or \'periodic connections observed; purpose unverified\'? The second accurately states what we know."',
    tags: ['Accurate Phrasing', 'Zero Exaggeration', 'Documented Facts', 'Professional Rigor'],
  },
  {
    id: 'doc-destination-triage',
    label: '3. Destination Reputation & Infrastructure Context',
    sub: 'Investigating ASN, WHOIS & Domain Ownership',
    badge: 'INFRASTRUCTURE TRIAGE',
    description: 'Evaluating the destination IP: is it Microsoft Azure infrastructure hosting approved Office 365, or a newly registered domain hosted on a bulletproof VPS?',
    details: 'Meera guides: "Always pair timing analysis with destination research. An unfamiliar IP in a residential ASN warrants immediate host inspection."',
    tags: ['ASN Lookup', 'Newly Registered Domain', 'Cloud vs VPS', 'Host Triage'],
  },
  {
    id: 'doc-meera-verdict',
    label: '4. Meera\'s Restraint Doctrine',
    sub: 'A Cautious Description Outweighs Dramatic Speculation',
    badge: 'GOLDEN DOCTRINE',
    description: 'The core ethos of SOC Level 1 reporting: provide precise, verifiable observations that withstand peer scrutiny and enable decisive senior response.',
    details: 'Meera concludes: "Exactly. A cautious description is more useful than a dramatic unsupported label. The finance case builds on truth, not drama."',
    tags: ['Restraint Doctrine', 'SOC Credibility', 'Evidence-Based', 'Meera Standard'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M08-U3-C1 (Source/destination context)
// -----------------------------------------------------------------------------

// 13. Pillar 1: NAT/PAT Translation & Boundary Perspective
export const natPatTranslationNodes: VisualNodeItem[] = [
  {
    id: 'nat-internal-socket',
    label: '1. Internal Private Workstation Socket',
    sub: 'RFC 1918 Private Addressing Space',
    badge: 'PRE-NAT INSIDE SOCKET',
    description: 'The workstation initiates traffic from its private IP: BLR-BR-WS-04 (10.0.4.21:49201). Visible to sensors located inside the internal branch core switch.',
    details: 'Meera illustrates: "Before the packet hits the edge router, it carries the true internal identity: 10.0.4.21. Inside sensors see the true originating host."',
    tags: ['10.0.4.21:49201', 'RFC 1918', 'Inside Sensor', 'Workstation WS-04'],
  },
  {
    id: 'nat-gateway-pat',
    label: '2. Perimeter NAT / PAT Gateway (BLR-FW-01)',
    sub: 'Port Address Translation State Table',
    badge: 'STATEFUL TRANSLATION',
    description: 'Perimeter firewall replaces the private source IP and ephemeral port with its external public IP and a dynamically allocated port, maintaining an in-memory state table.',
    details: 'Meera explains: "PAT allows hundreds of branch workstations to share a single public IP. The firewall\'s state table records which internal IP owns which external port."',
    tags: ['BLR-FW-01', 'PAT Table Entry', 'Stateful Mapping', 'Port Allocation'],
  },
  {
    id: 'nat-external-socket',
    label: '3. External Public Socket (Wire Egress)',
    sub: 'Translated Public Identity Facing Internet',
    badge: 'POST-NAT OUTSIDE SOCKET',
    description: 'Packets exiting the perimeter router arrive at destination servers carrying source IP 198.51.100.5:20412. An external sensor only sees this shared public address.',
    details: 'Meera points out: "To external web servers and ISP sensors, all 400 branch employees look like one single machine: 198.51.100.5."',
    tags: ['198.51.100.5:20412', 'Public Egress', 'Shared Identity', 'External Sensor'],
  },
  {
    id: 'nat-sensor-perspective',
    label: '4. Meera\'s Sensor Vantage Doctrine',
    sub: 'Interpret Addresses From the Sensor\'s Viewpoint',
    badge: 'VANTAGE POINT RULE',
    description: 'Always identify whether the packet capture occurred on the inside or outside interface of the NAT device before attempting to attribute an IP to an individual user.',
    details: 'Meera emphasizes: "Interpret addresses from the sensor\'s viewpoint. Translation and proxies can change the identity a record exposes."',
    tags: ['Sensor Viewpoint', 'Inside vs Outside', 'Translation Boundary', 'Meera Principle'],
  },
];

// 14. Pillar 2: Forward Proxy & X-Forwarded-For Telemetry
export const proxyHeaderChainNodes: VisualNodeItem[] = [
  {
    id: 'prx-client-request',
    label: '1. Client-to-Proxy Internal Request',
    sub: 'Workstation Targeting Corporate Proxy',
    badge: 'INTERNAL LEG',
    description: 'Workstation BLR-BR-WS-04 sends an HTTP CONNECT or GET request to the branch corporate proxy server BLR-PROXY-01 (10.0.1.100:8080).',
    details: 'Meera demonstrates: "The workstation doesn\'t connect directly to the internet; it hands the web request to the corporate forward proxy."',
    tags: ['BLR-PROXY-01:8080', 'HTTP CONNECT', 'Explicit Proxy', 'Internal Hop'],
  },
  {
    id: 'prx-forward-egress',
    label: '2. Proxy-to-Internet Outbound Egress',
    sub: 'Proxy Initiating External Connection',
    badge: 'EXTERNAL PROXY LEG',
    description: 'The proxy server terminates the client\'s TCP session, inspects policy, and opens a separate TCP connection to the external internet web server from its own IP.',
    details: 'Meera warns: "Perimeter captures will show 10.0.1.100 as the source IP for all outbound web traffic. The proxy IP masks the true internal workstation!"',
    tags: ['Proxy Egress', 'Terminated Session', '10.0.1.100 Source', 'Session Splitting'],
  },
  {
    id: 'prx-xff-header',
    label: '3. X-Forwarded-For & Proxy Access Logs',
    sub: 'Preserving True Client Identity Headers',
    badge: 'X-FORWARDED-FOR',
    description: 'The proxy logs the original client IP (10.0.4.21) and appends the "X-Forwarded-For: 10.0.4.21" header to HTTP requests, creating an audit trail.',
    details: 'Meera notes: "Proxy access logs are the golden key to unmasking proxy traffic. They pair the external URL with the true internal workstation IP and authenticated user."',
    tags: ['X-Forwarded-For', 'Proxy Access Log', 'Client Unmasking', 'URL Path Audit'],
  },
  {
    id: 'prx-log-correlation',
    label: '4. Proxy & Flow Correlation Doctrine',
    sub: 'Bridging Perimeter Flows With Proxy Records',
    badge: 'LOG CORRELATION',
    description: 'When investigating an alert on an external connection from the proxy IP, immediately cross-reference proxy access logs matching the exact microsecond timestamp.',
    details: 'Meera coaches: "Never close a ticket saying \'proxy did it\'. Correlate the proxy log to uncover the specific employee device that requested the URL."',
    tags: ['Microsecond Match', 'Timestamp Pairing', 'Proxy Correlation', 'Meera Technique'],
  },
];

// 15. Pillar 3: Attribution Resolution & Missing Translation Gaps
export const attributionResolutionNodes: VisualNodeItem[] = [
  {
    id: 'attr-resolved-match',
    label: '1. Corroborated Attribution Match',
    sub: 'NAT Table + DHCP Lease + Timestamp Align',
    badge: 'RESOLVED ATTRIBUTION',
    description: 'The NAT state table log confirms external port 20412 mapped to 10.0.4.21 at 14:22:04 UTC, and DHCP logs confirm BLR-BR-WS-04 held that lease.',
    details: 'Meera affirms: "When all three records align—NAT table, DHCP lease, and host timestamp—device attribution is conclusively resolved."',
    tags: ['NAT Log Match', 'DHCP Lease Active', 'BLR-BR-WS-04 Confirmed', 'Full Resolution'],
  },
  {
    id: 'attr-missing-lease',
    label: '2. Missing Translation Record Gap',
    sub: 'Expired State Table / Unlogged NAT Session',
    badge: 'EVIDENCE GAP',
    description: 'The perimeter firewall was configured without connection logging, or NAT state logs rotated before the analyst began triage. The external IP cannot be mapped.',
    details: 'Meera challenges: "If many users share one public address and the translation record is missing for that minute, can you identify the person from that address alone?"',
    tags: ['Missing NAT Log', 'Rotated State Table', 'Shared IP Ambiguity', 'Attribution Gap'],
  },
  {
    id: 'attr-unresolved-declaration',
    label: '3. Transparent Attribution Restraint',
    sub: 'Declaring Attribution Unresolved in Notes',
    badge: 'EVIDENCE RESTRAINT',
    description: 'Apprentice Analyst explicitly states in ticket notes: "Device attribution is unresolved due to missing NAT mapping record for the event timestamp."',
    details: 'Meera commends: "Correct. We do not manufacture certainty to make the timeline look complete. Acknowledging a blind spot preserves legal and operational integrity."',
    tags: ['Unresolved Status', 'Truthful Scoping', 'No Manufactured Proof', 'Integrity'],
  },
  {
    id: 'attr-meera-doctrine',
    label: '4. Meera\'s Attribution Doctrine',
    sub: 'We Do Not Manufacture Certainty',
    badge: 'FOUNDATIONAL PRINCIPLE',
    description: 'The highest standard of network forensics: evidence gaps must be formally documented as gaps, rather than bridged with convenient assumptions.',
    details: 'Meera concludes: "The moment you guess an identity without evidence, you risk framing an innocent colleague. Document the boundary and request host telemetry."',
    tags: ['Attribution Doctrine', 'Ethical Standard', 'Documented Boundary', 'Meera Masterclass'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M08-U3-C2 (Write a concise evidence summary)
// -----------------------------------------------------------------------------

// 16. Pillar 1: Safe PCAP Object Handling & Carving Protocol
export const pcapObjectExtractionNodes: VisualNodeItem[] = [
  {
    id: 'obj-export-feature',
    label: '1. Wireshark Object Extraction (Export Objects)',
    sub: 'Reassembling Streams Into File Payloads',
    badge: 'CARVING CAPABILITY',
    description: 'Using Wireshark "File &rarr; Export Objects &rarr; HTTP/SMB" to reassemble dissected TCP packet data into reconstructed binary executable or script files.',
    details: 'Meera instructs: "Wireshark can rebuild downloaded files directly from reassembled TCP streams. But handling carved objects requires strict safety protocols."',
    tags: ['Export Objects', 'TCP Stream Reassembly', 'HTTP/SMB Carving', 'Payload Recovery'],
  },
  {
    id: 'obj-sandbox-isolation',
    label: '2. Sandbox Isolation & Anti-Detonation Rule',
    sub: 'Never Execute Carved Objects on Triage PC',
    badge: 'CRITICAL SAFETY SOP',
    description: 'Carved files may contain active zero-day malware. Never double-click or execute reconstructed binaries on your SOC analysis workstation.',
    details: 'Meera warns: "Should I extract every transferred object and open it? No! Reconstructed files can be active malware; follow approved evidence-handling procedures."',
    tags: ['Anti-Detonation', 'Isolated Sandbox', 'Never Double-Click', 'SOC Safety SOP'],
  },
  {
    id: 'obj-hash-verification',
    label: '3. Cryptographic Hash Generation (SHA-256)',
    sub: 'Generating Signatures for Intel Querying',
    badge: 'INTEL TELEMETRY',
    description: 'Calculate the SHA-256 hash of the carved payload within an isolated terminal and query threat intelligence platforms without executing the file.',
    details: 'Meera coaches: "Hash the object immediately. Compare the SHA-256 against VirusTotal and your internal threat vault to identify malware families safely."',
    tags: ['SHA-256 Hash', 'Threat Intel Query', 'VirusTotal Check', 'Safe Analysis'],
  },
  {
    id: 'obj-handling-safety',
    label: '4. Meera\'s Safe Evidence Handling Protocol',
    sub: 'Preserving Chain of Custody & Containment',
    badge: 'CHAIN OF CUSTODY',
    description: 'Formal protocol requiring all carved artifacts to be stored in password-protected ZIP archives (password: "infected") within the evidence vault.',
    details: 'Meera mandates: "Lock carved samples in the quarantine vault with proper chain-of-custody tracking. Safety comes before curiosity."',
    tags: ['Quarantine Vault', 'Password Infected', 'Chain of Custody', 'Meera Protocol'],
  },
];

// 17. Pillar 2: Concise Evidence Distillation vs Packet Dump
export const conciseEvidenceDistillationNodes: VisualNodeItem[] = [
  {
    id: 'dist-capture-mass',
    label: '1. The 100,000 Packet Dump Trap',
    sub: 'Burying the Ticket Under Raw PCAP Noise',
    badge: 'ROOKIE MISTAKE',
    description: 'Attaching an unedited 2.4 GB PCAP file containing millions of routine broadcast, ARP, and streaming video packets to an incident escalation ticket.',
    details: 'Meera reprimands: "Summarize what matters to this case. Do not bury the next analyst under every packet in the file. An uncurated PCAP dump wastes precious time."',
    tags: ['2.4 GB Dump', 'ARP/Broadcast Noise', 'Uncurated Attachment', 'Shift Overload'],
  },
  {
    id: 'dist-scoped-filtering',
    label: '2. Scoped Filter Distillation',
    sub: 'Isolating the Critical Forensic Sequence',
    badge: 'PRECISION DISTILLATION',
    description: 'Filtering the massive capture down to the specific 4–6 packets that prove the communication channel: DNS query, SYN handshake, and TLS negotiation.',
    details: 'Meera demonstrates: "Out of 500,000 frames, only frames #104, #108, #112, and #119 matter for this investigation. Isolate those specific records."',
    tags: ['4 Key Packets', 'Filtered Clarity', 'Signal Over Noise', 'High Precision'],
  },
  {
    id: 'dist-concise-narrative',
    label: '3. Five-Field Evidence Note Template',
    sub: 'Structured Reproducible Summary Format',
    badge: 'STANDARD TEMPLATE',
    description: 'Mandatory SOC summary format: 1. Evidence Identifier, 2. UTC Time Window, 3. Display Filter Used, 4. Packet Reference Citations, 5. Scope & Limitations.',
    details: 'Meera trains: "A great evidence note answers what was seen, where it was seen, how to reproduce the view, and what remained unobserved."',
    tags: ['Evidence ID', 'UTC Time Window', 'Filter String', 'Packet Refs', 'Limitations'],
  },
  {
    id: 'dist-handoff-clarity',
    label: '4. Meera\'s Reproducibility Doctrine',
    sub: 'What Makes a Network Summary Reproducible?',
    badge: 'REPRODUCIBILITY DOCTRINE',
    description: 'A network evidence summary is reproducible when any peer analyst can open the master PCAP, apply the cited filter, and see identical packet frames within seconds.',
    details: 'Meera quizzes: "What makes a network summary reproducible? The evidence identifier, time range, filter, packet references, and capture scope."',
    tags: ['Peer Handoff', 'Zero Friction', 'Instant Replication', 'Meera Standard'],
  },
];

// 18. Pillar 3: Network Evidence Dossier & Case Handoff
export const networkDossierSignoffNodes: VisualNodeItem[] = [
  {
    id: 'dos-evidence-anchors',
    label: '1. Master Network Evidence Anchors',
    sub: 'Cryptographic Hash of Capture File',
    badge: 'EVIDENCE ANCHOR',
    description: 'Captures master file details: "BLR-CASE-2026-881.pcap" (SHA-256: 7f8a...c32e), captured at TAP-01 Core DMZ from 14:20:00 to 14:35:00 UTC.',
    details: 'Meera verifies: "The master PCAP file hash guarantees to court and compliance auditors that packet evidence has not been tampered with or modified."',
    tags: ['BLR-CASE-2026-881.pcap', 'SHA-256 Verified', 'TAP-01 Sensor', 'Read-Only Seal'],
  },
  {
    id: 'dos-limitation-statement',
    label: '2. Explicit Boundary & Limitation Statement',
    sub: 'Documenting What Remains Unknown',
    badge: 'SCOPE LIMITATION',
    description: 'Formal statement: "Encrypted TLS 1.3 payload content unobserved. Workstation attribution corroborated via NAT logs. Host endpoint file writes referred to Mentor Ravi."',
    details: 'Meera approves: "Stating your limits explicitly protects the team. You never claim to know what the evidence cannot prove."',
    tags: ['Encrypted Payload Limit', 'NAT Corroborated', 'Host Team Referral', 'Honest Scoping'],
  },
  {
    id: 'dos-meera-review',
    label: '3. Senior Network Review by Mentor Meera',
    sub: 'Supervisory Quality Gate Sign-Off',
    badge: 'SENIOR QUALITY GATE',
    description: 'Mentor Meera audits the packet citations, verifies the display filter syntax, confirms the NAT boundary mapping, and approves the triage ticket.',
    details: 'Meera signs: "Excellent work, Apprentice Analyst. The finance case now has a network perspective with its limits intact."',
    tags: ['Mentor Meera Review', 'Quality Audit', 'Approved Disposition', 'Ready for Shift Lead'],
  },
  {
    id: 'dos-signed-seal',
    label: '4. Certified Shift Handoff Seal',
    sub: 'Integrated Case #2026-881 Network Note',
    badge: 'CERTIFIED HANDOFF',
    description: 'Cryptographically timestamped shift handoff package signed by Apprentice Analyst and Mentor Meera, ready for escalation or resolution.',
    details: 'Meera concludes: "With host logs from Ravi and network telemetry from our team, Case #2026-881 has an airtight multi-source foundation."',
    tags: ['Certified Seal', 'Shift Handoff Complete', 'Case #2026-881', 'Integrated Triage'],
  },
];

// =============================================================================
// COMPLETE MODULE 08 NODES MAPPING DICTIONARY
// =============================================================================
export const module08NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: Packets, flows and PCAP
  'm08-packet-flow-pcap': packetFlowPcapNodes,
  'm08-capture-scope': captureScopeNodes,
  'm08-segment-visibility': segmentVisibilityNodes,

  // Chapter 2: DNS, HTTP(S) and connection metadata
  'm08-tls-metadata-boundary': tlsMetadataBoundaryNodes,
  'm08-dns-telemetry-correlation': dnsTelemetryCorrelationNodes,
  'm08-payload-assumption-trap': payloadAssumptionTrapNodes,

  // Chapter 3: Filters and conversations
  'm08-wireshark-anatomy': wiresharkAnatomyNodes,
  'm08-display-vs-capture-filter': displayVsCaptureFilterNodes,
  'm08-filter-reproducibility': filterReproducibilityNodes,

  // Chapter 4: Repeated attempts and scan-like patterns
  'm08-port-scan-recon': portScanReconNodes,
  'm08-periodic-beacon-analysis': periodicBeaconAnalysisNodes,
  'm08-timing-attribution-doctrine': timingAttributionDoctrineNodes,

  // Chapter 5: Source/destination context
  'm08-nat-pat-translation': natPatTranslationNodes,
  'm08-proxy-header-chain': proxyHeaderChainNodes,
  'm08-attribution-resolution': attributionResolutionNodes,

  // Chapter 6: Write a concise evidence summary
  'm08-pcap-object-extraction': pcapObjectExtractionNodes,
  'm08-concise-evidence-distillation': conciseEvidenceDistillationNodes,
  'm08-network-dossier-signoff': networkDossierSignoffNodes,
};
