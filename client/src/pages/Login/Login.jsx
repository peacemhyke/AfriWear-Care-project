import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/api";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save the login token and user's role
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.user.role);

    setMessage("Login successful!");

    // Send each user to the correct dashboard
    if (data.user.role === "DESIGNER") {
      navigate("/designer-dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <span className={styles.brand}>AFRIWEAR CARE</span>

          <h1>Welcome back</h1>

          <p>
            Log in to continue using AfriWear Care.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {message && (
          <p className={styles.message}>
            {message}
          </p>
        )}

        <div className={styles.signup}>
          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className={styles.signupButton}
          >
            Create an account
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;