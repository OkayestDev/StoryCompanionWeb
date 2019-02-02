import React from 'react';
import StoriesListUtils from './components/StoriesListUtils.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { iosBook, iosBookOutline } from 'react-icons-kit/ionicons';
import EditEntityModal from '../EditEntityModal.js';
import StoryListItem from './components/StoryListItem.js';
import { connect } from 'react-redux';
import * as storyActions from '../../actions/StoryActions.js';
import { showAlert } from '../../actions/Actions.js';
import { setTags } from '../../actions/TagActions.js';
import '../../css/StoriesList.css';

/**
 * @TODO open/closed book for story list
 */
class StoriesList extends StoriesListUtils {
    constructor(props) {
        super(props);
    }

    oneLineInputs = () => [
        {
            name: 'Story Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
        {
            name: 'Genre',
            value: this.props.genre,
            onChange: this.props.handleGenreChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Summary',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    renderStories = () => {
        let storiesList = [];
        for (let id in this.props.stories) {
            storiesList.push(
                <div className={id === this.props.selectedStoryId ? 'activeStory' : ''} key={id}>
                    <StoryListItem
                        isSelectedStory={id === this.props.selectStoryForEdit}
                        id={id}
                        story={this.props.stories[id]}
                        selectStoryForComponents={event => this.selectStory(event, id)}
                        selectStoryForEdit={() => this.props.selectStoryForEdit(id)}
                    />
                </div>
            );
        }
        return storiesList;
    };

    render() {
        if (this.isUserLoggedIn() && this.props.isStoryListOpen) {
            return (
                <div className="storiesList">
                    <EditEntityModal
                        isEntityModalOpen={this.props.isStoryModalOpen}
                        selectedId={this.props.selectedStoryIdForEdit}
                        onRequestClose={this.props.closeStoryModal}
                        objectName="Story"
                        title={
                            this.props.selectedStoryIdForEdit === null
                                ? 'Create a Story'
                                : 'Edit Story'
                        }
                        image={this.props.image}
                        imageOnChange={this.props.handleImageChanged}
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                        onSave={() =>
                            this.props.selectedStoryIdForEdit === null
                                ? this.createStory()
                                : this.editStory()
                        }
                        onDelete={() => this.deleteStory(this.props.selectedStoryId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.props.selectedStoryIdForEdit === null
                                ? 'Create Story'
                                : 'Edit Story'
                        }
                        deleteButtonText="Delete Story"
                        confirmationAction="Delete Story?"
                    />
                    <div className="storiesListLabel">
                        <Icon
                            className="storiesListIcon"
                            icon={iosBookOutline}
                            size={30}
                            onClick={() => {
                                this.props.toggleIsStoryListOpen();
                            }}
                        />
                        <div className="storiesListLabelText">Stories</div>
                        <Icon
                            className="storiesListIcon"
                            icon={plus}
                            size={28}
                            data-tip="Create Story"
                            onClick={this.props.newStory}
                        />
                    </div>
                    <div className="entityContainer">{this.renderStories()}</div>
                </div>
            );
        } else if (this.isUserLoggedIn()) {
            return (
                <div className="hiddenStoriesList">
                    <Icon
                        className="storiesListIcon"
                        icon={iosBook}
                        size={30}
                        data-tip="Open Stories List"
                        onClick={this.props.toggleIsStoryListOpen}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.storyStore,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
        tags: state.appStore.tags,
    };
}

const mapDispatchToProps = {
    ...storyActions,
    showAlert,
    setTags,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoriesList);
