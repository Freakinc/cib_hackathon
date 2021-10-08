import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Pages from '../pages';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/reports" component={Pages.Users} />
      <Route path="/reports/:id" component={Pages.Reports} />
      <Route path="/map" component={Pages.Map} />
    </Switch>
  );
};

export default Routes;
