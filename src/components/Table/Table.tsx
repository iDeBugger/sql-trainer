import { ReactNode } from "react";

type TableStyle = "default" | "zebra";

interface TableProps {
  data: ReactNode[][];
  header?: ReactNode[];
  style?: TableStyle;
}

const styleToOuterDivClass: { [_ in TableStyle]: string } = {
  default: "border-l-4 border-l-bluealpha-100 dark:border-l-blue-500",
  zebra: "",
};

const styleToInnerDivClass: { [_ in TableStyle]: string } = {
  default:
    "border-r border-y border-gray-200 dark:border-gray-700 rounded-tr-xl rounded-br-xl",
  zebra: "border border-gray-200 dark:border-gray-700 rounded-xl",
};

const styleToHeaderCellClass: { [_ in TableStyle]: string } = {
  default:
    "px-[18px] py-[12px] border-gray-200 text-gray-1000 bg-gray-0 dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800",
  zebra:
    "p-4 border-gray-200 text-gray-900 bg-bluealpha-8 dark:border-gray-700 dark:text-gray-100 dark:bg-bluealpha-24",
};

const styleToBodyCellClass: { [_ in TableStyle]: string } = {
  default:
    "px-[18px] py-[10px] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-gray-0 dark:bg-gray-800",
  zebra:
    "px-4 py-3 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-gray-0 dark:bg-gray-900 group-even/row:bg-gray-50 dark:group-even/row:bg-gray-800",
};

export function Table({ data, header, style = "default" }: TableProps) {
  const outerDivClass = styleToOuterDivClass[style];
  const innerDivClass = styleToInnerDivClass[style];
  const headerCellClass = styleToHeaderCellClass[style];
  const bodyCellClass = styleToBodyCellClass[style];

  return (
    <div className={`rounded-xl overflow-clip ${outerDivClass}`}>
      <div className={`w-full h-full overflow-clip ${innerDivClass}`}>
        <table className="w-full h-full border-hidden border-collapse rounded-xl">
          {header && (
            <thead>
              <tr>
                {header.map((node, index) => (
                  <th
                    key={index}
                    className={`border text-left ${headerCellClass}`}
                  >
                    {node}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="group/row">
                {row.map((node, nodeIndex) => (
                  <td
                    key={nodeIndex}
                    className={`border border-gray-200 ${bodyCellClass}`}
                  >
                    {node}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
