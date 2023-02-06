import { createAction, createReducer } from "@reduxjs/toolkit";
import { spawn, Worker } from "threads";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { databases, DbTable } from "../../assets/databases/databases";

export type DatabaseStatus =
  | "NOT_INITIALIZED"
  | "INITIALIZING"
  | "READY"
  | "ERROR";

interface TaskState {
  dbStatus: DatabaseStatus;
  selected: Task["id"] | null;
  tables: DbTable[];
}

export const setDbStatus = createAction<DatabaseStatus>("tasks/setDbStatus");
export const setTables = createAction<DbTable[]>("tasks/setTables");
export const setSelectedTask = createAction<Task["id"]>(
  "tasks/setSelectedTask"
);

const INITIAL_STATE: TaskState = {
  dbStatus: "NOT_INITIALIZED",
  selected: null,
  tables: [],
};

export const taskReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setSelectedTask, (state, action) => {
    const hasSelectedTask = tasksList.some(({ id }) => id === action.payload);

    if (hasSelectedTask) {
      state.selected = action.payload;
    } else {
      state.selected = tasksList[0].id;
      console.warn(
        "Selected task hadn't been found in tasks list. First task was selected instead."
      );
    }
  });
});
