import React from 'react';
import StoryCompanion from '../utils/StoryCompanion';
import SettingsRequest from '../utils/SettingsRequests.js';
import UserRequests from '../utils/UserRequests.js';
import '../css/Settings.css';
import EmailModal from '../components/EmailModal';

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
        this.UserRequests = new UserRequests();
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
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to submit feature at this time", "danger");
        })
    }

    openPassword = () => {

    }

    changePassword = () => {

    }

    logout = () => {
        localStorage.clear();
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <div className="full settingsContainer">
                <EmailModal
                    isEmailModalOpen={this.state.isEmailModalOpen}
                    onRequestClose={() => this.setState({isEmailModalOpen: false})}
                    title={this.state.emailTitle}
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