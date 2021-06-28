import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

/**
 * Debounce definition
 * Url: https://dev.to/jivkojelev91/comment/lpi6
 */
const debounce = (func, delay) => {
  let debounceTimer
  return (...args) => {
    clearTimeout(debounceTimer);
    const context = this
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}


class Search extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
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
      this.search(value)
  }

  search = debounce(value => {
    // TODO: handle `fetch` aborts to prevent slow connections from showing
    // results from previous searchs
    BooksAPI.search(value).then((result) => {
      // Invalid queries are handled
      const books = Array.isArray(result) ? result : []
      const currentBooks = this.props.books
      // Books have the same state that the main page
      books.forEach((book) => {
        let found = currentBooks.find((other) => (book.id === other.id))
        book.shelf = found ? found.shelf : 'none'
      })
      this.setState({ books })
    })
  }, 300)

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
                <Book book={book} onShelfChange={onShelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
