// Middleware untuk akses via EJS (redirect)
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  req.flash("error", "Anda harus login dulu!");
  return res.redirect("/login");
}

// Middleware untuk akses via API (JSON response)
function isApiAuthenticated(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ message: "Anda harus login dulu!" });
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  req.flash("error", "Anda tidak memiliki akses ke halaman ini");
  return res.redirect("/");
}

module.exports = { isAuthenticated, isApiAuthenticated, isAdmin };
