import { EDRProcessTree } from "../../types/lab.types";

export const EDR_DATABASE: Record<string, EDRProcessTree> = {
  // Lab 01: The primary spear phishing alert
  "SEC-2026-0412": {
    timestamp: "2026-01-15 09:19:58 EST",
    host: "FIN-BOS-MCHEN-047",
    user: "mchen",
    processes: [
      {
        name: "explorer.exe",
        pid: 4321,
        ppid: 1104,
        commandLine: "C:\\Windows\\explorer.exe",
        timestamp: "09:15:00",
        user: "FINCORP\\mchen",
        status: "running",
        severity: "INFO",
        children: [
          {
            name: "WINWORD.EXE",
            pid: 5678,
            ppid: 4321,
            commandLine: '"C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE" "C:\\Users\\mchen\\Downloads\\Q4_Invoice_Summary.docm"',
            timestamp: "09:19:15",
            user: "FINCORP\\mchen",
            status: "running",
            severity: "MEDIUM",
            action: "Document macro execution enabled by user",
            children: [
              {
                name: "powershell.exe",
                pid: 6789,
                ppid: 5678,
                commandLine: "powershell.exe -NoP -NonI -W Hidden -enc AQBBIQB7... [Base64 DownloadString payload]",
                timestamp: "09:19:58",
                user: "FINCORP\\mchen",
                status: "TERMINATED",
                severity: "CRITICAL",
                action: "EDR Behavioral Rule: Suspicious Office Application Child Process — Process Killed",
                networkAttempt: {
                  destination: "198.51.100.84:443",
                  protocol: "HTTPS",
                  status: "BLOCKED",
                  blockReason: "Known Command & Control (C2) Server destination",
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // Lab 02 alerts
  "SEC-2026-0421": {
    timestamp: "2026-01-16 09:15:00 EST",
    host: "FIN-BOS-JSMITH-W4521",
    user: "jsmith",
    processes: [
      {
        name: "MsMpEng.exe",
        pid: 2410,
        ppid: 780,
        commandLine: "C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.23110.3-0\\MsMpEng.exe",
        timestamp: "09:14:15",
        user: "NT AUTHORITY\\SYSTEM",
        status: "running",
        severity: "INFO",
        action: "Anti-Malware Engine Sandbox Unpacking",
        children: [
          {
            name: "MpCopyAccelerator.exe",
            pid: 4892,
            ppid: 2410,
            commandLine: "MpCopyAccelerator.exe --unpack-temp C:\\Users\\jsmith\\AppData\\Local\\Temp\\~scan_52.tmp",
            timestamp: "09:14:50",
            user: "NT AUTHORITY\\SYSTEM",
            status: "exited",
            severity: "LOW",
            action: "Created 52 temporary scratch files (.tmp) for content sandboxing",
          },
        ],
      },
    ],
  },

  "SEC-2026-0422": {
    timestamp: "2026-01-16 03:00:00 EST",
    host: "FIN-BOS-SERVER-DB01",
    user: "svc_backup",
    processes: [
      {
        name: "services.exe",
        pid: 640,
        ppid: 480,
        commandLine: "C:\\Windows\\system32\\services.exe",
        timestamp: "03:00:00",
        user: "NT AUTHORITY\\SYSTEM",
        status: "running",
        severity: "INFO",
        children: [
          {
            name: "VeeamDeploymentService.exe",
            pid: 3108,
            ppid: 640,
            commandLine: '"C:\\Program Files\\Veeam\\Backup and Replication\\VeeamDeploymentService.exe" --job "Daily_DB_Snapshot"',
            timestamp: "03:00:02",
            user: "FINCORP\\svc_backup",
            status: "running",
            severity: "LOW",
            action: "Scheduled maintenance snapshot (Ticket: CHG-2026-8812)",
          },
        ],
      },
    ],
  },

  "SEC-2026-0423": {
    timestamp: "2026-01-16 14:45:30 EST",
    host: "FIN-BOS-W7821",
    user: "Unknown",
    processes: [
      {
        name: "wscript.exe",
        pid: 8812,
        ppid: 4120,
        commandLine: "wscript.exe C:\\Users\\Public\\SecCert_Installer.vbs",
        timestamp: "14:45:10",
        user: "FINCORP\\dclark",
        status: "running",
        severity: "HIGH",
        children: [
          {
            name: "powershell.exe",
            pid: 9024,
            ppid: 8812,
            commandLine: "powershell.exe -ExecutionPolicy Bypass -enc SQBFACgA... [Encrypted C2 Loader]",
            timestamp: "14:45:30",
            user: "FINCORP\\dclark",
            status: "running",
            severity: "CRITICAL",
            action: "Created scheduled task 'WindowsUpdateCache' pointing to AppData binary",
            networkAttempt: {
              destination: "203.0.113.195:8443",
              protocol: "TLS",
              status: "ATTEMPTED",
              blockReason: "Firewall beacon detection",
            },
          },
        ],
      },
    ],
  },

  "SEC-2026-0424": {
    timestamp: "2026-01-16 16:20:00 EST",
    host: "FIN-BOS-DB-DEV-01",
    user: "developer_svc",
    processes: [
      {
        name: "SQLAGENT.EXE",
        pid: 1420,
        ppid: 890,
        commandLine: '"C:\\Program Files\\Microsoft SQL Server\\MSSQL16.MSSQLSERVER\\MSSQL\\Binn\\SQLAGENT.EXE" -i MSSQLSERVER',
        timestamp: "16:20:00",
        user: "NT SERVICE\\SQLSERVERAGENT",
        status: "running",
        severity: "INFO",
        children: [
          {
            name: "DTExec.exe",
            pid: 7740,
            ppid: 1420,
            commandLine: "DTExec.exe /F C:\\SSIS_Packages\\DailyLedgerETL.dtsx",
            timestamp: "16:20:02",
            user: "FINCORP\\developer_svc",
            status: "running",
            severity: "LOW",
            action: "Standard daily 4:00 PM batch ETL export to internal data lake",
          },
        ],
      },
    ],
  },

  // Lab 03 alerts
  "INC-003": {
    timestamp: "2026-01-17 11:15:20 EST",
    host: "FIN-BOS-WS-099",
    user: "kpatel",
    processes: [
      {
        name: "cmd.exe",
        pid: 5120,
        ppid: 3900,
        commandLine: "cmd.exe /c powershell.exe -enc VwByAGkAdABlAC0ASABvAHMAdAA=",
        timestamp: "11:15:20",
        user: "FINCORP\\kpatel",
        status: "running",
        severity: "MEDIUM",
        action: "Non-critical workstation executing short encoded string",
      },
    ],
  },

  "INC-005": {
    timestamp: "2026-01-17 14:02:11 EST",
    host: "FIN-BOS-FILESERVER-01",
    user: "SYSTEM",
    processes: [
      {
        name: "vssadmin.exe",
        pid: 9912,
        ppid: 9810,
        commandLine: "vssadmin.exe delete shadows /all /quiet",
        timestamp: "14:01:50",
        user: "NT AUTHORITY\\SYSTEM",
        status: "exited",
        severity: "CRITICAL",
        action: "Volume Shadow Copy deletion detected",
      },
      {
        name: "crypt_worker.exe",
        pid: 9940,
        ppid: 9810,
        commandLine: "C:\\ProgramData\\crypt_worker.exe -encrypt D:\\Shares\\Corporate\\*.*",
        timestamp: "14:02:00",
        user: "NT AUTHORITY\\SYSTEM",
        status: "running",
        severity: "CRITICAL",
        action: "Mass file renaming: 1,420 files renamed to .locked. Immediate emergency containment required!",
      },
    ],
  },

  // Lab 04 alerts
  "SEC-2026-0502": {
    timestamp: "2026-01-18 09:15:10 EST",
    host: "FIN-BOS-MCHEN-047",
    user: "mchen",
    processes: [
      {
        name: "WINWORD.EXE",
        pid: 7110,
        ppid: 4200,
        commandLine: '"WINWORD.EXE" "Bonus_Allocation_Matrix_2026.docm"',
        timestamp: "09:12:00",
        user: "FINCORP\\mchen",
        status: "running",
        severity: "HIGH",
        children: [
          {
            name: "rundll32.exe",
            pid: 7240,
            ppid: 7110,
            commandLine: "rundll32.exe C:\\Users\\mchen\\AppData\\Local\\Temp\\update.dll,DllRegisterServer",
            timestamp: "09:15:10",
            user: "FINCORP\\mchen",
            status: "running",
            severity: "CRITICAL",
            action: "Cobalt Strike Beacon reflective DLL injection",
          },
        ],
      },
    ],
  },
};

export const getEDRProcessTreeByAlert = (alertId: string): EDRProcessTree | null => {
  return EDR_DATABASE[alertId] || null;
};
