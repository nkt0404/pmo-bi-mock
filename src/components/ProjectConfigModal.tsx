import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  FolderOpen,
  FileText,
  Database,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

interface ProjectConfig {
  id: string;
  name: string;
  cloudApp: string;
  documentTypes: string[];
  taskTool: string;
  mcpEndpoint: string;
  status: 'configured' | 'partial' | 'not-configured';
}

interface ProjectConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectConfig | null;
  onSave: (config: ProjectConfig) => void;
}

const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave
}) => {
  const [config, setConfig] = useState<ProjectConfig | null>(null);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);
  const [customMcpEndpoint, setCustomMcpEndpoint] = useState('');

  const cloudApps = [
    { id: 'sharepoint', name: 'SharePoint', description: 'Microsoft SharePoint Online' },
    { id: 'googledrive', name: 'Google Drive', description: 'Google Workspace Drive' },
    { id: 'onedrive', name: 'OneDrive', description: 'Microsoft OneDrive for Business' },
    { id: 'box', name: 'Box', description: 'Box Business' },
    { id: 'dropbox', name: 'Dropbox', description: 'Dropbox Business' }
  ];

  const documentTypes = [
    { id: 'project-plan', name: 'プロジェクト計画書', category: '計画書', icon: '📋' },
    { id: 'test-plan', name: 'テスト計画書', category: '計画書', icon: '🧪' },
    { id: 'wbs', name: 'WBS', category: '計画書', icon: '📊' },
    { id: 'risk-mgmt', name: 'リスク管理表', category: '管理表', icon: '⚠️' },
    { id: 'issue-mgmt', name: '課題管理表', category: '管理表', icon: '🔧' },
    { id: 'change-mgmt', name: '変更管理表', category: '管理表', icon: '📝' },
    { id: 'excel', name: 'Excel ワークブック', category: 'Office', icon: '📗' },
    { id: 'powerpoint', name: 'PowerPoint プレゼンテーション', category: 'Office', icon: '📊' },
    { id: 'word', name: 'Word 文書', category: 'Office', icon: '📄' }
  ];

  const taskTools = [
    { id: 'jira', name: 'JIRA', description: 'Atlassian JIRA', icon: '🔵' },
    { id: 'backlog', name: 'Backlog', description: 'Nulab Backlog', icon: '🟠' },
    { id: 'redmine', name: 'Redmine', description: 'オープンソース プロジェクト管理', icon: '🔴' },
    { id: 'notion', name: 'Notion', description: 'Notion Workspace', icon: '⚪' },
    { id: 'asana', name: 'Asana', description: 'Asana Project Management', icon: '🔷' },
    { id: 'trello', name: 'Trello', description: 'Atlassian Trello', icon: '🟦' }
  ];

  useEffect(() => {
    if (project) {
      setConfig({ ...project });
      setSelectedDocTypes(project.documentTypes || []);
      setCustomMcpEndpoint(project.mcpEndpoint || '');
    } else {
      // 新規作成の場合
      setConfig({
        id: `proj-${Date.now()}`,
        name: '',
        cloudApp: '',
        documentTypes: [],
        taskTool: '',
        mcpEndpoint: '',
        status: 'not-configured'
      });
      setSelectedDocTypes([]);
      setCustomMcpEndpoint('');
    }
  }, [project]);

  const handleDocTypeToggle = (docTypeId: string) => {
    const docType = documentTypes.find(dt => dt.id === docTypeId);
    if (!docType) return;

    setSelectedDocTypes(prev => {
      if (prev.includes(docType.name)) {
        return prev.filter(name => name !== docType.name);
      } else {
        return [...prev, docType.name];
      }
    });
  };

  const handleSave = () => {
    if (!config) return;

    const updatedConfig = {
      ...config,
      documentTypes: selectedDocTypes,
      mcpEndpoint: customMcpEndpoint,
      status: getConfigStatus()
    };

    onSave(updatedConfig);
    onClose();
  };

  const getConfigStatus = (): 'configured' | 'partial' | 'not-configured' => {
    if (!config) return 'not-configured';
    
    const hasCloudApp = !!config.cloudApp;
    const hasDocTypes = selectedDocTypes.length > 0;
    const hasTaskTool = !!config.taskTool;
    const hasMcpEndpoint = !!customMcpEndpoint;

    const configuredItems = [hasCloudApp, hasDocTypes, hasTaskTool, hasMcpEndpoint].filter(Boolean).length;

    if (configuredItems === 4) return 'configured';
    if (configuredItems > 0) return 'partial';
    return 'not-configured';
  };

  const groupedDocTypes = documentTypes.reduce((groups, docType) => {
    const category = docType.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(docType);
    return groups;
  }, {} as Record<string, typeof documentTypes>);

  if (!config) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {project ? 'プロジェクト設定を編集' : '新規プロジェクト設定'}
                </h2>
                <p className="text-gray-600 mt-1">
                  AI エージェントが連携するアプリケーションとドキュメントを設定します
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* プロジェクト名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  プロジェクト名
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="プロジェクト名を入力"
                />
              </div>

              {/* クラウドアプリ選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <FolderOpen className="w-4 h-4 inline mr-2" />
                  クラウドストレージアプリ
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cloudApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfig({ ...config, cloudApp: app.name })}
                      className={`p-4 text-left rounded-lg border-2 transition-all ${
                        config.cloudApp === app.name
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-600">{app.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ドキュメント種別選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <FileText className="w-4 h-4 inline mr-2" />
                  連携ドキュメント種別
                </label>
                {Object.entries(groupedDocTypes).map(([category, docs]) => (
                  <div key={category} className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {docs.map((docType) => (
                        <motion.button
                          key={docType.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDocTypeToggle(docType.id)}
                          className={`p-3 text-left rounded-lg border-2 transition-all ${
                            selectedDocTypes.includes(docType.name)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{docType.icon}</span>
                            <span className="font-medium text-gray-900 text-sm">
                              {docType.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* タスク管理ツール選択 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  <Database className="w-4 h-4 inline mr-2" />
                  タスク管理ツール
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {taskTools.map((tool) => (
                    <motion.button
                      key={tool.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfig({ ...config, taskTool: tool.name })}
                      className={`p-4 text-left rounded-lg border-2 transition-all ${
                        config.taskTool === tool.name
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{tool.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-600">{tool.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* MCP エンドポイント設定 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  MCP エンドポイント URL
                </label>
                <input
                  type="url"
                  value={customMcpEndpoint}
                  onChange={(e) => setCustomMcpEndpoint(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="https://api.example.com/mcp"
                />
                <p className="text-xs text-gray-500 mt-1">
                  AI エージェントが使用するMCP（Model Context Protocol）エンドポイントを指定してください
                </p>
              </div>
            </div>

            {/* フッター */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2 text-sm">
                {getConfigStatus() === 'configured' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-700">設定完了</span>
                  </>
                )}
                {getConfigStatus() === 'partial' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-700">設定中</span>
                  </>
                )}
                {getConfigStatus() === 'not-configured' && (
                  <>
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">未設定</span>
                  </>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>保存</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectConfigModal;