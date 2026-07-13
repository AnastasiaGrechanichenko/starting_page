import React from 'react'
import './CartOrders.css';
import {FaHeart, FaTrashAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { cartApi } from '../../../api/cartApi';



export default function CartOrders({items, onUpdate}) {

    const handleIncrement = async (item) => {
      try { 
        await cartApi.updateItem(item.id, {quantity:item.quantity+1});
        onUpdate();
      } catch(err) {
        alert(err.message || 'Ошибка')
      }
    };

    const handleDecrement = async (item) => {
      if (item.quantity<=1) {
        handleRemove(item.id);
        return;
      }
      try { 
        await cartApi.updateItem(item.id, {quantity:item.quantity-1});
        onUpdate()
      } catch(err) {
        alert(err.message || 'Ошибка')
      }
    };

    const handleIQuantityChange = async (item,newValue) => {
      const qty = parseInt(newValue) ||1;
      if (qty<1) {
        handleRemove(item.id);
        return;
      }

      try { 
        await cartApi.updateItem(item.id, {quantity:qty});
        onUpdate();
      } catch(err) {
        alert(err.message || 'Ошибка')
      }
    };

    const handleRemove = async(itemId) => {
      try { 
        await cartApi.removeItem(itemId);
        onUpdate;
      } catch (err) {
         alert(err.message || 'Ошибка удаления')
      }
    };

  if (!items.length) {
    return (
    <div className='empty-cart'>
      <img src='/cartempty.jpg' className='img-empty-cart'></img>
      <h2 className='empty-header'>Ваша корзина пока пуста</h2>
      <span className='go-cart'>Воспользуйтесь поиском или перейдите в
        <Link to="/catalog"className='to-cat'>каталог</Link> 
        </span>
      </div>
    );
  }

    return (
      <div className='cart-orders-list'>
        {items.map ((item) => (
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
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleIQuantityChange(item, e.target.value)}
                      min="1"
                    />
                    <button onClick={()=> handleIncrement(item)}>+</button>

                  </div>
                  <div className='item-price'> {item.price} ₽ за шт</div>
              </div>
              <div className='cart-price'>
                  <span className='cart-old-price'>{item.old_price*item.quantity}₽</span>
                  <span className='cart-current-price'>{item.price*item.quantity} ₽</span>
                  <div className='cart-btns'>
                      <FaHeart className='fav-icon'/>
                      <FaTrashAlt className='delete-icon' onClick={() => handleRemove(item.id)}/>
                  </div>
              </div>
          </div>
        ))}
      </div>
    );
  }



