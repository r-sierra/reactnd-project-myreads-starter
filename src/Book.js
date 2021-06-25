import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    shelf: this.shelf
  }

  handleOnChange = event => {
    const { value } = event.target
    const { book } = this.props

    this.setState({ shelf: value })
    this.props.onShelfChange(value, book)
  }

  get title() {
    const { book } = this.props
    return book.title
  }

  get authors() {
    const { book } = this.props
    return (book.authors || []).join(', ')
  }

  get thumbnail() {
    const { book } = this.props
    return book.imageLinks ? book.imageLinks.thumbnail : ''
  }

  get shelf() {
    const { book } = this.props
    return book.shelf ? book.shelf : 'none'
  }

  render() {
    const { shelf } = this.state

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleOnChange} >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ this.title }</div>
        <div className="book-authors">{ this.authors }</div>
      </div>
    )
  }
}

export default Book
