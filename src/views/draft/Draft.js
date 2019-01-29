import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import DraftUtils from './components/DraftUtils.js';
import * as draftActions from '../../actions/DraftActions.js';
import '../../css/Draft.css';

class Draft extends DraftUtils {
    constructor(props) {
        super(props);
        this.state = {
            selectedDraftId: 'none',
            description: '',
        };
    }

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
            return (
                <div className="editComponentsText">
                    Edit Components of a story to begin creating a draft
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.draftStore,
        selectedStoryId: state.selectedStoryId,
        email: state.email,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    ...draftActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Draft);
