import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const QRCodeComponent = ({ address, toggleQR }) => {
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setShowCopiedPopup(true);
    setTimeout(() => {
      setShowCopiedPopup(false);
    }, 2000); // Hide popup after 2 seconds
  };

  return (
    <div className='popUp-qr'>
      <div className="qr-background">
        <CloseIcon onClick={toggleQR} style={{marginLeft: 'auto'}} />
        <h2>Scan QR Code to Make IMO Deposit Via Ether</h2>
        <QRCode value={`ethereum:${address}`} />
        <b>£10,000.00</b>
        <p>
          <b>Address:</b> {address}
          <ContentCopyIcon 
            style={{cursor: 'pointer', position: 'relative'}}
            onClick={handleCopy}
          />
          {showCopiedPopup && (
            <span style={{color: 'purple'}} className="copied-popup">Copied to clipboard!</span>
          )}
        </p>
        <p style={{textAlign: 'center'}}>Once the deposit is received, your profits will be immediately released. 
          <br/>If this your first trade on the server, you will receive a full refund to the wallet address you have provided us.</p>
        
      </div>
    </div>
  );
};

export default QRCodeComponent;
