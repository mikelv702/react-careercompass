import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import { loginUser, getUserProjects } from '../api/api';
import ProjectList from '../components/ProjectList';
import Header from '../components/Header';

function ProjectsPage() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (token) {
      fetchProjects();
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

  const fetchProjects = async () => {
      try {
          const projectData = await getUserProjects(token);
          setProjects(projectData);
      } catch (error) {
          console.error('Failed to fetch projects:', error);
          if (error.message === 'Unauthorized'){
          localStorage.removeItem('token')
          }
      }
  };

//   const handleCreateProject = async (taskDescription) => {
//       try {
//           await createTask(token, taskDescription);
//           fetchTasks();
//       } catch (error) {
//           console.error('Failed to create task:', error);
//       }
//   };

  return (
    <div>
        <Header />
      <div className="md:container md:mx-auto">
        <div>

          <div>
            {!token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;