import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from "./pages/login/Login"
import Home from "./pages/home/Home";
import Marks from "./pages/marks/Marks";
import Student from "./pages/students/Student";
import PageNotFound from "./pages/PageNotFound";

class App extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path={ '/' } component={ Login }/>
                    <Route path={ '/home' } component={ Home }/>
                    <Route path={ '/marks' } component={ Marks }/>
                    <Route path={ '/student' } component={ Student }/>
                    <Route component={ PageNotFound }/>
                </Switch>
            </Router>
        );
    }
}

export default App;
