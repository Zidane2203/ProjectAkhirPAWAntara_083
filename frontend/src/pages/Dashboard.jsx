import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Dashboard() {
  const [user, setUser] = useState(null);       // data user login
  const [allUsers, setAllUsers] = useState([]); // data semua user (admin)
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "user" });
  const [editUser, setEditUser] = useState(null);

  const navigate = useNavigate();

  // 🔹 ambil profil + daftar user (jika admin)
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);

      if (res.data.role === "admin") {
        const userRes = await api.get("/admin/users");
        setAllUsers(userRes.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  // 🔹 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔹 create user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", newUser);
      setNewUser({ username: "", password: "", role: "user" });
      fetchProfile();
    } catch (err) {
      console.error("Create user failed", err);
      alert("Gagal membuat user!");
    }
  };

  // 🔹 update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { id, username, role } = editUser;
      await api.put(`/admin/users/${id}`, { username, role });
      setEditUser(null);
      fetchProfile();
    } catch (err) {
      console.error("Update user failed", err);
      alert("Gagal update user!");
    }
  };

  // 🔹 delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchProfile();
    } catch (err) {
      console.error("Delete user failed", err);
      alert("Gagal hapus user!");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Profil user */}
      {user ? (
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Selamat datang, {user.username}!
          </h2>
          <p className="text-gray-700">Role: {user.role}</p>
          {user.profilePic && (
            <img
              src={`http://localhost:5000/uploads/${user.profilePic}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mt-3"
            />
          )}
        </div>
      ) : (
        <p>Loading profil...</p>
      )}

      {/* CRUD khusus admin */}
      {user?.role === "admin" && (
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-3">Kelola User</h3>

          {/* Create */}
          <form onSubmit={handleCreate} className="mb-6 flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Tambah
            </button>
          </form>

          {/* List User */}
          {allUsers.length > 0 ? (
            <ul className="space-y-2">
              {allUsers.map((u) => (
                <li
                  key={u.id}
                  className="p-2 border rounded flex justify-between items-center"
                >
                  {editUser?.id === u.id ? (
                    // Edit form
                    <form onSubmit={handleUpdate} className="flex flex-wrap gap-2 items-center">
                      <input
                        type="text"
                        value={editUser.username}
                        onChange={(e) =>
                          setEditUser({ ...editUser, username: e.target.value })
                        }
                        className="border p-2 rounded"
                      />
                      <select
                        value={editUser.role}
                        onChange={(e) =>
                          setEditUser({ ...editUser, role: e.target.value })
                        }
                        className="border p-2 rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditUser(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Batal
                      </button>
                    </form>
                  ) : (
                    // User display
                    <>
                      <span>
                        {u.username}{" "}
                        <span className="text-gray-500">({u.role})</span>
                      </span>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditUser(u)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Hapus
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Belum ada user lain.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
