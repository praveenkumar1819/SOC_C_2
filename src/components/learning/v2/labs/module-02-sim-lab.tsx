'use client';

import React, { useState, useEffect } from 'react';
import {
  Network,
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
  Monitor,
  Database,
  Radio,
  ArrowRight,
  Layers,
  HelpCircle,
  Activity,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import { useProgressStore } from '@/store/progress-store';
import { sound } from '@/lib/sound-effects';

interface Module02SimLabProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export function Module02SimLab({ isOpen, onClose, onCompleted }: Module02SimLabProps) {
  const { showToast } = useToast();
  const addXP = useProgressStore((state) => state.addXP);

  const [activeTab, setActiveTab] = useState<'topology' | 'traceroute' | 'wireshark'>('topology');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Task 1: Topology Node Labeling State
  const [nodeAssignments, setNodeAssignments] = useState<Record<string, string>>({
    nodeA: '',
    nodeB: '',
    nodeC: '',
    nodeD: '',
  });

  // Task 2: Traceroute Execution State
  const [traceStep, setTraceStep] = useState<number>(0);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [tracerouteDone, setTracerouteDone] = useState<boolean>(false);

  // Task 3: Wireshark Packet Inspection State
  const [selectedPacketId, setSelectedPacketId] = useState<number>(1);
  const [wsQ1, setWsQ1] = useState<string>('');
  const [wsQ2, setWsQ2] = useState<string>('');
  const [wsQ3, setWsQ3] = useState<string>('');
  const [wiresharkDone, setWiresharkDone] = useState<boolean>(false);

  // Overall checklist state
  const isTask1Done =
    nodeAssignments.nodeA === 'laptop' &&
    nodeAssignments.nodeB === 'switch' &&
    nodeAssignments.nodeC === 'gateway' &&
    nodeAssignments.nodeD === 'dns';

  const isTask2Done = tracerouteDone;
  const isTask3Done = wiresharkDone;

  const isAllDone = isTask1Done && isTask2Done && isTask3Done;

  // Auto notification on all tasks complete
  useEffect(() => {
    if (isAllDone) {
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'All Network Tasks Completed! 🎉',
        description: 'You have verified the topology, path route, and packet stream. Submit your lab report below.',
      });
    }
  }, [isAllDone, showToast]);

  if (!isOpen) return null;

  // Handle Topology node assignment
  const handleAssignNode = (nodeKey: string, role: string) => {
    sound.playClick();
    setNodeAssignments((prev) => {
      const updated = { ...prev, [nodeKey]: role };
      // Check if newly completed
      if (
        (nodeKey === 'nodeA' ? role === 'laptop' : updated.nodeA === 'laptop') &&
        (nodeKey === 'nodeB' ? role === 'switch' : updated.nodeB === 'switch') &&
        (nodeKey === 'nodeC' ? role === 'gateway' : updated.nodeC === 'gateway') &&
        (nodeKey === 'nodeD' ? role === 'dns' : updated.nodeD === 'dns')
      ) {
        sound.playSuccess();
        showToast({
          type: 'success',
          title: 'Task 1 Completed: Topology Labeled!',
          description: 'All 4 branch network nodes correctly identified. Advance to Route Tracing.',
        });
      }
      return updated;
    });
  };

  // Run Traceroute Animation
  const handleRunTraceroute = () => {
    if (isTracing) return;
    sound.playClick();
    setIsTracing(true);
    setTraceStep(1);

    const timer1 = setTimeout(() => {
      setTraceStep(2);
      sound.playClick();
    }, 700);

    const timer2 = setTimeout(() => {
      setTraceStep(3);
      sound.playClick();
    }, 1400);

    const timer3 = setTimeout(() => {
      setTraceStep(4);
      setTracerouteDone(true);
      setIsTracing(false);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 2 Completed: Route Traced!',
        description: '4-hop route to internal portal mapped successfully.',
      });
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  // Validate Wireshark answers
  const handleValidateWireshark = () => {
    sound.playClick();
    if (
      wsQ1.trim() === '192.168.10.45' &&
      wsQ2.trim() === '192.168.10.10' &&
      wsQ3.trim() === '443'
    ) {
      setWiresharkDone(true);
      sound.playSuccess();
      showToast({
        type: 'success',
        title: 'Task 3 Completed: Packet Findings Verified!',
        description: 'Source IP, DNS resolution, and destination port 443 confirmed.',
      });
    } else {
      showToast({
        type: 'error',
        title: 'Packet Analysis Check',
        description: 'Review the capture table. Source Workstation: 192.168.10.45, DNS: 192.168.10.10, Target Port: 443.',
      });
    }
  };

  const handleResetLab = () => {
    sound.playClick();
    setNodeAssignments({ nodeA: '', nodeB: '', nodeC: '', nodeD: '' });
    setTraceStep(0);
    setTracerouteDone(false);
    setSelectedPacketId(1);
    setWsQ1('');
    setWsQ2('');
    setWsQ3('');
    setWiresharkDone(false);
    setActiveTab('topology');
  };

  const handleSubmitFinalReport = () => {
    sound.playSuccess();
    addXP(50);

    // Save in localStorage so LabsV2Modal recognizes it as completed
    try {
      const saved = localStorage.getItem('soc_v2_completed_lab_tasks');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed['LAB-02-task-0'] = true;
      parsed['LAB-02-task-1'] = true;
      parsed['LAB-02-task-2'] = true;
      localStorage.setItem('soc_v2_completed_lab_tasks', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }

    setShowCompletionModal(true);
    if (onCompleted) onCompleted();
  };

  // Wireshark sample frames
  const packets = [
    {
      no: 1,
      time: '0.000000',
      src: '192.168.10.45',
      dst: '192.168.10.10',
      proto: 'DNS',
      len: 74,
      info: 'Standard query 0x1a2b A portal.cdac-blr.internal',
      srcPort: 51240,
      dstPort: 53,
      details: [
        'Frame 1: 74 bytes on wire (592 bits), 74 bytes captured',
        'Ethernet II, Src: Intel_3c:4d:5e (00:1a:2b:3c:4d:5e), Dst: Cisco_11:22:33',
        'Internet Protocol Version 4, Src: 192.168.10.45, Dst: 192.168.10.10',
        'User Datagram Protocol, Src Port: 51240, Dst Port: 53 (DNS)',
        'Domain Name System (query): portal.cdac-blr.internal: type A, class IN',
      ],
    },
    {
      no: 2,
      time: '0.001840',
      src: '192.168.10.10',
      dst: '192.168.10.45',
      proto: 'DNS',
      len: 90,
      info: 'Standard query response 0x1a2b A portal.cdac-blr.internal A 10.50.100.80',
      srcPort: 53,
      dstPort: 51240,
      details: [
        'Frame 2: 90 bytes on wire (720 bits), 90 bytes captured',
        'Ethernet II, Src: Cisco_11:22:33, Dst: Intel_3c:4d:5e (00:1a:2b:3c:4d:5e)',
        'Internet Protocol Version 4, Src: 192.168.10.10, Dst: 192.168.10.45',
        'User Datagram Protocol, Src Port: 53 (DNS), Dst Port: 51240',
        'Domain Name System (response): portal.cdac-blr.internal: addr 10.50.100.80',
      ],
    },
    {
      no: 3,
      time: '0.003110',
      src: '192.168.10.45',
      dst: '10.50.100.80',
      proto: 'TCP',
      len: 66,
      info: '49182 -> 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
      srcPort: 49182,
      dstPort: 443,
      details: [
        'Frame 3: 66 bytes on wire (528 bits), 66 bytes captured',
        'Ethernet II, Src: Intel_3c:4d:5e (00:1a:2b:3c:4d:5e), Dst: Fortinet_gw (00:09:0f:aa:bb:cc)',
        'Internet Protocol Version 4, Src: 192.168.10.45, Dst: 10.50.100.80',
        'Transmission Control Protocol, Src Port: 49182, Dst Port: 443 (HTTPS)',
        'Flags: 0x002 (SYN), Sequence Number: 0 (relative sequence number)',
      ],
    },
    {
      no: 4,
      time: '0.007420',
      src: '10.50.100.80',
      dst: '192.168.10.45',
      proto: 'TCP',
      len: 66,
      info: '443 -> 49182 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0 MSS=1460',
      srcPort: 443,
      dstPort: 49182,
      details: [
        'Frame 4: 66 bytes on wire (528 bits), 66 bytes captured',
        'Ethernet II, Src: Fortinet_gw (00:09:0f:aa:bb:cc), Dst: Intel_3c:4d:5e (00:1a:2b:3c:4d:5e)',
        'Internet Protocol Version 4, Src: 10.50.100.80, Dst: 192.168.10.45',
        'Transmission Control Protocol, Src Port: 443 (HTTPS), Dst Port: 49182',
        'Flags: 0x012 (SYN, ACK), Sequence Number: 0, Acknowledgment: 1',
      ],
    },
    {
      no: 5,
      time: '0.009180',
      src: '192.168.10.45',
      dst: '10.50.100.80',
      proto: 'TLSv1.3',
      len: 517,
      info: 'Client Hello, SNI=portal.cdac-blr.internal',
      srcPort: 49182,
      dstPort: 443,
      details: [
        'Frame 5: 517 bytes on wire (4136 bits), 517 bytes captured',
        'Ethernet II, Src: Intel_3c:4d:5e, Dst: Fortinet_gw',
        'Internet Protocol Version 4, Src: 192.168.10.45, Dst: 10.50.100.80',
        'Transmission Control Protocol, Src Port: 49182, Dst Port: 443 (HTTPS)',
        'Transport Layer Security (TLSv1.3 Handshake Protocol: Client Hello)',
        'Extension: server_name (len=29) -> portal.cdac-blr.internal',
      ],
    },
  ];

  const currentPacket = packets.find((p) => p.no === selectedPacketId) || packets[0];

  // Mentor guidance calculation
  let mentorMessage =
    'Welcome to the Branch Network Lab! In Task 1, we must label the core hardware components of our CDAC Bengaluru branch topology: Staff Laptop, Access Switch, Edge Gateway, and Internal DNS.';
  if (isTask1Done && !isTask2Done) {
    mentorMessage =
      'Great labeling! Now proceed to the "Route Tracer" tab and trace the multi-hop network path from the staff laptop to our internal financial portal at 10.50.100.80.';
  } else if (isTask1Done && isTask2Done && !isTask3Done) {
    mentorMessage =
      'Route analysis complete across 4 hops! Next, open the "Wireshark Capture" tab to inspect raw frames and extract the source IP, DNS resolver, and service port.';
  } else if (isAllDone) {
    mentorMessage =
      'Outstanding work! You have accurately mapped the branch topology, traced the internal route, and parsed the Wireshark packet stream. Click "Submit Lab Deliverable" to finalize your lab.';
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
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                  <span>LAB-02: Trace a Small-Branch Network</span>
                  <Badge className="bg-blue-600 text-white font-mono text-[10px] uppercase">
                    Module 02 Lab
                  </Badge>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Scope: <strong className="text-slate-200">CDAC Bengaluru Branch LAN</strong> • Mentor:{' '}
                <strong className="text-blue-300">Ravi</strong> • 45m Practical Session
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetLab}
              className="text-xs h-8 px-2.5 gap-1.5 border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white"
              title="Reset Lab Progress"
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
            NAVIGATION TABS (TOPOLOGY vs TRACEROUTE vs WIRESHARK)
        ========================================================================= */}
        <div className="px-5 py-2.5 border-b border-slate-800/80 bg-[#091432]/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('topology');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === 'topology'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Topology Mapper</span>
              {isTask1Done && <Check className="w-3.5 h-3.5 text-emerald-300" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('traceroute');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === 'traceroute'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>2. Route Tracer</span>
              {isTask2Done && <Check className="w-3.5 h-3.5 text-emerald-300" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('wireshark');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === 'wireshark'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-xs'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>3. Wireshark Capture</span>
              {isTask3Done && <Check className="w-3.5 h-3.5 text-emerald-300" />}
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 text-xs">Progress:</span>
            <Badge
              variant="outline"
              className={`text-xs font-mono font-bold ${
                isAllDone
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-blue-500/30 bg-blue-500/10 text-blue-300'
              }`}
            >
              {(isTask1Done ? 1 : 0) + (isTask2Done ? 1 : 0) + (isTask3Done ? 1 : 0)} / 3 Verified
            </Badge>
          </div>
        </div>

        {/* =========================================================================
            MAIN SPLIT VIEW: INTERACTIVE WORKSPACE (LEFT) + TASKS & MENTOR (RIGHT)
        ========================================================================= */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* ==================== LEFT: INTERACTIVE STAGE (7 COLS) ==================== */}
          <div className="lg:col-span-7 flex flex-col border-r border-slate-800 bg-[#020612] min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* ================= TAB 1: TOPOLOGY MAPPER ================= */}
            {activeTab === 'topology' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      CDAC Bengaluru Branch Topology Labeler
                    </h4>
                    <p className="text-xs text-slate-400">
                      Match the 4 device roles to the network nodes below:
                    </p>
                  </div>
                  {isTask1Done && (
                    <Badge className="bg-emerald-600 text-white font-mono text-[10px]">
                      TOPOLOGY VERIFIED ✓
                    </Badge>
                  )}
                </div>

                {/* 4 Node Diagram Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {/* Node A: Staff Laptop */}
                  <div
                    className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                      nodeAssignments.nodeA === 'laptop'
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <Monitor className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Node 1: 192.168.10.45</span>
                          <span className="text-[10px] font-mono text-slate-400">MAC: 00:1A:2B:3C:4D:5E</span>
                        </div>
                      </div>
                      {nodeAssignments.nodeA === 'laptop' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <p className="text-xs text-slate-300">
                      VLAN 10 user endpoint generating web & email requests on port Fa0/3.
                    </p>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Select Role:</label>
                      <select
                        value={nodeAssignments.nodeA}
                        onChange={(e) => handleAssignNode('nodeA', e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 text-xs text-slate-200 rounded-lg p-1.5 focus:border-blue-400 font-mono"
                      >
                        <option value="">-- Choose Device Role --</option>
                        <option value="laptop">Staff Workstation (Endpoint)</option>
                        <option value="switch">Branch Access Switch (L2 Fabric)</option>
                        <option value="gateway">Default Gateway / Firewall (L3 Edge)</option>
                        <option value="dns">Internal DNS Server (Core Services)</option>
                      </select>
                    </div>
                  </div>

                  {/* Node B: Switch */}
                  <div
                    className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                      nodeAssignments.nodeB === 'switch'
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                          <Radio className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Node 2: L2-SW01</span>
                          <span className="text-[10px] font-mono text-slate-400">Layer 2 Switching Fabric</span>
                        </div>
                      </div>
                      {nodeAssignments.nodeB === 'switch' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <p className="text-xs text-slate-300">
                      Maintains CAM table; forwards Ethernet frames between branch workstations and gateway.
                    </p>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Select Role:</label>
                      <select
                        value={nodeAssignments.nodeB}
                        onChange={(e) => handleAssignNode('nodeB', e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 text-xs text-slate-200 rounded-lg p-1.5 focus:border-blue-400 font-mono"
                      >
                        <option value="">-- Choose Device Role --</option>
                        <option value="laptop">Staff Workstation (Endpoint)</option>
                        <option value="switch">Branch Access Switch (L2 Fabric)</option>
                        <option value="gateway">Default Gateway / Firewall (L3 Edge)</option>
                        <option value="dns">Internal DNS Server (Core Services)</option>
                      </select>
                    </div>
                  </div>

                  {/* Node C: Gateway */}
                  <div
                    className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                      nodeAssignments.nodeC === 'gateway'
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Node 3: 192.168.10.1</span>
                          <span className="text-[10px] font-mono text-slate-400">Router / UTM Firewall</span>
                        </div>
                      </div>
                      {nodeAssignments.nodeC === 'gateway' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <p className="text-xs text-slate-300">
                      First Layer 3 hop; performs NAT translation and enforces egress firewall rules.
                    </p>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Select Role:</label>
                      <select
                        value={nodeAssignments.nodeC}
                        onChange={(e) => handleAssignNode('nodeC', e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 text-xs text-slate-200 rounded-lg p-1.5 focus:border-blue-400 font-mono"
                      >
                        <option value="">-- Choose Device Role --</option>
                        <option value="laptop">Staff Workstation (Endpoint)</option>
                        <option value="switch">Branch Access Switch (L2 Fabric)</option>
                        <option value="gateway">Default Gateway / Firewall (L3 Edge)</option>
                        <option value="dns">Internal DNS Server (Core Services)</option>
                      </select>
                    </div>
                  </div>

                  {/* Node D: DNS */}
                  <div
                    className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                      nodeAssignments.nodeD === 'dns'
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Node 4: 192.168.10.10</span>
                          <span className="text-[10px] font-mono text-slate-400">Core Services Port 53</span>
                        </div>
                      </div>
                      {nodeAssignments.nodeD === 'dns' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <p className="text-xs text-slate-300">
                      Resolves branch names like <code className="text-indigo-300">portal.cdac-blr.internal</code> to internal IP addresses.
                    </p>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 uppercase">Select Role:</label>
                      <select
                        value={nodeAssignments.nodeD}
                        onChange={(e) => handleAssignNode('nodeD', e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 text-xs text-slate-200 rounded-lg p-1.5 focus:border-blue-400 font-mono"
                      >
                        <option value="">-- Choose Device Role --</option>
                        <option value="laptop">Staff Workstation (Endpoint)</option>
                        <option value="switch">Branch Access Switch (L2 Fabric)</option>
                        <option value="gateway">Default Gateway / Firewall (L3 Edge)</option>
                        <option value="dns">Internal DNS Server (Core Services)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Diagram Status: {isTask1Done ? '4 of 4 Nodes Mapped Correctly' : 'Incomplete'}</span>
                  {isTask1Done && (
                    <Button
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('traceroute');
                      }}
                      className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Next: Trace Route
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 2: ROUTE TRACER ================= */}
            {activeTab === 'traceroute' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      Traceroute Simulation (Staff Laptop → Internal Portal)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Target: <code className="text-blue-300 font-mono">10.50.100.80</code> (FinCorp Core Portal)
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={handleRunTraceroute}
                    disabled={isTracing}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-8 px-3 gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isTracing ? 'Tracing Hops...' : 'Execute Route Trace'}</span>
                  </Button>
                </div>

                {/* Animated Path Diagram */}
                <div className="p-4 rounded-xl bg-[#030818] border border-slate-800 space-y-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Active Route Path</span>
                    <span>Source: 192.168.10.45</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div
                      className={`p-2.5 rounded-lg border transition-all ${
                        traceStep >= 1 ? 'border-blue-500 bg-blue-500/20 text-white font-bold' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[10px] text-slate-400">Hop 1</span>
                      <span>Gateway</span>
                      <span className="block text-[9px] text-blue-300">192.168.10.1</span>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border transition-all ${
                        traceStep >= 2 ? 'border-blue-500 bg-blue-500/20 text-white font-bold' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[10px] text-slate-400">Hop 2</span>
                      <span>Aggregator</span>
                      <span className="block text-[9px] text-blue-300">172.16.20.1</span>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border transition-all ${
                        traceStep >= 3 ? 'border-blue-500 bg-blue-500/20 text-white font-bold' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[10px] text-slate-400">Hop 3</span>
                      <span>Core FW</span>
                      <span className="block text-[9px] text-blue-300">10.50.0.1</span>
                    </div>

                    <div
                      className={`p-2.5 rounded-lg border transition-all ${
                        traceStep >= 4 ? 'border-emerald-500 bg-emerald-500/20 text-white font-bold' : 'border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[10px] text-emerald-400">Hop 4</span>
                      <span>Target App</span>
                      <span className="block text-[9px] text-emerald-300">10.50.100.80</span>
                    </div>
                  </div>

                  {/* Traceroute Output Terminal */}
                  <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="text-slate-500">
                      analyst@cdac-blr-ws01:~$ traceroute -n 10.50.100.80
                    </div>
                    <div className="text-slate-400">
                      traceroute to 10.50.100.80 (10.50.100.80), 30 hops max, 60 byte packets
                    </div>
                    {traceStep >= 1 && (
                      <div className="text-emerald-400">
                        1  192.168.10.1  1.214 ms  1.102 ms  1.050 ms (CDAC-BLR-GW)
                      </div>
                    )}
                    {traceStep >= 2 && (
                      <div className="text-emerald-400">
                        2  172.16.20.1   3.410 ms  3.320 ms  3.280 ms (BLR-AGG-01)
                      </div>
                    )}
                    {traceStep >= 3 && (
                      <div className="text-emerald-400">
                        3  10.50.0.1     5.120 ms  5.050 ms  4.980 ms (HQ-CORE-FW01)
                      </div>
                    )}
                    {traceStep >= 4 && (
                      <div className="text-emerald-300 font-bold">
                        4  10.50.100.80  6.240 ms  6.180 ms  6.100 ms (INTERNAL-PORTAL-SRV)
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Hop Count: {traceStep}/4 Hops Recorded</span>
                  {isTask2Done && (
                    <Button
                      size="sm"
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('wireshark');
                      }}
                      className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Next: Wireshark Capture
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 3: WIRESHARK CAPTURE ================= */}
            {activeTab === 'wireshark' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-400" />
                      Wireshark Packet Stream Triage
                    </h4>
                    <p className="text-xs text-slate-400">
                      Click frames to inspect IP headers, TCP flags, and payload details:
                    </p>
                  </div>
                  {isTask3Done && (
                    <Badge className="bg-emerald-600 text-white font-mono text-[10px]">
                      WIRESHARK TRIAGED ✓
                    </Badge>
                  )}
                </div>

                {/* Packet List Table */}
                <div className="rounded-xl border border-slate-800 bg-[#030818] overflow-hidden font-mono text-[11px]">
                  <div className="grid grid-cols-12 bg-slate-900/90 text-slate-400 p-2 font-bold border-b border-slate-800 text-[10px]">
                    <span className="col-span-1">No.</span>
                    <span className="col-span-2">Time</span>
                    <span className="col-span-3">Source</span>
                    <span className="col-span-3">Destination</span>
                    <span className="col-span-1">Proto</span>
                    <span className="col-span-2 text-right">Length</span>
                  </div>

                  <div className="divide-y divide-slate-800/60 max-h-48 overflow-y-auto">
                    {packets.map((pkt) => {
                      const isSel = pkt.no === selectedPacketId;
                      return (
                        <div
                          key={pkt.no}
                          onClick={() => {
                            sound.playClick();
                            setSelectedPacketId(pkt.no);
                          }}
                          className={`grid grid-cols-12 p-2 cursor-pointer transition-colors ${
                            isSel
                              ? 'bg-blue-600/30 text-white font-semibold'
                              : 'text-slate-300 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="col-span-1">{pkt.no}</span>
                          <span className="col-span-2 text-slate-400">{pkt.time}</span>
                          <span className="col-span-3 text-blue-300 truncate">{pkt.src}</span>
                          <span className="col-span-3 text-cyan-300 truncate">{pkt.dst}</span>
                          <span className="col-span-1 text-amber-300">{pkt.proto}</span>
                          <span className="col-span-2 text-right text-slate-400">{pkt.len}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Packet Dissection Viewer */}
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between border-b border-slate-800 pb-1">
                    <span>Frame {currentPacket.no} Dissection</span>
                    <span className="text-blue-400">{currentPacket.proto} • {currentPacket.len} Bytes</span>
                  </div>
                  {currentPacket.details.map((line, idx) => (
                    <div key={idx} className="text-slate-300 text-[11px] leading-relaxed">
                      ▸ {line}
                    </div>
                  ))}
                </div>

                {/* Task 3 Verification Form */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase font-mono">
                    Identify Telemetry Findings from Packet Stream:
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Source Workstation IP:</label>
                      <input
                        type="text"
                        placeholder="e.g. 192.168.10.45"
                        value={wsQ1}
                        onChange={(e) => setWsQ1(e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 rounded-lg p-1.5 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">DNS Server IP:</label>
                      <input
                        type="text"
                        placeholder="e.g. 192.168.10.10"
                        value={wsQ2}
                        onChange={(e) => setWsQ2(e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 rounded-lg p-1.5 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Target Web Port:</label>
                      <input
                        type="text"
                        placeholder="e.g. 443"
                        value={wsQ3}
                        onChange={(e) => setWsQ3(e.target.value)}
                        className="w-full bg-[#03091e] border border-slate-700 rounded-lg p-1.5 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={handleValidateWireshark}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-9 rounded-xl"
                  >
                    Validate Packet Telemetry
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* ==================== RIGHT: TASKS & MENTOR RAVI (5 COLS) ==================== */}
          <div className="lg:col-span-5 flex flex-col bg-[#050b1d] overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Mentor Ravi Guidance Card */}
            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xs">
                    R
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Mentor Ravi</span>
                      <Badge className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[9px] font-mono">
                        INSTRUCTOR
                      </Badge>
                    </h4>
                    <span className="text-[10px] text-slate-400">Senior Systems & Infra Mentor</span>
                  </div>
                </div>
                <UserCheck className="w-4 h-4 text-blue-400" />
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                &ldquo;{mentorMessage}&rdquo;
              </p>
            </div>

            {/* Actionable Tasks Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  Network Tasks Checklist
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Live Auto-Check</span>
              </div>

              {/* Task 1 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  isTask1Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isTask1Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {isTask1Done ? <Check className="w-3.5 h-3.5" /> : '1'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Label 4 Core Network Devices
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      isTask1Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {isTask1Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Label staff laptop, switch, gateway, and DNS in the topology tab.
                </p>
                {isTask1Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ Laptop (192.168.10.45) • Switch • GW (192.168.10.1) • DNS
                  </div>
                )}
              </div>

              {/* Task 2 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  isTask2Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isTask2Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {isTask2Done ? <Check className="w-3.5 h-3.5" /> : '2'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Trace Route to Internal Service
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      isTask2Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {isTask2Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Simulate <code className="text-blue-300 font-mono">traceroute</code> from workstation to <code className="text-blue-300 font-mono">10.50.100.80</code>.
                </p>
                {isTask2Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ 4 Hops mapped (Gateway → Aggregation → Core FW → Portal)
                  </div>
                )}
              </div>

              {/* Task 3 */}
              <div
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  isTask3Done
                    ? 'border-emerald-500/40 bg-emerald-950/15 text-emerald-100'
                    : 'border-slate-800 bg-[#091432]/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        isTask3Done
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border border-slate-700 bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {isTask3Done ? <Check className="w-3.5 h-3.5" /> : '3'}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Wireshark Packet Capture Triage
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono ${
                      isTask3Done
                        ? 'border-emerald-500/50 text-emerald-300'
                        : 'border-slate-700 text-slate-500'
                    }`}
                  >
                    {isTask3Done ? 'PASSED' : 'PENDING'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 pl-7">
                  Extract source IP, internal DNS IP, and destination web service port.
                </p>
                {isTask3Done && (
                  <div className="pl-7 text-[11px] font-mono text-emerald-400">
                    ✓ Src: 192.168.10.45 • DNS: 192.168.10.10 • Port: 443
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Summary Card */}
            <div className="p-3.5 rounded-xl bg-[#03091e] border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
              <span className="font-bold text-white text-[11px] uppercase tracking-wider block border-b border-slate-800 pb-1">
                Evidence Summary (Worksheet Deliverable)
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch Subnet:</span>
                <span className="text-blue-300">192.168.10.0/24 (VLAN 10)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Default Gateway:</span>
                <span className="text-blue-300">192.168.10.1 (GW-FW01)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Target:</span>
                <span className="text-blue-300">10.50.100.80:443 (HTTPS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">End-to-End Latency:</span>
                <span className="text-emerald-300">6.2 ms (4 Hops)</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="button"
                disabled={!isAllDone}
                onClick={handleSubmitFinalReport}
                className={`w-full font-bold text-xs h-11 rounded-xl shadow-lg gap-2 cursor-pointer transition-all ${
                  isAllDone
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Submit Lab Deliverable (+50 XP)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              {!isAllDone && (
                <p className="text-[10px] text-center text-slate-500 mt-1.5 font-mono">
                  Complete all 3 tasks across tabs to unlock submission.
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
          <span className="hidden sm:inline">Module 02: Networking Fundamentals • Hands-on Lab</span>
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
                LAB-02 VERIFIED • 100% SCORE
              </Badge>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Small-Branch Network Mapped!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mentor Ravi has approved your topology diagram and traffic worksheet. You have successfully proven route visibility and packet stream comprehension.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Topology:</span>
                <span className="text-emerald-300 font-bold">4 Nodes Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route Trace:</span>
                <span className="text-emerald-300 font-bold">4 Hops (6.2ms)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Wireshark:</span>
                <span className="text-emerald-300 font-bold">Port 443 / DNS Matched</span>
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
