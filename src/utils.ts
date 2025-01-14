import { IFormAppValues } from "./types";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
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

export const deleteApplication = async (path: string, id: string) => {
  await deleteDoc(doc(db, path, id));
};

export const updateApplication = async (props: any) => {
  const ref = doc(db, "applications", props.id);
  await updateDoc(ref, {
    ...props,
  });
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
