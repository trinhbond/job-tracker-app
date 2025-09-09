import { FormControl, MenuItem, Modal, Select } from "@mui/material";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppForm } from "../../../types/form-types";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { notify } from "../../../utils";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "../../../hooks";

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
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
    >
      <div className="p-4 shadow-lg bg-white text-black fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0 overflow-y-scroll text-sm">
        <div className="text-xl font-medium">New application</div>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleAddApplication}
        >
          <div>
            <label>
              Role <span className="text-red-600">*</span>
            </label>
            <Controller
              control={control}
              name={"title"}
              render={() => (
                <input
                  placeholder="Role"
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
                    errors.title && "border-red-600",
                    "w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
                  )}
                />
              )}
            />
            {errors.title && <p role="alert">Title is required</p>}
          </div>
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
                    errors.company && "border-red-600",
                    "w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
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
            {errors.company && <p role="alert">Company is required</p>}
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
                  className="w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
                />
              )}
            />
          </div>
          <div>
            <label className="text-black">Status</label>
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
                    fullWidth
                    className="mt-1"
                    {...register("status")}
                    displayEmpty
                    defaultValue={""}
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
            <label>Link</label>
            <Controller
              control={control}
              name={"link"}
              render={() => (
                <input
                  placeholder="Link"
                  {...register("link")}
                  className="w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
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
                  className="w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
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
                  className="resize-none min-h-[150px] w-full focus:outline-none bg-white border px-4 py-2 mt-1 rounded-md"
                  placeholder="Notes"
                  {...register("notes")}
                />
              )}
            />
          </div>
          <div className="text-xs">
            <input
              className="cursor-pointer	font-medium bg-[#f2f2f3] hover:bg-[#eaeaeb] rounded-full text-black px-4 py-2"
              type="submit"
              value="Confirm"
            />
            <input
              className="cursor-pointer	font-medium bg-white text-black underline hover:no-underline px-4 py-2 rounded-full"
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
