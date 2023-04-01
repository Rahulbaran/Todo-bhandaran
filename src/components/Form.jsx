export default function Form({
  submitLabel,
  todo,
  handleChange,
  handleSubmit
}) {
  return (
    <form
      spellCheck="false"
      autoComplete="off"
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="todo title"
          required
          value={todo.title}
          onChange={e => handleChange(e, "title")}
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
          value={todo.content}
          onChange={e => handleChange(e, "content")}
        />
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        <span className="material-icons">add</span>
        <span>{submitLabel}</span>
      </button>
    </form>
  );
}
