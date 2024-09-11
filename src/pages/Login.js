import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubLoginInitiator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initiateGitHubLogin = async () => {
      try {
        const response = await fetch('https://api.cc.cloud.engineerhub.xyz/login');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub login URL');
        }
        const data = await response.json();
        
        // Redirect to the GitHub login URL
        window.location.href = data.url;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initiateGitHubLogin();
  }, []);

  if (isLoading) {
    return <div>Initiating GitHub login...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  // This return is unlikely to be reached as the component will redirect,
  // but it's good to have for completeness
  return null;
};

export default GitHubLoginInitiator;