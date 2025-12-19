// src/routes/files.js
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ File upload route
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    filename: req.file.filename,
    original: req.file.originalname,
  });
});

// ✅ Mock OCR processing
router.post("/ocr", upload.single("image"), async (req, res) => {
  try {
    if (process.env.MOCK_AI === "true") {
      console.log("⚡ Using MOCK_AI OCR mode");
      return res.json({
        text: "Mock OCR output: Detected 'TypeError: Cannot read property length of undefined'.",
      });
    }

    // If you later install Tesseract.js / Python OCR, hook real logic here.
    return res.json({
      text: "OCR not implemented yet",
    });
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ error: "OCR failed" });
  }
});

export default router;
