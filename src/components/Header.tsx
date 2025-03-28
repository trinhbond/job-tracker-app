import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMouse, useTheme } from "../hooks";
import { Link } from "react-router-dom";
import Toggle, { IOSSwitch } from "./Toggle";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, handleClick } = useMouse(ref);
  const { theme, handleThemeChange } = useTheme();
  const placeholder = user?.displayName?.[0].toUpperCase();

  return (
    <div className="sticky top-0 z-10 border-b dark:border-[#ffffff18]">
      <header className="flex items-center justify-between dark:bg-[#121212] bg-white main px-6 py-4">
        <span className="font-semibold text-lg select-none">jobtracker</span>
        <div className="relative" ref={ref}>
          <button
            onClick={handleClick}
            className="bg-red-800 rounded-full text-center text-white block leading-8 min-w-8 min-h-8 font-medium px-2"
          >
            {placeholder}
          </button>
          {clicked && (
            <div className="divide-y-[1px] dark:divide-[#ffffff18] border border-[#c6c6c6] dark:border-none absolute top-10 right-0 z-40 p-3 shadow-lg rounded-md min-w-52 w-auto dark:bg-[#18181B] bg-white text-sm">
              <div className="pb-2 px-2">
                <h2 className="font-medium">{user?.displayName}</h2>
                <div>{user?.email}</div>
              </div>
              <div className="py-2">
                <Link
                  to="profile"
                  className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="applications"
                  className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                >
                  Applications
                </Link>
              </div>
              <div className="py-2">
                <div className="py-1 px-2 flex flex-row justify-between items-center">
                  <span>Dark mode</span>
                  <Toggle
                    sx={{ m: 0 }}
                    label={false}
                    onClick={handleThemeChange}
                    checked={theme === "dark"}
                    control={<IOSSwitch />}
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  className="inline-block w-full text-start py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                  onClick={signOutUser}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
