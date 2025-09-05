const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/authController");
const { validateRegister, validateLogin } = require("../../middlewares/validationMiddleware");
const multer = require("multer");
const path = require("path");

// =======================
// Multer setup
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// =======================
// --- API (React / JSON)
// =======================
router.post(
  "/register",
  upload.single("profilePic"),
  validateRegister,
  AuthController.registerApi
);

router.post("/login", validateLogin, AuthController.loginApi);
router.post("/logout", AuthController.logoutApi);
router.get("/me", AuthController.getMe);

module.exports = router;