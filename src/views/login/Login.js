import React from 'react';
import LoginUtils from './components/LoginUtils.js';
import { connect } from 'react-redux';
import { showAlert, login } from '../../actions/Actions.js';
import { setTags } from '../../actions/TagActions.js';
import '../../css/Login.css';

class Login extends LoginUtils {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <div className="loginContainer">
                <div className="welcomeBack">Welcome Back!</div>
                <form className="login">
                    <div className="loginInputContainer">
                        <div className="loginLabel">Email</div>
                        <div style={{ width: '50%' }}>
                            <input
                                className="loginInput"
                                onChange={newEmail =>
                                    this.setState({ email: newEmail.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="loginInputContainer">
                        <div className="loginLabel">Password</div>
                        <div style={{ width: '50%' }}>
                            <input
                                type="password"
                                className="loginInput"
                                onChange={newPassword =>
                                    this.setState({ password: newPassword.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="loginButton button noSelect" onClick={() => this.login()}>
                        Login
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    showAlert,
    login,
    setTags,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
