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
import { handleChange } from "../utils";
import { toast, TypeOptions } from "react-toastify";
import Trash from "../components/icons/Trash";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import ArrowDown from "../components/icons/ArrowDown";

export default function Content() {
  const { user } = useContext(AuthContext);
  const toastId = useRef("toast");
  const [data, setData] = useState<AppForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState<any>({});
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
  const [filterValue, setFilterValue] = useState<number | null>(0);
  const options = ["applied", "interview", "offer", "rejected", "ghosted"];

  const filteredData =
    options[filterValue as number] &&
    data.filter((element) =>
      element.status.includes(options[filterValue as number])
    ).length > 0
      ? data.filter((element) =>
          element.status.includes(options[filterValue as number])
        )
      : data;

  const toggleOpen = (id: string) => {
    setIsCardClicked({
      ...isCardClicked,
      [id]: !isCardClicked[id],
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
      setModalOpened((cardOpened) => !cardOpened);
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
      setIsCardClicked({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeFilter = (index: number) => {
    setFilterValue((prevState) => (prevState === index ? null : index));
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
        setLoading(true);
        try {
          query.forEach((doc) => {
            docsData.push({ id: doc.id, ...doc.data() });
          });
          setData(docsData);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [data, user]);

  useEffect(() => {
    // disable scrolling when modal is opened
    if (modalOpened || !!Object.keys(isCardClicked).length) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpened, isCardClicked]);

  if (loading)
    return (
      <div className="animate-pulse place-content-center text-lg text-center fixed left-0 right-0 top-0 bottom-0">
        Loading...
      </div>
    );

  return (
    <div className="py-12 px-4 lg:px-40 md:px-22 sm:px-16 xs:px-4 relative">
      <div className="flex flex-col gap-6 border-b pb-3">
        <h1 className="inline-block font-medium text-xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-xl">
          Applications
        </h1>
        <div className="inline-flex">
          <button
            onClick={() => setModalOpened((cardOpened) => !cardOpened)}
            className="font-medium text-sm dark:bg-[#252525] dark:hover:bg-[#2b2b2b] dark:text-white rounded-full bg-black text-white px-4 py-2"
          >
            Create
          </button>
          <div className="h-8 border-l border-[#c6c6c6] dark:border-white ml-4 text-center"></div>
          <div className="group relative inline-block">
            <div className="font-medium text-sm w-fit rounded-full px-4 py-2 inline-flex items-center gap-1">
              <button className="dropbtn">Filter</button>
              <ArrowDown className="group-hover:rotate-180" />
            </div>
            <fieldset className="absolute hidden group-hover:block z-40 dark:bg-[#252525] bg-black rounded-md p-3 w-28 min-w-28 text-sm">
              {options.map((option, index) => (
                <div>
                  <input
                    className="align-middle"
                    key={index}
                    type="checkbox"
                    checked={index === filterValue}
                    onChange={() => handleChangeFilter(index)}
                  />
                  <label htmlFor={option} className="ml-2 text-white">
                    {option}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
      {modalOpened && (
        <>
          <Backdrop />
          <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full lg:w-96 lg:w-min-96 md:w-96 md:w-min-96 sm:w-96 sm:w-min-96 xs:w-full top-0 right-0 overflow-y-scroll">
            <div>
              <h1 className="text-xl font-semibold pb-1 border-b border-[#ffffff18]">
                Create application
              </h1>
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
                      "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
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
                      "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                    )}
                  />
                </div>
                <div>
                  <label>Link</label>
                  <input
                    placeholder="Link"
                    {...register("link")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                  />
                </div>
                <div>
                  <label className="dark:text-white text-black">Status</label>
                  <select
                    {...register("status")}
                    className="w-full focus:outline-none bg-white border mt-1 p-1 rounded-sm bg-white text-black dark:bg-inherit dark:text-white"
                  >
                    <option selected disabled className="bg-[#c6c6c6]" value="">
                      Select Status
                    </option>
                    {options.map((option) => (
                      <option
                        className="bg-white text-black dark:bg-[#18181B] dark:text-white"
                        value={option}
                      >
                        {option.slice(0, 1).toUpperCase() + option.substring(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Location</label>
                  <input
                    placeholder="Location"
                    {...register("location")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                  />
                </div>
                <div>
                  <label>Salary</label>
                  <input
                    type="number"
                    placeholder="Salary"
                    {...register("salary")}
                    className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
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
                    className="cursor-pointer	font-semibold dark:bg-white dark:text-[#121212] bg-black text-white rounded-full px-4 py-2"
                    type="submit"
                    value="Confirm"
                  />
                  <input
                    className="cursor-pointer	font-semibold dark:bg-inherit dark:text-white bg-white text-black underline hover:no-underline rounded-full px-4 py-2"
                    type="button"
                    value="Cancel"
                    onClick={() => {
                      setModalOpened((cardOpened) => !cardOpened);
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
        {filteredData.map((props: AppForm) => (
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
            {isCardClicked[props.id!] && (
              <>
                <Backdrop />
                <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full lg:w-96 lg:w-min-96 md:w-96 md:w-min-96 sm:w-96 sm:w-min-96 xs:w-full top-0 right-0 overflow-y-scroll">
                  <div>
                    <h1 className="text-xl font-semibold pb-1 border-b border-[#ffffff18]">
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
                            "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
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
                            "w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
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
                          className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                        />
                      </div>
                      <div>
                        <label>Status</label>
                        <select
                          value={prevData.status}
                          name="status"
                          id="status"
                          onChange={(event) =>
                            handleChange(event, prevData, setPrevData)
                          }
                          className="w-full focus:outline-none bg-white border mt-1 p-1 rounded-sm bg-white text-black dark:bg-inherit dark:text-white"
                        >
                          <option
                            selected
                            disabled
                            className="bg-[#c6c6c6]"
                            value=""
                          >
                            Select Status
                          </option>
                          {options.map((option) => (
                            <option
                              className="bg-white text-black dark:bg-[#18181B] dark:text-white"
                              value={option}
                            >
                              {option.slice(0, 1).toUpperCase() +
                                option.substring(1)}
                            </option>
                          ))}
                        </select>
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
                          className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                        />
                      </div>
                      <div>
                        <label>Salary</label>
                        <input
                          className="w-full focus:outline-none dark:bg-inherit dark:text-white bg-white border-b pb-1"
                          type="number"
                          name="salary"
                          id="salary"
                          placeholder="salary"
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
                            className="cursor-pointer font-semibold dark:bg-white dark:text-[#121212] bg-black text-white rounded-full px-4 py-2"
                            type="submit"
                            value="Confirm"
                            id="confirm"
                          />
                          <input
                            className="cursor-pointer	font-semibold dark:bg-inherit dark:text-white bg-white bg-black underline hover:no-underline rounded-full px-4 py-2"
                            type="button"
                            value="Cancel"
                            onClick={() => {
                              setIsCardClicked({});
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
                            className="flex flex-row items-center font-semibold justify-evenly dark:bg-white dark:text-[#121212] bg-black text-white rounded-full px-4 py-2"
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
        ))}
      </div>
    </div>
  );
}
