import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import { iosBook, iosBookOutline } from 'react-icons-kit/ionicons';
import StoryRequests from '../utils/StoryRequests.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from './EditEntityModal.js';
import StoryListItem from './StoryListItem.js';
import '../css/StoriesList.css';

export default class StoriesList extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.StoryRequests = new StoryRequests();
    }

    defaultState = () => {
        return {
            isStoryModalOpen: false,
            selectedStoryIdForEdit: null,
            isConfirmationOpen: true,
            name: '',
            description: '',
            image: '',
        };
    }

    componentWillMount() {
        if (this.props.AppStore.userId !== null || this.props.AppStore.userId === '') {
            this.StoryRequests.getStories(this.props.AppStore.userId).then((res) => {
                this.props.AppStore.setValue({stories: res.success});
                this.props.updateAppStore(this.props.AppStore);
            });
        }
    }

    createStory = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "story", this.props.AppStore.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = {
            user: this.props.AppStore.userId, 
            name: this.state.name,
            description: this.state.description,
            image: image,
        }
        this.StoryRequests.createStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully created new story, " + this.state.name, "success");
                this.props.AppStore.setValue({stories: res.success});
                this.props.updateAppStore(this.props.AppStore);
                this.setState(this.defaultState());
            }
        })
        .catch((error) => {
            this.props.showAlert("Unable to create story at this time", "danger");
        });
    }

    editStory = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "story", this.props.AppStore.userId);
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = {
            story: this.state.selectedStoryIdForEdit,
            user: this.props.AppStore.userId, 
            name: this.state.name,
            description: this.state.description,
            image: image,
        }

        this.StoryRequests.editStory(paramsObject).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning");
            }
            else {
                this.props.showAlert("Successfully edited story, " + this.state.name, "success");
                this.props.AppStore.stories[this.state.selectedStoryIdForEdit] = res.success;
                this.props.updateAppStore(this.props.AppStore);
                this.setState(this.defaultState());
            }
        })
        .catch((error) => {
            this.props.showAlert("Unable to edit at this time", "danger");
        });
    }

    deleteStory = (id) => {
        this.StoryRequests.deleteStory(id).then((res) => {
            if ('error' in res) {
                this.props.showAlert(res.error, "warning")
            }
            else {
                delete this.props.AppStore.stories[id];
                this.props.updateAppStore(this.props.AppStore);
                this.setState(this.defaultState());
            }
        })
        .catch(() => {
            this.props.showAlert("Unable to delete story at this time", "danger");
        });
    }

    selectStoryForComponents = (id) => {
        this.props.AppStore.setValue({selectedStoryId: id});
        this.props.updateAppStore(this.props.AppStore);
    }

    selectStoryForEdit = (id) => {
        this.setState({
            isStoryModalOpen: true,
            selectedStoryIdForEdit: id,
            name: this.props.AppStore.stories[id].name,
            description: this.props.AppStore.stories[id].description,
            image: this.props.AppStore.stories[id].image
        })
    }

    newStory = () => {
        this.setState({
            isStoryModalOpen: true,
            selectedStoryIdForEdit: null,
            name: '',
            description: '',
            image: '',
        });
    }

    renderStories = () => {
        let storiesList = [];
        for (let id in this.props.AppStore.stories) {
            storiesList.push(
                <div 
                    className={id === this.props.AppStore.selectedStoryId ? "activeStory" : ""}
                    key={id}
                >
                    <StoryListItem
                        isSelectedStory={id === this.props.AppStore.selectStoryForEdit}
                        id={id}
                        story={this.props.AppStore.stories[id]}
                        selectStoryForComponents={() => this.selectStoryForComponents(id)}
                        selectStoryForEdit={() => this.selectStoryForEdit(id)}
                    />
                </div>
            )
        }
        return storiesList;
    }

    render() {
        if (this.props.isUserLoggedIn() && !this.props.hidden) {
            return (
                <div className="storiesList">
                    <EditEntityModal
                        isEntityModalOpen={this.state.isStoryModalOpen}
                        selectedId={this.state.selectedStoryIdForEdit}
                        onRequestClose={() => this.setState({isStoryModalOpen: false})}
                        objectName="Story"
                        title={this.state.selectedStoryIdForEdit === null ? "Create a Story" : "Edit Story"}
                        image={this.state.image}
                        imageOnChange={(image) => this.setState({image: image})}
                        description={this.state.description}
                        descriptionOnChange={(newDescription) => this.setState({description: newDescription})}
                        name={this.state.name}
                        nameOnChange={(newName) => this.setState({name: newName})}
                        onSave={() => this.state.selectedStoryIdForEdit === null ? this.createStory() : this.editStory()}
                        onDelete={() => this.deleteStory(this.state.selectedStoryIdForEdit)}
                        showAlert={this.props.showAlert}
                        saveButtonText={this.state.selectedStoryIdForEdit === null ? "Create Story" : "Edit Story"}
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
        else if (this.props.isUserLoggedIn()) {
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