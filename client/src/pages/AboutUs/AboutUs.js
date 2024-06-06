import React from 'react';
import './AboutUs.css';
import teamPhoto from '../../assets/team.png';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="description">
          <p>
            <span className="highlight">DoCreator</span> - это инновационное приложение, предназначенное для автоматизации процесса создания отчетов. Наша миссия - предоставить пользователям простой и эффективный способ создания профессиональных отчетов, экономя их драгоценное время и ресурсы.
          </p>
          <p>
            С помощью <span className="highlight">DoCreator</span> вы можете легко создавать подробные отчеты, настраивать их в соответствии со своими потребностями и без особых усилий делиться ими с другими пользователями. Присоединяйтесь к нам в нашем стремлении кардинально изменить способ создания отчетов.
          </p>
            <p>
            Наша команда состоит из опытных профессионалов, которые являются экспертами в своих областях. Мы работаем вместе, чтобы предоставить вам лучшие инструменты для создания отчетов и обеспечить безупречный пользовательский опыт.
            </p>
        </div>
            <div className="team-photo">
              <img src={teamPhoto} alt="Our Team" />
              <p className='mem'>"Наша команда"</p>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
