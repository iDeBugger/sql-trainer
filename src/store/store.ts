import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  save as saveToLocalStorage,
  load as loadFromLocalStorage,
} from "redux-localstorage-simple";
import { listenerMiddleware } from "./middlewares/listenerMiddleware";
import { settingsReducer } from "./reducers/settingsReducer";
import { applyTheme } from "./listeners/themeListener";
import "./listeners/languageListener";
import { initI18n } from "../i18n/i18n";

const LOCAL_STORAGE_STATES = ["settings"];
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
