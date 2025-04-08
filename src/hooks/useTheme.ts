import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const root = document.documentElement;

  const handleThemeChange = () => {
    setTheme(() =>
      localStorage.getItem("theme") === "dark" ? "light" : "dark"
    );
  };

  useEffect(() => {
    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark:bg-[#121212]", "dark:text-white");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return {
    theme,
    handleThemeChange,
  };
}
