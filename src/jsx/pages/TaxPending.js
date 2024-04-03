import React, { useContext } from "react";
// import { AuthContext } from "../middleware/AuthContext";
import UserTaxInfo from "../components/UserTaxInfo";

const TaxPending = () => {
  //   const { user } = useContext(AuthContext);

  const userDetails = localStorage.getItem("userDetails");
  let user = "";

  if (userDetails) {
    const parsedUser = JSON.parse(userDetails);
    user = parsedUser;
  }

  if (!user) return <>Logged out</>;
  return (
    <div>
      <UserTaxInfo user={user} />
    </div>
  );
};

export default TaxPending;
