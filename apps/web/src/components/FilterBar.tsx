'use client';

import React from 'react';
import { TaskFilter, TaskStatus, TaskPriority } from '@repo/common-types';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (newFilter: TaskFilter) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, onReset }) => {
  return (
    <div className="p-4 rounded-2xl glass-card mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={filter.search || ''}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
        />
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-white/5">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          <select
            value={filter.status || 'ALL'}
            onChange={(e) =>
              onFilterChange({ ...filter, status: e.target.value as TaskStatus | 'ALL' })
            }
            className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-slate-200">All Statuses</option>
            <option value="TODO" className="bg-slate-900 text-slate-200">To Do</option>
            <option value="IN_PROGRESS" className="bg-slate-900 text-slate-200">In Progress</option>
            <option value="COMPLETED" className="bg-slate-900 text-slate-200">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-white/5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs text-slate-400 font-medium">Priority:</span>
          <select
            value={filter.priority || 'ALL'}
            onChange={(e) =>
              onFilterChange({ ...filter, priority: e.target.value as TaskPriority | 'ALL' })
            }
            className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-slate-200">All Priorities</option>
            <option value="LOW" className="bg-slate-900 text-slate-200">Low</option>
            <option value="MEDIUM" className="bg-slate-900 text-slate-200">Medium</option>
            <option value="HIGH" className="bg-slate-900 text-slate-200">High</option>
            <option value="URGENT" className="bg-slate-900 text-slate-200">Urgent</option>
          </select>
        </div>

        <button
          onClick={onReset}
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all text-xs font-medium flex items-center gap-1.5"
          title="Reset Filters"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
