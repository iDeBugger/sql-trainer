import { useRef } from "react";
import { AriaTextFieldOptions, useTextField } from "react-aria";
import { CheckCircleIcon } from "../../assets/icons/CheckCircleIcon";
import { XCircleIcon } from "../../assets/icons/XCircleIcon";

export type TextAreaStatus = "DEFAULT" | "SUCCESS" | "FAIL";

interface TextAreaProps extends AriaTextFieldOptions<"textarea"> {
  status?: TextAreaStatus;
  statusDescription?: string;
  className?: string;
}

const statusToClassMap: { [_ in TextAreaStatus]: string } = {
  DEFAULT:
    "shadow-[0_0_0_1px_theme(colors.gray.200)] bg-gray-50 \
    placeholder:text-gray-600 text-gray-1000 \
    border-transparent \
    \
    dark:shadow-[0_0_0_1px_theme(colors.gray.700)] dark:bg-gray-1000 \
    dark:placeholder:text-gray-400 dark:text-gray-50",
  SUCCESS:
    "shadow-[0_0_0_1px_theme(colors.greenalpha.24)] bg-greenalpha-8 \
    placeholder:text-gray-600 text-gray-1000 \
    border-green-100 \
    \
    dark:shadow-[0_0_0_1px_theme(colors.greenalpha.32)] dark:bg-greenalpha-300 \
    dark:placeholder:text-gray-400 dark:text-gray-50 \
    dark:border-green-900",
  FAIL: "shadow-[0_0_0_1px_theme(colors.redalpha.24)] bg-redalpha-8 \
    placeholder:text-gray-600 text-gray-1000 \
    border-red-100 \
    \
    dark:shadow-[0_0_0_1px_theme(colors.redalpha.32)] dark:bg-redalpha-300 \
    dark:placeholder:text-gray-400 dark:text-gray-50 \
    dark:border-red-900",
};
const statusToDescriptionTextClassMap: { [_ in TextAreaStatus]: string } = {
  DEFAULT: "",
  SUCCESS: "text-green-700 dark:text-green-200",
  FAIL: "text-red-700 dark:text-red-100",
};

export function TextArea(props: TextAreaProps) {
  const {
    label,
    status = "DEFAULT",
    statusDescription = null,
    className = "",
  } = props;

  const ref = useRef(null);
  const { inputProps } = useTextField(
    {
      "aria-label": label?.toString(),
      inputElementType: "textarea",
      ...props,
    },
    ref
  );

  const statusClass = statusToClassMap[status];
  const descriptionClass = statusDescription ? "border-b-[36px]" : "";
  const descriptionTextClass = statusDescription
    ? statusToDescriptionTextClassMap[status]
    : "";

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        {...inputProps}
        ref={ref}
        className={`w-full h-full rounded-xl p-4 resize-none font-mono ${statusClass} \
                    ${descriptionClass}`}
      />
      {status !== "DEFAULT" && statusDescription && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-9 px-4 flex flex-row gap-2.5 justify-start items-center`}
        >
          {status === "SUCCESS" && (
            <CheckCircleIcon
              className={`w-5 h-5 text-green-600 dark:text-green-300`}
            />
          )}
          {status === "FAIL" && (
            <XCircleIcon className={`w-5 h-5 text-red-500 dark:text-red-300`} />
          )}
          <span className={descriptionTextClass}>{statusDescription}</span>
        </div>
      )}
    </div>
  );
}
