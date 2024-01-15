// ../functions/LoginFunction.js
const LoginFunction = (username, password) => {
  return fetch('http://localhost:8888/ticketAPI/login.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username,
          password,
      }),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => data)
      .catch(error => {
          console.error('Error logging in:', error);
          throw error;
      });
};

export default LoginFunction; // Use default export here
