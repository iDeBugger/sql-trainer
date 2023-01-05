import { AriaButtonProps, useButton } from "react-aria";
import { useRef } from "react";

type ButtonVariant = "primary";
type ButtonSize = "big" | "medium" | "small";

type Props = AriaButtonProps<"button"> & {
  /**
   * Controls which variant of the button is shown
   * @default primary
   */
  variant?: ButtonVariant;
  /**
   * Controls the size of the button
   * @default medium
   */
  size?: ButtonSize;
};

const variantClassMap: { [_ in ButtonVariant]: string } = {
  primary:
    "text-gray-0 \
    bg-bluealpha-100 hover:bg-bluealpha-200 \
    dark:bg-blue-600 dark:hover:bg-blue-700",
};

const sizeClassMap: { [_ in ButtonSize]: string } = {
  big: "px-6 py-3 text-p-lg font-medium",
  medium: "px-5 py-2.5 text-p-md font-medium",
  small: "px-4 py-1.5 text-p-md font-medium",
};

export function Button({
  variant = "primary",
  size = "medium",
  ...props
}: Props) {
  let ref = useRef<HTMLButtonElement>(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  let variantClass = variantClassMap[variant];
  let sizeClass = sizeClassMap[size];

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`${variantClass} ${sizeClass} rounded-lg`}
    >
      {children}
    </button>
  );
}
