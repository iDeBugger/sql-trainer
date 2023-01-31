import { createAction, createReducer } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark" | "system";
export type LanguageType = "en" | "ru";

interface SettingsState {
  theme: ThemeType;
  language: LanguageType;
}

export const setLightTheme = createAction("settings/setLightTheme");
export const setDarkTheme = createAction("settings/setDarkTheme");
export const toggleTheme = createAction("settings/toggleTheme");
export const setLanguage = createAction<LanguageType>("settings/setLanguage");

const INITIAL_STATE: SettingsState = {
  theme: "system",
  language: "en",
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
    })
    .addCase(setLanguage, (state, action) => {
      state.language = action.payload;
    });
});
