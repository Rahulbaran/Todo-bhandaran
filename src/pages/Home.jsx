import { useState, useEffect } from "react";

/* Config */
import { supabase } from "../config/supabaseClient";

/* Components */
import TodoCard from "../components/TodoCard";

export default function Home() {
  const [todos, setTodos] = useState({
    todosData: [],
    fetchError: null
  });
  const [sortBy, setSortBy] = useState("created_at");

  /* Fetch Todos */
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("items").select();

      if (error)
        setTodos({ todosData: [], fetchError: "Todos could not be fetched" });
      if (data) setTodos({ todosData: data, fetchError: null });
    };
    fetchTodos();
  }, []);

  /* Sort Todos */
  useEffect(() => {
    const sortTodos = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .order(sortBy, { ascending: true });

      if (error)
        setTodos({ todosData: [], fetchError: "Todos could not be fetched" });
      if (data) setTodos({ todosData: data, fetchError: null });
    };

    sortTodos();
  }, [sortBy]);

  return (
    <div className="home-wrapper">
      {todos.fetchError ? (
        <h1>{todos.fetchError}</h1>
      ) : (
        <main className="todos-container">
          <div className="sort-buttons">
            <button
              className="btn btn-primary"
              title="sort todos titlewise"
              onClick={() => setSortBy("title")}
            >
              Title
            </button>
            <button
              className="btn btn-primary"
              title="sort todos contentwise"
              onClick={() => setSortBy("content")}
            >
              Content
            </button>
            <button
              className="btn btn-primary"
              title="sort todos based on created date"
              onClick={() => setSortBy("created_at")}
            >
              Created_at
            </button>
          </div>

          <div className="todo-cards">
            {todos.todosData.length > 0 &&
              todos.todosData.map(todo => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
          </div>
        </main>
      )}
    </div>
  );
}
