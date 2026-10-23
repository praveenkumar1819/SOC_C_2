"use client";

import React from "react";
import {
  LabId,
  Lab01Answers,
  Lab02Answers,
  Lab03Answers,
  Lab04Answers,
} from "../types/lab.types";
import { LAB_01_SCENARIO } from "../data/lab-scenarios/lab-01-basic-triage";
import { LAB_02_SCENARIO } from "../data/lab-scenarios/lab-02-false-positives";
import { LAB_03_SCENARIO } from "../data/lab-scenarios/lab-03-severity-classification";
import { LAB_04_SCENARIO } from "../data/lab-scenarios/lab-04-incident-escalation";
import { CheckCircle2, AlertCircle, FileCheck, Layers, Users, ShieldAlert } from "lucide-react";

interface LabTaskPanelProps {
  labId: LabId;
  answers: any;
  onUpdateAnswers: (updater: (prev: any) => any) => void;
}

export const LabTaskPanel: React.FC<LabTaskPanelProps> = ({
  labId,
  answers,
  onUpdateAnswers,
}) => {
  return (
    <aside className="lab-task-panel flex flex-col h-full min-h-0 bg-[#0d131d] border-l border-[#243042] overflow-hidden">
      {/* Panel Header */}
      <div className="p-3 border-b border-[#243042] bg-[#111823] shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
          <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Operational Triage Task</span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
          {labId === "lab-01" && "Lab 1: 5 Critical Fields & Threat Verdict"}
          {labId === "lab-02" && "Lab 2: True vs. False Positive Filter"}
          {labId === "lab-03" && "Lab 3: Severity Matrix & Shift Capacity"}
          {labId === "lab-04" && "Lab 4: Multi-Team Escalation Routing"}
        </div>
      </div>

      {/* Task Content Body */}
      <div className="flex-1 min-h-0 overflow-y-auto soc-scrollbar p-3 pb-16 space-y-4 font-mono text-xs overscroll-contain">
        {/* LAB 01: 5 Critical Fields & Verdict */}
        {labId === "lab-01" && (
          <div className="space-y-4">
            <div className="bg-[#111823] p-2.5 rounded border border-[#243042] text-[11px] text-slate-300">
              Extract the 5 fundamental investigation fields by pivoting across the security consoles.
            </div>

            <div className="space-y-3">
              {LAB_01_SCENARIO.taskFields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={(answers as Lab01Answers)[field.key as keyof Lab01Answers] || ""}
                    onChange={(e) =>
                      onUpdateAnswers((prev: Lab01Answers) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="w-full bg-[#0a0e14] border border-[#243042] rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <span className="text-[9px] text-slate-500 block">{field.hint}</span>
                </div>
              ))}
            </div>

            {/* Verdict Radio Selection */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-cyan-400 block">
                {LAB_01_SCENARIO.verdictQuestion.question}
              </label>

              <div className="space-y-1.5">
                {LAB_01_SCENARIO.verdictQuestion.options.map((opt) => {
                  const isChecked = (answers as Lab01Answers).verdict === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() =>
                        onUpdateAnswers((prev: Lab01Answers) => ({
                          ...prev,
                          verdict: opt.value as any,
                        }))
                      }
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-cyan-950/50 border-cyan-500 text-cyan-200"
                          : "bg-[#0a0e14] border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-[11px] flex items-center justify-between">
                        <span>{opt.label}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{opt.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reasoning Textarea */}
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 block">
                Technical Reasoning (2-3 sentences):
              </label>
              <textarea
                rows={3}
                placeholder="Explain why this is a True Positive or False Alarm based on console findings..."
                value={(answers as Lab01Answers).reasoning || ""}
                onChange={(e) =>
                  onUpdateAnswers((prev: Lab01Answers) => ({
                    ...prev,
                    reasoning: e.target.value,
                  }))
                }
                className="w-full bg-[#0a0e14] border border-[#243042] rounded p-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              />
            </div>
          </div>
        )}

        {/* LAB 02: False Positive Classification */}
        {labId === "lab-02" && (
          <div className="space-y-4">
            <div className="bg-[#111823] p-2.5 rounded border border-[#243042] text-[11px] text-slate-300">
              Investigate each of the 4 alerts. Classify each as True Positive, False Positive, or Expected Activity.
            </div>

            <div className="space-y-3">
              {LAB_02_SCENARIO.alerts.map((alert) => {
                const currentVal = (answers as Lab02Answers).classifications?.[alert.id] || "";

                return (
                  <div key={alert.id} className="p-2.5 bg-[#111823] border border-[#243042] rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400 text-[11px]">{alert.id}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{alert.priority}</span>
                    </div>

                    <div className="text-[11px] text-slate-200 font-semibold">{alert.rule}</div>

                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {LAB_02_SCENARIO.classificationOptions.map((opt) => {
                        const isSelected = currentVal === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              onUpdateAnswers((prev: Lab02Answers) => ({
                                ...prev,
                                classifications: {
                                  ...(prev.classifications || {}),
                                  [alert.id]: opt.value,
                                },
                              }))
                            }
                            className={`p-1.5 rounded text-[10px] font-bold border transition-all text-center ${
                              isSelected
                                ? opt.badgeClass
                                : "bg-[#0a0e14] border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                            }`}
                          >
                            {opt.value === "TRUE POSITIVE" && "TRUE POS"}
                            {opt.value === "FALSE POSITIVE" && "FALSE POS"}
                            {opt.value === "EXPECTED ACTIVITY" && "EXPECTED"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LAB 03: Severity Matrix & Shift Capacity */}
        {labId === "lab-03" && (
          <div className="space-y-4">
            <div className="bg-[#111823] p-2.5 rounded border border-[#243042] text-[11px] text-slate-300">
              Apply the Severity Matrix (Asset Tier × Threat Status × Impact) to rate all 6 incidents and determine triage order.
            </div>

            <div className="space-y-2.5">
              {LAB_03_SCENARIO.incidents.map((inc) => {
                const currentSeverity = (answers as Lab03Answers).severities?.[inc.id] || "";

                return (
                  <div key={inc.id} className="p-2 bg-[#111823] border border-[#243042] rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400 text-[11px]">{inc.id}</span>
                      <span className="text-[10px] text-slate-400">{inc.user}</span>
                    </div>

                    <div className="text-[11px] text-slate-200 font-semibold">{inc.title}</div>

                    <div className="grid grid-cols-4 gap-1 pt-1">
                      {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((sev) => {
                        const isSelected = currentSeverity === sev;
                        return (
                          <button
                            key={sev}
                            type="button"
                            onClick={() =>
                              onUpdateAnswers((prev: Lab03Answers) => ({
                                ...prev,
                                severities: {
                                  ...(prev.severities || {}),
                                  [inc.id]: sev,
                                },
                              }))
                            }
                            className={`p-1 rounded text-[9px] font-bold border transition-all text-center ${
                              isSelected
                                ? sev === "CRITICAL"
                                  ? "bg-red-950 text-red-300 border-red-500"
                                  : sev === "HIGH"
                                  ? "bg-orange-950 text-orange-300 border-orange-500"
                                  : sev === "MEDIUM"
                                  ? "bg-yellow-950 text-yellow-300 border-yellow-500"
                                  : "bg-emerald-950 text-emerald-300 border-emerald-500"
                                : "bg-[#0a0e14] border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                            }`}
                          >
                            {sev}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shift Priority Decision */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-[11px] font-bold text-cyan-400 block">
                Shift Capacity Allocation (8 Hours Available):
              </label>

              <div className="space-y-1.5">
                {LAB_03_SCENARIO.priorityDecisionOptions.map((opt) => {
                  const isChecked = (answers as Lab03Answers).priorityDecision === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() =>
                        onUpdateAnswers((prev: Lab03Answers) => ({
                          ...prev,
                          priorityDecision: opt.value,
                        }))
                      }
                      className={`p-2 rounded border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-cyan-950/50 border-cyan-500 text-cyan-200"
                          : "bg-[#0a0e14] border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-[10px]">{opt.label}</div>
                      <p className="text-[9px] text-slate-500 mt-0.5">{opt.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* LAB 04: Incident Escalation & Team Coordination */}
        {labId === "lab-04" && (
          <div className="space-y-4">
            <div className="bg-[#111823] p-2.5 rounded border border-[#243042] text-[11px] text-slate-300">
              Orchestrate the crisis response. Route each containment and remediation action to the right team or specialist.
            </div>

            <div className="space-y-3">
              {LAB_04_SCENARIO.escalationDecisions.map((dec) => {
                const currentVal = (answers as Lab04Answers).escalations?.[dec.id] || "";

                return (
                  <div key={dec.id} className="p-2.5 bg-[#111823] border border-[#243042] rounded space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-200">{dec.question}</div>
                    <p className="text-[10px] text-slate-400">{dec.context}</p>

                    <div className="space-y-1 pt-1">
                      {dec.options.map((opt) => {
                        const isSelected = currentVal === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() =>
                              onUpdateAnswers((prev: Lab04Answers) => ({
                                ...prev,
                                escalations: {
                                  ...(prev.escalations || {}),
                                  [dec.id]: opt.value,
                                },
                              }))
                            }
                            className={`p-1.5 rounded border cursor-pointer text-[10px] transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-cyan-950/60 border-cyan-500 text-cyan-200 font-bold"
                                : "bg-[#0a0e14] border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
