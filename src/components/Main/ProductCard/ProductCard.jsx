import React from "react";
import "./ProductCard.css";
import {Link,useNavigate} from "react-router-dom"
import {cartApi} from "../../../api/cartApi"
import { useAuthStore } from "../../../store/useAuthStore";

export default function ProductCard({
  id,
  image,
  title,
  author,
  oldPrice,
  price,
  link,
}) {
  const isAuthenticated = useAuthStore((state)=> state.isAuthenticated);
  const navigate = useNavigate()

  const handleAddToCart = async(e)=> {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
    await cartApi.addItem({book_id:id,quantity:1});
    alert (`"${title}" добавлена в корзину`);
  } catch(err) {
    alert(err.message ||"Ошибка при добавлении в корзину")
  }
};

  return (
    <div className="product-card">
      <Link to={link} className="title">
        <img src={image} alt={title} className="card-image" />
      </Link>
      <div className="card-info">
        <Link to={link} className="card-title">
          {title}
        </Link>
        <p className="card-author">{author}</p>
        <div className="prices">
          <span className="card-old-price">{oldPrice} ₽</span>
          <span className="card-price">{price} ₽</span>
        </div>
      </div>
      <div className="buttons">
        <button className="cart-btn" onClick={handleAddToCart}>Купить</button>
        <button className="wishlist-btn">
          <img src="/favorites.png" />
        </button>
      </div>
    </div>
  );
}
