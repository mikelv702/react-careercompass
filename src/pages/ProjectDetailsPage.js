import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Login from '../components/Login';
import { loginUser, getUserProject } from '../api/api';
import ProjectDetails from '../components/ProjectDetails'
import Header from '../components/Header';

function ProjectDetailsPage() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = useParams();
  console.log(projectId)
  useEffect(() => {
    if (token, projectId.projectId) {
      fetchProject();
    }
  }, [token]);


  const handleLogin = async (username, password) => {
      try {
          const response = await loginUser(username, password);
          setToken(response.access_token);
          localStorage.setItem('token', response.access_token);
      } catch (error) {
          console.error('Login failed:', error);
      }
  };

  const fetchProject = async () => {
      try {
          const projectData = await getUserProject(token, projectId.projectId);
          setProject(projectData);
      } catch (error) {
          console.error('Failed to fetch projects:', error);
          if (error.message === 'Unauthorized'){
          localStorage.removeItem('token')
          }
      } finally {
        setLoading(false);
      }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Not Found!</strong>
        <span className="block sm:inline"> Project not found</span>
      </div>
    );
  }
  
  return (
    <div>
        <Header />
      <div className="md:container md:mx-auto">
        <div>

          <div>
            {!token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <ProjectDetails project={project} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;