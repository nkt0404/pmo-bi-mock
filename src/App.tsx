import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  Users,
  GitBranch,
  TrendingUp
} from 'lucide-react';
import Header from './components/Header.js';
import DashboardPage from './pages/DashboardPage.js';
import AIAgentPage from './pages/AIAgentPage.js';
import PfMPage from './pages/PfMPage.js';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 時刻の定期更新
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 初期ローディング
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const currentDate = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const stats = [
    { icon: <TrendingUp className="w-4 h-4 text-white" />, label: '進行中プロジェクト', value: '5件', color: 'text-white' },
    { icon: <BarChart3 className="w-4 h-4 text-white" />, label: '品質KPI達成率', value: '75%', color: 'text-white' },
    { icon: <GitBranch className="w-4 h-4 text-white" />, label: 'プロジェクト間調整', value: '3件', color: 'text-white' },
    { icon: <Users className="w-4 h-4 text-white" />, label: 'チーム調整事項', value: '7件', color: 'text-white' }
  ];

  // ローディング画面
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">PMO ダッシュボード</h2>
          <p className="text-gray-600">読み込み中...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50"
      >
        {/* 共通ヘッダー */}
        <Header 
          currentTime={currentTime}
          currentDate={currentDate}
          stats={stats}
        />

        {/* ページルーティング */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pfm" element={<PfMPage />} />
          <Route path="/ai-agent" element={<AIAgentPage />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;