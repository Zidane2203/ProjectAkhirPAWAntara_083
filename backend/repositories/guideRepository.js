const db = require("../db");

const GuideRepository = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM nikke", (err, results) => {
        if (err) reject(err);
        else resolve(results); // array
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM nikke WHERE ID=?", [id], (err, results) => {
        if (err) reject(err);
        else resolve(results); // 🔹 hasilkan array, bukan results[0]
      });
    });
  },

  create: (nama, link) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO nikke (Nama, Link) VALUES (?, ?)",
        [nama, link],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        }
      );
    });
  },

  update: (id, nama, link) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE nikke SET Nama=?, Link=? WHERE ID=?",
        [nama, link, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM nikke WHERE ID=?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = GuideRepository;
