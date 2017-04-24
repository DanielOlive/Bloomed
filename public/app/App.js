/*
 ./public/app/App.jsx
 */
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import { GlobalNav } from './components/'

const Home = () => (<h1>Home</h1>);
const Settings = () => (<h1>Settings</h1>);
const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <Link to="/dashboard/activities">recent activities</Link>
        <Link to="/dashboard/directory">directory</Link>
    </div>
)

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/menu" children={GlobalNav}></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>
                    <Route path="/dashboard/:section" render={
                        ({match}) => <h2>{match.params.section}</h2>
                    }></Route>
                    <Route path="/settings" component={Settings}></Route>
                </div>
            </Router>
        )
    }
}
