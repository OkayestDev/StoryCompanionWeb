import React from 'react';
import CreateAccountUtils from './components/CreateAccountUtils.js';
import { connect } from 'react-redux';
import { showAlert } from '../../store/Actions.js';
import '../../css/CreateAccount.css';

class CreateAccount extends CreateAccountUtils {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
        };
    }

    render() {
        return (
            <div className="createAccountContainer">
                <div className="accountCreateText">Account Creation</div>
                <div className="createAccountInputContainer">
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">Email</div>
                        <input
                            className="input"
                            onChange={newEmail => this.setState({ email: newEmail.target.value })}
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">Confirm Email</div>
                        <input
                            className="input"
                            onChange={newConfirmEmail =>
                                this.setState({ confirmEmail: newConfirmEmail.target.value })
                            }
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">Password</div>
                        <input
                            type="password"
                            className="input"
                            onChange={newPassword =>
                                this.setState({ password: newPassword.target.value })
                            }
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">Confirm Password</div>
                        <input
                            type="password"
                            className="input"
                            onChange={newConfirmPassword =>
                                this.setState({ confirmPassword: newConfirmPassword.target.value })
                            }
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
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccount);
