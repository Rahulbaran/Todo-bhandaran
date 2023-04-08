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

  /* Drag and Drop Feature */
  const handleDragStart = e => {
    const ele = e.target;
    if (ele.classList.contains("todo-card")) {
      ele.style.opacity = ".6";

      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({
          id: ele.id,
          html: ele.innerHTML
        })
      );
    }
  };

  const handleDragEnd = e => (e.target.style.opacity = "1");

  const handleDragOver = e => {
    e.preventDefault();
    return false;
  };

  const handleDrop = e => {
    e.preventDefault();
    const ele = e.currentTarget;

    const { id, html } = JSON.parse(e.dataTransfer.getData("application/json"));
    if (ele.classList.contains("todo-card") && ele.id !== id) {
      const dragEle = document.getElementById(id);
      dragEle.id = ele.id;
      dragEle.innerHTML = ele.innerHTML;

      ele.id = id;
      ele.innerHTML = html;
    }
  };

  return (
    <div
      className="card todo-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      id={`todo-${todo.id}`}
    >
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
