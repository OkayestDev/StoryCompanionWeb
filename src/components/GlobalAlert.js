import React from 'react';
import Icon from 'react-icons-kit';
import { smileO, warning, ban, close } from 'react-icons-kit/fa';
import StoryCompanion from '../utils/StoryCompanion.js';
import { connect } from 'react-redux';
import { showAlert, closeAlert } from '../store/Actions.js';
import '../css/GlobalAlert.css';

// @TODO set timeout for showing global alert
class GlobalAlert extends StoryCompanion {
    figureColor = () => {
        if (this.props.globalAlertType === 'success') {
            return '#4CAF4F';
        } else if (this.props.globalAlertType === 'warning') {
            return '#F5A623';
        } else {
            return '#EB5C52';
        }
    };

    figureIcon = () => {
        if (this.props.globalAlertType === 'success') {
            return smileO;
        } else if (this.props.globalAlertType === 'warning') {
            return warning;
        } else {
            return ban;
        }
    };

    render() {
        if (this.props.showGlobalAlert) {
            return (
                <div className="globalAlert" style={{ backgroundColor: this.figureColor() }}>
                    <div className="globalAlertIconAndMessage">
                        <div>
                            <Icon className="globalAlertIcon" icon={this.figureIcon()} size={40} />
                        </div>
                        <div className="globalAlertMessage">{this.props.globalAlertMessage}</div>
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
            );
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        showGlobalAlert: state.showGlobalAlert,
        globalAlertType: state.globalAlertType,
        globalAlertMessage: state.globalAlertMessage,
    };
}

const mapDispatchToProps = {
    closeAlert,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalAlert);
