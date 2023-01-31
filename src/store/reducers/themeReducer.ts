import { createAction, createReducer } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeType;
}

export const setLightTheme = createAction("theme/setLight");
export const setDarkTheme = createAction("theme/setDark");
export const toggleTheme = createAction("theme/toggle");

const INITIAL_STATE: ThemeState = {
  theme: "system",
};

export const themeReducer = createReducer(INITIAL_STATE, (builder) => {
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
