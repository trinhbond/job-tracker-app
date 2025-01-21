import { IFormAppValues } from "./types";
import { useEffect, useState } from "react";

export const handleChange = (
  event: React.ChangeEvent<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >,
  data: any,
  setData: React.Dispatch<React.SetStateAction<IFormAppValues>>
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
