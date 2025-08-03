import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Pause,
  Eye,
  ArrowRightLeft,
  Flag
} from 'lucide-react';
import { crossProjectCoordinations } from '../data/mockData.js';
import Modal from './Modal.js';

const CrossProjectCoordinationSection: React.FC = () => {
  const [selectedCoordination, setSelectedCoordination] = useState<any>(null);

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

  return (
    <div className="card h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200 bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-center flex items-center justify-center">
          <GitBranch className="w-6 h-6 mr-2 text-cyan-600" />
          プロジェクト間調整
        </h2>
      </motion.div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {crossProjectCoordinations.map((coordination, index) => {
              const daysUntilDue = getDaysUntilDue(coordination.dueDate);
              const isOverdue = daysUntilDue < 0;
              const isUrgent = daysUntilDue <= 3 && daysUntilDue >= 0;

              return (
                <motion.div
                  key={coordination.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card bg-white border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    isOverdue ? 'ring-2 ring-red-200' : 
                    isUrgent ? 'ring-2 ring-yellow-200' : ''
                  }`}
                  onClick={() => setSelectedCoordination(coordination)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-4">
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1">
                        <ArrowRightLeft className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm mb-1">
                            {coordination.topic}
                          </h3>
                          <div className="flex items-center text-xs text-gray-600">
                            <span className="font-medium">{coordination.fromProject.replace('PJ', '')}</span>
                            <ArrowRightLeft className="w-3 h-3 mx-2" />
                            <span className="font-medium">{coordination.toProject.replace('PJ', '')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Eye className="w-4 h-4 text-cyan-500" />
                        </motion.div>
                      </div>
                    </div>

                    {/* 説明文 */}
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {coordination.description}
                    </p>

                    {/* ステータスと優先度 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
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
                    </div>

                    {/* 期限情報 */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        期限: {new Date(coordination.dueDate).toLocaleDateString('ja-JP')}
                      </div>
                      <div className={`flex items-center ${
                        isOverdue ? 'text-red-600' : 
                        isUrgent ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        <Clock className="w-3 h-3 mr-1" />
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
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="mt-3 h-1 bg-blue-500 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 調整事項詳細モーダル */}
      {selectedCoordination && (
        <Modal 
          isOpen={!!selectedCoordination} 
          onClose={() => setSelectedCoordination(null)} 
          title="プロジェクト間調整事項詳細"
        >
          <div className="space-y-6">
            {/* 基本情報 */}
            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
              <h3 className="font-medium text-cyan-900 mb-3 flex items-center">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                調整概要
              </h3>
              <div className="space-y-2 text-sm text-cyan-800">
                <div className="flex items-center justify-between">
                  <span>連携元:</span>
                  <span className="font-medium">{selectedCoordination.fromProject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>連携先:</span>
                  <span className="font-medium">{selectedCoordination.toProject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>調整事項:</span>
                  <span className="font-medium">{selectedCoordination.topic}</span>
                </div>
              </div>
            </div>

            {/* 詳細説明 */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">📋 詳細内容</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {selectedCoordination.description}
              </p>
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

            {/* アクションアイテム */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">📝 次のアクション</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {selectedCoordination.status === 'pending' && (
                  <>
                    <li>• 関係者とのキックオフミーティング設定</li>
                    <li>• 要件の詳細化と合意形成</li>
                  </>
                )}
                {selectedCoordination.status === 'in-discussion' && (
                  <>
                    <li>• 技術仕様の最終確認</li>
                    <li>• 実装スケジュールの調整</li>
                  </>
                )}
                {selectedCoordination.status === 'resolved' && (
                  <>
                    <li>• 実装結果の検証</li>
                    <li>• 運用手順書の作成</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CrossProjectCoordinationSection;