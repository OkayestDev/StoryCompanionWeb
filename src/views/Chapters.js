import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import ChapterRequests from '../utils/ChapterRequests.js';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../store/Actions.js';
import '../css/Chapters.css';

class Chapters extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            description: '',
            selectedChapterId: null,
            isChapterModalOpen: false,
            chapters: null,
        };
        this.ChapterRequests = new ChapterRequests();
        this.getChapters();
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getChapters();
        }
    }

    getChapters = () => {
        if (this.props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject();
            this.ChapterRequests.getChapters(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.setState({
                            chapters: res.success,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch chapters at this time', 'danger');
                });
        }
    };

    createChapter = () => {
        if (!this.validateChapter()) {
            return;
        }

        const paramsObject = this.createParamsObject();
        this.ChapterRequests.createChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        chapters: res.success,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create Chapter at this time', 'danger');
            });
    };

    editChapter = () => {
        if (!this.validateChapter()) {
            return;
        }

        const paramsObject = this.createParamsObject();
        this.ChapterRequests.editChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.state.chapters;
                    tempChapters[this.state.selectedChapterId] = res.success;
                    this.setState({
                        chapters: tempChapters,
                        name: '',
                        description: '',
                        number: '',
                        selectedChapterId: null,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit chapter at this time', 'danger');
            });
    };

    deleteChapter = id => {
        const paramsObject = {
            chapter: id,
        };
        this.ChapterRequests.deleteChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.state.chapters;
                    delete tempChapters[id];
                    this.setState({
                        chapters: tempChapters,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete chapter at this time', 'danger');
            });
    };

    validateChapter = () => {
        if (isNaN(this.state.number)) {
            this.props.showAlert('Please provide a number for the chapter', 'warning');
            return false;
        }

        if (this.state.name === '') {
            this.props.showAlert('Please provide a name for the chapter', 'warning');
            return false;
        }
        return true;
    };

    sortIdsByChapterNumber = chapters => {
        let chapterIds = Object.keys(chapters);
        if (chapterIds.length <= 0) {
            return [];
        }
        chapterIds.sort(function(a, b) {
            return chapters[a].number - chapters[b].number;
        });
        return chapterIds;
    };

    newChapter = () => {
        this.setState({
            isChapterModalOpen: true,
            selectedChapterId: null,
            number: '',
            description: '',
            name: '',
        });
    };

    selectChapterForEdit = id => {
        this.setState({
            isChapterModalOpen: true,
            selectedChapterId: id,
            number: this.state.chapters[id].number,
            description: this.state.chapters[id].description,
            name: this.state.chapters[id].name,
        });
    };

    renderChapters = () => {
        if (this.state.chapters === null) {
            return null;
        }

        let chapterIds = this.sortIdsByChapterNumber(this.state.chapters);
        if (chapterIds.length > 0) {
            let renderedChapters = [];
            chapterIds.forEach(id => {
                renderedChapters.push(
                    <div
                        className="chapterContainer"
                        onClick={() => this.selectChapterForEdit(id)}
                        key={id}
                    >
                        <div className="chapterNumberAndNameContainer">
                            <div className="chapterNumber">{this.state.chapters[id].number}.</div>
                            <div className="chapterName">{this.state.chapters[id].name}</div>
                        </div>
                        <div className="chapterDescription">
                            {this.state.chapters[id].description}
                        </div>
                    </div>
                );
            });
            return renderedChapters;
        } else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't created any chapters yet.</div>
                        <div>
                            Press on the &nbsp;
                            <Icon icon={plus} size={30} />
                            &nbsp; to create a new chapter.
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        if (this.props.selectedStoryId !== null) {
            return (
                <div className="full">
                    <ReactTooltip delay={500} />
                    <EditEntityModal
                        isEntityModalOpen={this.state.isChapterModalOpen}
                        selectedId={this.state.selectedChapterId}
                        onRequestClose={() => this.setState({ isChapterModalOpen: false })}
                        objectName="Chapter"
                        title={
                            this.state.selectedChapterId === null
                                ? 'Create a Chapter'
                                : 'Edit Chapter'
                        }
                        description={this.state.description}
                        descriptionOnChange={newDescription =>
                            this.setState({ description: newDescription })
                        }
                        name={this.state.name}
                        nameOnChange={newName => this.setState({ name: newName })}
                        number={this.state.number}
                        numberOnChange={newNumber => this.setState({ number: newNumber })}
                        onSave={() =>
                            this.state.selectedChapterId === null
                                ? this.createChapter()
                                : this.editChapter()
                        }
                        onDelete={() => this.deleteChapter(this.state.selectedChapterId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.state.selectedChapterId === null
                                ? 'Create Chapter'
                                : 'Edit Chapter'
                        }
                        deleteButtonText="Delete Chapter"
                        confirmationAction="Delete Chapter?"
                    />
                    <Icon
                        className="icon floatRight"
                        icon={plus}
                        size={28}
                        onClick={() => this.newChapter()}
                        data-tip="Create a new chapter"
                    />
                    <div className="full">{this.renderChapters()}</div>
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
        userId: state.userId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chapters);
