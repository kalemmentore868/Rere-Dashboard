'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './signup.module.css';
import InvestmentForm from './InvestmentForm';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(''); // State for role input
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
          const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP || '', {
            email,
            password,
            wallet_address: walletAddress,
            first_name: firstName,
            last_name: lastName,
            role, // Include role in the request body
          });
          // Handle successful sign-up
          console.log(response.data);
          // Clear the form fields
          setEmail('');
          setPassword('');
          setWalletAddress('');
          setFirstName('');
          setLastName('');
          setRole(''); // Clear role input
          // Set success message
          setError('User registered');
        } catch (error) {
          console.error('Error signing up:', error);
          setError('An error occurred during sign-up. Please try again.');
        }
      };

  return (
    <>
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
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>
            <select
              className={styles.input}
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button className={styles.button} type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>

      
    </div>
    <div className={styles.formContainer}>
        <InvestmentForm onSubmit={() => console.log('Investment created')} />
    </div>
    </>
  );
};

export default SignUpPage;
