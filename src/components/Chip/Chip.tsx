import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  "aria-label": string;
}

export function Chip({ children, "aria-label": ariaLabel }: ChipProps) {
  return (
    <div
      aria-label={ariaLabel}
      className="w-fit px-1.5 rounded-lg text-gray-600 bg-gray-100 dark:text-gray-200 dark:bg-gray-700"
    >
      {children}
    </div>
  );
}
