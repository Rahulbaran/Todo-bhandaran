import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app-wrapper">
      <Outlet />
    </div>
  );
}
