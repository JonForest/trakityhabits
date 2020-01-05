import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Habits from './Habits';
import Dashboard from './Dashboard';
import MaintainHabits from './MaintainHabits';
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
      <Route path="/:date(\d{4}-\d{1,2}-\d{1,2})" component={Habits} />
      <Route exact path="/maintain/add" component={AddHabit} />
      <Route exact path="/maintain/edit/:habitId" component={EditHabit} />
      <Route path="/maintain" component={MaintainHabits} />
      <PrivateRoute path="/">
        <Dashboard />
      </PrivateRoute>
    </Switch>
  );
}

function requireAuth(nextState, replace, next) {
  console.log('In rewquireAuth');
  if (!getUser()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  next();
}
