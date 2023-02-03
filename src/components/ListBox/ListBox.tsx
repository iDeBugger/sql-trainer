import { ListState } from "react-stately";
import React, { RefObject, useRef } from "react";
import { AriaListBoxOptions, useListBox, useOption } from "react-aria";
import { Node } from "@react-types/shared";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>;
  state: ListState<unknown>;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);

  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="max-h-28 overflow-auto min-w-[125px]"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function Option({ item, state }: OptionProps) {
  let ref = React.useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let className = "text-gray-900 bg-transparent dark:text-gray-50";
  if (isFocused) {
    className = "text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-gray-600";
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`cursor-pointer px-3 py-1 text-p-md outline-none rounded ${className}`}
    >
      {item.rendered}
    </li>
  );
}
