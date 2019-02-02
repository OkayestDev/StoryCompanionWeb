import NoteRequests from '../../../utils/NoteRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class NotesUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.NoteRequests = new NoteRequests();
    }

    componentDidMount() {
        this.props.resetNote();
        if (this.props.selectedStoryId !== null) {
            this.getNotes();
        }
    }

    getNotes = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.getNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setNotes(res.success);
                    this.props.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    createNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.createNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.setNotes(res.success);
                    this.props.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    editNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.editNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.props.notes;
                    tempNotes[this.props.selectedNoteId] = res.success;
                    this.props.setNotes(tempNotes);
                    this.props.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    deleteNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.deleteNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.props.notes;
                    delete tempNotes[this.props.selectedNoteId];
                    this.props.setNotes(tempNotes);
                    this.props.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    exportNotes = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.exportNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.showAlert(`Success emailed notes to ${this.props.email}`, 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export notes at this time', 'danger');
            });
    };
}
