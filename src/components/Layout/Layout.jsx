import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MobileBottomNav from '../MobileBottomNav/MobileBottomNav'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className='app'>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <MobileBottomNav/>
    </div>
  )
}
