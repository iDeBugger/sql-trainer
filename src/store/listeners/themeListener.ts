import { startAppListening } from "../middlewares/listenerMiddleware";
import { ThemeType } from "../reducers/settingsReducer";

export const applyTheme = (theme: ThemeType) => {
  switch (theme) {
    case "light":
    case "dark": {
      document.documentElement.setAttribute("data-color-theme", theme);
      break;
    }
    default: {
      const isSystemColorSchemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const colorThemeToSet = isSystemColorSchemeDark ? "dark" : "light";
      document.documentElement.setAttribute(
        "data-color-theme",
        colorThemeToSet
      );
      break;
    }
  }
};

startAppListening({
  predicate: (action, currentState, originalState) => {
    return currentState.settings.theme !== originalState.settings.theme;
  },
  effect: (action, api) => {
    const state = api.getState();
    applyTheme(state.settings.theme);
  },
});
