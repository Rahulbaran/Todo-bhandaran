import { Outlet } from "react-router-dom";

/* Components */
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="app-wrapper">
      <Header />

      <Outlet />
    </div>
  );
}
