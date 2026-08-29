'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Task,
  TaskFilter,
  TaskStatus,
  TaskPriority,
  INITIAL_TASKS,
} from '@repo/common-types';
import { Header } from '@/components/Header';
import { StatsDashboard } from '@/components/StatsDashboard';
import { FilterBar } from '@/components/FilterBar';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial tasks from local storage or shared package seed
  useEffect(() => {
    const saved = localStorage.getItem('app_tasks_storage');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        setTasks(INITIAL_TASKS);
      }
    } else {
      setTasks(INITIAL_TASKS);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on task changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('app_tasks_storage', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Filter tasks based on current filter state
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter.status && filter.status !== 'ALL' && task.status !== filter.status) {
        return false;
      }
      if (filter.priority && filter.priority !== 'ALL' && task.priority !== filter.priority) {
        return false;
      }
      if (filter.search && filter.search.trim() !== '') {
        const query = filter.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query) || false;
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }, [tasks, filter]);

  // Handle task creation / update
  const handleSaveTask = (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
  }) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...taskData,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  // Handle status toggle
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
    );
  };

  // Handle deletion
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilter({ status: 'ALL', priority: 'ALL', search: '' });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Header onOpenCreateModal={handleOpenCreateModal} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Dashboard */}
        <StatsDashboard tasks={tasks} />

        {/* Filter & Search Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onReset={handleResetFilters}
        />

        {/* Task Grid */}
        <TaskList
          tasks={filteredTasks}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onOpenCreateModal={handleOpenCreateModal}
        />
      </main>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 bg-[#060910]">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Task Manager Application</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Tasks</span>
            <span>•</span>
            <span>Analytics</span>
            <span>•</span>
            <span>Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
