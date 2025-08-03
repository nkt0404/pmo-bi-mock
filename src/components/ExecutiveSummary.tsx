import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Target, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Zap
} from 'lucide-react';

const ExecutiveSummary: React.FC = () => {
  // CIO視点のサマリーデータ
  const executiveMetrics = [
    {
      title: 'デジタル投資ROI',
      value: '285%',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: '年間予想収益'
    },
    {
      title: '事業価値創出',
      value: '¥8.0B',
      change: '+¥1.2B',
      trend: 'up',
      icon: TrendingUp,
      color: 'blue',
      description: '累積ビジネス価値'
    },
    {
      title: 'リスク管理指数',
      value: '95%',
      change: '+3%',
      trend: 'up',
      icon: Shield,
      color: 'green',
      description: 'コンプライアンス達成'
    },
    {
      title: 'イノベーション指数',
      value: '87%',
      change: '-2%',
      trend: 'down',
      icon: Zap,
      color: 'orange',
      description: 'DX推進進捗'
    }
  ];

  const strategicInitiatives = [
    {
      name: 'クラウドファースト戦略',
      progress: 78,
      status: 'on-track',
      investment: '¥850M',
      expectedROI: '320%',
      timeline: '2024Q4'
    },
    {
      name: 'AI・データ活用基盤',
      progress: 65,
      status: 'accelerating',
      investment: '¥1.2B',
      expectedROI: '440%',
      timeline: '2025Q2'
    },
    {
      name: 'セキュリティ強化',
      progress: 45,
      status: 'attention-required',
      investment: '¥420M',
      expectedROI: '180%',
      timeline: '2024Q3'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'accelerating': return 'text-blue-600 bg-blue-100';
      case 'attention-required': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4" />;
      case 'accelerating': return <TrendingUp className="w-4 h-4" />;
      case 'attention-required': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <h2 className="text-lg font-semibold text-white text-center flex items-center justify-center">
          <Building className="w-6 h-6 mr-2" />
          エグゼクティブサマリー
        </h2>
        <p className="text-blue-100 text-sm text-center mt-1">Strategic Portfolio Overview</p>
      </motion.div>
      
      <div className="flex-1 p-8 overflow-y-auto space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-6">
          {executiveMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-5 h-5 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                  <div className={`flex items-center text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? 
                      <TrendingUp className="w-3 h-3 mr-1" /> : 
                      <TrendingDown className="w-3 h-3 mr-1" />
                    }
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Strategic Initiatives */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-4 h-4 mr-2 text-purple-600" />
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
                  <h4 className="font-medium text-gray-900 text-sm">{initiative.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs flex items-center ${getStatusColor(initiative.status)}`}>
                    {getStatusIcon(initiative.status)}
                    <span className="ml-1">
                      {initiative.status === 'on-track' ? '順調' :
                       initiative.status === 'accelerating' ? '加速中' : '要注意'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-600">
                    進捗: <span className="font-medium">{initiative.progress}%</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    完了予定: <span className="font-medium">{initiative.timeline}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${initiative.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      initiative.status === 'on-track' ? 'bg-green-500' :
                      initiative.status === 'accelerating' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">投資額:</span>
                    <span className="font-medium ml-1">{initiative.investment}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">期待ROI:</span>
                    <span className="font-medium ml-1">{initiative.expectedROI}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategic Alerts */}
        <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            戦略的アラート
          </h4>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>• セキュリティ強化PJの進捗遅延により、コンプライアンス目標に影響リスク</div>
            <div>• クラウド移行コスト超過により、ROI目標の見直しが必要</div>
            <div>• AI基盤投資の追加承認により、予算配分の最適化を検討</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;