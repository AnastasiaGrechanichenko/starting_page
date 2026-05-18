import React from 'react';
import useCartStore from '../../../store/useCartStore';
import './OrdersCheckout.css';

export default function OrdersCheckout() {
 
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const handleCheckout = () => {
    alert('Функция оформления заказа будет добавлена позже');
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
      <button className="btn-checkout" onClick={handleCheckout}>Оформить</button>
    </div>
  );
}
