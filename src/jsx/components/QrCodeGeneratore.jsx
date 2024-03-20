import QRCode from "qrcode.react"
export default function QrCodeGeneratore({address}) {
  return (
    <div>
      <h2>Scan QR Code to Send Ether</h2>
      <QRCode value={`ethereum:${address}`} />
      <p>Address: {address}</p>
    </div>
  )
}
