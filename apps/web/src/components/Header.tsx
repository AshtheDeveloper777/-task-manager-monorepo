'use client';

import React from 'react';
import { Layers, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090d16]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 text-white">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Task Manager</h1>
            <p className="text-xs text-slate-400">
              Manage your tasks efficiently and stay organized
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm shadow-md shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
};
