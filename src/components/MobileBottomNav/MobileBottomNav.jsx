import React from 'react'
import {FaBars,FaUser,FaHeart,FaShoppingCart, FaBox} from 'react-icons/fa'
import './MobileBottomNav.css'

export default function MobileBottomNav() {
  return (
    <div className='mob-bottom-nav'>
    <ul>
        <li><a href="/">
            <FaBars/>
            Каталог
        </a></li>
        <li><a href="/">
            <FaUser/>
            Профиль
        </a></li>
        <li><a href="/">
            <FaHeart/>
            Избранное
        </a></li>
        <li><a href="/">
            <FaShoppingCart/>
            Корзина
            </a></li>
    </ul>
 
    </div>
  );
}
