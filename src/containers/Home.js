import React, { Component } from "react";
import { DataStore } from "../data/DataStore";
import "./Home.css";
import {Redirect} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': DataStore['username'],
            'access_token': DataStore['access_token']
        };
    }
    render() {
        const username = this.state.username;
        if (username === '') {
            return (<Redirect to="/" />);
        }
        return (
            <div className="Home">
                <div>User {this.state.username}'s homepage</div>
            </div>
        );
    }
}