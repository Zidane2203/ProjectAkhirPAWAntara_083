const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("username")
    .notEmpty().withMessage("Username wajib diisi")
    .isLength({ min: 3 }).withMessage("Username minimal 3 karakter"),

  body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),

  body("role")
    .notEmpty().withMessage("Role wajib dipilih")
    .isIn(["user", "admin"]).withMessage("Role tidak valid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/register", {
        layout: "layouts/main-layout",
        errors: errors.array(),
        old: req.body
      });
    }
    next();
  },
];

const validateLogin = [
  body("username")
    .notEmpty().withMessage("Username wajib diisi"),

  body("password")
    .notEmpty().withMessage("Password wajib diisi"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/login", {
        layout: "layouts/main-layout",
        errors: errors.array(),
        old: req.body
      });
    }
    next();
  },
];

// ✅ Validasi Guide (tambahkan ini!)
const validateGuide = [
  body("nama").notEmpty().withMessage("Nama wajib diisi"),
  body("link").isURL().withMessage("Link harus berupa URL yang valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("edit-guide", {
        layout: "layouts/main-layout",
        errors: errors.array(),
        old: req.body
      });
    }
    next();
  },
];

module.exports = { validateRegister, validateLogin , validateGuide };
