"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from './signup.module.css';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
  
    const handleSignUp = async () => {
        // Password complexity validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
          setPasswordError(
            'Password must be at least 8 characters long and contain at least one uppercase letter and one digit.'
          );
          return;
        } else {
          setPasswordError(null);
        }
    
        try {
          const response = await axios.post('http://localhost:3002/auth/signup', {
            email,
            password,
            wallet_address: walletAddress,
            first_name: firstName,
            last_name: lastName,
          });
          // Handle successful sign-up
          console.log(response.data);
          // Clear the form fields
          setEmail('');
          setPassword('');
          setWalletAddress('');
          setFirstName('');
          setLastName('');
          // Set success message
          setError('User registered');
        } catch (error) {
          console.error('Error signing up:', error);
          setError('An error occurred during sign-up. Please try again.');
        }
      };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form}>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="walletAddress">
              Wallet Address
            </label>
            <input
              className={styles.input}
              id="walletAddress"
              type="text"
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              className={styles.input}
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={styles.input}
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button className={styles.button} type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
