import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { DataStore } from "../data/DataStore";
import "./Index.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': DataStore['username']
        };
    }
    render() {
        const username = this.state.username;
        if (username !== '') {
            return (<Redirect to="/home" />);
        }
        return (
            <div className="Index">
                <div className="lander">
                    <h1>Fun with flags</h1>
                    <p>An application to restructure personal and collaborative task management</p>
                    <p>Please <a href="/login">Login</a> first</p>
                </div>
            </div>
        );
    }
}