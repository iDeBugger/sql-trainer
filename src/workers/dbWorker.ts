import { expose } from "threads/worker";
import initSqlJs, { Database as SqlJsDatabase, QueryExecResult } from "sql.js";
import {
  Database,
  DbTable,
  DbColumnAttribute,
} from "../assets/databases/databases";

const sqlJSinit = initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});
let db: SqlJsDatabase | null = null;

const initDb = async (dbDescription: Database) => {
  const sqlJS = await sqlJSinit;

  db = new sqlJS.Database();

  if (dbDescription.initSql) {
    try {
      db.run(dbDescription.initSql);
    } catch (e) {
      console.warn("Failed to run database initialization query:", e);
    }
  }
};

const getTablesDescription = (tableNames: string[]): DbTable[] => {
  return tableNames.map((tableName) => {
    if (!db) {
      throw new Error("Attempt to use uninitialized database!");
    }

    let tableDescription: QueryExecResult[] | null = [];
    let tableFKs: { [_ in string]: DbColumnAttribute } = {};

    try {
      tableDescription = db.exec(`PRAGMA table_info(${tableName});`);

      const rawTableFKs = db.exec(`PRAGMA foreign_key_list(${tableName});`)[0];
      tableFKs =
        rawTableFKs?.values.reduce(
          (fks, [_1, _2, targetTable, fromColumn, targetColumn]) => {
            if (fromColumn && typeof fromColumn === "string") {
              fks[fromColumn] = {
                type: "FK",
                reference: {
                  table: targetTable?.toString() || "<unknown>",
                  column: targetColumn?.toString() || "<unknown>",
                },
              };
            }
            return fks;
          },
          tableFKs
        ) || {};
    } catch (e) {
      console.warn(
        "Failed to obtain table descriptions and foreign keys info: ",
        e
      );
    }

    return {
      name: tableName,
      columns: tableDescription[0].values.map(
        ([_1, columnNameRaw, _2, _3, _4, isPK]) => {
          const attributes: DbColumnAttribute[] = [];
          const columnName = columnNameRaw?.toString() || "<unknown>";

          if (Boolean(isPK)) {
            attributes.push({
              type: "PK",
            });
          }
          if (tableFKs[columnName]) {
            attributes.push(tableFKs[columnName]);
          }

          return {
            name: columnName,
            attributes,
          };
        }
      ),
    };
  });
};

const executeQuery = (query: string): QueryExecResult[] | null => {
  const result = db?.exec(query) || null;

  if (result && !result.length) {
    return null;
  }

  return result;
};

const dbWorker = {
  initDb,
  getTablesDescription,
  executeQuery,
};
export type DbWorker = typeof dbWorker;

expose(dbWorker);
