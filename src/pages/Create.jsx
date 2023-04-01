import Form from "../components/Form";

export default function Create() {
  return (
    <div className="create-wrapper">
      <h1>Create a todo</h1>

      <Form submitLabel="Create" />
    </div>
  );
}
