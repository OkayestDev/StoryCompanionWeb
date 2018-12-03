import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import { connect } from 'react-redux';
import { Actions } from '../store/Actions.js';
import '../css/HeaderBar.css';

const loginPathnames = [
    '',
    '/',
    '/login',
    '/create_account',
    '/reset_password',
];

const storyPathnames = [
    '/chapters',
    '/characters',
    '/plots',
    '/notes',
    '/draft',
    '/settings',
];

class HeaderBar extends StoryCompanion {
    componentDidMount() {
        this.canUserViewRoute(this.props);
    }

    componentWillReceiveProps(props) {
        this.canUserViewRoute(props);
    }

    canUserViewRoute = (props) => {
        if (storyPathnames.includes(props.location.pathname) && !this.props.isUserLoggedIn()) {
            this.props.showAlert("You must be logged in to view that page", "warning");
            props.history.push("/login");
        }
    }

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
                    <div 
                        className={"link" + (pathname === '/reset_password' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/reset_password")}
                    >
                        Reset Password
                    </div>
                </div>
            );
        }
        else if (storyPathnames.includes(pathname)) {
            return (
                <div className="linksContainer">
                    <div 
                        className={"link" + (pathname === '/chapters' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/chapters")}
                    >
                        Chapters
                    </div>
                    <div 
                        className={"link" + (pathname === '/plots' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/plots")}
                    >
                        Plots
                    </div>
                    <div 
                        className={"link" + (pathname === '/characters' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/characters")}
                    >
                        Characters
                    </div>
                    <div 
                        className={"link" + (pathname === '/draft' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/draft")}
                    >
                        Draft
                    </div>
                    <div 
                        className={"link" + (pathname === '/notes' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/notes")}
                    >
                        Notes
                    </div>
                    <div 
                        className={"link" + (pathname === '/settings' ? " activeLink" : "")}
                        onClick={() => this.props.history.push("/settings")}
                    >
                        Settings
                    </div>
                </div>
            );
        }
        else {
            this.props.showAlert("Invalid route", "warning");
            if (this.props.isUserLoggedIn()) {
                this.props.history.push("/chapters");
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
                        src="./logo.png"
                        alt=""
                    />
                    Story Companion
                </div>
                {this.renderCorrectLinks()}
            </div>
        )
    }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(HeaderBar);