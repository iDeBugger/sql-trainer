interface Tab {
  title: string;
  value: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  selected?: Tab["value"] | null;
  onChange?: (newTab: Tab["value"]) => void;
}

const SELECTED_CLASS =
  "bg-gray-0 dark:bg-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.12)] text-gray-900 dark:text-gray-100 rounded-md";
const NON_SELECTED_CLASS = "bg-transparent text-gray-800 dark:text-gray-200";

export function TabSelector({ tabs = [], selected = null }: TabSelectorProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-1 flex flex-row gap-0.5 w-full h-fit">
      {tabs.map(({ value, title }) => {
        const isSelected = value === selected;
        const className = isSelected ? SELECTED_CLASS : NON_SELECTED_CLASS;
        return (
          <div
            className={`overflow-x-auto flex-1 text-ellipsis text-p-md font-semibold px-2.5 py-1.5 text-center whitespace-nowrap ${className}`}
          >
            {title}
          </div>
        );
      })}
    </div>
  );
}
