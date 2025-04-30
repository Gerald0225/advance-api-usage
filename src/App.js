import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import BookLists from './components/BookLists';
import PictureUploader from './components/PictureUploader'
import GithubLogo from './assets/Github.svg'

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  // Set books per page for pagination
  const booksPerPage = 5;
  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  // Fetch books based on search query
  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();
    setBooks(data.docs || []);
    setPage(1); // Reset page to 1 on new search
    setLoading(false);
  };

  const handleBookmark = (book) => {
    // Check if it's already bookmarked
    const isBookmarked = bookmarkedBooks.some(b => b.key === book.key);

    if (isBookmarked) {
      // If already bookmarked, remove it from the list
      setBookmarkedBooks(bookmarkedBooks.filter(b => b.key !== book.key));
    } else {
      // If not bookmarked, add it
      setBookmarkedBooks([...bookmarkedBooks, book]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  // Load bookmarks from localStorage on page load
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedBooks')) || [];
    setBookmarkedBooks(savedBookmarks);
  }, []);

  // Save bookmarks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookmarkedBooks', JSON.stringify(bookmarkedBooks));
  }, [bookmarkedBooks]);

  return (
    <div className="app-container">
      <a
          className="github-icon"
          href="https://github.com/Gerald0225/advance-api-usage"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="github-icon"
            style={{
              position: "center",
              width: "3.5rem",
              padding: "5px",
              cursor: "pointer",
            }}
            src={GithubLogo}
            alt="github-icon"
          />
        </a>
      <h1>Meet Your Next Favorite Book</h1>
      <p>Find and read more books you'll love. Be part of Goodreaders, the world's largest 
        community for readers like you
      </p>

      <PictureUploader />

      {/* Search Bar */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {/* Book List */}
          <BookLists 
            books={currentBooks} 
            handleBookmark={handleBookmark} 
            bookmarkedBooks={bookmarkedBooks}
          />
          {books.length > 0 && (
            <Pagination 
              page={page} 
              setPage={setPage} 
              totalPages={Math.ceil(books.length / booksPerPage)} 
            />
          )}
        </>
      )}

      {/* Saved Books */}
      <h2 style={{ marginTop: '40px' }}>Saved Books</h2>
      <BookLists 
        books={bookmarkedBooks} 
        handleBookmark={handleBookmark} 
        bookmarkedBooks={bookmarkedBooks} 
      />
    </div>
  );
}

export default App;
