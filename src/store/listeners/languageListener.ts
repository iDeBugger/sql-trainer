import i18next from "i18next";
import { startAppListening } from "../middlewares/listenerMiddleware";
import { LanguageType } from "../reducers/settingsReducer";

export const applyLanguage = (lang: LanguageType) => {
  i18next.changeLanguage(lang);
};

startAppListening({
  predicate: (action, currentState, originalState) => {
    return currentState.settings.language !== originalState.settings.language;
  },
  effect: (action, api) => {
    const state = api.getState();
    applyLanguage(state.settings.language);
  },
});
