import React from 'react'
import {FaBars,FaUser,FaHeart,FaShoppingCart, FaBox} from 'react-icons/fa'
import './MobileBottomNav.css'
import { Link } from 'react-router-dom';

export default function MobileBottomNav() {
  return (
    <div className='mob-bottom-nav'>
    <ul>
        <li><Link to="/catalog">
            <FaBars/>
            Каталог
        </Link></li>
        <li><Link to="/profile">
            <FaUser/>
            Профиль
        </Link></li>
        <li><Link to="/favorites">
            <FaHeart/>
            Избранное
        </Link></li>
        <li><Link to="/cart">
            <FaShoppingCart/>
            Корзина
            </Link></li>
    </ul>
 
    </div>
  );
}
