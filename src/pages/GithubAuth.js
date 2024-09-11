import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGitHubAuth = async () => {
      // Get the code from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Send the code to your FastAPI endpoint
          const response = await fetch('https://api.cc.cloud.engineerhub.xyz/github-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error('Failed to authenticate');
          }

          const data = await response.json();
          
          // Save the bearer token in localStorage
          localStorage.setItem('token', data.access_token);

          // Redirect to a success page or your app's main page
          navigate('/');
        } catch (error) {
          console.error('Authentication error:', error);
          // Redirect to an error page
          navigate('/auth-error');
        }
      } else {
        console.error('No code found in URL');
        navigate('/auth-error');
      }
    };

    handleGitHubAuth();
  }, [navigate]);

  return <div>Processing GitHub authentication...</div>;
};

export default GitHubAuthHandler;