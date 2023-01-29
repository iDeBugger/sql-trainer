import React from "react";
import {
  useSelectState,
  SelectProps as StatelySelectProps,
} from "react-stately";
import { HiddenSelect, HiddenSelectProps, useSelect } from "react-aria";
import { Button } from "../Button/Button";
import { ListBoxExtState } from "../ListBoxExtState/ListBoxExtState";
import { PopoverExtState } from "../PopoverExtState/PopoverExtState";
import { ChevronDown } from "../../assets/icons/ChevronDown";

type SelectFill = "fixedWidth" | "hugContent" | "fillContainer";

export type SelectProps = {
  /**
   * HTML form input name.
   */
  name: HiddenSelectProps<unknown>["name"];
  /**
   * The content to display as the label.
   */
  label: StatelySelectProps<unknown>["label"];
  /**
   * Whether the label have to be showed (screen readers will see it even if false)
   */
  showLabel?: boolean;
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
} & StatelySelectProps<object>;

const rootContainerFillMap: { [_ in SelectFill]: string } = {
  fixedWidth: "justify-between",
  hugContent: "w-auto",
  fillContainer: "w-full justify-center",
};

export function Select({
  buttonClassName = "",
  fill = "hugContent",
  ...props
}: SelectProps) {
  let state = useSelectState(props);

  let buttonRef = React.useRef<HTMLButtonElement>(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    buttonRef
  );

  const rootFillClasName = rootContainerFillMap[fill];
  const labelClassName = props.showLabel ? "" : "hidden";

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
      >
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : "Выбрать"}
        </span>
        <span aria-hidden="true">
          <ChevronDown width={20} height={20} />
        </span>
      </Button>
      {state.isOpen && (
        <PopoverExtState
          state={state}
          triggerRef={buttonRef}
          placement="bottom start"
        >
          <ListBoxExtState {...menuProps} state={state} />
        </PopoverExtState>
      )}
    </div>
  );
}
