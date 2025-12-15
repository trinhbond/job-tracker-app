import { Avatar as MuiAvatar, AvatarProps, styled } from "@mui/material";

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  background: "#c62828",
  color: theme.palette.primary.main,
  cursor: "pointer",
  height: 32,
  width: 32,
}));

export const Avatar: React.FC<AvatarProps> = (props) => (
  <StyledAvatar {...props} />
);
