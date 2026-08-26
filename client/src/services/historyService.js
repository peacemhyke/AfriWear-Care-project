import API_URL from "../config/api";

export const getScanHistory = async () => {
const token = localStorage.getItem("token");

if (!token) {
throw new Error("You are not logged in");
}

const response = await fetch(`${API_URL}/history`, {
method: "GET",
headers: {
Authorization: `Bearer ${token}`,
},
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.message || "Failed to load scan history");
}

return data.history;
};

/* =========================
DELETE ONE SCAN
========================= */

export const deleteScanHistory = async (id) => {
const token = localStorage.getItem("token");

if (!token) {
throw new Error("You are not logged in");
}

const response = await fetch(`${API_URL}/history/${id}`, {
method: "DELETE",
headers: {
Authorization: `Bearer ${token}`,
},
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data.message || "Failed to delete scan history"
);
}

return data;
};

/* =========================
CLEAR ALL HISTORY
========================= */

export const clearScanHistory = async () => {
const token = localStorage.getItem("token");

if (!token) {
throw new Error("You are not logged in");
}

const response = await fetch(`${API_URL}/history`, {
method: "DELETE",
headers: {
Authorization: `Bearer ${token}`,
},
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data.message || "Failed to clear scan history"
);
}

return data;
};
