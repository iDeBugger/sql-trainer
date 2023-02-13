import { ReactNode, useRef } from "react";
import { useTooltipTrigger } from "react-aria";
import { TooltipTriggerProps, useTooltipTriggerState } from "react-stately";
import { Chip, ChipProps } from "../Chip/Chip";
import { Tooltip } from "../Tooltip/Tooltip";

interface ChipTooltipProps extends ChipProps, TooltipTriggerProps {
  tooltip: ReactNode;
}

export function ChipTooltip({ tooltip, ...props }: ChipTooltipProps) {
  const state = useTooltipTriggerState(props);
  const ref = useRef(null);

  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <div className="relative">
      <Chip chipRef={ref} triggerProps={triggerProps} {...props} />
      {tooltip && state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {tooltip}
        </Tooltip>
      )}
    </div>
  );
}
