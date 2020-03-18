import React from "react";
import { connect } from 'react-redux';

// MODELS
import { Task } from "../models/Task.model";
import { editTaskAction } from "../actions/Tasks.actions";

type IPlanTaskComponent = {
  task: Task,
  token: string;
  editTask: (token: string, planId: string, task: Task) => {}
};

const PlanTaskComponent: React.FC<IPlanTaskComponent> = ({
  task,
  token,
  editTask
}) => {
  const toggleCheckHadnler = (event: React.MouseEvent) => {
    event.preventDefault();

    task.toggleCheck();
    editTask(token, task.planId, task);
  };

  return (
    <div className="plan__task">
      <div className="plan__task-top">
        <div
          className={`plan__task-start ${
            task.checked ? "plan__task-start-grey" : ""
          }`}
        ></div>

        <div
          className={`plan__task-name ${
            task.checked ? "plan__task-name-crossed" : ""
          }`}
        >
          {task.text}
        </div>
      </div>

      <div className="plan__task-button" onClick={toggleCheckHadnler}>
        {task.checked ? "отмена" : "вычеркнуть"}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.user.token
})

const mapDispatchToProps = (dispatch: any) => ({
  editTask: (token: string, planId: string, task: Task) => dispatch(editTaskAction(token, planId, task))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanTaskComponent);
