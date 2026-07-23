import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderApi } from '../../api/orderApi'
import './OrdersPage.css'

export default function OrdersPage() {
  const [orders, setOrders]= useState([])
  const [loading, setLoading]=useState(true)
  const [error,setError]=useState(null)
  const [expandedOrder,setExpandedOrder] = useState(null)

  const loadOrders = async ()=> {
    setLoading(true)
    setError(null)
    try {
      const data = await orderApi.getOrders()
      setOrders(data)
    }catch(err) {
      setError(err.message||'Ошибка загрузки заказов')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    loadOrders()
  },[])

  const handleCancel = async(OrderId)=> {
    if(!window.confirm('Вы действительно хотите отменить заказ?')) return 
    try {
      await orderApi.cancelOrder(OrderId)
      await loadOrders()
    }catch(err){
      alert(err.message||'Ошибка отмены')
    }
  }

  const toggleExpand = (orderId)=> {
    setExpandedOrder(expandedOrder===orderId?null:orderId)
  }

  const formatDate = (dateString)=> {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-Ru',{
      day: 'numeric',
      month:'long',
      year:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    })
  }

  const getStatusText = (status)=> {
    const statuses = {
      pending:'Ожидает обработки',
      cancelled:'Отменен',
      shipped:'Отправлен',
      delivered:'Доставлен',
    }
  return statuses[status]||status
  }

  if (loading){
    return (
            <div className='orders-page'>
              <div className='orders-loading'>
                Загрузка...
              </div>
            </div>
    )
  }
  if (error) {
    return (
      <div className='orders-page'>
        <div className='orders-error'>
          <h2>{error}</h2>
          <button onClick={loadOrders}>
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  if(!orders.length){
    return (
      <div className='orders-page empty'>
        <h2>У вас пока нет заказов</h2>
        <Link to='/catalog' className='to-catalog'>Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className='orders-page'>
      <h1>Мои заказы</h1>

      <div className='orders-list'>
        {orders.map(order=> (
          <div key={order.id} className='order-card'>
            <div className='order-header' onClick={()=>toggleExpand(order.id)}>
              <div className='order-info'>
                <span className='order-number'>Заказ #{order.id}</span>
                <span className='order-date'>{formatDate(order.created_at)}</span>
              </div>
              <div className='order-summary'>
                <span className='order-status'>{getStatusText(order.status)}</span>
                <span className='order-total'>{order.total_sum} ₽</span>
              </div>
            </div>

            {expandedOrder===order.id&& (
              <div className='order-details'>
                <div className='order-items'>
                  {order.items.map (item => (
                    <div key={item.id} className='order-item'>
                      <Link to={`/books/${item.book_id}`} className='item-link'>
                        <span className='item-title'>{item.title}</span>
                      </Link>
                      <span className='item-author'>{item.author}</span>
                      <div className='item-prices'>
                        <span className='item-old-price'>{item.old_price} ₽</span>
                        <span className='item-price'>{item.price} ₽</span>
                        <span className='item-quantity'>x{item.quantity}</span>
                      </div>
                      <span className='item-discount'>
                        Скидка: {item.discount_amount} ₽
                      </span>
                    </div>
                  ))}
                </div>


                <div className='order-totals'>
                  <div className='total-row'>
                    <span>Товары:</span>
                    <span>{order.total_sum + order.total_discount} ₽</span>
                  </div>
                  <div className='total-row discount'>
                    <span>Скидка:</span>
                    <span>-{order.total_discount} ₽</span>
                  </div>
                  <div className='total-row final'>
                    <span>Итого:</span>
                    <span>{order.total_sum} ₽</span>
                  </div>
                </div>

              {order.status==='pending' && (
                <button 
                  className='cancel-btn'
                  onClick={()=> handleCancel(order.id)}
                >
                  Отменить
                </button>
              )}
            </div>
            )}
          </div>
        ))}
        </div>
      </div>
  )
}

        