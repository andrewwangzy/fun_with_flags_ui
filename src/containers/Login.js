import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { DataStore, APIUrl } from "../data/DataStore";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toHome: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleLoginResponse = this.handleLoginResponse.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        // alert('Username: ' + this.state.username + ' with password: ' + this.state.password + ' tried to login');
        event.preventDefault();
        fetch(APIUrl + "/user/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        }).then(function (response) {
            return response.json();
        }).then(response => this.handleLoginResponse(response));
    }

    handleLoginResponse (response) {
        if (response['message'] === "OK" &&
            'access_token' in response &&
            'refresh_token' in response
        ) {
            DataStore['username'] = response['username'];
            DataStore['access_token'] = response['access_token'];
            DataStore['refresh_token'] = response['refresh_token'];
            this.setState({toHome: true});
        }
        else {
            alert("Login failed! Msg: " + response['message']);
            console.log(response);
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {
        if (this.state.toHome) {
            return (<Redirect to="/home" />);
        }
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username" bsSize="large">
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bsSize="large">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}