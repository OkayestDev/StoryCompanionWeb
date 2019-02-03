import React from 'react';
import PromptUtils from './components/PromptUtils.js';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import { setStories } from '../../actions/StoryActions.js';
import Icon from 'react-icons-kit';
import EditEntityModal from '../../components/EditEntityModal.js';
import { plus, frownO } from 'react-icons-kit/fa';
import * as promptActions from '../../actions/PromptActions.js';
import '../../css/Prompt.css';

class Prompt extends PromptUtils {
    oneLineInputs = () => [
        {
            name: 'Prompt Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    renderPrompt = () => {
        if (!('prompt' in this.props) || !this.props.prompt) {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        Doesn't look like there are any prompts left!
                        <Icon icon={frownO} size={64} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="promptNameAndButtonContainer">
                        <div className="promptName">{this.props.prompt.name}</div>
                        <div className="buttonContainer">
                            <button
                                className="button promptCreateStoryButton"
                                onClick={this.promptToStory}
                            >
                                Create Story
                            </button>
                            <button
                                className="button promptDownVoteButton"
                                onClick={this.downVotePrompt}
                            >
                                Down Vote
                            </button>
                        </div>
                    </div>
                    <div className="promptDescription">{this.props.prompt.description}</div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="full">
                <Icon
                    className="icon floatRight"
                    icon={plus}
                    size={28}
                    onClick={this.props.newPrompt}
                    data-tip="Create a new note"
                />
                <EditEntityModal
                    isEntityModalOpen={this.props.isPromptModalOpen}
                    selectedId={null}
                    onRequestClose={this.props.resetPrompt}
                    objectName="Prompt"
                    title="Create a Prompt"
                    oneLineInputs={this.oneLineInputs()}
                    multiLineInputs={this.multiLineInputs()}
                    onSave={this.createPrompt}
                    showAlert={this.props.showAlert}
                    saveButtonText="Create Prompt"
                />
                <div className="entityContainer">{this.renderPrompt()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.promptStore,
        stories: state.storyStore.stories,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...promptActions,
    showAlert,
    setStories,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prompt);
