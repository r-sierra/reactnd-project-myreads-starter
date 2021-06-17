import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = props => {
  const { title, books } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ title }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book
              title={book.title}
              authors={book.authors}
              thumbnail={book.thumbnail}
              defaultShelf={book.shelf} />
          </li>
        ))}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default Bookshelf
