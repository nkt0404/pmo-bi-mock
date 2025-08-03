import type { 
  Project, 
  WeeklyProgress, 
  QualityKPI, 
  CrossProjectCoordination, 
  TeamCoordination 
} from '../types/index.js';

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: '新基幹システム刷新PJ',
    status: 'on-track',
    progress: 75,
    phase: '結合テスト',
    manager: '田中PM'
  },
  {
    id: 'proj-002', 
    name: 'クラウド移行PJ',
    status: 'at-risk',
    progress: 60,
    phase: '本格移行',
    manager: '佐藤PM'
  },
  {
    id: 'proj-003',
    name: 'データ分析基盤構築PJ',
    status: 'on-track',
    progress: 85,
    phase: '性能テスト',
    manager: '鈴木PM'
  },
  {
    id: 'proj-004',
    name: 'セキュリティ強化PJ',
    status: 'delayed',
    progress: 45,
    phase: '要件定義',
    manager: '山田PM'
  },
  {
    id: 'proj-005',
    name: 'モバイルアプリ開発PJ',
    status: 'on-track',
    progress: 68,
    phase: '詳細設計',
    manager: '高橋PM'
  }
];

export const weeklyProgress: WeeklyProgress[] = [
  {
    projectId: 'proj-001',
    weekEnding: '2024-01-12',
    progress: 75,
    risks: [
      {
        id: 'risk-001',
        description: 'パフォーマンステストで性能基準未達の可能性',
        impact: 'medium',
        probability: 'medium',
        mitigation: 'SQLチューニング専門チーム投入済み',
        status: 'mitigated'
      }
    ],
    issues: [
      {
        id: 'issue-001',
        description: 'APIレスポンス時間が目標値を20%超過',
        priority: 'high',
        assignee: '開発チームリーダー',
        dueDate: '2025-08-05',
        status: 'in-progress',
        countermeasure: 'キャッシュ戦略の見直しとDB最適化を実施中'
      }
    ],
    decisions: [
      {
        id: 'dec-001',
        question: '性能基準未達の状況で本格稼働をどのように進めるべきか？',
        options: [
          {
            id: 'opt-001-1',
            label: '予定通り稼働開始',
            description: '予定通りリリースして運用で改善',
            pros: ['スケジュール遵守', 'ビジネス影響最小'],
            cons: ['性能リスク継続', 'ユーザー体験悪化'],
            risk: 'high'
          },
          {
            id: 'opt-001-2',
            label: '1週間延期して性能改善',
            description: '性能問題解決後にリリース',
            pros: ['品質確保', 'リスク軽減'],
            cons: ['スケジュール遅延', 'リソース追加投入'],
            risk: 'medium'
          },
          {
            id: 'opt-001-3',
            label: '段階的リリース',
            description: '一部機能のみ先行リリース',
            pros: ['リスク分散', '部分的価値提供'],
            cons: ['複雑な運用', '追加開発工数'],
            risk: 'medium'
          }
        ],
        selectedOption: 'opt-001-2',
        decisionDate: '2024-01-10',
        impact: 'スケジュール影響あるが品質確保を優先',
        responsible: 'ステアリングコミッティ',
        details: '性能テストでAPIレスポンス時間が目標値を20%超過している状況を受け、ステアリングコミッティで検討した結果、品質確保を最優先とし1週間の延期を決定。SQLチューニング専門チームの投入とキャッシュ戦略の見直しを並行実施。'
      }
    ]
  },
  {
    projectId: 'proj-002',
    weekEnding: '2024-01-12',
    progress: 60,
    risks: [
      {
        id: 'risk-002',
        description: 'クラウドコスト予算超過リスク',
        impact: 'high',
        probability: 'high',
        mitigation: 'コスト最適化コンサル導入検討',
        status: 'open'
      }
    ],
    issues: [
      {
        id: 'issue-002',
        description: 'レガシーシステムとの連携で予期しないエラー',
        priority: 'critical',
        assignee: 'アーキテクト',
        dueDate: '2025-08-07',
        status: 'open',
        countermeasure: 'メーカーサポートと連携して原因調査中'
      }
    ],
    decisions: [
      {
        id: 'dec-002',
        question: 'クラウドコスト予算超過リスクに対してどのような移行戦略を採るべきか？',
        options: [
          {
            id: 'opt-002-1',
            label: '予定通り全システム移行',
            description: '当初計画通り全システムを移行',
            pros: ['計画通りの完了', '一括管理'],
            cons: ['高コストリスク', '予算超過確実'],
            risk: 'high'
          },
          {
            id: 'opt-002-2',
            label: '優先順位変更',
            description: 'リスクの高いシステムを後回しに',
            pros: ['コストリスク軽減', '段階的移行'],
            cons: ['レガシー残存', '運用複雑化'],
            risk: 'medium'
          },
          {
            id: 'opt-002-3',
            label: 'ハイブリッド運用継続',
            description: '一部システムのオンプレミス継続',
            pros: ['コスト最適化', 'リスク分散'],
            cons: ['運用複雑性', '技術負債継続'],
            risk: 'low'
          }
        ],
        selectedOption: 'opt-002-2',
        decisionDate: '2024-01-11',
        impact: 'リスクの高いシステムを後回しにしてリスク軽減',
        responsible: 'PMO',
        details: 'クラウド移行のコスト分析結果、予算を30%超過する見込みが判明。PMOにて移行優先順位を見直し、ビジネス影響度の高いシステムから段階的に移行する戦略に変更。コスト最適化コンサルタントの導入も並行検討。'
      }
    ]
  },
  {
    projectId: 'proj-005',
    weekEnding: '2024-01-12',
    progress: 68,
    risks: [
      {
        id: 'risk-005-1',
        description: 'iOS/Android両対応による開発工数増加',
        impact: 'high',
        probability: 'medium',
        mitigation: 'クロスプラットフォーム開発ツール（React Native）採用検討',
        status: 'open'
      },
      {
        id: 'risk-005-2',
        description: 'ネイティブ機能要件の技術検証不足',
        impact: 'medium',
        probability: 'low',
        mitigation: 'プロトタイプ開発によるPoC実施',
        status: 'open'
      }
    ],
    issues: [
      {
        id: 'issue-005-1',
        description: 'デザインシステム統一の遅延：Web版とモバイル版でのUIコンポーネント統一が予定より遅れている',
        priority: 'high',
        status: 'open',
        assignee: 'UIデザインチーム',
        dueDate: '2025-08-10',
        countermeasure: 'デザインシステムライブラリの段階的導入とクロスプラットフォーム対応'
      }
    ],
    decisions: [
      {
        id: 'dec-005',
        question: 'モバイルアプリの開発手法をどのように選択すべきか？',
        options: [
          {
            id: 'opt-005-1',
            label: 'ネイティブ開発',
            description: 'iOS/Android各々でネイティブ開発',
            pros: ['最高のパフォーマンス', 'プラットフォーム機能活用'],
            cons: ['開発工数2倍', '保守コスト高'],
            risk: 'high'
          },
          {
            id: 'opt-005-2',
            label: 'クロスプラットフォーム',
            description: 'React Native/Flutterを使用',
            pros: ['開発効率向上', 'コード共通化'],
            cons: ['一部制限あり', '学習コスト'],
            risk: 'medium'
          },
          {
            id: 'opt-005-3',
            label: 'ハイブリッド開発',
            description: 'WebViewベースのハイブリッドアプリ',
            pros: ['開発コスト最小', 'Web技術活用'],
            cons: ['パフォーマンス劣化', 'UX制限'],
            risk: 'low'
          }
        ],
        selectedOption: 'opt-005-2',
        decisionDate: '2024-01-10',
        impact: 'React Native採用により開発効率とコード品質の両立',
        responsible: 'PMO・技術統括',
        details: 'ユーザー体験とパフォーマンス要求を満たしつつ、開発・保守コストを最適化するためReact Nativeを採用。ネイティブ機能が必要な部分のみネイティブモジュール開発で対応する方針に決定。'
      }
    ]
  }
];

export const qualityKPIs: QualityKPI[] = [
  {
    projectId: 'proj-001',
    phase: '結合テスト',
    metrics: {
      defectRate: 0.12,
      testCoverage: 92,
      codeQuality: 8.5,
      performanceScore: 78
    },
    target: {
      defectRate: 0.10,
      testCoverage: 90,
      codeQuality: 8.0,
      performanceScore: 85
    }
  },
  {
    projectId: 'proj-002',
    phase: '本格移行',
    metrics: {
      defectRate: 0.18,
      testCoverage: 85,
      codeQuality: 7.8,
      performanceScore: 82
    },
    target: {
      defectRate: 0.15,
      testCoverage: 88,
      codeQuality: 8.0,
      performanceScore: 80
    }
  },
  {
    projectId: 'proj-003',
    phase: '性能テスト',
    metrics: {
      defectRate: 0.08,
      testCoverage: 95,
      codeQuality: 9.1,
      performanceScore: 91
    },
    target: {
      defectRate: 0.10,
      testCoverage: 90,
      codeQuality: 8.5,
      performanceScore: 85
    }
  },
  {
    projectId: 'proj-004',
    phase: '要件定義',
    metrics: {
      defectRate: 0.22,
      testCoverage: 78,
      codeQuality: 7.5,
      performanceScore: 75
    },
    target: {
      defectRate: 0.15,
      testCoverage: 85,
      codeQuality: 8.0,
      performanceScore: 80
    }
  },
  {
    projectId: 'proj-005',
    phase: '詳細設計',
    metrics: {
      defectRate: 0.15,
      testCoverage: 94,
      codeQuality: 8.8,
      performanceScore: 87
    },
    target: {
      defectRate: 0.12,
      testCoverage: 90,
      codeQuality: 8.5,
      performanceScore: 85
    }
  }
];

export const crossProjectCoordinations: CrossProjectCoordination[] = [
  {
    id: 'coord-001',
    fromProject: '新基幹システム刷新PJ',
    toProject: 'データ分析基盤構築PJ',
    topic: 'データ連携API仕様調整',
    priority: 'high',
    status: 'in-discussion',
    dueDate: '2025-08-08',
    description: 'リアルタイムデータ連携のためのAPI仕様とデータフォーマット調整'
  },
  {
    id: 'coord-002',
    fromProject: 'クラウド移行PJ',
    toProject: 'セキュリティ強化PJ',
    topic: 'クラウドセキュリティポリシー統合',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-08-10',
    description: 'クラウド環境におけるセキュリティポリシーの統一と適用'
  },
  {
    id: 'coord-003',
    fromProject: 'データ分析基盤構築PJ',
    toProject: 'セキュリティ強化PJ',
    topic: 'データ暗号化方式統一',
    priority: 'high',
    status: 'resolved',
    dueDate: '2025-08-02',
    description: 'データ保存・転送時の暗号化方式を統一'
  },
  {
    id: 'coord-004',
    fromProject: 'モバイルアプリ開発PJ',
    toProject: '新基幹システム刷新PJ',
    topic: 'モバイルAPI連携仕様',
    priority: 'high',
    status: 'in-discussion',
    dueDate: '2025-08-07',
    description: 'モバイルアプリから基幹システムへのAPI連携仕様とレスポンス形式の調整'
  }
];

export const teamCoordinations: TeamCoordination[] = [
  {
    id: 'team-001',
    projectId: 'proj-001',
    fromTeam: 'app',
    toTeam: 'infra',
    topic: '本番環境リソース調整',
    priority: 'high',
    status: 'in-discussion',
    dueDate: '2025-08-06',
    description: 'ピーク時負荷に対応するためのインフラリソース増強計画'
  },
  {
    id: 'team-002',
    projectId: 'proj-002',
    fromTeam: 'infra',
    toTeam: 'maintenance',
    topic: '運用監視項目定義',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-08-09',
    description: 'クラウド環境での監視項目とアラート閾値の定義'
  },
  {
    id: 'team-003',
    projectId: 'proj-001',
    fromTeam: 'common',
    toTeam: 'app',
    topic: '共通ライブラリバージョン統一',
    priority: 'medium',
    status: 'resolved',
    dueDate: '2025-08-04',
    description: '共通ライブラリのバージョン統一と移行計画'
  },
  {
    id: 'team-004',
    projectId: 'proj-003',
    fromTeam: 'app',
    toTeam: 'common',
    topic: 'データ処理共通モジュール',
    priority: 'high',
    status: 'in-discussion',
    dueDate: '2025-08-11',
    description: 'データ変換・加工処理の共通モジュール化'
  },
  {
    id: 'team-005',
    projectId: 'proj-005',
    fromTeam: 'app',
    toTeam: 'common',
    topic: 'デザインシステム統一',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-08-09',
    description: 'モバイルアプリとWebアプリのデザインシステム統一とコンポーネント共通化'
  },
  {
    id: 'team-006',
    projectId: 'proj-005',
    fromTeam: 'app',
    toTeam: 'common',
    topic: 'モバイルテスト自動化',
    priority: 'high',
    status: 'in-discussion',
    dueDate: '2025-08-05',
    description: 'React Nativeアプリのテスト自動化環境構築とテストケース作成'
  }
];