const pool = require('../config/db'); 

class ReportModel {
  static async create(userId, reportData) {
    try {
      const [result] = await pool.query(
        'INSERT INTO documents (user_id, report_data, created_at) VALUES (?, ?, NOW())',
        [userId, reportData]
      );
      return result.insertId;
    } catch (error) {
      console.error('Ошибка при создании отчета:', error);
      throw error;
    }
  }

  static async getById(reportId, userId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM documents WHERE id = ? AND user_id = ?',
        [reportId, userId]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Ошибка при получении отчета:', error);
      throw error;
    }
  }
}

module.exports = ReportModel;
