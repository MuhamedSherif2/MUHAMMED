import { useContext } from "react";
import { Context } from "../context";

const ThemeToggle = () => {
  const context = useContext(Context);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 px-4 rounded-lg bg-[#F8F9FC] dark:bg-[#121629] text-[#111827] dark:text-[#E2E8F0] hover:bg-[#E5E7EB] dark:hover:bg-[#1E2235] transition-colors font-medium"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
