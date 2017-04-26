import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import { GlobalNav, Footer } from './components/index';

const Home = () => (<h1>Home</h1>);
const Settings = () => (<h1>Settings</h1>);
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
      <Route path="/footer" children={Footer} />
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/:section" render={({ match }) => <h2>{ match.params.section }</h2>} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>
);

export default App;
