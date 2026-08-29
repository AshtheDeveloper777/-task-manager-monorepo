import { z } from 'zod';

// Zod Enums
export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']);
export type TaskStatus = z.infer<typeof TaskStatusEnum>;

export const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);
export type TaskPriority = z.infer<typeof TaskPriorityEnum>;

// Core Task Schema
export const TaskSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Task title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').default(''),
  status: TaskStatusEnum.default('TODO'),
  priority: TaskPriorityEnum.default('MEDIUM'),
  dueDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

// Input Schemas
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = CreateTaskSchema.partial();
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

// Filter Interface
export interface TaskFilter {
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  search?: string;
}

// Visual Meta Helpers
export const STATUS_META: Record<TaskStatus, { label: string; bg: string; text: string; border: string }> = {
  TODO: { label: 'To Do', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  IN_PROGRESS: { label: 'In Progress', bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  COMPLETED: { label: 'Completed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export const PRIORITY_META: Record<TaskPriority, { label: string; bg: string; text: string; border: string }> = {
  LOW: { label: 'Low', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' },
  MEDIUM: { label: 'Medium', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  HIGH: { label: 'High', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  URGENT: { label: 'Urgent', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

// Initial Seed Data
export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design Dashboard System',
    description: 'Create responsive analytics dashboard layout and dark theme UI components.',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    dueDate: '2026-08-10',
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-08T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Setup Data Validation',
    description: 'Implement Zod schemas for strict form payload validation.',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2026-08-08',
    createdAt: '2026-08-07T14:30:00.000Z',
    updatedAt: '2026-08-08T11:15:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Configure Pipeline Tasks',
    description: 'Setup continuous integration and build commands.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-08-12',
    createdAt: '2026-08-08T12:00:00.000Z',
    updatedAt: '2026-08-08T12:00:00.000Z',
  },
];
