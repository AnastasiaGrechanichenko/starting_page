import React, {useState,useEffect} from "react";
import "./Cart.css";
import OrdersCheckout from "./OrdersCheckout/OrdersCheckout";
import CartOrders from "./CartOrders/CartOrders";
import { cartApi } from "../../api/cartApi";

export default function Cart() {
  const[items,setItems]=useState([]);
  const[loading,setLoading]=useState(true);

  const refreshCart = async()=>{
    try {
      const response = await cartApi.getCart();
      setItems(response.items||[]);
    }catch(err) {
      console.error("Ошибка загрузки корзины:", err)
    }finally {
      setLoading(false)
    }
  };

  useEffect (()=>{
    refreshCart();
  },[]);

  const handleClearCart = async ()=> {
    if(window.confirm("Вы уверены, что хотите польностью очистить корзину?")) {
      try {
        await cartApi.clearCart();
        setItems([]);
      }catch(err) {
        alert(err.message ||"Ошибка при очистке корзины")
      }
    }
  };

  if (loading) {
    return <div className="cart-wrapper">Загрузка корзины</div>
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1 className="cart-header-name">Корзина</h1>
        {items.length > 0 && (
          <button className="cart-remove-btn" onClick={handleClearCart}>Очистить корзину</button>
        )}
        </div>
      <div className="wrapper-orders">
        <CartOrders 
        className='cart-left'
        items = {items}
        onUpdate = {refreshCart}
        />
        {items.length > 0 && <OrdersCheckout 
        className='cart-right'
        items = {items}
        onOrder = {refreshCart}
        />}
      </div>
    </div>
  );
}


