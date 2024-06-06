const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ userId: user.user_id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ 
      token, 
      user: { 
        user_id: user.user_id, 
        username: user.username, 
        email: user.email 
      } 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, email, firstname, surname, otchestvo, group_numb } = req.body;

    const existingUser = await User.findByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.createUser(username, hashedPassword, email, firstname, surname, otchestvo, group_numb);

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ 
      user: { 
        user_id: user.user_id, 
        username: user.username, 
        email: user.email,
        firstname: user.firstname,
        surname: user.surname,
        otchestvo: user.otchestvo,
        group_numb: user.group_numb
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка получения профиля' });
  }
};
