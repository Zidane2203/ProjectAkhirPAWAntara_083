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
// --- WEB (EJS)
// =======================
router.get("/register", AuthController.getRegister);
router.post(
  "/register",
  upload.single("profilePic"),
  validateRegister,
  AuthController.postRegister
);

router.get("/login", AuthController.getLogin);
router.post("/login", validateLogin, AuthController.postLogin);

router.get("/logout", AuthController.logout);

module.exports = router;