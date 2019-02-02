import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import DraftUtils from './components/DraftUtils.js';
import * as draftActions from '../../actions/DraftActions.js';
import EditComponentsNotice from '../../components/EditComponentsNotice.js';
import '../../css/Draft.css';

class Draft extends DraftUtils {
    constructor(props) {
        super(props);
    }

    render() {
        if (
            this.props.selectedStoryId !== null &&
            this.props.selectedDraftId !== 'none' &&
            this.props.selectedDraftId !== null
        ) {
            return (
                <div className="full">
                    <div className="draftActions">
                        <div className="draftAction" onClick={this.exportDraft}>
                            EXPORT
                        </div>
                        <div className="draftAction" onClick={this.editDraft}>
                            SAVE
                        </div>
                    </div>
                    <textarea
                        type="textarea"
                        multiple
                        className="draftInput"
                        value={this.props.description}
                        onChange={value => this.props.handleDescriptionChanged(value.target.value)}
                    />
                </div>
            );
        } else if (this.props.selectedDraftId === null) {
            return (
                <div>
                    <div className="noEntityContainer">
                        <div className="noEntityText">
                            <div>Looks like you haven't started a draft yet.</div>
                            <div className="button startDraftButton" onClick={this.createDraft}>
                                Start A Draft
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <EditComponentsNotice objectName="draft" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.draftStore,
        selectedStoryId: state.storyStore.selectedStoryId,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
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
