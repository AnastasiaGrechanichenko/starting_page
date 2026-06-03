import React from 'react'
import './DropdownCatalog.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export default function DropdownCatalog() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className='dropdown'>
        <button className='dropdown-btn' onClick={toggleMenu}>
            Каталог
        </button>
        { isOpen && (
            <ul className='dropdown-menu'>
                <li><Link to = "/catalog">Все книги</Link></li>
                <li><Link to = "/catalog?genre=novelties">Новинки</Link></li>
                <li><Link to = "/catalog?genre=poetry">Поэзия</Link></li>
                <li><Link to = "/catalog?genre=detective">Детективы</Link></li>
                <li><Link to = "/catalog?genre=educational">Учебная литература</Link></li>
                <li><Link to = "/catalog?genre=manga">Манга</Link></li>
                <li><Link to = "/catalog?genre=sci-fy">Фантастика</Link></li>
            </ul>
        )}
      
    </div>
  );
}
