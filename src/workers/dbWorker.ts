import { expose } from "threads/worker";
import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
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
    db.run(dbDescription.initSql);
  }
};

const getTablesDescription = (tableNames: string[]): DbTable[] => {
  return tableNames.map((tableName) => {
    if (!db) {
      throw new Error("Attempt to use uninitialized database!");
    }

    const tableDescription = db.exec(`PRAGMA table_info(${tableName});`);
    const tableFKs = db
      .exec(`PRAGMA foreign_key_list(${tableName});`)[0]
      .values.reduce((fks, [_1, _2, targetTable, fromColumn, targetColumn]) => {
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
      }, {} as { [_ in string]: DbColumnAttribute });

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

  return [];
};

const dbWorker = {
  initDb,
  getTablesDescription,
};
export type DbWorker = typeof dbWorker;

expose(dbWorker);
