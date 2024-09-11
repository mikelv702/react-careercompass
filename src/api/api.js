// const API_URL = 'http://docker03.lab.engineerhub.xyz:8001'; // Replace with your actual API URL
const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${username}&password=${password}`,
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  console.log('Logging in....')
  return response.json();
};

export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/task`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 401){
    throw new Error('Unauthorized');
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log('Getting tasks...')
  return response.json();
};

export const createTask = async (token, description) => {
  const response = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'description':description }),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  console.log('Creating task...')
  return response.json();
};