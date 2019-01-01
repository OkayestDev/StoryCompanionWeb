import StoryCompanion from '../../../utils/StoryCompanion.js';
import NoteRequests from '../../../utils/NoteRequests.js';

export default class NotesUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.NoteRequests = new NoteRequests();
        this.getNotes(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getNotes(props);
        }
    }

    getNotes = props => {
        if (props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject(props);
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

    deleteNote = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.deleteNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.state.notes;
                    delete tempNotes[this.state.selectedNoteId];
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

    exportNotes = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.exportNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        `Successfully emailed notes to ${this.props.email}`,
                        'success'
                    );
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export notes at this time', 'danger');
            });
    };
}
