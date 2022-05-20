import React, {useEffect, useState} from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from "./ListBooks";
import {Route} from "react-router-dom";
import SearchBooks from "./SearchBooks";

const bookSelves = [
    {key: "currentlyReading", name: "Currently Reading"},
    {key: "wantToRead", name: "Want to Read"},
    {key: "read", name: "Read"},
]


function App(props) {

    const [myBooks, setMyBooks] = useState([]);
    const [searchBooks, setSearchBooks] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {

        BooksAPI.getAll()
            .then(books => {
                setMyBooks(books);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
    }, []);


    function moveBook(book, shelf) {

        BooksAPI.update(book, shelf)
            .catch(err => {
                console.log(err);
                setError(true)
            });

        if (shelf === 'none') {
            const filter = myBooks.filter(b => b.id !== book.id);
            setMyBooks(filter);
        } else {
            book.shelf = shelf;
            const concat = myBooks.filter(b => b.id !== book.id).concat([book]);
            setMyBooks(concat);
        }
    }

    function searchForBooks(query) {
        if (query.length > 0) {

            BooksAPI.search(query)
                .then(books => {
                    if (books.error) {
                        setSearchBooks([]);
                    } else {
                        setSearchBooks(books);
                    }
                })
        } else {
            setSearchBooks([])
        }
    }

    function resetSearch() {
        setSearchBooks([])
    }

    if (error) {
        return <div>Network error to retrieve the books. Please, try again!</div>
    }

    return (
        <div className="app">

            <Route
                exact path="/"
                render={() => (
                    <ListBooks
                        bookselves={bookSelves}
                        books={myBooks}
                        onMove={moveBook}
                    />
                )}
            />

            <Route
                path="/search"
                render={() => (
                    <SearchBooks
                        searchBooks={searchBooks}
                        myBooks={myBooks}
                        onSearch={searchForBooks}
                        onMove={moveBook}
                        onResetSearch={resetSearch}
                    />
                )}
            />

        </div>
    );
}

export default App;

