import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { reset } = useForm<User>();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle((toggle) => !toggle);
    reset();
  };

  return (
    <div className="h-dvh flex flex-row justify-between [&>div]:w-full">
      <div className="border border-[#c6c6c6] h-dvh place-content-center flex flex-col gap-6 p-6 bg-white">
        <h1 className="text-2xl py-3 font-semibold block sm:block lg:hidden">
          Welcome to Ontrack
        </h1>
        {toggle ? (
          <LoginForm handleClick={handleClick} />
        ) : (
          <SignupForm handleClick={handleClick} />
        )}
      </div>
      <div className="place-content-center text-center hidden sm:hidden lg:block p-6">
        <h1 className="font-semibold text-3xl lg:text-3xl md:text-2xl py-3">
          Welcome to Ontrack
        </h1>
        <p>A content management system for your job applications</p>
      </div>
    </div>
  );
}
