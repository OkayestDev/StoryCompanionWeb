import React, { Component } from 'react';
import Modal from 'react-modal';
import '../css/Confirmation.css';

Modal.setAppElement('body');

const modalStyle = {
    content : {
        top: '10%',
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
        borderWidth: '3px',
        padding: '10px',
    }
};

export default class Confirmation extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                style={modalStyle}
                onRequestClose={() => this.props.onCancel()}
                contentLabel="Confirmation"
                shouldCloseOnOverlayClick={true}
            >
                <div className="confirmation">
                    <div className="confirmationActionContainer">
                        {this.props.action}
                    </div>
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