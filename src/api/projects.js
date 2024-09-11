const API_URL = process.env.REACT_APP_API_URL;

export const getProjects = async (token) => {
    const response = await fetch(`${API_URL}/projects`, {
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
  };