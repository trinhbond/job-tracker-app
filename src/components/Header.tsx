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
    <Box className="header-wrapper">
      <Box
        component="header"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <NavLink to="/applications">
            <Box width={100}>
              <Box
                component="img"
                src={
                  theme.palette.mode === "dark"
                    ? `${process.env.PUBLIC_URL}/assets/ontrack_white.png`
                    : `${process.env.PUBLIC_URL}/assets/ontrack.png`
                }
                alt="Ontrack logo"
              />
            </Box>
          </NavLink>
          <Box position="relative" ref={ref}>
            <Avatar onClick={handleClick} alt={`${user.displayName}`}>
              {avatarText}
            </Avatar>
            {clicked && (
              <Box
                className="menu"
                sx={{
                  boxShadow: 3,
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
                    pb={1}
                  >
                    <Avatar alt={`${user.displayName}`}>{avatarText}</Avatar>
                    <Box>
                      <Typography
                        component="span"
                        display="block"
                        lineHeight={1.15}
                      >
                        {user.displayName}
                      </Typography>
                      <Typography
                        component="span"
                        display="block"
                        lineHeight={1.15}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1} mb={0.5}>
                    <Button
                      className="menu-button-link"
                      onClick={handleUserChange}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
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
                      className="menu-button-link"
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.primary.main
                            : theme.palette.secondary.main,
                        my: 0.5,
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
                    className="menu-button-link"
                    variant="text"
                    onClick={logOut}
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : theme.palette.secondary.main,
                      my: 0.5,
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
