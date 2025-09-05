const express = require("express");
const router = express.Router();
const GuideController = require("../../controllers/guideController");
const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

// ✅ Halaman daftar guide (render EJS)
router.get("/", isAuthenticated, GuideController.getAllGuidesWeb);

// ✅ Halaman tambah guide (hanya admin)
router.get("/add", isAdmin, GuideController.getAddGuidePage);
router.post("/", isAdmin, GuideController.postAddGuide);

// ✅ Halaman edit guide
router.get("/:id/edit", isAdmin, GuideController.getEditGuidePage);
router.put("/:id", isAdmin, GuideController.postEditGuide);

// ✅ Hapus guide
router.delete("/:id", isAdmin, GuideController.deleteGuide);

// PDF
router.get("/pdf", GuideController.generatePdf);

module.exports = router;
