'use client'

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  wallet_address: string;
  role: string;
  investments: Investment[]; // Add investments property to User interface
}


interface Investment {
  _id: string;
  user_id: User;
  initial_investment: number;
  total_return: number;
  imo_deposit_amount: number;
  createdAt: Date;
  status: string;
}

const InvestmentsTable = ({ investments, handleUserClick }: { investments: Investment[], handleUserClick: (userId: string) => void }) => (
    <div style={{ marginBottom: '20px' }}>
      <h2>Investments Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>User</th>
            <th style={tableHeaderStyle}>Initial Investment</th>
            <th style={tableHeaderStyle}>Total Return</th>
            <th style={tableHeaderStyle}>IMO Deposit Amount</th>
            <th style={tableHeaderStyle}>Created At</th>
            <th style={tableHeaderStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {investments?.length > 0 ? (
            investments.map((investment) => (
              <tr key={investment._id}>
                <td style={{ ...tableCellStyle, cursor: 'pointer' }} onClick={() => handleUserClick(investment.user_id._id)}>
                  {investment.user_id.first_name} {investment.user_id.last_name}
                </td>
                <td style={tableCellStyle}>{investment.initial_investment}</td>
                <td style={tableCellStyle}>{investment.total_return}</td>
                <td style={tableCellStyle}>{investment.imo_deposit_amount}</td>
                <td style={tableCellStyle}>{new Date(investment.createdAt).toLocaleString()}</td> {/* Format createdAt */}
                <td style={tableCellStyle}>{investment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ ...tableCellStyle, textAlign: 'center' }} colSpan={6}>No investments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  

  const UserDetailsTable = ({ user }: { user: User | null }) => (
    <div style={{ marginBottom: '20px' }}>
      <h2>User Details Table</h2>
      {user ? (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>First Name</th>
                <th style={tableHeaderStyle}>Last Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Wallet Address</th>
                <th style={tableHeaderStyle}>Role</th>
                <th style={tableHeaderStyle}>Initial Investment</th>
                <th style={tableHeaderStyle}>Total Return</th>
                <th style={tableHeaderStyle}>IMO Deposit Amount</th>
                <th style={tableHeaderStyle}>Created At</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableCellStyle}>{user.first_name}</td>
                <td style={tableCellStyle}>{user.last_name}</td>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.wallet_address}</td>
                <td style={tableCellStyle}>{user.role}</td>
                {/* Render empty cells for user details */}
                <td style={tableCellStyle}></td>
                <td style={tableCellStyle}></td>
                <td style={tableCellStyle}></td>
                <td style={tableCellStyle}></td>
                <td style={tableCellStyle}></td>
              </tr>
              {/* Render investments */}
              {user.investments?.map((investment) => (
                <tr key={investment._id}>
                  <td colSpan={5}></td> {/* Empty cells for user details */}
                  <td style={tableCellStyle}>{investment.initial_investment}</td>
                  <td style={tableCellStyle}>{investment.total_return}</td>
                  <td style={tableCellStyle}>{investment.imo_deposit_amount}</td>
                  <td style={tableCellStyle}>{new Date(investment.createdAt).toLocaleString()}</td>
                  <td style={tableCellStyle}>{investment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  );
  
  

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const IndexPage = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('http://localhost:3002/investments');
        if (response.ok) {
          const data = await response.json();
          setInvestments(data);
        } else {
          setError('Failed to fetch investments: ' + response.statusText);
        }
      }  catch (error) {
        const errorMessage = `Error fetching investments:: ${error}`;
        setError(errorMessage); // Set error as string
      }
    };


   
    fetchInvestments();
  }, []);

  const handleUserClick = async (userId: string) => {
    try {
      // Fetch user details
      const userResponse = await fetch(`http://localhost:3002/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error(`Failed to fetch user details: ${userResponse.statusText}`);
      }
      const userData = await userResponse.json();
  
      // Fetch investments related to the user
      const investmentResponse = await fetch(`http://localhost:3002/investments/${userId}`);
      if (!investmentResponse.ok) {
        throw new Error(`Failed to fetch investments: ${investmentResponse.statusText}`);
      }
      const investmentData = await investmentResponse.json();
  
      // Merge user details with associated investments
      const userWithInvestments: User = {
        ...userData,
        investments: investmentData,
      };
  
      setSelectedUser(userWithInvestments);
      setError('');
    } catch (error) {
      const errorMessage = `Error fetching investment details: ${error}`;
      setError(errorMessage); // Set error as string
    }
  };
  
  

  return (
    <div>
      <h1>Investments</h1>
      {error && <p>{error}</p>}
      <InvestmentsTable investments={investments} handleUserClick={handleUserClick} />
      <UserDetailsTable user={selectedUser} />
    </div>
  );
};

export default IndexPage;
