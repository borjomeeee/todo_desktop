import React, { useState } from "react";
import { connect } from "react-redux";

// STYLES
import "./Main.screen.scss";

// ACTIONS
import { createPlanAction, removePlanAction } from "../../actions/Plans.actions";

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
  removePlan: (token: string, planId: string) => {}
};

const MainScreen: React.FC<MainScreenType> = ({
  token,
  userId,
  plans,
  createPlan,
  removePlan
}) => {
  const { isCreatePlan, toggleIsCreatePlan } = usePlanInteraction();

  const createPlanHandler = (title: string, date: Date) => {
    createPlan(token, userId, title, date.getTime());

    toggleIsCreatePlan();
  };

  const removePlanHandler = (planId: string) => {
    removePlan(token, planId);
  }

  return (
    <div className="main">
      <div className="main__title">Мой ежедневник</div>

      <div className="main__plans">
        {isCreatePlan ? (
          <MainCreatePlanForm
            savePlan={createPlanHandler}
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
              numTasks={plan.tasks.length}
              removePlan={removePlanHandler}
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
  removePlan: (token: string, planId: string) => dispatch(removePlanAction(token ,planId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
