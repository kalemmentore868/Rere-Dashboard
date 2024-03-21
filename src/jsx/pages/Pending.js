import React, { useContext } from "react";
// import { AuthContext } from "../middleware/AuthContext";
import UserInfo from "../components/UserInfo";

const UserDashboardPage = () => {
//   const { user } = useContext(AuthContext);

const userDetails = localStorage.getItem("userDetails");
let user = '';
    
    if(userDetails){
        const parsedUser = JSON.parse(userDetails );
        user = parsedUser
    }

  if (!user) return <>Logged out</>;
  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default UserDashboardPage;