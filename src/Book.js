import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    thumbnail: PropTypes.string.isRequired,
    defaultShelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    shelf: this.props.defaultShelf
  }

  handleOnChange = event => {
    const { value } = event.target
    const { id, title, authors, thumbnail } = this.props

    this.setState({ shelf: value })

    this.props.onShelfChange(value, {
      id: id,
      title: title,
      authors: authors,
      thumbnail: thumbnail,
      shelf: value
    })
  }

  render() {
    const { title, authors, thumbnail } = this.props
    const { shelf } = this.state

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
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
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors.join(', ') }</div>
      </div>
    )
  }
}

export default Book
