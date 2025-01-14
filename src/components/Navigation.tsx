import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "./Link";
import AccountsCircle from "./icons/AccountsCircle";
import SignOut from "./icons/SignOut";
import { useMouse } from "../utils";

export default function Navigation() {
  const { user, signOut } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const firstLetter = user?.displayName?.substring(0, 1).toUpperCase();
  const { clicked, setClicked } = useMouse(ref);

  return (
    <div className="sticky w-full bg-black text-white z-10 py-6 px-8 shadow-lg flex flex-row items-center justify-end gap-4">
      <Link route="content">Applications</Link>
      <div className="h-8 bg-red-200 border-l border-red-200"> </div>
      {user && (
        <div className="relative" ref={ref}>
          <button onClick={() => setClicked((clicked) => !clicked)}>
            <span className="bg-red-800 text-white rounded-full text-center block leading-8 min-w-8 min-h-8 font-medium px-2">
              {firstLetter}
            </span>
          </button>
          {!!clicked && (
            <div className="modal z-[9999] shadow-lg rounded-md min-w-52 w-auto fixed bg-[#333333] text-[13px] text-white right-8 top-16 [&_a]:p-3">
              <div className="p-3 border-b border-white">
                <h2 className="font-semibold">{user.displayName}</h2>
                <span className="block">{user.email}</span>
              </div>
              <div>
                <Link
                  route="profile"
                  className="flex flex-row items-center gap-2 cursor-pointer hover:bg-[#7a7a7a]"
                >
                  <AccountsCircle />
                  <span>Profile</span>
                </Link>
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer p-3 border-t border-white hover:bg-[#7a7a7a]"
                  onClick={signOut}
                >
                  <SignOut />
                  <span>Sign out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
