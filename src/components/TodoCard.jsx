import { Link } from "react-router-dom";

import { supabase } from "../config/supabaseClient";

export default function TodoCard({ todo, onDelete }) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", todo.id)
      .select();

    // eslint-disable-next-line no-console
    if (error) console.error(error);
    if (data) onDelete(todo.id);
  };

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

        <button title="delete todo" onClick={handleDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
