import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="error-wrapper">
      <h1>Sorry, Page is under construction</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
