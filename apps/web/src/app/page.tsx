'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Task,
  TaskFilter,
  TaskStatus,
  TaskPriority,
} from '@repo/common-types';
import { createClient } from '@supabase/supabase-js';
import { Header } from '@/components/Header';
import { StatsDashboard } from '@/components/StatsDashboard';
import { FilterBar } from '@/components/FilterBar';
import { TaskList } from '@/components/TaskList';
import { TaskFormModal } from '@/components/TaskFormModal';

// Direct Supabase configuration with fallbacks for production deployment
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://hdoejjtkbxyjloezpqhn.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkb2VqanRrYnh5amxvZXpwcWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjMwMzIsImV4cCI6MjA4NjAzOTAzMn0.MmbDWLtesd40Qd3A4qaAWvzYsdlwd9PulypSbaI7cuQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const mapStatusToDb = (status: string): string => {
  const s = status.toUpperCase();
  if (s === 'COMPLETED') return 'completed';
  if (s === 'IN_PROGRESS') return 'in_progress';
  return 'pending';
};

const mapStatusFromDb = (status: string | null): TaskStatus => {
  const s = status?.toLowerCase();
  if (s === 'completed') return 'COMPLETED';
  if (s === 'in_progress') return 'IN_PROGRESS';
  return 'TODO';
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch ALL tasks exclusively from Supabase DB
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error.message);
        setTasks([]);
      } else if (data) {
        const mappedTasks: Task[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          description: row.description || '',
          status: mapStatusFromDb(row.status),
          priority: (row.priority?.toUpperCase() as TaskPriority) || 'MEDIUM',
          createdAt: row.created_at || new Date().toISOString(),
          updatedAt: row.updated_at || new Date().toISOString(),
        }));
        setTasks(mappedTasks);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setTasks([]);
    } finally {
      setLoading(false);
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

  // 2. Save task ONLY into Supabase DB
  const handleSaveTask = async (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
  }) => {
    const dbStatus = mapStatusToDb(taskData.status);

    if (editingTask) {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: taskData.title,
          description: taskData.description,
          status: dbStatus,
        })
        .eq('id', editingTask.id);

      if (error) {
        alert('Supabase Update Error: ' + error.message);
      } else {
        setEditingTask(null);
        await fetchTasks();
      }
    } else {
      const { error } = await supabase.from('tasks').insert([
        {
          title: taskData.title,
          description: taskData.description,
          status: dbStatus,
        },
      ]);

      if (error) {
        alert('Supabase Insert Error: ' + error.message);
      } else {
        await fetchTasks();
      }
    }
  };

  // 3. Update Status in Supabase DB
  const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: mapStatusToDb(newStatus) })
      .eq('id', id);

    if (!error) {
      await fetchTasks();
    }
  };

  // 4. Delete from Supabase DB
  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) {
      await fetchTasks();
    }
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

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <p>Connecting to Supabase Database...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onOpenCreateModal={handleOpenCreateModal}
          />
        )}
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
