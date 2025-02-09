import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMouse, useToggle } from "../utils";
import * as motion from "motion/react-client";
import { Link } from "react-router-dom";

export default function Navigation() {
  const { user, signOutUser } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const placeholder = user?.displayName?.[0].toUpperCase();
  const { clicked, setClicked } = useMouse(ref);
  const { theme, switchTheme } = useToggle();

  return (
    <div className="flex items-center justify-between flex-row items-center sticky top-0 dark:bg-[#121212] dark:text-white bg-white text-black z-10 py-4 px-4 lg:px-24 md:px-22 sm:px-16 xs:px-4 shadow-md">
      <span className="font-medium text-xl select-none">jobtracker</span>
      {user && (
        <div ref={ref}>
          <button onClick={() => setClicked((clicked) => !clicked)}>
            <span className="bg-red-800 rounded-full text-center text-white block leading-8 min-w-8 min-h-8 font-medium px-2">
              {placeholder}
            </span>
          </button>
          {!!clicked && (
            <div className="border border-[#c6c6c6] dark:border-none z-[9999] px-3 pt-4 pb-3 shadow-lg rounded-md min-w-52 w-auto fixed dark:bg-[#18181B] dark:text-white bg-white text-black text-[13px] right-8 top-14">
              <div className="border-b border-[#c6c6c6] pb-3 px-2">
                <h2 className="font-semibold">{user.displayName}</h2>
                <span className="block">{user.email}</span>
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
                <li>
                  <div className="py-1 px-2 flex flex-row justify-between items-center">
                    <span>Dark mode</span>
                    <button
                      className="toggle-container"
                      style={{
                        ...container,
                        background: theme === "dark" ? "#0066b2" : "#c6c6c6",
                        justifyContent:
                          "flex-" + (theme === "dark" ? "start" : "end"),
                      }}
                      onClick={switchTheme}
                    >
                      <motion.div
                        className="toggle-handle"
                        style={handle}
                        layout
                        transition={{
                          type: "spring",
                          visualDuration: 0.2,
                          bounce: 0.2,
                        }}
                      />
                    </button>
                  </div>
                </li>
              </ul>
              <div className="pt-2 border-t border-[#c6c6c6]">
                <div
                  className="py-1 px-2 cursor-pointer dark:hover:bg-[#2b2b2b] hover:bg-[#f5f5f5] hover:rounded-md"
                  onClick={signOutUser}
                >
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

const container = {
  width: 50,
  height: 25,
  borderRadius: 50,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: 4,
};

const handle = {
  width: 20,
  height: 20,
  backgroundColor: "#fff",
  borderRadius: "50%",
};
