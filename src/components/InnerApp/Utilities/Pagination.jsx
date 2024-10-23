import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(
        <li key="first">
          <button className="cs_pagination_item cs_center" onClick={() => onPageChange(1)}>1</button>
        </li>
      );
      if (startPage > 2) pages.push(<li key="ellipsis-start"><span className="cs_pagination_item cs_center py-1">...</span></li>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <button className={`cs_pagination_item cs_center ${currentPage === i ? 'active' : ''}`} onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<li key="ellipsis-end"><span className="cs_pagination_item cs_center py-1">...</span></li>);
      pages.push(
        <li key="last">
          <button className="cs_pagination_item cs_center" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="cs_pagination_box">
      <li>
        <button className="cs_pagination_arrow cs_center" onClick={handlePrevious} disabled={currentPage === 1}>
          <img src="images/icons/left_arrow_blue.svg" alt="Previous" />
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button className="cs_pagination_arrow cs_center" onClick={handleNext} disabled={currentPage === totalPages}>
          <img src="images/icons/right_arrow_blue.svg" alt="Next" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
