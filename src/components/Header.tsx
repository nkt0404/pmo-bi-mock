import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Calendar, 
  RefreshCw,
  BarChart3,
  Bot,
  Briefcase
} from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  currentDate: string;
  stats: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
  }>;
}

const Header: React.FC<HeaderProps> = ({ currentTime, currentDate, stats }) => {
  const location = useLocation();
  const isAIAgentPage = location.pathname === '/ai-agent';
  const isPfMPage = location.pathname === '/pfm';

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-900/95 backdrop-blur-md border-b border-blue-800/50 shadow-sm fixed top-0 left-0 right-0 z-40"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl font-bold text-white flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <Activity className="w-6 h-6 text-blue-300" />
              </motion.div>
              {isAIAgentPage ? 'AI エージェント設定' : isPfMPage ? 'ポートフォリオ管理' : 'プロジェクト状況報告'}
            </h1>
            <p className="text-sm text-blue-100 mt-1 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              PMOダッシュボード | {currentDate}
            </p>
          </motion.div>
          
          {/* ナビゲーションメニュー */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-6"
          >
            {/* ページ切り替えナビ */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">状況報告</span>
              </Link>
              <Link 
                to="/pfm" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isPfMPage 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">ポートフォリオ</span>
              </Link>
              <Link 
                to="/ai-agent" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isAIAgentPage 
                    ? 'bg-white/20 text-white' 
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">AI設定</span>
              </Link>
            </div>

            {/* クイック統計（ダッシュボードページのみ） */}
            {!isAIAgentPage && !isPfMPage && (
              <div className="hidden lg:flex items-center space-x-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`flex items-center justify-center mb-1 ${stat.color}`}>
                      {stat.icon}
                      <span className="ml-1 font-semibold text-sm">{stat.value}</span>
                    </div>
                    <div className="text-xs text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* リアルタイム更新インジケーター */}
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </motion.div>
              <div className="text-xs">
                <div className="text-white font-medium">リアルタイム更新中</div>
                <div className="text-white">{currentTime.toLocaleTimeString('ja-JP')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;