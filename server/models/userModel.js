const db = require('../config/db');

class User {
  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findById(user_id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows[0];
  }

  static async createUser(username, password, email, firstname, surname, otchestvo, group_numb) {
    const [result] = await db.execute(
      'INSERT INTO users (username, password, email, firstname, surname, otchestvo, group_numb) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, password, email, firstname, surname, otchestvo, group_numb]
    );
    return result.insertId;
  }
}

module.exports = User;
