import { SVGProps } from "react";

export function Elipsis(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 14a2 2 0 1 1 0-4a2 2 0 0 1 0 4M6 14a2 2 0 1 1 0-4a2 2 0 0 1 0 4m6 0a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
      ></path>
    </svg>
  );
}
