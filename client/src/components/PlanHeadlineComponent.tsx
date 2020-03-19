import React, { useState } from "react";
import { ArrowBackIcon } from "../utils/icons";

// DATEPICKER
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type IPlanHeadlineComponent = {
  title: string;
  date: number;

  onBack: () => void;
  onSave: (title: string, date: number) => void
};

const PlanHeadlineComponent: React.FC<IPlanHeadlineComponent> = ({
  title,
  date,

  onBack,
  onSave
}) => {
  const {
    planTitle,
    planDate,
    isEditDate,
    isEditTitle,
    toggleEditTitle,
    toggleEditDate,
    changeTitle,
    changeDate,
    setPlanTitle
  } = useEditInputs(title, date);

  const savePlanChangesHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      toggleEditTitle();

      if(planTitle !== title && planTitle.length > 0)
        onSave(planTitle, planDate.getTime());
      else
        setPlanTitle(title);
    }
  }

  const changeDateHandler = (date: Date) => {
    changeDate(date);

    toggleEditDate();

    if(planDate.getTime() !== date.getTime())
      onSave(planTitle, date.getTime());
  }

  return (
    <div className="plan__headline">
      <div className="plan__headline-top">
        <div className="plan__back-arrow" onClick={onBack}>
          <ArrowBackIcon width={35} height={35} color={"#000"} />
        </div>
        {isEditTitle ? (
          <input
            type="text"
            className="plan__title plan__title-edit"
            onChange={changeTitle}
            onKeyPress={savePlanChangesHandler}
            onBlur={toggleEditTitle}
            value={planTitle}
            autoFocus
          />
        ) : (
          <div className="plan__title" onDoubleClick={toggleEditTitle}>
            {planTitle}
          </div>
        )}
      </div>

      {isEditDate ? (
        <DatePicker
          className="plan__date plan__date-edit"
          selected={planDate}
          dateFormat="dd/MM/yyyy"
          onChange={changeDateHandler}
          onBlur={toggleEditDate}
          autoFocus
        />
      ) : (
        <div className="plan__date" onDoubleClick={toggleEditDate}>{planDate.toLocaleDateString()}</div>
      )}
    </div>
  );
};

const useEditInputs = (title: string, date: number) => {
  const [planTitle, setPlanTitle] = useState(title);
  const [planDate, setPlanDate] = useState(new Date(date));

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDate, setIsEditDate] = useState(false);

  const toggleEditTitle = () => {
    setIsEditTitle(!isEditTitle);
  };

  const toggleEditDate = () => {
    setIsEditDate(!isEditDate);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setPlanTitle(event.target.value);
  }

  const changeDate = (date: Date) => {
    setPlanDate(date);

    toggleEditDate()
  }

  return {
    planTitle,
    planDate,

    setPlanTitle,

    isEditTitle,
    isEditDate,
    toggleEditTitle,
    toggleEditDate,

    changeTitle,
    changeDate
  };
};

export default PlanHeadlineComponent;
