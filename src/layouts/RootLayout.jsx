import { useContext } from "react";
import { Outlet } from "react-router-dom";

/* Components */
import Header from "../components/Header";
import { ThemeContext } from "../context/Theme";

export default function RootLayout() {
  const themeCnxt = useContext(ThemeContext);

  return (
    <div className={`app-wrapper${themeCnxt.dark ? " dark-theme" : ""}`}>
      <Header />

      <Outlet />
    </div>
  );
}
