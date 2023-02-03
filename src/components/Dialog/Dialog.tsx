import { ReactNode, useRef } from "react";
import { AriaDialogProps, useDialog, useFocusRing } from "react-aria";

export interface DialogProps extends AriaDialogProps {
  children: ReactNode;
}

export function Dialog({ children, ...props }: DialogProps) {
  let ref = useRef<HTMLDivElement>(null);

  const { isFocusVisible, focusProps } = useFocusRing();
  const focusOutlineClass = !isFocusVisible ? "outline-none" : "";

  let { dialogProps } = useDialog(props, ref);

  return (
    <div
      {...dialogProps}
      {...focusProps}
      ref={ref}
      className={`flex justify-center ${focusOutlineClass}`}
    >
      {children}
    </div>
  );
}
