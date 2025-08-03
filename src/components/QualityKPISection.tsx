import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Eye,
  Calendar,
  Award,
  PieChart,
  Search,
  Brain,
  GitBranch,
  Activity,
  Zap
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  Pie, 
  ResponsiveContainer, 
  Tooltip, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from 'recharts';
import { projects, qualityKPIs } from '../data/mockData.js';
import Modal from './Modal.js';

const QualityKPISection: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const getKPIData = () => {
    return qualityKPIs.map(kpi => {
      const project = projects.find(p => p.id === kpi.projectId);
      return {
        ...kpi,
        projectName: project?.name.replace('PJ', '') || kpi.projectId,
        phase: kpi.phase,
        defectRate: kpi.metrics.defectRate,
        testCoverage: kpi.metrics.testCoverage,
        codeQuality: kpi.metrics.codeQuality,
        performance: kpi.metrics.performanceScore,
        defectTarget: kpi.target.defectRate,
        testTarget: kpi.target.testCoverage,
        qualityTarget: kpi.target.codeQuality,
        performanceTarget: kpi.target.performanceScore
      };
    });
  };

  const getKPIStatus = (actual: number, target: number, reverse = false) => {
    const ratio = reverse ? target / actual : actual / target;
    if (ratio >= 1.0) return 'success';
    if (ratio >= 0.9) return 'warning';
    return 'danger';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'danger': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTrendIcon = (actual: number, target: number, reverse = false) => {
    const ratio = reverse ? target / actual : actual / target;
    if (ratio >= 1.0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const data = getKPIData();

  // KPI達成状況サマリデータの作成
  const getKPISummary = () => {
    const kpiStats = data.reduce((acc, item) => {
      // 各KPIの達成状況をカウント
      const kpis = [
        { name: '指摘/ケース/バグ密度', status: getKPIStatus(item.defectRate, item.defectTarget, true) },
        { name: 'テスト網羅率', status: getKPIStatus(item.testCoverage, item.testTarget) },
        { name: 'コード品質', status: getKPIStatus(item.codeQuality, item.qualityTarget) },
        { name: 'パフォーマンス', status: getKPIStatus(item.performance, item.performanceTarget) }
      ];

      kpis.forEach(kpi => {
        acc[kpi.status] = (acc[kpi.status] || 0) + 1;
      });

      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(kpiStats).reduce((sum, count) => sum + count, 0);

    return [
      { 
        name: '達成', 
        value: kpiStats['success'] || 0, 
        color: '#10b981',
        percentage: Math.round(((kpiStats['success'] || 0) / total) * 100)
      },
      { 
        name: '警告', 
        value: kpiStats['warning'] || 0, 
        color: '#f59e0b',
        percentage: Math.round(((kpiStats['warning'] || 0) / total) * 100)
      },
      { 
        name: '未達成', 
        value: kpiStats['danger'] || 0, 
        color: '#ef4444',
        percentage: Math.round(((kpiStats['danger'] || 0) / total) * 100)
      }
    ].filter(item => item.value > 0);
  };

  const kpiSummaryData = getKPISummary();

  // 根本原因分析データの作成
  const getRootCauseAnalysis = (projectId: string) => {
    const rootCauses: Record<string, Array<{ category: string; impact: string; causes: string[] }>> = {
      'proj-001': [
        { category: '人的要因', impact: '40%', causes: ['スキル不足', 'レビュー品質のばらつき', '新人比率高'] },
        { category: 'プロセス要因', impact: '35%', causes: ['要件定義不備', 'テスト工程短縮', 'CI/CD未整備'] },
        { category: '技術要因', impact: '25%', causes: ['レガシーコード', 'テストツール不足', 'ドキュメント不備'] }
      ],
      'proj-002': [
        { category: '技術要因', impact: '45%', causes: ['クラウド環境差異', 'データ移行複雑性', 'API仕様変更'] },
        { category: 'プロセス要因', impact: '30%', causes: ['並行開発リスク', 'テスト環境不足', '段階移行計画不備'] },
        { category: '人的要因', impact: '25%', causes: ['クラウド知識不足', 'ベンダー調整遅延', 'チーム間連携不足'] }
      ],
      'proj-003': [
        { category: 'プロセス要因', impact: '50%', causes: ['データ品質要件厳格化', '性能テスト基準変更', 'セキュリティ要件追加'] },
        { category: '技術要因', impact: '30%', causes: ['ビッグデータ処理最適化', 'ML学習データ品質', 'リアルタイム処理要件'] },
        { category: '人的要因', impact: '20%', causes: ['データサイエンティスト不足', 'ドメイン知識習得', 'ステークホルダー調整'] }
      ],
      'proj-004': [
        { category: '人的要因', impact: '55%', causes: ['セキュリティ専門家不足', '要件理解不足', 'ベンダー選定難航'] },
        { category: 'プロセス要因', impact: '25%', causes: ['セキュリティ監査基準変更', '承認プロセス複雑化', 'コンプライアンス対応'] },
        { category: '技術要因', impact: '20%', causes: ['多要素認証複雑性', 'レガシーシステム制約', 'セキュリティツール統合'] }
      ],
      'proj-005': [
        { category: '技術要因', impact: '40%', causes: ['React Native学習コスト', 'ネイティブ機能制約', 'デバイス対応差異'] },
        { category: 'プロセス要因', impact: '35%', causes: ['アプリストア審査対応', 'デザインシステム統一', 'テスト自動化遅延'] },
        { category: '人的要因', impact: '25%', causes: ['モバイル開発経験不足', 'UX/UI設計スキル', 'デバイステスト要員'] }
      ]
    };
    return rootCauses[projectId] || [];
  };

  // 予測分析・相関性データの作成
  const getPredictionAnalysis = (_projectId?: string) => {
    // テスト消化曲線データ
    const testProgressData = [
      { week: '1週', ideal: 10, actual: 8, predicted: 8 },
      { week: '2週', ideal: 25, actual: 18, predicted: 18 },
      { week: '3週', ideal: 45, actual: 32, predicted: 32 },
      { week: '4週', ideal: 70, actual: 50, predicted: 50 },
      { week: '5週', ideal: 85, actual: 65, predicted: 68 },
      { week: '6週', ideal: 95, actual: null, predicted: 82 },
      { week: '7週', ideal: 100, actual: null, predicted: 95 },
      { week: '8週', ideal: 100, actual: null, predicted: 100 }
    ];

    // バグ発生曲線データ（週ごとの新規バグ発見数 - テスト進行とともに減少）
    const bugDiscoveryData = [
      { week: '1週', ideal: 25, actual: 30, predicted: 30 },
      { week: '2週', ideal: 20, actual: 28, predicted: 28 },
      { week: '3週', ideal: 15, actual: 22, predicted: 22 },
      { week: '4週', ideal: 12, actual: 18, predicted: 18 },
      { week: '5週', ideal: 8, actual: 15, predicted: 14 },
      { week: '6週', ideal: 5, actual: null, predicted: 10 },
      { week: '7週', ideal: 3, actual: null, predicted: 6 },
      { week: '8週', ideal: 2, actual: null, predicted: 3 }
    ];

    // 相関性分析データ
    const correlationData = [
      { factor: 'チーム経験値', correlation: 0.78, impact: 'high' },
      { factor: 'コードレビュー時間', correlation: 0.65, impact: 'high' },
      { factor: 'テスト網羅率', correlation: -0.72, impact: 'high' },
      { factor: 'リリース頻度', correlation: 0.45, impact: 'medium' },
      { factor: 'プロジェクト規模', correlation: 0.35, impact: 'medium' },
      { factor: '外部依存度', correlation: 0.28, impact: 'low' }
    ];

    // 乖離分析とリスク評価
    const divergenceAnalysis = {
      testProgress: {
        currentWeek: 5,
        idealProgress: 85,
        actualProgress: 65,
        divergence: -20,
        risk: 'high',
        rootCauses: [
          'テスト環境セットアップ遅延',
          'テストケース作成工数過小見積もり',
          '要件変更によるテスト項目追加'
        ],
        solutions: [
          'テスト環境の自動化推進',
          'テスト設計レビューの強化',
          '要件凍結プロセスの徹底'
        ]
      },
      bugDiscovery: {
        currentWeek: 5,
        idealWeeklyBugs: 8,
        actualWeeklyBugs: 15,
        divergence: +7,
        risk: 'high',
        rootCauses: [
          'コードレビュー品質低下',
          '単体テスト網羅率不足',
          '複雑な結合処理でのデグレード'
        ],
        solutions: [
          'ペアプログラミング導入',
          'テストカバレッジ向上義務化',
          '段階的結合テスト計画見直し'
        ]
      },
      overallRisk: {
        level: 'high',
        description: 'テスト進捗遅延と週ごとバグ発見数増加により、品質とスケジュールの両面でリスクが高い状況',
        impactForecast: 'リリース1-2週間遅延の可能性、品質課題による後続フェーズへの影響',
        actionRequired: 'immediate'
      }
    };

    return { testProgressData, bugDiscoveryData, correlationData, divergenceAnalysis };
  };

  const KPIMetric = ({ 
    label, 
    actual, 
    target, 
    reverse = false, 
    unit = '',
    delay = 0 
  }: {
    label: string;
    actual: number;
    target: number;
    reverse?: boolean;
    unit?: string;
    delay?: number;
  }) => {
    const status = getKPIStatus(actual, target, reverse);
    const percentage = reverse 
      ? Math.min((target / actual) * 100, 100)
      : (actual / target) * 100;

    return (
      <motion.div
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={hasAnimated ? { duration: 0 } : { delay }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status)}
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </div>
          <div className="flex items-center space-x-1">
            {getTrendIcon(actual, target, reverse)}
            <span className="text-xs text-gray-600">
              {actual}{unit} / {target}{unit}
            </span>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={hasAnimated ? { width: `${percentage}%` } : { width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={hasAnimated ? { duration: 0 } : { duration: 1, delay: delay + 0.2 }}
              className={`h-2 rounded-full ${getStatusColor(status)}`}
            />
          </div>
          <motion.div
            initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={hasAnimated ? { duration: 0 } : { delay: delay + 0.5 }}
            className="absolute right-0 top-3 text-xs text-gray-500"
          >
            {percentage.toFixed(1)}%
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="card h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onAnimationComplete={() => setHasAnimated(true)}
        className="p-6 border-b border-blue-100 bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-center flex items-center justify-center">
          <BarChart3 className="w-6 h-6 mr-2 text-purple-700" />
          品質・デリバリーKPI
        </h2>
      </motion.div>

      {/* KPI達成状況サマリ円グラフ */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-4 border-b border-gray-200 bg-gray-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <PieChart className="w-4 h-4 mr-2 text-purple-600" />
              全プロジェクトKPI達成状況サマリ
            </h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {kpiSummaryData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-lg font-bold" style={{ color: item.color }}>
                    {item.value}項目
                  </div>
                  <div className="text-gray-500">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-32 h-32 ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={kpiSummaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={300}
                >
                  {kpiSummaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}項目`, name]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.div 
                key={item.projectId}
                initial={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={hasAnimated ? { duration: 0 } : { delay: index * 0.1 }}
                className="card bg-white border-blue-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedKPI(item)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="p-4">
                  {/* プロジェクトヘッダー */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-lightPurple-600 mr-2" />
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.projectName}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.phase}
                    </div>
                    <motion.div 
                      className="mt-2 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Eye className="w-4 h-4 text-lightPurple-500 mr-1" />
                      <span className="text-xs text-lightPurple-600 font-medium">詳細を見る</span>
                    </motion.div>
                  </div>

                  {/* KPI指標 */}
                  <div className="space-y-4">
                    <KPIMetric
                      label="指摘/ケース/バグ密度"
                      actual={item.defectRate}
                      target={item.defectTarget}
                      reverse={true}
                      unit="%"
                      delay={index * 0.1}
                    />
                    
                    <KPIMetric
                      label="テスト網羅率"
                      actual={item.testCoverage}
                      target={item.testTarget}
                      unit="%"
                      delay={index * 0.1 + 0.1}
                    />
                    
                    <KPIMetric
                      label="コード品質"
                      actual={item.codeQuality}
                      target={item.qualityTarget}
                      delay={index * 0.1 + 0.2}
                    />
                    
                    <KPIMetric
                      label="パフォーマンス"
                      actual={item.performance}
                      target={item.performanceTarget}
                      delay={index * 0.1 + 0.3}
                    />
                  </div>

                  {/* 総合スコア */}
                  <motion.div 
                    initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={hasAnimated ? { duration: 0 } : { delay: index * 0.1 + 0.5 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">総合評価</span>
                      <div className="flex items-center space-x-2">
                        {/* 簡易総合スコア計算 */}
                        {(() => {
                          const scores = [
                            getKPIStatus(item.defectRate, item.defectTarget, true),
                            getKPIStatus(item.testCoverage, item.testTarget),
                            getKPIStatus(item.codeQuality, item.qualityTarget),
                            getKPIStatus(item.performance, item.performanceTarget)
                          ];
                          const successCount = scores.filter(s => s === 'success').length;
                          const overallStatus = successCount >= 3 ? 'success' : successCount >= 2 ? 'warning' : 'danger';
                          
                          return (
                            <>
                              {getStatusIcon(overallStatus)}
                              <span className={`text-sm font-medium ${
                                overallStatus === 'success' ? 'text-green-600' :
                                overallStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {successCount}/4 達成
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* KPI詳細モーダル */}
      {selectedKPI && (
        <Modal 
          isOpen={!!selectedKPI} 
          onClose={() => setSelectedKPI(null)} 
          title={`${selectedKPI.projectName} - 品質KPI詳細`}
        >
          <div className="space-y-6">
            {/* プロジェクト概要 */}
            <div className="bg-white p-4 rounded-lg border border-lightPurple-200">
              <h3 className="font-medium text-lightPurple-900 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                プロジェクト概要
              </h3>
              <div className="text-sm text-lightPurple-800">
                <p><span className="font-medium">フェーズ:</span> {selectedKPI.phase}</p>
                <p><span className="font-medium">プロジェクト:</span> {selectedKPI.projectName}</p>
                <p><span className="font-medium">管理者:</span> {projects.find(p => p.id === selectedKPI.projectId)?.manager || '未設定'}</p>
                <p><span className="font-medium">進捗状況:</span> {projects.find(p => p.id === selectedKPI.projectId)?.progress || 0}%完了</p>
              </div>
            </div>

            {/* 詳細KPI */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  label: '指摘/ケース/バグ密度', 
                  actual: selectedKPI.defectRate, 
                  target: selectedKPI.defectTarget, 
                  unit: '%', 
                  reverse: true,
                  description: 'コードレビューとテスト工程で発見された指摘事項、ケース、バグの密度'
                },
                { 
                  label: 'テスト網羅率', 
                  actual: selectedKPI.testCoverage, 
                  target: selectedKPI.testTarget, 
                  unit: '%',
                  description: 'テストケースのコードカバレッジ'
                },
                { 
                  label: 'コード品質', 
                  actual: selectedKPI.codeQuality, 
                  target: selectedKPI.qualityTarget, 
                  unit: '',
                  description: '静的解析による品質スコア（10点満点）'
                },
                { 
                  label: 'パフォーマンス', 
                  actual: selectedKPI.performance, 
                  target: selectedKPI.performanceTarget, 
                  unit: '',
                  description: 'システム性能スコア（100点満点）'
                }
              ].map((metric, index) => {
                const status = getKPIStatus(metric.actual, metric.target, metric.reverse);
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg border border-blue-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        {getStatusIcon(status)}
                        <span className="ml-2">{metric.label}</span>
                      </h4>
                      {getTrendIcon(metric.actual, metric.target, metric.reverse)}
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{metric.description}</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>実績: <span className="font-medium">{metric.actual}{metric.unit}</span></span>
                      <span>目標: <span className="font-medium">{metric.target}{metric.unit}</span></span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getStatusColor(status)}`}
                        style={{ 
                          width: `${metric.reverse 
                            ? Math.min((metric.target / metric.actual) * 100, 100)
                            : (metric.actual / metric.target) * 100
                          }%` 
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 改善提案とアクションプラン */}
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-blue-700 mb-3">💡 改善提案とアクションプラン</h3>
              <div className="space-y-3">
                <div className="text-sm text-blue-600">
                  <h4 className="font-medium mb-1">指摘/ケース/バグ密度改善:</h4>
                  <p>• コードレビュープロセスの強化（レビュアー2名体制）</p>
                  <p>• 静的解析ツールの導入とCI/CD統合</p>
                  <p>• 単体テスト作成義務化（カバレッジ80%以上）</p>
                </div>
                <div className="text-sm text-blue-600">
                  <h4 className="font-medium mb-1">テスト網羅率向上:</h4>
                  <p>• 自動テストケースの段階的拡充計画</p>
                  <p>• テストファーストアプローチの導入</p>
                  <p>• 結合テスト自動化の推進</p>
                </div>
                <div className="text-sm text-blue-600">
                  <h4 className="font-medium mb-1">コード品質・パフォーマンス改善:</h4>
                  <p>• 月次リファクタリングセッション実施</p>
                  <p>• プロファイリングツールの定期活用</p>
                  <p>• 技術債務管理表の作成・運用</p>
                </div>
              </div>
            </div>

            {/* 根本原因分析 */}
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h3 className="font-medium text-orange-700 mb-3 flex items-center">
                <Search className="w-4 h-4 mr-2" /> 
                🔍 根本原因分析
              </h3>
              {getRootCauseAnalysis(selectedKPI.projectId).map((analysis: { category: string; impact: string; causes: string[] }, index: number) => (
                <motion.div
                  key={analysis.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 flex items-center">
                      <GitBranch className="w-3 h-3 mr-2 text-orange-500" />
                      {analysis.category}
                    </h4>
                    <span className="text-sm font-bold text-orange-600">影響度: {analysis.impact}</span>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="grid grid-cols-1 gap-1">
                      {analysis.causes.map((cause: string, causeIndex: number) => (
                        <div key={causeIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-1 h-1 bg-orange-400 rounded-full mr-2" />
                          {cause}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* テスト品質曲線・乖離分析 */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-700 mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2" /> 
                📊 テスト品質曲線・乖離分析
              </h3>
              
              {(() => {
                const { testProgressData, bugDiscoveryData, correlationData, divergenceAnalysis } = getPredictionAnalysis(selectedKPI.projectId);
                
                return (
                  <div className="space-y-4">
                    {/* 乖離リスクサマリ */}
                    <div className={`p-3 rounded-lg ${
                      divergenceAnalysis.overallRisk.level === 'critical' ? 'bg-red-50 border border-red-200' :
                      divergenceAnalysis.overallRisk.level === 'high' ? 'bg-orange-50 border border-orange-200' :
                      'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium flex items-center ${
                          divergenceAnalysis.overallRisk.level === 'critical' ? 'text-red-700' :
                          divergenceAnalysis.overallRisk.level === 'high' ? 'text-orange-700' :
                          'text-yellow-700'
                        }`}>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          総合リスク評価
                        </h4>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          divergenceAnalysis.overallRisk.level === 'critical' ? 'bg-red-600 text-white' :
                          divergenceAnalysis.overallRisk.level === 'high' ? 'bg-orange-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {divergenceAnalysis.overallRisk.level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{divergenceAnalysis.overallRisk.description}</p>
                      <p className="text-xs text-gray-600">
                        <strong>予想影響:</strong> {divergenceAnalysis.overallRisk.impactForecast}
                      </p>
                    </div>

                    {/* テスト消化曲線 */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Activity className="w-3 h-3 mr-1" />
                        テスト消化曲線（理想 vs 実績）
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                          divergenceAnalysis.testProgress.risk === 'high' ? 'bg-red-100 text-red-700' :
                          divergenceAnalysis.testProgress.risk === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          乖離: {divergenceAnalysis.testProgress.divergence}%
                        </span>
                      </h4>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={testProgressData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="week" fontSize={10} />
                            <YAxis fontSize={10} domain={[0, 100]} />
                            <Line 
                              type="monotone" 
                              dataKey="ideal" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              strokeDasharray="3 3"
                              dot={{ fill: '#10b981', r: 2 }}
                              name="理想"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              dot={{ fill: '#3b82f6', r: 3 }}
                              name="実績"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="predicted" 
                              stroke="#8b5cf6" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ fill: '#8b5cf6', r: 2 }}
                              name="予測"
                            />
                            <Tooltip 
                              formatter={(value, name) => [`${value}%`, name]}
                              labelStyle={{ fontSize: '12px' }}
                              contentStyle={{ fontSize: '12px' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* バグ発生曲線 */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        週ごと新規バグ発見数（理想 vs 実績）
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                          divergenceAnalysis.bugDiscovery.risk === 'critical' ? 'bg-red-100 text-red-700' :
                          divergenceAnalysis.bugDiscovery.risk === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          今週乖離: +{divergenceAnalysis.bugDiscovery.divergence}件/週
                        </span>
                      </h4>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={bugDiscoveryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="week" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Line 
                              type="monotone" 
                              dataKey="ideal" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              strokeDasharray="3 3"
                              dot={{ fill: '#10b981', r: 2 }}
                              name="理想"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="#ef4444" 
                              strokeWidth={2}
                              dot={{ fill: '#ef4444', r: 3 }}
                              name="実績"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="predicted" 
                              stroke="#f59e0b" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ fill: '#f59e0b', r: 2 }}
                              name="予測"
                            />
                            <Tooltip 
                              formatter={(value, name) => [`${value}件`, name]}
                              labelStyle={{ fontSize: '12px' }}
                              contentStyle={{ fontSize: '12px' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 相関性分析 */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <GitBranch className="w-3 h-3 mr-1" />
                        隠れた相関性検知（過去プロジェクトデータより）
                      </h4>
                      <div className="space-y-2">
                        {correlationData.map((item) => (
                          <div key={item.factor} className="flex items-center justify-between text-xs">
                            <span className="flex items-center">
                              <div 
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  item.impact === 'high' ? 'bg-red-400' : 
                                  item.impact === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                                }`} 
                              />
                              {item.factor}
                            </span>
                            <div className="flex items-center">
                              <div className="w-16 h-1 bg-gray-200 rounded-full mr-2">
                                <div 
                                  className={`h-1 rounded-full ${
                                    Math.abs(item.correlation) > 0.6 ? 'bg-red-500' :
                                    Math.abs(item.correlation) > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.abs(item.correlation) * 100}%` }}
                                />
                              </div>
                              <span className="font-mono text-gray-600 w-8 text-right">
                                {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 乖離の根本原因と解決策 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* テスト進捗の課題と対策 */}
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <h5 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          テスト進捗遅延の対策
                        </h5>
                        <div className="mb-3">
                          <h6 className="text-xs font-medium text-blue-600 mb-1">根本原因:</h6>
                          {divergenceAnalysis.testProgress.rootCauses.map((cause, index) => (
                            <div key={index} className="text-xs text-blue-700 mb-1">• {cause}</div>
                          ))}
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-blue-600 mb-1">解決策:</h6>
                          {divergenceAnalysis.testProgress.solutions.map((solution, index) => (
                            <div key={index} className="text-xs text-blue-700 mb-1">→ {solution}</div>
                          ))}
                        </div>
                      </div>

                      {/* バグ発生の課題と対策 */}
                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                        <h5 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          バグ増加の対策
                        </h5>
                        <div className="mb-3">
                          <h6 className="text-xs font-medium text-red-600 mb-1">根本原因:</h6>
                          {divergenceAnalysis.bugDiscovery.rootCauses.map((cause, index) => (
                            <div key={index} className="text-xs text-red-700 mb-1">• {cause}</div>
                          ))}
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-red-600 mb-1">解決策:</h6>
                          {divergenceAnalysis.bugDiscovery.solutions.map((solution, index) => (
                            <div key={index} className="text-xs text-red-700 mb-1">→ {solution}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* AI分析（モック） */}
            <div className="bg-white p-4 rounded-lg border border-dashed border-blue-200">
              <h3 className="font-medium text-blue-700 mb-2 flex items-center"><BarChart3 className="w-4 h-4 mr-2" /> AI分析（MCPモック）</h3>
              <p className="text-sm text-gray-600 mb-3">自然言語で質問すると、MCPを用いて円グラフや折れ線グラフなど様々な分析結果を表示する予定です。（現在モック）</p>
              <div className="flex items-center space-x-2">
                <input type="text" placeholder="例: '今週のバグ密度を円グラフで見せて'" className="flex-1 px-2 py-1 border border-gray-300 rounded" disabled />
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded" disabled>解析</button>
              </div>
              <div className="mt-4 h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                グラフ表示エリア（モック）
              </div>
            </div>

          </div>
        </Modal>
      )}
    </div>
  );
};

export default QualityKPISection;