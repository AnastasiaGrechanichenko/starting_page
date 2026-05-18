import React from 'react'
import useCartStore from '../../../store/useCartStore';
import './CartOrders.css';
import {FaHeart, FaTrashAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function CartOrders() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increment = useCartStore((state) => state.incrementQuantity);
  const decrement = useCartStore((state) => state.decrementQuantity);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const remove = useCartStore((state) => state.removeFromCart);

  if (!cartItems.length) {
    return <div className='empty-cart'>
      <img src='/cartempty.jpg' className='img-empty-cart'></img>
      <h2 className='empty-header'>Ваша корзина пока пуста</h2>
      <span className='go-cart'>Воспользуйтесь поиском или перейдите в
        <Link to="/catalog"className='to-cat'>каталог</Link> 
        </span>
      </div>
  }

  return (
    <div className='cart-orders-list'>
      {cartItems.map ((item) => (
        <div key = {item.id}className="cart-items">
            <div className="item-img">
              <img src={item.cover} alt ={item.title}/>
            </div>

            <div className="item-description">
              <div className="item-title">{item.title}</div>
              <div className="item-author">{item.author}</div>    
            </div>

            <div className='quantity'>
                <div className='quantity-counter'>
                  <button onClick={() => decrement(item.id)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={()=> increment(item.id)}>+</button>

                </div>
                <div className='item-price'> {item.price} ₽ за шт</div>
            </div>
            <div className='cart-price'>
                <span className='cart-old-price'>{item.oldPrice*item.quantity}₽</span>
                <span className='cart-current-price'>{item.price*item.quantity} ₽</span>
                <div className='cart-btns'>
                    <FaHeart className='fav-icon'/>
                    <FaTrashAlt className='delete-icon' onClick={() => remove(item.id)}/>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}



