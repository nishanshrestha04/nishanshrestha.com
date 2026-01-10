import { useState } from 'react';
import { Toaster } from 'sonner';
import ProjectForm from './ProjectForm';
import ExperienceForm from './ExperienceForm';
import { myProjects, experiences } from '../constants';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📝 Admin Panel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your portfolio content with ease
          </p>
          
          {/* Development Warning */}
          {import.meta.env.DEV && (
            <div className="mt-4 max-w-3xl mx-auto bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ <strong>Development Mode:</strong> API routes require Vercel CLI. Run <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">vercel dev</code> instead of <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">yarn dev</code> to test the admin panel locally.
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-sm bg-white dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Projects ({myProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'experiences'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Experiences ({experiences.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">
          {activeTab === 'projects' ? (
            <>
              <ProjectForm onSuccess={() => window.location.reload()} />
              
              {/* Existing Projects List */}
              <div className="mt-12 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Existing Projects
                </h3>
                <div className="space-y-4">
                  {myProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <ExperienceForm onSuccess={() => window.location.reload()} />
              
              {/* Existing Experiences List */}
              <div className="mt-12 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Existing Experiences
                </h3>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.job}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {exp.date}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {exp.contents.slice(0, 2).map((content, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                            • {content}
                          </li>
                        ))}
                        {exp.contents.length > 2 && (
                          <li className="text-sm text-gray-500 dark:text-gray-500">
                            ... and {exp.contents.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Box */}
        <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            ℹ️ How it works
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Fill out the form to add new content</li>
            <li>• Your changes are committed directly to GitHub</li>
            <li>• Vercel automatically deploys the updated site</li>
            <li>• Changes go live in ~1 minute</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
