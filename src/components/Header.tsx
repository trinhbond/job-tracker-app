import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toggle, AntSwitch } from "./Toggle";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useMouse } from "../hooks/index";
import { Avatar } from "./Avatar";
import { useForm } from "react-hook-form";
import EditUserForm from "./forms/auth/EditUserForm";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, handleClick } = useMouse(ref);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toggleMode } = useContext(ThemeContext);
  const theme = useTheme();
  const avatarText = user?.displayName?.[0].toUpperCase();
  const { setValue } = useForm({
    defaultValues: {
      name: user?.displayName,
    },
  });

  if (!user) return null;

  const toggleModal = () => setIsOpen(!isOpen);

  const handleUserChange = () => {
    if (!user) return;
    setValue("name", user.displayName);
    toggleModal();
  };

  const logOut = () => {
    signOutUser();
    handleClick();
    navigate("/");
  };

  return (
    <Box position="sticky" top={0} zIndex={10}>
      <Box
        component="header"
        height={"64px"}
        paddingX={3}
        paddingY={2}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <NavLink to="/">
            <Typography
              variant="h1"
              fontSize={18}
              fontWeight={500}
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
              }}
            >
              Ontrack
            </Typography>
          </NavLink>
          <Box position="relative" ref={ref}>
            <Avatar onClick={handleClick} alt={`${user.displayName}`}>
              {avatarText}
            </Avatar>
            {clicked && (
              <Box
                sx={{
                  border:
                    theme.palette.mode === "dark"
                      ? "0.5px solid #272727"
                      : "none",
                  boxShadow: 3,
                  borderRadius: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.main,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                  minWidth: "225px",
                  position: "fixed",
                  right: "24px",
                  top: "52px",
                  width: "auto",
                  zIndex: 9999,
                  "&>*:not(:last-child)": {
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "0.5px solid #272727"
                        : "0.5px solid #e5e7eb",
                  },
                }}
              >
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    px={1.5}
                    pt={2}
                  >
                    <Avatar alt={`${user.displayName}`}>{avatarText}</Avatar>
                    <Box>
                      <Typography component="span">
                        {user.displayName}
                      </Typography>
                      <Typography
                        component="span"
                        display="block"
                        fontSize={12}
                        lineHeight="10px"
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1} mb={0.5}>
                    <Button
                      onClick={handleUserChange}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                        borderRadius: 0,
                        textAlign: "start",
                        fontWeight: 400,
                        display: "inline-block",
                        width: "100%",
                        pb: 1,
                        px: 1.5,
                        ":hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "#707070"
                              : "#f5f5f5",
                        },
                      }}
                    >
                      Edit details
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Link to="/dashboard">
                    <Box
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                        borderRadius: 0,
                        textAlign: "start",
                        fontWeight: 400,
                        display: "inline-block",
                        width: "100%",
                        my: 0.5,
                        py: 1,
                        px: 1.5,
                        ":hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "#707070"
                              : "#f5f5f5",
                        },
                      }}
                    >
                      Dashboard
                    </Box>
                  </Link>
                </Box>
                <Box>
                  <Box
                    my={0.5}
                    py={1}
                    px={1.5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                    }}
                  >
                    Dark mode
                    <Toggle
                      sx={{ m: 0 }}
                      label={false}
                      disabled
                      onClick={toggleMode}
                      checked={theme.palette.mode === "dark"}
                      control={<AntSwitch />}
                    />
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    onClick={logOut}
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      borderRadius: 0,
                      textAlign: "start",
                      fontWeight: 400,
                      display: "inline-block",
                      width: "100%",
                      my: 0.5,
                      py: 1,
                      px: 1.5,
                      ":hover": {
                        background:
                          theme.palette.mode === "dark" ? "#707070" : "#f5f5f5",
                      },
                    }}
                  >
                    Sign out
                  </Button>
                </Box>
              </Box>
            )}
            <Modal open={isOpen} onClose={toggleModal}>
              <Box>
                <EditUserForm onClick={handleUserChange} />
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
