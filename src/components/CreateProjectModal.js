import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/api';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreation, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimated_due: '',
    custom_status: '',
    completed: false,
    status_note: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, estimated_due, custom_status, completed, status_note } = formData;
      const result = await createProject(token, title, description, estimated_due, custom_status, completed, status_note);
      console.log('Project created:', result);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Project</h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="estimated_due" className="block text-sm font-medium text-gray-700">Estimated Due Date</label>
              <input
                type="datetime-local"
                id="estimated_due"
                name="estimated_due"
                value={formData.estimated_due}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="custom_status" className="block text-sm font-medium text-gray-700">Custom Status</label>
              <input
                type="text"
                id="custom_status"
                name="custom_status"
                value={formData.custom_status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">Completed</label>
            </div>
            <div className="mb-4">
              <label htmlFor="status_note" className="block text-sm font-medium text-gray-700">Status Note</label>
              <textarea
                id="status_note"
                name="status_note"
                value={formData.status_note}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CreateProjectButton = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Project
      </button>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={token} />
    </>
  );
};

export { CreateProjectModal, CreateProjectButton };