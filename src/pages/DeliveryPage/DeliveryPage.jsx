import React from 'react'
import { FaBox, FaCreditCard, FaTruck,FaPhone } from 'react-icons/fa'
import './DeliveryPage.css'

export default function DeliveryPage() {
  return (
    <div className='delivery-page'>
      <h1>Доставка и оплата</h1>

      <section>
       
        <h2><FaTruck className='delivery-icon truck'/>Доставка</h2>
        <p>
          Мы отправляем книги по всей России. Заказы обрабатываются в течение 
          1–2 рабочих дней. Сроки и стоимость зависят от выбранного способа:
        </p>
        <ul>
          <li>
            <strong>Почта России</strong> – от 3 до 7 дней, стоимость от 
            <strong> 150 ₽</strong> (зависит от веса и региона).
          </li>
          <li>
            <strong>СДЭК</strong> – от 2 до 5 дней, точная стоимость 
            рассчитывается при оформлении заказа.
          </li>
        </ul>
        <p>
          <strong>Бесплатная доставка</strong> при заказе от <strong>3500 ₽</strong> 
          (для любого способа).
        </p>
      </section>

      <section>
        <h2><FaCreditCard className='delivery-icon'/> Оплата</h2>
        <p>Мы принимаем следующие способы оплаты:</p>
        <ul>
          <li>Банковские карты <strong>МИР</strong>.</li>
          <li>Электронные кошельки <strong>ЮMoney</strong> и <strong>QIWI</strong>.</li>
        </ul>
      </section>

      <section>
        <h2><FaBox className='delivery-icon box'/> Как отследить заказ?</h2>
        <p>
          После отправки вы получите трек-номер на email и в личном кабинете. 
          Отслеживать статус можно на сайте почты или СДЭК.
        </p>
      </section>

      <section>
        <h2><FaPhone className='delivery-icon support'/> Поддержка</h2>
        <p>
          Если у вас возникли вопросы, напишите нам на почту{' '}
          <a href="mailto:info@bookstore.ru">info@bookstore.ru</a> или позвоните 
          по телефону <strong>+7 (999) 123-45-67</strong>.
        </p>
      </section>
    </div>
  )
}
