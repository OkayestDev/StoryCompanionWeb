import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import UserRequests from '../utils/UserRequests'
import '../css/Login.css';

export default class Login extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            email: '',
            password: '',
        }
        this.UserRequests = new UserRequests();
        window.addEventListener('keydown', this.handleEnterKey);
    }

    handleEnterKey = (event) => {
        if (event.key === "Enter") {
            this.login();
        }
    }

    componentWillMount() {
        if (this.props.isUserLoggedIn()) {
            this.props.history.push("/chapters");
        }
    }

    login = () => {
        this.UserRequests.login(this.state.email, this.state.password).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.AppStore.setValue(res.success);
                this.props.updateAppStore(this.props.AppStore);
                this.props.history.push("/chapters");
            }
        })
        .catch((error) => {
            this.props.showAlert(
                "Unable to login at this time",
                "danger"
            );
        })
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
                                onChange={(newEmail) => this.setState({email: newEmail.target.value})}
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
                        onClick={() => this.login()}
                    >
                        Login
                    </div>
                </div>
            </div>
        );
    }
}