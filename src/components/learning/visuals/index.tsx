'use client';

import React from 'react';
import { SocArchitectureDiagram } from './soc-architecture';
import { EventToIncidentFlow, EventFilteringFunnel } from './event-flows';
import { AlertTriageWorkflow, TriageQuestions } from './triage-workflow';
import { FalsePositiveDiagram, FalsePositiveDecisionTree } from './false-positives';
import { SeverityMatrix, ImpactConfidenceMatrix } from './severity-matrices';
import { EscalationPath, EscalationDecisionTree, EscalationTemplate } from './escalation';
import { DocumentationImportance, DocumentationTemplate, GoodVsBadDocumentation } from './documentation';

export {
  SocArchitectureDiagram,
  EventToIncidentFlow,
  EventFilteringFunnel,
  AlertTriageWorkflow,
  TriageQuestions,
  FalsePositiveDiagram,
  FalsePositiveDecisionTree,
  SeverityMatrix,
  ImpactConfidenceMatrix,
  EscalationPath,
  EscalationDecisionTree,
  EscalationTemplate,
  DocumentationImportance,
  DocumentationTemplate,
  GoodVsBadDocumentation,
};

const visualComponentMap: Record<string, React.ComponentType<any>> = {
  SocArchitectureDiagram,
  EventToIncidentFlow,
  EventFilteringFunnel,
  AlertTriageWorkflow,
  TriageQuestions,
  FalsePositiveDiagram,
  FalsePositiveDecisionTree,
  SeverityMatrix,
  ImpactConfidenceMatrix,
  EscalationPath,
  EscalationDecisionTree,
  EscalationTemplate,
  DocumentationImportance,
  DocumentationTemplate,
  GoodVsBadDocumentation,
};

export function VisualRenderer({ componentName }: { componentName: string }) {
  const Component = visualComponentMap[componentName];
  if (!Component) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground my-4">
        Visual component not found: <code className="font-mono text-primary">{componentName}</code>
      </div>
    );
  }

  return <Component />;
}
