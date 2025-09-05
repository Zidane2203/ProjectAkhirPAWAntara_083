import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔹 Cek user login ketika Navbar dipasang
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me"); // pastikan ada endpoint /auth/me
        setUser(res.data);
      } catch (err) {
        console.error("Gagal fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/");               // redirect ke login
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">BlablaLink NIKKE</div>
      
      <ul className="flex space-x-6">
        <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
        <li><Link to="/guides" className="hover:text-yellow-400">Guide</Link></li>
        <li><Link to="/characters" className="hover:text-yellow-400">Characters</Link></li>
        <li><Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
      </ul>

      <div className="flex items-center space-x-4">
        {user && <span className="text-sm">👤 {user.username}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
