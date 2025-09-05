const db = require("../db");

const UserModel = {
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
  },

  createUser: (username, hashedPassword, role, callback) => {
    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role],
      callback
    );
  }
};

module.exports = UserModel;
