import React, { Component } from 'react';
import UserRequests from '../utils/UserRequests'
import '../css/Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.UserRequests = new UserRequests();
    }

    login = () => {
        
    }

    render() {
        return (
            <div className="loginContainer">
                <div className="welcomeBack">
                    Welcome Back!
                </div>
                <div className="login">
                    <div className="loginInputContainer">
                        <div className="loginLabel">
                            Email
                        </div>
                        <div style={{width: '50%'}}>
                            <input
                                className="loginInput"
                                onChange={(newEmail) => this.setState({password: newEmail.target.value})}
                            />
                        </div>
                    </div>
                    <div className="loginInputContainer">
                        <div className="loginLabel">
                            Password
                        </div>
                        <div style={{width: '50%'}}>
                            <input
                                type="password"
                                className="loginInput"
                                onChange={(newPassword) => this.setState({password: newPassword.target.value})}
                            />
                        </div>
                    </div>
                    <div 
                        className="loginButton button noSelect"
                        onClick={() => this.login}
                    >
                        Login
                    </div>
                </div>
            </div>
        );
    }
}