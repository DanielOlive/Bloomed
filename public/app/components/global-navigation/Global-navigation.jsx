import React from 'react';
import { Link } from 'react-router-dom';
// import './_global-navigation.scss';
const GlobalNav = () => (
  <div className="global-navigation top-bar">
    <div className="top-bar-title">
      <strong>Bloomed</strong>
    </div>
    <ul className="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/growyourown">Grow Your Own</Link>
      </li>
      <li>
        <Link to="/Settings">Settings</Link>
      </li>
    </ul>
  </div>
);

export default GlobalNav;
