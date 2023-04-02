import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="error-wrapper">
      <h1>404! </h1>
      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
        title="Home"
      >
        Go Back 😥
      </button>
    </div>
  );
}
