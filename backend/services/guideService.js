const GuideRepository = require("../repositories/guideRepository");
const { formatDate } = require("../helpers/dateHelper");
const logger = require("../utils/logger");

const GuideService = {
  getAll: async () => {
    logger.info(`getAll guides dipanggil pada ${formatDate()}`);
    return await GuideRepository.getAll(); // array
  },

  getById: async (id) => {
    if (!id) throw new Error("ID wajib diisi");
    const results = await GuideRepository.getById(id);
    logger.info(`getById guide id=${id} dipanggil pada ${formatDate()}`);
    return results[0] || null;
  },

  create: async (nama, link) => {
    if (!nama || !link) throw new Error("Nama dan Link wajib diisi");
    const guide = await GuideRepository.create(nama, link);
    logger.info(`Guide ${nama} dibuat pada ${formatDate()}`);
    return guide;
  },

  update: async (id, nama, link) => {
    if (!id || !nama || !link) throw new Error("Data tidak lengkap");
    const updated = await GuideRepository.update(id, nama, link);
    logger.info(`Guide id=${id} diperbarui pada ${formatDate()}`);
    return updated;
  },

  delete: async (id) => {
    if (!id) throw new Error("ID wajib diisi");
    const deleted = await GuideRepository.delete(id);
    logger.info(`Guide id=${id} dihapus pada ${formatDate()}`);
    return deleted;
  }
};

module.exports = GuideService;
