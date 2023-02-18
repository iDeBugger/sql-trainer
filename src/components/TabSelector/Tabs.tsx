import { useRef } from "react";
import {
  AriaTabListProps,
  AriaTabPanelProps,
  AriaTabProps,
  useFocusRing,
  useTab,
  useTabList,
  useTabPanel,
} from "react-aria";
import { TabListState, useTabListState } from "react-stately";
import { Node } from "@react-types/shared";

interface TabSelectorProps extends AriaTabListProps<object> {
  className?: string;
}

const SELECTED_CLASS =
  "bg-gray-0 dark:bg-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.12)] text-gray-900 dark:text-gray-100 rounded-md";
const NON_SELECTED_CLASS = "bg-transparent text-gray-800 dark:text-gray-200";

export function Tabs({ className = "", ...props }: TabSelectorProps) {
  let state = useTabListState(props);
  let ref = useRef(null);
  let { tabListProps } = useTabList(props, state, ref);
  return (
    <div className={`flex flex-col ${className} ${props.orientation || ""}`}>
      <div
        className="bg-gray-100 dark:bg-gray-1000 rounded-lg p-1 flex flex-row gap-0.5 w-full h-fit"
        {...tabListProps}
        ref={ref}
      >
        {[...state.collection].map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            orientation={props.orientation}
          />
        ))}
      </div>
      <TabPanel
        className="flex-shrink pt-4 overflow-auto h-full"
        key={state.selectedItem?.key}
        state={state}
      />
    </div>
  );
}

interface TabProps extends AriaTabProps {
  item: Node<object>;
  state: TabListState<object>;
  orientation: AriaTabListProps<object>["orientation"];
}

function Tab({ item, state, orientation }: TabProps) {
  let { key, rendered } = item;
  let ref = useRef(null);
  let { tabProps, isSelected, isDisabled } = useTab({ key }, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();
  const focusOutlineClass = !isFocusVisible ? "outline-none" : "";

  const className = isSelected ? SELECTED_CLASS : NON_SELECTED_CLASS;

  return (
    <div
      className={`overflow-x-auto flex-1 text-ellipsis text-p-md font-semibold\
                  px-2.5 py-1.5 text-center whitespace-nowrap ${className} ${focusOutlineClass}`}
      {...tabProps}
      {...focusProps}
      ref={ref}
    >
      {rendered}
    </div>
  );
}

interface TabPanelProps extends AriaTabPanelProps {
  state: TabListState<unknown>;
  className?: string;
}

function TabPanel({ className = "", state, ...props }: TabPanelProps) {
  let ref = useRef(null);
  let { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div className={className} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}
