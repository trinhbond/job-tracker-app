import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Modal, Tooltip } from "@mui/material";
import { updateProfile } from "firebase/auth";
import InfoIcon from "@mui/icons-material/Info";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSubmit = () => {
    updateProfile(user, { displayName: name });
  };

  return (
    <div className="py-12 px-4 lg:px-40 md:px-22 sm:px-16 xs:px-4 flex flex-col gap-2">
      <h1 className="font-semibold text-3xl lg:text-4xl md:text-4xl sm:text-4xl xs:text-3xl border-b dark:border-[#ffffff18] pb-1">
        Profile
      </h1>
      <div className="text-sm [&>div]:max-w-64 [&>div]:mb-3">
        <div>
          <div className="flex justify-between">
            <div>
              <label className="mr-1">Name</label>
              <Tooltip
                placement="top"
                title="A name change may require a page refresh"
                followCursor
                enterTouchDelay={0}
              >
                <InfoIcon fontSize="small" />
              </Tooltip>
            </div>
            {!isOpen && (
              <button
                onClick={() => {
                  setName(user.displayName as string);
                  setIsOpen((isOpen) => !isOpen);
                }}
                className="text-[#0000EE]"
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
            onSubmit={handleSubmit}
            className="text-sm [&>div]:max-w-64 h-full grid place-content-center"
          >
            <div>
              <label>Name</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#c6c6c6] px-4 py-2 mt-1 text-black"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-between mt-2">
              <button
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                className="w-full cursor-pointer font-medium dark:bg-inherit dark:text-white bg-white text-black underline hover:no-underline px-4 py-2 rounded-full"
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
