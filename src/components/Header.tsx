import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMouse, useTheme } from "../hooks";
import { Link } from "react-router-dom";
import Toggle, { IOSSwitch } from "./Toggle";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, setClicked } = useMouse(ref);
  const { theme, handleThemeChange } = useTheme();
  const placeholder = user?.displayName?.[0].toUpperCase();

  const handleClick = () => setClicked((clicked) => !clicked);

  if (!user) return null;

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
          {!!clicked && (
            <div className="border border-[#c6c6c6] dark:border-none absolute top-10 right-0 z-40 p-3 shadow-lg rounded-md min-w-52 w-auto dark:bg-[#18181B] bg-white text-sm">
              <div className="border-b dark:border-[#ffffff18] pb-2 px-2">
                <h2 className="font-medium">{user.displayName}</h2>
                <div>{user.email}</div>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="profile"
                    className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="applications"
                    className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                  >
                    Applications
                  </Link>
                </li>
              </ul>
              <div className="py-2 border-t dark:border-[#ffffff18]">
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
              <div className="pt-2 border-t dark:border-[#ffffff18]">
                <div
                  className="py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                  onClick={signOutUser}
                >
                  Sign out
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
