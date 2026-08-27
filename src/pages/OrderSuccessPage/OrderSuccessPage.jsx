import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {orderApi} from '../../api/orderApi'
import'./OrderSuccessPage.css'
import {FaCheckCircle} from 'react-icons/fa'

export default function OrderSuccessPage() {
    const {id}=useParams();
    const navigate = useNavigate();
    const [order,setOrder]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("")
 
    useEffect(()=> {
        const loadOrder = async ()=> {
            try {
                const data = await orderApi.getOrderById(id);
                setOrder(data);
            } catch {
                setError('Не удалось загрузить данные заказа')
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    },[id]);

    if (loading) {
        return (
        <div className="order-success-page">
            <div className="loading">Загрузка...</div>
        </div>
        );
    }

    if (error||!order) {
        return (
            <div className='order-success-page-error'>
                <h2>Что-то пошло не так</h2>
                <p>{error||'Заказ не найден'}</p>
                <button className='back-btn'  onClick={()=>navigate('/catalog')}>
                    В каталог
                </button>
            </div>
        );
    }
    
  return (
    <div className='order-success-page'>
        <div className='success-header'>
            <div className='success-icon'>
                <FaCheckCircle/>
            </div>
            <h1>Спасибо за заказ!</h1>
            <p className="order-number">Заказ № {order.id}</p>
            <p className="order-date">от {new Date(order.created_at).toLocaleDateString()}</p>
        </div>

            <div className='order-details'>
                <div className='order-items'>
                    <h2>Товары</h2>
                {order.items.map((item) => (
                <div key={item.id} className="order-item">
                    <span className="item-title">{item.title}</span>
                    <span className="item-qty">{item.quantity} шт.</span>
                    <span className="item-price">{item.price} ₽</span>
                    <span className="item-total">{item.price * item.quantity} ₽</span>
                </div>
                ))}
                <div className='order-totals'>
                    <div className="total-row">
                        <span>Скидка</span>
                        <span>-{order.total_discount} ₽</span>
                   </div>
                    <div className="total-row final">
                        <span>Итого</span>
                        <span>{order.total_sum} ₽</span>
                    </div>
                </div>
        <div className='order-delivery'>
            <h2>Доставка</h2>
            <p><strong>Получатель:</strong> {order.recipient_name}</p>
            <p><strong>Телефон:</strong> {order.phone}</p>
            <p><strong>Адрес:</strong> {order.address}</p>
            {order.comment && (
                <p><strong>Комментарий:</strong> {order.comment}</p>
            )}
            <p>
                <strong>Способ оплаты:</strong>{' '}
                {order.payment_status === 'paid' ? 'Оплачено картой' : 'Ожидает оплаты'}
            </p>
        </div>
      </div>
     <div className='success-actions'>
        <button className="btn-primary" onClick={() => navigate('/orders')}>
          Мои заказы
        </button>
        <button className="btn-secondary" onClick={() => navigate('/catalog')}>
          В каталог
        </button>
     </div>
   </div>
   </div>
  );
}
