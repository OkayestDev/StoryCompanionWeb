import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import NoteRequests from '../utils/NoteRequests.js';
import EditEntityModal from '../components/EditEntityModal.js';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { plus } from 'react-icons-kit/fa';
import { connect } from 'react-redux';
import { showAlert } from '../store/Actions.js';
import '../css/Notes.css';

class Notes extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            selectedNoteId: null,
            isNoteModalOpen: false,
            notes: null,
        };
        this.NoteRequests = new NoteRequests();
        this.getNotes();
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getNotes();
        }
    }

    getNotes = () => {
        if (this.props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject();
            this.NoteRequests.getNotes(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.setState({
                            notes: res.success,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch notes at this time', 'warning');
                });
        }
    };

    createNote = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.createNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        notes: res.success,
                        isNoteModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create note at this time', 'danger');
            });
    };

    editNote = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.editNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.state.notes;
                    tempNotes[this.state.selectedNoteId] = res.success;
                    this.setState({
                        notes: tempNotes,
                        selectedNoteId: null,
                        isNoteModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit note at this time', 'danger');
            });
    };

    deleteNote = id => {
        const paramsObject = {
            note: id,
        };
        this.NoteRequests.deleteNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.state.notes;
                    delete tempNotes[id];
                    this.setState({
                        notes: tempNotes,
                        isNoteModalOpen: false,
                        selectedNoteId: null,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete note at this time', 'danger');
            });
    };

    selectNoteForEdit = id => {
        this.setState({
            isNoteModalOpen: true,
            name: this.state.notes[id].name,
            description: this.state.notes[id].description,
            selectedNoteId: id,
        });
    };

    newNote = () => {
        this.setState({
            isNoteModalOpen: true,
            name: '',
            description: '',
        });
    };

    renderNotes = () => {
        if (this.state.notes === null) {
            return null;
        }

        let noteIds = Object.keys(this.state.notes);
        if (noteIds.length > 0) {
            let renderedNotes = [];
            noteIds.forEach(id => {
                renderedNotes.push(
                    <div className="note" key={id} onClick={() => this.selectNoteForEdit(id)}>
                        <div className="noteName">{this.state.notes[id].name}</div>
                        <div className="noteDescription">{this.state.notes[id].description}</div>
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
                        isEntityModalOpen={this.state.isNoteModalOpen}
                        selectedId={this.state.selectedNoteId}
                        onRequestClose={() => this.setState({ isNoteModalOpen: false })}
                        objectName="Note"
                        title={this.state.selectedNoteId === null ? 'Create a Note' : 'Edit Note'}
                        description={this.state.description}
                        descriptionOnChange={newDescription =>
                            this.setState({ description: newDescription })
                        }
                        name={this.state.name}
                        nameOnChange={newName => this.setState({ name: newName })}
                        onSave={() =>
                            this.state.selectedNoteId === null ? this.createNote() : this.editNote()
                        }
                        onDelete={() => this.deleteNote(this.state.selectedNoteId)}
                        showAlert={this.props.showAlert}
                        saveButtonText={
                            this.state.selectedNoteId === null ? 'Create Note' : 'Edit Note'
                        }
                        deleteButtonText="Delete Note"
                        confirmationAction="Delete Note?"
                    />
                    <Icon
                        className="icon floatRight"
                        icon={plus}
                        size={28}
                        onClick={() => this.newNote()}
                        data-tip="Create a new note"
                    />
                    <div className="full">{this.renderNotes()}</div>
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
        selectedStoryId: state.selectedSToryId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);
