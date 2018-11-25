import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import DraftRequests from '../utils/DraftRequests.js';
import '../css/Draft.css';

export default class Draft extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            draft: 'none',
            description: '',
            selectedStoryId: null,
        };
        this.DraftRequests = new DraftRequests();
        this.getDraft();
    }

    componentWillReceiveProps(props) {
        if (this.state.selectedStoryId !== props.AppStore.selectedStoryId) {
            this.getDraft();
        }
    }

    getDraft() {
        if (this.props.AppStore.selectedStoryId !== null) {
            this.DraftRequests.getDrafts(this.props.AppStore.selectedStoryId).then((res) => {
                if ('error' in res) {
                    this.props.showAlert(res.error, "warning");
                }
                else {
                    if ('id' in res.success) {
                        this.setState({
                            draft: res.success.id,
                            description: res.success.description,
                            selectedStoryId: this.props.AppStore.selectedStoryId,
                        });
                    }
                    else {
                        this.setState({
                            draft: null,
                            selectedStoryId: this.props.AppStore.selectedStoryId,
                        });
                    }
                }
            })
            .catch(() => {
                this.props.showAlert("Unable to fetch draft at this time", "danger");
            });
        }
    }

    createDraft = () => {
        let paramsObject = {
            story: this.props.AppStore.selectedStoryId,
            description: '',
        };
        this.DraftRequests.createDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.setState({
                    draft: res.success.id,
                    description: res.success.description
                });
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to create a draft at this time", "danger");
        })
    }

    editDraft = () => {
        let paramsObject = {
            description: this.state.description,
            draft: this.state.draft,
        };
        this.DraftRequests.editDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully saved draft", "success");
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to edit draft at this time", "danger");
        })
    }

    exportDraft = () => {
        this.DraftRequests.exportDraft(this.state.draft).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert(`Successfully emailed draft to ${this.props.AppStore.email}`, "success");
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to export draft at this time", "danger");
        })
    }

    render() {
        console.info(`draft`, this.state.draft);
        if (this.props.AppStore.selectedStoryId !== null && this.state.draft !== null) {
            return (
                <div className="full">
                    <div className="draftActions">
                        <div 
                            className="draftAction"
                            onClick={() => this.exportDraft()}
                        >
                            EXPORT
                        </div>
                        <div 
                            className="draftAction"
                            onClick={() => this.editDraft()}
                        >
                            SAVE
                        </div>
                    </div>
                    <textarea
                        type="textarea"
                        multiple
                        className="draftInput"
                        value={this.state.description}
                        onChange={(newDraft) => this.setState({description: newDraft.target.value})}
                    />
                </div>
            )
        }
        else if (this.state.draft === null) {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>
                            Looks like you haven't started a draft yet.
                        </div>
                        <div
                            className="button startDraftButton"
                            onClick={() => this.createDraft()}
                        >
                            Start A Draft
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}