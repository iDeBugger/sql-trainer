import { ReactNode } from "react";
import { useFocusRing } from "react-aria";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { HeartOutlineIcon } from "../../assets/icons/HeartOutlineIcon";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoText } from "../../assets/icons/LogoText";
import { MoreHorizontalIcon } from "../../assets/icons/MoreHorizontalIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { ModalButton } from "../../components/ModalButton/ModalButton";
import { Select } from "../../components/Select/Select";
import { LanguageType } from "../../store/reducers/settingsReducer";

interface HeaderLayoutProps {
  children: ReactNode;
}

interface HeaderRowProps {
  children: ReactNode;
}

interface HeaderLogoRowProps {
  children: ReactNode;
}

export interface HeaderProps {
  selectedLanguage: LanguageType;
  onLanguageSelect: (new_lang: LanguageType) => void;
  onThemeButtonClick: () => void;
  onSupportMeClick: () => void;
}

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

function HeaderLayout({ children }: HeaderLayoutProps) {
  return <div className="container px-6 py-2 flex">{children}</div>;
}

function HeaderRow({ children }: HeaderRowProps) {
  return (
    <div className="container py-2 flex flex-row justify-between">
      {children}
    </div>
  );
}

function HeaderLogoRow({ children }: HeaderLogoRowProps) {
  return (
    <HeaderRow>
      <div className="flex flex-row gap-2 justify-start items-center">
        <LogoIcon className="w-10 h-10 flex-shrink-0" />
        <LogoText className="w-[126px] h-[40px] flex-shrink-0 text-gray-900 dark:text-gray-50" />
      </div>
      {children}
    </HeaderRow>
  );
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
    <HeaderLayout>
      <HeaderLogoRow>
        <ModalButton
          buttonProps={{
            leftIcon: <MoreHorizontalIcon />,
            variant: "tertiary",
            size: "medium",
            "aria-label": t("open_main_menu") || undefined,
          }}
          isDismissable
          position="topFullWidth"
        >
          {(onCloseClick) => (
            <Dialog>
              <HeaderLayout>
                <HeaderLogoRow>
                  <Button
                    variant="tertiary"
                    onPress={onCloseClick}
                    leftIcon={<CloseIcon />}
                  />
                </HeaderLogoRow>
              </HeaderLayout>
            </Dialog>
          )}
        </ModalButton>
      </HeaderLogoRow>
      {/* <div className="hidden lg:flex flex-row gap-3 justify-end">
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
      </div> */}
    </HeaderLayout>
  );
}
