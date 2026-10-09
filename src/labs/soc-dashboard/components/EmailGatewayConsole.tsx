"use client";

import React from "react";
import { Mail, AlertTriangle, Paperclip, CheckCircle2, ShieldX, Info } from "lucide-react";
import { EmailLog } from "../types/lab.types";
import { truncateHash, getRiskScoreColor } from "../utils/formatting";

interface EmailGatewayConsoleProps {
  emails: EmailLog[];
}

export const EmailGatewayConsole: React.FC<EmailGatewayConsoleProps> = ({ emails }) => {
  if (!emails || emails.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0e14]">
        <Mail className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-300 font-mono">No Email Gateway Logs Correlated</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          This security alert was triggered by endpoint heuristics, host authentication, or network activity without a direct inbound email record.
        </p>
      </div>
    );
  }

  const email = emails[0];

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto soc-scrollbar p-4 pb-12 space-y-4 bg-[#0a0e14] font-mono text-xs overscroll-contain">
      {/* Top Banner / Risk Score */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-slate-900 border border-slate-700 text-cyan-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400">EMAIL GATEWAY ID</span>
            <div className="text-sm font-bold text-slate-100">{email.id}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">HEURISTIC RISK SCORE</span>
            <span className={`text-base font-extrabold ${getRiskScoreColor(email.riskScore)}`}>
              {email.riskScore} / 100
            </span>
          </div>

          <div
            className={`px-3 py-1.5 rounded border text-[11px] font-bold uppercase ${
              email.verdictColor === "danger"
                ? "bg-red-950/60 border-red-500/60 text-red-400"
                : email.verdictColor === "warning"
                ? "bg-amber-950/60 border-amber-500/60 text-amber-300"
                : "bg-emerald-950/60 border-emerald-500/60 text-emerald-400"
            }`}
          >
            {email.verdictLabel}
          </div>
        </div>
      </div>

      {/* Email Headers Section */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4 space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <span>SMTP Envelope & Headers</span>
          <span className="text-[10px] text-slate-400 font-normal">{email.timestamp}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-slate-500 block text-[10px]">FROM (ENVELOPE):</span>
            <div className="text-slate-200 select-all">{email.from}</div>
            {email.realSender && (
              <div className="text-[10px] text-amber-400 mt-0.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span>Real Sender: {email.realSender}</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-slate-500 block text-[10px]">TO (RECIPIENT):</span>
            <div className="text-cyan-300 font-bold select-all">{email.to}</div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-slate-500 block text-[10px]">SUBJECT:</span>
          <div className="text-slate-100 font-semibold text-sm">{email.subject}</div>
        </div>

        {email.body && (
          <div className="pt-2">
            <span className="text-slate-500 block text-[10px] mb-1">MESSAGE BODY PREVIEW:</span>
            <div className="p-3 bg-[#0a0e14] border border-slate-800 rounded text-slate-300 whitespace-pre-wrap text-[11px] leading-relaxed">
              {email.body}
            </div>
          </div>
        )}
      </div>

      {/* Attachment Inspection */}
      {email.attachment && (
        <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5" />
            <span>Attachment Analysis</span>
          </div>

          <div className="mt-3 p-3 bg-[#0a0e14] border border-slate-800 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-200">{email.attachment.filename}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  {email.attachment.size}
                </span>
                {email.attachment.isMacroEnabled && (
                  <span className="text-[10px] bg-red-950 text-red-400 border border-red-700 px-1.5 py-0.5 rounded font-bold animate-pulse">
                    MACRO-ENABLED
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 select-all">
                SHA-256: {email.attachment.hash || "Not computed"}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-red-400 font-bold block">
                {email.attachment.verdict || "POTENTIAL THREAT"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Threat Indicators */}
      {email.indicators && email.indicators.length > 0 && (
        <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gateway Threat Indicators</span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {email.indicators.map((ind, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                <span className="text-red-400 font-bold mt-0.5">▪</span>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
