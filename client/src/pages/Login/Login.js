import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect сработал", user);
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setMessage('');

    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        username,
        password,
      });
      if (response.data.token) {
        await login(response.data); 
      } else {
        setMessage('Не удалось получить токен');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div className="page-container">
    <div className="login-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleLogin}>
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button> 
      </form>
      {message && <p>{message}</p>}
      <p>
        Если у вас еще нет аккаунта, вы можете{' '}
        <Link to="/register">зарегистрироваться</Link>.
      </p>
    </div>
    </div>
  );
};

export default Login;