import { clsx } from "clsx";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function SignupForm({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

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
              navigate("/profile");
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

  return (
    <form className="flex flex-col gap-4 text-sm" onSubmit={handleSignup}>
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <Controller
          control={control}
          name={"name"}
          render={() => (
            <input
              type="text"
              className={clsx(
                errors.name && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 focus:outline-none"
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
          )}
        />
        {errors.name && (
          <p className="text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <Controller
          control={control}
          name={"email"}
          render={() => (
            <input
              type="text"
              className={clsx(
                errors.email && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 focus:outline-none"
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
          )}
        />
        {errors.email && (
          <p className="text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Password</label>
        <Controller
          control={control}
          name={"password"}
          render={() => (
            <input
              type="password"
              className={clsx(
                errors.password && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 focus:outline-none"
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
          )}
        />
        {errors.password && (
          <p className="text-red-600" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>
      <input
        className="bg-black text-white min-w-fit w-[100px] px-4 py-2 rounded-full font-medium cursor-pointer select-none"
        type="submit"
        value="Continue"
      />
      <div>
        Already have an account?{" "}
        <button className="underline text-[#0000EE]" onClick={handleClick}>
          Sign in
        </button>
      </div>
    </form>
  );
}
