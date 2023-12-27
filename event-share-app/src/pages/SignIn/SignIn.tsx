// Import necessary libraries and components
import React, { useState } from 'react';
import '../SignIn/signin.css'
import logo from '../../images/northeastern-logo-black-uls.svg';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer/Footer';

// Define the SignIn component
const SignIn: React.FC = () => {
  const { t } = useTranslation('common');
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    var gmailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;

    if (!username || !password) {
      setErrors({
        username: !username ? 'Northeastern email is required.' : '',   // Check for a username
        password: !password ? 'Password is required.' : '',   // Check for password
      });
      return;
    }

    if (!gmailRegex.test(username)) {
      setErrors({
        username: 'Enter a valid Northeastern email.',   // Check for a Valid northeastern email address
        password: 'Invalid password.'
      });
      return;
    }

    //Check for valid Admin=> username: admin | password: admin
    if (username.toLowerCase() === 'admin@northeastern.edu' && password.toLowerCase() === 'admin') {
      // Set session storage to indicate admin login
      sessionStorage.setItem('isAdmin', JSON.stringify(true));
    }
    else {
      sessionStorage.setItem('isAdmin', JSON.stringify(false));
    }

    // Simulate successful login by using session storage to store a flag indicating the user is logged in.
    sessionStorage.setItem('isLoggedIn', 'true');
    // Redirect to the event page
    window.location.href = '/event';
  };

  // JSX for the SignIn component
  return (
    <><div className="login">
      <Link href="https://www.northeastern.edu/" target="_blank">
        <img src={logo} alt='Northeastern Logo' />
      </Link>
      <h2>{t('button1')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="loginLabel">
          <label>{t('login1')} </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: '' });
            } } />
          <span className='error' style={{ color: 'red' }}>{errors.username}</span>
        </div>
        <div className="loginLabel">
          <label>{t('login2')} </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' });
            } } />
          <span className='error' style={{ color: 'red' }}>{errors.password}</span>
        </div>
        <div className="loginLabelButton">
          <button className="submit" type="submit">{t('login3')}</button>
        </div>
      </form>
    </div><Footer /></>
  );
};

export default SignIn;
