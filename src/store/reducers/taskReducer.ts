import { createAction, createReducer } from "@reduxjs/toolkit";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { DbTable } from "../../assets/databases/databases";
import { QueryExecResult } from "sql.js";

export type DatabaseStatus =
  | "NOT_INITIALIZED"
  | "INITIALIZING"
  | "READY"
  | "ERROR";

interface TaskState {
  dbStatus: DatabaseStatus;
  selected: Task["id"] | null;
  tables: DbTable[];
  expectedResult: QueryExecResult[] | null;
  lastAnswerResult: QueryExecResult[] | null;
}

export const setDbStatus = createAction<DatabaseStatus>("tasks/setDbStatus");
export const setTables = createAction<DbTable[]>("tasks/setTables");
export const setSelectedTask = createAction<Task["id"]>(
  "tasks/setSelectedTask"
);
export const setExpectedResult = createAction<QueryExecResult[] | null>(
  "tasks/setExpectedResult"
);
export const setLastAnswerResult = createAction<QueryExecResult[] | null>(
  "tasks/setLastAnswerResult"
);

export const INITIAL_STATE: TaskState = {
  dbStatus: "NOT_INITIALIZED",
  selected: null,
  tables: [],
  expectedResult: null,
  lastAnswerResult: null,
};

export const taskReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setDbStatus, (state, action) => {
    state.dbStatus = action.payload;
  });

  builder.addCase(setTables, (state, action) => {
    state.tables = action.payload;
  });

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

    state.lastAnswerResult = null;
  });

  builder.addCase(setExpectedResult, (state, action) => {
    state.expectedResult = action.payload;
  });

  builder.addCase(setLastAnswerResult, (state, action) => {
    state.lastAnswerResult = action.payload;
  });
});
