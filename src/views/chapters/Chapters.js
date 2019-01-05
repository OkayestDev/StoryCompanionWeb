import React from 'react';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { plus, pencil, envelope } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../store/Actions.js';
import WriteChapter from './components/WriteChapter.js';
import ChaptersUtils from './components/ChaptersUtils.js';
import '../../css/Chapters.css';

class Chapters extends ChaptersUtils {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            description: '',
            content: '',
            selectedChapterId: null,
            isChapterModalOpen: false,
            isWritingChapter: false,
            chapters: null,
        };
    }

    newChapter = () => {
        this.setState({
            isChapterModalOpen: true,
            selectedChapterId: null,
            number: '',
            description: '',
            name: '',
            content: '',
        });
    };

    selectChapterForEdit = id => {
        this.setState({
            isChapterModalOpen: true,
            selectedChapterId: id,
            ...this.state.chapters[id],
        });
    };

    selectChapterForWrite = (event, id) => {
        event.stopPropagation();
        this.setState({
            selectedChapterId: id,
            isWritingChapter: true,
            ...this.state.chapters[id],
        });
    };

    handleChapterContentChanged = value => {
        this.setState({ content: value.target.value });
    };

    renderChapters = () => {
        if (this.state.chapters === null) {
            return null;
        }

        let chapterIds = this.sortEntitiesByNumber(this.state.chapters);
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
                            <div
                                className="chapterWriteContainer"
                                onClick={event => this.selectChapterForWrite(event, id)}
                            >
                                <Icon className="icon" icon={pencil} size={28} />
                            </div>
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
                    <WriteChapter
                        isOpen={this.state.isWritingChapter}
                        chapterContent={this.state.content}
                        chapterName={this.state.name}
                        chapterNumber={this.state.number}
                        writeChapter={this.writeChapter}
                        chapterContentOnChange={this.handleChapterContentChanged}
                        onRequestClose={() => this.setState({ isWritingChapter: false })}
                    />
                    <div className="floatRightContainer">
                        <Icon
                            className="icon exportChaptersIcon"
                            icon={envelope}
                            size={28}
                            onClick={this.exportChapter}
                            data-tip="Export chapters"
                        />
                        <Icon
                            className="icon"
                            icon={plus}
                            size={28}
                            onClick={this.newChapter}
                            data-tip="Create a new chapter"
                        />
                    </div>
                    <div className="entityContainer">{this.renderChapters()}</div>
                </div>
            );
        } else {
            return (
                <div className="editComponentsText">
                    Edit Components of a story to begin creating chapters
                </div>
            );
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
