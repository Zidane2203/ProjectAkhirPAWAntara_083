import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGuide = () => {
  const [nama, setNama] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/guides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nama, link }), // ✅ lowercase
    });

    if (res.ok) {
      navigate("/guides");
    } else {
      alert("Gagal menambahkan guide");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Tambah Guide Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Nama</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block">Link Guide</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="5"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGuide;
