import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import UserRequests from '../utils/UserRequests.js';
import '../css/CreateAccount.css';

export default class CreateAccount extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
        }
        this.UserRequests = new UserRequests();
    }

    componentWillMount() {
        if (this.props.isUserLoggedIn()) {
            this.props.history.push("/chapters");
        }
    }

    createAccount = () => {
        this.UserRequests.createAccount(this.state.email, this.state.password).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully created account. Logging you in now!", "success");
                setTimeout(() => {
                    this.UserRequests.login(this.state.email, this.state.password).then((res) => {
                        if ('error' in res) {
                            this.props.showAlert(res.error, "warning");
                        }
                        else {
                            this.props.AppStore.setValue(res.success);
                            this.props.updateAppStore(this.AppStore);
                            this.props.history.push("/chapters");
                        }
                    })
                    .catch(() => {
                        this.props.showAlert("Unable to login at this time", "danger");
                    });
                }, 2000);
            }
        })
        .catch((error) => {
            this.props.showAlert("Unable to create account at this time", "danger");
        });
    }

    render() {
        return (
            <div className="createAccountContainer">
                <div className="accountCreateText">
                    Account Creation
                </div>
                <div className="createAccountInputContainer">
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">
                            Email
                        </div>
                        <input
                            className="input"
                            onChange={(newEmail) => this.setState({email: newEmail.target.value})}
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">
                            Confirm Email
                        </div>
                        <input
                            className="input"
                            onChange={(newConfirmEmail) => this.setState({confirmEmail: newConfirmEmail.target.value})}
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">
                            Password
                        </div>
                        <input
                            type="password"
                            className="input"
                            onChange={(newPassword) => this.setState({password: newPassword.target.value})}
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">
                            Confirm Password
                        </div>
                        <input
                            type="password"
                            className="input"
                            onChange={(newConfirmPassword) => this.setState({confirmPassword: newConfirmPassword.target.value})}
                        />
                    </div>
                    <div
                        className="button createAccountButton"
                        onClick={() => this.createAccount()}
                    >
                        Create Account
                    </div>
                </div>
            </div>
        )
    }
}