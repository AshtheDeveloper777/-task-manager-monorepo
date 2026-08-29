'use client';

import React from 'react';
import { Task, STATUS_META, PRIORITY_META, TaskStatus } from '@repo/common-types';
import { Calendar, Edit3, Trash2, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const statusConfig = STATUS_META[task.status] || STATUS_META.TODO;
  const priorityConfig = PRIORITY_META[task.priority] || PRIORITY_META.MEDIUM;

  return (
    <div className="p-5 rounded-2xl glass-card border border-white/10 hover:border-indigo-500/40 transition-all group flex flex-col justify-between relative overflow-hidden bg-slate-900/40">
      {/* Top Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          task.status === 'COMPLETED'
            ? 'bg-emerald-500'
            : task.priority === 'URGENT'
            ? 'bg-rose-500'
            : 'bg-indigo-500/50'
        }`}
      />

      <div>
        {/* Badges & Actions Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
            >
              {statusConfig.label}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}
            >
              {priorityConfig.label}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800/80 transition-all"
              title="Edit Task"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-all"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className={`text-base font-semibold mb-2 ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-white'}`}>
          {task.title}
        </h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Info & Quick Action */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{task.dueDate ? `Due: ${task.dueDate}` : 'No deadline'}</span>
        </div>

        {/* Quick Status Buttons */}
        <div className="flex items-center gap-1">
          {task.status !== 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, 'COMPLETED')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" /> Done
            </button>
          )}
          {task.status === 'TODO' && (
            <button
              onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all flex items-center gap-1"
            >
              <PlayCircle className="w-3 h-3" /> Start
            </button>
          )}
          {task.status === 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, 'TODO')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all flex items-center gap-1"
            >
              <Clock className="w-3 h-3" /> Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
