import { AriaButtonProps, useButton } from "react-aria";
import { useRef } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text" | "link";
type ButtonSize = "big" | "medium" | "small";

type Props = {
  /**
   * Controls which variant of the button is shown.
   * @default primary
   */
  variant?: ButtonVariant;
  /**
   * Controls the size of the button.
   * @default medium
   */
  size?: ButtonSize;
  /**
   * @default false
   */
  isDisabled?: boolean;
} & AriaButtonProps<"button">;

const variantClassMap: { [_ in ButtonVariant]: string } = {
  primary:
    "text-gray-0 \
    bg-bluealpha-100 hover:bg-bluealpha-200 active:bg-blue-900 \
    disabled:bg-bluealpha-32 \
    \
    dark:text-gray-0 \
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 \
    dark:disabled:bg-bluealpha-16",
  secondary:
    "text-gray-900 \
    bg-gray-0 hover:bg-gray-50 active:bg-gray-100 \
    border border-gray-200 \
    \
    dark:text-gray-50 \
    dark:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-gray-900 \
    dark:border dark:border-gray-600",
  tertiary:
    "text-bluealpha-200 \
    bg-bluealpha-8 hover:bg-bluealpha-24 active:bg-bluealpha-32 \
    \
    dark:text-blue-100 \
    dark:bg-bluealpha-32 dark:hover:bg-bluealpha-24 dark:active:bg-bluealpha-16",
  text: "text-gray-900 \
    bg-transparent hover:bg-gray-100 active:bg-gray-200 \
    \
    dark:text-gray-50 \
    dark:bg-transparent dark:hover:bg-gray-700 dark:active:bg-gray-800",
  link: "text-bluealpha-100 hover:text-bluealpha-200 active:text-blue-900 \
    bg-transparent \
    \
    dark:text-blue-400 dark:hover:text-blue-500 dark:active:text-blue-600",
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
