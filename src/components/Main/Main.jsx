import React from 'react'
import './Main.css'
import BonusCard from './BonusCard/BonusCard';
import ProductShelf from './ProductShelf/ProductShelf';
import {novelty2026} from '../../data';
import { animeBooks } from '../../data';
import { studyBooks } from '../../data';


export default function Main() {
  return (
    <main className='homepage'>
      <ProductShelf title ='Новинки 2026' products = {novelty2026}/>
      <ProductShelf title ='Аниме' products = {animeBooks}/>
      <ProductShelf title ='Учебная литература' products = {studyBooks}/>
      <div className='bonus'>
          <BonusCard/>
      </div>


    </main>
  )
}
