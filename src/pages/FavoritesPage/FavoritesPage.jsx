import React from 'react'
import {Link} from 'react-router-dom'
import {useFavoritesStore} from '../../store/useFavoritesStore'
import {FaHeart,FaTrash} from 'react-icons/fa'

import'./FavoritesPage.css'
import { useEffect } from 'react'

export default function FavoritesPage() {

  const {items,isLoading,loadFavorites,removeFavorite,clearFavorites}=useFavoritesStore()

  useEffect(()=> {
    loadFavorites()
  },[loadFavorites])

  if(isLoading) {
    return (
      <div сlassName='favorites-page'>
        <div className='favorites-loading'>Загрузка...</div>
      </div>
    )
  }

  if(!items.length) {
    return (
      <div className='favorites-page empty'>
        <h2>Избранное пусто</h2>
        <Link to="/catalog" className="to-catalog">Перейти в каталог</Link>
      </div>
    )
  }


  return (
    <div className="favorites-page">
        <div className="favorites-header">
          <h1>Избранное
            <span className='fav-count'>({items.length})</span>
          </h1>
          <button className='clear-all-btn' onClick={clearFavorites}>
            Очистить всё
          </button>
        </div>
          <div className='favorites-list'>
            {items.map(item=>(
              <div key={item.id} className='favorite-card'>
                <Link to={`/books/${item.book_id}`} className='favorite-image-link'>
                 <img src={item.image} alt={item.title}/>
                </Link>

                <div className='favorite-info'>
                  <Link to={`/books/${item.book_id}`}className='favorite-title'>
                    {item.title}
                  </Link>
                <p className='favorite-author'>{item.author}</p>

                <div className='favorite-prices'>
                  <span className='favorite-old-price'>
                    {item.old_price} ₽
                  </span>
                  <span className='favorite-price'>
                    {item.price} ₽
                  </span>
                </div>
                  <button 
                    className='remove-fav-btn' onClick={()=>removeFavorite(item.book_id)}
                  >
                    <FaTrash/>Удалить
                  </button>
                </div>
            </div>
          ))}
      </div>
    </div>
  )
}
