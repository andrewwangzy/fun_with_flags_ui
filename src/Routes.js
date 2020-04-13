import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Index from "./containers/Index";
import Register from "./containers/Register";

export default () =>
    <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />

    </Switch>;