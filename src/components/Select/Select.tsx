import React from "react";
import {
  useSelectState,
  SelectProps as StatelySelectProps,
} from "react-stately";
import { AriaSelectOptions, HiddenSelect, useSelect } from "react-aria";
import { Button } from "../Button/Button";
import { ListBox } from "../ListBox/ListBox";
import { ChevronDown } from "../../assets/icons/ChevronDown";
import { Popover } from "../Popover/Popover";

type SelectFill = "fixedWidth" | "hugContent" | "fillContainer";

export interface SelectProps<T extends object> extends AriaSelectOptions<T> {
  /**
   * HTML classes that will be added to select button.
   */
  buttonClassName?: string;
  /**
   * How the select button controls it's width.
   * "fixedWidth" — width is set to a fixed number using `className` prop
   * "hugContent" — width is determined by button's content
   * "fillContainer" — width is determined by button's container, button will fill it
   * @default "hugContent"
   */
  fill?: SelectFill;
}

const rootContainerFillMap: { [_ in SelectFill]: string } = {
  fixedWidth: "justify-between",
  hugContent: "w-auto",
  fillContainer: "w-full justify-center",
};

export function Select<T extends object>({
  buttonClassName = "",
  fill = "hugContent",
  ...props
}: SelectProps<T>) {
  let state = useSelectState(props);

  let buttonRef = React.useRef<HTMLButtonElement>(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    buttonRef
  );

  const rootFillClasName = rootContainerFillMap[fill];
  const labelClassName = props.label ? "" : "hidden";

  return (
    <div className={`inline-block ${rootFillClasName}`}>
      <div {...labelProps} className={labelClassName}>
        {props.label}
      </div>
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={props.label}
        name={props.name}
      />
      <Button
        {...triggerProps}
        buttonRef={buttonRef}
        className={buttonClassName}
        variant="text"
        size="medium"
        fill={fill}
        rightIcon={<ChevronDown />}
      >
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : "Выбрать"}
        </span>
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={buttonRef} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
