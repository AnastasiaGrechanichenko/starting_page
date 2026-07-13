import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdersCheckout.css';
import { orderApi} from '../../../api/orderApi'

export default function OrdersCheckout({items, onOrder}) {
  const navigate = useNavigate();

  const totalItems=items.reduce((sum,item)=> sum + item.quantity, 0);
  const totalPrice = items.reduce((sum,item)=>sum + item.price*item.quantity,0);
  const totalDiscount = items.reduce((sum, item) => sum + (item.old_price - item.price) * item.quantity,0);

  const handleCheckout = async()=> {
    if(!items.length) return;
    try {
      await orderApi.createOrder();
      alert('Заказ оформлен!')
      onOrder();
      navigate('/orders')
    }catch(err){
      alert(err.message||'Ошибка при оформлении заказа')
    }
  };
 
  return (
    <div className="orders-checkout">
      <h3 className="checkout-title">Ваш заказ</h3>
      <div className="quantity-price">
        <span>Товаров:</span>
        <span>  {totalItems} шт</span>
      </div>
      <div className="sales">
        <span>Ваша скидка:  </span>
        <span>-   {totalDiscount} ₽</span>
      </div>
      <div className="finish-price">
        <span>Итого:  </span>
        <span>  {totalPrice}   ₽</span>
      </div>
      <button className="btn-checkout" onClick={handleCheckout} disabled = {!items.length}>Оформить</button>
    </div>
  );
}
