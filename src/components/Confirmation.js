import React, { Component } from 'react';
import Modal from 'react-modal';
import '../css/Confirmation.css';

Modal.setAppElement('body');

export default class Confirmation extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                className="modalContainer"
                onRequestClose={() => this.props.onCancel()}
                contentLabel="Confirmation"
                shouldCloseOnOverlayClick={true}
            >
                <div className="confirmation">
                    <div className="confirmationActionContainer">{this.props.action}</div>
                    <div className="confirmationButtonContainer">
                        <div
                            className="button confirmationYesButton"
                            onClick={() => this.props.onConfirm()}
                        >
                            Confirm
                        </div>
                        <div
                            className="button confirmationNoButton"
                            onClick={() => this.props.onCancel()}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
