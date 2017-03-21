import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Please respect the alphabetical order
import {
  HomePage,
  Layout,
  NotFoundPage,
  TransactionsPage,
} from '../containers';

const routes = () => (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage} />

    <Route path="/transactions" component={TransactionsPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
