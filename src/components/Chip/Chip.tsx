import {
  DOMAttributes,
  FocusableElement,
  FocusEvents,
} from "@react-types/shared";
import { ReactNode, RefObject } from "react";
import { HoverProps, PressProps } from "react-aria";

type ChipStyle = "white" | "gray" | "lightblue";

export interface ChipProps {
  style?: ChipStyle;
  chipRef?: RefObject<HTMLDivElement>;
  triggerProps?: DOMAttributes<FocusableElement> &
    PressProps &
    HoverProps &
    FocusEvents;
  children: ReactNode;
  "aria-label": string;
}

const styleToRootClass: { [_ in ChipStyle]: string } = {
  white:
    "px-1.5 rounded-lg text-gray-600 bg-gray-0 dark:text-gray-200 dark:bg-gray-700",
  gray: "px-1.5 rounded-lg text-gray-600 bg-gray-100 dark:text-gray-200 dark:bg-gray-700",
  lightblue:
    "px-2 py-0.5 rounded-md bg-bluealpha-8 text-bluealpha-200 dark:bg-bluealpha-32 dark:text-blue-300 text-sub font-semibold",
};

export function Chip({
  style = "gray",
  children,
  "aria-label": ariaLabel,
  chipRef,
  triggerProps,
}: ChipProps) {
  const rootClass = styleToRootClass[style];

  return (
    <div
      ref={chipRef}
      {...triggerProps}
      aria-label={ariaLabel}
      className={`w-fit h-fit ${rootClass}`}
    >
      {children}
    </div>
  );
}
