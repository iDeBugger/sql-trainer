import React, { ReactNode, RefObject, useRef } from "react";
import {
  DismissButton,
  Overlay,
  usePopover,
  AriaPopoverProps,
  useFocusRing,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: ReactNode;
  state: OverlayTriggerState;
  popoverRef?: RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null);

  const { isFocusVisible, focusProps } = useFocusRing();
  const focusOutlineClass = !isFocusVisible ? "outline-none" : "";

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
        {...focusProps}
        className={`rounded-lg p-1 border \
        bg-gray-0 border-gray-100 text-gray-900 \
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50 ${focusOutlineClass}`}
        ref={popoverRef as RefObject<HTMLDivElement>}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
