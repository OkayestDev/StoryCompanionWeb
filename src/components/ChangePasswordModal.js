import React, { Component } from 'react';
import Modal from 'react-modal';
import UserRequests from '../utils/UserRequests.js';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';

// Stops console errors
Modal.setAppElement('body');

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '550px',
        height: 'auto',
        overflow: 'visible',
        padding: '0px',
        borderRadius: '8px',
        borderColor: '#CCCCCC',
        borderWidth: '3px',
    },
};

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
                isOpen={this.props.isChangePasswordModalOpen}
                onRequestClose={() => this.props.onRequestClose()}
                style={modalStyle}
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
