import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { supabase } from "../config/supabaseClient";
import Form from "../components/Form";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    content: ""
  });
  const [formError, setFormError] = useState(null);

  /* Fetch todo */
  useEffect(() => {
    const fetchTodo = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .eq("id", id)
        .single();

      if (error) navigate("/", { replace: true });
      if (data) {
        setTodo({ title: data.title, content: data.content });
      }
    };

    fetchTodo();
  }, [id, navigate]);

  /* Functions to handle form */
  const handleChange = (e, key) =>
    setTodo(val => ({ ...val, [key]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!todo.title || !todo.content) {
      setFormError("please fill all the input fields correctly");
      return undefined;
    }

    const { data, error } = await supabase
      .from("items")
      .update(todo)
      .eq("id", id);

    if (error) setFormError("Please fill all the input fields correctly");

    if (!data) {
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="update-wrapper">
      <h1>Update todo</h1>
      <Form
        submitLabel="Update"
        todo={todo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {formError && <p className="error">{formError}</p>}
    </div>
  );
}
