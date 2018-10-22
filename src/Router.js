import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from './App.js';
import Login from './views/Login.js';
import HeaderBar from './components/HeaderBar.js';
import AppStore from './store/AppStore.js';
import './css/Router.css';
import './css/CommonTheme.css';
require('dotenv').config();

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.AppStore = new AppStore();
    }

    componentWillMount() {
        let loadedAppStore = localStorage.getItem('AppStore');
        if (loadedAppStore !== null) {
            this.AppStore = JSON.parse(loadedAppStore);
        }
    }

    updateAppStore = (newAppStore) => {
        this.AppStore = newAppStore;
        localStorage.setItem('AppStore', JSON.stringify(newAppStore));
    }

    render() {
        return(
            <BrowserRouter>
                <div className="application">
                    <title>Story Companion</title>
                    <DocumentTitle title="Story Companion"/>
                    <Route
                        render={(props) => (
                            <HeaderBar
                                {...props}
                                AppStore={this.AppStore}
                            />
                        )}
                    />
                    <Route
                        path="/login" exact
                        render={(props) => (
                            <Login
                                {...props}
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