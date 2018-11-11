import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import Icon from 'react-icons-kit';
import { arrowRight, arrowLeft, plus } from 'react-icons-kit/fa';
import StoryRequests from '../utils/StoryRequests.js';
import ReactTooltip from 'react-tooltip';
import StoryModal from './StoryModal.js';
import '../css/StoriesList.css';

export default class StoriesList extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            hidden: false,
            isStoryModalOpen: true,
        }
        this.StoryRequests = new StoryRequests();
    }

    componentWillMount() {
        super.componentWillMount();
        this.StoryRequests.getStories(this.AppStore.userId);
    }

    render() {
        if (this.isUserLoggedIn() && !this.state.hidden) {
            return (
                <div className="storiesList">
                    <StoryModal
                        isStoryModalOpen={this.state.isStoryModalOpen}
                        onRequestClose={() => this.setState({isStoryModalOpen: false})}
                        showAlert={this.props.showAlert}
                    />
                    <div className="storiesListLabel">
                        <Icon
                            className="storiesListIcon"
                            icon={arrowLeft}
                            size={30}
                            data-tip="Close Stories List"
                            onClick={() => {
                                this.setState({hidden: true});
                                this.props.toggleIsStoryListOpen();
                            }}
                        />
                        <div className="storiesListLabelText">
                            Stories
                        </div>
                        <Icon
                            className="storiesListIcon"
                            icon={plus}
                            size={30}
                            data-tip="Create Story"
                            onClick={() => this.setState({isStoryModalOpen: true})}
                        />
                    </div>
                    <ReactTooltip/>
                </div>
            )
        }
        else if (this.isUserLoggedIn()) {
            return (
                <div className="hiddenStoriesList">
                    <div className="storiesListLabel">
                        <Icon
                            className="storiesListIcon"
                            icon={arrowRight}
                            size={30}
                            data-tip="Open Stories List"
                            onClick={() => {
                                this.setState({hidden: false})
                                this.props.toggleIsStoryListOpen();                                
                            }}
                        />
                    </div>
                    <ReactTooltip/>
                </div>
            )
        }
        else {
            return null;
        }
    }
}