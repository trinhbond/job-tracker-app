import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Toggle, { AntSwitch } from "./Toggle";
import clsx from "clsx";
import { Backdrop } from "@mui/material";
import useMouse from "../hooks/useMouse";
import useTheme from "../hooks/useTheme";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, handleClick } = useMouse(ref);
  const { theme, handleThemeChange } = useTheme();
  const { width } = useWindowDimensions();
  const placeholder = user?.displayName?.[0].toUpperCase();

  const DrawerList = () => (
    <>
      <div className="p-4">
        <h2 className="font-medium">{user?.displayName}</h2>
        <div>{user?.email}</div>
      </div>
      {width < 640 && (
        <div>
          <Link
            to="profile"
            className="inline-block w-full mt-1 py-2 px-4 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5]"
          >
            Profile
          </Link>
          <Link
            to="applications"
            className="inline-block w-full mb-1 py-2 px-4 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5]"
          >
            Applications
          </Link>
        </div>
      )}
      <div>
        <div className="my-1 py-2 px-4 flex flex-row justify-between items-center">
          <span>Dark mode</span>
          <Toggle
            sx={{ m: 0 }}
            label={false}
            onClick={handleThemeChange}
            checked={theme === "dark"}
            control={<AntSwitch />}
          />
        </div>
      </div>
      <div>
        <button
          className="inline-block w-full text-start mt-1 mb-2 py-2 px-4 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5]"
          onClick={signOutUser}
        >
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="sticky top-0 z-10 border-b dark:border-[#ffffff18]">
      <header className="flex items-center justify-between dark:bg-[#121212] bg-white main px-6 py-4">
        <div className="flex items-center space-x-8">
          <span className="font-semibold text-lg select-none">Ontrack</span>
          {width >= 640 && (
            <div>
              <Link
                to="applications"
                className="mr-4 inline-block cursor-pointer"
              >
                Applications
              </Link>
              <Link to="profile" className="inline-block cursor-pointer">
                Profile
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={ref}>
          <button
            onClick={handleClick}
            className="bg-red-800 rounded-full text-center text-white block leading-8 min-w-8 min-h-8 font-medium px-2"
          >
            {placeholder}
          </button>
          {width >= 640 ? (
            <div
              className={clsx(
                clicked && "!block",
                "hidden divide-y-[1px] dark:divide-[#ffffff18] border border-[#c6c6c6] dark:border-none absolute top-10 right-0 z-40 shadow-lg rounded-md min-w-52 w-auto dark:bg-[#18181B] bg-white text-sm"
              )}
            >
              <DrawerList />
            </div>
          ) : (
            <div>
              <Backdrop open={clicked} onClick={handleClick} />
              <div
                className={clsx(
                  clicked && "!block",
                  "hidden divide-y-[1px] dark:divide-[#ffffff18] border border-[#c6c6c6] dark:border-none fixed h-dvh top-0 right-0 z-40 shadow-lg min-w-64 w-auto dark:bg-[#18181B] bg-white text-sm"
                )}
              >
                <DrawerList />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
