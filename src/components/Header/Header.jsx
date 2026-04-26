import React from 'react'
import './Header.css'
import {FaUser,FaBox,FaHeart,FaShoppingCart,FaSearch} from 'react-icons/fa'

export default function Header() {
  return (
    <header className='header'> 
        <div className='header-top'>
            <div className='header-left'>
                <img src="/logo_bookstore.png" alt="Bookstore Logo" className="logo-image" />
            </div>
            <div className='header-center'>
                <div className='catalog'>
                    Каталог
                </div>
                <div className='search'>
                    <input type='text' placeholder='Введите название книги или автора...' className='search-input'/>
                    <button className='search-btn'>
                        <FaSearch/>
                    </button>
                </div>

            </div>
            <div className='header-right'>
                <div className='btns'>
                    <button className='icon-btn' title='Войти'>
                        <FaUser/>
                    </button>
                    <span btns-text>Профиль</span>
                </div>
                <div className='btns'>
                    <button className='icon-btn' title='Заказы'>
                        <FaBox/>
                    </button>
                    <span btns-text>Заказы</span>
                </div>
                    <div className='btns'>
                    <button className='icon-btn'title='Избранное'>
                        <FaHeart/>
                    </button>
                    <span btns-text>Избранное</span>
                </div>
                <div className='btns'>
                    <button className='icon-btn cart' title='Корзина'>
                        <FaShoppingCart/>
                    </button>
                    <span btns-text>Корзина</span>
                </div>
            </div>
        </div>
        <div className='mob-nav-links'>
            <a href="/stores">Наши магазины</a>
            <a href="/discounts">Скидки</a>
            <a href="/delivery">Доставка</a>
        </div>


        <div className='header-bottom-wrapper'>
            <div className='header-bottom'>
                <nav >
                    <ul className='navigation-list'>
                        <li><a href='#'>О нас </a></li>
                        <li><a href='#'>Доставка и оплата</a></li>
                        <li><a href='#'>Скидки</a></li>
                        <li><a href='#'>Подарочные сертификаты</a></li>
                        <li><a href='#'>Другое</a></li>
                        <li><a href='#' className='social-link'>Мы в соцсетях</a></li>
                        <li className='geolocation'><a href='#'>📍Москва </a></li>
                        <li className='number'> +7 (999) 123-45-67</li>

                    </ul>
                </nav>
            </div>
        </div> 
    </header>
  );
}
