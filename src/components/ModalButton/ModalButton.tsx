import React, { ReactNode, useRef } from "react";
import { AriaModalOverlayProps, useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";
import { Button, ButtonProps } from "../Button/Button";
import { Modal, ModalProps } from "../Modal/Modal";

interface ModalButtonProps extends AriaModalOverlayProps, OverlayTriggerProps {
  buttonProps?: ButtonProps;
  position?: ModalProps["position"];
  children: (_: () => void) => Parameters<typeof React.cloneElement>[0];
}

export function ModalButton({
  buttonProps,
  children,
  ...props
}: ModalButtonProps) {
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "menu" },
    state,
    triggerRef
  );

  return (
    <>
      <Button {...buttonProps} {...triggerProps} buttonRef={triggerRef} />
      {state.isOpen && (
        <Modal {...props} state={state}>
          {React.cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}
