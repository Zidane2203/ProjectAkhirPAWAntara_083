import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import nikkeBg from "../assets/bg.jpg"; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      
      // Simpan token ke localStorage (sesuaikan dengan key dari backend)
      localStorage.setItem("token", response.data.token);

      navigate("/about"); // redirect ke halaman Home setelah login sukses
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (

    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${nikkeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-96 text-center">
        {/* Judul Aplikasi */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Blablalink NIKKE Guide Database
        </h1>

        {/* Form Login */}
        <form onSubmit={handleLogin}>
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Link Buat Akun */}
        <p className="mt-4 text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Buat akun baru
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
