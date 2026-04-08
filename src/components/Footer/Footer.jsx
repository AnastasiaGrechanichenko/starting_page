import React from 'react'
import './Footer.css';


export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-columns'>
          
          <div className='footer-column'>
            <h3 className='footer-column-title'>Поддержка</h3>
            <ul className='footer-column-list'>
              <li>📞 +7 (999) 123-45-67</li>
              <li>✉ info@bookstore.ru</li>
              <li>📍 Ростов, ул. Красноармейская, 5</li>
              <li>Время работы: Пн-Вс 10:00-22:00</li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>О компании</h3>
            <ul className='footer-column-list'>
              <li><a href='/about'>О магазине</a></li>
              <li><a href='/privacy'>Политика конфиденциальности</a></li>
              <li><a href='/terms'>Пользовательское соглашение</a></li>
              <li><a href='/loyalty'>Программа лояльности</a></li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>Карьера</h3>
            <ul className='footer-column-list'>
              <li><a href='/vacancies'>Вакансии</a></li>
              <li><a href='/internships'>Стажировки</a></li>
              <li><a href='/resume'>Отправить резюме</a></li>
            </ul>
          </div>

          <div className='footer-column'>
            <h3 className='footer-column-title'>Подборки</h3>
            <ul className='footer-column-list'>
              <li><a href='/collections'>Подборки книг</a></li>
              <li><a href='/novelty'>Новинки</a></li>
              <li><a href='/bestsellers'>Бестселлеры</a></li>
              <li><a href='/preorder'>Скоро в продаже</a></li>
            </ul>
          </div>
        </div>

      <div className='footer-bottom'>
        <p>© 2026, Bookstore. Все права защищены.</p>
      </div>
  </footer>
  );
}
