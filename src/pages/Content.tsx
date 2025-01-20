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
import { IFormAppValues } from "../types";
import { deleteApplication, handleChange, updateApplication } from "../utils";
import { toast, TypeOptions } from "react-toastify";
import Trash from "../components/icons/Trash";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";

export default function Content() {
  const { user } = useContext(AuthContext);
  const toastId = useRef("toast");
  const [data, setData] = useState<IFormAppValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState<any>({});

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormAppValues>();
  const [prevData, setPrevData] = useState<IFormAppValues>({
    company: "",
    title: "",
    salary: 0,
    notes: "",
    date: new Date(),
    location: "",
    status: "",
  });

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addDoc(
        collection(
          db,
          "applications",
          "users",
          "user/",
          user?.uid!,
          user?.displayName!
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

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { uid, displayName } = user;

        if (uid && displayName) {
          const query = await getDocs(
            collection(db, "applications", "users", "user/", uid, displayName)
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
      }
    };

    fetchData();
  }, [data, user]);

  useEffect(() => {
    if (
      errors.company?.type === "required" ||
      errors.title?.type === "required"
    ) {
      displayToast("Please fill in the required fields", "error");
      return;
    }
  }, [errors]);

  useEffect(() => {
    // disable scrolling when modal is opened
    if (modalOpened || !!Object.keys(isCardClicked).length)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [modalOpened, isCardClicked]);

  if (loading) return <>loading...</>;

  return (
    <div className="py-6 px-8 flex flex-col gap-4">
      <div>
        <div className="flex flex-row justify-between items-center mb-1 flex-wrap">
          <h1 className="font-semibold text-2xl">Applications</h1>
          <button
            onClick={() => setModalOpened((cardOpened) => !cardOpened)}
            className="font-semibold bg-black text-white rounded-md text-sm px-4 py-2"
          >
            Create
          </button>
        </div>
        <div className="border border-[#c6c6c6]" />
      </div>
      <div>
        {modalOpened && (
          <>
            <Backdrop />
            <div className="p-4 border border-[#c6c6c6] shadow-lg bg-white text-black fixed z-[9999] h-full top-0 right-0 min-w-96 w-96">
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Create application
                </h1>
                <div className="border border-[#ffffff18]" />
                <form
                  className="flex flex-col gap-4 py-4"
                  onSubmit={(event) => {
                    event.preventDefault();

                    try {
                      if (
                        errors.company?.type === "required" ||
                        errors.title?.type === "required"
                      ) {
                        displayToast(
                          "Please fill in the required fields",
                          "error"
                        );
                        return;
                      }
                      onSubmit();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <div>
                    <label className="p-1 font-medium text-sm">
                      Company <span className="text-red-600">*</span>
                    </label>
                    <input
                      placeholder="Company"
                      {...register("company", {
                        required: {
                          value: true,
                          message: "Company is required",
                        },
                      })}
                      className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="p-1 font-medium text-sm">
                      Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      placeholder="Title"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                      })}
                      className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="p-1 font-medium text-sm">Status</label>
                    <select
                      {...register("status")}
                      className="w-full focus:outline-none bg-white border p-1 rounded-sm text-sm"
                    >
                      <option selected disabled className="bg-black" value="">
                        Choose
                      </option>
                      {[
                        "applied",
                        "interview",
                        "offer",
                        "rejected",
                        "ghosted",
                      ].map((option) => (
                        <option className="bg-black text-white" value={option}>
                          {option.slice(0, 1).toUpperCase() +
                            option.substring(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="p-1 font-medium text-sm">Location</label>
                    <input
                      placeholder="Location"
                      {...register("location")}
                      className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="p-1 font-medium text-sm">Salary</label>
                    <input
                      type="number"
                      placeholder="Salary"
                      {...register("salary")}
                      className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="p-1 font-medium text-sm">Notes</label>
                    <textarea
                      className="resize-none focus:outline-none w-full h-auto p-1 bg-white rounded-sm text-sm"
                      placeholder="Notes"
                      {...register("notes")}
                    />
                  </div>
                  <div className="buttons flex items-center gap-3">
                    <input
                      className="cursor-pointer	font-semibold bg-black text-white rounded-md text-xs px-4 py-2"
                      type="submit"
                      value="Confirm"
                    />
                    <input
                      className="cursor-pointer	font-semibold bg-white text-black underline hover:no-underline rounded-md text-xs px-4 py-2"
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
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {data.map((props: IFormAppValues) => (
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
                <div className="p-4 border border-[#c6c6c6] shadow-lg bg-white text-black fixed z-[9999] h-full top-0 right-0 min-w-96 w-96">
                  <div>
                    <h1 className="text-xl font-semibold mb-1">
                      Edit application
                    </h1>
                    <div className="border border-[#ffffff18]" />
                    <form
                      className="flex flex-col gap-4 py-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setPrevData(prevData);

                        try {
                          if (
                            prevData.company.trim().length === 0 ||
                            prevData.title.trim().length === 0
                          ) {
                            displayToast(
                              "Fill in the required fields",
                              "error"
                            );
                            return;
                          }
                          updateDoc(
                            doc(
                              db,
                              "applications",
                              "users",
                              "user/",
                              user?.uid!,
                              user?.displayName!,
                              props.id!
                            ),
                            { ...prevData }
                          );
                          displayToast("Application updated", "success");
                          setIsCardClicked({});
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <div>
                        <label className="p-1 font-medium text-sm">
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
                          className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                        />
                      </div>
                      <div>
                        <label className="p-1 font-medium text-sm">
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
                          className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                        />
                      </div>
                      <div>
                        <label className="p-1 font-medium text-sm">
                          Status
                        </label>
                        <select
                          value={prevData.status}
                          name="status"
                          id="status"
                          onChange={(event) =>
                            handleChange(event, prevData, setPrevData)
                          }
                          className="w-full focus:outline-none bg-white border p-1 rounded-sm text-sm"
                        >
                          <option
                            selected
                            disabled
                            className="bg-black text-white"
                            value=""
                          >
                            Choose
                          </option>
                          {[
                            "applied",
                            "interview",
                            "offer",
                            "rejected",
                            "ghosted",
                          ].map((option) => (
                            <option
                              className="bg-black text-white"
                              value={option}
                            >
                              {option.slice(0, 1).toUpperCase() +
                                option.substring(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="p-1 font-medium text-sm">
                          Location
                        </label>
                        <input
                          name="location"
                          id="location"
                          placeholder="Location"
                          value={prevData.location || ""}
                          onChange={(event) =>
                            handleChange(event, prevData, setPrevData)
                          }
                          className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
                        />
                      </div>
                      <div>
                        <label className="p-1 font-medium text-sm">
                          Salary
                        </label>
                        <input
                          className="w-full focus:outline-none bg-white border-b p-1 rounded-sm text-sm"
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
                        <label className="p-1 font-medium text-sm">Notes</label>
                        <textarea
                          className="resize-none focus:outline-none w-full h-auto p-1 bg-white rounded-sm text-sm"
                          placeholder="Notes"
                          name="notes"
                          id="notes"
                          value={prevData.notes}
                          onChange={(event) =>
                            handleChange(event, prevData, setPrevData)
                          }
                        />
                      </div>
                      <div className="buttons flex items-center justify-between gap-3">
                        <div>
                          <input
                            className="cursor-pointer mr-2 font-semibold bg-black text-white rounded-md text-xs px-4 py-2"
                            type="submit"
                            value="Confirm"
                            id="confirm"
                          />
                          <input
                            className="cursor-pointer	font-semibold bg-white bg-black underline hover:no-underline rounded-md text-xs px-4 py-2"
                            type="button"
                            value="Cancel"
                            onClick={() => {
                              setIsCardClicked({});
                              reset();
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            deleteDoc(
                              doc(
                                db,
                                "applications",
                                "users",
                                "user/",
                                user?.uid!,
                                user?.displayName!,
                                props.id!
                              )
                            );
                          }}
                          className="flex flex-row items-center gap-1 font-semibold justify-between bg-black text-white rounded-md text-xs px-2.5 py-2"
                        >
                          <Trash />
                          <span>Delete</span>
                        </button>
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
