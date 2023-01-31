import { createAction, createReducer } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark" | "system";

interface SettingsState {
  theme: ThemeType;
}

export const setLightTheme = createAction("settings/setLightTheme");
export const setDarkTheme = createAction("settings/setDarkTheme");
export const toggleTheme = createAction("settings/toggleTheme");

const INITIAL_STATE: SettingsState = {
  theme: "system",
};

export const settingsReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(setLightTheme, (state, action) => {
      state.theme = "light";
    })
    .addCase(setDarkTheme, (state, action) => {
      state.theme = "dark";
    })
    .addCase(toggleTheme, (state, action) => {
      switch (state.theme) {
        case "dark": {
          state.theme = "light";
          break;
        }
        case "light": {
          state.theme = "dark";
          break;
        }
        case "system": {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            state.theme = "light";
          } else {
            state.theme = "dark";
          }
          break;
        }
      }
    });
});
