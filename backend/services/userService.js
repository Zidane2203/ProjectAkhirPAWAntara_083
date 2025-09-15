const UserRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const { formatDate } = require("../helpers/dateHelper");  // 👉 pakai helper
const logger = require("../utils/logger");              // 👉 pakai logger

const UserService = {
  // Cari user berdasarkan username
  findByUsername: async (username) => {
    if (!username) throw new Error("Username wajib diisi");
    const user = await UserRepository.findByUsername(username);
    logger.info(`findByUsername dipanggil untuk username=${username} pada ${formatDate()}`);
    return user;
  },

  // Buat user baru (hash password otomatis)
  createUser: async (username, password, role = "user", profilePic = null) => {
    if (!username || !password) {
      throw new Error("Username dan password wajib diisi");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.createUser(username, hashedPassword, role, profilePic);

    // log pakai helper
    logger.info(`User ${username} dibuat dengan role=${role} pada ${formatDate()}`);
    return user;
  },

  // Ambil semua user
  getAllUsers: async () => {
    logger.info(`getAllUsers dipanggil pada ${formatDate()}`);
    return await UserRepository.getAllUsers();
  },

  deleteUser: async (id) => {
    logger.info(`deleteUser dipanggil untuk id=${id} pada ${formatDate()}`);
    return await UserRepository.deleteUser(id);
  },

  updateUserRole: async (id, role) => {
    logger.info(`updateUserRole dipanggil untuk id=${id} jadi role=${role} pada ${formatDate()}`);
    return await UserRepository.updateUserRole(id, role);
  }
};

module.exports = UserService;
