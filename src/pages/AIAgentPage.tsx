import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Settings,
  FolderOpen,
  FileText,
  Database,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit3
} from 'lucide-react';
import ProjectConfigModal from '../components/ProjectConfigModal.js';

interface ProjectConfig {
  id: string;
  name: string;
  cloudApp: string;
  documentTypes: string[];
  taskTool: string;
  mcpEndpoint: string;
  folderPaths: {
    documents: string;
    reports: string;
    assets: string;
  };
  status: 'configured' | 'partial' | 'not-configured';
}

const AIAgentPage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectConfig | null>(null);

  // モックデータ
  const [projectConfigs, setProjectConfigs] = useState<ProjectConfig[]>([
    {
      id: 'proj-001',
      name: '新基幹システム刷新PJ',
      cloudApp: 'SharePoint',
      documentTypes: ['プロジェクト計画書', 'WBS', 'リスク管理表'],
      taskTool: 'JIRA',
      mcpEndpoint: 'https://api.project001.com/mcp',
      folderPaths: {
        documents: '/プロジェクト/新基幹システム/ドキュメント',
        reports: '/プロジェクト/新基幹システム/レポート',
        assets: '/プロジェクト/新基幹システム/成果物'
      },
      status: 'configured'
    },
    {
      id: 'proj-002',
      name: 'クラウド移行PJ',
      cloudApp: 'GoogleDrive',
      documentTypes: ['テスト計画書', '課題管理表'],
      taskTool: 'Notion',
      mcpEndpoint: '',
      folderPaths: {
        documents: '/CloudMigration/Documents',
        reports: '/CloudMigration/Reports',
        assets: ''
      },
      status: 'partial'
    },
    {
      id: 'proj-003',
      name: 'データ分析基盤構築PJ',
      cloudApp: 'OneDrive',
      documentTypes: ['プロジェクト計画書', '変更管理表'],
      taskTool: 'Backlog',
      mcpEndpoint: 'https://api.project003.com/mcp',
      folderPaths: {
        documents: '/DataPlatform/設計書',
        reports: '/DataPlatform/分析レポート',
        assets: '/DataPlatform/データセット'
      },
      status: 'configured'
    },
    {
      id: 'proj-004',
      name: 'セキュリティ強化PJ',
      cloudApp: 'SharePoint',
      documentTypes: ['課題管理表'],
      taskTool: '',
      mcpEndpoint: '',
      folderPaths: {
        documents: '/Security/Documents',
        reports: '',
        assets: ''
      },
      status: 'partial'
    },
    {
      id: 'proj-005',
      name: 'モバイルアプリ開発PJ',
      cloudApp: '',
      documentTypes: [],
      taskTool: '',
      mcpEndpoint: '',
      folderPaths: {
        documents: '',
        reports: '',
        assets: ''
      },
      status: 'not-configured'
    }
  ]);



  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'not-configured': return <Settings className="w-5 h-5 text-gray-400" />;
      default: return <Settings className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'configured': return 'bg-green-100 text-green-700 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'not-configured': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'configured': return '設定完了';
      case 'partial': return '設定中';
      case 'not-configured': return '未設定';
      default: return '未設定';
    }
  };

  const handleEditProject = (projectId: string) => {
    const project = projectConfigs.find(p => p.id === projectId);
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleSaveProject = (config: ProjectConfig) => {
    setProjectConfigs(prev => {
      const existingIndex = prev.findIndex(p => p.id === config.id);
      if (existingIndex >= 0) {
        // 既存プロジェクトの更新
        const updated = [...prev];
        updated[existingIndex] = config;
        return updated;
      } else {
        // 新規プロジェクトの追加
        return [...prev, config];
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* ページヘッダー */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Bot className="w-8 h-8 mr-3 text-blue-600" />
                  AI エージェント設定
                </h1>
                <p className="text-gray-600 mt-2">
                  各プロジェクトのドキュメント管理とタスク管理ツールを連携して、AI エージェントが自動更新できるように設定します。
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                onClick={handleNewProject}
              >
                <Plus className="w-4 h-4" />
                <span>新規設定</span>
              </motion.button>
            </div>
          </motion.div>

          {/* プロジェクト設定一覧 */}
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max">
                <AnimatePresence>
                  {projectConfigs.map((config, index) => (
                <motion.div
                  key={config.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer flex-shrink-0 w-80"
                  onClick={() => {}}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-6">
                    {/* プロジェクトヘッダー */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(config.status)}
                        <h3 className="font-semibold text-gray-900">{config.name}</h3>
                      </div>
                      <span className={`status-badge ${getStatusBadge(config.status)}`}>
                        {getStatusText(config.status)}
                      </span>
                    </div>

                    {/* 設定詳細 */}
                    <div className="space-y-3">
                      {/* クラウドアプリ */}
                      <div className="flex items-center space-x-3">
                        <FolderOpen className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="text-xs text-gray-500">クラウドアプリ</div>
                          <div className="text-sm font-medium">
                            {config.cloudApp || '未設定'}
                          </div>
                        </div>
                      </div>

                      {/* ドキュメント種別 */}
                      <div className="flex items-start space-x-3">
                        <FileText className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <div className="text-xs text-gray-500">ドキュメント種別</div>
                          <div className="text-sm">
                            {config.documentTypes.length > 0 ? (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {config.documentTypes.slice(0, 2).map((type, i) => (
                                  <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                    {type}
                                  </span>
                                ))}
                                {config.documentTypes.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{config.documentTypes.length - 2}個
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">未設定</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* タスク管理ツール */}
                      <div className="flex items-center space-x-3">
                        <Database className="w-4 h-4 text-purple-500" />
                        <div>
                          <div className="text-xs text-gray-500">タスク管理ツール</div>
                          <div className="text-sm font-medium">
                            {config.taskTool || '未設定'}
                          </div>
                        </div>
                      </div>

                      {/* MCP エンドポイント */}
                      <div className="flex items-center space-x-3">
                        <LinkIcon className="w-4 h-4 text-orange-500" />
                        <div>
                          <div className="text-xs text-gray-500">MCP エンドポイント</div>
                          <div className="text-sm font-mono">
                            {config.mcpEndpoint ? (
                              <span className="text-blue-600">{config.mcpEndpoint}</span>
                            ) : (
                              <span className="text-gray-400">未設定</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 設定ボタン */}
                    <div className="mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(config.id);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>設定を編集</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* AI エージェント状態表示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Bot className="w-6 h-6 mr-2 text-blue-600" />
              AI エージェント動作状況
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">設定完了プロジェクト</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-gray-600">設定中プロジェクト</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-600">1</div>
                <div className="text-sm text-gray-600">未設定プロジェクト</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* プロジェクト設定モーダル */}
      <ProjectConfigModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={editingProject}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default AIAgentPage;