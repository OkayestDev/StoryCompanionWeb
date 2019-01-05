import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa';
import '../../../css/StoryListItem.css';

export default class StoryListItem extends Component {
    render() {
        return (
            <div className="storyListItem" onClick={this.props.selectStoryForEdit}>
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
                    </div>
                    <div className="storyDescription">{this.props.story.description}</div>
                    <div
                        className="button editComponentsButton"
                        onClick={event => this.props.selectStoryForComponents(event)}
                    >
                        Edit Components
                    </div>
                </div>
            </div>
        );
    }
}
