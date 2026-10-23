import { FirewallLog } from "../../types/lab.types";

export const FIREWALL_DATABASE: Record<string, FirewallLog[]> = {
  // Lab 01: The primary spear phishing alert
  "SEC-2026-0412": [
    {
      id: "FW-LOG-00847",
      timestamp: "2026-01-15 09:19:59 EST",
      sourceIp: "10.20.5.147",
      sourcePort: 54782,
      destinationIp: "198.51.100.84",
      destinationPort: 443,
      protocol: "HTTPS",
      action: "BLOCKED",
      rule: "Outbound to Known Malware C2 Infrastructure",
      dataTransferred: "0 bytes (blocked before TLS handshake)",
      threatIntel: {
        destination: "198.51.100.84",
        reputation: "MALWARE C2 SERVER",
        knownGroup: "Emotet / TA542 Command & Control Infrastructure",
        abuseReports: 47,
        previousIncidents: 23,
        lastSeen: "2 weeks ago (Active in global spam campaigns)",
        geoLocation: "Bucharest, Romania (AS49981 High-Risk VPS)",
        riskLevel: "CRITICAL",
      },
    },
    {
      id: "FW-LOG-00846",
      timestamp: "2026-01-15 09:15:20 EST",
      sourceIp: "10.20.5.147",
      sourcePort: 53102,
      destinationIp: "10.20.100.5",
      destinationPort: 88,
      protocol: "Kerberos",
      action: "ALLOWED",
      rule: "Internal Domain Authentication Policy",
      dataTransferred: "1.4 KB",
      threatIntel: {
        destination: "10.20.100.5",
        reputation: "INTERNAL INFRASTRUCTURE (DC01)",
        riskLevel: "LOW",
      },
    },
  ],

  // Lab 02 alerts
  "SEC-2026-0421": [
    {
      id: "FW-LOG-00910",
      timestamp: "2026-01-16 09:14:20 EST",
      sourceIp: "10.20.5.88",
      sourcePort: 49812,
      destinationIp: "20.190.159.2",
      destinationPort: 443,
      protocol: "HTTPS",
      action: "ALLOWED",
      rule: "Microsoft Cloud Antivirus Definition Update",
      dataTransferred: "2.4 MB",
      threatIntel: {
        destination: "20.190.159.2",
        reputation: "MICROSOFT SMART SCREEN CLOUD ENGINE",
        riskLevel: "LOW",
        geoLocation: "Redmond, WA, USA",
      },
    },
  ],

  "SEC-2026-0422": [
    {
      id: "FW-LOG-00915",
      timestamp: "2026-01-16 03:00:10 EST",
      sourceIp: "10.20.100.32",
      sourcePort: 445,
      destinationIp: "10.20.100.18",
      destinationPort: 445,
      protocol: "SMB",
      action: "ALLOWED",
      rule: "Internal Data Center Backup Replication Link",
      dataTransferred: "84.2 GB",
      threatIntel: {
        destination: "10.20.100.18",
        reputation: "FIN-BOS-FILESERVER-01 (Internal)",
        riskLevel: "LOW",
      },
    },
  ],

  "SEC-2026-0423": [
    {
      id: "FW-LOG-00933",
      timestamp: "2026-01-16 14:45:32 EST",
      sourceIp: "10.20.8.21",
      sourcePort: 58210,
      destinationIp: "203.0.113.195",
      destinationPort: 8443,
      protocol: "TLS",
      action: "BLOCKED",
      rule: "Threat Intelligence Feed: Cobalt Strike Malleable C2",
      dataTransferred: "128 bytes (RST sent)",
      threatIntel: {
        destination: "203.0.113.195",
        reputation: "ACTIVE COBALT STRIKE TEAM SERVER",
        knownGroup: "UNC2452 / APT29 Staging",
        abuseReports: 114,
        previousIncidents: 6,
        lastSeen: "24 hours ago",
        geoLocation: "Saint Petersburg, Russia",
        riskLevel: "CRITICAL",
      },
    },
  ],

  "SEC-2026-0424": [
    {
      id: "FW-LOG-00940",
      timestamp: "2026-01-16 16:20:05 EST",
      sourceIp: "10.20.100.40",
      sourcePort: 1433,
      destinationIp: "10.20.100.18",
      destinationPort: 445,
      protocol: "SMB/TDS",
      action: "ALLOWED",
      rule: "Internal SSIS Data Warehouse Sync",
      dataTransferred: "1.2 GB",
      threatIntel: {
        destination: "10.20.100.18",
        reputation: "FIN-BOS-FILESERVER-01 (Internal File Server)",
        riskLevel: "LOW",
      },
    },
  ],

  // Lab 03 alerts
  "INC-004": [
    {
      id: "FW-LOG-01004",
      timestamp: "2026-01-17 09:55:00 EST",
      sourceIp: "185.220.101.5",
      sourcePort: 41209,
      destinationIp: "172.16.10.1",
      destinationPort: 443,
      protocol: "HTTPS (VPN)",
      action: "BLOCKED",
      rule: "Brute Force Threshold Rate Limiting",
      dataTransferred: "12 KB",
      threatIntel: {
        destination: "185.220.101.5",
        reputation: "TOR EXIT NODE / BRUTE FORCE BOTNET",
        abuseReports: 382,
        riskLevel: "HIGH",
        geoLocation: "Frankfurt, Germany",
      },
    },
  ],

  // Lab 04 alerts
  "SEC-2026-0504": [
    {
      id: "FW-LOG-01050",
      timestamp: "2026-01-18 09:25:00 EST",
      sourceIp: "10.20.5.147",
      sourcePort: 60124,
      destinationIp: "198.51.100.200",
      destinationPort: 443,
      protocol: "HTTPS",
      action: "ALLOWED",
      rule: "Default Outbound Web Traffic (Egress filter bypass via standard 443)",
      dataTransferred: "250 GB",
      threatIntel: {
        destination: "198.51.100.200",
        reputation: "BULLETPROOF HOSTING / EXFILTRATION DROPBOX",
        knownGroup: "APT Data Harvester",
        abuseReports: 89,
        riskLevel: "CRITICAL",
        geoLocation: "Seychelles (Offshore Cloud Provider)",
      },
    },
  ],
};

export const getFirewallLogsByAlert = (alertId: string): FirewallLog[] => {
  return FIREWALL_DATABASE[alertId] || [];
};
