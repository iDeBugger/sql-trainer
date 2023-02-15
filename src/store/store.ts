import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  save as saveToLocalStorage,
  load as loadFromLocalStorage,
} from "redux-localstorage-simple";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";
import { settingsReducer } from "./reducers/settingsReducer";
import { taskReducer } from "./reducers/taskReducer";
import { applyTheme } from "./listeners/themeListener";
import { initI18n } from "../i18n/i18n";
import "./listeners/languageListener";
import {
  solutionsAdapter,
  solutionsReducer,
} from "./reducers/solutionsReducer";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }>();

const LOCAL_STORAGE_STATES = ["settings", "solutions"];
const LOCAL_STORAGE_NAMESPACE = "sql_trainer";

const getPreloadedState = () => {
  const storeFromLocalStorage = loadFromLocalStorage({
    states: LOCAL_STORAGE_STATES,
    namespace: LOCAL_STORAGE_NAMESPACE,
  });

  initI18n((storeFromLocalStorage as RootState)?.settings?.language || "en");
  applyTheme((storeFromLocalStorage as RootState)?.settings?.theme || "system");

  return storeFromLocalStorage;
};

const reducer = {
  settings: settingsReducer,
  task: taskReducer,
  solutions: solutionsReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(
        saveToLocalStorage({
          states: LOCAL_STORAGE_STATES,
          namespace: LOCAL_STORAGE_NAMESPACE,
        })
      ),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: getPreloadedState(),
});

export const selectSolutionById = solutionsAdapter.getSelectors<RootState>(
  (store) => store.solutions
).selectById;
