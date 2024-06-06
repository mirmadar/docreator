const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const ReportModel = require('../models/reportModel');
const generateReport = require('../utils/reportGenerator');
const upload = require('../middleware/upload');

router.post('/report', authenticateJWT, upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.userId;
        const { subject } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'Ошибка аутентификации: userId отсутствует' });
        }
        const textData = req.body;
        const file = req.file;

        const buffer = await generateReport(textData, file, subject); 
        const reportId = await ReportModel.create(userId, buffer);
        res.json({ message: 'Отчет успешно создан', reportId });
    } catch (error) {
        console.error("Ошибка при создании отчета:", error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.get('/report/:reportId', authenticateJWT, async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const userId = req.user.userId;

    const report = await ReportModel.getById(reportId, userId);

    if (!report) {
      return res.status(404).json({ message: 'Отчет не найден' });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=report.docx');
    res.send(report.report_data); 
  } catch (error) {
    console.error("Ошибка при получении отчета:", error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
