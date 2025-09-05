const UserRepository = require("../repositories/userRepository");

const AdminController = {

  //------------------------------//
  //-----Tampilan HALAMAN EJS-----//
  //------------------------------//
  // tampilkan semua user
  getUsers: async (req, res) => {
    try {
      const users = await UserRepository.getAllUsers();
      res.render("admin/users", {
        layout: "layouts/main-layout",
        users
      });
    } catch (err) {
      console.error("AdminController error:", err);
      res.status(500).send("Gagal mengambil data user");
    }
  },

  // update role user
  updateUserRole: async (req, res) => {
    const { id } = req.params;
    const { role } = req.body; // ⬅️ ambil role dari form select

    console.log("DEBUG UPDATE ROLE:", { id, role, body: req.body }); // 👀 cek apa yg dikirim form

    try {
      await UserRepository.updateUserRole(id, role);
      req.flash("success", "Role user berhasil diperbarui");
      res.redirect("/admin");
    } catch (err) {
      console.error("Update role error:", err);
      req.flash("error", "Gagal update role");
      res.redirect("/admin");
    }
  },

  // hapus user
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      await UserRepository.deleteUser(id);
      req.flash("success", "User berhasil dihapus");
      res.redirect("/admin");
    } catch (err) {
      console.error("Delete user error:", err);
      req.flash("error", "Gagal hapus user");
      res.redirect("/admin");
    }
  },

  //------------------------------//
  //-------API JSON (optional)----//
  //------------------------------//
  
  // ✅ tambah user baru (CREATE)
  createUserApi: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).json({ message: "Data tidak lengkap" });
      }

      const newUser = await UserRepository.createUser({ username, password, role });
      res.status(201).json({ message: "User berhasil dibuat", user: newUser });
    } catch (err) {
      console.error("API createUser error:", err);
      res.status(500).json({ message: "Gagal membuat user" });
    }
  },
  
  // ✅ ambil semua user (READ)
  getUsersApi: async (req, res) => {
    try {
      const users = await UserRepository.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error("API getUsers error:", err);
      res.status(500).json({ message: "Gagal mengambil data user" });
    }
  },

  // ✅ update user (UPDATE)
  updateUserApi: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, role } = req.body;

      await UserRepository.updateUser(id, { username, role });
      res.json({ message: "User berhasil diperbarui" });
    } catch (err) {
      console.error("API updateUser error:", err);
      res.status(500).json({ message: "Gagal update user" });
    }
  },

  // ✅ hapus user (DELETE)
  deleteUserApi: async (req, res) => {
    try {
      const { id } = req.params;
      await UserRepository.deleteUser(id);
      res.json({ message: "User berhasil dihapus" });
    } catch (err) {
      console.error("API deleteUser error:", err);
      res.status(500).json({ message: "Gagal menghapus user" });
    }
  }
};

module.exports = AdminController;
