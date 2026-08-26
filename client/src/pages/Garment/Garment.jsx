import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
Droplets,
Sun,
Flame,
Archive,
Download,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { scanQRCode } from "../../services/qrService";

import FabricExpert from "../../components/ai/FabricExpert";
import FabricWisdom from "../../components/FabricWisdom/FabricWisdom";

import styles from "./Garment.module.css";

function Garment() {
const { id } = useParams();
const qrRef = useRef(null);

const [garment, setGarment] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const loadGarment = async () => {
try {
setLoading(true);
setError("");

    const data = await scanQRCode(id);

    setGarment(data);
  } catch (error) {
    console.error("Garment scan error:", error.message);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

loadGarment();

}, [id]);

const handleDownloadQR = () => {
const svg = qrRef.current?.querySelector("svg");

if (!svg) return;

const serializer = new XMLSerializer();
const svgString = serializer.serializeToString(svg);

const blob = new Blob([svgString], {
  type: "image/svg+xml",
});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;
link.download = `afriwear-care-${id}.svg`;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

};

if (loading) {
return ( <div className={styles.container}> <h2>Loading garment information...</h2> </div>
);
}

if (error || !garment) {
return ( <div className={styles.container}> <h2>Garment not found.</h2> <p>{error}</p> </div>
);
}

const garmentInfo = garment.garment;
const fabricInfo = garment.fabric;
const careInstructions = garment.careInstructions || [];

const getCareInstruction = (category) => {
return careInstructions.find((item) =>
item.category?.toLowerCase().includes(
category.toLowerCase()
)
);
};

const wash = getCareInstruction("wash");
const dry = getCareInstruction("dry");
const iron = getCareInstruction("iron");
const storage = getCareInstruction("storage");

const qrUrl = `http://172.20.10.2:5173/garment/${id}`;

const displayGarment = {
...garmentInfo,

garment: garmentInfo.name,

fabric:
  fabricInfo?.name ||
  "African Textile",

image:
  garmentInfo.image_url ||
  "",

qrCode: id,

careGuide: {
  wash:
    wash?.instruction ||
    "Follow the recommended washing instructions.",

  detergent:
    wash?.method ||
    "Use a gentle detergent.",

  dry:
    dry?.instruction ||
    "Air dry according to the fabric requirements.",

  wring:
    dry?.warnings ||
    "Avoid excessive wringing.",

  iron:
    iron?.instruction ||
    "Use the recommended ironing temperature.",

  bleach:
    wash?.warnings ||
    "Avoid bleach unless specifically recommended.",

  storage:
    storage?.instruction ||
    "Store in a clean, dry environment.",

  separateColours:
    storage?.warnings ||
    "Keep colours separate when necessary.",

  aiResponse: `Hi! I'm Fabric Expert 👋🏽 This ${
    garmentInfo.name
  } is made from ${
    fabricInfo?.name || "an African textile"
  }. I'm here to help you care for it properly. Ask me anything about washing, drying, ironing, storage, or maintaining this garment.`,
},

};

return ( <div className={styles.container}>

  {garmentInfo.image_url && (
    <img
      src={garmentInfo.image_url}
      alt={garmentInfo.name}
      className={styles.image}
    />
  )}

  <span className={styles.badge}>
    {fabricInfo?.name || "African Textile"}
  </span>

  <h1>{garmentInfo.name}</h1>

  {garmentInfo.description && (
    <p>{garmentInfo.description}</p>
  )}

  <p className={styles.qr}>
    QR Code: {id}
  </p>

  <section className={styles.qrSection}>
    <div className={styles.qrText}>
      <span>AFRIWEAR CARE LABEL</span>

      <h2>
        Digital Care Label
      </h2>

      <p>
        Scan this code to access this garment's
        fabric information and personalized care guide.
      </p>

      <button
        type="button"
        onClick={handleDownloadQR}
        className={styles.downloadButton}
      >
        <Download size={18} />
        Download QR Code
      </button>
    </div>

    <div
      className={styles.qrCode}
      ref={qrRef}
    >
      <QRCodeSVG
        value={qrUrl}
        size={220}
        level="H"
        includeMargin={true}
      />
    </div>
  </section>

  <section className={styles.careSection}>

    <div className={styles.careCard}>
      <Droplets size={30} />

      <h3>Wash</h3>

      <p>
        {wash?.instruction ||
          "Follow the recommended washing method."}
      </p>

      <small>
        {wash?.temperature ||
          wash?.method ||
          ""}
      </small>

      {wash?.warnings && (
        <small>{wash.warnings}</small>
      )}
    </div>

    <div className={styles.careCard}>
      <Sun size={30} />

      <h3>Dry</h3>

      <p>
        {dry?.instruction ||
          "Air dry according to the fabric requirements."}
      </p>

      <small>
        {dry?.method ||
          dry?.temperature ||
          ""}
      </small>

      {dry?.warnings && (
        <small>{dry.warnings}</small>
      )}
    </div>

    <div className={styles.careCard}>
      <Flame size={30} />

      <h3>Iron</h3>

      <p>
        {iron?.instruction ||
          "Use the recommended ironing temperature."}
      </p>

      <small>
        {iron?.temperature ||
          iron?.method ||
          ""}
      </small>

      {iron?.warnings && (
        <small>{iron.warnings}</small>
      )}
    </div>

    <div className={styles.careCard}>
      <Archive size={30} />

      <h3>Storage</h3>

      <p>
        {storage?.instruction ||
          "Store in a clean, dry environment."}
      </p>

      <small>
        {storage?.method ||
          storage?.warnings ||
          ""}
      </small>
    </div>

  </section>

  <FabricExpert garment={displayGarment} />

  <FabricWisdom garment={displayGarment} />

</div>

);
}

export default Garment;
