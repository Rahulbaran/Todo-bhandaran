import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../config/supabaseClient";
import Form from "../components/Form";

export default function Create() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    content: ""
  });
  const [formError, setFormError] = useState(null);

  /* Functions to handle form */
  const handleChange = (e, key) =>
    setTodo(val => ({ ...val, [key]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!todo.title || !todo.content) {
      setFormError("please fill all the input fields");
      return undefined;
    }

    const { data, error } = await supabase.from("items").insert([todo]);

    if (error) setFormError("something went wrong while adding the todo");
    if (!data) {
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="create-wrapper">
      <h1>Create a todo</h1>
      <Form
        submitLabel="Create"
        todo={todo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {formError && <p className="error">{formError}</p>}
    </div>
  );
}
