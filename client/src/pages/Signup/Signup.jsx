
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/api";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password.length < 8) {
      setMessage("Your password must be at least 8 characters long.");
      setMessageType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("Account created successfully! Redirecting to login...");
      setMessageType("success");

      navigate("/login", {
        state: {
          message: "Account created successfully. Please log in.",
        },
      });
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>A</span>
          <span>AfriWear <strong>Care</strong></span>
        </Link>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>JOIN OUR COMMUNITY</span>
          <h1>Create your account</h1>
          <p>
            Discover better ways to care for African textiles and the
            garments you love.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.roleFieldset}>
            <legend>How will you use AfriWear Care?</legend>

            <div className={styles.roleOptions}>
              <label
                className={`${styles.roleOption} ${
                  formData.role === "USER" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={formData.role === "USER"}
                  onChange={handleChange}
                />
                <span className={styles.roleIcon}>♧</span>
                <strong>I'm a consumer</strong>
                <span>Discover garment care guides and scan QR codes.</span>
              </label>

              <label
                className={`${styles.roleOption} ${
                  formData.role === "DESIGNER" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="DESIGNER"
                  checked={formData.role === "DESIGNER"}
                  onChange={handleChange}
                />
                <span className={styles.roleIcon}>✂</span>
                <strong>I'm a designer</strong>
                <span>Share your garments and their care instructions.</span>
              </label>
            </div>
          </fieldset>

          <label className={styles.field}>
            <span>Full name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter your password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          {message && (
            <p
              className={`${styles.message} ${
                messageType === "success" ? styles.success : styles.error
              }`}
              role="status"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <p className={styles.footer}>
          By creating an account, you agree to use AfriWear Care responsibly.
        </p>
      </section>
    </main>
  );
}

export default Signup;