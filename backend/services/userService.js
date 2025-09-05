const UserRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

const UserService = {
  // Cari user berdasarkan username
  findByUsername: async (username) => {
    if (!username) throw new Error("Username wajib diisi");
    return await UserRepository.findByUsername(username);
  },

  // Buat user baru (hash password otomatis)
  createUser: async (username, password, role = "user", profilePic = null) => {
  if (!username || !password) {
    throw new Error("Username dan password wajib diisi");
  }

  // ✅ hash di sini, bukan di controller
  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserRepository.createUser(username, hashedPassword, role, profilePic);
},


  // Tambahan method di UserService
  getAllUsers: async () => {
    return await UserRepository.getAllUsers();
  },

  deleteUser: async (id) => {
    return await UserRepository.deleteUser(id);
  },

  updateUserRole: async (id, role) => {
    return await UserRepository.updateUserRole(id, role);
  }
}

module.exports = UserService;
