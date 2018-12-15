import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import DraftRequests from '../utils/DraftRequests.js';
import { connect } from 'react-redux';
import { showAlert } from '../store/Actions.js';
import '../css/Draft.css';

class Draft extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            selectedDraftId: 'none',
            description: '',
        };
        this.DraftRequests = new DraftRequests();
        this.getDraft();
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getDraft();
        }
    }

    getDraft() {
        if (this.props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject();
            this.DraftRequests.getDrafts(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        if ('id' in res.success) {
                            this.setState({
                                selectedDraftId: res.success.id,
                                description: res.success.description,
                            });
                        } else {
                            this.setState({
                                selectedDraftId: null,
                                description: '',
                            });
                        }
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch draft at this time', 'danger');
                });
        }
    }

    createDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.createDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        selectedDraftId: res.success.id,
                        description: res.success.description,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create a draft at this time', 'danger');
            });
    };

    editDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert('Successfully saved draft', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit draft at this time', 'danger');
            });
    };

    exportDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.exportDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        `Successfully emailed draft to ${this.props.email}`,
                        'success'
                    );
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export draft at this time', 'danger');
            });
    };

    render() {
        if (
            this.props.selectedStoryId !== null &&
            this.state.selectedDraftId !== 'none' &&
            this.state.selectedDraftId !== null
        ) {
            return (
                <div className="full">
                    <div className="draftActions">
                        <div className="draftAction" onClick={() => this.exportDraft()}>
                            EXPORT
                        </div>
                        <div className="draftAction" onClick={() => this.editDraft()}>
                            SAVE
                        </div>
                    </div>
                    <textarea
                        type="textarea"
                        multiple
                        className="draftInput"
                        value={this.state.description}
                        onChange={newDraft => this.setState({ description: newDraft.target.value })}
                    />
                </div>
            );
        } else if (this.state.selectedDraftId === null) {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't started a draft yet.</div>
                        <div className="button startDraftButton" onClick={() => this.createDraft()}>
                            Start A Draft
                        </div>
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
        selectedStoryId: state.selectedStoryId,
        email: state.email,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Draft);
