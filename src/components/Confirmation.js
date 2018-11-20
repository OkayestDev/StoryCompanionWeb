import React, { Component } from 'react';
import '../css/Confirmation.css';

export default class Confirmation extends Component {
    render() {
        return (
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
        );
    }
}