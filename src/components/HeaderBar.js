import React, { Component } from 'react';
import '../css/HeaderBar.css';

export default class HeaderBar extends Component {
    render() {
        return (
            <div className="headerBarContainer">
                <div className="storyCompanion">
                    <img 
                        className="storyCompanionLogo"
                        src="./favicon.ico"
                    />
                    Story Companion
                </div>
            </div>
        )
    }
}