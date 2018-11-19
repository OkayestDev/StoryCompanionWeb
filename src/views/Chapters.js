import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import ChapterRequests from '../utils/ChapterRequests.js';

export default class Chapters extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            description: '',
            selectedStoryId: null,
        }
        this.ChapterRequests = new ChapterRequests();
        this.getChapters();
    }

    componentWillReceiveProps(props) {
        if (this.state.selectedStoryId !== props.AppStore.selectedStoryId) {
            this.getChapters();
        }
    }

    getChapters = () => {
        if (this.props.AppStore.selectedStoryId !== null) {
            this.ChapterRequests.getChapters(this.props.AppStore.selectedStoryId).then((res) => {
                if ('error' in res) {
                    this.props.showAlert(res.error, "warning");
                }
                else {
                    this.props.AppStore.setValue({chapters: res.success});
                    this.props.updateAppStore(this.props.AppStore);
                    this.setState({selectedStoryId: this.props.AppStore.selectedStoryId})
                }
            })
            .catch((error) => {
                this.props.showAlert("Unable to fetch chapters at this time", "danger");
            });
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}