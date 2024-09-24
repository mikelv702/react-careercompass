import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProject, updateProject } from '../api/api';

function ProjectDetailsUpdate({ project: initialProject }) {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem('token'));
  const [project, setProject] = useState(initialProject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(token, projectId);
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    setEditValue(project[field]);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const updatedProject = await updateProject(token, project.id, { [editingField]: editValue });
      setProject(updatedProject);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderEditModal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit {editingField}</h2>
          {editingField === 'description' ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              rows="4"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderField = (label, value, field) => (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
        {value}
        <button
          onClick={() => handleEditClick(field)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Edit
        </button>
      </dd>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Project Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Detailed information about the project.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {renderField("Project ID", project.id, "id")}
            {renderField("Project Title", project.title, "title")}
            {renderField("Project Status", project.custom_status, "custom_status")}
            {renderField("Description", project.description, "description")}
            {renderField("Start Date/Estimated Completion Date", `${project.created_at}/${project.estimated_due}`, "estimated_due")}
            {renderField("Project Status Note", project.status_note, "status_note")}
          </dl>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleDeleteProject(project.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Project
        </button>
      </div>
      {renderEditModal()}
    </div>
  );
}

export default ProjectDetailsUpdate;