import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { iosBook, iosBookOutline } from 'react-icons-kit/ionicons';
import StoryRequests from '../utils/StoryRequests.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from './EditEntityModal.js';
import StoryListItem from './StoryListItem.js';
import { connect } from 'react-redux';
import { Actions } from '../store/Actions.js';
import '../css/StoriesList.css';

/**
 * @TODO open/closed book for story list
 */
class StoriesList extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.StoryRequests = new StoryRequests();
        this.getStories();
    }

    defaultState = () => {
        return {
            isStoryModalOpen: false,
            selectedStoryId: null,
            isConfirmationOpen: true,
            name: '',
            description: '',
            image: '',
            tag: '',
        };
    }

    componentWillReceiveProps(props) {
        if (this.props.userId !== props.userId) {
            this.getStories();
        }
    }

    getStories = () => {
        if (this.props.userId !== null) {
            let paramsObject = this.createParamsObject();
            this.StoryRequests.getStories(paramsObject).then((res) => {
                if ('error' in res) {
                    this.props.showAlert(res.error, "warning");
                }
                else {
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert("Unable to fetch stories at this time", "danger");
            });
        }
    }

    createStory = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "story", this.props.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.createStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully created new story, " + this.state.name, "success");
                this.setState({...this.defaultState()});
                this.props.setStories(res.success);
            }
        })
        .catch((error) => {
            this.props.showAlert("Unable to create story at this time", "danger");
        });
    }

    editStory = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "story", this.props.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.editStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully edited story, " + this.state.name, "success");
                let tempStories = this.props.stories;
                tempStories[this.state.selectedStoryId] = res.success;
                this.setState({...this.defaultState()});
                this.props.setStories(res.success);
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to edit at this time", "danger");
        });
    }

    deleteStory = (id) => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.deleteStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning")
            }
            else {
                let tempStories = this.props.stories
                delete tempStories[id];
                this.setState({...this.defaultState()});
                this.props.setStories(tempStories);
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to delete story at this time", "danger");
        });
    }

    selectStoryForComponents = (id) => {
        this.props.editStoryComponents(id);
    }

    selectStoryForEdit = (id) => {
        this.setState({
            isStoryModalOpen: true,
            selectedStoryId: id,
            name: this.props.stories[id].name,
            description: this.props.stories[id].description,
            image: this.props.stories[id].image
        })
    }

    newStory = () => {
        this.setState({
            isStoryModalOpen: true,
            selectedStoryId: null,
            name: '',
            description: '',
            image: '',
        });
    }

    renderStories = () => {
        let storiesList = [];
        for (let id in this.props.stories) {
            storiesList.push(
                <div 
                    className={id === this.props.selectedStoryId ? "activeStory" : ""}
                    key={id}
                >
                    <StoryListItem
                        isSelectedStory={id === this.props.selectStoryForEdit}
                        id={id}
                        story={this.props.stories[id]}
                        selectStoryForComponents={() => this.selectStoryForComponents(id)}
                        selectStoryForEdit={() => this.selectStoryForEdit(id)}
                    />
                </div>
            )
        }
        return storiesList;
    }

    render() {
        if (this.isUserLoggedIn() && !this.props.hidden) {
            return (
                <div className="storiesList">
                    <EditEntityModal
                        isEntityModalOpen={this.state.isStoryModalOpen}
                        selectedId={this.state.selectedStoryId}
                        onRequestClose={() => this.setState({isStoryModalOpen: false})}
                        objectName="Story"
                        title={this.state.selectedStoryId === null ? "Create a Story" : "Edit Story"}
                        image={this.state.image}
                        imageOnChange={(image) => this.setState({image: image})}
                        description={this.state.description}
                        descriptionOnChange={(newDescription) => this.setState({description: newDescription})}
                        name={this.state.name}
                        nameOnChange={(newName) => this.setState({name: newName})}
                        onSave={() => this.state.selectedStoryId === null ? this.createStory() : this.editStory()}
                        onDelete={() => this.deleteStory(this.state.selectedStoryId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={this.state.selectedStoryId === null ? "Create Story" : "Edit Story"}
                        deleteButtonText="Delete Story"
                        confirmationAction="Delete Story?"
                    />
                    <div className="storiesListLabel">
                        <Icon
                            className="storiesListIcon"
                            icon={iosBookOutline}
                            size={30}
                            data-tip="Close Stories List"
                            onClick={() => {
                                this.props.toggleIsStoryListOpen();
                            }}
                        />
                        <div className="storiesListLabelText">
                            Stories
                        </div>
                        <Icon
                            className="storiesListIcon"
                            icon={plus}
                            size={28}
                            data-tip="Create Story"
                            onClick={() => this.newStory()}
                        />
                    </div>
                    <div>
                        {this.renderStories()}
                    </div>
                    <ReactTooltip  delayShow={500}/>
                </div>
            )
        }
        else if (this.isUserLoggedIn()) {
            return (
                <div className="hiddenStoriesList">
                        <Icon
                            className="storiesListIcon"
                            icon={iosBook}
                            size={30}
                            data-tip="Open Stories List"
                            onClick={() => {
                                this.props.toggleIsStoryListOpen();                                
                            }}
                        />
                    <ReactTooltip delayShow={500}/>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(StoriesList);