import { AriaButtonProps, useButton, useFocusRing } from "react-aria";
import { ReactNode, RefObject, useRef } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text" | "link";
type ButtonSize = "big" | "medium" | "small";
type ButtonFill = "fixedWidth" | "hugContent" | "fillContainer";

export interface ButtonProps extends AriaButtonProps {
  children?: ReactNode;
  /**
   * Element placed before the children.
   */
  leftIcon?: ReactNode;
  /**
   * Element placed after the children.
   */
  rightIcon?: ReactNode;
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
  /**
   * React ref to button element.
   */
  buttonRef?: RefObject<HTMLButtonElement>;
  /**
   * HTML classes that will be added to button.
   */
  className?: string;
  /**
   * How the button controls it's width.
   * "fixedWidth" — width is set to a fixed number using `className` prop
   * "hugContent" — width is determined by button's content
   * "fillContainer" — width is determined by button's container, button will fill it
   * @default "hugContent"
   */
  fill?: ButtonFill;
}

const variantClassMap: { [_ in ButtonVariant]: string } = {
  primary:
    "text-gray-0 \
    bg-bluealpha-100 hover:bg-bluealpha-200 active:bg-blue-900 \
    disabled:text-whitealpha-64 disabled:bg-bluealpha-32 disabled:hover:bg-bluealpha-32 disabled:active:bg-bluealpha-32 \
    \
    dark:text-gray-0 \
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 \
    dark:disabled:text-whitealpha-64 dark:disabled:bg-bluealpha-16 dark:disabled:hover:bg-bluealpha-16 dark:disabled:active:bg-bluealpha-16",
  secondary:
    "text-gray-900 \
    bg-gray-0 hover:bg-gray-50 active:bg-gray-100 \
    border border-gray-200 \
    disabled:text-gray-300 disabled:bg-gray-0 disabled:hover:bg-gray-0 disabled:active:bg-gray-0 \
    \
    dark:text-gray-50 \
    dark:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-gray-900 \
    dark:border dark:border-gray-600\
    dark:disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:hover:bg-gray-800 dark:disabled:active:bg-gray-800 \
    dark:disabled:border-gray-700",
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

const iconVariantClassMap: { [_ in ButtonVariant]: string } = {
  primary:
    "text-gray-0 dark:text-gray-0 \
  group-disabled/button:text-whitealpha-64 dark:group-disabled/button:text-whitealpha-64",
  secondary:
    "text-gray-400 dark:text-gray-200 \
    group-disabled/button:text-gray-200 dark:group-disabled/button:text-gray-400",
  tertiary: "text-bluealpha-100 dark:text-blue-400",
  text: "text-gray-400 dark:text-gray-200",
  link: "text-bluealpha-100 active:text-bluealpha-900 dark:text-blue-500 dark:active:text-blue-600",
};

const sizeClassMap: (size: ButtonSize, variant: ButtonVariant) => string = (
  size,
  variant
) => {
  switch (size) {
    case "big":
      switch (variant) {
        case "secondary":
          return "px-[calc(theme(spacing[6])-1px)] py-[calc(theme(spacing[3])-1px)] text-p-lg font-medium";
        default:
          return "px-6 py-3 text-p-lg font-medium";
      }
    case "medium":
      switch (variant) {
        case "secondary":
          return "px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-p-md font-medium";
        default:
          return "px-5 py-2.5 text-p-md font-medium";
      }
    case "small":
      switch (variant) {
        case "secondary":
          return "px-[calc(theme(spacing[4])-1px)] py-[calc(theme(spacing[1.5])-1px)] text-p-md font-medium";
        default:
          return "px-4 py-1.5 text-p-md font-medium";
      }
    default:
      return "";
  }
};

const iconSizeClassMap: { [_ in ButtonSize]: string } = {
  big: "h-6 w-6",
  medium: "h-5 w-5",
  small: "h-5 w-5",
};

const fillClassMap: { [_ in ButtonFill]: string } = {
  fixedWidth: "justify-between",
  hugContent: "w-auto",
  fillContainer: "w-full justify-center",
};

export function Button({
  variant = "primary",
  size = "medium",
  fill = "hugContent",
  className = "",
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonRef = ref, children } = props;

  const { isFocusVisible, focusProps } = useFocusRing();
  const focusOutlineClass = !isFocusVisible ? "outline-none" : "";

  const { buttonProps } = useButton(props, buttonRef);

  const variantClass = variantClassMap[variant];
  const iconVariantClass = iconVariantClassMap[variant];
  const sizeClass = sizeClassMap(size, variant);
  const iconSizeClass = iconSizeClassMap[size];
  const fillClass = fillClassMap[fill];

  return (
    <button
      {...buttonProps}
      {...focusProps}
      ref={buttonRef}
      className={`rounded-lg gap-2 flex flex-row group/button ${variantClass} ${sizeClass} ${fillClass} ${className} ${focusOutlineClass}`}
    >
      {leftIcon && (
        <div className={`${iconSizeClass} ${iconVariantClass}`}>{leftIcon}</div>
      )}
      {children && children}
      {rightIcon && (
        <div className={`${iconSizeClass} ${iconVariantClass}`}>
          {rightIcon}
        </div>
      )}
    </button>
  );
}
