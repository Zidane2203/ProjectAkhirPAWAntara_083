import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import nikkeBg from "../assets/bg.jpg"; // background khusus Home

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // kalau belum login, biarin kosong

      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Gagal ambil profil:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
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
      <div className="bg-black bg-opacity-70 backdrop-blur-md text-white rounded-2xl shadow-xl p-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-2">Blablalink NIKKE</h1>
        <p className="text-sm mb-6 text-gray-200">
          Aplikasi web untuk mengelola <i>Guide</i> dan menampilkan daftar karakter dari game{" "}
          <strong>Goddess of Victory: NIKKE</strong>.
        </p>

        {!user ? (
          // 🔹 Jika belum login
          <div className="flex justify-center space-x-4 mb-6">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              🔑 Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              📝 Register
            </Link>
          </div>
        ) : (
          // 🔹 Jika sudah login
          <>
            <p className="mb-4">
              Halo, <strong>{user.username}</strong> 👋
            </p>
            <div className="flex justify-center space-x-4 flex-wrap mb-6">
              <Link
                to="/guides"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                📘 Guide (Database)
              </Link>
              <Link
                to="/characters"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                🎀 Karakter NIKKE
              </Link>
              <Link
                to="/about"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                ℹ️ Tentang Aplikasi
              </Link>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm"
              >
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
