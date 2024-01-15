import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const Verification = () => {
    const { id } = useParams();

    useEffect(() => {
        const verifyToken = Cookies.get('verificationToken');

        if (id === verifyToken) {
            // Send HTTP request to verify.php with the token in the request body
            fetch('http://localhost:8888/ticketAPI/verify.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: verifyToken }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response:', data); // Log the response data
                    // Handle the response data accordingly
                })
                .catch(error => console.error('Error:', error));
        }
    }, [id]);

    return (
        <div className="main">
            {/* Your component JSX */}
        </div>
    );
}

export default Verification;
