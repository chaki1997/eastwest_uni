import React, { useEffect, useRef } from 'react';
import { GoogleButton } from 'react-google-button';

const GoogleAuth = () => {
  const googleButton = useRef(null);

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      if (response.credential) {
        const data = { auth_token: response.credential };
        fetch('http://127.0.0.1:8001/google/', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
          .then((res) => res.json())
          .then((res) => {
            document.getElementById('email_id').innerText = res['email'];
            document.getElementById('auth_token').innerText = res['tokens'];
          });
      }
    };

    const src = 'https://accounts.google.com/gsi/client';
    const id = '611224325015-sf01ca39f2hfis9lh5pf1orptpgp8lms.apps.googleusercontent.com';

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: id,
        // callback: handleCredentialResponse,
      });
     
      window.google.accounts.id.renderButton(googleButton.current, {
        theme: 'outline',
        size: 'large',
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="google-login-btn">
      <div ref={googleButton} id="google-ref"></div>
      
      <div>
        <div>
          <label>Email Id:</label>
          <label id="email_id"></label>
        </div>
        <div>
          <label>Auth token:</label>
          <label id="auth_token"></label>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;