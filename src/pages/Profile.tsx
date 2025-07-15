import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function Profile() {
  const { user } = useContext(AuthContext);
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

  const onClickEdit = () => {
    if (!user) return;
    setValue("name", user.displayName);
    setIsOpen((isOpen) => !isOpen);
  };

  if (!user) return null;

  return (
    <div className="dark:bg-[#121212] dark:text-white px-6 py-8">
      <div className="flex justify-between flex-row">
        <h1 className="font-semibold text-2xl">Profile</h1>
        <button
          onClick={onClickEdit}
          className="font-medium text-sm bg-black hover:bg-[#333] text-white dark:bg-white dark:text-[#121212] dark:hover:bg-[#ccc] rounded-full px-4 py-2 self-center"
        >
          Edit
        </button>
      </div>
      <div className="text-md grid grid-cols-1 space-y-6 mt-8">
        {user.displayName && (
          <div>
            <span>Name</span>
            <div className="text-gray-payne dark:text-gray-default">
              {user.displayName}
            </div>
          </div>
        )}
        {user.email && (
          <div>
            <span>Email</span>
            <div className="text-gray-payne dark:text-gray-default">
              {user.email}
            </div>
          </div>
        )}
        {user.metadata && (
          <div>
            <span>Account created</span>
            <div className="text-gray-payne dark:text-gray-default">
              {user.metadata.creationTime}
            </div>
          </div>
        )}
        <div>
          <span>Account verified</span>
          <div className="text-gray-payne dark:text-gray-default">
            {user.emailVerified ? "Yes" : "No"}
          </div>
        </div>
      </div>

      <Modal keepMounted open={isOpen}>
        <div className="p-4 shadow-lg dark:bg-[#18181B] dark:text-white bg-white text-black fixed z-40 h-full w-full sm:w-96 lg:w-min-96 top-0 right-0">
          <h1 className="text-xl font-semibold">Edit details</h1>
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
                className="cursor-pointer	font-medium bg-[#f2f2f3] hover:bg-[#eaeaeb] dark:bg-[#252525] dark:hover:bg-[#2b2b2b] rounded-full text-black dark:text-white rounded-full px-4 py-2"
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
