import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './ContactsPage.css';

export default function Contactspage() {
  return (
    <div className='contacts-page'>
      <h1>Контакты</h1>
      <ul className="contacts-list">
        <li><FaPhone className="list-icon phone"  /> +7 (999) 123-45-67</li>
        <li><FaEnvelope className="list-icon mail" /> info@bookstore.ru</li>
        <li><FaMapMarkerAlt className="list-icon geo" /> г.Ростов-на-дону, ул. Красноармейская, 5</li>
        <li>
          <FaClock className="list-icon time" />
          <span>
            <strong>Пн–Пт:</strong> 8:00 – 20:00<br />
            <strong>Сб–Вс:</strong> 8:00 – 19:00
          </span>
        </li>
      </ul>
    </div>
  )
}
