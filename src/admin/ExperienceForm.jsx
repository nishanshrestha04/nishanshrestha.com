import { useState } from 'react';
import { toast } from 'sonner';

export default function ExperienceForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    job: '',
    date: '',
    contents: ['', '', ''],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, value) => {
    const newContents = [...formData.contents];
    newContents[index] = value;
    setFormData(prev => ({ ...prev, contents: newContents }));
  };

  const addContent = () => {
    setFormData(prev => ({
      ...prev,
      contents: [...prev.contents, '']
    }));
  };

  const removeContent = (index) => {
    if (formData.contents.length > 1) {
      setFormData(prev => ({
        ...prev,
        contents: prev.contents.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const password = prompt('Enter admin password:');
      if (!password) {
        toast.error('Password required');
        setLoading(false);
        return;
      }

      // Prepare experience data
      const experienceData = {
        ...formData,
        contents: formData.contents.filter(c => c.trim() !== ''),
      };

      // Submit experience
      toast.info('Adding experience to GitHub...');
      const response = await fetch('/api/add-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, experience: experienceData }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          'API routes are not available. Please use "vercel dev" instead of "yarn dev" for local testing, or deploy to Vercel to use the admin panel.'
        );
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Experience added successfully! 🎉');
        // Reset form
        setFormData({
          title: '',
          job: '',
          date: '',
          contents: ['', '', ''],
        });
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.error || 'Failed to add experience');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Experience</h2>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Software Engineer"
          />
        </div>

        {/* Company/Organization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company/Organization *
          </label>
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Tech Company Inc."
          />
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range *
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Jan 2024 - Present"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Format: "Month Year - Month Year" or "Month Year - Present"
          </p>
        </div>

        {/* Content Points */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Responsibilities & Achievements *
          </label>
          {formData.contents.map((content, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={`Point ${index + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeContent(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                disabled={formData.contents.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addContent}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + Add Point
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Experience...' : 'Add Experience'}
        </button>
      </div>
    </form>
  );
}
