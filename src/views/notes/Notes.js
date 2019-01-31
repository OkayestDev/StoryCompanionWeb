import React from 'react';
import NotesUtils from './components/NotesUtils.js';
import EditEntityModal from '../../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { plus, envelope } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../../actions/Actions.js';
import * as noteActions from '../../actions/NoteActions.js';
import '../../css/Notes.css';

class Notes extends NotesUtils {
    constructor(props) {
        super(props);
    }

    renderNotes = () => {
        if (this.props.notes === null) {
            return null;
        }

        let noteIds = Object.keys(this.props.notes);
        if (noteIds.length > 0) {
            let renderedNotes = [];
            noteIds.forEach(id => {
                renderedNotes.push(
                    <div className="note" key={id} onClick={() => this.props.selectNote(id)}>
                        <div className="noteName">{this.props.notes[id].name}</div>
                        <div className="noteDescription">{this.props.notes[id].description}</div>
                    </div>
                );
            });
            return renderedNotes;
        } else {
            return (
                <div className="noEntityContainer">
                    <div className="noEntityText">
                        <div>Looks like you haven't created any notes yet.</div>
                        <div>
                            Press on the &nbsp;
                            <Icon icon={plus} size={30} />
                            &nbsp; to create a new note.
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
                        isEntityModalOpen={this.props.isNoteModalOpen}
                        selectedId={this.props.selectedNoteId}
                        onRequestClose={this.props.resetNote}
                        objectName="Note"
                        title={this.props.selectedNoteId === null ? 'Create a Note' : 'Edit Note'}
                        description={this.props.description}
                        descriptionOnChange={this.props.handleDescriptionChanged}
                        name={this.props.name}
                        nameOnChange={this.props.handleNameChanged}
                        onSave={
                            this.props.selectedNoteId === null ? this.createNote : this.editNote
                        }
                        onDelete={this.deleteNote}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.props.selectedNoteId === null ? 'Create Note' : 'Edit Note'
                        }
                        deleteButtonText="Delete Note"
                        confirmationAction="Delete Note?"
                    />
                    <Icon
                        className="icon secondFloatRight"
                        icon={envelope}
                        size={28}
                        onClick={this.exportNotes}
                        data-tip="Export Notes"
                    />
                    <Icon
                        className="icon floatRight"
                        icon={plus}
                        size={28}
                        onClick={this.newNote}
                        data-tip="Create a new note"
                    />
                    <div className="entityContainer">{this.renderNotes()}</div>
                </div>
            );
        } else {
            return (
                <div className="editComponentsText">
                    Edit Components of a story to begin creating notes
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.notesStore,
        selectedStoryId: state.storiesStore.selectedStoryId,
        apiKey: state.appStore.apiKey,
        email: state.appStore.email,
    };
}

const mapDispatchToProps = {
    ...noteActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);
