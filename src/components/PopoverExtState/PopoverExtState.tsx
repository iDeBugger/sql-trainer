import React, { ReactNode, RefObject } from "react";
import {
  DismissButton,
  Overlay,
  usePopover,
  AriaPopoverProps,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

type PopoverProps = {
  children: ReactNode;
  state: OverlayTriggerState;
  popoverRef?: AriaPopoverProps["popoverRef"];
} & Omit<AriaPopoverProps, "popoverRef">;

export function PopoverExtState({ children, state, ...props }: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { popoverRef = ref } = props;
  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      <div
        {...popoverProps}
        className="rounded-lg p-1 border \
                 bg-gray-0 border-gray-100 text-gray-900 \
                 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50"
        ref={popoverRef as RefObject<HTMLDivElement>}
        style={popoverProps.style}
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
