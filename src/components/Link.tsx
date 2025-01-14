import { NavLink } from "react-router-dom";

export default function Link({
  route,
  children,
  className,
  onClick,
}: {
  route: string;
  children: React.ReactNode;

  className?: string;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={route}
      onClick={onClick}
      className={({ isActive }) =>
        `${isActive ? "font-semibold" : "font-medium"} ${className}`
      }
    >
      {children}
    </NavLink>
  );
}
