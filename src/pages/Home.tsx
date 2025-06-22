import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useWindowDimensions } from "../hooks";
import clsx from "clsx";
import * as motion from "motion/react-client";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { reset } = useForm<User>();
  const { width } = useWindowDimensions();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle((toggle) => !toggle);
    reset();
  };

  return (
    <div className="px-4 lg:px-20 md:px-20 py-20 bg-[#f2f2f3] h-dvh place-content-center overflow-y-auto overflow-x-hidden">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-medium">Ontrack</h1>
        <p>
          Stay organized and in control of your job hunt — Ontrack lets you
          manage every application in one place.
        </p>
      </div>
      <div
        className={clsx(
          width < 999 && "flex-col space-y-16",
          "flex flex-row items-center justify-between"
        )}
      >
        <div
          className={clsx(
            width < 999 && "w-full",
            "min-w-full lg:min-w-[400px] md:min-w-[400px]"
          )}
        >
          {toggle ? (
            <LoginForm handleClick={handleClick} />
          ) : (
            <SignupForm handleClick={handleClick} />
          )}
        </div>
        <motion.div
          transition={{
            duration: 0.3,
          }}
          initial={{ x: "100%" }}
          animate={{ x: "0" }}
        >
          <div className="w-[250px] lg:w-[300px] md:w-[300px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobile-wireframe.png`}
              alt="Ontrack page"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
