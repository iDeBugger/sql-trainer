import {
  setSolution,
  setSolutionResult,
  setSolutionStatus,
} from "../reducers/taskReducer";
import { createAppAsyncThunk } from "../store";
import { dbWorker } from "./selectTaskThunk";

export const checkAnswer = createAppAsyncThunk(
  "tasks/checkAnswer",
  async (_: void, { dispatch, getState }) => {
    dispatch(setSolutionStatus("PROCESSING"));

    const {
      task: { expectedResult, solution },
    } = getState();
    dispatch(setSolution(solution));

    try {
      const dbWorkerInstance = await dbWorker;
      const solutionResult = await dbWorkerInstance.executeQuery(solution);

      dispatch(setSolutionResult(solutionResult));

      const isCorrectAnswer =
        JSON.stringify(expectedResult) === JSON.stringify(solutionResult);

      if (isCorrectAnswer) {
        dispatch(setSolutionStatus("CORRECT"));
      } else {
        dispatch(setSolutionStatus("INCORRECT"));
      }
    } catch (e) {
      dispatch(setSolutionResult(null));
      dispatch(setSolutionStatus("INCORRECT"));
    }
  }
);
