import React from 'react'
import './DropdownCatalog.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export default function DropdownCatalog() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () =>setIsOpen(false);
  return (
    <div className='dropdown'>
        <button className='dropdown-btn' onClick={toggleMenu}>
            Каталог
        </button>
        { isOpen && (
            <ul className='dropdown-menu'>
                <li><Link to = "/catalog" onClick={closeMenu}>Все книги</Link></li>
                <li><Link to = "/catalog?category=novelty" onClick={closeMenu}>Новинки</Link></li>
                <li><Link to = "/catalog?category=poetry" onClick={closeMenu}>Поэзия</Link></li>
                <li><Link to = "/catalog?category=detective" onClick={closeMenu}>Детективы</Link></li>
                <li><Link to = "/catalog?category=educational" onClick={closeMenu}>Учебная литература</Link></li>
                <li><Link to = "/catalog?category=manga" onClick={closeMenu}>Манга</Link></li>
                <li><Link to = "/catalog?category=sci-fi" onClick={closeMenu}>Фантастика</Link></li>
                <li><Link to="/catalog?category=bestseller" onClick={closeMenu}>Бестселлеры</Link></li>
            </ul>
        )}
      
    </div>
  );
}
