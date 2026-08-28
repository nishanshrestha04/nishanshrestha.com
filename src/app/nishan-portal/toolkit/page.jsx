"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, X, Save, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminToolkitPage() {
  const [toolkit, setToolkit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    iconUrl: '',
    category: '',
    orderIndex: 0,
  });

  const fetchToolkit = async () => {
    try {
      const data = await apiClient('/api/toolkit');
      setToolkit(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load toolkit items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToolkit();
  }, []);

  const handleOpenForm = (item = null) => {
    if (item) {
      setFormData({
        ...item,
        name: item.name || '',
        iconUrl: item.iconUrl || '',
        category: item.category || '',
        orderIndex: item.orderIndex ?? 0,
      });
      setEditingId(item.id);
    } else {
      setFormData({
        name: '',
        iconUrl: '',
        category: '',
        orderIndex: toolkit.length,
      });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      orderIndex: parseInt(formData.orderIndex) || 0,
    };

    try {
      if (editingId) {
        await apiClient(`/api/toolkit/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        toast.success('Tool updated successfully');
      } else {
        await apiClient('/api/toolkit', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        toast.success('Tool created successfully');
      }
      fetchToolkit();
      handleCloseForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save tool');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;
    try {
      await apiClient(`/api/toolkit/${id}`, { method: 'DELETE' });
      toast.success('Tool deleted successfully');
      fetchToolkit();
    } catch (error) {
      toast.error(error.message || 'Failed to delete tool');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center min-h-[50vh] items-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // Group by category for display
  const groupedToolkit = toolkit.reduce((acc, item) => {
    const cat = item.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Toolkit</h1>
          <p className="text-neutral-400">Manage your skills and technologies</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => handleOpenForm()}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tool
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Tool' : 'New Tool'}</h2>
            <button onClick={handleCloseForm} className="text-neutral-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="React"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Frontend"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Icon URL (SVG/PNG)</label>
                <input
                  type="text"
                  value={formData.iconUrl}
                  onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Order Index</label>
                <input
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={handleCloseForm}
                className="px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolkit List */}
      <div className="space-y-8">
        {Object.keys(groupedToolkit).length > 0 ? (
          Object.keys(groupedToolkit).sort().map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {groupedToolkit[category].sort((a,b) => a.orderIndex - b.orderIndex).map((item) => (
                  <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col items-center hover:border-emerald-500/50 transition-colors group relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => handleOpenForm(item)}
                        className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {item.iconUrl ? (
                      <img src={item.iconUrl} alt={item.name} className="w-12 h-12 mb-3 object-contain" />
                    ) : (
                      <div className="w-12 h-12 mb-3 rounded bg-neutral-800 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-neutral-600" />
                      </div>
                    )}
                    <span className="font-medium text-white text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          !isFormOpen && (
            <div className="py-12 text-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-500">
              No tools found. Add some skills!
            </div>
          )
        )}
      </div>
    </div>
  );
}
