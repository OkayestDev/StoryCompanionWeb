import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa';
import '../css/StoryListItem.css';

export default class StoryListItem extends Component {
    render() {
        return (
            <div className="storyListItem">
                {this.props.story.image === '' ? (
                    <div className="noStoryImage">No Image</div>
                ) : (
                    <div>
                        <img src={this.props.story.image} className="storyImage" alt="" />
                    </div>
                )}
                <div className="storyInfo">
                    <div className="storyTitle">
                        <div className="storyTitleText">{this.props.story.name}</div>
                        <Icon
                            className="storiesListIcon"
                            size={20}
                            icon={pencil}
                            data-tip="Edit Story"
                            onClick={() => this.props.selectStoryForEdit()}
                        />
                    </div>
                    <div className="storyDescription">{this.props.story.description}</div>
                    <div
                        className="button editComponentsButton"
                        onClick={() => this.props.selectStoryForComponents()}
                    >
                        Edit Components
                    </div>
                </div>
            </div>
        );
    }
}
