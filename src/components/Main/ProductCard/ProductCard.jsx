import React from "react";
import "./ProductCard.css";
import useCartStore from '../../../store/useCartStore';

export default function ProductCard({
  id,
  image,
  title,
  author,
  oldPrice,
  price,
  link,
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const book = {
      id: id,
      title: title,
      author: author,
      price: price,
      oldPrice: oldPrice,
      cover : image,
      quantity: 1,
    };
    addToCart(book,1)
    alert(`"${title}" добавлена в корзину`);
    console.log('Добавляем книгу:', book);
    console.log('Корзина после добавления:', useCartStore.getState().cartItems);
  };


  return (
    <div className="product-card">
      <a href={link} className="title">
        <img src={image} alt={title} className="card-image" />
      </a>
      <div className="card-info">
        <a href={link} className="card-title">
          {title}
        </a>
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
