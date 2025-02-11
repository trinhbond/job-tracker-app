import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { UserFormValues } from "../types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import clsx from "clsx";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>();
  const navigate = useNavigate();
  const [userHasAccount, setUserHasAccount] = useState(false);

  const handleLogin = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        () => {
          navigate("user/profile");
        }
      );
      reset();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log({ error });
        if (error.code === "auth/invalid-credential") {
          setError("email", {
            type: "custom",
            message: "Email or password is invalid",
          });
        }
      }
    }
  });

  const handleSignup = handleSubmit(async (data) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(() => {
        if (auth.currentUser)
          updateProfile(auth.currentUser, { displayName: data.name }).then(
            () => {
              navigate("user/profile");
            }
          );
      });
      reset();
    } catch (error: unknown) {
      console.log({ error });
      if (error instanceof FirebaseError) {
        console.log({ error });
      }
    }
  });

  const handleClick = () => {
    setUserHasAccount((userHasAccount) => !userHasAccount);
    reset();
  };

  return (
    <div className="h-dvh flex flex-row justify-between [&>div]:w-full">
      <div>
        <div className="border border-[#c6c6c6] h-dvh place-content-center flex flex-col gap-6 p-6 bg-white shadow-lg">
          <h1 className="text-2xl py-3 font-semibold block lg:hidden md:hidden sm:block xs:block">
            Welcome to jobtracker
          </h1>
          {!userHasAccount ? (
            <form
              className="flex flex-col gap-4 text-sm"
              onSubmit={handleSignup}
            >
              <div className="flex flex-col gap-1">
                <label>Name</label>
                <input
                  type="text"
                  className={clsx(
                    errors.name && "border-red-600",
                    "border border-[#c6c6c6] rounded-md p-1.5 focus:outline-none"
                  )}
                  placeholder="Name"
                  {...register("name", {
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Name cannot have symbols or special characters",
                    },
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 top-0 relative" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="text"
                  className={clsx(
                    errors.email && "border-red-600",
                    "border border-[#c6c6c6] rounded-md p-1.5 focus:outline-none"
                  )}
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email is invalid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  type="password"
                  className={clsx(
                    errors.password && "border-red-600",
                    "border border-[#c6c6c6] rounded-md p-1.5 focus:outline-none"
                  )}
                  placeholder="Password (6 or more characters)"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or more",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                className="bg-black text-white min-w-fit py-4 px-1 rounded-full font-medium cursor-pointer select-none"
                type="submit"
              >
                Continue
              </button>
              <div>
                Already have an account?{" "}
                <button
                  className="underline text-[#0000EE]"
                  onClick={handleClick}
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form
              className="flex flex-col gap-4 text-sm"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="text"
                  className={clsx(
                    errors.email && "border-red-600",
                    "border border-[#c6c6c6] rounded-md p-1.5 focus:outline-none"
                  )}
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email is invalid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  type="password"
                  className={clsx(
                    errors.password && "border-red-600",
                    "border border-[#c6c6c6] rounded-md p-1.5 focus:outline-none"
                  )}
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <input
                className="bg-black text-white min-w-fit py-4 px-1 rounded-full font-medium cursor-pointer select-none"
                type="submit"
                value="Continue"
              />
              <div>
                Don't have an account?{" "}
                <button
                  className="underline text-[#0000EE]"
                  onClick={handleClick}
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="place-content-center text-center hidden lg:block md:block sm:hidden xs:hidden">
        <h1 className="font-semibold text-3xl lg:text-3xl md:text-2xl py-3">
          Welcome to jobtracker
        </h1>
      </div>
    </div>
  );
}
