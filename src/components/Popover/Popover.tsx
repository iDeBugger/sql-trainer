import React, { ReactNode, RefObject, useRef } from "react";
import {
  DismissButton,
  Overlay,
  usePopover,
  AriaPopoverProps,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: ReactNode;
  state: OverlayTriggerState;
  popoverRef?: RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null);
  let { popoverRef = ref, state, children, isNonModal } = props;
  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      {isNonModal && <div {...underlayProps} className="fixed inset-0" />}
      <div
        {...popoverProps}
        className="rounded-lg p-1 border \
                 bg-gray-0 border-gray-100 text-gray-900 \
                 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50"
        ref={popoverRef as RefObject<HTMLDivElement>}
        style={popoverProps.style}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
