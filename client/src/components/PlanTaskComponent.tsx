import React, { useState } from "react";
import { connect } from "react-redux";

// MODELS
import { Task } from "../models/Task.model";
import { editTaskAction, removeTaskAction } from "../actions/Tasks.actions";
import { TrashIcon } from "../utils/icons";

type IPlanTaskComponent = {
  task: Task;
  token: string;
  editTask: (token: string, planId: string, task: Task) => {};
  removeTask: (token: string, planId: string, taskId: string) => {};
};

const PlanTaskComponent: React.FC<IPlanTaskComponent> = ({
  task,
  token,
  editTask,
  removeTask
}) => {
  const [isEditTask, setIsEditTask] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

  const toggleCheckHadnler = (event: React.MouseEvent) => {
    event.preventDefault();

    task.toggleCheck();
    editTask(token, task.planId, task);
  };

  const toggleEditTask = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Гениальное решение (в будущем переделать)
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 100)
    }).then(() => setIsEditTask(!isEditTask))
  };

  const changeTaskTextHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setTaskText(event.target.value);
  };

  const removeTaskHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    removeTask(token, task.planId, task._id);
  };

  const saveChangesTaskHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (taskText.length > 0 && taskText !== task.text) {

        task.setText(taskText);
        editTask(token, task.planId, task);
      } else {
        setTaskText(task.text);
      }

      setIsEditTask(!isEditTask);
    }
  };

  return (
    <div className="plan__task">
      <div className="plan__task-top">
        <div
          className={`plan__task-start ${
            task.checked ? "plan__task-start-grey" : ""
          }`}
        ></div>

        {!isEditTask ? (
          <div
            className={`plan__task-name ${
              task.checked ? "plan__task-name-crossed" : ""
            }`}
            onDoubleClick={() => setIsEditTask(!isEditTask)}
          >
            {task.text}
          </div>
        ) : (
          <input
            type="text"
            className="plan__task-name plan__task-name-edit"
            onChange={changeTaskTextHandler}
            onKeyPress={saveChangesTaskHandler}
            onBlur={toggleEditTask}
            value={taskText}
            autoFocus
          />
        )}

        {isEditTask ? (
          <div className="plan__task-trash">
            <TrashIcon
              fill={"#E8E8E8"}
              width={16}
              height={20}
              onClick={removeTaskHandler}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      {!isEditTask ? (
        <div className="plan__task-button" onClick={toggleCheckHadnler}>
          {task.checked ? "отмена" : "вычеркнуть"}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.user.token
});

const mapDispatchToProps = (dispatch: any) => ({
  editTask: (token: string, planId: string, task: Task) =>
    dispatch(editTaskAction(token, planId, task)),
  removeTask: (token: string, planId: string, taskId: string) =>
    dispatch(removeTaskAction(token, planId, taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanTaskComponent);
