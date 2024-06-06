import React from 'react';
import './SubjectForm.css'; 

const SubjectForm1 = ({ onChange }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      const target = e.target;
      const selectionStart = target.selectionStart;
      const selectionEnd = target.selectionEnd;

      target.value = 
        target.value.substring(0, selectionStart) + 
        '\n' + 
        target.value.substring(selectionEnd);

      target.selectionStart = target.selectionEnd = selectionStart + 1;
      
      onChange(e); 
    }
  };

  return (
    <div className="subject-form-container">
      <h3>Дисциплина: Разработка клиент-серверных приложений</h3>
      <div>
        <label htmlFor="title1">Заголовок:</label>
        <input 
          type="text" 
          id="title1" 
          name="title1" 
          onChange={onChange} 
          onKeyDown={handleKeyDown} 
        />
      </div>
      <div>
        <label htmlFor="text1">Текст:</label>
        <textarea 
          id="text1" 
          name="text1" 
          onChange={onChange} 
          onKeyDown={handleKeyDown} 
        />
      </div>
      <div>
        <label htmlFor="photo">Рисунок:</label>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          onChange={onChange} 
        />
      </div>
      <div>
        <label htmlFor="sign1">Подпись для рисунка:</label>
        <textarea 
          id="sign1" 
          name="sign1" 
          onChange={onChange} 
          onKeyDown={handleKeyDown} 
        />
      </div>
    </div>
  );
};

export default SubjectForm1;
