import StoryCompanion from '../../../utils/StoryCompanion.js';
import StoryRequests from '../../../utils/StoryRequests.js';

export default class StoriesListUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.StoryRequests = new StoryRequests();
    }

    componentDidMount() {
        this.getStories();
        this.getTags();
    }

    getStories = () => {
        if (this.props.userId !== null) {
            let paramsObject = this.createParamsObject();
            this.StoryRequests.getStories(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.props.setStories(res.success);
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch stories at this time', 'danger');
                });
        }
    };

    createStory = async () => {
        var image = '';
        if (this.state.image.includes('data:image') && this.state.image.includes('base64')) {
            image = await this.uploadToS3(this.state.image, 'story', this.props.userId);
        } else {
            image = this.state.image;
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
                    this.props.showAlert(
                        'Successfully created new story, ' + this.state.name,
                        'success'
                    );
                    this.setState({ ...this.defaultState() });
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create story at this time', 'danger');
            });
    };

    editStory = async () => {
        var image = '';
        if (this.state.image.includes('data:image') && this.state.image.includes('base64')) {
            image = await this.uploadToS3(this.state.image, 'story', this.props.userId);
        } else {
            image = this.state.image;
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
                    this.props.showAlert(
                        'Successfully edited story, ' + this.state.name,
                        'success'
                    );
                    let tempStories = this.props.stories;
                    tempStories[this.state.selectedStoryId] = res.success;
                    this.setState({ ...this.defaultState() });
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit at this time', 'danger');
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
                    delete tempStories[this.state.selectedStoryId];
                    this.setState({ ...this.defaultState() });
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete story at this time', 'danger');
            });
    };
}
