// PMO週次報告書のデータ型定義

export interface Project {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  progress: number;
  phase: string;
  manager: string;
}

export interface RiskItem {
  id: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
  status: 'open' | 'mitigated' | 'closed';
}

export interface IssueItem {
  id: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'resolved';
  countermeasure: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  pros: string[];
  cons: string[];
  risk: 'low' | 'medium' | 'high';
}

export interface DecisionItem {
  id: string;
  question: string;
  options: DecisionOption[];
  selectedOption?: string;
  decisionDate: string;
  impact: string;
  responsible: string;
  details: string;
}

export interface WeeklyProgress {
  projectId: string;
  weekEnding: string;
  progress: number;
  risks: RiskItem[];
  issues: IssueItem[];
  decisions: DecisionItem[];
}

export interface QualityKPI {
  projectId: string;
  phase: string;
  metrics: {
    defectRate: number;
    testCoverage: number;
    codeQuality: number;
    performanceScore: number;
  };
  target: {
    defectRate: number;
    testCoverage: number;
    codeQuality: number;
    performanceScore: number;
  };
}

export interface CrossProjectCoordination {
  id: string;
  fromProject: string;
  toProject: string;
  topic: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-discussion' | 'resolved';
  dueDate: string;
  description: string;
}

export interface TeamCoordination {
  id: string;
  projectId: string;
  fromTeam: 'app' | 'infra' | 'common' | 'maintenance';
  toTeam: 'app' | 'infra' | 'common' | 'maintenance';
  topic: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-discussion' | 'resolved';
  dueDate: string;
  description: string;
}