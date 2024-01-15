import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if your cookie is set
      const isAuthenticated = Cookies.get('token');

      // Exclude specific paths from authentication check
      const excludedPaths = ['/login'];
      if (isAuthenticated || excludedPaths.includes(location.pathname)) {
        return;
      }

      const username = Cookies.get('username');

      // If the username is not empty, perform logout fetch
      if (username !== '') {
        try {
          // Fetch logout API with the username
          const response = await fetch(`http://localhost:8888/ticketAPI/logout.php?username=${username}`);
          
          // Check if the logout was successful (you might need to adjust based on your API response)
          if (response.ok) {
            console.log('Logout successful');
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout fetch:', error);
        }
      }

      // Unset cookies and redirect to the login page
      Cookies.set('username', '');
      Cookies.set('token', '');
      Cookies.set('role', '');
      navigate('/login');
    };

    checkAuthentication();
  }, [navigate, location.pathname]);

  return <div>{children}</div>;
};

export default AuthWrapper;