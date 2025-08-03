import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Calendar,
  Target,
  Eye,
  ChevronDown,
  ChevronUp,
  PieChart
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { projects, weeklyProgress } from '../data/mockData.js';
import DecisionModal from './DecisionModal.js';
import type { DecisionItem } from '../types/index.js';

const WeeklyProgressSection: React.FC = () => {
  const [selectedDecision, setSelectedDecision] = useState<DecisionItem | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'at-risk': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'delayed': return <Clock className="w-5 h-5 text-red-500" />;
      default: return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'on-track': return 'status-on-track';
      case 'at-risk': return 'status-at-risk';
      case 'delayed': return 'status-delayed';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return '順調';
      case 'at-risk': return 'リスク有';
      case 'delayed': return '遅延';
      default: return status;
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-500';
      case 'at-risk': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getRiskPriorityStyle = (level: string) => {
    switch (level) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskPriorityText = (level: string) => {
    switch (level) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return level;
    }
  };

  // プロジェクト状況サマリデータの作成
  const getProjectStatusSummary = () => {
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { 
        name: '順調', 
        value: statusCounts['on-track'] || 0, 
        color: '#10b981',
        percentage: Math.round(((statusCounts['on-track'] || 0) / projects.length) * 100)
      },
      { 
        name: 'リスク有', 
        value: statusCounts['at-risk'] || 0, 
        color: '#f59e0b',
        percentage: Math.round(((statusCounts['at-risk'] || 0) / projects.length) * 100)
      },
      { 
        name: '遅延', 
        value: statusCounts['delayed'] || 0, 
        color: '#ef4444',
        percentage: Math.round(((statusCounts['delayed'] || 0) / projects.length) * 100)
      }
    ].filter(item => item.value > 0);
  };

  const summaryData = getProjectStatusSummary();

  return (
    <div className="card h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-center flex items-center justify-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          プロジェクト進捗・意思決定
        </h2>
      </motion.div>

      {/* プロジェクト状況サマリ円グラフ */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-4 border-b border-gray-200 bg-gray-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <PieChart className="w-4 h-4 mr-2 text-blue-600" />
              全プロジェクト状況サマリ
            </h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {summaryData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-lg font-bold" style={{ color: item.color }}>
                    {item.value}件
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
                  data={summaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={300}
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}件`, name]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {projects.map((project, index) => {
              const progress = weeklyProgress.find(p => p.projectId === project.id);
              const isExpanded = expandedProjects.includes(project.id);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card bg-white border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4">
                    {/* プロジェクトヘッダー */}
                    <motion.div 
                      className="flex items-center justify-between mb-3 cursor-pointer"
                      onClick={() => toggleProject(project.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(project.status)}
                        <h3 className="font-medium text-gray-900 text-sm">
                          {project.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`status-badge ${getStatusStyle(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {project.progress}%
                          </span>
                        </div>
                        {isExpanded ? 
                          <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        }
                      </div>
                    </motion.div>
                    
                    {/* プログレスバー */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className={`h-3 rounded-full ${getProgressBarColor(project.status)}`}
                        />
                      </div>
                    </div>

                    {/* 基本情報 */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          フェーズ: {project.phase}
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          PM: {project.manager}
                        </div>
                      </div>
                    </div>

                    {/* 展開可能なコンテンツ */}
                    <AnimatePresence>
                      {isExpanded && progress && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 border-t border-gray-100 pt-4"
                        >
                          {/* リスク */}
                          {progress.risks.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                🚨 リスク ({progress.risks.length}件)
                              </h4>
                              <div className="space-y-3">
                                {progress.risks.map((risk, riskIndex) => (
                                  <motion.div 
                                    key={risk.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: riskIndex * 0.1 }}
                                    className="bg-red-50 border border-red-200 rounded-lg p-3 hover:bg-red-100 transition-colors"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <p className="text-sm text-gray-800 flex-1">{risk.description}</p>
                                      <span className={`status-badge ml-3 ${getRiskPriorityStyle(risk.impact)}`}>
                                        {getRiskPriorityText(risk.impact)}
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      <span className="font-medium">対策:</span> {risk.mitigation}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      状況: <span className="font-medium">{risk.status}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* 課題 */}
                          {progress.issues.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h4 className="text-sm font-medium text-yellow-700 mb-3 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                ⚠️ 課題 ({progress.issues.length}件)
                              </h4>
                              <div className="space-y-3">
                                {progress.issues.map((issue, issueIndex) => (
                                  <motion.div 
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: issueIndex * 0.1 }}
                                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 hover:bg-yellow-100 transition-colors"
                                  >
                                    <p className="text-sm text-gray-800 mb-2">{issue.description}</p>
                                    <div className="text-xs text-gray-600 mb-1">
                                      <span className="font-medium">対策:</span> {issue.countermeasure}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>担当: {issue.assignee}</span>
                                      <span>期限: {new Date(issue.dueDate).toLocaleDateString('ja-JP')}</span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* 意思決定 */}
                          {progress.decisions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h4 className="text-sm font-medium text-blue-700 mb-3 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                ✅ 意思決定 ({progress.decisions.length}件)
                              </h4>
                              <div className="space-y-3">
                                {progress.decisions.map((decision, decisionIndex) => (
                                  <motion.div 
                                    key={decision.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: decisionIndex * 0.1 }}
                                    className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors cursor-pointer"
                                    onClick={() => setSelectedDecision(decision)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800 mb-1">
                                          {decision.question}
                                        </p>
                                        <p className="text-xs text-blue-700">
                                          決定: {decision.options.find(opt => opt.id === decision.selectedOption)?.label}
                                        </p>
                                        <div className="text-xs text-gray-500 mt-2">
                                          {new Date(decision.decisionDate).toLocaleDateString('ja-JP')} | {decision.responsible}
                                        </div>
                                      </div>
                                      <Eye className="w-4 h-4 text-blue-500 ml-2 flex-shrink-0" />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 意思決定モーダル */}
      {selectedDecision && (
        <DecisionModal
          isOpen={!!selectedDecision}
          onClose={() => setSelectedDecision(null)}
          decision={selectedDecision}
        />
      )}
    </div>
  );
};

export default WeeklyProgressSection;