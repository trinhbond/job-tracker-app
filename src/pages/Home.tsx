import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInUser, signUpUser } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { IFormValues } from "../types";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();
  const navigate = useNavigate();
  const [userHasAccount, setUserHasAccount] = useState(false);

  const onSubmitLogin = handleSubmit(async (data) => {
    console.log(data);

    try {
      await signInUser(data.email, data.password).then(() => {
        navigate("user/profile");
      });
      reset({ name: "", email: "", password: "" });
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

  const onSubmitSignup = handleSubmit(async (data) => {
    console.log(data);

    try {
      await signUpUser(auth, data.email, data.password).then(() => {
        if (auth.currentUser)
          updateProfile(auth.currentUser, { displayName: data.name }).then(
            () => {
              navigate("user/profile");
            }
          );
      });
      reset({ name: "", email: "", password: "" });
    } catch (error: unknown) {
      console.log({ error });
      if (error instanceof FirebaseError) {
        console.log({ error });
      }
    }
  });

  return (
    <div className="relative h-dvh place-content-center top-0 bottom-0">
      <div className="max-w-[500px] flex flex-col justify-center items-center py-4 px-3 m-auto">
        <div className="rounded-md w-full h-[500px] flex flex-col gap-6 px-6 py-8 place-content-center bg-white">
          <h1 className="text-black text-3xl font-semibold">
            {!userHasAccount ? "Sign up" : "Sign in"}
          </h1>
          {!userHasAccount ? (
            <form
              className="flex flex-col gap-6 relative"
              onSubmit={onSubmitSignup}
            >
              <div className="flex flex-col">
                <label className="text-black font-medium">Name</label>
                <input
                  type="text"
                  className="text-black border-b border-black focus:outline-none"
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
              <div className="flex flex-col">
                <label className="text-black font-medium">Email</label>
                <input
                  type="text"
                  className="text-black border-b border-black focus:outline-none"
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
              <div className="flex flex-col">
                <label className="text-black font-medium">Password</label>
                <input
                  type="password"
                  className="text-black border-b border-black focus:outline-none"
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
                className="bg-black text-white py-4 px-1 rounded-md font-medium cursor-pointer"
                type="submit"
              >
                Continue
              </button>
              <div>
                Have an account?{" "}
                <button
                  className="underline text-[#0000EE]"
                  onClick={() => {
                    setUserHasAccount((userHasAccount) => !userHasAccount);
                    reset();
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={onSubmitLogin}>
              <div className="flex flex-col">
                <label className="text-black font-medium">Email</label>
                <input
                  type="text"
                  className="text-black border-b border-black focus:outline-none"
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
              <div className="flex flex-col">
                <label className="text-black font-medium">Password</label>
                <input
                  type="password"
                  className="text-black border-b border-black focus:outline-none"
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
                className="bg-black text-white py-4 px-1 rounded-md font-medium cursor-pointer"
                type="submit"
                value="Continue"
              />
              <div>
                Don't have an account?{" "}
                <button
                  className="underline text-[#0000EE]"
                  onClick={() => {
                    setUserHasAccount((userHasAccount) => !userHasAccount);
                    reset();
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
