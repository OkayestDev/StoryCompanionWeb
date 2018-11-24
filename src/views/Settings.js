import React from 'react';
import StoryCompanion from '../utils/StoryCompanion';
import SettingsRequest from '../utils/SettingsRequests.js';
import UserRequests from '../utils/UserRequests.js';
import EmailModal from '../components/EmailModal';
import ChangePasswordModal from '../components/ChangePasswordModal.js';
import '../css/Settings.css';

export default class Settings extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            isEmailModalOpen: false,
            isPasswordChangeModalOpen: false,
            emailType: null,
            emailTitle: "Submit a Bug",
            message: '',
        }
        this.SettingsRequests = new SettingsRequest();
    }

    openBug = () => {
        this.setState({
            isEmailModalOpen: true,
            emailType: "bug",
            emailTitle: "Submitting a Bug",
            message: '',
        });
    }

    openFeature = () => {
        this.setState({
            isEmailModalOpen: true,
            emailType: "feature",
            emailTitle: "Submitting a Feature",
            message: '',
        });
    }

    sendBug = () => {
        let paramsObject = {
            user: this.props.AppStore.userId,
            description: this.state.message,
        };
        this.SettingsRequests.bug(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully sent bug. Thank you!", "success");
                this.setState({
                    message: '',
                    isEmailModalOpen: false,
                })
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to submit bug at this time", "danger");
        })
    }

    sendFeatureRequest = () => {
        let paramsObject = {
            user: this.props.AppStore.userId,
            description: this.state.message,
        };
        this.SettingsRequests.feature(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully sent feature request. Thank you!", "success");
                this.setState({
                    message: '',
                    isEmailModalOpen: false,
                })
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to submit feature at this time", "danger");
        })
    }

    openPassword = () => {
        this.setState({isChangePasswordModalOpen: true});
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <div className="full settingsContainer">
                <ChangePasswordModal
                    isChangePasswordModalOpen={this.state.isChangePasswordModalOpen}
                    onRequestClose={() => this.setState({isChangePasswordModalOpen: false})}
                    showAlert={this.props.showAlert}
                    AppStore={this.props.AppStore}
                />
                <EmailModal
                    isEmailModalOpen={this.state.isEmailModalOpen}
                    onRequestClose={() => this.setState({isEmailModalOpen: false})}
                    title={this.state.emailTitle}
                    placeholder={this.state.emailType === 'feature' ? "Feature Description..." : "Bug Description..."}
                    onSend={() => (this.state.emailType === 'feature' ? this.sendFeatureRequest() : this.sendBug())}
                    message = {this.state.message}
                    messageOnChange={(newMessage) => this.setState({message: newMessage})}
                />
                <div>
                    <img
                        src="/favicon.ico"
                        className="settingsLogo"
                        alt=""
                    />
                </div>
                <div className="settings">
                    <div
                        onClick={() => this.openPassword()}
                        className="button settingsButton"
                    >
                        Change Password
                    </div>
                    <div
                        onClick={() => this.openBug()}
                        className="button settingsButton"
                    >
                        Submit a Bug
                    </div>
                    <div
                        onClick={() => this.openFeature()}
                        className="button settingsButton"
                    >
                        Feature Request
                    </div>
                    <div
                        onClick={() => this.logout()}
                        className="button settingsButton"
                    >
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}