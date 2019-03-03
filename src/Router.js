import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Home from './views/home/Home.js';
import Prompt from './views/prompt/Prompt.js';
import Tags from './views/tags/Tags.js';
import App from './App.js';
import Settings from './views/settings/Settings.js';
import Login from './views/login/Login.js';
import Chapters from './views/chapters/Chapters.js';
import Plots from './views/plots/Plots.js';
import Characters from './views/characters/Characters.js';
import Notes from './views/notes/Notes.js';
import Draft from './views/draft/Draft.js';
import CreateAccount from './views/create_account/CreateAccount.js';
import ResetPassword from './views/reset_password/ResetPassword.js';
import HeaderBar from './components/HeaderBar.js';
import GlobalAlert from './components/GlobalAlert.js';
import StoryCompanion from './utils/StoryCompanion.js';
import StoriesList from './components/stories_list/StoriesList.js';
import { connect } from 'react-redux';
import { showAlert } from './actions/Actions.js';
import Ad from './components/Ad.js';
import './css/Router.css';
import './css/CommonTheme.css';
require('dotenv').config();

const height = window.innerHeight;
const heightOfHeaderBar = 75;

const applicationDiv = {
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: '100%',
    height: height - heightOfHeaderBar,
    display: 'flex',
    flexDirection: 'column',
};

class Router extends StoryCompanion {
    render() {
        const IS_LOGGED_IN = this.isUserLoggedIn();
        return (
            <div className="full">
                <GlobalAlert />
                <BrowserRouter>
                    <div>
                        <Route render={props => <HeaderBar {...props} />} />
                        <Route path="/home" exact render={props => <Home {...props} />} />
                        <DocumentTitle title="Story Companion" />
                        <Route path="/login" exact render={props => <Login {...props} />} />
                        <Route path="/" exact render={props => <App {...props} />} />
                        <Route
                            path="/create_account"
                            exact
                            render={props => <CreateAccount {...props} />}
                        />
                        <Route
                            path="/reset_password"
                            exact
                            render={props => <ResetPassword {...props} />}
                        />
                        {/* All routes with story list available inside this div */}
                        {IS_LOGGED_IN && (
                            <div style={applicationDiv}>
                                <div className="view">
                                    <div>
                                        <Route render={props => <StoriesList {...props} />} />
                                    </div>
                                    <div className="entitiesContainer">
                                        <Route
                                            path="/chapters"
                                            exact
                                            render={props => <Chapters {...props} />}
                                        />
                                        <Route
                                            path="/plots"
                                            exact
                                            render={props => <Plots {...props} />}
                                        />
                                        <Route
                                            path="/characters"
                                            exact
                                            render={props => <Characters {...props} />}
                                        />
                                        <Route
                                            path="/notes"
                                            exact
                                            render={props => <Notes {...props} />}
                                        />
                                        <Route
                                            path="/draft"
                                            exact
                                            render={props => <Draft {...props} />}
                                        />
                                        <Route
                                            path="/settings"
                                            exact
                                            render={props => <Settings {...props} />}
                                        />
                                        <Route
                                            path="/tags"
                                            exact
                                            render={props => <Tags {...props} />}
                                        />
                                        <Route
                                            path="/prompt"
                                            exact
                                            render={props => <Prompt {...props} />}
                                        />
                                    </div>
                                </div>
                                {this.isUserLoggedIn() && <Ad />}
                            </div>
                        )}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isStoryListOpen: state.storyStore.isStoryListOpen,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
