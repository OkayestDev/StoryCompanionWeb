import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import UserRequests from '../utils/UserRequests'
import { connect } from 'react-redux';
import { Actions } from '../store/Actions.js';
import '../css/Login.css';

class Login extends StoryCompanion {
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
        if (this.isUserLoggedIn()) {
            this.props.history.push("/chapters");
        }
    }

    login = () => {
        let paramsObject = this.createParamsObject();
        this.UserRequests.login(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert({
                    globalAlertMessage: res.error, 
                    globalAlertType: "warning"
                });
            }
            else {
                this.props.login(res.success);
                this.props.history.push("/chapters");
            }
        })
        .catch(() => {
            this.props.showAlert({
                globalAlertMessage: "Unable to login at this time",
                globalAlertType: "danger",
            });
        })
    }

    render() {
        return (
            <div className="loginContainer">
                <div className="welcomeBack">
                    Welcome Back!
                </div>
                <form className="login">
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
                </form>
            </div>
        );
    }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(Login);