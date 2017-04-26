import React from 'react';
import { Link } from 'react-router-dom';
import './_global-navigation.scss';

const GlobalNav = () => (
  <div className="global-navigation">
    <h1>Menu</h1>
    <Link to="/">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/Settings">Settings</Link>
  </div>
);

export default GlobalNav;
