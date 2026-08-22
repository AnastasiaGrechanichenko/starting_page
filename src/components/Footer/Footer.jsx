import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-columns'>
          
          <div className='footer-column'>
            <h3 className='footer-column-title'>Поддержка</h3>
            <ul className='footer-column-list'>
              <li>+7 (999) 123-45-67</li>
              <li>info@bookstore.ru</li>
              <li>г.Ростов-на-Дону, ул. Красноармейская, 5</li>
              <li>
                <span>
                  <strong>Пн–Пт:</strong> 8:00 – 20:00<br />
                  <strong>Сб–Вс:</strong> 8:00 – 19:00
                </span></li>
              
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>О компании</h3>
            <ul className='footer-column-list'>
              <li><Link to='/about'>О магазине</Link></li>
              <li><Link to='/privacy'>Политика конфиденциальности</Link></li>
              <li><Link to='/terms'>Пользовательское соглашение</Link></li>
              <li><Link to='/discounts'>Программа лояльности</Link></li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>Карьера</h3>
            <ul className='footer-column-list'>
              <li><Link to='/vacancies'>Вакансии</Link></li>
              <li><Link to='/vacancies'>Отправить резюме</Link></li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>Подборки</h3>
            <ul className='footer-column-list'>
              <li><Link to ='/catalog'>Каталог</Link></li>
              <li><Link to='/catalog?category=novelty'>Новинки</Link></li>
              <li><Link to='/catalog?category=bestseller'>Бестселлеры</Link></li>
            </ul>
          </div>
        </div>

      <div className='footer-bottom'>
        <p>© 2026, Bookstore. Все права защищены.</p>
      </div>
  </footer>
  );
}
