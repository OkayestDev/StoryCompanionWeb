import React from 'react';
import SettingsUtils from './components/SettingsUtils';
import EmailModal from '../../components/EmailModal';
import ChangePasswordModal from '../../components/ChangePasswordModal.js';
import { connect } from 'react-redux';
import { showAlert, logout } from '../../actions/Actions.js';
import * as settingsActions from '../../actions/SettingsActions.js';
import '../../css/Settings.css';

class Settings extends SettingsUtils {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="full settingsContainer">
                <ChangePasswordModal
                    isChangePasswordModalOpen={this.props.isChangingPassword}
                    onRequestClose={this.props.resetSettings}
                    showAlert={this.props.showAlert}
                    userId={this.props.userId}
                    apiKey={this.props.apiKey}
                />
                <EmailModal
                    isEmailModalOpen={this.props.isSubmittingBug || this.props.isSubmittingFeature}
                    onRequestClose={this.props.resetSettings}
                    title={this.props.isSubmittingFeature ? 'Submitting Feature' : 'Submitting Bug'}
                    placeholder={
                        this.props.isSubmittingFeature
                            ? 'Feature Description...'
                            : 'Bug Description...'
                    }
                    onSend={() =>
                        this.props.isSubmittingFeature ? this.sendFeatureRequest() : this.sendBug()
                    }
                    message={this.props.description}
                    messageOnChange={this.props.handleDescriptionChanged}
                />
                <div>
                    <img src="/logo.png" className="settingsLogo" alt="" />
                </div>
                <div className="settings">
                    <div onClick={this.props.changingPassword} className="button settingsButton">
                        Change Password
                    </div>
                    <div onClick={this.props.submittingBug} className="button settingsButton">
                        Submit a Bug
                    </div>
                    <div onClick={this.props.submittingFeature} className="button settingsButton">
                        Feature Request
                    </div>
                    <div onClick={this.logout} className="button settingsButton">
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.settingsStore,
        email: state.appStore.email,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...settingsActions,
    showAlert,
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
