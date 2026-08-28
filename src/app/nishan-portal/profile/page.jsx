"use client";

import { useEffect, useState } from 'react';
import { Save, Loader2, Key, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCreds, setSavingCreds] = useState(false);

  // Profile State
  const [email, setEmail] = useState('');
  const [socials, setSocials] = useState([]);
  const [currentlyExploring, setCurrentlyExploring] = useState([]);

  // Credentials State
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await apiClient('/api/profile');
        if (data) {
          setEmail(data.email || '');
          setNewEmail(data.email || '');
          setSocials(data.socials || []);
          setCurrentlyExploring(data.currentlyExploring || []);
        }
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          socials,
          currentlyExploring,
        }),
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCredentialsUpdate = async (e) => {
    e.preventDefault();
    setSavingCreds(true);
    try {
      const payload = {};
      if (newEmail !== email) payload.email = newEmail;
      if (newPassword) payload.password = newPassword;

      if (Object.keys(payload).length === 0) {
        toast.info('No changes to credentials');
        setSavingCreds(false);
        return;
      }

      await apiClient('/api/auth/update', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      
      toast.success('Credentials updated successfully. You may need to log in again.');
      if (newPassword) setNewPassword('');
      setEmail(newEmail);
    } catch (error) {
      toast.error(error.message || 'Failed to update credentials');
    } finally {
      setSavingCreds(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Security & Credentials */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
            <Key className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Login Credentials</h2>
          </div>
          
          <form onSubmit={handleCredentialsUpdate} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">New Password (leave blank to keep current)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingCreds}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg py-2.5 px-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {savingCreds ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Update Credentials
            </button>
          </form>
        </section>

        {/* Public Profile Data */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white">Public Data</h2>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            
            <div>
              <h3 className="text-md font-semibold text-white mb-3">Social Links</h3>
              <div className="space-y-3">
                {socials.map((social, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={social.name}
                      onChange={(e) => {
                        const newSocials = [...socials];
                        newSocials[idx].name = e.target.value;
                        setSocials(newSocials);
                      }}
                      placeholder="Platform (e.g. GitHub)"
                      className="w-1/3 bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      value={social.href}
                      onChange={(e) => {
                        const newSocials = [...socials];
                        newSocials[idx].href = e.target.value;
                        setSocials(newSocials);
                      }}
                      placeholder="URL"
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setSocials(socials.filter((_, i) => i !== idx))}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSocials([...socials, { name: '', href: '' }])}
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  + Add Social Link
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold text-white mb-3">Currently Exploring</h3>
              <div className="space-y-3">
                {currentlyExploring.map((topic, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => {
                        const newTopics = [...currentlyExploring];
                        newTopics[idx] = e.target.value;
                        setCurrentlyExploring(newTopics);
                      }}
                      placeholder="Topic (e.g. Next.js 15)"
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 px-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentlyExploring(currentlyExploring.filter((_, i) => i !== idx))}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentlyExploring([...currentlyExploring, ''])}
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  + Add Topic
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-medium rounded-lg py-2.5 px-6 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Public Data
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
}
