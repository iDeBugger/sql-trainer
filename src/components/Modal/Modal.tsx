import { ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

export type ModalPosition =
  | "centered"
  | "topFullWidth"
  | "leftFullHeight"
  | "bottomFullWidth";

export interface ModalProps extends AriaModalOverlayProps {
  children?: ReactNode;
  position?: ModalPosition;
  className?: string;
  state: OverlayTriggerState;
}

const MODAL_POSITIONS_MAP: { [_ in ModalPosition]: string } = {
  centered: "",
  topFullWidth: "row-[1_/_2] col-[1_/_4] h-fit",
  leftFullHeight: "row-[1_/_4] col-[1_/_2] h-auto w-fit",
  bottomFullWidth: "row-[3_/_4] col-[1_/_4] h-fit max-h-[85vh]",
};

export function Modal({
  state,
  children,
  position = "centered",
  className = "",
  ...props
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  const modalPositionClass = MODAL_POSITIONS_MAP[position];

  return (
    <Overlay>
      <div
        {...underlayProps}
        className="fixed z-[100] inset-0 bg-darkalpha-48 grid grid-cols-[auto_auto_auto] grid-rows-[1fr_1fr_1fr]"
      >
        <div
          {...modalProps}
          className={`bg-gray-0 dark:bg-gray-900 c-shadow-modal flex flex-row ${modalPositionClass} ${className}`}
          ref={ref}
        >
          {position === "leftFullHeight" && (
            <div className="w-[calc((100vw-theme(screens.lg))/2)] h-0 flex-shrink-0"></div>
          )}
          <div className="flex-grow mx-auto lg:container">{children}</div>
        </div>
      </div>
    </Overlay>
  );
}
