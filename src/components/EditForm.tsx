import {
  FormControl,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AppForm } from "../types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { handleChange, notify } from "../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditForm({
  data,
  prevData,
  setPrevData,
  isCardOpen,
  setIsCardOpen,
}: {
  data: AppForm[];
  prevData: AppForm;
  setPrevData: React.Dispatch<React.SetStateAction<AppForm>>;
  isCardOpen: any;
  setIsCardOpen: React.Dispatch<React.SetStateAction<any>>;
}) {
  const isThemeDark = document.documentElement.classList.contains("dark"); // for MUI components
  const { user } = useContext(AuthContext);
  const { reset } = useForm<AppForm>();
  const toastId = useRef("toast");

  const handleEditApplication = (
    id: string,
    event: React.BaseSyntheticEvent
  ) => {
    event.preventDefault();
    setPrevData(prevData);

    try {
      if (!prevData.company.trim() || !prevData.title.trim()) {
        return;
      }
      updateDoc(doc(db, "applications", "user/", user?.uid as string, id), {
        ...prevData,
      });
      notify("Application updated", "success", toastId);
      setIsCardOpen({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    deleteDoc(doc(db, "applications", "user/", user?.uid as string, id));
  };

  return (
    <>
      {data.map((props) => (
        <Modal keepMounted open={isCardOpen[props.id]}>
          <div className="p-4 shadow-lg text-black dark:text-white bg-white dark:bg-[#18181B] fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0 overflow-y-scroll">
            <div>
              <h1 className="text-xl font-semibold">Edit application</h1>
              <form
                className="flex flex-col gap-4 mt-6 text-sm"
                onSubmit={(event) => handleEditApplication(props.id, event)}
              >
                <div>
                  <label>
                    Company <span className="text-red-600">*</span>
                  </label>
                  <input
                    placeholder="Company"
                    name="company"
                    id="company"
                    value={prevData.company}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                    className={clsx(
                      !prevData.company.trim() &&
                        "border-red-600 dark:border-red-600",
                      "w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                    )}
                  />
                </div>
                <div>
                  <label>
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    placeholder="Title"
                    name="title"
                    id="title"
                    value={prevData.title}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                    className={clsx(
                      !prevData.title.trim() &&
                        "border-red-600 dark:border-red-600",
                      "w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                    )}
                  />
                </div>
                <div>
                  <label>Link</label>
                  <input
                    placeholder="Link"
                    name="link"
                    id="link"
                    value={prevData.link}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                    className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                  />
                </div>
                <div>
                  <label>Status</label>
                  <FormControl
                    sx={{
                      minWidth: 130,
                      display: "block",
                    }}
                  >
                    <Select
                      className="w-full mt-1 focus:outline-none dark:text-white border dark:border-[#ffffff18] dark:[&>svg]:fill-white"
                      name="status"
                      id="status"
                      value={prevData.status}
                      onChange={(event: SelectChangeEvent) => {
                        const { name, value } = event.target;
                        setPrevData({ ...prevData, [name]: value });
                      }}
                      displayEmpty
                      defaultValue={""}
                      MenuProps={{
                        sx: {
                          top: 2,
                          ".MuiPaper-root": {
                            background: isThemeDark ? "#252525" : "#fff",
                          },
                          ul: {
                            color: isThemeDark ? "#fff" : "#000",
                          },
                        },
                      }}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={""}>
                        <em>None</em>
                      </MenuItem>
                      {["all", "applied", "interview", "offer", "rejected"]
                        .slice(1)
                        .map((option) => (
                          <MenuItem value={option}>
                            {option.slice(0, 1).toUpperCase() +
                              option.substring(1)}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <label>Location</label>
                  <input
                    placeholder="Location"
                    name="location"
                    id="location"
                    value={prevData.location}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                    className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                  />
                </div>
                <div>
                  <label>Salary</label>
                  <input
                    className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                    type="number"
                    placeholder="Salary"
                    name="salary"
                    id="salary"
                    value={prevData.salary}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                  />
                </div>
                <div>
                  <label>Notes</label>
                  <textarea
                    className="resize-none min-h-28 w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                    placeholder="Notes"
                    name="notes"
                    id="notes"
                    value={prevData.notes}
                    onChange={(event) =>
                      handleChange(event, prevData, setPrevData)
                    }
                  />
                </div>
                <div className="w-full flex justify-between flex-wrap gap-2 items-center text-xs">
                  <div>
                    <input
                      className="cursor-pointer font-medium bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white px-4 py-2"
                      type="submit"
                      value="Confirm"
                      id="confirm"
                    />
                    <input
                      className="cursor-pointer	font-medium dark:bg-inherit text-black dark:text-white bg-white underline hover:no-underline px-4 py-2 rounded-full"
                      type="button"
                      value="Cancel"
                      onClick={() => {
                        setIsCardOpen({});
                        reset();
                      }}
                    />
                  </div>
                  <div className="float-right">
                    <button
                      onClick={() => handleDelete(prevData.id)}
                      className="flex items-center gap-1.5 font-medium bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white pl-3 pr-4 py-2"
                    >
                      <DeleteIcon className="shrink-0" fontSize="small" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      ))}
    </>
  );
}
