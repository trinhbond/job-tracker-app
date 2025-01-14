import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="py-6 px-8 flex flex-col gap-8 min-w-3.5 text-white">
      <div>
        <h1 className="font-semibold text-white text-3xl mb-1">Profile</h1>
        <div className="w-full border border-[#ffffff18]" />
      </div>
      <div className="w-auto">
        <form>
          {user?.displayName && (
            <div className="flex flex-col w-auto max-w-64 mb-4">
              <label className="text-md">Preferred name</label>
              <input
                contentEditable={false}
                disabled
                className="rounded-md text-[#000] text-md p-1"
                type="text"
                placeholder={user.displayName}
              />
            </div>
          )}
          {user?.email && (
            <div className="flex flex-col w-auto max-w-64 mb-4">
              <label className="text-md">Email</label>
              <input
                contentEditable={false}
                disabled
                className="rounded-md text-[#000] text-md p-1"
                type="text"
                placeholder={user.email}
              />
            </div>
          )}
          {user?.metadata && (
            <div className="flex flex-col w-auto max-w-64 mb-4">
              <label className="text-md">Account created</label>
              <input
                contentEditable={false}
                disabled
                className="rounded-md text-[#000] text-md p-1"
                type="text"
                placeholder={user.metadata.creationTime}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
