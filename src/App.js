import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Search from './Search'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  onShelfChange = (shelf, newBook) => {
    this.setState(prevState => {
      const books = prevState.books.filter((book) => (
        book.id !== newBook.id
      ))
      return { books: shelf === 'none' ? books : books.concat([newBook]) }
    })
  }

  booksForShelf = (shelf) => {
    const { books } = this.state
    return books.filter((book) => (book.shelf === shelf))
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search onShelfChange={this.onShelfChange} />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  key='currentlyReading'
                  title='Currently Reading'
                  books={this.booksForShelf('currentlyReading')}
                  onShelfChange={this.onShelfChange} />

                <Bookshelf
                  key='wantToRead'
                  title='Want to Read'
                  books={this.booksForShelf('wantToRead')}
                  onShelfChange={this.onShelfChange} />

                <Bookshelf
                  key='read'
                  title='Read'
                  books={this.booksForShelf('read')}
                  onShelfChange={this.onShelfChange} />
              </div>
            </div>
            <Link to='/search' className='open-search'>
              <button>Add a book</button>
            </Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
