import React from "react";
import "./ProductCard.css";
import {Link,useNavigate} from "react-router-dom"
import {cartApi} from "../../../api/cartApi"
import {useFavoritesStore} from "../../../store/useFavoritesStore"
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";
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
  const { isFavorite,toggleFavorite}=useFavoritesStore();
  const navigate = useNavigate();
  const [favPending,setFavPending]=useState(false);
  
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

  const handleToggleFavorite = async(e)=> {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setFavPending(true);
    await toggleFavorite(id);
    setFavPending(false);


  };
  const active = isFavorite(id);

  return (
    <div className="product-card">
      <Link to={link} className="title">
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="card-image" />
          <button 
           className={`card-fav-btn ${active ?'active':''}`}
           onClick={handleToggleFavorite}
           disabled={favPending}
           title={active ?'Удалить из избранного':'Добавить в избранное'}
          >

            {active?<FaHeart/>:<FaRegHeart/>}
          </button>
         </div>
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
      </div>
    </div>
  );
}
