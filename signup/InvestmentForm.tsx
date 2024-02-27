import React, { useState } from 'react';
import axios from 'axios';
import styles from './investmentform.module.css'; // Import CSS module for styling

interface InvestmentFormProps {
  onSubmit: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [totalReturn, setTotalReturn] = useState('');
  const [imoDepositAmount, setImoDepositAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3002/investments/create', {
        email,
        initial_investment: parseFloat(initialInvestment), // Convert to number
        total_return: parseFloat(totalReturn), // Convert to number
        imo_deposit_amount: parseFloat(imoDepositAmount), // Convert to number
      });
      // Handle successful submission
      console.log(response.data);
      // Clear the form fields
      setEmail('');
      setInitialInvestment('');
      setTotalReturn('');
      setImoDepositAmount('');
      // Call the onSubmit callback
      onSubmit();
    } catch (error) {
      console.error('Error creating investment:', error);
      setError('An error occurred while creating the investment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Create Investment</h2>
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
            <label className={styles.label} htmlFor="initialInvestment">
              Initial Investment
            </label>
            <input
              className={styles.input}
              id="initialInvestment"
              type="number"
              placeholder="Initial Investment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="totalReturn">
              Total Return
            </label>
            <input
              className={styles.input}
              id="totalReturn"
              type="number"
              placeholder="Total Return"
              value={totalReturn}
              onChange={(e) => setTotalReturn(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="imoDepositAmount">
              IMO Deposit Amount
            </label>
            <input
              className={styles.input}
              id="imoDepositAmount"
              type="number"
              placeholder="IMO Deposit Amount"
              value={imoDepositAmount}
              onChange={(e) => setImoDepositAmount(e.target.value)}
            />
          </div>
          <button className={styles.button} type="button" onClick={handleSignUp}>
            Create Investment
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestmentForm;
