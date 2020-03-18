import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// SCREENS
import AuthScreen from "../screens/Auth/Auth.screen";

const AuthNavigator: React.FC = () => {
  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthScreen />
      </Route>

      <Redirect to="/auth" />
    </Switch>
  );
};

export default AuthNavigator;
