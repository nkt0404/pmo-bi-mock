import React from 'react';
import { motion } from 'framer-motion';

interface PhasePeriod {
  name: string;
  start: string; // YYYY-MM
  end: string;   // YYYY-MM
  critical?: boolean;
}

export interface ProjectSchedule {
  project: string;
  phases: PhasePeriod[];
}

const timelineStart = new Date('2025-01-01');
const timelineEnd = new Date('2026-12-31');

// 月差を計算
const monthDiff = (d1: Date, d2: Date) => {
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
};

// タイムライン全長（月）
const totalMonths = monthDiff(timelineStart, timelineEnd) + 1;

const getPosition = (dateStr: string) => {
  const date = new Date(dateStr + '-01');
  const diff = monthDiff(timelineStart, date);
  return (diff / totalMonths) * 100;
};

const getWidth = (start: string, end: string) => {
  const s = new Date(start + '-01');
  const e = new Date(end + '-01');
  const diff = monthDiff(s, e) + 1;
  return (diff / totalMonths) * 100;
};

type Props = {
  schedules: ProjectSchedule[];
};

const colors = [
  'bg-emerald-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
];

const ProjectTimeline: React.FC<Props> = ({ schedules }) => {
  return (
    <div className="w-full overflow-x-auto">
      {/* ヘッダー（月単位罫線） */}
      <div className="relative h-8 border-b border-gray-300 text-xs flex" style={{ minWidth: '800px' }}>
        {Array.from({ length: totalMonths }).map((_, i) => {
          const date = new Date(timelineStart);
          date.setMonth(date.getMonth() + i);
          const label = `${date.getFullYear()}/${date.getMonth() + 1}`;
          return (
            <div key={i} className="border-r border-gray-200 flex-1 flex items-center justify-center">
              {label}
            </div>
          );
        })}
      </div>

      {/* プロジェクト行 */}
      {schedules.map((proj) => (
        <div key={proj.project} className="relative border-b border-gray-200" style={{ minWidth: '800px', height: '48px' }}>
          {/* プロジェクト名 */}
          <div className="absolute left-0 top-0 h-full flex items-center px-2 bg-white z-10 shadow-sm">
            <span className="font-medium text-sm whitespace-nowrap pr-4">{proj.project}</span>
          </div>
          {/* バー領域 */}
          <div className="absolute inset-0 ml-40">
            {proj.phases.map((phase, pIdx) => {
              const left = getPosition(phase.start) + '%';
              const width = getWidth(phase.start, phase.end) + '%';
              const color = colors[pIdx % colors.length];
              return (
                <motion.div
                  key={phase.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pIdx * 0.05 }}
                  className={`absolute h-6 ${color} text-white text-xs flex items-center pl-2 pr-4`} 
                  style={{ left, width }}
                >
                  {phase.name}
                  {/* arrow head */}
                  <span className="ml-auto w-0 h-0 border-t-3 border-b-3 border-l-6 border-t-transparent border-b-transparent border-l-current" />
                  {phase.critical && (
                    <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTimeline;
