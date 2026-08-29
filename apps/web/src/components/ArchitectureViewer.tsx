'use client';

import React, { useState } from 'react';
import {
  FolderGit2,
  Box,
  Layers,
  FileCode2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle2,
  X,
} from 'lucide-react';

interface ArchitectureViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'flow' | 'code'>('tree');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl rounded-2xl glass-card border border-indigo-500/30 p-6 shadow-2xl bg-[#0b0f19] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Monorepo Architecture Inspector
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  pnpm + Turborepo
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Interactive diagram & package dependencies for <code className="text-indigo-300">Zohom</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 mb-4">
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'tree'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Directory Tree
          </button>
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'flow'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Workspace Dependency Flow
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Shared Package Exports
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'tree' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed">
                <p className="text-indigo-400 font-bold mb-2">📦 webzenith (Root)</p>
                <div className="pl-4 space-y-1 border-l-2 border-slate-800">
                  <p>├── <span className="text-amber-400 font-semibold">pnpm-workspace.yaml</span> <span className="text-slate-500">(Defines apps/* & packages/*)</span></p>
                  <p>├── <span className="text-sky-400 font-semibold">turbo.json</span> <span className="text-slate-500">(Pipeline for build, dev, lint)</span></p>
                  <p>├── <span className="text-slate-300">package.json</span> <span className="text-slate-500">(Root dependencies)</span></p>
                  <p>│</p>
                  <p className="text-indigo-300 font-bold">├── 📁 apps/</p>
                  <div className="pl-4 space-y-1 border-l-2 border-indigo-900/50">
                    <p className="text-emerald-400 font-bold">└── 📁 web/ (Next.js Application)</p>
                    <div className="pl-4 space-y-0.5 border-l-2 border-emerald-900/40 text-slate-400">
                      <p>├── src/app/page.tsx <span className="text-indigo-300 font-semibold">(Main Dashboard UI)</span></p>
                      <p>├── src/app/api/tasks/route.ts <span className="text-indigo-300 font-semibold">(Validated Backend Route)</span></p>
                      <p>├── src/components/ <span className="text-slate-500">(Header, Stats, TaskList, TaskFormModal)</span></p>
                      <p>├── package.json <span className="text-emerald-300 font-bold">{`("@repo/common-types": "workspace:*")`}</span></p>
                      <p>└── next.config.mjs <span className="text-slate-500">(transpilePackages setup)</span></p>
                    </div>
                  </div>
                  <p>│</p>
                  <p className="text-indigo-300 font-bold">└── 📁 packages/</p>
                  <div className="pl-4 space-y-1 border-l-2 border-indigo-900/50">
                    <p className="text-purple-400 font-bold">└── 📁 common-types/ (Shared Schema & Types)</p>
                    <div className="pl-4 space-y-0.5 border-l-2 border-purple-900/40 text-slate-400">
                      <p>├── src/index.ts <span className="text-purple-300 font-semibold">(Exports TaskSchema, CreateTaskSchema, types)</span></p>
                      <p>├── package.json <span className="text-purple-300 font-bold">{`("@repo/common-types")`}</span></p>
                      <p>└── tsconfig.json <span className="text-slate-500">(ESM Config)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl glass-card border border-purple-500/30 bg-purple-950/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-400">STEP 1</span>
                    <Box className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Shared Package</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    <code className="text-purple-300">packages/common-types</code> exports Zod validation schemas & TypeScript types.
                  </p>
                  <div className="p-2 rounded bg-slate-900/80 font-mono text-[11px] text-purple-300 border border-purple-500/20">
                    export const CreateTaskSchema = ...
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl glass-card border border-indigo-500/30 bg-indigo-950/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400">STEP 2</span>
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">pnpm Workspace Protocol</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    <code className="text-indigo-300">apps/web</code> links the package using local symlink protocol.
                  </p>
                  <div className="p-2 rounded bg-slate-900/80 font-mono text-[11px] text-indigo-300 border border-indigo-500/20">
                    {`"@repo/common-types": "workspace:*"`}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl glass-card border border-emerald-500/30 bg-emerald-950/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400">STEP 3</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Runtime Validation</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Form modals and API endpoints validate input dynamically using shared schemas.
                  </p>
                  <div className="p-2 rounded bg-slate-900/80 font-mono text-[11px] text-emerald-300 border border-emerald-500/20">
                    CreateTaskSchema.safeParse(body)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Source code extracted from <code className="text-indigo-300">packages/common-types/src/index.ts</code>:
              </p>
              <pre className="p-4 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`import { z } from 'zod';

export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']);
export const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  status: TaskStatusEnum.default('TODO'),
  priority: TaskPriorityEnum.default('MEDIUM'),
  dueDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-indigo-400" /> Monorepo build verified via Turborepo
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
