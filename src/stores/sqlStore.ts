import create from "zustand";
import initSqlJs, { Database, QueryExecResult } from "sql.js";
import sqliteURL from "sql.js/dist/sql-wasm.wasm?url";
import sqlSeed from "../data/seed.sql?raw";

export interface QueryResult {
  status: "SUCCESS" | "FAILURE";
  result?: QueryExecResult[];
  error?: Error;
}

export interface SQLStore {
  initStatus: "NON_INITIALIZED" | "LOADING" | "READY";
  db: Database | null;
  init: () => void;
  runQuery: (query: string) => QueryResult;
}

export const useSQLStore = create<SQLStore>((set, get) => ({
  initStatus: "NON_INITIALIZED",
  db: null,
  lastQueryResults: null,
  init: async () => {
    set({ initStatus: "LOADING" });
    const SQL = await initSqlJs({
      locateFile: () => sqliteURL,
    });
    const db = new SQL.Database();

    db.run(sqlSeed);

    set({ db, initStatus: "READY" });
  },
  runQuery: (query: string) => {
    const { db } = get();

    if (db === null) {
      throw new Error("Can't run query as the database is not ready");
    }

    try {
      return {
        status: "SUCCESS",
        result: db.exec(query),
      };
    } catch (err) {
      return {
        status: "FAILURE",
        error: err as Error,
      };
    }
  },
}));
