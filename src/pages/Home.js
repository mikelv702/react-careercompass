import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import TaskList from '../components/TaskList';
import { loginUser, getTasks, createTask } from '../api/api';
import Header from '../components/Header';
import HomeContent from '../components/HomeContent';

function Home() {
  const [token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
    if (token) {
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

  return (
    <div>
        <Header />
      <div className="md:container md:mx-auto">
        <div>

          <div>
            {!token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <HomeContent />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;