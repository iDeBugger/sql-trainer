import { useTranslation } from "react-i18next";
import { LeftArrowIcon } from "../../assets/icons/LeftArrowIcon";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { RightArrowIcon } from "../../assets/icons/RightArrowIcon";
import { Button } from "../../components/Button/Button";

export interface SubheaderProps {
  currentTask: number;
  onTOCClick: () => void;
}

export function Subheader({ currentTask, onTOCClick }: SubheaderProps) {
  const { t } = useTranslation();

  return (
    <div className="border-b border-gray-100 pb-4">
      <div className="sm:hidden px-6 flex flex-row justify-between items-center">
        <Button
          variant="secondary"
          leftIcon={<MenuIcon />}
          onPress={onTOCClick}
        />
        <span>{t("task_number", { task: currentTask })}</span>
        <Button variant="secondary" leftIcon={<RightArrowIcon />} />
      </div>
      <div className="hidden sm:flex px-6 flex-row justify-between items-center gap-3">
        <div className="w-[157px]">
          <Button
            variant="secondary"
            leftIcon={<MenuIcon />}
            onPress={onTOCClick}
          >
            {t("tasks_list")}
          </Button>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 flex-1">
          <Button variant="secondary" leftIcon={<LeftArrowIcon />} />
          <span>{t("task_number", { task: currentTask })}</span>
          <Button variant="secondary" leftIcon={<RightArrowIcon />} />
        </div>
        <div className="w-[157px]"></div>
      </div>
    </div>
  );
}
