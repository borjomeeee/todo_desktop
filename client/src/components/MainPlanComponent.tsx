import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// UTILS
import { dateToString, numTasksToString } from "../utils/common";

// ICONS
import { TrashIcon } from "../utils/icons";

type IMainPlanComponent = {
  id: string;
  title: string;
  date: number;
  numTasks: number;
  removePlan: (planId: string) => void
};

const MainPlanComponent: React.FC<IMainPlanComponent> = ({
  id,
  title,
  date,
  numTasks,

  removePlan
}) => {
  const history = useHistory();

  const [isHovered, setIsHovered] = useState(false);

  const redirectToPlan = (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    history.push(`/plan/${id}`);
  };

  const toggleHoverPlanHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsHovered(!isHovered);
  };

  const removePlanHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    removePlan(id);
  }

  return (
    <div
      className="main__plan"
      onClick={event => redirectToPlan(event, id)}
      onMouseEnter={toggleHoverPlanHandler}
      onMouseLeave={toggleHoverPlanHandler}
    >
      <div className="main__plan-title">{title}</div>

      <div className="main__plan-bottom">
        <div className="main__plan-trash">
          {isHovered ? (
            <TrashIcon fill={"#E8E8E8"} width={16} height={20} onClick={removePlanHandler} />
          ) : (
            <></>
          )}
        </div>

        <div className="main__plan-descr">
          <div className="main__plan-date">{dateToString(date)}</div>
          <div className="main__plan-num-tasks">{numTasksToString(numTasks)}</div>
        </div>
      </div>
    </div>
  );
};

export default MainPlanComponent;
