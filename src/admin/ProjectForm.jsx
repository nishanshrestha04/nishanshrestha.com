import { useState } from 'react';
import { toast } from 'sonner';

export default function ProjectForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subDescription: ['', '', ''],
    href: '',
    image: '',
    logo: '',
    tags: [{ id: 1, name: '', path: '' }],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubDescriptionChange = (index, value) => {
    const newSubDesc = [...formData.subDescription];
    newSubDesc[index] = value;
    setFormData(prev => ({ ...prev, subDescription: newSubDesc }));
  };

  const addSubDescription = () => {
    setFormData(prev => ({
      ...prev,
      subDescription: [...prev.subDescription, '']
    }));
  };

  const removeSubDescription = (index) => {
    if (formData.subDescription.length > 1) {
      setFormData(prev => ({
        ...prev,
        subDescription: prev.subDescription.filter((_, i) => i !== index)
      }));
    }
  };

  const handleTagChange = (index, field, value) => {
    const newTags = [...formData.tags];
    newTags[index][field] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, { id: prev.tags.length + 1, name: '', path: '' }]
    }));
  };

  const removeTag = (index) => {
    if (formData.tags.length > 1) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (password) => {
    if (!imageFile) return null;

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64 = reader.result.split(',')[1];
          const fileName = `${Date.now()}-${imageFile.name}`;

          const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              password,
              fileName,
              base64Content: base64,
              type: 'project',
            }),
          });

          const data = await response.json();
          if (data.success) {
            resolve(data.data.path);
          } else {
            reject(new Error(data.error));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(imageFile);
    });
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

      // Upload image if present
      let imagePath = formData.image;
      if (imageFile) {
        toast.info('Uploading image...');
        imagePath = await uploadImage(password);
        toast.success('Image uploaded!');
      }

      // Prepare project data
      const projectData = {
        ...formData,
        image: imagePath,
        subDescription: formData.subDescription.filter(s => s.trim() !== ''),
        tags: formData.tags.filter(t => t.name.trim() !== ''),
      };

      // Submit project
      toast.info('Adding project to GitHub...');
      const response = await fetch('/api/add-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, project: projectData }),
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
        toast.success('Project added successfully! 🎉');
        // Reset form
        setFormData({
          title: '',
          description: '',
          subDescription: ['', '', ''],
          href: '',
          image: '',
          logo: '',
          tags: [{ id: 1, name: '', path: '' }],
        });
        setImageFile(null);
        setImagePreview('');
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.error || 'Failed to add project');
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., AI-Powered Chatbot"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="A brief one-liner about your project..."
          />
        </div>

        {/* Sub Descriptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Detailed Descriptions *
          </label>
          {formData.subDescription.map((desc, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => handleSubDescriptionChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={`Detailed point ${index + 1}...`}
              />
              <button
                type="button"
                onClick={() => removeSubDescription(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                disabled={formData.subDescription.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubDescription}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + Add Description
          </button>
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project URL *
          </label>
          <input
            type="url"
            name="href"
            value={formData.href}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="https://github.com/username/repo"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Screenshot *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-w-full h-48 object-cover rounded-lg" />
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Technology Tags *
          </label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag.name}
                onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., React"
              />
              <input
                type="text"
                value={tag.path}
                onChange={(e) => handleTagChange(index, 'path', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="/assets/logos/react.svg"
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                disabled={formData.tags.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            + Add Tag
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Project...' : 'Add Project'}
        </button>
      </div>
    </form>
  );
}
