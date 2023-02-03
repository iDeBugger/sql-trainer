import * as React from "react";

export function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41 6.91a.833.833 0 011.18 0L10 11.323l4.41-4.411a.833.833 0 011.18 1.178l-5 5a.833.833 0 01-1.18 0l-5-5a.833.833 0 010-1.178z"
        fill="currentColor"
      />
    </svg>
  );
}
