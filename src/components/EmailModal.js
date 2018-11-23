import React, { Component } from 'react';
import Modal from 'react-modal';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/fa';
import '../css/EmailModal.css';

// Stops console errors
Modal.setAppElement('body');

const modalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '550px',
        height:  'auto',
        overflow: 'visible',
        padding: '0px',
        borderRadius: '8px',
        borderColor: '#CCCCCC',
        borderWidth: '3px'
    }
};

export default class EmailModal extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.isEmailModalOpen}
                style={modalStyle}
                contentLabel="Email Modal"
                shouldCloseOnOverlayClick={true}
            >
                <div className="modalHeader">
                    <div className="modalTitle">
                        {this.props.title}
                    </div>
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
                        placeholder="Bug Description..."
                        className="emailMessage"
                        value={this.props.message}
                        onChange={(newMessage) => this.props.messageOnChange(newMessage.target.value)}
                    />
                    <div 
                        className="button"
                        onClick={() => this.props.onSend()}
                    >
                        Send
                    </div>
                </div>
            </Modal>
        )
    }
}