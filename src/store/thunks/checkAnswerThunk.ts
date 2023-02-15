import { tasksList } from "../../assets/tasks/tasks";
import { createAppAsyncThunk } from "../store";
import {
  setDbStatus,
  setSelectedTask,
  setTables,
} from "../reducers/taskReducer";
import { databases } from "../../assets/databases/databases";

export const selectTask = createAppAsyncThunk(
  "tasks/checkAnswer",
  async (solutionQuery: string, { dispatch }) => {
    dispatch(setDbStatus("INITIALIZING"));
    let selectedTask = tasksList.find(({ id }) => id === newTaskId);

    if (!selectedTask) {
      selectedTask = tasksList[0];
      console.warn(
        `Selected task (${newTaskId}) hadn't been found in tasks list. First task (${selectedTask.id}) was selected instead.`
      );
    }
    dispatch(setSelectedTask(selectedTask.id));

    const database = databases[selectedTask.database];
    console.time("Database (re)initialization");
    const dbWorkerInstance = await dbWorker;
    await dbWorkerInstance.initDb(database);
    console.timeEnd("Database (re)initialization");

    console.time("Tables data extraction");
    const tables = await dbWorkerInstance.getTablesDescription(
      selectedTask.tables
    );
    console.timeEnd("Tables data extraction");

    dispatch(setTables(tables));

    dispatch(setDbStatus("READY"));
  }
);
