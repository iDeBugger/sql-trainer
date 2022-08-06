import { Paper, Table } from "@mantine/core";
import { QueryResult } from "../../stores/sqlStore";

export interface QueryResultTableProps {
  queryResult: QueryResult;
}

export function QueryResultTable({ queryResult }: QueryResultTableProps) {
  return (
    <>
      {queryResult.status === "FAILURE" && (
        <>
          {queryResult.error?.name}: {queryResult.error?.message}
        </>
      )}
      {queryResult.status === "SUCCESS" && queryResult.result && (
        <Paper shadow="sm" withBorder>
          <Table highlightOnHover>
            <thead>
              <tr>
                {queryResult.result[0].columns.map((headerName) => (
                  <th key={headerName}>{headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResult.result[0].values.map((row, i) => (
                <tr key={i}>
                  {row.map((value, i) => (
                    <td key={i}>{value?.toString() || "null"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </>
  );
}
