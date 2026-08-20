import React from 'react'
import { FaCoins,FaRocket } from 'react-icons/fa'
import './DiscountsPage.css'
export default function DiscountsPage() {
  return (
    <div className='discounts-page'>
      <h1>Скидки и бонусы</h1>

      <section>
        <h2><FaCoins className='discount-icon coins'/>Накопительная система</h2>
         <p>Мы ценим своих читателей и подготовили для вас систему лояльности:</p>
        <ul>
          <li><strong>За каждую покупку</strong> вы получаете баллы – <strong>10%</strong> от суммы заказа.</li>
          <li><strong>1 балл = 1 рубль</strong> скидки при следующем заказе.</li>
          <li>Вы можете списать до <strong>50%</strong> от стоимости заказа.</li>
          <li>Баллы начисляются после <strong>оплаты и подтверждения</strong> заказа.</li>
        </ul>
      </section>

      <section>
        <h2><FaRocket className="discount-icon rocket" /> Текущие акции</h2>
        <ul>
          <li><strong>Бесплатная доставка</strong> при заказе от <strong>3500 ₽</strong>.</li>
        </ul>
        <p>Следите за нашими новыми акциями!</p>
      </section>
    </div>
  )
}
