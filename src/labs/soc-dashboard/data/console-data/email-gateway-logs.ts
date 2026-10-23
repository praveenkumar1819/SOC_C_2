import { EmailLog } from "../../types/lab.types";

export const EMAIL_GATEWAY_DATABASE: Record<string, EmailLog[]> = {
  // Lab 01: The primary spear phishing alert
  "SEC-2026-0412": [
    {
      id: "EMAIL-089347",
      timestamp: "2026-01-15 09:18:47 EST",
      from: "accounts-verification@trusted-vendor.com",
      realSender: "accounts@trusted-vendor.com (Spoofed / Typosquat)",
      to: "mchen@fincorp.local",
      subject: "Invoice Q4 2025 — Action Required",
      body: `Michael,

Please review and confirm the reconciliation figures on the attached quarterly invoice document immediately to prevent service disruption to FinCorp finance operations.

Kind regards,
Vendor Billing Accounts Team
TrustDesk Automated Services`,
      attachment: {
        filename: "Q4_Invoice_Summary.docm",
        size: "247.8 KB",
        extension: ".docm",
        isMacroEnabled: true,
        hash: "a3f8e7c2b1d4f6a9e2c5b8d1f4a7e3b6d091e4f20188bb3e9",
        verdict: "MALICIOUS VBA MACRO DETECTED",
      },
      riskScore: 87,
      verdictLabel: "FLAGGED AS SUSPICIOUS",
      verdictColor: "danger",
      indicators: [
        "Spoofed sender domain (added '-verification' suffix)",
        "Macro-enabled Office document attachment (.docm)",
        "Urgent call-to-action language triggering immediate click",
        "Sender IP originates from unauthenticated external VPS hosting",
      ],
    },
  ],

  // Lab 02 alerts
  "SEC-2026-0421": [
    {
      id: "EMAIL-089401",
      timestamp: "2026-01-16 09:14:12 EST",
      from: "newsletter@industry-brief.org",
      to: "jsmith@fincorp.local",
      subject: "Weekly Global Banking Technology Digest #441",
      body: "Attached is the monthly market intelligence summary for financial accountants.",
      attachment: {
        filename: "Digest_Jan2026.pdf",
        size: "3.2 MB",
        extension: ".pdf",
        isMacroEnabled: false,
        hash: "e9c1234589abcdef1029384756abcdef01928374",
        verdict: "CLEAN - PASSED CONTENT DISARM",
      },
      riskScore: 8,
      verdictLabel: "BENIGN SCAN IN PROGRESS",
      verdictColor: "info",
      indicators: [
        "Domain reputation valid (Clean sender history)",
        "Sender SPF, DKIM, DMARC aligned and verified PASS",
        "Mail scanner unpacked 52 temp files during deep heuristic inspection",
      ],
    },
  ],

  "SEC-2026-0422": [],

  "SEC-2026-0423": [
    {
      id: "EMAIL-089550",
      timestamp: "2026-01-16 14:38:10 EST",
      from: "security-support@secure-update-fincorp.com",
      to: "staff-all@fincorp.local",
      subject: "URGENT: Mandatory Endpoint Security Certificate Installation",
      body: "Please run the attached self-updating certificate utility to maintain corporate VPN access.",
      attachment: {
        filename: "SecCert_Installer.iso",
        size: "1.4 MB",
        extension: ".iso",
        isMacroEnabled: false,
        hash: "b54fa3e990231ccf128490a0d9e48271a3998b",
        verdict: "SUSPICIOUS CONTAINER FILE",
      },
      riskScore: 92,
      verdictLabel: "PHISHING WITH MALWARE CONTAINER",
      verdictColor: "danger",
      indicators: [
        "Lookalike domain mimicking FinCorp IT security team",
        "ISO container file bypassing default mark-of-the-web restrictions",
        "Embedded LNK shortcut spawning powershell.exe",
      ],
    },
  ],

  "SEC-2026-0424": [],

  // Lab 03 alerts
  "INC-002": [
    {
      id: "EMAIL-089602",
      timestamp: "2026-01-17 08:30:15 EST",
      from: "payroll-notification@quick-benefits-online.org",
      to: "finance-dept@fincorp.local",
      subject: "Updated 2026 Benefit Deductions Form",
      body: "Quarantined email blocked at gateway perimeter.",
      attachment: {
        filename: "Deductions_2026.xlsm",
        size: "180 KB",
        extension: ".xlsm",
        isMacroEnabled: true,
        hash: "77aa88bb99cc11dd22ee33ff4400112233445566",
        verdict: "KNOWN TROJAN DROPPER",
      },
      riskScore: 96,
      verdictLabel: "QUARANTINED AT PERIMETER (0 RECIPIENTS DELIVERED)",
      verdictColor: "warning",
      indicators: [
        "Matched ClamAV & Proofpoint signature Trojan.Generic.4019",
        "Gateway automatically quarantined before inbound mail routing",
        "No mailbox delivery; threat contained at perimeter",
      ],
    },
  ],

  // Lab 04 alerts
  "SEC-2026-0501": [
    {
      id: "EMAIL-090100",
      timestamp: "2026-01-18 09:00:00 EST",
      from: "procurement-review@partner-fincorp-portal.com",
      to: "47 recipients (Finance & HR Distribution Lists)",
      subject: "Confidential: Q1 2026 Restructuring and Executive Bonus Allocations",
      body: "Attached is the encrypted compensation allocation schedule. Enable document editing macros to calculate your department adjustments.",
      attachment: {
        filename: "Bonus_Allocation_Matrix_2026.docm",
        size: "312 KB",
        extension: ".docm",
        isMacroEnabled: true,
        hash: "11223344556677889900aabbccddeeff12345678",
        verdict: "CRITICAL COBALT STRIKE MALDOC",
      },
      riskScore: 99,
      verdictLabel: "TARGETED APT SPEAR-PHISHING CAMPAIGN",
      verdictColor: "danger",
      indicators: [
        "Blast radius: 47 targeted corporate executives and analysts",
        "Polymorphic VBA macro designed to evade static heuristics",
        "Payload staging server linked to advanced threat actor UNC4120",
      ],
    },
  ],
};

export const getEmailLogsByAlert = (alertId: string): EmailLog[] => {
  return EMAIL_GATEWAY_DATABASE[alertId] || [];
};
