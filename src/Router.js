import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from './App.js';
import Settings from './views/Settings.js';
import Login from './views/Login.js';
import Chapters from './views/Chapters.js';
import Plots from './views/Plots.js';
import Characters from './views/Characters.js';
import Notes from './views/Notes.js';
import Draft from './views/Draft.js';
import CreateAccount from './views/CreateAccount.js';
import ResetPassword from './views/ResetPassword.js';
import HeaderBar from './components/HeaderBar.js';
import GlobalAlert from './components/GlobalAlert.js';
import StoryCompanion from './utils/StoryCompanion.js';
import StoriesList from './components/StoriesList.js';
import AppStore from './store/AppStore.js';
import Ad from './components/Ad.js';
import './css/Router.css';
import './css/CommonTheme.css';
require('dotenv').config();

// auto full width responsive ads


/**
 * @TODO add link to app stores for small screens (mobile)
 */
export default class Router extends StoryCompanion {
    constructor(props) {
        super(props);
        this.state = {
            isStoryListOpen: true
        }
        this.AppStore = new AppStore();
    }

    toggleIsStoryListOpen = () => {
        this.setState({isStoryListOpen: !this.state.isStoryListOpen});
    }

    componentWillMount() {
        let loadedAppStore = localStorage.getItem('AppStore');
        if (loadedAppStore !== null) {
            this.AppStore.setValue(JSON.parse(loadedAppStore));
        }
    }

    isUserLoggedIn = () => {
        let loadedAppStore = localStorage.getItem('AppStore');
        if (loadedAppStore !== null) {
            return true;
        }
        return false;
    }

    updateAppStore = (newAppStore) => {
        this.AppStore = newAppStore;
        localStorage.setItem('apiKey', newAppStore.apiKey);
        localStorage.setItem('AppStore', JSON.stringify(newAppStore));
        this.forceUpdate();
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
                            closeAlert={this.closeAlert}
                        />
                    </div>
                    <title>Story Companion</title>
                    <DocumentTitle title="Story Companion"/>
                    <Route
                        render={(props) => (
                            <HeaderBar
                                {...props}
                                showAlert={this.showAlert}
                                AppStore={this.AppStore}
                                isUserLoggedIn={this.isUserLoggedIn}
                            />
                        )}
                    />
                    <Route
                        render={(props) => (
                            <StoriesList
                                {...props}
                                isUserLoggedIn={this.isUserLoggedIn}
                                showAlert={this.showAlert}
                                updateAppStore={this.updateAppStore}
                                AppStore={this.AppStore}
                                toggleIsStoryListOpen={this.toggleIsStoryListOpen}
                                hidden={!this.state.isStoryListOpen}
                            />
                        )}
                    />
                    <Route
                        path="/login" exact
                        render={(props) => (
                            <Login
                                {...props}
                                updateAppStore={this.updateAppStore}
                                AppStore={this.AppStore}
                                isUserLoggedIn={this.isUserLoggedIn}
                                showAlert={this.showAlert}
                            />
                        )}
                    />
                    <Route
                        path="/create_account" exact
                        render={(props) => (
                            <CreateAccount
                                {...props}
                                updateAppStore={this.updateAppStore}
                                AppStore={this.AppStore}
                                isUserLoggedIn={this.isUserLoggedIn}
                                showAlert={this.showAlert}
                            />
                        )}
                    />
                    <Route
                        path="/reset_password" exact
                        render={(props) => (
                            <ResetPassword
                                {...props}
                                updateAppStore={this.updateAppStore}
                                AppStore={this.AppStore}
                                isUserLoggedIn={this.isUserLoggedIn}
                                showAlert={this.showAlert}
                            />
                        )}
                    />
                    {/* All routes with story list available inside this div */}
                    <div 
                        style={(this.state.isStoryListOpen ? {marginLeft: '510px'} : {marginLeft: '50px'})}
                        className="view"
                    >
                        <Route
                            path="/chapters" exact
                            render={(props) => (
                                <Chapters
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
                                />
                            )}
                        />
                        <Route
                            path="/plots" exact
                            render={(props) => (
                                <Plots
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
                                />
                            )}
                        />
                        <Route
                            path="/characters" exact
                            render={(props) => (
                                <Characters
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
                                />
                            )}
                        />
                        <Route
                            path="/notes" exact
                            render={(props) => (
                                <Notes
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
                                />
                            )}
                        />
                        <Route
                            path="/draft" exact
                            render={(props) => (
                                <Draft
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
                                />
                            )}
                        />
                        <Route
                            path="/settings" exact
                            render={(props) => (
                                <Settings
                                    {...props}
                                    updateAppStore={this.updateAppStore}
                                    AppStore={this.AppStore}
                                    showAlert={this.showAlert}
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
                    <Ad/>
                </div>
            </BrowserRouter>
        )
    }
}