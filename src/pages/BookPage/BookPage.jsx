import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { bookApi } from '../../api/bookApi'
import { cartApi } from '../../api/cartApi'
import { favoriteApi } from '../../api/favoriteApi'
import { useAuthStore } from '../../store/useAuthStore'
import './BookPage.css'

export default function BookPage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {isAuthenticated} = useAuthStore()

  const[book,setBook]=useState(null)
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState(null)
  const[cartLoading,setCartLoading]=useState(false)
  const[favLoading,setFavLoading]=useState(false)
  const[cartSuccess,setCartSuccess]=useState(null)
  const[favSuccess,setFavSuccess]=useState(null)

  useEffect(()=>{
    let cancelled = false
    setLoading(true)
    setError(null)

    bookApi.getById(Number(id))
    .then(data=>{if (!cancelled)setBook(data)})
    .catch(err=>{if (!cancelled)setError(err.message)})
    .finally (()=> {if (!cancelled)setLoading(false)})

  return ()=>{cancelled=true}
  },[id])

  const handleAddToCart=async()=> {
    if(!isAuthenticated) {navigate('/login');return}
    setCartLoading(true)
    setCartSuccess(false)

    try {
      await cartApi.addItem({book_id:book.id, quantity:1})
      setCartSuccess(true)
      setTimeout(()=> setCartSuccess(false),2000)
    }catch(err) {
      alert(err.message||'Ошибка добавления в корзину')
    } finally {
      setCartLoading(false)
    }

  
    const handleAddToFavorites=async()=> {
    if(!isAuthenticated) {navigate('/login');return}
    setFavLoading(true)
    setFavSuccess(false)

    try {
      await favoriteApi.addToFavorite(book.id,1)
      setCartSuccess(true)
      setTimeout(()=> setFavSuccess(false),2000)
    }catch(err) {
     if (err.message?.includes('Уже есть в избранном')) {
      setFavSuccess(true)
     } else {
       alert(err.message||'Ошибка добавления в избранное')
     }
    } finally {
      setFavLoading(false)
    }
  }
    if (loading){
      return (
        <div className='book-page'>
          <div className='book-loading'>Загрузка...</div>
        </div>
      )
    }

    if (error){
      retur (
        <div className='book-page'>
          <div className='book-error'>
            <h2>{error}</h2>
            <button 
              className='back-btn'
              onClick={()=>navigate('/catalog')}
            >
              В каталог
            </button>
          </div>
        </div>
      )
    }

    if(!book) return null

  return (
    <div className='book-page'>
      <button 
        className='back-btn'
        onClick={()=>navigate(-1)}
      >
      Назад
      </button>
      <div className='book-layout'>
        <div className='book-image-block'>
          <img src = {book.image} alt = {book.title} className='book-image'/>
        </div>
        <div className='book-details'>
          <div className='book-header'>
            <h1 className='book-title'>{book.title}</h1>
            <p className='book-author'>{book.author}</p>
          </div>


        </div>
      </div>
    </div>
  )
}
