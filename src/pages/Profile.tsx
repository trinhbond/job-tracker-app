import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-12 px-4 lg:px-24 md:px-22 sm:px-16 xs:px-4 flex flex-col gap-4">
      <h1 className="inline-block font-medium text-xl border-b border-[#c6c6c6] pb-1">
        Profile
      </h1>
      <div className="w-auto text-sm">
        {user?.displayName && (
          <div className="flex flex-col gap-1 w-auto max-w-64 mb-4">
            <label>Preferred name</label>
            <input
              contentEditable={false}
              disabled
              className="rounded-md border border-[#c6c6c6] p-1"
              type="text"
              placeholder={user.displayName}
            />
          </div>
        )}
        {user?.email && (
          <div className="flex flex-col gap-1 w-auto max-w-64 mb-4">
            <label>Email</label>
            <input
              contentEditable={false}
              disabled
              className="rounded-md border border-[#c6c6c6] p-1"
              type="text"
              placeholder={user.email}
            />
          </div>
        )}
        {user?.metadata && (
          <div className="flex flex-col gap-1 w-auto max-w-64 mb-4">
            <label>Account created</label>
            <input
              contentEditable={false}
              disabled
              className="rounded-md border border-[#c6c6c6] p-1"
              type="text"
              placeholder={user.metadata.creationTime}
            />
          </div>
        )}
      </div>
    </div>
  );
}
