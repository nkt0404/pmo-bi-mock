import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Pause,
  Eye,
  ArrowRightLeft,
  Flag,
  Monitor,
  Server,
  Settings,
  Wrench
} from 'lucide-react';
import { teamCoordinations, projects } from '../data/mockData.js';
import Modal from './Modal.js';

const TeamCoordinationSection: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [selectedCoordination, setSelectedCoordination] = useState<any>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getTeamIcon = (team: string) => {
    switch (team) {
      case 'app': return <Monitor className="w-4 h-4 text-blue-500" />;
      case 'infra': return <Server className="w-4 h-4 text-green-500" />;
      case 'common': return <Settings className="w-4 h-4 text-purple-500" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-orange-500" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTeamColor = (team: string) => {
    switch (team) {
      case 'app': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'infra': return 'bg-green-50 text-green-700 border-green-200';
      case 'common': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'maintenance': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-discussion': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <Pause className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-500" />;
      case 'medium': return <Flag className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Flag className="w-4 h-4 text-green-500" />;
      default: return <Flag className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resolved': return 'status-on-track';
      case 'in-discussion': return 'status-at-risk';
      case 'pending': return 'status-delayed';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTeamLabel = (team: string) => {
    switch (team) {
      case 'app': return 'アプリ';
      case 'infra': return 'インフラ';
      case 'common': return '共通';
      case 'maintenance': return '保守運用';
      default: return team;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved': return '完了';
      case 'in-discussion': return '協議中';
      case 'pending': return '保留';
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return priority;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const groupedCoordinations = projects.map(project => ({
    project,
    coordinations: teamCoordinations.filter(coord => coord.projectId === project.id)
  })).filter(group => group.coordinations.length > 0);

  return (
    <div className="card h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-center flex items-center justify-center">
          <Users className="w-6 h-6 mr-2 text-emerald-600" />
          プロジェクト内チーム間調整
        </h2>
      </motion.div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {groupedCoordinations.map(({ project, coordinations }, index) => {
              const isExpanded = expandedProjects.includes(project.id);
              const urgentCount = coordinations.filter(c => 
                getDaysUntilDue(c.dueDate) <= 3 && getDaysUntilDue(c.dueDate) >= 0
              ).length;
              const overdueCount = coordinations.filter(c => 
                getDaysUntilDue(c.dueDate) < 0
              ).length;

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
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleProject(project.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isExpanded ? 
                            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          }
                        </motion.div>
                        <Users className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-medium text-gray-900 text-sm">
                          {project.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {overdueCount > 0 && (
                          <span className="status-badge bg-red-100 text-red-700 border-red-200">
                            超過{overdueCount}件
                          </span>
                        )}
                        {urgentCount > 0 && (
                          <span className="status-badge bg-yellow-100 text-yellow-700 border-yellow-200">
                            緊急{urgentCount}件
                          </span>
                        )}
                        <span className="status-badge bg-emerald-50 text-emerald-700 border-emerald-200">
                          {coordinations.length}件
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* 展開可能なコンテンツ */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 border-t border-gray-100 pt-4"
                        >
                          <div className="space-y-3">
                            {coordinations.map((coordination, coordIndex) => {
                              const daysUntilDue = getDaysUntilDue(coordination.dueDate);
                              const isOverdue = daysUntilDue < 0;
                              const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0;

                              return (
                                <motion.div
                                  key={coordination.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: coordIndex * 0.1 }}
                                  className={`bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer ${
                                    isOverdue ? 'ring-2 ring-red-200' : 
                                    isUrgent ? 'ring-2 ring-yellow-200' : 'border-gray-200'
                                  }`}
                                  onClick={() => setSelectedCoordination({...coordination, projectName: project.name})}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                >
                                  {/* チーム間の関係 */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getTeamColor(coordination.fromTeam)}`}>
                                        {getTeamIcon(coordination.fromTeam)}
                                        <span>{getTeamLabel(coordination.fromTeam)}</span>
                                      </div>
                                      <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getTeamColor(coordination.toTeam)}`}>
                                        {getTeamIcon(coordination.toTeam)}
                                        <span>{getTeamLabel(coordination.toTeam)}</span>
                                      </div>
                                    </div>
                                    <Eye className="w-4 h-4 text-gray-500" />
                                  </div>

                                  {/* 調整事項 */}
                                  <h4 className="font-medium text-gray-800 text-sm mb-1">
                                    {coordination.topic}
                                  </h4>
                                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                    {coordination.description}
                                  </p>

                                  {/* ステータスと期限 */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="flex items-center space-x-1">
                                        {getPriorityIcon(coordination.priority)}
                                        <span className={`status-badge ${getPriorityStyle(coordination.priority)}`}>
                                          {getPriorityText(coordination.priority)}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        {getStatusIcon(coordination.status)}
                                        <span className={`status-badge ${getStatusStyle(coordination.status)}`}>
                                          {getStatusText(coordination.status)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className={`flex items-center text-xs ${
                                      isOverdue ? 'text-red-600' : 
                                      isUrgent ? 'text-yellow-600' : 'text-gray-600'
                                    }`}>
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {isOverdue ? `${Math.abs(daysUntilDue)}日超過` :
                                       daysUntilDue === 0 ? '本日期限' :
                                       `残り${daysUntilDue}日`}
                                    </div>
                                  </div>

                                  {/* 進捗インディケーター */}
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ 
                                      width: coordination.status === 'resolved' ? '100%' :
                                             coordination.status === 'in-discussion' ? '60%' : '20%'
                                    }}
                                    transition={{ duration: 1, delay: coordIndex * 0.1 + 0.3 }}
                                    className="mt-2 h-1 bg-green-500 rounded-full"
                                  />
                                </motion.div>
                              );
                            })}
                          </div>
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

      {/* チーム調整詳細モーダル */}
      {selectedCoordination && (
        <Modal 
          isOpen={!!selectedCoordination} 
          onClose={() => setSelectedCoordination(null)} 
          title="チーム調整事項詳細"
        >
          <div className="space-y-6">
            {/* 基本情報 */}
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-medium text-emerald-900 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                調整概要
              </h3>
              <div className="space-y-2 text-sm text-emerald-800">
                <div className="flex items-center justify-between">
                  <span>プロジェクト:</span>
                  <span className="font-medium">{selectedCoordination.projectName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>依頼元チーム:</span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getTeamColor(selectedCoordination.fromTeam)}`}>
                    {getTeamIcon(selectedCoordination.fromTeam)}
                    <span>{getTeamLabel(selectedCoordination.fromTeam)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>依頼先チーム:</span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getTeamColor(selectedCoordination.toTeam)}`}>
                    {getTeamIcon(selectedCoordination.toTeam)}
                    <span>{getTeamLabel(selectedCoordination.toTeam)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 調整事項詳細 */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">📋 調整事項</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">{selectedCoordination.topic}</h4>
                <p className="text-gray-700 text-sm">{selectedCoordination.description}</p>
              </div>
            </div>

            {/* ステータス情報 */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  {getPriorityIcon(selectedCoordination.priority)}
                  <span className="ml-2">優先度</span>
                </h4>
                <span className={`status-badge ${getPriorityStyle(selectedCoordination.priority)}`}>
                  {getPriorityText(selectedCoordination.priority)}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  {getStatusIcon(selectedCoordination.status)}
                  <span className="ml-2">状況</span>
                </h4>
                <span className={`status-badge ${getStatusStyle(selectedCoordination.status)}`}>
                  {getStatusText(selectedCoordination.status)}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Calendar className="w-4 h-4" />
                  <span className="ml-2">期限</span>
                </h4>
                <p className="text-sm text-gray-600">
                  {new Date(selectedCoordination.dueDate).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>

            {/* チーム別責任範囲 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-3">👥 チーム別責任範囲</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    {getTeamIcon(selectedCoordination.fromTeam)}
                    <span className="ml-2">{getTeamLabel(selectedCoordination.fromTeam)}チーム</span>
                  </h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 要件の明確化と仕様書作成</li>
                    <li>• 必要なリソースの提供</li>
                    <li>• 進捗状況の定期報告</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    {getTeamIcon(selectedCoordination.toTeam)}
                    <span className="ml-2">{getTeamLabel(selectedCoordination.toTeam)}チーム</span>
                  </h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• 技術的実現性の検証</li>
                    <li>• 実装・設定作業の実施</li>
                    <li>• 品質担保とテスト実施</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeamCoordinationSection;