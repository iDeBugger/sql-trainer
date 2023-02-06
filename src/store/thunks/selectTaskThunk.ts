import { spawn, Worker } from "threads";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { createAppAsyncThunk } from "../store";
import dbWorkerPath from "../../workers/dbWorker?worker&url";
import type { DbWorker } from "../../workers/dbWorker";
import {
  setDbStatus,
  setSelectedTask,
  setTables,
} from "../reducers/taskReducer";
import { databases } from "../../assets/databases/databases";

const dbWorker = spawn<DbWorker>(
  new Worker(dbWorkerPath, {
    type: "module",
  })
);

export const selectTask = createAppAsyncThunk(
  "tasks/selectTask",
  async (newTaskId: Task["id"], { dispatch }) => {
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
