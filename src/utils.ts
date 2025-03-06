import { AppForm } from "./types";

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
