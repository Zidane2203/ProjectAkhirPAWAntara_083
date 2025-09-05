const GuideService = require("../services/guideService");
const PDFDocument = require("pdfkit");

const GuideController = {
  // --- WEB (EJS) ---
  getAllGuidesWeb: async (req, res) => {
    try {
      const guides = await GuideService.getAll();
      res.render("guide", {
        layout: "layouts/main-layout",
        guides,
        user: req.session.user,
        errors: [] // ✅ default kosong
      });
    } catch (err) {
      console.error("Error getAllGuidesWeb:", err);
      req.flash("error", "Gagal mengambil data guide");
      res.redirect("/");
    }
  },

  getAddGuidePage: (req, res) => {
    res.render("guides/add", {
      layout: "layouts/main-layout",
      user: req.session.user,
      errors: [] // ✅ default kosong
    });
  },

  postAddGuide: async (req, res) => {
    try {
      const { nama, link } = req.body;
      if (!nama || !link) {
        return res.render("guide/add", {
          layout: "layouts/main-layout",
          user: req.session.user,
          errors: ["Nama dan link wajib diisi"]
        });
      }

      await GuideService.create(nama, link);
      req.flash("success", "Guide berhasil ditambahkan");
      res.redirect("/guides");
    } catch (err) {
      console.error("Error postAddGuide:", err);
      res.render("guide/add", {
        layout: "layouts/main-layout",
        user: req.session.user,
        errors: ["Terjadi kesalahan saat menambahkan guide"]
      });
    }
  },

  getEditGuidePage: async (req, res) => {
    try {
      const guide = await GuideService.getById(req.params.id);
      if (!guide) {
        req.flash("error", "Guide tidak ditemukan");
        return res.redirect("/guides");
      }

      res.render("edit-guide", {   // 🔹 benerin nama view
        layout: "layouts/main-layout",
        guide,
        user: req.session.user,
        errors: []
      });
    } catch (err) {
      console.error("Error getEditGuidePage:", err);
      req.flash("error", "Terjadi kesalahan");
      res.redirect("/guides");
    }
  },

  postEditGuide: async (req, res) => {
    try {
      const { nama, link } = req.body;
      if (!nama || !link) {
        return res.render("edit-guide", {   // 🔹 benerin nama view
          layout: "layouts/main-layout",
          guide: { ID: req.params.id, Nama: nama, Link: link }, // 🔹 samakan key dengan DB
          user: req.session.user,
          errors: ["Nama dan link wajib diisi"]
        });
      }

      await GuideService.update(req.params.id, nama, link);
      req.flash("success", "Guide berhasil diupdate");
      res.redirect("/guides");
    } catch (err) {
      console.error("Error postEditGuide:", err);
      res.render("edit-guide", {   // 🔹 benerin nama view
        layout: "layouts/main-layout",
        guide: { ID: req.params.id, Nama: req.body.nama, Link: req.body.link },
        user: req.session.user,
        errors: ["Terjadi kesalahan saat mengupdate guide"]
      });
    }
  },

  deleteGuide: async (req, res) => {
    try {
      await GuideService.delete(req.params.id);
      req.flash("success", "Guide berhasil dihapus");
      res.redirect("/guides");
    } catch (err) {
      console.error("Error deleteGuide:", err);
      req.flash("error", "Gagal menghapus guide");
      res.redirect("/guides");
    }
  },

  generatePdf: async (req, res) => {
  try {
    const guides = await GuideService.getAll();

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=guides.pdf");

    doc.pipe(res);

    doc.fontSize(16).text("Daftar Guides", { align: "center" });
    doc.moveDown();

    guides.forEach((guide, i) => {
      doc.fontSize(12).text(`${i + 1}. ${guide.Nama} (${guide.Link})`);
    });

    doc.end();
  } catch (err) {
    console.error("Error generatePdf:", err);
    res.status(500).send("Gagal membuat PDF");
  }
},

  // --- API (React) ---
  getAllGuidesApi: async (req, res) => {
    try {
      const guides = await GuideService.getAll();
      res.json(guides);
    } catch (err) {
      console.error("Error getAllGuidesApi:", err);
      res.status(500).json({ message: "Gagal mengambil data guide" });
    }
  },

  getGuideById: async (req, res) => {
    try {
      const guide = await GuideService.getById(req.params.id);
      if (!guide) return res.status(404).json({ message: "Guide tidak ditemukan" });
      res.json(guide);
    } catch (err) {
      console.error("Error getGuideById:", err);
      res.status(500).json({ message: "Gagal mengambil guide" });
    }
  },

  createGuide: async (req, res) => {
    try {
      const { nama, link } = req.body;
      const newGuide = await GuideService.create(nama, link);
      res.status(201).json(newGuide);
    } catch (err) {
      console.error("Error createGuide:", err);
      res.status(500).json({ message: "Gagal menambahkan guide" });
    }
  },

  updateGuide: async (req, res) => {
    try {
      const { nama, link } = req.body;
      const updatedGuide = await GuideService.update(req.params.id, nama, link);
      res.json(updatedGuide);
    } catch (err) {
      console.error("Error updateGuide:", err);
      res.status(500).json({ message: "Gagal mengupdate guide" });
    }
  },

  deleteGuideApi: async (req, res) => {
    try {
      await GuideService.delete(req.params.id);
      res.json({ message: "Guide berhasil dihapus" });
    } catch (err) {
      console.error("Error deleteGuideApi:", err);
      res.status(500).json({ message: "Gagal menghapus guide" });
    }
  },

    // ✅ API PDF
    generatePdfApi: async (req, res) => {
      try {
        const guides = await GuideService.getAllGuides();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=guides.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(18).text("Daftar Guide NIKKE", { align: "center" });
        doc.moveDown();

        guides.forEach((g, i) => {
          doc.fontSize(12).text(`${i + 1}. ${g.Nama} - ${g.Link}`);
        });

        doc.end();
      } catch (err) {
        res.status(500).json({ message: "Gagal generate PDF", error: err.message });
      }
    }
};

module.exports = GuideController;
