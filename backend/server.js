require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// =======================
// Import Routers
// =======================
// --- WEB (EJS) ---
const webAuthRouter = require("./routes/web/auth");
const webGuidesRouter = require("./routes/web/guides");
const webNikkeRouter = require("./routes/web/nikke");
const webAdminRouter = require("./routes/web/admin");

// --- API (JSON) ---
const apiAuthRouter = require("./routes/api/auth");
const apiGuideRouter = require("./routes/api/guides");
const apiNikkeRouter = require("./routes/api/nikke");
const apiAdminRouter = require("./routes/api/admin");

const { isAuthenticated } = require("./middlewares/authMiddleware");

// =======================
// Middleware
// =======================
app.use(cors({
  origin: "http://10.69.12.205:3000", // React frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

// View Engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method Override (PUT/DELETE)
app.use(methodOverride("_method"));

// Session & Flash
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 jam
  })
);

app.use(flash());

// Middleware global untuk EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// =======================
// WEB Routes
// =======================
app.use("/auth", webAuthRouter);                // login, register, logout
app.use("/guides", isAuthenticated, webGuidesRouter); 
app.use("/todo", isAuthenticated, webNikkeRouter);     
app.use("/characters", webNikkeRouter); 
app.use("/admin", webAdminRouter); 

// Halaman utama (EJS)
app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/main-layout" });
});

app.get("/guides", (req, res) => {
  res.render("guide ", { layout: "layouts/main-layout" });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main-layout" });
});

// serve static file (gambar, css, dll)
app.use("/sprites", express.static(path.join(__dirname, "public/sprites")));

// =======================
// API Routes
// =======================
app.use("/api/auth", apiAuthRouter);      // login/register/logout (JSON)
app.use("/api/guides", apiGuideRouter);   // CRUD Guide (JSON)
app.use("/api/nikke", apiNikkeRouter);     // CRUD Nikke (JSON)
app.use("/api/admin", apiAdminRouter);     // Admin (JSON)

// =======================
// 404 handler
// =======================
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({ message: "API endpoint not found" });
  }
  res.status(404).render("404", { layout: "layouts/main-layout" });
});

// =======================
// Jalankan server
// =======================
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
