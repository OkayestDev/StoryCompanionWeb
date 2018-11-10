import React, { Component } from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import '../css/HeaderBar.css';

const loginPathnames = [
    '/login',
    '/create_account',
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
        let pathname = this.props.history.location.pathname;
        if (loginPathnames.includes(pathname)) {
            return (
                <div className="linksContainer">
                    <div 
                        className={"link" + (pathname === '/login' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/login")}
                    >
                        Login
                    </div>
                    <div 
                        className={"link" + (pathname === '/create_account' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/create_account")}
                    >
                        Create Account
                    </div>
                </div>
            );
        }
        else if (storiesPathnames.includes(pathname)) {
            return (
                <div className="linksContainer">

                </div>
            );
        }
        else if (storyPathnames.includes(pathname)) {
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