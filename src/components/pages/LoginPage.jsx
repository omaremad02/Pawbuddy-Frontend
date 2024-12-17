import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../common/Field'; // Import the reusable Field component
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Admin');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login submitted with user role:", userRole);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log In</h1>
        <p className={styles.subtitle}>Please enter your credentials.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <Field
            label="Email"
            type="email"
            placeholder="Your email"
            required
          />
          <Field
            label="Password"
            type="password"
            placeholder="Password"
            required
          />
          <div className={styles.roleSelection}>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Admin"
                checked={userRole === 'Admin'}
                onChange={() => handleRoleChange('Admin')}
              />
              Admin
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Clinic"
                checked={userRole === 'Clinic'}
                onChange={() => handleRoleChange('Clinic')}
              />
              Clinic
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Shelter"
                checked={userRole === 'Shelter'}
                onChange={() => handleRoleChange('Shelter')}
              />
              Shelter
            </label>
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={() => navigate("/dashboard")}
          >
            Log In
          </button>
        </form>
        <p className={styles.footer}>
          Not with us?{' '}
          <span
            className={styles.link}
            onClick={() => navigate("/apply")}
          >
            Apply!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
