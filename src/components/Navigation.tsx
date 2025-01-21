import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "./Link";
import { useMouse } from "../utils";

export default function Navigation() {
  const { user, signOutUser } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const firstLetter = user?.displayName?.substring(0, 1).toUpperCase();
  const { clicked, setClicked } = useMouse(ref);

  return (
    <div className="sticky bg-black text-white z-10 py-6 px-8 shadow-lg flex flex-row items-center justify-end gap-4">
      <Link route="content">Applications</Link>
      <div className="h-8 border-l border-white"> </div>
      {user && (
        <div ref={ref}>
          <button onClick={() => setClicked((clicked) => !clicked)}>
            <span className="bg-red-800 rounded-full text-center block leading-8 min-w-8 min-h-8 font-medium px-2">
              {firstLetter}
            </span>
          </button>
          {!!clicked && (
            <div className="z-[9999] px-3 pt-4 pb-3 shadow-lg rounded-md min-w-52 w-auto fixed bg-[#18181b] text-[13px] right-8 top-16">
              <div className="border-b border-[#c6c6c6] pb-3 px-2">
                <h2 className="font-semibold">{user.displayName}</h2>
                <span className="block">{user.email}</span>
              </div>
              <ul className="pt-2">
                <li>
                  <Link
                    route="profile"
                    className="inline-block w-full py-1 px-2 cursor-pointer hover:bg-[#2b2b2b] hover:rounded-md"
                  >
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <div
                    className="py-1 px-2 cursor-pointer hover:bg-[#2b2b2b] hover:rounded-md"
                    onClick={signOutUser}
                  >
                    <span>Sign out</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
