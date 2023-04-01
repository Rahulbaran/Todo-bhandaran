export default function Form({ submitLabel }) {
  return (
    <form spellCheck="false" autoComplete="off" className="form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="todo title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="5"
          required
          placeholder="todo content"
        />
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        <span className="material-icons">add</span>
        <span>{submitLabel}</span>
      </button>
    </form>
  );
}
