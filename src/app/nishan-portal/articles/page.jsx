"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, X, Save, FileText, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    contentUrl: '',
    coverImageUrl: '',
    publishedDate: '',
    readTime: 0,
    tags: '',
    orderIndex: 0,
  });

  const fetchArticles = async () => {
    try {
      const data = await apiClient('/api/articles');
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenForm = (article = null) => {
    if (article) {
      setFormData({
        ...article,
        title: article.title || '',
        brief: article.brief || '',
        contentUrl: article.contentUrl || '',
        coverImageUrl: article.coverImageUrl || '',
        readTime: article.readTime || 0,
        orderIndex: article.orderIndex ?? 0,
        tags: (article.tags || []).join(', '),
        // format date for input if it exists
        publishedDate: article.publishedDate ? new Date(article.publishedDate).toISOString().split('T')[0] : '',
      });
      setEditingId(article.id);
    } else {
      setFormData({
        title: '',
        brief: '',
        contentUrl: '',
        coverImageUrl: '',
        publishedDate: '',
        readTime: 0,
        tags: '',
        orderIndex: articles.length,
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
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      readTime: parseInt(formData.readTime) || 0,
      orderIndex: parseInt(formData.orderIndex) || 0,
      publishedDate: formData.publishedDate ? new Date(formData.publishedDate).toISOString() : null,
    };

    try {
      if (editingId) {
        await apiClient(`/api/articles/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        toast.success('Article updated successfully');
      } else {
        await apiClient('/api/articles', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        toast.success('Article created successfully');
      }
      fetchArticles();
      handleCloseForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await apiClient(`/api/articles/${id}`, { method: 'DELETE' });
      toast.success('Article deleted successfully');
      fetchArticles();
    } catch (error) {
      toast.error(error.message || 'Failed to delete article');
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
          <h1 className="text-3xl font-bold text-white mb-2">Articles</h1>
          <p className="text-neutral-400">Manage your blog posts and publications</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => handleOpenForm()}
            className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Article
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Article' : 'New Article'}</h2>
            <button onClick={handleCloseForm} className="text-neutral-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="text-sm font-medium text-neutral-300">Brief / Summary</label>
              <textarea
                rows="3"
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Content URL (e.g. Medium/Hashnode link)</label>
                <input
                  type="text"
                  value={formData.contentUrl}
                  onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Read Time (minutes)</label>
                <input
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
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
              <label className="text-sm font-medium text-neutral-300">Tags (Comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-emerald-500"
                placeholder="React, Tutorial, Performance"
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

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:border-neutral-700 transition-colors">
            {article.coverImageUrl ? (
              <div className="h-40 bg-neutral-800 w-full overflow-hidden">
                <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-40 bg-neutral-800 flex items-center justify-center text-neutral-600">
                <FileText className="w-10 h-10" />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">{article.title}</h3>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-1">
                {article.brief || 'No summary provided.'}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                {article.publishedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.publishedDate).toLocaleDateString()}
                  </div>
                )}
                {article.readTime > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} min read
                  </div>
                )}
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                {article.contentUrl ? (
                  <a href={article.contentUrl} target="_blank" rel="noreferrer" className="text-sm text-emerald-400 hover:text-emerald-300">
                    View Original
                  </a>
                ) : <span />}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(article)}
                    className="p-2 text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && !isFormOpen && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            No articles found. Start writing!
          </div>
        )}
      </div>
    </div>
  );
}
