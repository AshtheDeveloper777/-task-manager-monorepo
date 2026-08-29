'use client';

import React from 'react';
import { Task, TaskStatus } from '@repo/common-types';
import { TaskCard } from './TaskCard';
import { Inbox, Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onOpenCreateModal: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onOpenCreateModal,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="p-12 rounded-2xl glass-card text-center flex flex-col items-center justify-center my-8">
        <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">No tasks found</h3>
        <p className="text-sm text-slate-400 max-w-sm mb-6">
          No tasks match your current filter criteria or search query. Create a new task to get started!
        </p>
        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
