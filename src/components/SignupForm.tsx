import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Box, Button, FormControl, Input, Typography } from "@mui/material";

export default function SignupForm({
  handleToggle,
}: {
  handleToggle: () => void;
}) {
  const navigate = useNavigate();
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
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      fontSize={14}
      gap={2}
      onSubmit={handleSignup}
    >
      <Box display="flex" flexDirection="column" gap={0.5}>
        <FormControl>
          <Box component="label" mb={0.5}>
            Name
          </Box>
          <Controller
            control={control}
            name={"name"}
            render={() => (
              <Input
                sx={{
                  margin: "0 !important",
                  "& .MuiInputBase-input": {
                    border: errors.name && "1px solid #dc2626",
                  },
                }}
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
            <Typography
              component="p"
              fontSize={14}
              color="#dc2626"
              role="alert"
            >
              {errors.name.message}
            </Typography>
          )}
        </FormControl>
      </Box>
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
                sx={{
                  margin: "0 !important",
                  "& .MuiInputBase-input": {
                    border: errors.email && "1px solid #dc2626",
                  },
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
            <Typography
              component="p"
              fontSize={14}
              color="#dc2626"
              role="alert"
            >
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
                sx={{
                  margin: "0 !important",
                  "& .MuiInputBase-input": {
                    border: errors.password && "1px solid #dc2626",
                  },
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
            <Typography
              component="p"
              fontSize={14}
              color="#dc2626"
              role="alert"
            >
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
        Already have an account?{" "}
        <Button
          variant="text"
          sx={{ color: "#0000EE", textDecoration: "underline" }}
          onClick={handleToggle}
        >
          Sign in
        </Button>
      </Box>
    </Box>
  );
}
