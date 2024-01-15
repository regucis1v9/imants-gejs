// functions/sendVerificationEmail.js
const VerificationFunction = (email) => {
    return fetch('http://localhost:8888/ticketAPI/sendEmail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(emailResponse => {
        if (!emailResponse.ok) {
          throw new Error('Network response for sending email was not ok');
        }
        return emailResponse.json();
      })
      .then(emailData => emailData)
      .catch(emailError => {
        console.error('Error sending email:', emailError);
        throw emailError;
      });
  };
  
  export default VerificationFunction;
  