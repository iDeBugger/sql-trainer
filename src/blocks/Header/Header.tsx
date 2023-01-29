import { Item } from "react-stately";
import { HeartOutlineIcon } from "../../assets/icons/HeartOutlineIcon";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoText } from "../../assets/icons/LogoText";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";

export function Header() {
  return (
    <div className="container px-20 h-10 flex flex-row justify-between">
      <div className="flex flex-row gap-2 justify-start items-center">
        <LogoIcon className="flex-shrink-0" />
        <LogoText className="flex-shrink-0 h-7 text-gray-900 dark:text-gray-50" />
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <Select name="language" label="">
          <Item>Русский</Item>
          <Item>Английский</Item>
        </Select>
        <Button leftIcon={<SunIcon />} variant="secondary" size="medium" />
        <Button leftIcon={<HeartOutlineIcon />} variant="primary" size="medium">
          Поддержать нас
        </Button>
      </div>
    </div>
  );
}
