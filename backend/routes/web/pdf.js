const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const GuideService = require("../../services/guideService");

router.get("/guides/pdf", (req, res) => {
  GuideService.getAllGuides((err, results) => {
    if (err) return res.status(500).send("Gagal ambil data");

    // Set response sebagai PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=guides.pdf");

    const doc = new PDFDocument();
    doc.pipe(res);

    // Judul
    doc.fontSize(18).text("Daftar Guide NIKKE", { align: "center" });
    doc.moveDown();

    // Isi data
    results.forEach((guide, index) => {
      doc.fontSize(12).text(`${index + 1}. ${guide.Nama} - ${guide.Link}`);
    });

    doc.end();
  });
});

module.exports = router;
