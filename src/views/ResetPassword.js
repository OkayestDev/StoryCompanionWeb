import React, { Component } from 'react';
import UserRequests from '../utils/UserRequests.js';
import '../css/ResetPassword.css';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.UserRequests = new UserRequests();
    }

    resetPassword = () => {
        this.UserRequests.passwordReset(this.state.email).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert(`Successfully sent temporary password to ${this.state.email}`, "success");
                this.setState({email: ''});
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to reset password at this time", "danger");
        })
    }

    render() {
        return (
            <div className="full resetPasswordContainer">
                <div className="forgotPassword">
                    Forgot Your Password, eh?
                </div>
                <div className="resetPassword">
                    <div className="resetPasswordInputContainer">
                        <div className="resetPasswordLabel">
                            Email
                        </div>
                        <input
                            value={this.state.email}
                            className="resetPasswordInput"
                            onChange={(newEmail) => this.setState({email: newEmail.target.value})}
                        />
                    </div>
                    <div
                        onClick={() => this.resetPassword()}
                        className="button resetPasswordButton"
                    >
                        Send New Password
                    </div>
                </div>
            </div>
        )
    }
}