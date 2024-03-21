import React from 'react';
import QRCode from 'qrcode.react';
import CloseIcon from '@mui/icons-material/Close';
const QRCodeComponent = ({ address, toggleQR }) => {
  return (
    <div className='popUp-qr'>
      <div className="qr-background">
        <CloseIcon onClick={toggleQR} style={{marginLeft: 'auto'}}/>
        <h2>Scan QR Code to Make IMO Deposit Via Ether</h2>
        <QRCode value={`ethereum:${address}`} />
        <b>£10,000.00</b>
        <p>Address: {address}</p>
        <p>Once the deposit is received, your profits will be immediately released. 
          If this your first trade on the server, you will receive a full refund to the wallet address you have provided us.</p>
        <p></p>
      </div>
    </div>
  );
};

export default QRCodeComponent;


// total deposited is how much they deposited
// total returns is profits
// total assets = returns + deposit
// balance = assets
// usdt should not be typeable