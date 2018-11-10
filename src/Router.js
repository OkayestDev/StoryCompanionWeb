import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from './App.js';
import Login from './views/Login.js';
import CreateAccount from './views/CreateAccount.js';
import HeaderBar from './components/HeaderBar.js';
import GlobalAlert from './components/GlobalAlert.js';
import StoryCompanion from './utils/StoryCompanion.js';
import './css/Router.css';
import './css/CommonTheme.css';
require('dotenv').config();

/**
 * @TODO add link to app stores for small screens (mobile)
 */
export default class Router extends StoryCompanion {
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
                                AppStore={this.AppStore}
                                showAlert={this.showAlert.bind(this)}
                            />
                        )}
                    />
                    <Route
                        path="/login" exact
                        render={(props) => (
                            <Login
                                {...props}
                                showAlert={this.showAlert.bind(this)}
                                AppStore={this.AppStore}
                            />
                        )}
                    />
                    <Route
                        path="/create_account" exact
                        render={(props) => (
                            <CreateAccount
                                {...props}
                                showAlert={this.showAlert.bind(this)}
                                AppStore={this.AppStore}
                            />
                        )}
                    />
                    <Route
                        path="/" exact
                        render={(props) => (
                            <App
                                {...props}
                                AppStore={this.AppStore}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        )
    }
}