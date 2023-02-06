import { accounting } from "./accounting";

export type DbColumnAttributeType = "PK" | "FK";

export interface DbColumnAttributeRef {
  table: DbTable["name"];
  column: DbColumn["name"];
}

export interface DbColumnAttribute {
  type: DbColumnAttributeType;
  reference?: DbColumnAttributeRef;
}

export interface DbColumn {
  name: string;
  attributes: DbColumnAttribute[];
}

export interface DbTable {
  name: string;
  columns: DbColumn[];
}

export interface Database {
  name: string;
  initSql?: string;
  tables: { [_ in DbTable["name"]]: DbTable };
}

export type DatabaseId = "accounting";
export const databases: { [_ in DatabaseId]: Database } = { accounting };
