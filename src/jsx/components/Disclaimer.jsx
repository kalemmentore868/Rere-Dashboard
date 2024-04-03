import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Disclaimer = ({ toggleDislaimer, text }) => {
  return (
    <div className="popUp-qr">
      <div className="qr-background" style={{ width: "50vw" }}>
        <CloseIcon
          onClick={toggleDislaimer}
          style={{ marginLeft: "auto", cursor: "pointer" }}
        />
        <h2>Disclaimer</h2>

        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </div>
  );
};

export default Disclaimer;
