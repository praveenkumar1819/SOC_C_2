import { SIEMCorrelation } from "../../types/lab.types";

export const SIEM_DATABASE: Record<string, SIEMCorrelation> = {
  // Lab 01: The primary spear phishing alert
  "SEC-2026-0412": {
    alertId: "SEC-2026-0412",
    rule: "Suspicious Office Application Child Process",
    ruleDescription: "Microsoft Office document spawned PowerShell with encoded or hidden command execution parameters within 120s of email delivery.",
    priority: "MEDIUM-HIGH",
    confidence: 95,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "09:18:47",
        source: "Email Gateway",
        eventType: "Inbound Email Received",
        description: "Email received from accounts-verification@trusted-vendor.com with macro attachment Q4_Invoice_Summary.docm",
        severity: "warning",
      },
      {
        sequence: 2,
        timestamp: "09:19:15",
        source: "EDR (FIN-BOS-MCHEN-047)",
        eventType: "Process Start (WINWORD.EXE)",
        description: "User mchen opened attachment from Downloads folder with Word macro execution enabled",
        severity: "info",
      },
      {
        sequence: 3,
        timestamp: "09:19:58",
        source: "EDR (FIN-BOS-MCHEN-047)",
        eventType: "Anomalous Child Process Spawned",
        description: "WINWORD.EXE spawned powershell.exe with -enc parameter and hidden window flag",
        severity: "critical",
      },
      {
        sequence: 4,
        timestamp: "09:19:59",
        source: "Firewall / Perimeter",
        eventType: "C2 Connection Blocked",
        description: "Outbound HTTPS connection to 198.51.100.84:443 blocked by C2 Threat Intelligence filter",
        severity: "critical",
      },
      {
        sequence: 5,
        timestamp: "09:20:00",
        source: "EDR (FIN-BOS-MCHEN-047)",
        eventType: "Automated Containment Action",
        description: "EDR behavioral blocking policy terminated powershell.exe (PID 6789)",
        severity: "success",
      },
    ],
    verdict: "Multiple telemetry sources confirm a coordinated spear-phishing attack vector. Initial access via email macro succeeded, but automated EDR and firewall controls prevented C2 beaconing. Verified True Positive.",
  },

  // Lab 02 alerts
  "SEC-2026-0421": {
    alertId: "SEC-2026-0421",
    rule: "High Volume Rapid File Modification Pattern",
    ruleDescription: "Heuristic threshold exceeded: more than 50 files created or modified within 60 seconds by a single process tree.",
    priority: "MEDIUM",
    confidence: 42,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "09:14:12",
        source: "Email Gateway",
        eventType: "Email Received",
        description: "Standard PDF newsletter delivered to jsmith@fincorp.local",
        severity: "info",
      },
      {
        sequence: 2,
        timestamp: "09:14:15",
        source: "EDR (FIN-BOS-JSMITH-W4521)",
        eventType: "Antivirus Engine Inspection",
        description: "MsMpEng.exe initiated temporary unpacking in user Temp directory",
        severity: "info",
      },
      {
        sequence: 3,
        timestamp: "09:14:50",
        source: "EDR (FIN-BOS-JSMITH-W4521)",
        eventType: "Bulk File Write Alert",
        description: "52 files ending with .tmp created in C:\\Users\\jsmith\\AppData\\Local\\Temp\\",
        severity: "warning",
      },
    ],
    verdict: "Process lineage belongs exclusively to Microsoft Defender Antivirus scanner. No user files renamed or encrypted. Alert rule is overly sensitive to antivirus unpacking operations. False Positive.",
  },

  "SEC-2026-0422": {
    alertId: "SEC-2026-0422",
    rule: "Privileged Service Account Off-Hours File Access",
    ruleDescription: "Administrative service account accessed >100 server file paths between 00:00 and 06:00.",
    priority: "LOW",
    confidence: 25,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "03:00:00",
        source: "Windows Event Logs",
        eventType: "Service Started",
        description: "VeeamDeploymentService started under service account svc_backup",
        severity: "info",
      },
      {
        sequence: 2,
        timestamp: "03:00:02",
        source: "File Audit Logs",
        eventType: "Mass Read Operation",
        description: "Database files read for snapshot replication",
        severity: "info",
      },
      {
        sequence: 3,
        timestamp: "03:00:15",
        source: "IT Service Management (ITSM)",
        eventType: "Approved Change Window",
        description: "Matching recurring change ticket CHG-2026-8812 verified for Daily Backup Snapshot",
        severity: "success",
      },
    ],
    verdict: "Fully authorized daily maintenance routine by designated service account within approved window. Expected Activity.",
  },

  "SEC-2026-0423": {
    alertId: "SEC-2026-0423",
    rule: "PowerShell Execution with Encoded Command",
    ruleDescription: "Base64 encoded execution flag observed from non-standard parent process accompanied by task scheduler persistence.",
    priority: "HIGH",
    confidence: 96,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "14:45:10",
        source: "EDR",
        eventType: "Script Execution",
        description: "wscript.exe executed SecCert_Installer.vbs from Public directory",
        severity: "warning",
      },
      {
        sequence: 2,
        timestamp: "14:45:30",
        source: "EDR",
        eventType: "Encoded Command Spawned",
        description: "PowerShell invoked with -ExecutionPolicy Bypass and encoded payload",
        severity: "critical",
      },
      {
        sequence: 3,
        timestamp: "14:45:31",
        source: "Windows Event Logs",
        eventType: "Scheduled Task Created",
        description: "Persistence mechanism created task 'WindowsUpdateCache'",
        severity: "critical",
      },
      {
        sequence: 4,
        timestamp: "14:45:32",
        source: "Firewall",
        eventType: "External C2 Beacon Attempt",
        description: "Connection attempted to 203.0.113.195:8443 (Flagged APT Infrastructure)",
        severity: "critical",
      },
    ],
    verdict: "Clear attack chain: script execution, encoded PowerShell, task persistence, and outbound C2 beaconing. Immediate True Positive requiring escalation.",
  },

  "SEC-2026-0424": {
    alertId: "SEC-2026-0424",
    rule: "Database Large Volume Query Anomaly",
    ruleDescription: "Unusual data retrieval pattern detected on development database outside core OLTP schemas.",
    priority: "MEDIUM",
    confidence: 30,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "16:20:00",
        source: "SQL Server Audit",
        eventType: "Batch Job Executed",
        description: "SSIS package DailyLedgerETL.dtsx executed by developer_svc",
        severity: "info",
      },
      {
        sequence: 2,
        timestamp: "16:20:02",
        source: "Network Flow",
        eventType: "Internal Server-to-Server Transfer",
        description: "1.2 GB internal transfer from FIN-BOS-DB-DEV-01 to internal reporting repository",
        severity: "info",
      },
    ],
    verdict: "Standard developer ETL pipeline running on daily schedule with authorized service account. Expected Activity.",
  },

  // Lab 03 alerts
  "INC-001": {
    alertId: "INC-001",
    rule: "Repeated Failed Interactive Logins",
    ruleDescription: "Multiple consecutive BadPassword attempts on standard domain user account.",
    priority: "LOW",
    confidence: 80,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "08:45:00",
        source: "Active Directory (DC01)",
        eventType: "Event ID 4625 (Failed Logon)",
        description: "5 failed logon attempts for user jsmith from FIN-BOS-JSMITH-W4521 (10.20.5.88)",
        severity: "info",
      },
      {
        sequence: 2,
        timestamp: "08:47:00",
        source: "Help Desk Ticket System",
        eventType: "User Ticket Submitted",
        description: "Ticket HD-90812: 'Locked out of computer after morning coffee password typo'",
        severity: "success",
      },
    ],
    verdict: "Routine user lockout, internal workstation IP, confirmed by helpdesk ticket. Low Severity.",
  },

  "INC-002": {
    alertId: "INC-002",
    rule: "Perimeter Malware Inbound Quarantine",
    ruleDescription: "Trojan signature blocked prior to enterprise network ingestion.",
    priority: "LOW",
    confidence: 100,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "08:30:15",
        source: "Email Gateway",
        eventType: "Malware Quarantined",
        description: "Trojan.Generic.4019 blocked in Deductions_2026.xlsm",
        severity: "warning",
      },
      {
        sequence: 2,
        timestamp: "08:30:16",
        source: "Perimeter Mail Router",
        eventType: "Delivery Dropped",
        description: "Zero recipients received the payload. Gateway successfully contained threat.",
        severity: "success",
      },
    ],
    verdict: "Perimeter controls prevented exposure. No host compromised. Low Severity.",
  },

  "INC-004": {
    alertId: "INC-004",
    rule: "External Brute Force Targeting Domain Admin",
    ruleDescription: "Distributed external authentication failures targeting high-privilege administrative accounts.",
    priority: "HIGH",
    confidence: 90,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "09:55:00",
        source: "Perimeter VPN Gateway",
        eventType: "Anomalous External Logon Attempts",
        description: "47 consecutive failed authentication attempts against svance (Domain Admin) from 185.220.101.5",
        severity: "critical",
      },
      {
        sequence: 2,
        timestamp: "09:56:00",
        source: "Threat Intelligence",
        eventType: "Botnet IP Match",
        description: "Source IP identified as active credential stuffing botnet node in Eastern Europe",
        severity: "critical",
      },
    ],
    verdict: "Targeted attack against Tier 0 Domain Admin credential. Currently failing but high criticality due to potential blast radius if breached. High Severity.",
  },

  "INC-005": {
    alertId: "INC-005",
    rule: "Active Ransomware Encryption & Shadow Copy Deletion",
    ruleDescription: "Mass file renaming to .locked and volume shadow copy purge on critical enterprise file repository.",
    priority: "CRITICAL",
    confidence: 100,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "14:01:50",
        source: "EDR (FIN-BOS-FILESERVER-01)",
        eventType: "Shadow Copy Tampering",
        description: "vssadmin.exe delete shadows /all /quiet executed",
        severity: "critical",
      },
      {
        sequence: 2,
        timestamp: "14:02:00",
        source: "File Integrity Monitor",
        eventType: "Mass File Encryption",
        description: "1,420 production enterprise files encrypted with .locked extension in 60s",
        severity: "critical",
      },
      {
        sequence: 3,
        timestamp: "14:02:10",
        source: "Enterprise Monitoring",
        eventType: "Operational Outage",
        description: "500+ employees unable to access shared financial repositories",
        severity: "critical",
      },
    ],
    verdict: "Active emergency. Production file server compromised and being encrypted right now. Critical Severity — All Hands on Deck.",
  },

  // Lab 04 alerts
  "SEC-2026-0503": {
    alertId: "SEC-2026-0503",
    rule: "Domain Admin Account Anomalous File Access",
    ruleDescription: "Domain Admin credentials used to traverse corporate network shares from non-administrative client IP.",
    priority: "HIGH",
    confidence: 92,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "09:22:00",
        source: "Active Directory Audit",
        eventType: "Kerberos Ticket Granting Request",
        description: "svance (DA) authenticated from workstation FIN-BOS-MCHEN-047 (10.20.5.147)",
        severity: "critical",
      },
      {
        sequence: 2,
        timestamp: "09:23:00",
        source: "File Server Audit",
        eventType: "Privileged Share Enumeration",
        description: "Mass read access across \\\\FIN-BOS-FILESERVER-01\\Confidential_Customer_Records",
        severity: "critical",
      },
    ],
    verdict: "Compromised endpoint is hosting unauthorized lateral movement using hijacked Domain Admin credential.",
  },

  "SEC-2026-0504": {
    alertId: "SEC-2026-0504",
    rule: "Mass Data Exfiltration to External Untrusted Host",
    ruleDescription: "NetFlow threshold exceeded: >100 GB egress transmission to unclassified external IP.",
    priority: "CRITICAL",
    confidence: 98,
    correlatedEvents: [
      {
        sequence: 1,
        timestamp: "09:25:00",
        source: "Core Switch NetFlow",
        eventType: "Abnormal Egress Spike",
        description: "250 GB compressed archive transmitted over port 443 to 198.51.100.200",
        severity: "critical",
      },
      {
        sequence: 2,
        timestamp: "09:25:30",
        source: "DLP (Data Loss Prevention)",
        eventType: "PII Match",
        description: "Archive contains customer social security numbers, bank routing codes, and financial histories",
        severity: "critical",
      },
    ],
    verdict: "Data breach in progress: 2M+ customer financial records compromised. Requires immediate crisis escalation.",
  },
};

export const getSIEMCorrelationByAlert = (alertId: string): SIEMCorrelation | null => {
  return SIEM_DATABASE[alertId] || null;
};
