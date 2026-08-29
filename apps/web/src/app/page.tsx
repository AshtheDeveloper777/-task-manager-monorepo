'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Task,
  TaskFilter,
  TaskStatus,
  TaskPriority,
  INITIAL_TASKS,
} from '@repo/common-types';
import { createClient } from '@supabase/supabase-js';
import { Header } from '@/components/Header';
import { StatsDashboard } from '@/components/StatsDashboard';
import { FilterBar } from '@/components/FilterBar';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setTasks(INITIAL_TASKS);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedTasks: Task[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          description: row.description || '',
          status:
            row.status?.toUpperCase() === 'COMPLETED'
              ? 'COMPLETED'
              : row.status?.toUpperCase() === 'IN_PROGRESS'
              ? 'IN_PROGRESS'
              : 'TODO',
          priority: (row.priority?.toUpperCase() as TaskPriority) || 'MEDIUM',
          createdAt: row.created_at || new Date().toISOString(),
          updatedAt: row.updated_at || new Date().toISOString(),
        }));
        setTasks(mappedTasks);
      } else {
        setTasks(INITIAL_TASKS);
      }
    } catch (e) {
      setTasks(INITIAL_TASKS);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleSaveTask = async (taskData: {
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
            ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
            : t
        )
      );
      setEditingTask(null);
      
      await supabase
        .from('tasks')
        .update({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status.toLowerCase(),
        })
        .eq('id', editingTask.id);
    } else {
      const tempId = `task-${Date.now()}`;
      const newTask: Task = {
        id: tempId,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);

      const { data } = await supabase
        .from('tasks')
        .insert([
          {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status.toLowerCase(),
          },
        ])
        .select();

      if (data && data[0]) {
        fetchTasks();
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
    );
    await supabase.from('tasks').update({ status: newStatus.toLowerCase() }).eq('id', id);
  };

  const handleDeleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await supabase.from('tasks').delete().eq('id', id);
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
        <StatsDashboard tasks={tasks} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onReset={handleResetFilters}
        />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onOpenCreateModal={handleOpenCreateModal}
        />
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />

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
