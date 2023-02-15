import { useTranslation } from "react-i18next";
import { QueryExecResult } from "sql.js";
import {
  DbColumnAttribute,
  DbTable,
  DbColumnAttributeRef,
} from "../../assets/databases/databases";
import { BigTableIcon } from "../../assets/icons/BigTableIcon";
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
  expectedTable: QueryExecResult[] | null;
  userResultTable: QueryExecResult[] | null;
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

interface SolutionButtonsProps {
  expectedTable: QueryExecResult[] | null;
  userResultTable: QueryExecResult[] | null;
}

interface ExpectedResultFrameProps {
  onClose: () => void;
  expectedTable: QueryExecResult[] | null;
  userResultTable: QueryExecResult[] | null;
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
      className="mb-4 h-full max-h-[580px]"
    />
  );
}

function ExpectedResultFrame({
  onClose,
  expectedTable,
  userResultTable,
}: ExpectedResultFrameProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full h-[85vh]">
      <div className="relative flex flex-row w-full justify-between items-center py-2 px-6">
        <span className="text-gray-900 text-h5 font-bold">{t("outputs")}</span>
        <Button
          size="big"
          variant="text"
          leftIcon={<CloseIcon />}
          onPress={onClose}
        />
        <div className="absolute left-[-100vw] bottom-0 w-[200vw] border-b border-solid border-gray-200"></div>
      </div>
      <div className="flex flex-row pt-6 pb-10 px-6 gap-6 h-[calc(100%-64px)]">
        <div className="flex flex-col w-[calc(50%-0.75rem)]">
          <span className="text-gray-900 text-p-lg font-bold mb-4">
            {t("your_outputs")}
          </span>

          {userResultTable && (
            <div className="overflow-auto flex flex-col border-gray-200 border rounded-lg h-full">
              <Table
                style="zebra"
                header={userResultTable[0].columns}
                data={userResultTable[0].values}
              />
            </div>
          )}
          {!userResultTable && (
            <div className="overflow-auto flex flex-col justify-center items-center border-gray-200 border rounded-lg h-full">
              <BigTableIcon className="w-[56px] h-[56px] mb-4" />
              <span className="max-w-[222px] text-center">
                {t("here_will_be_your_output")}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-[calc(50%-0.75rem)]">
          <span className="text-gray-900 text-p-lg font-bold mb-4">
            {t("expected_output")}
          </span>

          {expectedTable && (
            <div className="overflow-auto flex flex-col border-gray-200 border rounded-lg h-full">
              <Table
                style="zebra"
                header={expectedTable[0].columns}
                data={expectedTable[0].values}
              />
            </div>
          )}
          {!expectedTable && (
            <div className="overflow-auto flex flex-col justify-center items-center border-gray-200 border rounded-lg h-full">
              <BigTableIcon className="w-[56px] h-[56px] mb-4" />
              <span className="max-w-[222px] text-center">
                {t("no_expected_output_for_task")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SolutionButtons({
  expectedTable,
  userResultTable,
}: SolutionButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <ModalButton
        buttonProps={{
          variant: "tertiary",
          size: "big",
          fill: "fillContainer",
          className: "px-3",
          children: t("show_expected_result"),
        }}
        isDismissable={true}
        position="bottomFullWidth"
      >
        {(onClose) => (
          <Dialog>
            <ExpectedResultFrame
              onClose={onClose}
              expectedTable={expectedTable}
              userResultTable={userResultTable}
            />
          </Dialog>
        )}
      </ModalButton>
      <Button variant="primary" size="big" fill="fillContainer">
        {t("check_answer")}
      </Button>
    </div>
  );
}

export function SolutionEditor({
  selectedTask,
  taskTables = [],
  expectedTable,
  userResultTable,
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
              <SolutionButtons
                expectedTable={expectedTable}
                userResultTable={userResultTable}
              />
            </div>
            <div className="w-full bg-bluealpha-8 pt-2 h-[calc(100vh-128px)] border-l border-l-gray-100 dark:border-l-gray-800">
              <StructureTables taskTables={taskTables} />
            </div>
            <div className="w-[calc((100vw-theme(screens.lg))/2)] bg-bluealpha-8"></div>
          </div>
          <div className="flex md:hidden flex-col my-8 px-6 lg:container w-full h-[calc(100vh-128px)]">
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
            <SolutionButtons
              expectedTable={expectedTable}
              userResultTable={userResultTable}
            />
          </div>
        </>
      )}
    </>
  );
}
