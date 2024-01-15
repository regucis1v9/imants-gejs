// functions/apiRegister.js
const RegisterFunction = (username, email, password) => {
    return fetch('http://localhost:8888/ticketAPI/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
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
        console.error('Error registering:', error);
        throw error;
      });
  };
  
  export default RegisterFunction;
  