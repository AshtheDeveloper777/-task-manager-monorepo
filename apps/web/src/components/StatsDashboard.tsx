'use client';

import React from 'react';
import { Task } from '@repo/common-types';
import { CheckCircle2, Clock, ListTodo, AlertTriangle, PieChart } from 'lucide-react';

interface StatsDashboardProps {
  tasks: Task[];
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ tasks }) => {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'TODO').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const urgent = tasks.filter((t) => t.priority === 'URGENT' && t.status !== 'COMPLETED').length;

  const stats = [
    { label: 'Total Tasks', value: total, icon: ListTodo, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'To Do', value: todo, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'In Progress', value: inProgress, icon: PieChart, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Urgent Pending', value: urgent, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl glass-card border ${stat.bg} flex items-center justify-between transition-all hover:scale-[1.02]`}
          >
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl bg-slate-900/60 ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
