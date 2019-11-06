import React from "react";
import { Route, Switch } from "react-router-dom";
import Habits from './Habits';
import Dashboard from './Dashboard';

export default function Router() {
  return (
    <Switch>
      <Route path="/:date">
        <Habits />
      </Route>

      <Route path="/">
        <Dashboard />
      </Route>

    </Switch>
  );
}