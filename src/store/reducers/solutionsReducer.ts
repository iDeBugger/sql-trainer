import {
  createAction,
  createEntityAdapter,
  createReducer,
} from "@reduxjs/toolkit";
import { Task } from "../../assets/tasks/tasks";

export type SolutionStatus = "UNKNOWN" | "PROCESSING" | "CORRECT" | "INCORRECT";

export interface Solution {
  taskId: Task["id"];
  status: SolutionStatus;
  query: string;
}

export const solutionsAdapter = createEntityAdapter<Solution>({
  selectId: (solution) => solution.taskId,
});
export const upsertSolution = createAction<Solution>("solutions/upsert");

export const solutionsReducer = createReducer(
  solutionsAdapter.getInitialState(),
  (builder) => {
    builder.addCase(upsertSolution, solutionsAdapter.upsertOne);
  }
);
