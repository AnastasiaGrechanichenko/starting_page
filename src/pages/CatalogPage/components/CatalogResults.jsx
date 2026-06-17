import React from "react";
import ProductCard from '../../../components/Main/ProductCard/ProductCard';
import './CatalogResults.css';

export default function CatalogResults({books}) {

    if (!books||books.length===0) {
        return (
            <div className="no-results">
                <h3>По вашему запросу ничего не найдено</h3>
                <p>Попробуйте изменить поисковой запрос</p>
            </div>
                );
            }


  return (
    <div className="catalog-results">
        <div className="results-header">
            <span className="results-count">По вашему запросу найдено книг:{books.length}</span>
        </div>
        <div className="books-container">
            {books.map(book => (
                <ProductCard
                key = {book.id}
                id = {book.id}
                image = {book.image}
                title = {book.title}
                author = {book.author}
                oldPrice = {book.oldPrice}
                price = {book.price}
                link = {`/product/${book.id}`}
                />
            ))}
        </div>
    </div>
  );
}
