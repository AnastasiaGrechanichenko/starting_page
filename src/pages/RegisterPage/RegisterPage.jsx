import React from 'react'
import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useAuthStore} from '../../store/useAuthStore'
import './RegisterPage.css'

export default function RegisterPage() {
  const[login,setLogin]=useState('')
  const[password,setPassword]=useState('')
  const[name,setName]=useState('')
  const[age,setAge]=useState('')
  const[email,setEmail]=useState('')

  const {register,isLoading,error,clearError} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    clearError();

    try {
      await register ({
        login,
        password,
        name,
        age:Number(age),
        email:email.trim()||null,
      });
      navigate('/');
    } catch {
    }
  };

  return (
    <div className='register-wrapper'>
      <div className='register-page'>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Логин</label>
            <input 
              type='text'
              value={login}
              onChange={(e)=>setLogin(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Пароль</label>
            <input 
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Имя</label>
            <input 
              type='text'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Возраст</label>
            <input 
              type='number'
              value={age}
              onChange={(e)=>setAge(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Электронная почта(необязательно)</label>
            <input 
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              disabled={isLoading}
              placeholder='example@mail.ru'
            />
          </div>

          {error && <p className='error'>{error}</p>}

          <button type='submit' disabled={isLoading}>
            {isLoading? 'Регистрация...':'Зарегистрироваться'}
          </button>
          </form>
          <p>
            Есть аккаунт?   <Link to='/login'>Войти</Link>
          </p>
      </div>
    </div>
  );
}

