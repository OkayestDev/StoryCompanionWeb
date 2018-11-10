import React, { Component } from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import '../css/HeaderBar.css';

const loginPathnames = [
    '/login'
];

const storiesPathnames = [
    '/stories'
];

const storyPathnames = [
    '/characters',
    '/plots',
    '/notes',
    '/draft'
];

export default class HeaderBar extends StoryCompanion {
    renderCorrectLinks = () => {
        if (loginPathnames.includes(this.props.history.location.pathname)) {
            return (
                <div className="linksContainer">

                </div>
            );
        }
        else if (storiesPathnames.includes(this.props.history.location.pathname)) {
            return (
                <div className="linksContainer">

                </div>
            );
        }
        else if (storyPathnames.includes(this.props.history.location.pathname)) {
            return (
                <div className="linksContainer">

                </div>
            );
        }
        else {
            this.props.showAlert("Invalid route", "warning");
            if (this.isUserLoggedIn()) {
                this.props.history.push("/stories");
            }
            else {
                this.props.history.push("/login");
            }
        }
    }

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
                {this.renderCorrectLinks()}
            </div>
        )
    }
}