import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  save as saveToLocalStorage,
  load as loadFromLocalStorage,
} from "redux-localstorage-simple";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";
import { themeReducer } from "./reducers/themeReducer";
import "./listeners/themeListener";
import { applyTheme } from "./listeners/themeListener";

const LOCAL_STORAGE_STATES = ["theme"];
const LOCAL_STORAGE_NAMESPACE = "sql_trainer";

const getPreloadedState = () => {
  const storeFromLocalStorage = loadFromLocalStorage({
    states: LOCAL_STORAGE_STATES,
    namespace: LOCAL_STORAGE_NAMESPACE,
  });

  applyTheme((storeFromLocalStorage as RootState)?.theme?.theme || "system");

  return storeFromLocalStorage;
};

const reducer = {
  theme: themeReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
