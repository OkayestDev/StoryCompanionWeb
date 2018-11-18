import React, { Component } from 'react';
import '../css/StoryListItem.css';

export default class StoryListItem extends Component {
    render() {
        return (
            <div 
                className="storyListItem"
                onClick={() => this.props.selectStoryForEdit()}
            >
            {
                this.props.story.image === ''
                ?
                <div className="noStoryImage">
                    No Image
                </div>
                :
                <div>
                    <img 
                        src={this.props.story.image}
                        className="storyImage"
                        alt=""
                    />
                </div>
            }
                <div className="storyInfo">
                    <div className="storyTitle">
                        {this.props.story.name}
                    </div>
                    <div className="storyDescription">
                        {this.props.story.description}
                    </div>
                    <div>
                        <div 
                            className="button"
                            onClick={() => this.props.selectStoryForComponents()}
                        >
                            Edit Components
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
