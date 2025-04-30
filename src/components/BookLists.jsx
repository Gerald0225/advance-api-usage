import React from 'react';

function BookList({ books, handleBookmark, bookmarkedBooks }) {
  return (
    <div>
      {books.map((book, index) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : 'https://via.placeholder.com/100x150?text=No+Cover';

        // Check if the book is bookmarked
        const isBookmarked = bookmarkedBooks.some(b => b.key === book.key);

        return (
          <div key={index} className="book-card" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <img
              src={coverUrl}
              alt={book.title}
              style={{
                width: '100px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
            <div>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author_name?.join(', ') || 'Unknown'}</p>
              <p><strong>First published:</strong> {book.first_publish_year || 'N/A'}</p>
              <button
                onClick={() => handleBookmark(book)}
                style={{
                  background: isBookmarked ? 'red' : 'gray',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {isBookmarked ? 'Save' : 'Save'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;