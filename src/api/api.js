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

export const getUserProjects = async (token) => {
  const response = await fetch(`${API_URL}/projects/`, {
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
  console.log('Getting projects...')
  return response.json();
}

export const getUserProject = async (token, projectId) => {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
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
  console.log('Getting project...')
  return response.json();
}

export const createProject = async (token,title, description, estimated_due, custom_status, completed, status_note) => {
  const response = await fetch(`${API_URL}/projects/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      'title':title, 
      'description':description, 
      'estimated_due':estimated_due,
      'custom_status':custom_status,
      'completed': completed, 
      'status_note': status_note
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Project');
  }
  console.log('Creating Project...')
  return response.json();
};

export const deleteProject = async (token, projectId) => {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
  console.log('Deleting Project...')
  return response.json();
};

export const updateProject = async (token, projectId, updatedFields) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Assuming the API returns the updated project

  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};