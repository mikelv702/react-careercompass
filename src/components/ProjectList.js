import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectList({ projects }) {
  const [newTask, setNewTask] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newTask.trim()) {
//       onCreateTask(newTask);
//       setNewTask('');
//     }
//   };

  return (
    <div className="space-y-6">
      <table className="min-w-full max-w-fit divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-pretty">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id}>
                <td>
                <Link to={`/project/${project.id}`} className="text-blue-600 hover:text-blue-900">
                    {project.title}
                </Link>
                </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {project.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {project.created_at}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {project.custom_status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {project.status_note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="newTask" className="sr-only">
            New Task
          </label>
          <input
            id="newTask"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Task
        </button>
      </form> */}
    </div>
  );
}

export default ProjectList;