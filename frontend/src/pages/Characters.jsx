// src/pages/Characters.jsx
import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter state
  const [roleFilter, setRoleFilter] = useState("");
  const [burstFilter, setBurstFilter] = useState("");
  const [rarityFilter, setRarityFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await api.get("/nikke");

        // 🔎 urutkan nama: angka dulu, lalu huruf
        const sorted = res.data.sort((a, b) =>
          a.nama.localeCompare(b.nama, "en", { numeric: true })
        );

        setCharacters(sorted);
      } catch (err) {
        console.error("❌ Gagal fetch characters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 🔎 filter logic
  // 🔎 filter logic + search
  const filteredCharacters = characters.filter((char) => {
    return (
      (roleFilter === "" || char.role === roleFilter) &&
      (burstFilter === "" || char.burstType === burstFilter) &&
      (rarityFilter === "" || char.rarity === rarityFilter) &&
      (search === "" ||
        char.nama.toLowerCase().includes(search.toLowerCase()))
    );
  });

   return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Karakter NIKKE</h1>

      {/* 🔽 Filter controls + search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Roles</option>
          <option value="Attacker">Attacker</option>
          <option value="Defender">Defender</option>
          <option value="Support">Support</option>
        </select>

        <select
          value={burstFilter}
          onChange={(e) => setBurstFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Burst Types</option>
          <option value="Burst I">Burst I</option>
          <option value="Burst II">Burst II</option>
          <option value="Burst III">Burst III</option>
        </select>

        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Rarity</option>
          <option value="SSR">SSR</option>
          <option value="SR">SR</option>
          <option value="R">R</option>
        </select>

        {/* 🔍 Search box */}
        <input
          type="text"
          placeholder="Cari karakter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg flex-1 min-w-[200px]"
        />

        <button
          onClick={() => {
            setRoleFilter("");
            setBurstFilter("");
            setRarityFilter("");
            setSearch("");
          }}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* 🔎 Character Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => {
            const imageUrl = `http://localhost:5000${char.gambar}`;

            return (
              <div
                key={char.id}
                className="bg-white/45 backdrop-blur-md shadow-lg rounded-lg p-3 text-center"
              >
                <img
                  src={imageUrl}
                  alt={char.nama}
                  className="w-24 h-24 object-cover mx-auto rounded-full border border-white shadow"
                />
                <h2 className="mt-2 text-sm font-semibold">{char.nama}</h2>
                <p className="text-xs text-gray-700">{char.role}</p>
                <p className="text-xs text-gray-500">{char.burstType}</p>
                <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold bg-yellow-200 rounded-full">
                  {char.rarity}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">Tidak ada karakter sesuai filter.</p>
        )}
      </div>
    </div>
  );
};

export default Characters;
