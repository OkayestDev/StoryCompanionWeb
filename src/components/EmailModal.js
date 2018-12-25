import React, { Component } from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import '../css/EmailModal.css';

// Stops console errors
Modal.setAppElement('body');

export default class EmailModal extends Component {
    render() {
        return (
            <Modal
                closeTimeoutMS={400}
                isOpen={this.props.isEmailModalOpen}
                className="modalContainer emailModal"
                contentLabel="Email Modal"
                shouldCloseOnOverlayClick={true}
            >
                <div className="modalHeader">
                    <div className="modalTitle">{this.props.title}</div>
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
                    <textarea
                        placeholder={this.props.placeholder}
                        className="emailMessage"
                        value={this.props.message}
                        onChange={newMessage => this.props.messageOnChange(newMessage.target.value)}
                    />
                    <div className="button" onClick={() => this.props.onSend()}>
                        Send
                    </div>
                </div>
            </Modal>
        );
    }
}
