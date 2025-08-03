import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  AlertTriangle, 
  Award,
  GitBranch,
  Users,
  BookOpen,
  Network,
  FileCheck,
  Brain,
  Calendar,
  Activity,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProjectTimeline from '../components/ProjectTimeline.js';
import ResourceMatrix from '../components/ResourceMatrix.js';
import type { ProjectSchedule, Milestone, ScheduleDependency } from '../components/ProjectTimeline.js';
import Modal from '../components/Modal.js';

const PfMPage: React.FC = () => {
  // タブ管理 - PgMOの5つの実現目標に基づく構成
  const [activeTab, setActiveTab] = useState<'strategic-alignment' | 'project-dependencies' | 'stagegate' | 'resource-optimization' | 'knowledge-learning'>('strategic-alignment');
  // ゲート詳細モーダル用
  const [selectedGate, setSelectedGate] = useState<any>(null);

  // PgMOの5つの実現目標データ
  const pgmoMetrics = {
    strategicAlignment: {
      title: '戦略目標との整合性（縦の整合）',
      subtitle: '目標達成による効果最大化',
      kpis: [
        { name: '戦略整合率', current: 92, target: 90, unit: '%', trend: 'up', description: '各プロジェクトの戦略目標との整合度' },
        { name: 'ベネフィット実現率', current: 78, target: 85, unit: '%', trend: 'stable', description: 'プロジェクトで創出されたベネフィット' },
        { name: 'バリュー創出指数', current: 85, target: 80, unit: 'pt', trend: 'up', description: 'ベネフィットが実際の事業価値に転換された指標' },
        { name: 'TCO最適化率', current: 94, target: 90, unit: '%', trend: 'up', description: 'プログラム全体のTCO最適化度' }
      ],
      projects: [
        { 
          name: 'AI・データ活用基盤', 
          alignment: 95, 
          benefit: 88, 
          value: 92, 
          risk: 'low',
          purpose: 'データドリブン経営の実現とAI活用による競争優位性確立',
          objectives: ['予測分析精度95%以上', 'データ処理時間50%短縮', 'AI機能による売上10%向上'],
          plannedROI: 440,
          actualROI: 385,
          roiHistory: [
            { month: '2024-01', planned: 50, actual: 45 },
            { month: '2024-02', planned: 120, actual: 98 },
            { month: '2024-03', planned: 200, actual: 165 },
            { month: '2024-04', planned: 280, actual: 245 },
            { month: '2024-05', planned: 340, actual: 305 },
            { month: '2024-06', planned: 400, actual: 355 },
            { month: '2024-07', planned: 440, actual: 385 }
          ]
        },
        { 
          name: 'クラウド移行PJ', 
          alignment: 98, 
          benefit: 85, 
          value: 89, 
          risk: 'low',
          purpose: 'インフラ運用コスト削減とスケーラビリティ向上',
          objectives: ['運用コスト30%削減', 'システム可用性99.9%', 'デプロイ時間80%短縮'],
          plannedROI: 320,
          actualROI: 315,
          roiHistory: [
            { month: '2024-01', planned: 40, actual: 42 },
            { month: '2024-02', planned: 95, actual: 88 },
            { month: '2024-03', planned: 150, actual: 145 },
            { month: '2024-04', planned: 200, actual: 198 },
            { month: '2024-05', planned: 250, actual: 248 },
            { month: '2024-06', planned: 290, actual: 285 },
            { month: '2024-07', planned: 320, actual: 315 }
          ]
        },
        { 
          name: '新基幹システム刷新', 
          alignment: 87, 
          benefit: 75, 
          value: 82, 
          risk: 'medium',
          purpose: '業務効率化と統合データ管理による生産性向上',
          objectives: ['業務処理時間40%短縮', 'データ連携自動化', '月次決算日数5日短縮'],
          plannedROI: 280,
          actualROI: 220,
          roiHistory: [
            { month: '2024-01', planned: 20, actual: 15 },
            { month: '2024-02', planned: 60, actual: 45 },
            { month: '2024-03', planned: 110, actual: 85 },
            { month: '2024-04', planned: 160, actual: 125 },
            { month: '2024-05', planned: 200, actual: 165 },
            { month: '2024-06', planned: 240, actual: 195 },
            { month: '2024-07', planned: 280, actual: 220 }
          ]
        },
        { 
          name: 'セキュリティ強化PJ', 
          alignment: 93, 
          benefit: 70, 
          value: 78, 
          risk: 'low',
          purpose: 'サイバーセキュリティリスク軽減と法規制遵守',
          objectives: ['セキュリティインシデント0件', 'GDPR完全準拠', '脆弱性検出100%'],
          plannedROI: 180,
          actualROI: 175,
          roiHistory: [
            { month: '2024-01', planned: 15, actual: 18 },
            { month: '2024-02', planned: 35, actual: 38 },
            { month: '2024-03', planned: 60, actual: 62 },
            { month: '2024-04', planned: 90, actual: 88 },
            { month: '2024-05', planned: 120, actual: 118 },
            { month: '2024-06', planned: 150, actual: 148 },
            { month: '2024-07', planned: 180, actual: 175 }
          ]
        },
        { 
          name: 'モバイルアプリ開発', 
          alignment: 89, 
          benefit: 72, 
          value: 85, 
          risk: 'medium',
          purpose: '顧客体験向上とデジタル接点強化',
          objectives: ['MAU 50万人達成', 'アプリ経由売上20%', '顧客満足度4.5以上'],
          plannedROI: 250,
          actualROI: 195,
          roiHistory: [
            { month: '2024-01', planned: 10, actual: 8 },
            { month: '2024-02', planned: 35, actual: 28 },
            { month: '2024-03', planned: 70, actual: 55 },
            { month: '2024-04', planned: 110, actual: 88 },
            { month: '2024-05', planned: 150, actual: 125 },
            { month: '2024-06', planned: 200, actual: 160 },
            { month: '2024-07', planned: 250, actual: 195 }
          ]
        }
      ]
    },
    projectDependencies: {
      title: 'プロジェクト間関係の整理（横の整合）',
      subtitle: '目標達成による効果最大化',
      dependencies: [
        { from: 'AI・データ活用基盤', to: '新基幹システム刷新', type: 'データ連携', priority: 'high', status: 'active', impact: '高', risk: 'medium' },
        { from: 'クラウド移行PJ', to: 'セキュリティ強化PJ', type: 'インフラ共有', priority: 'high', status: 'active', impact: '高', risk: 'low' },
        { from: '新基幹システム刷新', to: 'モバイルアプリ開発', type: 'API提供', priority: 'medium', status: 'planned', impact: '中', risk: 'medium' },
        { from: 'AI・データ活用基盤', to: 'モバイルアプリ開発', type: '分析機能', priority: 'medium', status: 'planned', impact: '中', risk: 'low' }
      ],
      resourceConflicts: [
        { resource: 'データサイエンティスト', conflictProjects: ['AI・データ活用基盤', 'モバイルアプリ開発'], resolution: 'スキル共有・ローテーション' },
        { resource: 'セキュリティエンジニア', conflictProjects: ['クラウド移行PJ', 'セキュリティ強化PJ'], resolution: '段階的配分・優先順位調整' }
      ]
    },
    stageGate: {
      title: 'ステージゲート管理',
      subtitle: '効率運営・意思決定迅速化',
      gates: [
        { id: 'gate-001', project: 'AI・データ活用基盤', phase: 'POC完了', dueDate: '2025-08-15', status: 'ready', decision: 'pending', criteria: ['技術検証完了', 'ROI算出', 'リスク評価'] },
        { id: 'gate-002', project: 'クラウド移行PJ', phase: '移行計画承認', dueDate: '2025-08-10', status: 'in-review', decision: 'approved', criteria: ['移行戦略確定', 'コスト承認', 'リスク対策'] },
        { id: 'gate-003', project: '新基幹システム刷新', phase: '要件定義完了', dueDate: '2025-08-20', status: 'pending', decision: 'pending', criteria: ['業務要件確定', 'システム仕様', '予算承認'] }
      ],
      escalations: [
        { issue: 'AI・データ活用基盤のROI未達', level: 'critical', assignee: 'CTO', deadline: '2025-08-12' },
        { issue: 'クラウド移行の予算超過リスク', level: 'high', assignee: 'CFO', deadline: '2025-08-08' }
      ]
    },
    resourceOptimization: {
      title: 'リソース配分最適化',
      subtitle: '人材・予算・スキルの戦略的配分',
      resources: [
        { type: 'エンジニア', total: 45, allocated: 42, utilization: 93, skills: ['Java', 'Python', 'React', 'AWS'] },
        { type: 'データサイエンティスト', total: 8, allocated: 8, utilization: 100, skills: ['ML', 'SQL', 'Python', 'Tableau'] },
        { type: 'プロジェクトマネージャー', total: 12, allocated: 10, utilization: 83, skills: ['PMP', 'Agile', 'リーダーシップ'] },
        { type: 'セキュリティエンジニア', total: 6, allocated: 6, utilization: 100, skills: ['セキュリティ', 'ネットワーク', 'クラウド'] }
      ],
      budgetAllocation: [
        { project: 'AI・データ活用基盤', budget: 1200, spent: 380, remaining: 820, efficiency: 92 },
        { project: 'クラウド移行PJ', budget: 850, spent: 630, remaining: 220, efficiency: 98 },
        { project: '新基幹システム刷新', budget: 1500, spent: 450, remaining: 1050, efficiency: 87 },
        { project: 'セキュリティ強化PJ', budget: 400, spent: 180, remaining: 220, efficiency: 95 },
        { project: 'モバイルアプリ開発', budget: 600, spent: 120, remaining: 480, efficiency: 89 }
      ]
    },
    knowledgeLearning: {
      title: 'ナレッジ・組織学習',
      subtitle: '効率運営と組織成長の実現',
      bestPractices: [
        { id: 'bp-001', title: 'クラウド移行時のダウンタイム最小化手法', project: 'クラウド移行PJ', impact: 'high', applicability: ['新基幹システム刷新', 'モバイルアプリ開発'] },
        { id: 'bp-002', title: 'アジャイル開発での品質確保プロセス', project: 'AI・データ活用基盤', impact: 'medium', applicability: ['モバイルアプリ開発', 'セキュリティ強化PJ'] },
        { id: 'bp-003', title: 'データ統合における性能最適化', project: '新基幹システム刷新', impact: 'high', applicability: ['AI・データ活用基盤'] }
      ],
      lessonsLearned: [
        { id: 'll-001', title: '過去のERP導入での予算超過要因分析', risk: 'budget', prevention: '段階的導入とマイルストーン管理強化', projects: ['新基幹システム刷新'] },
        { id: 'll-002', title: 'セキュリティ要件の後付け追加コスト', risk: 'security', prevention: '初期段階でのセキュリティ要件定義', projects: ['すべて'] },
        { id: 'll-003', title: 'ユーザー受け入れテスト期間の不足', risk: 'schedule', prevention: 'UAT期間の十分な確保と並行テスト', projects: ['新基幹システム刷新', 'モバイルアプリ開発'] }
      ],
      metrics: [
        { name: 'ナレッジ共有率', current: 79, target: 85, unit: '%' },
        { name: '教訓活用率', current: 86, target: 80, unit: '%' },
        { name: '組織学習指数', current: 91, target: 85, unit: 'pt' },
        { name: 'ベストプラクティス活用数', current: 23, target: 20, unit: '件' }
      ]
    }
  };

  // ゲートフェーズ共通定義
interface ProjectGateProgress {
  project: string;
  currentPhase: string;
  issues: Record<string, string[]>;
}
  const gatePhases = ['システム企画','要件定義','設計','開発・単体テスト','結合テスト','総合テスト','UAT','リリース～初期流動'];

  // 各プロジェクトのゲート進捗と指摘事項（モック）
  const projectsGateProgress: ProjectGateProgress[] = [
    {
      project: 'AI・データ活用基盤',
      currentPhase: '開発・単体テスト',
      issues: {
        '要件定義': ['非機能要件の曖昧さ'],
        '開発・単体テスト': ['テストケース不足', 'コード品質のばらつき']
      }
    },
    {
      project: 'クラウド移行PJ',
      currentPhase: '結合テスト',
      issues: {
        '設計': ['冗長構成に関するコスト超過指摘'],
        '結合テスト': ['パフォーマンス劣化が閾値超過']
      }
    },
    {
      project: '新基幹システム刷新',
      currentPhase: '要件定義',
      issues: {
        '要件定義': ['部門間で要件優先度が未合意']
      }
    },
    {
      project: 'セキュリティ強化PJ',
      currentPhase: '総合テスト',
      issues: {
        '総合テスト': ['脆弱性スキャンの再検出項目あり']
      }
    },
    {
      project: 'モバイルアプリ開発',
      currentPhase: '設計',
      issues: {
        '設計': ['UI ガイドラインの最新化が未反映']
      }
    }
  ];

  // ガント用スケジュール（矢羽根表示）
  const projectSchedules: ProjectSchedule[] = [
    {
      project: 'AI・データ活用基盤',
      phases: [
        { name: 'システム企画', start: '2025-01', end: '2025-02' },
        { name: '要件定義', start: '2025-03', end: '2025-04' },
        { name: '設計', start: '2025-05', end: '2025-06' },
        { name: '開発・単体テスト', start: '2025-07', end: '2025-11', critical: true },
        { name: '結合テスト', start: '2025-12', end: '2026-02', critical: true },
        { name: '総合テスト', start: '2026-03', end: '2026-04' },
        { name: 'UAT', start: '2026-05', end: '2026-06' },
        { name: 'リリース～初期流動', start: '2026-07', end: '2026-08' },
      ],
    },
    {
      project: 'クラウド移行PJ',
      phases: [
        { name: 'システム企画', start: '2025-02', end: '2025-03' },
        { name: '要件定義', start: '2025-04', end: '2025-05' },
        { name: '設計', start: '2025-06', end: '2025-07' },
        { name: '開発・単体テスト', start: '2025-08', end: '2025-10' },
        { name: '結合テスト', start: '2025-11', end: '2026-01' },
        { name: '総合テスト', start: '2026-02', end: '2026-03', critical: true },
        { name: 'UAT', start: '2026-04', end: '2026-05' },
        { name: 'リリース～初期流動', start: '2026-06', end: '2026-07' },
      ],
    },
    {
      project: '新基幹システム刷新',
      phases: [
        { name: 'システム企画', start: '2025-01', end: '2025-03' },
        { name: '要件定義', start: '2025-04', end: '2025-06', critical: true },
        { name: '設計', start: '2025-07', end: '2025-09' },
        { name: '開発・単体テスト', start: '2025-10', end: '2026-03' },
        { name: '結合テスト', start: '2026-04', end: '2026-06' },
        { name: '総合テスト', start: '2026-07', end: '2026-08' },
        { name: 'UAT', start: '2026-09', end: '2026-10', critical: true },
        { name: 'リリース～初期流動', start: '2026-11', end: '2026-12' },
      ],
    },
    {
      project: 'セキュリティ強化PJ',
      phases: [
        { name: 'システム企画', start: '2025-03', end: '2025-04' },
        { name: '要件定義', start: '2025-05', end: '2025-06' },
        { name: '設計', start: '2025-07', end: '2025-08' },
        { name: '開発・単体テスト', start: '2025-09', end: '2025-11', critical: true },
        { name: '結合テスト', start: '2025-12', end: '2026-01' },
        { name: '総合テスト', start: '2026-02', end: '2026-03' },
        { name: 'UAT', start: '2026-04', end: '2026-05' },
        { name: 'リリース～初期流動', start: '2026-06', end: '2026-07' },
      ],
    },
    {
      project: 'モバイルアプリ開発',
      phases: [
        { name: 'システム企画', start: '2025-04', end: '2025-05' },
        { name: '要件定義', start: '2025-06', end: '2025-07' },
        { name: '設計', start: '2025-08', end: '2025-09' },
        { name: '開発・単体テスト', start: '2025-10', end: '2026-01' },
        { name: '結合テスト', start: '2026-02', end: '2026-03' },
        { name: '総合テスト', start: '2026-04', end: '2026-05' },
        { name: 'UAT', start: '2026-06', end: '2026-07', critical: true },
        { name: 'リリース～初期流動', start: '2026-08', end: '2026-09' },
      ],
    },
  ];

  // リソース計画モック
  const resourcePlans = [
    {
      project: 'AI・データ活用基盤',
      phaseResources: {
        'システム企画': { user: 2, vendor: 1 },
        '要件定義': { user: 3, vendor: 2 },
        '設計': { user: 2, vendor: 4 },
        '開発・単体テスト': { user: 1, vendor: 8 },
        '結合テスト': { user: 2, vendor: 6 },
        '総合テスト': { user: 2, vendor: 4 },
        'UAT': { user: 4, vendor: 2 },
        'リリース～初期流動': { user: 2, vendor: 1 }
      }
    },
    {
      project: 'クラウド移行PJ',
      phaseResources: {
        'システム企画': { user: 1, vendor: 1 },
        '要件定義': { user: 2, vendor: 2 },
        '設計': { user: 2, vendor: 3 },
        '開発・単体テスト': { user: 1, vendor: 6 },
        '結合テスト': { user: 1, vendor: 4 },
        '総合テスト': { user: 2, vendor: 3 },
        'UAT': { user: 3, vendor: 2 },
        'リリース～初期流動': { user: 1, vendor: 1 }
      }
    },
    {
      project: '新基幹システム刷新',
      phaseResources: {
        'システム企画': { user: 3, vendor: 2 },
        '要件定義': { user: 4, vendor: 3 },
        '設計': { user: 3, vendor: 5 },
        '開発・単体テスト': { user: 2, vendor: 10 },
        '結合テスト': { user: 2, vendor: 8 },
        '総合テスト': { user: 3, vendor: 6 },
        'UAT': { user: 5, vendor: 3 },
        'リリース～初期流動': { user: 2, vendor: 2 }
      }
    },
    {
      project: 'セキュリティ強化PJ',
      phaseResources: {
        'システム企画': { user: 1, vendor: 1 },
        '要件定義': { user: 2, vendor: 1 },
        '設計': { user: 2, vendor: 2 },
        '開発・単体テスト': { user: 1, vendor: 5 },
        '結合テスト': { user: 1, vendor: 3 },
        '総合テスト': { user: 2, vendor: 4 },
        'UAT': { user: 3, vendor: 2 },
        'リリース～初期流動': { user: 1, vendor: 1 }
      }
    },
    {
      project: 'モバイルアプリ開発',
      phaseResources: {
        'システム企画': { user: 2, vendor: 1 },
        '要件定義': { user: 2, vendor: 2 },
        '設計': { user: 2, vendor: 3 },
        '開発・単体テスト': { user: 1, vendor: 6 },
        '結合テスト': { user: 1, vendor: 4 },
        '総合テスト': { user: 2, vendor: 3 },
        'UAT': { user: 3, vendor: 2 },
        'リリース～初期流動': { user: 1, vendor: 1 }
      }
    }
  ];

  // マイルストーンとクリティカルパス
  const timelineMilestones: Milestone[] = [
    { id: 'm1', date: '2025-08', name: '予算承認', impacts: [{ project: 'AI・データ活用基盤', phase: '要件定義' }] },
    { id: 'm2', date: '2025-12', name: 'アーキテクチャ確定', impacts: [{ project: 'クラウド移行PJ', phase: '設計' }] },
    { id: 'm3', date: '2026-06', name: 'システム統合判定', impacts: [{ project: '新基幹システム刷新', phase: '総合テスト' }] }
  ];

  const timelineDeps: ScheduleDependency[] = [
    { fromProject: 'AI・データ活用基盤', fromPhase: '結合テスト', toProject: 'モバイルアプリ開発', toPhase: '総合テスト', description: '分析API連携', critical: true },
    { fromProject: 'クラウド移行PJ', fromPhase: '総合テスト', toProject: 'セキュリティ強化PJ', toPhase: 'UAT', description: 'インフラ共有', critical: true },
    { fromProject: '新基幹システム刷新', fromPhase: 'UAT', toProject: 'モバイルアプリ開発', toPhase: 'リリース～初期流動', description: 'データAPI提供', critical: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24">
      <main className="p-8">
        <div className="max-w-none mx-auto">
          {/* PgMO 5つの実現目標タブナビゲーション */}
          <div className="grid grid-cols-5 gap-2 mb-8 bg-gray-100 p-2 rounded-lg">
            <button
              onClick={() => setActiveTab('strategic-alignment')}
              className={`px-4 py-3 rounded-md font-medium transition-all text-center ${
                activeTab === 'strategic-alignment'
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <Target className="w-5 h-5 mb-1" />
                <span className="text-xs">戦略整合</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('project-dependencies')}
              className={`px-4 py-3 rounded-md font-medium transition-all text-center ${
                activeTab === 'project-dependencies'
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <GitBranch className="w-5 h-5 mb-1" />
                <span className="text-xs">横断管理</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stagegate')}
              className={`px-4 py-3 rounded-md font-medium transition-all text-center ${
                activeTab === 'stagegate'
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <FileCheck className="w-5 h-5 mb-1" />
                <span className="text-xs">ゲート管理</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('resource-optimization')}
              className={`px-4 py-3 rounded-md font-medium transition-all text-center ${
                activeTab === 'resource-optimization'
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">リソース最適</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('knowledge-learning')}
              className={`px-4 py-3 rounded-md font-medium transition-all text-center ${
                activeTab === 'knowledge-learning'
                  ? 'bg-white text-blue-600 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <Brain className="w-5 h-5 mb-1" />
                <span className="text-xs">ナレッジ共有</span>
              </div>
            </button>
          </div>

          {/* 戦略整合性タブ */}
          {activeTab === 'strategic-alignment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* 戦略整合性ヘッダー */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{pgmoMetrics.strategicAlignment.title}</h2>
                    <p className="text-gray-600">{pgmoMetrics.strategicAlignment.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* 戦略整合性KPI */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {pgmoMetrics.strategicAlignment.kpis.map((kpi, index) => (
                  <motion.div
                    key={kpi.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        kpi.current >= kpi.target ? 'bg-green-100 text-green-800' :
                        kpi.current >= kpi.target * 0.9 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'}
                      </div>
                      <div className="text-xs text-gray-500">目標: {kpi.target}{kpi.unit}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {kpi.current}{kpi.unit}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {kpi.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {kpi.description}
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            kpi.current >= kpi.target ? 'bg-green-500' :
                            kpi.current >= kpi.target * 0.9 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, (kpi.current / kpi.target) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* プロジェクト別戦略整合性分析 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  プロジェクト別戦略整合性分析
                </h3>
                <div className="space-y-6">
                  {pgmoMetrics.strategicAlignment.projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      {/* プロジェクトヘッダー */}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.risk === 'low' ? 'bg-green-100 text-green-800' :
                            project.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.risk === 'low' ? 'Low Risk' : project.risk === 'medium' ? 'Medium Risk' : 'High Risk'}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">予定ROI:</span>
                            <span className="text-lg font-bold text-blue-600">{project.plannedROI}%</span>
                            <span className="text-sm text-gray-600">実績ROI:</span>
                            <span className={`text-lg font-bold ${
                              project.actualROI >= project.plannedROI * 0.9 ? 'text-green-600' : 
                              project.actualROI >= project.plannedROI * 0.8 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {project.actualROI}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* プロジェクト目的・目標 */}
                      <div className="mb-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">プロジェクト目的</h5>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
                              {project.purpose}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2">主要目標</h5>
                            <ul className="space-y-1">
                              {project.objectives.map((objective, idx) => (
                                <li key={idx} className="text-sm text-gray-700 bg-green-50 p-2 rounded border border-green-200 flex items-center">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                  {objective}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* ROI推移グラフ */}
                      <div className="mb-6">
                        <h5 className="text-sm font-medium text-gray-900 mb-3">ROI推移（予実比較）</h5>
                        <div className="h-64 w-full bg-gray-50 p-4 rounded border">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={project.roiHistory}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="month" 
                                tick={{fontSize: 11}}
                                tickFormatter={(value) => value.substring(5)}
                              />
                              <YAxis 
                                tick={{fontSize: 11}}
                                label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }}
                              />
                              <Tooltip 
                                labelFormatter={(value) => `${value}`}
                                formatter={(value, name) => [
                                  `${value}%`, 
                                  name === 'planned' ? '予定ROI' : '実績ROI'
                                ]}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="planned" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                name="planned"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="actual" 
                                stroke={project.actualROI >= project.plannedROI * 0.9 ? '#10b981' : '#ef4444'}
                                strokeWidth={3}
                                dot={{ 
                                  fill: project.actualROI >= project.plannedROI * 0.9 ? '#10b981' : '#ef4444',
                                  strokeWidth: 2, 
                                  r: 5 
                                }}
                                name="actual"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* 戦略整合性指標 */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">戦略整合率</div>
                          <div className="text-lg font-bold text-gray-900">{project.alignment}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${project.alignment}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">ベネフィット実現</div>
                          <div className="text-lg font-bold text-gray-900">{project.benefit}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${project.benefit}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">バリュー創出</div>
                          <div className="text-lg font-bold text-gray-900">{project.value}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${project.value}%` }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* プロジェクト間関係タブ */}
          {activeTab === 'project-dependencies' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <GitBranch className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{pgmoMetrics.projectDependencies.title}</h2>
                    <p className="text-gray-600">{pgmoMetrics.projectDependencies.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* 依存関係マップ */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Network className="w-5 h-5 mr-2 text-blue-600" />
                  プロジェクト間依存関係マップ
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {pgmoMetrics.projectDependencies.dependencies.map((dep, index) => (
                    <motion.div
                      key={`${dep.from}-${dep.to}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dep.priority === 'high' ? 'bg-red-100 text-red-800' :
                          dep.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {dep.priority === 'high' ? 'High' : dep.priority === 'medium' ? 'Medium' : 'Low'} Priority
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dep.status === 'active' ? 'bg-green-100 text-green-800' :
                          dep.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {dep.status === 'active' ? 'Active' : dep.status === 'planned' ? 'Planned' : 'Completed'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 mb-1">{dep.from}</div>
                        <div className="flex items-center justify-center mb-1">
                          <div className="w-8 h-px bg-blue-500"></div>
                          <div className="mx-2 text-xs text-blue-600">{dep.type}</div>
                          <div className="w-8 h-px bg-blue-500"></div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{dep.to}</div>
                      </div>
                      <div className="mt-3 text-xs text-gray-600 text-center">
                        インパクト: <span className="font-medium">{dep.impact}</span> | 
                        リスク: <span className="font-medium">{dep.risk}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* プロジェクトスケジュール（矢羽根） */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  プロジェクトスケジュール（2025-2026）
                </h3>
                <ProjectTimeline 
                  schedules={projectSchedules} 
                  milestones={timelineMilestones}
                  dependencies={timelineDeps} 
                />
              </div>

              {/* リソースコンフリクト */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  リソースコンフリクト管理
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.projectDependencies.resourceConflicts.map((conflict, index) => (
                    <motion.div
                      key={conflict.resource}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{conflict.resource}</h4>
                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Conflict
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        競合プロジェクト: {conflict.conflictProjects.join(', ')}
                      </div>
                      <div className="text-sm text-gray-900">
                        <strong>解決策:</strong> {conflict.resolution}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ステージゲート管理タブ */}
          {activeTab === 'stagegate' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <FileCheck className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{pgmoMetrics.stageGate.title}</h2>
                    <p className="text-gray-600">{pgmoMetrics.stageGate.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* ステージゲート一覧 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  ステージゲート判定状況
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.stageGate.gates.map((gate, index) => (
                    <motion.div
                      key={gate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{gate.project}</h4>
                          <p className="text-sm text-gray-600">{gate.phase}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            gate.status === 'ready' ? 'bg-green-100 text-green-800' :
                            gate.status === 'in-review' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {gate.status === 'ready' ? 'Ready' : gate.status === 'in-review' ? 'In Review' : 'Pending'}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            gate.decision === 'approved' ? 'bg-green-100 text-green-800' :
                            gate.decision === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {gate.decision === 'approved' ? 'Approved' : gate.decision === 'rejected' ? 'Rejected' : 'Pending'}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        期限: <span className="font-medium">{gate.dueDate}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">判定基準:</div>
                        <div className="flex flex-wrap gap-2">
                          {gate.criteria.map((criterion, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {criterion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ゲート進捗タイムライン */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  ゲート進捗タイムライン
                </h3>
                <div className="space-y-6 overflow-x-auto">
                  {projectsGateProgress.map((proj, idx) => (
                    <motion.div
                      key={proj.project}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="min-w-max"
                    >
                      <div className="mb-2 font-medium text-gray-900 flex items-center">
                        <GitBranch className="w-4 h-4 mr-1 text-cyan-600" />
                        {proj.project}
                      </div>
                      <div className="flex items-center space-x-2">
                        {gatePhases.map((phase) => {
                          const phaseStatus = gatePhases.indexOf(phase) < gatePhases.indexOf(proj.currentPhase) ? 'done' :
                                             gatePhases.indexOf(phase) === gatePhases.indexOf(proj.currentPhase) ? 'in' : 'pending';
                          const hasIssues = proj.issues[phase] && proj.issues[phase].length > 0;
                          return (
                            <button
                              key={phase}
                              onClick={() => setSelectedGate({ project: proj.project, phaseName: phase, issues: proj.issues[phase] || [] })}
                              className={`px-2 py-1 rounded text-xs font-medium focus:outline-none transition-all border ${
                                phaseStatus === 'done' ? 'bg-emerald-600 text-white border-emerald-600' :
                                phaseStatus === 'in' ? 'bg-yellow-500 text-white border-yellow-500 animate-pulse' : 'bg-gray-200 text-gray-600 border-gray-300'
                              } ${hasIssues ? 'ring-2 ring-red-400' : ''}`}
                              title={`${phase}${hasIssues ? ' - 指摘あり' : ''}`}
                            >
                              {phase}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* エスカレーション管理 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  エスカレーション管理
                </h3>
                <div className="space-y-3">
                  {pgmoMetrics.stageGate.escalations.map((escalation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-l-4 p-4 rounded-r-lg ${
                        escalation.level === 'critical' ? 'bg-red-50 border-red-500' :
                        escalation.level === 'high' ? 'bg-orange-50 border-orange-500' :
                        'bg-yellow-50 border-yellow-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{escalation.issue}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          escalation.level === 'critical' ? 'bg-red-100 text-red-800' :
                          escalation.level === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {escalation.level === 'critical' ? 'Critical' : escalation.level === 'high' ? 'High' : 'Medium'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        担当: <span className="font-medium">{escalation.assignee}</span> | 
                        期限: <span className="font-medium">{escalation.deadline}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* リソース配分最適化タブ */}
          {activeTab === 'resource-optimization' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{pgmoMetrics.resourceOptimization.title}</h2>
                    <p className="text-gray-600">{pgmoMetrics.resourceOptimization.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* リソース稼働状況 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  リソース稼働状況
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {pgmoMetrics.resourceOptimization.resources.map((resource, index) => (
                    <motion.div
                      key={resource.type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{resource.type}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.utilization >= 95 ? 'bg-red-100 text-red-800' :
                          resource.utilization >= 85 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {resource.utilization}%
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        配置: {resource.allocated}/{resource.total}名
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full ${
                            resource.utilization >= 95 ? 'bg-red-500' :
                            resource.utilization >= 85 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${resource.utilization}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>スキル:</strong> {resource.skills.join(', ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* プロジェクト別リソース計画 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  プロジェクト別リソース計画（人月）
                </h3>
                <ResourceMatrix plans={resourcePlans} />
              </div>

              {/* 予算配分効率 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  予算配分効率
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.resourceOptimization.budgetAllocation.map((budget, index) => (
                    <motion.div
                      key={budget.project}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{budget.project}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">予算: ¥{budget.budget}M</span>
                          <span className="text-gray-600">消化: ¥{budget.spent}M</span>
                          <span className="text-green-600 font-medium">効率: {budget.efficiency}%</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
                          <div 
                            className="bg-blue-500 h-3 rounded-full"
                            style={{ width: `${(budget.spent / budget.budget) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-600 min-w-0">
                          残り: ¥{budget.remaining}M
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ナレッジ・組織学習タブ */}
          {activeTab === 'knowledge-learning' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{pgmoMetrics.knowledgeLearning.title}</h2>
                    <p className="text-gray-600">{pgmoMetrics.knowledgeLearning.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* ナレッジ共有KPI */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {pgmoMetrics.knowledgeLearning.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.current}{metric.unit}
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {metric.name}
                    </div>
                    <div className="text-xs text-gray-500">目標: {metric.target}{metric.unit}</div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            metric.current >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(100, (metric.current / metric.target) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ベストプラクティス */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  ベストプラクティス共有
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.knowledgeLearning.bestPractices.map((practice, index) => (
                    <motion.div
                      key={practice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{practice.title}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          practice.impact === 'high' ? 'bg-green-100 text-green-800' :
                          practice.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {practice.impact === 'high' ? 'High Impact' : practice.impact === 'medium' ? 'Medium Impact' : 'Low Impact'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        発信元: <span className="font-medium">{practice.project}</span>
                      </div>
                      <div className="text-sm text-gray-900">
                        <strong>適用可能:</strong> {practice.applicability.join(', ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 教訓・学習事項 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
                  教訓・学習事項
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.knowledgeLearning.lessonsLearned.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-l-4 p-4 rounded-r-lg ${
                        lesson.risk === 'budget' ? 'bg-red-50 border-red-500' :
                        lesson.risk === 'security' ? 'bg-orange-50 border-orange-500' :
                        'bg-yellow-50 border-yellow-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lesson.risk === 'budget' ? 'bg-red-100 text-red-800' :
                          lesson.risk === 'security' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lesson.risk === 'budget' ? 'Budget Risk' : lesson.risk === 'security' ? 'Security Risk' : 'Schedule Risk'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 mb-2">
                        <strong>予防策:</strong> {lesson.prevention}
                      </div>
                      <div className="text-xs text-gray-600">
                        適用プロジェクト: {lesson.projects.join(', ')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
            {selectedGate && (
        <Modal
          isOpen={!!selectedGate}
          onClose={() => setSelectedGate(null)}
          title={`${selectedGate.project} - ${selectedGate.phaseName} の指摘事項`}
        >
          <div className="space-y-2">
            {selectedGate.issues.length > 0 ? (
              selectedGate.issues.map((iss: string, idx: number) => (
                <p key={idx} className="text-sm text-gray-700">• {iss}</p>
              ))
            ) : (
              <p className="text-sm text-gray-500">指摘事項はありません。</p>
            )}
          </div>
        </Modal>
      )}
    </main>
    </div>
  );
};

export default PfMPage;