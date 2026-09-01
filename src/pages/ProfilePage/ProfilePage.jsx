import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import'./ProfilePage.css';
import { userApi } from '../../api/userApi';
import { useState } from 'react';
import {FaPencilAlt} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const {user,updateUser}=useAuthStore();
  const logout = useAuthStore((state)=>state.logout);

  const[isEditingName,setIsEditingName]=useState(false);
  const[nameValue,setNameValue]=useState(user?.name||"");

  const[isEditingAge,setIsEditingAge]=useState(false);
  const[ageValue,setAgeValue]=useState(user?.age||"");

  const[isEditingEmail,setIsEditingEmail]=useState(false);
  const[emailValue,setEmailValue]=useState(user?.email||"");
  
  const[isEditingPhone,setIsEditingPhone]=useState(false);
  const[phoneValue,setPhoneValue]=useState(user?.contact_number||"");


  const[saveError,setSaveError]=useState(null);
  const[isSaving,setIsSaving]=useState(false);

  if(!user)  {
    return <div className='profile-wrapper'>Загрузка</div>
  }

  const handleSaveField = async(field,value,setEditing)=> {
    setSaveError(null);
    setIsSaving(true);
    try {
      const updated = await userApi.updateProfile({[field]:value||null});
      updateUser(updated);
      setEditing(false);
    }catch(err){
      setSaveError(err.message||'Ошибка сохранения');
    }finally{
      setIsSaving(false);
    }
  };

  const handleCancel = (setEditing,setValue,originalValue) => {
      setEditing(false);
      setValue(originalValue||'')
      setSaveError(null);
    }
  
  const handleLogout = () => {
    logout() ;
    navigate('/login');
  };
  return (
    <div className='profile-wrapper'>
      <div className='profile-card'>
        <h1>Личный кабинет</h1>

        <div className='profile-info'>
          <div className='info-row'>
            <span className='info-label'>Имя:</span>
            {isEditingName ? (
              <div className='edit-field'>
                <input
                  type='text'
                  value={nameValue}
                  onChange={(e)=>setNameValue(e.target.value)}
                  disabled={isSaving}
                />
                <div className='edit-actions'>
                  <button
                    className='save-btn'
                    onClick={()=>handleSaveField('name',nameValue,setIsEditingName)}
                    disabled={isSaving}
                  >
                    {isSaving?'Сохранение':'Сохранить'}
                  </button>
  
                  <button
                    className='cancel-btn'
                    onClick={()=>handleCancel(setIsEditingName,setNameValue,user.name)}
                    disabled={isSaving}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ):(
              <div className='display-field'>
                <span className='info-value'>{user.name}</span>
                <button 
                className='edit-btn'
                onClick={()=>setIsEditingName(true)}
                >
                  <FaPencilAlt />
                </button>
              </div>
            )}
          </div>

          <div className='info-row'>
            <span className='info-label'>Логин:</span>
            <span className='info-value'>{user.login}</span>
          </div>



          <div className='info-row'>
            <span className='info-label'>Возраст:</span>
            {isEditingAge ? (
              <div className='edit-field'>
                <input
                  type='number'
                  value={ageValue}
                  onChange={(e)=>setAgeValue(e.target.value)}
                  disabled={isSaving}
                />
                <div className='edit-actions'>
                  <button
                    className='save-btn'
                    onClick={()=>handleSaveField('age',setAgeValue,setIsEditingAge)}
                    disabled={isSaving}
                  >
                    {isSaving?'Сохранение':'Сохранить'}
                  </button>
  
                  <button
                    className='cancel-btn'
                    onClick={()=>handleCancel(setIsEditingAge,setAgeValue,user.age)}
                    disabled={isSaving}
                  >
                    Отмена
                  </button>
                </div>
          </div>
            ):(
              <div className='display-field'>
                <span className='info-value'>{user.age}</span>
                <button
                  className='edit-btn'
                  onClick={()=>setIsEditingAge(true)}
                >
                  <FaPencilAlt />
                </button>
              </div>
            )}
          </div>


          <div className='info-row '>
            <span className='info-label'>Email:</span>
            {isEditingEmail?(
              <div className='edit-field'>
                <input 
                type='email'
                value={emailValue}
                onChange={(e)=>setEmailValue(e.target.value)}
                placeholder='example@mail.ru'
                disabled={isSaving}
                />
                <div className='edit-actions'>
                  <button 
                  className='save-btn'
                  onClick={()=>handleSaveField('email',emailValue,setIsEditingEmail)}
                  disabled={isSaving}
                  >
                    {isSaving?'Сохранение':'Сохранить'}
                  </button>
                  <button
                  className='cancel-btn'
                  onClick= {()=> handleCancel(setIsEditingEmail,setEmailValue,user.email)}
                  disabled={isSaving}
                  >
                    Отмена
                  </button>
                </div>
                {saveError&&<span className='error-text'>{saveError}</span>}
                </div>
              ) : (
                <div className='display-field'>
                  <span className='info-value'>
                    {user.email||'Не указан'}
                  </span>
                  <button 
                  className='edit-btn'
                  onClick={()=>setIsEditingEmail(true)}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
            )}
          </div>


             <div className='info-row '>
            <span className='info-label'>Телефон:</span>
            {isEditingPhone?(
              <div className='edit-field'>
                <input 
                type='tel'
                value={phoneValue}
                onChange={(e)=>setPhoneValue(e.target.value)}
                placeholder='+7 999 999-99-99'
                disabled={isSaving}
                />
                <div className='edit-actions'>
                  <button 
                  className='save-btn'
                  onClick={handleSaveField('contact_number',phoneValue,setIsEditingPhone)}
                  disabled={isSaving}
                  >
                    {isSaving?'Сохранение':'Сохранить'}
                  </button>
                  <button
                  className='cancel-btn'
                  onClick= {()=> handleCancel(setIsEditingPhone,setPhoneValue,user.contact_number)}
                  disabled={isSaving}
                  >
                    Отмена
                  </button>
                </div>
                {saveError&&<span className='error-text'>{saveError}</span>}
                </div>
              ) : (
                <div className='display-field'>
                  <span className='info-value'>
                    {user.contact_number||'Не указан'}
                  </span>
                  <button 
                  className='edit-btn'
                  onClick={()=>setIsEditingPhone(true)}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
              )}
        </div>
      </div> 
        <button className="profile-logout-btn" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
    </div>
  </div>
  );
}
