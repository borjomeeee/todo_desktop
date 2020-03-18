import React from "react";
import { useHistory } from "react-router-dom";

// UTILS
import { dateToString } from "../utils/common";

type IMainPlanComponent = {
  id: string;
  title: string;
  date: number;
  tasks: string[];
};

const MainPlanComponent: React.FC<IMainPlanComponent> = ({
  id,
  title,
  date,
  tasks
}) => {
  const history = useHistory();

  const redirectToPlan = (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    history.push(`/plan/${id}`);
  };

  return (
    <div className="main__plan" onClick={event => redirectToPlan(event, id)}>
      <div className="main__plan-title">{title}</div>

      <div className="main__plan-descr">
        <div className="main__plan-date">{dateToString(date)}</div>
        <div className="main__plan-num-tasks">{`${tasks.length} задач`}</div>
      </div>
    </div>
  );
};

export default MainPlanComponent;
