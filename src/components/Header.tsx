import { useContext, useRef, CSSProperties } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Toggle, { AntSwitch } from "./Toggle";
import { Avatar, Backdrop, Box, Typography } from "@mui/material";
import { useWindowDimensions, useMouse, useTheme } from "../hooks/index";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOutUser } = useContext(AuthContext);
  const { clicked, handleClick } = useMouse(ref);
  const { theme, handleThemeChange } = useTheme();
  const { width } = useWindowDimensions();
  const placeholder = user?.displayName?.[0].toUpperCase();
  const avatarCSS = {
    bgcolor: "#c62828",
    cursor: "pointer",
    fontSize: 16,
    width: 32,
    height: 32,
  } as CSSProperties;

  return (
    <Box position="sticky" top={0} zIndex={10}>
      <Box
        component="header"
        height={"64px"}
        paddingX={3}
        paddingY={2}
        width="100%"
        sx={{ background: "#f2f2f3" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {width >= 600 && (
            <Box display="flex" gap={3}>
              <NavLink to="applications">Applications</NavLink>
              <NavLink to="profile">Profile</NavLink>
            </Box>
          )}
          <Typography
            variant="h1"
            fontSize={18}
            fontWeight={500}
            sx={{ userSelect: "none" }}
          >
            Ontrack
          </Typography>
          <Box position="relative" ref={ref}>
            <Avatar
              onClick={handleClick}
              alt={user?.displayName as string}
              sx={avatarCSS}
            >
              {placeholder}
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
                width="auto"
                display={clicked ? "block" : "none"}
                className="divide-y-[1px] min-w-64"
              >
                <div className="p-4">
                  <div className="flex flex-row items-center space-x-3">
                    <Avatar alt={user?.displayName as string} sx={avatarCSS}>
                      {placeholder}
                    </Avatar>
                    <span className="block">{user?.displayName}</span>
                  </div>
                </div>
                {width < 600 && (
                  <Box>
                    <NavLink
                      to="profile"
                      className="inline-block w-full mt-1 py-2 px-4 hover:bg-[#f5f5f5]"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="applications"
                      className="inline-block w-full mb-1 py-2 px-4 hover:bg-[#f5f5f5]"
                    >
                      Applications
                    </NavLink>
                  </Box>
                )}
                <Box>
                  <div className="my-1 py-2 px-4 flex flex-row justify-between items-center">
                    <span>Dark mode</span>
                    <Toggle
                      sx={{ m: 0 }}
                      label={false}
                      disabled
                      // checked={false}
                      // onClick={handleThemeChange}
                      // checked={theme === "dark"}
                      control={<AntSwitch />}
                    />
                  </div>
                </Box>
                <Box>
                  <button
                    className="inline-block w-full text-start mt-1 mb-2 py-2 px-4 hover:bg-[#f5f5f5]"
                    onClick={signOutUser}
                  >
                    Sign out
                  </button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
