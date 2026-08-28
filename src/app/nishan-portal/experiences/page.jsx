"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, X, Save, Building } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    logoUrl: '',
    logoFile: null,
    orderIndex: 0,
  });

  const fetchExperiences = async () => {
    try {
      const data = await apiClient('/api/experiences');
      setExperiences(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenForm = (exp = null) => {
    if (exp) {
      setFormData({
        ...exp,
        role: exp.role || '',
        company: exp.company || '',
        period: exp.period || '',
        logoUrl: exp.logoUrl || '',
        logoFile: null,
        orderIndex: exp.orderIndex ?? 0,
        description: (exp.description || []).join('\n'), // Use newlines for multiline text area
      });
      setEditingId(exp.id);
    } else {
      setFormData({
        role: '',
        company: '',
        period: '',
        description: '',
        logoUrl: '',
        logoFile: null,
        orderIndex: experiences.length,
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
    
    const formDataObj = new FormData();
    formDataObj.append('role', formData.role);
    formDataObj.append('company', formData.company);
    formDataObj.append('period', formData.period);
    
    // Parse newline-separated strings into array for descriptions and stringify for multipart/form-data
    const descArray = formData.description.split('\n').map(s => s.trim()).filter(Boolean);
    formDataObj.append('description', JSON.stringify(descArray));
    
    formDataObj.append('orderIndex', parseInt(formData.orderIndex) || 0);

    if (formData.logoUrl) {
      formDataObj.append('logoUrl', formData.logoUrl);
    }

    try {
      if (editingId) {
        await apiClient(`/api/experiences/${editingId}`, {
          method: 'PUT',
          body: formDataObj,
        });
        toast.success('Experience updated successfully');
      } else {
        await apiClient('/api/experiences', {
          method: 'POST',
          body: formDataObj,
        });
        toast.success('Experience created successfully');
      }
      fetchExperiences();
      handleCloseForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await apiClient(`/api/experiences/${id}`, { method: 'DELETE' });
      toast.success('Experience deleted successfully');
      fetchExperiences();
    } catch (error) {
      toast.error(error.message || 'Failed to delete experience');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center min-h-[50vh] items-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Experiences</h1>
          <p className="text-neutral-400">Manage your work history and timeline</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => handleOpenForm()}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Experience' : 'New Experience'}</h2>
            <button onClick={handleCloseForm} className="text-neutral-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Role / Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Google"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Jan 2020 - Present"
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Logo URL</label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                placeholder="https://example.com/logo.png"
              />
              
              {formData.logoUrl && (
                <div className="mt-3 relative w-24 h-24 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center p-2">
                  <img 
                    src={formData.logoUrl} 
                    alt="Logo Preview" 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Description (One bullet point per line)</label>
              <textarea
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                placeholder="Led development of the new dashboard...&#10;Mentored 3 junior engineers..."
              />
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

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-neutral-700 transition-colors">
            <div className="shrink-0 flex items-start">
              {exp.logoUrl ? (
                <img src={exp.logoUrl} alt={exp.company} className="w-16 h-16 rounded-xl object-contain bg-neutral-800 p-2" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <Building className="w-8 h-8 text-neutral-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="text-neutral-400 font-medium">
                    {exp.company} <span className="text-neutral-600 mx-2">•</span> {exp.period}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(exp)}
                    className="p-2 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-4 space-y-1 text-sm text-neutral-300">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        {experiences.length === 0 && !isFormOpen && (
          <div className="py-12 text-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            No experiences found. Add your work history!
          </div>
        )}
      </div>
    </div>
  );
}
