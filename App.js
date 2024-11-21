import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books from Open Library API based on search
  const fetchBooks = async () => {
    if (!query) return; // Do nothing if query is empty
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}&limit=10`
      );
      setBooks(response.data.docs); // Update books list based on search query
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  // Fetch books when the search button is clicked
  const handleSearchClick = () => {
    fetchBooks();
  };

  // Handle book click to show the description in the modal
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book to show in the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedBook(null); // Close the modal by clearing selected book
  };

  return (
    <div className="app-container">
      {/* Main Title */}
      <h1>Hello Alex, Welcome to your's Book Finder</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* Contexts Box */}
      <div className="context-box">
        <p>Search for books on topics like:</p>
        <ul>
          <li>Mathematics</li>
          <li>Science</li>
          <li>English</li>
          <li>History</li>
          <li>Geography</li>
          <li>Economics</li>
          <li>...and more!</li>
        </ul>
      </div>

      {/* Display Books */}
      <div className="books-container">
        <div className="books-grid">
          {books.map((book, index) => (
            <div
              key={index}
              className="book-card"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : "https://via.placeholder.com/128x192.png?text=No+Image"
                }
                alt={book.title}
              />
              <div className="book-details">
                <h3>{book.title}</h3>
                <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
              </div>

              {/* Description displayed on hover */}
              <div className="book-description">
                <p>{book.subtitle || "No description available."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedBook.title}</h2>
            <h4>Author(s): {selectedBook.author_name ? selectedBook.author_name.join(", ") : "Unknown Author"}</h4>
            <img
              src={
                selectedBook.cover_i
                  ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
                  : "https://via.placeholder.com/128x192.png?text=No+Image"
              }
              alt={selectedBook.title}
              className="book-image"
            />
            <p><strong>Description:</strong> {selectedBook.subtitle || "No description available."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
