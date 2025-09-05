const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/adminController");
const { isAdmin } = require("../../middlewares/authMiddleware");

// kelola akun
router.get("/", isAdmin, AdminController.getUsers);

// update role
router.put("/users/:id", isAdmin, AdminController.updateUserRole);

// delete user
router.delete("/users/:id", isAdmin, AdminController.deleteUser);

//console.log("AdminController:", AdminController);
module.exports = router;
