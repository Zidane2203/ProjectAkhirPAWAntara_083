import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Guide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔑 Ambil user login
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error("User not logged in:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // 📂 Ambil data guides
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await api.get("/guides");
        console.log("API Guides Response:", res.data);

        // ✅ Sort abjad (angka dulu, baru huruf)
        const sorted = res.data.sort((a, b) =>
          a.Nama.localeCompare(b.Nama, "en", { numeric: true })
        );
        setGuides(sorted);
      } catch (err) {
        console.error("Gagal fetch guides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // 🗑️ Hapus guide (hanya admin)
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus guide ini?")) return;

    try {
      await api.delete(`/guides/${id}`, { withCredentials: true });
      setGuides(guides.filter((g) => g.ID !== id));
    } catch (err) {
      console.error("Gagal hapus guide:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  // 🔍 Filter pencarian
  const filteredGuides = guides.filter((g) =>
    g.Nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Daftar Guide</h1>

      {/* 🔍 Form Pencarian */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari guide..."
          className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.ID}
            className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-4 text-white 
                       transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
          >
            <h2 className="text-xl font-semibold mb-2">{guide.Nama}</h2>

            <div className="flex flex-wrap gap-3">
              {/* Semua user bisa lihat */}
              <a
                href={guide.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition"
              >
                Lihat
              </a>

              {/* Admin bisa edit & hapus */}
              {user?.role === "admin" && (
                <>
                  <button
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-sm transition"
                    onClick={() => navigate(`/guides/edit/${guide.ID}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition"
                    onClick={() => handleDelete(guide.ID)}
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Admin bisa tambah guide */}
      {user?.role === "admin" && (
        <button
          className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl shadow-lg transition hover:scale-105 hover:shadow-purple-500/40"
          onClick={() => navigate("/guides/create")}
        >
          + Tambah Guide
        </button>
      )}
    </div>
  );
};

export default Guide;
