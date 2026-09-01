import React from 'react'
import './Header.css'
import {FaUser,FaBox,FaHeart,FaShoppingCart,FaSearch,FaSignOutAlt} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom';
import DropdownCatalog from '../DropdownCatalog/DropdownCatalog';
import {useAuthStore} from '../../store/useAuthStore'
import { useState } from 'react';

export default function Header() {
    const isAuthenticated = useAuthStore((state)=> state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    const [searchQuery,setSearchQuery]=useState('');
    const handleLogout = () => {
        logout();
    
    };

    const handleSearch =(e)=> {
        e.preventDefault();
        if(searchQuery.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
        }else {
            navigate('/catalog');
        }
    };
  return (
    <header className='header'> 
        <div className='header-top'>
            <div className='header-left'>
                <Link to="/">
                <img src="/logo_bookstore.png" alt="Bookstore Logo" className="logo-image" />
                </Link>
            </div>
            <div className='header-center'>
                <DropdownCatalog/>
                <form className='search' onSubmit={handleSearch}>
                    <input type='text'
                       placeholder='Введите название книги или автора...' className='search-input'
                       value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        />
                    <button type='submit'className='search-btn'>
                        <FaSearch/>
                    </button>
                </form>

            </div>
            <div className='header-right'>
                {isAuthenticated ? (
        <div className='btns'>
          <Link to='/profile'>
            <button className='icon-btn profile-btn' title='Профиль'>
                <FaUser/>
            </button>
            <span className='btns-text user-name'>{user?.name || user?.login}</span>
          </Link>
        </div>
    ) : (
        <Link to='/login' className='btns'>
            <button className='icon-btn' title='Войти'>
                <FaUser/>
            </button>
            <span className='btns-text'>Войти</span>
        </Link>
    )}


                {isAuthenticated && (
                    <Link to = '/orders' className='btns'>
                        <button className ='icon-btn' title='Заказы'>
                            <FaBox/>
                        </button>
                        <span className='btns-text'>Заказы</span>
                    </Link>
                )}

                 {isAuthenticated && (
                    <Link to = '/favorites' className='btns'>
                        <button className ='icon-btn' title='Избранное'>
                            <FaHeart/>
                        </button>
                        <span className='btns-text'>Избранное</span>
                    </Link>
                )}

                <Link to = '/cart' className='btns'>
                    <button className='icon-btn cart' title='Корзина'>
                        <FaShoppingCart/>
                    </button>
                    <span className='btns-text'>Корзина</span>
                </Link>

                {isAuthenticated && (
                    <div className='btns'>
                        <button className='icon-btn logout-btn' onClick={handleLogout} title='Выйти'>
                            <FaSignOutAlt/>
                        </button>
                        <span className='btns-text'>Выйти</span>
                </div>
    )}


              </div>
            </div>

        <div className='mob-nav-links'>
            <Link to="/about">О нас</Link>
            <Link to="/discounts">Скидки</Link>
            <Link to="/delivery">Доставка</Link>
        </div>


        <div className='header-bottom-wrapper'>
            <div className='header-bottom'>
                <nav >
                    <ul className='navigation-list'>
                        <li><a href='/about'>О нас </a></li>
                        <li><a href='delivery'>Доставка и оплата</a></li>
                        <li><a href='discounts'>Скидки</a></li>
                        <li><a href='contacts' className='social-link'>Контакты</a></li>
                        <li className='number'> +7 (999) 123-45-67</li>
                    </ul>
                </nav>
            </div>
        </div> 
    </header>
  );
}
