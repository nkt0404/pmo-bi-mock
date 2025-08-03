// ... previous imports
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface PhasePeriod {
  name: string;
  start: string; // YYYY-MM
  end: string;   // YYYY-MM
  critical?: boolean;
}

export interface ProjectSchedule {
  project: string;
  phases: PhasePeriod[];
}

export interface ScheduleDependency {
  fromProject: string;
  fromPhase: string;
  toProject: string;
  toPhase: string;
  description: string;
  critical?: boolean;
}

export interface Milestone {
  id: string;
  date: string; // YYYY-MM
  name: string;
  impacts: { project: string; phase: string }[];
}

// timeline helpers (same as before)
const timelineStart = new Date('2025-01-01');
const timelineEnd = new Date('2026-12-31');
const monthDiff = (d1: Date, d2: Date) => ((d2.getFullYear()-d1.getFullYear())*12)+(d2.getMonth()-d1.getMonth());
const totalMonths = monthDiff(timelineStart, timelineEnd)+1;
const getPosition = (dateStr:string)=> (monthDiff(timelineStart,new Date(dateStr+'-01'))/totalMonths)*100;
const getWidth=(s:string,e:string)=> (monthDiff(new Date(s+'-01'),new Date(e+'-01'))+1)/totalMonths*100;

// gradient util
const getPhaseColor=(idx:number,total:number)=>{
  const start=[220,220,255],end=[15,26,78];
  const t= total<=1?1:idx/(total-1);
  const rgb=start.map((s,i)=>Math.round(s+(end[i]-s)*t));
  return `rgb(${rgb.join(',')})`;
};

type Props={
 schedules:ProjectSchedule[];
 dependencies?:ScheduleDependency[];
 milestones?:Milestone[];
};

const ProjectTimeline:React.FC<Props>=({schedules,dependencies=[],milestones=[]})=>{
  const [tooltip,setTooltip]=useState<{x:number;y:number;content:string}|null>(null);

  // helpers to map project+phase -> position
  const rowHeight=48;
  const projectIndex=(project:string)=> schedules.findIndex(p=>p.project===project);
  
  const phaseCenter=(project:string,phase:string)=>{
     const proj=schedules.find(p=>p.project===project);
     if(!proj) return 0;
     const ph=proj.phases.find(p=>p.name===phase);
     if(!ph) return 0;
     return getPosition(ph.start)+getWidth(ph.start,ph.end)/2;
  };

  return (
    <div className="relative w-full overflow-x-auto" onMouseLeave={()=>setTooltip(null)}>
      {/* Header months */}
      <div className="relative h-8 border-b border-gray-300 text-xs flex" style={{minWidth:'800px'}}>
        {Array.from({length:totalMonths}).map((_,i)=>{
          const d=new Date(timelineStart);d.setMonth(d.getMonth()+i);
          return <div key={i} className="border-r border-gray-200 flex-1 flex items-center justify-center">{d.getFullYear()}/{d.getMonth()+1}</div>
        })}
        {/* Milestones diamonds */}
        {milestones.map(ms=>{
          const left=getPosition(ms.date)+"%";
          return <div key={ms.id} style={{left}} className="absolute -top-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-purple-600 cursor-pointer" onMouseEnter={e=>setTooltip({x:e.clientX,y:e.clientY,content:ms.name})}/>;
        })}
      </div>

      {/* Rows */}
      {schedules.map((proj)=>(
        <div key={proj.project} className="relative border-b border-gray-200" style={{minWidth:'800px',height:rowHeight}}>
          <div className="absolute left-0 top-0 h-full flex items-center px-2 bg-white z-10 shadow-sm"><span className="font-medium text-sm pr-4 whitespace-nowrap">{proj.project}</span></div>
          <div className="absolute inset-0 ml-40">
            {proj.phases.map((ph,pIdx)=>{
              const left=getPosition(ph.start)+"%";
              const width=getWidth(ph.start,ph.end)+"%";
              const color=getPhaseColor(pIdx,proj.phases.length);
              return <motion.div key={ph.name} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:pIdx*0.04}} className="absolute h-6 text-white text-xs flex items-center pl-2 pr-4 rounded" style={{left,width,backgroundColor:color}}>{ph.name}</motion.div>
            })}
          </div>
        </div>
      ))}

      {/* SVG layer for dependencies */}
      {dependencies.length>0 && (
        <svg className="absolute left-40 top-8 pointer-events-none" style={{height: rowHeight*schedules.length, width:'100%'}}>
          {dependencies.map(dep=>{
            const y1=rowHeight*projectIndex(dep.fromProject)+rowHeight/2;
            const y2=rowHeight*projectIndex(dep.toProject)+rowHeight/2;
            const x1=phaseCenter(dep.fromProject,dep.fromPhase);
            const x2=phaseCenter(dep.toProject,dep.toPhase);
            return <g key={`${dep.fromProject}-${dep.toProject}-${dep.fromPhase}`}>{
              <line x1={`${x1}%`} y1={y1} x2={`${x2}%`} y2={y2} stroke={dep.critical?"red":"#666"} strokeDasharray="4 4" markerEnd="url(#arrow)" strokeWidth={dep.critical?2:1} />
            }</g>
          })}
          <defs>
            <marker id="arrow" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#666" />
            </marker>
          </defs>
        </svg>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed z-50 bg-black text-white text-xs px-2 py-1 rounded" style={{top:tooltip.y+10,left:tooltip.x+10}}>{tooltip.content}</div>
      )}
    </div>
  );
};

export default ProjectTimeline;
