import React from 'react';
import Icon from 'react-icons-kit';
import { smileO, warning, ban, close } from 'react-icons-kit/fa';
import StoryCompanion from '../utils/StoryCompanion.js';
import "../css/GlobalAlert.css";

export default class GlobalAlert extends StoryCompanion {
    figureColor = () => {
        if (this.props.type === "success") {
            return "#4CAF4F"
        }
        else if (this.props.type === "warning") {
            return "#F5A623";
        }
        else {
            return "#EB5C52";
        }
    }

    figureIcon = () => {
        if (this.props.type === "success") {
            return smileO;
        }
        else if (this.props.type === "warning") {
            return warning;
        }
        else {
            return ban;
        }
    }

    render() {
        if (this.props.visible) {
            return (
                <div
                    className="globalAlert"
                    style={{backgroundColor: this.figureColor()}}
                >
                    <div className="globalAlertIconAndMessage">
                        <div>
                            <Icon
                                className="globalAlertIcon"
                                icon={this.figureIcon()}
                                size={40}
                            />
                        </div>
                        <div className="globalAlertMessage">
                            {this.props.message}
                        </div>
                    </div>
                    <div className="globalAlertCloseContainer">
                        <Icon
                            className="globalAlertClose"
                            icon={close}
                            size={40}
                            onClick={() => this.props.closeAlert()}
                        />
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}