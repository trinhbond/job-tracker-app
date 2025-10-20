import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Toggle, AntSwitch } from "./Toggle";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useMouse } from "../hooks/index";
import { Avatar } from "./Avatar";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, handleClick } = useMouse(ref);
  const avatarText = user?.displayName?.[0].toUpperCase();

  if (!user) return null;

  return (
    <Box position="sticky" top={0} zIndex={10}>
      <Box
        component="header"
        height={"64px"}
        paddingX={3}
        paddingY={2}
        sx={{ background: "#f2f2f3" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <NavLink to="/">
            <Typography
              variant="h1"
              fontSize={18}
              fontWeight={500}
              sx={{ userSelect: "none" }}
            >
              Ontrack
            </Typography>
          </NavLink>
          <Box position="relative" ref={ref}>
            <Avatar onClick={handleClick} alt={`${user.displayName}`}>
              {avatarText}
            </Avatar>
            <Box>
              <Backdrop open={clicked} onClick={handleClick} />
              <Box
                sx={{ background: "#fff" }}
                position="fixed"
                right={0}
                top={0}
                zIndex={40}
                height="100%"
                minWidth="256px"
                width="auto"
                display={clicked ? "block" : "none"}
                className="divide-y-[1px]"
              >
                <Box padding={2}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar alt={`${user.displayName}`}>{avatarText}</Avatar>
                    <Typography component="span">{user.displayName}</Typography>
                  </Box>
                </Box>
                <Box>
                  <NavLink to="profile">
                    <Box
                      display="inline-block"
                      width="100%"
                      my={0.5}
                      py={1}
                      px={2}
                      sx={{
                        ":hover": {
                          background: "#f5f5f5",
                        },
                      }}
                    >
                      Profile
                    </Box>
                  </NavLink>
                </Box>
                <Box>
                  <Box
                    my={0.5}
                    py={1}
                    px={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    Dark mode
                    <Toggle
                      sx={{ m: 0 }}
                      label={false}
                      disabled
                      // checked={false}
                      // onClick={handleThemeChange}
                      // checked={theme === "dark"}
                      control={<AntSwitch />}
                    />
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    onClick={signOutUser}
                    sx={{
                      textAlign: "start",
                      color: "#000",
                      fontWeight: 400,
                      display: "inline-block",
                      width: "100%",
                      my: 0.5,
                      py: 1,
                      px: 2,
                      ":hover": {
                        background: "#f5f5f5",
                      },
                    }}
                  >
                    Sign out
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
