import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import Icon from 'react-icons-kit';
import { arrowRight, arrowLeft, plus } from 'react-icons-kit/fa';
import StoryRequests from '../utils/StoryRequests.js';
import ReactTooltip from 'react-tooltip';
import EditEntityModal from './EditEntityModal.js';
import '../css/StoriesList.css';

export default class StoriesList extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.StoryRequests = new StoryRequests();
    }

    defaultState = () => {
        return {
            ...this.state,
            hidden: false,
            isStoryModalOpen: false,
            selectedStoryId: null,
            name: '',
            description: '',
            image: '',
        };
    }

    componentWillMount() {
        super.componentWillMount();
        if (this.isUserLoggedIn()) {
            this.StoryRequests.getStories(this.AppStore.userId);
        }
    }

    createStory = async () => {
        var image = "";
        if (this.state.image.includes("data:image") && this.state.image.includes("base64")) {
            image = await this.uploadToS3(this.state.image, "story");
        }
        else {
            image = this.state.image;
        }

        // Upload image failed. Show alert and reset image
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert("Unable to upload image at this time", "warning");
        }

        let paramsObject = {
            user: this.AppStore.userId, 
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
                this.setState(this.defaultState());
            }
        })
        .catch((error) => {
            this.props.showAlert("Unable to create story at this time", "danger");
        });
    }

    editStory = async () => {

    }

    selectStory = () => {

    }

    render() {
        if (this.isUserLoggedIn() && !this.state.hidden) {
            return (
                <div className="storiesList">
                    <EditEntityModal
                        isEntityModalOpen={this.state.isStoryModalOpen}
                        onRequestClose={() => this.setState({isStoryModalOpen: false})}
                        objectName="Story"
                        title={"Create a Story"}
                        image={this.state.image}
                        imageOnChange={(image) => this.setState({image: image})}
                        description={this.state.description}
                        descriptionOnChange={(newDescription) => this.setState({description: newDescription})}
                        name={this.state.name}
                        nameOnChange={(newName) => this.setState({name: newName})}
                        onSave={() => this.state.selectedStoryId === null ? this.createStory() : this.editStory()}
                        showAlert={this.props.showAlert}
                        saveButtonText={this.state.selectedStoryId === null ? "Create Story" : "Edit Story"}
                    />
                    <div className="storiesListLabel">
                        <Icon
                            className="storiesListIcon"
                            icon={arrowLeft}
                            size={30}
                            data-tip="Close Stories List"
                            onClick={() => {
                                this.setState({hidden: true});
                                this.props.toggleIsStoryListOpen();
                            }}
                        />
                        <div className="storiesListLabelText">
                            Stories
                        </div>
                        <Icon
                            className="storiesListIcon"
                            icon={plus}
                            size={30}
                            data-tip="Create Story"
                            onClick={() => this.setState({isStoryModalOpen: true})}
                        />
                    </div>
                    <ReactTooltip  delayShow={500}/>
                </div>
            )
        }
        else if (this.isUserLoggedIn()) {
            return (
                <div className="hiddenStoriesList">
                    <div className="storiesListClosed">
                        <Icon
                            className="storiesListIcon"
                            icon={arrowRight}
                            size={30}
                            data-tip="Open Stories List"
                            onClick={() => {
                                this.setState({hidden: false})
                                this.props.toggleIsStoryListOpen();                                
                            }}
                        />
                    </div>
                    <ReactTooltip delayShow={500}/>
                </div>
            )
        }
        else {
            return null;
        }
    }
}