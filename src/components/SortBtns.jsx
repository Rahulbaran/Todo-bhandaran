export default function SortBtns({ sortByFunc }) {
  return (
    <div className="sort-buttons">
      <button
        className="btn btn-primary"
        title="sort todos titlewise"
        onClick={() => sortByFunc("title")}
      >
        Title
      </button>
      <button
        className="btn btn-primary"
        title="sort todos contentwise"
        onClick={() => sortByFunc("content")}
      >
        Content
      </button>
      <button
        className="btn btn-primary"
        title="sort todos based on created date"
        onClick={() => sortByFunc("created_at")}
      >
        Created_at
      </button>
    </div>
  );
}
