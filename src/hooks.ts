import { useEffect, useState, RefObject } from "react";

export const useMouse = (ref: RefObject<HTMLElement>) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => setClicked((clicked) => !clicked);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node)) {
        if (clicked) setClicked((clicked) => !clicked);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clicked, ref]);
  return { handleClick, clicked };
};

export const useTheme = () => {
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
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
