import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// SCREENS
import MainScreen from "../screens/Main/Main.screen";
import PlanScreen from "../screens/Plan/Plan.screen";

const MainNavigator: React.FC = () => {
  return (
    <Switch>
      {/** HERE MUST BE USER PANEL */}

      <Route path="/home" exact>
        <MainScreen />
      </Route>

      <Route path="/plan/:id" exact>
        <PlanScreen />
      </Route>

      <Redirect to="/home" />
    </Switch>
  );
};

export default MainNavigator;
