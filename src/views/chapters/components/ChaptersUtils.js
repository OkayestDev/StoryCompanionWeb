import StoryCompanion from '../../../utils/StoryCompanion.js';
import ChapterRequests from '../../../utils/ChapterRequests.js';

export default class ChaptersUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.ChapterRequests = new ChapterRequests();
        console.info(props);
        this.getChapters(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.selectedStoryId !== props.selectedStoryId) {
            this.getChapters(props);
        }
    }

    getChapters = props => {
        if (props.selectedStoryId !== null) {
            const paramsObject = this.createParamsObject(props);
            this.ChapterRequests.getChapters(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert(res.error, 'warning');
                    } else {
                        this.setState({
                            chapters: res.success,
                        });
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch chapters at this time', 'danger');
                });
        }
    };

    createChapter = () => {
        if (!this.validateChapter()) {
            return;
        }

        const paramsObject = this.createParamsObject();
        this.ChapterRequests.createChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.setState({
                        chapters: res.success,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create Chapter at this time', 'danger');
            });
    };

    editChapter = () => {
        if (!this.validateChapter()) {
            return;
        }

        const paramsObject = this.createParamsObject();
        this.ChapterRequests.editChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.state.chapters;
                    tempChapters[this.state.selectedChapterId] = res.success;
                    this.setState({
                        chapters: tempChapters,
                        name: '',
                        description: '',
                        number: '',
                        selectedChapterId: null,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit chapter at this time', 'danger');
            });
    };

    deleteChapter = () => {
        const paramsObject = this.createParamsObject();
        this.ChapterRequests.deleteChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.state.chapters;
                    delete tempChapters[this.state.selectedChapterId];
                    this.setState({
                        chapters: tempChapters,
                        isChapterModalOpen: false,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete chapter at this time', 'danger');
            });
    };

    writeChapter = () => {};

    exportChapter = () => {};

    validateChapter = () => {
        if (isNaN(this.state.number)) {
            this.props.showAlert('Please provide a number for the chapter', 'warning');
            return false;
        }

        if (this.state.name === '') {
            this.props.showAlert('Please provide a name for the chapter', 'warning');
            return false;
        }
        return true;
    };
}
