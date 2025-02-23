import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-12 px-4 lg:px-40 md:px-22 sm:px-16 xs:px-4 flex flex-col gap-2">
      {user && (
        <>
          <h1 className="inline-block font-medium text-xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-xl border-b pb-1">
            Profile
          </h1>
          <div className="text-sm">
            <div className="max-w-64 mb-3">
              <label>Preferred name</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#c6c6c6] p-1 mt-1"
                disabled
                placeholder={user.displayName as string}
              />
            </div>
            <div className="max-w-64 mb-3">
              <label>Email</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#c6c6c6] p-1 mt-1"
                disabled
                placeholder={user.email as string}
              />
            </div>
            <div className="max-w-64 mb-3">
              <label>Account created</label>
              <input
                type="text"
                className="w-full rounded-md border border-[#c6c6c6] p-1 mt-1"
                disabled
                placeholder={user.metadata.creationTime as string}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
