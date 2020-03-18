import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

// STYLES
import "./Plan.screen.scss";

// MODELS
import { Plan } from "../../models/Plan.model";

// COMPONENTS
import PlanCreateTaskForm from "../../components/PlanCreateTaskForm";
import PlanHeadlineComponent from "../../components/PlanHeadlineComponent";
import PlanTaskComponent from "../../components/PlanTaskComponent";

// ACTIONS
import { createTaskAction } from "../../actions/Tasks.actions";
import { editPlanAction } from "../../actions/Plans.actions";
import { Task } from "../../models/Task.model";

type IPlanScreen = {
  token: string;
  plans: Plan[];
  tasks: Task[];
  saveTask: (token: string, planId: string, title: string) => {};
  editPlan: (token: string, plan: Plan) => {};
};

const PlanScreen: React.FC<IPlanScreen> = ({
  token,
  plans,
  tasks,
  saveTask,
  editPlan
}) => {
  const { id } = useParams();
  const history = useHistory();

  const [plan, setPlan] = useState<Plan>();
  const { toggleCreateTask, isCreateTask, redirectToHome } = usePlan();

  // Определяется текущий план по id
  useEffect(() => {
    const currPlan = plans.filter(plan => plan._id === id);

    if (currPlan.length > 0) {
      setPlan(currPlan[0]);
    } else {
      history.push("/home");
    }
  }, [history, id, plans]);

  const saveTaskHandler = (title: string) => {
    saveTask(token, plan!._id, title);
    toggleCreateTask();
  };

  const saveChangesPlanHandler = (title: string, date: number) => {
    plan!.editTitle(title);
    plan!.editDate(date);

    editPlan(token, plan!);
  };

  if (!plan) return <></>;

  return (
    <div className="plan">
      <PlanHeadlineComponent
        title={plan.title}
        date={plan.date}
        onBack={redirectToHome}
        onSave={saveChangesPlanHandler}
      />

      <div className="plan__container">
        <div className="plan__tasks">
          {isCreateTask ? (
            <></>
          ) : (
            <div className="plan__add-button" onClick={toggleCreateTask}>
              добавить задачу
            </div>
          )}

          {isCreateTask ? (
            <PlanCreateTaskForm
              saveTask={saveTaskHandler}
              closeForm={toggleCreateTask}
            />
          ) : (
            <></>
          )}

          {tasks
            .filter(task => task.planId === plan._id && !task.checked)
            .map(task => (
              <PlanTaskComponent key={task._id} task={task} />
            ))}

          {tasks.filter(task => task.planId === plan._id && task.checked)
            .length > 0 ? (
            <div className="plan__tasks-title">Завершенные</div>
          ) : (
            <></>
          )}
          {tasks
            .filter(task => task.planId === plan._id && task.checked)
            .map(task => (
              <PlanTaskComponent key={task._id} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
};

const usePlan = () => {
  const history = useHistory();
  const [isCreateTask, setIsCreateTask] = useState(false);

  const toggleCreateTask = () => {
    setIsCreateTask(!isCreateTask);
  };

  const redirectToHome = () => {
    history.push("/home");
  };

  return { toggleCreateTask, isCreateTask, redirectToHome };
};

const mapStateToProps = (state: any) => ({
  token: state.user.token,
  plans: state.plans,
  tasks: state.tasks,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: any) => ({
  saveTask: (token: string, planId: string, title: string) =>
    dispatch(createTaskAction(token, planId, title)),
  editPlan: (token: string, plan: Plan) => dispatch(editPlanAction(token, plan))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanScreen);
