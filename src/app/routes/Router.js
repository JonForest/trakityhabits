import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Habits from './Habits';
import Dashboard from './Dashboard';
import MaintainHabits from './MaintainHabits';
import MaintainCategories from './MaintainCategories';
import AddHabit from './MaintainHabits/AddHabit';
import EditHabit from './MaintainHabits/EditHabit';
import Login from './Login';
import { getUser } from '../../fire';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getUser() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/:date(\d{4}-\d{1,2}-\d{1,2})">
        <Habits />
      </PrivateRoute>
      <PrivateRoute exact path="/maintain/add">
        <AddHabit />
      </PrivateRoute>
      <PrivateRoute exact path="/maintain/edit/:habitId">
        <EditHabit />
      </PrivateRoute>
      <PrivateRoute path="/maintain">
        <MaintainHabits />
      </PrivateRoute>
      <PrivateRoute path="/categories">
        <MaintainCategories />
      </PrivateRoute>
      <PrivateRoute path="/">
        <Dashboard />
      </PrivateRoute>
    </Switch>
  );
}
