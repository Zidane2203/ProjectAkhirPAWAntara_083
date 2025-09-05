const GuideRepository = require("../repositories/guideRepository");

const GuideService = {
  getAll: async () => {
    return await GuideRepository.getAll(); // array
  },

  getById: async (id) => {
    if (!id) throw new Error("ID wajib diisi");
    const results = await GuideRepository.getById(id);
    return results[0] || null; // 🔹 balikin objek tunggal, bukan array
  },

  create: async (nama, link) => {
    if (!nama || !link) throw new Error("Nama dan Link wajib diisi");
    return await GuideRepository.create(nama, link);
  },

  update: async (id, nama, link) => {
    if (!id || !nama || !link) throw new Error("Data tidak lengkap");
    return await GuideRepository.update(id, nama, link);
  },

  delete: async (id) => {
    if (!id) throw new Error("ID wajib diisi");
    return await GuideRepository.delete(id);
  }
};

module.exports = GuideService;
