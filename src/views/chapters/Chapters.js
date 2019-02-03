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
import EditComponentsNotice from '../../components/EditComponentsNotice.js';
import '../../css/Chapters.css';

class Chapters extends ChaptersUtils {
    constructor(props) {
        super(props);
    }

    oneLineInputs = () => [
        {
            name: 'Chapter Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
        {
            name: 'Chapter Number',
            value: this.props.number,
            onChange: this.props.handleNumberChanged,
            type: 'numeric',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

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
                                onClick={event => this.selectChapterToWriteContent(event, id)}
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
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
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
                        handleContentChanged={this.props.handleContentChanged}
                        onRequestClose={this.props.closeChapterContentModal}
                    />
                    <div className="floatRightContainer">
                        <Icon
                            className="icon marginRight"
                            icon={envelope}
                            size={28}
                            onClick={this.exportChapters}
                            data-tip="Export chapters"
                        />
                        <Icon
                            className="icon"
                            icon={plus}
                            size={28}
                            onClick={this.props.newChapter}
                            data-tip="Create a new chapter"
                        />
                    </div>
                    <div className="entityContainer">{this.renderChapters()}</div>
                </div>
            );
        } else {
            return <EditComponentsNotice objectName="chapter" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.chapterStore,
        selectedStoryId: state.storyStore.selectedStoryId,
        userId: state.appStore.userId,
        apiKey: state.appStore.apiKey,
    };
}

const mapDispatchToProps = {
    ...chapterActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chapters);
