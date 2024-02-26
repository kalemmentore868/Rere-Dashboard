"use client"
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './style.module.css';

interface ErrorResponse {
  message: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    // Front-end validation
    if (!email) {
      setEmailError('Email is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }

    if (!email || !password) {
      return; // Stop further execution if any field is empty
    }

    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password,
      });
      // Handle successful login, e.g., redirect user to dashboard
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('An unknown error occurred during login.');
        }
      } else {
        setError('A network error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={`${styles.input} ${emailError ? styles.errorInput : ''}`}
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={`${styles.input} ${passwordError ? styles.errorInput : ''}`}
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
          <button className={styles.button} type="button" onClick={handleLogin}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
