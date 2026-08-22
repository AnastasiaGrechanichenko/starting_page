import React from 'react';
import './CatalogPage.css';
import allBooks from '../../catalogData';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogFilters from './components/CatalogFilters';
import CatalogResults from './components/CatalogResults';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [books] = useState(allBooks);
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  const applyFilters = useCallback((filters) => {
    let result = [...books];
    console.log('Фильтр категории:', filters.category);

    if (filters.category && filters.category !== 'all') {
      result = result.filter(book => book.category === filters.category);
    }
    if (filters.minPrice !== null && filters.minPrice !== '') {
      result = result.filter(book => book.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== null && filters.maxPrice !== '') {
      result = result.filter(book => book.price <= Number(filters.maxPrice));
    }
    if (filters.search && filters.search.trim() !== '') {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
    setFilteredBooks(result);
  }, [books]);

  useEffect(() => {
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');

    applyFilters({
      category: categoryParam || 'all',
      minPrice: null,
      maxPrice: null,
      search: searchParam || ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, applyFilters]);

  return (
    <div className="catalog-page">
      <aside className="catalog-sidebar">
        <CatalogFilters
          onFilterChange={applyFilters}
          initialSearch={searchParams.get('search') || ''}
          initialCategory={searchParams.get('category') || 'all'}
        />
      </aside>
      <main className="catalog-content">
        <CatalogResults books={filteredBooks} />
      </main>
    </div>
  );
}
