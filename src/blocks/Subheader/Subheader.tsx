import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { LeftArrowIcon } from "../../assets/icons/LeftArrowIcon";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { RightArrowIcon } from "../../assets/icons/RightArrowIcon";
import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { ModalButton } from "../../components/ModalButton/ModalButton";

export interface SubheaderProps {
  currentTask: number;
  onTOCClick: () => void;
}

export interface TOCButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

export interface TopicBlockProps {
  title: string;
  tasks: number[];
}

function TopicBlock({ title, tasks }: TopicBlockProps) {
  const buttons = tasks.map((taskNumber) => {
    return (
      <Button
        variant="secondary"
        size="big"
        fill="fixedWidth"
        className="w-[48px] h-[48px] !p-0 !justify-center !items-center"
      >
        {taskNumber}
      </Button>
    );
  });

  return (
    <div className="py-2">
      <span className="text-p-lg font-semibold text-gray-700 dark:text-gray-100">
        {title}
      </span>
      <div className="grid grid-cols-5 auto-rows-auto gap-2.5 pt-2">
        {buttons}
      </div>
    </div>
  );
}

function TOCButton({ onClick, children }: TOCButtonProps) {
  const { t } = useTranslation();
  return (
    <ModalButton
      buttonProps={{
        leftIcon: <MenuIcon />,
        variant: "secondary",
        size: "medium",
        "aria-label": t("open_tasks_list") || undefined,
        onPress: onClick,
        children,
      }}
      isDismissable
      position="leftFullHeight"
    >
      {(onCloseClick) => (
        <Dialog>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between gap-6 py-2 pr-6 sm:pr-10 pl-6 sm:pl-20">
              <span className="text-h5 font-bold text-gray-900 dark:text-gray-200">
                {t("tasks_list")}
              </span>
              <Button
                variant="text"
                leftIcon={<CloseIcon />}
                onPress={onCloseClick}
                className="w-[48px] h-[48px] !p-0 !justify-center !items-center"
              />
            </div>
            <div>
              <div className="w-[100vw] absolute h-0 border-b border-gray-200 dark:border-gray-700 right-0"></div>
            </div>
            <div className="h-full overflow-y-auto">
              <div className="pr-6 sm:pr-10 pl-6 my-4 sm:pl-20">
                <TopicBlock title="Первая тема" tasks={[1, 2, 3, 4, 5, 6, 7]} />
                <TopicBlock title="Вторая тема" tasks={[8, 9, 10, 11]} />
                <TopicBlock
                  title="Снова первая тема"
                  tasks={[
                    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                  ]}
                />
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </ModalButton>
  );
}

export function Subheader({ currentTask, onTOCClick }: SubheaderProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="sm:hidden px-6 flex flex-row justify-between items-center">
        <TOCButton onClick={onTOCClick} />
        <span className="text-gray-900 dark:text-gray-100">
          {t("task_number", { task: currentTask })}
        </span>
        <Button variant="secondary" leftIcon={<RightArrowIcon />} />
      </div>
      <div className="hidden sm:flex px-6 flex-row justify-between items-center gap-3">
        <div className="w-[157px]">
          <TOCButton onClick={onTOCClick}>{t("tasks_list")}</TOCButton>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 flex-1">
          <Button variant="secondary" leftIcon={<LeftArrowIcon />} />
          <span className="text-gray-900 dark:text-gray-100">
            {t("task_number", { task: currentTask })}
          </span>
          <Button variant="secondary" leftIcon={<RightArrowIcon />} />
        </div>
        <div className="w-[157px]"></div>
      </div>
      <div className="pb-4 absolute h-0 border-b border-gray-100 dark:border-gray-700 w-[100vw] left-0"></div>
    </div>
  );
}
