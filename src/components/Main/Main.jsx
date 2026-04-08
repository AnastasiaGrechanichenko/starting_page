import React from 'react'
import './Main.css'

import BigBanner from './BigBanner/BigBanner'
import BonusCard from './BonusCard/BonusCard';
import NanoBanners from './NanoBanners/NanoBanners';
import ProductShelf from './ProductShelf/ProductShelf';

export default function Main() {
  return (
    <main className='homepage'>
      <div className='top-main'>
        <BigBanner/>
        <aside className='top-main aside'>
          <BonusCard/>
          <NanoBanners/>
        </aside>
      </div>

      <ProductShelf title ='Новинки'/>
    </main>
  )
}
