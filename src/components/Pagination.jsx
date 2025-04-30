import React from 'react';

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <span> Page {page} of {totalPages} </span>
      <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
