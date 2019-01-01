import StoryCompanion from '../../../utils/StoryCompanion.js';
import DraftRequests from '../../../utils/DraftRequests.js';

export default class DraftUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.DraftRequests = new DraftRequests();
        this.getDraft(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getDraft(props);
        }
    }

    getDraft(props) {
        if (props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject(props);
            this.DraftRequests.getDrafts(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        if ('id' in res.success) {
                            this.setState({
                                selectedDraftId: res.success.id,
                                description: res.success.description,
                            });
                        } else {
                            this.setState({
                                selectedDraftId: null,
                                description: '',
                            });
                        }
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch draft at this time', 'danger');
                });
        }
    }

    createDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.createDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        selectedDraftId: res.success.id,
                        description: res.success.description,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create a draft at this time', 'danger');
            });
    };

    editDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert('Successfully saved draft', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit draft at this time', 'danger');
            });
    };

    exportDraft = () => {
        const paramsObject = this.createParamsObject();
        this.DraftRequests.exportDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        `Successfully emailed draft to ${this.props.email}`,
                        'success'
                    );
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export draft at this time', 'danger');
            });
    };
}
