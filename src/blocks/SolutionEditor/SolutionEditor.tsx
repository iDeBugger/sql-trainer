import { useTranslation } from "react-i18next";
import {
  DbColumnAttribute,
  DbTable,
  DbColumnAttributeRef,
} from "../../assets/databases/databases";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Task, tasksList } from "../../assets/tasks/tasks";
import { Button } from "../../components/Button/Button";
import { Chip } from "../../components/Chip/Chip";
import { ChipTooltip } from "../../components/ChipTooltip/ChipTooltip";
import { Dialog } from "../../components/Dialog/Dialog";
import { ModalButton } from "../../components/ModalButton/ModalButton";
import { Table } from "../../components/Table/Table";
import { TextArea } from "../../components/TextArea/TextArea";

interface SolutionEditorProps {
  selectedTask: Task["id"];
  taskTables: DbTable[];
}

interface ChipAttributeProps {
  attr: DbColumnAttribute;
}

interface FKTooltipProps {
  reference: DbColumnAttributeRef;
}

interface TaskDescriptionProps {
  task: Task;
}

interface StructureTablesProps {
  taskTables: DbTable[];
  onClose?: () => void;
  className?: string;
}

function PKTooltip() {
  const { t } = useTranslation();

  return (
    <span className="whitespace-nowrap text-p-md font-semibold text-gray-100">
      {t("primary_key")}
    </span>
  );
}

function FKTooltip({ reference }: FKTooltipProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <span className="pb-2 whitespace-nowrap text-p-md font-semibold text-gray-100">
        {t("foreign_key_to")}
      </span>
      <div className="pb-1.5 flex flex-row gap-1">
        <span className="text-sub text-gray-300">
          {t("foreign_key_to_table")}
        </span>
        <span className="text-sub text-gray-50">{reference.table}</span>
      </div>
      <div className="flex flex-row gap-1">
        <span className="text-sub text-gray-300">
          {t("foreign_key_to_column")}
        </span>
        <span className="text-sub text-gray-50">{reference.column}</span>
      </div>
    </div>
  );
}

function ChipAttribute({ attr }: ChipAttributeProps) {
  const { t } = useTranslation();

  const { type, reference } = attr;

  const Tooltip =
    type === "PK" || !reference ? (
      <PKTooltip />
    ) : (
      <FKTooltip reference={reference} />
    );

  return (
    <ChipTooltip
      key={type}
      style="lightblue"
      aria-label={t("column_property")}
      delay={0}
      tooltip={Tooltip}
    >
      {type}
    </ChipTooltip>
  );
}

function TaskDescription({ task }: TaskDescriptionProps) {
  const { t } = useTranslation();

  return (
    <>
      <span className="mb-2 font-semibold text-p-lg text-gray-1000 dark:text-gray-200">
        {t(`topics.${task.topic}`)}
      </span>
      <span className="mb-6 text-p-lg text-gray-900 dark:text-gray-100">
        {t(`tasks.${task.id}`)}
      </span>
    </>
  );
}

function StructureTables({
  taskTables,
  onClose,
  className = "",
}: StructureTablesProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col px-6 pb-6 md:pb-0 w-full md:h-full ${className}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex flex-row py-6 items-center justify-between">
          <div className="flex flex-row gap-2">
            <span className="text-p-lg font-bold text-gray-900 dark:text-gray-200">
              {t("tables_description")}
            </span>
            <Chip style="white" aria-label={t("amount_of_tables")}>
              {taskTables.length}
            </Chip>
          </div>
          {onClose && (
            <Button
              variant="text"
              size="big"
              leftIcon={<CloseIcon />}
              className="!p-0"
              onPress={onClose}
            />
          )}
        </div>
        <div className="items-center md:pb-6 h-full overflow-y-auto">
          <div className="w-full flex flex-col gap-3 pr-3 items-center">
            {taskTables?.map(({ name, columns }) => (
              <Table
                className="w-full max-w-[390px]"
                key={name}
                header={[name]}
                data={
                  columns?.map(({ name, attributes }) => [
                    <div key={name} className="flex flex-row justify-between">
                      <span>{name}</span>
                      <div className="flex flex-row gap-2">
                        {attributes.map((attr) => (
                          <ChipAttribute key={attr.type} attr={attr} />
                        ))}
                      </div>
                    </div>,
                  ]) || []
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskTextarea() {
  const { t } = useTranslation();

  return (
    <TextArea
      label={t("sql_textarea_label")}
      placeholder={t("sql_textarea_placeholder") || undefined}
      className="mb-4"
    />
  );
}

function SolutionButtons() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="tertiary"
        size="big"
        fill="fillContainer"
        className="px-3"
      >
        {t("show_expected_result")}
      </Button>
      <Button variant="primary" size="big" fill="fillContainer">
        {t("check_answer")}
      </Button>
    </div>
  );
}

export function SolutionEditor({
  selectedTask,
  taskTables = [],
}: SolutionEditorProps) {
  const { t } = useTranslation();
  const task = tasksList.find(({ id }) => id === selectedTask);

  return (
    <>
      {task && (
        <>
          <div className="hidden md:grid grid-cols-[auto_7fr_4fr_auto] w-full h-[calc(100vh-128px)]">
            <div className="w-[calc((100vw-theme(screens.lg))/2)]"></div>
            <div className="w-full h-[calc(100vh-128px)] flex flex-col px-6 py-8">
              <TaskDescription task={task} />
              <TaskTextarea />
              <SolutionButtons />
            </div>
            <div className="w-full bg-bluealpha-8 pt-2 h-[calc(100vh-128px)]">
              <StructureTables taskTables={taskTables} />
            </div>
            <div className="w-[calc((100vw-theme(screens.lg))/2)] bg-bluealpha-8"></div>
          </div>
          <div className="flex md:hidden flex-col my-8 px-6 lg:container w-full">
            <TaskDescription task={task} />
            <ModalButton
              buttonProps={{
                variant: "secondary",
                size: "medium",
                fill: "fillContainer",
                className: "mb-6",
                rightIcon: (
                  <Chip aria-label={t("amount_of_tables")}>
                    {taskTables.length}
                  </Chip>
                ),
                children: t("show_tables_structure"),
              }}
              isDismissable={true}
              position="bottomFullWidth"
              className="bg-blue-100"
            >
              {(onClose) => (
                <Dialog>
                  <StructureTables
                    taskTables={taskTables}
                    onClose={onClose}
                    className="max-h-[85vh]"
                  />
                </Dialog>
              )}
            </ModalButton>
            <TaskTextarea />
            <SolutionButtons />
          </div>
        </>
      )}
    </>
  );
}
