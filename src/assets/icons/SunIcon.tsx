import * as React from "react";

export function SunIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12 9a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 1110 0 5 5 0 01-10 0zM12 1a1 1 0 011 1v2a1 1 0 11-2 0V2a1 1 0 011-1zM12 19a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.223 4.223a1 1 0 011.414 0l1.41 1.41a1 1 0 11-1.414 1.414l-1.41-1.41a1 1 0 010-1.414zM16.953 16.953a1 1 0 011.414 0l1.41 1.41a1 1 0 01-1.414 1.414l-1.41-1.41a1 1 0 010-1.414zM1 12a1 1 0 011-1h2a1 1 0 110 2H2a1 1 0 01-1-1zM19 12a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM7.047 16.953a1 1 0 010 1.414l-1.41 1.41a1 1 0 01-1.414-1.414l1.41-1.41a1 1 0 011.414 0zM19.777 4.223a1 1 0 010 1.414l-1.41 1.41a1 1 0 01-1.414-1.414l1.41-1.41a1 1 0 011.414 0z"
        fill="currentColor"
      />
    </svg>
  );
}
