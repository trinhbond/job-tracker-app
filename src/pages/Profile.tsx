import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal, Tooltip } from "@mui/material";
import { updateProfile } from "firebase/auth";
import InfoIcon from "@mui/icons-material/Info";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
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

  if (!user) return null;

  const onSubmit = handleSubmit(async (data) =>
    updateProfile(user, { displayName: data.name }).then(() => {
      window.location.reload();
    })
  );

  return (
    <div className="main px-4 py-12 flex flex-col gap-2">
      <h1 className="font-semibold text-2xl border-b dark:border-[#ffffff18] pb-1">
        Profile
      </h1>
      <div className="text-sm [&>div]:max-w-64 [&>div]:mb-3">
        <div>
          <div className="flex justify-between">
            <label className="mr-1">Name</label>
            {!isOpen && (
              <button
                onClick={() => {
                  setValue("name", user.displayName as string);
                  setIsOpen((isOpen) => !isOpen);
                }}
                className="text-sky-600 underline hover:no-underline"
              >
                Edit
              </button>
            )}
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
            disabled
            placeholder={user.displayName as string}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
            disabled
            placeholder={user.email as string}
          />
        </div>
        <div>
          <label>Account created</label>
          <input
            type="text"
            className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1"
            disabled
            placeholder={user.metadata.creationTime as string}
          />
        </div>
      </div>
      {isOpen && (
        <Modal keepMounted open={isOpen}>
          <form
            onSubmit={onSubmit}
            className="text-sm [&>div]:max-w-64 h-full grid place-content-center max-w-min m-auto"
          >
            <div className="flex justify-between">
              <label className="mr-1 text-white">Name</label>
              <Tooltip
                placement="top"
                title="A name change may require a page refresh"
                followCursor
                enterTouchDelay={0}
              >
                <InfoIcon
                  fontSize="small"
                  className="!fill-[#fff] dark:fill-[#000]"
                />
              </Tooltip>
            </div>
            <input
              type="text"
              className={clsx(
                errors.name && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 mt-1 text-black focus:outline-none"
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
              <p className="text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
            <div className="w-full flex justify-between mt-2">
              <button
                onClick={() => {
                  setIsOpen((isOpen) => !isOpen);
                  reset();
                }}
                className="w-full cursor-pointer font-medium bg-transparent text-white underline hover:no-underline px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Confirm"
                className="w-full cursor-pointer font-medium dark:bg-white dark:text-gray-night bg-black text-white rounded-full px-4 py-2"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
