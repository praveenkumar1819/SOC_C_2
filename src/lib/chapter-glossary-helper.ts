import { SOC_GLOSSARY_TERMS, GlossaryTerm } from '@/data/soc-glossary-terms';

// Curated Module-Level Default Relevant Terms
export const MODULE_GLOSSARY_MAP: Record<string, string[]> = {
  '00': [
    'SOC',
    'Tier 1 Analyst',
    'Event',
    'Alert',
    'Incident',
    'Phishing',
    'Alert Triage',
    'SOP',
    'Playbook',
    'Workstation',
    'SLA',
    'MTTD',
    'MTTR',
    'True Positive',
    'False Positive',
  ],
  '01': [
    'Workstation',
    'CPU Utilization',
    'Memory (RAM)',
    'Kernel (OS Master Coordinator)',
    'Syscall (System Call)',
    'Virtual Memory & Paging',
    'Least Privilege',
    'Administrator Privileges',
    'Command Line (CLI)',
    'PowerShell',
    'powershell.exe',
    'cmd.exe',
    'Process',
    'PID',
    'PPID',
    'Parent Process',
    'Child Process',
    'Process Tree',
    'svchost.exe',
    'Windows Event Log',
    'Sysmon',
    'Port',
    'Port 443 (HTTPS)',
  ],
  '02': [
    'IP Address',
    'MAC Address',
    'Subnet',
    'Default Gateway',
    'NAT (Network Address Translation)',
    'VLAN (Virtual Local Area Network)',
    'TCP 3-Way Handshake',
    'UDP (User Datagram Protocol)',
    'ARP (Address Resolution Protocol)',
    'DHCP',
    'DNS',
    'DNS Tunneling',
    'Port',
    'Port 443 (HTTPS)',
    'Port 3389 (RDP)',
    'Next-Gen Firewall (NGFW)',
    'PCAP',
    'NetFlow',
    'Ingress Traffic',
    'Egress Traffic',
  ],
  '03': [
    'CIA Triad',
    'Asset Value',
    'Least Privilege',
    'Defense-in-Depth',
    'Zero-Day Vulnerability',
    'Ransomware',
    'CVE',
    'CVSS',
    'Threat Hunting',
    'IOC',
    'Compliance & Audit',
    'Backup & Disaster Recovery',
    'Insider Threat',
  ],
  '04': [
    'Alert Triage',
    'Alert',
    'Alert Fatigue',
    'True Positive',
    'False Positive',
    'True Negative',
    'False Negative',
    'Severity',
    'SLA',
    'MTTD',
    'MTTR',
    'Tier 1 Analyst',
    'Tier 2 Analyst',
    'Tier 3 Analyst',
    'Escalation Pathway',
    'Case Record / Incident Dossier',
    'SOP',
    'Playbook',
    'SOC',
    'Domain Controller',
    'Event ID 4625',
    'Event ID 4624',
  ],
  '05': [
    'SIEM',
    'Log Ingestion',
    'Log Normalization',
    'CIM',
    'SPL',
    'KQL',
    'Threshold Rule',
    'Event Correlation',
    'Telemetry',
    'Signal-to-Noise Ratio (SNR)',
    'False Positive',
    'Windows Event Log',
    'Syslog',
  ],
  '06': [
    'Event',
    'Windows Event Log',
    'Syslog',
    'Event ID 4624',
    'Event ID 4625',
    'Event ID 4688',
    'Event ID 4672',
    'Event ID 1102',
    'Event ID 4720',
    'Event ID 7045',
    'Command-Line Arguments',
    'Event Correlation',
    'Telemetry',
  ],
  '07': [
    'Sysmon',
    'Windows Event Log',
    'Windows Registry',
    'Registry Run Keys',
    'Scheduled Task',
    'Process Tree',
    'Parent Process',
    'Child Process',
    'lsass.exe',
    'svchost.exe',
    'explorer.exe',
    'Command-Line Arguments',
    'Service / Daemon',
    'Task Manager',
  ],
  '08': [
    'PCAP',
    'NetFlow',
    'IDS / IPS',
    'DNS Tunneling',
    'Beaconing',
    'Ingress Traffic',
    'Egress Traffic',
    'Web Proxy / SWG',
    'Next-Gen Firewall (NGFW)',
    'Port',
    'Port 443 (HTTPS)',
    'Port 3389 (RDP)',
  ],
  '09': [
    'EDR',
    'Host Isolation',
    'Living off the Land (LOLBAS)',
    'Process Injection',
    'DLL Hijacking',
    'Process Termination',
    'Memory (RAM)',
    'Reverse Shell',
    'C2',
    'Base64 Obfuscation',
    'Telemetry',
  ],
  '10': [
    'XDR (Extended Detection and Response)',
    'EDR',
    'NDR',
    'SIEM',
    'Sandboxing',
    'Next-Gen Firewall (NGFW)',
    'Web Proxy / SWG',
    'EPP',
    'Defense-in-Depth',
  ],
  '11': [
    'Active Directory (AD)',
    'Domain Controller',
    'Domain Admin',
    'Kerberos',
    'MFA',
    'Group Policy (GPO)',
    'Phishing',
    'Spear Phishing',
    'Whaling',
    'Business Email Compromise (BEC)',
    'DMARC / DKIM / SPF',
    'Secure Email Gateway (SEG)',
    'IOC',
    'IP Reputation',
    'TTP',
  ],
  '12': [
    'SOAR',
    'Playbook',
    'SOP',
    'Host Isolation',
    'Alert Triage',
    'Signal-to-Noise Ratio (SNR)',
    'Case Record / Incident Dossier',
    'Escalation Pathway',
    'Tier 1 Analyst',
  ],
  '13': [
    'MITRE ATT&CK',
    'TTP',
    'Cyber Kill Chain',
    'Diamond Model',
    'Lateral Movement',
    'Persistence Mechanism',
    'Data Exfiltration',
    'C2',
    'Dwell Time',
    'Living off the Land (LOLBAS)',
    'Process Injection',
  ],
  '14': [
    'Incident',
    'Incident Commander',
    'Chain of Custody',
    'Case Record / Incident Dossier',
    'Shift Handover',
    'Warm Technical Handover',
    'Blast Radius',
    'Backup & Disaster Recovery',
    'SLA',
    'MTTD',
    'MTTR',
    'Escalation Pathway',
  ],
};

/**
 * Extracts and scores relevant terms for a given chapter/unit/module
 */
export function resolveChapterGlossaryTerms(context: {
  moduleId?: string;
  chapterId?: string;
  chapterTitle?: string;
  unitTitle?: string;
  pillarHeadings?: string[];
  techBoxTitles?: string[];
}): string[] {
  const matched = new Set<string>();

  // 1. Add curated module-level terms
  const cleanModId = (context.moduleId || '01').replace(/^m/i, '').padStart(2, '0');
  const modTerms = MODULE_GLOSSARY_MAP[cleanModId] || MODULE_GLOSSARY_MAP['01'] || [];
  modTerms.forEach((t) => matched.add(t));

  // 2. Scan chapter text sources against SOC_GLOSSARY_TERMS
  const combinedText = [
    context.chapterTitle || '',
    context.unitTitle || '',
    ...(context.pillarHeadings || []),
    ...(context.techBoxTitles || []),
  ]
    .join(' ')
    .toLowerCase();

  for (const termObj of SOC_GLOSSARY_TERMS) {
    const rawTerm = termObj.term.toLowerCase();
    const cleanTerm = rawTerm.replace(/\s*\([^)]*\)/g, '').trim();

    if (
      cleanTerm.length > 2 &&
      (combinedText.includes(cleanTerm) ||
        (termObj.fullForm && combinedText.includes(termObj.fullForm.toLowerCase())))
    ) {
      matched.add(termObj.term);
    }
  }

  return Array.from(matched);
}
