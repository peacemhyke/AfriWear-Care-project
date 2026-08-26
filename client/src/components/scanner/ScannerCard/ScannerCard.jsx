
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScanLine, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

import styles from "./ScannerCard.module.css";
import { recentScans } from "../../../data/recentScans";

function ScannerCard() {
  const navigate = useNavigate();

  const scannerRef = useRef(null);
  const scannerStartedRef = useRef(false);
  const scanLockedRef = useRef(false);

  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const [detected, setDetected] = useState(false);

  const startScanner = async () => {
    if (scannerStartedRef.current) return;

    setScanError("");
    setDetected(false);
    scanLockedRef.current = false;

    try {
      const scanner = new Html5Qrcode("qr-reader");

      scannerRef.current = scanner;
      scannerStartedRef.current = true;

      setScanning(true);

      const cameras = await Html5Qrcode.getCameras();

      if (!cameras || cameras.length === 0) {
        throw new Error("No camera found.");
      }

      const cameraId = cameras[0].id;

      await scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        async (decodedText) => {
          if (scanLockedRef.current) return;

          scanLockedRef.current = true;
          setDetected(true);

          console.log("QR detected:", decodedText);

          let qrCode = decodedText;

          try {
            const url = new URL(decodedText);

            const pathParts = url.pathname.split("/");

             qrCode = pathParts[pathParts.length - 1];
          } catch {
            // The QR contains the raw QR code, not a URL.
          }
          
          console.log("Extracted QR code:", qrCode);
          
          setTimeout(async () => {
            try {
              if (scannerRef.current) {
                await scannerRef.current.stop();
                scannerRef.current.clear();
              }
            } catch (error) {
              console.error("Scanner stop error:", error);
            }

            scannerRef.current = null;
            scannerStartedRef.current = false;
            setScanning(false);

            navigate(`/garment/${encodeURIComponent(qrCode)}`);
          }, 800);
        },
        () => {
          // QR code not detected in this frame.
        }
      );
    } catch (error) {
      console.error("Scanner error:", error);

      scannerRef.current = null;
      scannerStartedRef.current = false;
      setScanning(false);

      setScanError(
        "Unable to access the camera. Please allow camera permission and try again."
      );
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      }
    } catch (error) {
      console.error("Stop scanner error:", error);
    }

    scannerRef.current = null;
    scannerStartedRef.current = false;
    scanLockedRef.current = false;

    setScanning(false);
    setDetected(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <section className={styles.container}>

      <div className={styles.header}>
        <span className={styles.eyebrow}>
          GARMENT SCANNER
        </span>

        <h1>Scan Your Garment</h1>

        <p>
          Scan the QR care label on your garment to get
          personalized care guidance.
        </p>
      </div>

      <div className={styles.step}>
        <span className={styles.stepNumber}>1</span>

        <div>
          <strong>Position your care label</strong>

          <p>
            Place the QR code inside the scanning frame.
          </p>
        </div>
      </div>

      <div className={styles.scanner}>

        <div id="qr-reader"></div>

        {!scanning && (
          <div className={styles.scannerCenter}>
            <ScanLine size={34} />

            <span>
              Camera ready
            </span>
          </div>
        )}

        {detected && (
          <div className={styles.detectedOverlay}>
            <CheckCircle2 size={42} />

            <strong>
              QR Code detected
            </strong>

            <span>
              Preparing your garment care guide...
            </span>
          </div>
        )}

        {scanning && !detected && (
          <>
            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerTopRight}></div>
            <div className={styles.cornerBottomLeft}></div>
            <div className={styles.cornerBottomRight}></div>

            <div className={styles.scanLine}></div>
          </>
        )}

      </div>

      {scanError && (
        <p className={styles.error}>
          {scanError}
        </p>
      )}

      {!scanning ? (
        <button
          type="button"
          onClick={startScanner}
          className={styles.button}
        >
          <ScanLine size={20} />
          Open Camera
        </button>
      ) : (
        !detected && (
          <button
            type="button"
            onClick={stopScanner}
            className={styles.button}
          >
            Stop Camera
          </button>
        )
      )}

      <div className={styles.demo}>
        <ShieldCheck size={18} />

        <span>
          Don't have a QR label yet? Try our demo garment.
        </span>
      </div>

      <Link
        to={`/garment/${recentScans[0].qrCode}`}
        className={styles.button}
      >
        <ScanLine size={20} />
        Try Demo Ankara Label
      </Link>

    </section>
  );
}

export default ScannerCard;

