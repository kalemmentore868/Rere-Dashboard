import { useEffect, useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user }) => {
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const fetchInvestments = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/investments/${user._id}`
    );
    if(response.data.length > 0){
      setInvestments(response.data);
    }else{
      setMessage('You currently have not made any investments')
    }
  };

  const handleStatusClick = () => {
    // Check if any investment has status 'Ready for Deposit'
    const readyForDeposit = investments.some(investment => investment.status === 'Withdraw Funds');
    if (readyForDeposit) {
      // Redirect to /dashboard
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    
    fetchInvestments();
  }, [user]);
  const navigate = useNavigate();
  useEffect(() => {
    // Function to check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile devices
    };

    // Check on mount (initial load)
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title style={{ color: "#007bff" }}>
            Welcome, {user.first_name} {user.last_name}. {message}
          </Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Wallet Address:</strong>{" "}
            <span style={{ color: "#28a745" }}>{
              user.wallet_address.replace( user.wallet_address.substring(3,39), '...')}
              </span>
          </Card.Text>
        </Card.Body>
      </Card>

      {investments.length > 0 && (
        <Card>
          <Card.Header>
            <strong>Your Investments {isMobile && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          Scroll to the right for more info
        </div>
      )}</strong>
          </Card.Header>
          <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Date</th>
      <th>Initial Investment</th>
      <th>Total Return</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {investments.map((investment) => (
      <tr key={investment._id}>
        <td>{new Date(investment.createdAt).toLocaleDateString()}</td>
        <td>${investment.initial_investment}</td>
        <td>${investment.total_return}</td>
        <td onClick={handleStatusClick} style={{ color: investment.status === 'Withdraw Funds' ? 'blue' : 'black', cursor: 'pointer' }}>
          {investment.status}
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        </Card>
      )}
    </Container>
  );
};

export default UserInfo;
