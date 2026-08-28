"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    overview: '',
    problem: '',
    approach: '',
    architecture: '',
    technologies: '',
    imageFile: null,
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    isFeatured: false,
    orderIndex: 0,
  });

  const fetchProjects = async () => {
    try {
      const data = await apiClient('/api/projects');
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenForm = (project = null) => {
    if (project) {
      setFormData({
        ...project,
        title: project.title || '',
        category: project.category || '',
        overview: project.overview || '',
        problem: project.problem || '',
        approach: project.approach || '',
        architecture: (project.architecture || []).join(', '),
        technologies: (project.technologies || []).join(', '),
        imageUrl: project.imageUrl || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        isFeatured: project.isFeatured || false,
        orderIndex: project.orderIndex ?? 0,
        imageFile: null,
      });
      setEditingId(project.id);
    } else {
      setFormData({
        title: '',
        category: '',
        overview: '',
        problem: '',
        approach: '',
        architecture: '',
        technologies: '',
        imageFile: null,
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
        isFeatured: false,
        orderIndex: projects.length,
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
    formDataObj.append('title', formData.title);
    formDataObj.append('category', formData.category);
    formDataObj.append('overview', formData.overview);
    formDataObj.append('problem', formData.problem);
    formDataObj.append('approach', formData.approach);
    
    // Arrays need to be stringified for multipart/form-data as per backend logic
    formDataObj.append('architecture', JSON.stringify(formData.architecture.split(',').map(s => s.trim()).filter(Boolean)));
    formDataObj.append('technologies', JSON.stringify(formData.technologies.split(',').map(s => s.trim()).filter(Boolean)));
    
    formDataObj.append('liveUrl', formData.liveUrl);
    formDataObj.append('githubUrl', formData.githubUrl);
    formDataObj.append('isFeatured', formData.isFeatured);
    formDataObj.append('orderIndex', parseInt(formData.orderIndex) || 0);

    if (formData.imageFile) {
      formDataObj.append('image', formData.imageFile);
    }

    try {
      if (editingId) {
        await apiClient(`/api/projects/${editingId}`, {
          method: 'PUT',
          body: formDataObj,
        });
        toast.success('Project updated successfully');
      } else {
        await apiClient('/api/projects', {
          method: 'POST',
          body: formDataObj,
        });
        toast.success('Project created successfully');
      }
      fetchProjects();
      handleCloseForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await apiClient(`/api/projects/${id}`, { method: 'DELETE' });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error(error.message || 'Failed to delete project');
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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-neutral-400">Manage your portfolio projects</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => handleOpenForm()}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
            <button onClick={handleCloseForm} className="text-neutral-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Overview</label>
              <textarea
                rows="3"
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Problem</label>
                <textarea
                  rows="3"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Approach</label>
                <textarea
                  rows="3"
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="React, Next.js, Tailwind"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Architecture (Comma separated)</label>
                <input
                  type="text"
                  value={formData.architecture}
                  onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Microservices, Serverless, Edge"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
                
                {(formData.imageFile || formData.imageUrl) && (
                  <div className="mt-3 relative w-full h-40 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                    <img 
                      src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl} 
                      alt="Project Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Live URL</label>
                <input
                  type="text"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">GitHub URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500 bg-neutral-950"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-300">
                Is Featured
              </label>
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:border-neutral-700 transition-colors">
            {project.imageUrl ? (
              <div className="h-40 bg-neutral-800 w-full overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-40 bg-neutral-800 flex items-center justify-center text-neutral-600">
                No Image
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white line-clamp-1">{project.title}</h3>
                {project.isFeatured && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-medium shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-1">
                {project.overview || 'No overview provided.'}
              </p>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  onClick={() => handleOpenForm(project)}
                  className="p-2 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && !isFormOpen && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            No projects found. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
