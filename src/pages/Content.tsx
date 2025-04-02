import React, { useContext, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useForm } from "react-hook-form";
import { AppForm } from "../types";
import { useTheme } from "../hooks";
import { notify, handleChange } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Modal } from "@mui/material";
import Loading from "../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Content() {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useTheme();
  const isThemeDark = document.documentElement.classList.value === "dark";
  const toastId = useRef("toast");
  const [data, setData] = useState<AppForm[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<any>({});
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AppForm>();
  const [prevData, setPrevData] = useState<AppForm>({
    id: "",
    company: "",
    title: "",
    link: "",
    salary: 0,
    notes: "",
    date: new Date(),
    location: "",
    status: "",
  });
  const statusOptions = ["all", "applied", "interview", "offer", "rejected"];

  const filteredData =
    statusIndex > 0 &&
    data.filter((props) => props.status.includes(statusOptions[statusIndex]))
      .length > 0
      ? data.filter((props) =>
          props.status.includes(statusOptions[statusIndex])
        )
      : data;

  const toggleCard = (id: string, props: AppForm) => {
    setIsCardOpen({
      ...isCardOpen,
      [id]: !isCardOpen[id],
    });
    setPrevData(props);
  };

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

  useEffect(() => {
    (async () => {
      if (user) {
        const query = await getDocs(
          collection(db, "applications", "user/", user.uid as string)
        );
        const docsData: any = [];
        setIsLoadingData(true);
        try {
          query.forEach((doc) => {
            docsData.push({ id: doc.id, ...doc.data() });
          });
          setData(docsData);
          setIsLoadingData(false);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [data, user]);

  if (isLoadingData || loading)
    return (
      <div className="place-content-center text-center fixed left-0 right-0 top-0 bottom-0">
        <Loading theme={theme} />
      </div>
    );

  return (
    <div className="main px-6 py-12 relative">
      <div className="flex justify-between items-normal md:items-center lg:items-center flex-col md:flex-row lg:flex-row gap-4">
        <h1 className="font-semibold text-2xl">Your Applications</h1>
        <div className="inline-flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            className="font-medium text-sm bg-black dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-sm text-white px-4 py-2"
          >
            Create
          </button>
          <div className="h-9 border-l dark:border-[#ffffff18]"></div>
          <FormControl
            sx={{
              minWidth: 130,
            }}
          >
            <Select
              className="focus:outline-none dark:text-white border dark:[&>svg]:fill-white dark:border-[#ffffff18]"
              value={statusOptions[statusIndex]}
              onChange={(e: SelectChangeEvent) => {
                setStatusIndex(statusOptions.indexOf(e.target.value));
              }}
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
              inputProps={{ "aria-label": "Without label" }}
            >
              {statusOptions.map((option, index) => (
                <MenuItem
                  value={option}
                  key={index}
                  selected={index === statusIndex}
                >
                  {option.slice(0, 1).toUpperCase() + option.substring(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

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
              <input
                placeholder="Company"
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
                className={clsx(
                  errors.company && "border-red-600 dark:border-red-600",
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
            </div>
            <div>
              <label>Link</label>
              <input
                placeholder="Link"
                {...register("link")}
                className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
              />
            </div>
            <div>
              <label className="dark:text-white text-black">Status</label>
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
                  {statusOptions.slice(1).map((option) => (
                    <MenuItem value={option}>
                      {option.slice(0, 1).toUpperCase() + option.substring(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <label>Location</label>
              <input
                placeholder="Location"
                {...register("location")}
                className="w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
              />
            </div>
            <div>
              <label>Salary</label>
              <input
                type="number"
                placeholder="Salary"
                {...register("salary")}
                className="w-full focus:outline-none dark:bg-inherit bg-white dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
              />
            </div>
            <div>
              <label>Notes</label>
              <textarea
                className="resize-none min-h-28 w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                placeholder="Notes"
                {...register("notes")}
              />
            </div>
            <div className="text-xs">
              <input
                className="cursor-pointer	font-medium bg-black dark:bg-white text-white dark:text-gray-night rounded-full px-4 py-2"
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

      <div className="grid lg:grid-cols-1 gap-4 mt-8">
        {statusIndex > 0 &&
        data.filter((props) =>
          props.status.includes(statusOptions[statusIndex])
        ).length == 0 ? (
          <>No results</>
        ) : (
          filteredData.map((props: AppForm) => (
            <>
              <Card props={props} onClick={() => toggleCard(props.id, props)} />

              <Modal keepMounted open={isCardOpen[props.id]}>
                <div className="p-4 shadow-lg text-black dark:text-white bg-white dark:bg-[#18181B] fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0 overflow-y-scroll">
                  <div>
                    <h1 className="text-xl font-semibold">Edit application</h1>
                    <form
                      className="flex flex-col gap-4 mt-6 text-sm"
                      onSubmit={(event) =>
                        handleEditApplication(props.id, event)
                      }
                    >
                      <div>
                        <label>
                          Company <span className="text-red-600">*</span>
                        </label>
                        <input
                          placeholder="Company"
                          value={prevData.company}
                          name="company"
                          id="company"
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
                          value={prevData.title}
                          name="title"
                          id="title"
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
                          value={prevData.link}
                          name="link"
                          id="link"
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
                            value={prevData.status}
                            name="status"
                            id="status"
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
                            {statusOptions.slice(1).map((option) => (
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
                          name="location"
                          id="location"
                          placeholder="Location"
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
                          name="salary"
                          id="salary"
                          placeholder="Salary"
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
                            className="cursor-pointer font-medium bg-black dark:bg-white text-white dark:text-gray-night rounded-full px-4 py-2"
                            type="submit"
                            value="Confirm"
                            id="confirm"
                          />
                          <input
                            className="cursor-pointer	font-medium dark:bg-inherit dark:text-white bg-white underline hover:no-underline px-4 py-2 rounded-full"
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
                            onClick={() => handleDelete(props.id)}
                            className="flex flex-row items-center justify-between gap-2 font-medium bg-black dark:bg-white text-white dark:text-gray-night rounded-full px-4 py-2"
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
            </>
          ))
        )}
      </div>
    </div>
  );
}
