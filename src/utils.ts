import { TypeOptions, toast } from "react-toastify";
import { Id } from "react-toastify/dist/types";
import { AppForm } from "./lib/form-types";

export const handleChange = (
  event: React.ChangeEvent<
    HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
  >,
  data: any,
  setData: React.Dispatch<React.SetStateAction<AppForm>>
) => {
  const { name, value } = event.target;
  setData({ ...data, [name]: value });
};

export const notify = (
  message: string,
  type: TypeOptions,
  toastId: React.RefObject<Id | null>
) => {
  if (!toast.isActive(toastId.current || "")) {
    toast(message, {
      type: type,
      position: "bottom-center",
      theme: "colored",
      icon: false,
      hideProgressBar: true,
      toastId: type,
    });
  }
};

export const statusValues = [
  "all",
  "applied",
  "interview",
  "offer",
  "rejected",
  "screening",
  "assessment",
];
