import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
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

class Router extends StoryCompanion {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="full flex">
                <BrowserRouter>
                    <div className="application">
                        <div>
                            <GlobalAlert />
                        </div>
                        <title>Story Companion</title>
                        <DocumentTitle title="Story Companion" />
                        <Route render={props => <HeaderBar {...props} />} />
                        {this.isUserLoggedIn() && (
                            <Route render={props => <StoriesList {...props} />} />
                        )}
                        <Route path="/login" exact render={props => <Login {...props} />} />
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
                        <div
                            style={
                                this.props.isStoryListOpen
                                    ? { marginLeft: '505px' }
                                    : { marginLeft: '45px' }
                            }
                            className="view"
                        >
                            <Route
                                path="/chapters"
                                exact
                                render={props => <Chapters {...props} />}
                            />
                            <Route path="/plots" exact render={props => <Plots {...props} />} />
                            <Route
                                path="/characters"
                                exact
                                render={props => <Characters {...props} />}
                            />
                            <Route path="/notes" exact render={props => <Notes {...props} />} />
                            <Route path="/draft" exact render={props => <Draft {...props} />} />
                            <Route
                                path="/settings"
                                exact
                                render={props => <Settings {...props} />}
                            />
                            <Route path="/tags" exact render={props => <Tags {...props} />} />
                            <Route path="/prompt" exact render={props => <Prompt {...props} />} />
                            <Route path="/" exact render={props => <App {...props} />} />
                        </div>
                    </div>
                </BrowserRouter>
                {this.isUserLoggedIn() && <Ad />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isStoryListOpen: state.storyStore.isStoryListOpen,
        apiKey: state.apiKey,
        userId: state.userId,
    };
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);
