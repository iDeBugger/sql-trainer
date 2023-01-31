import { Header } from "./blocks/Header/Header";
import {
  LanguageType,
  setLanguage,
  toggleTheme,
} from "./store/reducers/settingsReducer";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state) => state.settings.language);

  const onLanguageSelect = (new_lang: LanguageType) => {
    dispatch(setLanguage(new_lang));
  };

  const onThemeButtonClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageSelect={onLanguageSelect}
        onThemeButtonClick={onThemeButtonClick}
        onSupportMeClick={() => {}}
      />
    </>
  );
}

export default App;
