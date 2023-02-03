import * as React from "react";

export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.883 4.285a8 8 0 109.832 9.832 7.362 7.362 0 01-10.563-6.62 7.363 7.363 0 01.73-3.212zm-3.439-.6A10 10 0 0112 2a1 1 0 01.71 1.705 5.364 5.364 0 007.585 7.585A1 1 0 0122 12 10 10 0 116.444 3.685z"
        fill="currentColor"
      />
    </svg>
  );
}
