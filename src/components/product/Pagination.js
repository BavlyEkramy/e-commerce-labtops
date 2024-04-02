import React, { useState } from "react";

const Pagination = ({ smooth, totalPages, selectOne }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (selectOne) setCurrentPage(1);

  return (
    <div className="d-flex justify-content-center">
      <div className="pagination px-4 py-1 rounded-1 mt-5">
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            smooth();
          }}
          disabled={currentPage === 1}
          className="px-2 px-lg-3"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index + 1);
              smooth();
            }}
            className={
              currentPage === index + 1 ? "active px-2 px-lg-3" : "px-2 px-lg-3"
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            smooth();
          }}
          disabled={currentPage === totalPages}
          className="epx-2 px-lg-3"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
