import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: [],
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState({ query: value })

    // Prior search results are not shown
    if (!value || value.trim() === '')
      this.setState({ books: [] })
    else
      // TODO: handle `fetch` aborts to prevent slow connections from showing
      // results from previous searchs
      BooksAPI.search(value).then((result) => {
        // Invalid queries are handled
        const books = Array.isArray(result) ? result : []
        const simplifiedBooks = books.map((book) => {
          return {
            id: book.id,
            title: book.title,
            // The search works correctly when a book does not have a authors
            authors: book.authors || [],
            // The search works correctly when a book does not have a thumbnail
            thumbnail: book.imageLinks ? book.imageLinks.thumbnail : '',
            shelf: book.shelf ? book.shelf : 'none'
          }
        })
        this.setState({ books: simplifiedBooks})
      })
  }

  render() {
    const { query, books } = this.state
    const { onShelfChange } = this.props

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
              <li key={book.id}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  thumbnail={book.thumbnail}
                  defaultShelf={book.shelf}
                  onShelfChange={onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
