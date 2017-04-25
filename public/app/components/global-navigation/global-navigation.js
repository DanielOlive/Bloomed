import React from 'react'
import { Link } from 'react-router-dom'
import './_global-navigation.scss'

export const GlobalNav = () => {
    return (
        <div className="global-navigation">
            <h1>Menu</h1>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/Settings">Settings</Link>
        </div>
    )
}
