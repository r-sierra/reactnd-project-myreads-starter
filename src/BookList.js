import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

const BookList = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        {props.shelves.map((shelf, index) => (
          <Bookshelf
            key={index}
            title={shelf.title}
            books={props.books.filter((book) => (book.shelf === shelf.name))}
            onShelfChange={props.onShelfChange} />
        ))}
        </div>
      </div>
      <Link to='/search' className='open-search'>
        <button>Add a book</button>
      </Link>
    </div>
  )
}

BookList.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired
}

export default BookList
