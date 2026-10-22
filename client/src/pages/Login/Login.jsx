
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