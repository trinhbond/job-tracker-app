import { FormControl, MenuItem, Modal, Select } from "@mui/material";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { AppForm } from "../types";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { notify } from "../utils";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "../hooks";

export default function CreateForm({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useContext(AuthContext);
  const { isThemeDark } = useTheme();
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<AppForm>();
  const toastId = useRef("toast");

  const handleAddApplication = handleSubmit(async (data) => {
    try {
      await addDoc(
        collection(db, "applications", "user/", user?.uid as string),
        {
          ...data,
          date: new Date(),
        }
      );
      notify("Application added", "success", toastId);
      setIsModalOpen((isModalOpen) => !isModalOpen);
      reset();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Modal keepMounted open={isModalOpen}>
      <div className="p-4 shadow-lg bg-white dark:bg-[#18181B] dark:text-white text-black fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0 overflow-y-scroll">
        <h1 className="text-xl font-semibold">New application</h1>
        <form
          className="flex flex-col gap-4 mt-6 text-sm"
          onSubmit={handleAddApplication}
        >
          <div>
            <label>
              Company <span className="text-red-600">*</span>
            </label>
            <Controller
              control={control}
              name={"company"}
              render={() => (
                <input
                  placeholder="Company"
                  className={clsx(
                    errors.company && "border-red-600 dark:border-red-600",
                    "w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                  )}
                  {...register("company", {
                    required: {
                      value: true,
                      message: "Company is required",
                    },
                    pattern: {
                      value: /[^' ']+/,
                      message: "Company is required",
                    },
                  })}
                />
              )}
            />
          </div>
          <div>
            <label>
              Title <span className="text-red-600">*</span>
            </label>
            <Controller
              control={control}
              name={"title"}
              render={() => (
                <input
                  placeholder="Title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title is required",
                    },
                    pattern: {
                      value: /[^' ']+/,
                      message: "Title is required",
                    },
                  })}
                  className={clsx(
                    errors.title && "border-red-600 dark:border-red-600",
                    "w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                  )}
                />
              )}
            />
          </div>
          <div>
            <label>Link</label>
            <Controller
              control={control}
              name={"link"}
              render={() => (
                <input
                  placeholder="Link"
                  {...register("link")}
                  className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                />
              )}
            />
          </div>
          <div>
            <label className="dark:text-white text-black">Status</label>
            <Controller
              control={control}
              name={"status"}
              render={() => (
                <FormControl
                  sx={{
                    minWidth: 130,
                    display: "block",
                  }}
                >
                  <Select
                    className="w-full mt-1 focus:outline-none dark:text-white border dark:[&>svg]:fill-white dark:border-[#ffffff18]"
                    {...register("status")}
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
                    displayEmpty
                    defaultValue={""}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {[
                      "all",
                      "applied",
                      "interview",
                      "offer",
                      "rejected",
                      "screening",
                      "assessment",
                    ]
                      .slice(1)
                      .map((option) => (
                        <MenuItem value={option}>
                          {option.slice(0, 1).toUpperCase() +
                            option.substring(1)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </div>
          <div>
            <label>Location</label>
            <Controller
              control={control}
              name={"location"}
              render={() => (
                <input
                  placeholder="Location"
                  {...register("location")}
                  className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                />
              )}
            />
          </div>
          <div>
            <label>Salary</label>
            <Controller
              control={control}
              name={"salary"}
              render={() => (
                <input
                  type="number"
                  placeholder="Salary"
                  {...register("salary")}
                  className="w-full focus:outline-none dark:bg-inherit bg-white dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                />
              )}
            />
          </div>
          <div>
            <label>Notes</label>
            <Controller
              control={control}
              name={"notes"}
              render={() => (
                <textarea
                  className="resize-none min-h-28 w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                  placeholder="Notes"
                  {...register("notes")}
                />
              )}
            />
          </div>
          <div className="text-xs">
            <input
              className="cursor-pointer	font-medium bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white px-4 py-2"
              type="submit"
              value="Confirm"
            />
            <input
              className="cursor-pointer	font-medium bg-white dark:bg-inherit text-black dark:text-white underline hover:no-underline px-4 py-2 rounded-full"
              type="button"
              value="Cancel"
              onClick={() => {
                setIsModalOpen((isModalOpen) => !isModalOpen);
                reset();
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
