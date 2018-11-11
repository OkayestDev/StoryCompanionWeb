import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from './App.js';
import Login from './views/Login.js';
import Chapters from './views/Chapters.js';
import CreateAccount from './views/CreateAccount.js';
import HeaderBar from './components/HeaderBar.js';
import GlobalAlert from './components/GlobalAlert.js';
import StoryCompanion from './utils/StoryCompanion.js';
import StoriesList from './components/StoriesList.js';
import './css/Router.css';
import './css/CommonTheme.css';
require('dotenv').config();

/**
 * @TODO add link to app stores for small screens (mobile)
 */
export default class Router extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            isStoryListOpen: true
        }
    }

    toggleIsStoryListOpen = () => {
        this.setState({isStoryListOpen: !this.state.isStoryListOpen});
    }

    render() {
        return(
            <BrowserRouter>
                <div className="application">
                    <div>
                        <GlobalAlert
                            visible={this.state.showGlobalAlert}
                            type={this.state.globalAlertType}
                            message={this.state.globalAlertMessage}
                            closeAlert={this.closeAlert.bind(this)}
                        />
                    </div>
                    <title>Story Companion</title>
                    <DocumentTitle title="Story Companion"/>
                    <Route
                        render={(props) => (
                            <HeaderBar
                                {...props}
                                showAlert={this.showAlert.bind(this)}
                            />
                        )}
                    />
                    <Route
                        render={(props) => (
                            <StoriesList
                                {...props}
                                showAlert={this.showAlert.bind(this)}
                                toggleIsStoryListOpen={this.toggleIsStoryListOpen.bind(this)}
                            />
                        )}
                    />
                    <Route
                        path="/login" exact
                        render={(props) => (
                            <Login
                                {...props}
                                showAlert={this.showAlert.bind(this)}
                            />
                        )}
                    />
                    {/* All routes with story list available inside this div */}
                    <div style={(this.state.isStoryListOpen ? {paddingLeft: '250px'} : {paddingLeft: '50px'})}>
                        <Route
                            path="/create_account" exact
                            render={(props) => (
                                <CreateAccount
                                    {...props}
                                    showAlert={this.showAlert.bind(this)}
                                />
                            )}
                        />
                        <Route
                            path="/chapters" exact
                            render={(props) => (
                                <Chapters
                                    {...props}
                                    showAlert={this.showAlert.bind(this)}
                                />
                            )}
                        />
                        <Route
                            path="/" exact
                            render={(props) => (
                                <App
                                    {...props}
                                />
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}