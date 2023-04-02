const totalPages = (todos, itemsPerPage) => {
  const pages = new Array();
  for (let i = 0; i < Math.ceil(todos.length / itemsPerPage); i++) {
    pages.push(i);
  }
  return pages;
};

export default function Pagination({
  todos,
  itemsPerPage,
  currentPage,
  maxPageLimit,
  minPageLimit,
  handlePageClick,
  handleNextbtn,
  handlePrevbtn
}) {
  const pages = totalPages(todos, itemsPerPage);

  return (
    <div className="pagination-container">
      <ul>
        <li>
          <button
            className={`btn btn-primary${
              currentPage === pages[0] ? " btn-deactivate" : ""
            }`}
            disabled={currentPage === pages[0] ? true : false}
            onClick={handlePrevbtn}
          >
            Previous
          </button>
        </li>

        {pages.map(page => {
          if (page < maxPageLimit && page >= minPageLimit) {
            return (
              <li key={page}>
                <button
                  id={page}
                  className={`btn btn-primary${
                    currentPage === page ? " btn-secondary" : ""
                  } pagination-btn`}
                  onClick={handlePageClick}
                >
                  {page + 1}
                </button>
              </li>
            );
          }
        })}

        <li>
          <button
            className={`btn btn-primary${
              currentPage === pages.at(-1) ? " btn-deactivate" : ""
            }`}
            disabled={currentPage === pages.at(-1) ? true : false}
            onClick={handleNextbtn}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
