import React from 'react';
import ResetPasswordUtils from './components/ResetPasswordUtils.js';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import '../../css/ResetPassword.css';

class ResetPassword extends ResetPasswordUtils {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    render() {
        return (
            <div className="full resetPasswordContainer">
                <div className="forgotPassword">Forgot Your Password, eh?</div>
                <div className="resetPassword">
                    <div className="resetPasswordInputContainer">
                        <div className="resetPasswordLabel">Email</div>
                        <input
                            value={this.state.email}
                            className="resetPasswordInput"
                            onChange={newEmail => this.setState({ email: newEmail.target.value })}
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
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
