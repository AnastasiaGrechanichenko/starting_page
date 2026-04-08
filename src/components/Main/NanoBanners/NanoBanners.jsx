import React from 'react'
import './NanoBanners.css';
import { FaGift } from 'react-icons/fa';

export default function Nanobanners() {
  return (
    <div className='nanobanners'>
      <strong>100 балов за регистрацию</strong>
      <FaGift className='icon-gift'/>
      
    </div>
  )
}
