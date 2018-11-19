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
                    <div>
                        here
                    </div> 
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}