import React from 'react';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { plus, pencil, envelope } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as chapterActions from '../../actions/ChapterActions.js';
import WriteChapter from './components/WriteChapter.js';
import ChaptersUtils from './components/ChaptersUtils.js';
import '../../css/Chapters.css';

class Chapters extends ChaptersUtils {
    constructor(props) {
        super(props);
    }

    renderChapters = () => {
        if (this.props.chapters === null) {
            return null;
        }

        let chapterIds = this.sortEntitiesByNumber(this.props.chapters);
        if (chapterIds.length > 0) {
            let renderedChapters = [];
            chapterIds.forEach(id => {
                renderedChapters.push(
                    <div
                        className="chapterContainer"
                        onClick={() => this.props.selectChapter(id)}
                        key={id}
                    >
                        <div className="chapterNumberAndNameContainer">
                            <div className="chapterNumber">{this.props.chapters[id].number}.</div>
                            <div className="chapterName">{this.props.chapters[id].name}</div>
                            <div
                                className="chapterWriteContainer"
                                onClick={event => this.selectChapterForWriteContent(event, id)}
                            >
                                <Icon className="icon" icon={pencil} size={28} />
                            </div>
                        </div>
                        <div className="chapterDescription">
                            {this.props.chapters[id].description}
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
                        isEntityModalOpen={this.props.isChapterModalOpen}
                        selectedId={this.props.selectedChapterId}
                        onRequestClose={this.props.resetChapter}
                        objectName="Chapter"
                        title={
                            this.props.selectedChapterId === null
                                ? 'Create a Chapter'
                                : 'Edit Chapter'
                        }
                        description={this.props.description}
                        descriptionOnChange={this.props.handleDescriptionChanged}
                        name={this.props.name}
                        nameOnChange={this.props.handleNameChanged}
                        number={this.props.number}
                        numberOnChange={this.props.handleNumberChanged}
                        onSave={() =>
                            this.props.selectedChapterId === null
                                ? this.createChapter()
                                : this.editChapter()
                        }
                        onDelete={() => this.deleteChapter(this.props.selectedChapterId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.props.selectedChapterId === null
                                ? 'Create Chapter'
                                : 'Edit Chapter'
                        }
                        deleteButtonText="Delete Chapter"
                        confirmationAction="Delete Chapter?"
                    />
                    <WriteChapter
                        isOpen={this.props.isWritingChapter}
                        chapterContent={this.props.content}
                        chapterName={this.props.name}
                        chapterNumber={this.props.number}
                        writeChapter={this.writeChapter}
                        chapterContentOnChange={this.handleChapterContentChanged}
                        onRequestClose={this.props.closeChapterContentModal}
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

function mappropsToProps(props) {
    return {
        ...props.chaptersStore,
        selectedStoryId: props.appStore.selectedStoryId,
        userId: props.appStore.userId,
        apiKey: props.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...chapterActions,
    showAlert,
};

export default connect(
    mappropsToProps,
    mapDispatchToProps
)(Chapters);
