import React from "react";
import "./Cart.css";

export default function Cart() {
  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1 className="cart-header-name">Корзина</h1>
        <button className="cart-remove-btn">Очистить корзину</button>
      </div>
      <div className="cart-items">
        <div className="item-img"></div>
        <div className="item-description">
          <div className="item-title"></div>
          <div className="item-author"></div>
        </div>
        <div className="quantity"></div>
        <div className="cost"></div>
      </div>
      <div className="cart-sidebar"></div>
    </div>
  );
}
