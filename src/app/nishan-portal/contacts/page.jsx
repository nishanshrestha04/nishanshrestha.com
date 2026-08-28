"use client";

import { useEffect, useState } from 'react';
import { Loader2, Trash2, Mail, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/core/utils/apiClient';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const data = await apiClient('/api/contacts');
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleToggleStatus = async (contact) => {
    const newStatus = contact.status === 'read' ? 'unread' : 'read';
    try {
      await apiClient(`/api/contacts/${contact.id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Marked as ${newStatus}`);
      fetchContacts();
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await apiClient(`/api/contacts/${id}`, { method: 'DELETE' });
      toast.success('Message deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error(error.message || 'Failed to delete message');
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
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contacts / Messages</h1>
        <p className="text-neutral-400">Review messages sent from your portfolio contact form</p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`bg-neutral-900 border rounded-2xl p-6 transition-colors ${
              contact.status === 'unread' 
                ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0 flex flex-col items-center justify-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  contact.status === 'unread' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  <Mail className="w-6 h-6" />
                </div>
                {contact.status === 'unread' && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">New</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                    <a href={`mailto:${contact.email}`} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                      {contact.email}
                    </a>
                  </div>
                  <div className="text-sm text-neutral-500">
                    {new Date(contact.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-neutral-950 rounded-xl p-4 text-neutral-300 whitespace-pre-wrap border border-neutral-800 mb-4">
                  {contact.message}
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleToggleStatus(contact)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    {contact.status === 'unread' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Mark as Read
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" /> Mark as Unread
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-neutral-800 rounded-2xl text-neutral-500">
            No messages yet. They will appear here when someone contacts you!
          </div>
        )}
      </div>
    </div>
  );
}
