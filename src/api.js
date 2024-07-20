const API_URL = 'http://127.0.0.1:8000'; // Replace with your actual API URL

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

  return response.json();
};

export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/quicktask/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const createTask = async (token, description) => {
  const response = await fetch(`${API_URL}/quicktask/`, {
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

  return response.json();
};