import React from "react";
import { Route, Switch } from "react-router-dom";
import Habits from './Habits'
import Dashboard from './Dashboard';

export default function Router() {
  return (
    <Switch>
      <Route path="/:date(\d{4}-\d{1,2}-\d{1,2})" component={Habits} />

      <Route path="/">
        <Dashboard />
      </Route>

    </Switch>
  );
}