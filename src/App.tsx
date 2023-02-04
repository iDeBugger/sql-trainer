import { Header } from "./blocks/Header/Header";
import { Subheader } from "./blocks/Subheader/Subheader";
import {
  LanguageType,
  setLanguage,
  toggleTheme,
} from "./store/reducers/settingsReducer";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const onLanguageSelect = (new_lang: LanguageType) => {
    dispatch(setLanguage(new_lang));
  };

  const onThemeButtonClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex flex-col w-full lg:container">
      <Header
        selectedLanguage={settings.language}
        onLanguageSelect={onLanguageSelect}
        selectedTheme={settings.theme}
        onThemeButtonClick={onThemeButtonClick}
        onSupportMeClick={() => {}}
      />
      <Subheader currentTask={150} onTOCClick={() => {}} />
    </div>
  );
}

export default App;
