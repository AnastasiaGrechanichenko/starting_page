import React from 'react'
import { useState,useEffect } from 'react'
import './CatalogFilters.css'

const CATEGORIES = [
    {value:'all', label:'Все категории'},
    {value:'novelty', label:'Новинки 2026'},
    {value:'anime', label:'Аниме и манга'},
    {value:'study', label:'Учебная литература'},
    
];
export default function CatalogFilters({onFilterChange, initialSearch = ''}) {
    const [category,setCategory] = useState('all')
    const [minPrice,setMinPrice] = useState('')
    const [maxPrice,setMaxPrice] = useState('')
    const [search, setSearch] = useState(initialSearch)

    useEffect(() => {
        setSearch(initialSearch);
    },[initialSearch]);

    const handleFilterChange = () => {
        onFilterChange({category,minPrice,maxPrice,search})
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        setTimeout(handleFilterChange,0);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setTimeout(handleFilterChange,200);
    };

    const handlePriceChange = () => {
        setTimeout(handleFilterChange,0)
    }

    const resetFilters = () => {
        setCategory('all');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        onFilterChange({category:'all',minPrice:null,maxPrice:null, search:''});
    }


  return (
        <div className='catalog-filters'>
            <h2 className='filters-title'>Фильтры</h2>
            <div className='filters-block'>
                <label htmlFor='search-input'>Поиск</label>
                <input
                    id='search-input'
                    type='text'
                    value={search}
                    onChange={handleSearchChange}
                    placeholder='Название/Автор книги'
                    className='filter-input'
                />
            <div className='filters-block'>
                <label>Категории</label>
                <div className='category-list'>
                    {CATEGORIES.map(cat => (
                        <label key={cat.value} className='category-option'>
                            <input
                                type='radio'
                                name='category'
                                value={cat.value}
                                checked={category ===cat.value}
                                onChange={()=>handleCategoryChange(cat.value)}
                            />
                            {cat.label}
                        </label>
                    ))}
                </div>
            </div>
            <div className='filters-block'>
                <label>Цена</label>
                <div className='price-inputs'>
                    <input
                    type='number'
                    placeholder='от'
                    value={minPrice}
                    onChange={(e) => {setMinPrice(e.target.value);handlePriceChange();}}
                    className='price-input'
                    min='0'
                    />
                    <span className='price-separator'>-</span>
                    <input 
                        type='number'
                        placeholder='до'
                        value={maxPrice}
                        onChange={(e) => {setMaxPrice(e.target.value);handlePriceChange();}}
                        className='price-input'
                        min = '0'
                    />
                </div>
            </div>
            <button className='reset-filters-btn' onClick={resetFilters}>
                Сбросить фильтры
            </button>
            </div>
        </div>
  )
}
