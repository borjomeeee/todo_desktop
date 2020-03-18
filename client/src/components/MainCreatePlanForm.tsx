import React, { useState } from "react";

// DATEPICKER
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type IMainCreatePlanForm = {
  savePlan: (title: string, date: Date) => void;
  closeForm: () => void;
};

const MainCreatePlanForm: React.FC<IMainCreatePlanForm> = ({
  savePlan,
  closeForm
}) => {
  const [planTitle, setPlanTitle] = useState("");
  const [planDate, setPlanDate] = useState(new Date());

  const changePlanTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setPlanTitle(event.target.value);
  };

  const changePlanDate = (date: Date) => {
    setPlanDate(date);
  };

  const savePlanHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    if (planTitle.length > 0) savePlan(planTitle, planDate);
  };

  const closeFormHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    closeForm();
  };

  return (
    <div className="main__create-plan">
      <div className="main__create-buttons">
        <div className="main__create-close" onClick={closeFormHandler}>
          отменить
        </div>
        <div className="main__create-save" onClick={savePlanHandler}>
          сохранить
        </div>
      </div>

      <div className="main__create-inputs">
        <input
          type="text"
          className="main__create-title main__create-button"
          value={planTitle}
          onChange={changePlanTitle}
          autoFocus
        />
        <DatePicker
          className="main__create-date main__create-button"
          selected={planDate}
          dateFormat="dd/MM/yyyy"
          onChange={changePlanDate}
        />
      </div>
    </div>
  );
};

export default MainCreatePlanForm;
