import { Key } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { HeartOutlineIcon } from "../../assets/icons/HeartOutlineIcon";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoText } from "../../assets/icons/LogoText";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { LanguageType } from "../../store/reducers/settingsReducer";

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

export interface HeaderProps {
  selectedLanguage: LanguageType;
  onLanguageSelect: (new_lang: LanguageType) => void;
  onThemeButtonClick: () => void;
  onSupportMeClick: () => void;
}

export function Header(props: HeaderProps) {
  const { t } = useTranslation();

  const {
    selectedLanguage,
    onLanguageSelect,
    onThemeButtonClick,
    onSupportMeClick,
  } = props;

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
          selectedKey={selectedLanguage}
          onSelectionChange={(selectedKey: Key) =>
            onLanguageSelect(selectedKey as LanguageType)
          }
        >
          {languageItems}
        </Select>
        <Button
          leftIcon={<SunIcon />}
          variant="secondary"
          size="medium"
          aria-label={t("toggle_color_scheme") || undefined}
          onPress={onThemeButtonClick}
        />
        <Button
          leftIcon={<HeartOutlineIcon />}
          variant="primary"
          size="medium"
          onPress={onSupportMeClick}
        >
          {t("support_me")}
        </Button>
      </div>
    </div>
  );
}
