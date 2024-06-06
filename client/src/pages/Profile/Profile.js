import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';
import SubjectForm1 from './SubjectForm1';
import SubjectForm2 from './SubjectForm2';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { logout } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfileData(response.data.user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('subject', selectedSubject);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axios.post('http://localhost:4000/profile/report', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 && response.data.reportId) {
        const reportId = response.data.reportId;

        const fetchResponse = await fetch(`http://localhost:4000/profile/report/${reportId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!fetchResponse.ok) {
          throw new Error(fetchResponse.statusText);
        }

        const blob = await fetchResponse.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'report.docx');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
        link.remove();
      } else {
        console.error('Не удалось создать отчет', response);
      }
    } catch (error) {
      console.error('Ошибка при отправке отчета:', error);
    }
  };

  const renderSubjectForm = () => {
    switch (selectedSubject) {
      case 'subject1':
        return <SubjectForm1 onChange={handleChange} />;
      case 'subject2':
        return <SubjectForm2 onChange={handleChange} />;
      default:
        return null;
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <p>{profileData.surname} {profileData.firstname} {profileData.otchestvo}</p>
        <p>{profileData.group_numb}</p>
        <p>{profileData.email}</p>
        <button className="logout-button" onClick={logout}>Выйти</button>
      </div>
      <div className="profile-content">
        <div>
          <label htmlFor="subjectSelect">Выберите предмет:</label>
          <select id="subjectSelect" onChange={handleSubjectChange}>
            <option value="">-- Выберите --</option>
            <option value="subject1">
              Разработка клиент-серверных приложений
            </option>
            <option value="subject2">
              Технологии обработки транзакций клиент-серверных приложений
            </option>
          </select>
        </div>

        {selectedSubject && (
          <form onSubmit={handleSubmit}>
            {renderSubjectForm()}
            <button type="submit">Скачать отчет</button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Profile;

