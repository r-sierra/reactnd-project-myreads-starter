import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

  state = {
    query: '',
    books: [],
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState({ query: value })

    BooksAPI.search(value).then((books) => {
      const simplifiedBooks = books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          authors: book.authors || [],
          thumbnail: book.imageLinks.thumbnail,
        }
      })
      this.setState({ books: simplifiedBooks || [] })
    })
  }

  render() {
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={this.handleInputChange}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                thumbnail={book.thumbnail} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
