import React from 'react'
import './BonusCard.css';

export default function BonusCard() {
  return (
    <div className='bonus-card'>
      <img src='/gift.png' alt='Подарок' className='image-left'/>
      <div className='content'>
        <h1>Bookstore</h1>
        <p className='log-in'>Войдите в личный кабинет</p>
        <p className='cashback'>Гарантированный кэшбек до 20% </p>
        <button className='login-button'>Войти</button>
        </div>
      <img src='/card-payment.png' alt='Бонусы' className='image-right'/>

    </div>
  )
}
