import { useTranslation } from "react-i18next";
import { QueryExecResult } from "sql.js";
import { BigTableIcon } from "../../assets/icons/BigTableIcon";
import { Table } from "../../components/Table/Table";

interface UserQueryResultsProps {
  table: QueryExecResult[] | null;
}

export function UserQueryResults({ table }: UserQueryResultsProps) {
  const { t } = useTranslation();
  return (
    <>
      {table && (
        <div className="overflow-auto flex flex-col border-gray-200 dark:border-gray-700 border rounded-lg h-full">
          <Table
            style="zebra"
            header={table[0].columns}
            data={table[0].values}
          />
        </div>
      )}
      {!table && (
        <div className="overflow-auto flex flex-col justify-center items-center border-gray-200 dark:border-gray-700 border rounded-lg h-full">
          <BigTableIcon className="w-[56px] h-[56px] mb-4" />
          <span className="max-w-[222px] text-center text-gray-700 dark:text-gray-200">
            {t("here_will_be_your_output")}
          </span>
        </div>
      )}
    </>
  );
}
