import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {cartApi} from '../../api/cartApi';
import {orderApi} from '../../api/orderApi'
import './CheckoutPage.css'

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [items,setItems]=useState([]);
    const [form,setForm]=useState({
        recipient_name:"",
        phone:"",
        address:"",
        comment:"",
    })
    const [loading,setLoading]=useState(true);
    const [errors,setErrors]=useState({});
    const [showPayment,setShowPayment]=useState(false);
    const [cardForm,setCardForm]=useState({
        number:'',
        expiry:'',
        cvv:'',
        holder:'',
    })
    const [cardErrors,setCardErrors]=useState({});
    const [paying,setPaying]=useState(false);
    


    const handleChange = (e)=> {
        const{name,value}=e.target;
        setForm((prev)=>({...prev,[name]:value}));
        
        if (errors[name]){
            setErrors((prev)=>({...prev,[name]:""}));
        }
    };

    const handlePhoneChange = (e)=> {
        let value = e.target.value.replace(/\D/g,"");

        if(value.startsWith('7')||value.startsWith('8')) {
            value = value.slice(1);
        }

        let formatted='+7';

        if(value.length>0) formatted +=' ('+value.slice(0,3);
        if(value.length>=3) formatted +=') '+value.slice(3,6);
        if(value.length>=6) formatted +='-'+value.slice(6,8);
        if(value.length>=8) formatted +='-'+value.slice(8,10);

        setForm((prev)=>({...prev,phone:formatted}));

    }

    const handleCardNumberChange=(e)=> {
        let value = e.target.value.replace(/\D/g, '').slice(0, 16) 
        const parts = []
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.slice(i, i + 4))
        }
        setCardForm((prev) => ({ ...prev, number: parts.join(' ') }));
        if (cardErrors.number) setCardErrors((prev) => ({ ...prev, number: '' }));
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setCardForm((prev) => ({ ...prev, expiry: value }));
        if (cardErrors.expiry) setCardErrors((prev) => ({ ...prev, expiry: '' }));
    };

    const validate = ()=> {
        const newErrors = {};

        if(!form.recipient_name.trim()|| form.recipient_name.trim().length<2) {
            newErrors.recipient_name='Введите ФИО получателя';
        }

        const phoneDigits = form.phone.replace(/\D/g,'')

        if (phoneDigits.length<10) {
            newErrors.phone ='Введите корректный телефон';
        }

        if(!form.address.trim()|| form.address.trim().length < 10) {
            newErrors.address='Введите полный адрес доставки';
        }
        setErrors(newErrors);
        
        return Object.keys(newErrors).length===0;
    }

    const validateCard = () => {
        const newErrors={};
        const digitsOnly = cardForm.number.replace(/\s/g,'');

        if (digitsOnly.length !== 16) {
            newErrors.number = 'Введите полный номер карты (16 цифр)';
        }
        if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
            newErrors.expiry = 'Введите срок в формате ММ/ГГ';
        } else {
            const [mm, yy] = cardForm.expiry.split('/');
            const month = parseInt(mm, 10);
            const year = parseInt('20' + yy, 10);
            const now = new Date();

            if (month < 1 || month > 12) {
                newErrors.expiry = 'Некорректный месяц';
            } else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
                newErrors.expiry = 'Срок действия истёк';
            }
          }
        if (!/^\d{3}$/.test(cardForm.cvv)) {
            newErrors.cvv = 'Введите 3 цифры с обратной стороны карты';
         }
        if (!cardForm.holder.trim() || cardForm.holder.trim().length < 2) {
            newErrors.holder = 'Введите имя держателя карты';
        }

        setCardErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handlePay = async ()=> {
        if(!validateCard()) return;

        setPaying(true);

        try {
            await new Promise((resolve)=>setTimeout(resolve,2000));

            const newOrder =await orderApi.createOrder({
                recipient_name:form.recipient_name,
                phone: form.phone,
                address:form.address,
                comment: form.comment,
                payment_status:'paid'
            });

            navigate(`/order-success/${newOrder.id}`);
        } catch(err) {
            alert(err.message||'Ошибка при оформлении заказа');

            setPaying(false);

        }
    };

    const handleProceed =()=> {
        if(!items.length){
            alert('Корзина пуста');
            navigate('/cart')
            return;
        }

        if(!validate()) return;

        setShowPayment(true);

        setTimeout(()=> {
            window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
        },100);
    };



    useEffect(() => {
        const loadCart = async ()=> {
            try {
                const response = await cartApi.getCart();
                setItems(response.items || []);    
            } catch {
                alert('Не удалось загрузить корзину');
            } finally{
                setLoading(false);
            }
        };
        loadCart();
    },[]);

    if (loading) {
        return (
            <div className='checkout-page'>
                <div className='checkout-loading'>Загрузка...</div>
            </div>
        );
    }

    if(!items.length){
        return (
            <div className='checkout-page empty'>
                <h2>Корзина пуста</h2>
                <button className='back-btn' onClick={()=>navigate('/catalog')}>
                    В каталог
                </button>
            </div>
        )
    }

    const totalItems = items.reduce((sum,item)=>sum+item.quantity,0);
    const totalPrice = items.reduce((sum,item)=>sum+item.price*item.quantity,0)
    const totalDiscount = items.reduce(
        (sum,item)=>sum+(item.old_price-item.price)*item.quantity,0)
  return (
    <div className='checkout-page'>
        <h1>Оформление заказа</h1>
        <div className='checkout-layout'>
            <div className='checkout-form-block'>
                <div className='form-group'>
                    <label>ФИО</label>
                    <input 
                      type ='text'
                      name = 'recipient_name'
                      value={form.recipient_name}
                      onChange={handleChange}
                      placeholder='Иванов Иван Иванович'
                      className= {errors.recipient_name?'error':''}
                    />

                    {errors.recipient_name&& (
                        <span className='error-text'>{errors.recipient_name}</span>
                    )}
                </div>

                <div className='form-group'>
                    <label>Телефон</label>
                    <input 
                      type='tel'
                      name='phone'
                      value={form.phone}
                      onChange= {handlePhoneChange}
                      placeholder='+7(999) 999-99-99'
                      className= {errors.phone?'error':''}
                    />

                    {errors.phone&& (
                        <span className='error-text'>{errors.phone}</span>
                    )}
                </div>
                <div className='form-group'>
                    <label>Адрес доставки</label>
                    <textarea
                      name='address'
                      value={form.address}
                      onChange={handleChange}
                      placeholder='Город,улица,дом,квартира'
                      rows={4}
                      className={errors.address?'error':''}
                    />

                    {errors.address&& (
                        <span className='error-text'>{errors.address}</span>
                    )}
                </div>

                <div className='form-group'>
                    <label htmlFor='comment'>
                        Комментарий к заказу(необязательно)
                    </label>
                    <textarea
                      id ='comment'
                      name='comment'
                      value={form.comment}
                      onChange={handleChange}
                      placeholder='Введите ваши пожелания по доставке'
                      rows={3}
                    />
                </div>

                {!showPayment&& (
                    <button className='proceed-btn' onClick={handleProceed}>
                        Перейти к оплате
                    </button>
                )}

                {showPayment && (
                    <div className='payment-block'>
                        <h2>Оплата картой</h2>
                        <div className='card-form'>
                            <div className='form-group card-number'>
                                <label>Номер карты</label>
                                <input
                                  type='text'
                                  value={cardForm.number}
                                  onChange={handleCardNumberChange}
                                  placeholder='4242 4242 4242 4242'
                                  maxLength={19}
                                  className={cardErrors.number?'error':''}
                                  disabled={paying}
                                />
                                {cardErrors.number&&<span className='error-text'>{cardErrors.number}</span>}
                            </div>

                            <div className='card-row'>
                                <div className='form-group'>
                                    <label>Срок действия</label>
                                    <input 
                                      type='text'
                                      value={cardForm.expiry}
                                      onChange={handleExpiryChange}
                                      placeholder='ММ/ГГ'
                                      maxLength={5}
                                      className={cardErrors.expiry?'error':''}
                                      disabled={paying}
                                    />
                                    {cardErrors.expiry && <span className="error-text">{cardErrors.expiry}</span>}   
                                </div>
                                <div className='form-group'>
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        value={cardForm.cvv}
                                        onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 3);

                                        setCardForm((prev) => ({ ...prev, cvv: val }));
                                        if (cardErrors.cvv) setCardErrors((prev) => ({ ...prev, cvv: '' }));
                                        }}
                                        placeholder="123"
                                        maxLength={3}
                                        className={cardErrors.cvv ? 'error' : ''}
                                        disabled={paying}
                                    />
                                    {cardErrors.cvv && 
                                      <span className="error-text">{cardErrors.cvv}</span>
                                    }
                                    </div>
                                  </div>
                                  <div className='form-group'>
                                    <label>Имя держателя</label>
                                        <input
                                        type="text"
                                        value={cardForm.holder}
                                        onChange={(e) => {
                                            setCardForm((prev) => ({ ...prev, holder: e.target.value.toUpperCase() }));
                                            if (cardErrors.holder) setCardErrors((prev) => ({ ...prev, holder: '' }));
                                        }}
                                        placeholder="IVAN IVANOV"
                                        className={cardErrors.holder ? 'error' : ''}
                                        disabled={paying}
                                        />
                                        {cardErrors.holder && <span className="error-text">{cardErrors.holder}</span>}
                                  </div>

                                  <button className='pay-btn' onClick={handlePay}
                                    disabled={paying}>
                                        {paying ? 'Обработка платежа...' : `Оплатить ${totalPrice} ₽`}
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                        
            <div className='checkout-summary-block'>
                <h2>Ваш заказ</h2>
                <div className='mini-cart-list'>
                    {items.map((item)=> (
                        <div key={item.id} className="mini-cart-item">
                         <img src={item.image} alt={item.title} className='mini-cart-img'/>
                         <div className='mini-cart-info'>
                            <span className='mini-cart-title'>{item.title}</span>
                            <span className='mini-cart-meta'>
                              {item.quantity} шт. x {item.price} ₽
                            </span>
                            <span className='mini-cart-sum'>{item.price*item.quantity} ₽</span>
                         </div>
                        </div>
                    ))}
                </div>
                <div className='checkout-totals'>
                    <div className='total-row'>
                        <span>Товаров</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className='total-row discount'>
                        <span>Скидка</span>
                        <span>{totalDiscount}₽</span>
                    </div>

                    <div className='total-row final'>
                        <span>Итого</span>
                        <span>{totalPrice} ₽</span>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  );
}
