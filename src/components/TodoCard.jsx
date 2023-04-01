import { Link } from "react-router-dom";

export default function TodoCard({ todo }) {
  return (
    <div className="card todo-card">
      <div className="todo-content">
        <h2>{todo.title}</h2>
        <p>{todo.content}</p>
      </div>

      <div className="todo-buttons">
        <Link to={`/update/${todo.id}`} title="edit todo">
          <span className="material-icons">edit</span>
        </Link>

        <button title="delete todo">
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
