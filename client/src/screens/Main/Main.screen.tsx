import React, { useState } from "react";
import { connect } from "react-redux";

// STYLES
import "./Main.screen.scss";

// ACTIONS
import { createPlanAction } from "../../actions/Plans.actions";

// MODELS
import { Plan } from "../../models/Plan.model";

// COMPONENTS
import MainCreatePlanForm from "../../components/MainCreatePlanForm";
import MainPlanComponent from "../../components/MainPlanComponent";

type MainScreenType = {
  token: string;
  userId: string;
  plans: Plan[];
  createPlan: (
    token: string,
    userId: string,
    title: string,
    date: number
  ) => {};
};

const MainScreen: React.FC<MainScreenType> = ({
  token,
  userId,
  plans,
  createPlan,
}) => {
  const { isCreatePlan, toggleIsCreatePlan } = usePlanInteraction();

  const savePlan = (title: string, date: Date) => {
    createPlan(token, userId, title, date.getTime());

    toggleIsCreatePlan();
  };

  return (
    <div className="main">
      <div className="main__title">Мой ежедневник</div>

      <div className="main__plans">
        {isCreatePlan ? (
          <MainCreatePlanForm
            savePlan={savePlan}
            closeForm={toggleIsCreatePlan}
          />
        ) : (
          <div className="main__add-button" onClick={toggleIsCreatePlan}>
            СОЗДАТЬ ПЛАН
          </div>
        )}

        {plans
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map(plan => (
            <MainPlanComponent
              key={plan._id}
              id={plan._id}
              title={plan.title}
              date={plan.date}
              tasks={plan.tasks}
            />
          ))}
      </div>
    </div>
  );
};

const usePlanInteraction = () => {
  const [isCreatePlan, setIsCreatePlan] = useState(false);

  const toggleIsCreatePlan = () => {
    setIsCreatePlan(!isCreatePlan);
  };

  return {
    isCreatePlan,
    toggleIsCreatePlan
  };
};

const mapStateToProps = (state: any) => ({
  token: state.user.token,
  userId: state.user.id,
  plans: state.plans,
});

const mapDispatchToProps = (dispatch: any) => ({
  createPlan: (token: string, userId: string, title: string, date: number) =>
    dispatch(createPlanAction(token, userId, title, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
