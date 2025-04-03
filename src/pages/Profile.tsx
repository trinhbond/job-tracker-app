import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useTheme } from "../hooks";
import Loading from "../components/Loading";

export default function Profile() {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
    },
  });

  if (!user || loading)
    return (
      <div className="place-content-center text-center fixed left-0 right-0 top-0 bottom-0">
        <Loading theme={theme} />
      </div>
    );

  return (
    <div className="main px-6 py-12 flex flex-col gap-8">
      <h1 className="font-semibold text-2xl">Profile</h1>
      <div className="text-sm [&>div]:max-w-64 [&>div]:mb-3">
        {user.displayName && (
          <div>
            <div className="flex justify-between">
              <label className="mr-1">Name</label>
              <button
                onClick={() => {
                  setValue("name", user.displayName);
                  setIsOpen((isOpen) => !isOpen);
                }}
                className={clsx(
                  isOpen && "hidden",
                  "text-sky-600 underline hover:no-underline"
                )}
              >
                Edit
              </button>
            </div>
            <input
              type="text"
              className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
              disabled
              placeholder={user.displayName}
            />
          </div>
        )}
        {user.email && (
          <div>
            <label>Email</label>
            <input
              type="text"
              className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
              disabled
              placeholder={user.email}
            />
          </div>
        )}
        {user.metadata && (
          <div>
            <label>Account created</label>
            <input
              type="text"
              className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
              disabled
              placeholder={user.metadata.creationTime}
            />
          </div>
        )}
      </div>

      <Modal keepMounted open={isOpen}>
        <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0">
          <h1 className="text-xl font-semibold">Edit Name</h1>
          <form
            onSubmit={handleSubmit(async (data) =>
              updateProfile(user, { displayName: data.name }).then(() => {
                window.location.reload();
              })
            )}
            className="flex flex-col gap-4 mt-6 text-sm"
          >
            <div>
              <label>Name</label>
              <input
                type="text"
                className={clsx(
                  errors.name && "border-red-600 dark:border-red-600",
                  "w-full focus:outline-none bg-white dark:bg-inherit dark:text-white border dark:border-[#ffffff18] px-4 py-2 mt-1 rounded-md"
                )}
                {...register("name", {
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name cannot have symbols or special characters",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                onChange={(e) =>
                  setValue("name", e.target.value, { shouldValidate: true })
                }
              />
              {errors.name && (
                <p className="text-red-600 mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="text-xs">
              <input
                className="cursor-pointer	font-medium bg-black dark:bg-white text-white dark:text-gray-night rounded-full px-4 py-2"
                type="submit"
                value="Confirm"
              />
              <input
                className="cursor-pointer	font-medium bg-white dark:bg-inherit text-black dark:text-white underline px-4 py-2 rounded-full hover:no-underline"
                type="button"
                value="Cancel"
                onClick={() => {
                  setIsOpen((isOpen) => !isOpen);
                  reset();
                }}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
