import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-12 px-4 lg:px-24 md:px-22 sm:px-16 xs:px-4 flex flex-col gap-8">
      <h1 className="inline-block font-medium text-xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-xl">
        Profile
      </h1>
      <div>
        {user?.displayName && (
          <div className="flex flex-col gap-1 w-auto max-w-64 mb-4">
            <label>Preferred name</label>
            <input
              contentEditable={false}
              disabled
              className="rounded-md border border-[#c6c6c6] p-1 text-sm"
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
              className="rounded-md border border-[#c6c6c6] p-1 text-sm"
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
              className="rounded-md border border-[#c6c6c6] p-1 text-sm"
              type="text"
              placeholder={user.metadata.creationTime}
            />
          </div>
        )}
      </div>
    </div>
  );
}
