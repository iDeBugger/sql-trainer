import { createAction, createReducer } from "@reduxjs/toolkit";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { DbTable } from "../../assets/databases/databases";
import { QueryExecResult } from "sql.js";

export type DatabaseStatus =
  | "NOT_INITIALIZED"
  | "INITIALIZING"
  | "READY"
  | "ERROR";

export type SolutionStatus =
  | "NO_STATUS"
  | "PROCESSING"
  | "CORRECT"
  | "INCORRECT";

interface TaskState {
  dbStatus: DatabaseStatus;
  selected: Task["id"] | null;
  tables: DbTable[];
  expectedResult: QueryExecResult[] | null;
  solution: string;
  solutionStatus: SolutionStatus;
  solutionResult: QueryExecResult[] | null;
}

export const setDbStatus = createAction<DatabaseStatus>("tasks/setDbStatus");
export const setTables = createAction<DbTable[]>("tasks/setTables");
export const setSelectedTask = createAction<Task["id"]>(
  "tasks/setSelectedTask"
);
export const setExpectedResult = createAction<QueryExecResult[] | null>(
  "tasks/setExpectedResult"
);
export const setSolution = createAction<string>("tasks/setSolution");
export const setSolutionStatus = createAction<SolutionStatus>(
  "tasks/setSolutionStatus"
);
export const setSolutionResult = createAction<QueryExecResult[] | null>(
  "tasks/setSolutionResult"
);

const INITIAL_STATE: TaskState = {
  dbStatus: "NOT_INITIALIZED",
  selected: null,
  tables: [],
  expectedResult: null,
  solution: "",
  solutionStatus: "NO_STATUS",
  solutionResult: null,
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

    state.solution = "";
    state.solutionStatus = "NO_STATUS";
    state.solutionResult = null;
  });

  builder.addCase(setExpectedResult, (state, action) => {
    state.expectedResult = action.payload;
  });

  builder.addCase(setSolution, (state, action) => {
    state.solution = action.payload;

    state.solutionStatus = "NO_STATUS";
    state.solutionResult = null;
  });

  builder.addCase(setSolutionStatus, (state, action) => {
    state.solutionStatus = action.payload;
  });

  builder.addCase(setSolutionResult, (state, action) => {
    state.solutionResult = action.payload;
  });
});
