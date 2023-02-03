import { ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

export type ModalPosition = "centered" | "topFullWidth";

export interface ModalProps extends AriaModalOverlayProps {
  children?: ReactNode;
  position?: ModalPosition;
  state: OverlayTriggerState;
}

const MODAL_POSITIONS_MAP: { [_ in ModalPosition]: string } = {
  centered: "",
  topFullWidth: "flex-grow self-start",
};

export function Modal({
  state,
  children,
  position = "centered",
  ...props
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  const modalPositionClass = MODAL_POSITIONS_MAP[position];

  return (
    <Overlay>
      <div
        {...underlayProps}
        className="fixed z-[100] inset-0 bg-darkalpha-48 flex items-center justify-center"
      >
        <div
          {...modalProps}
          className={`bg-gray-0 dark:bg-gray-900 c-shadow-modal ${modalPositionClass}`}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}
