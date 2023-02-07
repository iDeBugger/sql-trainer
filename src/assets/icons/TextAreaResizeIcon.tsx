import * as React from "react";

export function TextAreaResizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18 4L4 18M18 13l-5 5" stroke="currentColor" />
    </svg>
  );
}
