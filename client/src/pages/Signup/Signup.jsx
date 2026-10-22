
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
    brandName: "",
    phoneNumber: "",
    city: "",
    state: "",
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

    if (
      formData.role === "DESIGNER" &&
      (!formData.brandName.trim() ||
        !formData.city.trim() ||
        !formData.state.trim())
    ) {
      setMessage("Please enter your brand name, city, and state.");
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
          ...(formData.role === "DESIGNER" && {
            brandName: formData.brandName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      navigate("/login", {
        state: {
          message: "Account created successfully. Please log in.",
        },
      });
    } catch (error) {
      setMessage(
        error.message || "Something went wrong. Please try again."
      );
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
          <span>
            AfriWear <strong>Care</strong>
          </span>
        </Link>

        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            CARE FOR WHAT YOU WEAR
          </span>
          <h1>Create your account</h1>
          <p>
            Join a community making garment care simpler for African
            textiles.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.roleFieldset}>
            <legend>First, choose your account type</legend>

            <p className={styles.roleHint}>
              Select the option that best describes how you'll use
              AfriWear Care.
            </p>

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

                <span className={styles.roleIcon} aria-hidden="true">
                  👕
                </span>

                <span className={styles.roleTitle}>
                  User account
                </span>

                <span className={styles.roleDescription}>
                  For people who own and wear garments.
                </span>

                <span className={styles.roleFeatures}>
                  Scan QR codes · View care guides · Track scan history
                </span>

                <span className={styles.selection}>
                  {formData.role === "USER"
                    ? "✓ Selected"
                    : "Choose account"}
                </span>
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

                <span className={styles.roleIcon} aria-hidden="true">
                  ✂️
                </span>

                <span className={styles.roleTitle}>
                  Designer account
                </span>

                <span className={styles.roleDescription}>
                  For designers and clothing brands.
                </span>

                <span className={styles.roleFeatures}>
                  Add garments · Provide care instructions · Create QR
                  labels
                </span>

                <span className={styles.selection}>
                  {formData.role === "DESIGNER"
                    ? "✓ Selected"
                    : "Choose account"}
                </span>
              </label>
            </div>
          </fieldset>

          <div className={styles.formDivider}>
            <span>Your account details</span>
          </div>

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

          {formData.role === "DESIGNER" && (
            <>
              <div className={styles.formDivider}>
                <span>Designer and brand details</span>
              </div>

              <label className={styles.field}>
                <span>Brand or business name</span>
                <input
                  type="text"
                  name="brandName"
                  placeholder="e.g. PEACEY's Piece"
                  value={formData.brandName}
                  onChange={handleChange}
                  maxLength={150}
                  autoComplete="organization"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>
                  Phone number <small>(optional)</small>
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your contact number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={30}
                  autoComplete="tel"
                />
              </label>

              <div className={styles.locationFields}>
                <label className={styles.field}>
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Benin City"
                    value={formData.city}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span>State</span>
                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Edo"
                    value={formData.state}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="address-level1"
                    required
                  />
                </label>
              </div>
            </>
          )}

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
            <small>Use at least 8 characters.</small>
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
                messageType === "success"
                  ? styles.success
                  : styles.error
              }`}
              role="alert"
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
            {!loading && <span aria-hidden="true"> →</span>}
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <p className={styles.footer}>
          By creating an account, you agree to use AfriWear Care
          responsibly.
        </p>
      </section>
    </main>
  );
}

export default Signup;