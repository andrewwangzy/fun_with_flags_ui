import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import {APIUrl /*, DataStore */} from "../data/DataStore";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            nickname: '',
            password: '',
            const_email: '',
            const_username: '',
            const_nickname: '',
            const_password: '',
            registerSuccess: false,
            user_id: -1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleRegisterResponse = this.handleRegisterResponse.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState((state) => ({
            const_email: state.email,
            const_username: state.username,
            const_nickname: state.nickname,
            const_password: state.password
        }), () => fetch(APIUrl + "/user/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.const_username,
                "nickname": this.state.const_nickname,
                "password": this.state.const_password,
                "email": this.state.const_email
            })
        }).then(function (response) {
            return response.json();
        }).then(response => this.handleRegisterResponse(response)));
    }

    handleRegisterResponse (response) {
        if (response['message'] === "OK" &&
            'user_id' in response
        ) {
            this.setState({
                registerSuccess: true,
                user_id: response['user_id']
            });
        }
        else {
            alert("Register failed! Message: " + response['message']);
        }
    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.username.length > 0 &&
            this.state.password.length > 0;
    }

    render() {
        let registerSuccessNotify;
        if (this.state.registerSuccess) {
            registerSuccessNotify =
                <div>
                    <p>Congratulations! You registered up successfully to be No. {this.state.user_id} user of Fun with flags! </p>
                    <p>Registered with username: {this.state.const_username} and email: {this.state.const_email}.</p>
                    <p>Please login <a href="/login">here</a>.</p>
                </div>;
        }
        else {
            registerSuccessNotify = <div></div>;
        }
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email" bsSize="large">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
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
                    <Form.Group controlId="nickname" bsSize="large">
                        <Form.Label>
                            Nickname
                        </Form.Label>
                        <Form.Control
                            autoFocus
                            type="nickname"
                            value={this.state.nickname}
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
                        Signup
                    </Button>
                </Form>
                <div>
                    {registerSuccessNotify}
                </div>
            </div>
        );
    }
}