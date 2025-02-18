import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMouse, useToggle } from "../utils";
import * as motion from "motion/react-client";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Navigation() {
  const { user, signOutUser } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const placeholder = user?.displayName?.[0].toUpperCase();
  const { clicked, setClicked } = useMouse(ref);
  const { theme, switchTheme } = useToggle();

  const handleClick = () => setClicked((clicked) => !clicked);

  function Menu() {
    return (
      <div className="border border-[#c6c6c6] dark:border-none fixed right-8 top-14 z-[40] p-3 shadow-md rounded-md min-w-52 w-auto dark:bg-[#18181B] bg-white text-sm">
        <div className="border-b border-[#c6c6c6] pb-2 px-2">
          <h2 className="font-semibold">{user?.displayName}</h2>
          <div>{user?.email}</div>
        </div>
        <ul className="py-2">
          <li>
            <Link
              to="profile"
              className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
            >
              Account
            </Link>
          </li>
          <li>
            <Link
              to="content"
              className="inline-block w-full py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
            >
              Applications
            </Link>
          </li>
        </ul>
        <div className="py-2 border-t border-[#c6c6c6]">
          <div className="py-1 px-2 flex flex-row justify-between items-center">
            <span>Dark mode</span>
            <button
              className={clsx(
                theme === "dark" ? "bg-[#0066b2]" : "bg-[#c6c6c6]",
                theme === "dark" ? "justify-start" : "justify-end",
                "w-[50px] h-[25px] rounded-full cursor-pointer flex items-center p-1"
              )}
              onClick={switchTheme}
            >
              <motion.div
                className="w-[20px] h-[20px] bg-white rounded-full"
                layout
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            </button>
          </div>
        </div>
        <div className="pt-2 border-t border-[#c6c6c6]">
          <div
            className="py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
            onClick={signOutUser}
          >
            <span>Sign out</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-between sticky top-0 dark:bg-[#121212] bg-white z-10 py-4 px-4 lg:px-24 md:px-22 sm:px-16 xs:px-4 shadow-md">
      <span className="font-medium text-xl select-none">jobtracker</span>
      <div ref={ref}>
        <button onClick={handleClick}>
          <span className="bg-red-800 rounded-full text-center text-white block leading-8 min-w-8 min-h-8 font-medium px-2">
            {placeholder}
          </span>
        </button>
        {!!clicked && <Menu />}
      </div>
    </div>
  );
}
