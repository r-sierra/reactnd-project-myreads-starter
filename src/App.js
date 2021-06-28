import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import Search from './Search'
import './App.css'

const shelves = [
  {
    name: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    name: 'wantToRead',
    title: 'Want to Read',
  },
  {
    name: 'read',
    title: 'Read'
  }
]

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books.filter((book) => (
            book.shelf && book.shelf !== 'none'
          ))
        }))
      })
  }

  onShelfChange = (shelf, newBook) => {
    // Update local state only if the API call get resolved
    BooksAPI.update(newBook, shelf)
      .then(() => {
        newBook.shelf = shelf
        this.setState(prevState => {
          const books = prevState.books.filter((book) => (
            book.id !== newBook.id
          ))
          return { books: shelf === 'none' ? books : books.concat([newBook]) }
        })
      })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route path="/search">
          <Search
            onShelfChange={this.onShelfChange}
            books={books} />
        </Route>
        <Route exact path="/">
          <BookList
            onShelfChange={this.onShelfChange}
            books={books}
            shelves={shelves} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
