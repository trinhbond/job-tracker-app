import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../../config/firebase";
import { FirebaseError } from "firebase/app";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { FormContainer } from "../../FormContainer";
import { BaseButton, TextButton } from "../../buttons";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm({
  handleToggle,
  showPassword,
  setShowPassword,
}: {
  handleToggle: () => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
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
  const theme = useTheme();

  const getError = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/invalid-credential":
        setError("email", {
          type: "custom",
          message: "Email or password is invalid",
        });
        break;
      case "auth/invalid-email":
        setError("email", {
          type: "custom",
          message: "Email is invalid",
        });
        break;
      default:
        console.error("An unexpected Firebase error occurred:", error.message);
    }
  };

  const handleLogin = handleSubmit(async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        //toast notification
        window.location.href = "/applications";
        reset();
      })
      .catch((error) => {
        console.log(error.code + ": " + error.message);
        getError(error);
      });
  });

  return (
    <FormContainer width="100%" className="login-form" onSubmit={handleLogin}>
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
                  color: theme.palette.secondary.main,
                  background: theme.palette.primary.main,
                }}
                error={!!errors.email}
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
                sx={{
                  color: theme.palette.secondary.main,
                  background: theme.palette.primary.main,
                }}
                error={!!errors.password}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
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
      <BaseButton
        type="submit"
        sx={{
          fontWeight: 600,
          fontSize: 18,
          padding: "12px 32px",
          alignSelf: "center",
        }}
      >
        Sign in
      </BaseButton>
      <Box alignSelf="center">
        Don't have an account?{" "}
        <TextButton sx={{ color: "#0000EE" }} onClick={handleToggle}>
          Sign up
        </TextButton>
      </Box>
    </FormContainer>
  );
}
