const db = require("../db");

const GuideModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM nikke", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM nikke WHERE ID=?", [id], callback);
  },
  create: (nama, link, callback) => {
    db.query("INSERT INTO nikke (Nama, Link) VALUES (?, ?)", [nama, link], callback);
  },
  update: (id, nama, link, callback) => {
    db.query("UPDATE nikke SET Nama=?, Link=? WHERE ID=?", [nama, link, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM nikke WHERE ID=?", [id], callback);
  }
};

module.exports = GuideModel;
