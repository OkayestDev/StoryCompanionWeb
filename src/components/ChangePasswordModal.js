import React, { Component } from 'react';
import Modal from 'react-modal';
import UserRequests from '../utils/UserRequests.js';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';

// Stops console errors
Modal.setAppElement('body');

export default class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
        };
        this.UserRequests = new UserRequests();
    }

    changePassword = () => {
        if (this.state.newPassword.length < 6) {
            this.props.showAlert('Please ensure you password is at least 6 characters', 'warning');
            return;
        }

        if (this.state.newPassword !== this.state.confirmPassword) {
            this.props.showAlert('Passwords do not match', 'warning');
            return;
        }

        let paramsObject = {
            password: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
            user: this.props.userId,
            apiKey: this.props.apiKey,
        };
        this.UserRequests.changePassword(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert('Successfully updated password', 'success');
                    this.setState({
                        newPassword: '',
                        confirmPassword: '',
                    });
                    this.props.onRequestClose();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to change password at this time', 'danger');
            });
    };

    render() {
        return (
            <Modal
                closeTimeoutMS={400}
                isOpen={this.props.isChangePasswordModalOpen}
                onRequestClose={() => this.props.onRequestClose()}
                className="modalContainer"
                contentLabel="Change Password Modal"
                shouldCloseOnOverlayClick={true}
            >
                <div className="modalHeader">
                    <div className="modalTitle">Change Password</div>
                    <div className="modalIconContainer">
                        <Icon
                            className="modalCloseIcon hover"
                            icon={close}
                            size={35}
                            onClick={() => this.props.onRequestClose()}
                        />
                    </div>
                </div>
                <div className="modalContent">
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">New Password</div>
                        &nbsp;
                        <input
                            type="password"
                            className="input"
                            onChange={newPassword =>
                                this.setState({ newPassword: newPassword.target.value })
                            }
                        />
                    </div>
                    <div className="inputAndLabelContainer">
                        <div className="inputLabel">Confirm Password</div>
                        &nbsp;
                        <input
                            type="password"
                            className="input"
                            onChange={newPassword =>
                                this.setState({ confirmPassword: newPassword.target.value })
                            }
                        />
                    </div>
                    <div onClick={() => this.changePassword()} className="button">
                        Change Password
                    </div>
                </div>
            </Modal>
        );
    }
}
