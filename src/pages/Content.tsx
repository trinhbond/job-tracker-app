import { useContext, useEffect, useRef, useState } from "react";
import Backdrop from "../components/Backdrop";
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
import { useThemeToggle } from "../hooks";
import { handleChange } from "../utils";
import { toast, TypeOptions } from "react-toastify";
import Trash from "../components/icons/Trash";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CircularProgress as Loading } from "@mui/material";

export default function Content() {
  const { user } = useContext(AuthContext);
  const toastId = useRef("toast");
  const [data, setData] = useState<AppForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<any>({});
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AppForm>();
  const [prevData, setPrevData] = useState<AppForm>({
    company: "",
    title: "",
    link: "",
    salary: 0,
    notes: "",
    date: new Date(),
    location: "",
    status: "",
  });
  const [filterValue, setFilterValue] = useState<number>(0);
  const options = [
    "all",
    "applied",
    "interview",
    "offer",
    "rejected",
    "ghosted",
  ];

  const filteredData =
    filterValue > 0 &&
    data.filter((props) => props.status.includes(options[filterValue])).length >
      0
      ? data.filter((props) => props.status.includes(options[filterValue]))
      : data;

  const toggleOpen = (id: string) => {
    setIsCardOpen({
      ...isCardOpen,
      [id]: !isCardOpen[id],
    });
  };

  const displayToast = (message: string, type: TypeOptions) => {
    if (!toast.isActive(toastId.current)) {
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

  const handleAddApplication = handleSubmit(async (data) => {
    try {
      await addDoc(
        collection(
          db,
          "applications",
          "users",
          "user/",
          user?.uid as string,
          user?.displayName as string
        ),
        {
          ...data,
          date: new Date(),
        }
      );
      displayToast("Application added", "success");
      setIsModalOpen((isModalOpen) => !isModalOpen);
      reset();
    } catch (e) {
      console.error(e);
    }
  });

  const handleEditApplication = (id: string, e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setPrevData(prevData);

    try {
      if (!prevData.company.trim() || !prevData.title.trim()) {
        return;
      }
      updateDoc(
        doc(
          db,
          "applications",
          "users",
          "user/",
          user?.uid as string,
          user?.displayName as string,
          id
        ),
        { ...prevData }
      );
      displayToast("Application updated", "success");
      setIsCardOpen({});
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const query = await getDocs(
          collection(
            db,
            "applications",
            "users",
            "user/",
            user.uid as string,
            user.displayName as string
          )
        );
        const docsData: any = [];
        setIsLoading(true);
        try {
          query.forEach((doc) => {
            docsData.push({ id: doc.id, ...doc.data() });
          });
          setData(docsData);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [data, user]);

  useEffect(() => {
    // disable scrolling when modal is opened
    if (isModalOpen || !!Object.keys(isCardOpen).length) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen, isCardOpen]);

  if (isLoading)
    return (
      <div className="place-content-center text-lg text-center fixed left-0 right-0 top-0 bottom-0">
        <Loading sx={{ color: "#000" }} />
      </div>
    );

  return (
    <div className="py-12 px-4 lg:px-40 md:px-22 sm:px-16 xs:px-4 relative">
      <div className="flex flex-col gap-6 border-b dark:border-[#ffffff18] pb-3">
        <h1 className="font-semibold text-3xl lg:text-4xl md:text-4xl sm:text-4xl xs:text-3xl">
          Your Applications
        </h1>
        <div className="inline-flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            className="font-medium text-sm dark:bg-[#252525] dark:hover:bg-[#2b2b2b] dark:text-white rounded-sm bg-black text-white px-4 py-2"
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
              className="focus:outline-none rounded-sm !font-medium !text-sm dark:text-white border [&>svg]:fill-red-black dark:[&>svg]:fill-white dark:border-[#ffffff18]"
              value={options[filterValue]}
              onChange={(e: SelectChangeEvent) => {
                setFilterValue(options.indexOf(e.target.value));
              }}
              MenuProps={{
                sx: {
                  top: 2,
                  ".MuiPaper-root": {
                    background:
                      document.querySelector("html")?.classList.value == "dark"
                        ? "#252525"
                        : "#ffffff",
                  },
                  ul: {
                    color:
                      document.querySelector("html")?.classList.value == "dark"
                        ? "white"
                        : "black",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-root": { fontWeight: 400 },
                ".MuiSelect-select": {
                  padding: "8px 16px",
                  fontSize: 14,
                  fontWeight: 400,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {options.map((option, index) => (
                <MenuItem
                  value={option}
                  key={index}
                  selected={index === filterValue}
                  sx={{ fontSize: 14, fontWeight: 400 }}
                >
                  {option.slice(0, 1).toUpperCase() + option.substring(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {isModalOpen && (
        <>
          <Backdrop />
          <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full lg:w-96 lg:w-min-96 md:w-96 md:w-min-96 sm:w-96 sm:w-min-96 xs:w-full top-0 right-0 overflow-y-scroll">
            <div>
              <h1 className="text-xl font-semibold pb-1">Create application</h1>
              <form
                className="flex flex-col gap-4 py-4 text-sm"
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
                      errors.company && "border-red-600",
                      "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
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
                      errors.title && "border-red-600",
                      "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                    )}
                  />
                </div>
                <div>
                  <label>Link</label>
                  <input
                    placeholder="Link"
                    {...register("link")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                  />
                </div>
                <div>
                  <label className="dark:text-white text-black">Status</label>
                  <FormControl
                    sx={{
                      minWidth: 130,
                      display: "block",
                      width: "100%",
                      fontWeight: 400,
                    }}
                  >
                    <Select
                      className="w-full mt-1 focus:outline-none rounded-sm font-medium text-sm dark:text-white border [&>svg]:fill-red-black dark:[&>svg]:fill-white dark:border-[#ffffff18]"
                      {...register("status")}
                      MenuProps={{
                        sx: {
                          top: 2,
                          ".MuiPaper-root": {
                            background:
                              document.querySelector("html")?.classList.value ==
                              "dark"
                                ? "#252525"
                                : "#ffffff",
                          },
                          ul: {
                            color:
                              document.querySelector("html")?.classList.value ==
                              "dark"
                                ? "white"
                                : "black",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiInputBase-root": { fontWeight: 400 },
                        ".MuiSelect-select": {
                          padding: "8px 16px",
                          fontSize: 14,
                          fontWeight: 400,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: 0,
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: "none",
                          },
                      }}
                      displayEmpty
                      defaultValue={""}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" sx={{ fontSize: 14, fontWeight: 400 }}>
                        <em>None</em>
                      </MenuItem>
                      {options.slice(1).map((option) => (
                        <MenuItem
                          value={option}
                          sx={{ fontSize: 14, fontWeight: 400 }}
                        >
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
                    {...register("location")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                  />
                </div>
                <div>
                  <label>Salary</label>
                  <input
                    type="number"
                    placeholder="Salary"
                    {...register("salary")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                  />
                </div>
                <div>
                  <label>Notes</label>
                  <textarea
                    className="resize-none min-h-28 focus:outline-none w-full h-auto dark:bg-inherit dark:text-white bg-white rounded-sm"
                    placeholder="Notes"
                    {...register("notes")}
                  />
                </div>
                <div className="text-xs">
                  <input
                    className="cursor-pointer	font-medium dark:bg-white dark:text-[#121212] bg-black text-white rounded-sm px-4 py-2"
                    type="submit"
                    value="Confirm"
                  />
                  <input
                    className="cursor-pointer	font-medium dark:bg-inherit dark:text-white bg-white text-black underline hover:no-underline px-4 py-2"
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
          </div>
        </>
      )}
      <div className="grid lg:grid-cols-1 gap-4 mt-3">
        {filterValue > 0 &&
        data.filter((props) => props.status.includes(options[filterValue]))
          .length == 0 ? (
          <>No results</>
        ) : (
          filteredData.map((props: AppForm) => (
            <>
              <Card
                props={props}
                onClick={() => {
                  toggleOpen(props.id!);
                  setPrevData({
                    ...props,
                  });
                }}
              />
              {isCardOpen[props.id!] && (
                <>
                  <Backdrop />
                  <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full lg:w-96 lg:w-min-96 md:w-96 md:w-min-96 sm:w-96 sm:w-min-96 xs:w-full top-0 right-0 overflow-y-scroll">
                    <div>
                      <h1 className="text-xl font-semibold pb-1">
                        Edit application
                      </h1>
                      <form
                        className="flex flex-col gap-4 py-4 text-sm"
                        onSubmit={(e) =>
                          handleEditApplication(props.id as string, e)
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
                              !prevData.company.trim() && "border-red-600",
                              "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
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
                              !prevData.title.trim() && "border-red-600",
                              "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
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
                            className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                          />
                        </div>
                        <div>
                          <label>Status</label>
                          <FormControl
                            sx={{
                              minWidth: 130,
                              display: "block",
                              width: "100%",
                              fontWeight: 400,
                            }}
                          >
                            <Select
                              className="w-full mt-1 focus:outline-none rounded-sm font-medium text-sm dark:text-white border [&>svg]:fill-red-black dark:[&>svg]:fill-white dark:border-[#ffffff18]"
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
                                    background:
                                      document.querySelector("html")?.classList
                                        .value == "dark"
                                        ? "#252525"
                                        : "#ffffff",
                                  },
                                  ul: {
                                    color:
                                      document.querySelector("html")?.classList
                                        .value == "dark"
                                        ? "white"
                                        : "black",
                                  },
                                },
                              }}
                              sx={{
                                "& .MuiInputBase-root": { fontWeight: 400 },
                                ".MuiSelect-select": {
                                  padding: "8px 16px",
                                  fontSize: 14,
                                  fontWeight: 400,
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  border: 0,
                                },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "none",
                                  },
                              }}
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem
                                value={""}
                                sx={{ fontSize: 14, fontWeight: 400 }}
                              >
                                <em>None</em>
                              </MenuItem>
                              {options.slice(1).map((option) => (
                                <MenuItem
                                  value={option}
                                  sx={{ fontSize: 14, fontWeight: 400 }}
                                >
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
                            className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
                          />
                        </div>
                        <div>
                          <label>Salary</label>
                          <input
                            className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b dark:border-[#ffffff18] pb-1"
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
                            className="resize-none min-h-28 focus:outline-none w-full h-auto dark:bg-inherit dark:text-white bg-white rounded-sm"
                            placeholder="Notes"
                            name="notes"
                            id="notes"
                            value={prevData.notes}
                            onChange={(event) =>
                              handleChange(event, prevData, setPrevData)
                            }
                          />
                        </div>
                        <div className="buttons flex justify-between flex-wrap gap-2 items-center w-full text-xs">
                          <div>
                            <input
                              className="cursor-pointer font-medium dark:bg-white dark:text-[#121212] bg-black text-white rounded-sm px-4 py-2"
                              type="submit"
                              value="Confirm"
                              id="confirm"
                            />
                            <input
                              className="cursor-pointer	font-medium dark:bg-inherit dark:text-white bg-white bg-black underline hover:no-underline px-4 py-2"
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
                              onClick={() => {
                                deleteDoc(
                                  doc(
                                    db,
                                    "applications",
                                    "users",
                                    "user/",
                                    user?.uid as string,
                                    user?.displayName as string,
                                    props.id as string
                                  )
                                );
                              }}
                              className="flex flex-row items-center font-medium justify-evenly dark:bg-white dark:text-[#121212] bg-black text-white rounded-sm px-4 py-2"
                            >
                              <Trash className="shrink-0 mr-0.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </>
          ))
        )}
      </div>
    </div>
  );
}
