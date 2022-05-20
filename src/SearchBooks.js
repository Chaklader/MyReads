import React, {Component, useState} from 'react';
import {Link} from "react-router-dom";
import Book from "./Book";


function SearchBooks(props) {

    const {
        searchBooks,
        myBooks,
        onSearch,
        onResetSearch,
        onMove
    } = props;

    const [value, setValue] = useState('');

    function handleChange(e) {
        const val = e.target.value;
        setValue(val);

        props.onSearch(val);
    }

    const updatedBooks = searchBooks.map(book => {
        myBooks.map(b => {
            if (b.id === book.id) {
                book.shelf = b.shelf;
            }
            return b;
        });
        return book;
    });

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search" onClick={onResetSearch}>
                        Close
                    </button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        value={value}
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleChange}
                        autoFocus
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {updatedBooks.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            shelf={book.shelf ? book.shelf : 'none'}
                            onMove={onMove}
                        />
                    ))
                    }
                </ol>
            </div>
        </div>
    );
}

export default SearchBooks;