import { ReactNode } from "react";
import { useTooltip, AriaTooltipProps, mergeProps } from "react-aria";
import { TooltipTriggerState } from "react-stately";

interface TooltipProps extends AriaTooltipProps {
  state?: TooltipTriggerState;
  children: ReactNode;
}

export function Tooltip({ state, ...props }: TooltipProps) {
  let { tooltipProps } = useTooltip(props, state);

  return (
    <div
      className="absolute right-0 top-[100%] z-[200] px-5 py-3 rounded-lg text-gray-100 bg-gray-1000"
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </div>
  );
}
