import { expose } from "threads/worker";
import { PGlite } from "@electric-sql/pglite";
import type { Results } from "@electric-sql/pglite";
import {
  Database,
  DbTable,
  DbColumnAttribute,
} from "../assets/databases/databases";

// QueryExecResult type to maintain compatibility with existing code
export interface QueryExecResult {
  columns: string[];
  values: (string | number | null)[][];
}

let db: PGlite | null = null;

const initDb = async (dbDescription: Database) => {
  // Create in-memory PGlite instance
  db = new PGlite();

  if (dbDescription.initSql) {
    try {
      await db.exec(dbDescription.initSql);
    } catch (e) {
      console.warn("Failed to run database initialization query:", e);
    }
  }
};

const getTablesDescription = async (tableNames: string[]): Promise<DbTable[]> => {
  if (!db) {
    throw new Error("Attempt to use uninitialized database!");
  }

  const tables: DbTable[] = [];

  for (const tableName of tableNames) {
    try {
      // Get column information from PostgreSQL information_schema
      const columnQuery = `
        SELECT
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position;
      `;
      const columnResult = await db.query(columnQuery, [tableName]);

      // Get primary key information
      const pkQuery = `
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_name = $1;
      `;
      const pkResult = await db.query(pkQuery, [tableName]);
      const primaryKeys = new Set(
        pkResult.rows.map((row: any) => row.column_name)
      );

      // Get foreign key information
      const fkQuery = `
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = $1;
      `;
      const fkResult = await db.query(fkQuery, [tableName]);

      // Build foreign key map
      const foreignKeys: { [columnName: string]: DbColumnAttribute } = {};
      fkResult.rows.forEach((row: any) => {
        foreignKeys[row.column_name] = {
          type: "FK",
          reference: {
            table: row.foreign_table_name || "<unknown>",
            column: row.foreign_column_name || "<unknown>",
          },
        };
      });

      // Build column list with attributes
      const columns = columnResult.rows.map((row: any) => {
        const columnName = row.column_name;
        const attributes: DbColumnAttribute[] = [];

        if (primaryKeys.has(columnName)) {
          attributes.push({ type: "PK" });
        }
        if (foreignKeys[columnName]) {
          attributes.push(foreignKeys[columnName]);
        }

        return {
          name: columnName,
          attributes,
        };
      });

      tables.push({
        name: tableName,
        columns,
      });
    } catch (e) {
      console.warn(
        `Failed to obtain table description for ${tableName}: `,
        e
      );
    }
  }

  return tables;
};

const executeQuery = async (query: string): Promise<QueryExecResult[] | null> => {
  if (!db) return null;

  try {
    const result: Results = await db.query(query);

    // If no rows returned, return null
    if (!result.rows || result.rows.length === 0) {
      return null;
    }

    // Map PGlite result format to sql.js QueryExecResult format
    const columns = result.fields.map((field) => field.name);
    const values = result.rows.map((row: any) =>
      columns.map((colName) => {
        const value = row[colName];
        // Ensure values are primitive types (string, number, null)
        return value === undefined ? null : value;
      })
    );

    return [
      {
        columns,
        values,
      },
    ];
  } catch (e) {
    console.error("Query execution failed:", e);
    return null;
  }
};

const dbWorker = {
  initDb,
  getTablesDescription,
  executeQuery,
};
export type DbWorker = typeof dbWorker;

expose(dbWorker);
