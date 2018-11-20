import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import ChapterRequests from '../utils/ChapterRequests.js';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa';
import '../css/Chapters.css';

/**
 * More elegant way to create chapters
 */
export default class Chapters extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            description: '',
            selectedChapterIdForEdit: null,
            isChapterModalOpen: false,
        }
        this.ChapterRequests = new ChapterRequests();
        this.getChapters();
    }

    componentWillReceiveProps(props) {
        if (this.state.selectedStoryId !== props.AppStore.selectedStoryId) {
            this.getChapters();
        }
    }

    getChapters = () => {
        if (this.props.AppStore.selectedStoryId !== null) {
            this.ChapterRequests.getChapters(this.props.AppStore.selectedStoryId).then((res) => {
                if ('error' in res) {
                    this.props.showAlert(res.error, "warning");
                }
                else {
                    this.props.AppStore.setValue({chapters: res.success});
                    this.props.updateAppStore(this.props.AppStore);
                    this.setState({selectedStoryId: this.props.AppStore.selectedStoryId})
                }
            })
            .catch(() => {
                this.props.showAlert("Unable to fetch chapters at this time", "danger");
            });
        }
    }

    createChapter = () => {
        
    }

    editChapter = () => {

    }

    deleteChapter = () => {

    }

    render() {
        if (this.props.AppStore.selectedStoryId !== null) {
            return (
                <div>
                    <EditEntityModal
                        isEntityModalOpen={this.state.isChapterModalOpen}
                        selectedId={this.state.selectedChapterIdForEdit}
                        onRequestClose={() => this.setState({isChapterModalOpen: false})}
                        objectName="Chapter"
                        title={this.state.selectedChapterIdForEdit === null ? "Create a Chapter" : "Edit Chapter"}
                        description={this.state.description}
                        descriptionOnChange={(newDescription) => this.setState({description: newDescription})}
                        name={this.state.name}
                        nameOnChange={(newName) => this.setState({name: newName})}
                        number={this.state.number}
                        numberOnChange={(newNumber) => this.setState({number: newNumber.target.value})}
                        onSave={() => this.state.selectedChapterIdForEdit === null ? this.createChapter() : this.editChapter()}
                        onDelete={() => this.deleteChapter(this.state.selectedChapterIdForEdit)}
                        showAlert={this.props.showAlert}
                        saveButtonText={this.state.selectedChapterIdForEdit === null ? "Create Chapter" : "Edit Chapter"}
                        deleteButtonText="Delete Chapter"
                        confirmationAction="Delete Chapter?"
                    />
                    <Icon
                        className="icon"
                        icon={plus}
                        size={28}
                        onClick={() => this.setState({isChapterModalOpen: true})}
                    />
                </div>
            )
        }
        else {
            return null;
        }
    }
}