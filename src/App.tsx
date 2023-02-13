import { useEffect } from "react";
import { Task, tasksList } from "./assets/tasks/tasks";
import { Header } from "./blocks/Header/Header";
import { SolutionEditor } from "./blocks/SolutionEditor/SolutionEditor";
import { Subheader } from "./blocks/Subheader/Subheader";
import {
  LanguageType,
  setLanguage,
  toggleTheme,
} from "./store/reducers/settingsReducer";
import { useAppDispatch, useAppSelector } from "./store/store";
import { selectTask } from "./store/thunks/selectTaskThunk";

function App() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const { selected: selectedTask, tables: taskTables } = useAppSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (!selectedTask) {
      console.log("Task is not selected. The first task was selected");
      dispatch(selectTask(tasksList[0].id));
    }
  }, [selectedTask]);

  const onLanguageSelect = (new_lang: LanguageType) => {
    dispatch(setLanguage(new_lang));
  };

  const onThemeButtonClick = () => {
    dispatch(toggleTheme());
  };

  const onSelectTask = (newTask: Task["id"]) => {
    dispatch(selectTask(newTask));
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
      {selectedTask && (
        <>
          <Subheader selectedTask={selectedTask} onSelectTask={onSelectTask} />
          <SolutionEditor selectedTask={selectedTask} taskTables={taskTables} />
        </>
      )}
    </div>
  );
}

export default App;
