import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [otchestvo, setOtchestvo] = useState('');
  const [group_numb, setGroupNumb] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateUser = (email, username, password, firstname, surname, otchestvo, group_numb) => {
    const errors = [];

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      errors.push('Неверный формат почты');
    }

    if (username.length < 5) {
      errors.push('Имя пользователя должно быть не менее 5 символов');
    }

    if (password.length < 6) {
      errors.push('Пароль должен быть не менее 6 символов');
    }

    if (!firstname) {
      errors.push('Имя обязательно для заполнения');
    }
    
    if (!surname) {
      errors.push('Фамилия обязательна для заполнения');
    }
    
    if (!otchestvo) {
      errors.push('Отчество обязательно для заполнения');
    }
    
    if (!group_numb) {
      errors.push('Номер группы обязателен для заполнения');
    }
    

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateUser(email, username, password, firstname, surname, otchestvo, group_numb);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:4000/auth/register', { email, username, password, firstname, surname, otchestvo, group_numb });
      setRegistrationSuccess(true);
      setErrors([]);
      setEmail('');
      setUsername('');
      setPassword('');
      setFirstname('');
      setSurname('');
      setOtchestvo('');
      setGroupNumb('');
      setMessage(''); 
    } catch (error) {
      setRegistrationSuccess(false); 
      setMessage(error.response.data.message || 'Не удалось зарегистрироваться');
    }
  };

  return (
    <div className="page-container">
    <div className='login-container'>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
      <input
          type="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Фамилия"
          required
        />
      <input
          type="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Имя"
          required
        />
        <input
          type="otchestvo"
          value={otchestvo}
          onChange={(e) => setOtchestvo(e.target.value)}
          placeholder="Отчество"
          required
        />
        <input
          type="group_numb"
          value={group_numb}
          onChange={(e) => setGroupNumb(e.target.value)}
          placeholder="Номер группы"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      {registrationSuccess && ( 
        <div>
          <p>Вы успешно зарегистрированы!</p>
          <p style={{ marginTop: '10px' }}>
            <Link to="/login">Перейти на страницу входа</Link>
          </p>
        </div>
      )}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
    </div>

  );
};

export default Register;
