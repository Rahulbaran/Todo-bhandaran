import { useState, createContext, useEffect } from "react";

const theme = {
  dark: false,
  toggleTheme: () => {}
};

export const ThemeContext = createContext(theme);

export default function ThemeSwitcher({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setDark(isDark);
  }, []);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      localStorage.setItem("dark", JSON.stringify(isDark));
      setDark(isDark);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setDark(isDark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
