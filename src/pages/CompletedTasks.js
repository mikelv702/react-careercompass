import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import { loginUser, getTasks, createTask } from '../api/api';
import TaskList from '../components/TaskList';
import Header from '../components/Header';

function CompletedTasks() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      fetchTasks();
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

  const fetchTasks = async () => {
      try {
          const tasksData = await getTasks(token);
          setTasks(tasksData);
      } catch (error) {
          console.error('Failed to fetch tasks:', error);
          if (error.message === 'Unauthorized'){
          localStorage.removeItem('token')
          }
      }
  };

  const handleCreateTask = async (taskDescription) => {
      try {
          await createTask(token, taskDescription);
          fetchTasks();
      } catch (error) {
          console.error('Failed to create task:', error);
      }
  };

  return (
    <div>
        <Header />
      <div className="md:container md:mx-auto">
        <div>

          <div>
            {!token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <TaskList tasks={tasks} onCreateTask={handleCreateTask} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedTasks;