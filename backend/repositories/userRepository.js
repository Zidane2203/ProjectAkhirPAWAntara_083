const db = require("../db");

const UserRepository = {
  // Cari user berdasarkan username
  findByUsername: (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, username, password, role, profile_pic FROM users WHERE username = ? LIMIT 1";
      db.query(sql, [username], (err, results) => {
        if (err) return reject(err);
      resolve(results[0] || null);
      });
    });
  },

  // Cari user berdasarkan ID
  findById: (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, username, role, profile_pic FROM users WHERE id = ? LIMIT 1";
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  // Ambil semua user (untuk admin)
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, username, role, profile_pic FROM users", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Tambah user baru
  createUser: (username, hashedPassword, role, profile_pic) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (username, password, role, profile_pic) VALUES (?, ?, ?, ?)",
        [username, hashedPassword, role, profile_pic],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        }
      );
    });
  },

  // Update role user (admin only)
  updateUserRole: (id, role) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET role = ? WHERE id = ?";
      db.query(sql, [role, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  
  // Hapus user (admin only)
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = UserRepository;
