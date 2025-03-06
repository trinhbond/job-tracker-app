import { useEffect, useState } from "react";

export const useMouse = (ref: React.RefObject<HTMLElement>) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node)) {
        if (!!clicked) setClicked((clicked) => !clicked);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clicked, ref]);
  return { setClicked, clicked };
};

export const useThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const handleThemeChange = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
      document.querySelector("html")?.classList.remove("light");
      document.body.classList.add("dark:bg-[#121212]", "dark:text-white");
      localStorage.currentTheme = "dark";
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
      localStorage.currentTheme = "light";
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, [theme]);

  return {
    theme,
    handleThemeChange,
  };
};
