import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock,
  Award,
  BarChart3,
  Briefcase,
  Zap,
  GitBranch,
  Users,
  BookOpen,
  Network,
  FileCheck,
  Settings,
  Brain,
  Link,
  Calendar,
  Activity,
  Shield,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PfMPage: React.FC = () => {
  // タブ管理 - PgMOの5つの実現目標に基づく構成
  const [activeTab, setActiveTab] = useState<'strategic-alignment' | 'project-dependencies' | 'stagegate' | 'resource-optimization' | 'knowledge-learning'>('strategic-alignment');

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
        { name: 'AI・データ活用基盤', alignment: 95, benefit: 88, value: 92, risk: 'low' },
        { name: 'クラウド移行PJ', alignment: 98, benefit: 85, value: 89, risk: 'low' },
        { name: '新基幹システム刷新', alignment: 87, benefit: 75, value: 82, risk: 'medium' },
        { name: 'セキュリティ強化PJ', alignment: 93, benefit: 70, value: 78, risk: 'low' },
        { name: 'モバイルアプリ開発', alignment: 89, benefit: 72, value: 85, risk: 'medium' }
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

  const strategicInitiatives = [
    {
      name: 'Cloud-First戦略',
      progress: 78,
      status: 'on-track' as const,
      timeline: '2025年Q2'
    },
    {
      name: 'AI・データ駆動経営',
      progress: 65,
      status: 'accelerating' as const,
      timeline: '2025年Q3'
    },
    {
      name: 'セキュリティ強化',
      progress: 85,
      status: 'on-track' as const,
      timeline: '2024年Q4'
    }
  ];

  // PfMポートフォリオデータ（戦略的2次元分析用）
  const portfolioProjects = [
    {
      id: 'proj-001',
      name: '新基幹システム刷新',
      riskLevel: 25, // X軸: リスクレベル(%)
      innovationIndex: 75, // Y軸: イノベーション指数
      budget: 1200,
      actualSpent: 1020,
      expectedROI: 285, // ROI: プロットサイズに反映
      phase: '実装',
      status: 'on-track',
      color: '#10B981',
      strategicValue: 'Core Infrastructure',
      marketImpact: 'High',
      timeframe: '18ヶ月'
    },
    {
      id: 'proj-002',
      name: 'クラウド移行PJ',
      riskLevel: 15,
      innovationIndex: 65,
      budget: 850,
      actualSpent: 680,
      expectedROI: 320,
      phase: 'テスト',
      status: 'accelerating',
      color: '#3B82F6',
      strategicValue: 'Platform Modernization',
      marketImpact: 'Medium',
      timeframe: '12ヶ月'
    },
    {
      id: 'proj-003',
      name: 'AI・データ活用基盤',
      riskLevel: 35,
      innovationIndex: 95,
      budget: 1200,
      actualSpent: 780,
      expectedROI: 440,
      phase: '設計',
      status: 'attention-required',
      color: '#F59E0B',
      strategicValue: 'Digital Transformation',
      marketImpact: 'Very High',
      timeframe: '24ヶ月'
    },
    {
      id: 'proj-004',
      name: 'セキュリティ強化',
      riskLevel: 20,
      innovationIndex: 45,
      budget: 420,
      actualSpent: 315,
      expectedROI: 180,
      phase: '計画',
      status: 'on-track',
      color: '#10B981',
      strategicValue: 'Risk Mitigation',
      marketImpact: 'Medium',
      timeframe: '9ヶ月'
    },
    {
      id: 'proj-005',
      name: 'モバイルアプリ開発',
      riskLevel: 40,
      innovationIndex: 85,
      budget: 680,
      actualSpent: 510,
      expectedROI: 220,
      phase: '実装',
      status: 'attention-required',
      color: '#EF4444',
      strategicValue: 'Customer Experience',
      marketImpact: 'High',
      timeframe: '15ヶ月'
    }
  ];

  // 戦略的示唆と5W1H分析
  const strategicInsights = {
    what: {
      title: 'What: 投資ポートフォリオの現状分析',
      content: '我々の投資ポートフォリオにおいて、AI・データ活用基盤は最高のイノベーション指数95とROI 440%を実現している一方で、35%という高いリスクレベルを内包している。対照的に、クラウド移行PJはROI 320%とリスク15%の最適バランスを達成しており、安定的な投資効果を示している。総投資額¥4.35Bに対し、期待リターン¥12.1B（平均ROI 278%）という高収益性を見込んでいる。'
    },
    why: {
      title: 'Why: 戦略投資の根拠と背景',
      content: 'デジタル変革による競争優位性確保が急務となる中、我々はレガシーシステムのリスク回避と運用効率化を同時に推進している。データドリブン経営への転換により、従来の業務効率化から価値創造型ビジネスモデルへの転換を図り、市場における持続的な競争優位性を構築することを戦略的根拠としている。'
    },
    when: {
      title: 'When: 戦略的タイミングと実行スケジュール',
      content: '2024年Q4にセキュリティ基盤を完成させることでリスクベースラインを確立し、2025年Q2にクラウド移行を完了してプラットフォーム基盤を構築する。その後、2025年Q3-Q4にかけてAI基盤によるデータ活用を本格化し、段階的なデジタル変革を実現する戦略的タイムラインを設定している。'
    },
    where: {
      title: 'Where: 投資配分戦略と影響範囲',
      content: 'コアインフラ領域に41%（新基幹システム＋セキュリティ強化）、プラットフォーム領域に20%（クラウド移行によるモダナイゼーション）、イノベーション領域に39%（AI基盤＋モバイル体験向上）の投資配分を行い、技術基盤から価値創造まで包括的なデジタル投資戦略を展開している。'
    },
    who: {
      title: 'Who: ステークホルダー責任体制',
      content: 'CTOが技術基盤強化とアーキテクチャ統合の全体責任を担い、CDOがデータ活用戦略とAI投資ROI最大化を推進している。CISOはセキュリティリスク管理と合規性確保により投資基盤の安全性を保証し、三位一体での責任体制により戦略投資の成功を確実にしている。'
    },
    how: {
      title: 'How: 実行戦略と管理手法',
      content: '高ROI/高リスク投資と低リスク/中ROI投資のリスク分散により、ポートフォリオ全体の最適化を図っている。インフラ→プラットフォーム→イノベーションの段階的投資により依存関係を管理し、四半期ごとのアジャイルポートフォリオ見直しにより市場変化への適応性を確保している。'
    }
  };

  // ネクストアクション
  const nextActions = [
    {
      priority: 'Critical',
      action: 'AI・データ活用基盤のリスク軽減策実行',
      owner: 'CTO + データ責任者',
      deadline: '30日以内',
      impact: 'ROI 440%の投資効果確保'
    },
    {
      priority: 'High',
      action: 'モバイルアプリ開発の技術選定見直し',
      owner: 'プロダクトオーナー',
      deadline: '14日以内',
      impact: 'リスク40%→25%への軽減'
    },
    {
      priority: 'Medium',
      action: 'セキュリティ強化の早期完了',
      owner: 'CISO',
      deadline: '2024年Q3',
      impact: '全プロジェクトのリスクベースライン確立'
    },
    {
      priority: 'Medium',
      action: 'ポートフォリオROI最適化検討',
      owner: 'CFO + 投資委員会',
      deadline: '四半期レビュー',
      impact: '追加投資¥500M→期待リターン¥1.5B'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'accelerating': return 'text-blue-600 bg-blue-100';
      case 'attention-required': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <TrendingUp className="w-4 h-4" />;
      case 'accelerating': return <TrendingUp className="w-4 h-4" />;
      case 'attention-required': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // ROIサイズ分類関数
  const getROISize = (roi: number) => {
    if (roi >= 400) return { size: 24, category: '大' };
    if (roi >= 300) return { size: 18, category: '中' };
    if (roi >= 200) return { size: 14, category: '小' };
    return { size: 12, category: '最小' };
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const roiInfo = getROISize(data.expectedROI);
      return (
        <div className="bg-white p-5 border border-gray-300 rounded-lg shadow-xl max-w-xs">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <p className="font-bold text-gray-900 text-base">{data.name}</p>
            <p className="text-sm text-gray-500">{data.strategicValue}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">リスクレベル:</span>
              <span className="text-sm font-medium text-gray-900">{data.riskLevel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">イノベーション指数:</span>
              <span className="text-sm font-medium text-gray-900">{data.innovationIndex}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">期待ROI:</span>
              <span className="text-sm font-bold text-green-600">{data.expectedROI}% ({roiInfo.category})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">予算/実績:</span>
              <span className="text-sm font-medium text-gray-900">¥{data.budget}M / ¥{data.actualSpent}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">市場インパクト:</span>
              <span className="text-sm font-medium text-blue-600">{data.marketImpact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">完了予定:</span>
              <span className="text-sm font-medium text-gray-900">{data.timeframe}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24">
      <main className="p-8">
        <div className="max-w-none mx-auto">
          {/* タブナビゲーション */}
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

              {/* プロジェクト別戦略整合性 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  プロジェクト別戦略整合性分析
                </h3>
                <div className="space-y-4">
                  {pgmoMetrics.strategicAlignment.projects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.risk === 'low' ? 'bg-green-100 text-green-800' :
                          project.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.risk === 'low' ? 'Low Risk' : project.risk === 'medium' ? 'Medium Risk' : 'High Risk'}
                        </div>
                      </div>
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

              {/* Strategic Initiatives */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  戦略的イニシアティブ
                </h3>
                <div className="space-y-4">
                  {strategicInitiatives.map((initiative, index) => (
                    <motion.div
                      key={initiative.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{initiative.name}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusColor(initiative.status)}`}>
                          {getStatusIcon(initiative.status)}
                          <span className="ml-1">
                            {initiative.status === 'on-track' ? '順調' :
                             initiative.status === 'accelerating' ? '加速中' : '要注意'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-600">
                          進捗: <span className="font-medium">{initiative.progress}%</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          完了予定: <span className="font-medium">{initiative.timeline}</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${initiative.progress}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ポートフォリオ戦略総括 */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  デジタル投資ポートフォリオ戦略総括
                </h3>
                
                <div className="prose prose-gray max-w-none">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100 mb-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">投資戦略の全体像</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>当社は総額¥4.35Bの戦略的デジタル投資により、¥12.1B（平均ROI 278%）の価値創出を目指している。</strong>
                      この投資ポートフォリオは、コアインフラ強化（41%）、プラットフォーム modernization（20%）、
                      イノベーション創出（39%）の3層構造で設計されており、段階的なデジタル変革を実現する。
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>AI・データ活用基盤は最高ROI 440%を誇る戦略的コア投資であり、</strong>
                      イノベーション指数95という突出した変革力により、競合他社に対する持続的優位性を構築する。
                      一方、クラウド移行PJはROI 320%かつリスク15%の最適バランスを実現し、
                      安定的な技術基盤として後続のイノベーション投資を支える重要な役割を担っている。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                      <h4 className="text-base font-semibold text-green-800 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        戦略的優位性の構築
                      </h4>
                      <p className="text-green-700 text-sm leading-relaxed">
                        <strong>我々はAI・データドリブン経営への転換により市場での差別化を実現し、</strong>
                        Very Highの市場インパクトを持つデータ活用基盤を通じて、
                        2025年Q3以降の本格的なビジネス変革を推進する。
                        この戦略により、従来の業務効率化から価値創造型経営への転換を図る。
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                      <h4 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        リスク最適化戦略
                      </h4>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        <strong>ポートフォリオ全体のリスクバランスを95%のスコアで維持しながら、</strong>
                        高ROI/高リスク投資（AI基盤）と安定投資（クラウド移行）を戦略的に組み合わせている。
                        この分散投資により、イノベーション追求と事業継続性を両立させる。
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="text-base font-semibold text-yellow-800 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      重要課題と対応方針
                    </h4>
                    <p className="text-yellow-700 text-sm leading-relaxed">
                      <strong>AI基盤の高リスク（35%）とモバイル開発の技術課題（リスク40%）については、</strong>
                      30日以内のCTO主導リスク軽減策と14日以内の技術選定見直しにより対処する。
                      これらの課題解決により、ポートフォリオ全体の投資効果を最大化し、
                      2025年度のデジタル変革目標達成を確実にする。
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategic Alerts */}
              <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  戦略的アラート
                </h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>• AI・データ活用基盤の予算超過リスク（15%増加の可能性）</p>
                  <p>• クラウド移行によるセキュリティ要件の再評価が必要</p>
                  <p>• 新基幹システムのテスト工程で2週間の遅延が発生</p>
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

          {/* ポートフォリオ管理タブ */}
          {activeTab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Portfolio Overview Chart */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                    戦略的ポートフォリオマップ
                  </h3>
                  <div className="text-sm text-gray-500">
                    リスクレベル vs イノベーション指数（プロットサイズ = ROI）
                  </div>
                </div>
                
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      data={portfolioProjects}
                      margin={{
                        top: 30,
                        right: 40,
                        bottom: 40,
                        left: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        type="number" 
                        dataKey="riskLevel" 
                        name="リスクレベル"
                        domain={[10, 45]}
                        label={{ value: 'リスクレベル (%)', position: 'insideBottom', offset: -10 }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="innovationIndex" 
                        name="イノベーション指数"
                        domain={[40, 100]}
                        label={{ value: 'イノベーション指数', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter name="プロジェクト" fill="#8884d8">
                        {portfolioProjects.map((entry, index) => {
                          const roiSize = getROISize(entry.expectedROI);
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              r={roiSize.size}
                            />
                          );
                        })}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                
                {/* ROI表示（静的） */}
                <div className="mt-4 grid grid-cols-5 gap-3 text-center">
                  {portfolioProjects.map((project) => {
                    const roiInfo = getROISize(project.expectedROI);
                    return (
                      <div key={project.id} className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-600 mb-1">{project.name.replace('PJ', '').replace('・', ' ')}</div>
                        <div className="text-sm font-bold text-green-600">{project.expectedROI}%</div>
                        <div className="text-xs text-gray-500">({roiInfo.category})</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* ROI凡例 */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">プロットサイズ分類（ROI基準）</h5>
                  <div className="flex items-center space-x-6 text-xs text-gray-600">
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-400 mr-2" style={{width: '12px', height: '12px'}}></div>
                      <span>最小 (200%未満)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-500 mr-2" style={{width: '14px', height: '14px'}}></div>
                      <span>小 (200-299%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-600 mr-2" style={{width: '18px', height: '18px'}}></div>
                      <span>中 (300-399%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-700 mr-2" style={{width: '24px', height: '24px'}}></div>
                      <span>大 (400%以上)</span>
                    </div>
                  </div>
                </div>

                {/* Chart Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {portfolioProjects.map((project) => (
                    <div key={project.id} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-sm text-gray-600">{project.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Summary Table */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                  プロジェクト予実サマリー
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">プロジェクト名</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">フェーズ</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900">予算 (M¥)</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900">実績 (M¥)</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900">効率性</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900">期待ROI</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-900">ステータス</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {portfolioProjects.map((project) => (
                        <motion.tr
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">{project.name}</td>
                          <td className="px-4 py-3 text-gray-600">{project.phase}</td>
                          <td className="px-4 py-3 text-right text-gray-900">¥{project.budget}</td>
                          <td className="px-4 py-3 text-right text-gray-900">¥{project.actualSpent}</td>
                          <td className="px-4 py-3 text-right text-gray-900">{Math.round((project.actualSpent / project.budget) * 100)}%</td>
                          <td className="px-4 py-3 text-right text-gray-900">{project.expectedROI}%</td>
                          <td className="px-4 py-3 text-center">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                              {getStatusIcon(project.status)}
                              <span className="ml-1">
                                {project.status === 'on-track' ? '順調' :
                                 project.status === 'accelerating' ? '加速中' : '要注意'}
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 戦略的示唆（5W1H分析） */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  戦略的示唆・5W1H分析
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(strategicInsights).map(([key, insight], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100"
                    >
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-7 h-7 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center mr-3">
                          {key.charAt(0).toUpperCase()}
                        </div>
                        {insight.title}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {insight.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ネクストアクション */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-600" />
                  戦略的ネクストアクション
                </h3>
                
                <div className="space-y-4">
                  {nextActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className={`p-5 rounded-lg border-l-4 ${
                        action.priority === 'Critical' ? 'bg-red-50 border-red-500' :
                        action.priority === 'High' ? 'bg-orange-50 border-orange-500' :
                        'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`px-2 py-1 rounded-full text-xs font-bold mr-3 ${
                            action.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                            action.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {action.priority}
                          </div>
                          <h4 className="font-semibold text-gray-900">{action.action}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{action.deadline}</div>
                          <div className="text-xs text-gray-600">{action.owner}</div>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-60 p-3 rounded">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">期待効果:</span> {action.impact}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PfMPage;