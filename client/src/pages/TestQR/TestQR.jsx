import { QRCodeSVG } from "qrcode.react";

function TestQR() {
  const qrCode = "bd950a877808da606836a6570dca7f96";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>AfriWear Care Test QR</h1>

      <p>
        Scan this QR code using the AfriWear Care scanner.
      </p>

      <QRCodeSVG
        value={qrCode}
        size={300}
      />

      <div>
        <strong>Garment:</strong>
        <p>Classic Ankara Dress</p>

        <strong>QR Code:</strong>
        <p>{qrCode}</p>
      </div>
    </main>
  );
}

export default TestQR;