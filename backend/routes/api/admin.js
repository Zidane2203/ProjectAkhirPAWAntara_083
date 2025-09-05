const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/adminController");
const { isAdmin } = require("../../middlewares/authMiddleware");

// ✅ CREATE user baru
router.post("/users", isAdmin, async (req, res) => {
  try {
    await AdminController.createUserApi(req, res);
  } catch (err) {
    console.error("❌ Error create user:", err);
    res.status(500).json({ message: "Gagal membuat user" });
  }
});

// ✅ READ semua user
router.get("/users", isAdmin, async (req, res) => {
  try {
    await AdminController.getUsersApi(req, res);
  } catch (err) {
    console.error("❌ Error get users:", err);
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
});

// ✅ update role user
router.put("/users/:id", isAdmin, async (req, res) => {
  try {
    await AdminController.updateUserRoleApi(req, res);
  } catch (err) {
    console.error("❌ Error update role:", err);
    res.status(500).json({ message: "Gagal memperbarui role user" });
  }
});

// ✅ delete user
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    await AdminController.deleteUserApi(req, res);
  } catch (err) {
    console.error("❌ Error delete user:", err);
    res.status(500).json({ message: "Gagal menghapus user" });
  }
});

module.exports = router;
