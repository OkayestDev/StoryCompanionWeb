import StoryCompanion from '../../../utils/StoryCompanion.js';
import TagRequests from '../../../utils/TagRequests.js';

export default class TagsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
        this.getTags();
    }

    editTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.editTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        let tempTags = this.props.tags;
                        tempTags[this.state.selectedTagId] = res.success;
                        this.props.setTags(tempTags);
                        this.setState({
                            isTagModalOpen: false,
                            selectedTagId: null,
                        });
                    }
                })
                .catch(error => {
                    this.props.showAlert('Unable to create tag at this time', 'danger');
                });
        }
    };

    deleteTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.deleteTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        let tempTags = this.props.tags;
                        delete tempTags[this.state.selectedTagId];
                        this.props.setTags(tempTags);
                        this.setState({
                            isTagModalOpen: false,
                            selectedTagId: null,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to delete tag at this time', 'danger');
                });
        }
    };

    createTag = () => {
        if (this.props.userId !== null) {
            const paramsObject = this.createParamsObject();
            this.TagRequests.createTag(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.props.setTags(res.success);
                        this.setState({
                            selectedTagId: null,
                            isTagModalOpen: false,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to create tag at this time', 'danger');
                });
        }
    };
}
