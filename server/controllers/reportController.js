const ReportModel = require('../models/reportModel');
const generateReport = require('../utils/reportGenerator');

const createReport = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Ошибка аутентификации: userId отсутствует' });
    }

    const buffer = await generateReport(req.body);
    const reportId = await ReportModel.create(userId, buffer);
    res.json({ message: 'Отчет успешно создан', reportId });
  } catch (error) {
    console.error("Ошибка при создании отчета:", error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { createReport };
