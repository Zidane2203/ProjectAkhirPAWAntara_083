const UserService = require("../services/userService");
const bcrypt = require("bcrypt");

const AuthController = {
// =========================
// --- WEB (EJS)
// =========================
getRegister: (req, res) => {
  res.render("auth/register", {
    layout: "layouts/main-layout",
    user: req.session.user,
    old: {},              // ✅ tambahin
    errors: []            // ✅ default kosong
  });
},

postRegister: async (req, res) => {
  try {
    const { username, role, password } = req.body;

    if (!username || !role || !password) {
      return res.render("auth/register", {
        layout: "layouts/main-layout",
        user: req.session.user,
        errors: ["Semua field wajib diisi"]
      });
    }

    // ✅ kirim password plain, hash akan dikerjakan di UserService
    await UserService.createUser(
      username,
      password,
      role,
      req.file ? `/uploads/${req.file.filename}` : null
    );

    req.flash("success", "Registrasi berhasil, silakan login");
    res.redirect("/auth/login");
  } catch (err) {
    console.error("❌ Error postRegister (web):", err);
    res.render("auth/register", {
      layout: "layouts/main-layout",
      user: req.session.user,
      errors: ["Registrasi gagal, coba lagi."]
    });
  }
},

getLogin: (req, res) => {
  res.render("auth/login", {
    layout: "layouts/main-layout",
    user: req.session.user,
    old: {},              // ✅ tambahin
    errors: []
  });
},

postLogin: async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("auth/login", {
        layout: "layouts/main-layout",
        user: null,
        old: req.body,     // ✅ isi ulang input lama
        errors: ["Username atau password salah"]
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      profilePic: user.profile_pic
    };

    req.flash("success", "Login berhasil");
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error postLogin (web):", err);
    res.render("auth/login", {
      layout: "layouts/main-layout",
      user: null,
      old: req.body,       // ✅ isi ulang input lama
      errors: ["Login gagal, coba lagi."]
    });
  }
},

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  },

  // =========================
  // --- API (React / JSON)
  // =========================
  registerApi: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.createUser(
        username,
        hashedPassword,
        role,
        req.file ? `/uploads/${req.file.filename}` : null
      );

      res.status(201).json({ message: "Registrasi berhasil", user: newUser });
    } catch (err) {
      console.error("❌ Error registerApi:", err);
      res.status(500).json({ message: "Registrasi gagal" });
    }
  },

  loginApi: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserService.findByUsername(username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Username atau password salah" });
      }

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        profilePic: user.profile_pic
      };

      res.json({ message: "Login berhasil", user: req.session.user });
    } catch (err) {
      console.error("❌ Error loginApi:", err);
      res.status(500).json({ message: "Login gagal" });
    }
  },

  logoutApi: (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logout berhasil" });
    });
  },

  getMe: (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Belum login" });
    }
    res.json(req.session.user);
  }
};

module.exports = AuthController;
