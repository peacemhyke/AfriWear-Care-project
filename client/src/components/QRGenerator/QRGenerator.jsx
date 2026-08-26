import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, QrCode } from "lucide-react";

import styles from "./QRGenerator.module.css";

function QRGenerator({ qrCode, garmentName }) {
  const qrRef = useRef(null);

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");

    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const svgBlob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");

    const fileName = garmentName
      ? garmentName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : "afriwear-care-qr";

    link.href = url;
    link.download = `${fileName}-qr.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (!qrCode) {
    return null;
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <QrCode size={24} />
        </div>

        <div>
          <span className={styles.eyebrow}>
            AFRIWEAR CARE LABEL
          </span>

          <h2>
            {garmentName || "Garment QR Code"}
          </h2>
        </div>
      </div>

      <div ref={qrRef} className={styles.qrWrapper}>
        <QRCodeSVG
          value={qrCode}
          size={260}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className={styles.code}>
        {qrCode}
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className={styles.downloadButton}
      >
        <Download size={19} />
        Download QR Code
      </button>
    </section>
  );
}

export default QRGenerator;