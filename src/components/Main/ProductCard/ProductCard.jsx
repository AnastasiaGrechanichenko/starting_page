import React from 'react'
import './ProductCard.css'

export default function ProductCard({id,image,title,author,oldPrice,price,link}) {
  return (
    <div className='product-card'>
      <a href={link} className='title'>
        <img src={image} alt={title} className='card-image'/>
      </a>
      <div className='card-info'>
        <a href={link} className='card-title'>
          {title}
        </a>
        <p className='card-author'>{author}</p>
        <div className='prices'>
          <span className='card-old-price'>{oldPrice} ₽</span>
          <span className='card-price'>{price} ₽</span>
        </div>

        <div className='buttons'>
        <button className='cart-btn'> 
          Купить 
          </button>
        <button className='wishlist-btn'>
          <img src='/favorites.png'/>
        </button>
        </div>
      </div>
    </div>
  );
}
