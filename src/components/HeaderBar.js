import React, { Component } from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import '../css/HeaderBar.css';

export default class HeaderBar extends StoryCompanion {
    render() {
        return (
            <div className="headerBarContainer">
                <div className="storyCompanion">
                    <img 
                        className="storyCompanionLogo"
                        src="./favicon.ico"
                        alt=""
                    />
                    Story Companion
                </div>
            </div>
        )
    }
}