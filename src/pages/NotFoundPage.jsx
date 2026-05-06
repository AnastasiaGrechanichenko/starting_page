import React from 'react'
import { Link } from 'react-router-dom'
import  './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className='notfound-wrapper'>
        <h2> Увы, страница не найдена!</h2>
        <div className='center-notfound'>
            <img src='/404-icon.png' className='books-404'/>
            <span className='numbers404'>404</span>
        </div>
        <button className='btn-return'>
            <Link to="/">Вернуться на главную </Link>
        </button>
    </div>
  )
}
