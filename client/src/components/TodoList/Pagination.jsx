import React from "react";
import _ from "lodash";
function Pagination({ itemsCount, pageSize, onPageChange, pageIndex }) {
  const numberPages = Math.ceil(itemsCount / pageSize);
  if (numberPages === 1) return null;
  const pages = _.range(1, numberPages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            className={pageIndex === page ? "page-item active" : "page-item"}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
