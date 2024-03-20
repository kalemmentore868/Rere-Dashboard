import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ address }) => {
  return (
    <div>
      <h2>Scan QR Code to Send Ether</h2>
      <QRCode value={`ethereum:${address}`} />
      <p>Address: {address}</p>
    </div>
  );
};

export default QRCodeComponent;
