import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Clock
} from 'lucide-react';
import WeeklyProgressSection from '../components/WeeklyProgressSection.js';
import QualityKPISection from '../components/QualityKPISection.js';
import CrossProjectCoordinationSection from '../components/CrossProjectCoordinationSection.js';
import TeamCoordinationSection from '../components/TeamCoordinationSection.js';


const DashboardPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 時刻の定期更新
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24">
      {/* メインコンテンツ */}
      <main className="p-8">
        <div className="max-w-none mx-auto space-y-8">
          {/* 戦略プロジェクト進捗・意思決定 & 品質・デリバリーKPI（横並び） */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.005 }}
              className="min-h-[600px]"
            >
              <WeeklyProgressSection />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.005 }}
              className="min-h-[600px]"
            >
              <QualityKPISection />
            </motion.div>
          </motion.div>

          {/* オペレーション詳細（下位） */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            {/* プロジェクト間調整 */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.005 }}
              className="min-h-[450px]"
            >
              <CrossProjectCoordinationSection />
            </motion.div>
            
            {/* プロジェクト内チーム間調整 */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.005 }}
              className="min-h-[450px]"
            >
              <TeamCoordinationSection />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* リフレッシュボタン */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl border-4 border-white/20 backdrop-blur-sm"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* フッター情報 */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>Last Updated: {currentTime.toLocaleTimeString('ja-JP')}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;