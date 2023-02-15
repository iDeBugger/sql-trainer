import { upsertSolution } from "../reducers/solutionsReducer";
import { setLastAnswerResult } from "../reducers/taskReducer";
import { createAppAsyncThunk, selectSolutionById } from "../store";
import { dbWorker } from "./selectTaskThunk";

export const checkAnswer = createAppAsyncThunk(
  "tasks/checkAnswer",
  async (_: void, { dispatch, getState }) => {
    const {
      task: { expectedResult, selected },
    } = getState();
    const solution = selected
      ? selectSolutionById(getState(), selected)
      : undefined;

    if (!selected || !solution) {
      console.warn("Can't check answer when task is not selected!");
      return;
    }

    dispatch(upsertSolution({ ...solution, status: "PROCESSING" }));

    try {
      const dbWorkerInstance = await dbWorker;
      const solutionResult = await dbWorkerInstance.executeQuery(
        solution.query
      );

      dispatch(setLastAnswerResult(solutionResult));

      const isCorrectAnswer =
        JSON.stringify(expectedResult) === JSON.stringify(solutionResult);

      if (isCorrectAnswer) {
        dispatch(upsertSolution({ ...solution, status: "CORRECT" }));
      } else {
        dispatch(upsertSolution({ ...solution, status: "INCORRECT" }));
      }
    } catch (e) {
      dispatch(upsertSolution({ ...solution, status: "INCORRECT" }));
    }
  }
);
