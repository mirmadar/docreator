import React from 'react';
import './Homepage.css';
import step1Image from '../../assets/step1.png';
import step2Image from '../../assets/step2.png'; 
import step3Image from '../../assets/step3.png'; 
import step4Image from '../../assets/step4.png'; 

const Homepage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Docreator</h1>
      <p>
      <span className="highlight">DoCreator</span> - это приложение, созданное для автоматизации процесса составления отчетов.
        Наше решение позволяет быстро и эффективно создавать, редактировать и управлять отчетами,
        экономя ваше время и улучшая качество вашей работы.
      </p>
      <div className="steps-container">
        <div className="step">
          <h2>Шаг 1</h2>
          <img src={step1Image} alt="Step 1" className="step-image" />
          <hr />
          <p>Зарегистрируйтесь</p>
        </div>
        <div className="step">
          <h2>Шаг 2</h2>
          <img src={step2Image} alt="Step 2" className="step-image" />
          <hr />
          <p>Выберите категорию</p>
        </div>
        <div className="step">
          <h2>Шаг 3</h2>
          <img src={step3Image} alt="Step 3" className="step-image" />
          <hr />
          <p>Заполните формы</p>
        </div>
        <div className="step">
          <h2>Шаг 4</h2>
          <img src={step4Image} alt="Step 4" className="step-image" />
          <hr />
          <p>Скачайте готовый отчет</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
