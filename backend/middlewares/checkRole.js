function checkRole(role) {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).json({ message: "Akses ditolak, butuh role " + role });
    }
    next();
  };
}

module.exports = checkRole;