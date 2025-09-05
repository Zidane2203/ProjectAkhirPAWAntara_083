import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditGuide = () => {
  const { id } = useParams();
  const [Nama, setNama] = useState("");
  const [Link, setLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/guides/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNama(data.nama); // ✅ lowercase
        setLink(data.link); // ✅ lowercase
      })
      .catch((err) => console.error("Gagal fetch guide:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/guides/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nama: Nama, link: Link }), // ✅ lowercase
    });

    if (res.ok) {
      navigate("/guides");
    } else {
      alert("Gagal mengupdate guide");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Edit Guide</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Nama</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={Nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block">Link Guide</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="5"
              value={Link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGuide;
