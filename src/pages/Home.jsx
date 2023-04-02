import { useState, useEffect } from "react";

/* Config */
import { supabase } from "../config/supabaseClient";

/* Components */
import SortBtns from "../components/SortBtns";
import TodoCard from "../components/TodoCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [todos, setTodos] = useState({
    todosData: [],
    fetchError: null
  });
  const [sortBy, setSortBy] = useState("created_at");

  /* Pagination States */
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pageNumLimit, setPageNumLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

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

  const sortByFunc = sortTerm => setSortBy(sortTerm);

  /* Delete Todo */
  const handleDelete = id => {
    setTodos(prev => {
      return {
        ...prev,
        todosData: prev.todosData.filter(todo => todo.id !== id)
      };
    });
  };

  /* Pagination Functions */
  const sliceTodos = () => {
    const slicedArr = todos.todosData.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
    const todoList = slicedArr.map(todo => (
      <TodoCard key={todo.id} todo={todo} onDelete={handleDelete} />
    ));

    if (slicedArr.length > 0) {
      return todoList;
    } else if (slicedArr.length === 0 && currentPage !== 0) {
      setCurrentPage(prev => prev - 1);
      return todoList;
    } else {
      return todoList;
    }
  };

  const handlePageClick = e => setCurrentPage(+e.target.id);
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 >= maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumLimit);
      setMinPageLimit(minPageLimit + pageNumLimit);
    }
  };
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage % pageNumLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumLimit);
      setMinPageLimit(minPageLimit - pageNumLimit);
    }
  };

  return (
    <div className="home-wrapper">
      {todos.fetchError ? (
        <h1>{todos.fetchError}</h1>
      ) : (
        <main className="todos-container">
          <div className="sort-buttons">
            <SortBtns sortByFunc={sortByFunc} />
          </div>

          <div className="todo-cards">{sliceTodos()}</div>

          {todos.todosData.length > itemsPerPage && (
            <Pagination
              todos={todos.todosData}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              pageNumLimit={pageNumLimit}
              maxPageLimit={maxPageLimit}
              minPageLimit={minPageLimit}
              handlePageClick={handlePageClick}
              handleNextbtn={handleNextbtn}
              handlePrevbtn={handlePrevbtn}
            />
          )}
        </main>
      )}
    </div>
  );
}
