import React from "react";
import "./Cart.css";
import OrdersCheckout from "./OrdersCheckout/OrdersCheckout";
import CartOrders from "./CartOrders/CartOrders";
import useCartStore from "../../store/useCartStore";

export default function Cart() {
  const clearCart = useCartStore((state) =>state.clearCart);
  const cartItems = useCartStore((state) =>state.cartItems);

  const handleClearCart = () => {
    if (window.confirm("Вы уверены,что хотите полностью очистить корзину?")) {
      clearCart();
    }
  };
  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1 className="cart-header-name">Корзина</h1>
        {cartItems.length > 0 && (
          <button className="cart-remove-btn" onClick={handleClearCart}>Очистить корзину</button>
        )}
        </div>
      <div className="wrapper-orders">
        <CartOrders className='cart-left'/>
        {cartItems.length > 0 && <OrdersCheckout className='cart-right'/>}
      </div>
       
    </div>
  );
}


