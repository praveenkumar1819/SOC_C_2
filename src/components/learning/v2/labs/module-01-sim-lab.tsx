'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  CheckCircle2,
  Check,
  RotateCcw,
  Sparkles,
  UserCheck,
  Shield,
  Clock,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Award,
  Play,
  FileText,
  Server,
  Cpu,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import { useProgressStore } from '@/store/progress-store';
import { sound } from '@/lib/sound-effects';

interface Module01SimLabProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export function Module01SimLab({ isOpen, onClose, onCompleted }: Module01SimLabProps) {
  const { showToast } = useToast();
  const addXP = useProgressStore((state) => state.addXP);

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [learnerNotes, setLearnerNotes] = useState(
    'Workstation cdac-blr-ws01 verified. Account analyst possesses standard privileges with sudo group membership. Baseline processes include systemd, rsyslogd, auditd, and OpenSSH daemon.'
  );

  // Task state tracking
  const [task1Hostname, setTask1Hostname] = useState(false);
  const [task1Os, setTask1Os] = useState(false);
  const [task2User, setTask2User] = useState(false);
  const [task2Pwd, setTask2Pwd] = useState(false);
  const [task3Processes, setTask3Processes] = useState(false);

  // Terminal scroll ref
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command logs with initial motd
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)',
    },
    {
      id: 'init-2',
      type: 'system',
      text: ' * Documentation:  https://help.ubuntu.com\n * Management:     https://landscape.canonical.com\n * Support:        https://ubuntu.com/pro\n\n  System information as of ' +
        new Date().toUTCString() +
        ':\n  System load:  0.08               Processes:             104\n  Usage of /:   22.4% of 39.2GB     Users logged in:       1\n  Memory usage: 18%                IP address for eth0:   192.168.10.25\n\nCDAC Bengaluru Branch Security Lab Environment [LAB-01 Active].\nType "help" for a list of valid investigation commands or click the quick pills below.\n',
    },
  ]);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Check overall lab completion
  const isAllTasksDone = (task1Hostname || task1Os) && task2User && task2Pwd && task3Processes;

  useEffect(() => {
    if (isAllTasksDone && !isCompleted) {
      setIsCompleted(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'All Orientation Tasks Satisfied! 🎉',
        description: 'You have collected all required host evidence. Click Submit Lab Report below to claim your XP.',
      });
    }
  }, [isAllTasksDone, isCompleted, showToast]);

  if (!isOpen) return null;

  const handleCommandExecute = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playClick();

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    // Add input log
    const newLogs: CommandLog[] = [
      ...logs,
      {
        id: `in-${Date.now()}`,
        type: 'input',
        text: `analyst@cdac-blr-ws01:~$ ${cmd}`,
      },
    ];

    const lower = cmd.toLowerCase();

    // Parse commands
    if (lower === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `Available Orientation Commands:
  hostname           - Display host machine network name
  uname -a           - Print kernel and system architecture info
  cat /etc/os-release- View Ubuntu distribution release info
  whoami             - Show current logged-in user account
  id                 - View user UID, GID, and assigned group memberships
  pwd                - Print current working directory path
  ls -la             - List files and hidden dotfiles in directory
  cat soc_notes.txt  - Read onboarding orientation briefing from Mentor Ravi
  ps aux             - Snapshot table of all running background and system processes
  ps aux | grep sshd - Filter process list for OpenSSH daemon
  df -h              - Inspect disk filesystem capacity
  free -m            - Inspect RAM and swap memory allocation
  clear              - Wipe terminal screen output
  history            - Show history of typed commands`,
      });
    } else if (lower === 'hostname') {
      setTask1Hostname(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: 'cdac-blr-ws01',
      });
    } else if (lower === 'uname -a' || lower === 'uname') {
      setTask1Os(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: 'Linux cdac-blr-ws01 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux',
      });
    } else if (lower === 'cat /etc/os-release' || lower === 'cat /etc/issue') {
      setTask1Os(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `PRETTY_NAME="Ubuntu 24.04 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=noble`,
      });
    } else if (lower === 'whoami') {
      setTask2User(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: 'analyst',
      });
    } else if (lower === 'id') {
      setTask2User(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: 'uid=1001(analyst) gid=1001(analyst) groups=1001(analyst),4(adm),24(cdrom),27(sudo),110(lxd)',
      });
    } else if (lower === 'pwd') {
      setTask2Pwd(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: '/home/analyst',
      });
    } else if (lower === 'ls' || lower === 'ls -l' || lower === 'ls -la' || lower === 'ls -a') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `total 36
drwxr-x--- 5 analyst analyst 4096 May 14 08:30 .
drwxr-xr-x 3 root    root    4096 May 14 08:00 ..
-rw------- 1 analyst analyst  840 May 14 08:32 .bash_history
-rw-r--r-- 1 analyst analyst  220 May 14 08:00 .bash_logout
-rw-r--r-- 1 analyst analyst 3771 May 14 08:00 .bashrc
-rw-r--r-- 1 analyst analyst  807 May 14 08:00 .profile
drwxr-xr-x 2 analyst analyst 4096 May 14 08:15 documents
drwxr-xr-x 2 analyst analyst 4096 May 14 08:20 logs
-rw-r--r-- 1 analyst analyst 1120 May 14 08:10 soc_notes.txt`,
      });
    } else if (lower === 'cat soc_notes.txt') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `======================================================================
CDAC BENGALURU SOC ONBOARDING - WORKSTATION 01 ORIENTATION
======================================================================
Welcome, Junior Analyst!

Before we allow any team member to analyze raw network packets or triage live 
SIEM security alerts, you must be 100% familiar with your investigation rig.

Your Checklist:
1. System Identity: Run 'hostname' and 'cat /etc/os-release'.
   Ensure you are working inside Ubuntu 24.04 LTS on node cdac-blr-ws01.
2. Account Baseline: Run 'whoami', 'id', and 'pwd'.
   Confirm you operate as 'analyst' in '/home/analyst' with sudo rights.
3. Process Inspection: Run 'ps aux'.
   Take note of PID 1 (systemd), syslog daemon, and OpenSSH daemon.

Once verified, fill out your workstation inventory findings and submit your 
report for verification. Good luck!

-- Mentor Ravi (Lead Infrastructure & Systems Security)
======================================================================`,
      });
    } else if (lower === 'ps aux' || lower === 'ps -ef' || lower === 'ps') {
      setTask3Processes(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2 168924 13580 ?        Ss   08:00   0:01 /sbin/init
root       382  0.0  0.1  45230  8210 ?        Ss   08:00   0:00 /lib/systemd/systemd-journald
root       412  0.0  0.1  25890  6450 ?        Ss   08:00   0:00 /usr/sbin/cron -f
root       520  0.0  0.1  18940  5800 ?        Ss   08:00   0:00 /usr/sbin/rsyslogd -n
root       580  0.0  0.1  15820  7100 ?        Ss   08:00   0:00 /usr/sbin/sshd -D [listener] 0 of 10-100 startups
root       610  0.0  0.2  89540 14200 ?        Ssl  08:00   0:00 /sbin/auditd
systemd+   740  0.0  0.1  22100  7890 ?        Ss   08:00   0:00 /lib/systemd/systemd-resolved
analyst    850  0.0  0.1  14280  5600 pts/0    Ss   08:15   0:00 -bash
analyst    910  0.0  0.0  11450  3200 pts/0    R+   08:20   0:00 ps aux`,
      });
    } else if (lower.includes('grep sshd') || lower === 'ps aux | grep sshd') {
      setTask3Processes(true);
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `root       580  0.0  0.1  15820  7100 ?        Ss   08:00   0:00 /usr/sbin/sshd -D [listener] 0 of 10-100 startups
analyst    912  0.0  0.0   9200  2100 pts/0    S+   08:20   0:00 grep --color=auto sshd`,
      });
    } else if (lower === 'df -h') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `Filesystem      Size  Used Avail Use% Mounted on
tmpfs           794M  1.4M  793M   1% /run
/dev/sda1        39G  8.4G   29G  23% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      105M  6.1M   99M   6% /boot/efi`,
      });
    } else if (lower === 'free -m' || lower === 'free -h') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `               total        used        free      shared  buff/cache   available
Mem:            7936        1412        4820          12        1704        6240
Swap:           2048           0        2048`,
      });
    } else if (lower === 'history') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: history.map((h, i) => `  ${i + 1}  ${h}`).join('\n') || '  1  (No history yet)',
      });
    } else {
      newLogs.push({
        id: `err-${Date.now()}`,
        type: 'error',
        text: `bash: ${cmd}: command not found. Type "help" to view allowed orientation commands.`,
      });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandExecute(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  const executePill = (cmd: string) => {
    handleCommandExecute(cmd);
    inputRef.current?.focus();
  };

  const handleResetLab = () => {
    sound.playClick();
    setLogs([
      {
        id: `reset-${Date.now()}`,
        type: 'system',
        text: 'Workstation terminal session restarted. Ready for command input.',
      },
    ]);
    setTask1Hostname(false);
    setTask1Os(false);
    setTask2User(false);
    setTask2Pwd(false);
    setTask3Processes(false);
    setIsCompleted(false);
    setInputVal('');
  };

  const handleSubmitFinalReport = () => {
    sound.playSuccess();
    addXP(50);

    // Save in localStorage so LabsV2Modal recognizes it as completed
    try {
      const saved = localStorage.getItem('soc_v2_completed_lab_tasks');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed['LAB-01-task-0'] = true;
      parsed['LAB-01-task-1'] = true;
      parsed['LAB-01-task-2'] = true;
      localStorage.setItem('soc_v2_completed_lab_tasks', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }

    setShowCompletionModal(true);
    if (onCompleted) onCompleted();
  };

  // Mentor guidance calculation
  let mentorMessage =
    'Welcome! Let us start by verifying the machine identity. Run "hostname" and "cat /etc/os-release" to see what system we are working on.';
  if ((task1Hostname || task1Os) && (!task2User || !task2Pwd)) {
    mentorMessage =
      'Good! Machine identity confirmed as cdac-blr-ws01 (Ubuntu 24.04). Now find out who you are and where you are located using "whoami" and "pwd".';
  } else if ((task1Hostname || task1Os) && task2User && task2Pwd && !task3Processes) {
    mentorMessage =
      'Spot on! User account is "analyst" in "/home/analyst". Now inspect background daemons and running tasks using "ps aux".';
  } else if (isAllTasksDone) {
    mentorMessage =
      'Outstanding work! All 3 verification tasks are satisfied. Review your inventory below and click "Submit Lab Deliverable" to submit your evidence to CDAC Bengaluru.';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-h-none rounded-none' : 'max-w-6xl h-[92vh] max-h-[900px] rounded-2xl'
        } flex flex-col bg-[#050b1d] border border-slate-800 shadow-2xl overflow-hidden transition-all`}
      >
        {/* =========================================================================
            HEADER BAR
        ========================================================================= */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#071026]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <TerminalIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                  <span>LAB-01: Orient Yourself in Ubuntu</span>
                  <Badge className="bg-purple-600 text-white font-mono text-[10px] uppercase">
                    Module 01 Lab
                  </Badge>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Host: <strong className="text-slate-200">cdac-blr-ws01</strong> • Mentor:{' '}
                <strong className="text-purple-300">Ravi</strong> • 40m Practical Session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetLab}
              className="text-xs h-8 px-2.5 gap-1.5 border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white"
              title="Reset Terminal Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 text-slate-400 hover:text-white"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-slate-400 hover:text-white"
              title="Close Lab"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* =========================================================================
            SUB-HEADER / STATUS BAR
        ========================================================================= */}
        <div className="px-5 py-2 border-b border-slate-800/80 bg-[#091432]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE • TTY1 (bash 5.2.21)
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Target: 192.168.10.25 (Private Subnet)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Tasks Verified:</span>
            <Badge
              variant="outline"
              className={`text-xs font-mono font-bold ${
                isAllTasksDone
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-purple-500/30 bg-purple-500/10 text-purple-300'
              }`}
            >
              {(task1Hostname || task1Os ? 1 : 0) + (task2User && task2Pwd ? 1 : 0) + (task3Processes ? 1 : 0)} / 3 Completed
            </Badge>
          </div>
        </div>

        {/* =========================================================================
            MAIN SPLIT VIEW: TERMINAL (LEFT) + TASKS & MENTOR (RIGHT)
        ========================================================================= */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* ==================== LEFT: TERMINAL VIEW (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col border-r border-slate-800 bg-[#020612] min-h-0">
            {/* Terminal Window Header */}
            <div className="px-4 py-2 border-b border-slate-800 bg-[#070e20] flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-bold text-[11px]">
                  analyst@cdac-blr-ws01: ~ (bash)
                </span>
              </div>
              <span className="text-[10px] text-slate-500">xterm-256color • 80x24</span>
            </div>

            {/* Terminal Screen Body */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-200 space-y-2 select-text cursor-text leading-relaxed"
            >
              {logs.map((log) => {
                if (log.type === 'system') {
                  return (
                    <div key={log.id} className="text-slate-400 whitespace-pre-wrap">
                      {log.text}
                    </div>
                  );
                }
                if (log.type === 'input') {
                  return (
                    <div key={log.id} className="text-slate-100 flex items-start gap-1 font-semibold">
                      <span className="text-emerald-400">analyst@cdac-blr-ws01</span>
                      <span className="text-slate-400">:</span>
                      <span className="text-sky-400">~</span>
                      <span className="text-slate-400">$</span>
                      <span className="text-white ml-1.5">{log.text.replace(/^analyst@cdac-blr-ws01:~\$\s*/, '')}</span>
                    </div>
                  );
                }
                if (log.type === 'error') {
                  return (
                    <div key={log.id} className="text-rose-400 whitespace-pre-wrap font-medium">
                      {log.text}
                    </div>
                  );
                }
                return (
                  <div key={log.id} className="text-emerald-300 whitespace-pre-wrap bg-slate-900/40 p-2 rounded-lg border border-slate-800/60 font-mono">
                    {log.text}
                  </div>
                );
              })}

              {/* Active command line input prompt */}
              <div className="flex items-center gap-1 text-slate-100 pt-1 font-mono">
                <span className="text-emerald-400 font-bold">analyst@cdac-blr-ws01</span>
                <span className="text-slate-400">:</span>
                <span className="text-sky-400 font-bold">~</span>
                <span className="text-slate-400 font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command (e.g. hostname, whoami, ps aux)..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs pl-2 placeholder:text-slate-600"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>

              <div ref={terminalEndRef} />
            </div>

            {/* Quick Command Pills for easy clicking */}
            <div className="p-3 border-t border-slate-800 bg-[#070e20] shrink-0 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="font-bold flex items-center gap-1 text-slate-300">
                  <Sparkles className="w-3 h-3 text-purple-400" /> Quick-Run Commands:
                </span>
                <span className="text-[10px] text-slate-500">Tap to execute instantly</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { cmd: 'hostname', label: 'hostname', group: 't1' },
                  { cmd: 'cat /etc/os-release', label: 'cat /etc/os-release', group: 't1' },
                  { cmd: 'whoami', label: 'whoami', group: 't2' },
                  { cmd: 'id', label: 'id', group: 't2' },
                  { cmd: 'pwd', label: 'pwd', group: 't2' },
                  { cmd: 'ps aux', label: 'ps aux', group: 't3' },
                  { cmd: 'ps aux | grep sshd', label: 'ps | grep sshd', group: 't3' },
                  { cmd: 'cat soc_notes.txt', label: 'cat soc_notes.txt', group: 'help' },
                  { cmd: 'clear', label: 'clear', group: 'util' },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    type="button"
                    onClick={() => executePill(item.cmd)}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-900 border border-slate-700/80 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all cursor-pointer shadow-2xs"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ==================== RIGHT: TASKS & MENTOR RAVI (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col bg-[#050b1d] overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Mentor Ravi Guidance Card */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold text-xs">
                    R
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Mentor Ravi</span>
                      <Badge className="bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[9px] font-mono">
                        INSTRUCTOR
                      </Badge>
                    </h4>
                    <span className="text-[10px] text-slate-400">Senior Systems & Infra Mentor</span>
                  </div>
                </div>
                <UserCheck className="w-4 h-4 text-purple-400" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                &ldquo;{mentorMessage}&rdquo;
              </p>
            </div>

            {/* Actionable Tasks Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  Orientation Tasks Checklist
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Live Auto-Check</span>
              </div>

              {/* Task 1 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task1Hostname || task1Os
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task1Hostname || task1Os
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task1Hostname || task1Os ? <Check className="w-3.5 h-3.5" /> : '1'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Identify Hostname & OS Version
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task1Hostname || task1Os
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task1Hostname || task1Os ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Run <code className="text-purple-300 font-mono">hostname</code> and{' '}
                  <code className="text-purple-300 font-mono">cat /etc/os-release</code> to verify node name and Ubuntu release.
                </p>
                {(task1Hostname || task1Os) && (
                  <div className="pl-7 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <span>✓ Host: cdac-blr-ws01</span>
                    <span>•</span>
                    <span>✓ OS: Ubuntu 24.04 LTS</span>
                  </div>
                )}
              </div>

              {/* Task 2 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task2User && task2Pwd
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task2User && task2Pwd
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task2User && task2Pwd ? <Check className="w-3.5 h-3.5" /> : '2'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Confirm Account & Working Directory
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task2User && task2Pwd
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task2User && task2Pwd ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Execute <code className="text-purple-300 font-mono">whoami</code>,{' '}
                  <code className="text-purple-300 font-mono">id</code>, and{' '}
                  <code className="text-purple-300 font-mono">pwd</code> to record identity.
                </p>
                {task2User && task2Pwd && (
                  <div className="pl-7 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <span>✓ User: analyst (1001)</span>
                    <span>•</span>
                    <span>✓ Cwd: /home/analyst</span>
                  </div>
                )}
              </div>

              {/* Task 3 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  task3Processes
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        task3Processes
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {task3Processes ? <Check className="w-3.5 h-3.5" /> : '3'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Inspect Running Processes Baseline
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      task3Processes
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {task3Processes ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Run <code className="text-purple-300 font-mono">ps aux</code> to inspect running daemons (systemd, sshd, auditd).
                </p>
                {task3Processes && (
                  <div className="pl-7 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <span>✓ PID 1: systemd</span>
                    <span>•</span>
                    <span>✓ sshd & auditd verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Learner Evidence Notes */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                Evidence Deliverable: Workstation Inventory
              </label>
              <textarea
                value={learnerNotes}
                onChange={(e) => setLearnerNotes(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono bg-[#03091e] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
                placeholder="Document your observations..."
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="button"
                disabled={!isAllTasksDone}
                onClick={handleSubmitFinalReport}
                className={`w-full font-bold text-xs h-11 rounded-xl shadow-lg gap-2 cursor-pointer transition-all ${
                  isAllTasksDone
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Submit Lab Deliverable (+50 XP)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              {!isAllTasksDone && (
                <p className="text-[10px] text-center text-slate-500 mt-1.5 font-mono">
                  Complete all 3 tasks in the terminal to unlock submission.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            FOOTER STATUS
        ========================================================================= */}
        <div className="px-5 py-2.5 border-t border-slate-800 bg-[#071026] flex items-center justify-between text-xs text-slate-400 shrink-0 font-mono">
          <span>CDAC BENGALURU • SOC ANALYST L1 CURRICULUM</span>
          <span className="hidden sm:inline">Module 01: Computer Fundamentals • Hands-on Lab</span>
        </div>
      </div>

      {/* =========================================================================
          COMPLETION MODAL / VERDICT CERTIFICATE
      ========================================================================= */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#070f26] border-2 border-emerald-500/40 rounded-2xl p-6 text-center space-y-5 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <Badge className="bg-emerald-600 text-white font-mono text-[10px]">
                LAB-01 VERIFIED • 100% SCORE
              </Badge>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Workstation Orientation Complete!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mentor Ravi has officially approved your Ubuntu 24.04 inventory evidence. You have demonstrated terminal fluency and baseline awareness.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Host:</span>
                <span className="text-emerald-300 font-bold">cdac-blr-ws01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">OS:</span>
                <span className="text-emerald-300 font-bold">Ubuntu 24.04 LTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account:</span>
                <span className="text-emerald-300 font-bold">analyst (1001)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Processes:</span>
                <span className="text-emerald-300 font-bold">systemd, sshd, auditd</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-amber-300">
                <span>Reward:</span>
                <span className="font-bold">+50 XP Earned</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                setShowCompletionModal(false);
                onClose();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl"
            >
              Return to Curriculum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
