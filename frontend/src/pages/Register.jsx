import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Import navigate
import nikkeBg from "../assets/bg.jpg";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // <-- Inisialisasi

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("role", role);
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await axios.post("http://localhost:5000/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      setMessage(res.data.message || "Registrasi berhasil!");

      // ✅ Redirect ke halaman login setelah berhasil
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5 detik delay supaya user bisa lihat pesan dulu

    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Registrasi gagal!");
      } else {
        setMessage("Terjadi kesalahan koneksi!");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${nikkeBg})`, // ✅ ini dia
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Input Fields */}
          <div style={{ marginBottom: "15px" }}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              style={{ marginTop: "5px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", textAlign: "center", color: "red" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
