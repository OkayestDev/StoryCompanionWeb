import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from './App.js';
import AppStore from './store/AppStore.js';
require('dotenv').config();

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.AppStore = new AppStore();
    }

    updateAppStore = (newAppStore) => {

    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <title>Story Companion</title>
                    <DocumentTitle title="Story Companion"/>
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