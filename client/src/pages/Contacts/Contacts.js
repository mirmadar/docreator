import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import './Contacts.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Свяжитесь с нами</h1>
      <div className="contact-info">
        <p>Email: mirmadar@mail.ru</p>
        <p>Телефон: +79252224686</p>
        <p>Адрес: г. Москва, пр-т Вернадского, д.78</p>
      </div>
      <MyMap />
    </div>
  );
};

const MyMap = () => (
  <YMaps>
    <div className="map-container">
      <Map defaultState={{ center: [55.669910, 37.480201], zoom: 15 }}>
        <Placemark geometry={[55.669910, 37.480201]} />
      </Map>
      <p>С претензиями обращайтесь по этому адресу &#10084;&#65039;</p>
    </div>
  </YMaps>
);

export default Contact;
