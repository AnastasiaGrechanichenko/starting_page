import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import'./ProfilePage.css';
import { userApi } from '../../api/userApi';
import { useState } from 'react';

export default function ProfilePage() {
  const {user,updateUser}=useAuthStore();
  const[isEditingEmail,setIsEditingEmail]=useState(false);
  const[emailValue,setEmailValue]=useState(user?.email||"");
  const[saveError,setSaveError]=useState(null);
  const[isSaving,setIsSaving]=useState(false);

  if(!user)  {
    return <div className='profile-wrapper'>Загрузка</div>
  }
  const handleSaveEmail = async()=> {
    setSaveError(null);
    setIsSaving(true);
    try {
      const updated = await userApi.updateProfile({email:emailValue||null});
      updateUser(updated);
      setIsEditingEmail(false);
    }catch(err){
      setSaveError(err.message||'Ошибка сохранения');
    }finally{
      setIsSaving(false);
    }
  };
  return (
    <div className='profile-wrapper'>
      <div className='profile-card'>
        <h1>Личный кабинет</h1>

        <div className='profile-info'>
          <div className='info-row'>
            <span className='info-label'>Имя:</span>
            <span className='info-value'>{user.name}</span>
          </div>
          <div className='info-row'>
            <span className='info-label'>Логин:</span>
            <span className='info-value'>{user.login}</span>
          </div>
          <div className='info-row'>
            <span className='info-label'>Возраст:</span>
            <span className='info-value'>{user.age}</span>
          </div>
          <div className='info-row email-row'>
            <span className='info-label'>Email:</span>
            {isEditingEmail?(
              <div className='email-edit'>
                <input 
                type='email'
                value={emailValue}
                onChange={(e)=>setEmailValue(e.target.value)}
                placeholder='example@mail.ru'
                disabled={isSaving}
                />
                <div className='email-actions'>
                  <button 
                  className='save-btn'
                  onClick={handleSaveEmail}
                  disabled={isSaving}
                  >
                    {isSaving?'Сохранение':'Сохранить'}
                  </button>
                  <button
                  className='cancel-btn'
                  onClick={()=> {
                    setIsEditingEmail(false);
                    setEmailValue(user?.email||"");
                    setSaveError(null);
                  }}
                  disabled={isSaving}
                  >
                    Отмена
                  </button>
                </div>
                {saveError&&<span className='error-text'>{saveError}</span>}
                </div>
              ) : (
                <div className='email-display'>
                  <span className='info-value'>
                    {user.email||'Не указан'}
                  </span>
                  <button 
                  className='edit-btn'
                  onClick={()=>setIsEditingEmail(true)}
                  >
                    Изменить
                  </button>
                </div>
            )}
          </div>
        </div>
      </div> 
    </div>
  )
}
