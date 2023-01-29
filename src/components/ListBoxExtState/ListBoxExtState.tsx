import { ListProps, ListState, useListState } from "react-stately";
import React from "react";
import { AriaListBoxOptions, useListBox, useOption } from "react-aria";
import { Node } from "@react-types/shared";

type ListBoxProps = {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<object>;
} & AriaListBoxOptions<unknown>;

export function ListBoxExtState(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null);

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

type OptionProps = { item: Node<unknown>; state: ListState<unknown> };

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
