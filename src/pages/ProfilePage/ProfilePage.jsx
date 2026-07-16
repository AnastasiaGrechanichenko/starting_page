import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import'./ProfilePage.css';

export default function ProfilePage() {
  const {user}=useAuthStore();
  if(!user)  {
    return <div className='profile-wrapper'>Загрузка</div>
  }
  return (
    <div className='profile-wrapper'>
      <div className='profile-card'>
        <h1>Личный кабинет</h1>
        <div className='profile-info'>
          
        </div>
      </div>
      
    </div>
  )
}
