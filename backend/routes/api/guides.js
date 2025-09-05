const express = require("express");
const router = express.Router();
const GuideController = require("../../controllers/guideController");
const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");
const checkRole = require("../../middlewares/checkRole");

// ✅ API: Ambil semua guide
router.get("/", GuideController.getAllGuidesApi);

// ✅ API: Ambil 1 guide by ID
router.get("/:id", isAuthenticated, GuideController.getGuideById);

// ✅ API: Tambah guide (hanya admin)
router.post("/", checkRole("admin"), isAdmin, GuideController.createGuide);

// ✅ API: Update guide
router.put("/:id", checkRole("admin"), isAdmin, GuideController.updateGuide);

// ✅ API: Hapus guide
router.delete("/:id", checkRole("admin"), isAdmin, GuideController.deleteGuideApi);

// ✅ API: Generate PDF
router.get("/export/pdf", isAuthenticated, GuideController.generatePdfApi);

module.exports = router;
