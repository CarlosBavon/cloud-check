import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Fallback to Render URL if no .env var found
  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await axios.post(`${API_BASE}/api/contact`, form);
      setStatus({ loading: false, success: res.data.message, error: null });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.response?.data?.message || "Something went wrong",
      });
    }
  }

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status.success && <p className="success">{status.success}</p>}
      {status.error && <p className="error">{status.error}</p>}
    </div>
  );
}

export default App;
