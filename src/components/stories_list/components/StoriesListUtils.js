import StoryCompanion from '../../../utils/StoryCompanion.js';
import StoryRequests from '../../../utils/StoryRequests.js';

export default class StoriesListUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.StoryRequests = new StoryRequests();
    }

    componentDidMount() {
        this.props.resetStory();
        if (this.isUserLoggedIn()) {
            this.getStories();
            this.getTags();
        }
    }

    selectStory = (event, id) => {
        event.stopPropagation();
        this.props.selectStory(id);
    };

    selectStoryToEditComponents = id => {
        this.props.selectStory(id);
    };

    createStory = async () => {
        var image = '';
        if (this.props.image.includes('data:image') && this.props.image.includes('base64')) {
            image = await this.uploadToS3(this.props.image, 'story', this.props.userId);
        } else {
            image = this.props.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert('Unable to upload image at this time', 'warning');
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.createStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.resetStory();
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create story at this time', 'warning');
            });
    };

    editStory = async () => {
        var image = '';
        if (this.props.image.includes('data:image') && this.props.image.includes('base64')) {
            image = await this.uploadToS3(this.props.image, 'story', this.props.userId);
        } else {
            image = this.props.image;
        }

        // Upload image failed. Show alert and reset image to avoid post error
        if (typeof image === 'undefined') {
            image = '';
            this.props.showAlert('Unable to upload image at this time', 'warning');
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.editStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    tempStories[this.props.selectedStoryIdForEdit] = res.success;
                    this.props.resetStory();
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit story at this time', 'warning');
            });
    };

    deleteStory = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.deleteStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    delete tempStories[this.props.selectedStoryIdForEdit];
                    this.props.resetStory();
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delet story at this time', 'danger');
            });
    };
}
