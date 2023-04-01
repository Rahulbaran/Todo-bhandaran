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

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("items").select();

      if (error)
        setTodos({ todosData: [], fetchError: "Todos could not be fetched" });
      if (data) setTodos({ todosData: data, fetchError: null });
    };

    fetchTodos();
  }, []);

  return (
    <div className="home-wrapper">
      {todos.fetchError ? (
        <h1>{todos.fetchError}</h1>
      ) : (
        <main className="todos-container">
          <div className="filter-buttons"></div>

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
