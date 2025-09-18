import { Avatar as UserAvatar, AvatarProps } from "@mui/material";

const avatarCSS = {
  bgcolor: "#c62828",
  cursor: "pointer",
  fontSize: 16,
  width: 32,
  height: 32,
} as React.CSSProperties;

export const Avatar: React.FC<AvatarProps> = (props) => (
  <UserAvatar sx={{ ...avatarCSS }} {...props} />
);
