import { Key } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { HeartOutlineIcon } from "../../assets/icons/HeartOutlineIcon";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoText } from "../../assets/icons/LogoText";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import {
  LanguageType,
  setLanguage,
  toggleTheme,
} from "../../store/reducers/settingsReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

const LANGUAGES: { title: string; value: LanguageType }[] = [
  {
    title: "english",
    value: "en",
  },
  {
    title: "russian",
    value: "ru",
  },
];

export function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const languageSetting = useAppSelector((state) => state.settings.language);

  const onThemeToggleClick = () => {
    dispatch(toggleTheme());
  };

  const onLanguageSelectionChanged = (new_lang: Key) => {
    dispatch(setLanguage(new_lang as LanguageType));
  };

  const languageItems = LANGUAGES.map(({ title, value }) => (
    <Item key={value}>{t(title)}</Item>
  ));

  return (
    <div className="container px-20 py-4 h-[72px] flex flex-row justify-between">
      <div className="flex flex-row gap-2 justify-start items-center">
        <LogoIcon className="w-10 h-10 flex-shrink-0" />
        <LogoText className="w-[126px] h-[40px] flex-shrink-0 text-gray-900 dark:text-gray-50" />
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <Select
          name="language"
          label=""
          aria-label="Language select"
          selectedKey={languageSetting}
          onSelectionChange={onLanguageSelectionChanged}
        >
          {languageItems}
        </Select>
        <Button
          leftIcon={<SunIcon />}
          variant="secondary"
          size="medium"
          onPress={onThemeToggleClick}
        />
        <Button leftIcon={<HeartOutlineIcon />} variant="primary" size="medium">
          {t("support_me")}
        </Button>
      </div>
    </div>
  );
}
