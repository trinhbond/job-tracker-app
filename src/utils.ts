import { AppFormValues } from "./types";
import { useEffect, useState } from "react";

export const handleChange = (
  event: React.ChangeEvent<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >,
  data: any,
  setData: React.Dispatch<React.SetStateAction<AppFormValues>>
) => {
  const { name, value } = event.target;
  setData({ ...data, [name]: value });
};

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

export const useToggle = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  const switchTheme = () =>
    setTheme((theme: any) => (theme === "dark" ? "light" : "dark"));

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
    setTheme,
    switchTheme,
  };
};

export default function useDark() {
  const [theme, setTheme] = useState(localStorage.theme);

  const colorTheme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    if (localStorage.theme == "dark") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
