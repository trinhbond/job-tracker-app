import { clsx } from "clsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function LoginForm({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

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

  return (
    <form className="flex flex-col gap-4 text-sm" onSubmit={handleLogin}>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <Controller
          control={control}
          name={"email"}
          render={() => (
            <input
              type="text"
              placeholder="Email"
              className={clsx(
                errors.email && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 focus:outline-none"
              )}
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
              placeholder="Password (6 or more characters)"
              className={clsx(
                errors.password && "border-red-600",
                "border border-[#c6c6c6] rounded-md px-4 py-2 focus:outline-none"
              )}
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
        className="bg-black text-white min-w-fit py-4 px-1 rounded-full font-medium cursor-pointer select-none"
        type="submit"
        value="Continue"
      />
      <div>
        Don't have an account?{" "}
        <button className="underline text-[#0000EE]" onClick={handleClick}>
          Sign up
        </button>
      </div>
    </form>
  );
}
