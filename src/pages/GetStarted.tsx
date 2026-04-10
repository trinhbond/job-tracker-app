import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { LoginForm, SignupForm } from "../components/forms/auth";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as motion from "motion/react-client";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function GetStarted() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useContext(AuthContext);
  const { reset } = useForm<User>();

  const handleToggle = () => {
    setToggle(!toggle);
    reset();
  };

  if (user) {
    return <Navigate to="/applications" replace />;
  }

  return (
    <Box className="home-container">
      <Box className="form-layout-container">
        <Box component="main">
          <Box width={125} paddingBottom={12}>
            <Link to="/">
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/assets/ontrack.png`}
                alt="Ontrack graphic"
              />
            </Link>
          </Box>
          {/* <Box mb={3}>
            <Typography fontSize={18} fontWeight={600} textAlign="center">
              {toggle ? "Welcome back" : "Create an account"}
            </Typography>
          </Box> */}
          <Box width="100%">
            {toggle ? (
              <LoginForm
                handleToggle={handleToggle}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ) : (
              <SignupForm
                handleToggle={handleToggle}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
