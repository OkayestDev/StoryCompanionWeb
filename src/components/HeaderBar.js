import React from 'react';
import StoryCompanion from '../utils/StoryCompanion.js';
import { connect } from 'react-redux';
import { showAlert, closeAlert } from '../store/Actions.js';
import '../css/HeaderBar.css';

const loginPathnames = ['', '/', '/login', '/create_account', '/reset_password'];

const storyPathnames = ['/chapters', '/characters', '/plots', '/notes', '/draft', '/settings'];

class HeaderBar extends StoryCompanion {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.canUserViewRoute(this.props);
    }

    componentWillReceiveProps(props) {
        this.canUserViewRoute(props);
    }

    canUserViewRoute = props => {
        if (storyPathnames.includes(props.history.location.pathname) && !this.isUserLoggedIn()) {
            localStorage.clear();
            this.props.showAlert('You must be logged in to view that page', 'warning');
            props.history.push('/login');
        }
    };

    /**
     * Close alert whenever we redirect
     */
    redirect = to => {
        this.props.closeAlert();
        this.props.history.push(to);
    };

    renderCorrectLinks = () => {
        let pathname = this.props.history.location.pathname;
        if (loginPathnames.includes(pathname)) {
            return (
                <div className="linksContainer">
                    <div
                        className={'link' + (pathname === '/login' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/login')}
                    >
                        Login
                    </div>
                    <div
                        className={'link' + (pathname === '/create_account' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/create_account')}
                    >
                        Create Account
                    </div>
                    <div
                        className={'link' + (pathname === '/reset_password' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/reset_password')}
                    >
                        Reset Password
                    </div>
                </div>
            );
        } else if (storyPathnames.includes(pathname)) {
            return (
                <div className="linksContainer">
                    <div
                        className={'link' + (pathname === '/tags' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/tags')}
                    >
                        Tags
                    </div>
                    <div
                        className={'link' + (pathname === '/chapters' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/chapters')}
                    >
                        Chapters
                    </div>
                    <div
                        className={'link' + (pathname === '/plots' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/plots')}
                    >
                        Plots
                    </div>
                    <div
                        className={'link' + (pathname === '/characters' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/characters')}
                    >
                        Characters
                    </div>
                    <div
                        className={'link' + (pathname === '/draft' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/draft')}
                    >
                        Draft
                    </div>
                    <div
                        className={'link' + (pathname === '/notes' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/notes')}
                    >
                        Notes
                    </div>
                    <div
                        className={'link' + (pathname === '/settings' ? ' activeLink' : '')}
                        onClick={() => this.redirect('/settings')}
                    >
                        Settings
                    </div>
                </div>
            );
        } else {
            this.props.showAlert('Invalid route', 'warning');
            if (this.isUserLoggedIn()) {
                this.redirect('/chapters');
            } else {
                this.redirect('/login');
            }
        }
    };

    render() {
        return (
            <div className="headerBarContainer">
                <div className="storyCompanion">
                    <img className="storyCompanionLogo" src="./logo.png" alt="" />
                    Story Companion
                </div>
                {this.renderCorrectLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        apiKey: state.apiKey,
    };
}

const mapDispatchToProps = {
    showAlert,
    closeAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderBar);
