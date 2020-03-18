import React, { useState } from "react";

type IPlanCreateTaskForm = {
  saveTask: (title: string) => void;
  closeForm: () => void;
};

const PlanCreateTaskForm: React.FC<IPlanCreateTaskForm> = ({
  saveTask,
  closeForm
}) => {
  const [taskTitle, setTaskTitle] = useState("");

  const changeTaskTitleHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setTaskTitle(event.target.value);
  };

  const saveTaskHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && taskTitle.length > 0) {
      saveTask(taskTitle);
    }
  };

  return (
    <div className="plan__create">
      <div className="plan__create-close" onClick={closeForm}></div>

      <input
        type="text"
        className="plan__create-input"
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyPress={saveTaskHandler}
        onBlur={closeForm}
        autoFocus
      />
    </div>
  );
};

export default PlanCreateTaskForm;
