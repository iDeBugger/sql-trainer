import * as React from "react";

export function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 6h28v28.06h-7V13.01H6v-7.01z"
        fill="#6B56F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17h17v17h-7V24H6v-7z"
        fill="#6B56F6"
        fillOpacity={0.8}
      />
    </svg>
  );
}
