import React from 'react';
import SettingsUtils from './components/SettingsUtils';
import EmailModal from '../../components/EmailModal';
import ChangePasswordModal from '../../components/ChangePasswordModal.js';
import { connect } from 'react-redux';
import { showAlert, logout } from '../../store/Actions.js';
import '../../css/Settings.css';

class Settings extends SettingsUtils {
    constructor(props) {
        super(props);
        this.state = {
            isEmailModalOpen: false,
            isPasswordChangeModalOpen: false,
            emailType: null,
            emailTitle: 'Submit a Bug',
            message: '',
        };
    }

    openBug = () => {
        this.setState({
            isEmailModalOpen: true,
            emailType: 'bug',
            emailTitle: 'Submitting a Bug',
            message: '',
        });
    };

    openFeature = () => {
        this.setState({
            isEmailModalOpen: true,
            emailType: 'feature',
            emailTitle: 'Submitting a Feature',
            message: '',
        });
    };

    openPassword = () => {
        this.setState({ isChangePasswordModalOpen: true });
    };

    render() {
        return (
            <div className="full settingsContainer">
                <ChangePasswordModal
                    isChangePasswordModalOpen={this.state.isChangePasswordModalOpen}
                    onRequestClose={() => this.setState({ isChangePasswordModalOpen: false })}
                    showAlert={this.props.showAlert}
                    userId={this.props.userId}
                />
                <EmailModal
                    isEmailModalOpen={this.state.isEmailModalOpen}
                    onRequestClose={() => this.setState({ isEmailModalOpen: false })}
                    title={this.state.emailTitle}
                    placeholder={
                        this.state.emailType === 'feature'
                            ? 'Feature Description...'
                            : 'Bug Description...'
                    }
                    onSend={() =>
                        this.state.emailType === 'feature'
                            ? this.sendFeatureRequest()
                            : this.sendBug()
                    }
                    message={this.state.message}
                    messageOnChange={newMessage => this.setState({ message: newMessage })}
                />
                <div>
                    <img src="/logo.png" className="settingsLogo" alt="" />
                </div>
                <div className="settings">
                    <div onClick={() => this.openPassword()} className="button settingsButton">
                        Change Password
                    </div>
                    <div onClick={() => this.openBug()} className="button settingsButton">
                        Submit a Bug
                    </div>
                    <div onClick={() => this.openFeature()} className="button settingsButton">
                        Feature Request
                    </div>
                    <div onClick={() => this.logout()} className="button settingsButton">
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        userId: state.userId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
