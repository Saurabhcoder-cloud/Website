import express from 'express';
import multer from 'multer';

import { processTaxDocument } from '../utils/ocrHandler.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

router.post('/upload', upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'missing_file',
      message: 'Please provide a W-2 or 1099 document in the "document" field.'
    });
  }

  const { filing_status: filingStatus = 'single', dependents = '0' } = req.body ?? {};

  try {
    const processed = await processTaxDocument(req.file.buffer, {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      filingStatus,
      dependents
    });

    const downloadUrl = `data:application/pdf;base64,${processed.pdfBuffer.toString('base64')}`;

    return res.json({
      message: 'Document processed successfully.',
      file: {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size
      },
      fields: processed.extractedFields,
      form1040: processed.form1040,
      tax_summary: processed.taxSummary,
      download_url: downloadUrl
    });
  } catch (error) {
    console.error('OCR upload failed:', error);
    const retriableErrors = new Set(['VisionCredentialsError', 'VisionApiError']);
    const status = retriableErrors.has(error.name) ? 500 : 422;
    return res.status(status).json({
      error: 'ocr_processing_failed',
      message: error.message || 'Unable to process the uploaded document at this time.'
    });
  }
});

export default router;
