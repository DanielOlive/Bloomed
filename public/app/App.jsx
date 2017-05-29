import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import {
  GlobalNav,
  Footer,
  GrowYourOwn,
  ProductOverview,
  NotFound
} from './components/index';

const Home = () => <h1>Home</h1>;
const Settings = () => <h1>Settings</h1>;
const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Link to="/dashboard/activities">recent activities</Link>
    <Link to="/dashboard/directory">directory</Link>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Route path="/menu" children={GlobalNav} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/growyourown" component={GrowYourOwn} />
        <Route
          path="/growyourown/:section"
          render={({ match }) => (
            <ProductOverview params={match.params.section} />
          )}
        />
        <Route
          path="/dashboard/:section"
          render={({ match }) => <h6>{match.params.section}</h6>}
        />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
      <Route path="/footer" children={Footer} />
    </div>
  </Router>
);

export default App;
