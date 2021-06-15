import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    query: '',
    books: [],
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState({ query: value })

    BooksAPI.search(value).then((books) => {
      this.setState({ books })
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
            {books.map((book) => (<li key={book.id}>{book.title}</li>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
