import API_URL from "../config/api";

export const scanQRCode = async (qrCode) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You are not logged in");
  }

  const response = await fetch(
    `${API_URL}/qr/scan/${encodeURIComponent(qrCode)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to scan QR code");
  }

  return data;
};