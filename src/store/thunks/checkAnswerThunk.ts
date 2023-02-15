import { createAppAsyncThunk } from "../store";

export const selectTask = createAppAsyncThunk(
  "tasks/checkAnswer",
  async (solutionQuery: string, { dispatch }) => {}
);
