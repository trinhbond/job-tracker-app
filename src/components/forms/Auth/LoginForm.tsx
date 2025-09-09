import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Box, Button, FormControl, Input, Typography } from "@mui/material";

export default function LoginForm({
  handleToggle,
}: {
  handleToggle: () => void;
}) {
  const navigate = useNavigate();
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

  const handleLogin = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        () => {
          navigate("/profile");
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
    <Box
      className="login-form"
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleLogin}
    >
      <Box display="flex" flexDirection="column" gap={0.5}>
        <FormControl>
          <Box component="label" mb={0.5}>
            Email
          </Box>
          <Controller
            control={control}
            name={"email"}
            render={() => (
              <Input
                error={!!errors.email}
                sx={{
                  margin: "0 !important",
                }}
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
            <Typography component="p" role="alert">
              {errors.email.message}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" gap={0.5}>
        <FormControl>
          <Box component="label" mb={0.5}>
            Password
          </Box>
          <Controller
            control={control}
            name={"password"}
            render={() => (
              <Input
                error={!!errors.password}
                sx={{
                  margin: "0 !important",
                }}
                type="password"
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
            <Typography component="p" role="alert">
              {errors.password.message}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ background: "#000", minWidth: "fit-content", width: "100px" }}
      >
        Continue
      </Button>
      <Box>
        Don't have an account?{" "}
        <Button
          variant="text"
          sx={{ color: "#0000EE", textDecoration: "underline" }}
          onClick={handleToggle}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
