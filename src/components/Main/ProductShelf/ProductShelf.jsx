import React from 'react'
import './ProductShelf.css'
import ProductCard from '../ProductCard/ProductCard'

export default function ProductShelf({title,products}) {
  return (
    <div className='product-shelf'>
      <div className='product-shelf-header'>
        <h2 className='product-shelf-title'>{title}</h2>
        <a href='/catalog' className='product-shelf-link'>Смотреть все</a>
      </div>
      <div className='product-shelf-row'>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            image={product.image}
            title={product.title}
            author={product.author}
            oldPrice={product.oldPrice}
            price={product.price}
            link={product.link}


          />
        ))}
      </div>
    </div>
  )
}
