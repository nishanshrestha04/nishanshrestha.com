"use client";

import { useEffect, useState } from 'react';
import { Activity, Server, Database, Globe } from 'lucide-react';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminDashboardPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const data = await apiClient('/api/health');
        setHealth(data);
      } catch (error) {
        console.error('Failed to fetch health status', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHealth();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
      <p className="text-neutral-400 mb-8">Welcome back! Here is the current status of your portfolio system.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            {loading ? (
              <span className="text-neutral-500 text-sm">Checking...</span>
            ) : health?.status === 'ok' ? (
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                Online
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                Offline
              </span>
            )}
          </div>
          <h3 className="text-neutral-400 text-sm font-medium mb-1">API Status</h3>
          <p className="text-2xl font-bold text-white">
            {loading ? '-' : health?.status === 'ok' ? 'Healthy' : 'Unresponsive'}
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-neutral-400 text-sm font-medium mb-1">Backend Environment</h3>
          <p className="text-2xl font-bold text-white">Node.js / Nest</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <h3 className="text-neutral-400 text-sm font-medium mb-1">Database Provider</h3>
          <p className="text-2xl font-bold text-white">Neon Serverless</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <h3 className="text-neutral-400 text-sm font-medium mb-1">Frontend Region</h3>
          <p className="text-2xl font-bold text-white">Global Edge</p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-4">Ready to update your portfolio?</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto mb-6">
          Use the sidebar on the left to manage your projects, experiences, articles, and more. 
          Changes made here will instantly reflect on your live portfolio.
        </p>
      </div>
    </div>
  );
}
