import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/fa';
import '../css/GlobalAlert.css';

export default class GlobalAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    figureAlertColor = () => {
        switch(this.props.alertType) {
            case 'danger':
                return 'red';
            case 'warning':
                return 'yellow' // @TODO figure warning color
            case 'success':
                return 'green' // @Todo figure success color
        }
    }

    figureIcon = () => {
        switch(this.props.alertType) {
            case 'danger':
                return // @TODO figure danger icon
            case 'warning':
                return 'yellow' // @TODO figure warning color
            case 'success':
                return check // @Todo figure success color
        }
    }

    render() {
        return (
            <div className="globalAlertContainer">
                <div>

                </div>
            </div>
        )
    }
}