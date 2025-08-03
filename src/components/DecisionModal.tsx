import React from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal.js';
import type { DecisionItem, DecisionOption } from '../types/index.js';
import { CheckCircle, XCircle, AlertTriangle, Info, Calendar, User } from 'lucide-react';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  decision: DecisionItem | null;
}

const DecisionModal: React.FC<DecisionModalProps> = ({ isOpen, onClose, decision }) => {
  if (!decision) return null;

  const getRiskColor = (risk: DecisionOption['risk']) => {
    switch (risk) {
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getRiskIcon = (risk: DecisionOption['risk']) => {
    switch (risk) {
      case 'high': return <XCircle size={16} className="mr-1 text-red-500" />;
      case 'medium': return <AlertTriangle size={16} className="mr-1 text-yellow-500" />;
      case 'low': return <CheckCircle size={16} className="mr-1 text-green-500" />;
      default: return <Info size={16} className="mr-1 text-gray-500" />;
    }
  };

  const getRiskText = (risk: DecisionOption['risk']) => {
    switch (risk) {
      case 'high': return '高リスク';
      case 'medium': return '中リスク';
      case 'low': return '低リスク';
      default: return risk;
    }
  };

  const selectedOption = decision.selectedOption ? 
    decision.options.find(opt => opt.id === decision.selectedOption) : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="意思決定事項詳細">
      <div className="space-y-6">
        {/* 論点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            検討論点:
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xl font-bold text-blue-900">{decision.question}</p>
          </div>
        </motion.div>

        {/* 決定された選択肢（ハイライト） */}
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border-2 border-green-300 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <CheckCircle size={24} className="mr-2 text-green-600" />
              ✅ 採用された選択肢:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-green-900 mb-2">{selectedOption.label}</h4>
                  <p className="text-green-800 mb-3">{selectedOption.description}</p>
                </div>
                <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${getRiskColor(selectedOption.risk)}`}>
                  {getRiskIcon(selectedOption.risk)}
                  {getRiskText(selectedOption.risk)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 flex items-center mb-2">
                    <CheckCircle size={16} className="mr-1 text-green-600" />
                    メリット:
                  </h5>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    {selectedOption.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white bg-opacity-60 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 flex items-center mb-2">
                    <XCircle size={16} className="mr-1 text-red-500" />
                    デメリット:
                  </h5>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    {selectedOption.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 全選択肢の比較 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            検討された選択肢:
          </h3>
          <div className="space-y-4">
            {decision.options.map((option, index) => (
              <motion.div 
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  option.id === decision.selectedOption 
                    ? 'border-green-400 bg-green-50 shadow-md' 
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-lg text-gray-800">{option.label}</h4>
                      {option.id === decision.selectedOption && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                        >
                          採用
                        </motion.span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{option.description}</p>
                  </div>
                  <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ml-3 ${getRiskColor(option.risk)}`}>
                    {getRiskIcon(option.risk)}
                    {getRiskText(option.risk)}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-green-700 flex items-center mb-2">
                      <CheckCircle size={14} className="mr-1" />
                      メリット:
                    </h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h5 className="font-semibold text-red-700 flex items-center mb-2">
                      <XCircle size={14} className="mr-1" />
                      デメリット:
                    </h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 決定詳細情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📋 決定詳細:</h3>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-800 mb-4">{decision.details}</p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-semibold text-blue-800">決定日:</span>
                </div>
                <p className="text-blue-700">
                  {new Date(decision.decisionDate).toLocaleDateString('ja-JP')}
                </p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="flex items-center mb-1">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-semibold text-blue-800">責任者:</span>
                </div>
                <p className="text-blue-700">{decision.responsible}</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="flex items-center mb-1">
                  <AlertTriangle className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-semibold text-blue-800">影響:</span>
                </div>
                <p className="text-blue-700">{decision.impact}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* フォローアップアクション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
        >
          <h3 className="font-medium text-yellow-900 mb-2">🔄 フォローアップアクション</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• 決定事項の関係者への周知徹底</li>
            <li>• 実行計画の詳細策定とスケジュール調整</li>
            <li>• 進捗状況の定期的なモニタリング</li>
            <li>• 必要に応じた追加リソースの確保</li>
          </ul>
        </motion.div>
      </div>
    </Modal>
  );
};

export default DecisionModal;